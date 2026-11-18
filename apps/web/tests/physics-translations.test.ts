import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import test from 'node:test'

const html = readFileSync(new URL('../public/physics/index.html', import.meta.url), 'utf8')
const source = readFileSync(new URL('../public/physics/translations.js', import.meta.url), 'utf8')
const context = { window: {}, console: { error: () => undefined } }
runInNewContext(source, context)
const i18n = context.window.PHYSICS_I18N
const moduleStart = html.indexOf('const modules = [') + 'const modules = '.length
function matchingArrayEnd(text: string, start: number) {
  let depth = 0
  let quote = ''
  let escaped = false
  for (let index = start; index < text.length; index++) {
    const char = text[index]
    if (quote) {
      if (escaped) escaped = false
      else if (char === '\\') escaped = true
      else if (char === quote) quote = ''
      continue
    }
    if (char === '"' || char === "'" || char === '`') { quote = char; continue }
    if (char === '[') depth++
    if (char === ']' && --depth === 0) return index + 1
  }
  throw new Error('Unclosed module array')
}
const moduleEnd = matchingArrayEnd(html, moduleStart)
const modules = runInNewContext(`(${html.slice(moduleStart, moduleEnd)})`, { vals: () => ({}) })

test('English and Hindi dictionaries contain matching nonempty values', () => {
  const keys = Object.keys(i18n.dictionaries.en)
  assert.ok(keys.length > 0)
  assert.equal(i18n.audit(keys).length, 0)
  for (const language of ['en', 'hi']) {
    for (const [key, value] of Object.entries(i18n.dictionaries[language])) {
      assert.equal(typeof value, 'string', `${language}.${key} is a string`)
      assert.ok(value.trim(), `${language}.${key} is not empty`)
    }
  }
})

test('all 14 module IDs have titles, descriptions, predictions, observations, explanations, and hints', () => {
  assert.equal(i18n.moduleIds.length, 14)
  const fields = ['title', 'short', 'intro', 'observation', 'note', 'learn', 'hint', 'explanation']
  for (const id of i18n.moduleIds) for (const language of ['en', 'hi']) {
    for (const field of fields) assert.ok(i18n.dictionaries[language][`module.${id}.${field}`], `${language}.${id}.${field}`)
    for (const section of ['prediction', 'check']) {
      for (const suffix of ['question', 'option.0', 'option.1']) assert.ok(i18n.dictionaries[language][`module.${id}.${section}.${suffix}`], `${language}.${id}.${section}.${suffix}`)
    }
    if (language === 'en') assert.ok(i18n.dictionaries.en[`module.${id}.check.feedback`])
    else assert.ok(i18n.dictionaries.hi[`module.${id}.check.feedback`])
  }
})

test('every supplied module control label and choice has an audited translation key', () => {
  for (const module of modules) for (const control of module.controls) {
    for (const value of [control.label, ...(control.options ?? []), ...(control.type === 'toggle' ? [control.on, control.off] : [])]) {
      for (const language of ['en', 'hi']) assert.ok(i18n.dictionaries[language][`value.${value}`], `${language}.value.${value}`)
    }
  }
})

test('all three class quizzes have localized questions, choices, and explanations', () => {
  for (const grade of [6, 7, 8]) for (let question = 0; question < 3; question++) {
    for (const suffix of ['question', 'option.0', 'option.1', 'option.2', 'option.3', 'feedback']) {
      const key = `quiz.${grade}.${question}.${suffix}`
      for (const language of ['en', 'hi']) assert.ok(i18n.dictionaries[language][key], `${language}.${key}`)
    }
  }
  const canvasLabels = Object.keys(i18n.dictionaries.en).filter(key => key.startsWith('canvas.'))
  assert.ok(canvasLabels.length >= 70, `expected broad canvas-label coverage, got ${canvasLabels.length}`)
})

test('static and explicitly keyed common UI strings resolve in both languages', () => {
  const keys = new Set([...html.matchAll(/data-i18n="([^"]+)"|data-i18n-aria="([^"]+)"|tr\('([^']+)'\)/g)].flatMap(match => [match[1], match[2], match[3]].filter(Boolean)))
  for (const key of keys) for (const language of ['en', 'hi']) {
    const value = i18n.dictionaries[language][key]
    assert.ok(value, `${language}.${key}`)
    assert.ok(!value.startsWith('[[MISSING:'), `${language}.${key} is not a missing-key marker`)
  }
})

test('Hindi lookup never silently substitutes English for a missing key', () => {
  const missing = i18n.lookup('hi', 'module.missing.title')
  assert.equal(missing, '[[MISSING:module.missing.title]]')
})

test('all 14 modules have formula keys (rule, sub, res, meaning, example, note) for all demos', () => {
  const formulaGroups: Record<string, string[]> = {
    'motion-distance': [''],
    'light-shadow': ['.mirror', '.pinhole', '.shadow'],
    'electric-circuits': [''],
    'magnets': [''],
    'heat': [''],
    'motion-time': [''],
    'current-effects': ['.heating', '.symbols', '.magnetic'],
    'light': ['.prism', '.mirror', '.diverging', '.curved'],
    'electric-effects': [''],
    'forces': ['.push', '.other'],
    'pressure-weather': ['.surface', '.fluid', '.cyclone', '.wind'],
    'sound': [''],
    'reflection-eye': [''],
    'natural-phenomena': ['.earthquake', '.rubbing', '.interaction', '.lightning'],
  }
  const suffixes = ['rule', 'sub', 'res', 'meaning', 'example', 'note']
  for (const [moduleId, demos] of Object.entries(formulaGroups)) {
    for (const demo of demos) {
      for (const suffix of suffixes) {
        const key = `formula.${moduleId}${demo}.${suffix}`
        for (const language of ['en', 'hi']) {
          const val = i18n.dictionaries[language][key]
          assert.ok(val && val.trim(), `${language}.${key} must be non-empty`)
          assert.ok(!val.startsWith('[[MISSING:'), `${language}.${key} must not be missing`)
        }
      }
    }
  }
})

test('comparison and status message keys exist and are non-empty in both languages', () => {
  const statusKeys = [
    'common.settingASaved', 'common.settingsUnchanged', 'common.compareBelow',
    'common.compareHeading', 'common.settingA', 'common.settingB',
    'common.saveSetting', 'common.savedSetting', 'common.compare', 'common.anotherSetting',
    'common.animationRunning', 'common.pausedExplore', 'common.readyExplore',
    'common.investigationReady', 'common.changeBeforeAnswer',
  ]
  for (const key of statusKeys) {
    for (const language of ['en', 'hi']) {
      const val = i18n.dictionaries[language][key]
      assert.ok(val && val.trim(), `${language}.${key} must be non-empty`)
    }
  }
})

test('phrase keys used in dynamic formula substitution are non-empty in both languages', () => {
  const phraseKeys = [
    'phrase.shadowDark', 'phrase.shadowDimmer', 'phrase.shadowLittle',
    'phrase.circuitComplete', 'phrase.circuitIncomplete',
    'phrase.attracting', 'phrase.repelling', 'phrase.sampleAttracted', 'phrase.sampleNotAttracted',
    'phrase.depositing', 'phrase.notDepositing',
    'phrase.contact', 'phrase.nonContact',
    'phrase.infrasound', 'phrase.ultrasound', 'phrase.audible', 'phrase.noMedium',
    'phrase.on', 'phrase.off', 'phrase.closed', 'phrase.open',
    'phrase.conductor', 'phrase.insulator',
  ]
  for (const key of phraseKeys) {
    for (const language of ['en', 'hi']) {
      const val = i18n.dictionaries[language][key]
      assert.ok(val && val.trim(), `${language}.${key} must be non-empty`)
    }
  }
})

test('canvasText token boundary fix: "centimetre" does not get corrupted by "time" substitution', () => {
  const result = i18n.canvasText('hi', 'centimetre')
  // 'time' (समय) must not appear inside 'centimetre' — the word 'centimetre' has no canvas key
  // so it should come back as-is (not corrupted into cenसमयtre or similar)
  assert.ok(!result.includes('समय'), `canvasText('hi','centimetre') must not corrupt word boundary: got "${result}"`)
})

test('canvasText correctly translates standalone Hindi canvas labels', () => {
  // Direct canvas key match
  const time = i18n.canvasText('hi', 'time')
  assert.equal(time, 'समय', `canvasText time should return Hindi`)
  // Iron (a value key) should translate
  const iron = i18n.canvasText('hi', 'Iron')
  assert.equal(iron, 'लोहा', `canvasText Iron should return Hindi`)
  // English pass-through
  const unchanged = i18n.canvasText('en', 'time')
  assert.equal(unchanged, 'time', `canvasText in English should return as-is`)
})

test('Hindi mode does not expose [[MISSING:...]] markers for required formula keys', () => {
  const formulaKeys = Object.keys(i18n.dictionaries.en).filter(k => k.startsWith('formula.'))
  for (const key of formulaKeys) {
    const val = i18n.dictionaries.hi[key]
    assert.ok(val && !val.startsWith('[[MISSING:'), `hi.${key} must not be missing`)
  }
})

test('metric keys used in comparison cards exist for all modules', () => {
  const metricKeys = Object.keys(i18n.dictionaries.en).filter(k => k.startsWith('metric.'))
  assert.ok(metricKeys.length >= 20, `expected at least 20 metric keys, got ${metricKeys.length}`)
  for (const key of metricKeys) {
    for (const language of ['en', 'hi']) {
      const val = i18n.dictionaries[language][key]
      assert.ok(val && val.trim(), `${language}.${key} must be non-empty`)
    }
  }
})

test('canvasText normalizes middle dots and malformed encoded middle dots', () => {
  assert.equal(i18n.canvasText('hi', 'periodic · back and forth'), 'आवर्ती · आगे-पीछे')
  assert.equal(i18n.canvasText('hi', 'periodic  Â·  back and forth'), 'आवर्ती · आगे-पीछे')
  assert.equal(i18n.canvasText('hi', 'Tools: ruler  ·  measuring tape  ·  metre scale'), 'उपकरण: पैमाना · मापने का फीता · मीटर पैमाना')
})

test('canvasText preserves numbers units formulas and punctuated scientific text', () => {
  assert.equal(i18n.canvasText('hi', 'centimetre'), 'centimetre')
  assert.equal(i18n.canvasText('hi', 'time'), 'समय')
  assert.equal(i18n.canvasText('hi', 'slope = speed = 2.5 m/s'), 'ढलान = चाल = 2.5 m/s')
  assert.equal(i18n.canvasText('hi', 'Cool reference: 20 °C · Warm sample: 50 °C'), 'ठंडा संदर्भ: 20 °C · गर्म नमूना: 50 °C')
})

test('canvasText translates exact compounds without mixed-language noun suffixes', () => {
  assert.equal(i18n.canvasText('hi', 'Opaque object'), 'अपारदर्शी वस्तु')
  assert.equal(i18n.canvasText('hi', 'Dark surface · absorbs more radiation'), 'गहरी सतह · अधिक विकिरण सोखती है')
  assert.equal(i18n.canvasText('hi', 'Low-pressure centre'), 'निम्न-दाब केंद्र')
})

test('formula placeholders and formula language switching remain supported', () => {
  assert.match(i18n.lookup('en', 'formula.motion-distance.sub', { distance: 8, speed: 3, lap: '2.67', t: '1.00', phase: '0.375', position: '3.00' }), /8 m/)
  const hindi = i18n.lookup('hi', 'formula.motion-distance.sub', { distance: 8, speed: 3, lap: '2.67', t: '1.00', phase: '0.375', position: '3.00' })
  assert.match(hindi, /फेज़/)
  assert.match(hindi, /स्थिति/)
  assert.doesNotMatch(hindi, /\[\[MISSING:/)
})

test('comparison snapshot and refresh implementation uses raw values and translated display output', () => {
  assert.match(html, /controlValues\[c\.key\]=v\[c\.key\]/)
  assert.match(html, /function formatSnapshot\(m,snapshot\)/)
  assert.match(html, /tr\('metric\.'\+label\)/)
  assert.match(html, /displayMetricValue\(value\)/)
  assert.match(html, /comparison\.second=snapshot/)
})

test('run pause and observation statuses use translated keys', () => {
  for (const key of ['common.animationRunning', 'common.pausedExplore', 'common.readyExplore', 'common.investigationReady', 'common.changeBeforeAnswer']) {
    assert.ok(i18n.dictionaries.hi[key])
  }
  assert.match(html, /tr\('common\.pause'\)/)
  assert.match(html, /tr\('common\.run'\)/)
  assert.match(html, /tr\('common\.animationRunning'\)/)
  assert.match(html, /tr\('common\.pausedExplore'\)/)
})
