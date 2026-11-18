import assert from 'node:assert/strict'
import test from 'node:test'
import {
  validateMathematicsFrameMessage,
  validateMathematicsHostMessage,
} from '../src/lib/mathematics-protocol.ts'

test('Mathematics accepts only versioned English and Hindi host language messages', () => {
  for (const language of ['en', 'hi'] as const) {
    const message = { version: 1, type: 'MATHEMATICS_SET_LANGUAGE', payload: { language } }
    assert.deepEqual(validateMathematicsHostMessage(message), message)
  }
  assert.equal(validateMathematicsHostMessage({
    version: 1,
    type: 'MATHEMATICS_HOST_INIT',
    payload: { language: 'fr' },
  }), null)
})

test('Mathematics host validation rejects unexpected payloads and protocol types', () => {
  assert.equal(validateMathematicsHostMessage({
    version: 1,
    type: 'MATHEMATICS_HOST_INIT',
    payload: { language: 'en', navigation: 'biology' },
  }), null)
  assert.equal(validateMathematicsHostMessage({
    version: 1,
    type: 'BIOLOGY_SET_LANGUAGE',
    payload: { language: 'hi' },
  }), null)
  assert.equal(validateMathematicsHostMessage({
    version: 2,
    type: 'MATHEMATICS_SET_LANGUAGE',
    payload: { language: 'en' },
  }), null)
})

test('Mathematics frame messages are bounded and strictly typed', () => {
  assert.deepEqual(validateMathematicsFrameMessage({
    version: 1,
    type: 'MATHEMATICS_READY',
    payload: {},
  }), { version: 1, type: 'MATHEMATICS_READY', payload: {} })
  assert.deepEqual(validateMathematicsFrameMessage({
    version: 1,
    type: 'MATHEMATICS_RUNTIME_ERROR',
    payload: { message: 'A Mathematics activity runtime error occurred.' },
  }), {
    version: 1,
    type: 'MATHEMATICS_RUNTIME_ERROR',
    payload: { message: 'A Mathematics activity runtime error occurred.' },
  })
  assert.equal(validateMathematicsFrameMessage({
    version: 1,
    type: 'MATHEMATICS_RUNTIME_ERROR',
    payload: { message: 'x'.repeat(161) },
  }), null)
  assert.equal(validateMathematicsFrameMessage({
    version: 1,
    type: 'MATHEMATICS_READY',
    payload: { extra: true },
  }), null)
})
