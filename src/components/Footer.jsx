import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__item">designed &amp; built by prateet</span>
        <span className="footer__item">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
