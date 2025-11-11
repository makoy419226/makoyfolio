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
        { top: "85%", left: "10%", width: "35%", height: "8%" }, // Signatures
        { top: "85%", left: "50%", width: "35%", height: "8%" }, // Signatures
      ]
    },
    {
      title: "Senior High School Diploma",
      institution: "Cristal e-College",
      image: diplomaHighschool,
      blurAreas: [
        { top: "42%", left: "30%", width: "40%", height: "3%" }, // LRN
        { top: "85%", left: "5%", width: "90%", height: "8%" }, // Signatures
      ]
    },
    {
      title: "Computer Literacy Training Certificate",
      institution: "ComTech Resources & Cristal e-College",
      image: certComtech,
      blurAreas: [
        { top: "85%", left: "10%", width: "80%", height: "10%" }, // Signatures
        { top: "96%", left: "5%", width: "20%", height: "3%" }, // Serial number
      ]
    },
    {
      title: "Certificate of Recognition - Research Assistant",
      institution: "Totolan Elementary School",
      image: recognitionSama,
      blurAreas: [
        { top: "85%", left: "10%", width: "80%", height: "10%" }, // Signatures
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

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, index) => (
            <Card 
              key={index}
              className="border-border p-4 shadow-google-lg hover:shadow-google-xl transition-all duration-300 animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-3">
                <div>
                  <h4 className="text-lg font-bold text-foreground">{doc.title}</h4>
                  <p className="text-sm text-muted-foreground">{doc.institution}</p>
                </div>
                
                {/* Document Image Container with Watermark */}
                <div className="relative rounded-lg overflow-hidden bg-muted group">
                  <img 
                    src={doc.image} 
                    alt={doc.title}
                    className="w-full h-auto"
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
