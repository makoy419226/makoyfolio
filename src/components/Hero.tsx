import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, Github, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import profileImage from "@/assets/profile.png";

const headlineWords = ["Mark", "Angelou", "Idusma"];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center px-4 pt-32 pb-24 overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center relative z-10"
      >
        {/* Left — copy */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium tracking-wide"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-google-green opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-google-green" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Available for opportunities · Abu Dhabi, UAE
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] font-semibold tracking-tight text-balance">
            {headlineWords.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden align-bottom mr-3">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={
                    i === headlineWords.length - 1
                      ? "inline-block text-gradient"
                      : "inline-block text-foreground"
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
          >
            Computer Engineer crafting calm, reliable systems — blending IT support,
            web development, and project coordination into work that just runs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <a href="#contact">
              <Button size="lg" className="group rounded-full bg-gradient-accent border-0 ring-glow hover:brightness-110">
                Get in touch
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#projects">
              <Button size="lg" variant="outline" className="rounded-full glass border-border/60 hover:border-primary/60">
                View work
              </Button>
            </a>
          </motion.div>

          {/* Contact rail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-sm text-muted-foreground"
          >
            <a href="tel:+971509317400" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="w-3.5 h-3.5 text-primary" />
              +971 50 931 7400
            </a>
            <a href="mailto:Idusma0010@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="w-3.5 h-3.5 text-primary" />
              Idusma0010@gmail.com
            </a>
            <a
              href="https://github.com/makoy419226"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-primary" />
              @makoy419226
            </a>
          </motion.div>
        </div>

        {/* Right — portrait card */}
        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] glass-strong ring-glow overflow-hidden noise">
            <img
              src={profileImage}
              alt="Portrait of Mark Angelou Idusma"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-semibold text-foreground">Computer Engineer, CpE</p>
                <p className="text-[11px] text-muted-foreground">BS · Bohol Island State University</p>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary">2025</span>
            </div>
          </div>

          {/* floating tag */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-10 glass rounded-2xl px-3 py-2 text-[11px] font-medium shadow-google-md"
          >
            <span className="text-primary">●</span> IT Systems · Web · PM
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-3 bottom-16 glass rounded-2xl px-3 py-2 text-[11px] font-medium shadow-google-md"
          >
            <span className="text-google-green">●</span> Open to roles
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
      >
        Scroll
        <span className="block h-10 w-px bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
