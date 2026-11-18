import { useEffect, useRef, useState } from 'react'
import type { Language } from '../content/translations'
import type { ChemistryHostMessage } from '../lib/chemistry-protocol'
import './ChemistryModuleFrame.css'

type ChemistryModuleFrameProps = {
  onBack: () => void
  language: Language
}

export default function ChemistryModuleFrame({ onBack, language }: ChemistryModuleFrameProps) {
  const [loaded, setLoaded] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const [retry, setRetry] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const initializedRef = useRef(false)
  const chemistryUrl = `${import.meta.env.BASE_URL}chemistry/index.html`
  const hi = language === 'hi'

  const retryFrame = () => {
    setLoadFailed(false)
    setLoaded(false)
    initializedRef.current = false
    setRetry((value) => value + 1)
  }

  useEffect(() => {
    if (!loaded) return
    const target = iframeRef.current?.contentWindow
    if (!target) return
    const message: ChemistryHostMessage = {
      version: 1,
      type: initializedRef.current ? 'CHEMISTRY_SET_LANGUAGE' : 'CHEMISTRY_HOST_INIT',
      payload: { language },
    }
    target.postMessage(message, window.location.origin)
    initializedRef.current = true
  }, [language, loaded, retry])

  return (
    <section className="chemistry-module-host" data-loaded={loaded}>
      <header className="chemistry-module-host__header">
        <div>
          <p className="chemistry-module-host__eyebrow">
            {hi ? 'स्मार्टक्लास बडी / रसायन विज्ञान' : 'SMARTCLASS BUDDY / CHEMISTRY'}
          </p>
          <h1 className="chemistry-module-host__title">
            {hi ? 'रसायन विज्ञान आभासी प्रयोगशाला' : 'Chemistry Virtual Lab'}
          </h1>
        </div>
        <button className="chemistry-module-host__back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span>
          {hi ? 'विषयों पर लौटें' : 'Back to Subjects'}
        </button>
      </header>

      {loadFailed ? (
        <section className="chemistry-module-host__error" role="alert">
          <h2>{hi ? 'रसायन विज्ञान प्रयोगशाला लोड नहीं हो सकी' : 'Chemistry Virtual Lab could not be loaded'}</h2>
          <p>
            {hi
              ? 'जाँचें कि public/chemistry/index.html उपलब्ध है, फिर पुनः प्रयास करें।'
              : 'Check that public/chemistry/index.html exists, then try again.'}
          </p>
          <button type="button" onClick={retryFrame}>
            {hi ? 'फिर से प्रयास करें' : 'Retry'}
          </button>
        </section>
      ) : (
        <div className="chemistry-module-host__frame-shell">
          {!loaded && (
            <p className="chemistry-module-host__loading" role="status">
              {hi ? 'रसायन विज्ञान प्रयोगशाला लोड हो रही है…' : 'Loading Chemistry Virtual Lab…'}
            </p>
          )}
          <iframe
            key={retry}
            ref={iframeRef}
            className="chemistry-module-host__frame"
            src={chemistryUrl}
            title={hi ? 'कक्षा 6 से 8 के लिए रसायन विज्ञान आभासी प्रयोगशाला' : 'Chemistry Virtual Lab for Classes 6 to 8'}
            loading="eager"
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setLoadFailed(true)}
          />
        </div>
      )}
    </section>
  )
}
