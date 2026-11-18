export const BIOLOGY_PROTOCOL_VERSION = 1 as const

export type BiologyLanguage = 'en' | 'hi'
export type BiologyTutorModuleId =
  | 'bio-plant-world'
  | 'bio-diversity'
  | 'bio-plant-exploring'
  | 'bio-movement'
  | 'bio-classification'
  | 'bio-characteristics'
  | 'bio-photosynthesis'
  | 'bio-digestion'
  | 'bio-respiration'
  | 'bio-transport'
  | 'bio-plant-repro'
  | 'bio-forest'
  | 'bio-cell'
  | 'bio-microbes'
  | 'bio-animal-reproduction'
  | 'bio-adolescence'
  | 'bio-conservation'

export type BiologyTutorContext = {
  grade: 6 | 7 | 8
  moduleId: BiologyTutorModuleId
  studentMessage: string
  experimentContext: Record<string, string | number | boolean>
}

export type BiologyIframeMessage = {
  version: 1
  type: 'BIOLOGY_SPARK_REQUEST'
  payload: BiologyTutorContext & { requestId: string }
}

export type BiologyTutorReply = {
  message: string
  hint: string | null
  follow_up_question: string | null
  misconception_tag: string | null
  status: 'ok' | 'fallback'
}

export type BiologyHostMessage =
  | { version: 1; type: 'BIOLOGY_HOST_INIT'; payload: { language: BiologyLanguage } }
  | { version: 1; type: 'BIOLOGY_SET_LANGUAGE'; payload: { language: BiologyLanguage } }
  | {
      version: 1
      type: 'BIOLOGY_SPARK_RESPONSE'
      payload: { requestId: string; answer: BiologyTutorReply | null }
    }

const MODULE_GRADES: Record<BiologyTutorModuleId, 6 | 7 | 8> = {
  'bio-plant-world': 6,
  'bio-diversity': 6,
  'bio-plant-exploring': 6,
  'bio-movement': 6,
  'bio-classification': 6,
  'bio-characteristics': 6,
  'bio-photosynthesis': 7,
  'bio-digestion': 7,
  'bio-respiration': 7,
  'bio-transport': 7,
  'bio-plant-repro': 7,
  'bio-forest': 7,
  'bio-cell': 8,
  'bio-microbes': 8,
  'bio-animal-reproduction': 8,
  'bio-adolescence': 8,
  'bio-conservation': 8,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasExactKeys(value: Record<string, unknown>, expected: string[]): boolean {
  const keys = Object.keys(value).sort()
  const sortedExpected = [...expected].sort()
  return keys.length === sortedExpected.length && keys.every((key, index) => key === sortedExpected[index])
}

function validExperimentContext(value: unknown): value is BiologyTutorContext['experimentContext'] {
  if (!isRecord(value) || Object.keys(value).length > 12) return false
  for (const [key, item] of Object.entries(value)) {
    if (!/^[A-Za-z][A-Za-z0-9_-]{0,31}$/.test(key)) return false
    if (typeof item === 'string') {
      if (item.length > 96) return false
    } else if (typeof item === 'number') {
      if (!Number.isFinite(item) || Math.abs(item) > 1_000_000_000) return false
    } else if (typeof item !== 'boolean') {
      return false
    }
  }
  return true
}

export function validateBiologyIframeMessage(value: unknown): BiologyIframeMessage | null {
  if (!isRecord(value) || value.version !== BIOLOGY_PROTOCOL_VERSION || value.type !== 'BIOLOGY_SPARK_REQUEST' || !isRecord(value.payload)) return null
  const payload = value.payload
  if (!hasExactKeys(payload, ['requestId', 'grade', 'moduleId', 'studentMessage', 'experimentContext'])) return null
  if (typeof payload.requestId !== 'string' || !/^bio-[0-9]{1,16}-[0-9]{1,8}$/.test(payload.requestId)) return null
  if (typeof payload.moduleId !== 'string' || !(payload.moduleId in MODULE_GRADES)) return null
  if (payload.grade !== MODULE_GRADES[payload.moduleId as BiologyTutorModuleId]) return null
  if (typeof payload.studentMessage !== 'string' || !payload.studentMessage.trim() || payload.studentMessage.length > 800) return null
  if (!validExperimentContext(payload.experimentContext)) return null
  if (JSON.stringify(value).length > 2048) return null
  return value as BiologyIframeMessage
}

export function isBiologyLanguage(value: unknown): value is BiologyLanguage {
  return value === 'en' || value === 'hi'
}

