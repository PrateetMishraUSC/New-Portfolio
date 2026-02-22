import { personalInfo } from '../data/content';
import './Connect.css';

export default function Connect() {
  return (
    <section id="connect" className="section connect">
      <div className="container connect__inner">
        <span className="section-label">Contact</span>
        <h2 className="connect__title">Let&apos;s Connect</h2>
        <p className="connect__description">
          I&apos;m currently looking for new graduate software engineering and applied AI
          roles. Whether you have an opportunity, a question, or just want to say hello —
          my inbox is always open.
        </p>
        <div className="connect__buttons">
          <a
            href={`mailto:${personalInfo.email}`}
            className="connect__btn connect__btn--primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Send an Email
          </a>
          <a
            href={personalInfo.socials.find((s) => s.name === 'LinkedIn')?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="connect__btn connect__btn--secondary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
