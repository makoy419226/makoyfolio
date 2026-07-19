import { Children, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "up" | "scale" | "fade";

const childVariants: Record<Variant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 24, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  scale: {
    hidden: { opacity: 0, y: 18, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

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
  amount = 0.15,
  once = true,
}: StaggerRevealProps) => {
  const reduce = useReducedMotion();

  const container: Variants = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      };

  const itemVariants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : childVariants[variant];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={container}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.42, ease: [0.2, 0, 0, 1] }}
          className={cn("min-w-0", childClassName)}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerReveal;
