import React, { useState, useEffect } from 'react';
import { ArrowRight, Store, ChevronDown } from 'lucide-react';

export const Hero = ({ onShopNow, onExploreShops }) => {
  const fullText = "Find Your Drip";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const timer = setInterval(() => {
      index++;
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
      } else {
        clearInterval(timer);
      }
    }, 85);

    return () => clearInterval(timer);
  }, []);

  const renderTypedHeadline = () => {
    const lastSpaceIndex = displayedText.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) {
      const leadingText = displayedText.slice(0, lastSpaceIndex + 1);
      const lastWord = displayedText.slice(lastSpaceIndex + 1);
      return (
        <>
          <span>{leadingText}</span>
          <span style={{ whiteSpace: 'nowrap' }}>
            {lastWord}
            <span className="hero-caret-dot" aria-hidden="true">.</span>
          </span>
        </>
      );
    }
    return (
      <span style={{ whiteSpace: 'nowrap' }}>
        {displayedText}
        <span className="hero-caret-dot" aria-hidden="true">.</span>
      </span>
    );
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('categories-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <section style={{
      minHeight: 'calc(100vh - var(--header-height, 72px))',
      minHeight: 'calc(100svh - var(--header-height, 72px))',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2.5rem 1rem 4rem',
      backgroundColor: 'transparent',
      background: 'transparent'
    }}>
      {/* Main Center Content */}
      <div className="container hero-center-container" style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '1140px',
        margin: '0 auto',
        paddingTop: 'clamp(2.5rem, 8vh, 4.5rem)'
      }}>

        {/* Main Headline */}
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(4.2rem, 13.5vw, 10.5rem)',
          lineHeight: 0.92,
          letterSpacing: '0.02em',
          color: '#000000',
          marginBottom: '0.45rem',
          textAlign: 'center',
          userSelect: 'none',
          width: '100%'
        }}>
          {renderTypedHeadline()}
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(1.15rem, 2.6vw, 1.6rem)',
          letterSpacing: '0.04em',
          color: '#222222',
          marginBottom: '2rem',
          lineHeight: 1.3,
          maxWidth: '680px'
        }}>
          Connect directly with independent clothing boutiques, sneaker lounges, and curated thrift shops near you.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2.75rem'
        }}>
          <button
            className="btn-primary"
            onClick={onShopNow}
            style={{
              padding: '1.1rem 2.6rem',
              fontSize: '1rem',
              fontWeight: '700',
              letterSpacing: '0.03em',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 8px 24px rgba(168, 92, 255, 0.28)'
            }}
          >
            <span>SHOP NOW</span>
            <ArrowRight size={18} />
          </button>

          <button
            className="btn-secondary"
            onClick={onExploreShops}
            style={{
              padding: '1.1rem 2rem',
              fontSize: '0.94rem',
              fontWeight: '700',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-medium)'
            }}
          >
            <Store size={18} color="var(--primary-purple)" />
            <span>Browse Shops</span>
          </button>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          padding: '1.1rem 2.4rem',
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(14, 14, 14, 0.08)',
          borderRadius: 'var(--radius-pill)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>14</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Districts</div>
          </div>
          <div style={{ width: '1px', height: '26px', background: 'var(--border-medium)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>50+</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Boutiques</div>
          </div>
          <div style={{ width: '1px', height: '26px', background: 'var(--border-medium)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>24-48h</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Express Delivery</div>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="hero-scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          background: 'none',
          border: 'none',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem',
          color: 'var(--light-muted)',
          transition: 'all 0.2s ease',
          userSelect: 'none'
        }}
        aria-label="Scroll to explore drops"
      >
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
          Scroll to Explore
        </span>
        <ChevronDown size={18} className="bounce-animation" />
      </button>

    </section>
  );
};
