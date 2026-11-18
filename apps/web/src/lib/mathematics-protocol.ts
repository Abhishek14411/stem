export const MATHEMATICS_PROTOCOL_VERSION = 1 as const

export type MathematicsLanguage = 'en' | 'hi'

export type MathematicsHostMessage =
  | { version: 1; type: 'MATHEMATICS_HOST_INIT'; payload: { language: MathematicsLanguage } }
  | { version: 1; type: 'MATHEMATICS_SET_LANGUAGE'; payload: { language: MathematicsLanguage } }

export type MathematicsFrameMessage =
  | { version: 1; type: 'MATHEMATICS_READY'; payload: Record<string, never> }
  | { version: 1; type: 'MATHEMATICS_RUNTIME_ERROR'; payload: { message: string } }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasExactKeys(value: Record<string, unknown>, expected: string[]): boolean {
  const keys = Object.keys(value).sort()
  const ordered = [...expected].sort()
  return keys.length === ordered.length && keys.every((key, index) => key === ordered[index])
}

export function validateMathematicsHostMessage(value: unknown): MathematicsHostMessage | null {
  if (!isRecord(value) || value.version !== MATHEMATICS_PROTOCOL_VERSION || !isRecord(value.payload)) return null
  if (!hasExactKeys(value, ['version', 'type', 'payload']) || !hasExactKeys(value.payload, ['language'])) return null
  if (value.payload.language !== 'en' && value.payload.language !== 'hi') return null
  if (value.type !== 'MATHEMATICS_HOST_INIT' && value.type !== 'MATHEMATICS_SET_LANGUAGE') return null
  return value as MathematicsHostMessage
}

export function validateMathematicsFrameMessage(value: unknown): MathematicsFrameMessage | null {
  if (!isRecord(value) || value.version !== MATHEMATICS_PROTOCOL_VERSION || !isRecord(value.payload)) return null
  if (!hasExactKeys(value, ['version', 'type', 'payload'])) return null
  if (value.type === 'MATHEMATICS_READY' && hasExactKeys(value.payload, [])) {
    return value as MathematicsFrameMessage
  }
  if (
    value.type === 'MATHEMATICS_RUNTIME_ERROR'
    && hasExactKeys(value.payload, ['message'])
    && typeof value.payload.message === 'string'
    && value.payload.message.length <= 160
  ) {
    return value as MathematicsFrameMessage
  }
  return null
}
