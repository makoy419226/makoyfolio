import Reveal from "./Reveal";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

const SectionHeading = ({ eyebrow, title, description, align = "center" }: Props) => (
  <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
    <Reveal variant="up">
      <div
        className={
          "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] font-mono uppercase tracking-[0.18em] text-primary"
        }
      >
        <span className="h-1 w-1 rounded-full bg-gradient-accent" />
        {eyebrow}
      </div>
    </Reveal>
    <Reveal variant="up" delay={0.05}>
      <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
    </Reveal>
    {description && (
      <Reveal variant="up" delay={0.1}>
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          {description}
        </p>
      </Reveal>
    )}
  </div>
);

export default SectionHeading;