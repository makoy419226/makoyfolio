import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Button } from "@/components/ui/button";
import ImmersiveSection from "./ImmersiveSection";

const channels = [
  { icon: Mail, label: "Email", value: "idusma0010@gmail.com", href: "mailto:idusma0010@gmail.com", tone: "text-google-blue" },
  { icon: Phone, label: "Phone", value: "+971 50 931 7400", href: "tel:+971509317400", tone: "text-google-red" },
  { icon: MapPin, label: "Location", value: "Abu Dhabi, UAE", href: "https://www.openstreetmap.org/search?query=Abu%20Dhabi%2C%20UAE", tone: "text-google-green" },
];

const Contact = () => {
  const reduceMotion = useReducedMotion();

  return (
    <ImmersiveSection id="contact" className="section-atmosphere relative py-24 px-4">
    <div className="max-w-6xl mx-auto space-y-12">
      <SectionHeading
        eyebrow="06 · Contact"
        title="Available to join immediately."
        description="Open to opportunities across IT support, sales assistance, and administrative roles in the UAE."
      />

      <Reveal variant="scale">
        <div className="group depth-card shine-card relative glass-strong rounded-[2.5rem] p-10 md:p-16 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/22 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-google-yellow/22 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(173_58%_39%/0.10)] blur-3xl" />
          <div className="absolute -bottom-10 left-10 h-40 w-40 rounded-full bg-[hsl(199_89%_48%/0.12)] blur-2xl" />

          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight text-balance">
                Need IT support, technical support, or junior web support? <span className="text-gradient">Say hello.</span>
              </h3>
              <p className="mobile-justify-text text-muted-foreground mt-4 max-w-md text-left">
                Available to join immediately and currently under employment visa status.
              </p>
              <Button asChild size="lg" className="premium-button contact-whatsapp-button mt-6 rounded-full border-0 ring-glow hover:brightness-110">
                <a href="https://wa.me/971509317400" target="_blank" rel="noopener noreferrer">
                  Message me on WhatsApp <MessageCircle />
                </a>
              </Button>
            </div>

            <div className="space-y-3">
              {channels.map((c) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.label === "Location" ? "_blank" : undefined}
                  rel={c.label === "Location" ? "noopener noreferrer" : undefined}
                  whileHover={reduceMotion ? undefined : { x: 6, y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  className="group group/channel depth-card shine-card flex items-center gap-4 glass rounded-2xl p-4 overflow-hidden"
                >
                  <div className={`soft-icon-pop w-11 h-11 rounded-xl bg-background/70 border border-border/45 flex items-center justify-center ${c.tone}`}>
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{c.label}</p>
                    <p className="text-sm font-medium text-foreground">{c.value}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover/channel:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
    </ImmersiveSection>
  );
};

export default Contact;
