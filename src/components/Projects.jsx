import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';

const HOLD_SCREENS = 2; // extra scroll allotted to the more-work focus cycle

function smoothPath(p) {
  if (p.length < 2) return '';
  let d = `M${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i > 0 ? i - 1 : 0];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2 < p.length ? i + 2 : p.length - 1];
    d +=
      ` C${(p1.x + (p2.x - p0.x) / 6).toFixed(1)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(1)} ` +
      `${(p2.x - (p3.x - p1.x) / 6).toFixed(1)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(1)} ` +
      `${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function ProjectLinks({ project }) {
  return (
    <div className="project__links">
      {project.liveUrl && project.liveUrl.trim() !== '' && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Live demo of ${project.title}`}
          className="project__link"
        >
          live ↗
        </a>
      )}
      {project.sourceUrl && project.sourceUrl.trim() !== '' && (
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Source code of ${project.title}`}
          className="project__link"
        >
          source ↗
        </a>
      )}
    </div>
  );
}

function isInteractive() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(min-width: 769px)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function Projects() {
  const revealRef = useScrollReveal();
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const railRef = useRef(null);
  const barRef = useRef(null);
  const railSvgRef = useRef(null);
  const railPathRef = useRef(null);
  const railDotRef = useRef(null);
  const moreActiveRef = useRef(0);

  const [active, setActive] = useState(0);
  const [moreActive, setMoreActive] = useState(0);
  const [interactive, setInteractive] = useState(isInteractive);

  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);
  const panelCount = featured.length + 1;
  const moreCount = more.length;
  const trackScreens = panelCount + HOLD_SCREENS;
  const fH = (panelCount - 1) / (panelCount - 1 + HOLD_SCREENS);

  useEffect(() => {
    const m1 = window.matchMedia('(min-width: 769px)');
    const m2 = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setInteractive(m1.matches && !m2.matches);
    m1.addEventListener('change', onChange);
    m2.addEventListener('change', onChange);
    return () => {
      m1.removeEventListener('change', onChange);
      m2.removeEventListener('change', onChange);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const rail = railRef.current;
    const bar = barRef.current;
    if (!track || !sticky || !rail) return;

    const navHeight =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) ||
      64;
    const maxX = ((panelCount - 1) / panelCount) * 100;
    let raf = 0;
    let railLen = 0;

    const buildRail = () => {
      const svg = railSvgRef.current;
      const path = railPathRef.current;
      if (!svg || !path) {
        railLen = 0;
        return;
      }
      const rect = svg.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (!h || h < 50) {
        railLen = 0;
        return;
      }
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const railX = 8;
      const topY = h * 0.13;
      const botY = h * 0.97;
      const pts = [
        { x: railX - 54, y: topY },
        { x: railX, y: topY },
      ];
      for (let y = topY + 12; y <= botY; y += 16) {
        pts.push({ x: railX + Math.sin(((y - topY) / 165) * Math.PI * 2) * 7, y });
      }
      path.setAttribute('d', smoothPath(pts));
      railLen = path.getTotalLength();
      path.style.strokeDasharray = railLen;
      path.style.strokeDashoffset = railLen;
    };

    const update = () => {
      raf = 0;
      if (!interactive) {
        rail.style.transform = '';
        if (bar) bar.style.width = '0%';
        return;
      }
      const total = track.offsetHeight - sticky.offsetHeight;
      const top = track.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(navHeight - top, 0), total);
      const p = total > 0 ? scrolled / total : 0;

      let hp;
      let sub;
      if (p <= fH) {
        hp = fH > 0 ? p / fH : 0;
        sub = 0;
      } else {
        hp = 1;
        sub = (p - fH) / (1 - fH);
      }

      rail.style.transform = `translateX(-${(hp * maxX).toFixed(3)}%)`;
      if (bar) bar.style.width = `${(p * 100).toFixed(2)}%`;
      setActive(hp < 1 ? Math.round(hp * (panelCount - 1)) : panelCount - 1);

      const pathEl = railPathRef.current;
      const dotEl = railDotRef.current;
      if (railLen && pathEl) {
        pathEl.style.strokeDashoffset = railLen * (1 - sub);
        if (dotEl) {
          if (sub > 0.01 && sub < 0.999) {
            const pt = pathEl.getPointAtLength(railLen * sub);
            dotEl.setAttribute('cx', pt.x);
            dotEl.setAttribute('cy', pt.y);
            dotEl.style.opacity = '1';
          } else {
            dotEl.style.opacity = '0';
          }
        }
      }

      const mIdx = Math.min(moreCount - 1, Math.max(0, Math.floor(sub * moreCount)));
      if (mIdx !== moreActiveRef.current) {
        moreActiveRef.current = mIdx;
        setMoreActive(mIdx);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      buildRail();
      onScroll();
    };

    buildRail();
    const t = setTimeout(buildRail, 400);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildRail);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [interactive, panelCount, moreCount, fH]);

  const scrollToItem = (i) => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;
    const navHeight =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) ||
      64;
    const total = track.offsetHeight - sticky.offsetHeight;
    const x = (fH + ((i + 0.5) / moreCount) * (1 - fH)) * total;
    const trackDocTop = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: trackDocTop - navHeight + x, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="projects" ref={revealRef}>
      <div
        className="projects__track"
        ref={trackRef}
        style={{ '--panels': panelCount, '--track-screens': trackScreens }}
      >
        <div className="projects__sticky" ref={stickyRef}>
          <div className="container projects__head">
            <span className="section-label">02 — work</span>
            <span className="projects__count">
              {String(active + 1).padStart(2, '0')} / {String(panelCount).padStart(2, '0')}
            </span>
          </div>

          <div className="projects__rail" ref={railRef}>
            {featured.map((project, i) => (
              <article className="panel panel--featured animate-on-scroll" key={project.title}>
                <div className="container panel__inner">
                  <a
                    href={project.sourceUrl || project.liveUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel__media"
                    aria-label={`View ${project.title}`}
                  >
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </a>
                  <div className="panel__body">
                    <div className="panel__index-row">
                      <p className="panel__index">{`02.${i + 1}`}</p>
                      <span className="panel__featured-pill">★ featured</span>
                    </div>
                    <h3 className="panel__title">{project.title}</h3>
                    {project.metric && (
                      <p className="panel__metric">
                        <span className="panel__metric-value">{project.metric.value}</span>
                        <span className="panel__metric-label">{project.metric.label}</span>
                      </p>
                    )}
                    <p className="panel__description">{project.description}</p>
                    <p className="panel__tech">{project.tech.join(' · ').toLowerCase()}</p>
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </article>
            ))}

            {interactive ? (
              <article className="panel panel--more">
                <div className="container panel__more-inner">
                  <p className="panel__more-label">more work</p>
                  <div className="more__focus">
                    <div className="more__list">
                      {more.map((project, i) => (
                        <button
                          key={project.title}
                          className={`more__name${i === moreActive ? ' more__name--on' : ''}`}
                          onClick={() => scrollToItem(i)}
                        >
                          <span className="more__name-index">{`02.${featured.length + i + 1}`}</span>
                          {project.title}
                        </button>
                      ))}
                    </div>
                    <div className="more__preview" key={moreActive}>
                      <a
                        href={more[moreActive].sourceUrl || more[moreActive].liveUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="more__media"
                        aria-label={`View ${more[moreActive].title}`}
                      >
                        <img src={more[moreActive].image} alt={more[moreActive].title} loading="lazy" />
                      </a>
                      <p className="more__desc">{more[moreActive].description}</p>
                      <p className="more__tech">{more[moreActive].tech.join(' · ').toLowerCase()}</p>
                      <ProjectLinks project={more[moreActive]} />
                    </div>
                  </div>
                </div>
              </article>
            ) : (
              <article className="panel panel--more">
                <div className="container panel__more-inner">
                  <p className="panel__more-label">more work</p>
                  <div className="panel__more-list">
                    {more.map((project, i) => (
                      <div className="more-item animate-on-scroll" key={project.title}>
                        <p className="more-item__index">{`02.${featured.length + i + 1}`}</p>
                        <h3 className="more-item__title">{project.title}</h3>
                        <p className="more-item__description">{project.description}</p>
                        <p className="more-item__tech">{project.tech.join(' · ').toLowerCase()}</p>
                        <ProjectLinks project={project} />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            )}
          </div>

          <div className="container projects__progress-wrap">
            <div className="projects__progress">
              <div className="projects__progress-bar" ref={barRef} />
            </div>
            <span className="projects__hint">scroll to move sideways →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
