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
import SwipeSection from "@/components/SwipeSection";

const Index = () => {
  return (
    <div id="top" className="min-h-screen relative isolate overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SmoothScroll />
      <ScrollProgress />
      <EngineeringBackground />
      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <SwipeSection index={0} eager>
            <Hero />
          </SwipeSection>
          <SwipeSection index={1}>
            <About />
          </SwipeSection>
          <SwipeSection index={2}>
            <Skills />
          </SwipeSection>
          <SwipeSection index={3}>
            <WorkExperience />
          </SwipeSection>
          <SwipeSection index={4}>
            <Projects />
          </SwipeSection>
          <SwipeSection index={5}>
            <Education />
          </SwipeSection>
          <SwipeSection index={6}>
            <Contact />
          </SwipeSection>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
