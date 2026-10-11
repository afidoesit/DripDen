import React, { useState, useEffect } from 'react';
import { X, Search, Store, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { dbService } from '../services/db';

export const SearchModal = ({ isOpen, onClose, onSelectProduct, onSelectShop }) => {
  const [query, setQuery] = useState('');
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [matchingShops, setMatchingShops] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setRecentSearches(dbService.getRecentSearches());
      setQuery('');
      setMatchingProducts([]);
      setMatchingShops([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setMatchingProducts([]);
      setMatchingShops([]);
      return;
    }

    const timer = setTimeout(async () => {
      const prods = await dbService.getProducts({ search: query });
      const shops = await dbService.getShops({ search: query });
      setMatchingProducts(prods.slice(0, 5));
      setMatchingShops(shops.slice(0, 3));
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectRecent = (term) => {
    setQuery(term);
  };

  const handleProductClick = (product) => {
    dbService.addRecentSearch(query || product.name);
    onClose();
    onSelectProduct(product);
  };

  const handleShopClick = (shopId) => {
    dbService.addRecentSearch(query || 'Local Shop');
    onClose();
    onSelectShop(shopId);
  };

  const POPULAR_SEARCHES = [
    'Oversized Hoodie',
    'Kochi Street Dept',
    'Retro Sneakers',
    'Parachute Cargos',
    'Thrissur Linen',
    'Baby Tee',
    'SM Street'
  ];

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200, alignItems: 'flex-start', paddingTop: '5vh' }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '680px', 
          width: '95%',
          maxHeight: '85vh',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-light)',
          background: '#FFFFFF'
        }}>
          <Search size={22} color="var(--primary-purple)" />
          <input
            type="text"
            placeholder="Search clothes, accessories, Kerala shops, or districts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              fontFamily: 'var(--font-heading)',
              color: 'var(--deep-black)',
              background: 'transparent'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--warm-off-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem'
              }}
            >
              ✕
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--warm-off-white)',
              fontSize: '0.82rem',
              fontWeight: '700'
            }}
          >
            Esc
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.25rem 1.5rem', maxHeight: '65vh', overflowY: 'auto' }}>
          
          {/* Default Suggestions & Recents when Query is Empty */}
          {!query.trim() && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--muted-text)', marginBottom: '0.65rem' }}>
                    Recent Searches
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectRecent(term)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.4rem 0.85rem',
                          borderRadius: 'var(--radius-pill)',
                          background: 'var(--warm-off-white)',
                          fontSize: '0.82rem',
                          fontWeight: '600',
                          color: 'var(--deep-black)',
                          border: '1px solid var(--border-light)'
                        }}
                      >
                        <Clock size={13} color="var(--muted-text)" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--muted-text)', marginBottom: '0.65rem' }}>
                  Popular in Kerala
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {POPULAR_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectRecent(term)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.45rem 0.9rem',
                        borderRadius: 'var(--radius-pill)',
                        background: '#FFFFFF',
                        border: '1px solid var(--border-medium)',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        color: 'var(--deep-black)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <Sparkles size={13} color="var(--primary-purple)" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results: Live Matching */}
          {query.trim() && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Matching Shops */}
              {matchingShops.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--muted-text)', marginBottom: '0.65rem' }}>
                    Local Kerala Stores
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {matchingShops.map((shop) => (
                      <div
                        key={shop.id}
                        onClick={() => handleShopClick(shop.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--warm-off-white)',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={shop.logo}
                            alt={shop.name}
                            style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{shop.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                              {shop.locality} • {shop.rating} ★
                            </div>
                          </div>
                        </div>
                        <span className="drip-badge badge-purple-subtle" style={{ fontSize: '0.68rem' }}>
                          Visit Boutique
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Products */}
              {matchingProducts.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--muted-text)', marginBottom: '0.65rem' }}>
                    Fashion Drops ({matchingProducts.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleProductClick(p)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          background: '#FFFFFF',
                          border: '1px solid var(--border-light)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            style={{ width: '44px', height: '52px', borderRadius: '6px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700' }}>{p.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                              {p.shopName} • <span style={{ textTransform: 'capitalize' }}>{p.district}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                            ₹{p.price.toLocaleString('en-IN')}
                          </div>
                          {p.originalPrice && (
                            <div style={{ fontSize: '0.72rem', color: 'var(--light-muted)', textDecoration: 'line-through' }}>
                              ₹{p.originalPrice.toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingProducts.length === 0 && matchingShops.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--muted-text)' }}>
                  <p>No products or shops found matching "{query}"</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
