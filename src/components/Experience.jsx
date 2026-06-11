import { experience } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Experience.css';

export default function Experience() {
  const ref = useScrollReveal();

  return (
    <section id="experience" className="section">
      <div className="container" ref={ref}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">03 — experience</span>
          <h2 className="section-title">Where I&apos;ve worked</h2>
          <p className="section-subtitle">
            Professional roles where I applied my skills to build real products and systems.
          </p>
        </div>

        <div className="worklog">
          {experience.map((exp, index) => (
            <article
              key={`${exp.company}-${exp.role}`}
              className="worklog__entry animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="worklog__when">
                <p className="worklog__date">{exp.date}</p>
                <p className="worklog__location">{exp.location}</p>
              </div>
              <div className="worklog__what">
                <h3 className="worklog__role">{exp.role}</h3>
                <p className="worklog__company">{exp.company}</p>
                <p className="worklog__description">{exp.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
