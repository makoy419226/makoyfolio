import {
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ImmersiveSectionProps = ComponentPropsWithoutRef<"section">;

const ImmersiveSection = forwardRef<HTMLElement, ImmersiveSectionProps>(
  ({ children, className, style, ...props }, forwardedRef) => {
    const setRefs = useCallback(
      (node: HTMLElement | null) => {
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    return (
      <motion.section
        ref={setRefs}
        {...props}
        className={cn("immersive-section", className)}
        style={style}
      >
        {children}
      </motion.section>
    );
  },
);

ImmersiveSection.displayName = "ImmersiveSection";

export default ImmersiveSection;
