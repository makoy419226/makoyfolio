import { Calendar, GraduationCap, Award, CheckCircle2 } from "lucide-react";
import DocumentViewer from "./DocumentViewer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import StaggerReveal from "./StaggerReveal";
import CVViewer from "./CVViewer";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "Bohol Island State University",
      date: "June 2025",
      type: "Degree",
      color: "google-blue"
    },
    {
      degree: "TVL - Information and Communication Technology",
      institution: "Cristal-E College",
      date: "March 2020",
      type: "Computer Programming",
      color: "google-red"
    }
  ];

  const certifications = [
    "Computer Literacy Training (Module 2)",
    "Google Developer Student Clubs (GDSC) — Member, Bohol Island State University",
    "Research Assistant — Cenama–Cebuano Translator Research Project (Certified Research Assistant)"
  ];

  const colorClasses = {
    "google-blue": "bg-google-blue/20 text-google-blue",
    "google-red": "bg-google-red/20 text-google-red",
    "google-green": "bg-google-green/20 text-google-green"
  };

  return (
    <section id="education" className="section-atmosphere relative py-24 px-4">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        <SectionHeading
          eyebrow="05 · Education"
          title="Education and professional development."
          description="Computer Engineering education with ICT and computer programming foundations."
        />

        <StaggerReveal className="space-y-3 md:space-y-5" stagger={0.08}>
          {education.map((edu, index) => (
            <div
              key={index}
              className="group depth-card shine-card overflow-hidden rounded-2xl p-4 glass transition-colors hover:border-primary/40 md:rounded-3xl md:p-8"
            >
              <div className="flex items-start gap-3 md:gap-6">
                {/* Icon */}
                <div className={`soft-icon-pop flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl md:h-14 md:w-14 md:rounded-2xl ${colorClasses[edu.color as keyof typeof colorClasses]}`}>
                  <GraduationCap className="h-5 w-5 md:h-7 md:w-7" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 space-y-2 md:space-y-3">
                  <div>
                    <h3 className="mb-1 font-display text-lg font-semibold leading-snug text-foreground md:mb-2 md:text-2xl">{edu.degree}</h3>
                    <p className="mb-2 text-sm font-medium text-primary md:mb-3 md:text-lg">{edu.institution}</p>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground md:gap-4">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {edu.date}
                      </span>
                      <span className="rounded-full border border-border/45 bg-background/70 px-2.5 py-0.5 text-xs font-medium md:px-3 md:py-1 md:text-sm">
                        {edu.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>

        {/* Certifications */}
        <Reveal variant="lift">
          <div className="group depth-card shine-card overflow-hidden rounded-2xl p-4 glass-strong md:rounded-3xl md:p-8">
            <div className="mb-4 flex items-start gap-3 md:mb-6 md:gap-4">
              <div className="soft-icon-pop flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-google-yellow/20 md:h-12 md:w-12 md:rounded-2xl">
                <Award className="h-5 w-5 text-google-yellow md:h-6 md:w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground md:text-2xl">Professional Development</h3>
              </div>
            </div>
            <ul className="list-none space-y-2 md:space-y-3">
              {certifications.map((cert, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-5 text-muted-foreground md:gap-3 md:text-base md:leading-relaxed">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-primary" aria-hidden />
                  <span className="mobile-justify-text">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Documents Viewer */}
        <DocumentViewer />

        {/* Live CV Viewer */}
        <CVViewer />
      </div>
    </section>
  );
};

export default Education;
