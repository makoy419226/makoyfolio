import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import CVPreview from "@/components/CVPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <WorkExperience />
      <Projects />
      <Education />
      <CVPreview />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
