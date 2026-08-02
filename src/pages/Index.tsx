import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import EngineeringBackground from "@/components/EngineeringBackground";
import { PerformanceMode } from "@/hooks/use-performance-mode";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const Index = () => {
  return (
    <div id="top" className="min-h-screen relative isolate overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <PerformanceMode />
      <SmoothScroll />
      <ScrollProgress />
      <EngineeringBackground />
      <WhatsAppWidget />
      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <WorkExperience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
