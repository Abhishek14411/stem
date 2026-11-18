import assert from 'node:assert/strict'
import test from 'node:test'
import { biologyOfflineHint } from '../src/content/biologyFallback.ts'
import { isBiologyLanguage, validateBiologyIframeMessage } from '../src/lib/biology-protocol.ts'

const modules = [
  [6, 'bio-plant-world'], [6, 'bio-diversity'], [6, 'bio-plant-exploring'],
  [6, 'bio-movement'], [6, 'bio-classification'], [6, 'bio-characteristics'],
  [7, 'bio-photosynthesis'], [7, 'bio-digestion'], [7, 'bio-respiration'],
  [7, 'bio-transport'], [7, 'bio-plant-repro'], [7, 'bio-forest'],
  [8, 'bio-cell'], [8, 'bio-microbes'], [8, 'bio-animal-reproduction'],
  [8, 'bio-adolescence'], [8, 'bio-conservation'],
] as const

function request(grade: number, moduleId: string, extra: Record<string, unknown> = {}) {
  return {
    version: 1,
    type: 'BIOLOGY_SPARK_REQUEST',
    payload: {
      requestId: 'bio-1732000000000-1',
      grade,
      moduleId,
      studentMessage: 'What should I observe?',
      experimentContext: { example: 'Plant' },
      ...extra,
    },
  }
}

test('accepts bounded Spark requests for all 17 Biology modules', () => {
  for (const [grade, moduleId] of modules) {
    const message = request(grade, moduleId)
    assert.equal(validateBiologyIframeMessage(message), message)
  }
})

test('rejects invalid protocol messages, grade mismatches, and unexpected properties', () => {
  const valid = request(6, 'bio-plant-world')
  const cases = [
    { ...valid, version: 2 },
    { ...valid, type: 'PHYSICS_CONTEXT_CHANGED' },
    { ...valid, payload: { ...valid.payload, grade: 8 } },
    { ...valid, payload: { ...valid.payload, moduleId: 'unknown' } },
    { ...valid, payload: { ...valid.payload, extra: true } },
    { ...valid, payload: { ...valid.payload, requestId: 'invalid' } },
    { ...valid, payload: { ...valid.payload, studentMessage: '   ' } },
    { ...valid, payload: { ...valid.payload, studentMessage: 'x'.repeat(801) } },
  ]
  for (const value of cases) assert.equal(validateBiologyIframeMessage(value), null)
})

test('rejects oversized, nested, non-finite, and oversized-string model context', () => {
  const valid = request(7, 'bio-photosynthesis')
  assert.equal(validateBiologyIframeMessage(request(7, 'bio-photosynthesis', {
    experimentContext: Object.fromEntries(Array.from({ length: 13 }, (_, index) => [`v${index}`, index])),
  })), null)
  assert.equal(validateBiologyIframeMessage(request(7, 'bio-photosynthesis', {
    experimentContext: { nested: { value: true } },
  })), null)
  assert.equal(validateBiologyIframeMessage(request(7, 'bio-photosynthesis', {
    experimentContext: { value: Number.POSITIVE_INFINITY },
  })), null)
  assert.equal(validateBiologyIframeMessage(request(7, 'bio-photosynthesis', {
    experimentContext: { value: 'x'.repeat(97) },
  })), null)
  assert.notEqual(validateBiologyIframeMessage(valid), null)
})

test('recognizes only English and Hindi host languages', () => {
  assert.equal(isBiologyLanguage('en'), true)
  assert.equal(isBiologyLanguage('hi'), true)
  assert.equal(isBiologyLanguage('fr'), false)
  assert.equal(isBiologyLanguage(null), false)
})

test('provides bilingual offline hints for all Biology modules and safe hazard guidance', () => {
  for (const [, moduleId] of modules) {
    const english = biologyOfflineHint(moduleId, 'en', 'Explain this model.')
    const hindi = biologyOfflineHint(moduleId, 'hi', 'इस मॉडल को समझाएँ।')
    assert.equal(english.status, 'fallback')
    assert.equal(hindi.status, 'fallback')
    assert.ok(english.message && english.hint && english.follow_up_question)
    assert.match(hindi.message, /[\u0900-\u097f]/)
  }
  assert.match(biologyOfflineHint('bio-microbes', 'en', 'Can I grow bacteria at home?').message, /Do not touch/)
  assert.match(biologyOfflineHint('bio-microbes', 'hi', 'क्या मैं इसे चख सकता हूँ?').message, /न छुएँ/)
})
