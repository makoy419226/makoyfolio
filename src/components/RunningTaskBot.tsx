import { motion, useReducedMotion } from "framer-motion";
import { Bot, Mail, MessageCircle, TerminalSquare, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const BOT_MOVE_SECONDS = 6.5;

const randomTasks = [
  "Checking responsive header",
  "Reviewing skills section",
  "Scanning project cards",
  "Testing contact links",
  "Polishing blue interface",
  "Reading portfolio content",
  "Checking mobile text flow",
  "Reviewing CRM project",
];

type BotPosition = {
  x: number;
  y: number;
  direction: 1 | -1;
  task: string;
  context: string;
};

type BotTarget = {
  element: HTMLElement;
  label: string;
  kind: "action" | "content";
  context: "Header" | "Button" | "Link" | "Section" | "Card" | "Heading";
  sectionLabel?: string;
};

const fallbackPosition: BotPosition = {
  x: 24,
  y: 132,
  direction: 1,
  task: "Checking portfolio",
  context: "SCAN",
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), Math.max(min, max));
};

const getRandomTask = () => {
  return randomTasks[Math.floor(Math.random() * randomTasks.length)];
};

const shorten = (value: string, limit = 44) => {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length > limit ? `${text.slice(0, limit - 3)}...` : text;
};

const titleCase = (value: string) => {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getContextClass = (context: BotTarget["context"]) => {
  return `bot-target-${context.toLowerCase()}`;
};

const getRandomPosition = (previous?: BotPosition): BotPosition => {
  if (typeof window === "undefined") return fallbackPosition;

  const botWidth = window.innerWidth < 640 ? 160 : 192;
  const botHeight = 152;
  const minY = window.innerWidth < 640 ? 92 : 112;
  const maxX = Math.max(16, window.innerWidth - botWidth - 16);
  const maxY = Math.max(minY, window.innerHeight - botHeight - 20);
  const x = clamp(16 + Math.random() * (maxX - 16), 16, maxX);
  const y = clamp(minY + Math.random() * (maxY - minY), minY, maxY);
  const previousX = previous?.x ?? x;

  return {
    x,
    y,
    direction: x >= previousX ? 1 : -1,
    task: getRandomTask(),
    context: "SCAN",
  };
};

const isVisibleElement = (element: HTMLElement) => {
  if (
    element.closest(".running-task-bot") ||
    element.closest(".assistant-popup-shell")
  ) {
    return false;
  }

  const isHeaderTarget = Boolean(element.closest("header"));
  const styles = window.getComputedStyle(element);
  if (styles.display === "none" || styles.visibility === "hidden" || styles.opacity === "0") {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return (
    rect.width > 16 &&
    rect.height > 16 &&
    rect.bottom > (isHeaderTarget ? 8 : 82) &&
    rect.top < window.innerHeight - 24 &&
    rect.right > 0 &&
    rect.left < window.innerWidth
  );
};

const getSectionLabel = (element: HTMLElement) => {
  if (element.closest("header")) return "Header";

  const section = element.closest<HTMLElement>("section[id]");
  if (!section) return undefined;

  const heading = section.querySelector("h1, h2")?.textContent;
  return shorten(heading || titleCase(section.id), 28);
};

const getTargetContext = (element: HTMLElement, kind: BotTarget["kind"]): BotTarget["context"] => {
  if (element.closest("header")) return "Header";
  if (element.matches("button") || element.querySelector("button")) return "Button";
  if (kind === "action") return "Link";
  if (element.matches("h1, h2, h3")) return "Heading";
  if (element.classList.contains("glass") || element.classList.contains("glass-strong")) return "Card";
  return "Section";
};

const getActionLabel = (element: HTMLElement) => {
  const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") ?? "" : "";
  const ariaLabel = element.getAttribute("aria-label");
  const text = shorten(ariaLabel || element.textContent || "page action", 34);

  if (href.startsWith("tel:")) return "phone contact link";
  if (href.startsWith("mailto:")) return "email contact link";
  if (href.includes("github.com")) return "GitHub profile link";
  if (href.includes("wa.me")) return "WhatsApp contact button";
  if (href.includes("mail.google.com")) return "Gmail contact button";
  if (element.closest("header") && href.startsWith("#")) return `${text} nav link`;
  if (href.startsWith("#")) return `${text || href.replace("#", "")} section link`;

  return text;
};

const getContentLabel = (element: HTMLElement) => {
  const section = element.closest<HTMLElement>("section[id]");
  const sectionId = section?.id ? `${section.id} section` : "visible content";
  const heading = element.matches("h1, h2, h3")
    ? element.textContent
    : element.querySelector("h1, h2, h3, h4")?.textContent;
  const paragraph = element.matches("p")
    ? element.textContent
    : element.querySelector("p")?.textContent;

  return shorten(heading || paragraph || sectionId, 42);
};

const getVisibleTargets = (): BotTarget[] => {
  if (typeof window === "undefined") return [];

  const headerElements = Array.from(
    document.querySelectorAll<HTMLElement>("header nav a[href], header nav button")
  );
  const actionElements = Array.from(
    document.querySelectorAll<HTMLElement>("main a[href], main button")
  );
  const contentElements = Array.from(
    document.querySelectorAll<HTMLElement>(
      "main section[id] h1, main section[id] h2, main section[id] h3, main section[id] .glass, main section[id] .glass-strong"
    )
  );

  const seen = new Set<HTMLElement>();
  const toTarget = (element: HTMLElement, kind: BotTarget["kind"]): BotTarget | null => {
    if (seen.has(element) || !isVisibleElement(element)) return null;
    seen.add(element);

    return {
      element,
      kind,
      label: kind === "action" ? getActionLabel(element) : getContentLabel(element),
      context: getTargetContext(element, kind),
      sectionLabel: getSectionLabel(element),
    };
  };

  return [
    ...headerElements.map((element) => toTarget(element, "action")),
    ...contentElements.map((element) => toTarget(element, "content")),
    ...actionElements.map((element) => toTarget(element, "action")),
  ].filter((target): target is BotTarget => Boolean(target));
};

const placeBotNearTarget = (target: BotTarget): BotPosition => {
  const rect = target.element.getBoundingClientRect();
  const botWidth = window.innerWidth < 640 ? 160 : 192;
  const botHeight = 152;
  const minY = target.context === "Header" ? 72 : window.innerWidth < 640 ? 92 : 112;
  const targetCenterY = rect.top + rect.height / 2;
  const targetIsRight = rect.left + rect.width / 2 > window.innerWidth / 2;
  const x = target.context === "Header"
    ? rect.left + rect.width / 2 - botWidth / 2
    : targetIsRight ? rect.left - botWidth - 18 : rect.right + 18;
  const y = target.context === "Header"
    ? rect.bottom + 18
    : targetCenterY - botHeight / 2;
  const location = target.context === "Header"
    ? "Header"
    : target.sectionLabel ? `${target.context} in ${target.sectionLabel}` : target.context;
  const task = `${location}: ${target.label}`;

  return {
    x: clamp(x, 16, window.innerWidth - botWidth - 16),
    y: clamp(y, minY, window.innerHeight - botHeight - 20),
    direction: targetIsRight ? 1 : -1,
    task,
    context: target.context.toUpperCase(),
  };
};

const RunningTaskBot = () => {
  const reduceMotion = useReducedMotion();
  const activeTargetRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<BotPosition>(fallbackPosition);
  const taskCode = useMemo(() => {
    const hash = Array.from(position.task).reduce((total, char) => {
      return total + char.charCodeAt(0);
    }, 0);

    return 100 + (hash % 900);
  }, [position.task]);

  const clearActiveTarget = useCallback(() => {
    activeTargetRef.current?.classList.remove(
      "bot-target-active",
      "bot-target-action",
      "bot-target-content",
      "bot-target-header",
      "bot-target-button",
      "bot-target-link",
      "bot-target-section",
      "bot-target-card",
      "bot-target-heading"
    );
    activeTargetRef.current = null;
  }, []);

  const moveToContextTarget = useCallback(() => {
    const targets = getVisibleTargets();
    if (!targets.length) {
      clearActiveTarget();
      setPosition((current) => getRandomPosition(current));
      return;
    }

    const target = targets[Math.floor(Math.random() * targets.length)];
    clearActiveTarget();
    target.element.classList.add(
      "bot-target-active",
      target.kind === "action" ? "bot-target-action" : "bot-target-content",
      getContextClass(target.context)
    );
    activeTargetRef.current = target.element;
    setPosition(placeBotNearTarget(target));
  }, [clearActiveTarget]);

  const moveToTargetIfAvailable = useCallback(() => {
    if (open) return;
    moveToContextTarget();
  }, [moveToContextTarget, open]);

  useEffect(() => {
    if (open || reduceMotion) clearActiveTarget();
  }, [clearActiveTarget, open, reduceMotion]);

  useEffect(() => {
    return () => clearActiveTarget();
  }, [clearActiveTarget]);

  useEffect(() => {
    if (reduceMotion || open) return;

    const initialTimer = window.setTimeout(moveToTargetIfAvailable, 500);
    const interval = window.setInterval(moveToTargetIfAvailable, BOT_MOVE_SECONDS * 1000);
    const onResize = () => moveToTargetIfAvailable();

    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
      window.removeEventListener("resize", onResize);
      clearActiveTarget();
    };
  }, [clearActiveTarget, moveToTargetIfAvailable, open, reduceMotion]);

  return (
    <>
      <motion.div
        className="running-task-bot pointer-events-none fixed left-0 top-0 z-20 w-40 sm:w-48"
        animate={reduceMotion ? undefined : { x: position.x, y: position.y }}
        initial={false}
        transition={{ duration: 1.05, ease: [0.45, 0, 0.25, 1] }}
      >
        <button
          type="button"
          className="bot-hit-area pointer-events-auto"
          aria-label="Open portfolio assistant"
          onClick={() => setOpen(true)}
        >
          <motion.div
            key={position.task}
            className="bot-task-bubble"
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="bot-task-label">
              <TerminalSquare className="h-3.5 w-3.5" />
              {position.context}-{taskCode}
            </span>
            <span className="bot-task-text">{position.task}</span>
          </motion.div>

          <div
            className="bot-runner"
            style={{ transform: `scaleX(${position.direction})` }}
          >
            <div className="bot-shadow" />
            <div className="bot-antenna" />
            <span className="bot-arm bot-arm-left" />
            <span className="bot-arm bot-arm-right" />
            <div className="bot-head">
              <Bot className="h-8 w-8" strokeWidth={2.2} />
              <span className="bot-eye bot-eye-left" />
              <span className="bot-eye bot-eye-right" />
            </div>
          </div>
        </button>
      </motion.div>

      {open && (
        <div className="assistant-popup-shell">
          <button
            type="button"
            className="assistant-popup-backdrop"
            aria-label="Close portfolio assistant"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="assistant-message"
            className="assistant-popup"
          >
            <button
              type="button"
              className="assistant-popup-close"
              aria-label="Close portfolio assistant"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="assistant-avatar">
              <Bot className="h-8 w-8" strokeWidth={2.2} />
            </div>

            <p id="assistant-message" className="assistant-copy assistant-copy-primary">
              How can I help you?
            </p>

            <div className="assistant-actions">
              <a
                className="assistant-action"
                href="https://wa.me/971509317400"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Message Mark on WhatsApp
                <span>+971 50 931 7400</span>
              </a>
              <a
                className="assistant-action"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=idusma0010%40gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="h-4 w-4" />
                Email Mark
                <span>idusma0010@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RunningTaskBot;
