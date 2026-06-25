import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PAGES, PAGE_LABELS, type PageKey } from '../../routes';
import { Logo } from './Logo';

type Props = {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
};

/**
 * State-driven nav (no react-router). Six destinations matching eciv:
 * Home / Frontiers / Schedule / Research / Registration / Team.
 * Mobile collapses into a vertical drawer.
 */
export function Nav({ currentPage, onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  // Auto-close drawer on page change.
  useEffect(() => { setOpen(false); }, [currentPage]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
        className="fixed top-0 inset-x-0 z-40 bg-black/30 backdrop-blur-md border-b border-white/5"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-4 md:py-5 flex items-center justify-between gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
            aria-label="Quantum Qubit home"
          >
            <Logo className="w-9 h-9" />
            <span className="qq-display text-white text-base md:text-lg group-hover:text-[color:var(--color-cyan)] transition-colors">
              Quantum<span className="text-[color:var(--color-cyan)]">Qubit</span>
            </span>
          </button>

          <ul className="hidden md:flex items-center gap-7">
            {PAGES.filter((p) => p !== 'home').map((p) => {
              const active = currentPage === p;
              return (
                <li key={p}>
                  <button
                    onClick={() => onNavigate(p)}
                    className={`text-[10px] md:text-[11px] font-[var(--font-mono)] uppercase transition-colors ${
                      active ? 'text-[color:var(--color-cyan)]' : 'text-white/45 hover:text-white'
                    }`}
                    style={{ letterSpacing: '0.28em' }}
                  >
                    {PAGE_LABELS[p]}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => onNavigate('registration')}
            className="hidden md:inline text-[10px] md:text-[11px] font-[var(--font-mono)] uppercase text-white/55 hover:text-[color:var(--color-cyan)] transition-colors"
            style={{ letterSpacing: '0.32em' }}
          >
            Register →
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden relative w-7 h-7 grid place-items-center"
          >
            <span
              className={`absolute h-px w-4 bg-white/70 transition-transform ${open ? 'rotate-45' : '-translate-y-1'}`}
            />
            <span
              className={`absolute h-px w-4 bg-white/70 transition-transform ${open ? '-rotate-45' : 'translate-y-1'}`}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-30 bg-black/90 backdrop-blur-sm pt-20"
          >
            <ul className="flex flex-col items-center gap-5 px-6">
              {PAGES.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <button
                    onClick={() => onNavigate(p)}
                    className={`font-[var(--font-display)] font-light uppercase text-2xl transition-colors ${
                      currentPage === p ? 'text-[color:var(--color-cyan)]' : 'text-white/85 hover:text-[color:var(--color-cyan)]'
                    }`}
                    style={{ letterSpacing: '0.18em' }}
                  >
                    {PAGE_LABELS[p]}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
