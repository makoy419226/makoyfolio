import { Briefcase, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const WorkExperience = () => (
  <section id="experience" className="relative py-32 px-4">
    <div className="max-w-5xl mx-auto space-y-16">
      <SectionHeading
        eyebrow="03 · Experience"
        title="Hands-on roles that shaped the craft."
        description="Foundational work in technical operations — keeping people unblocked and systems running."
      />

      <div className="relative">
        {/* spine */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" aria-hidden />

        <Reveal variant="up">
          <div className="relative md:grid md:grid-cols-2 md:gap-12">
            <div className="md:text-right md:pr-10 pl-12 md:pl-0">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">2020 — 2022</span>
              <h3 className="font-display text-2xl font-semibold mt-2">Computer Technician</h3>
              <p className="text-primary font-medium">B &amp; J Computers</p>
              <p className="text-sm text-muted-foreground flex md:justify-end items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5" /> Totolan, Dauis, Bohol
              </p>
            </div>

            {/* node */}
            <span className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-gradient-accent ring-4 ring-background" />

            <div className="mt-4 md:mt-0 md:pl-10 pl-12">
              <div className="glass rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed text-justify">
                  Assisted in computer repair, maintenance, and software troubleshooting.
                  Supported daily technical operations and provided IT assistance to clients —
                  sharpening practical skills across hardware and software systems.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default WorkExperience;
