import {
  Children,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

type Variant = "up" | "scale" | "fade";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  childClassName?: string;
  variant?: Variant;
  delay?: number;
  stagger?: number;
  amount?: number;
  once?: boolean;
}

const StaggerReveal = ({
  children,
  className,
  childClassName,
  variant = "up",
  delay = 0,
  stagger = 0.055,
  amount = 0.1,
  once = true,
}: StaggerRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, lowPower } = usePerformanceMode();
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: amount, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [amount, once, reducedMotion]);

  return (
    <div ref={ref} className={className} data-visible={visible}>
      {Children.map(children, (child, index) => (
        <div
          data-reveal={variant}
          data-low-power={lowPower || undefined}
          className={cn("motion-reveal motion-reveal--stagger min-w-0", childClassName)}
          style={{
            "--reveal-delay": `${Math.max(0, delay + index * stagger) * 1000}ms`,
          } as CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggerReveal;
