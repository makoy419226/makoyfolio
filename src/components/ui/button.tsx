import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "material-ripple relative isolate inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-[background-color,color,box-shadow,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-[0.38] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-google-sm hover:bg-primary/90 hover:shadow-google-md",
        destructive: "bg-destructive text-destructive-foreground shadow-google-sm hover:bg-destructive/90",
        outline: "border border-border bg-transparent text-foreground hover:border-primary hover:bg-primary/10",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-primary/10 hover:text-foreground",
        link: "min-h-0 rounded-none p-0 text-primary underline-offset-4 hover:underline",
        google: "bg-primary text-primary-foreground shadow-google-sm hover:bg-primary/90 hover:shadow-google-md",
        red: "bg-google-red text-white hover:bg-google-red/80 shadow-google-md hover:shadow-google-lg transition-all duration-300",
        yellow: "bg-google-yellow text-neutral-900 hover:bg-google-yellow/80 shadow-google-md hover:shadow-google-lg transition-all duration-300",
        green: "bg-google-green text-white hover:bg-google-green/80 shadow-google-md hover:shadow-google-lg transition-all duration-300",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-10 px-4",
        lg: "h-12 px-7",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
