import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const skillGroups = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Responsive UI"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "Express.js", "REST APIs", "Zod", "PostgreSQL", "Drizzle ORM"],
  },
  {
    label: "Tools & Support",
    items: ["Git / GitHub", "Python", "IT Troubleshooting", "Excel & PDF Reporting", "Client Communication"],
  },
];

const Skills = () => (
  <section id="skills" className="relative py-32 px-4">
    <div className="max-w-6xl mx-auto space-y-16">
      <SectionHeading
        eyebrow="02 · Skills"
        title="A toolkit built across systems, code, and people."
        description="Technical fluency paired with operational discipline — shaped through education, training, and real client-facing work."
      />

      <div className="grid md:grid-cols-3 gap-5">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.label} variant="up" delay={gi * 0.08}>
            <motion.div
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="group relative glass clean-panel rounded-3xl p-6 h-full overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-white/30" />
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  0{gi + 1}
                </span>
                <span className="font-display text-sm font-semibold">{group.label}</span>
              </div>
              <ul className="space-y-2">
                {group.items.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.08 + i * 0.04, duration: 0.5 }}
                    className="relative flex items-center gap-3 text-sm text-foreground/90 py-2 border-b border-border/40 last:border-0 transition-transform duration-300 hover:translate-x-1"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-accent transition-transform duration-300 group-hover:scale-125" />
                    {s}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
