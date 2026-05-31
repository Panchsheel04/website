import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return undefined;
    }

    const setHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    };

    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
    const observer = new ResizeObserver(setHeaderHeight);
    observer.observe(header);
    document.fonts?.ready.then(setHeaderHeight);

    return () => {
      window.removeEventListener('resize', setHeaderHeight);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 130;
      const pageBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 24;

      if (pageBottom) {
        setActiveSection('contact');
        return;
      }

      const currentSection = sections
        .filter((section) => section.offsetTop <= scrollPosition)
        .at(-1);

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const closeOnDesktop = () => {
      if (window.matchMedia('(min-width: 769px)').matches) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', closeOnDesktop);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  const handleHomeClick = (event) => {
    event.preventDefault();
    setActiveSection('home');
    setMenuOpen(false);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <header className={`header ${menuOpen ? 'menu-open' : ''}`} ref={headerRef}>
      <div className="logo-container">
        <a href="#home" aria-label="Panchsheel home" onClick={handleHomeClick}>
          <img src="/logo.jpeg" alt="Panchsheel Logo" />
        </a>
      </div>

      <button
        type="button"
        className="nav-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-nav"
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      <nav id="primary-nav" className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
            onClick={item.id === 'home' ? handleHomeClick : () => handleNavClick(item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
