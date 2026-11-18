export const PHYSICS_PROTOCOL_VERSION = 1 as const

export type PhysicsLanguage = 'en' | 'hi'
export type PhysicsActivityType = 'topic_opened' | 'prediction_submitted' | 'experiment_completed' | 'quiz_completed'

export type PhysicsLessonContext = {
  subject: 'physics'
  grade: 6 | 7 | 8
  moduleId: string
  moduleTitle: string
  experimentContext: Record<string, string | number | boolean>
}

export type PhysicsIframeMessage =
  | { version: 1; type: 'PHYSICS_READY'; payload: Record<string, never> }
  | { version: 1; type: 'PHYSICS_CONTEXT_CHANGED'; payload: PhysicsLessonContext }
  | { version: 1; type: 'PHYSICS_ACTIVITY_COMPLETED'; payload: PhysicsLessonContext & { activity: PhysicsActivityType } }

export type PhysicsHostMessage =
  | { version: 1; type: 'HOST_INIT'; payload: { language: PhysicsLanguage } }
  | { version: 1; type: 'SET_LANGUAGE'; payload: { language: PhysicsLanguage } }

const MODULES: Record<string, { grade: 6 | 7 | 8; title: string }> = {
  'motion-distance': { grade: 6, title: 'Motion and Measurement of Distances' },
  'light-shadow': { grade: 6, title: 'Light, Shadows and Reflections' },
  'electric-circuits': { grade: 6, title: 'Electricity and Circuits' },
  magnets: { grade: 6, title: 'Fun with Magnets' },
  heat: { grade: 7, title: 'Heat' },
  'motion-time': { grade: 7, title: 'Motion and Time' },
  'current-effects': { grade: 7, title: 'Electric Current and Its Effects' },
  light: { grade: 7, title: 'Light' },
  'electric-effects': { grade: 8, title: 'Electricity: Heating, Magnetic, and Chemical Effects' },
  forces: { grade: 8, title: 'Exploring Forces' },
  'pressure-weather': { grade: 8, title: 'Pressure, Winds, Storms, and Cyclones' },
  sound: { grade: 8, title: 'Sound' },
  'reflection-eye': { grade: 8, title: 'Light: Reflection and the Human Eye' },
  'natural-phenomena': { grade: 8, title: 'Some Natural Phenomena' },
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasExactKeys(value: Record<string, unknown>, expected: string[]): boolean {
  const actual = Object.keys(value).sort()
  return actual.length === expected.length && actual.every((key, index) => key === [...expected].sort()[index])
}

function validContext(value: unknown): value is PhysicsLessonContext {
  if (!isRecord(value) || !hasExactKeys(value, ['subject', 'grade', 'moduleId', 'moduleTitle', 'experimentContext'])) return false
  if (value.subject !== 'physics' || (value.grade !== 6 && value.grade !== 7 && value.grade !== 8)) return false
  if (typeof value.moduleId !== 'string' || !(value.moduleId in MODULES)) return false
  const module = MODULES[value.moduleId]
  if (module.grade !== value.grade || value.moduleTitle !== module.title) return false
  if (!isRecord(value.experimentContext) || Object.keys(value.experimentContext).length > 12) return false
  for (const [key, item] of Object.entries(value.experimentContext)) {
    if (!/^[a-z][a-z0-9_-]{0,31}$/i.test(key)) return false
    if (typeof item === 'string' ? item.length > 96 : typeof item !== 'number' && typeof item !== 'boolean') return false
    if (typeof item === 'number' && (!Number.isFinite(item) || Math.abs(item) > 1_000_000_000)) return false
  }
  return JSON.stringify(value).length <= 2048
}

export function validatePhysicsIframeMessage(value: unknown): PhysicsIframeMessage | null {
  if (!isRecord(value) || value.version !== PHYSICS_PROTOCOL_VERSION || typeof value.type !== 'string' || !isRecord(value.payload)) return null
  if (value.type === 'PHYSICS_READY') {
    return hasExactKeys(value.payload, []) ? value as PhysicsIframeMessage : null
  }
  if (value.type === 'PHYSICS_CONTEXT_CHANGED') {
    return validContext(value.payload) ? value as PhysicsIframeMessage : null
  }
  if (value.type === 'PHYSICS_ACTIVITY_COMPLETED') {
    if (!hasExactKeys(value.payload, ['subject', 'grade', 'moduleId', 'moduleTitle', 'experimentContext', 'activity'])) return null
    const { activity, ...context } = value.payload
    const allowed: PhysicsActivityType[] = ['topic_opened', 'prediction_submitted', 'experiment_completed', 'quiz_completed']
    return allowed.includes(activity as PhysicsActivityType) && validContext(context)
      ? value as PhysicsIframeMessage
      : null
  }
  return null
}

export function createPhysicsHostMessage(type: PhysicsHostMessage['type'], language: PhysicsLanguage): PhysicsHostMessage {
  return { version: PHYSICS_PROTOCOL_VERSION, type, payload: { language } }
}

export function isPhysicsLanguage(value: unknown): value is PhysicsLanguage {
  return value === 'en' || value === 'hi'
}
