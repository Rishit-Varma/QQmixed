import { useState } from 'react';
import { motion } from 'framer-motion';
import { events, type EventEntry } from '../../data/events';
import { EventModal } from '../event/EventModal';
import { SectionShell, SectionHeading } from './SectionShell';
import type { PageKey } from '../../routes';

type Props = { onNavigate: (page: PageKey) => void };

/**
 * Home-page frontiers showcase: the full 9-event list as tappable rows
 * that open the detail modal in place, plus a CTA to the full page.
 */
export function FrontiersPreview({ onNavigate }: Props) {
  const [active, setActive] = useState<EventEntry | null>(null);

  return (
    <SectionShell id="frontiers-preview" align="left">
      <SectionHeading index="02" badge="The Frontiers" line1="Eight frontiers." line2="Tap any to open the brief." />

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.05 }}
        variants={{ animate: { transition: { staggerChildren: 0.04 } } }}
        className="mt-10 border-t border-white/10"
      >
        {events.map((e) => (
          <motion.button
            key={e.slug}
            type="button"
            onClick={() => setActive(e)}
            variants={{
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
            }}
            whileHover={{ x: 4 }}
            className="group block w-full text-left py-6 md:py-7 border-b border-white/10 hover:border-[color:var(--color-cyan)]/40 transition-colors"
          >
            <div className="flex items-baseline gap-5 md:gap-8">
              <span className="qq-index w-8 shrink-0 group-hover:text-[color:var(--color-cyan)] transition-colors">
                /{e.index}
              </span>
              <div className="flex-1 min-w-0">
                <h3
                  className="qq-display text-white/85 group-hover:text-white transition-colors"
                  style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)' }}
                >
                  {e.name}
                </h3>
                <p className="qq-label text-white/35 mt-2">{e.classes} · {e.venue}</p>
              </div>
              <span className="hidden md:inline qq-label text-white/30 group-hover:text-[color:var(--color-cyan)] transition-colors">
                Read More →
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <button onClick={() => onNavigate('frontiers')} className="qq-btn qq-btn-ghost group mt-10">
        All frontiers
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </button>

      <EventModal event={active} onClose={() => setActive(null)} />
    </SectionShell>
  );
}