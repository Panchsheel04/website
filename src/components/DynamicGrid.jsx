import React, { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'corporate-gifting',
    label: 'Corporate Gifting',
    headline: 'Premium bedding gifts that make an impression',
    description:
      'Curated bedsheet sets and linen hampers for employee rewards, festive giveaways, and client appreciation - finished with gift packaging.',
    points: ['Custom branding & packaging', 'Festive & welcome kits', 'Pan-India dispatch'],
  },
  {
    id: 'bulk-orders',
    label: 'Bulk Orders',
    headline: 'Wholesale quantities, consistent quality',
    description:
      'Large-volume production at competitive rates for resellers, institutions, and events, with dependable lead times and the same finish across every run.',
    points: ['Competitive wholesale pricing', 'Reliable lead times', 'Consistent quality at scale'],
  },
  {
    id: 'hotel-linen',
    label: 'Hotel Linen Supply',
    headline: 'Hospitality-grade linen built to last',
    description:
      'Durable, premium-feel bedsheets, duvets, and towels engineered for repeated hospitality laundering, with sizes and thread counts tailored to your property.',
    points: ['Industrial-wash durable', 'Property-specific sizing', 'Crisp, premium finish'],
  },
  {
    id: 'hospital-linen',
    label: 'Hospital Linen Supply',
    headline: 'Hygienic linen for healthcare settings',
    description:
      'High-durability bedsheets, pillow covers, and patient wear that withstand repeated industrial sterilisation while staying soft and comfortable for patients.',
    points: ['Withstands repeated sterilisation', 'Soft, patient-friendly fabric', 'Bulk healthcare supply'],
  },
  {
    id: 'customized-sizes',
    label: 'Customized Sizes',
    headline: 'Made to fit any bed, exactly',
    description:
      'Bespoke bedding for non-standard mattresses, custom beds, and special requirements - share your dimensions and we will craft it to measure.',
    points: ['Any custom dimension', 'Non-standard mattresses', 'Tailored to your brief'],
  },
  {
    id: 'retail-b2b',
    label: 'Retail & B2B Supply',
    headline: 'Stock your store or supply your business',
    description:
      'Our full catalog available for retailers and businesses with flexible minimum orders, dealer pricing, and ongoing replenishment you can rely on.',
    points: ['Flexible minimum orders', 'Dealer & B2B pricing', 'Ongoing replenishment'],
  },
  {
    id: 'bedding-accessories',
    label: 'Bedding Accessories',
    headline: 'Complete the look',
    description:
      'Round out every set with pillows, cushion covers, bed runners, dohars, and much more - coordinated to complement our bedsheet designs.',
    points: ['Pillows & cushion covers', 'Bed runners & dohars', 'Coordinated designs'],
  },
];

export default function DynamicGrid() {
  const [activeId, setActiveId] = useState(services[0].id);
  const tabRefs = useRef({});

  const activeService = services.find((service) => service.id === activeId) || services[0];

  const handleTabKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }

    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + direction + services.length) % services.length;
    const next = services[nextIndex];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <section id="services" className="dynamic-section services-section">
      <p className="section-eyebrow">What We Offer</p>
      <h2 className="section-title">Catalog & Supply Options</h2>
      <p className="services-subtitle">
        From single custom sizes to large institutional supply - choose what fits your need.
      </p>

      <div className="services-tabs" role="tablist" aria-label="Catalog and supply options">
        {services.map((service, index) => (
          <button
            key={service.id}
            id={`service-tab-${service.id}`}
            ref={(element) => {
              tabRefs.current[service.id] = element;
            }}
            className={`service-tab ${activeId === service.id ? 'active' : ''}`}
            onClick={() => setActiveId(service.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            role="tab"
            aria-selected={activeId === service.id}
            aria-controls="service-panel"
            tabIndex={activeId === service.id ? 0 : -1}
          >
            {service.label}
          </button>
        ))}
      </div>

      <div
        className="services-panel"
        role="tabpanel"
        id="service-panel"
        aria-labelledby={`service-tab-${activeService.id}`}
      >
        <h3 className="service-headline">{activeService.headline}</h3>
        <p className="service-description">{activeService.description}</p>
        <ul className="service-points">
          {activeService.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <a href="#contact" className="showcase-link service-cta">
          Enquire about {activeService.label} <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
