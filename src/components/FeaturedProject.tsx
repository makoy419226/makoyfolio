import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  ExternalLink,
  Github,
  Layers3,
  MonitorSmartphone,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import lwlLogo from "@/assets/lwl-logo.webp";

const tabs = [
  { id: "overview", label: "Overview", icon: MonitorSmartphone },
  { id: "workflow", label: "Workflow", icon: Workflow },
  { id: "stack", label: "Stack", icon: Layers3 },
] as const;

type TabId = (typeof tabs)[number]["id"];

const workflow = ["Order intake", "Production tracking", "Billing", "Delivery"];
const stack = ["React", "TypeScript", "Express", "PostgreSQL", "Drizzle ORM", "VPS"];

const FeaturedProject = () => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <article className="featured-project depth-card glass-strong overflow-hidden rounded-[2rem]">
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

        <div className="featured-project__demo p-4 sm:p-6 lg:p-8">
          <div className="featured-project__window">
            <div className="featured-project__window-bar" aria-hidden>
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
              {activeTab === "overview" && (
                <>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      ["Orders", "1,248"],
                      ["Clients", "386"],
                      ["Modules", "12+"],
                    ].map(([label, value]) => (
                      <div key={label} className="featured-project__metric">
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="featured-project__chart" aria-label="Illustrative weekly activity chart">
                    {[46, 68, 54, 82, 72, 94, 76].map((height, index) => (
                      <span key={index} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  <p className="featured-project__caption">
                    One responsive workspace brings daily operations and business visibility together.
                  </p>
                </>
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
        </div>
      </div>
    </article>
  );
};

export default FeaturedProject;
