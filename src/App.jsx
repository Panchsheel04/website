import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BedsheetShowcase from './components/BedsheetShowcase';
import DynamicGrid from './components/DynamicGrid';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import './index.css';

function App() {
  useEffect(() => {
    // The hero is above the fold and must show immediately - only reveal-animate
    // the sections below it so there's no flash of invisible content on load.
    // #services is excluded: it overlaps the sticky hero, and fading the whole
    // section from opacity 0 would briefly reveal the hero behind it on scroll.
    const revealItems = document.querySelectorAll('main > section:not(#home):not(#services)');
    revealItems.forEach((item) => item.classList.add('scroll-reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      // Trigger when the section's top edge scrolls ~12% into the viewport.
      // A fractional threshold (e.g. 0.16) breaks for sections taller than the
      // viewport — 16% of a tall section never fits on screen at once, so it
      // would never reveal. rootMargin keys off viewport position instead.
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <BedsheetShowcase />
        <DynamicGrid />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}

export default App;
