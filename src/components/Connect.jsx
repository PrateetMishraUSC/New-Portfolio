import { personalInfo } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Connect.css';

export default function Connect() {
  const linkedin = personalInfo.socials.find((s) => s.name === 'LinkedIn')?.url || '#';
  const github = personalInfo.socials.find((s) => s.name === 'GitHub')?.url || '#';

  return (
    <section id="connect" className="section connect">
      <div className="container" ref={useScrollReveal()}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">05 — contact</span>
          <h2 className="section-title">Let&apos;s build something.</h2>
          <p className="section-subtitle">
            I&apos;m currently looking for new graduate software engineering and applied AI
            roles. Whether you have an opportunity, a question, or just want to say hello —
            my inbox is always open.
          </p>
        </div>

        <div className="connect__body animate-on-scroll">
          <a href={`mailto:${personalInfo.email}`} className="connect__email">
            {personalInfo.email}
          </a>
          <div className="connect__links">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="connect__link"
            >
              linkedin ↗
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="connect__link"
            >
              github ↗
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="connect__link"
            >
              resume ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
