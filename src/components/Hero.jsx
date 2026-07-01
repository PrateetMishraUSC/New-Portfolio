import { personalInfo, heroContent } from '../data/content';
import meImage from '../assets/me2.jpeg';
import './Hero.css';

const ICON_PATHS = {
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  school: (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </>
  ),
  pin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </>
  ),
};

function StatusIcon({ name }) {
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg
      className="hero__status-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

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
          <span className="hero__status-item hero__status-item--ok">
            <span className="hero__status-dot" aria-hidden="true" />
            {heroContent.status.map((s) => s.text).join(' · ')}
          </span>
          <div className="hero__status-links">
            {personalInfo.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.name !== 'Email' ? '_blank' : undefined}
                rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="hero__status-link"
              >
                <StatusIcon name={social.icon} />
                {social.name.toLowerCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
