import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  Code2,
  Github,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import profilePhoto from "@/assets/profile-transparent.png";

const contactLinks = [
  {
    icon: Phone,
    label: "+971 50 931 7400",
    href: "tel:+971509317400",
  },
  {
    icon: Mail,
    label: "idusma0010@gmail.com",
    href: "mailto:idusma0010@gmail.com",
  },
  {
    icon: Github,
    label: "@makoy419226",
    href: "https://github.com/makoy419226",
    external: true,
  },
];

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-section relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:pt-36">
      <div className="material-shape material-shape--hero" aria-hidden />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="material-status-chip mb-7 inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold uppercase tracking-[0.12em]"
          >
            <span className="material-status-dot" aria-hidden />
            Available immediately · Abu Dhabi, UAE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="material-overline hero-name mb-4"
          >
            Mark Angelou Egam Idusma, CpE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Computer Engineering graduate with UAE experience across IT support,
            troubleshooting, business systems, and full-stack web development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="material-filled-button min-h-14 rounded-full px-7">
              <a href="#contact">
                Let&apos;s talk
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="material-outlined-button min-h-14 rounded-full px-7">
              <a href="#projects">Explore projects</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
          >
            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="material-contact-link inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-medium text-muted-foreground"
              >
                <link.icon className="h-4 w-4 text-primary" />
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[32rem]"
        >
          <div className="material-portrait-halo" aria-hidden />
          <div className="material-portrait-card relative overflow-hidden">
            <div className="material-portrait-topline" aria-hidden />
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] bg-secondary">
              <motion.img
                src={profilePhoto}
                alt="Mark Angelou Egam Idusma"
                className="h-full w-full object-cover object-[50%_42%]"
                whileHover={reduceMotion ? undefined : { scale: 1.025 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.72 }}
            className="material-floating-card absolute -right-2 top-10 hidden items-center gap-3 rounded-2xl p-3 sm:flex"
          >
            <span className="material-icon-container">
              <Code2 className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs font-semibold">IT & Web</span>
              <span className="block text-[11px] text-muted-foreground">Support to deployment</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.82 }}
            className="material-floating-card absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-2xl p-3 sm:flex"
          >
            <span className="material-icon-container material-icon-container--sky">
              <BadgeCheck className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs font-semibold">UAE experience</span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <MapPin className="h-3 w-3" /> Abu Dhabi
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
