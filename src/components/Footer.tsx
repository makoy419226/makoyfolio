import { Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-4 border-t border-border/60 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6">
          <a
            href="#top"
            className="font-display text-5xl md:text-7xl font-semibold text-gradient leading-none"
          >
            Idusma.
          </a>

          <p className="mobile-justify-text text-sm text-muted-foreground max-w-md text-center">
            Mark Angelou Egam Idusma, CpE · Abu Dhabi, UAE · Available to join immediately.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/makoy419226"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          <p className="text-xs text-muted-foreground/80 pt-4 border-t border-border/40 w-full">
            © {currentYear} Mark Angelou Egam Idusma · Abu Dhabi, UAE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
