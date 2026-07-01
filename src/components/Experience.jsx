import { useEffect, useRef, useState } from 'react';
import { experience } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Experience.css';

export default function Experience() {
  const ref = useScrollReveal();
  const ledgerRef = useRef(null);
  const pinnedRef = useRef(null);
  const unpinTimer = useRef(0);
  const [open, setOpen] = useState(0);

  // As you scroll, the row whose centre is nearest the viewport middle
  // auto-opens. Tapping a row pins it briefly, then control returns to scroll.
  useEffect(() => {
    const ledger = ledgerRef.current;
    if (!ledger) return;
    let raf = 0;

    const scrollOpen = () => {
      raf = 0;
      if (pinnedRef.current !== null) return;
      const rows = ledger.querySelectorAll('.row');
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestD = Infinity;
      rows.forEach((r, i) => {
        const rect = r.getBoundingClientRect();
        const d = Math.abs(rect.top + rect.height / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setOpen(best);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(scrollOpen);
    };

    scrollOpen();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(unpinTimer.current);
    };
  }, []);

  const pin = (i) => {
    pinnedRef.current = i;
    setOpen(i);
    clearTimeout(unpinTimer.current);
    unpinTimer.current = setTimeout(() => {
      pinnedRef.current = null;
    }, 2500);
  };

  return (
    <section id="experience" className="section">
      <div className="container" ref={ref}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">03 — experience</span>
          <h2 className="section-title">
            Where I&apos;ve <em>worked</em>
          </h2>
          <p className="section-subtitle">
            A short ledger of roles — scroll, or tap a line to pin it.
          </p>
        </div>

        <div className="ledger animate-on-scroll" ref={ledgerRef}>
          {experience.map((exp, i) => (
            <div
              key={`${exp.company}-${exp.role}`}
              className={`row${i === open ? ' row--open' : ''}`}
              onClick={() => pin(i)}
            >
              <div className="row__idx">{String(i + 1).padStart(2, '0')}</div>
              <div className="row__main">
                <h3 className="row__role">{exp.role}</h3>
                <p className="row__company">{exp.company}</p>
                <div className="row__body">
                  <p className="row__desc">{exp.description}</p>
                </div>
              </div>
              <div className="row__when">
                <b>{exp.date}</b>
                {exp.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
