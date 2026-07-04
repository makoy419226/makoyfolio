import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Cpu, Mail, MessageCircle, TerminalSquare, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ROAM_DURATION_SECONDS = 10;

type BotPosition = {
  x: number;
  y: number;
  direction: 1 | -1;
  task: string;
};

type BotTarget = {
  element: HTMLElement;
  label: string;
  kind: "action" | "content";
};

const fallbackPosition: BotPosition = {
  x: 24,
  y: 132,
  direction: 1,
  task: "Scanning visible content",
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), Math.max(min, max));
};

const getElementLabel = (element: HTMLElement) => {
  const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") ?? "" : "";
  const ariaLabel = element.getAttribute("aria-label");
  const text = (ariaLabel || element.textContent || "").replace(/\s+/g, " ").trim();

  if (href.startsWith("tel:")) return "phone contact link";
  if (href.startsWith("mailto:")) return "email contact link";
  if (href.includes("github.com")) return "GitHub link";
  if (href.includes("wa.me")) return "WhatsApp action";
  if (href.includes("mail.google.com")) return "Gmail action";
  if (href.startsWith("#")) return `${text || href.replace("#", "")} section link`;
  if (text) return text.length > 34 ? `${text.slice(0, 31)}...` : text;

  return element.tagName.toLowerCase() === "button" ? "button" : "page action";
};

const isVisibleElement = (element: HTMLElement) => {
  if (
    element.closest(".running-task-bot") ||
    element.closest(".ciel-popup-shell")
  ) {
    return false;
  }

  const styles = window.getComputedStyle(element);
  if (styles.display === "none" || styles.visibility === "hidden" || styles.opacity === "0") {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return (
    rect.width > 12 &&
    rect.height > 12 &&
    rect.bottom > 74 &&
    rect.top < window.innerHeight - 24 &&
    rect.right > 0 &&
    rect.left < window.innerWidth
  );
};

const getContentLabel = (element: HTMLElement) => {
  const section = element.closest("section[id]");
  const sectionName = section?.id ? `${section.id} section` : "visible content";
  const heading = element.matches("h1, h2, h3")
    ? element.textContent
    : element.querySelector("h1, h2, h3, h4")?.textContent;
  const paragraph = element.matches("p")
    ? element.textContent
    : element.querySelector("p")?.textContent;
  const text = (heading || paragraph || sectionName).replace(/\s+/g, " ").trim();
  const shortText = text.length > 42 ? `${text.slice(0, 39)}...` : text;

  return `${sectionName}: ${shortText}`;
};

const getVisibleTargets = (): BotTarget[] => {
  if (typeof window === "undefined") return [];

  const actionElements = Array.from(
    document.querySelectorAll<HTMLElement>("nav a[href], main a[href], main button, [role='button']")
  );
  const contentElements = Array.from(
    document.querySelectorAll<HTMLElement>(
      "main section[id] h1, main section[id] h2, main section[id] h3, main section[id] p, main section[id] .glass, main section[id] .glass-strong"
    )
  );

  const seen = new Set<HTMLElement>();
  const actions = actionElements
    .filter((element) => {
      if (seen.has(element) || !isVisibleElement(element)) return false;
      seen.add(element);
      return true;
    })
    .map((element) => ({
      element,
      label: getElementLabel(element),
      kind: "action" as const,
    }));

  const content = contentElements
    .filter((element) => {
      if (
        seen.has(element) ||
        element.closest("a, button, [role='button']") ||
        !isVisibleElement(element)
      ) {
        return false;
      }
      seen.add(element);
      return true;
    })
    .map((element) => ({
      element,
      label: getContentLabel(element),
      kind: "content" as const,
    }));

  return [...actions, ...content].sort((a, b) => {
    const rectA = a.element.getBoundingClientRect();
    const rectB = b.element.getBoundingClientRect();
    return rectA.top - rectB.top || rectA.left - rectB.left;
  });
};

const placeBotNearTarget = (target: BotTarget): BotPosition => {
  const rect = target.element.getBoundingClientRect();
  const botWidth = window.innerWidth < 640 ? 176 : 224;
  const botHeight = 150;
  const targetCenterY = rect.top + rect.height / 2;
  const prefersLeft = rect.left > window.innerWidth / 2;
  const x = prefersLeft ? rect.left - botWidth - 18 : rect.right + 18;
  const y = targetCenterY - botHeight / 2;

  return {
    x: clamp(x, 12, window.innerWidth - botWidth - 12),
    y: clamp(y, 86, window.innerHeight - botHeight - 16),
    direction: prefersLeft ? 1 : -1,
    task: target.kind === "action"
      ? `Testing ${target.label}`
      : `Scanning ${target.label}`,
  };
};

const RunningTaskBot = () => {
  const reduceMotion = useReducedMotion();
  const activeTargetRef = useRef<HTMLElement | null>(null);
  const targetIndexRef = useRef(0);
  const [position, setPosition] = useState<BotPosition>(fallbackPosition);
  const [open, setOpen] = useState(false);
  const taskCode = useMemo(() => {
    const hash = Array.from(position.task).reduce((total, char) => {
      return total + char.charCodeAt(0);
    }, 0);
    return 100 + (hash % 900);
  }, [position.task]);

  const clearActiveTarget = useCallback(() => {
    activeTargetRef.current?.classList.remove("ciel-target-active", "ciel-content-active");
    activeTargetRef.current = null;
  }, []);

  const inspectNextTarget = useCallback(() => {
    if (open) return;

    const targets = getVisibleTargets();
    if (!targets.length) {
      clearActiveTarget();
      setPosition(fallbackPosition);
      return;
    }

    const target = targets[targetIndexRef.current % targets.length];
    targetIndexRef.current += 1;

    clearActiveTarget();
    target.element.classList.add(
      target.kind === "action" ? "ciel-target-active" : "ciel-content-active"
    );
    activeTargetRef.current = target.element;
    setPosition(placeBotNearTarget(target));
  }, [clearActiveTarget, open]);

  useEffect(() => {
    if (reduceMotion) return;

    const initialTimer = window.setTimeout(inspectNextTarget, 700);
    const interval = window.setInterval(inspectNextTarget, ROAM_DURATION_SECONDS * 1000);
    const onResize = () => inspectNextTarget();

    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
      window.removeEventListener("resize", onResize);
      clearActiveTarget();
    };
  }, [clearActiveTarget, inspectNextTarget, reduceMotion]);

  useEffect(() => {
    if (open) clearActiveTarget();
  }, [clearActiveTarget, open]);

  if (reduceMotion) return null;

  return (
    <>
      <motion.div
        className="running-task-bot pointer-events-none fixed left-0 top-0 z-20 w-44 sm:w-56"
        animate={{ x: position.x, y: position.y }}
        transition={{
          duration: open ? 0.2 : 1.05,
          ease: [0.45, 0, 0.25, 1],
        }}
      >
        <button
          type="button"
          className="bot-hit-area pointer-events-auto"
          aria-label="Open CIEL assistant"
          onClick={() => setOpen(true)}
        >
          <motion.div
            key={position.task}
            className="bot-task-bubble"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="bot-task-label">
              <TerminalSquare className="h-3.5 w-3.5" />
              TASK-{taskCode}
            </span>
            <span className="bot-task-text">{position.task}</span>
          </motion.div>

          <div
            className="bot-runner"
            style={{ transform: `scaleX(${position.direction})` }}
          >
            <div className="bot-shadow" />
            <div className="bot-antenna" />
            <div className="bot-head">
              <Bot className="h-8 w-8" strokeWidth={2.2} />
              <span className="bot-eye bot-eye-left" />
              <span className="bot-eye bot-eye-right" />
            </div>
            <div className="bot-body">
              <Cpu className="h-5 w-5" strokeWidth={2.1} />
            </div>
            <span className="bot-leg bot-leg-left" />
            <span className="bot-leg bot-leg-right" />
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="ciel-popup-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="ciel-popup-backdrop"
              aria-label="Close CIEL assistant"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ciel-message"
              className="ciel-popup"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="ciel-popup-close"
                aria-label="Close CIEL assistant"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="ciel-avatar">
                <Bot className="h-8 w-8" strokeWidth={2.2} />
              </div>

              <p id="ciel-message" className="ciel-copy ciel-copy-primary">
                My name is CIEL. What can I do for you?
              </p>

              <div className="ciel-actions">
                <a
                  className="ciel-action"
                  href="https://wa.me/971509317400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message my owner on WhatsApp
                  <span>+971 50 931 7400</span>
                </a>
                <a
                  className="ciel-action"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=Idusma0010%40gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="h-4 w-4" />
                  Email him
                  <span>Idusma0010@gmail.com</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RunningTaskBot;
