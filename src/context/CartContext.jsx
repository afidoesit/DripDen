import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dripden_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('dripden_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    setCartItems(prev => {
      const itemKey = `${product.id}-${selectedSize}-${selectedColor.name || selectedColor}`;
      const existingIndex = prev.findIndex(item => item.key === itemKey);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItem = {
        key: itemKey,
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        shopId: product.shopId,
        shopName: product.shopName,
        district: product.district,
        size: selectedSize,
        color: selectedColor.name || selectedColor,
        colorHex: selectedColor.hex || '#000',
        quantity: quantity,
        maxStock: product.stock
      };
      return [...prev, newItem];
    });

    showToast(`Added ${product.name} to cart`);
  };

  const updateQuantity = (key, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.key === key) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (key) => {
    setCartItems(prev => prev.filter(item => item.key !== key));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      subtotal,
      deliveryFee,
      total,
      isCartOpen,
      setIsCartOpen,
      toastMessage,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
