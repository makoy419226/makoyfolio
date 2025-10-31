import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MousePointer } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-bright/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <div className="w-2 h-2 bg-cyan-bright rounded-full animate-pulse"></div>
          <span className="text-sm text-white/90">Available for Opportunities</span>
        </div>

        {/* Profile Image */}
        <div className="relative inline-block animate-scale-in">
          <div className="absolute inset-0 bg-cyan-bright/30 rounded-full blur-2xl animate-pulse"></div>
          <img 
            src={profileImage} 
            alt="Mark Angelou Idusma" 
            className="relative w-40 h-40 rounded-full object-cover border-4 border-white/20 shadow-glow mx-auto"
          />
        </div>

        {/* Name & Title */}
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Mark Angelou Idusma
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            Computer Engineer, CpE
          </p>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Dynamic and detail-oriented fresh graduate with a strong interest in project management and information technology. 
          Skilled in systems organization, troubleshooting, and customer resolution, with excellent communication and problem-solving abilities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={scrollToContact}
            className="group"
          >
            Get In Touch
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="heroOutline" 
            size="lg"
            onClick={scrollToAbout}
          >
            Learn More
          </Button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 text-white/70">
          <a 
            href="tel:+971568235238" 
            className="flex items-center gap-2 hover:text-cyan-bright transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+971 56 823 5238</span>
          </a>
          <a 
            href="mailto:Idusma0010@gmail.com" 
            className="flex items-center gap-2 hover:text-cyan-bright transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Idusma0010@gmail.com</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <MousePointer className="w-6 h-6 text-white/50" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
