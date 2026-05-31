import React, { useEffect, useState } from 'react';
import { Camera, Home, Mail, MessageCircle, Phone } from 'lucide-react';
import { contactLinks } from '../data/contact';

export default function ChatWidget() {
  const [nearFooter, setNearFooter] = useState(false);

  // Hide the floating widget once the footer's own Contact Us section is on screen.
  useEffect(() => {
    const footer = document.getElementById('contact');

    if (!footer) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`chat-widget ${nearFooter ? 'chat-widget-hidden' : ''}`}>
      <button
        className="chat-button"
        type="button"
        aria-label="Contact options"
        onClick={(event) => event.currentTarget.blur()}
      >
        <MessageCircle size={24} />
        Contact Us
      </button>
      <div className="chat-options" aria-label="Contact Panchsheel">
        <a href={contactLinks.instagram} target="_blank" rel="noreferrer"><Camera size={18} /> Instagram</a>
        <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
        <a href={contactLinks.email}><Mail size={18} /> Email</a>
        <a href={contactLinks.phone}><Phone size={18} /> Phone</a>
        <a href={contactLinks.maps} target="_blank" rel="noreferrer"><Home size={18} /> Address</a>
      </div>
    </div>
  );
}
