import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import test from 'node:test'

const html = readFileSync(new URL('../public/biology/index.html', import.meta.url), 'utf8')
const source = readFileSync(new URL('../public/biology/translations.js', import.meta.url), 'utf8')
const context = { window: {} as Record<string, any> }
runInNewContext(source, context)
const i18n = context.window.BIOLOGY_I18N

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
  throw new Error('Unclosed Biology module array')
}

const arrayStart = html.indexOf('const biologyModules=[') + 'const biologyModules='.length
assert.ok(arrayStart >= 'const biologyModules='.length)
const modulesEnd = matchingArrayEnd(html, arrayStart)
const modules = runInNewContext(`(${html.slice(arrayStart, modulesEnd)})`)
const slug = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const placeholders = (value: string) => [...value.matchAll(/\{([a-zA-Z0-9_]+)\}/g)].map((match) => match[1]).sort()
const livePlaceholders: Record<string, string[]> = {
  plant: ['settings'],
  diversity: ['settings'],
  'plant-compare': ['settings'],
  movement: ['joint'],
  classification: ['settings'],
  'life-cycle': ['settings'],
  photosynthesis: ['limiting', 'rate'],
  digestion: ['food'],
  respiration: ['activity', 'organism'],
  transport: ['settings'],
  'plant-reproduction': ['dispersal', 'stage'],
  forest: ['change'],
  cell: ['cell', 'labels', 'specific'],
  microbes: ['example'],
  'animal-reproduction': ['animal', 'stage'],
  adolescence: ['topic'],
  conservation: ['change', 'species'],
}

test('Biology English and Hindi common keys have exact parity', () => {
  assert.deepEqual(Object.keys(i18n.en.common).sort(), Object.keys(i18n.hi.common).sort())
  assert.deepEqual(Object.keys(i18n.en.common.sortValues).sort(), Object.keys(i18n.hi.common.sortValues).sort())
  for (const language of ['en', 'hi']) {
    for (const [key, value] of Object.entries(i18n[language].common)) {
      if (key === 'sortValues') continue
      assert.equal(typeof value, 'string', `${language}.common.${key} is a string`)
      assert.ok(value.trim(), `${language}.common.${key} is nonempty`)
    }
  }
})

test('all statically referenced Biology UI keys exist in both languages', () => {
  const keys = new Set([...html.matchAll(/biologyUi\(["']([^"']+)["']/g)].map((match) => match[1]))
  for (const key of keys) {
    for (const language of ['en', 'hi']) {
      assert.equal(typeof i18n[language].common[key], 'string', `${language}.common.${key} is defined`)
      assert.ok(i18n[language].common[key].trim(), `${language}.common.${key} is nonempty`)
    }
  }
})

test('all 17 Biology modules have complete, keyed Hindi learning content and quizzes', () => {
  assert.equal(modules.length, 17)
  assert.equal(Object.keys(i18n.hi.modules).sort().join('|'), [...modules].map((module: any) => module.id).sort().join('|'))
  for (const module of modules) {
    const translated = i18n.hi.modules[module.id]
    for (const field of ['title', 'short', 'intro', 'note', 'predict', 'observe', 'hint', 'learn', 'live']) {
      assert.equal(typeof translated[field], 'string', `${module.id}.${field} exists`)
      assert.ok(translated[field].trim(), `${module.id}.${field} is nonempty`)
      assert.match(translated[field], /[\u0900-\u097f]/, `${module.id}.${field} uses Devanagari`)
    }
    for (const field of ['predictionOptions', 'choices', 'diagram']) {
      const sourceValues = module[field === 'predictionOptions' ? 'predictOptions' : field]
      assert.equal(translated[field].length, sourceValues.length, `${module.id}.${field} length matches`)
      translated[field].forEach((value: string, index: number) => {
        assert.match(value, /[\u0900-\u097f]/, `${module.id}.${field}[${index}] uses Devanagari`)
      })
    }
    assert.equal(Object.keys(translated.controls).sort().join('|'), [...module.controls].map((control: any) => control.key).sort().join('|'), `${module.id} control IDs match`)
    for (const control of module.controls) {
      const localized = translated.controls[control.key]
      assert.ok(localized.label, `${module.id}.${control.key} label exists`)
      const values = [...(control.options ?? []), control.on, control.off].filter(Boolean)
      for (const value of values) {
        const translatedValue = localized.values[slug(value)]
        assert.ok(translatedValue, `${module.id}.${control.key}.${slug(value)} exists`)
        assert.match(translatedValue, /[\u0900-\u097f]/, `${module.id}.${control.key}.${slug(value)} uses Devanagari`)
      }
    }
    assert.equal(translated.quiz.length, module.quiz.length, `${module.id} question count matches`)
    assert.equal(translated.quiz.length, 10, `${module.id} has 10 questions`)
    translated.quiz.forEach((question: any, index: number) => {
      for (const field of ['question', 'why', 'hint']) {
        assert.match(question[field], /[\u0900-\u097f]/, `${module.id}.quiz[${index}].${field} uses Devanagari`)
      }
      assert.deepEqual(Object.keys(question.options).sort(), ['correct', 'distractor1', 'distractor2'])
      for (const [role, option] of Object.entries(question.options)) {
        assert.match(option as string, /[\u0900-\u097f]/, `${module.id}.quiz[${index}].${role} uses Devanagari`)
      }
      const sourceQuestion = module.quiz[index]
      assert.ok(Array.isArray(sourceQuestion) && typeof sourceQuestion[0] === 'string', `${module.id}.quiz[${index}] has a source question`)
    })
    assert.equal(placeholders(translated.live).join('|'), livePlaceholders[module.kind].sort().join('|'), `${module.id} live placeholders match its renderer`)
  }
})

test('Canvas translations avoid duplicate keys and preserve scientific tokens', () => {
  assert.equal(Object.keys(i18n.hi.canvas).filter((key) => key === 'roots').length, 1)
  for (const key of ['CO₂', 'light ↓', 'Modeled output', 'cell membrane', 'water + minerals · xylem']) {
    assert.ok(i18n.hi.canvas[key], `Canvas label ${key} is translated`)
  }
  assert.ok(html.includes('function biologyCanvasText'))
  assert.ok(html.includes('[[MISSING:canvas.'))
})

test('host language changes rerender active Biology views without resetting simulation or quiz state', () => {
  assert.match(html, /biologySparkState\.language=message\.payload\.language/)
  assert.match(html, /if\(state\.page==="home"\)renderBiologyHome\(\);/)
  assert.match(html, /else if\(state\.page==="quiz"\)renderBiologyQuiz\(\);/)
  assert.match(html, /else renderBiologyModule\(\);/)
  assert.match(html, /selectedRole==="correct"/)
  assert.match(html, /biologyState\.quizAnswers/)
  assert.ok(html.includes('biologyUi("animationRunning")'))
  assert.ok(html.includes('biologyUi("pausedReady")'))
})

test('Biology localization script loads before app code and is part of the offline shell', () => {
  const translationScript = html.indexOf('<script src="translations.js"></script>')
  const inlineAppScript = html.indexOf('<script>', translationScript + 1)
  const viteConfig = readFileSync(new URL('../vite.config.ts', import.meta.url), 'utf8')
  assert.ok(translationScript >= 0)
  assert.ok(inlineAppScript > translationScript)
  assert.ok(viteConfig.includes("'/biology/translations.js'"))
})

