import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Variant = "up" | "fade" | "scale" | "left" | "right" | "lift" | "blur";

const variants: Record<Variant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 },
  },
  lift: {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

interface Props {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  amount?: number;
  once?: boolean;
  duration?: number;
}

const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  className,
  amount = 0.2,
  once = true,
  duration = 0.44,
}: Props) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={reduce ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : variants[variant]}
      transition={{ duration, delay, ease: [0.2, 0, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
