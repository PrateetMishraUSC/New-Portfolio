import { personalInfo } from '../data/content';
import meImage from '../assets/me.png';
import { useTypingEffect } from '../hooks/useTypingEffect';
import './Hero.css';

export default function Hero() {
  const { displayText } = useTypingEffect(personalInfo.tagline);

  return (
    <section id="hero" className="hero section">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__greeting">{personalInfo.greeting}</p>
          <h2 className="hero__tagline">
            {displayText}
            <span className="hero__cursor" aria-hidden="true">|</span>
          </h2>
          <h4 className='hero__uni'>{personalInfo.uni}</h4>
          <p className="hero__bio">{personalInfo.bio}</p>
          <div className="hero__actions">
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__resume-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              View Resume
            </a>
            <a
              href="#projects"
              className="hero__projects-btn"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__avatar">
            <div className="hero__avatar-placeholder">
              <img src={meImage} alt={personalInfo.name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
