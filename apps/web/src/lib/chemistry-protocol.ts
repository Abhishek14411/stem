export const CHEMISTRY_PROTOCOL_VERSION = 1 as const

export type ChemistryLanguage = 'en' | 'hi'
export type ChemistryHostMessage =
  | { version: 1; type: 'CHEMISTRY_HOST_INIT'; payload: { language: ChemistryLanguage } }
  | { version: 1; type: 'CHEMISTRY_SET_LANGUAGE'; payload: { language: ChemistryLanguage } }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function validateChemistryHostMessage(value: unknown): ChemistryHostMessage | null {
  if (!isRecord(value) || value.version !== CHEMISTRY_PROTOCOL_VERSION || !isRecord(value.payload)) return null
  const keys = Object.keys(value).sort()
  if (keys.length !== 3 || keys[0] !== 'payload' || keys[1] !== 'type' || keys[2] !== 'version') return null
  const payload = value.payload
  if (Object.keys(payload).length !== 1 || !('language' in payload)) return null
  if (payload.language !== 'en' && payload.language !== 'hi') return null
  if (value.type !== 'CHEMISTRY_HOST_INIT' && value.type !== 'CHEMISTRY_SET_LANGUAGE') return null
  return value as ChemistryHostMessage
}
