import { Briefcase, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const roles = [
  {
    period: "Jan 2026 — Present",
    title: "IT Support Specialist / Web Developer",
    company: "Middle Class Tourism",
    location: "Abu Dhabi, UAE",
    body:
      "Provide day-to-day IT support and digital operations assistance. Built and maintain a full-stack company website, manage data entry and document workflows, and collaborate across departments to keep business processes running smoothly.",
  },
  {
    period: "Sep 2024 — Present",
    title: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    body:
      "Build responsive websites and custom web apps for small businesses using React, TypeScript, Tailwind, Node.js, Express, and PostgreSQL. Handle requirements, delivery, deployment, and post-launch support end-to-end.",
  },
  {
    period: "Sep 2020 — Oct 2025",
    title: "Sales Representative",
    company: "Family-Owned General Merchandising & Construction Supplies",
    location: "Bohol, PH",
    body:
      "Supported daily operations across sales, customer service, procurement, inventory, and supplier coordination. Built lasting relationships with customers, contractors, and suppliers while developing strong commercial judgement.",
  },
  {
    period: "6-Month Internship",
    title: "Computer Technician",
    company: "B & J Computers",
    location: "Totolan, Dauis, Bohol",
    body:
      "Diagnosed and repaired desktops, laptops, and peripherals. Handled hardware troubleshooting, software installation, system configuration, and routine maintenance while supporting customers with technical issues.",
  },
];

const WorkExperience = () => (
  <section id="experience" className="relative py-32 px-4">
    <div className="max-w-5xl mx-auto space-y-16">
      <SectionHeading
        eyebrow="03 · Experience"
        title="Roles that shaped the craft."
        description="A mix of web development, IT support, and business operations — across UAE and the Philippines."
      />

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" aria-hidden />

        <div className="space-y-12">
          {roles.map((r, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={r.title + i} variant="up" delay={i * 0.05}>
                <div className="relative md:grid md:grid-cols-2 md:gap-12">
                  <div className={`${flip ? "md:order-2 md:text-left md:pl-10" : "md:text-right md:pr-10"} pl-12 md:pl-0`}>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{r.period}</span>
                    <h3 className="font-display text-2xl font-semibold mt-2">{r.title}</h3>
                    <p className="text-primary font-medium">{r.company}</p>
                    <p className={`text-sm text-muted-foreground flex items-center gap-1.5 mt-1 ${flip ? "" : "md:justify-end"}`}>
                      <MapPin className="w-3.5 h-3.5" /> {r.location}
                    </p>
                  </div>

                  <span className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-gradient-accent ring-4 ring-background" />

                  <div className={`mt-4 md:mt-0 pl-12 ${flip ? "md:order-1 md:pr-10 md:pl-0" : "md:pl-10"}`}>
                    <div className="glass rounded-2xl p-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed text-left">
                        {r.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default WorkExperience;
