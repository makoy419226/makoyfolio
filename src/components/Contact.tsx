import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Get In Touch</h2>
          <div className="flex gap-1 justify-center">
            <div className="w-4 h-1 bg-google-blue rounded-full"></div>
            <div className="w-4 h-1 bg-google-red rounded-full"></div>
            <div className="w-4 h-1 bg-google-yellow rounded-full"></div>
            <div className="w-4 h-1 bg-google-green rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let's connect and discuss how we can work together
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
          <Card className="border-border p-6 shadow-google-lg hover:shadow-google-xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-google-blue/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-google-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:Idusma0010@gmail.com"
                  className="text-muted-foreground hover:text-google-blue transition-colors"
                >
                  Idusma0010@gmail.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="border-border p-6 shadow-google-lg hover:shadow-google-xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-google-red/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-google-red" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Phone</h3>
                <a
                  href="tel:+971509317400"
                  className="text-muted-foreground hover:text-google-blue transition-colors"
                >
                  +971 50 931 7400
                </a>
              </div>
            </div>
          </Card>

          <Card className="border-border p-6 shadow-google-lg hover:shadow-google-xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-google-green/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-google-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground">
                  Airport Road, Shakeel Studio Building, Abu Dhabi, UAE
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
