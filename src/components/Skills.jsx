import { skills } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Skills.css';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';

export default function Skills() {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="section">
      <div className="container" ref={ref}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-subtitle">
            My toolkit spans across languages, frameworks, and platforms —
            always expanding as I explore new areas of computer science.
          </p>
        </div>

        <div className="skills__grid stagger">
          {skills.map((group) => (
            <div key={group.category} className="skills__category glass animate-on-scroll">
              <h3 className="skills__category-title">{group.category}</h3>
              <div className="skills__items">
                {group.items.map((skill) => (
                  <div key={skill.name} className="skills__pill">
                    <img
                      src={skill.isCustom ? skill.icon : `${DEVICON_BASE}${skill.icon}`}
                      alt={skill.name}
                      width="20"
                      height="20"
                      loading="lazy"
                    />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
