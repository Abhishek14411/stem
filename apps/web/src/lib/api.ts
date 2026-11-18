import type { BiologyTutorModuleId } from './biology-protocol'

export type TutorRequest = {
  language: 'en' | 'hi'
  grade_band: '6-8'
  lesson_id: 'electricity-circuits'
  challenge_number: number
  student_message: string
  circuit_context: {
    battery_present: boolean; bulb_count: number; wire_gaps: number
    switch_present: boolean; switch_open: boolean | null; evaluator_powered: boolean
  }
}
export type TutorResponse = { message: string; hint: string | null; follow_up_question: string | null; misconception_tag: string | null; status: 'ok' | 'fallback' }
export type PhysicsTutorRequest = {
  language: 'en' | 'hi'
  subject: 'physics'
  grade: 6 | 7 | 8
  module_id: string
  student_message: string
  experiment_context: Record<string, string | number | boolean>
}
export type BiologyTutorRequest = {
  language: 'en' | 'hi'
  subject: 'biology'
  grade: 6 | 7 | 8
  module_id: BiologyTutorModuleId
  student_message: string
  experiment_context: Record<string, string | number | boolean>
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'

function isTutorResponse(value: unknown): value is TutorResponse {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const result = value as Record<string, unknown>
  return typeof result.message === 'string' && result.message.length > 0 && result.message.length <= 500
    && (result.hint === null || typeof result.hint === 'string' && result.hint.length <= 240)
    && (result.follow_up_question === null || typeof result.follow_up_question === 'string' && result.follow_up_question.length <= 240)
    && (result.misconception_tag === null || typeof result.misconception_tag === 'string' && result.misconception_tag.length <= 64)
    && (result.status === 'ok' || result.status === 'fallback')
}

export async function requestSpark(payload: TutorRequest, signal?: AbortSignal): Promise<TutorResponse> {
  const response = await fetch(`${API_BASE}/api/v1/tutor/respond`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal,
  })
  if (!response.ok) throw new Error('Tutor service unavailable')
  return response.json() as Promise<TutorResponse>
}

export async function requestPhysicsSpark(payload: PhysicsTutorRequest, signal?: AbortSignal): Promise<TutorResponse> {
  const response = await fetch(`${API_BASE}/api/v1/tutor/physics/respond`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal,
  })
  if (!response.ok) throw new Error('Tutor service unavailable')
  return response.json() as Promise<TutorResponse>
}

export async function requestBiologySpark(payload: BiologyTutorRequest, signal?: AbortSignal): Promise<TutorResponse> {
  const response = await fetch(`${API_BASE}/api/v1/tutor/biology/respond`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal,
  })
  if (!response.ok) throw new Error('Biology tutor service unavailable')
  const result: unknown = await response.json()
  if (!isTutorResponse(result)) throw new Error('Biology tutor returned an invalid response')
  return result
}
