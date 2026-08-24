import {
  forwardRef,
  useCallback,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

type ImmersiveSectionProps = ComponentPropsWithoutRef<"section">;

const ImmersiveSection = forwardRef<HTMLElement, ImmersiveSectionProps>(
  ({ children, className, style, ...props }, forwardedRef) => {
    const sectionRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();
    const { lowPower } = usePerformanceMode();
    const motionDisabled = Boolean(reduceMotion || lowPower);
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.16, 0.5, 0.84, 1], [0.54, 1, 1, 1, 0.62]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [28, 0, 0, -24]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.982, 1, 1, 0.988]);

    const setRefs = useCallback(
      (node: HTMLElement | null) => {
        sectionRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const motionStyle: MotionStyle & CSSProperties = motionDisabled
      ? style ?? {}
      : {
          ...(style ?? {}),
          opacity,
          y,
          scale,
        };

    return (
      <motion.section
        ref={setRefs}
        {...props}
        className={cn("immersive-section", className)}
        style={motionStyle}
      >
        {children}
      </motion.section>
    );
  },
);

ImmersiveSection.displayName = "ImmersiveSection";

export default ImmersiveSection;
