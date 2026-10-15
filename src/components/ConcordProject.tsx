import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  ClipboardList,
  FileCheck2,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const previewTabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "departments", label: "Departments", icon: CheckCheck },
  { id: "tasks", label: "Tasks & files", icon: ListTodo },
] as const;

type PreviewTab = (typeof previewTabs)[number]["id"];

const statusStyles = {
  Complete: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Review: "border-amber-200 bg-amber-50 text-amber-800",
  Active: "border-blue-200 bg-blue-50 text-blue-700",
};

const MockStatus = ({ status }: { status: keyof typeof statusStyles }) => (
  <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold", statusStyles[status])}>
    {status}
  </span>
);

const OverviewPreview = () => (
  <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
    <section className="rounded-xl border border-slate-200 bg-white p-3 sm:col-span-2" aria-label="Project overview preview">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-medium text-slate-500">Project overview</p>
          <h4 className="text-sm font-bold text-slate-900">DS415 coordination</h4>
        </div>
        <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold text-blue-700">View project</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[["Active workstreams", "08"], ["Open tasks", "24"], ["Files in review", "06"]].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-slate-50 p-2.5">
            <p className="text-[9px] leading-tight text-slate-500">{label}</p>
            <p className="mt-1 text-lg font-bold leading-none text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-slate-800"><FolderKanban className="h-3.5 w-3.5 text-blue-600" /> Workstreams</div>
      {[["Site coordination", "68%"], ["Document review", "82%"], ["Team handover", "45%"]].map(([label, value]) => (
        <div key={label} className="mb-2.5 last:mb-0">
          <div className="mb-1 flex justify-between text-[9px] text-slate-600"><span>{label}</span><span>{value}</span></div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: value }} /></div>
        </div>
      ))}
    </section>
    <section className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-slate-800"><span className="flex items-center gap-2"><Bell className="h-3.5 w-3.5 text-blue-600" /> Updates</span><span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[9px] text-blue-700">3 new</span></div>
      <p className="border-t border-slate-100 py-2 text-[9px] text-slate-600">A document is ready for review</p>
      <p className="border-t border-slate-100 py-2 text-[9px] text-slate-600">A task was assigned to your team</p>
    </section>
  </div>
);

const DepartmentsPreview = () => (
  <section className="overflow-hidden rounded-xl border border-slate-200 bg-white" aria-label="Department coordination preview">
    <div className="flex items-center justify-between border-b border-slate-200 px-3 py-3">
      <div><p className="text-[10px] text-slate-500">DS415 coordination</p><h4 className="text-sm font-bold text-slate-900">Department progress</h4></div>
      <span className="rounded-lg border border-slate-200 px-2 py-1 text-[9px] font-semibold text-slate-600">All teams</span>
    </div>
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-slate-100 bg-slate-50 px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
      <span>Department</span><span>Owner</span><span>Status</span>
    </div>
    {[["Engineering", "Team lead", "Complete"], ["Procurement", "Coordinator", "Review"], ["Site team", "Supervisor", "Active"], ["Document control", "Controller", "Complete"]].map(([department, owner, status]) => (
      <div key={department} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 border-b border-slate-100 px-3 py-3 last:border-b-0">
        <span className="text-[10px] font-medium text-slate-800">{department}</span>
        <span className="text-[9px] text-slate-500">{owner}</span>
        <MockStatus status={status as keyof typeof statusStyles} />
      </div>
    ))}
  </section>
);

const TasksPreview = () => (
  <div className="grid gap-3 sm:grid-cols-[1fr_0.9fr]">
    <section className="rounded-xl border border-slate-200 bg-white p-3" aria-label="Task tracking preview">
      <div className="mb-2 flex items-center justify-between"><h4 className="text-xs font-bold text-slate-900">My tasks</h4><span className="text-[9px] font-semibold text-blue-700">See all</span></div>
      {[["Review coordination plan", "Today", "Review"], ["Confirm team assignments", "Tomorrow", "Active"], ["Prepare handover notes", "Oct 20", "Complete"]].map(([task, date, status]) => (
        <div key={task} className="flex items-center gap-2 border-t border-slate-100 py-2.5 first:border-t-0">
          <span className={cn("grid h-4 w-4 shrink-0 place-items-center rounded border", status === "Complete" ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent")}><Check className="h-2.5 w-2.5" /></span>
          <span className="min-w-0 flex-1 text-[9px] font-medium text-slate-700">{task}<small className="block text-slate-400">Due {date}</small></span>
          <MockStatus status={status as keyof typeof statusStyles} />
        </div>
      ))}
    </section>
    <section className="rounded-xl border border-slate-200 bg-white p-3" aria-label="Document control preview">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-900"><FileCheck2 className="h-3.5 w-3.5 text-blue-600" /> Recent files</div>
      {[["Coordination-plan.pdf", "Updated today"], ["Site-handover.docx", "Updated yesterday"], ["Team-briefing.pdf", "Oct 16"]].map(([file, date]) => (
        <div key={file} className="flex items-center gap-2 border-t border-slate-100 py-2 first:border-t-0">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-blue-50 text-blue-700"><ClipboardList className="h-3.5 w-3.5" /></span>
          <span className="min-w-0 truncate text-[9px] font-medium text-slate-700">{file}<small className="block font-normal text-slate-400">{date}</small></span>
        </div>
      ))}
    </section>
  </div>
);

const previews: Record<PreviewTab, () => JSX.Element> = {
  overview: OverviewPreview,
  departments: DepartmentsPreview,
  tasks: TasksPreview,
};

const ConcordProject = () => {
  const [activePreview, setActivePreview] = useState<PreviewTab>("overview");
  const Preview = previews[activePreview];

  return (
    <article className="depth-card glass-strong overflow-hidden rounded-[2rem]">
      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10">
              <FolderKanban className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <span className="material-status-chip inline-flex min-h-8 items-center gap-2 rounded-full px-3 text-[11px] font-bold uppercase tracking-[0.12em]">
                <span className="material-status-dot" aria-hidden />
                Internal project system
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">Concord Project Management System</h3>
              <p className="mt-1 font-medium text-primary">Concord Stars Contracting LLC · DS415</p>
            </div>
          </div>

          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            A web-based project management system built for the DS415 project. It brings department progress, task tracking, document control, and notifications into one shared workspace.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["React", "TypeScript", "Express", "PostgreSQL", "Drizzle ORM"].map((item) => (
              <Badge key={item} variant="secondary" className="border border-border/60 bg-background/70">{item}</Badge>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCheck className="h-4 w-4 text-primary" aria-hidden />
            Built to connect multiple project departments and their workflows.
          </div>
        </div>

        <div className="border-t border-border/60 bg-slate-50/70 p-4 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 py-2.5 sm:px-4">
              <div className="flex min-w-0 items-center gap-2">
                <FolderKanban className="h-4 w-4 shrink-0 text-blue-700" aria-hidden />
                <span className="truncate text-[11px] font-bold text-slate-800">Project Management System</span>
              </div>
              <span className="shrink-0 rounded-full bg-amber-50 px-2 py-1 text-[9px] font-semibold text-amber-800">Illustrative preview · sample data</span>
            </div>

            <div className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-2 pt-2" role="tablist" aria-label="Concord project preview screens">
              {previewTabs.map((tab) => {
                const Icon = tab.icon;
                const selected = activePreview === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="concord-preview-panel"
                    id={`concord-preview-tab-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    className={cn("flex min-h-10 shrink-0 items-center gap-1.5 border-b-2 px-2.5 text-[10px] font-semibold transition-colors sm:px-3", selected ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800")}
                    onClick={() => setActivePreview(tab.id)}
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                      event.preventDefault();
                      const offset = event.key === "ArrowRight" ? 1 : -1;
                      const nextTab = previewTabs[(previewTabs.findIndex((item) => item.id === tab.id) + offset + previewTabs.length) % previewTabs.length];
                      setActivePreview(nextTab.id);
                      requestAnimationFrame(() => document.getElementById(`concord-preview-tab-${nextTab.id}`)?.focus());
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div id="concord-preview-panel" role="tabpanel" aria-labelledby={`concord-preview-tab-${activePreview}`} className="min-h-[17rem] bg-slate-50 p-3 sm:min-h-[19rem] sm:p-4">
              <Preview />
            </div>
          </div>
          <p className="mt-2 text-right text-[10px] text-muted-foreground">Concept views illustrate the system workflows; sample values are not live records.</p>
        </div>
      </div>
    </article>
  );
};

export default ConcordProject;
