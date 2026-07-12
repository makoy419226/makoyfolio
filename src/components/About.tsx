import { Target, Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import StaggerReveal from "./StaggerReveal";

const values = [
  {
    icon: Target,
    title: "Target roles",
    body:
      "Seeking an entry-level IT opportunity where practical problem-solving can support business operations and modern technology environments.",
    tone: "text-google-blue",
  },
  {
    icon: Heart,
    title: "Growth mindset",
    body:
      "Strong willingness to learn and adapt to new technologies, with interest in infrastructure, networking, systems administration, and IT operations.",
    tone: "text-google-red",
  },
  {
    icon: MapPin,
    title: "Availability",
    body:
      "Based in Abu Dhabi, UAE, available to join immediately, and currently under residence visa status.",
    tone: "text-google-green",
  },
];

const About = () => (
  <section id="about" className="section-atmosphere relative py-32 px-4">
    <div className="max-w-6xl mx-auto space-y-16">
      <SectionHeading
        eyebrow="01 · About"
        title="Computer Engineering graduate with UAE IT experience."
        description="Six months of UAE experience across IT support, troubleshooting, web development, and business systems."
      />

      <Reveal variant="up">
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="group depth-card shine-card relative glass-strong clean-panel rounded-3xl p-8 md:p-12 overflow-hidden transform-gpu"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <h3 className="relative font-display text-xl md:text-2xl font-semibold mb-4 text-center">
            Professional summary
          </h3>
          <p className="professional-summary mobile-justify-text relative text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
            Computer Engineering graduate with 6 months of UAE experience in IT support and
            web development, providing technical support, troubleshooting hardware and
            software issues, maintaining business systems, and developing full-stack web
            applications. Skilled in user support, system configuration, business operations,
            and digital solutions, with a proactive and adaptable approach to learning new
            technologies.
          </p>
        </motion.div>
      </Reveal>

      <StaggerReveal className="grid md:grid-cols-3 gap-5" childClassName="h-full">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            whileHover={{ y: -8, rotateX: 2, rotateY: i % 2 === 0 ? -2 : 2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="group depth-card shine-card relative h-full glass clean-panel rounded-3xl p-6 overflow-hidden transform-gpu"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-background/55 to-transparent" />
            <div className={`soft-icon-pop relative w-11 h-11 rounded-2xl bg-background/70 border border-border/45 flex items-center justify-center mb-5 ${v.tone}`}>
              <v.icon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>
            <h4 className="relative font-display text-lg font-semibold mb-2">{v.title}</h4>
            <p className="mobile-justify-text relative text-sm text-muted-foreground leading-relaxed text-left">{v.body}</p>
          </motion.div>
        ))}
      </StaggerReveal>
    </div>
  </section>
);

export default About;
