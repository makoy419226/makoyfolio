import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "fade-up" | "fade" | "scale" | "slide-left" | "slide-right";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  once?: boolean;
}

const variantClasses: Record<Variant, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-10",
    visible: "opacity-100 translate-y-0",
  },
  fade: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  scale: {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
  "slide-left": {
    hidden: "opacity-0 -translate-x-10",
    visible: "opacity-100 translate-x-0",
  },
  "slide-right": {
    hidden: "opacity-0 translate-x-10",
    visible: "opacity-100 translate-x-0",
  },
};

const ScrollReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  className,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const v = variantClasses[variant];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? v.visible : v.hidden,
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;