import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ArrowLeft, MessageCircle, ShieldCheck, Clock, CheckCheck, Check, Image as ImageIcon } from 'lucide-react';

// ─── Mock conversation store (in-memory for demo) ─────────────────────────────
const mockConversations = {};

function getConvoKey(shopId) {
  return `chat_${shopId}`;
}

function loadMessages(shopId) {
  try {
    const stored = localStorage.getItem(getConvoKey(shopId));
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveMessages(shopId, messages) {
  try {
    localStorage.setItem(getConvoKey(shopId), JSON.stringify(messages));
  } catch {}
}

// Simulated shop auto-replies
const autoReplies = [
  "Hey! Thanks for reaching out 👋 How can I help you?",
  "Sure, I'd love to help! Can you share more details?",
  "We have that in stock! Would you like to check sizes?",
  "Great choice! That piece just dropped this week 🔥",
  "DM us your size and I'll confirm availability for you.",
  "We do custom orders too — let me know what you need!",
  "We're open from 10am to 9pm daily. Feel free to visit!",
  "Yes, we offer free delivery within the district for orders above ₹999.",
];

function getAutoReply() {
  return autoReplies[Math.floor(Math.random() * autoReplies.length)];
}

// ─── ChatWindow (Single Shop Conversation) ─────────────────────────────────────
const ChatWindow = ({ shop, onBack }) => {
  const [messages, setMessages] = useState(() => {
    const stored = loadMessages(shop.id);
    if (stored.length === 0) {
      // Welcome message from shop
      return [{
        id: 1,
        from: 'shop',
        text: `Hi there! Welcome to ${shop.name} 👋 Ask us anything about our drops, sizes, or delivery.`,
        time: new Date(Date.now() - 60000).toISOString(),
        status: 'read'
      }];
    }
    return stored;
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    saveMessages(shop.id, messages);
  }, [messages, shop.id]);

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;

    const newMsg = {
      id: Date.now(),
      from: 'user',
      text,
      time: new Date().toISOString(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    inputRef.current?.focus();

    // Simulate "delivered" then shop typing + reply
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m));
    }, 600);

    setTimeout(() => setIsTyping(true), 1200);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev.map(m => m.id === newMsg.id ? { ...m, status: 'read' } : m),
        {
          id: Date.now() + 1,
          from: 'shop',
          text: getAutoReply(),
          time: new Date().toISOString(),
          status: 'read'
        }
      ]);
    }, 2800 + Math.random() * 1200);
  };

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const quickReplies = ['What sizes are available?', 'Do you have home delivery?', 'What\'s the price?', 'Is this in stock?'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Chat Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--border-light)',
        flexShrink: 0
      }}>
        <button
          onClick={onBack}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'var(--warm-off-white)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          overflow: 'hidden', flexShrink: 0,
          border: '2px solid var(--border-light)',
          background: 'var(--warm-off-white)'
        }}>
          <img src={shop.logo} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontWeight: '800', fontSize: '0.95rem' }}>{shop.name}</span>
            {shop.verified && <ShieldCheck size={15} color="var(--primary-purple)" />}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Online · Usually replies quickly
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        background: '#FAFAF9'
      }}>
        {messages.map((msg) => {
          const isUser = msg.from === 'user';
          return (
            <div key={msg.id} style={{
              display: 'flex',
              justifyContent: isUser ? 'flex-end' : 'flex-start',
              alignItems: 'flex-end',
              gap: '0.45rem'
            }}>
              {!isUser && (
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  overflow: 'hidden', flexShrink: 0,
                  background: 'var(--warm-off-white)'
                }}>
                  <img src={shop.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ maxWidth: '72%' }}>
                <div style={{
                  padding: '0.65rem 0.95rem',
                  borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: isUser ? 'var(--deep-black)' : '#FFFFFF',
                  color: isUser ? '#FFFFFF' : 'var(--deep-black)',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  border: isUser ? 'none' : '1px solid var(--border-light)'
                }}>
                  {msg.text}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  marginTop: '0.2rem',
                  fontSize: '0.7rem',
                  color: 'var(--muted-text)'
                }}>
                  <span>{formatTime(msg.time)}</span>
                  {isUser && (
                    msg.status === 'read'
                      ? <CheckCheck size={13} color="var(--primary-purple)" />
                      : msg.status === 'delivered'
                        ? <CheckCheck size={13} />
                        : <Check size={13} />
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.45rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', background: 'var(--warm-off-white)' }}>
              <img src={shop.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              padding: '0.65rem 1rem',
              background: '#FFFFFF',
              borderRadius: '18px 18px 18px 4px',
              border: '1px solid var(--border-light)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              display: 'flex',
              gap: '4px',
              alignItems: 'center'
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: 'var(--muted-text)',
                  display: 'inline-block',
                  animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Replies */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        padding: '0.75rem 1.25rem 0',
        overflowX: 'auto',
        flexShrink: 0
      }} className="hide-scrollbar">
        {quickReplies.map((qr) => (
          <button
            key={qr}
            onClick={() => setInputText(qr)}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              border: '1.5px solid var(--border-medium)',
              fontSize: '0.78rem',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              color: 'var(--deep-black)',
              background: '#FFFFFF',
              flexShrink: 0,
              transition: 'all 0.15s ease'
            }}
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.85rem 1.25rem',
        borderTop: '1px solid var(--border-light)',
        flexShrink: 0,
        background: '#FFFFFF'
      }}>
        <input
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder={`Message ${shop.name}…`}
          style={{
            flex: 1,
            padding: '0.7rem 1rem',
            borderRadius: 'var(--radius-pill)',
            border: '1.5px solid var(--border-medium)',
            fontSize: '0.88rem',
            outline: 'none',
            background: 'var(--warm-off-white)',
            transition: 'border-color 0.2s'
          }}
          onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
          onBlur={e => e.target.style.borderColor = 'var(--border-medium)'}
        />
        <button
          onClick={sendMessage}
          disabled={!inputText.trim()}
          style={{
            width: '44px', height: '44px',
            borderRadius: '50%',
            background: inputText.trim() ? 'var(--deep-black)' : 'var(--border-medium)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s ease',
            cursor: inputText.trim() ? 'pointer' : 'not-allowed'
          }}
        >
          <Send size={18} color="#FFFFFF" />
        </button>
      </div>

      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ─── ChatModal (Inbox + Conversation) ─────────────────────────────────────────
export const ChatModal = ({ isOpen, onClose, shops, initialShop = null }) => {
  const [activeShop, setActiveShop] = useState(initialShop);

  useEffect(() => {
    if (initialShop) setActiveShop(initialShop);
  }, [initialShop]);

  useEffect(() => {
    if (!isOpen) {
      // Small delay so exit animation plays
      const t = setTimeout(() => setActiveShop(initialShop || null), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen, initialShop]);

  if (!isOpen) return null;

  // Inbox list — show all shops with "conversation" indicator
  const renderInbox = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--border-light)',
        flexShrink: 0
      }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Messages</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-text)' }}>Chat with local shop owners</p>
        </div>
        <button
          onClick={onClose}
          style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'var(--warm-off-white)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Shop List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {shops.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted-text)' }}>
            <MessageCircle size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p style={{ fontWeight: '600' }}>No shops to message</p>
            <p style={{ fontSize: '0.85rem' }}>Browse shops and start a conversation!</p>
          </div>
        ) : (
          shops.map((shop) => {
            const msgs = loadMessages(shop.id);
            const lastMsg = msgs[msgs.length - 1];
            return (
              <button
                key={shop.id}
                onClick={() => setActiveShop(shop)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.95rem 1.5rem',
                  borderBottom: '1px solid var(--border-light)',
                  textAlign: 'left',
                  transition: 'background 0.15s ease',
                  background: '#FFFFFF'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--warm-off-white)'}
                onMouseLeave={e => e.currentTarget.style.background = '#FFFFFF'}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '50%',
                    overflow: 'hidden', border: '2px solid var(--border-light)',
                    background: 'var(--warm-off-white)'
                  }}>
                    <img src={shop.logo} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: '#22c55e', border: '2px solid #FFFFFF'
                  }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{shop.name}</span>
                      {shop.verified && <ShieldCheck size={13} color="var(--primary-purple)" />}
                    </div>
                    {lastMsg && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--muted-text)', flexShrink: 0 }}>
                        {new Date(lastMsg.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {lastMsg
                      ? (lastMsg.from === 'user' ? `You: ${lastMsg.text}` : lastMsg.text)
                      : `Tap to message ${shop.name}`}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '480px',
          height: '80vh',
          maxHeight: '680px',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {activeShop
          ? <ChatWindow shop={activeShop} onBack={() => setActiveShop(null)} />
          : renderInbox()
        }
      </div>
    </div>
  );
};
