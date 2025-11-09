import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Server, Briefcase } from "lucide-react";

const Skills = () => {
  const allSkills = [
    "Web Development",
    "Python Programming",
    "Account Management",
    "Troubleshooting",
    "IT Support",
    "Vendor and Client Coordination",
    "Project Management",
    "IT Systems Administration",
    "Process Coordination",
    "Hardware & Software Installation"
  ];

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

        {/* Skills Card */}
        <Card 
          className="border-border p-8 shadow-google-lg hover:shadow-google-xl transition-all duration-300 animate-fade-in"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {allSkills.map((skill) => (
              <Badge 
                key={skill}
                variant="secondary"
                className="bg-secondary text-foreground border-border hover:bg-secondary/80 transition-colors text-sm px-4 py-2"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Skills;
