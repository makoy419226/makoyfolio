import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import certComtech from "@/assets/cert-comtech.jpg";
import diplomaBisu from "@/assets/diploma-bisu.jpg";
import diplomaHighschool from "@/assets/diploma-highschool.jpg";
import recognitionSama from "@/assets/recognition-sama.jpg";

const DocumentViewer = () => {
  const documents = [
    {
      title: "Bachelor of Science in Computer Engineering",
      institution: "Bohol Island State University",
      image: diplomaBisu,
      blurAreas: [
        { top: "10%", left: "5%", width: "8%", height: "35%" }, // Signatures (rotated)
        { top: "50%", left: "5%", width: "8%", height: "35%" }, // Signatures (rotated)
      ]
    },
    {
      title: "Senior High School Diploma",
      institution: "Cristal e-College",
      image: diplomaHighschool,
      blurAreas: [
        { top: "30%", left: "55%", width: "3%", height: "40%" }, // LRN (rotated)
        { top: "5%", left: "5%", width: "8%", height: "90%" }, // Signatures (rotated)
      ]
    },
    {
      title: "Computer Literacy Training Certificate",
      institution: "ComTech Resources & Cristal e-College",
      image: certComtech,
      blurAreas: [
        { top: "10%", left: "5%", width: "10%", height: "80%" }, // Signatures (rotated)
        { top: "5%", left: "92%", width: "3%", height: "20%" }, // Serial number (rotated)
      ]
    },
    {
      title: "Certificate of Recognition - Research Assistant",
      institution: "Totolan Elementary School",
      image: recognitionSama,
      blurAreas: [
        { top: "10%", left: "5%", width: "10%", height: "80%" }, // Signatures (rotated)
      ]
    }
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
            View certificates and diplomas (sensitive information redacted)
          </p>
        </div>

        {/* Documents Grid - Single column for portrait certificates */}
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
                
                {/* Document Image Container with Watermark - Rotated 90 degrees */}
                <div className="relative rounded-lg overflow-hidden bg-muted group aspect-[11/8.5] select-none">
                  <img 
                    src={doc.image} 
                    alt={doc.title}
                    className="w-full h-full object-contain select-none pointer-events-none rotate-90"
                    style={{ transform: 'rotate(90deg) scale(0.85)' }}
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  
                  {/* Blur overlays for sensitive information */}
                  {doc.blurAreas.map((area, i) => (
                    <div
                      key={i}
                      className="absolute backdrop-blur-md bg-background/20"
                      style={{
                        top: area.top,
                        left: area.left,
                        width: area.width,
                        height: area.height,
                      }}
                    />
                  ))}
                  
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="rotate-[-25deg] opacity-30 select-none">
                      <p className="text-4xl md:text-6xl font-bold text-foreground tracking-wider">
                        FOR PORTFOLIO
                      </p>
                      <p className="text-2xl md:text-4xl font-bold text-foreground text-center tracking-wider mt-2">
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
