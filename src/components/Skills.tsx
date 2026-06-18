import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const skillGroups = [
  {
    label: "Engineering",
    items: ["Web Development", "Python Programming", "Hardware & Software Installation", "Troubleshooting"],
  },
  {
    label: "Operations",
    items: ["IT Support", "IT Systems Administration", "Process Coordination"],
  },
  {
    label: "Collaboration",
    items: ["Project Management", "Vendor & Client Coordination", "Account Management"],
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
            <div className="glass rounded-3xl p-6 h-full">
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
                    className="flex items-center gap-3 text-sm text-foreground/90 py-2 border-b border-border/40 last:border-0"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-accent" />
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
