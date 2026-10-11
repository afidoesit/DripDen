import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, Package, Heart, LogOut, Settings, Plus, Truck, 
  ExternalLink, ShieldCheck, Sparkles, Award, ArrowLeft, Check, 
  Copy, Edit3, ShoppingBag, ChevronRight, Phone, Mail, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useDistrict } from '../context/DistrictContext';
import { dbService } from '../services/db';
import { KERALA_DISTRICTS } from '../data/keralaDistricts';
import { isFirebaseConfigured } from '../services/firebase';

export const ProfileView = ({ 
  onTrackOrder, 
  onOpenFirebaseSettings, 
  onOpenProductDetails,
  onNavigateHome,
  onNavigateDrops 
}) => {
  const { currentUser, logout, saveAddress, setIsAuthModalOpen } = useAuth();
  const { wishlistCount, setIsWishlistModalOpen } = useWishlist();
  const { setIsCartOpen } = useCart();
  const { currentDistrictObj, changeDistrict } = useDistrict();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'rewards' | 'settings'
  const [userOrders, setUserOrders] = useState([]);
  const [newAddressMode, setNewAddressMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(currentUser?.displayName || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '+91 98461 98765');
  
  const [addrForm, setAddrForm] = useState({
    name: currentUser?.displayName || '',
    phone: currentUser?.phone || '',
    addressLine: '',
    landmark: '',
    district: currentDistrictObj?.id || 'ernakulam',
    pincode: '682036',
    isDefault: false
  });

  useEffect(() => {
    if (currentUser) {
      loadOrders();
      setProfileName(currentUser.displayName || '');
      setProfilePhone(currentUser.phone || '+91 98461 98765');
    }
  }, [currentUser]);

  const loadOrders = async () => {
    const orders = await dbService.getOrders(currentUser?.uid || currentUser?.email);
    setUserOrders(orders);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    await saveAddress({
      ...addrForm,
      districtName: KERALA_DISTRICTS.find(d => d.id === addrForm.district)?.name || addrForm.district
    });
    setNewAddressMode(false);
    setAddrForm({
      name: currentUser?.displayName || '',
      phone: currentUser?.phone || '',
      addressLine: '',
      landmark: '',
      district: currentDistrictObj?.id || 'ernakulam',
      pincode: '682036',
      isDefault: false
    });
  };

  // If user is not logged in, render an inviting guest profile state
  if (!currentUser) {
    return (
      <div className="container" style={{ padding: '2.5rem 1rem 5rem', maxWidth: '780px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #18181B 0%, #2A173B 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2rem',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid rgba(168, 92, 255, 0.25)'
        }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-purple) 0%, var(--accent-pink) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 24px rgba(168, 92, 255, 0.4)'
          }}>
            <User size={34} color="#FFFFFF" />
          </div>

          <span className="drip-badge badge-mint" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            DRIPDEN KERALA ACCOUNT
          </span>

          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '900', marginBottom: '0.65rem', color: '#FFFFFF' }}>
            Your Kerala Streetwear Profile
          </h2>

          <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.78)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Sign in to track your boutique drops, manage local Kerala addresses across all 14 districts, and earn DripCoins.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-primary"
              style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
            >
              <User size={18} />
              <span>Sign In / Register</span>
            </button>

            <button
              onClick={() => setIsWishlistModalOpen(true)}
              className="btn-secondary"
              style={{ 
                padding: '0.85rem 1.75rem', 
                fontSize: '0.95rem',
                background: 'rgba(255, 125, 220, 0.15)',
                color: '#FF7DDC',
                borderColor: 'rgba(255, 125, 220, 0.35)'
              }}
            >
              <Heart size={18} fill="#FF7DDC" />
              <span>Saved Wishlist ({wishlistCount})</span>
            </button>

            <button
              onClick={onNavigateDrops}
              className="btn-secondary"
              style={{ 
                padding: '0.85rem 1.75rem', 
                fontSize: '0.95rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <span>Explore Drips</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userDistrictName = KERALA_DISTRICTS.find(d => d.id === currentUser.district)?.name || currentUser.district || 'Ernakulam';

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '80vh', padding: '1.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Navigation Breadcrumb / Top Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <button
            onClick={onNavigateHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.85rem',
              fontWeight: '700',
              color: 'var(--muted-text)',
              transition: 'color 0.15s ease'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Shopping</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="drip-badge badge-mint" style={{ fontSize: '0.68rem' }}>
              ● Verified Kerala Shopper
            </span>
          </div>
        </div>

        {/* User Hero Banner Card */}
        <div style={{
          background: 'linear-gradient(135deg, #141416 0%, #241432 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          color: '#FFFFFF',
          border: '1px solid rgba(168, 92, 255, 0.25)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
          marginBottom: '1.75rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Ambient Glow */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 92, 255, 0.3) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {/* Top row: Avatar, Info, and Actions */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                {/* Glowing Avatar */}
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-purple) 0%, var(--accent-pink) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)',
                  boxShadow: '0 4px 20px rgba(168, 92, 255, 0.45)',
                  border: '2px solid rgba(255, 255, 255, 0.25)',
                  flexShrink: 0
                }}>
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <h1 style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.8rem)', fontWeight: '900', color: '#FFFFFF' }}>
                      {currentUser.displayName}
                    </h1>
                    <span style={{
                      background: 'rgba(111, 255, 199, 0.15)',
                      color: '#6FFFC7',
                      border: '1px solid rgba(111, 255, 199, 0.3)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '0.15rem 0.6rem',
                      fontSize: '0.68rem',
                      fontWeight: '800'
                    }}>
                      Kerala Drip VIP
                    </span>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.85rem', 
                    color: 'rgba(255, 255, 255, 0.72)', 
                    fontSize: '0.82rem', 
                    marginTop: '0.35rem',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Mail size={13} /> {currentUser.email}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Phone size={13} /> {currentUser.phone || '+91 98461 98765'}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#6FFFC7', fontWeight: '700' }}>
                      <MapPin size={13} /> {userDistrictName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <button
                  onClick={logout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 0.95rem',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#fca5a5',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '0.9rem 1.1rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Orders Placed
                </span>
                <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#FFFFFF', marginTop: '0.1rem' }}>
                  {userOrders.length}
                </span>
              </div>

              <div 
                onClick={() => setIsWishlistModalOpen(true)}
                style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              >
                <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Saved Drops
                </span>
                <span style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--accent-pink)', marginTop: '0.1rem' }}>
                  {wishlistCount}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Saved Addresses
                </span>
                <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#6FFFC7', marginTop: '0.1rem' }}>
                  {currentUser.addresses?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content Container */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden'
        }}>
          {/* Profile Tabs Navigation */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-light)',
            overflowX: 'auto',
            background: '#FFFFFF',
            padding: '0 1rem'
          }}>
            {[
              { id: 'orders', label: 'My Drops & Orders', icon: Package, count: userOrders.length },
              { id: 'wishlist', label: 'My Wishlist', icon: Heart, count: wishlistCount },
              { id: 'addresses', label: 'Kerala Addresses', icon: MapPin, count: currentUser.addresses?.length || 0 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '1rem 1.15rem',
                    borderBottom: isActive ? '3px solid var(--primary-purple)' : '3px solid transparent',
                    fontWeight: isActive ? '800' : '600',
                    color: isActive ? 'var(--deep-black)' : 'var(--muted-text)',
                    fontSize: '0.88rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} color={isActive ? 'var(--primary-purple)' : 'currentColor'} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span style={{
                      fontSize: '0.72rem',
                      background: isActive ? 'var(--primary-purple)' : 'var(--warm-off-white)',
                      color: isActive ? '#FFFFFF' : 'var(--deep-black)',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '10px',
                      fontWeight: '800'
                    }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
            
            {/* TAB: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>My Saved Wishlist ({wishlistCount})</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted-text)' }}>
                      Clothes, sneakers, and boutique drops you have saved
                    </p>
                  </div>

                  <button
                    onClick={() => setIsWishlistModalOpen(true)}
                    className="btn-primary"
                    style={{ fontSize: '0.82rem', padding: '0.55rem 1.15rem' }}
                  >
                    <Heart size={15} fill="#FFFFFF" />
                    <span>Open Full Wishlist</span>
                  </button>
                </div>

                <div style={{
                  textAlign: 'center',
                  padding: '3.5rem 1.5rem',
                  background: 'var(--warm-off-white)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px dashed var(--border-medium)'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <Heart size={28} color="var(--accent-pink)" fill="var(--accent-pink)" />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem' }}>
                    {wishlistCount > 0 ? `${wishlistCount} Saved Items in Your Wishlist` : 'Your Wishlist is Empty'}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--muted-text)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                    {wishlistCount > 0 
                      ? 'Tap below to manage your saved drops, move items directly to your cart, or check out.'
                      : 'Explore boutique collections from local Kerala shops and tap the heart icon to save items.'}
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setIsWishlistModalOpen(true)}
                      className="btn-primary"
                      style={{ fontSize: '0.88rem', padding: '0.7rem 1.5rem' }}
                    >
                      <Heart size={16} />
                      <span>Manage Wishlist</span>
                    </button>
                    <button
                      onClick={onNavigateDrops}
                      className="btn-secondary"
                      style={{ fontSize: '0.88rem', padding: '0.7rem 1.5rem' }}
                    >
                      <span>Explore Drips</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: ORDERS HISTORY */}
            {activeTab === 'orders' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Recent Drops & Orders</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted-text)' }}>
                      Local deliveries across Kerala with live shop dispatch status
                    </p>
                  </div>

                  <button
                    onClick={onNavigateDrops}
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.95rem' }}
                  >
                    <span>Browse New Drops</span>
                    <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                  </button>
                </div>

                {userOrders.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '3.5rem 1.5rem',
                    background: 'var(--warm-off-white)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px dashed var(--border-medium)'
                  }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <Package size={26} color="var(--primary-purple)" />
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.35rem' }}>
                      No Orders Yet
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted-text)', maxWidth: '380px', margin: '0 auto 1.25rem' }}>
                      You haven't ordered any Kerala boutique drops yet. Check out the latest skate streetwear and thrift drops!
                    </p>
                    <button
                      onClick={onNavigateDrops}
                      className="btn-primary"
                      style={{ padding: '0.65rem 1.5rem', fontSize: '0.88rem' }}
                    >
                      <ShoppingBag size={16} />
                      <span>Explore Drops & Clothes</span>
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {userOrders.map((order) => (
                      <div
                        key={order.id}
                        style={{
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border-medium)',
                          background: '#FFFFFF',
                          overflow: 'hidden',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                      >
                        {/* Order Header */}
                        <div style={{
                          padding: '0.85rem 1.25rem',
                          background: 'var(--warm-off-white)',
                          borderBottom: '1px solid var(--border-light)',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.65rem'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>{order.id}</span>
                            <span className="drip-badge badge-purple" style={{ fontSize: '0.62rem' }}>
                              {order.status || 'Dispatched'}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.78rem', color: 'var(--muted-text)' }}>
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
                            {order.items?.map((item, idx) => (
                              <div
                                key={idx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.65rem',
                                  background: 'var(--warm-off-white)',
                                  padding: '0.5rem 0.75rem',
                                  borderRadius: 'var(--radius-md)',
                                  flexShrink: 0,
                                  border: '1px solid var(--border-light)'
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  style={{ width: '40px', height: '48px', borderRadius: '4px', objectFit: 'cover' }}
                                />
                                <div>
                                  <div style={{ fontSize: '0.82rem', fontWeight: '700' }}>{item.name}</div>
                                  <div style={{ fontSize: '0.72rem', color: 'var(--muted-text)' }}>
                                    Size: {item.size} • Qty: {item.quantity} • {item.shopName}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Footer with Price and Tracking Button */}
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTop: '1px solid var(--border-light)',
                            paddingTop: '0.75rem',
                            marginTop: '0.25rem',
                            gap: '0.65rem'
                          }}>
                            <div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                                Delivery to {order.deliveryAddress?.districtName || 'Kerala'} • Paid via {order.paymentMethod}
                              </div>
                              <div style={{ fontWeight: '900', fontSize: '1.05rem', fontFamily: 'var(--font-heading)', color: 'var(--deep-black)' }}>
                                Total: ₹{order.total?.toLocaleString('en-IN')}
                              </div>
                            </div>

                            <button
                              onClick={() => onTrackOrder(order)}
                              className="btn-primary"
                              style={{ padding: '0.5rem 1.15rem', fontSize: '0.82rem' }}
                            >
                              <Truck size={15} />
                              <span>Track Live Drop</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Saved Delivery Locations</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted-text)' }}>
                      Manage addresses across Kerala for quick 1-click checkout
                    </p>
                  </div>

                  {!newAddressMode && (
                    <button
                      onClick={() => setNewAddressMode(true)}
                      className="btn-secondary"
                      style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                    >
                      <Plus size={15} />
                      <span>Add New Address</span>
                    </button>
                  )}
                </div>

                {newAddressMode ? (
                  <form onSubmit={handleAddAddress} style={{
                    background: 'var(--warm-off-white)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-medium)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800' }}>New Kerala Address</h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>Receiver Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Arjun K."
                          value={addrForm.name}
                          onChange={(e) => setAddrForm(p => ({ ...p, name: e.target.value }))}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: '#FFFFFF' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98461 XXXXX"
                          value={addrForm.phone}
                          onChange={(e) => setAddrForm(p => ({ ...p, phone: e.target.value }))}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: '#FFFFFF' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>Street Address / Flat / Landmark</label>
                      <input
                        type="text"
                        required
                        placeholder="House No., Street name, Near Metro / Beach"
                        value={addrForm.addressLine}
                        onChange={(e) => setAddrForm(p => ({ ...p, addressLine: e.target.value }))}
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: '#FFFFFF' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>Kerala District</label>
                        <select
                          value={addrForm.district}
                          onChange={(e) => setAddrForm(p => ({ ...p, district: e.target.value }))}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: '#FFFFFF' }}
                        >
                          {KERALA_DISTRICTS.filter(d => d.id !== 'all').map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>Pincode</label>
                        <input
                          type="text"
                          required
                          placeholder="682036"
                          value={addrForm.pincode}
                          onChange={(e) => setAddrForm(p => ({ ...p, pincode: e.target.value }))}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-medium)', background: '#FFFFFF' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setNewAddressMode(false)}
                        style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', fontWeight: '600' }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ padding: '0.55rem 1.35rem', fontSize: '0.85rem' }}
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                ) : null}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {currentUser.addresses?.map((addr, i) => (
                    <div
                      key={addr.id || i}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-lg)',
                        border: addr.isDefault ? '2px solid var(--primary-purple)' : '1px solid var(--border-medium)',
                        background: '#FFFFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        position: 'relative'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <span style={{ fontWeight: '800', fontSize: '0.95rem' }}>{addr.name}</span>
                          {addr.isDefault && (
                            <span className="drip-badge badge-purple-subtle" style={{ fontSize: '0.62rem' }}>
                              DEFAULT
                            </span>
                          )}
                        </div>

                        <p style={{ fontSize: '0.85rem', color: 'var(--deep-black)', lineHeight: 1.4, margin: '0.3rem 0' }}>
                          {addr.addressLine}
                        </p>

                        <div style={{ fontSize: '0.78rem', color: 'var(--muted-text)' }}>
                          📍 {addr.districtName || addr.district}, Kerala - {addr.pincode}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--muted-text)', marginTop: '0.2rem' }}>
                          📞 {addr.phone}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.65rem' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--muted-text)' }}>
                          Express delivery within 24-48h
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
