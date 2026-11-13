import React, { useState, useMemo, useEffect } from 'react';
import {
  ShoppingBag,
  Sprout,
  Store,
  Truck,
  ShieldCheck,
  Search,
  MapPin,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Clock,
  Globe,
  Download,
  Sliders,
  AlertCircle,
  Package,
  TrendingUp,
  UserCheck,
  X,
  Phone,
  Star,
  ChevronRight,
  Database,
  Heart,
  Home,
  LayoutGrid,
  ClipboardList,
  User,
  Flame,
  Percent,
  Sparkles,
  ArrowRight,
  Lock,
  LogOut,
  LogIn,
  UserPlus,
  KeyRound,
} from 'lucide-react';

// --- TRANSLATION DICTIONARY (EN / TE) ---
const TRANSLATIONS = {
  en: {
    appName: 'Rythu Basket',
    tagline: 'Nellore Farm-to-Home Freshness',
    district: 'Nellore District, AP',
    roles: {
      customer: 'Customer',
      farmer: 'Farmer',
      shopkeeper: 'Shopkeeper',
      delivery: 'Delivery',
      admin: 'Admin',
    },
    nav: {
      home: 'Home',
      categories: 'Categories',
      orders: 'Orders',
      profile: 'Profile',
    },
    searchPlaceholder: 'Search tomatoes, mangoes, Nellore rice...',
    nearbyShops: 'Nearby Nellore Shops',
    categories: 'Shop by Categories',
    all: 'All',
    vegetables: 'Fresh Vegetables',
    fruits: 'Fresh Fruits',
    groceries: 'Groceries & Rice',
    leafy: 'Leafy Greens',
    dairy: 'Dairy & Ghee',
    spices: 'Spices & Pulses',
    bestSellers: 'Best-Selling in Nellore',
    specialOffers: 'Today’s Farm Offers',
    wishlist: 'My Wishlist',
    addToCart: 'Add',
    cart: 'My Basket',
    checkout: 'Proceed to Checkout',
    deliveryFee: 'Delivery Charge',
    freeDeliveryUnlocked: 'FREE Delivery Unlocked!',
    addMoreForFree: 'Add ₹{amount} more for FREE delivery',
    distanceSlab: 'Delivery Distance',
    paymentMethod: 'Payment Method',
    cod: 'Cash on Delivery (COD)',
    onlinePay: 'Online Payment (UPI / Card)',
    onlineNotice:
      'Online gateway requires live Merchant API keys. Orders placed with Online Payment remain in "Pending Payment Verification" until confirmed.',
    placeOrder: 'Place Order',
    orderHistory: 'My Orders & Live Tracking',
    farmerHub: 'Farmer Wholesale Hub',
    addProduce: 'List Farm Harvest',
    myProduce: 'My Harvest Stock',
    incomingShopOrders: 'Incoming Shopkeeper Orders',
    shopHub: 'Shopkeeper Store Manager',
    wholesaleMarket: 'Buy Wholesale from Farmers',
    retailInventory: 'My Retail Store Prices',
    customerOrders: 'Customer Orders to Pack',
    deliveryHub: 'Delivery Partner Console',
    assignedTasks: 'Assigned Deliveries',
    earnings: 'Today’s Earnings',
    adminHub: 'Admin Control Center',
    userApprovals: 'User & Shop Approvals',
    priceOverride: 'Global Price Override',
    chargeConfig: 'Delivery & Commission Rules',
    salesReports: 'Nellore District Reports',
    wholesalePrice: 'Wholesale',
    retailPrice: 'Retail',
    adminOverrideBadge: 'Admin Fixed Price',
    stock: 'Stock',
    approve: 'Approve',
    suspend: 'Suspend',
    approved: 'Approved',
    pending: 'Pending Approval',
    firebaseStatus: 'Backend Mode',
    installApp: 'Install App',
  },
  te: {
    appName: 'రైతు బాస్కెట్',
    tagline: 'నెల్లూరు పొలాల నుండి నేరుగా మీ ఇంటికి',
    district: 'నెల్లూరు జిల్లా, ఆంధ్రప్రదేశ్',
    roles: {
      customer: 'వినియోగదారుడు',
      farmer: 'రైతు',
      shopkeeper: 'దుకాణదారుడు',
      delivery: 'డెలివరీ',
      admin: 'అడ్మిన్',
    },
    nav: {
      home: 'హోమ్',
      categories: 'విభాగాలు',
      orders: 'ఆర్డర్లు',
      profile: 'ప్రొఫైల్',
    },
    searchPlaceholder: 'టమోటాలు, మామిడి, నెల్లూరు బియ్యం వెతకండి...',
    nearbyShops: 'సమీప నెల్లూరు దుకాణాలు',
    categories: 'విభాగాల వారీగా కొనండి',
    all: 'అన్నీ',
    vegetables: 'తాజా కూరగాయలు',
    fruits: 'తాజా పండ్లు',
    groceries: 'కిరాణా & బియ్యం',
    leafy: 'ఆకుకూరలు',
    dairy: 'పాలు & నెయ్యి',
    spices: 'సుగంధ ద్రవ్యాలు',
    bestSellers: 'నెల్లూరులో ఎక్కువగా కొనేవి',
    specialOffers: 'నేటి ప్రత్యేక ఆఫర్లు',
    wishlist: 'నా విష్ లిస్ట్',
    addToCart: 'జోడించు',
    cart: 'నా బాస్కెట్',
    checkout: 'ఆర్డర్ నిర్ధారించండి',
    deliveryFee: 'డెలివరీ ఛార్జీ',
    freeDeliveryUnlocked: 'ఉచిత డెలివరీ వర్తిస్తుంది!',
    addMoreForFree: 'ఉచిత డెలివరీ కోసం మరో ₹{amount} జోడించండి',
    distanceSlab: 'డెలివరీ దూరం',
    paymentMethod: 'చెల్లింపు విధానం',
    cod: 'క్యాష్ ఆన్ డెలివరీ (COD)',
    onlinePay: 'ఆన్‌లైన్ చెల్లింపు (UPI / కార్డ్)',
    onlineNotice:
      'ఆన్‌లైన్ చెల్లింపులకు లైవ్ పేమెంట్ గేట్‌వే అవసరం. ఆన్‌లైన్ ఆర్డర్లు ధృవీకరించే వరకు "పెండింగ్" స్థితిలో ఉంటాయి.',
    placeOrder: 'ఆర్డర్ చేయండి',
    orderHistory: 'నా ఆర్డర్లు & ట్రాకింగ్',
    farmerHub: 'రైతు హోల్‌సేల్ కేంద్రం',
    addProduce: 'పంట వివరాలు చేర్చండి',
    myProduce: 'నా పంట నిల్వ',
    incomingShopOrders: 'దుకాణదారుల ఆర్డర్లు',
    shopHub: 'దుకాణదారుడి నిర్వహణ',
    wholesaleMarket: 'రైతుల నుండి హోల్‌సేల్ కొనుగోలు',
    retailInventory: 'నా రిటైల్ ధరలు',
    customerOrders: 'కస్టమర్ ఆర్డర్లు',
    deliveryHub: 'డెలివరీ భాగస్వామి',
    assignedTasks: 'కేటాయించిన డెలివరీలు',
    earnings: 'నేటి సంపాదన',
    adminHub: 'అడ్మిన్ నియంత్రణ కేంద్రం',
    userApprovals: 'రైతు & దుకాణ ఆమోదాలు',
    priceOverride: 'ధరల నియంత్రణ',
    chargeConfig: 'డెలివరీ & కమిషన్ నియమాలు',
    salesReports: 'నెల్లూరు అమ్మకాల నివేదిక',
    wholesalePrice: 'హోల్‌సేల్',
    retailPrice: 'రిటైల్',
    adminOverrideBadge: 'అడ్మిన్ నిర్ణయించిన ధర',
    stock: 'నిల్వ',
    approve: 'ఆమోదించు',
    suspend: 'నిలిపివేయి',
    approved: 'ఆమోదించబడింది',
    pending: 'పెండింగ్',
    firebaseStatus: 'బ్యాకెండ్ స్థితి',
    installApp: 'యాప్ ఇన్‌స్టాల్',
  },
};

const NELLORE_AREAS = [
  'Nellore Town - Magunta Layout',
  'Kovur Mandal',
  'Buchireddypalem',
  'Kavali Town',
  'Gudur',
  'Atmakur',
  'Vinjamur',
  'Sullurpeta',
];

const INITIAL_SHOPS = [
  {
    id: 'shop-1',
    name: 'Sri Venkateswara Fresh Mart',
    area: 'Magunta Layout, Nellore',
    distanceKm: 2.4,
    rating: 4.8,
    deliveryMins: '25 mins',
    status: 'approved',
  },
  {
    id: 'shop-2',
    name: 'Penna Organic & Groceries',
    area: 'Kovur Road, Nellore',
    distanceKm: 6.2,
    rating: 4.6,
    deliveryMins: '35 mins',
    status: 'approved',
  },
  {
    id: 'shop-3',
    name: 'Simhapuri Rythu Bazar Store',
    area: 'VRC Centre, Nellore',
    distanceKm: 4.1,
    rating: 4.9,
    deliveryMins: '30 mins',
    status: 'approved',
  },
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    nameEn: 'Natu Tomatoes (Grade A)',
    nameTe: 'నాటు టమోటాలు',
    category: 'vegetables',
    unit: '1 kg',
    farmerName: 'Ramaiah Garu (Kovur)',
    shopId: 'shop-1',
    shopName: 'Sri Venkateswara Fresh Mart',
    wholesalePrice: 22,
    retailPrice: 32,
    mrp: 40,
    adminOverridePrice: null,
    stock: 140,
    isBestSeller: true,
    offerTag: '20% OFF',
    image:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'prod-2',
    nameEn: 'Banganapalli Mangoes',
    nameTe: 'బంగినపల్లి మామిడి',
    category: 'fruits',
    unit: '1 kg',
    farmerName: 'Subba Reddy (Buchireddypalem)',
    shopId: 'shop-1',
    shopName: 'Sri Venkateswara Fresh Mart',
    wholesalePrice: 65,
    retailPrice: 88,
    mrp: 110,
    adminOverridePrice: null,
    stock: 85,
    isBestSeller: true,
    offerTag: 'FARM DIRECT',
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'prod-3',
    nameEn: 'Nellore Sona Masoori Rice (Old)',
    nameTe: 'నెల్లూరు సోనా మసూరి బియ్యం',
    category: 'groceries',
    unit: '5 kg',
    farmerName: 'Venkateswarlu (Indukurpet)',
    shopId: 'shop-3',
    shopName: 'Simhapuri Rythu Bazar Store',
    wholesalePrice: 245,
    retailPrice: 295,
    mrp: 340,
    adminOverridePrice: null,
    stock: 60,
    isBestSeller: true,
    offerTag: 'NELLORE SPECIAL',
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'prod-4',
    nameEn: 'Fresh Gongura & Palak Bundle',
    nameTe: 'తాజా గోంగూర & పాలకూర',
    category: 'leafy',
    unit: '2 bunches',
    farmerName: 'Lakshmi Devi (Podalakur)',
    shopId: 'shop-2',
    shopName: 'Penna Organic & Groceries',
    wholesalePrice: 12,
    retailPrice: 20,
    mrp: 25,
    adminOverridePrice: null,
    stock: 95,
    isBestSeller: false,
    offerTag: 'MORNING PICK',
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'prod-5',
    nameEn: 'Red Onions (Kurnool/Nellore)',
    nameTe: 'ఎర్ర ఉల్లిపాయలు',
    category: 'vegetables',
    unit: '2 kg',
    farmerName: 'Koteswara Rao (Atmakur)',
    shopId: 'shop-3',
    shopName: 'Simhapuri Rythu Bazar Store',
    wholesalePrice: 48,
    retailPrice: 66,
    mrp: 80,
    adminOverridePrice: null,
    stock: 200,
    isBestSeller: true,
    offerTag: '18% OFF',
    image:
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'prod-6',
    nameEn: 'Yelakki Bananas (Sweet)',
    nameTe: 'యాలక్కి అరటిపండ్లు',
    category: 'fruits',
    unit: '1 dozen',
    farmerName: 'Srinivasulu (Kavali)',
    shopId: 'shop-2',
    shopName: 'Penna Organic & Groceries',
    wholesalePrice: 42,
    retailPrice: 58,
    mrp: 70,
    adminOverridePrice: null,
    stock: 70,
    isBestSeller: false,
    offerTag: 'FRESH',
    image:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'prod-7',
    nameEn: 'Toor Dal (Unpolished)',
    nameTe: 'కందిపప్పు',
    category: 'groceries',
    unit: '1 kg',
    farmerName: 'Prasad Farms (Vinjamur)',
    shopId: 'shop-1',
    shopName: 'Sri Venkateswara Fresh Mart',
    wholesalePrice: 128,
    retailPrice: 152,
    mrp: 175,
    adminOverridePrice: null,
    stock: 50,
    isBestSeller: false,
    offerTag: 'SAVE ₹23',
    image:
      'https://images.unsplash.com/photo-1585996746349-90729098a5f9?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'prod-8',
    nameEn: 'Fresh Okra (Bendakaya)',
    nameTe: 'తాజా బెండకాయలు',
    category: 'vegetables',
    unit: '500 g',
    farmerName: 'Ramaiah Garu (Kovur)',
    shopId: 'shop-1',
    shopName: 'Sri Venkateswara Fresh Mart',
    wholesalePrice: 16,
    retailPrice: 24,
    mrp: 30,
    adminOverridePrice: null,
    stock: 110,
    isBestSeller: false,
    offerTag: '20% OFF',
    image:
      'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=500&q=80',
  },
];

const INITIAL_USERS = [
  {
    id: 'u-cust-1',
    name: 'Karthikeya Reddy',
    role: 'customer',
    area: 'Magunta Layout, Nellore',
    status: 'approved',
    phone: '9848011223',
    pin: '1234',
  },
  {
    id: 'u-1',
    name: 'Ramaiah Garu',
    role: 'farmer',
    area: 'Kovur Mandal, Nellore',
    status: 'approved',
    phone: '9848012345',
    pin: '1234',
  },
  {
    id: 'u-2',
    name: 'Subba Reddy',
    role: 'farmer',
    area: 'Buchireddypalem, Nellore',
    status: 'pending',
    phone: '9440198765',
    pin: '1234',
  },
  {
    id: 'u-3',
    name: 'Sri Venkateswara Fresh Mart',
    role: 'shopkeeper',
    area: 'Magunta Layout, Nellore',
    status: 'approved',
    phone: '9989054321',
    pin: '1234',
  },
  {
    id: 'u-4',
    name: 'Gudur Green Basket',
    role: 'shopkeeper',
    area: 'Gudur, Nellore',
    status: 'pending',
    phone: '9177022334',
    pin: '1234',
  },
  {
    id: 'u-5',
    name: 'Suresh Kumar (Rider)',
    role: 'delivery',
    area: 'Nellore Town',
    status: 'approved',
    phone: '9000188776',
    pin: '1234',
  },
  {
    id: 'u-admin-1',
    name: 'Nellore District Admin',
    role: 'admin',
    area: 'Collectorate Office Rd, Nellore',
    status: 'approved',
    phone: '9999900000',
    pin: '1234',
  },
];

const INITIAL_ORDERS = [
  {
    id: 'RB-8901',
    customerName: 'Anusha Reddy',
    customerAddress: 'Flat 302, Sai Nilayam, Magunta Layout, Nellore',
    shopName: 'Sri Venkateswara Fresh Mart',
    itemsSummary: 'Natu Tomatoes (2 kg), Banganapalli Mangoes (1 kg)',
    subtotal: 152,
    deliveryCharge: 20,
    total: 172,
    paymentMethod: 'COD',
    paymentStatus: 'Confirmed (COD)',
    status: 'Out for Delivery',
    riderEarnings: 25,
    createdAt: 'Today, 09:15 AM',
  },
  {
    id: 'RB-8902',
    customerName: 'Praveen Kumar',
    customerAddress: 'Dargamitta, Near RTC Bus Stand, Nellore',
    shopName: 'Simhapuri Rythu Bazar Store',
    itemsSummary: 'Nellore Sona Masoori Rice (5 kg)',
    subtotal: 295,
    deliveryCharge: 20,
    total: 315,
    paymentMethod: 'COD',
    paymentStatus: 'Confirmed (COD)',
    status: 'Packed at Shop',
    riderEarnings: 25,
    createdAt: 'Today, 10:05 AM',
  },
];

const INITIAL_WHOLESALE_ORDERS = [
  {
    id: 'WS-401',
    shopName: 'Sri Venkateswara Fresh Mart',
    farmerName: 'Ramaiah Garu (Kovur)',
    item: 'Natu Tomatoes (Grade A) - 50 kg',
    amount: 1100,
    status: 'Accepted',
  },
  {
    id: 'WS-402',
    shopName: 'Penna Organic & Groceries',
    farmerName: 'Ramaiah Garu (Kovur)',
    item: 'Fresh Okra (Bendakaya) - 30 kg',
    amount: 960,
    status: 'Pending',
  },
];

export default function RythuBasketApp() {
  const [lang, setLang] = useState('en');
  const [activeRole, setActiveRole] = useState('customer');
  const [customerTab, setCustomerTab] = useState('home'); // home | categories | orders | profile
  const [selectedArea, setSelectedArea] = useState(NELLORE_AREAS[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Business Configuration State (Admin Controlled)
  const [config, setConfig] = useState({
    slab0to5: 20,
    slab5to10: 30,
    slab10to15: 40,
    freeDeliveryAbove: 499,
    platformCommissionPct: 5,
  });

  // Marketplace Data State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [shops] = useState(INITIAL_SHOPS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [wholesaleOrders, setWholesaleOrders] = useState(INITIAL_WHOLESALE_ORDERS);

  // Authentication State per Role (All 5 Roles Require Sign In / Registration)
  const [authSessions, setAuthSessions] = useState({
    customer: null,
    farmer: null,
    shopkeeper: null,
    delivery: null,
    admin: null,
  });
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regArea, setRegArea] = useState(NELLORE_AREAS[0]);
  const [regPin, setRegPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Customer Cart, Wishlist & Checkout State
  const [cart, setCart] = useState([
    { productId: 'prod-1', qty: 2 },
    { productId: 'prod-2', qty: 1 },
  ]);
  const [wishlist, setWishlist] = useState(['prod-2', 'prod-3']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [distanceBand, setDistanceBand] = useState('0-5');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [customerAddress, setCustomerAddress] = useState(
    'Plot 14, Magunta Layout, Nellore - 524003'
  );
  const [orderBanner, setOrderBanner] = useState(null);

  // Farmer Upload Form State
  const [newProduce, setNewProduce] = useState({
    nameEn: '',
    nameTe: '',
    category: 'vegetables',
    unit: '1 kg',
    wholesalePrice: '',
    stock: '',
  });

  // Delivery Partner Duty State
  const [riderOnline, setRiderOnline] = useState(true);

  // Firebase Configuration & Install Modals
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [firebaseJsonInput, setFirebaseJsonInput] = useState('');
  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [firebaseProjectId, setFirebaseProjectId] = useState('');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const saved = localStorage.getItem('rythu_basket_firebase_cfg');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.projectId) {
          setFirebaseConnected(true);
          setFirebaseProjectId(parsed.projectId);
          setFirebaseJsonInput(saved);
        }
      } catch {
        // ignore invalid saved json
      }
    }
  }, []);

  // Effective Retail Price helper (Admin override takes priority over Shopkeeper retail price)
  const getEffectiveRetailPrice = (product) =>
    product.adminOverridePrice !== null && product.adminOverridePrice !== ''
      ? Number(product.adminOverridePrice)
      : Number(product.retailPrice);

  // Filtered Products for Customer
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.nameEn.toLowerCase().includes(q) ||
        p.nameTe.includes(q) ||
        p.shopName.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Cart Calculations
  const cartDetails = useMemo(() => {
    const lines = cart
      .map((item) => {
        const prod = products.find((p) => p.id === item.productId);
        if (!prod) return null;
        const unitPrice = getEffectiveRetailPrice(prod);
        return {
          ...item,
          product: prod,
          unitPrice,
          lineTotal: unitPrice * item.qty,
        };
      })
      .filter(Boolean);

    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const totalCount = lines.reduce((sum, l) => sum + l.qty, 0);
    const baseDelivery =
      distanceBand === '0-5'
        ? Number(config.slab0to5)
        : distanceBand === '5-10'
        ? Number(config.slab5to10)
        : Number(config.slab10to15);
    const isFreeDelivery = subtotal >= Number(config.freeDeliveryAbove);
    const deliveryCharge = subtotal === 0 ? 0 : isFreeDelivery ? 0 : baseDelivery;
    const grandTotal = subtotal + deliveryCharge;
    const amountForFree = Math.max(0, Number(config.freeDeliveryAbove) - subtotal);

    return {
      lines,
      subtotal,
      totalCount,
      deliveryCharge,
      isFreeDelivery,
      amountForFree,
      grandTotal,
    };
  }, [cart, products, distanceBand, config]);

  // Cart & Wishlist Actions
  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { productId, qty: 1 }];
    });
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const getItemQty = (productId) =>
    cart.find((i) => i.productId === productId)?.qty || 0;

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handlePlaceOrder = () => {
    if (cartDetails.lines.length === 0) return;

    const newOrder = {
      id: `RB-${Math.floor(8903 + Math.random() * 900)}`,
      customerName: authSessions.customer?.name || 'Nellore Customer',
      customerAddress,
      shopName: cartDetails.lines[0].product.shopName,
      itemsSummary: cartDetails.lines
        .map((l) => `${l.product.nameEn} (${l.qty})`)
        .join(', '),
      subtotal: cartDetails.subtotal,
      deliveryCharge: cartDetails.deliveryCharge,
 
