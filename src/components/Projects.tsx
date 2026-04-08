import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Smartphone, Globe } from "lucide-react";
import LWLAppPreview from "./LWLAppPreview";

const otherProjects = [
  {
    title: "SAMA-CEBU Translator",
    description:
      "A cross-platform mobile translation app built with Flutter that translates between Sama and Cebuano languages. Supports Android, iOS, Web, Windows, macOS, and Linux platforms.",
    tech: ["Flutter", "Dart", "C++", "Swift", "Python"],
    github: "https://github.com/makoy419226/SAMA-CEBU",
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
    icon: <Smartphone className="w-6 h-6" />,
    color: "google-green",
    stars: 0,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Projects
          </h2>
          <div className="flex gap-1 justify-center">
            <div className="w-4 h-1 bg-google-blue rounded-full"></div>
            <div className="w-4 h-1 bg-google-red rounded-full"></div>
            <div className="w-4 h-1 bg-google-yellow rounded-full"></div>
            <div className="w-4 h-1 bg-google-green rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Development projects showcasing full-stack, mobile, and cross-platform expertise
          </p>
        </div>

        {/* Featured Project — LWL */}
        <div className="animate-slide-up">
          <div className="text-sm font-semibold text-google-blue mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-google-blue rounded-full animate-pulse" />
            Featured Project
          </div>
          <LWLAppPreview />
        </div>

        {/* Other Project Cards */}
        <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
          {otherProjects.map((project, index) => (
            <Card
              key={index}
              className="border-border p-6 shadow-google-lg hover:shadow-google-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 bg-${project.color}/20 rounded-2xl flex items-center justify-center flex-shrink-0 text-${project.color}`}
                  >
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    {project.stars > 0 && (
                      <span className="text-sm text-google-yellow">
                        ⭐ {project.stars} star
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-secondary text-secondary-foreground border border-border"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 gap-2 rounded-full group-hover:border-google-blue group-hover:text-google-blue transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
