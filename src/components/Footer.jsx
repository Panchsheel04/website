import React, { useEffect, useRef, useState } from 'react';
import { Camera, Home, Mail, MessageCircle, Phone } from 'lucide-react';
import { contactLinks } from '../data/contact';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Footer() {
  const footerRef = useRef(null);
  // Start revealed when reduced motion is preferred, so there's no animation.
  const [revealed, setRevealed] = useState(prefersReducedMotion);

  // Reveal the contact text and buttons with a staggered "appear" as it scrolls in.
  useEffect(() => {
    const footer = footerRef.current;

    if (!footer || prefersReducedMotion()) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" className={`footer ${revealed ? 'is-revealed' : ''}`} ref={footerRef}>
      <div className="footer-left">
        <h4 className="footer-brand">Panchsheel</h4>
        <h2 className="footer-destination">Your Ultimate Bedding<br/>Destination</h2>
      </div>
      <div className="footer-right">
        <div className="footer-connect">
          <h3>Contact Us</h3>
          <div className="contact-options footer-contact-options">
            <a href={contactLinks.instagram} target="_blank" rel="noreferrer"><Camera size={18} /> Instagram</a>
            <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
            <a href={contactLinks.email}><Mail size={18} /> Email</a>
            <a href={contactLinks.phone}><Phone size={18} /> Phone</a>
            <a href={contactLinks.maps} target="_blank" rel="noreferrer"><Home size={18} /> Address</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
