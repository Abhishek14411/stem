import assert from 'node:assert/strict'
import test from 'node:test'
import { validateChemistryHostMessage } from '../src/lib/chemistry-protocol.ts'

test('accepts versioned Chemistry initialization and language updates', () => {
  for (const type of ['CHEMISTRY_HOST_INIT', 'CHEMISTRY_SET_LANGUAGE']) {
    for (const language of ['en', 'hi']) {
      const message = { version: 1, type, payload: { language } }
      assert.equal(validateChemistryHostMessage(message), message)
    }
  }
})

test('rejects invalid Chemistry messages and unexpected payload properties', () => {
  const valid = { version: 1, type: 'CHEMISTRY_SET_LANGUAGE', payload: { language: 'hi' } }
  const cases = [
    { ...valid, version: 2 },
    { ...valid, type: 'BIOLOGY_SET_LANGUAGE' },
    { ...valid, payload: { language: 'fr' } },
    { ...valid, payload: { language: 'hi', extra: true } },
    { ...valid, extra: true },
    null,
    [],
  ]
  for (const value of cases) assert.equal(validateChemistryHostMessage(value), null)
})
