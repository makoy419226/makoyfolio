import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Variant = "up" | "fade" | "scale" | "left" | "right";

const variants: Record<Variant, Variants> = {
  up:    { hidden: { opacity: 0, y: 40 },      visible: { opacity: 1, y: 0 } },
  fade:  { hidden: { opacity: 0 },             visible: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 },visible: { opacity: 1, scale: 1 } },
  left:  { hidden: { opacity: 0, x: -40 },     visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },      visible: { opacity: 1, x: 0 } },
};

interface Props {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  amount?: number;
}

const Reveal = ({ children, variant = "up", delay = 0, className, amount = 0.2 }: Props) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={reduce ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : variants[variant]}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;