import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Briefcase } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "IT Intern",
      company: "Tech Solutions Inc.",
      location: "Abu Dhabi, UAE",
      period: "Jan 2024 - Present",
      description: [
        "Assisted in troubleshooting hardware and software issues for over 50+ employees",
        "Contributed to the development and maintenance of internal web applications",
        "Collaborated with senior developers on Python automation projects",
        "Provided technical support and documentation for IT systems"
      ]
    },
    {
      title: "Web Development Project",
      company: "University Final Year Project",
      location: "Philippines",
      period: "Sep 2023 - Dec 2023",
      description: [
        "Led a team of 4 students in developing a full-stack web application",
        "Implemented responsive design using modern HTML, CSS, and JavaScript frameworks",
        "Integrated database management systems for data persistence",
        "Presented project to faculty and received high marks for innovation"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Experience</h2>
          <div className="w-20 h-1 bg-cyan-bright mx-auto rounded-full"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Building a foundation through hands-on learning and real-world projects
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-white/10 p-8 shadow-card backdrop-blur-sm hover:border-cyan-bright/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className="w-14 h-14 bg-cyan-bright/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-7 h-7 text-cyan-bright" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-xl text-cyan-bright mb-3">{exp.company}</p>
                    <div className="flex flex-wrap gap-4 text-white/70">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2 list-none">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-white/70 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-bright mt-1">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
