import { useEffect, useRef } from 'react';
import './InkLine.css';

/*
 * The ink line is three independent SVG strokes behind the page content:
 *   1. scrib  — messy loops circling the hero photo (static, always drawn)
 *   2. tail   — a stroke descending from the loops toward the projects section
 *   3. low    — a serpentine that weaves left → right → left through the
 *               experience, about and contact sections (margins only)
 * The pinned horizontal projects section sits in the gap between tail and low,
 * so the pen visibly pauses there and resumes below.
 *
 * The lower serpentine runs down one gutter per section and swaps sides in the
 * empty vertical gaps between sections, so it never crosses a text column:
 *   experience → left, about → right, connect → left.
 */
const SECTION_SIDES = [
  { id: 'experience', side: 'left' },
  { id: 'about', side: 'right' },
  { id: 'connect', side: 'left' },
];

// Distance the line sits into the gutter, away from the container edge.
const GUTTER_GAP = 15;
// Keep the stroke this far from the viewport edge so it never clips.
const EDGE_MIN = 26;

function pageRect(el) {
  const r = el.getBoundingClientRect();
  return {
    l: r.left + window.scrollX,
    t: r.top + window.scrollY,
    r: r.right + window.scrollX,
    b: r.bottom + window.scrollY,
    w: r.width,
    h: r.height,
  };
}

/* Parametric loops around the photo: each revolution gets its own margin,
   nudged centre and sine-wave radius wobble so they read hand-drawn. */
function scribble(cx, cy, bw, bh) {
  const revs = [
    { m: 25, ox: -4, oy: 3 },
    { m: 45, ox: 6, oy: -5 },
    { m: 20, ox: -2, oy: 6 },
  ];
  const pts = [];
  const steps = 6;
  revs.forEach((rv, k) => {
    for (let i = 0; i < steps; i++) {
      const a = -Math.PI / 2 + (i / steps) * 2 * Math.PI;
      const jr = Math.sin(i * 2.7 + k * 5.3) * 4;
      pts.push({
        x: cx + rv.ox + (bw + rv.m + jr) * Math.cos(a),
        y: cy + rv.oy + (bh + rv.m + jr) * Math.sin(a),
      });
    }
  });
  return pts;
}

/* Insert wobbly midpoints on long segments so straight runs read hand-drawn */
function addWobble(pts) {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    out.push(pts[i]);
    const next = pts[i + 1];
    if (!next) continue;
    const dx = next.x - pts[i].x;
    const dy = next.y - pts[i].y;
    const dist = Math.hypot(dx, dy);
    if (dist < 130) continue;
    const amp = 7 * (i % 2 === 0 ? 1 : -1);
    out.push({
      x: pts[i].x + dx / 2 - (dy / dist) * amp,
      y: pts[i].y + dy / 2 + (dx / dist) * amp,
    });
  }
  return out;
}

function toPathD(p) {
  if (p.length < 2) return '';
  let d = `M${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i > 0 ? i - 1 : 0];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2 < p.length ? i + 2 : p.length - 1];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export default function InkLine() {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const scribRef = useRef(null);
  const tailRef = useRef(null);
  const lowRef = useRef(null);
  const penRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const state = { Lt: 0, Ll: 0, tailA: 0, tailB: 1, lowA: 0, lowB: 1 };
    let raf = 0;
    let buildTimer = 0;

    const draw = () => {
      raf = 0;
      const tail = tailRef.current;
      const low = lowRef.current;
      const pen = penRef.current;
      if (!tail || !low) return;
      if (reduce.matches) {
        tail.style.strokeDashoffset = 0;
        low.style.strokeDashoffset = 0;
        pen.style.opacity = 0;
        return;
      }
      const target = window.scrollY + window.innerHeight * 0.62;
      const tp = Math.max(0, Math.min(1, (target - state.tailA) / (state.tailB - state.tailA || 1)));
      const lp = Math.max(0, Math.min(1, (target - state.lowA) / (state.lowB - state.lowA || 1)));
      tail.style.strokeDashoffset = state.Lt * (1 - tp);
      low.style.strokeDashoffset = state.Ll * (1 - lp);

      let path = null;
      let len = 0;
      if (target >= state.tailA && target <= state.tailB) {
        path = tail;
        len = state.Lt * tp;
      } else if (target >= state.lowA && target <= state.lowB) {
        path = low;
        len = state.Ll * lp;
      }
      if (path && len > 2 && len < path.getTotalLength() - 2) {
        const pt = path.getPointAtLength(len);
        pen.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
        pen.style.opacity = 1;
      } else {
        pen.style.opacity = 0;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const build = () => {
      const wrap = wrapRef.current;
      const svg = svgRef.current;
      const scrib = scribRef.current;
      const tail = tailRef.current;
      const low = lowRef.current;
      if (!wrap || !svg || !scrib || !tail || !low) return;
      const W = document.documentElement.clientWidth;
      const H = document.body.offsetHeight;
      wrap.style.height = `${H}px`;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

      /* Hero scribble: static flourish, drawn at every breakpoint */
      const visual = document.querySelector('.hero__visual');
      let cx = 0;
      let cy = 0;
      let bw = 0;
      let bh = 0;
      if (visual) {
        const vr = pageRect(visual);
        cx = vr.l + vr.w / 2;
        cy = vr.t + vr.h / 2;
        bw = vr.w / 2;
        bh = vr.h / 2;
        scrib.setAttribute('d', toPathD(scribble(cx, cy, bw, bh)));
        const Ls = scrib.getTotalLength();
        scrib.style.strokeDasharray = Ls;
        scrib.style.strokeDashoffset = 0;
      }

      if (window.matchMedia('(max-width: 768px)').matches) {
        state.Lt = 0;
        state.Ll = 0;
        return;
      }

      /* Hero: descending tail (desktop only — scroll-linked) */
      const hero = document.querySelector('.hero');
      if (visual && hero) {
        const hr = pageRect(hero);
        const metricsEl = document.querySelector('.hero__metrics');
        const gapY = metricsEl
          ? pageRect(metricsEl).t - 18
          : cy + bh + (hr.b - (cy + bh)) * 0.5;
        const leftX = hr.l + 150;
        const tailPts = [
          { x: cx, y: cy + bh + 6 },
          { x: cx + bw * 0.2, y: cy + bh + (gapY - (cy + bh)) * 0.5 },
          { x: hr.l + hr.w * 0.5, y: gapY },
          { x: leftX + 44, y: gapY + 10 },
          { x: leftX, y: hr.b - 14 },
        ];
        tail.setAttribute('d', toPathD(addWobble(tailPts)));
        state.Lt = tail.getTotalLength();
        tail.style.strokeDasharray = state.Lt;
        state.tailA = cy + bh;
        state.tailB = hr.b - 14;
      }

      /* Lower serpentine: down one gutter per section, swapping sides in the
         empty gaps between sections so the stroke never crosses any text. */
      const lpts = [];
      const maxX = W - EDGE_MIN;
      const sections = SECTION_SIDES
        .map((s) => {
          const el = document.querySelector(`#${s.id}`);
          if (!el) return null;
          const inner = el.querySelector('.container') || el;
          const er = pageRect(el);
          const ir = pageRect(inner);
          // Gutter X: sit GUTTER_GAP outside the text column, but never past
          // the viewport edge, and never let the gutter slip over the text.
          const leftX = Math.min(ir.l - 12, Math.max(EDGE_MIN, ir.l - GUTTER_GAP));
          const rightX = Math.max(ir.r + 12, Math.min(maxX, ir.r + GUTTER_GAP));
          const x = s.side === 'left' ? leftX : rightX;
          // Anchor near the top and bottom of the section's content.
          return { x, top: er.t + er.h * 0.12, bot: er.t + er.h * 0.92 };
        })
        .filter(Boolean);

      sections.forEach((sec, i) => {
        lpts.push({ x: sec.x, y: sec.top });
        // A nudge mid-section keeps the run vertical without touching text.
        lpts.push({ x: sec.x, y: (sec.top + sec.bot) / 2 });
        lpts.push({ x: sec.x, y: sec.bot });
        // Diagonal cross-over to the next section's gutter, in the empty gap.
        const next = sections[i + 1];
        if (next && next.x !== sec.x) {
          const midY = (sec.bot + next.top) / 2;
          lpts.push({ x: (sec.x + next.x) / 2, y: midY });
        }
      });

      if (lpts.length >= 2) {
        low.setAttribute('d', toPathD(addWobble(lpts)));
        state.Ll = low.getTotalLength();
        low.style.strokeDasharray = state.Ll;
        state.lowA = lpts[0].y;
        state.lowB = lpts[lpts.length - 1].y;
      }

      draw();
    };

    const debouncedBuild = () => {
      clearTimeout(buildTimer);
      buildTimer = setTimeout(build, 200);
    };

    build();
    buildTimer = setTimeout(build, 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', build);
    const ro = new ResizeObserver(debouncedBuild);
    ro.observe(document.body);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('load', build);
      ro.disconnect();
      clearTimeout(buildTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ink-line" ref={wrapRef} aria-hidden="true">
      <svg ref={svgRef} preserveAspectRatio="none">
        <path ref={scribRef} className="ink-line__path" />
        <path ref={tailRef} className="ink-line__path" />
        <path ref={lowRef} className="ink-line__path" />
        <g ref={penRef} className="ink-line__pen">
          <circle className="ink-line__halo" r="9" />
          <circle className="ink-line__dot" r="3.5" />
        </g>
      </svg>
    </div>
  );
}
