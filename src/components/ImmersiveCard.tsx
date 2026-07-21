import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type PointerEventHandler,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
  type MotionStyle,
} from "framer-motion";
import { cn } from "@/lib/utils";

const FINE_HOVER_POINTER = "(hover: hover) and (pointer: fine)";

type PointerPositionStyle = {
  "--pointer-x": string;
  "--pointer-y": string;
};

export interface ImmersiveCardProps
  extends Omit<
    HTMLMotionProps<"div">,
    | "children"
    | "className"
    | "style"
    | "onPointerEnter"
    | "onPointerMove"
    | "onPointerLeave"
    | "onPointerCancel"
  > {
  children: ReactNode;
  className?: string;
  /** Maximum tilt, in degrees, reached at the edge of the card. */
  intensity?: number;
  /** Perspective depth, in pixels. */
  perspective?: number;
  /** Render the pointer-following spotlight layer. */
  glow?: boolean;
  style?: MotionStyle;
  onPointerEnter?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerLeave?: PointerEventHandler<HTMLDivElement>;
  onPointerCancel?: PointerEventHandler<HTMLDivElement>;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const ImmersiveCard = forwardRef<HTMLDivElement, ImmersiveCardProps>(
  (
    {
      children,
      className,
      intensity = 6,
      perspective = 900,
      glow = true,
      style,
      onPointerEnter,
      onPointerMove,
      onPointerLeave,
      onPointerCancel,
      ...motionProps
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const boundsRef = useRef<DOMRect | null>(null);
    const finePointerRef = useRef<MediaQueryList | null>(null);
    const trackingBoundsRef = useRef(false);

    const rotateXTarget = useMotionValue(0);
    const rotateYTarget = useMotionValue(0);
    const glowTarget = useMotionValue(0);

    const rotateX = useSpring(rotateXTarget, {
      stiffness: 180,
      damping: 24,
      mass: 0.45,
    });
    const rotateY = useSpring(rotateYTarget, {
      stiffness: 180,
      damping: 24,
      mass: 0.45,
    });
    const glowOpacity = useSpring(glowTarget, {
      stiffness: 220,
      damping: 28,
      mass: 0.4,
    });

    const invalidateBounds = useCallback(() => {
      boundsRef.current = null;
    }, []);

    const stopTrackingBounds = useCallback(() => {
      if (!trackingBoundsRef.current) return;
      window.removeEventListener("resize", invalidateBounds);
      window.removeEventListener("scroll", invalidateBounds);
      trackingBoundsRef.current = false;
    }, [invalidateBounds]);

    const startTrackingBounds = useCallback(() => {
      if (trackingBoundsRef.current) return;
      window.addEventListener("resize", invalidateBounds);
      window.addEventListener("scroll", invalidateBounds, { passive: true });
      trackingBoundsRef.current = true;
    }, [invalidateBounds]);

    const reset = useCallback(
      (element?: HTMLDivElement) => {
        boundsRef.current = null;
        rotateXTarget.set(0);
        rotateYTarget.set(0);
        glowTarget.set(0);
        element?.style.setProperty("--pointer-x", "50%");
        element?.style.setProperty("--pointer-y", "50%");
      },
      [glowTarget, rotateXTarget, rotateYTarget],
    );

    useEffect(() => {
      if (prefersReducedMotion) {
        reset();
        stopTrackingBounds();
      }
    }, [prefersReducedMotion, reset, stopTrackingBounds]);

    useEffect(
      () => () => {
        stopTrackingBounds();
      },
      [stopTrackingBounds],
    );

    const supportsFineHover = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || typeof window === "undefined") return false;
      finePointerRef.current ??= window.matchMedia(FINE_HOVER_POINTER);
      return finePointerRef.current.matches;
    }, []);

    const handlePointerEnter: PointerEventHandler<HTMLDivElement> = (event) => {
      if (supportsFineHover(event) && !prefersReducedMotion) {
        boundsRef.current = event.currentTarget.getBoundingClientRect();
        startTrackingBounds();

        if (glow) {
          glowTarget.set(1);
        }
      }

      onPointerEnter?.(event);
    };

    const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
      if (supportsFineHover(event) && !prefersReducedMotion) {
        const bounds = boundsRef.current ?? event.currentTarget.getBoundingClientRect();
        boundsRef.current = bounds;

        if (bounds.width > 0 && bounds.height > 0) {
          const x = clamp((event.clientX - bounds.left) / bounds.width);
          const y = clamp((event.clientY - bounds.top) / bounds.height);

          event.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
          event.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);

          const maximumTilt = Math.max(0, intensity);
          rotateXTarget.set((0.5 - y) * maximumTilt * 2);
          rotateYTarget.set((x - 0.5) * maximumTilt * 2);

          if (glow) {
            glowTarget.set(1);
          }
        }
      }

      onPointerMove?.(event);
    };

    const handlePointerLeave: PointerEventHandler<HTMLDivElement> = (event) => {
      reset(event.currentTarget);
      stopTrackingBounds();
      onPointerLeave?.(event);
    };

    const handlePointerCancel: PointerEventHandler<HTMLDivElement> = (event) => {
      reset(event.currentTarget);
      stopTrackingBounds();
      onPointerCancel?.(event);
    };

    const cardStyle: MotionStyle & PointerPositionStyle = {
      position: "relative",
      ...style,
      "--pointer-x": "50%",
      "--pointer-y": "50%",
      transformPerspective: Math.max(1, perspective),
      rotateX: prefersReducedMotion ? 0 : rotateX,
      rotateY: prefersReducedMotion ? 0 : rotateY,
    };

    return (
      <motion.div
        ref={ref}
        className={cn("immersive-card", className)}
        style={cardStyle}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerCancel}
        {...motionProps}
      >
        {glow && (
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              opacity: prefersReducedMotion ? 0 : glowOpacity,
              background:
                "radial-gradient(circle at var(--pointer-x, 50%) var(--pointer-y, 50%), hsl(var(--primary, 217 72% 43%) / 0.2) 0%, transparent 62%)",
            }}
          />
        )}

        {children}
      </motion.div>
    );
  },
);

ImmersiveCard.displayName = "ImmersiveCard";

export default ImmersiveCard;
