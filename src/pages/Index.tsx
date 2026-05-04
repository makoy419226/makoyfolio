import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import CVPreview from "@/components/CVPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ScrollReveal variant="fade-up"><About /></ScrollReveal>
      <ScrollReveal variant="scale" delay={50}><Skills /></ScrollReveal>
      <ScrollReveal variant="slide-left"><WorkExperience /></ScrollReveal>
      <ScrollReveal variant="fade-up"><Projects /></ScrollReveal>
      <ScrollReveal variant="fade-up"><Education /></ScrollReveal>
      <ScrollReveal variant="fade-up"><CVPreview /></ScrollReveal>
      <ScrollReveal variant="fade-up"><Contact /></ScrollReveal>
      <Footer />
    </div>
  );
};

export default Index;
