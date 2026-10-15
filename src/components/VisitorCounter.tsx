import { useEffect, useState } from "react";

const goatCounterCode = import.meta.env.VITE_GOATCOUNTER_CODE?.trim();

const VisitorCounter = () => {
  const [totalVisits, setTotalVisits] = useState<string>();

  useEffect(() => {
    if (!goatCounterCode) return;

    const endpoint = `https://${goatCounterCode}.goatcounter.com`;
    const scriptSelector = `script[data-goatcounter="${endpoint}/count"]`;
    let script = document.querySelector<HTMLScriptElement>(scriptSelector);

    const loadTotalVisits = async () => {
      try {
        const response = await fetch(`${endpoint}/counter/TOTAL.json`);
        if (!response.ok) return;

        const data: { count?: string } = await response.json();
        if (data.count) setTotalVisits(data.count);
      } catch {
        // Keep the counter unobtrusive if the analytics service is unavailable.
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.src = "https://gc.zgo.at/count.js";
      script.async = true;
      script.dataset.goatcounter = `${endpoint}/count`;
      document.head.appendChild(script);
    }

    void loadTotalVisits();
  }, []);

  if (!goatCounterCode) return null;

  return (
    <p className="text-xs text-muted-foreground" aria-live="polite">
      Portfolio visits{totalVisits ? ` · ${totalVisits}` : " · Loading"}
    </p>
  );
};

export default VisitorCounter;
