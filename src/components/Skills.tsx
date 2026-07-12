import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import StaggerReveal from "./StaggerReveal";

const skillGroups = [
  {
    label: "IT Support",
    items: [
      "Desktop and Laptop Support",
      "Hardware Diagnostics",
      "Hardware & Software Troubleshooting",
      "Windows Installation & Configuration",
      "Application Installation",
      "System Configuration",
      "Peripheral Support",
      "Preventive Maintenance",
      "End-User Support",
    ],
  },
  {
    label: "Networking & Systems",
    items: [
      "TCP/IP",
      "LAN/Wi-Fi Troubleshooting",
      "DNS",
      "DHCP",
      "Router Configuration",
      "Basic Network Diagnostics",
      "Windows",
      "Microsoft Office",
      "Outlook",
      "Google Workspace",
      "File & Document Management",
    ],
  },
  {
    label: "Frontend Development",
    items: ["React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Vite"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Express.js", "RESTful API Development", "API Integration"],
  },
  {
    label: "Database & Version Control",
    items: ["SQL", "PostgreSQL", "Drizzle ORM", "Database Design", "Data Modeling", "Git", "GitHub"],
  },
  {
    label: "Web Operations",
    items: [
      "VS Code",
      "Postman",
      "npm",
      "Vercel",
      "Hostinger",
      "GoDaddy",
      "ESLint",
      "Application Deployment",
      "Environment Configuration",
      "Build Management",
      "Domain and DNS Configuration",
      "Production Maintenance",
      "System Monitoring",
      "Technical Troubleshooting",
    ],
  },
  {
    label: "Business Systems",
    items: [
      "ERP Development",
      "Business Process Automation",
      "Workflow Optimization",
      "Reporting",
      "Data Management",
      "Technical Documentation",
    ],
  },
];

const Skills = () => (
  <section id="skills" className="section-atmosphere relative py-32 px-4">
    <div className="max-w-6xl mx-auto space-y-16">
      <SectionHeading
        eyebrow="02 · Skills"
        title="Technical skills across support, systems, and web operations."
        description="IT troubleshooting, networking fundamentals, full-stack development, deployment, and business systems support."
      />

      <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" childClassName="h-full" stagger={0.06}>
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            whileHover={{ y: -8, rotateX: 1.5 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="group depth-card shine-card relative glass clean-panel rounded-3xl p-6 h-full overflow-hidden transform-gpu"
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
                  transition={{ delay: gi * 0.035 + i * 0.025, duration: 0.45 }}
                  className="relative flex items-center gap-3 text-sm text-foreground/90 py-2 border-b border-border/40 last:border-0 transition-transform duration-300 hover:translate-x-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-accent transition-transform duration-300 group-hover:scale-125" />
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </StaggerReveal>
    </div>
  </section>
);

export default Skills;
