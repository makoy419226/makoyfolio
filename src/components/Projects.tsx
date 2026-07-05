import LWLAppPreview from "./LWLAppPreview";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <SectionHeading
          eyebrow="04 · Projects"
          title="Relevant project: custom CRM and operations system."
          description="A full-stack CRM and operations management system designed, developed, deployed, and maintained for real UAE business operations."
        />

        <Reveal variant="up">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Featured</span>
            <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
          </div>
          <LWLAppPreview />
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
