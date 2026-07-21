import { Target, Heart, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ImmersiveCard from "./ImmersiveCard";
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

const About = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="section-atmosphere relative py-24 px-4">
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
      <SectionHeading
        eyebrow="01 · About"
        title="Computer Engineering graduate with UAE IT experience."
        description="Six months of UAE experience across IT support, troubleshooting, web development, and business systems."
      />

      <Reveal variant="up">
        <motion.div
          whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="group depth-card shine-card relative glass-strong clean-panel rounded-3xl p-8 md:p-12 overflow-hidden"
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

      <StaggerReveal className="grid gap-3 md:grid-cols-3 md:gap-5" childClassName="h-full">
        {values.map((v) => (
          <ImmersiveCard
            key={v.title}
            intensity={3.25}
            perspective={1000}
            className="group depth-card shine-card relative h-full overflow-hidden rounded-2xl p-4 glass clean-panel md:rounded-3xl md:p-6"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-background/55 to-transparent" />
            <div className="relative flex items-start gap-3 md:block">
              <div className={`soft-icon-pop flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-border/45 bg-background/70 md:mb-5 md:h-11 md:w-11 md:rounded-2xl ${v.tone}`}>
                <v.icon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-display text-base font-semibold md:mb-2 md:text-lg">{v.title}</h4>
                <p className="mobile-justify-text relative mt-1 text-left text-sm leading-5 text-muted-foreground md:mt-0 md:leading-relaxed">{v.body}</p>
              </div>
            </div>
          </ImmersiveCard>
        ))}
      </StaggerReveal>
    </div>
    </section>
  );
};

export default About;
