import { useEffect, useRef } from 'react';
import './InkLine.css';

/*
 * Routing rule: in text-dense sections the line travels through margins
 * (fx < 0 puts it in the container gutter) and divider bands (fy > 1 puts
 * it below the element), never across a column of running text.
 */
const ANCHORS = [
  { sel: '.hero__visual', loop: true },
  { sel: '.hero__metrics', fx: 0.32, fy: 0.55 },
  { sel: '.hero__status-inner', fx: 0.1, fy: 0.5 },
  { sel: '#projects .section-header', fx: -0.04, fy: 0.5 },
  { caseStudies: true },
  { sel: '.more-work__label', fx: -0.03, fy: 0.5 },
  { sel: '.more-work', fx: -0.045, fy: 1.03 },
  { sel: '#experience .section-header', fx: 0.72, fy: -0.55 },
  { sel: '#experience .section-header', fx: -0.04, fy: 0.6 },
  { sel: '.worklog__entry:nth-child(2)', fx: -0.05, fy: 0.5 },
  { sel: '.worklog__entry:nth-child(3)', fx: -0.035, fy: 0.6 },
  { sel: '.worklog', fx: -0.04, fy: 1.02 },
  { sel: '#about .section-header', fx: 0.75, fy: -0.55 },
  { sel: '#about .section-header', fx: 1.04, fy: 0.6 },
  { sel: '.about__education .about__degree:nth-child(2)', fx: 1.05, fy: 0.4 },
  { sel: '.about__tools-groups', fx: 0.97, fy: 1.15 },
  { sel: '.about__tools-groups', fx: 0.12, fy: 1.3 },
  { sel: '#connect .section-header', fx: -0.04, fy: 0.55 },
  { sel: '.connect__email', fx: -0.02, fy: 1.25 },
  { sel: '.connect__email', fx: 1.05, fy: 1.1 },
  { sel: '.connect__email', fx: 1.12, fy: 0.35 },
];

function pageRect(el) {
  const r = el.getBoundingClientRect();
  const sx = window.scrollX;
  const sy = window.scrollY;
  return { l: r.left + sx, t: r.top + sy, r: r.right + sx, b: r.bottom + sy, w: r.width, h: r.height };
}

/* The line is born at the photo: 2.5 messy emphasis loops (each revolution
   gets its own margin, center nudge, and radius wobble so they read as a
   hand circling, not a compass), then an exit toward the metrics strip. */
function loopPoints(rect) {
  const cx = (rect.l + rect.r) / 2;
  const cy = (rect.t + rect.b) / 2;
  const bw = rect.w / 2;
  const bh = rect.h / 2;
  const revs = [
    { m: 24, ox: -5, oy: 4 },
    { m: 38, ox: 7, oy: -6 },
    { m: 16, ox: -3, oy: 7 },
  ];
  const pts = [];
  const steps = 6;
  revs.forEach((rv, k) => {
    for (let i = 0; i < steps; i++) {
      const a = -Math.PI / 2 + (i / steps) * 2 * Math.PI;
      const jr = Math.sin(i * 2.7 + k * 5.3) * 5;
      pts.push({
        x: cx + rv.ox + (bw + rv.m + jr) * Math.cos(a),
        y: cy + rv.oy + (bh + rv.m + jr) * Math.sin(a),
        solid: true,
      });
    }
  });
  pts.push({ x: rect.l - 24, y: rect.b + 22, solid: true });
  return pts;
}

function collectPoints() {
  const pts = [];
  for (const a of ANCHORS) {
    if (a.caseStudies) {
      document.querySelectorAll('.case-study').forEach((cs, i) => {
        const media = cs.querySelector('.case-study__media');
        const links = cs.querySelector('.project__links');
        if (!media || !links) return;
        const mr = pageRect(media);
        const lr = pageRect(links);
        const mediaLeft = i % 2 === 0;
        pts.push({ x: mediaLeft ? mr.l - 18 : mr.r + 18, y: mr.t + mr.h * 0.55 });
        pts.push({ x: mediaLeft ? lr.r + 30 : lr.l - 30, y: lr.b + 14 });
      });
      continue;
    }
    const el = document.querySelector(a.sel);
    if (!el) continue;
    const rect = pageRect(el);
    if (a.loop) {
      pts.push(...loopPoints(rect));
    } else {
      pts.push({ x: rect.l + rect.w * a.fx, y: rect.t + rect.h * a.fy });
    }
  }
  return pts;
}

/* Insert wobbly midpoints so the curve reads hand-drawn, not geometric */
function addWobble(pts) {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    out.push(pts[i]);
    const next = pts[i + 1];
    if (!next || pts[i].solid || next.solid) continue;
    const dx = next.x - pts[i].x;
    const dy = next.y - pts[i].y;
    const dist = Math.hypot(dx, dy);
    if (dist < 120) continue;
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
  const pathRef = useRef(null);
  const glowRef = useRef(null);
  const penRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const state = { L: 0, samples: [] };
    let scrollRaf = 0;
    let buildTimer = 0;

    const update = () => {
      scrollRaf = 0;
      const path = pathRef.current;
      const glow = glowRef.current;
      const pen = penRef.current;
      if (!path || !state.L) return;
      if (reduceMotion.matches) {
        path.style.strokeDashoffset = 0;
        glow.style.strokeDashoffset = 0;
        pen.style.opacity = 0;
        return;
      }
      const target = window.scrollY + window.innerHeight * 0.62;
      let len = 0;
      for (const s of state.samples) {
        if (s.y <= target) len = s.len;
      }
      path.style.strokeDashoffset = state.L - len;
      glow.style.strokeDashoffset = state.L - len;
      if (len > 2 && len < state.L - 4) {
        const pt = path.getPointAtLength(len);
        pen.style.transform = `translate(${pt.x}px, ${pt.y}px)`;
        pen.style.opacity = 1;
      } else {
        pen.style.opacity = 0;
      }
    };

    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(update);
    };

    const build = () => {
      const wrap = wrapRef.current;
      const svg = svgRef.current;
      const path = pathRef.current;
      const glow = glowRef.current;
      if (!wrap || !svg || !path) return;
      if (window.matchMedia('(max-width: 768px)').matches) {
        state.L = 0;
        return;
      }
      const w = document.documentElement.clientWidth;
      const h = document.body.offsetHeight;
      wrap.style.height = `${h}px`;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const pts = addWobble(collectPoints());
      if (pts.length < 2) return;
      const d = toPathD(pts);
      path.setAttribute('d', d);
      glow.setAttribute('d', d);
      state.L = path.getTotalLength();
      path.style.strokeDasharray = state.L;
      glow.style.strokeDasharray = state.L;
      const samples = [];
      const STEPS = 800;
      for (let i = 0; i <= STEPS; i++) {
        const len = (state.L * i) / STEPS;
        samples.push({ len, y: path.getPointAtLength(len).y });
      }
      state.samples = samples;
      update();
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
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return (
    <div className="ink-line" ref={wrapRef} aria-hidden="true">
      <svg ref={svgRef} preserveAspectRatio="none">
        <path ref={glowRef} className="ink-line__glow" />
        <path ref={pathRef} className="ink-line__path" />
        <g ref={penRef} className="ink-line__pen">
          <circle className="ink-line__halo" r="9" />
          <circle className="ink-line__dot" r="3.5" />
        </g>
      </svg>
    </div>
  );
}
