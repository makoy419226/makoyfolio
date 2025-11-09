import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const WorkExperience = () => {
  return (
    <section id="experience" className="py-20 px-4 bg-background/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Work Experience</h2>
          <div className="flex gap-1 justify-center">
            <div className="w-4 h-1 bg-google-blue rounded-full"></div>
            <div className="w-4 h-1 bg-google-red rounded-full"></div>
            <div className="w-4 h-1 bg-google-yellow rounded-full"></div>
            <div className="w-4 h-1 bg-google-green rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional experience and technical roles
          </p>
        </div>

        {/* Experience Card */}
        <Card className="border-border p-8 shadow-google-lg hover:shadow-google-xl transition-all duration-300 animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-google-blue/20 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-8 h-8 text-google-blue" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Computer Technician</h3>
                <p className="text-google-blue font-medium text-lg">B & J Computers</p>
                <p className="text-muted-foreground">Totolan, Dauis, Bohol</p>
              </div>
              <p className="text-foreground leading-relaxed">
                Assisted in computer repair, maintenance, and software troubleshooting. 
                Supported daily technical operations and provided basic IT assistance to clients, 
                enhancing practical skills in hardware and software systems.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default WorkExperience;
