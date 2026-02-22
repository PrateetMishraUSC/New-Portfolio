import { projects } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';

export default function Projects() {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="section">
      <div className="container" ref={ref}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I&apos;ve Built</h2>
          <p className="section-subtitle">
            A selection of projects that showcase my skills in full-stack development,
            system design, and AI/ML.
          </p>
        </div>

        <div className="featured-projects">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`fp fp--${index % 2 === 0 ? 'left' : 'right'} animate-on-scroll`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={project.liveUrl || project.sourceUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="fp__image-wrap"
                aria-label={`View ${project.title}`}
              >
                <div className="fp__image" style={{ background: project.gradient }}>
                  {project.image && (
                    <img src={project.image} alt={project.title} loading="lazy" />
                  )}
                </div>
              </a>

              <div className="fp__content">
                <span className="fp__label">Featured Project</span>
                <h3 className="fp__title">{project.title}</h3>
                <div className="fp__description glass">
                  <p>{project.description}</p>
                </div>
                <div className="fp__tech">
                  {project.tech.map((t) => (
                    <span key={t} className="fp__tag">{t}</span>
                  ))}
                </div>
                <div className="fp__links">
                  {project.liveUrl && project.liveUrl.trim() !== '' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live demo of ${project.title}`}
                      className="fp__link"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                  {project.sourceUrl && project.sourceUrl.trim() !== '' && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Source code of ${project.title}`}
                      className="fp__link"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
