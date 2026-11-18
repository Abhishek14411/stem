import { useEffect, useRef, useState } from "react";
import type { Language } from "../content/translations";
import {
  createPhysicsHostMessage,
  validatePhysicsIframeMessage,
  type PhysicsActivityType,
  type PhysicsLanguage,
  type PhysicsLessonContext,
} from "../lib/physics-protocol";
import "./PhysicsModuleFrame.css";

type PhysicsModuleFrameProps = {
  onBack: () => void;
  language: Language;
  onContextChange?: (context: PhysicsLessonContext) => void;
  onActivity?: (activity: PhysicsActivityType, context: PhysicsLessonContext) => void;
};

/**
 * Hosts the teammate's self-contained Physics Virtual Lab inside SmartClass Buddy.
 * The lab stays isolated in an iframe so its global CSS, DOM IDs and Canvas code
 * cannot collide with the React application.
 */
export default function PhysicsModuleFrame({
  onBack,
  language,
  onContextChange,
  onActivity,
}: PhysicsModuleFrameProps) {
  const [loadFailed, setLoadFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [context, setContext] = useState<PhysicsLessonContext | null>(null);
  const [lastActivity, setLastActivity] = useState<PhysicsActivityType | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const readyRef = useRef(false);
  const physicsUrl = `${import.meta.env.BASE_URL}physics/index.html`;
  const hi = language === "hi";

  useEffect(() => {
    const receiveMessage = (event: MessageEvent<unknown>) => {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeWindow || event.source !== iframeWindow || event.origin !== window.location.origin) return;
      const message = validatePhysicsIframeMessage(event.data);
      if (!message) return;
      if (message.type === "PHYSICS_READY") {
        readyRef.current = true;
        setReady(true);
        return;
      }
      setContext(message.payload);
      onContextChange?.(message.payload);
      if (message.type === "PHYSICS_ACTIVITY_COMPLETED") {
        setLastActivity(message.payload.activity);
        onActivity?.(message.payload.activity, message.payload);
      }
    };
    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, [onActivity, onContextChange]);

  useEffect(() => {
    if (!readyRef.current) return;
    const message = createPhysicsHostMessage("SET_LANGUAGE", language as PhysicsLanguage);
    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin);
  }, [language]);

  const initializeIframe = () => {
    readyRef.current = false;
    setReady(false);
    const message = createPhysicsHostMessage("HOST_INIT", language as PhysicsLanguage);
    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin);
  };

  return (
    <section className="physics-module-host" data-bridge-ready={ready} data-active-grade={context?.grade ?? ""} data-active-module={context?.moduleId ?? ""} data-last-activity={lastActivity ?? ""}>
      <header className="physics-module-host__header">
        <div>
          <p className="physics-module-host__eyebrow">{hi ? "स्मार्टक्लास बडी / भौतिकी" : "SMARTCLASS BUDDY / PHYSICS"}</p>
          <h1 className="physics-module-host__title">{hi ? "भौतिकी आभासी प्रयोगशाला" : "Physics Virtual Lab"}</h1>
        </div>
        <button
          className="physics-module-host__back"
          type="button"
          onClick={onBack}
        >
          <span aria-hidden="true">â†</span> {hi ? "स्मार्टक्लास बडी पर लौटें" : "Back to SmartClass Buddy"}
        </button>
      </header>

      {loadFailed ? (
        <section className="physics-module-host__error" role="alert">
          <h2>{hi ? "भौतिकी प्रयोगशाला लोड नहीं हो सकी" : "Physics Virtual Lab could not be loaded"}</h2>
          <p>
            Check that <code>public/physics/index.html</code> exists, then reload
            the page.
          </p>
          <button type="button" onClick={() => setLoadFailed(false)}>
            {hi ? "फिर से प्रयास करें" : "Retry"}
          </button>
        </section>
      ) : (
        <iframe
          ref={iframeRef}
          className="physics-module-host__frame"
          src={physicsUrl}
          title={hi ? "कक्षा 6 से 8 के लिए भौतिकी आभासी प्रयोगशाला" : "Physics Virtual Lab for Classes 6 to 8"}
          loading="eager"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          onLoad={initializeIframe}
          onError={() => setLoadFailed(true)}
        />
      )}
    </section>
  );
}
