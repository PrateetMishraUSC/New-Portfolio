import { education, coreTools } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

// Emphasis tiers for the skill constellation: 4 = reach for it daily,
// 1 = occasional. Anything not listed falls back to tier 2.
const SKILL_TIER = {
  Python: 3,
  React: 4,
  LLMs: 4,
  TypeScript: 4,
  'Node.js': 4,
  JavaScript: 4,
  FastAPI: 3,
  PostgreSQL: 4,
  AWS: 3,
  Docker: 3,
  RAG: 3,
  PyTorch: 3,
  'Generative AI': 3,
  'Agentic Workflows': 3,
  'Next.js': 2,
  Django: 2,
  Redis: 2,
  GCP: 2,
  Kubernetes: 2,
  'CI/CD': 2,
  'GitHub Actions': 2,
  LangChain: 3,
  WebSockets: 3,
  MongoDB: 2,
  'Hugging Face': 2,
  'C++': 2,
  SQL: 2,
  'Tailwind CSS': 2,
  Linux: 2,
  Git: 3,
  GraphQL: 3,
  MySQL: 1,
  Supabase: 1,
  FAISS: 1,
  'Express.js': 1,
  Prisma: 1,
  Jest: 1,
  Pytest: 1,
  OCR: 1,
};

// Flatten the grouped tools into one constellation, de-duplicated.
const skills = (() => {
  const seen = new Set();
  const out = [];
  for (const group of coreTools) {
    for (const item of group.items) {
      if (seen.has(item)) continue;
      seen.add(item);
      out.push({ name: item, tier: SKILL_TIER[item] ?? 2 });
    }
  }
  return out;
})();

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="section">
      <div className="container" ref={ref}>
        <div className="section-header animate-on-scroll">
          <span className="section-label">04 — about</span>
          <h2 className="section-title">
            Background &amp; <em>toolkit</em>
          </h2>
          <p className="section-subtitle">
            The foundation that shaped me, and the tools I reach for.
          </p>
        </div>

        <div className="about-grid">
          <div className="edu animate-on-scroll">
            {education.map((edu) => (
              <article key={edu.degree} className="edu__block">
                <div className="edu__head">
                  <h3 className="edu__degree">{edu.degree}</h3>
                  <span className="edu__gpa">{edu.gpa}</span>
                </div>
                <p className="edu__school">{edu.school}</p>
                <p className="edu__when">
                  {edu.date} · {edu.location}
                </p>
                <ul className="edu__ach">
                  {edu.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="edu__course">
                  {edu.coursework.join('  ·  ').toLowerCase()}
                </p>
              </article>
            ))}
          </div>

          <div className="skills animate-on-scroll">
            <p className="skills__label">the toolkit · what i build with</p>
            <div className="cloud">
              {skills.map((s, i) => (
                <span
                  key={s.name}
                  className={`cloud__word s${s.tier}`}
                  style={{ animationDelay: `${(i % 8) * 0.4}s` }}
                >
                  {s.name}
                </span>
              ))}
            </div>
            <p className="skills__legend">
              larger = reach for it daily · hover to highlight
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
