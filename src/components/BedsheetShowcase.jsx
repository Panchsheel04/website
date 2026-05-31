import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { bedsheets } from '../data/bedsheets';

function BedsheetImage({ sheet, large = false }) {
  return (
    <div className={`showcase-image-frame ${large ? 'showcase-image-frame-large' : ''}`}>
      <img
        src={large ? sheet.image : sheet.thumb}
        alt={`${sheet.name} bedsheet`}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
      />
      <div className="image-number-badge">Design {String(sheet.id).padStart(2, '0')}</div>
    </div>
  );
}

export default function BedsheetShowcase() {
  const [activeSheetId, setActiveSheetId] = useState(1);

  const activeSheet = useMemo(
    () => bedsheets.find((sheet) => sheet.id === activeSheetId) || bedsheets[0],
    [activeSheetId],
  );

  return (
    <section id="showcase" className="bedsheet-showcase">
      <div className="showcase-intro">
        <h2 className="section-title showcase-title">Showcase</h2>
        <p className="showcase-subtitle">A curated look at our signature designs. Tap any to view up close.</p>
      </div>

      <div className="showcase-panel">
        <div className="lookbook-layout">
          <div className="lookbook-feature">
            <BedsheetImage sheet={activeSheet} large />
            <div className="lookbook-panel">
              <h3>{activeSheet.name}</h3>
              <a href="#contact" className="showcase-link">Ask about this design <ArrowRight size={16} /></a>
            </div>
          </div>

          <div className="lookbook-grid">
            {bedsheets.map((sheet) => (
              <button
                key={sheet.id}
                className={`lookbook-card ${activeSheetId === sheet.id ? 'active' : ''}`}
                onClick={() => setActiveSheetId(sheet.id)}
              >
                <BedsheetImage sheet={sheet} />
                <div>
                  <h3>{sheet.name}</h3>
                  <p>{sheet.motif}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
