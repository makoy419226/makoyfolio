import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Unlock, FileText, Upload, Download, Eye, X, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CV_PASSWORD = "Defragkam01";
const CV_STORAGE_KEY = "portfolio_cv_pdf";

const CVPreview = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(CV_STORAGE_KEY);
    if (stored) {
      setPdfUrl(stored);
    }
  }, []);

  const handleUnlock = () => {
    if (password === CV_PASSWORD) {
      setIsUnlocked(true);
      setError("");
      toast({ title: "Access Granted", description: "CV viewer unlocked successfully." });
    } else {
      setError("Incorrect password");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({ title: "Invalid File", description: "Please upload a PDF file.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      localStorage.setItem(CV_STORAGE_KEY, base64);
      setPdfUrl(base64);
      toast({ title: "CV Updated", description: "New CV has been uploaded successfully." });
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "CV.pdf";
    link.click();
  };

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-google-blue" />
            <h3 className="text-3xl font-bold text-foreground">Curriculum Vitae</h3>
          </div>
          <p className="text-muted-foreground">Password protected — enter credentials to view or manage</p>
        </div>

        {!isUnlocked ? (
          <Card className="max-w-md mx-auto p-8 border-border shadow-google-lg text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Shield className="w-8 h-8 text-google-blue" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-foreground">Protected Content</h4>
              <p className="text-sm text-muted-foreground mt-1">Enter password to access the CV</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUnlock();
              }}
              className="space-y-4"
            >
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={error ? "border-destructive" : ""}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" variant="google">
                <Unlock className="w-4 h-4 mr-2" /> Unlock CV
              </Button>
            </form>
          </Card>
        ) : (
          <Card className="p-6 border-border shadow-google-lg space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-google-green" />
                <span className="text-sm font-medium text-google-green">Unlocked</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-1" /> Upload New CV
                </Button>
                {pdfUrl && (
                  <>
                    <Button size="sm" variant="outline" onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                    <Button size="sm" variant="google" onClick={() => setIsFullscreen(true)}>
                      <Eye className="w-4 h-4 mr-1" /> Fullscreen
                    </Button>
                  </>
                )}
                <Button size="sm" variant="secondary" onClick={() => { setIsUnlocked(false); setPassword(""); }}>
                  <Lock className="w-4 h-4 mr-1" /> Lock
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {pdfUrl ? (
              <div className="rounded-lg overflow-hidden border border-border bg-muted" style={{ height: "70vh" }}>
                <iframe src={pdfUrl} className="w-full h-full" title="CV Preview" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4">
                <FileText className="w-16 h-16 opacity-40" />
                <p className="text-lg font-medium">No CV uploaded yet</p>
                <p className="text-sm">Click "Upload New CV" to add your PDF</p>
              </div>
            )}
          </Card>
        )}

        {/* Fullscreen overlay */}
        {isFullscreen && pdfUrl && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-semibold text-foreground">CV Preview</span>
              <Button size="sm" variant="ghost" onClick={() => setIsFullscreen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <iframe src={pdfUrl} className="flex-1 w-full" title="CV Fullscreen" />
          </div>
        )}
      </div>
    </section>
  );
};

export default CVPreview;
