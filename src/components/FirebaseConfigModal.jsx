import React, { useState } from 'react';
import { X, ShieldCheck, Database, KeyRound, Check } from 'lucide-react';
import { saveCustomFirebaseConfig, isFirebaseConfigured } from '../services/firebase';

export const FirebaseConfigModal = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('dripden_firebase_config');
      return saved ? JSON.parse(saved) : {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: ''
      };
    } catch {
      return { apiKey: '', authDomain: '', projectId: '', storageBucket: '', messagingSenderId: '', appId: '' };
    }
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setConfig(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveCustomFirebaseConfig(config);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1350 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          maxWidth: '560px', 
          width: '95%',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={22} color="var(--primary-purple)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Firebase Cloud Settings</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--warm-off-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: isFirebaseConfigured() ? 'var(--accent-mint-soft)' : 'var(--warm-off-white)',
          border: '1px solid var(--border-medium)',
          marginBottom: '1.25rem',
          fontSize: '0.82rem',
          color: isFirebaseConfigured() ? '#064e3b' : 'var(--muted-text)'
        }}>
          {isFirebaseConfigured() ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700' }}>
              <ShieldCheck size={16} />
              <span>Firebase is currently connected and active.</span>
            </div>
          ) : (
            <div>
              <strong>Reactive Local-First Engine Active:</strong> Full orders, stocks, auth, and persistence work seamlessly out of the box. Enter your Firebase project keys below to connect directly to live Google Cloud Firestore!
            </div>
          )}
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>
              API Key (apiKey)
            </label>
            <input
              type="text"
              name="apiKey"
              value={config.apiKey}
              onChange={handleChange}
              placeholder="AIzaSy..."
              style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-medium)', fontSize: '0.82rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>
                Project ID
              </label>
              <input
                type="text"
                name="projectId"
                value={config.projectId}
                onChange={handleChange}
                placeholder="dripden-firebase"
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-medium)', fontSize: '0.82rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>
                Auth Domain
              </label>
              <input
                type="text"
                name="authDomain"
                value={config.authDomain}
                onChange={handleChange}
                placeholder="dripden.firebaseapp.com"
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-medium)', fontSize: '0.82rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>
                Storage Bucket
              </label>
              <input
                type="text"
                name="storageBucket"
                value={config.storageBucket}
                onChange={handleChange}
                placeholder="dripden.appspot.com"
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-medium)', fontSize: '0.82rem' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>
                App ID
              </label>
              <input
                type="text"
                name="appId"
                value={config.appId}
                onChange={handleChange}
                placeholder="1:123456789:web:abcdef"
                style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-medium)', fontSize: '0.82rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: '600' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
            >
              <Check size={16} />
              <span>Save & Connect Firebase</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
