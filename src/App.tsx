import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from './components/hud/Nav';
import { ParticleRing } from './components/three/ParticleRing';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { FrontiersPreview } from './components/sections/FrontiersPreview';
import { BreatherSection, SchedulePreview, RulesSection, ClosingSection } from './components/sections/HomeExtras';
import { FrontiersSection } from './components/sections/FrontiersSection';
import { ScheduleSection } from './components/sections/ScheduleSection';
import { ResearchJournalSection } from './components/sections/ResearchJournalSection';
import { RegistrationSection } from './components/sections/RegistrationSection';
import { TeamSection } from './components/sections/TeamSection';
import { Footer } from './components/home/Footer';
import { LoadingScreen } from './components/three/LoadingScreen';
import type { PageKey } from './routes';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * Single-page state-driven app (matches the confluence site's model).
 * The particle sphere is mounted once behind every page; only the DOM
 * content swaps on navigation. Home is a long Borealis-style scroll.
 */
export function App() {
  const [page, setPage] = useState<PageKey>('home');
  const [loading, setLoading] = useState(true);

  const navigate = useCallback((p: PageKey) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    document.title =
      page === 'home'
        ? 'Quantum Qubit · Chapter 2'
        : `Quantum Qubit · ${page[0].toUpperCase()}${page.slice(1)}`;
  }, [page]);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      {/* Mount the sphere only after the loader finishes, so the loader's
          WebGL canvas and the sphere's never contend for a context. The
          sphere freezes (no render loop) on non-home pages to kill lag. */}
      {!loading && <ParticleRing active={page === 'home'} />}

      {/* ADD THIS: Blurred overlay for the homepage background */}
      {page === 'home' && (
        <div aria-hidden className="fixed inset-0 -z-[5] backdrop-blur-[4px] pointer-events-none" />
      )}
      
      <Nav currentPage={page} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen"
        >
          {page === 'home' && (
            <>
              <HeroSection onNavigate={navigate} />
              <AboutSection />
              <FrontiersPreview onNavigate={navigate} />
              <BreatherSection />
              <SchedulePreview onNavigate={navigate} />
              <RulesSection />
              <ClosingSection onNavigate={navigate} />
            </>
          )}
          {page === 'frontiers'    && <FrontiersSection />}
          {page === 'schedule'     && <ScheduleSection />}
          {page === 'research'     && <ResearchJournalSection />}
          {page === 'registration' && <RegistrationSection />}
          {page === 'team'         && <TeamSection />}
          <Footer onNavigate={navigate} />
        </motion.main>
      </AnimatePresence>
    </>
  );
}
