import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Smartphone, Globe } from "lucide-react";
import { motion } from "framer-motion";
import LWLAppPreview from "./LWLAppPreview";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import samaCebuLogo from "@/assets/sama-cebu-logo.png";
import almullaHoldingLogo from "@/assets/almulla-holding-logo.png";

const otherProjects = [
  {
    title: "SAMA-CEBU Translator",
    description:
      "A cross-platform mobile translation app built with Flutter that translates between Sama and Cebuano languages. Supports Android, iOS, Web, Windows, macOS, and Linux platforms.",
    tech: ["Flutter", "Dart", "C++", "Swift", "Python"],
    github: "https://github.com/makoy419226/SAMA-CEBU",
    url: "https://github.com/makoy419226/SAMA-CEBU",
    logo: samaCebuLogo,
    icon: <Globe className="w-6 h-6" />,
    color: "google-blue",
    stars: 1,
  },
  {
    title: "RECORDER — Bisaya-Cenama",
    description:
      "A native Android application built with Kotlin for recording and processing Bisaya-Cenama language content. Features audio recording capabilities and language documentation tools.",
    tech: ["Kotlin", "Android", "Gradle"],
    github: "https://github.com/makoy419226/RECORDER",
    url: "https://github.com/makoy419226/RECORDER",
    icon: <Smartphone className="w-6 h-6" />,
    color: "google-green",
    stars: 0,
  },
  {
    title: "AlMulla Holding Group Website",
    description:
      "A premium corporate website for AlMulla Holding Group, a diversified Dubai-based holding company. Built with React, TypeScript, and Tailwind CSS for a responsive, accessible experience, and deployed on GoDaddy hosting (Apache) with a custom domain.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "GoDaddy"],
    url: "https://almullaholding.com",
    logo: almullaHoldingLogo,
    icon: <Globe className="w-6 h-6" />,
    color: "google-red",
    stars: 0,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          eyebrow="04 · Projects"
          title="Selected work, shipped and live."
          description="Full-stack, mobile, and cross-platform builds — focused on usefulness over polish-for-its-own-sake."
        />

        <Reveal variant="up">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Featured</span>
            <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
          </div>
          <LWLAppPreview />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherProjects.map((project, index) => (
            <Reveal key={project.title} variant="up" delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="group relative glass rounded-3xl p-6 h-full overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/15 via-transparent to-google-yellow/10" />
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  {project.logo ? (
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white/40 ring-1 ring-border/40">
                      <img
                        src={project.logo}
                        alt={`${project.title} logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 bg-${project.color}/20 rounded-2xl flex items-center justify-center flex-shrink-0 text-${project.color}`}
                    >
                      {project.icon}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                    {project.stars > 0 && (
                      <span className="text-sm text-google-yellow">
                        ⭐ {project.stars} star
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-left">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-background/70 text-foreground/80 border border-border/45 backdrop-blur"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 gap-2 rounded-full glass border-border/60 group-hover:border-primary group-hover:text-primary transition-colors"
                  >
                    {project.github ? (
                      <Github className="w-4 h-4" />
                    ) : (
                      <ExternalLink className="w-4 h-4" />
                    )}
                    {project.github ? "View on GitHub" : "Visit Site"}
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </a>
              </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
