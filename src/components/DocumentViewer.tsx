import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
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
    <section className="py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-google-blue" />
            <h3 className="text-3xl font-bold text-foreground">Official Documents</h3>
          </div>
          <p className="text-muted-foreground">
            View certificates and diplomas
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {documents.map((doc, index) => (
            <Card
              key={index}
              className="border-border p-6 shadow-google-lg hover:shadow-google-xl transition-all duration-300 animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-foreground">{doc.title}</h4>
                  <p className="text-sm text-muted-foreground">{doc.institution}</p>
                </div>

                {/* Document Image */}
                <div className="relative rounded-lg overflow-hidden bg-muted group aspect-[11/8.5] select-none">
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-full object-contain select-none pointer-events-none rotate-90"
                    style={{ transform: "rotate(90deg) scale(0.85)" }}
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
        </div>
      </div>
    </section>
  );
};

export default DocumentViewer;
