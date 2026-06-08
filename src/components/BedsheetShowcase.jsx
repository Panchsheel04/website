import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { showcaseCategories } from '../data/bedsheets';

function BedsheetImage({ sheet, large = false }) {
  return (
    <div className={`showcase-image-frame ${large ? 'showcase-image-frame-large' : ''}`}>
      <img
        src={large ? sheet.image : sheet.thumb}
        alt={`${sheet.name} design`}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
      />
      <div className="image-number-badge">Design {String(sheet.id).padStart(2, '0')}</div>
    </div>
  );
}

export default function BedsheetShowcase() {
  const [activeCategoryId, setActiveCategoryId] = useState(showcaseCategories[0].id);
  const [activeItemId, setActiveItemId] = useState(showcaseCategories[0].items[0].id);
  const tabRefs = useRef({});

  const activeCategory = useMemo(
    () => showcaseCategories.find((category) => category.id === activeCategoryId) || showcaseCategories[0],
    [activeCategoryId],
  );

  const activeSheet = useMemo(
    () => activeCategory.items.find((item) => item.id === activeItemId) || activeCategory.items[0],
    [activeCategory, activeItemId],
  );

  const selectCategory = (categoryId) => {
    const category = showcaseCategories.find((entry) => entry.id === categoryId) || showcaseCategories[0];
    setActiveCategoryId(category.id);
    setActiveItemId(category.items[0].id);
  };

  const handleTabKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }

    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + direction + showcaseCategories.length) % showcaseCategories.length;
    const next = showcaseCategories[nextIndex];
    selectCategory(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <section id="showcase" className="bedsheet-showcase">
      <div className="showcase-intro">
        <h2 className="section-title showcase-title">Showcase</h2>
        <p className="showcase-subtitle">A curated look at our signature designs. Tap any to view up close.</p>
      </div>

      <div className="showcase-tabs" role="tablist" aria-label="Product categories">
        {showcaseCategories.map((category, index) => (
          <button
            key={category.id}
            id={`showcase-tab-${category.id}`}
            ref={(element) => {
              tabRefs.current[category.id] = element;
            }}
            className={`showcase-tab ${activeCategoryId === category.id ? 'active' : ''}`}
            onClick={() => selectCategory(category.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            role="tab"
            aria-selected={activeCategoryId === category.id}
            aria-controls="showcase-panel"
            tabIndex={activeCategoryId === category.id ? 0 : -1}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div
        className="showcase-panel"
        role="tabpanel"
        id="showcase-panel"
        aria-labelledby={`showcase-tab-${activeCategory.id}`}
      >
        <div className="lookbook-layout">
          <div className="lookbook-feature">
            <BedsheetImage sheet={activeSheet} large />
            <div className="lookbook-panel">
              <h3>{activeSheet.name}</h3>
              <a href="#contact" className="showcase-link">Ask about this design <ArrowRight size={16} /></a>
            </div>
          </div>

          <div className="lookbook-grid">
            {activeCategory.items.map((sheet) => (
              <button
                key={sheet.id}
                className={`lookbook-card ${activeItemId === sheet.id ? 'active' : ''}`}
                onClick={() => setActiveItemId(sheet.id)}
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
