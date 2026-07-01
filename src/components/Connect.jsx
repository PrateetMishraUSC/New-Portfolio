import { useEffect, useState } from 'react';
import { personalInfo } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Connect.css';

function useLocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Connect() {
  const ref = useScrollReveal();
  const time = useLocalTime();

  const linkedin = personalInfo.socials.find((s) => s.name === 'LinkedIn')?.url || '#';
  const github = personalInfo.socials.find((s) => s.name === 'GitHub')?.url || '#';

  const channels = [
    { label: 'linkedin', url: linkedin },
    { label: 'github', url: github },
    { label: 'resume', url: personalInfo.resumeUrl },
  ];

  return (
    <section id="connect" className="section connect">
      <div className="container" ref={ref}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">05 — contact</span>
        </div>

        <div className="animate-on-scroll">
          <span className="connect__status">
            <span className="connect__pulse" />
            available · open to new-grad SWE &amp; applied-AI roles
          </span>
          <h2 className="connect__statement">
            <span className="connect__soft">Let&apos;s build something.</span> Say hello at{' '}
            <a href={`mailto:${personalInfo.email}`} className="connect__mail">
              {personalInfo.email}
            </a>
          </h2>
        </div>

        <div className="connect__foot animate-on-scroll">
          <div className="connect__channels">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="connect__channel"
              >
                <span className="connect__tag">
                  {c.label} <span className="connect__arrow">↗</span>
                </span>
              </a>
            ))}
          </div>
          <div className="connect__clock">
            my local time · San Francisco
            <br />
            <b>{time}</b>
          </div>
        </div>
      </div>
    </section>
  );
}
