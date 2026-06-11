import { personalInfo, heroContent } from '../data/content';
import meImage from '../assets/me2.jpeg';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__kicker">{heroContent.kicker}</p>
          <h1 className="hero__headline">
            {heroContent.headlineStart}
            <em>{heroContent.headlineAccent}</em>
            {heroContent.headlineEnd}
          </h1>
          <p className="hero__bio">
            {personalInfo.uni} {personalInfo.bio}
          </p>
          <div className="hero__actions">
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__resume-btn"
            >
              view resume
            </a>
            <a
              href="#projects"
              className="hero__work-link"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              see the work →
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo">
            <img src={meImage} alt={personalInfo.name} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hero__metrics">
          {heroContent.metrics.map((m) => (
            <div key={m.label} className="hero__metric">
              <p className="hero__metric-value">{m.value}</p>
              <p className="hero__metric-label">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__status" role="status">
        <div className="container hero__status-inner">
          {heroContent.status.map((s) => (
            <span
              key={s.text}
              className={`hero__status-item${s.ok ? ' hero__status-item--ok' : ''}`}
            >
              {s.text}
            </span>
          ))}
          {personalInfo.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target={social.name !== 'Email' ? '_blank' : undefined}
              rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
              className="hero__status-item hero__status-link"
            >
              {social.name.toLowerCase()} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
