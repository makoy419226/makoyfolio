import { Briefcase, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ImmersiveSection from "./ImmersiveSection";

const roles = [
  {
    period: "January 2026 - June 2026",
    title: "IT Support Specialist / Web Developer",
    company: "Middle Class Tourism",
    location: "Abu Dhabi, UAE",
    responsibilities: [
      "Supported daily business operations by troubleshooting software issues, configuring user systems, and maintaining business applications.",
      "Enhanced the company's web application by implementing new features, resolving technical issues, and supporting production operations.",
      "Organised digital records, data-entry activities, and document-processing workflows to support accurate and accessible business information.",
      "Coordinated with different departments to identify technical requirements and deliver practical website and system improvements.",
    ],
  },
  {
    period: "September 2024 - Present",
    title: "Freelance Full-Stack Web Developer",
    company: "Independent Projects",
    location: "",
    responsibilities: [
      "Designed and developed websites and full-stack web applications for businesses across multiple industries.",
      "Built corporate websites, landing pages, and SEO-friendly content platforms.",
      "Translated business requirements into practical features, workflows, and digital solutions.",
      "Handled application development, deployment, hosting, DNS configuration, maintenance, and technical support.",
    ],
  },
  {
    period: "February 2020 - October 2025",
    title: "Sales Representative and Operations Assistant",
    company: "",
    location: "",
    responsibilities: [
      "Years of involvement in family-owned business by taking on regular responsibilities in sales, procurement, inventory management, and customer service.",
      "Assisted customers, suppliers, and contractors with product inquiries and order processing.",
      "Coordinated inventory replenishment and supplier communication to support daily operations.",
    ],
  },
];

const iconTokens = [
  "bg-primary/10 text-primary ring-1 ring-primary/10",
  "bg-[hsl(173_58%_39%/0.10)] text-[hsl(173_58%_39%)] ring-1 ring-[hsl(173_58%_39%/0.14)]",
  "bg-[hsl(38_92%_50%/0.12)] text-[hsl(25_95%_45%)] ring-1 ring-[hsl(38_92%_50%/0.18)]",
] as const;

const dotTokens = [
  "bg-primary/70",
  "bg-[hsl(173_58%_39%/0.75)]",
  "bg-[hsl(38_92%_50%/0.85)]",
] as const;

const WorkExperience = () => {
  return (
    <ImmersiveSection id="experience" className="section-atmosphere relative px-4 py-24">
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-12">
        <SectionHeading
          eyebrow="03 · Experience"
          title="Professional Experience"
          description="Work experience supporting IT, business operations, web development, and administrative activities."
        />

        <div className="space-y-4 md:space-y-5">
          {roles.map((role, index) => (
            <Reveal key={`${role.title}-${index}`} variant="up" delay={index * 0.05} amount={0.12}>
              <article className="work-experience-card rounded-2xl border border-border/65 bg-card/70 p-5 shadow-sm backdrop-blur-sm transition-shadow duration-200 hover:shadow-md md:p-7">
                <div className="flex items-start gap-4">
                  <div className={`hidden h-10 w-10 flex-none items-center justify-center rounded-xl sm:flex ${iconTokens[index % iconTokens.length]}`}>
                    <Briefcase className="h-5 w-5" aria-hidden />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{role.period}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-foreground md:text-2xl">{role.title}</h3>

                    {(role.company || role.location) && (
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        {role.company && <span className="font-medium text-primary">{role.company}</span>}
                        {role.location && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" aria-hidden />
                            {role.location}
                          </span>
                        )}
                      </div>
                    )}

                    <ul className="mt-5 grid gap-2 text-sm leading-relaxed text-foreground/90 md:grid-cols-2 md:gap-x-8">
                      {role.responsibilities.map((responsibility) => (
                        <li key={responsibility} className="flex items-start gap-2">
                          <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${dotTokens[index % dotTokens.length]}`} />
                          <span className="mobile-justify-text">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </ImmersiveSection>
  );
};

export default WorkExperience;
