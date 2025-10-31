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
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">Get In Touch</h2>
          <div className="flex gap-1 justify-center">
            <div className="w-4 h-1 bg-google-blue rounded-full"></div>
            <div className="w-4 h-1 bg-google-red rounded-full"></div>
            <div className="w-4 h-1 bg-google-yellow rounded-full"></div>
            <div className="w-4 h-1 bg-google-green rounded-full"></div>
          </div>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Let's connect and discuss how we can work together
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 animate-slide-up">
            <Card className="border-neutral-200 p-6 shadow-google-lg hover:shadow-google-xl transition-shadow duration-300 bg-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-google-blue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-google-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Email</h3>
                  <a 
                    href="mailto:Idusma0010@gmail.com" 
                    className="text-neutral-600 hover:text-google-blue transition-colors"
                  >
                    Idusma0010@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="border-neutral-200 p-6 shadow-google-lg hover:shadow-google-xl transition-shadow duration-300 bg-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-google-red/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-google-red" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Phone</h3>
                  <a 
                    href="tel:+971568235238" 
                    className="text-neutral-600 hover:text-google-blue transition-colors"
                  >
                    +971 56 823 5238
                  </a>
                </div>
              </div>
            </Card>

            <Card className="border-neutral-200 p-6 shadow-google-lg hover:shadow-google-xl transition-shadow duration-300 bg-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-google-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-google-green" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Location</h3>
                  <p className="text-neutral-600">Airport Road Building, Abu Dhabi, UAE</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-neutral-200 p-8 shadow-google-lg hover:shadow-google-xl transition-shadow duration-300 animate-slide-up bg-white" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-neutral-900 font-medium mb-2 block">Name</label>
                <Input 
                  id="name"
                  placeholder="Your name"
                  className="border-neutral-200 focus:border-google-blue focus:ring-google-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-neutral-900 font-medium mb-2 block">Email</label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="border-neutral-200 focus:border-google-blue focus:ring-google-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="text-neutral-900 font-medium mb-2 block">Message</label>
                <Textarea 
                  id="message"
                  placeholder="Your message..."
                  rows={5}
                  className="border-neutral-200 focus:border-google-blue focus:ring-google-blue resize-none"
                  required
                />
              </div>
              <Button type="submit" variant="google" size="lg" className="w-full group rounded-full">
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
