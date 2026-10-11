import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER } from '../data/seedData';
import { dbService } from '../services/db';
import { firebaseAuth, isFirebaseConfigured } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dripden_current_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login' | 'signup'

  useEffect(() => {
    if (isFirebaseConfigured() && firebaseAuth) {
      const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          const customUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            phone: user.phoneNumber || '+91 98461 98765',
            district: 'ernakulam',
            addresses: await dbService.getUserAddresses(user.uid)
          };
          setCurrentUser(customUser);
          localStorage.setItem('dripden_current_user', JSON.stringify(customUser));
        }
      });
      return unsubscribe;
    }
  }, []);

  const login = async (email, password) => {
    if (isFirebaseConfigured() && firebaseAuth) {
      const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return res.user;
    } else {
      // Local reactive authentication
      const user = {
        uid: `user_${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        phone: '+91 98461 98765',
        district: 'ernakulam',
        addresses: INITIAL_USER.addresses
      };
      setCurrentUser(user);
      localStorage.setItem('dripden_current_user', JSON.stringify(user));
      setIsAuthModalOpen(false);
      return user;
    }
  };

  const signup = async (name, email, password, phone, district) => {
    if (isFirebaseConfigured() && firebaseAuth) {
      const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(res.user, { displayName: name });
      return res.user;
    } else {
      const user = {
        uid: `user_${Date.now()}`,
        email,
        displayName: name,
        phone: phone || '+91 98460 00000',
        district: district || 'ernakulam',
        addresses: [
          {
            id: `addr_${Date.now()}`,
            name,
            phone: phone || '+91 98460 00000',
            addressLine: 'Street Address',
            district: district || 'ernakulam',
            districtName: district || 'Ernakulam (Kochi)',
            pincode: '682001',
            isDefault: true
          }
        ]
      };
      setCurrentUser(user);
      localStorage.setItem('dripden_current_user', JSON.stringify(user));
      setIsAuthModalOpen(false);
      return user;
    }
  };

  const demoLogin = () => {
    setCurrentUser(INITIAL_USER);
    localStorage.setItem('dripden_current_user', JSON.stringify(INITIAL_USER));
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    if (isFirebaseConfigured() && firebaseAuth) {
      await signOut(firebaseAuth);
    }
    setCurrentUser(null);
    localStorage.removeItem('dripden_current_user');
    setIsProfileModalOpen(false);
  };

  const saveAddress = async (address) => {
    if (!currentUser) return;
    const updated = await dbService.saveUserAddress(currentUser.uid, address);
    const updatedUser = { ...currentUser, addresses: updated };
    setCurrentUser(updatedUser);
    localStorage.setItem('dripden_current_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      signup,
      demoLogin,
      logout,
      saveAddress,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isProfileModalOpen,
      setIsProfileModalOpen,
      authView,
      setAuthView
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
