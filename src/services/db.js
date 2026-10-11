import { SEED_PRODUCTS, SEED_SHOPS, INITIAL_USER } from '../data/seedData';
import { firestoreDb, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where 
} from 'firebase/firestore';

const STORAGE_KEYS = {
  PRODUCTS: 'dripden_products_v1',
  SHOPS: 'dripden_shops_v1',
  ORDERS: 'dripden_orders_v1',
  USERS: 'dripden_users_v1',
  RECENT_SEARCHES: 'dripden_recent_searches_v1',
  RECENT_VIEWS: 'dripden_recent_views_v1',
};

// Initialize Local Storage Database if not present
const initializeLocalDb = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SHOPS)) {
    localStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(SEED_SHOPS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    // Seed initial demo orders for realistic order history demonstration
    const initialOrders = [
      {
        id: 'DRIP-KL-94021',
        createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        customer: {
          name: 'Fahad K.',
          phone: '+91 98461 98765',
          email: 'fahad.k@dripden.in'
        },
        deliveryAddress: {
          addressLine: 'Apt 4B, Skyline Trinity, Panampilly Nagar',
          district: 'ernakulam',
          districtName: 'Ernakulam (Kochi)',
          pincode: '682036'
        },
        items: [
          {
            id: 'prod_1',
            name: 'Kochi Noir Heavyweight Hoodie',
            price: 2499,
            quantity: 1,
            size: 'L',
            color: 'Pitch Black',
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
            shopId: 'shop_kochi_dept',
            shopName: 'Kochi Street Dept.'
          }
        ],
        subtotal: 2499,
        deliveryFee: 0,
        total: 2499,
        paymentMethod: 'UPI (Google Pay)',
        status: 'Out for Delivery',
        trackingTimeline: [
          { status: 'Order Placed', timestamp: new Date(Date.now() - 36 * 3600 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), done: true },
          { status: 'Confirmed', timestamp: new Date(Date.now() - 34 * 3600 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), done: true },
          { status: 'Processing', timestamp: new Date(Date.now() - 28 * 3600 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), done: true },
          { status: 'Packed', timestamp: new Date(Date.now() - 20 * 3600 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), done: true },
          { status: 'Shipped', timestamp: new Date(Date.now() - 14 * 3600 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), done: true },
          { status: 'Out for Delivery', timestamp: 'Today, 09:30 AM', done: true, current: true },
          { status: 'Delivered', timestamp: 'Expected by 6:00 PM', done: false }
        ]
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(initialOrders));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([INITIAL_USER]));
  }
};

initializeLocalDb();

export const dbService = {
  // PRODUCTS
  async getProducts(filters = {}) {
    const { category, district, shopId, search, sort, minPrice, maxPrice } = filters;
    let products = [];

    if (isFirebaseConfigured() && firestoreDb) {
      try {
        const snap = await getDocs(collection(firestoreDb, 'products'));
        snap.forEach(d => products.push({ id: d.id, ...d.data() }));
      } catch (e) {
        console.warn('Firebase read error, falling back to local DB', e);
        products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
      }
    } else {
      products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
    }

    if (products.length === 0) {
      products = SEED_PRODUCTS;
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
    }

    // Apply filtering
    return products.filter(p => {
      if (category && category !== 'all' && p.category !== category) return false;
      if (district && district !== 'all' && p.district !== district) return false;
      if (shopId && p.shopId !== shopId) return false;
      if (minPrice && p.price < minPrice) return false;
      if (maxPrice && p.price > maxPrice) return false;
      if (search && search.trim()) {
        const q = search.toLowerCase().trim();
        const matchTitle = p.name.toLowerCase().includes(q);
        const matchShop = p.shopName.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchTag = p.tagline?.toLowerCase().includes(q);
        if (!matchTitle && !matchShop && !matchDesc && !matchTag) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'discount') return b.discountPercentage - a.discountPercentage;
      return 0; // default order
    });
  },

  async getProductById(id) {
    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
    return products.find(p => p.id === id) || null;
  },

  // SHOPS
  async getShops(filters = {}) {
    const { district, search, popular, featured } = filters;
    let shops = JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOPS) || '[]');

    if (shops.length === 0) {
      shops = SEED_SHOPS;
      localStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(SEED_SHOPS));
    }

    return shops.filter(shop => {
      if (district && district !== 'all' && shop.district !== district) return false;
      if (popular && !shop.popular) return false;
      if (featured && !shop.featured) return false;
      if (search && search.trim()) {
        const q = search.toLowerCase().trim();
        const matchName = shop.name.toLowerCase().includes(q);
        const matchLoc = shop.locality.toLowerCase().includes(q);
        const matchDist = shop.districtName.toLowerCase().includes(q);
        const matchCat = shop.category.toLowerCase().includes(q);
        if (!matchName && !matchLoc && !matchDist && !matchCat) return false;
      }
      return true;
    });
  },

  async getShopById(id) {
    const shops = JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOPS) || '[]');
    return shops.find(s => s.id === id) || null;
  },

  // ORDERS & STOCK MANAGEMENT
  async createOrder(orderPayload) {
    const orderId = `DRIP-KL-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    
    const trackingTimeline = [
      { status: 'Order Placed', timestamp: 'Just now', done: true, current: true },
      { status: 'Confirmed', timestamp: 'Pending verification', done: false },
      { status: 'Processing', timestamp: 'Pending shop dispatch', done: false },
      { status: 'Packed', timestamp: 'Shop packing', done: false },
      { status: 'Shipped', timestamp: 'Local courier partner', done: false },
      { status: 'Out for Delivery', timestamp: 'Final delivery run', done: false },
      { status: 'Delivered', timestamp: 'Expected within 48 hrs', done: false }
    ];

    const newOrder = {
      id: orderId,
      createdAt: now.toISOString(),
      status: 'Order Placed',
      trackingTimeline,
      ...orderPayload
    };

    // 1. Save order to local DB
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    // 2. Decrement stock for ordered products
    const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
    newOrder.items.forEach(item => {
      const pIndex = products.findIndex(p => p.id === item.id);
      if (pIndex !== -1 && products[pIndex].stock > 0) {
        products[pIndex].stock = Math.max(0, products[pIndex].stock - item.quantity);
      }
    });
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    // 3. Sync to Firebase if configured
    if (isFirebaseConfigured() && firestoreDb) {
      try {
        await setDoc(doc(firestoreDb, 'orders', orderId), newOrder);
      } catch (e) {
        console.warn('Could not sync order to Firestore:', e);
      }
    }

    return newOrder;
  },

  async getOrders(userId = null) {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    if (!userId) return orders;
    return orders.filter(o => o.customer?.userId === userId || o.customer?.email === userId);
  },

  async getOrderById(orderId) {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    return orders.find(o => o.id === orderId) || null;
  },

  // USER ADDRESSES
  async getUserAddresses(userId) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.uid === userId || u.email === userId);
    return user?.addresses || INITIAL_USER.addresses;
  },

  async saveUserAddress(userId, address) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    let userIndex = users.findIndex(u => u.uid === userId || u.email === userId);
    if (userIndex === -1) {
      users.push({ ...INITIAL_USER, uid: userId, email: userId });
      userIndex = users.length - 1;
    }

    const currentAddresses = users[userIndex].addresses || [];
    if (address.id) {
      const idx = currentAddresses.findIndex(a => a.id === address.id);
      if (idx !== -1) currentAddresses[idx] = address;
      else currentAddresses.push(address);
    } else {
      const newAddr = { ...address, id: `addr_${Date.now()}` };
      if (address.isDefault) {
        currentAddresses.forEach(a => a.isDefault = false);
      }
      currentAddresses.push(newAddr);
    }
    users[userIndex].addresses = currentAddresses;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return currentAddresses;
  },

  // RECENT SEARCHES & VIEWS
  getRecentSearches() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES) || '["Oversized Hoodie", "Parachute Cargos", "Kochi Street Dept", "Retro Sneakers", "SM Street"]');
  },

  addRecentSearch(term) {
    if (!term || !term.trim()) return;
    const current = this.getRecentSearches().filter(t => t.toLowerCase() !== term.toLowerCase());
    current.unshift(term.trim());
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(current.slice(0, 8)));
  },

  getRecentViews() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_VIEWS) || '[]');
  },

  addRecentView(product) {
    if (!product) return;
    const views = this.getRecentViews().filter(p => p.id !== product.id);
    views.unshift(product);
    localStorage.setItem(STORAGE_KEYS.RECENT_VIEWS, JSON.stringify(views.slice(0, 10)));
  },

  // RESET TO CLEAN SEED
  resetData() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.SHOPS, JSON.stringify(SEED_SHOPS));
    window.location.reload();
  }
};
