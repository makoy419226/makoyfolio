import { Card } from "@/components/ui/card";
import { Target, Heart, MapPin } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-neutral-50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">About Me</h2>
          <div className="flex gap-1 justify-center">
            <div className="w-4 h-1 bg-google-blue rounded-full"></div>
            <div className="w-4 h-1 bg-google-red rounded-full"></div>
            <div className="w-4 h-1 bg-google-yellow rounded-full"></div>
            <div className="w-4 h-1 bg-google-green rounded-full"></div>
          </div>
        </div>

        {/* Professional Summary */}
        <Card className="border-neutral-200 p-8 shadow-google-lg hover:shadow-google-xl transition-shadow duration-300 animate-slide-up bg-white">
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">Professional Summary</h3>
          <p className="text-neutral-600 leading-relaxed text-lg">
            Dynamic and detail-oriented fresh graduate with a strong interest in project management and information technology. 
            Skilled in systems organization, troubleshooting, and customer resolution, with excellent communication and problem-solving abilities. 
            Highly adaptable, motivated to learn, and committed to contributing effectively to team success and organizational growth.
          </p>
        </Card>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-neutral-200 p-6 shadow-google-lg hover:shadow-google-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up bg-white group" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-google-blue/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-google-blue/20 transition-colors">
              <Target className="w-6 h-6 text-google-blue" />
            </div>
            <h4 className="text-xl font-bold text-neutral-900 mb-3">Career Objective</h4>
            <p className="text-neutral-600 leading-relaxed">
              As a fresh graduate, I am eager to learn and grow as part of your team while contributing to the success of your organization. 
              I am highly motivated to develop my skills, gain valuable experience, and continuously improve through hands-on learning.
            </p>
          </Card>

          <Card className="border-neutral-200 p-6 shadow-google-lg hover:shadow-google-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up bg-white group" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-google-red/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-google-red/20 transition-colors">
              <Heart className="w-6 h-6 text-google-red" />
            </div>
            <h4 className="text-xl font-bold text-neutral-900 mb-3">Commitment</h4>
            <p className="text-neutral-600 leading-relaxed">
              With a strong commitment to excellence and adaptability, I look forward to becoming a dedicated and dependable team member 
              who contributes positively to your goals.
            </p>
          </Card>

          <Card className="border-neutral-200 p-6 shadow-google-lg hover:shadow-google-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up bg-white group" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 bg-google-green/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-google-green/20 transition-colors">
              <MapPin className="w-6 h-6 text-google-green" />
            </div>
            <h4 className="text-xl font-bold text-neutral-900 mb-3">Location</h4>
            <p className="text-neutral-600 leading-relaxed">
              Based in Abu Dhabi, UAE, bringing technical expertise and interpersonal skills to every project and opportunity.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
