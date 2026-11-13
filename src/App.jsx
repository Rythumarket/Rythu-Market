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
    nav: { home: 'Home', categories: 'Categories', orders: 'Orders', profile: 'Profile' },
    searchPlaceholder: 'Search tomatoes, mangoes, Nellore rice...',
    nearbyShops: 'Nearby Nellore Shops',
    categories: 'Shop by Categories',
    all: 'All',
    vegetables: 'Fresh Vegetables',
    fruits: 'Fresh Fruits',
    groceries: 'Groceries & Rice',
    leafy: 'Leafy Greens',
    bestSellers: 'Best-Selling in Nellore',
    specialOffers: 'Today’s Farm Offers',
    wishlist: 'My Wishlist',
    addToCart: 'Add',
    cart: 'My Basket',
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
    wholesalePrice: 'Wholesale',
    retailPrice: 'Retail',
    adminOverrideBadge: 'Admin Fixed Price',
    stock: 'Stock',
    approve: 'Approve',
    suspend: 'Suspend',
    approved: 'Approved',
    pending: 'Pending Approval',
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
    nav: { home: 'హోమ్', categories: 'విభాగాలు', orders: 'ఆర్డర్లు', profile: 'ప్రొఫైల్' },
    searchPlaceholder: 'టమోటాలు, మామిడి, నెల్లూరు బియ్యం వెతకండి...',
    nearbyShops: 'సమీప నెల్లూరు దుకాణాలు',
    categories: 'విభాగాల వారీగా కొనండి',
    all: 'అన్నీ',
    vegetables: 'తాజా కూరగాయలు',
    fruits: 'తాజా పండ్లు',
    groceries: 'కిరాణా & బియ్యం',
    leafy: 'ఆకుకూరలు',
    bestSellers: 'నెల్లూరులో ఎక్కువగా కొనేవి',
    specialOffers: 'నేటి ప్రత్యేక ఆఫర్లు',
    wishlist: 'నా విష్ లిస్ట్',
    addToCart: 'జోడించు',
    cart: 'నా బాస్కెట్',
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
    wholesalePrice: 'హోల్‌సేల్',
    retailPrice: 'రిటైల్',
    adminOverrideBadge: 'అడ్మిన్ నిర్ణయించిన ధర',
    stock: 'నిల్వ',
    approve: 'ఆమోదించు',
    suspend: 'నిలిపివేయి',
    approved: 'ఆమోదించబడింది',
    pending: 'పెండింగ్',
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
  { id: 'shop-1', name: 'Sri Venkateswara Fresh Mart', area: 'Magunta Layout, Nellore', distanceKm: 2.4, rating: 4.8, deliveryMins: '25 mins', status: 'approved' },
  { id: 'shop-2', name: 'Penna Organic & Groceries', area: 'Kovur Road, Nellore', distanceKm: 6.2, rating: 4.6, deliveryMins: '35 mins', status: 'approved' },
  { id: 'shop-3', name: 'Simhapuri Rythu Bazar Store', area: 'VRC Centre, Nellore', distanceKm: 4.1, rating: 4.9, deliveryMins: '30 mins', status: 'approved' },
];

const INITIAL_PRODUCTS = [
  { id: 'prod-1', nameEn: 'Natu Tomatoes (Grade A)', nameTe: 'నాటు టమోటాలు', category: 'vegetables', unit: '1 kg', farmerName: 'Ramaiah Garu (Kovur)', shopId: 'shop-1', shopName: 'Sri Venkateswara Fresh Mart', wholesalePrice: 22, retailPrice: 32, mrp: 40, adminOverridePrice: null, stock: 140, isBestSeller: true, offerTag: '20% OFF', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80' },
  { id: 'prod-2', nameEn: 'Banganapalli Mangoes', nameTe: 'బంగినపల్లి మామిడి', category: 'fruits', unit: '1 kg', farmerName: 'Subba Reddy (Buchireddypalem)', shopId: 'shop-1', shopName: 'Sri Venkateswara Fresh Mart', wholesalePrice: 65, retailPrice: 88, mrp: 110, adminOverridePrice: null, stock: 85, isBestSeller: true, offerTag: 'FARM DIRECT', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80' },
  { id: 'prod-3', nameEn: 'Nellore Sona Masoori Rice (Old)', nameTe: 'నెల్లూరు సోనా మసూరి బియ్యం', category: 'groceries', unit: '5 kg', farmerName: 'Venkateswarlu (Indukurpet)', shopId: 'shop-3', shopName: 'Simhapuri Rythu Bazar Store', wholesalePrice: 245, retailPrice: 295, mrp: 340, adminOverridePrice: null, stock: 60, isBestSeller: true, offerTag: 'NELLORE SPECIAL', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80' },
  { id: 'prod-4', nameEn: 'Fresh Gongura & Palak Bundle', nameTe: 'తాజా గోంగూర & పాలకూర', category: 'leafy', unit: '2 bunches', farmerName: 'Lakshmi Devi (Podalakur)', shopId: 'shop-2', shopName: 'Penna Organic & Groceries', wholesalePrice: 12, retailPrice: 20, mrp: 25, adminOverridePrice: null, stock: 95, isBestSeller: false, offerTag: 'MORNING PICK', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80' },
  { id: 'prod-5', nameEn: 'Red Onions (Kurnool/Nellore)', nameTe: 'ఎర్ర ఉల్లిపాయలు', category: 'vegetables', unit: '2 kg', farmerName: 'Koteswara Rao (Atmakur)', shopId: 'shop-3', shopName: 'Simhapuri Rythu Bazar Store', wholesalePrice: 48, retailPrice: 66, mrp: 80, adminOverridePrice: null, stock: 200, isBestSeller: true, offerTag: '18% OFF', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80' },
  { id: 'prod-6', nameEn: 'Yelakki Bananas (Sweet)', nameTe: 'యాలక్కి అరటిపండ్లు', category: 'fruits', unit: '1 dozen', farmerName: 'Srinivasulu (Kavali)', shopId: 'shop-2', shopName: 'Penna Organic & Groceries', wholesalePrice: 42, retailPrice: 58, mrp: 70, adminOverridePrice: null, stock: 70, isBestSeller: false, offerTag: 'FRESH', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80' },
  { id: 'prod-7', nameEn: 'Toor Dal (Unpolished)', nameTe: 'కందిపప్పు', category: 'groceries', unit: '1 kg', farmerName: 'Prasad Farms (Vinjamur)', shopId: 'shop-1', shopName: 'Sri Venkateswara Fresh Mart', wholesalePrice: 128, retailPrice: 152, mrp: 175, adminOverridePrice: null, stock: 50, isBestSeller: false, offerTag: 'SAVE ₹23', image: 'https://images.unsplash.com/photo-1585996746349-90729098a5f9?auto=format&fit=crop&w=500&q=80' },
  { id: 'prod-8', nameEn: 'Fresh Okra (Bendakaya)', nameTe: 'తాజా బెండకాయలు', category: 'vegetables', unit: '500 g', farmerName: 'Ramaiah Garu (Kovur)', shopId: 'shop-1', shopName: 'Sri Venkateswara Fresh Mart', wholesalePrice: 16, retailPrice: 24, mrp: 30, adminOverridePrice: null, stock: 110, isBestSeller: false, offerTag: '20% OFF', image: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=500&q=80' },
];

const INITIAL_USERS = [
  { id: 'u-cust-1', name: 'Karthikeya Reddy', role: 'customer', area: 'Magunta Layout, Nellore', status: 'approved', phone: '9848011223', pin: '1234' },
  { id: 'u-1', name: 'Ramaiah Garu', role: 'farmer', area: 'Kovur Mandal, Nellore', status: 'approved', phone: '9848012345', pin: '1234' },
  { id: 'u-2', name: 'Subba Reddy', role: 'farmer', area: 'Buchireddypalem, Nellore', status: 'pending', phone: '9440198765', pin: '1234' },
  { id: 'u-3', name: 'Sri Venkateswara Fresh Mart', role: 'shopkeeper', area: 'Magunta Layout, Nellore', status: 'approved', phone: '9989054321', pin: '1234' },
  { id: 'u-4', name: 'Gudur Green Basket', role: 'shopkeeper', area: 'Gudur, Nellore', status: 'pending', phone: '9177022334', pin: '1234' },
  { id: 'u-5', name: 'Suresh Kumar (Rider)', role: 'delivery', area: 'Nellore Town', status: 'approved', phone: '9000188776', pin: '1234' },
  { id: 'u-admin-1', name: 'Nellore District Admin', role: 'admin', area: 'Collectorate Office Rd, Nellore', status: 'approved', phone: '9999900000', pin: '1234' },
];

const INITIAL_ORDERS = [
  { id: 'RB-8901', customerName: 'Anusha Reddy', customerAddress: 'Flat 302, Sai Nilayam, Magunta Layout, Nellore', shopName: 'Sri Venkateswara Fresh Mart', itemsSummary: 'Natu Tomatoes (2 kg), Banganapalli Mangoes (1 kg)', subtotal: 152, deliveryCharge: 20, total: 172, paymentMethod: 'COD', paymentStatus: 'Confirmed (COD)', status: 'Out for Delivery', riderEarnings: 25, createdAt: 'Today, 09:15 AM' },
  { id: 'RB-8902', customerName: 'Praveen Kumar', customerAddress: 'Dargamitta, Near RTC Bus Stand, Nellore', shopName: 'Simhapuri Rythu Bazar Store', itemsSummary: 'Nellore Sona Masoori Rice (5 kg)', subtotal: 295, deliveryCharge: 20, total: 315, paymentMethod: 'COD', paymentStatus: 'Confirmed (COD)', status: 'Packed at Shop', riderEarnings: 25, createdAt: 'Today, 10:05 AM' },
];

const INITIAL_WHOLESALE_ORDERS = [
  { id: 'WS-401', shopName: 'Sri Venkateswara Fresh Mart', farmerName: 'Ramaiah Garu (Kovur)', item: 'Natu Tomatoes (Grade A) - 50 kg', amount: 1100, status: 'Accepted' },
  { id: 'WS-402', shopName: 'Penna Organic & Groceries', farmerName: 'Ramaiah Garu (Kovur)', item: 'Fresh Okra (Bendakaya) - 30 kg', amount: 960, status: 'Pending' },
  export default function RythuBasketApp() {
  const [lang, setLang] = useState('en');
  const [activeRole, setActiveRole] = useState('customer');
  const [customerTab, setCustomerTab] = useState('home');
  const [selectedArea, setSelectedArea] = useState(NELLORE_AREAS[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [config, setConfig] = useState({
    slab0to5: 20,
    slab5to10: 30,
    slab10to15: 40,
    freeDeliveryAbove: 499,
    platformCommissionPct: 5,
  });

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [shops] = useState(INITIAL_SHOPS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [wholesaleOrders, setWholesaleOrders] = useState(INITIAL_WHOLESALE_ORDERS);

  const [authSessions, setAuthSessions] = useState({
    customer: null,
    farmer: null,
    shopkeeper: null,
    delivery: null,
    admin: null,
  });
  const [authMode, setAuthMode] = useState('login');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regArea, setRegArea] = useState(NELLORE_AREAS[0]);
  const [regPin, setRegPin] = useState('');
  const [authError, setAuthError] = useState('');

  const [cart, setCart] = useState([
    { productId: 'prod-1', qty: 2 },
    { productId: 'prod-2', qty: 1 },
  ]);
  const [wishlist, setWishlist] = useState(['prod-2', 'prod-3']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [distanceBand, setDistanceBand] = useState('0-5');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [customerAddress, setCustomerAddress] = useState('Plot 14, Magunta Layout, Nellore - 524003');
  const [orderBanner, setOrderBanner] = useState(null);

  const [newProduce, setNewProduce] = useState({
    nameEn: '',
    nameTe: '',
    category: 'vegetables',
    unit: '1 kg',
    wholesalePrice: '',
    stock: '',
  });

  const [riderOnline, setRiderOnline] = useState(true);
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [firebaseJsonInput, setFirebaseJsonInput] = useState('');
  const [firebaseConnected, setFirebaseConnected] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const saved = localStorage.getItem('rythu_basket_firebase_cfg');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.projectId) {
          setFirebaseConnected(true);
          setFirebaseJsonInput(saved);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const getEffectiveRetailPrice = (product) =>
    product.adminOverridePrice !== null && product.adminOverridePrice !== ''
      ? Number(product.adminOverridePrice)
      : Number(product.retailPrice);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.nameEn.toLowerCase().includes(q) ||
        p.nameTe.includes(q) ||
        p.shopName.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const cartDetails = useMemo(() => {
    const lines = cart
      .map((item) => {
        const prod = products.find((p) => p.id === item.productId);
        if (!prod) return null;
        const unitPrice = getEffectiveRetailPrice(prod);
        return { ...item, product: prod, unitPrice, lineTotal: unitPrice * item.qty };
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

    return { lines, subtotal, totalCount, deliveryCharge, isFreeDelivery, amountForFree, grandTotal };
  }, [cart, products, distanceBand, config]);

  const addToCart = (productId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { productId, qty: 1 }];
    });
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const getItemQty = (productId) => cart.find((i) => i.productId === productId)?.qty || 0;

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handlePlaceOrder = () => {
    if (cartDetails.lines.length === 0) return;
    const newOrder = {
      id: `RB-${Math.floor(8903 + Math.random() * 900)}`,
      customerName: authSessions.customer?.name || 'Nellore Customer',
      customerAddress,
      shopName: cartDetails.lines[0].product.shopName,
      itemsSummary: cartDetails.lines.map((l) => `${l.product.nameEn} (${l.qty})`).join(', '),
      subtotal: cartDetails.subtotal,
      deliveryCharge: cartDetails.deliveryCharge,
      total: cartDetails.grandTotal,
      paymentMethod,
      paymentStatus:
        paymentMethod === 'COD'
          ? 'Confirmed (COD)'
          : 'Pending Payment Verification (No Live Gateway)',
      status: paymentMethod === 'COD' ? 'Order Placed' : 'Awaiting Payment Verification',
      riderEarnings: Math.max(25, cartDetails.deliveryCharge + 5),
      createdAt: 'Just now',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    setCustomerTab('orders');
    setOrderBanner(newOrder);
  };

  const handleFarmerUpload = (e) => {
    e.preventDefault();
    if (!newProduce.nameEn || !newProduce.wholesalePrice || !newProduce.stock) return;
    const wp = Number(newProduce.wholesalePrice);
    const created = {
      id: `prod-${Date.now()}`,
      nameEn: newProduce.nameEn,
      nameTe: newProduce.nameTe || newProduce.nameEn,
      category: newProduce.category,
      unit: newProduce.unit,
      farmerName: `${authSessions.farmer?.name || 'Ramaiah Garu'} (${authSessions.farmer?.area?.split(',')[0] || 'Kovur'})`,
      shopId: 'shop-1',
      shopName: 'Sri Venkateswara Fresh Mart',
      wholesalePrice: wp,
      retailPrice: Math.round(wp * 1.25),
      mrp: Math.round(wp * 1.45),
      adminOverridePrice: null,
      stock: Number(newProduce.stock),
      isBestSeller: false,
      offerTag: 'NEW HARVEST',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
    };
    setProducts((prev) => [created, ...prev]);
    setNewProduce({ nameEn: '', nameTe: '', category: 'vegetables', unit: '1 kg', wholesalePrice: '', stock: '' });
  };

  const handleWholesaleBuy = (product) => {
    const newWsOrder = {
      id: `WS-${Math.floor(403 + Math.random() * 500)}`,
      shopName: authSessions.shopkeeper?.name || 'Sri Venkateswara Fresh Mart',
      farmerName: product.farmerName,
      item: `${product.nameEn} - 25 units`,
      amount: product.wholesalePrice * 25,
      status: 'Pending',
    };
    setWholesaleOrders((prev) => [newWsOrder, ...prev]);
  };

  const updateShopRetailPrice = (productId, newPrice) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, retailPrice: Number(newPrice) || 0 } : p))
    );
  };

  const updateAdminOverride = (productId, overrideVal) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, adminOverridePrice: overrideVal === '' ? null : Number(overrideVal) } : p
      )
    );
  };

  const advanceDeliveryStatus = (orderId) => {
    const flow = ['Order Placed', 'Packed at Shop', 'Out for Delivery', 'Delivered'];
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const idx = flow.indexOf(o.status);
        const nextStatus = idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : 'Delivered';
        return { ...o, status: nextStatus };
      })
    );
  };

  const handleSaveFirebase = () => {
    try {
      const parsed = JSON.parse(firebaseJsonInput);
      if (!parsed.apiKey || !parsed.projectId) {
        alert('Please enter valid Firebase config JSON with apiKey and projectId.');
        return;
      }
      localStorage.setItem('rythu_basket_firebase_cfg', JSON.stringify(parsed));
      setFirebaseConnected(true);
      setShowFirebaseModal(false);
    } catch {
      alert('Invalid JSON format.');
    }
  };

  const switchRoleTab = (roleKey) => {
    setActiveRole(roleKey);
    setAuthError('');
    setLoginPhone('');
    setLoginPin('');
  };

  const handleRoleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const matched = users.find((u) => u.role === activeRole && u.phone === loginPhone.trim());
    if (!matched) {
      setAuthError(lang === 'te' ? 'ఈ మొబైల్ నంబర్ నమోదు కాలేదు.' : 'Mobile number not registered for this role.');
      return;
    }
    if (matched.pin && loginPin.trim() !== matched.pin) {
      setAuthError(lang === 'te' ? 'తప్పు PIN నమోదు చేశారు.' : 'Invalid 4-digit PIN.');
      return;
    }
    setAuthSessions((prev) => ({ ...prev, [activeRole]: matched }));
    setLoginPhone('');
    setLoginPin('');
  };

  const handleRoleRegister = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!regName.trim() || regPhone.trim().length < 10 || regPin.trim().length < 4) {
      setAuthError('Please enter full name, 10-digit mobile number, and 4-digit PIN.');
      return;
    }
    const newUser = {
      id: `u-${Date.now()}`,
      name: regName.trim(),
      role: activeRole,
      area: regArea,
      status: activeRole === 'customer' || activeRole === 'admin' ? 'approved' : 'pending',
      phone: regPhone.trim(),
      pin: regPin.trim(),
    };
    setUsers((prev) => [newUser, ...prev]);
    setAuthSessions((prev) => ({ ...prev, [activeRole]: newUser }));
    setRegName('');
    setRegPhone('');
    setRegPin('');
    setAuthMode('login');
  };

  const handleQuickDemoLogin = (userObj) => {
    setAuthError('');
    setAuthSessions((prev) => ({ ...prev, [activeRole]: userObj }));
  };

  const handleRoleLogout = () => {
    setAuthSessions((prev) => ({ ...prev, [activeRole]: null }));
    setAuthError('');
  };

  const currentUser = authSessions[activeRole];
  const roleDemoAccounts = users.filter((u) => u.role === activeRole);
    const renderProductCard = (product) => {
    const effectivePrice = getEffectiveRetailPrice(product);
    const hasOverride = product.adminOverridePrice !== null;
    const qty = getItemQty(product.id);
    const isWished = wishlist.includes(product.id);
    const discountPct =
      product.mrp > effectivePrice
        ? Math.round(((product.mrp - effectivePrice) / product.mrp) * 100)
        : 0;

    return (
      <div
        key={product.id}
        className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
      >
        <div className="relative h-36 sm:h-40 bg-emerald-50/40 overflow-hidden">
          <img
            src={product.image}
            alt={product.nameEn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            {discountPct > 0 ? `${discountPct}% OFF` : product.offerTag}
          </span>
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Toggle Wishlist"
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
          >
            <Heart
              className={`w-4 h-4 ${
                isWished ? 'fill-rose-500 text-rose-500' : 'text-gray-500'
              }`}
            />
          </button>
          <span className="absolute bottom-2 left-2 bg-white/95 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-emerald-600" /> 30 MINS
          </span>
        </div>

        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700 truncate">
              {product.shopName}
            </p>
            <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1 mt-0.5">
              {lang === 'te' ? product.nameTe : product.nameEn}
            </h4>
            <p className="text-[11px] text-gray-500 line-clamp-1">
              {lang === 'te' ? product.nameEn : product.nameTe}
            </p>
            <div className="mt-2 inline-block bg-gray-100 text-gray-700 text-[11px] font-medium px-2 py-0.5 rounded-md">
              {product.unit}
            </div>
            {hasOverride && (
              <span className="ml-1.5 inline-block text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                {t.adminOverrideBadge}
              </span>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between gap-1">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-extrabold text-gray-900">
                  ₹{effectivePrice}
                </span>
                {product.mrp > effectivePrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.mrp}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-emerald-700 font-medium">
                {t.stock}: {product.stock}
              </p>
            </div>

            {qty === 0 ? (
              <button
                onClick={() => addToCart(product.id)}
                className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> {t.addToCart}
              </button>
            ) : (
              <div className="flex items-center bg-emerald-600 text-white rounded-xl overflow-hidden">
                <button
                  onClick={() => updateCartQty(product.id, -1)}
                  className="px-2 py-1.5 hover:bg-emerald-700"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-xs font-extrabold">{qty}</span>
                <button
                  onClick={() => updateCartQty(product.id, 1)}
                  className="px-2 py-1.5 hover:bg-emerald-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-24">
      <header className="sticky top-0 z-40 bg-white border-b border-emerald-100 shadow-xs">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white flex items-center justify-center shadow-sm">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-emerald-950 leading-none">
                  {t.appName}
                </h1>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full">
                  NELLORE
                </span>
              </div>
              {activeRole === 'customer' ? (
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="text-[11px] font-semibold text-gray-700 bg-transparent focus:outline-none cursor-pointer max-w-[175px] sm:max-w-none truncate"
                  >
                    {NELLORE_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="text-[11px] text-gray-500 mt-0.5">{t.tagline}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1.5 rounded-full text-xs font-bold"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'తెలుగు' : 'EN'}</span>
            </button>

            {activeRole === 'customer' && (
              <button
                onClick={() => setCustomerTab('profile')}
                className="relative p-2 rounded-full bg-gray-100 hover:bg-rose-50 text-gray-700"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}

            {activeRole === 'customer' && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full text-xs font-bold"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">{t.cart}</span>
                <span className="bg-white text-emerald-800 text-[11px] font-extrabold px-1.5 rounded-full">
                  {cartDetails.totalCount}
                </span>
              </button>
            )}

            <button
              onClick={() => setShowFirebaseModal(true)}
              className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold border ${
                firebaseConnected
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{firebaseConnected ? 'Live' : 'Demo'}</span>
            </button>

            <button
              onClick={() => setShowInstallModal(true)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-emerald-950 text-white">
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold mr-1 shrink-0">
              App Mode:
            </span>
            {[
              { key: 'customer', icon: ShoppingBag, label: t.roles.customer },
              { key: 'farmer', icon: Sprout, label: t.roles.farmer },
              { key: 'shopkeeper', icon: Store, label: t.roles.shopkeeper },
              { key: 'delivery', icon: Truck, label: t.roles.delivery },
              { key: 'admin', icon: ShieldCheck, label: t.roles.admin },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeRole === item.key;
              const isSignedIn = Boolean(authSessions[item.key]);
              return (
                <button
                  key={item.key}
                  onClick={() => switchRoleTab(item.key)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-500 text-white'
                      : 'text-emerald-100 hover:bg-emerald-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSignedIn ? 'bg-lime-300' : 'bg-amber-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 sm:px-6 pt-4">
        {!currentUser ? (
          <div className="max-w-md mx-auto mt-4 bg-white border border-emerald-100 rounded-3xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-700 text-white p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5" />
                  {t.roles[activeRole]} Portal
                </span>
                <span className="text-xs text-emerald-100 font-semibold">
                  Nellore District
                </span>
              </div>
              <h2 className="text-xl font-extrabold mt-3">
                {authMode === 'login'
                  ? `Sign in as ${t.roles[activeRole]}`
                  : `Register new ${t.roles[activeRole]} account`}
              </h2>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                  }}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 ${
                    authMode === 'login'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-gray-600'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setAuthError('');
                  }}
                  className={`py-2 rounded-lg flex items-center justify-center gap-1.5 ${
                    authMode === 'register'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-gray-600'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>

              {authError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {authMode === 'login' ? (
                <form onSubmit={handleRoleLogin} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9848011223"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      4-Digit PIN (Default: 1234)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      placeholder="••••"
                      value={loginPin}
                      onChange={(e) => setLoginPin(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-sm"
                  >
                    Login to {t.roles[activeRole]} Dashboard
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRoleRegister} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name / Store Name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm"
                  />
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="10-Digit Mobile Number"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm"
                  />
                  <select
                    value={regArea}
                    onChange={(e) => setRegArea(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white"
                  >
                    {NELLORE_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    placeholder="Create 4-Digit PIN"
                    value={regPin}
                    onChange={(e) => setRegPin(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-sm"
                  >
                    Create Account & Enter
                  </button>
                </form>
              )}

              {roleDemoAccounts.length > 0 && (
                <div className="pt-3 border-t border-gray-100 space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    1-Tap Nellore Demo Login:
                  </p>
                  {roleDemoAccounts.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleQuickDemoLogin(acc)}
                      className="w-full text-left bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-emerald-950">
                          {acc.name}
                        </p>
                        <p className="text-[11px] text-gray-600">
                          {acc.phone} • {acc.area}
                        </p>
                      </div>
                      <span className="text-[11px] font-extrabold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                        Login →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 bg-white border border-emerald-100 rounded-2xl px-3.5 py-2.5 flex items-center justify-between gap-2">
              <div className="truncate">
                <p className="text-xs font-extrabold text-gray-900 truncate">
                  {currentUser.name} ({t.roles[activeRole]})
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  {currentUser.phone} • {currentUser.area}
                </p>
              </div>
              <button
                onClick={handleRoleLogout}
                className="shrink-0 flex items-center gap-1 text-xs font-bold text-rose-600 border border-rose-200 px-2.5 py-1.5 rounded-xl"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>

            {activeRole === 'customer' && (
              <div className="space-y-6">
                {orderBanner && (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-sm text-emerald-950">
                        Order {orderBanner.id} Recorded ({orderBanner.paymentStatus})
                      </p>
                      <p className="text-xs text-emerald-800 mt-0.5">
                                                Total: ₹{orderBanner.total} • {orderBanner.itemsSummary}
                      </p>
                    </div>
                    <button onClick={() => setOrderBanner(null)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="relative">
                  <Search className="w-4 h-4 text-emerald-700 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-11 pr-10 py-3 bg-white border border-emerald-200 rounded-2xl text-sm"
                  />
                </div>

                {customerTab === 'home' && (
                  <div className="space-y-6">
                    <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 text-white p-5 sm:p-7 shadow-md">
                      <span className="inline-flex items-center gap-1 bg-amber-400 text-emerald-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mb-2">
                        <Sparkles className="w-3 h-3" /> NELLORE HARVEST
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold">
                        {lang === 'te'
                          ? 'నెల్లూరు రైతుల నుండి తాజా కూరగాయలు & పండ్లు!'
                          : 'Farm-Fresh Nellore Produce Delivered in 30 Mins'}
                      </h2>
                      <p className="text-xs text-emerald-100 mt-1">
                        Free delivery above ₹{config.freeDeliveryAbove}
                      </p>
                    </div>

                    <section>
                      <h3 className="font-extrabold text-base text-gray-900 mb-3">
                        {t.bestSellers}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {filteredProducts.map(renderProductCard)}
                      </div>
                    </section>

                    <section>
                      <h3 className="font-extrabold text-base text-gray-900 mb-3">
                        {t.nearbyShops}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {shops.map((shop) => (
                          <div
                            key={shop.id}
                            className="bg-white border border-gray-100 rounded-2xl p-3.5 flex items-center justify-between"
                          >
                            <div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                {shop.distanceKm} km • {shop.deliveryMins}
                              </span>
                              <h4 className="font-bold text-sm text-gray-900 mt-1">
                                {shop.name}
                              </h4>
                              <p className="text-xs text-gray-500">{shop.area}</p>
                            </div>
                            <span className="bg-amber-50 text-amber-800 px-2 py-1 rounded-xl text-xs font-bold">
                              ★ {shop.rating}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {customerTab === 'categories' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {[
                        { key: 'all', label: t.all },
                        { key: 'vegetables', label: t.vegetables },
                        { key: 'fruits', label: t.fruits },
                        { key: 'groceries', label: t.groceries },
                        { key: 'leafy', label: t.leafy },
                      ].map((cat) => (
                        <button
                          key={cat.key}
                          onClick={() => setSelectedCategory(cat.key)}
                          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${
                            selectedCategory === cat.key
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border border-gray-200 text-gray-700'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {filteredProducts.map(renderProductCard)}
                    </div>
                  </div>
                )}

                {customerTab === 'orders' && (
                  <div className="space-y-3">
                    <h2 className="font-extrabold text-lg text-gray-900">
                      {t.orderHistory}
                    </h2>
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2"
                      >
                        <div className="flex justify-between">
                          <span className="font-extrabold text-sm text-emerald-900">
                            {order.id}
                          </span>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700">
                          {order.itemsSummary}
                        </p>
                        <p className="text-xs font-bold">
                          Total: ₹{order.total} • {order.paymentStatus}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {customerTab === 'profile' && (
                  <div className="space-y-4">
                    <h3 className="font-extrabold text-base text-gray-900">
                      {t.wishlist} ({wishlist.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {products
                        .filter((p) => wishlist.includes(p.id))
                        .map(renderProductCard)}
                    </div>
                  </div>
                )}
              </div>
                        {activeRole === 'farmer' && (
              <div className="space-y-5">
                <form
                  onSubmit={handleFarmerUpload}
                  className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3"
                >
                  <h3 className="font-bold text-gray-900">{t.addProduce}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Produce Name (English)"
                      value={newProduce.nameEn}
                      onChange={(e) =>
                        setNewProduce({ ...newProduce, nameEn: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-200 rounded-xl text-sm"
                    />
                    <input
                      type="text"
                      placeholder="తెలుగు పేరు"
                      value={newProduce.nameTe}
                      onChange={(e) =>
                        setNewProduce({ ...newProduce, nameTe: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-200 rounded-xl text-sm"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Wholesale Price (₹)"
                      value={newProduce.wholesalePrice}
                      onChange={(e) =>
                        setNewProduce({
                          ...newProduce,
                          wholesalePrice: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-200 rounded-xl text-sm"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Stock Quantity"
                      value={newProduce.stock}
                      onChange={(e) =>
                        setNewProduce({ ...newProduce, stock: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-sm"
                  >
                    Publish Produce
                  </button>
                </form>

                <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2">
                  <h3 className="font-bold text-gray-900">
                    {t.incomingShopOrders}
                  </h3>
                  {wholesaleOrders.map((wo) => (
                    <div
                      key={wo.id}
                      className="p-3 bg-emerald-50 rounded-xl flex justify-between items-center text-xs"
                    >
                      <span>
                        <strong>{wo.shopName}</strong>: {wo.item} (₹{wo.amount})
                      </span>
                      <span className="font-bold text-emerald-800">
                        {wo.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeRole === 'shopkeeper' && (
              <div className="space-y-5">
                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-900 mb-3">
                    {t.wholesaleMarket}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className="border border-gray-100 rounded-xl p-3 text-xs space-y-2"
                      >
                        <p className="font-bold text-sm">{p.nameEn}</p>
                        <p>
                          Wholesale: <strong>₹{p.wholesalePrice}</strong> |
                          Retail:{' '}
                          <input
                            type="number"
                            value={p.retailPrice}
                            onChange={(e) =>
                              updateShopRetailPrice(p.id, e.target.value)
                            }
                            className="w-16 border rounded px-1 font-bold"
                          />
                        </p>
                        <button
                          onClick={() => handleWholesaleBuy(p)}
                          className="w-full bg-emerald-600 text-white py-1.5 rounded-lg font-bold"
                        >
                          Buy 25 Units
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeRole === 'delivery' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-emerald-900 text-white p-4 rounded-2xl">
                  <h2 className="font-extrabold">{t.deliveryHub}</h2>
                  <button
                    onClick={() => setRiderOnline(!riderOnline)}
                    className="bg-emerald-400 text-emerald-950 px-3 py-1 rounded-full text-xs font-extrabold"
                  >
                    {riderOnline ? '● Online' : '○ Offline'}
                  </button>
                </div>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 flex justify-between items-center text-xs"
                  >
                    <div>
                      <p className="font-bold text-sm">
                        {order.id} • {order.customerName}
                      </p>
                      <p className="text-gray-600">{order.customerAddress}</p>
                    </div>
                    <button
                      onClick={() => advanceDeliveryStatus(order.id)}
                      className="bg-emerald-600 text-white px-3 py-2 rounded-xl font-bold"
                    >
                      {order.status} →
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeRole === 'admin' && (
              <div className="space-y-5">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                  <h3 className="font-bold text-gray-900">{t.chargeConfig}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <label>0-5 KM (₹)</label>
                      <input
                        type="number"
                        value={config.slab0to5}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            slab0to5: Number(e.target.value),
                          })
                        }
                        className="w-full border rounded-lg p-1.5 font-bold"
                      />
                    </div>
                    <div>
                      <label>5-10 KM (₹)</label>
                      <input
                        type="number"
                        value={config.slab5to10}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            slab5to10: Number(e.target.value),
                          })
                        }
                        className="w-full border rounded-lg p-1.5 font-bold"
                      />
                    </div>
                    <div>
                      <label>10-15 KM (₹)</label>
                      <input
                        type="number"
                        value={config.slab10to15}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            slab10to15: Number(e.target.value),
                          })
                        }
                        className="w-full border rounded-lg p-1.5 font-bold"
                      />
                    </div>
                    <div>
                      <label>Free Above (₹)</label>
                      <input
                        type="number"
                        value={config.freeDeliveryAbove}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            freeDeliveryAbove: Number(e.target.value),
                          })
                        }
                        className="w-full border rounded-lg p-1.5 font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2 text-xs">
                  <h3 className="font-bold text-sm text-gray-900">
                    {t.userApprovals}
                  </h3>
                  {users.map((u) => (
                    <div
                      key={u.id}
                      className="flex justify-between items-center py-1.5 border-b border-gray-100"
                    >
                      <span>
                        <strong>{u.name}</strong> ({u.role})
                      </span>
                      <button
                        onClick={() =>
                          setUsers((prev) =>
                            prev.map((x) =>
                              x.id === u.id
                                ? {
                                    ...x,
                                    status:
                                      x.status === 'approved'
                                        ? 'pending'
                                        : 'approved',
                                  }
                                : x
                            )
                          )
                        }
                        className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-bold"
                      >
                        {u.status}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {activeRole === 'customer' && (
        <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto grid grid-cols-4 py-1.5">
            {[
              { key: 'home', icon: Home, label: t.nav.home },
              { key: 'categories', icon: LayoutGrid, label: t.nav.categories },
              { key: 'orders', icon: ClipboardList, label: t.nav.orders },
              { key: 'profile', icon: User, label: t.nav.profile },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setCustomerTab(tab.key)}
                  className={`flex flex-col items-center py-1 text-[11px] font-bold ${
                    customerTab === tab.key
                      ? 'text-emerald-700'
                      : 'text-gray-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-extrabold text-base">
                  {t.cart} ({cartDetails.totalCount})
                </h3>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              {cartDetails.lines.map((line) => (
                <div
                  key={line.productId}
                  className="flex justify-between items-center text-xs bg-gray-50 p-2.5 rounded-xl"
                >
                  <div>
                    <p className="font-bold">{line.product.nameEn}</p>
                    <p>
                      ₹{line.unitPrice} × {line.qty} = ₹{line.lineTotal}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateCartQty(line.productId, -1)}
                      className="px-2 py-1 bg-white border rounded"
                    >
                      -
                    </button>
                    <span className="font-bold">{line.qty}</span>
                    <button
                      onClick={() => updateCartQty(line.productId, 1)}
                      className="px-2 py-1 bg-emerald-600 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full border rounded-xl p-2"
                />
                <div className="grid grid-cols-3 gap-1">
                  {['0-5', '5-10', '10-15'].map((band) => (
                    <button
                      key={band}
                      type="button"
                      onClick={() => setDistanceBand(band)}
                      className={`py-1.5 rounded-lg border font-bold ${
                        distanceBand === band
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white'
                      }`}
                    >
                      {band} KM
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`py-2 rounded-lg border font-bold ${
                      paymentMethod === 'COD'
                        ? 'bg-emerald-50 border-emerald-600'
                        : ''
                    }`}
                  >
                    {t.cod}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ONLINE')}
                    className={`py-2 rounded-lg border font-bold ${
                      paymentMethod === 'ONLINE'
                        ? 'bg-amber-50 border-amber-600'
                        : ''
                    }`}
                  >
                    {t.onlinePay}
                  </button>
                </div>
                {paymentMethod === 'ONLINE' && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg">
                    {t.onlineNotice}
                  </p>
                )}
              </div>
            </div>

            {cartDetails.lines.length > 0 && (
              <div className="border-t pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>
                    {cartDetails.deliveryCharge === 0
                      ? 'FREE'
                      : `₹${cartDetails.deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-extrabold text-base">
                  <span>Total</span>
                  <span>₹{cartDetails.grandTotal}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-emerald-600 text-white font-extrabold py-3 rounded-xl text-sm"
                >
                  {t.placeOrder} • ₹{cartDetails.grandTotal}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showFirebaseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 space-y-3">
            <h3 className="font-extrabold text-base">Firebase Configuration</h3>
            <textarea
              rows={5}
              value={firebaseJsonInput}
              onChange={(e) => setFirebaseJsonInput(e.target.value)}
              placeholder='{"apiKey": "...", "projectId": "..."}'
              className="w-full p-2.5 border rounded-xl text-xs font-mono"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowFirebaseModal(false)}
                className="px-3 py-1.5 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFirebase}
                className="bg-emerald-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 space-y-3">
            <h3 className="font-extrabold text-base">
              Install Rythu Basket on Android
            </h3>
            <p className="text-xs text-gray-700">
              Open this URL in Android Chrome → Tap <strong>⋮</strong> →{' '}
              <strong>Add to Home screen</strong>.
            </p>
            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full bg-emerald-600 text-white py-2 rounded-xl text-xs font-bold"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

            )}
            
          
];
   
