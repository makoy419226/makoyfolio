import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Server, Briefcase } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Development",
      skills: ["Web Development", "Python Programming", "Computer Programming"]
    },
    {
      icon: Server,
      title: "IT & Systems",
      skills: ["IT Systems Administration", "Troubleshooting", "Process Coordination"]
    },
    {
      icon: Briefcase,
      title: "Management",
      skills: ["Project Management", "Account Management", "Vendor and Client Coordination"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-cyan-bright mx-auto rounded-full"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Technical and management skills from education and training
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className="bg-gradient-card border-white/10 p-6 shadow-card backdrop-blur-sm hover:scale-105 transition-transform duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-cyan-bright/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <category.icon className="w-6 h-6 text-cyan-bright" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill}
                    variant="secondary"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
