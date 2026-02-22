import { education } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Education.css';

export default function Education() {
  const ref = useScrollReveal();

  return (
    <section id="education" className="section">
      <div className="container" ref={ref}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">
            The institutions and coursework that shaped my engineering foundation.
          </p>
        </div>

        <div className="education__list stagger">
          {education.map((edu) => (
            <article key={edu.degree} className="edu-card glass animate-on-scroll">
              <div className="edu-card__header">
                <div className="edu-card__left">
                  <h3 className="edu-card__degree">{edu.degree} </h3>
                  <p className="edu-card__school">{edu.school}, <em>{edu.gpa}</em></p>
                </div>
                <div className="edu-card__right">
                  <span className="edu-card__date">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {edu.date}
                  </span>
                  <span className="edu-card__location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {edu.location}
                  </span>
                </div>
              </div>

              <p className="edu-card__overview">{edu.overview}</p>

              <div className="edu-card__columns">
                <div className="edu-card__column">
                  <h4 className="edu-card__column-title">Achievements</h4>
                  <ul className="edu-card__achievements">
                    {edu.achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="edu-card__column">
                  <h4 className="edu-card__column-title">Coursework</h4>
                  <div className="edu-card__coursework">
                    {edu.coursework.map((course) => (
                      <span key={course} className="edu-card__course-tag">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
