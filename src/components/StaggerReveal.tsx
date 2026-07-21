import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

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
}: StaggerRevealProps) => {
  return (
    <div className={className}>
      {Children.map(children, (child) => (
        <div className={cn("min-w-0", childClassName)}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggerReveal;
