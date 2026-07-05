import { Briefcase, MapPin } from "lucide-react";
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
      "Managed business data entry, document processing, and administrative digital workflows.",
      "Collaborated with different departments to support operational efficiency and technology-related initiatives.",
    ],
  },
  {
    period: "September 2024 - Present",
    title: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    responsibilities: [
      "Develop responsive websites, blogs, and custom web solutions for small businesses and individual clients.",
      "Build modern web applications using React, TypeScript, Tailwind CSS, Node.js, Express.js, and PostgreSQL.",
      "Gather client requirements, translate business needs into technical solutions, and deliver projects within agreed timelines.",
      "Integrate APIs, implement responsive user interfaces, and optimize website performance across devices.",
      "Manage project communication, documentation, testing, deployment, and post-launch support.",
      "Utilize Git and GitHub for version control and efficient project management.",
    ],
  },
  {
    period: "6-Month Internship",
    title: "Computer Technician",
    company: "B & J Computers",
    location: "Totolan, Dauis, Bohol",
    responsibilities: [
      "Assisted in diagnosing, repairing, and maintaining desktop computers, laptops, and peripheral devices.",
      "Performed hardware troubleshooting, component replacement, software installation, and system configuration.",
      "Conducted routine maintenance to improve system performance and reliability.",
      "Provided technical assistance and support to customers regarding hardware and software issues.",
      "Supported daily shop operations while developing practical experience in computer servicing and troubleshooting.",
    ],
  },
  {
    period: "September 2020 - October 2025",
    title: "Sales Representative",
    company: "Family-Owned General Merchandising & Construction Supplies Business",
    location: "Bohol, Philippines",
    responsibilities: [
      "Supported daily business operations involving sales, customer service, procurement, inventory management, and supplier coordination.",
      "Built and maintained strong relationships with customers, suppliers, contractors, and business partners.",
      "Assisted in sales negotiations, pricing discussions, and order processing to support business growth and customer satisfaction.",
      "Monitored inventory levels and coordinated stock replenishment to ensure product availability.",
      "Developed strong communication, negotiation, and relationship-management skills through direct customer interaction.",
      "Gained experience in business operations, procurement, logistics coordination, and commercial decision-making within the construction supplies industry.",
      "Demonstrated adaptability, initiative, and an entrepreneurial mindset through active participation in a family-run business.",
    ],
  },
];

const WorkExperience = () => (
  <section id="experience" className="relative py-32 px-4">
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
