import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Server, Briefcase } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Development",
      skills: ["Web Development", "Python Programming"],
      color: "google-blue"
    },
    {
      icon: Server,
      title: "IT & Systems",
      skills: ["IT Systems Administration", "Hardware & Software Installation", "IT Support", "Troubleshooting", "Process Coordination"],
      color: "google-red"
    },
    {
      icon: Briefcase,
      title: "Management",
      skills: ["Project Management", "Account Management", "Vendor and Client Coordination"],
      color: "google-green"
    }
  ];

  const colorClasses = {
    "google-blue": "bg-google-blue/10 group-hover:bg-google-blue/20 text-google-blue",
    "google-red": "bg-google-red/10 group-hover:bg-google-red/20 text-google-red",
    "google-green": "bg-google-green/10 group-hover:bg-google-green/20 text-google-green"
  };

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Skills & Expertise</h2>
          <div className="flex gap-1 justify-center">
            <div className="w-4 h-1 bg-google-blue rounded-full"></div>
            <div className="w-4 h-1 bg-google-red rounded-full"></div>
            <div className="w-4 h-1 bg-google-yellow rounded-full"></div>
            <div className="w-4 h-1 bg-google-green rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technical and management skills from education and training
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className="border-border p-6 shadow-google-lg hover:shadow-google-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill}
                    variant="secondary"
                    className="bg-secondary text-foreground border-border hover:bg-secondary/80 transition-colors"
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
