import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ImmersiveCard from "./ImmersiveCard";
import Reveal from "./Reveal";
import ImmersiveSection from "./ImmersiveSection";

const About = () => {
  const reduceMotion = useReducedMotion();

  return (
    <ImmersiveSection id="about" className="section-atmosphere relative py-24 px-4">
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
      <SectionHeading
        eyebrow="01 · About"
        title="Full-stack web developer with a computer engineering background."
        description="Building responsive web applications and practical digital tools for businesses."
      />

      <Reveal variant="up">
        <motion.div
          whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="group depth-card shine-card relative glass-strong clean-panel rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[hsl(173_58%_39%/0.14)] blur-3xl" />
          <div className="absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[hsl(38_92%_50%/0.08)] blur-2xl" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <h3 className="relative font-display text-xl md:text-2xl font-semibold mb-4 text-center">
            Professional summary
          </h3>
          <p className="professional-summary mobile-justify-text relative text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
            Full-stack web developer specializing in TypeScript and modern web technologies.
            Experienced in building responsive web applications, improving business workflows,
            and translating requirements into practical technical solutions. Brings a Computer
            Engineering background and hands-on experience with web development, business
            systems, and IT coordination.
          </p>
        </motion.div>
      </Reveal>

    </div>
    </ImmersiveSection>
  );
};

export default About;
