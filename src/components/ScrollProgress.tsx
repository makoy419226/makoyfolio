import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-accent shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
    />
  );
};

export default ScrollProgress;
