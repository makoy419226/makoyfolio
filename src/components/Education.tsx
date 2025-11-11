import { Card } from "@/components/ui/card";
import { Calendar, GraduationCap, Award } from "lucide-react";
import DocumentViewer from "./DocumentViewer";

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
    "Bachelor of Science in Computer Engineering"
  ];

  const colorClasses = {
    "google-blue": "bg-google-blue/20 text-google-blue",
    "google-red": "bg-google-red/20 text-google-red",
    "google-green": "bg-google-green/20 text-google-green"
  };

  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Education</h2>
          <div className="flex gap-1 justify-center">
            <div className="w-4 h-1 bg-google-blue rounded-full"></div>
            <div className="w-4 h-1 bg-google-red rounded-full"></div>
            <div className="w-4 h-1 bg-google-yellow rounded-full"></div>
            <div className="w-4 h-1 bg-google-green rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Academic background and professional certifications
          </p>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card 
              key={index}
              className="border-border p-8 shadow-google-lg hover:shadow-google-xl transition-all duration-300 animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${colorClasses[edu.color as keyof typeof colorClasses]}`}>
                  <GraduationCap className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{edu.degree}</h3>
                    <p className="text-xl text-google-blue mb-3 font-medium">{edu.institution}</p>
                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {edu.date}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary text-sm border border-border font-medium">
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
          <Card className="border-border p-8 shadow-google-lg hover:shadow-google-xl transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-google-yellow/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-google-yellow" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Certifications</h3>
              </div>
            </div>
            <ul className="space-y-3 list-none">
              {certifications.map((cert, i) => (
                <li key={i} className="text-muted-foreground leading-relaxed flex items-start gap-3">
                  <span className="text-google-blue mt-1 font-bold">✓</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Documents Viewer */}
        <DocumentViewer />
      </div>
    </section>
  );
};

export default Education;
