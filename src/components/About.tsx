import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Heart } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
          <div className="w-20 h-1 bg-cyan-bright mx-auto rounded-full"></div>
        </div>

        {/* Professional Summary */}
        <Card className="bg-gradient-card border-white/10 p-8 shadow-card backdrop-blur-sm animate-slide-up">
          <h3 className="text-2xl font-bold text-white mb-4">Professional Summary</h3>
          <p className="text-white/70 leading-relaxed text-lg">
            Dynamic and detail-oriented fresh graduate with a strong interest in project management and information technology. 
            Skilled in systems organization, troubleshooting, and customer resolution, with excellent communication and problem-solving abilities.
          </p>
          <p className="text-white/70 leading-relaxed text-lg mt-4">
            Highly adaptable, motivated to learn, and committed to contributing effectively to team success and organizational growth. 
            Based in Abu Dhabi, UAE, I bring a unique blend of technical expertise and interpersonal skills to every project.
          </p>
        </Card>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-white/10 p-6 shadow-card backdrop-blur-sm hover:scale-105 transition-transform duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-cyan-bright/20 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-cyan-bright" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Career Objective</h4>
            <p className="text-white/70 leading-relaxed">
              Eager to learn and grow as part of your team while contributing to organizational success through hands-on learning and continuous improvement.
            </p>
          </Card>

          <Card className="bg-gradient-card border-white/10 p-6 shadow-card backdrop-blur-sm hover:scale-105 transition-transform duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-cyan-bright/20 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-cyan-bright" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Values</h4>
            <p className="text-white/70 leading-relaxed">
              Strong commitment to excellence, adaptability, and becoming a dedicated team member who contributes positively to organizational goals.
            </p>
          </Card>

          <Card className="bg-gradient-card border-white/10 p-6 shadow-card backdrop-blur-sm hover:scale-105 transition-transform duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 bg-cyan-bright/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-cyan-bright" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Growth Mindset</h4>
            <p className="text-white/70 leading-relaxed">
              Highly motivated to develop skills and gain valuable experience through continuous learning and embracing new challenges.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
