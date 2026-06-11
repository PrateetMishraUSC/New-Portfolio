import { education, coreTools } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="section">
      <div className="container" ref={ref}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">04 — about</span>
          <h2 className="section-title">Background &amp; toolkit</h2>
          <p className="section-subtitle">
            The education that shaped my engineering foundation, and the tools I reach for.
          </p>
        </div>

        <div className="about__education">
          {education.map((edu) => (
            <article key={edu.degree} className="about__degree animate-on-scroll">
              <div className="about__degree-when">
                <p className="about__degree-date">{edu.date}</p>
                <p className="about__degree-meta">{edu.location}</p>
                <p className="about__degree-meta">{edu.gpa}</p>
              </div>
              <div className="about__degree-what">
                <h3 className="about__degree-title">{edu.degree}</h3>
                <p className="about__degree-school">{edu.school}</p>
                <ul className="about__degree-achievements">
                  {edu.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="about__degree-coursework">
                  {edu.coursework.join(' · ').toLowerCase()}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="about__tools animate-on-scroll">
          <p className="about__tools-label">core tools</p>
          <div className="about__tools-groups">
            {coreTools.map((group) => (
              <div key={group.group} className="about__tools-group">
                <p className="about__tools-group-name">{group.group}</p>
                <div className="about__tools-tags">
                  {group.items.map((item) => (
                    <span key={item} className="about__tool">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
