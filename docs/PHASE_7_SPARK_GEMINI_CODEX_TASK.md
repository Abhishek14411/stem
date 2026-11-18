# SmartClass Buddy — Phase 7: Spark AI Tutor (Gemini)

## Objective

Add a safe, bilingual, context-aware AI tutor called **Spark** to the existing SmartClass Buddy electricity lesson for Classes 6–8. Spark should explain the current learning situation and guide the student with hints and questions. It must not replace the existing deterministic circuit evaluator or change whether the bulb is powered.

This is an implementation task for the existing project, not a request to generate a new application. Work in the current repository and preserve all existing screens, design tokens, local progress, event log, offline Workbench, and tests.

## Required first step: inspect before editing

From the repository root, inspect at least:

- `AGENTS.md`, `README.md`, `docs/ARCHITECTURE.md`, `docs/PRODUCT_BRIEF.md`, `docs/design-system.md`, and `docs/IMPLEMENTATION_STATUS.md` if present.
- `apps/web/src/App.tsx`, `apps/web/src/content/translations.ts`, `apps/web/src/logic/circuit.ts`, and the Workbench components / CSS actually used by the app.
- `apps/web/src/lib/api.ts` and Vite configuration.
- `apps/web/package.json`, `apps/web/playwright.config.ts`, and current E2E/unit tests.
- `apps/api/pyproject.toml`, FastAPI app startup, existing routers, settings/configuration, `.env.example`, and backend tests.

Return a short architecture summary and implementation plan before editing. Do not guess file paths; adapt to the actual repository structure. Do not overwrite files wholesale when a focused change will do.

## Official Gemini integration requirements

Use Google's current official **Google Gen AI Python SDK** package: `google-genai` and imports from `google import genai` (not the legacy `google-generativeai` package). Use its asynchronous API from FastAPI where practical. Pin a compatible SDK range below major version 3 until a reviewed upgrade is made.

Read and follow the current official documentation before implementation:

- Python SDK: https://github.com/googleapis/python-genai
- Gemini API key guidance: https://ai.google.dev/gemini-api/docs/api-key
- Gemini models: https://ai.google.dev/gemini-api/docs/models
- Structured output: https://ai.google.dev/gemini-api/docs/structured-output
- Safety settings: https://ai.google.dev/gemini-api/docs/safety-settings
- Safety and factuality guidance: https://ai.google.dev/gemini-api/docs/safety-guidance

Use `gemini-3.8-flash` as the initial default model only if it is still listed as a supported stable Gemini Developer API model when implementation is performed. Keep the model configurable through `GEMINI_MODEL`; do not hard-code the model throughout the codebase. If Google changes its stable model catalogue, choose a current stable Flash model and document the choice.

## Architecture and security

1. The browser must call **our FastAPI backend**. It must never call Gemini directly.
2. Keep `GEMINI_API_KEY` on the backend only. Never put it in a `VITE_` variable, frontend bundle, URL, response, logs, screenshots, or committed file.
3. Add an empty `GEMINI_API_KEY=` entry and `GEMINI_MODEL=gemini-3.8-flash` to the backend `.env.example` (or the existing equivalent). Load secrets from the backend environment using the project's existing settings approach. Add a local backend `.env` only to `.gitignore` if not already covered. Never write a real key into `.env.example` or commit it.
4. Keep the provider behind a small service/interface so another provider or scripted implementation can replace Gemini later without changing the frontend contract.
5. Construct and close the Gemini async client cleanly using FastAPI lifespan management (or the project's existing lifecycle pattern). Do not create an unclosed client per request.
6. Do not use Gemini function calling, tools, browser search, or external retrieval in this MVP. This tutor only explains a fixed, curated electricity lesson.
7. Do not persist raw student prompts or AI responses in the app's event log, analytics, local storage, or backend database. Store only event type, group ID, screen, challenge number if applicable, and timestamp. Do not add accounts or a database as part of this phase.
8. Do not ask for or send student names, email addresses, phone numbers, home/school addresses, precise location, photos, or other personal information. The UI should tell students not to share personal information. Use grade band `6–8`, not a child's exact date of birth.
9. Apply Google's safety filters using the SDK's supported configuration; do not disable safety categories to make a test pass. Add application-level guardrails and output validation too. Safety filters are not a substitute for review.
10. Treat the model output as untrusted text. Render it as plain text, never as raw HTML or executable markup.

## Backend API contract

Add a router consistent with the existing API versioning. Preferred route:

`POST /api/v1/tutor/respond`

Use Pydantic request and response models. Adapt names to the existing conventions but preserve these semantics.

### Request fields

- `language`: `"en" | "hi"`
- `grade_band`: fixed `"6-8"`
- `lesson_id`: allowlisted `"electricity-circuits"`
- `challenge_number`: integer 1–3
- `student_message`: trimmed string, bounded (for example 1–800 characters)
- `circuit_context`:
  - `battery_present`: boolean
  - `bulb_count`: bounded integer (0–2)
  - `wire_gaps`: bounded integer (0–4)
  - `switch_present`: boolean
  - `switch_open`: boolean or null when no switch exists
  - `evaluator_powered`: boolean, passed from the frontend's existing deterministic evaluator
  - `missing_slots` or a small allowlisted list of missing component identifiers, if needed
- Optional compact, bounded recent tutor turns may be included only if the implementation genuinely needs them. Prefer stateless single-turn requests initially; do not store server-side conversation history.

Validate every enum, integer range, message length, and nested object. Reject unknown lesson IDs and malformed context. Do not accept arbitrary system prompts or arbitrary model names from the browser.

### Response fields

Return a validated structured response, preferably using a Pydantic schema with Gemini structured output:

- `message`: short, age-appropriate explanation in requested language (target 1–3 sentences)
- `hint`: one actionable hint or null
- `follow_up_question`: one Socratic question or null
- `misconception_tag`: one allowlisted tag or `null` (e.g. `missing_power_source`, `open_path`, `missing_component`, `switch_state`, `complete_circuit`, `out_of_scope`)
- `status`: `"ok" | "fallback"`

Keep the total response brief (target no more than about 90 words). Validate response length and required fields. If JSON parsing/schema validation fails, retry at most once with a constrained correction or use the scripted fallback. Never return raw provider traces or secrets.

### Provider behaviour and errors

- When the key is absent or AI is disabled, return a clear `not_configured` / fallback state that lets the frontend use its scripted Spark hints. The app must still work normally.
- Set explicit request timeouts and a conservative output-token limit.
- Handle rate limits, quota exhaustion, safety blocks, network failures, timeouts, malformed/empty model responses, and provider 5xx errors. Return a safe, localized fallback state; do not expose provider exception text to the browser.
- Add modest request throttling / cooldown to avoid accidental repeated calls. Avoid aggressive per-IP throttling that would block a shared classroom tablet. If adding a backend limiter, document its in-memory/multi-worker limitations.
- Keep provider configuration in backend settings: `SPARK_AI_ENABLED`, `GEMINI_API_KEY`, `GEMINI_MODEL`, timeout, output token budget, and any request limit settings.
- Add a health/status indication that reveals only whether Spark AI is configured/enabled, never the key or secret values.

## Spark tutor behaviour

Create a bounded system instruction on the backend. Spark must:

- Teach only the curated Class 6–8 Electricity and Circuits lesson in this MVP.
- Use clear, short, age-appropriate vocabulary and examples; avoid baby talk.
- Reply in the requested language. Hindi must be natural Devanagari, not Romanized Hindi, unless the student explicitly requests otherwise.
- Prefer questions and scaffolded hints over giving the full answer immediately.
- Base its explanation on the supplied circuit state and the curated facts below.
- If circuit state is incomplete, identify the most relevant missing condition without pretending it is complete.
- If the circuit evaluator says `evaluator_powered=true`, it may explain why a complete loop allows current to flow and the bulb to glow.
- If the student asks something unrelated, politely steer back to the lesson.
- Never invent measurements, current/voltage values, component ratings, experiments, or unsupported curriculum facts.
- Never claim to control, test, or change the circuit. The student changes the circuit; the deterministic simulator evaluates it.
- Never ask for personal details or encourage unsafe experiments with mains electricity, exposed household wiring, wall outlets, batteries opened or punctured, or fire. Keep all activities within the low-voltage virtual simulation.
- If a question suggests immediate danger or a real electrical hazard, tell the student not to touch it and to get a teacher/adult.

### Curated lesson facts (source of truth for this first lesson)

- A battery is the energy source for the simple circuit.
- Wires provide a conducting path between components.
- A bulb changes electrical energy into light and heat.
- A complete conducting loop is needed for current to flow in this simple circuit.
- A gap or open switch breaks the path and stops current flow.
- Closing a correctly connected switch completes the path; opening it breaks the path.

Do not expand this first tutor into all of physics or other STEM subjects.

## Frontend experience

Add a contextual Spark panel to the existing Workbench, using the existing design system, inline SVG icon system, and translations. Do not redesign other screens.

The interaction should support:

1. Student enters a short question or taps a suggested prompt (e.g. “Why is my bulb off?” / “Give me a hint”).
2. The frontend sends the selected language, challenge, bounded message, and the **current result from the existing deterministic circuit evaluator** to FastAPI.
3. The UI shows clear loading, response, fallback/offline, and error states.
4. Spark renders `message`, `hint`, and `follow_up_question` as plain text.
5. A scripted contextual hint remains available when the backend is unreachable, AI is disabled, the API key is missing, or the app is offline.
6. Show a clear label that identifies AI-powered responses versus scripted/offline help; never pretend the fallback is AI.
7. Do not automatically send student text. Do not send on every circuit change. Only call the API after a deliberate student action.
8. Prevent duplicate submissions, provide a reasonable client timeout, support keyboard use, and use `aria-live="polite"` for response updates.
9. Add a short reminder: do not share personal information.
10. Do not keep a permanent chat transcript. Keep only what is needed for the current screen/session and clear it when the lesson/group is reset or changed.

Use existing English and Hindi dictionaries for all new user-visible strings. Add Hindi strings with `TODO-REVIEW` comments where translation needs native review. Do not hard-code UI copy inside the component.

## Circuit authority — non-negotiable

The existing TypeScript `evaluateCircuit()` remains the sole authority for circuit truth in the browser.

- AI must never decide whether the bulb is on/off, whether a circuit is complete, whether a challenge is complete, or how many stars to award.
- AI may only explain the evaluator result and the provided, bounded context.
- The UI must derive bulb glow, status chip, current-flow animation, challenge completion, and stars exclusively from deterministic circuit state.
- Add regression tests proving AI errors, malicious output, missing API configuration, or a mocked contradictory AI answer cannot change circuit state or completion.

## Event logging and Pulse Board

Reuse the existing local event log. Add only event metadata such as:

- `tutor_requested`
- `tutor_response_received`
- `tutor_fallback_used`

Each event should include the existing `groupId`, screen, timestamp, and challenge number where available. Do not store `student_message`, generated response text, API key, model payload, or raw exception. Update English/Hindi labels in the existing dictionaries. Ensure the Pulse Board remains useful and does not show raw child input.

## Offline behaviour

- Workbench circuit interaction must continue working offline exactly as it does now.
- The service worker must not cache authenticated or dynamic tutor POST responses, API keys, or error payloads.
- When offline, do not attempt repeated network calls; show the scripted local Spark fallback and an honest `Offline help` / equivalent label.
- Do not claim Gemini is available offline. Gemini responses require a network connection.

## Tests required

### Backend unit/API tests (mock provider; no real Gemini calls)

- Missing key / disabled AI returns a safe not-configured fallback state.
- Valid English request returns a response matching the schema.
- Valid Hindi request returns Hindi-language content from the mocked provider.
- Invalid language, lesson ID, challenge number, context bounds, or oversized input are rejected.
- Provider timeout, rate limit, safety block, quota error, malformed response, and 5xx become safe fallback/error results without leaking exception details.
- Provider dependency can be replaced with a fake in tests.
- Ensure requests and responses are not persisted in event logs.

### Frontend/unit tests

- Tutor submit is deliberate and sends the correct selected language and current circuit evaluator context.
- Loading state prevents duplicate submissions.
- Fallback is shown when offline or backend is unavailable, with a clear scripted-help label.
- AI response strings render as text, not HTML.
- AI cannot change bulb state, circuit status, challenge completion, score, or stars.
- New events contain metadata only, not prompt/response content.
- English/Hindi translations exist for all Spark UI states.

### E2E desktop tests

Keep the existing Chromium `desktop-1280` configuration and do not add mobile browser projects in this phase.

- With a mocked Gemini backend, test English and Hindi question/response flow.
- Verify circuit context sent to the API matches `evaluateCircuit()`.
- Verify the bulb stays off for an incomplete/open circuit even if the mocked AI claims it should glow.
- Verify no API key appears in browser environment or assets.
- Verify offline fallback while circuit building remains functional.
- Verify all existing classroom and offline E2E tests still pass and Playwright exits with code 0.

Tests must not require a real Gemini key or call Google's live API. Provide a separate optional manual smoke-test procedure for the developer to run after configuring a local key.

## Developer setup documentation

Update backend `.env.example` with placeholders only. Add concise setup instructions in the appropriate README/docs:

PowerShell example (run from `apps/api`):

```powershell
Copy-Item .env.example .env
notepad .env
```

Then add the key locally inside `apps/api/.env`:

```dotenv
SPARK_AI_ENABLED=true
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.8-flash
```

Do not paste a real key into chat, Codex prompts, screenshots, source code, Git commits, or the frontend. If the configured model ID is no longer stable/available at implementation time, use a current stable Flash model and update the docs. Keep the key in the local ignored `.env` only.

Document:

- How to start backend and frontend.
- How to test without a key (scripted fallback).
- How to configure a local key.
- How to run tests without calling Gemini.
- How to run an optional manual API smoke test.
- That AI features require internet, while the basic Workbench remains offline-capable.
- That AI output can be wrong and students should use teacher guidance.

## Scope exclusions

Do not add in this phase:

- Supabase, authentication, accounts, student profiles, or database storage.
- Persistent conversations or user tracking.
- Voice input/output or image upload.
- Google Search grounding, web browsing, tools, or agentic actions.
- New STEM topics beyond Electricity and Circuits.
- Any change to the deterministic circuit rules.
- Any redesign of the Mission, Explain, Quiz, Reflect, or Pulse Board screens except required shared navigation/state integration.
- Any new frontend provider key or `VITE_GEMINI_*` variable.

## Definition of done

Phase 7 is complete only when:

1. Gemini is called exclusively from FastAPI using `google-genai`.
2. No secret is present in frontend assets, browser requests, logs, or tracked files.
3. Spark provides context-aware English and Hindi guidance with a clear AI/fallback distinction.
4. Local scripted hints and the circuit lab work without network or API key.
5. AI cannot alter circuit state or learning scores.
6. Event log records metadata only and Pulse Board still works.
7. Backend tests, frontend tests, token audit, production build, and all existing desktop E2E tests pass with exit code 0.
8. New mocked English/Hindi AI E2E flows pass without a live key.
9. The developer can configure a local key using the documented `.env` procedure.
10. Codex reports exact files changed, commands run, tests passed/failed, screenshots captured, and any limitations. Do not claim a test passed unless its command exited with code 0.

## Codex workflow

1. Inspect and summarize architecture and current tests.
2. Propose a concise implementation plan and list expected files.
3. Implement backend config, provider service, API schema/route, safety handling, and mocked backend tests.
4. Implement the Workbench Spark UI and API client integration.
5. Add translations and metadata-only events.
6. Add fallback/offline handling and regression tests.
7. Run all verification commands and inspect screenshots.
8. Fix failures rather than skipping tests.
9. Finish with a concise implementation report and exact local setup instructions.

Do not start by asking the user for an API key. Build and test using a mocked provider first; the user will add their key locally after the code is ready.
