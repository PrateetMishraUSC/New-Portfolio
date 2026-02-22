import { experience } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Experience.css';

const iconMap = {
  briefcase: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  academic: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
    </svg>
  ),
  code: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
};

export default function Experience() {
  const ref = useScrollReveal();

  return (
    <section id="experience" className="section">
      <div className="container" ref={ref}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Professional roles where I applied my skills to build real products and systems.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline__line" />
          {experience.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.role}`}
              className={`timeline__item timeline__item--${index % 2 === 0 ? 'left' : 'right'} animate-on-scroll`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="timeline__dot">
                {iconMap[exp.icon] || iconMap.briefcase}
              </div>
              <div className="timeline__date-mobile">{exp.date}</div>
              <div className="timeline__card glass">
                <div className="timeline__card-header">
                  <h3 className="timeline__role">{exp.role}</h3>
                  <span className="timeline__company">{exp.company}</span>
                </div>
                <div className="timeline__meta">
                  <span className="timeline__date">{exp.date}</span>
                  <span className="timeline__location">{exp.location}</span>
                </div>
                <p className="timeline__description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
