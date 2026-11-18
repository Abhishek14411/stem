# SmartClass Buddy

**Offline-first STEM learning for Classes 6–8.** This complete starter focuses on Class 6–8 Physics: Electricity and Circuits. It includes the group picker, mission and prediction, the supplied four-slot Workbench experience, explanations, a five-question quiz, reflection, and the Pulse Board.

## What is included

- React + TypeScript + Vite frontend.
- One central design system at `apps/web/src/styles/smartclass-design-system.css`.
- Mukta font assets bundled locally through `@fontsource/mukta` (Latin and Devanagari subsets); no runtime Google Fonts request.
- Inline SVG icons for the battery, bulb, switch, wire, star, hint, reset, speaker and navigation controls.
- Four-slot circuit workbench based on `docs/reference/Workbench-reference.html`: drag-from-tray, tap-to-select/place, tap-to-toggle/remove, three sequential challenges and star progress.
- Pure `evaluateCircuit()` logic and Node unit tests.
- English and Hindi dictionaries. Hindi text is marked for educator review.
- Local event log for attempt, hint and complete events; the Pulse Board reads the same log.
- Service-worker app-shell precache for the built HTML, JavaScript, CSS, font assets and manifest.
- Original FastAPI health-only backend retained under `apps/api`.

## Requirements

- Windows 10/11 or macOS/Linux.
- Node.js 22.12+ and npm.
- Optional backend: Python 3.12+ and `uv`.

## Run the frontend

Open PowerShell in this project folder:

```powershell
cd apps\web
npm.cmd install
npm.cmd run dev
```

Open `http://127.0.0.1:5173`. The first screen is the group picker. Choose a group, make a prediction, and enter the Workbench.

## Verify the frontend

```powershell
cd apps\web
npm.cmd test
npm.cmd run verify:tokens
npm.cmd run build
```

The unit suite covers missing battery, missing bulb, missing gap, open switch, a complete closed circuit, two bulbs, and the open-then-close requirement in challenge three.

## Browser tests and screenshots

Build first, then install the Playwright Chromium browser once:

```powershell
cd apps\web
npm.cmd run build
npx playwright install chromium
npm.cmd run test:e2e
```

The browser test captures Group Picker, Mission/Predict, Workbench, Explain, Quiz, Reflect and Pulse Board in English and Hindi at 1280px desktop and 360px mobile widths. Screenshots are written to `artifacts/screenshots/` at the repository root. The test also checks sequential challenge completion and the built app-shell offline reopen flow.

## Offline behaviour

The production build generates `sw.js` with a precache list containing the app shell and emitted JS/CSS/font assets. Run the built app once online, allow the service worker to activate, and reload once. After this initial online visit, the app shell and bundled lesson flow can reopen offline. Student prediction, workbench progress, reflection and event log are stored locally in the browser. Cloud sync is not included. Spark AI is optional, requires an online FastAPI backend, and falls back to local scripted hints when unavailable.

To test offline support, use the Playwright offline test above or Chrome/Edge DevTools → Network → Offline after the service worker has activated.

## Run the optional FastAPI backend

In a second terminal:

```powershell
cd apps\api
uv sync
uv run uvicorn app.main:app --reload --port 8000
```

Health endpoint: `http://127.0.0.1:8000/api/v1/health`. The current learning flow does not require the API; offline learning works independently of it.

## Design system rules

Read `docs/design-system.md`. `apps/web/src/styles/smartclass-design-system.css` is the only token source. No new colours or sizes outside the tokens. Light theme only; body text is 18px minimum; no UI text below 16px; interactive targets are 56px minimum; motion animates only transform and opacity; status is communicated using icon plus text as well as colour.

## Safety and classroom use

The physical experiment guidance is intended for low-voltage battery-powered circuits only. Never connect student experiments to household mains electricity. Hindi content has a `TODO-REVIEW` note and must be checked by a Hindi educator before classroom use.

## Folder structure

```text
SmartClass-Buddy/
├── AGENTS.md
├── README.md
├── docs/
│   ├── PRODUCT_BRIEF.md
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── design-system.md
│   └── reference/Workbench-reference.html
└── apps/
    ├── web/
    │   ├── src/App.tsx
    │   ├── src/content/translations.ts
    │   ├── src/logic/circuit.ts
    │   ├── src/styles/smartclass-design-system.css
    │   ├── tests/circuit.test.ts
    │   └── e2e/
    └── api/
```

## Spark AI tutor (Phase 7)

The Workbench Spark panel can send a deliberate question to the optional FastAPI tutor. Basic circuit building and local scripted hints continue to work without a backend, API key, or internet. AI replies require internet and can be wrong; students should ask a teacher when uncertain. Prompts and replies are not stored in the learning event log.

Start the API from PowerShell:

```powershell
cd apps\api
uv sync
uv run uvicorn app.main:app --reload --port 8000
```

Start the frontend in another terminal:

```powershell
cd apps\web
npm.cmd run dev
```

Without a Gemini key, leave `SPARK_AI_ENABLED=false`; Spark uses scripted contextual help. To configure a local key:

```powershell
cd apps\api
Copy-Item .env.example .env
notepad .env
```

Set these values in the ignored local `apps/api/.env`:

```dotenv
SPARK_AI_ENABLED=true
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.8-flash
```

Never paste a key into chat, source code, screenshots, Git commits, or frontend configuration. The model is configurable; `gemini-3.8-flash` is listed as stable in the current Gemini model catalogue. API smoke test after configuring a key: start the API and use `/docs` to POST a valid request to `/api/v1/tutor/respond`; omit real student details. Tests use a fake provider and never call Google:

```powershell
cd apps\api
uv run pytest
uv run ruff check .
cd ..\web
npm.cmd test
npm.cmd run build
npm.cmd run verify:tokens
npm.cmd run test:e2e
```

Google API key guidance: https://ai.google.dev/gemini-api/docs/api-key
