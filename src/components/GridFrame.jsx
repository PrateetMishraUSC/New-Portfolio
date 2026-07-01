import { useEffect, useRef } from 'react';
import './GridFrame.css';

const DIVIDER_SECTION_IDS = ['projects', 'experience', 'about', 'connect'];
const SIDE_MARGIN = 28;
const RULER_WIDTH = 40;

function pageRect(el) {
  const r = el.getBoundingClientRect();
  return {
    l: r.left + window.scrollX,
    t: r.top + window.scrollY,
    r: r.right + window.scrollX,
    b: r.bottom + window.scrollY,
    w: r.width,
    h: r.height,
  };
}

export default function GridFrame() {
  const wrapRef = useRef(null);
  const boxRef = useRef(null);
  const rulerRef = useRef(null);
  const dividerRefs = useRef([]);

  useEffect(() => {
    let buildTimer = 0;

    const build = () => {
      const wrap = wrapRef.current;
      const box = boxRef.current;
      const ruler = rulerRef.current;
      if (!wrap || !box || !ruler) return;

      if (window.matchMedia('(max-width: 768px)').matches) {
        return;
      }

      const main = document.querySelector('main');
      if (!main) return;
      const mr = pageRect(main);
      const navHeight =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) ||
        64;

      const W = document.documentElement.clientWidth;
      const left = RULER_WIDTH;
      const right = W - SIDE_MARGIN;
      const top = mr.t + navHeight;
      const bottom = mr.b;

      wrap.style.height = `${bottom + 40}px`;

      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
      box.style.width = `${right - left}px`;
      box.style.height = `${bottom - top}px`;

      ruler.style.left = '12px';
      ruler.style.top = `${top}px`;
      ruler.style.height = `${bottom - top}px`;

      dividerRefs.current.forEach((d, i) => {
        if (!d) return;
        const sec = document.getElementById(DIVIDER_SECTION_IDS[i]);
        if (!sec) {
          d.style.display = 'none';
          return;
        }
        const sr = pageRect(sec);
        d.style.display = 'block';
        d.style.top = `${sr.t}px`;
        d.style.left = `${left - 16}px`;
        d.style.width = `${right - left + 32}px`;
      });
    };

    const debouncedBuild = () => {
      clearTimeout(buildTimer);
      buildTimer = setTimeout(build, 200);
    };

    build();
    buildTimer = setTimeout(build, 500);
    window.addEventListener('resize', debouncedBuild);
    window.addEventListener('load', build);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    const ro = new ResizeObserver(debouncedBuild);
    ro.observe(document.body);

    return () => {
      window.removeEventListener('resize', debouncedBuild);
      window.removeEventListener('load', build);
      ro.disconnect();
      clearTimeout(buildTimer);
    };
  }, []);

  return (
    <div className="grid-frame" ref={wrapRef} aria-hidden="true">
      <div className="grid-frame__ruler" ref={rulerRef} />
      <div className="grid-frame__box" ref={boxRef}>
        <span className="grid-frame__dot grid-frame__dot--tl" />
        <span className="grid-frame__dot grid-frame__dot--tr" />
        <span className="grid-frame__dot grid-frame__dot--bl" />
        <span className="grid-frame__dot grid-frame__dot--br" />
        <span className="grid-frame__stub grid-frame__stub--tl-h" />
        <span className="grid-frame__stub grid-frame__stub--tl-v" />
        <span className="grid-frame__stub grid-frame__stub--tr-h" />
        <span className="grid-frame__stub grid-frame__stub--tr-v" />
        <span className="grid-frame__stub grid-frame__stub--bl-h" />
        <span className="grid-frame__stub grid-frame__stub--bl-v" />
        <span className="grid-frame__stub grid-frame__stub--br-h" />
        <span className="grid-frame__stub grid-frame__stub--br-v" />
      </div>
      {DIVIDER_SECTION_IDS.map((id, i) => (
        <div
          key={id}
          className="grid-frame__divider"
          ref={(el) => {
            dividerRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}
