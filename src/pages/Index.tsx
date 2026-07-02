import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import CVPreview from "@/components/CVPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import MorphBlobs from "@/components/MorphBlobs";
import CpuScene from "@/components/CpuScene";

const Index = () => {
  return (
    <div id="top" className="min-h-screen relative">
      <SmoothScroll />
      <ScrollProgress />
      <CpuScene />
      <MorphBlobs />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <WorkExperience />
        <Projects />
        <Education />
        <CVPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
