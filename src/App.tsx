import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Core Components
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { CustomCursor } from './components/CustomCursor';
import { NoiseOverlay } from './components/NoiseOverlay';
import { ScrollProgressBar } from './components/ScrollProgressBar';

// Page Sections
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Ticker } from './components/Ticker';
import { SelectedWork } from './components/SelectedWork';
import { Capabilities } from './components/Capabilities';
import { Engagement } from './components/Engagement';
import { Archive } from './components/Archive';
import { Footer } from './components/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // We only initialize Lenis on desktop/larger devices to keep scroll behavior consistent
    let lenis: Lenis | null = null;

    // Simulate preloader completion after 2.0 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    if (window.innerWidth >= 900) {
      lenis = new Lenis({
        duration: 1.15,
        wheelMultiplier: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      // Synchronize scroll-progress values
      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    return () => {
      clearTimeout(timer);
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <>
      {/* 1. Global Fixed Overlays & Cursor */}
      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgressBar />

      {/* 2. Page Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* 3. Main Navigation Header */}
      <Header />

      {/* 4. Portfolio Sections Container */}
      <main className="w-full flex flex-col relative z-10 overflow-hidden mx-auto">
        <Hero />
        <Intro />
        <Ticker />
        <SelectedWork />
        <Capabilities />
        <Engagement />
        <Archive />
        <Footer />
      </main>
    </>
  );
}

export default App;
