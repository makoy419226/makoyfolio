import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const circuitPaths = [
  "M48 118 H178 V74 H326",
  "M78 252 H226 V326 H376",
  "M64 430 H196 V374 H330",
  "M886 94 H742 V164 H614",
  "M918 284 H760 V226 H622",
  "M830 470 H684 V414 H520",
];

const signalPaths = [
  "M124 146 C246 92 344 198 468 142 S682 96 836 168",
  "M96 402 C248 470 328 338 468 402 S676 468 846 364",
  "M282 88 C338 184 410 214 482 272 S610 346 720 282",
];

const nodes = [
  [48, 118],
  [178, 74],
  [326, 74],
  [78, 252],
  [226, 326],
  [376, 326],
  [64, 430],
  [196, 374],
  [330, 374],
  [886, 94],
  [742, 164],
  [614, 164],
  [918, 284],
  [760, 226],
  [622, 226],
  [830, 470],
  [684, 414],
  [520, 414],
];

const binaryRows = [
  { x: 82, y: 214, text: "0101 1100 1011 0010" },
  { x: 650, y: 118, text: "1010 0111 0001 1101" },
  { x: 610, y: 492, text: "0011 1001 0110 0101" },
];

const EngineeringBackground = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const depthY = useTransform(scrollYProgress, [0, 1], ["0%", "3.5%"]);
  const schematicY = useTransform(scrollYProgress, [0, 1], ["0%", "-2.5%"]);
  const schematicScale = useTransform(scrollYProgress, [0, 1], [1, 1.035]);

  return (
    <div aria-hidden className="computer-engineering-background pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div className="ce-depth" style={reduce ? undefined : { y: depthY }} />
      <div className="ce-grid" />
      <div className="ce-scanline" />

      <motion.svg
        className="ce-schematic"
        viewBox="0 0 960 540"
        preserveAspectRatio="xMidYMid slice"
        style={reduce ? undefined : { y: schematicY, scale: schematicScale }}
      >
        <defs>
          <linearGradient id="ce-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(225 73% 57%)" stopOpacity="0.2" />
            <stop offset="52%" stopColor="hsl(215 30% 44%)" stopOpacity="0.13" />
            <stop offset="100%" stopColor="hsl(142 64% 42%)" stopOpacity="0.16" />
          </linearGradient>
          <radialGradient id="ce-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(225 73% 57%)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(0 0% 100%)" stopOpacity="0.16" />
          </radialGradient>
        </defs>

        <g className="ce-circuit-lines" fill="none" stroke="url(#ce-line)" strokeLinecap="round" strokeLinejoin="round">
          {circuitPaths.map((path) => (
            <path key={path} d={path} />
          ))}
        </g>

        <g className="ce-signal-lines" fill="none" stroke="url(#ce-line)" strokeLinecap="round">
          {signalPaths.map((path) => (
            <path key={path} d={path} />
          ))}
        </g>

        <g className="ce-nodes">
          {nodes.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
          ))}
        </g>

        <g className="ce-chip" transform="translate(380 154)">
          <rect className="ce-chip-shell" x="0" y="0" width="206" height="206" rx="24" />
          <rect className="ce-chip-core" x="50" y="50" width="106" height="106" rx="16" />
          <path className="ce-chip-trace" d="M76 86 H130 M76 112 H112 V134 H138" />
          {Array.from({ length: 7 }).map((_, index) => (
            <g key={`pin-${index}`}>
              <path className="ce-pin" d={`M0 ${35 + index * 23} H-34`} />
              <path className="ce-pin" d={`M206 ${35 + index * 23} H240`} />
              <path className="ce-pin" d={`M${35 + index * 23} 0 V-34`} />
              <path className="ce-pin" d={`M${35 + index * 23} 206 V240`} />
            </g>
          ))}
        </g>

        <g className="ce-monitor" transform="translate(648 254)">
          <rect className="ce-panel" x="0" y="0" width="230" height="150" rx="18" />
          <path className="ce-detail" d="M24 38 H206 M72 150 V184 M42 184 H102" />
          <path className="ce-wave" d="M32 94 H58 L72 66 L92 118 L112 78 L132 94 H194" />
        </g>

        <g className="ce-sensor" transform="translate(120 306)">
          <rect className="ce-panel" x="0" y="0" width="178" height="112" rx="18" />
          <path className="ce-detail" d="M26 34 H152 M26 78 H82 M104 78 H152" />
          <path className="ce-wave" d="M38 56 C58 34 76 34 96 56 S134 78 154 56" />
        </g>

        <g className="ce-binary">
          {binaryRows.map((row) => (
            <text key={`${row.x}-${row.y}`} x={row.x} y={row.y}>
              {row.text}
            </text>
          ))}
        </g>
      </motion.svg>
    </div>
  );
};

export default EngineeringBackground;
