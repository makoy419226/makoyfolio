import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, Github, Sparkles } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import profilePhoto from "@/assets/profile.jpg";

const headlineWords = ["Mark", "Angelou", "Egam", "Idusma, CpE"];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 22, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 22, mass: 0.35 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const photoLift = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType === "touch") return;
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;

    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center px-4 pt-32 pb-24 overflow-hidden"
    >
      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="max-w-6xl mx-auto w-full grid lg:grid-cols-[0.86fr_1.14fr] gap-10 items-center relative z-10"
      >
        {/* Left — copy */}
        <div className="space-y-8 max-w-[34rem]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium uppercase shadow-[0_16px_40px_-30px_hsl(var(--primary)/0.8)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-google-green opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-google-green" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Abu Dhabi, UAE · Available immediately
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] font-semibold text-balance">
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
            className="mobile-justify-text text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
          >
            Computer Engineering graduate with 6 months of UAE experience in IT support
            and web development, including technical support, troubleshooting, business
            systems, and full-stack applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <a href="#contact">
              <Button size="lg" className="premium-button group rounded-full bg-gradient-accent border-0 text-primary-foreground ring-glow hover:brightness-125">
                Let's talk
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#projects">
              <Button size="lg" variant="outline" className="premium-button rounded-full glass border-border/60 hover:border-primary/60">
                View projects
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
            <a href="tel:+971509317400" className="group flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="w-3.5 h-3.5 text-primary" />
              +971 50 931 7400
            </a>
            <a href="mailto:idusma0010@gmail.com" className="group flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="w-3.5 h-3.5 text-primary" />
              idusma0010@gmail.com
            </a>
            <a
              href="https://github.com/makoy419226"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-primary" />
              @makoy419226
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="perspective-stage relative order-first lg:order-none mx-auto w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[30rem]"
        >
          <motion.div
            aria-hidden
            style={reduce ? undefined : { y: imageY, scale: imageScale }}
            className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-primary/18 via-background/40 to-google-green/12 blur-2xl"
          />
          <motion.div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={reduce ? undefined : { rotateX, rotateY, y: photoLift, transformPerspective: 1200 }}
            className="group shine-card relative overflow-hidden rounded-[2rem] border border-border/70 bg-background/72 p-2 shadow-google-xl backdrop-blur-xl transform-gpu"
          >
            <motion.div
              style={reduce ? undefined : { y: imageY, scale: imageScale }}
              className="relative overflow-hidden rounded-[1.5rem] bg-white aspect-[5/4]"
            >
              <motion.img
                src={profilePhoto}
                alt="Mark Angelou Egam Idusma"
                className="h-full w-full object-cover object-[50%_42%]"
                whileHover={reduce ? undefined : { scale: 1.035 }}
                transition={{ duration: 0.6 }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
      >
        Scroll
        <span className="block h-10 w-px bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
