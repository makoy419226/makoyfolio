import { Github } from "lucide-react";
import Reveal from "./Reveal";

const Footer = () => {
  return (
    <footer className="section-atmosphere relative py-12 px-4 border-t border-border/60 mt-6">
      <div className="max-w-6xl mx-auto">
        <Reveal variant="up">
          <div className="flex flex-col items-center text-center gap-6">
            <p className="mobile-justify-text text-sm text-muted-foreground max-w-md text-center">
              Mark Angelou Egam, CpE · Abu Dhabi, UAE · Available to join immediately.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/makoy419226"
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            <p className="w-full border-t border-border/40 pt-4 text-xs leading-relaxed text-muted-foreground/80">
              © 2026 Mark Angelou Egam Idusma · Abu Dhabi, UAE
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
