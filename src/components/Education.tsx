import { Calendar, GraduationCap, Award } from "lucide-react";
import DocumentViewer from "./DocumentViewer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import StaggerReveal from "./StaggerReveal";

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
    <section id="education" className="section-atmosphere relative py-32 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          eyebrow="05 · Education"
          title="Education and professional development."
          description="Computer Engineering education with ICT and computer programming foundations."
        />

        <StaggerReveal className="space-y-5" stagger={0.08}>
          {education.map((edu, index) => (
            <div
              key={index}
              className="group depth-card shine-card glass rounded-3xl p-7 md:p-8 transition-colors hover:border-primary/40 overflow-hidden transform-gpu"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className={`soft-icon-pop w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${colorClasses[edu.color as keyof typeof colorClasses]}`}>
                  <GraduationCap className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">{edu.degree}</h3>
                    <p className="text-lg text-primary mb-3 font-medium">{edu.institution}</p>
                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {edu.date}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-background/70 text-sm border border-border/45 font-medium">
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
          <div className="group depth-card shine-card glass-strong rounded-3xl p-8 overflow-hidden transform-gpu">
            <div className="flex items-start gap-4 mb-6">
              <div className="soft-icon-pop w-12 h-12 bg-google-yellow/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-google-yellow" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground">Professional Development</h3>
              </div>
            </div>
            <ul className="space-y-3 list-none">
              {certifications.map((cert, i) => (
                <li key={i} className="text-muted-foreground leading-relaxed flex items-start gap-3">
                  <span className="text-primary mt-1 font-bold">✓</span>
                  <span className="mobile-justify-text">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Documents Viewer */}
        <DocumentViewer />
      </div>
    </section>
  );
};

export default Education;
