import React from 'react';
import { Store, ShieldCheck, Heart, MapPin, Mail, Phone } from 'lucide-react';
import { useDistrict } from '../context/DistrictContext';

export const Footer = ({ onNavigateExplore, onNavigateShops }) => {
  const { setIsSelectorOpen } = useDistrict();

  return (
    <footer style={{
      backgroundColor: 'var(--deep-black)',
      color: '#FFFFFF',
      padding: '4.5rem 0 6rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container">
        
        {/* Top Shop Registration Banner - Compact & Responsive */}
        <div className="boutique-owner-banner">
          <div className="boutique-owner-info">
            <span className="drip-badge badge-mint boutique-badge">
              FUTURE EXPANSION • SHOP OWNER PORTAL
            </span>
            <h3 className="boutique-title">
              Are you a Kerala Fashion Boutique Owner?
            </h3>
            <p className="boutique-desc">
              List your clothing store on DripDen. Reach tens of thousands of fashion-forward Gen-Z shoppers across Kerala with local delivery and automated inventory management.
            </p>
          </div>

          <button
            onClick={() => alert('DripDen Shop Owner App is launching in Phase 2. Pre-registrations for Kerala boutiques are currently open via hello@dripden.in!')}
            className="btn-primary boutique-btn"
          >
            <Store size={15} />
            <span>Pre-Register Boutique</span>
          </button>
        </div>

        {/* Main Footer Links Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          
          {/* Brand Info */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <img
                src="/dripden_logo_white.png"
                alt="DRIPDEN"
                style={{ height: '26px', width: 'auto', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline-block';
                }}
              />
              <span style={{ display: 'none', fontFamily: 'var(--font-heading)', fontWeight: '900', fontSize: '1.6rem', color: '#FFFFFF' }}>
                DRIPDEN<span style={{ color: 'var(--primary-purple)' }}>.</span>
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#A3A3A3', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Kerala's official fashion marketplace connecting conscious shoppers with authentic local boutiques, skate labels, and thrift curators across all 14 districts.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                {/* Instagram icon inline SVG */}
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="mailto:contact@dripden.in"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: '#A3A3A3' }}>
              <li>
                <button onClick={onNavigateExplore} style={{ color: '#A3A3A3' }}>
                  Latest Drops & Clothes
                </button>
              </li>
              <li>
                <button onClick={onNavigateShops} style={{ color: '#A3A3A3' }}>
                  Discover Local Boutiques
                </button>
              </li>
              <li>
                <button onClick={() => setIsSelectorOpen(true)} style={{ color: '#A3A3A3' }}>
                  Kerala 14 Districts
                </button>
              </li>
              <li>
                <span style={{ color: 'var(--accent-mint)' }}>Express Delivery in 24-48h</span>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: '#A3A3A3' }}>
              <li>Men's Heavyweight Tees</li>
              <li>Parachute & Utility Cargos</li>
              <li>Curated Vintage Thrift</li>
              <li>Sneaker Lounges</li>
              <li>Artisanal Kerala Fusion</li>
            </ul>
          </div>

          {/* Brand Palette Swatches */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              Official Identity
            </h4>
            <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: '0.75rem' }}>
              DripDen Design System Tokens
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#A85CFF' }} title="Primary Purple (#A85CFF)" />
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FF7DDC' }} title="Accent Pink (#FF7DDC)" />
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#4C7BFF' }} title="Secondary Blue (#4C7BFF)" />
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#6FFFC7' }} title="Accent Mint (#6FFFC7)" />
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#F5F3EF' }} title="Warm Off-white (#F5F3EF)" />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#777' }}>
              Font: Sora & Plus Jakarta Sans
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#777'
        }}>
          <div>
            © 2026 DripDen™ Marketplace. Made for Kerala. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Boutique Guidelines</span>
          </div>
        </div>

        <style>{`
          .boutique-owner-banner {
            background: linear-gradient(135deg, #18181A 0%, #251433 100%);
            border-radius: var(--radius-lg);
            padding: 1.25rem 1.6rem;
            border: 1px solid rgba(168, 92, 255, 0.28);
            margin-bottom: 2.25rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justifyContent: space-between;
            gap: 1.2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          }
          .boutique-owner-info {
            max-width: 540px;
          }
          .boutique-badge {
            font-size: 0.65rem !important;
            padding: 0.2rem 0.55rem !important;
            margin-bottom: 0.35rem !important;
          }
          .boutique-title {
            font-size: 1.15rem !important;
            font-weight: 800 !important;
            color: #FFFFFF !important;
            margin-bottom: 0.25rem !important;
            line-height: 1.3 !important;
          }
          .boutique-desc {
            font-size: 0.8rem !important;
            color: rgba(255, 255, 255, 0.72) !important;
            line-height: 1.4 !important;
            margin: 0 !important;
          }
          .boutique-btn {
            padding: 0.55rem 1.25rem !important;
            font-size: 0.82rem !important;
            border-radius: var(--radius-pill) !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }

          @media (max-width: 860px) {
            .boutique-owner-banner {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </footer>
  );
};
