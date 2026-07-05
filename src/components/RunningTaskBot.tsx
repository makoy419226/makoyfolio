import { motion, useReducedMotion } from "framer-motion";
import { Bot, Mail, MessageCircle, TerminalSquare, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

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
};

const fallbackPosition: BotPosition = {
  x: 24,
  y: 132,
  direction: 1,
  task: "Checking portfolio",
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), Math.max(min, max));
};

const getRandomTask = () => {
  return randomTasks[Math.floor(Math.random() * randomTasks.length)];
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
  };
};

const RunningTaskBot = () => {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<BotPosition>(fallbackPosition);
  const taskCode = useMemo(() => {
    const hash = Array.from(position.task).reduce((total, char) => {
      return total + char.charCodeAt(0);
    }, 0);

    return 100 + (hash % 900);
  }, [position.task]);

  const moveToRandomTask = useCallback(() => {
    setPosition((current) => getRandomPosition(current));
  }, []);

  useEffect(() => {
    if (reduceMotion || open) return;

    const initialTimer = window.setTimeout(moveToRandomTask, 500);
    const interval = window.setInterval(moveToRandomTask, BOT_MOVE_SECONDS * 1000);
    const onResize = () => moveToRandomTask();

    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
      window.removeEventListener("resize", onResize);
    };
  }, [moveToRandomTask, open, reduceMotion]);

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
