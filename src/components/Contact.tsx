import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Button } from "@/components/ui/button";

const channels = [
  { icon: Mail, label: "Email", value: "idusma0010@gmail.com", href: "mailto:idusma0010@gmail.com", tone: "text-google-blue" },
  { icon: Phone, label: "Phone", value: "+971 50 931 7400", href: "tel:+971509317400", tone: "text-google-red" },
  { icon: MapPin, label: "Location", value: "Abu Dhabi, UAE", href: "#", tone: "text-google-green" },
];

const Contact = () => (
  <section id="contact" className="section-atmosphere relative py-32 px-4">
    <div className="max-w-6xl mx-auto space-y-16">
      <SectionHeading
        eyebrow="06 · Contact"
        title="Available to join immediately."
        description="Open to entry-level IT opportunities supporting business operations and modern technology environments in the UAE."
      />

      <Reveal variant="scale">
        <div className="group depth-card shine-card relative glass-strong rounded-[2.5rem] p-10 md:p-16 overflow-hidden transform-gpu">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/40 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-google-yellow/30 blur-3xl" />

          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight text-balance">
                Need IT support, technical support, or junior web support? <span className="text-gradient">Say hello.</span>
              </h3>
              <p className="mobile-justify-text text-muted-foreground mt-4 max-w-md text-left">
                Available to join immediately and currently under residence visa status.
              </p>
              <a
                href="https://wa.me/971509317400"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6"
              >
                <Button size="lg" className="premium-button rounded-full bg-gradient-accent border-0 ring-glow hover:brightness-110">
                  Message me on WhatsApp <MessageCircle />
                </Button>
              </a>
            </div>

            <div className="space-y-3">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  whileHover={{ x: 6, y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="group group/channel depth-card shine-card flex items-center gap-4 glass rounded-2xl p-4 overflow-hidden transform-gpu"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
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
  </section>
);

export default Contact;
