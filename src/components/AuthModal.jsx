import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { KERALA_DISTRICTS } from '../data/keralaDistricts';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authView, setAuthView, login, signup, demoLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('ernakulam');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authView === 'login') {
        await login(email, password);
      } else {
        await signup(name, email, password, phone, district);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)} style={{ zIndex: 1250 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '480px', 
          width: '95%',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>
              {authView === 'login' ? 'Sign in to DripDen' : 'Create Customer Account'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '0.2rem' }}>
              {authView === 'login' 
                ? 'Access your orders, saved addresses, and Kerala boutique drops.' 
                : 'Join Kerala\'s premier Gen-Z fashion shopping platform.'}
            </p>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--warm-off-white)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Demo Fast Login Banner */}
        <div style={{
          padding: '0.75rem 0.95rem',
          background: 'var(--warm-off-white)',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--deep-black)' }}>
              Quick Demo Customer
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted-text)' }}>
              Instant login as Fahad K. (Kochi)
            </div>
          </div>
          <button
            type="button"
            onClick={demoLogin}
            className="btn-primary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.72rem', borderRadius: 'var(--radius-xs)', textTransform: 'uppercase' }}
          >
            Demo Login
          </button>
        </div>

        {error && (
          <div style={{
            padding: '0.65rem 0.95rem',
            background: '#ffe3e3',
            color: '#c92a2a',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.82rem',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {authView === 'signup' && (
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                Full Name *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.95rem 0.7rem 2.4rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.88rem'
                  }}
                />
                <User size={16} color="var(--muted-text)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
              Email Address *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="name@dripden.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.95rem 0.7rem 2.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.88rem'
                }}
              />
              <Mail size={16} color="var(--muted-text)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.95rem 0.7rem 2.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.88rem'
                }}
              />
              <Lock size={16} color="var(--muted-text)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {authView === 'signup' && (
            <>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                  Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    placeholder="+91 98460 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.95rem 0.7rem 2.4rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-medium)',
                      fontSize: '0.88rem'
                    }}
                  />
                  <Phone size={16} color="var(--muted-text)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', display: 'block', marginBottom: '0.25rem' }}>
                  Primary District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.95rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    fontSize: '0.88rem',
                    background: '#FFFFFF'
                  }}
                >
                  {KERALA_DISTRICTS.filter(d => d.id !== 'all').map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-dark"
            style={{ width: '100%', height: '46px', marginTop: '0.5rem', borderRadius: 'var(--radius-xs)', letterSpacing: '0.02em', textTransform: 'uppercase' }}
          >
            {loading ? 'Please wait...' : authView === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* View Switcher */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.82rem', color: 'var(--muted-text)' }}>
          {authView === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthView('signup')}
                style={{ fontWeight: '700', color: 'var(--primary-purple)', textDecoration: 'underline' }}
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthView('login')}
                style={{ fontWeight: '700', color: 'var(--primary-purple)', textDecoration: 'underline' }}
              >
                Log In
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
