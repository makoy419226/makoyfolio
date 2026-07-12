import { Briefcase, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const roles = [
  {
    period: "January 2026 - June 2026",
    title: "IT Support Specialist / Web Developer",
    company: "Middle Class Tourism",
    location: "Al Ruwais, Abu Dhabi, UAE",
    responsibilities: [
      "Developed and maintained the company's web application, implementing new features, resolving bugs, and supporting day-to-day business operations.",
      "Developed and maintained a full-stack company website to support business operations and improve online presence.",
      "Manage business data entry, document processing, and administrative digital workflows.",
      "Collaborate with different departments to support operational efficiency and technology-related initiatives.",
    ],
  },
  {
    period: "September 2024 - Present",
    title: "Freelance Full-Stack Web Developer",
    company: "Independent Projects",
    location: "Remote",
    responsibilities: [
      "Designed, developed, and maintained custom websites and web applications for businesses across multiple industries.",
      "Built responsive corporate websites, business landing pages, and SEO-optimized blog platforms to strengthen clients' online presence and support customer acquisition.",
      "Gathered client requirements and translated business needs into practical digital solutions.",
      "Managed website deployment, hosting, domain and DNS configuration, maintenance, and technical support.",
      "Developed full-stack applications using React, TypeScript, Node.js, Express.js, and PostgreSQL.",
    ],
  },
  {
    period: "September 2020 - October 2025",
    title: "Sales Representative",
    company: "Idusma General Merchandise & Construction Supplies Business",
    location: "Bohol, Philippines",
    responsibilities: [
      "Built upon years of involvement in the family-owned business by taking on regular responsibilities in sales, procurement, inventory management, and customer service.",
      "Assisted customers, suppliers, and contractors with product inquiries and order processing.",
      "Coordinated inventory replenishment and supplier communication to support daily operations.",
    ],
  },
];

const WorkExperience = () => (
  <section id="experience" className="section-atmosphere relative py-32 px-4">
    <div className="max-w-5xl mx-auto space-y-16">
      <SectionHeading
        eyebrow="03 · Experience"
        title="Work experience across IT, web development, and operations."
        description="Practical roles covering technical support, full-stack development, computer servicing, customer service, procurement, inventory, and business coordination."
      />

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" aria-hidden />

        <div className="space-y-12">
          {roles.map((r, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={r.title + i} variant={flip ? "right" : "left"} delay={i * 0.05} amount={0.18}>
                <div className="relative md:grid md:grid-cols-2 md:gap-12">
                  <div className={`${flip ? "md:order-2 md:text-left md:pl-10" : "md:text-right md:pr-10"} pl-12 md:pl-0`}>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{r.period}</span>
                    <h3 className="font-display text-2xl font-semibold mt-2">{r.title}</h3>
                    <p className="text-primary font-medium">{r.company}</p>
                    <p className={`text-sm text-muted-foreground flex items-center gap-1.5 mt-1 ${flip ? "" : "md:justify-end"}`}>
                      <MapPin className="w-3.5 h-3.5" /> {r.location}
                    </p>
                  </div>

                  <motion.span
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-gradient-accent ring-4 ring-background shadow-[0_0_24px_hsl(var(--primary)/0.42)]"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.08 }}
                  />

                  <div className={`mt-4 md:mt-0 pl-12 ${flip ? "md:order-1 md:pr-10 md:pl-0" : "md:pl-10"}`}>
                    <div className="group depth-card shine-card glass rounded-2xl p-6 overflow-hidden transform-gpu">
                      <div className="soft-icon-pop w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <ul className="space-y-2 text-sm text-foreground/90 leading-relaxed">
                        {r.responsibilities.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary/70" />
                            <span className="mobile-justify-text">{item}</span>
                          </li>
                        ))}
                      </ul>
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
