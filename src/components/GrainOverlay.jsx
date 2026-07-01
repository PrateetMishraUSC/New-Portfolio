import './GrainOverlay.css';

export default function GrainOverlay() {
  return (
    <svg className="grain-overlay" width="100%" height="100%" aria-hidden="true">
      <filter id="noise-filter" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.3" />
          <feFuncG type="linear" slope="0.3" />
          <feFuncB type="linear" slope="0.3" />
          <feFuncA type="linear" slope="0.7" />
        </feComponentTransfer>
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.9" intercept="-0.25" />
          <feFuncG type="linear" slope="0.9" intercept="-0.25" />
          <feFuncB type="linear" slope="0.9" intercept="-0.25" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-filter)" />
    </svg>
  );
}
