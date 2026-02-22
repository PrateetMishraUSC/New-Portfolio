import { useMemo } from 'react';
import { floatingIcons } from '../data/content';
import './FloatingIcons.css';

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/';

export default function FloatingIcons() {
  // Generate random but stable positions/timings for each icon on mount
  const items = useMemo(() => {
    return floatingIcons.map((icon, i) => ({
      icon,
      style: {
        left: `${5 + ((i * 37 + 13) % 85)}%`,
        top: `${5 + ((i * 53 + 29) % 80)}%`,
        animationDuration: `${18 + (i % 5) * 4}s`,
        animationDelay: `${-(i * 2.7)}s`,
        // Vary size slightly
        width: `${28 + (i % 4) * 6}px`,
        height: `${28 + (i % 4) * 6}px`,
      },
    }));
  }, []);

  return (
    <div className="floating-icons" aria-hidden="true">
      {items.map((item, i) => (
        <div key={i} className="floating-icons__item" style={item.style}>
          <img
            src={`${DEVICON_BASE}${item.icon}`}
            alt=""
            width={item.style.width}
            height={item.style.height}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
