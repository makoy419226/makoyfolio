import type { ReactNode } from "react";

type Variant = "up" | "fade" | "scale" | "left" | "right" | "lift" | "blur";

interface Props {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  amount?: number;
  once?: boolean;
  duration?: number;
}

const Reveal = ({ children, className }: Props) => (
  <div className={className}>{children}</div>
);

export default Reveal;
