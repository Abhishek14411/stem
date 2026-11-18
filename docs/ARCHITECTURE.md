# Architecture decisions

## High-level structure

```text
Student / teacher browser
        |
        +-- React + TypeScript + Vite
        |      +-- Group picker and learning journey
        |      +-- Four-gap circuit workbench + pure circuit model
        |      +-- English/Hindi content dictionaries
        |      +-- Local learning event log and local progress
        |      +-- Service-worker app-shell cache
        |
        +---- optional HTTPS / JSON ----> FastAPI backend
                                         +-- health endpoint (current)
                                         +-- future tutor / assessment / progress services
```

## Responsibilities

- `apps/web`: student and teacher experiences, navigation, accessibility, local event history, local progress and cached offline app assets.
- `apps/api`: HTTP routes and request validation. The current API remains a health endpoint only; learning features do not require it.
- `docs`: product decisions, design-system rules, architecture, reference material and roadmap.

## Key decisions

1. **Monorepo:** one repository for the web app and optional API.
2. **React + TypeScript + Vite:** typed interface with a lightweight build pipeline.
3. **Plain CSS with one token file:** `src/styles/smartclass-design-system.css` is imported once from `src/main.tsx`. No Tailwind token copy exists.
4. **Mukta via Fontsource:** Latin and Devanagari subsets are bundled locally at build time; no font request is made to a remote host at runtime.
5. **Deterministic circuit model:** `evaluateCircuit()` is independent of React and presentation code. The supplied reference workbench uses four slots in a loop; this is a guided classroom model, not a general circuit simulator.
6. **Local-first:** language, group selection, prediction, challenge progress, reflection and event log are stored in browser localStorage. The service worker precaches the production app shell and emitted assets for offline reopen after the first successful online visit.
7. **Offline, not offline-AI:** this bundle has no AI provider or cloud sync. Those features must be added behind the API later and must fail safely when disconnected.
8. **Event log:** Workbench attempt, hint and complete events use the same local event schema consumed by the Pulse Board.

## Future data entities

- `profiles`: user identity and role metadata.
- `classes`: grade/class grouping.
- `topics`: curriculum-linked learning objectives.
- `lessons`: versioned learning content and cached assets.
- `questions`: question, answer key, hint, explanation, difficulty and misconception tag.
- `attempts`: student response, score and timestamps.
- `progress`: topic-level completion and mastery summary.

Use UUID identifiers, timestamps, database constraints and row-level security when cloud persistence is introduced. Avoid storing more student personal information than required. Define guardian/teacher consent and institutional requirements before a real-world pilot.

## API conventions

- Prefix application endpoints with `/api/v1`.
- Use Pydantic request/response schemas.
- Keep route handlers thin; move learning logic to services.
- Add authentication and role authorization before exposing student or teacher records.

## Security boundaries

- Public browser config may contain only public client configuration.
- Service-role keys, database credentials and LLM keys remain backend-only secrets.
- Never commit `.env` files or real student records.
- Do not trust role values sent by the browser; verify identity and role server-side.


## Spark tutor API (Phase 7)

`POST /api/v1/tutor/respond` accepts a bounded English/Hindi question and validated lesson/circuit context. The browser uses the FastAPI route only; Gemini credentials and the configurable model remain in backend settings. `GET /api/v1/tutor/status` returns only a `configured` boolean. The provider is behind `TutorProvider`, uses the async Google Gen AI client created and closed by FastAPI lifespan, requests JSON output and applies provider plus application-level validation. Provider failures and disabled/unconfigured AI return a localized scripted response.

`POST /api/v1/tutor/physics/respond` is the subject-aware extension for the supplied Physics Virtual Lab. It accepts an allowlisted Physics module ID, a grade checked against the curated lesson catalogue, English or Hindi, a question up to 800 characters, and at most 12 scalar experiment values. The service reuses the existing provider/client, request throttle, structured `TutorAnswer` validation, and backend-only Gemini configuration. Physics knowledge is curated in `apps/api/app/services/physics_catalogue.py`; the full HTML/DOM is never sent to Gemini. Both tutor routes return `status: "fallback"` when AI is disabled, unavailable, rate-limited, or the prompt is classified as a real-world hazard.

The Physics iframe bridge uses protocol version 1. The React host validates same-origin messages and the exact iframe `WindowProxy`, then checks the module/grade allowlist and bounds context before use. Activity messages store only fixed activity/module metadata in the existing local learning event log; questions and tutor replies are not stored. The host is the language preference owner. **The bridge currently changes the iframe document language but does not yet translate the supplied lab's full visible content. Complete Physics English/Hindi localization and its key audit remain outstanding.**

Tutor questions and answers are transient and are not written to local storage or event logs. Tutor event records contain only the event type, group, screen, timestamp and challenge number. The generated service worker caches only same-origin GET responses and bypasses POST requests. A process-local request cooldown is shared by all requests handled by one worker; multiple workers have independent cooldown counters.
