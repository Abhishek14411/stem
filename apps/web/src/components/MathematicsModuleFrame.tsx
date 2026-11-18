import { useEffect, useRef, useState } from 'react'
import type { Language } from '../content/translations'
import {
  validateMathematicsFrameMessage,
  type MathematicsHostMessage,
} from '../lib/mathematics-protocol'
import './MathematicsModuleFrame.css'

type MathematicsModuleFrameProps = {
  onBack: () => void
  language: Language
}

export default function MathematicsModuleFrame({ onBack, language }: MathematicsModuleFrameProps) {
  const [loaded, setLoaded] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const [retry, setRetry] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const initializedRef = useRef(false)
  const mathematicsUrl = `${import.meta.env.BASE_URL}mathematics/index.html`
  const hi = language === 'hi'

  const retryFrame = () => {
    setLoadFailed(false)
    setLoaded(false)
    initializedRef.current = false
    setRetry((value) => value + 1)
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== iframeRef.current?.contentWindow || event.origin !== 'null') return
      const message = validateMathematicsFrameMessage(event.data)
      if (!message) return
      if (message.type === 'MATHEMATICS_RUNTIME_ERROR') setLoadFailed(true)
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [retry])

  useEffect(() => {
    if (!loaded) return
    const target = iframeRef.current?.contentWindow
    if (!target) return
    const message: MathematicsHostMessage = {
      version: 1,
      type: initializedRef.current ? 'MATHEMATICS_SET_LANGUAGE' : 'MATHEMATICS_HOST_INIT',
      payload: { language },
    }
    target.postMessage(message, '*')
    initializedRef.current = true
  }, [language, loaded, retry])

  return (
    <section className="mathematics-module-host" data-loaded={loaded}>
      <header className="mathematics-module-host__header">
        <div>
          <p className="mathematics-module-host__eyebrow">
            {hi ? 'स्मार्टक्लास बडी / गणित' : 'SMARTCLASS BUDDY / MATHEMATICS'}
          </p>
          <h1 className="mathematics-module-host__title">
            {hi ? 'गणित आभासी प्रयोगशाला' : 'Mathematics Virtual Lab'}
          </h1>
        </div>
        <button className="mathematics-module-host__back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span>
          {hi ? 'विषयों पर लौटें' : 'Back to Subjects'}
        </button>
      </header>

      {loadFailed ? (
        <section className="mathematics-module-host__error" role="alert">
          <h2>{hi ? 'गणित प्रयोगशाला लोड नहीं हो सकी' : 'Mathematics Virtual Lab could not be loaded'}</h2>
          <p>
            {hi
              ? 'जाँचें कि public/mathematics/index.html उपलब्ध है, फिर पुनः प्रयास करें।'
              : 'Check that public/mathematics/index.html exists, then try again.'}
          </p>
          <button type="button" onClick={retryFrame}>
            {hi ? 'फिर से प्रयास करें' : 'Retry'}
          </button>
        </section>
      ) : (
        <div className="mathematics-module-host__frame-shell">
          {!loaded && (
            <p className="mathematics-module-host__loading" role="status">
              {hi ? 'गणित प्रयोगशाला लोड हो रही है…' : 'Loading Mathematics Virtual Lab…'}
            </p>
          )}
          <iframe
            key={retry}
            ref={iframeRef}
            className="mathematics-module-host__frame"
            src={mathematicsUrl}
            title={hi ? 'कक्षा 6 से 8 के लिए गणित आभासी प्रयोगशाला' : 'Mathematics Virtual Lab for Classes 6 to 8'}
            loading="eager"
            sandbox="allow-scripts"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setLoadFailed(true)}
          />
        </div>
      )}
    </section>
  )
}
