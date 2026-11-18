import { useEffect, useRef, useState } from "react";
import { biologyOfflineHint } from "../content/biologyFallback";
import type { Language } from "../content/translations";
import { requestBiologySpark, type TutorResponse } from "../lib/api";
import {
  validateBiologyIframeMessage,
  type BiologyHostMessage,
} from "../lib/biology-protocol";
import "./BiologyModuleFrame.css";

type BiologyModuleFrameProps = {
  onBack: () => void;
  language: Language;
};

export default function BiologyModuleFrame({
  onBack,
  language,
}: BiologyModuleFrameProps) {
  const [loaded, setLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const languageRef = useRef(language);
  const initializedRef = useRef(false);
  const activeRequestRef = useRef<{ requestId: string; controller: AbortController } | null>(null);
  const requestGenerationRef = useRef(0);
  const hi = language === "hi";
  const biologyUrl = `${import.meta.env.BASE_URL}biology/index.html`;
  languageRef.current = language;

  const retryFrame = () => {
    setLoadFailed(false);
    setLoaded(false);
    initializedRef.current = false;
    setRetry((value) => value + 1);
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent<unknown>) => {
      const target = iframeRef.current?.contentWindow;
      if (!target || event.source !== target || event.origin !== window.location.origin) return;
      const message = validateBiologyIframeMessage(event.data);
      if (!message) return;

      activeRequestRef.current?.controller.abort();
      const requestGeneration = ++requestGenerationRef.current;
      const { payload } = message;
      const requestLanguage = languageRef.current;
      const controller = new AbortController();
      activeRequestRef.current = { requestId: payload.requestId, controller };
      const timeout = window.setTimeout(() => controller.abort(), 20_000);

      void (async () => {
        let answer: TutorResponse;
        try {
          answer = navigator.onLine
            ? await requestBiologySpark({
                language: requestLanguage,
                subject: "biology",
                grade: payload.grade,
                module_id: payload.moduleId,
                student_message: payload.studentMessage,
                experiment_context: payload.experimentContext,
              }, controller.signal)
            : biologyOfflineHint(payload.moduleId, languageRef.current, payload.studentMessage);
          if (requestLanguage !== languageRef.current) {
            answer = biologyOfflineHint(payload.moduleId, languageRef.current, payload.studentMessage);
          }
        } catch {
          answer = biologyOfflineHint(payload.moduleId, languageRef.current, payload.studentMessage);
        } finally {
          window.clearTimeout(timeout);
          if (activeRequestRef.current?.controller === controller) activeRequestRef.current = null;
        }

        if (requestGeneration !== requestGenerationRef.current) return;
        const reply: BiologyHostMessage = {
          version: 1,
          type: "BIOLOGY_SPARK_RESPONSE",
          payload: { requestId: payload.requestId, answer },
        };
        iframeRef.current?.contentWindow?.postMessage(reply, window.location.origin);
      })();
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      requestGenerationRef.current++;
      activeRequestRef.current?.controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const target = iframeRef.current?.contentWindow;
    if (!target) return;
    const type = initializedRef.current ? "BIOLOGY_SET_LANGUAGE" : "BIOLOGY_HOST_INIT";
    const message: BiologyHostMessage = {
      version: 1,
      type,
      payload: { language },
    };
    target.postMessage(message, window.location.origin);
    initializedRef.current = true;
  }, [language, loaded, retry]);

  return (
    <section className="biology-module-host" data-loaded={loaded}>
      <header className="biology-module-host__header">
        <div>
          <p className="biology-module-host__eyebrow">
            {hi ? "स्मार्टक्लास बडी / जीव विज्ञान" : "SMARTCLASS BUDDY / BIOLOGY"}
          </p>
          <h1 className="biology-module-host__title">
            {hi ? "जीव विज्ञान आभासी प्रयोगशाला" : "Biology Virtual Lab"}
          </h1>
        </div>
        <button className="biology-module-host__back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span>
          {hi ? "विषयों पर लौटें" : "Back to Subjects"}
        </button>
      </header>

      {loadFailed ? (
        <section className="biology-module-host__error" role="alert">
          <h2>{hi ? "जीव विज्ञान प्रयोगशाला लोड नहीं हो सकी" : "Biology Virtual Lab could not be loaded"}</h2>
          <p>
            {hi
              ? "जाँचें कि public/biology/index.html उपलब्ध है, फिर पुनः प्रयास करें।"
              : "Check that public/biology/index.html exists, then try again."}
          </p>
          <button type="button" onClick={retryFrame}>
            {hi ? "फिर से प्रयास करें" : "Retry"}
          </button>
        </section>
      ) : (
        <div className="biology-module-host__frame-shell">
          {!loaded && (
            <p className="biology-module-host__loading" role="status">
              {hi ? "जीव विज्ञान प्रयोगशाला लोड हो रही है…" : "Loading Biology Virtual Lab…"}
            </p>
          )}
          <iframe
            key={retry}
            ref={iframeRef}
            className="biology-module-host__frame"
            src={biologyUrl}
            title={hi ? "कक्षा 6 से 8 के लिए जीव विज्ञान आभासी प्रयोगशाला" : "Biology Virtual Lab for Classes 6 to 8"}
            loading="eager"
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setLoadFailed(true)}
          />
        </div>
      )}
    </section>
  );
}
