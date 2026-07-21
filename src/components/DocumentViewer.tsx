import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Reveal from "./Reveal";
import StaggerReveal from "./StaggerReveal";
import certComtech from "@/assets/cert-comtech.jpg";
import diplomaBisu from "@/assets/diploma-bisu.jpg";
import diplomaHighschool from "@/assets/diploma-highschool.jpg";
import recognitionSama from "@/assets/recognition-sama.jpg";

const DocumentViewer = () => {
  const documents = [
      {
      title: "Computer Literacy Training Certificate",
      institution: "Computer Literacy Training (Module 2)",
      image: certComtech,
    },
     {
      title: "Technical-Vocational-Livelihood Track in ICT",
      institution: "Computer Programming specialization",
      image: diplomaHighschool,
    },
    
    {
      title: "Bachelor of Science in Computer Engineering",
      institution: "Bohol Island State University",
      image: diplomaBisu,
    },
    {
      title: "Certificate of Recognition - Research Assistant",
      institution: "Research Assistant recognition",
      image: recognitionSama,
    },
  ];

  return (
    <section className="py-2 md:py-6">
      <div className="mx-auto max-w-6xl space-y-4 md:space-y-6">
        {/* Section Header */}
        <Reveal variant="up">
          <div className="space-y-2 text-center md:space-y-3">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <FileText className="h-6 w-6 text-google-blue md:h-8 md:w-8" />
              <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">Official Documents</h3>
            </div>
            <p className="text-sm text-muted-foreground md:text-base">
              View certificates and diplomas
            </p>
          </div>
        </Reveal>

        {/* Documents Grid */}
        <StaggerReveal className="mx-auto grid max-w-5xl grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6" childClassName="h-full" stagger={0.08}>
          {documents.map((doc, index) => (
            <Card
              key={index}
              className="group depth-card shine-card h-full overflow-hidden border-border p-3 shadow-google-lg transition-all duration-300 hover:shadow-google-xl md:p-6"
            >
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h4 className="text-base font-bold leading-snug text-foreground md:text-lg">{doc.title}</h4>
                  <p className="text-sm text-muted-foreground">{doc.institution}</p>
                </div>

                {/* Document Image */}
                <div className="relative rounded-lg overflow-hidden bg-muted group/document aspect-[11/8.5] select-none">
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-full object-contain select-none pointer-events-none rotate-90 scale-[0.85] transition-transform duration-700 ease-out group-hover/document:scale-[0.875]"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />

                  {/* Centered, more visible transparent watermark */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
                    <div className="rotate-[-25deg] opacity-60">
                      <p className="text-6xl md:text-8xl font-extrabold text-foreground/70 tracking-widest">
                        FOR PORTFOLIO
                      </p>
                      <p className="text-4xl md:text-6xl font-extrabold text-foreground/70 tracking-widest mt-4">
                        USE ONLY
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default DocumentViewer;
