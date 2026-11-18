import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { runInNewContext } from 'node:vm'

const root = new URL('../public/mathematics/', import.meta.url)
const source = await readFile(new URL('index.html', root), 'utf8')
const translationSource = await readFile(new URL('translations.js', root), 'utf8')
const styles = await readFile(new URL('paper-lab.css', root), 'utf8')
const viteConfig = await readFile(new URL('../../vite.config.ts', root), 'utf8')
const runtime = { window: {} as Record<string, unknown> }
runInNewContext(translationSource, runtime)
const i18n = runtime.window.MATHEMATICS_I18N as {
  entries: Record<string, { en: string; hi: string }>
  activities: Record<string, Record<string, [string, string]>>
  translate: (text: string, language: 'en' | 'hi') => string
}

test('Mathematics dictionary entries have matching nonempty English and Hindi values', () => {
  assert.ok(Object.keys(i18n.entries).length > 150)
  for (const [key, entry] of Object.entries(i18n.entries)) {
    assert.ok(entry.en.trim(), `${key} has no English text`)
    assert.ok(entry.hi.trim(), `${key} has no Hindi text`)
    assert.equal(i18n.translate(entry.en, 'hi'), entry.hi, `${key} does not resolve to Hindi`)
  }
})

test('all 18 activities have bilingual titles, descriptions, instructions, and quick checks', async () => {
  const match = source.match(/const activities = \[([\s\S]*?)\n\];\s*const state/)
  assert.ok(match, 'the supplied 18-activity catalog is present')
  const activities = runInNewContext(`[${match[1]}]`) as Array<{
    id: number
    title: string
    desc: string
    instruction: string
    question: string
    controls: unknown[][]
  }>
  assert.equal(activities.length, 18)
  assert.equal(Object.keys(i18n.activities).length, 18)
  for (const activity of activities) {
    for (const [field, text] of [
      ['title', activity.title],
      ['description', activity.desc],
      ['instruction', activity.instruction],
      ['question', activity.question],
    ]) {
      const entry = i18n.activities[activity.id][field] as [string, string] | undefined
      assert.ok(entry, `${activity.id} ${field} has no bilingual entry`)
      assert.equal(entry[0], text, `${activity.id} ${field} source mismatch`)
      assert.ok(entry[1], `${activity.id} ${field} has no Hindi text`)
      assert.equal(i18n.translate(text, 'hi'), entry[1], `${activity.id} ${field} is not localized`)
    }

    for (const control of activity.controls) {
      const label = String(control[1])
      assert.notEqual(i18n.translate(label, 'hi'), label, `${activity.id} control label "${label}" is untranslated`)
      if (control[2] === 'select') {
        for (const option of control[3] as string[]) {
          if (/^\d+(?:\.\d+)?$/.test(option)) continue
          assert.notEqual(i18n.translate(option, 'hi'), option, `${activity.id} option "${option}" is untranslated`)
        }
      }
    }
  }
})

test('dynamic labels localize while formulas, numbers, and unit notation remain intact', () => {
  assert.equal(i18n.translate('Class 7 · Algebraic Expressions and Equations', 'hi'), 'कक्षा 7 · बीजीय व्यंजक और समीकरण')
  assert.equal(i18n.translate('Starting at -2, adding 5 gives 3.', 'hi'), '-2 से शुरू करके 5 जोड़ने पर 3 मिलता है।')
  assert.equal(i18n.translate('What is the distance between -2 and 3 on a number line?', 'hi'), 'संख्या रेखा पर -2 और 3 के बीच की दूरी कितनी है?')
  assert.equal(
    i18n.translate('A positive step moves right and a negative step moves left. Distance is always non-negative, so the distance from 2 to 5 is 3.', 'hi'),
    'धनात्मक कदम दाईं ओर और ऋणात्मक कदम बाईं ओर ले जाता है। दूरी हमेशा शून्य या उससे अधिक होती है; इसलिए 2 से 5 तक की दूरी 3 है।',
  )
  assert.equal(i18n.translate('Was $80', 'hi'), 'पहले $80')
  assert.equal(i18n.translate('Question 2 of 10', 'hi'), '10 में से प्रश्न 2')
  assert.equal(i18n.translate('· Getting started 2/10', 'hi'), '· शुरुआत करें 2/10')
  assert.equal(i18n.translate('Selected:', 'hi'), 'चुना गया मान:')
  assert.equal(i18n.translate('Side lengths and angles stay the same', 'hi'), 'भुजाओं की लंबाइयाँ और कोण समान रहते हैं')
  assert.equal(i18n.translate(', so the image and original are congruent.', 'hi'), ', इसलिए प्रतिबिंब और मूल आकृति सर्वांगसम हैं।')
  assert.equal(i18n.translate('5-sided polygon • centre shown on coordinate grid', 'hi'), '5 भुजाओं वाला बहुभुज • केंद्र निर्देशांक जाल पर दिखाया गया है')
  assert.equal(i18n.translate('2x + 1 = 7 cm²', 'hi'), '2x + 1 = 7 cm²')
  assert.equal(i18n.translate('Class 6 · Whole Numbers and Integers', 'en'), 'Class 6 · Whole Numbers and Integers')
})

test('Mathematics iframe loads shared tokens and local bilingual assets offline', () => {
  assert.match(source, /smartclass-design-tokens\.css/)
  assert.match(source, /mathematics\/paper-lab\.css/)
  assert.match(source, /mathematics\/translations\.js/)
  assert.match(styles, /var\(--paper\)/)
  assert.match(styles, /var\(--copper-dark\)/)
  assert.match(styles, /mukta-devanagari-400\.woff2/)
  assert.match(viteConfig, /'\/mathematics\/index\.html'/)
  assert.match(viteConfig, /'\/mathematics\/paper-lab\.css'/)
  assert.match(viteConfig, /'\/mathematics\/translations\.js'/)
  assert.match(viteConfig, /request\.method !== 'GET'/)
})
