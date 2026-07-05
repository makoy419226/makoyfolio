import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Globe, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import LWLAppPreview from "./LWLAppPreview";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import almullaHoldingLogo from "@/assets/almulla-holding-logo.png";
import samaCebuLogo from "@/assets/sama-cebu-logo.png";

const otherProjects = [
  {
    title: "SAMA-CEBU Translator",
    description:
      "A cross-platform mobile translation app built with Flutter that translates between Sama and Cebuano languages. Supports Android, iOS, Web, Windows, macOS, and Linux platforms.",
    tech: ["Flutter", "Dart", "C++", "Swift", "Python"],
    url: "https://github.com/makoy419226/SAMA-CEBU",
    github: true,
    logo: samaCebuLogo,
    icon: <Globe className="w-6 h-6" />,
    iconClass: "bg-google-blue/20 text-google-blue",
    stars: 1,
  },
  {
    title: "RECORDER - Bisaya-Cenama",
    description:
      "A native Android application built with Kotlin for recording and processing Bisaya-Cenama language content. Features audio recording capabilities and language documentation tools.",
    tech: ["Kotlin", "Android", "Gradle"],
    url: "https://github.com/makoy419226/RECORDER",
    github: true,
    icon: <Smartphone className="w-6 h-6" />,
    iconClass: "bg-google-green/20 text-google-green",
    stars: 0,
  },
  {
    title: "AlMulla Holding Group Website",
    description:
      "A premium corporate website for AlMulla Holding Group, a diversified Dubai-based holding company. Built with React, TypeScript, and Tailwind CSS for a responsive, accessible experience, and deployed on GoDaddy hosting with a custom domain.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "GoDaddy"],
    url: "https://almullaholding.com",
    github: false,
    logo: almullaHoldingLogo,
    icon: <Globe className="w-6 h-6" />,
    iconClass: "bg-google-red/20 text-google-red",
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
          description="A featured custom CRM and operations platform, plus mobile, language, and corporate web projects."
        />

        <Reveal variant="up">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Featured</span>
            <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
          </div>
          <LWLAppPreview />
        </Reveal>

        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Other Projects</span>
            <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.map((project, index) => (
              <Reveal key={project.title} variant="up" delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="group relative glass rounded-3xl p-6 h-full overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/15 via-transparent to-google-yellow/10" />
                  <div className="relative space-y-4">
                    <div className="flex items-start gap-4">
                      {project.logo ? (
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden bg-white/70 ring-1 ring-border/50 p-1">
                          <img
                            src={project.logo}
                            alt={`${project.title} logo`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${project.iconClass}`}>
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

                    <p className="mobile-justify-text text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-white/5 text-foreground/80 border border-white/10 backdrop-blur"
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
      </div>
    </section>
  );
};

export default Projects;
