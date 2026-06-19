import { Target, Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const values = [
  {
    icon: Target,
    title: "Career objective",
    body:
      "Eager to learn and contribute as part of a strong team — developing skills, gaining experience, and improving through hands-on work.",
    tone: "text-google-blue",
  },
  {
    icon: Heart,
    title: "Commitment",
    body:
      "Committed to excellence and adaptability — a dependable team member who contributes positively to shared goals.",
    tone: "text-google-red",
  },
  {
    icon: MapPin,
    title: "Based in Abu Dhabi",
    body:
      "Bringing technical fluency and steady communication to every project across the UAE and remote teams worldwide.",
    tone: "text-google-green",
  },
];

const About = () => (
  <section id="about" className="relative py-32 px-4">
    <div className="max-w-6xl mx-auto space-y-16">
      <SectionHeading
        eyebrow="01 · About"
        title="Quietly precise. Genuinely curious."
        description="Dynamic and detail-oriented Computer Engineer with a strong interest in project management and IT — skilled in systems organization, troubleshooting, and customer resolution."
      />

      <Reveal variant="up">
        <div className="relative glass-strong rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/30 blur-3xl" />
          <h3 className="relative font-display text-2xl md:text-3xl font-semibold mb-4">
            Professional summary
          </h3>
          <p className="relative text-muted-foreground leading-relaxed text-lg max-w-3xl text-justify">
            I am a BS Computer Engineering graduate with experience in software development,
            AI-assisted development workflows, data handling and business process automation.
            I have worked with technologies such as Python, TypeScript, Vue.js, Node.js, Next.js,
            Git/GitHub, APIs, and modern AI tools including Codex and Claude for feature
            implementation and workflow optimization. In addition to my technical background,
            I am highly adaptable, eager to learn, and capable of working across different
            business and technical functions.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5">
        {values.map((v, i) => (
          <Reveal key={v.title} variant="up" delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="group relative h-full glass rounded-3xl p-6 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className={`relative w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 ${v.tone}`}>
                <v.icon className="w-5 h-5" />
              </div>
              <h4 className="relative font-display text-lg font-semibold mb-2">{v.title}</h4>
              <p className="relative text-sm text-muted-foreground leading-relaxed text-justify">{v.body}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
