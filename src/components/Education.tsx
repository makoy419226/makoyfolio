import { Calendar, GraduationCap, Award } from "lucide-react";
import DocumentViewer from "./DocumentViewer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

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
      degree: "TVL Track in ICT (Computer Programming)",
      institution: "Cristal-E College",
      date: "March 2020",
      type: "Vocational",
      color: "google-red"
    },
    {
      degree: "Development Program in Computer Literacy Training (Module 2)",
      institution: "ComTech Resources",
      date: "February 2016",
      type: "Training",
      color: "google-green"
    }
  ];

  const certifications = [
    "Computer Literacy Training (Module 2)",
    "Technical Vocational Livelihood Track at ICT strand with specialization in Computer Programming",
    "Bachelor of Science in Computer Engineering",
    "Certificate of Recognition - Research Assistant"
  ];

  const colorClasses = {
    "google-blue": "bg-google-blue/20 text-google-blue",
    "google-red": "bg-google-red/20 text-google-red",
    "google-green": "bg-google-green/20 text-google-green"
  };

  return (
    <section id="education" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          eyebrow="05 · Education"
          title="Studied long. Still learning."
          description="Academic background and certifications backing the professional work."
        />

        <div className="space-y-5">
          {education.map((edu, index) => (
            <Reveal key={index} variant="up" delay={index * 0.06}>
            <div
              className="glass rounded-3xl p-7 md:p-8 group transition-colors hover:border-primary/40"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${colorClasses[edu.color as keyof typeof colorClasses]}`}>
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
                      <span className="px-3 py-1 rounded-full bg-white/5 text-sm border border-white/10 font-medium">
                        {edu.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications */}
        <Reveal variant="up">
          <div className="glass-strong rounded-3xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-google-yellow/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-google-yellow" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground">Certifications</h3>
              </div>
            </div>
            <ul className="space-y-3 list-none">
              {certifications.map((cert, i) => (
                <li key={i} className="text-muted-foreground leading-relaxed flex items-start gap-3">
                  <span className="text-primary mt-1 font-bold">✓</span>
                  <span>{cert}</span>
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
