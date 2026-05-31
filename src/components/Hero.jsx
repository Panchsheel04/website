import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const layers = parallaxRef.current?.querySelectorAll('.hero-parallax-layer');

    if (!layers?.length) {
      return undefined;
    }

    let ticking = false;

    const updateParallax = () => {
      const heroHeight = parallaxRef.current?.offsetHeight || window.innerHeight;
      const y = Math.min(window.scrollY, heroHeight);

      layers.forEach((layer, index) => {
        const depth = Number(layer.dataset.depth || index * 0.08);
        layer.style.transform = `translate3d(0, ${y * depth}px, 0) scale(${1 + depth * 0.18})`;
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    updateParallax();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero" ref={parallaxRef}>
      <div className="hero-parallax" aria-hidden="true">
        <div className="hero-parallax-layer hero-layer-image" data-depth="0.16" />
        <div className="hero-parallax-layer hero-layer-aqua" data-depth="0.08" />
        <div className="hero-parallax-layer hero-layer-warmth" data-depth="0.04" />
      </div>
      <div className="hero-content">
        <h1 className="hero-title"><span>Luxury Linens for You</span></h1>
        <p className="hero-subtitle">Transform your room with our premium bedding</p>
        <a href="#showcase" className="hero-button">View Collection</a>
      </div>
    </section>
  );
}
