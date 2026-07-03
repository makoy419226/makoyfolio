const traces = [
  "M70 110 H210 V68 H360",
  "M92 220 H260 V305 H430",
  "M48 430 H188 V360 H318",
  "M840 96 H710 V178 H590",
  "M900 320 H740 V255 H620",
  "M790 506 H610 V438 H470",
];

const nodes = [
  [70, 110],
  [210, 68],
  [360, 68],
  [92, 220],
  [430, 305],
  [48, 430],
  [318, 360],
  [840, 96],
  [710, 178],
  [900, 320],
  [620, 255],
  [790, 506],
  [470, 438],
];

const EngineeringBackground = () => (
  <div aria-hidden className="engineering-background pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="engineering-grid" />
    <div className="engineering-glow engineering-glow-primary" />
    <div className="engineering-glow engineering-glow-secondary" />

    <svg className="engineering-schematic" viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="engineering-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(225 73% 57%)" stopOpacity="0.24" />
          <stop offset="100%" stopColor="hsl(224 88% 64%)" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <g fill="none" stroke="url(#engineering-line)" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((trace) => (
          <path key={trace} d={trace} strokeWidth="2" />
        ))}
      </g>

      <g fill="hsl(225 73% 57% / 0.18)">
        {nodes.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
        ))}
      </g>

      <g className="engineering-monitor" transform="translate(530 86)">
        <rect x="0" y="0" width="300" height="190" rx="18" />
        <rect x="24" y="24" width="252" height="128" rx="8" />
        <path d="M150 190 V232 M96 232 H204" />
      </g>

      <g className="engineering-chip" transform="translate(120 126)">
        <rect x="0" y="0" width="164" height="164" rx="18" />
        <rect x="42" y="42" width="80" height="80" rx="10" />
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={`left-${i}`} d={`M0 ${28 + i * 22} H-26`} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={`right-${i}`} d={`M164 ${28 + i * 22} H190`} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={`top-${i}`} d={`M${28 + i * 22} 0 V-26`} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <path key={`bottom-${i}`} d={`M${28 + i * 22} 164 V190`} />
        ))}
      </g>

      <g className="engineering-keyboard" transform="translate(502 354)">
        <rect x="0" y="0" width="310" height="92" rx="18" />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={`row-a-${i}`} x={20 + i * 30} y="18" width="20" height="12" rx="3" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={`row-b-${i}`} x={36 + i * 30} y="42" width="20" height="12" rx="3" />
        ))}
        <rect x="92" y="66" width="118" height="12" rx="4" />
      </g>
    </svg>
  </div>
);

export default EngineeringBackground;
