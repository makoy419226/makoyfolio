import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Get In Touch</h2>
          <div className="w-20 h-1 bg-cyan-bright mx-auto rounded-full"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Let's connect and discuss how we can work together
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 animate-slide-up">
            <Card className="bg-gradient-card border-white/10 p-6 shadow-card backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-bright/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-cyan-bright" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <a 
                    href="mailto:Idusma0010@gmail.com" 
                    className="text-white/70 hover:text-cyan-bright transition-colors"
                  >
                    Idusma0010@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-white/10 p-6 shadow-card backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-bright/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-cyan-bright" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                  <a 
                    href="tel:+971568235238" 
                    className="text-white/70 hover:text-cyan-bright transition-colors"
                  >
                    +971 56 823 5238
                  </a>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-white/10 p-6 shadow-card backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-bright/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-cyan-bright" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                  <p className="text-white/70">Airport Road Building, Abu Dhabi, UAE</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-gradient-card border-white/10 p-8 shadow-card backdrop-blur-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-white font-medium mb-2 block">Name</label>
                <Input 
                  id="name"
                  placeholder="Your name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-bright"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-white font-medium mb-2 block">Email</label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-bright"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="text-white font-medium mb-2 block">Message</label>
                <Textarea 
                  id="message"
                  placeholder="Your message..."
                  rows={5}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-bright resize-none"
                  required
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full group">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
