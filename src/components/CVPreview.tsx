import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Unlock, FileText, Upload, Download, Eye, EyeOff, X, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CV_PASSWORD = "asteroid";
const CV_STORAGE_KEY = "portfolio_cv_pdf";
const CV_VISIBLE_KEY = "portfolio_cv_visible";

const CVPreview = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState("");
  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(CV_STORAGE_KEY);
    if (stored) setPdfUrl(stored);
    const vis = localStorage.getItem(CV_VISIBLE_KEY);
    if (vis !== null) setIsVisible(vis === "true");
  }, []);

  useEffect(() => {
    if (!pdfUrl) { setPdfPages([]); return; }
    renderPdfToImages(pdfUrl);
  }, [pdfUrl]);

  const renderPdfToImages = async (url: string) => {
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      
      const pdf = await pdfjsLib.getDocument(url).promise;
      const pages: string[] = [];

      // Use a scale tuned to the viewport so mobile devices don't blow memory
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const scale = isMobile ? 1.25 : 1.75;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
        pages.push(canvas.toDataURL("image/jpeg", 0.85));
      }
      
      setPdfPages(pages);
    } catch (err) {
      console.error("PDF render failed", err);
      setPdfPages([]);
    }
  };

  const toggleVisibility = () => {
    const newVal = !isVisible;
    setIsVisible(newVal);
    localStorage.setItem(CV_VISIBLE_KEY, String(newVal));
    toast({ title: newVal ? "CV Visible" : "CV Hidden", description: newVal ? "CV is now visible to visitors." : "CV is hidden from visitors." });
  };

  const handleUnlock = () => {
    if (password === CV_PASSWORD) {
      setIsAdmin(true);
      setShowPasswordDialog(false);
      setPassword("");
      setError("");
      toast({ title: "Admin Access Granted", description: "You can now manage the CV." });
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

  // If CV is hidden and not admin, don't render the section at all
  if (!isVisible && !isAdmin) return null;

  const renderPages = (containerClass?: string) => (
    <div className={containerClass || "space-y-4"}>
      {pdfPages.length > 0 ? (
        pdfPages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`CV page ${i + 1}`}
            className="w-full rounded-lg border border-border shadow-sm"
            draggable={false}
          />
        ))
      ) : pdfUrl ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <p>Loading CV...</p>
        </div>
      ) : null}
    </div>
  );

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-google-blue" />
            <h3 className="text-3xl font-bold text-foreground">Curriculum Vitae</h3>
          </div>
          <p className="text-muted-foreground">
            {isAdmin ? "Admin mode — manage your CV below." : "View my CV below."}
          </p>
        </div>

        <Card className="p-6 border-border shadow-google-lg space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <>
                  <Unlock className="w-4 h-4 text-google-green" />
                  <span className="text-sm font-medium text-google-green">Admin Mode</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">View Only</span>
                </>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {isAdmin && (
                <>
                  <Button size="sm" variant={isVisible ? "outline" : "destructive"} onClick={toggleVisibility}>
                    {isVisible ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
                    {isVisible ? "Visible" : "Hidden"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-1" /> Upload New CV
                  </Button>
                </>
              )}
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
              {!isAdmin ? (
                <Button size="sm" variant="secondary" onClick={() => setShowPasswordDialog(true)}>
                  <Lock className="w-4 h-4 mr-1" /> Admin
                </Button>
              ) : (
                <Button size="sm" variant="secondary" onClick={() => setIsAdmin(false)}>
                  <Lock className="w-4 h-4 mr-1" /> Lock
                </Button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileUpload} />
          </div>

          {!isVisible && isAdmin && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 flex items-center gap-2">
              <EyeOff className="w-4 h-4" />
              CV is currently hidden from visitors.
            </div>
          )}

          {pdfUrl ? (
            <div ref={canvasContainerRef} className="rounded-lg overflow-y-auto bg-muted p-4" style={{ maxHeight: "70vh" }}>
              {renderPages()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4">
              <FileText className="w-16 h-16 opacity-40" />
              <p className="text-lg font-medium">No CV uploaded yet</p>
              {!isAdmin && <p className="text-sm">Admin access required to upload a CV</p>}
              {isAdmin && <p className="text-sm">Click "Upload New CV" to add your PDF</p>}
            </div>
          )}
        </Card>

        {/* Password dialog */}
        {showPasswordDialog && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-8 border-border shadow-google-lg text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Shield className="w-8 h-8 text-google-blue" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground">Admin Access</h4>
                <p className="text-sm text-muted-foreground mt-1">Enter password to manage the CV</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleUnlock(); }} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className={error ? "border-destructive" : ""}
                  autoFocus
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => { setShowPasswordDialog(false); setPassword(""); setError(""); }}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" variant="google">
                    <Unlock className="w-4 h-4 mr-2" /> Unlock
                  </Button>
                </div>
              </form>
            </Card>
          </div>
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
            <div className="flex-1 overflow-y-auto p-4 bg-muted">
              {renderPages("space-y-4 max-w-4xl mx-auto")}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CVPreview;
