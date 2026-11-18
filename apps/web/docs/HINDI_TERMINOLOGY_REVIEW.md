# Physics Hindi terminology review

This review list records terms used in the Physics Virtual Lab. Translations are prepared for this implementation; a Hindi speaking science educator should review them before classroom release. No native educator review has been completed yet.

## Translation Coverage Summary (Stage 3B Complete)

| Category | English Keys | Hindi Keys | Coverage |
| --- | --- | --- | --- |
| Common UI strings | 72 | 72 | 100% |
| Module content (14 modules × 8 fields) | 112 | 112 | 100% |
| Predictions (14 modules × 3 fields) | 42 | 42 | 100% |
| Observation checks (14 modules × 5 fields) | 70 | 70 | 100% |
| Quiz questions (3 grades × 3 questions × 6 fields) | 54 | 54 | 100% |
| Formula panels (14 modules × 6 fields × demos) | 186 | 186 | 100% |
| Canvas labels | 92 | 92 | 100% |
| Control labels & options | 54 | 54 | 100% |
| Metric labels (comparison cards) | 42 | 42 | 100% |
| Phrase keys (dynamic substitution) | 28 | 28 | 100% |
| **Total** | **752** | **752** | **100%** |

All automated translation audits pass. Language switching preserves experiment state (controls, predictions, comparisons, quiz state).

## Terminology Requiring Educator Review

| English | Hindi | Review Note |
| --- | --- | --- |
| Force | बल | Confirm age appropriate distinction between contact and non-contact forces. |
| Speed | चाल | Confirm distinction from velocity where used in school materials. |
| Distance | दूरी | Check consistency with the measurement lessons. |
| Motion | गति | Confirm examples are natural for Classes 6–8. |
| Heat | ऊष्मा | Confirm distinction from temperature. |
| Temperature | तापमान | Check thermometry labels and explanatory wording. |
| Reflection | परावर्तन | Check optics terminology, especially regular and scattered reflection. |
| Magnet | चुंबक | Review pole and attraction vocabulary. |
| Pressure | दाब | Check fluid and atmospheric pressure terminology. |
| Sound | ध्वनि | Review pitch, amplitude, infrasound and ultrasound. |
| Conductor / insulator | चालक / कुचालक | Check consistency across circuit and liquid conductivity modules. |
| Transparent / translucent / opaque | पारदर्शी / पारभासी / अपारदर्शी | Confirm distinctions remain clear to younger learners. |
| Virtual / real image | आभासी / वास्तविक प्रतिबिंब | Review with the mirror and lens lessons. |
| Epicentre / focus | अधिकेंद्र / उद्गम-केंद्र | Confirm earthquake vocabulary against local curriculum. |
| Atmospheric pressure | वायुमंडलीय दाब | Review the explanation for grade level. |
| Electroplating | विद्युत-लेपन | Confirm preferred textbook term and hyphenation. |
| Devanagari labels in Canvas | Mukta Devanagari font | Verify shaping and legibility on supported school devices. |

## Technical Implementation Notes

### Fixed Issues (Stage 3B)

1. **Observation panel explanations** — Removed hardcoded English `explanations` object from `index.html`; now uses `module.{id}.explanation` translation keys from `translations.js`.

2. **Comparison messages** — All messages in `saveComparison()`, `renderComparison()`, `snapshotModule()` use central dictionary keys (`common.settingASaved`, `common.settingsUnchanged`, `common.compareBelow`, etc.). Snapshots store raw control values (semantic IDs), not translated labels.

3. **Simulation status messages** — Run/Pause buttons, animation running, paused, ready-to-explore, investigation ready/prompt all use `tr()` with dictionary keys.

4. **Canvas text token matching** — Enhanced `canvasText()` in `translations.js`:
   - Normalizes mojibake (`Â·` → `·`, `Â²` → `²`, `Â°` → `°`)
   - Direct key match for exact canvas labels
   - Longest-first token boundary matching with word-boundary regex
   - Value-key translation for materials/states
   - Preserves numbers, units, formulas, punctuation

5. **Mixed-language strings** — Fixed "Opaque वस्तु" style corruption by ensuring compound canvas keys (e.g., "Opaque object" → "अपारदर्शी वस्तु") match before token-level replacement.

6. **Hardcoded canvas English** — Added missing canvas translation keys for: `distance (m)`, `time (s)`, `Common circuit symbols`, `bell`, `white light`, `spectrum · seven colours`.

7. **UTF-8 encoding** — Normalized middle dots and superscripts in `canvasText()`; canvas keys use proper Unicode `·`, `²`, `°`.

### Preserved Functionality

- Physics simulation algorithms unchanged
- Canvas calculations unchanged
- Scientific formulas unchanged
- Quiz/prediction correctness unchanged
- Experiment state preserved on language switch
- Spark AI architecture unchanged
- FastAPI endpoints unchanged
- Iframe communication security unchanged
- Pulse Board integration unchanged
- Design tokens unchanged

## Verification Results

| Test Suite | Result |
| --- | --- |
| Frontend unit tests (31 tests) | ✅ All pass |
| Desktop Playwright E2E (11 tests) | ✅ All pass |
| Backend Pytest (35 tests) | ✅ All pass |
| Ruff lint | ✅ Clean |
| Design token verification | ✅ Clean |
| Production build | ✅ Success |
| Translation key audit | ✅ Zero missing required strings |

## Files Modified

- `apps/web/public/physics/index.html` — Removed hardcoded `explanations` and `observationHints` objects
- `apps/web/public/physics/translations.js` — Enhanced `canvasText()` normalization; added missing canvas keys; fixed token boundary matching
- `apps/web/docs/HINDI_TERMINOLOGY_REVIEW.md` — This file updated with coverage summary

## Acceptance Criteria Met

- ✅ All 14 Physics modules fully bilingual
- ✅ Formula panels translated (titles, substitutions, results, meanings, examples, notes)
- ✅ Comparison messages translated (save, render, snapshot)
- ✅ Simulation status messages translated (run, pause, animation, ready, investigation)
- ✅ Observation explanations translated (all 14 modules)
- ✅ Canvas text translated without word corruption
- ✅ UTF-8 rendering correct (middle dots, superscripts)
- ✅ Language switching preserves experiment state
- ✅ Translation audit reports zero missing required strings
- ✅ All existing tests pass

## Remaining Educator Review Items

The 17 terminology items listed above require review by a Hindi-speaking science educator familiar with Classes 6–8 NCERT curriculum before classroom deployment. No code changes are needed for this review.