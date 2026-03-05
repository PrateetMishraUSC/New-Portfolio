import { useState, useRef, useEffect, useCallback } from 'react';
import { projects } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';

function mod(n, m) {
  return ((n % m) + m) % m;
}

function shortestOffset(i, center, total) {
  let d = mod(i - center, total);
  if (d > total / 2) d -= total;
  return d;
}

function cardStyle(offset) {
  const abs = Math.abs(offset);
  const angle = offset * 12;
  const scale = abs === 0 ? 1 : abs === 1 ? 0.88 : 0.75;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.7 : 0;
  const zIndex = abs === 0 ? 3 : abs === 1 ? 1 : 0;

  return {
    transform: `translateX(calc(${offset} * (100% + 1.5rem))) rotateY(${angle}deg) scale(${scale})`,
    opacity,
    zIndex,
    ...(abs > 1 && { pointerEvents: 'none' }),
  };
}

const THRESHOLD = 50;

export default function Projects() {
  const sectionRef = useScrollReveal();
  const [centerIndex, setCenterIndex] = useState(0);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const touchDir = useRef(null);
  const navigating = useRef(false);
  const total = projects.length;

  const navigate = useCallback((dir) => {
    if (navigating.current) return;
    navigating.current = true;
    setCenterIndex((prev) => mod(prev + dir, total));
    setTimeout(() => { navigating.current = false; }, 550);
  }, [total]);

  /* ---- Mouse ---- */
  const handleMouseDown = (e) => {
    if (navigating.current) return;
    isDragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.clientX;
    e.preventDefault();
  };

  useEffect(() => {
    const onUp = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const delta = e.clientX - dragStartX.current;
      if (Math.abs(delta) > THRESHOLD) {
        didDrag.current = true;
        navigate(delta < 0 ? 1 : -1);
      }
    };
    window.addEventListener('mouseup', onUp);
    return () => window.removeEventListener('mouseup', onUp);
  }, [navigate]);

  /* ---- Touch ---- */
  const handleTouchStart = (e) => {
    if (navigating.current) return;
    isDragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.touches[0].clientX;
    dragStartY.current = e.touches[0].clientY;
    touchDir.current = null;
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - dragStartX.current;
      const dy = e.touches[0].clientY - dragStartY.current;
      if (touchDir.current === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        touchDir.current = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
      }
      if (touchDir.current === 'v') {
        isDragging.current = false;
        touchDir.current = null;
      }
      if (touchDir.current === 'h') {
        e.preventDefault();
      }
    };
    const onEnd = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      touchDir.current = null;
      const delta = e.changedTouches[0].clientX - dragStartX.current;
      if (Math.abs(delta) > THRESHOLD) {
        didDrag.current = true;
        navigate(delta < 0 ? 1 : -1);
      }
    };
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [navigate]);

  const guardClick = (e) => {
    if (didDrag.current) {
      e.preventDefault();
      didDrag.current = false;
    }
  };

  // Render cards within ±2 offset of center
  const visibleCards = [];
  for (let i = 0; i < total; i++) {
    const offset = shortestOffset(i, centerIndex, total);
    if (Math.abs(offset) <= 2) {
      visibleCards.push({ project: projects[i], offset, index: i });
    }
  }

  return (
    <section id="projects" className="projects-section section">
      <div className="container" ref={sectionRef}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I&apos;ve Built</h2>
          <p className="section-subtitle">
            A selection of projects that showcase my skills in full-stack development,
            system design, and AI/ML.
          </p>
        </div>
      </div>

      <div
        className="projects-carousel"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="projects-carousel__track">
          {visibleCards.map(({ project, offset, index }) => {
            const style = cardStyle(offset);
            return (
              <article key={index} className="project-card" style={style} data-slot={offset}>
                <a
                  href={project.liveUrl || project.sourceUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__image-link"
                  aria-label={`View ${project.title}`}
                  onClick={guardClick}
                >
                  <div className="project-card__image" style={{ background: project.gradient }}>
                    {project.image && (
                      <img src={project.image} alt={project.title} loading="lazy" draggable="false" />
                    )}
                  </div>
                </a>

                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__description">{project.description}</p>

                  <div className="project-card__tech">
                    {project.tech.map((t) => (
                      <span key={t} className="project-card__tag">{t}</span>
                    ))}
                  </div>

                  <div className="project-card__links">
                    {project.liveUrl && project.liveUrl.trim() !== '' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo of ${project.title}`}
                        className="project-card__link"
                        onClick={guardClick}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {project.sourceUrl && project.sourceUrl.trim() !== '' && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Source code of ${project.title}`}
                        className="project-card__link"
                        onClick={guardClick}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="projects-carousel__dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`projects-carousel__dot${i === centerIndex ? ' projects-carousel__dot--active' : ''}`}
            onClick={() => {
              if (i === centerIndex || navigating.current) return;
              setCenterIndex(i);
            }}
            aria-label={`Go to ${projects[i].title}`}
          />
        ))}
      </div>
    </section>
  );
}
