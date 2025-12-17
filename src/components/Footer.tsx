import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {currentYear} Mark Angelou Idusma. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/makoy419226" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-google-blue hover:text-white hover:border-google-blue transition-all duration-300 shadow-google-sm hover:shadow-google-md"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-google-blue hover:text-white hover:border-google-blue transition-all duration-300 shadow-google-sm hover:shadow-google-md"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
