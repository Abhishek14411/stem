import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon, type IconName } from './components/Icon'
import { copy, type Language } from './content/translations'
import { evaluateCircuit, isChallengeComplete, type CircuitSlots, type PartName } from './logic/circuit'
import { requestSpark, type TutorResponse } from './lib/api'
import PhysicsModuleFrame from './components/PhysicsModuleFrame'
import BiologyModuleFrame from './components/BiologyModuleFrame'
import ChemistryModuleFrame from './components/ChemistryModuleFrame'
import MathematicsModuleFrame from './components/MathematicsModuleFrame'
import type { PhysicsActivityType, PhysicsLessonContext } from './lib/physics-protocol'
import PhysicsSparkPanel from './components/PhysicsSparkPanel'

type Screen = 'groups' | 'subjects' | 'physics' | 'chemistry' | 'biology' | 'mathematics' | 'mission' | 'workbench' | 'explain' | 'quiz' | 'reflect' | 'pulse'
type EventType = 'attempt' | 'hint' | 'complete' | 'battery_placed' | 'bulb_placed' | 'wire_connected' | 'switch_opened' | 'switch_closed' | 'hint_requested' | 'challenge_completed' | 'quiz_answered' | 'quiz_completed' | 'reflection_saved' | 'prediction_saved' | 'part_removed' | 'board_reset' | 'tutor_requested' | 'tutor_response_received' | 'tutor_fallback_used' | 'physics_topic_opened' | 'physics_activity_completed'
type LearningEvent = { id: string; type: EventType; screen: Screen; groupId: string; detail: string; at: string; challenge?: number; question?: number; answer?: number }
type EventLogger = (type: EventType, screen: Screen, detail: string, challenge?: number, metadata?: { question?: number; answer?: number }) => void
const GROUPS = ['A', 'B', 'C', 'D']
const SLOT_POINTS = [{ x: 300, y: 70 }, { x: 520, y: 190 }, { x: 300, y: 310 }, { x: 80, y: 190 }]
const PARTS: PartName[] = ['battery', 'bulb', 'switch', 'wire']
const stages: Screen[] = ['mission', 'workbench', 'explain', 'quiz', 'reflect']

function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch { return fallback }
}
function writeStored(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage may be disabled */ }
}

function AppHeader({ language, onLanguage, onPulse, onGroups, t }: {
  language: Language; onLanguage: (language: Language) => void; onPulse: () => void; onGroups: () => void; t: typeof copy.en
}) {
  const [online, setOnline] = useState(() => navigator.onLine)
  useEffect(() => {
    const onlineNow = () => setOnline(true)
    const offlineNow = () => setOnline(false)
    window.addEventListener('online', onlineNow)
    window.addEventListener('offline', offlineNow)
    return () => { window.removeEventListener('online', onlineNow); window.removeEventListener('offline', offlineNow) }
  }, [])
  const speak = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(document.querySelector('main')?.textContent ?? t.brand)
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN'
    window.speechSynthesis.speak(utterance)
  }
  return <header className="app-header">
    <div className="brand">
      <div className="brand-mark"><Icon name="spark" size={26} /></div>
      <div className="brand-copy"><span className="brand-name">{t.brand}</span><span className="brand-subject">{t.subject}</span></div>
    </div>
    <div className="header-actions">
      <span className={`status-chip ${online ? 'ok' : 'work'}`} aria-live="polite"><Icon name={online ? 'check' : 'pulse'} size={16} />{online ? t.online : t.offlineStatus}</span>
      <div className="language-switch" aria-label={t.language}>
        <button type="button" aria-pressed={language === 'en'} onClick={() => onLanguage('en')}>EN</button>
        <button type="button" aria-pressed={language === 'hi'} onClick={() => onLanguage('hi')}>हिं</button>
      </div>
      <button className="icon-button" type="button" aria-label={t.speaker} title={t.speaker} onClick={speak}><Icon name="speaker" /></button>
      <button className="icon-button" type="button" aria-label={t.pulse} title={t.pulse} onClick={onPulse}><Icon name="pulse" /></button>
      <button className="icon-button" type="button" aria-label={t.home} title={t.home} onClick={onGroups}><Icon name="home" /></button>
    </div>
  </header>
}

function Stepper({ screen, onNavigate, t }: { screen: Screen; onNavigate: (screen: Screen) => void; t: typeof copy.en }) {
  const current = stages.indexOf(screen)
  return <ol className="stepper" aria-label={t.stages.join(" · ")}>
    {stages.map((stage, index) => <li className={`step ${index < current ? 'done' : ''}`} aria-current={index === current ? 'step' : undefined} key={stage}>
      <button className="step-button" type="button" onClick={() => onNavigate(stage)} aria-label={t.stages[index]}>
        <span className="step-dot">{index < current ? <Icon name="check" size={17} /> : index + 1}</span><span className="step-label">{t.stages[index]}</span>
      </button>
      {index < stages.length - 1 && <span className="step-divider" aria-hidden="true" />}
    </li>)}
  </ol>
}

function GroupPicker({ selected, onSelect, onStart, t }: { selected: string; onSelect: (id: string) => void; onStart: () => void; t: typeof copy.en }) {
  return <section className="page-content">
    <div className="page-heading"><span className="eyebrow">{t.subject}</span><h1>{t.groupTitle}</h1><p>{t.groupIntro}</p></div>
    <div className="group-grid">
      {GROUPS.map((id) => <button className="group-card" type="button" key={id} aria-pressed={selected === id} onClick={() => onSelect(id)}>
        <span className="group-icon"><Icon name="group" size={28} /></span><span>{t.group} {id}</span>
      </button>)}
    </div>
    <div className="btn-row"><button className="btn btn-primary" type="button" disabled={!selected} onClick={onStart}>{t.begin}<Icon name="arrow" /></button></div>
  </section>
}

function SubjectPicker({ onSelect, language }: { onSelect: (subject: 'physics' | 'chemistry' | 'biology' | 'mathematics') => void; language: Language }) {
  const hindi = language === 'hi'
  const subjects = [
    { name: hindi ? 'भौतिक विज्ञान' : 'Physics', detail: hindi ? 'फिज़िक्स वर्चुअल लैब · कक्षा 6–8' : 'Physics Virtual Lab · Classes 6–8', available: true },
    { name: hindi ? 'रसायन विज्ञान' : 'Chemistry', detail: hindi ? 'रसायन विज्ञान वर्चुअल लैब · कक्षा 6–8' : 'Chemistry Virtual Lab · Classes 6–8', available: true },
    { name: hindi ? 'गणित' : 'Mathematics', detail: hindi ? 'गणित वर्चुअल लैब · कक्षा 6–8' : 'Mathematics Virtual Lab · Classes 6–8', available: true },
    { name: hindi ? 'जीव विज्ञान' : 'Biology', detail: hindi ? 'जीव विज्ञान वर्चुअल लैब · कक्षा 6–8' : 'Biology Virtual Lab · Classes 6–8', available: true },
  ]
  const subjectNames = ['Physics', 'Chemistry', 'Mathematics', 'Biology']
  return <section className="page-content" aria-label="Choose a subject">
    <div className="page-heading"><span className="eyebrow">SmartClass Buddy</span><h1>{hindi ? 'विषय चुनें' : 'Choose a subject'}</h1><p>{hindi ? 'अपने समूह के साथ सीखने के लिए कोई विषय चुनें।' : 'Select a subject to continue learning with your group.'}</p></div>
    <div className="subject-grid" aria-label={hindi ? 'विषय' : 'Subjects'}>
      {subjects.map(({ name, detail, available }, index) => <button className="subject-card" type="button" key={name} disabled={!available} onClick={() => {
        if (index === 0) onSelect('physics')
        if (index === 1) onSelect('chemistry')
        if (index === 2) onSelect('mathematics')
        if (index === 3) onSelect('biology')
      }}>
        <span className="subject-card-icon" aria-hidden="true">{index === 0 ? '⚡' : index === 1 ? '⚗' : index === 2 ? '∑' : '◉'}</span>
        <span className="subject-card-name">{name}</span><span className="subject-card-detail">{detail}</span>
        <span className={`subject-card-status ${available ? 'available' : ''}`}>{available ? (hindi ? 'उपलब्ध' : 'Available') : (hindi ? 'जल्द आ रहा है' : 'Coming soon')}</span>
        <span className="sr-only">{subjectNames[index]}</span>
      </button>)}
    </div>
  </section>
}

function MissionScreen({ prediction, saved, onPrediction, onSave, t }: {
  prediction: number | null; saved: boolean; onPrediction: (index: number) => void; onSave: () => void; t: typeof copy.en
}) {
  return <section className="page-content">
    <div className="page-heading"><span className="eyebrow">{t.missionEyebrow}</span><h1>{t.missionTitle}</h1><p>{t.missionBody}</p></div>
    <div className="grid-two">
      <div className="mission-visual" role="img" aria-label={t.missionIllustration}>
        <svg className="mission-house" viewBox="0 0 360 260" aria-hidden="true">
          <path d="M40 125 180 25l140 100" fill="none" stroke="var(--ink)" strokeWidth="12" strokeLinejoin="round" />
          <path d="M66 117v112h228V117L180 35Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="5" />
          <rect x="142" y="145" width="76" height="84" rx="6" fill="var(--spark-soft)" stroke="var(--ink)" strokeWidth="5" />
          <path d="M180 145v84" stroke="var(--ink)" strokeWidth="4" />
          <path d="M142 185h76" stroke="var(--ink)" strokeWidth="4" />
          <path d="M180 66c-22 0-39 17-39 38 0 15 8 25 19 34 4 4 6 9 6 15h28c0-6 2-11 6-15 11-9 19-19 19-34 0-21-17-38-39-38Z" fill="var(--spark-soft)" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round" />
          <path d="M166 118v-8q0-15 14-15t14 15v8m-12-2-2-7-2 7" fill="none" stroke="var(--copper-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M164 153h32m-29 8h26m-24 7h22" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
          <path d="M180 57V45m-48 38-10-6m106 6 10-6" stroke="var(--spark)" strokeWidth="6" strokeLinecap="round" />
          <path d="M105 229h150" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="card">
        <span className="eyebrow">{t.stages[0]} · {t.predictStage}</span><h2>{t.predictTitle}</h2><p className="muted">{t.predictIntro}</p>
        <div className="option-list" role="radiogroup" aria-label={t.predictTitle}>
          {t.predictions.map((text, index) => <button className="option" type="button" role="radio" aria-checked={prediction === index} key={text} onClick={() => onPrediction(index)}>
            <span className="step-dot">{String.fromCharCode(65 + index)}</span><span>{text}</span>
          </button>)}
        </div>
        <div className="btn-row"><button className="btn btn-primary" type="button" disabled={prediction === null} onClick={onSave}>{saved ? t.predictionSaved : t.savePrediction}<Icon name="arrow" /></button></div>
      </div>
    </div>
  </section>
}

function CircuitPart({ part, x, y, lit, index, switchOpen, bulbCount, switchLabel }: { part: PartName; x: number; y: number; lit: boolean; index: number; switchOpen: boolean; bulbCount: number; switchLabel: string }) {
  return <g className="circuit-part" data-part={part} data-index={index} transform={`translate(${x} ${y})`}>
    {part === 'battery' && <>
      <rect x="-30" y="-18" width="68" height="44" rx="10" fill="var(--ink)" opacity=".24" transform="translate(4 6)" />
      <rect x="-34" y="-24" width="68" height="44" rx="10" fill="var(--copper)" stroke="var(--ink)" strokeWidth="4" />
      <rect x="-34" y="-24" width="22" height="44" rx="8" fill="var(--spark)" stroke="var(--ink)" strokeWidth="3" />
      <text className="svg-battery-polarity" x="5" y="5" fontWeight="900" fill="var(--surface)" textAnchor="middle">+ −</text>
    </>}
    {part === 'bulb' && <>
      {lit && <><circle r={46 + (bulbCount > 1 ? 5 : 15)} fill="var(--spark)" opacity={bulbCount > 1 ? .18 : .3} /><circle r="37" fill="var(--spark)" opacity=".34" /></>}
      <ellipse cx="4" cy="40" rx="21" ry="7" fill="var(--ink)" opacity=".22" />
      <rect x="-13" y="18" width="26" height="18" rx="4" fill="var(--ink)" />
      <circle cy="-4" r="27" fill={lit ? 'var(--spark)' : 'var(--paper)'} stroke="var(--ink)" strokeWidth="4" />
      <path d="M-9 18V7Q0-12 9 7V18M-7 23h14m-12 6h10" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="-10" cy="-14" r="5" fill="var(--surface)" opacity=".7" />
    </>}
    {part === 'switch' && <>
      <rect x="-36" y="-14" width="72" height="31" rx="9" fill="var(--ink)" opacity=".18" transform="translate(3 5)" />
      <rect x="-36" y="-17" width="72" height="31" rx="9" fill="var(--surface)" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="-23" cy="-1" r="5" fill="var(--ink)" /><circle cx="23" cy="-1" r="5" fill="var(--ink)" />
      <line x1="-23" y1="-1" x2={switchOpen ? 15 : 23} y2={switchOpen ? -23 : -1} stroke={switchOpen ? 'var(--alert)' : 'var(--teal)'} strokeWidth="8" strokeLinecap="round" />
      <text className="svg-switch-label" y="42" fontWeight="900" textAnchor="middle" fill={switchOpen ? 'var(--alert)' : 'var(--teal)'}>{switchLabel}</text>
    </>}
    {part === 'wire' && <>
      <rect x="-34" y="-5" width="68" height="19" rx="9" fill="var(--ink)" opacity=".22" transform="translate(0 5)" />
      <rect x="-34" y="-11" width="68" height="19" rx="9" fill="var(--copper)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M-23-6h34" stroke="var(--spark-soft)" strokeWidth="3" strokeLinecap="round" />
    </>}
  </g>
}

function WorkbenchScreen({ groupId, language, onEvent, onExplain, t }: {
  groupId: string; language: Language; onEvent: EventLogger; onExplain: () => void; t: typeof copy.en
}) {
  const [slots, setSlots] = useState<CircuitSlots>([null, null, null, null])
  const [switchOpen, setSwitchOpen] = useState(false)
  const [sawOff, setSawOff] = useState(false)
  const [selectedPart, setSelectedPart] = useState<PartName | null>(null)
  const [hintShown, setHintShown] = useState(false)
  const [question, setQuestion] = useState('')
  const [tutor, setTutor] = useState<TutorResponse | null>(null)
  const [tutorLoading, setTutorLoading] = useState(false)
  const tutorInFlight = useRef(false)
  const [tutorError, setTutorError] = useState(false)
  const progressKey = `scb.${groupId}.challengeIndex`
  const doneKey = `scb.${groupId}.challengeDone`
  const [challengeIndex, setChallengeIndex] = useState(() => readStored(progressKey, 0))
  const [done, setDone] = useState<boolean[]>(() => readStored(doneKey, [false, false, false]))
  const [dragGhost, setDragGhost] = useState<{ part: PartName; x: number; y: number } | null>(null)
  const dragRef = useRef<{ part: PartName; x: number; y: number; dragging: boolean } | null>(null)
  const suppressClick = useRef(false)
  const boardRef = useRef<HTMLDivElement>(null)
  const completeNotified = useRef(false)
  const evaluation = useMemo(() => evaluateCircuit(slots, switchOpen), [slots, switchOpen])
  const completed = isChallengeComplete(challengeIndex, evaluation, sawOff)
  const challengeCompleted = completed || Boolean(done[challengeIndex])
  const challengeTitle = t.challengeTitles[challengeIndex]
  const challengeGoal = t.challengeGoals[challengeIndex]

  useEffect(() => { writeStored(progressKey, challengeIndex); writeStored(doneKey, done) }, [progressKey, doneKey, challengeIndex, done])
  useEffect(() => { setTutor(null); setQuestion('') }, [language])

  const logAttempt = useCallback((detail: string) => {
    const type: EventType = detail.startsWith('placed-battery') ? 'battery_placed'
      : detail.startsWith('placed-bulb') ? 'bulb_placed'
        : detail.startsWith('placed-wire') ? 'wire_connected'
          : detail === 'switch-opened' ? 'switch_opened'
            : detail === 'switch-closed' ? 'switch_closed'
              : detail.startsWith('placed-switch') ? 'switch_closed'
                : detail === 'reset-board' ? 'board_reset'
                : detail.startsWith('removed-') ? 'part_removed' : 'attempt'
    onEvent(type, 'workbench', detail, challengeIndex + 1)
  }, [onEvent, challengeIndex])
  const placePart = useCallback((slotIndex: number, part: PartName) => {
    setSlots((current) => current.map((item, index) => index === slotIndex ? part : item))
    if (part === 'switch') { setSwitchOpen(false); setSawOff(false) }
    setSelectedPart(null)
    setHintShown(false)
    setTutor(null)
    logAttempt(`placed-${part}-slot-${slotIndex + 1}`)
  }, [logAttempt])
  const dropPart = useCallback((part: PartName, clientX: number, clientY: number) => {
    const rect = boardRef.current?.querySelector('svg')?.getBoundingClientRect()
    if (!rect) return
    const x = (clientX - rect.left) * 600 / rect.width
    const y = (clientY - rect.top) * 380 / rect.height
    let nearest = -1
    let distance = 96
    SLOT_POINTS.forEach((point, index) => {
      const nextDistance = Math.hypot(point.x - x, point.y - y)
      if (nextDistance < distance) { distance = nextDistance; nearest = index }
    })
    if (nearest >= 0) placePart(nearest, part)
  }, [placePart])

  useEffect(() => {
    const move = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      const distance = Math.hypot(event.clientX - drag.x, event.clientY - drag.y)
      if (!drag.dragging && distance > 7) drag.dragging = true
      if (drag.dragging) setDragGhost({ part: drag.part, x: event.clientX, y: event.clientY })
    }
    const up = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      if (drag.dragging) {
        suppressClick.current = true
        dropPart(drag.part, event.clientX, event.clientY)
        window.setTimeout(() => { suppressClick.current = false }, 0)
      }
      dragRef.current = null
      setDragGhost(null)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
  }, [dropPart])

  useEffect(() => {
    if (evaluation.hasSwitch && evaluation.full && switchOpen) setSawOff(true)
  }, [evaluation, switchOpen])

  useEffect(() => {
    if (completed && !completeNotified.current) {
      completeNotified.current = true
      setDone((current) => current.map((value, index) => index === challengeIndex ? true : value))
      onEvent('challenge_completed', 'workbench', `challenge-${challengeIndex + 1}`, challengeIndex + 1)
    }
    if (!completed) completeNotified.current = false
  }, [completed, challengeIndex, onEvent])

  const handleSlot = (index: number) => {
    const current = slots[index]
    if (selectedPart) { placePart(index, selectedPart); return }
    if (current === 'switch') {
      const nextOpen = !switchOpen
      setSwitchOpen(nextOpen)
      setTutor(null)
      if (nextOpen && evaluation.full) setSawOff(true)
      logAttempt(nextOpen ? 'switch-opened' : 'switch-closed')
      return
    }
    if (current) {
      setSlots((items) => items.map((item, itemIndex) => itemIndex === index ? null : item))
      setTutor(null)
      logAttempt(`removed-${current}-slot-${index + 1}`)
    } else {
      setHintShown(false)
    }
  }

  const hintText = () => {
    if (!slots.some(Boolean)) return t.sparkStart
    if (!evaluation.battery) return t.sparkNoBattery
    if (evaluation.empty > 0) return t.sparkGaps(evaluation.empty)
    if (evaluation.switchOpen) return t.sparkOpen
    if (!evaluation.bulbs) return t.sparkNoBulb
    return evaluation.bulbs > 1 ? t.sparkTwo : t.sparkOne
  }
  const sparkText = hintShown ? t.sparkHint : hintText()
  const submitTutor = async (message = question) => {
    const trimmed = message.trim()
    if (!trimmed || tutorInFlight.current) return
    tutorInFlight.current = true
    setQuestion(trimmed)
    setTutorLoading(true)
    setTutorError(false)
    onEvent('tutor_requested', 'workbench', 'tutor-requested', challengeIndex + 1)
    if (!navigator.onLine) {
      setTutor({ message: sparkText, hint: null, follow_up_question: null, misconception_tag: null, status: 'fallback' })
      onEvent('tutor_fallback_used', 'workbench', 'tutor-fallback', challengeIndex + 1)
      tutorInFlight.current = false
      setTutorLoading(false)
      return
    }
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 100000)
    try {
      const answer = await requestSpark({ language, grade_band: '6-8', lesson_id: 'electricity-circuits', challenge_number: challengeIndex + 1, student_message: trimmed.slice(0, 800), circuit_context: { battery_present: evaluation.battery, bulb_count: evaluation.bulbs, wire_gaps: evaluation.empty, switch_present: evaluation.hasSwitch, switch_open: evaluation.hasSwitch ? evaluation.switchOpen : null, evaluator_powered: evaluation.powered } }, controller.signal)
      setTutor(answer)
      onEvent(answer.status === 'ok' ? 'tutor_response_received' : 'tutor_fallback_used', 'workbench', answer.status === 'ok' ? 'tutor-response' : 'tutor-fallback', challengeIndex + 1)
    } catch {
      setTutorError(true)
      setTutor({ message: sparkText, hint: null, follow_up_question: null, misconception_tag: null, status: 'fallback' })
      onEvent('tutor_fallback_used', 'workbench', 'tutor-fallback', challengeIndex + 1)
    } finally { window.clearTimeout(timeout); tutorInFlight.current = false; setTutorLoading(false) }
  }
  const requestHint = () => { setHintShown(true); onEvent('hint_requested', 'workbench', `hint-challenge-${challengeIndex + 1}`, challengeIndex + 1) }
  const resetBoard = () => { setSlots([null, null, null, null]); setSwitchOpen(false); setSawOff(false); setSelectedPart(null); setHintShown(false); setQuestion(''); setTutor(null); logAttempt('reset-board') }
  const nextChallenge = () => {
    if (challengeIndex < 2) {
      setChallengeIndex((value) => value + 1)
      setSlots([null, null, null, null]); setSwitchOpen(false); setSawOff(false); setSelectedPart(null); setHintShown(false); setQuestion(''); setTutor(null); completeNotified.current = false
    } else onExplain()
  }
  const partLabels = t.parts

  return <section className="workbench page-content" aria-label={t.workbenchTitle}>
    <div className="workbench-top">
      <div><span className="eyebrow">{t.subject}</span><h1>{t.workbenchTitle}</h1></div>
      <div className="stars" aria-label={`${done.filter(Boolean).length} ${t.stars}`}>
        {done.map((isDone, index) => <span className={`star ${isDone ? 'on' : ''}`} key={index}><Icon name="star" size={31} fill={isDone ? 'var(--spark)' : 'none'} /></span>)}
      </div>
    </div>
    <div className="goal-card">
      <span className="goal-icon"><Icon name="hint" size={26} /></span>
      <div><span className="goal-title">{t.challenge} {challengeIndex + 1} · {challengeTitle}</span><strong>{challengeGoal}</strong></div>
    </div>
    <div className={`circuit-board ${evaluation.powered ? 'is-powered' : ''}`} ref={boardRef}>
      <svg className="circuit-svg" viewBox="0 0 600 380" role="group" aria-label={t.boardLabel}>
        <title>{t.boardLabel}</title>
        <desc>{t.selectPart}</desc>
        <rect width="600" height="380" fill="var(--paper)" />
        {Array.from({ length: 15 }, (_, ix) => Array.from({ length: 9 }, (_, iy) => <circle key={`${ix}-${iy}`} cx={20 + ix * 40} cy={20 + iy * 40} r="2" fill="var(--line)" />))}
        <path d="M80 70H520V310H80Z" transform="translate(0 7)" fill="none" stroke="var(--ink)" strokeWidth="15" opacity=".16" />
        <path d="M80 70H520V310H80Z" fill="none" stroke="var(--ink)" strokeWidth="14" strokeLinejoin="round" />
        <path d="M80 70H520V310H80Z" fill="none" stroke={evaluation.powered ? 'var(--copper)' : 'var(--line)'} strokeWidth="8" strokeLinejoin="round" />
        {evaluation.powered && <path className="circuit-flow" d="M80 70H520V310H80Z" fill="none" stroke="var(--spark)" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 16" />}
        {slots.map((part, index) => {
          const { x, y } = SLOT_POINTS[index]
          return <g data-slot={index} key={index} role="button" aria-label={part ? `${t.remove} ${partLabels[part]}` : `${t.gap} ${index + 1}`} tabIndex={0}
            onClick={() => handleSlot(index)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleSlot(index) } }}>
            {!part ? <g className="circuit-gap"><circle cx={x} cy={y} r="35" fill="var(--surface)" stroke="var(--alert)" strokeWidth="3" strokeDasharray="7 6"/><path d={`M${x - 10} ${y}h20m-10 -10v20`} stroke="var(--alert)" strokeWidth="3" strokeLinecap="round" /></g>
              : <CircuitPart part={part} x={x} y={y} lit={evaluation.powered && part === 'bulb'} index={index} switchOpen={switchOpen} bulbCount={evaluation.bulbs} switchLabel={switchOpen ? t.switchOpen : t.switchClosed} />}
          </g>
        })}
      </svg>
    </div>
    <div className="parts-tray" aria-label={t.trayLabel}>
      {PARTS.map((part) => <button type="button" className="part-button" key={part} aria-pressed={selectedPart === part}
        onPointerDown={(event) => { dragRef.current = { part, x: event.clientX, y: event.clientY, dragging: false } }}
        onClick={() => { if (suppressClick.current) { suppressClick.current = false; return } setSelectedPart((current) => current === part ? null : part); setHintShown(false) }}>
        <Icon name={part} size={29} /><span>{partLabels[part]}</span>
      </button>)}
    </div>
    <p className="muted">{selectedPart ? `${partLabels[selectedPart]} · ${t.selected}` : t.selectPart}</p>
    <div className="spark-panel spark-tutor">
      <span className="spark-dot"><Icon name="spark" size={24} /></span>
      <div className="spark-content"><strong>{t.spark}</strong> <span className="spark-label">{tutor?.status === 'ok' ? t.sparkAI : !navigator.onLine ? t.sparkOffline : t.sparkScripted}</span>
        <p className="spark-reminder">{t.sparkPrivacy}</p>
        <div className="spark-question"><label className="sr-only" htmlFor="spark-question">{t.sparkQuestionLabel}</label><input id="spark-question" value={question} maxLength={800} placeholder={t.sparkQuestionPlaceholder} disabled={tutorLoading} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void submitTutor() }} /><button className="btn btn-spark" type="button" disabled={tutorLoading || !question.trim()} onClick={() => void submitTutor()}>{tutorLoading ? t.sparkLoading : t.sparkAsk}</button></div>
        <button className="spark-suggest" type="button" disabled={tutorLoading} onClick={() => void submitTutor(t.sparkGiveHint)}>{t.sparkGiveHint}</button>
        <div className="spark-answer" aria-live="polite">{tutorLoading ? t.sparkLoading : tutor ? <>{tutorError && <p role="status">{t.sparkResponseError}</p>}<p>{tutor.message}</p>{tutor.hint && <p>{tutor.hint}</p>}{tutor.follow_up_question && <p>{tutor.follow_up_question}</p>}</> : sparkText}</div>
      </div>
    </div>
    <div className="workbench-status" aria-live="polite">
      <span className={`status-chip ${evaluation.powered ? 'ok' : evaluation.empty > 0 ? 'stuck' : 'work'}`}>
        <Icon name={evaluation.powered ? 'check' : 'pulse'} size={17} />{evaluation.powered ? t.circuitPowered : t.circuitOff}
      </span>
    </div>
    {challengeCompleted && <div className="panel-success" role="status"><Icon name="star" size={20} /> {t.challengeWon} {challengeIndex === 2 ? t.allChallenges : ''}</div>}
    <div className="workbench-actions">
      <button className="btn" type="button" onClick={requestHint}><Icon name="hint" />{t.hint}</button>
      <button className="btn" type="button" onClick={resetBoard}><Icon name="reset" />{t.reset}</button>
      {challengeCompleted && <button className="btn btn-primary" type="button" onClick={nextChallenge}>{challengeIndex < 2 ? t.next : t.continueExplain}<Icon name="arrow" /></button>}
    </div>
    {dragGhost && <div className="drag-ghost" style={{ left: dragGhost.x, top: dragGhost.y }} aria-hidden="true"><Icon name={dragGhost.part} size={34} /></div>}
  </section>
}

function ExplainScreen({ t, onContinue }: { t: typeof copy.en; onContinue: () => void }) {
  const icons: IconName[] = ['battery', 'wire', 'bulb', 'switch']
  return <section className="page-content">
    <div className="page-heading"><span className="eyebrow">{t.stages[2]}</span><h1>{t.explainTitle}</h1><p>{t.explainIntro}</p></div>
    <div className="grid-two">
      {t.explainCards.map(([title, description], index) => <article className="card explain-card" key={title}>
        <span className="explain-icon"><Icon name={icons[index]} size={30} /></span><div><h3>{title}</h3><p className="muted">{description}</p></div>
      </article>)}
    </div>
    <div className="btn-row"><button className="btn btn-primary" type="button" onClick={onContinue}>{t.continueQuiz}<Icon name="arrow" /></button></div>
  </section>
}

function QuizScreen({ onFinish, onEvent, t }: { onFinish: (score: number) => void; onEvent: EventLogger; t: typeof copy.en }) {
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [hint, setHint] = useState(false)
  const question = t.questions[index]
  const choose = (choice: number) => {
    if (revealed) return
    setAnswer(choice); setRevealed(true)
    if (choice === question.correct) setScore((value) => value + 1)
    onEvent('quiz_answered', 'quiz', `question-${index + 1}-answer-${choice + 1}`, undefined, { question: index + 1, answer: choice + 1 })
  }
  const next = () => {
    if (index === t.questions.length - 1) { onEvent('quiz_completed', 'quiz', 'quiz-finished'); onFinish(score) }
    else { setIndex((value) => value + 1); setAnswer(null); setRevealed(false); setHint(false) }
  }
  return <section className="page-content">
    <div className="page-heading"><span className="eyebrow">{t.stages[3]} · {index + 1}/{t.questions.length}</span><h1>{t.quizTitle}</h1><p>{t.quizIntro}</p></div>
    <div className="quiz-progress" aria-label={`${index + 1} of ${t.questions.length}`}><span style={{ transform: `scaleX(${(index + 1) / t.questions.length})` }} /></div>
    <article className="card">
      <h2>{question.q}</h2>
      <div className="option-list" role="radiogroup" aria-label={question.q}>
        {question.a.map((option, choice) => <button className={`option ${revealed && choice === question.correct ? 'is-correct' : ''} ${revealed && answer === choice && choice !== question.correct ? 'is-wrong' : ''}`} type="button" role="radio" aria-checked={answer === choice} key={option} onClick={() => choose(choice)} disabled={revealed}>
          <span className="step-dot">{String.fromCharCode(65 + choice)}</span><span>{option}</span>{revealed && choice === question.correct && <Icon name="check" />}
        </button>)}
      </div>
      {hint && <div className="panel-spark feedback">{question.hint}</div>}
      {revealed && <div className={`feedback ${answer === question.correct ? 'panel-success' : 'panel-alert'}`} role="status"><strong>{answer === question.correct ? t.correct : t.incorrect}</strong><p>{question.why}</p></div>}
      <div className="btn-row feedback">
        {!revealed && <button className="btn" type="button" onClick={() => { setHint(true); onEvent('hint_requested', 'quiz', `question-${index + 1}-hint`, undefined, { question: index + 1 }) }}><Icon name="hint" />{t.hint}</button>}
        {revealed && <button className="btn btn-primary" type="button" onClick={next}>{index === t.questions.length - 1 ? t.finishQuiz : t.nextQuestion}<Icon name="arrow" /></button>}
      </div>
    </article>
  </section>
}

function ReflectScreen({ reflection, onChange, onSave, t }: { reflection: string; onChange: (value: string) => void; onSave: () => void; t: typeof copy.en }) {
  return <section className="page-content">
    <div className="page-heading"><span className="eyebrow">{t.stages[4]}</span><h1>{t.reflectTitle}</h1><p>{t.reflectIntro}</p></div>
    <div className="card"><textarea className="textarea" value={reflection} onChange={(event) => onChange(event.target.value)} placeholder={t.reflectPlaceholder} aria-label={t.reflectTitle} /><div className="btn-row feedback"><button className="btn btn-primary" type="button" onClick={onSave} disabled={!reflection.trim()}>{t.saveReflection}<Icon name="check" /></button></div></div>
  </section>
}

function PulseBoard({ events, groupId, onBack, language, t }: { events: LearningEvent[]; groupId: string; onBack: () => void; language: Language; t: typeof copy.en }) {
  const groupEvents = events.filter((event) => event.groupId === groupId)
  const actionTypes: EventType[] = ['battery_placed', 'bulb_placed', 'wire_connected', 'switch_opened', 'switch_closed', 'part_removed', 'board_reset', 'attempt']
  const attempts = groupEvents.filter((event) => actionTypes.includes(event.type)).length
  const hints = groupEvents.filter((event) => event.type === 'hint_requested' || event.type === 'hint').length
  const challengeEvents = groupEvents.filter((event) => event.type === 'challenge_completed' || (event.type === 'complete' && event.screen === 'workbench' && event.detail.startsWith('challenge-')))
  const completedTypes = new Set(challengeEvents.map((event) => event.challenge ?? Number(event.detail.match(/challenge-(\d+)/)?.[1])).filter(Number.isFinite)).size
  const groups = GROUPS.map((id) => {
    const items = events.filter((event) => event.groupId === id)
    const finished = items.some((event) => event.type === 'reflection_saved' || (event.screen === 'reflect' && event.type === 'complete'))
    return { id, items, finished }
  })
  const recent = groupEvents.slice(0, 12)
  const eventLabel = (event: LearningEvent) => {
    switch (event.type) {
      case 'battery_placed': return t.eventBattery
      case 'bulb_placed': return t.eventBulb
      case 'wire_connected': return t.eventWire
      case 'switch_opened': return t.eventSwitchOpen
      case 'switch_closed': return t.eventSwitchClosed
      case 'hint_requested': case 'hint': return t.eventHint
      case 'tutor_requested': return t.eventTutorRequested
      case 'tutor_response_received': return t.eventTutorResponse
      case 'tutor_fallback_used': return t.eventTutorFallback
      case 'physics_topic_opened': return language === 'hi' ? 'भौतिकी का पाठ खोला' : 'Opened Physics topic'
      case 'physics_activity_completed': return language === 'hi' ? 'भौतिकी गतिविधि पूरी की' : 'Completed Physics activity'
      case 'challenge_completed': return t.eventChallenge
      case 'quiz_answered': return t.eventQuiz
      case 'quiz_completed': return t.eventQuizComplete
      case 'reflection_saved': return t.eventReflection
      case 'prediction_saved': return t.eventPrediction
      case 'part_removed': return t.eventRemoved
      case 'board_reset': return t.eventReset
      case 'complete': return event.screen === 'workbench' ? t.eventChallenge : event.screen === 'reflect' ? t.eventReflection : t.eventComplete
      case 'attempt':
        if (event.detail.startsWith('placed-battery')) return t.eventBattery
        if (event.detail.startsWith('placed-bulb')) return t.eventBulb
        if (event.detail.startsWith('placed-wire')) return t.eventWire
        if (event.detail === 'switch-opened') return t.eventSwitchOpen
        if (event.detail === 'switch-closed') return t.eventSwitchClosed
        if (event.detail.startsWith('removed-')) return t.eventRemoved
        if (event.detail === 'reset-board') return t.eventReset
        return t.eventAttempt
    }
  }
  const timeLabel = (value: string) => {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-IN', { hour: 'numeric', minute: '2-digit' }).format(date)
  }
  return <section className="page-content">
    <div className="page-heading"><span className="eyebrow">{t.teacherView}</span><h1>{t.pulseTitle}</h1><p>{t.pulseIntro}</p></div>
    <div className="pulse-grid">
      <div className="metric"><span className="muted">{t.activity}</span><strong className="metric-value">{attempts}</strong></div>
      <div className="metric"><span className="muted">{t.hintsUsed}</span><strong className="metric-value">{hints}</strong></div>
      <div className="metric"><span className="muted">{t.challengesDone}</span><strong className="metric-value" data-metric="challenge-completions">{challengeEvents.length}</strong></div>
      <div className="metric"><span className="muted">{t.challengeTypesDone}</span><strong className="metric-value" data-metric="challenge-types">{completedTypes}</strong></div>
    </div>
    <div className="grid-two">
      <article className="card"><h2>{t.groupProgress}</h2>{groups.map(({ id, items, finished }) => <div className="pulse-group" key={id}><strong>{t.group} {id}</strong><span className={`status-chip ${finished ? 'ok' : items.length ? 'work' : ''}`}><Icon name={finished ? 'check' : items.length ? 'pulse' : 'group'} size={16} />{finished ? t.statusComplete : items.length ? t.statusWorking : t.statusNotStarted}</span></div>)}</article>
      <article className="card"><h2>{t.recentEvents}</h2>{recent.length ? <div className="event-list">{recent.map((event) => <div className="event-item" key={event.id}><Icon name={event.type === 'hint' || event.type === 'hint_requested' ? 'hint' : event.type === 'complete' || event.type === 'challenge_completed' || event.type === 'reflection_saved' ? 'check' : 'pulse'} /><span><strong>{eventLabel(event)}</strong><small>{t.eventTime.replace('{group}', event.groupId).replace('{time}', timeLabel(event.at))}</small></span></div>)}</div> : <p className="muted">{t.noEvents}</p>}</article>
    </div>
    <div className="btn-row"><button className="btn btn-primary" type="button" onClick={onBack}><Icon name="back" />{t.backToLesson}</button></div>
  </section>
}

export default function App() {
  const legacyWorkbench = new URLSearchParams(window.location.search).get('legacyWorkbench') === '1'
  const [language, setLanguage] = useState<Language>(() => readStored<Language>('scb.language', 'en'))
  const [groupId, setGroupId] = useState<string>(() => readStored('scb.group', ''))
  const [screen, setScreen] = useState<Screen>(() => legacyWorkbench ? (readStored('scb.group', '') ? 'mission' : 'groups') : (readStored('scb.group', '') ? 'subjects' : 'groups'))
  const [prediction, setPrediction] = useState<number | null>(() => readStored('scb.prediction', null))
  const [predictionSaved, setPredictionSaved] = useState(() => readStored('scb.predictionSaved', false))
  const [reflection, setReflection] = useState(() => readStored('scb.reflection', ''))
  const [events, setEvents] = useState<LearningEvent[]>(() => readStored('scb.events', []))
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [physicsContext, setPhysicsContext] = useState<PhysicsLessonContext | null>(null)
  const [physicsActivity, setPhysicsActivity] = useState<PhysicsActivityType | null>(null)
  const physicsEventKeys = useRef(new Set<string>())
  const t = copy[language]
  const headerCopy = screen === 'physics'
    ? { ...t, subject: language === 'hi' ? 'भौतिक विज्ञान वर्चुअल लैब' : 'PHYSICS VIRTUAL LAB' }
    : screen === 'chemistry'
      ? { ...t, subject: language === 'hi' ? 'रसायन विज्ञान वर्चुअल लैब' : 'CHEMISTRY VIRTUAL LAB' }
    : screen === 'biology'
      ? { ...t, subject: language === 'hi' ? 'जीव विज्ञान वर्चुअल लैब' : 'BIOLOGY VIRTUAL LAB' }
    : screen === 'mathematics'
      ? { ...t, subject: language === 'hi' ? 'गणित वर्चुअल लैब' : 'MATHEMATICS VIRTUAL LAB' }
    : screen === 'subjects'
      ? { ...t, subject: language === 'hi' ? 'विषय चुनें' : 'CHOOSE A SUBJECT' }
      : t

  const changeLanguage = (next: Language) => { setLanguage(next); writeStored('scb.language', next) }
  const changeGroup = (next: string) => { setGroupId(next); writeStored('scb.group', next) }
  const logEvent = useCallback((type: EventType, eventScreen: Screen, detail: string, challenge?: number, metadata?: { question?: number; answer?: number }) => {
    setEvents((current) => {
      const next = [{ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, type, screen: eventScreen, groupId, detail, at: new Date().toISOString(), challenge, ...metadata }, ...current]
      writeStored('scb.events', next)
      return next
    })
  }, [groupId])
  const recordPhysicsActivity = useCallback((activity: PhysicsActivityType, context: PhysicsLessonContext) => {
    setPhysicsActivity(activity)
    const key = `${groupId}:${context.moduleId}:${activity}`
    if (physicsEventKeys.current.has(key)) return
    physicsEventKeys.current.add(key)
    logEvent(activity === 'topic_opened' ? 'physics_topic_opened' : 'physics_activity_completed', 'physics', `physics:${key}`)
  }, [groupId, logEvent])
  const savePrediction = () => {
    if (prediction === null) return
    setPredictionSaved(true); writeStored('scb.prediction', prediction); writeStored('scb.predictionSaved', true)
    logEvent('prediction_saved', 'mission', `prediction-${prediction + 1}`)
    setScreen('workbench')
  }
  const saveReflection = () => {
    writeStored('scb.reflection', reflection)
    logEvent('reflection_saved', 'reflect', 'reflection-saved')
    setScreen('pulse')
  }
  const navigate = (next: Screen) => setScreen(next)

  return <div className="app-shell" data-physics-grade={physicsContext?.grade ?? ''} data-physics-module={physicsContext?.moduleId ?? ''} data-physics-activity={physicsActivity ?? ''}>
    <AppHeader language={language} onLanguage={changeLanguage} onPulse={() => setScreen('pulse')} onGroups={() => setScreen('groups')} t={headerCopy} />
    {legacyWorkbench && screen !== 'groups' && screen !== 'pulse' && <Stepper screen={screen} onNavigate={navigate} t={t} />}
    <main>
      {screen === 'groups' && <GroupPicker selected={groupId} onSelect={changeGroup} onStart={() => setScreen(legacyWorkbench ? 'mission' : 'subjects')} t={t} />}
      {screen === 'subjects' && <SubjectPicker language={language} onSelect={(subject) => setScreen(subject)} />}
      {screen === 'physics' && <><PhysicsModuleFrame language={language} onBack={() => setScreen('subjects')} onContextChange={setPhysicsContext} onActivity={recordPhysicsActivity} /><PhysicsSparkPanel language={language} context={physicsContext} /></>}
      {screen === 'chemistry' && <ChemistryModuleFrame language={language} onBack={() => setScreen('subjects')} />}
      {screen === 'biology' && <BiologyModuleFrame language={language} onBack={() => setScreen('subjects')} />}
      {screen === 'mathematics' && <MathematicsModuleFrame language={language} onBack={() => setScreen('subjects')} />}
      {screen === 'mission' && <MissionScreen prediction={prediction} saved={predictionSaved} onPrediction={(value) => { setPrediction(value); setPredictionSaved(false) }} onSave={savePrediction} t={t} />}
      {screen === 'workbench' && <WorkbenchScreen key={groupId} groupId={groupId} language={language} onEvent={logEvent} onExplain={() => setScreen('explain')} t={t} />}
      {screen === 'explain' && <ExplainScreen t={t} onContinue={() => setScreen('quiz')} />}
      {screen === 'quiz' && <QuizScreen onEvent={logEvent} onFinish={(score) => { setQuizScore(score); writeStored('scb.quizScore', score); setScreen('reflect') }} t={t} />}
      {screen === 'reflect' && <ReflectScreen reflection={reflection} onChange={(value) => { setReflection(value); writeStored('scb.reflection', value) }} onSave={saveReflection} t={t} />}
      {screen === 'pulse' && <PulseBoard events={events} groupId={groupId} onBack={() => setScreen('mission')} language={language} t={t} />}
    </main>
    <p className="footer-note">{t.offline}{quizScore !== null ? ` · ${t.score}: ${quizScore}/5` : ''}</p>
  </div>
}
