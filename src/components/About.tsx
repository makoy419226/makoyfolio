import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ImmersiveCard from "./ImmersiveCard";
import Reveal from "./Reveal";

const About = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="section-atmosphere relative py-24 px-4">
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
      <SectionHeading
        eyebrow="01 · About"
        title="Early-career professional with UAE work experience."
        description="Six months of UAE experience supporting IT, business operations, and administrative activities."
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
            Early-career professional with 6 months of UAE work experience supporting IT,
            business operations, and administrative activities. Familiar with technical
            assistance, data entry, customer service, sales support, office administration,
            and day-to-day business operations. A quick learner who is adaptable, responsible,
            and willing to take on new responsibilities across IT support, sales assistance,
            and administrative roles. Seeking an opportunity to gain further professional
            experience, contribute to the team, and develop new skills in a supportive work
            environment.
          </p>
        </motion.div>
      </Reveal>

    </div>
    </section>
  );
};

export default About;
