import { personalInfo } from '../data/content';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__socials">
          {personalInfo.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target={social.name !== 'Email' ? '_blank' : undefined}
              rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
              aria-label={social.name}
              className="footer__social-link"
            >
              {social.name}
            </a>
          ))}
        </div>
        <p className="footer__credit">
          Designed & Built by {personalInfo.name}
        </p>
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
