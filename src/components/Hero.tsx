import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, Github } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Colorful Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-google-blue/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-google-red/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-56 h-56 bg-google-yellow/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-google-green/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-google-blue/10 border border-google-blue/20">
          <div className="w-2 h-2 bg-google-green rounded-full animate-pulse"></div>
          <span className="text-sm text-neutral-900 font-medium">Available for Opportunities</span>
        </div>

        {/* Profile Image */}
        <div className="relative inline-block animate-scale-in">
          <div className="absolute inset-0 bg-google-blue/20 rounded-full blur-2xl"></div>
          <img 
            src={profileImage} 
            alt="Mark Angelou Idusma" 
            className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-google-xl mx-auto"
          />
        </div>

        {/* Name & Title */}
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 tracking-tight">
            Mark Angelou Idusma
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 font-medium">
            Computer Engineer, CpE
          </p>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Dynamic and detail-oriented fresh graduate with a strong interest in project management and information technology. 
          Skilled in systems organization, troubleshooting, and customer resolution, with excellent communication and problem-solving abilities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button 
            variant="google" 
            size="lg" 
            onClick={scrollToContact}
            className="group rounded-full"
          >
            Get In Touch
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={scrollToAbout}
            className="rounded-full"
          >
            Learn More
          </Button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 text-neutral-600">
          <a 
            href="tel:+971568235238" 
            className="flex items-center gap-2 hover:text-google-blue transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+971 56 823 5238</span>
          </a>
          <a 
            href="mailto:Idusma0010@gmail.com" 
            className="flex items-center gap-2 hover:text-google-blue transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Idusma0010@gmail.com</span>
          </a>
          <a 
            href="https://github.com/makoy419226" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-google-blue transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>@makoy419226</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
