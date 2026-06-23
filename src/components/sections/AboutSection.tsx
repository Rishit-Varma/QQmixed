import { motion } from 'framer-motion';
import { events } from '../../data/events';
import { about } from '../../data/site';
import { SectionShell, SectionHeading } from './SectionShell';

const STATS = [
  { value: events.length.toString().padStart(2, '0'), label: 'Frontiers' },
  { value: '30+', label: 'Schools' },
  { value: '01',  label: 'Day' },
  { value: '∞',   label: 'Innovation' },
];

const reveal = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

export function AboutSection() {
  return (
    <>
      {/* Manifesto + agenda */}
      <SectionShell id="about" align="left">
        <SectionHeading
          index="01"
          badge="About Quantum Qubit"
          line1="One day."
          line2="Eight frontiers, one confluence."
        />
        <motion.p
          {...reveal}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="qq-body text-[15px] md:text-base mt-8 max-w-2xl"
        >
          {about.tagline}
        </motion.p>
        <motion.p
          {...reveal}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="qq-body text-sm md:text-[15px] mt-6 max-w-2xl text-white/55"
        >
          {about.agenda}
        </motion.p>
      </SectionShell>

      {/* Stats + pillars */}
      <SectionShell align="left">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              {...reveal}
              transition={{ duration: 0.42, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`py-8 ${i > 0 ? 'md:border-l border-white/10 md:pl-6' : ''}`}
            >
              <div
                className="qq-display text-[color:var(--color-cyan)]"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}
              >
                {s.value}
              </div>
              <div className="qq-label text-white/45 mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="qq-label text-white/40 mt-16 mb-8">What makes this confluence special</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {about.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              {...reveal}
              transition={{ duration: 0.42, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="qq-glass-card p-6"
            >
              <div className="qq-index text-[color:var(--color-cyan)] mb-3">/ {(i + 1).toString().padStart(2, '0')}</div>
              <h3 className="qq-display text-white text-xl md:text-2xl mb-3">{p.title}</h3>
              <p className="qq-body text-sm">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
