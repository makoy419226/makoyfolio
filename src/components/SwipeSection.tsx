import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SwipeSectionProps {
  children: ReactNode;
  index: number;
  eager?: boolean;
  className?: string;
}

const desktopSwipeVariants: Variants = {
  hidden: {
    opacity: 0.35,
    y: 84,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const mobileSwipeVariants: Variants = {
  hidden: {
    opacity: 0.28,
    y: 64,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const SwipeSection = ({ children, index, eager = false, className }: SwipeSectionProps) => {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const usesMobileMotion =
    isMobile ||
    (typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px) and (pointer: coarse)").matches);
  const classes = cn("swipe-page", eager && "swipe-page--first", className);
  const style = { zIndex: index + 1 };

  if (reduceMotion) {
    return (
      <div data-swipe-page className={classes} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      data-swipe-page
      className={classes}
      style={style}
      initial={eager ? false : "hidden"}
      animate={eager ? "visible" : undefined}
      whileInView={eager ? undefined : "visible"}
      viewport={{
        once: false,
        amount: usesMobileMotion ? 0.015 : 0.025,
        margin: usesMobileMotion ? "0px 0px -6% 0px" : "0px 0px -10% 0px",
      }}
      variants={usesMobileMotion ? mobileSwipeVariants : desktopSwipeVariants}
      transition={
        usesMobileMotion
          ? {
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.24, ease: [0.2, 0, 0, 1] },
            }
          : {
              duration: 0.52,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.3, ease: [0.2, 0, 0, 1] },
            }
      }
    >
      {children}
    </motion.div>
  );
};

export default SwipeSection;
