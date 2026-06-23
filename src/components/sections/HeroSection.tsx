import { motion } from 'framer-motion';
import { ceremonies, registration, host } from '../../data/general-rules';
import { CountdownTimer } from './CountdownTimer';
import { Logo } from '../hud/Logo';
import type { PageKey } from '../../routes';

type Props = { onNavigate: (page: PageKey) => void };

const FEATURE_PILLS = [
  'Schools', // Changed from Research Journal
  'Interactive Exhibitions',
  'Tech Competitions',
  'Innovation Showcase',
];

/**
 * Landing hero. Centered, with a dark radial scrim so the bold Inter
 * wordmark stays crisply readable over the particle sphere. Logo +
 * wordmark + feature pills + two CTAs + countdown, matching the
 * confluence site's hero structure but in the Borealis dark aesthetic.
 */
export function HeroSection({ onNavigate }: Props) {
  return (
    <header
      data-snap-section=""
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      <div className="qq-scrim-center" />

      <div className="relative z-[2] flex flex-col items-center w-full max-w-4xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <Logo className="w-16 h-16 md:w-20 md:h-20" />
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="qq-label mb-6"
        >
          Chapter 02 · Science &amp; Technology Confluence
        </motion.div>

        {/* Wordmark — bold Inter, legible */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="qq-display text-white"
          style={{ fontSize: 'clamp(2.4rem, 10vw, 6.5rem)' }}
        >
          Quantum<span className="text-[color:var(--color-cyan)]"> Qubit</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.36 }}
          className="qq-display text-white/80 mt-4"
          style={{ fontSize: 'clamp(1rem, 3.5vw, 1.8rem)', letterSpacing: '0.02em' }}
        >
          Futuristic Today
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48 }}
          className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 max-w-2xl"
        >
          {FEATURE_PILLS.map((p) => (
            <span key={p} className="qq-label text-white/55 whitespace-nowrap">
              · {p}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.58 }}
          className="mt-9 flex flex-wrap gap-3 md:gap-4 justify-center"
        >
          <button onClick={() => onNavigate('frontiers')} className="qq-btn qq-btn-primary group">
            View Frontiers
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
          <button onClick={() => onNavigate('schedule')} className="qq-btn qq-btn-ghost group">
            View Schedule
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 md:mt-14"
        >
          <div className="qq-label text-white/45 mb-4">Registration opens in</div>
          <CountdownTimer />
        </motion.div>
      </div>

      {/* HUD corner readouts */}
      <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 qq-label text-white/35 z-[2]">
        {ceremonies.opening} → {ceremonies.closing}
      </div>
      <div className="absolute right-6 bottom-6 md:right-10 md:bottom-10 qq-label text-white/35 text-right z-[2]">
        {host.name.split(',')[0]} · Reg {registration.windowOpens}
      </div>
    </header>
  );
}
