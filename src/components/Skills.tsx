import { useCallback, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  CloudCog,
  Code2,
  Database,
  MonitorSmartphone,
  Network,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

type SkillGroup = {
  label: string;
  kicker: string;
  icon: LucideIcon;
  items: string[];
};

const skillGroups: SkillGroup[] = [
  {
    label: "IT Support & Troubleshooting",
    kicker: "Hardware · Software · Users",
    icon: Wrench,
    items: [
      "Desktop & Laptop Support",
      "End-User Support",
      "Hardware & Software Troubleshooting",
      "Windows Installation & Configuration",
      "Application Installation",
      "System Configuration",
    ],
  },
  {
    label: "Networking Fundamentals",
    kicker: "Connectivity · Diagnostics · Fundamentals",
    icon: Network,
    items: [
      "LAN/Wi-Fi Troubleshooting",
      "DNS",
      "DHCP Concept",
      "Basic Network Diagnostics",
    ],
  },
  {
    label: "Business Systems & Digital Solutions",
    kicker: "ERP · Automation · Reporting",
    icon: Workflow,
    items: [
      "ERP Development",
      "Business Process Automation",
      "Reporting",
      "Data Management",
      "Technical Documentation",
    ],
  },
  {
    label: "Database & Data Management",
    kicker: "SQL · Modeling · Data",
    icon: Database,
    items: ["SQL", "Drizzle ORM", "Database Design"],
  },
  {
    label: "Backend Development & APIs",
    kicker: "Services · APIs · Data flow",
    icon: Braces,
    items: ["Node.js", "Express.js", "RESTful APIs"],
  },
  {
    label: "Frontend Development",
    kicker: "Interfaces · Accessibility · Performance",
    icon: MonitorSmartphone,
    items: ["React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Vite"],
  },
  {
    label: "Development Tools",
    kicker: "Workflow · Testing · Version control",
    icon: Code2,
    items: ["Git", "GitHub", "VS Code", "Postman", "npm", "ESLint"],
  },
  {
    label: "Deployment & Web Operations",
    kicker: "Hosting · Domains · Production",
    icon: CloudCog,
    items: [
      "Vercel",
      "Hostinger",
      "GoDaddy",
      "Website Deployment",
      "Website Maintenance",
      "Domain & DNS Configuration",
      "Production Support",
    ],
  },
];

const totalSkills = skillGroups.reduce((total, group) => total + group.items.length, 0);
const pages = skillGroups;
const totalSpreads = Math.ceil(pages.length / 2);

const SkillPage = ({ group, pageNumber }: { group: SkillGroup; pageNumber: number }) => {
  const Icon = group.icon;
  const dense = group.items.length > 10;

  return (
    <article className="skills-book__page-content">
      <header className="skills-book__chapter-header">
        <span className="skills-book__chapter-icon" aria-hidden>
          <Icon className="h-5 w-5" />
        </span>
        <span className="skills-book__chapter-number">Chapter {String(pageNumber).padStart(2, "0")}</span>
      </header>

      <div className="skills-book__title-block">
        <p>{group.kicker}</p>
        <h3>{group.label}</h3>
      </div>

      <ul className={cn("skills-book__list", dense && "skills-book__list--dense")}>
        {group.items.map((skill) => (
          <li key={skill}>
            <span aria-hidden />
            {skill}
          </li>
        ))}
      </ul>

      <footer className="skills-book__page-footer">
        <span>Mark Idusma · Skills</span>
        <span>{pageNumber}</span>
      </footer>
    </article>
  );
};

const MobileSkillsBook = ({ reduceMotion }: { reduceMotion: boolean | null }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const currentPage = pages[pageIndex];
  const canGoBack = pageIndex > 0;
  const canGoForward = pageIndex < pages.length - 1;
  const pageLabel = currentPage.label;

  const goToPage = useCallback((nextIndex: number) => {
    const safeIndex = Math.max(0, Math.min(pages.length - 1, nextIndex));
    if (safeIndex === pageIndex) return;

    setDirection(safeIndex > pageIndex ? 1 : -1);
    setPageIndex(safeIndex);
  }, [pageIndex]);

  const goBack = useCallback(() => goToPage(pageIndex - 1), [goToPage, pageIndex]);
  const goForward = useCallback(() => goToPage(pageIndex + 1), [goToPage, pageIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" && canGoBack) {
      event.preventDefault();
      goBack();
    }

    if (event.key === "ArrowRight" && canGoForward) {
      event.preventDefault();
      goForward();
    }

    if (event.key === "Home") {
      event.preventDefault();
      goToPage(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      goToPage(pages.length - 1);
    }
  };

  return (
    <div
      className="skills-book-mobile-shell"
      role="region"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Mobile skills book. Swipe or use the previous and next buttons to turn pages."
    >
      <div className="skills-book-mobile__instruction">
        <span>Skills volume · {totalSkills} capabilities</span>
        <span>Swipe pages</span>
      </div>

      <div className="skills-book-mobile">
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          Page {pageIndex + 1} of {pages.length}: {pageLabel}
        </span>

        <div className="skills-book-mobile__cover" aria-hidden />
        <motion.div
          key={`mobile-page-${pageIndex}`}
          className="skills-book-mobile__page"
          role="group"
          aria-roledescription="book page"
          aria-label={`Page ${pageIndex + 1}: ${pageLabel}`}
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          dragMomentum={false}
          initial={reduceMotion ? false : { opacity: 0.6, x: direction * 32, rotateY: direction * -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          whileDrag={reduceMotion ? undefined : { scale: 0.99 }}
          transition={{ duration: reduceMotion ? 0 : 0.26, ease: [0.2, 0, 0, 1] }}
          onDragEnd={(_, info) => {
            const shouldGoForward = info.offset.x < -48 || info.velocity.x < -500;
            const shouldGoBack = info.offset.x > 48 || info.velocity.x > 500;

            if (shouldGoForward && canGoForward) goForward();
            if (shouldGoBack && canGoBack) goBack();
          }}
        >
          <SkillPage group={currentPage} pageNumber={pageIndex + 1} />
        </motion.div>
      </div>

      <div className="skills-book-mobile__controls" aria-label="Mobile skills book pagination">
        <button
          type="button"
          className="material-ripple skills-book-mobile__button"
          onClick={goBack}
          disabled={!canGoBack}
          aria-label="Turn to the previous skill page"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>

        <div className="skills-book-mobile__position">
          <span>Page {pageIndex + 1} of {pages.length}</span>
          <div className="skills-book-mobile__progress" aria-hidden>
            {pages.map((_, index) => (
              <span
                key={index}
                className={cn(index === pageIndex && "skills-book-mobile__progress-mark--active")}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="material-ripple skills-book-mobile__button"
          onClick={goForward}
          disabled={!canGoForward}
          aria-label="Turn to the next skill page"
        >
          <ArrowRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
};

const Skills = () => {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [turnCount, setTurnCount] = useState(0);
  const reduceMotion = useReducedMotion();

  const leftPage = pages[spreadIndex * 2];
  const rightPage = pages[spreadIndex * 2 + 1];
  const canGoBack = spreadIndex > 0;
  const canGoForward = spreadIndex < totalSpreads - 1;

  const goToSpread = useCallback((nextIndex: number) => {
    const safeIndex = Math.max(0, Math.min(totalSpreads - 1, nextIndex));
    if (safeIndex === spreadIndex) return;

    setDirection(safeIndex > spreadIndex ? 1 : -1);
    setSpreadIndex(safeIndex);
    setTurnCount((count) => count + 1);
  }, [spreadIndex]);

  const goBack = useCallback(() => goToSpread(spreadIndex - 1), [goToSpread, spreadIndex]);
  const goForward = useCallback(() => goToSpread(spreadIndex + 1), [goToSpread, spreadIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" && canGoBack) {
      event.preventDefault();
      goBack();
    }

    if (event.key === "ArrowRight" && canGoForward) {
      event.preventDefault();
      goForward();
    }

    if (event.key === "Home") {
      event.preventDefault();
      goToSpread(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      goToSpread(totalSpreads - 1);
    }
  };

  const spreadLabel = [leftPage?.label, rightPage?.label]
    .filter(Boolean)
    .join(" and ");

  return (
    <section id="skills" className="section-atmosphere relative px-4 py-24">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="02 · Skills"
          title="A practical toolkit, chapter by chapter."
          description="Open the skills book and turn through IT support, networking, business systems, development, tooling, and deployment."
        />

        <Reveal variant="up" amount={0.15}>
          <MobileSkillsBook reduceMotion={reduceMotion} />

          <div
            className="skills-book-shell skills-book-shell--desktop"
            role="region"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Interactive skills book. Use the left and right arrow keys to turn pages."
          >
            <div className="skills-book__instruction">
              <span>Skills volume · {totalSkills} capabilities</span>
              <span className="hidden sm:inline">Click a page edge or use ← → keys</span>
              <span className="sm:hidden">Use the controls to turn pages</span>
            </div>

            <div className="skills-book">
              <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                Spread {spreadIndex + 1} of {totalSpreads}: {spreadLabel}
              </span>

              <div className="skills-book__cover" aria-hidden />
              <div className="skills-book__spine" aria-hidden />

              <motion.div
                key={`spread-${spreadIndex}`}
                className="skills-book__spread"
                initial={reduceMotion ? false : { opacity: 0.55, x: direction * 18, rotateY: direction * -3 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.26, ease: [0.2, 0, 0, 1] }}
              >
                <div className="skills-book__page skills-book__page--left">
                  {leftPage && <SkillPage group={leftPage} pageNumber={spreadIndex * 2 + 1} />}
                </div>
                {rightPage && (
                  <div className="skills-book__page skills-book__page--right">
                    <SkillPage group={rightPage} pageNumber={spreadIndex * 2 + 2} />
                  </div>
                )}
              </motion.div>

              {!reduceMotion && turnCount > 0 && (
                <motion.div
                  key={`turn-${turnCount}`}
                  aria-hidden
                  className={cn(
                    "skills-book__turn-sheet",
                    direction > 0 ? "skills-book__turn-sheet--forward" : "skills-book__turn-sheet--back"
                  )}
                  initial={{ rotateY: 0, opacity: 0.98 }}
                  animate={{ rotateY: direction > 0 ? -180 : 180, opacity: [0.98, 1, 0.88] }}
                  transition={{ duration: 0.42, ease: [0.2, 0, 0, 1] }}
                />
              )}

              <button
                type="button"
                className="skills-book__edge skills-book__edge--left"
                onClick={goBack}
                disabled={!canGoBack}
                aria-label="Turn to the previous skill spread"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
                <span>Previous</span>
              </button>
              <button
                type="button"
                className="skills-book__edge skills-book__edge--right"
                onClick={goForward}
                disabled={!canGoForward}
                aria-label="Turn to the next skill spread"
              >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="skills-book__controls" aria-label="Skills book pagination">
              <button
                type="button"
                onClick={goBack}
                disabled={!canGoBack}
                className="skills-book__control-button"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Previous
              </button>

              <div className="skills-book__dots">
                {Array.from({ length: totalSpreads }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSpread(index)}
                    className={cn("skills-book__dot", index === spreadIndex && "skills-book__dot--active")}
                    aria-label={`Go to skill spread ${index + 1}`}
                    aria-current={index === spreadIndex ? "step" : undefined}
                  >
                    <span>{index + 1}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goForward}
                disabled={!canGoForward}
                className="skills-book__control-button"
              >
                Next
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
