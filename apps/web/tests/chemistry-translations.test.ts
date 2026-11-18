import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { runInNewContext } from 'node:vm'

const root = new URL('../public/chemistry/', import.meta.url)
const source = await readFile(new URL('index.html', root), 'utf8')
const translationSource = await readFile(new URL('translations.js', root), 'utf8')
const styles = await readFile(new URL('paper-lab.css', root), 'utf8')
const viteConfig = await readFile(new URL('../../vite.config.ts', root), 'utf8')
const runtime = { window: {} as Record<string, unknown> }
runInNewContext(translationSource, runtime)
const chemistryI18n = runtime.window.CHEMISTRY_I18N as {
  entries: Record<string, { en: string; hi: string }>
  translate: (text: string, language: 'en' | 'hi') => string
}

test('Chemistry translation entries have complete English and Hindi values', () => {
  assert.ok(Object.keys(chemistryI18n.entries).length > 150)
  for (const [key, entry] of Object.entries(chemistryI18n.entries)) {
    assert.ok(entry.en.trim(), `${key} has no English value`)
    assert.ok(entry.hi.trim(), `${key} has no Hindi value`)
    assert.equal(chemistryI18n.translate(entry.en, 'hi'), entry.hi, `${key} does not resolve to Hindi`)
  }
})

test('all 11 Chemistry modules have bilingual titles, introductions, predictions, and choices', () => {
  const match = source.match(/const modules\s*=\s*\[([\s\S]*?)\n\s*\];\s*const initial/)
  assert.ok(match, 'the source module catalog is present')
  const modules = runInNewContext(`[${match[1]}]`) as Array<{
    id: string
    title: string
    intro: string
    prediction: string
    choices: string[]
  }>
  assert.equal(modules.length, 11)
  for (const module of modules) {
    for (const [label, text] of [
      ['title', module.title],
      ['introduction', module.intro],
      ['prediction', module.prediction],
      ...module.choices.map((choice, index) => [`choice ${index + 1}`, choice] as const),
    ]) {
      const translated = chemistryI18n.translate(text, 'hi')
      assert.ok(!translated.startsWith('[[MISSING:'), `${module.id} ${label} is missing Hindi`)
    }
  }
})

test('all Chemistry control, option, status, and diagram values have Hindi labels', () => {
  const values = [
    'Glass', 'Wood', 'Rubber', 'Copper', 'Cotton', 'Plastic',
    'Evaporation', 'Condensation', 'Precipitation', 'Collection',
    'Handpicking', 'Winnowing', 'Filtration',
    'Air', 'Water', 'Soil', 'Rocks & minerals', 'Energy resources',
    'Sunlight', 'Wind', 'Coal', 'Petroleum', 'Natural gas', 'Copper mineral',
    'Lemon juice', 'Vinegar', 'Soap solution', 'Baking soda solution', 'Pure water',
    'Litmus', 'Universal indicator', 'Iron', 'Aluminium', 'Sulfur', 'Graphite', 'Brass (alloy)',
    'Rusting', 'Combustion (conceptual)', 'Melting ice', 'Cutting paper',
    'Solid', 'Liquid', 'Gas', 'Salt', 'Sugar', 'Food colouring', 'Cooking oil',
    'Salt water', 'Oil and water', 'Element', 'Compound', 'Uniform mixture', 'Non-uniform mixture',
    'Smooth', 'Shiny', 'Hard', 'Transparent', 'Insoluble', 'Grainy', 'Dull', 'Opaque',
    'Flexible', 'Lustrous', 'Soft', 'Absorbs water', 'Often shiny', 'Variable', 'Often opaque',
    'Usually insoluble', 'Acidic', 'Basic', 'Neutral', 'Renewable', 'Non-renewable',
    'Nitrogen', 'Oxygen', 'Argon + other gases', 'Topsoil', 'Subsoil', 'Weathered rock',
    'Bedrock', 'Granite', 'Quartz', 'Copper ore', 'Ice', 'Vapour',
  ]
  for (const value of values) {
    assert.ok(!chemistryI18n.translate(value, 'hi').startsWith('[[MISSING:'), `${value} has no Hindi display value`)
  }
  assert.equal(chemistryI18n.translate('Air flow 50% · mixture amount 55%', 'hi'), 'वायु प्रवाह 50% · मिश्रण की मात्रा 55%')
  assert.equal(chemistryI18n.translate('Class 7 · Curiosity', 'hi'), 'कक्षा 7 · जिज्ञासा')
})

test('translation changes display only and retains raw option values in the iframe source', () => {
  assert.match(source, /option value="\$\{esc\(x\)\}"/)
  assert.match(source, /language=event\.data\.payload\.language/)
  assert.match(source, /event\.source!==window\.parent/)
  assert.match(source, /event\.origin!==window\.location\.origin/)
  assert.match(source, /state\[id\]=\{\.\.\.initial\[id\],prediction:"",observation:"",attempted:false\}/)
  assert.match(translationSource, /window\.CHEMISTRY_I18N = \{ version: 1, entries: bilingualEntries, byEnglish, translate \}/)
})

test('Chemistry uses shared design tokens, local Mukta fonts, and offline GET precaching', () => {
  assert.match(source, /smartclass-design-tokens\.css/)
  assert.match(source, /paper-lab\.css/)
  assert.match(source, /translations\.js/)
  assert.match(styles, /var\(--paper\)/)
  assert.match(styles, /var\(--copper-dark\)/)
  assert.match(styles, /mukta-devanagari-400\.woff2/)
  assert.match(viteConfig, /'\/chemistry\/index\.html'/)
  assert.match(viteConfig, /'\/chemistry\/paper-lab\.css'/)
  assert.match(viteConfig, /'\/chemistry\/translations\.js'/)
  assert.match(viteConfig, /request\.method !== 'GET'/)
})
