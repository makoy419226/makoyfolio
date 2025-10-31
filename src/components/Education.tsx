import { Card } from "@/components/ui/card";
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "Bohol Island State University",
      date: "June 2025",
      type: "Degree"
    },
    {
      degree: "TVL Track in ICT (Computer Programming)",
      institution: "Cristal-E College",
      date: "March 2020",
      type: "Vocational"
    },
    {
      degree: "Development Program in Computer Literacy Training (Module 2)",
      institution: "ComTech Resources",
      date: "February 2016",
      type: "Training"
    }
  ];

  const certifications = [
    "Computer Literacy Training (Module 2)",
    "Technical Vocational Livelihood Track at ICT strand with specialization in Computer Programming",
    "Bachelor of Science in Computer Engineering"
  ];

  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Education</h2>
          <div className="w-20 h-1 bg-cyan-bright mx-auto rounded-full"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Academic background and professional certifications
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-white/10 p-8 shadow-card backdrop-blur-sm hover:border-cyan-bright/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className="w-14 h-14 bg-cyan-bright/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-7 h-7 text-cyan-bright" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-xl text-cyan-bright mb-3">{edu.institution}</p>
                    <div className="flex flex-wrap gap-4 text-white/70">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {edu.date}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-sm border border-white/20">
                        {edu.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-12">
          <Card className="bg-gradient-card border-white/10 p-8 shadow-card backdrop-blur-sm animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-cyan-bright/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-cyan-bright" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
              </div>
            </div>
            <ul className="space-y-3 list-none">
              {certifications.map((cert, i) => (
                <li key={i} className="text-white/70 leading-relaxed flex items-start gap-3">
                  <span className="text-cyan-bright mt-1">✓</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Education;
