import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Decorative animated SVG background.
 * Two morphing blobs drift and parallax with scroll.
 */
const MorphBlobs = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.svg
        style={{ y: y1, rotate: rot }}
        viewBox="0 0 600 600"
        className="absolute -top-40 -left-40 w-[60rem] h-[60rem] opacity-75 blur-3xl"
      >
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(220 90% 58%)" stopOpacity="0.95" />
            <stop offset="55%" stopColor="hsl(220 85% 50%)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(220 85% 50%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.path
          fill="url(#g1)"
          animate={{
            d: [
              "M421,317Q403,384,338,420Q273,456,205,425Q137,394,128,322Q119,250,160,191Q201,132,275,131Q349,130,396,190Q443,250,421,317Z",
              "M438,310Q422,370,365,410Q308,450,238,432Q168,414,138,348Q108,282,150,217Q192,152,267,140Q342,128,397,184Q452,240,438,310Z",
              "M421,317Q403,384,338,420Q273,456,205,425Q137,394,128,322Q119,250,160,191Q201,132,275,131Q349,130,396,190Q443,250,421,317Z",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      <motion.svg
        style={{ y: y2, rotate: useTransform(rot, (r) => -r) }}
        viewBox="0 0 600 600"
        className="absolute -bottom-60 -right-40 w-[55rem] h-[55rem] opacity-70 blur-3xl"
      >
        <defs>
          <radialGradient id="g2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(220 85% 48%)" stopOpacity="0.85" />
            <stop offset="60%" stopColor="hsl(220 70% 35%)" stopOpacity="0.40" />
            <stop offset="100%" stopColor="hsl(220 60% 25%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.path
          fill="url(#g2)"
          animate={{
            d: [
              "M433,322Q418,394,348,420Q278,446,213,418Q148,390,134,320Q120,250,164,191Q208,132,278,138Q348,144,395,194Q442,244,433,322Z",
              "M410,310Q392,378,326,418Q260,458,196,424Q132,390,130,316Q128,242,170,186Q212,130,282,140Q352,150,397,200Q442,250,410,310Z",
              "M433,322Q418,394,348,420Q278,446,213,418Q148,390,134,320Q120,250,164,191Q208,132,278,138Q348,144,395,194Q442,244,433,322Z",
            ],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* fine grid for depth */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(220 35% 72% / 1) 1px, transparent 1px), linear-gradient(90deg, hsl(220 35% 72% / 1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
};

export default MorphBlobs;