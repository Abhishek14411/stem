import { useEffect, useRef, useState } from 'react'
import type { Language } from '../content/translations'
import { physicsOfflineHint } from '../content/physicsFallback'
import { requestPhysicsSpark, type PhysicsTutorRequest, type TutorResponse } from '../lib/api'
import type { PhysicsLessonContext } from '../lib/physics-protocol'

export default function PhysicsSparkPanel({ language, context }: { language: Language; context: PhysicsLessonContext | null }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<TutorResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const inFlight = useRef(false)
  const hi = language === 'hi'
  const copy = hi
    ? { name: 'Spark', title: 'प्रयोग के बारे में Spark से पूछें', placeholder: 'आप क्या जानना चाहते हैं?', ask: 'Spark से पूछें', wait: 'Spark सोच रहा है…', ai: 'AI सहायता', scripted: 'तैयार अभ्यास सहायता', offline: 'ऑफ़लाइन अभ्यास सहायता', ready: 'मदद के लिए तैयार', error: 'AI उपलब्ध नहीं है। यह विषय-आधारित अभ्यास संकेत है।', privacy: 'अपना नाम या निजी जानकारी साझा न करें। AI की बात शिक्षक से जाँचें।', noTopic: 'पहले कोई पाठ चुनें।' }
    : { name: 'Spark', title: 'Ask Spark about this lesson', placeholder: 'What would you like to know?', ask: 'Ask Spark', wait: 'Spark is thinking…', ai: 'AI help', scripted: 'Scripted lesson help', offline: 'Offline lesson help', ready: 'Ready to help', error: 'AI is unavailable. This is a topic-specific scripted hint.', privacy: 'Do not share your name or personal information. Check AI explanations with your teacher.', noTopic: 'Choose a lesson to begin.' }
  const [online, setOnline] = useState(() => typeof navigator === 'undefined' || navigator.onLine)
  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update); window.addEventListener('offline', update)
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update) }
  }, [])
  const submit = async () => {
    const trimmed = question.trim()
    if (!context || !trimmed || inFlight.current) return
    inFlight.current = true
    setLoading(true); setError(false)
    const payload: PhysicsTutorRequest = { language, subject: 'physics', grade: context.grade, module_id: context.moduleId, student_message: trimmed.slice(0, 800), experiment_context: context.experimentContext }
    if (!online) {
      setAnswer(physicsOfflineHint(context.moduleId, language)); setLoading(false); inFlight.current = false; setQuestion(''); return
    }
    try { setAnswer(await requestPhysicsSpark(payload)); setQuestion('') }
    catch { setAnswer(physicsOfflineHint(context.moduleId, language)); setError(true) }
    finally { setLoading(false); inFlight.current = false }
  }
  return <aside className="physics-spark" aria-label={copy.name}>
    <div className="physics-spark__heading"><span className="physics-spark__mark" aria-hidden="true">✦</span><div><strong>{copy.name}</strong><p>{context ? `${context.moduleTitle} · Class ${context.grade}` : copy.noTopic}</p></div><span className="physics-spark__status">{!online ? copy.offline : !answer ? copy.ready : answer.status === 'ok' ? copy.ai : copy.scripted}</span></div>
    <label className="sr-only" htmlFor="physics-spark-question">{copy.title}</label>
    <textarea id="physics-spark-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={copy.placeholder} maxLength={800} disabled={!context || loading} />
    <button type="button" className="btn btn-primary" disabled={!context || !question.trim() || loading} onClick={() => void submit()}>{loading ? copy.wait : copy.ask}</button>
    {error && <p className="physics-spark__notice" role="status">{copy.error}</p>}
    {answer && <div className="physics-spark__answer" role="status"><p>{answer.message}</p>{answer.hint && <p><strong>{hi ? 'संकेत:' : 'Hint:'}</strong> {answer.hint}</p>}{answer.follow_up_question && <p>{answer.follow_up_question}</p>}</div>}
    <small>{copy.privacy}</small>
  </aside>
}
