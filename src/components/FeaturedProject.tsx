import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type TouchEvent as ReactTouchEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  ExternalLink,
  Github,
  LockKeyhole,
  Layers3,
  MonitorSmartphone,
  X,
  User,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import lwlLogo from "@/assets/lwl-logo-actual.png";
import screenLogin from "@/assets/lwl-screen-login.png";
import screenDashboard from "@/assets/lwl-screen-dashboard.png";
import screenDelivery from "@/assets/lwl-screen-delivery.png";
import screenNewOrder from "@/assets/lwl-screen-new-order.png";
import screenTracking from "@/assets/lwl-screen-tracking.png";
import screenInventory from "@/assets/lwl-screen-inventory.png";
import screenClients from "@/assets/lwl-screen-clients.png";
import screenBills from "@/assets/lwl-screen-bills.png";
import screenIncidents from "@/assets/lwl-screen-incidents.png";
import screenPublicTracking from "@/assets/lwl-screen-tracking-public.png";
import screenManagement from "@/assets/lwl-screen-management.png";

const tabs = [
  { id: "overview", label: "Overview", icon: MonitorSmartphone },
  { id: "workflow", label: "Workflow", icon: Workflow },
  { id: "stack", label: "Stack", icon: Layers3 },
] as const;

type TabId = (typeof tabs)[number]["id"];

const workflow = ["Order intake", "Production tracking", "Billing", "Delivery"];
const stack = ["React", "TypeScript", "Express", "PostgreSQL", "Drizzle ORM", "VPS"];
const appScreenshots = [
  { title: "Login", src: screenLogin, redactions: [{ top: "67%", left: "26%", width: "24%", height: "14%" }] },
  { title: "Dashboard", src: screenDashboard, redactions: [{ top: "7%", left: "15%", width: "85%", height: "10%" }, { top: "35%", left: "77%", width: "23%", height: "65%" }, { top: "88%", left: "0%", width: "100%", height: "12%" }] },
  { title: "Delivery dashboard", src: screenDelivery, redactions: [{ top: "6%", left: "14%", width: "86%", height: "9%" }, { top: "91%", left: "0%", width: "100%", height: "9%" }] },
  { title: "New order", src: screenNewOrder, redactions: [{ top: "6%", left: "14%", width: "86%", height: "9%" }, { top: "91%", left: "0%", width: "100%", height: "9%" }] },
  { title: "Order tracking", src: screenTracking, redactions: [{ top: "6%", left: "14%", width: "86%", height: "9%" }, { top: "28%", left: "29%", width: "71%", height: "68%" }, { top: "91%", left: "0%", width: "100%", height: "9%" }] },
  { title: "Inventory", src: screenInventory, redactions: [{ top: "6%", left: "14%", width: "86%", height: "9%" }, { top: "86%", left: "0%", width: "18%", height: "14%" }, { top: "91%", left: "18%", width: "82%", height: "9%" }] },
  { title: "Clients", src: screenClients, redactions: [{ top: "6%", left: "14%", width: "86%", height: "9%" }, { top: "47%", left: "14%", width: "86%", height: "45%" }, { top: "91%", left: "0%", width: "100%", height: "9%" }] },
  { title: "Bills", src: screenBills, redactions: [{ top: "6%", left: "14%", width: "86%", height: "9%" }, { top: "42%", left: "14%", width: "86%", height: "50%" }, { top: "91%", left: "0%", width: "100%", height: "9%" }] },
  { title: "Incident records", src: screenIncidents, redactions: [{ top: "6%", left: "14%", width: "86%", height: "9%" }, { top: "88%", left: "0%", width: "100%", height: "12%" }] },
  { title: "Public tracking", src: screenPublicTracking, redactions: [{ top: "6%", left: "14%", width: "86%", height: "9%" }, { top: "91%", left: "0%", width: "100%", height: "9%" }] },
  { title: "Management", src: screenManagement, redactions: [{ top: "6%", left: "14%", width: "86%", height: "9%" }, { top: "39%", left: "24%", width: "70%", height: "55%" }, { top: "91%", left: "0%", width: "100%", height: "9%" }] },
];

const FeaturedProject = () => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const swipeStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const moveScreenshot = (direction: 1 | -1) => {
    setScreenshotIndex((current) => (current + direction + appScreenshots.length) % appScreenshots.length);
  };

  const handleSwipeStart = (clientX: number) => {
    swipeStartX.current = clientX;
    didSwipe.current = false;
  };

  const handleSwipeEnd = (clientX: number) => {
    if (swipeStartX.current === null) return;
    const distance = clientX - swipeStartX.current;
    if (Math.abs(distance) > 42) {
      didSwipe.current = true;
      moveScreenshot(distance < 0 ? 1 : -1);
    }
    swipeStartX.current = null;
  };

  const handleScreenshotPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    handleSwipeStart(event.clientX);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleScreenshotPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    handleSwipeEnd(event.clientX);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleScreenshotTouchStart = (event: ReactTouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    if (touch) handleSwipeStart(touch.clientX);
  };

  const handleScreenshotTouchEnd = (event: ReactTouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0];
    if (touch) handleSwipeEnd(touch.clientX);
  };

  useEffect(() => {
    if (activeTab !== "overview") return;
    const timer = window.setInterval(() => {
      setScreenshotIndex((current) => (current + 1) % appScreenshots.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [activeTab]);

  return (
    <article className={cn("featured-project depth-card glass-strong overflow-hidden rounded-[2rem]", isPreviewOpen && "featured-project--preview-open")}>
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="featured-project__wash" aria-hidden />

          <div className="relative flex items-start gap-4">
            <div className="featured-project__logo">
              <img
                src={lwlLogo}
                alt="Liquid Washes Laundry logo"
                width={320}
                height={241}
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="material-status-chip inline-flex min-h-8 items-center gap-2 rounded-full px-3 text-[11px] font-bold uppercase tracking-[0.12em]">
                <span className="material-status-dot" aria-hidden />
                Live in production
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                Liquid Washes Laundry
              </h3>
              <p className="mt-1 font-medium text-primary">CRM &amp; Operations Platform</p>
            </div>
          </div>

          <p className="relative mt-6 max-w-xl leading-relaxed text-muted-foreground">
            A full-stack business system for orders, clients, billing, inventory,
            production work, delivery, reporting, and role-based administration.
          </p>

          <div className="relative mt-5 flex flex-wrap gap-2">
            {stack.slice(0, 4).map((item) => (
              <Badge key={item} variant="secondary" className="border border-border/60 bg-background/70">
                {item}
              </Badge>
            ))}
          </div>

          <div className="relative mt-7 flex flex-wrap gap-3">
            <Button asChild size="sm" className="premium-button">
              <a href="http://77.37.44.92/" target="_blank" rel="noopener noreferrer">
                Open live app <ExternalLink aria-hidden />
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="premium-button">
              <a
                href="https://github.com/mclasstourism/Liquid-Washes-Laundry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github aria-hidden /> GitHub
              </a>
            </Button>
          </div>
        </div>

        <div
          className={cn("featured-project__demo p-4 sm:p-6 lg:p-8", isPreviewOpen && "featured-project__demo--popover")}
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsPreviewOpen(false);
          }}
        >
          {!isPreviewOpen ? (
            <button
              type="button"
              className="featured-project__inline-screenshot"
              onPointerDown={handleScreenshotPointerDown}
              onPointerUp={handleScreenshotPointerUp}
              onPointerCancel={() => { swipeStartX.current = null; }}
              onTouchStart={handleScreenshotTouchStart}
              onTouchEnd={handleScreenshotTouchEnd}
              onClick={() => {
                if (didSwipe.current) {
                  didSwipe.current = false;
                  return;
                }
                setIsPreviewOpen(true);
              }}
              aria-label="Open Liquid Washes Laundry screenshots"
            >
              <div className="featured-project__screenshot-track" style={{ transform: `translateX(-${screenshotIndex * 100}%)` }}>
                {appScreenshots.map((screen) => (
                  <div key={screen.title} className="featured-project__screenshot-slide">
                    <img src={screen.src} alt={`${screen.title} screenshot`} />
                    {screen.redactions.map((redaction, index) => <span key={index} className="featured-project__redaction" style={redaction} aria-hidden />)}
                  </div>
                ))}
              </div>
              <span className="featured-project__screenshot-page">{screenshotIndex + 1} / {appScreenshots.length}</span>
              <span className="featured-project__inline-screenshot-label">Click to open screenshots</span>
            </button>
          ) : (
          <>
          <button type="button" className="featured-project__preview-close" onClick={() => setIsPreviewOpen(false)} aria-label="Close app preview">
            <X aria-hidden />
          </button>
          <div className="featured-project__window featured-project__window--resizable">
            <div className="featured-project__window-bar">
              <span /><span /><span />
              <div className="featured-project__address">lwl · operations</div>
            </div>

            <div
              className="featured-project__tabs"
              role="tablist"
              aria-label="Explore the Liquid Washes project"
            >
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const selected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`featured-panel-${tab.id}`}
                    id={`featured-tab-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    className={cn("featured-project__tab", selected && "featured-project__tab--active")}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                      event.preventDefault();
                      const offset = event.key === "ArrowRight" ? 1 : -1;
                      const nextTab = tabs[(index + offset + tabs.length) % tabs.length];
                      setActiveTab(nextTab.id);
                      requestAnimationFrame(() => {
                        document.getElementById(`featured-tab-${nextTab.id}`)?.focus();
                      });
                    }}
                  >
                    <Icon aria-hidden />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              key={activeTab}
              id={`featured-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`featured-tab-${activeTab}`}
              className="featured-project__panel"
            >
              {false && activeTab === "overview" && (
                <div className="featured-project__login" aria-label="Liquid Washes Laundry login screen preview">
                  <div className="featured-project__login-logo">
                    <img src={lwlLogo} alt="Liquide Washes Laundry" width={1062} height={800} />
                  </div>
                  <p className="featured-project__login-subtitle">Liquide Washes Laundry Management System</p>
                  <div className="featured-project__login-field">
                    <User aria-hidden />
                    <div><span>Username</span><strong>Enter username</strong></div>
                  </div>
                  <div className="featured-project__login-field">
                    <LockKeyhole aria-hidden />
                    <div><span>Password</span><strong>Enter password</strong></div>
                    <small>Show</small>
                  </div>
                  <div className="featured-project__login-options"><span /><button type="button">Forgot Password?</button></div>
                  <button className="featured-project__login-button" type="button">
                    Login
                  </button>
                  <div className="featured-project__login-footer">
                    <strong>Liquide Washes Laundry</strong>
                    <span>Centra Market D/109, Al Dhanna City</span>
                    <span>Al Ruwais, Abu Dhabi - UAE</span>
                  </div>
                  <div className="featured-project__services" aria-label="Laundry services">
                    {[["Kandoora", "blue"], ["Abaya", "purple"], ["Saree", "pink"], ["Suit", "indigo"], ["Shirt", "cyan"], ["Jeans", "teal"]].map(([name, color]) => (
                      <span key={name} className={`featured-project__service featured-project__service--${color}`}>{name}</span>
                    ))}
                  </div>
                  <p className="featured-project__caption">Professional cleaning for 43+ laundry items.</p>
                </div>
              )}

              {activeTab === "overview" && (
                <div className="featured-project__screenshots" aria-label="Liquid Washes Laundry app screenshots slideshow">
                  <div className="featured-project__screenshots-toolbar">
                    <strong>{appScreenshots[screenshotIndex].title}</strong>
                  </div>
                  <div
                    className="featured-project__screenshot-frame"
                    onPointerDown={handleScreenshotPointerDown}
                    onPointerUp={handleScreenshotPointerUp}
                    onPointerCancel={() => { swipeStartX.current = null; }}
                    onTouchStart={handleScreenshotTouchStart}
                    onTouchEnd={handleScreenshotTouchEnd}
                    aria-label="Swipe to change screenshot"
                  >
                    <div className="featured-project__screenshot-track" style={{ transform: `translateX(-${screenshotIndex * 100}%)` }}>
                      {appScreenshots.map((screen) => (
                        <div key={screen.title} className="featured-project__screenshot-slide">
                          <img src={screen.src} alt={`${screen.title} screenshot`} />
                          {screen.redactions.map((redaction, index) => <span key={index} className="featured-project__redaction" style={redaction} aria-label="Sensitive information redacted" />)}
                        </div>
                      ))}
                    </div>
                    <button type="button" className="featured-project__slide-button featured-project__slide-button--left" onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()} onClick={() => moveScreenshot(-1)} aria-label="Previous screenshot"><ChevronLeft aria-hidden /></button>
                    <button type="button" className="featured-project__slide-button featured-project__slide-button--right" onPointerDown={(event) => event.stopPropagation()} onPointerUp={(event) => event.stopPropagation()} onClick={() => moveScreenshot(1)} aria-label="Next screenshot"><ChevronRight aria-hidden /></button>
                    <span className="featured-project__screenshot-page">{screenshotIndex + 1} / {appScreenshots.length}</span>
                  </div>
                  <div className="featured-project__screenshot-dots" aria-label="Screenshot navigation">
                    {appScreenshots.map((screen, index) => (
                      <button key={screen.title} type="button" className={cn(index === screenshotIndex && "is-active")} onClick={() => setScreenshotIndex(index)} aria-label={`Show ${screen.title}`} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "workflow" && (
                <div className="featured-project__workflow">
                  {workflow.map((item, index) => (
                    <div key={item} className="featured-project__step">
                      <span><CheckCircle2 aria-hidden /></span>
                      <div>
                        <strong>{item}</strong>
                        <small>Stage {String(index + 1).padStart(2, "0")}</small>
                      </div>
                      {index < workflow.length - 1 && <ArrowUpRight aria-hidden />}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "stack" && (
                <div className="featured-project__stack">
                  {stack.map((item, index) => (
                    <div key={item}>
                      <CircleDot aria-hidden />
                      <span>{item}</span>
                      <small>{index < 3 ? "Application" : "Data & deployment"}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </article>
  );
};

export default FeaturedProject;
