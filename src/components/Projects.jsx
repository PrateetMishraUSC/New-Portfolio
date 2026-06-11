import { projects } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';

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

export default function Projects() {
  const sectionRef = useScrollReveal();
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="section-label">02 — work</span>
          <h2 className="section-title">Things I&apos;ve built</h2>
          <p className="section-subtitle">
            Selected projects across full-stack development, system design, and AI/ML.
          </p>
        </div>

        <div className="case-studies">
          {featured.map((project, i) => (
            <article
              key={project.title}
              className={`case-study animate-on-scroll${i % 2 === 1 ? ' case-study--flipped' : ''}`}
            >
              <a
                href={project.sourceUrl || project.liveUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study__media"
                aria-label={`View ${project.title}`}
              >
                <img src={project.image} alt={project.title} loading="lazy" />
              </a>
              <div className="case-study__body">
                <p className="case-study__index">
                  {`02.${i + 1}`}
                </p>
                <h3 className="case-study__title">{project.title}</h3>
                {project.metric && (
                  <p className="case-study__metric">
                    <span className="case-study__metric-value">{project.metric.value}</span>
                    <span className="case-study__metric-label">{project.metric.label}</span>
                  </p>
                )}
                <p className="case-study__description">{project.description}</p>
                <p className="case-study__tech">{project.tech.join(' · ').toLowerCase()}</p>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>

        <div className="more-work animate-on-scroll">
          <p className="more-work__label">more work</p>
          {more.map((project) => (
            <article key={project.title} className="more-work__row">
              <h3 className="more-work__title">{project.title}</h3>
              <p className="more-work__description">{project.description}</p>
              <p className="more-work__tech">{project.tech.join(' · ').toLowerCase()}</p>
              <ProjectLinks project={project} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
