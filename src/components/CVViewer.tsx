import { useEffect, useRef, useState } from "react";
import { Download, FileText, LoaderCircle } from "lucide-react";
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFPageProxy,
} from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import Reveal from "./Reveal";

const cvPath = "/documents/mark-angelou-idusma-cv.pdf";

GlobalWorkerOptions.workerSrc = pdfWorker;

const CVPage = ({ page, pageNumber }: { page: PDFPageProxy; pageNumber: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const viewport = page.getViewport({ scale: 1.6 });
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    const renderTask = page.render({ canvas, canvasContext: context, viewport });
    return () => renderTask.cancel();
  }, [page]);

  return (
    <figure className="space-y-2">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`CV page ${pageNumber}`}
        className="block h-auto w-full bg-white shadow-md"
      />
      <figcaption className="text-center text-xs font-medium text-muted-foreground">
        Page {pageNumber}
      </figcaption>
    </figure>
  );
};

const CVViewer = () => {
  const [pages, setPages] = useState<PDFPageProxy[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const loadingTask = getDocument(cvPath);

    loadingTask.promise
      .then(async (pdf) => {
        const loadedPages = await Promise.all(
          Array.from({ length: pdf.numPages }, (_, index) => pdf.getPage(index + 1)),
        );
        if (active) setPages(loadedPages);
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
      void loadingTask.destroy();
    };
  }, []);

  return (
    <Reveal variant="up" amount={0.03}>
      <div id="cv" className="group depth-card shine-card scroll-mt-28 overflow-hidden rounded-2xl p-3 glass-strong md:rounded-3xl md:p-8">
        <div className="mb-4 flex items-center justify-between gap-3 md:mb-6">
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <div className="soft-icon-pop flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-google-blue/20 md:h-12 md:w-12 md:rounded-2xl">
              <FileText className="h-5 w-5 text-google-blue md:h-6 md:w-6" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                Professional Profile
              </p>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                Curriculum Vitae
              </h3>
            </div>
          </div>

          <a
            href={cvPath}
            download="Mark-Angelou-Idusma-CV.pdf"
            className="premium-button inline-flex min-h-11 min-w-11 flex-none items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary sm:px-4"
            aria-label="Download CV as a PDF"
          >
            <span className="hidden sm:inline">Download PDF</span>
            <Download className="w-4 h-4" />
          </a>
        </div>

        <div className="min-h-[420px] rounded-xl border border-border/70 bg-muted/40 p-2 shadow-google-lg sm:rounded-2xl sm:p-5">
          {!pages.length && !error && (
            <div className="flex min-h-[390px] items-center justify-center gap-3 text-muted-foreground">
              <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
              Rendering CV pages…
            </div>
          )}

          {error && (
            <div className="flex min-h-[390px] flex-col items-center justify-center gap-4 p-8 text-center">
              <FileText className="w-10 h-10 text-primary" />
              <p>The CV pages could not be rendered in this browser.</p>
              <a href={cvPath} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                Open the CV in a new tab
              </a>
            </div>
          )}

          {!!pages.length && (
            <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
              {pages.map((page, index) => (
                <CVPage key={page.pageNumber} page={page} pageNumber={index + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default CVViewer;
