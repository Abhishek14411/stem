import assert from 'node:assert/strict'
import test from 'node:test'
import { validatePhysicsIframeMessage } from '../src/lib/physics-protocol.ts'

const modules = [
  [6, 'motion-distance', 'Motion and Measurement of Distances'],
  [6, 'light-shadow', 'Light, Shadows and Reflections'],
  [6, 'electric-circuits', 'Electricity and Circuits'],
  [6, 'magnets', 'Fun with Magnets'],
  [7, 'heat', 'Heat'],
  [7, 'motion-time', 'Motion and Time'],
  [7, 'current-effects', 'Electric Current and Its Effects'],
  [7, 'light', 'Light'],
  [8, 'electric-effects', 'Electricity: Heating, Magnetic, and Chemical Effects'],
  [8, 'forces', 'Exploring Forces'],
  [8, 'pressure-weather', 'Pressure, Winds, Storms, and Cyclones'],
  [8, 'sound', 'Sound'],
  [8, 'reflection-eye', 'Light: Reflection and the Human Eye'],
  [8, 'natural-phenomena', 'Some Natural Phenomena'],
] as const

function context(grade: number, moduleId: string, moduleTitle: string, experimentContext: object = {}) {
  return { subject: 'physics', grade, moduleId, moduleTitle, experimentContext }
}

test('accepts context messages for all 14 allowlisted Physics modules', () => {
  for (const [grade, moduleId, moduleTitle] of modules) {
    const message = { version: 1, type: 'PHYSICS_CONTEXT_CHANGED', payload: context(grade, moduleId, moduleTitle, { speed: 4 }) }
    assert.equal(validatePhysicsIframeMessage(message), message)
  }
})

test('accepts only version 1 ready and allowlisted activity messages', () => {
  assert.deepEqual(validatePhysicsIframeMessage({ version: 1, type: 'PHYSICS_READY', payload: {} }), {
    version: 1, type: 'PHYSICS_READY', payload: {},
  })
  const valid = { version: 1, type: 'PHYSICS_ACTIVITY_COMPLETED', payload: { ...context(7, 'heat', 'Heat'), activity: 'experiment_completed' } }
  assert.equal(validatePhysicsIframeMessage(valid), valid)
})

test('rejects invalid versions, types, grades, module IDs and mismatched titles', () => {
  const base = { version: 1, type: 'PHYSICS_CONTEXT_CHANGED', payload: context(7, 'heat', 'Heat') }
  const cases = [
    { ...base, version: 2 },
    { ...base, type: 'UNEXPECTED' },
    { ...base, payload: { ...base.payload, grade: 9 } },
    { ...base, payload: { ...base.payload, grade: 6 } },
    { ...base, payload: { ...base.payload, moduleId: 'unknown' } },
    { ...base, payload: { ...base.payload, moduleTitle: 'Electricity' } },
    { ...base, payload: { ...base.payload, extra: true } },
  ]
  for (const message of cases) assert.equal(validatePhysicsIframeMessage(message), null)
})

test('rejects oversized, nested, or non-finite experiment context and unknown activity kinds', () => {
  const base = { version: 1, type: 'PHYSICS_CONTEXT_CHANGED', payload: context(7, 'heat', 'Heat') }
  assert.equal(validatePhysicsIframeMessage({ ...base, payload: { ...base.payload, experimentContext: { controls: { temperature: 90 } } } }), null)
  assert.equal(validatePhysicsIframeMessage({ ...base, payload: { ...base.payload, experimentContext: Object.fromEntries(Array.from({ length: 13 }, (_, i) => [`v${i}`, i])) } }), null)
  assert.equal(validatePhysicsIframeMessage({ ...base, payload: { ...base.payload, experimentContext: { temperature: Number.NaN } } }), null)
  assert.equal(validatePhysicsIframeMessage({
    version: 1, type: 'PHYSICS_ACTIVITY_COMPLETED', payload: { ...base.payload, activity: 'score_changed' },
  }), null)
})
