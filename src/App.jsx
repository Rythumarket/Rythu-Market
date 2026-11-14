React, { useState } from 'react';
import {
  Search, ShoppingCart, Plus, Minus, Home, Grid,
  ClipboardList, User, MapPin, Phone, Sprout,
  Store, Truck, ShieldCheck, ChevronRight, ArrowLeft,
  CheckCircle2, Lock, KeyRound, LogOut,
  Edit3, Check, Bell, MessageCircle,
  Warehouse, Camera, MessageSquare, Leaf, Handshake,
  Percent, TrendingUp, Zap, Heart, Tag, QrCode,
  Trash2, Ticket, Smartphone, Wallet, Navigation
} from 'lucide-react';

const CAT_IMG = {
  vegetables: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80',
  leafy: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80',
  fruits: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80',
  dairy: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300&q=80',
  beverages: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=300&q=80',
  eggs: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=300&q=80',
  poultry: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=300&q=80',
  livestock: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=300&q=80',
};

const INITIAL_SHOPS = [
  {
    id: 'shop_farmer_1',
    role: 'farmer',
    storeName: 'Ramaiah Organic Farm (Kovur)',
    ownerName: 'K. Ramaiah',
    mobile: '9440112233',
    password: '123',
    address: 'Kovur Road, Nellore',
    upiId: '9440112233@ybl',
    bankAccount: 'SBIN0001234 • 30981234567',
    acceptCod: true,
    photoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80',
    approved: true,
  },
  {
    id: 'shop_retail_1',
    role: 'retail',
    storeName: 'Balaji Fresh Retail Mart',
    ownerName: 'S. Venkatesh',
    mobile: '9849223344',
    password: '123',
    address: 'Vedayapalem, Nellore',
    upiId: '9849223344@ybl',
    bankAccount: 'HDFC0002345 • 501002345678',
    acceptCod: true,
    photoUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
    approved: true,
  },
  {
    id: 'shop_wholesale_1',
    role: 'wholesale',
    storeName: 'Nellore Mandi Wholesale Depot',
    ownerName: 'M. Subba Rao',
    mobile: '9989334455',
    password: '123',
    address: 'Atmakur Bus Stand Mandi, Nellore',
    upiId: '9989334455@ybl',
    bankAccount: 'ICIC0003456 • 004501234567',
    acceptCod: true,
    photoUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80',
    approved: true,
  },
];

const INITIAL_PRODUCTS = [
  // FARMER ITEMS
  { id: 'v1', sellerId: 'shop_farmer_1', sellerType: 'farmer', sellerName: 'Ramaiah Farm (Kovur)', nameEn: 'Tomato', nameTe: 'టమాటా', unit: 'kg', minQty: 1, price: 24, oldPrice: 32, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80' },
  { id: 'v24', sellerId: 'shop_farmer_1', sellerType: 'farmer', sellerName: 'Ramaiah Farm (Kovur)', nameEn: 'Spinach', nameTe: 'పాలకూర', unit: 'bunches', minQty: 1, price: 18, oldPrice: 25, cat: 'vegetables', inStock: true, img: CAT_IMG.leafy },
  { id: 'f10', sellerId: 'shop_farmer_1', sellerType: 'farmer', sellerName: 'Ramaiah Farm (Kovur)', nameEn: 'Banganapalli Mango', nameTe: 'బంగినపల్లి మామిడి', unit: 'kg', minQty: 1, price: 95, oldPrice: 120, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80' },
  { id: 'c2', sellerId: 'shop_farmer_1', sellerType: 'farmer', sellerName: 'Ramaiah Farm (Kovur)', nameEn: 'Country Chicken (Live)', nameTe: 'నాటు కోడి', unit: 'kg', minQty: 1, price: 360, oldPrice: 420, cat: 'livestock', inStock: true, img: CAT_IMG.poultry },
  { id: 'sh1', sellerId: 'shop_farmer_1', sellerType: 'farmer', sellerName: 'Ramaiah Farm (Kovur)', nameEn: 'Nellore Jodipi Sheep', nameTe: 'నెల్లూరు జోడిపి గొర్రె', unit: 'animal', minQty: 1, price: 8900, oldPrice: 9800, cat: 'livestock', inStock: true, img: CAT_IMG.livestock },

  // RETAIL ITEMS
  { id: 'v2', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Red Onion', nameTe: 'ఉల్లిపాయ', unit: 'kg', minQty: 1, price: 32, oldPrice: 40, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=300&q=80' },
  { id: 'm1', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Full Cream Milk', nameTe: 'చిక్కటి పాలు', unit: 'L', minQty: 1, price: 68, oldPrice: 75, cat: 'dairy', inStock: true, img: CAT_IMG.dairy },
  { id: 'm9', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Pure Cow Ghee', nameTe: 'నెయ్యి', unit: '500 ml', minQty: 1, price: 340, oldPrice: 390, cat: 'dairy', inStock: true, img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80' },
  { id: 'b6', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Tender Coconut Water', nameTe: 'కొబ్బరి నీళ్లు', unit: 'pc', minQty: 1, price: 40, oldPrice: 50, cat: 'beverages', inStock: true, img: CAT_IMG.beverages },
  { id: 'e2', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Country Eggs (6 pcs)', nameTe: 'నాటు కోడి గుడ్లు', unit: 'pack', minQty: 1, price: 54, oldPrice: 66, cat: 'livestock', inStock: true, img: CAT_IMG.eggs },

  // WHOLESALE ITEMS (MINIMUM QUANTITY ENFORCED)
  { id: 'w1', sellerId: 'shop_wholesale_1', sellerType: 'wholesale', sellerName: 'Nellore Mandi Wholesale', nameEn: 'Onion Bulk Sack', nameTe: 'ఉల్లిపాయలు (హోల్‌సేల్)', unit: 'kg', minQty: 10, price: 23, oldPrice: 32, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=300&q=80' },
  { id: 'w2', sellerId: 'shop_wholesale_1', sellerType: 'wholesale', sellerName: 'Nellore Mandi Wholesale', nameEn: 'Potato Bulk Crate', nameTe: 'బంగాళాదుంప (హోల్‌సేల్)', unit: 'kg', minQty: 15, price: 21, oldPrice: 30, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80' },
  { id: 'w3', sellerId: 'shop_wholesale_1', sellerType: 'wholesale', sellerName: 'Nellore Mandi Wholesale', nameEn: 'Banana Bulk Bunch', nameTe: 'అరటిపండ్లు (హోల్‌సేల్)', unit: 'dozen', minQty: 5, price: 34, oldPrice: 45, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80' },
];

export default function App() {
  const [lang, setLang] = useState('te');
  // 'portalHome' -> 'roleWelcome' -> 'auth' -> 'market' | 'cart' | 'checkout' | 'payment' | 'myOrders' | 'shopDashboard' | 'deliveryDashboard' | 'adminPanel'
  const [screen, setScreen] = useState('portalHome');
  const [shops, setShops] = useState(INITIAL_SHOPS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const [selectedRoleObj, setSelectedRoleObj] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

// Market Filters & Cart
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({});
  const [latestInvoice, setLatestInvoice] = useState(null);
  const [alertBanner, setAlertBanner] = useState('');

  // Checkout Address, GPS & Coupons/Promo Codes
  const [deliveryAddress, setDeliveryAddress] = useState('Vedayapalem, Nellore');
  const [gpsCoords, setGpsCoords] = useState({ lat: 14.4426, lng: 79.9865 });
  const [gpsStatus, setGpsStatus] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discountAmount, label }
  const [couponError, setCouponError] = useState('');

  // Dedicated Payment Page States (QR, PhonePe, GPay, Paytm, Other Apps, COD)
  const [selectedPayOption, setSelectedPayOption] = useState('qr'); // 'qr' | 'phonepe' | 'gpay' | 'paytm' | 'other' | 'cod'
  const [upiRefInput, setUpiRefInput] = useState('');

  // Admin Settings & Coupons
  const [merchantUpiId, setMerchantUpiId] = useState('8328261103@ybl');
  const [freeDeliveryMin, setFreeDeliveryMin] = useState(499);
  const [baseDeliveryFee, setBaseDeliveryFee] = useState(25);
  const [coupons, setCoupons] = useState([
    { code: 'RYTHU50', type: 'flat', value: 50, minOrder: 299, desc: 'Flat ₹50 Off on orders above ₹299' },
    { code: 'NELLORE10', type: 'percent', value: 10, minOrder: 199, desc: '10% Instant Discount (up to ₹150)' },
    { code: 'FRESH30', type: 'flat', value: 30, minOrder: 149, desc: '₹30 Off on Fresh Farm Produce' },
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState('');

  // Orders
  const [orders, setOrders] = useState([
    {
      id: 'RB-101',
      sellerId: 'shop_wholesale_1',
      buyerMobile: '9849223344',
      customer: 'Balaji Retail Mart (9849223344)',
      lat: 14.4285,
      lng: 79.9692,
      summary: '20 kg Onion Bulk Sack @ ₹23/kg',
      total: 460,
      payment: 'PhonePe Paid (UTR: 43198201)',
      period: 'today',
      status: 'Pending',
      driver: 'Unassigned',
    },
    {
      id: 'RB-102',
      sellerId: 'shop_retail_1',
      buyerMobile: '9876543210',
      customer: 'Customer (9876543210 • Magunta Layout)',
      lat: 14.4426,
      lng: 79.9865,
      summary: '2 kg Red Onion + 1 L Full Cream Milk',
      total: 132,
      payment: 'Google Pay Paid (UTR: 88219034)',
      period: 'today',
      status: 'Pending',
      driver: 'Ravi (Kovur)',
    },
    {
      id: 'RB-098',
      sellerId: 'shop_wholesale_1',
      buyerMobile: '9121334455',
      customer: 'Lakshmi Fresh Mart (9121334455)',
      lat: 14.4351,
      lng: 79.9722,
      summary: '50 kg Potato Bulk Crate @ ₹21/kg',
      total: 1050,
      payment: 'QR Scan Paid',
      period: 'week',
      status: 'Delivered',
      driver: 'Suresh (Nellore)',
    },
  ]);

  // Auth & Registration States
  const [authMode, setAuthMode] = useState('login');
  const [mobileInput, setMobileInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [authError, setAuthError] = useState('');

  const [regStoreName, setRegStoreName] = useState('');
  const [regOwnerName, setRegOwnerName] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPayType, setRegPayType] = useState('upi');
  const [regUpiId, setRegUpiId] = useState('');
  const [regBankAcc, setRegBankAcc] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhotoPreview, setRegPhotoPreview] = useState('');

  // Seller Dashboard States
  const [shopTab, setShopTab] = useState('orders');
  const [paymentPeriodFilter, setPaymentPeriodFilter] = useState('today');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editPriceVal, setEditPriceVal] = useState('');
  const [editMinQtyVal, setEditMinQtyVal] = useState('');

  const [newItemEn, setNewItemEn] = useState('');
  const [newItemTe, setNewItemTe] = useState('');
  const [newItemCat, setNewItemCat] = useState('vegetables');
  const [newItemUnit, setNewItemUnit] = useState('kg');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemMinQty, setNewItemMinQty] = useState('1');

  const [editUpi, setEditUpi] = useState('');
  const [editBank, setEditBank] = useState('');
  const [editCod, setEditCod] = useState(true);
  const [bankSavedMsg, setBankSavedMsg] = useState('');

 // Admin Panel Tabs & Search
  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'approvals' | 'items' | 'orders' | 'settings'
  const [adminItemSearch, setAdminItemSearch] = useState('');
  const [adminEditPriceId, setAdminEditPriceId] = useState(null);
  const [adminTempPrice, setAdminTempPrice] = useState('');

  const ROLE_CARDS = {
    customer: {
      id: 'customer',
      titleTe: 'వినియోగదారులు',
      titleEn: 'Shop for Fresh Produce',
      bannerTitle: 'For Customers',
      bannerSubtitle: 'Get Fresh & Healthy Produce Easily',
      heroImg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
      cardBg: 'bg-[#E8F6E8] border-[#CBEAC9]',
      iconEmoji: '🛒',
      pillars: [
        { icon: Leaf, label: 'Fresh Quality' },
        { icon: Truck, label: 'Home Delivery' },
        { icon: ShieldCheck, label: 'Healthy Life' },
      ],
    },
    farmer: {
      id: 'farmer',
      titleTe: 'రైతు విభాగం',
      titleEn: 'Farmers Section',
      bannerTitle: 'For Farmers',
      bannerSubtitle: 'Get the Best Price for Your Produce',
      heroImg: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=500&q=80',
      cardBg: 'bg-[#FDF0D5] border-[#F6DFB1]',
      iconEmoji: '👨‍🌾',
      pillars: [
        { icon: Sprout, label: 'Sell Directly' },
        { icon: Tag, label: 'Get Better Price' },
        { icon: Handshake, label: 'Grow Together' },
      ],
    },
    retail: {
      id: 'retail',
      titleTe: 'రిటైల్ షాపులు',
      titleEn: 'Retail Shops',
      bannerTitle: 'For Retailers',
      bannerSubtitle: 'Stock Fresh Produce for Your Shop',
      heroImg: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=500&q=80',
      cardBg: 'bg-[#FDF1D6] border-[#F5E0B5]',
      iconEmoji: '🏪',
      pillars: [
        { icon: Store, label: 'Easy Ordering' },
        { icon: Percent, label: 'Great Margins' },
        { icon: TrendingUp, label: 'Grow Business' },
      ],
    },
    wholesale: {
      id: 'wholesale',
      titleTe: 'హోల్‌సేల్ వ్యాపారులు',
      titleEn: 'Wholesale Mandi',
      bannerTitle: 'For Wholesale',
      bannerSubtitle: 'Buy & Sell Fresh Produce in Bulk',
      heroImg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
      cardBg: 'bg-[#E5F2FA] border-[#C8E3F5]',
      iconEmoji: '🏭',
      pillars: [
        { icon: ShoppingCart, label: 'Bulk Purchase' },
        { icon: Tag, label: 'Best Rates' },
        { icon: Truck, label: 'Reliable Supply' },
      ],
    },
    delivery: {
      id: 'delivery',
      titleTe: 'డెలివరీ పార్టనర్',
      titleEn: 'Delivery & Maps',
      bannerTitle: 'For Delivery',
      bannerSubtitle: 'Deliver Fresh Produce Faster & Safer',
      heroImg: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=500&q=80',
      cardBg: 'bg-[#ECE9FA] border-[#D8D1F5]',
      iconEmoji: '🛵',
      pillars: [
        { icon: Zap, label: 'Quick Delivery' },
        { icon: ShieldCheck, label: 'Safe & Secure' },
        { icon: Heart, label: 'Happy Customers' },
      ],
    },
    admin: {
      id: 'admin',
      titleTe: 'అడ్మిన్ (Admin)',
      titleEn: 'Admin Login',
      bannerTitle: 'For Master Admin',
      bannerSubtitle: 'Verify Shops, Prices, Coupons & Nellore Orders',
      heroImg: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=500&q=80',
      cardBg: 'bg-[#E3F4F4] border-[#C4E6E6]',
      iconEmoji: '🛡️',
      pillars: [
        { icon: ShieldCheck, label: 'Shop Approvals' },
        { icon: Tag, label: 'Price & Coupons' },
        { icon: Truck, label: 'Live Tracking' },
      ],
    },
  };

  const categories = [
    { id: 'all', nameEn: 'All', nameTe: 'అన్నీ', emoji: '🧺' },
    { id: 'vegetables', nameEn: 'Vegetables', nameTe: 'కూరగాయలు', emoji: '🍅' },
    { id: 'fruits', nameEn: 'Fruits', nameTe: 'పండ్లు', emoji: '🥭' },
    { id: 'dairy', nameEn: 'Dairy', nameTe: 'పాల ఉత్పత్తులు', emoji: '🥛' },
    { id: 'beverages', nameEn: 'Beverages', nameTe: 'పానీయాలు', emoji: '🥥' },
    { id: 'livestock', nameEn: 'Eggs & Poultry', nameTe: 'గుడ్లు, కోళ్లు', emoji: '🐓' },
  ];

  const handlePickRoleCard = (roleKey) => {
    setSelectedRoleObj(ROLE_CARDS[roleKey]);
    setScreen('roleWelcome');
  };

  const handleContinueFromWelcome = () => {
    setMobileInput('');
    setPasswordInput('');
    setOtpInput('');
    setOtpSent(false);
    setAuthError('');
    setAuthMode('login');
    setScreen('auth');
  };

// Products & Cart Calculations
  const approvedShopIds = new Set(shops.filter((s) => s.approved).map((s) => s.id));
  const visibleProducts = products.filter((p) => {
    const isApproved = approvedShopIds.has(p.sellerId);
    const catOk = selectedCat === 'all' || p.cat === selectedCat;
    const srcOk = selectedSourceFilter === 'all' || p.sellerType === selectedSourceFilter;
    const q = search.toLowerCase();
    return isApproved && catOk && srcOk && (p.nameEn.toLowerCase().includes(q) || p.nameTe.includes(q));
  });

  const addItem = (product) => {
    setCart((prev) => {
      const current = prev[product.id] || 0;
      const step = current === 0 ? product.minQty : 1;
      return { ...prev, [product.id]: current + step };
    });
  };

  const removeItem = (product) => {
    setCart((prev) => {
      const current = prev[product.id] || 0;
      const next = { ...prev };
      if (current <= product.minQty) delete next[product.id];
      else next[product.id] = current - 1;
      return next;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((item) => item.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= freeDeliveryMin ? 0 : baseDeliveryFee;

  // Coupon / Promo Code Calculation
  const couponDiscount = (() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    if (subtotal < appliedCoupon.minOrder) return 0;
    if (appliedCoupon.type === 'flat') return appliedCoupon.value;
    return Math.min(150, Math.round((subtotal * appliedCoupon.value) / 100));
  })();

  const grandTotal = Math.max(0, subtotal + deliveryFee - couponDiscount);

  const handleApplyPromoCode = (codeStr) => {
    const clean = (codeStr || promoCodeInput).trim().toUpperCase();
    const found = coupons.find((c) => c.code === clean);
    if (!found) {
      setCouponError('Invalid Promo Code! Try RYTHU50, NELLORE10, or FRESH30');
      return;
    }
    if (subtotal < found.minOrder) {
      setCouponError(`Minimum order ₹${found.minOrder} required for ${found.code}`);
      return;
    }
    setAppliedCoupon(found);
    setPromoCodeInput(found.code);
    setCouponError('');
  };

  // GPS & Invoices
  const handleCaptureGps = () => {
    if (!navigator.geolocation) return;
    setGpsStatus(lang === 'te' ? 'GPS తీసుకుంటోంది...' : 'Fetching GPS...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lng = Number(pos.coords.longitude.toFixed(5));
        setGpsCoords({ lat, lng });
        setGpsStatus(`📍 GPS Pinned (${lat}, ${lng})`);
      },
      () => {
        setGpsCoords({ lat: 14.4426, lng: 79.9865 });
        setGpsStatus('📍 Nellore Pinned (14.4426, 79.9865)');
      }
    );
  };

  const buildInvoiceText = (ord) =>
    `RYTHU BASKET NELLORE - INVOICE\nOrder ID: ${ord.id}\nCustomer: ${ord.customer}\nItems: ${ord.summary}\nTotal Paid: Rs.${ord.total}\nPayment: ${ord.payment}\nStatus: DELIVERED`;

  const getWhatsAppInvoiceLink = (ord) => {
    const phone = `91${(ord.buyerMobile || '9876543210').replace(/\D/g, '').slice(-10)}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(buildInvoiceText(ord))}`;
  };

  const getSmsInvoiceLink = (ord) => {
    const phone = `+91${(ord.buyerMobile || '9876543210').replace(/\D/g, '').slice(-10)}`;
    return `sms:${phone}?body=${encodeURIComponent(buildInvoiceText(ord))}`;
  };

  const handleMarkOrderDelivered = (ord) => {
    const updatedOrd = { ...ord, status: 'Delivered' };
    setOrders((prev) => prev.map((o) => (o.id === ord.id ? updatedOrd : o)));
    setLatestInvoice(updatedOrd);
    window.open(getWhatsAppInvoiceLink(updatedOrd), '_blank');
  };

  // Final Order Confirmation from Dedicated Payment Screen
  const handleConfirmFinalPayment = () => {
    const entries = Object.entries(cart);
    if (entries.length === 0) return;
    const firstProd = products.find((p) => p.id === entries[0][0]);
    const itemLines = entries
      .map(([id, qty]) => {
        const p = products.find((x) => x.id === id);
        return p ? `${qty} ${p.unit} ${p.nameEn} (₹${p.price * qty})` : '';
      })
      .filter(Boolean)
      .join(', ');

    const payLabels = {
      qr: 'QR Code Scan',
      phonepe: 'PhonePe UPI',
      gpay: 'Google Pay (GPay)',
      paytm: 'Paytm UPI',
      other: 'Other UPI App',
      cod: 'Cash on Delivery (COD)',
    };

    const paymentStr =
      selectedPayOption === 'cod'
        ? 'Cash on Delivery (COD)'
        : `${payLabels[selectedPayOption]}${upiRefInput.trim() ? ' (UTR: ' + upiRefInput.trim() + ')' : ''}`;

    const newOrd = {
      id: 'RB-' + Math.floor(105 + Math.random() * 890),
      sellerId: firstProd?.sellerId || 'shop_retail_1',
      buyerMobile: loggedInUser?.mobile || '9876543210',
      customer: `${loggedInUser?.name || 'Buyer'} (${loggedInUser?.mobile || '9876543210'} • ${deliveryAddress})`,
      lat: gpsCoords.lat,
      lng: gpsCoords.lng,
      summary: itemLines + (appliedCoupon ? ` [Coupon: ${appliedCoupon.code} -₹${couponDiscount}]` : ''),
      total: grandTotal,
      payment: paymentStr,
      period: 'today',
      status: 'Pending',
      driver: 'Unassigned',
    };

    setOrders([newOrd, ...orders]);
    setCart({});
    setAppliedCoupon(null);
    setPromoCodeInput('');
    setUpiRefInput('');
    setAlertBanner(`✅ Order ${newOrd.id} Confirmed via ${payLabels[selectedPayOption]}! Total: ₹${grandTotal}`);
    setScreen('market');
  };

// Auth Handlers
  const handleSendOtp = () => {
    if (mobileInput.replace(/\D/g, '').length !== 10) {
      setAuthError('10 అంకెల మొబైల్ నంబర్ ఇవ్వండి');
      return;
    }
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(code);
    setOtpSent(true);
    setAuthError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const roleId = selectedRoleObj.id;

    if (roleId === 'customer' || roleId === 'admin') {
      if (otpInput.trim() !== generatedOtp) {
        setAuthError('తప్పు OTP! మళ్ళీ ప్రయత్నించండి');
        return;
      }
      setLoggedInUser({ role: selectedRoleObj, mobile: mobileInput, name: selectedRoleObj.titleEn });
      setScreen(roleId === 'admin' ? 'adminPanel' : 'market');
      return;
    }

    const matchedShop = shops.find((s) => s.role === roleId && s.mobile === mobileInput);
    if (!matchedShop) {
      setAuthError('ఈ నంబర్ రిజిస్టర్ కాలేదు. ముందుగా New Registration చేయండి.');
      return;
    }
    if (matchedShop.password !== passwordInput) {
      setAuthError('Password తప్పుగా ఉంది!');
      return;
    }

    setLoggedInUser({
      role: selectedRoleObj,
      mobile: matchedShop.mobile,
      shopId: matchedShop.id,
      name: matchedShop.storeName,
    });
    setEditUpi(matchedShop.upiId || '');
    setEditBank(matchedShop.bankAccount || '');
    setEditCod(matchedShop.acceptCod);
    setShopTab('orders');
    setScreen(roleId === 'delivery' ? 'deliveryDashboard' : 'shopDashboard');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setRegPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (mobileInput.replace(/\D/g, '').length !== 10) {
      setAuthError('10 అంకెల మొబైల్ నంబర్ ఇవ్వండి');
      return;
    }
    if (!regStoreName.trim() || !regOwnerName.trim() || !regAddress.trim() || !regPassword.trim()) {
      setAuthError('అన్ని వివరాలను తప్పనిసరిగా పూరించండి');
      return;
    }
    if ((selectedRoleObj.id === 'wholesale' || selectedRoleObj.id === 'retail') && !regPhotoPreview) {
      setAuthError('షాపు ఫోటో అప్‌లోడ్ చేయడం తప్పనిసరి (Admin Verification కోసం)');
      return;
    }

    const newShopId = 'shop_' + Date.now();
    const needsAdminApproval = selectedRoleObj.id === 'wholesale' || selectedRoleObj.id === 'retail';

    const newShopObj = {
      id: newShopId,
      role: selectedRoleObj.id,
      storeName: regStoreName.trim(),
      ownerName: regOwnerName.trim(),
      mobile: mobileInput,
      password: regPassword,
      address: regAddress.trim(),
      upiId: regUpiId.trim(),
      bankAccount: regBankAcc.trim(),
      acceptCod: true,
      photoUrl: regPhotoPreview || CAT_IMG.vegetables,
      approved: !needsAdminApproval,
    };

    setShops([newShopObj, ...shops]);
    setLoggedInUser({
      role: selectedRoleObj,
      mobile: newShopObj.mobile,
      shopId: newShopId,
      name: newShopObj.storeName,
    });
    setEditUpi(newShopObj.upiId);
    setEditBank(newShopObj.bankAccount);
    setShopTab('orders');

    if (needsAdminApproval) {
      setAlertBanner('⏳ మీ షాపు ఫోటో Admin వెరిఫికేషన్‌కు పంపబడింది. Admin Approve చేసిన తర్వాత మీ షాపు కనిపిస్తుంది.');
    }
    setScreen(selectedRoleObj.id === 'delivery' ? 'deliveryDashboard' : 'shopDashboard');
  };

  const handleAddShopItem = (e) => {
    e.preventDefault();
    if (!newItemEn.trim() || !newItemPrice || !loggedInUser) return;
    const newProd = {
      id: 'prod_' + Date.now(),
      sellerId: loggedInUser.shopId,
      sellerType: loggedInUser.role.id,
      sellerName: loggedInUser.name,
      nameEn: newItemEn.trim(),
      nameTe: newItemTe.trim() || newItemEn.trim(),
      unit: newItemUnit,
      minQty: loggedInUser.role.id === 'wholesale' ? Math.max(1, Number(newItemMinQty)) : 1,
      price: Number(newItemPrice),
      oldPrice: Math.round(Number(newItemPrice) * 1.2),
      cat: newItemCat,
      inStock: true,
      img: CAT_IMG[newItemCat] || CAT_IMG.vegetables,
    };
    setProducts([newProd, ...products]);
    setNewItemEn('');
    setNewItemTe('');
    setNewItemPrice('');
    setAlertBanner(`✅ ${newProd.nameEn} added to your inventory!`);
  };

const currentShopRecord = shops.find((s) => s.id === loggedInUser?.shopId);
  const myShopProducts = products.filter((p) => p.sellerId === loggedInUser?.shopId);
  const myShopOrders = orders.filter((o) => o.sellerId === loggedInUser?.shopId);
  const filteredPaymentOrders = myShopOrders.filter((o) => o.period === paymentPeriodFilter);
  const filteredPaymentSum = filteredPaymentOrders.reduce((s, o) => s + o.total, 0);

  // Payment Links for QR, PhonePe, Google Pay, Paytm, Other UPI Apps
  const activeSellerShop = (() => {
    const firstId = Object.keys(cart)[0];
    const prod = products.find((p) => p.id === firstId);
    return shops.find((s) => s.id === prod?.sellerId);
  })();
  const payUpiId = activeSellerShop?.upiId || merchantUpiId;
  const payName = encodeURIComponent(activeSellerShop?.storeName || 'Rythu Basket Nellore');
  const genericUpiUri = `upi://pay?pa=${encodeURIComponent(payUpiId)}&pn=${payName}&am=${grandTotal}&cu=INR`;
  const phonePeUri = `phonepe://pay?pa=${encodeURIComponent(payUpiId)}&pn=${payName}&am=${grandTotal}&cu=INR`;
  const gpayUri = `tez://upi/pay?pa=${encodeURIComponent(payUpiId)}&pn=${payName}&am=${grandTotal}&cu=INR`;
  const paytmUri = `paytmmp://pay?pa=${encodeURIComponent(payUpiId)}&pn=${payName}&am=${grandTotal}&cu=INR`;
  const freeQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(genericUpiUri)}`;

  // =========================================================================
  // VIEW 1: HOME SCREEN AS IT IS (1000043358_2.png) WITH ONLY 'HOME' AT BOTTOM
  // =========================================================================
  if (screen === 'portalHome') {
    return (
      <div className="min-h-screen bg-[#FAF8F2] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl overflow-x-hidden">
        {/* TOP FOREST-GREEN HERO HEADER WITH YOUR UNCHANGED LOGO */}
        <div className="bg-gradient-to-b from-[#0E6A2E] via-[#1B8A3D] to-[#74C365] text-white rounded-b-[36px] px-4 pt-5 pb-7 relative overflow-hidden shadow-md">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-2.5">
              <div className="h-14 w-14 rounded-full bg-white p-0.5 shadow-lg border-2 border-yellow-300 overflow-hidden flex-shrink-0">
                <img src="/icon-512.png" alt="Rythu Basket Logo" className="h-full w-full object-cover rounded-full" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none drop-shadow-sm">
                  రైతు బాస్కెట్
                </h1>
                <p className="text-xs font-extrabold text-yellow-200 mt-0.5">Rythu Basket</p>
                <p className="text-[10px] text-emerald-100 font-medium">
                  రైతు నుండి వినియోగదారుడి వరకు...
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLang(lang === 'te' ? 'en' : 'te')}
                className="bg-white text-[#0E6A2E] text-xs font-extrabold px-3 py-1.5 rounded-full shadow flex items-center space-x-1"
              >
                <span>🌐</span>
                <span>{lang === 'te' ? 'తెలుగు' : 'English'}</span>
              </button>
              <button
                onClick={() => handlePickRoleCard('admin')}
                className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center relative"
              >
                <Bell className="h-4 w-4 text-white" />
                <span className="h-2 w-2 rounded-full bg-red-500 absolute top-2 right-2"></span>
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between relative z-10">
            <div className="max-w-[58%] space-y-2.5">
              <p className="text-sm font-extrabold text-[#0A471E] bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-lg inline-block">
                మా రైతు ఉత్పత్తులు
              </p>
              <h2 className="text-2xl font-black text-[#093D19] leading-tight drop-shadow-sm">
                మీ ఇంటి వద్దకు!
              </h2>
              <button
                onClick={() => handlePickRoleCard('customer')}
                className="bg-[#126E2E] hover:bg-[#0D5723] text-white text-xs font-extrabold px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-1.5 active:scale-95 transition"
              >
                <span>ఇప్పుడే ఆర్డర్ చేయండి</span>
                <span>➔</span>
              </button>
            </div>

            <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-lg border-2 border-white/50 flex-shrink-0 bg-emerald-100">
              <img
                src="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=400&q=80"
                alt="Fresh Harvest"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-1.5 mt-2.5">
          <span className="h-2 w-2 rounded-full bg-[#126E2E]"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
        </div>

        {/* 2-COLUMN ROLE CARDS */}
        <div className="px-4 pt-3 grid grid-cols-2 gap-3">
          {Object.values(ROLE_CARDS).map((rc) => (
            <button
              key={rc.id}
              onClick={() => handlePickRoleCard(rc.id)}
              className={`${rc.cardBg} border rounded-2xl p-3 flex items-center justify-between shadow-sm hover:shadow-md active:scale-[0.98] transition text-left`}
            >
              <div className="flex items-center space-x-2.5">
                <div className="h-11 w-11 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center text-2xl flex-shrink-0">
                  {rc.iconEmoji}
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-900 leading-tight">{rc.titleTe}</h3>
                  <p className="text-[10px] font-bold text-gray-600 mt-0.5 leading-tight">{rc.titleEn}</p>
                </div>
              </div>
              <span className="h-6 w-6 rounded-full bg-white/80 flex items-center justify-center text-gray-700 flex-shrink-0">
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </button>
          ))}
        </div>

        {/* CONTACT SUPPORT BANNER */}
        <div className="px-4 mt-3.5">
          <div className="bg-gradient-to-r from-[#146B2E] to-[#238E43] rounded-2xl p-3.5 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                🎧
              </div>
              <div>
                <h4 className="text-sm font-black">సహాయం కావాలా?</h4>
                <p className="text-[11px] text-emerald-100">Contact Support • Nellore</p>
              </div>
            </div>
            <a
              href="tel:8328261103"
              className="bg-white text-[#146B2E] text-xs font-black px-3.5 py-2 rounded-full shadow flex items-center space-x-1"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

        {/* RYTHU BASKET HIGHLIGHTS */}
        <div className="px-4 mt-3.5">
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-emerald-100">
            <div className="flex items-center space-x-1.5 mb-2.5">
              <Leaf className="h-4 w-4 text-[#1B8A3D]" />
              <h4 className="text-xs font-black text-[#115E28]">Rythu Basket Highlights</h4>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { icon: Leaf, text: '100% Fresh Produce' },
                { icon: Sprout, text: 'Direct from Farmers' },
                { icon: ShieldCheck, text: 'Safe & Secure Payments' },
                { icon: Truck, text: 'Fast Delivery' },
              ].map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="flex flex-col items-center space-y-1">
                    <div className="h-9 w-9 rounded-full bg-emerald-50 text-[#1B8A3D] flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[9px] font-bold text-gray-700 leading-tight">{h.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM NAVIGATION BAR WITH ONLY 'HOME' OPTION ON HOME SCREEN */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0C4A20] text-white rounded-t-[26px] px-5 py-2.5 flex items-center justify-center shadow-2xl z-40">
          <button
            onClick={() => setScreen('portalHome')}
            className="bg-[#C8E99A] text-[#0C4A20] font-black text-xs px-8 py-2.5 rounded-full flex items-center space-x-2 shadow-md"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>
        </nav>
      </div>
    );
  }

// =========================================================================
  // VIEW 2: ROLE WELCOME SCREEN (2ND IMAGE THEME)
  // =========================================================================
  if (screen === 'roleWelcome' && selectedRoleObj) {
    return (
      <div className="min-h-screen bg-[#FAF6E9] max-w-md mx-auto font-sans text-gray-800 shadow-2xl flex flex-col justify-between pb-6">
        <div>
          <div className="bg-gradient-to-b from-[#BCE4FA] via-[#E4F4FD] to-[#FAF6E9] pt-5 px-5 pb-4 relative">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setScreen('portalHome')}
                className="h-9 w-9 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-700"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center space-x-2">
                <div className="h-12 w-12 rounded-full bg-white p-0.5 shadow border-2 border-[#1B8A3D] overflow-hidden">
                  <img src="/icon-512.png" alt="Rythu Basket Logo" className="h-full w-full object-cover rounded-full" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-[#0E5A27] leading-tight">రైతు బాస్కెట్</h2>
                  <p className="text-[11px] font-extrabold text-[#1B8A3D]">Rythu Basket</p>
                  <p className="text-[9px] text-gray-600 italic">Farm to Everyone...</p>
                </div>
              </div>

              <div className="w-9" />
            </div>

            <div className="text-center mt-2">
              <h1 className="text-3xl font-black text-[#12682B] tracking-tight drop-shadow-sm">
                {selectedRoleObj.bannerTitle}
              </h1>
              <div className="w-28 h-1 bg-amber-400 rounded-full mx-auto my-1.5"></div>
              <p className="text-sm font-extrabold text-gray-800">{selectedRoleObj.bannerSubtitle}</p>
            </div>

            <div className="mt-4 h-56 w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white">
              <img src={selectedRoleObj.heroImg} alt={selectedRoleObj.bannerTitle} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="px-5 -mt-4 relative z-10">
            <div className="bg-[#FFFDF5] rounded-3xl p-4 shadow-md border border-amber-100 grid grid-cols-3 gap-2 text-center">
              {selectedRoleObj.pillars.map((pil, idx) => {
                const Icon = pil.icon;
                return (
                  <div key={idx} className="flex flex-col items-center space-y-1.5">
                    <div className="h-10 w-10 rounded-full bg-emerald-50 text-[#12682B] flex items-center justify-center shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-extrabold text-gray-800 leading-tight">{pil.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-6 pt-5 space-y-3 text-center">
          <button
            onClick={handleContinueFromWelcome}
            className="w-full bg-gradient-to-r from-[#0E6A2E] to-[#1E8E3E] text-white font-black text-base py-3.5 rounded-full shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition"
          >
            <span>Continue</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: AUTHENTICATION & REGISTRATION SCREEN
  // =========================================================================
  if (screen === 'auth' && selectedRoleObj) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] max-w-md mx-auto font-sans text-gray-800 shadow-2xl pb-10">
        <div className="bg-gradient-to-r from-[#0E6A2E] to-[#1B8A3D] text-white rounded-b-[30px] px-5 pt-5 pb-6 shadow-md">
          <div className="flex items-center space-x-3">
            <button onClick={() => setScreen('roleWelcome')} className="p-2 bg-white/20 rounded-full">
              <ArrowLeft className="h-4 w-4 text-white" />
            </button>
            <div className="h-11 w-11 rounded-full bg-white p-0.5 overflow-hidden">
              <img src="/icon-512.png" alt="Logo" className="h-full w-full object-cover rounded-full" />
            </div>
            <div>
              <h2 className="text-base font-black">{selectedRoleObj.titleTe} • {selectedRoleObj.bannerTitle}</h2>
              <p className="text-[11px] text-emerald-100">
                {selectedRoleObj.id === 'customer' || selectedRoleObj.id === 'admin'
                  ? 'Mobile Number + OTP Login'
                  : 'Login or First-Time Registration'}
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 pt-5">
          <div className="bg-white rounded-3xl p-5 shadow-md border border-emerald-100 space-y-4">
            {selectedRoleObj.id === 'customer' || selectedRoleObj.id === 'admin' ? (
              <div className="space-y-3">
                <input
                  type="tel"
                  maxLength={10}
                  value={mobileInput}
                  onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-Digit Mobile Number (e.g., 8328261103)"
                  className="w-full bg-[#FAF8F2] border border-emerald-200 rounded-xl px-3.5 py-2.5 text-sm font-bold"
                />
                {!otpSent ? (
                  <button onClick={handleSendOtp} className="w-full bg-[#126E2E] text-white font-extrabold text-xs py-3 rounded-xl shadow">
                    Send OTP
                  </button>
                ) : (
                  <>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-center text-xs font-black text-[#126E2E]">
                      Demo OTP: {generatedOtp}
                    </div>
                    <input
                      type="tel"
                      maxLength={4}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 4-Digit OTP"
                      className="w-full bg-[#FAF8F2] border border-emerald-200 rounded-xl px-3.5 py-2.5 text-center text-base font-black tracking-[0.4em]"
                    />
                    <button onClick={handleLoginSubmit} className="w-full bg-[#126E2E] text-white font-extrabold text-xs py-3 rounded-xl shadow">
                      Verify OTP & Continue
                    </button>
                  </>
                )}
                {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 bg-[#FAF8F2] p-1 rounded-xl text-xs font-extrabold border">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className={`py-2 rounded-lg ${authMode === 'login' ? 'bg-[#126E2E] text-white shadow-sm' : 'text-gray-600'}`}
                  >
                    Existing Login
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className={`py-2 rounded-lg ${authMode === 'register' ? 'bg-[#126E2E] text-white shadow-sm' : 'text-gray-600'}`}
                  >
                    New Registration
                  </button>
                </div>

                {authMode === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-3">
                    <p className="text-[10px] text-gray-500">
                      Demo: Wholesale `9989334455`, Retail `9849223344`, Farmer `9440112233` (Password: `123`)
                    </p>
                    <input type="tel" maxLength={10} required value={mobileInput} onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))} placeholder="Registered 10-Digit Phone Number" className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2.5 text-xs font-bold" />
                    <input type="password" required value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Password" className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2.5 text-xs font-bold" />
                    {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}
                    <button type="submit" className="w-full bg-[#126E2E] text-white font-extrabold text-xs py-3 rounded-xl shadow">
                      Login to Dashboard
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-2.5 text-xs">
                    <input type="text" required value={regStoreName} onChange={(e) => setRegStoreName(e.target.value)} placeholder="Name of the Store / Farm *" className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-bold" />
                    <input type="text" required value={regOwnerName} onChange={(e) => setRegOwnerName(e.target.value)} placeholder="Owner Name *" className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-bold" />
                    <input type="tel" maxLength={10} required value={mobileInput} onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))} placeholder="Phone Number (10 digits) *" className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-bold" />
                    <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Full Address in Nellore *" className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-bold" />

                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 space-y-2">
                      <label className="block font-extrabold text-emerald-900">Payment Receive Details *</label>
                      <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                        {['upi', 'bank', 'cod'].map((pt) => (
                          <button key={pt} type="button" onClick={() => setRegPayType(pt)} className={`py-1.5 rounded-lg border uppercase ${regPayType === pt ? 'bg-[#126E2E] text-white' : 'bg-white'}`}>
                            {pt}
                          </button>
                        ))}
                      </div>
                      {regPayType === 'upi' && (
                        <input type="text" required value={regUpiId} onChange={(e) => setRegUpiId(e.target.value)} placeholder="UPI ID (e.g., 9849223344@ybl) *" className="w-full bg-white border rounded-lg px-2.5 py-1.5 font-bold" />
                      )}
                      {regPayType === 'bank' && (
                        <input type="text" required value={regBankAcc} onChange={(e) => setRegBankAcc(e.target.value)} placeholder="Bank Account Number & IFSC *" className="w-full bg-white border rounded-lg px-2.5 py-1.5 font-bold" />
                      )}
                    </div>

                    <input type="password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Create Password *" className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-bold" />

                    {(selectedRoleObj.id === 'wholesale' || selectedRoleObj.id === 'retail') && (
                      <div className="border-2 border-dashed border-emerald-300 rounded-xl p-3 text-center space-y-1.5 bg-emerald-50/40">
                        <label className="cursor-pointer flex flex-col items-center space-y-1">
                          <Camera className="h-5 w-5 text-[#126E2E]" />
                          <span className="font-extrabold text-gray-700">Upload Shop Photo (Admin Approval కోసం) *</span>
                          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </label>
                        {regPhotoPreview && <img src={regPhotoPreview} alt="Preview" className="h-24 w-full object-cover rounded-lg mt-1" />}
                      </div>
                    )}

                    {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}
                    <button type="submit" className="w-full bg-[#126E2E] text-white font-extrabold py-3 rounded-xl shadow">
                      Complete Registration
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

// =========================================================================
  // VIEW 4: ROLE-SPECIFIC PAGES (MARKET, CART, CHECKOUT+COUPONS, PAYMENT PAGE, ADMIN, SHOPS)
  // =========================================================================
  const roleId = loggedInUser?.role?.id;

  return (
    <div className="min-h-screen bg-[#FAF8F2] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
      {/* Forest-Green Header */}
      <header className="bg-gradient-to-r from-[#0E6A2E] to-[#1B8A3D] text-white rounded-b-[28px] px-4 pt-4 pb-4 shadow-md sticky top-0 z-30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2.5">
            <div className="h-11 w-11 rounded-full bg-white p-0.5 shadow border-2 border-yellow-300 overflow-hidden">
              <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-base font-black leading-tight">రైతు బాస్కెట్</h1>
              <p className="text-[11px] text-emerald-100 font-semibold truncate max-w-[180px]">
                {loggedInUser?.name} • {loggedInUser?.mobile}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button onClick={() => setLang(lang === 'te' ? 'en' : 'te')} className="bg-white text-[#0E6A2E] text-[11px] font-extrabold px-2.5 py-1 rounded-full">
              {lang === 'te' ? 'తెలుగు' : 'EN'}
            </button>
            <button
              onClick={() => {
                setLoggedInUser(null);
                setScreen('portalHome');
              }}
              className="bg-white/20 p-2 rounded-full text-white"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {screen === 'market' && (
          <div className="relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Farmer, Retail & Wholesale items..."
              className="w-full bg-white text-gray-800 text-xs font-medium rounded-xl py-2 pl-9 pr-4 focus:outline-none"
            />
          </div>
        )}
      </header>

      {alertBanner && (
        <div className="mx-4 mt-3 bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-start justify-between text-xs font-extrabold text-amber-900">
          <span>{alertBanner}</span>
          <button onClick={() => setAlertBanner('')} className="ml-2">✕</button>
        </div>
      )}

      {latestInvoice && (
        <div className="mx-4 mt-3 bg-white border-2 border-[#126E2E] rounded-2xl p-4 shadow-lg space-y-2 text-xs">
          <div className="flex justify-between font-black text-[#126E2E] border-b pb-1">
            <span>✅ DELIVERED & INVOICE ({latestInvoice.id})</span>
            <button onClick={() => setLatestInvoice(null)}>✕</button>
          </div>
          <p><strong>To:</strong> {latestInvoice.customer} • <strong>₹{latestInvoice.total}</strong></p>
          <div className="grid grid-cols-2 gap-2">
            <a href={getWhatsAppInvoiceLink(latestInvoice)} target="_blank" rel="noreferrer" className="bg-[#25D366] text-white font-extrabold py-2 rounded-xl text-center">
              WhatsApp Bill
            </a>
            <a href={getSmsInvoiceLink(latestInvoice)} className="bg-blue-600 text-white font-extrabold py-2 rounded-xl text-center">
              SMS Text Bill
            </a>
          </div>
        </div>
      )}

{/* =================================================================
          MARKETPLACE (FOR CUSTOMERS, RETAILERS & WHOLESALERS TO BUY)
         ================================================================= */}
      {screen === 'market' && (
        <main className="px-4 pt-3.5 space-y-3.5">
          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Sellers' },
              { id: 'farmer', label: '🌾 Farmers' },
              { id: 'retail', label: '🏪 Retail Shops' },
              { id: 'wholesale', label: '🏭 Wholesale (Min Qty)' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSourceFilter(s.id)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                  selectedSourceFilter === s.id ? 'bg-[#126E2E] text-white border-[#126E2E]' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-2xl border flex items-center space-x-1.5 text-[11px] font-extrabold ${
                  selectedCat === cat.id ? 'bg-[#E8F6E8] border-[#126E2E] text-[#126E2E]' : 'bg-white border-gray-100'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{lang === 'te' ? cat.nameTe : cat.nameEn}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {visibleProducts.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div key={item.id} className="bg-white rounded-2xl p-2.5 shadow-sm border border-emerald-50 flex flex-col justify-between">
                  <div>
                    <div className="h-24 w-full rounded-xl bg-gray-50 overflow-hidden mb-2 relative">
                      <img src={item.img} alt={item.nameEn} className="h-full w-full object-cover" />
                      <span className={`absolute top-1 left-1 text-[8px] font-black px-1.5 py-0.5 rounded uppercase text-white ${item.sellerType === 'farmer' ? 'bg-green-700' : item.sellerType === 'wholesale' ? 'bg-indigo-700' : 'bg-amber-600'}`}>
                        {item.sellerType}
                      </span>
                      {item.minQty > 1 && (
                        <span className="absolute bottom-1 left-1 bg-amber-300 text-gray-900 text-[9px] font-black px-1.5 py-0.5 rounded">
                          Min: {item.minQty} {item.unit}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-extrabold text-gray-900">{lang === 'te' ? item.nameTe : item.nameEn}</h4>
                    <p className="text-[9px] text-gray-500 font-semibold truncate">{item.sellerName}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1">
                    <span className="text-xs font-black text-[#126E2E]">₹{item.price}/{item.unit}</span>
                    {qty === 0 ? (
                      <button onClick={() => addItem(item)} className="px-2.5 py-1 rounded-lg bg-[#126E2E] text-white text-[10px] font-extrabold">
                        + {item.minQty > 1 ? `Add ${item.minQty}` : 'Add'}
                      </button>
                    ) : (
                      <div className="flex items-center bg-[#126E2E] text-white rounded-lg px-1.5 py-1 space-x-1.5">
                        <button onClick={() => removeItem(item)}><Minus className="h-3 w-3" /></button>
                        <span className="text-[11px] font-bold">{qty}</span>
                        <button onClick={() => addItem(item)}><Plus className="h-3 w-3" /></button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* =================================================================
          STEP 1: CART PAGE -> PROCEED TO CHECKOUT
         ================================================================= */}
      {screen === 'cart' && (
        <main className="px-4 pt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <button onClick={() => setScreen('market')} className="p-1.5 bg-white rounded-full shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h2 className="text-base font-black">Step 1: My Cart ({totalItems} items)</h2>
          </div>

          {totalItems === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm space-y-3">
              <p className="text-xs font-bold text-gray-500">Your cart is empty.</p>
              <button onClick={() => setScreen('market')} className="bg-[#126E2E] text-white text-xs font-extrabold px-5 py-2.5 rounded-xl">
                Browse Items
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = products.find((p) => p.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm text-xs">
                      <div>
                        <h4 className="font-extrabold">{item.nameTe} ({item.nameEn})</h4>
                        <p className="text-[10px] text-gray-500">
                          ₹{item.price}/{item.unit} × {qty} = ₹{item.price * qty}
                          {item.minQty > 1 ? ` (Wholesale Min: ${item.minQty})` : ''}
                        </p>
                      </div>
                      <div className="flex items-center bg-[#126E2E] text-white rounded-lg px-2 py-1 space-x-2">
                        <button onClick={() => removeItem(item)}><Minus className="h-3 w-3" /></button>
                        <span>{qty}</span>
                        <button onClick={() => addItem(item)}><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2 text-xs">
                <div className="flex justify-between font-bold text-gray-600">
                  <span>Items Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <button
                  onClick={() => setScreen('checkout')}
                  className="w-full bg-[#126E2E] text-white font-extrabold py-3.5 rounded-xl shadow-md text-sm"
                >
                  Proceed to Checkout & Coupons ➔
                </button>
              </div>
            </>
          )}
        </main>
      )}

{/* =================================================================
          STEP 2: CHECKOUT SCREEN (ADDRESS + PROMO CODES & COUPONS) -> PAYMENT PAGE
         ================================================================= */}
      {screen === 'checkout' && (
        <main className="px-4 pt-4 space-y-3.5 text-xs">
          <div className="flex items-center space-x-2">
            <button onClick={() => setScreen('cart')} className="p-1.5 bg-white rounded-full shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h2 className="text-base font-black">Step 2: Checkout & Promo Codes</h2>
          </div>

          {/* Delivery Address & GPS */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
            <div className="flex justify-between font-extrabold">
              <span>📍 Delivery Address & Live GPS</span>
              <button onClick={handleCaptureGps} className="text-[#126E2E] bg-emerald-50 px-2.5 py-1 rounded-lg">
                Pin GPS
              </button>
            </div>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-semibold"
            />
            {gpsStatus && <p className="text-[10px] text-emerald-700 font-bold">{gpsStatus}</p>}
          </div>

          {/* PROMO CODES & COUPONS SECTION */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-amber-200 space-y-2.5">
            <div className="flex items-center space-x-1.5 text-amber-800 font-black">
              <Ticket className="h-4 w-4" />
              <span>Apply Promo Code / Coupons</span>
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                placeholder="Enter Promo Code (e.g., RYTHU50)"
                className="flex-1 bg-[#FAF8F2] border rounded-xl px-3 py-2 font-black uppercase"
              />
              <button
                onClick={() => handleApplyPromoCode()}
                className="bg-[#126E2E] text-white font-extrabold px-4 py-2 rounded-xl"
              >
                Apply
              </button>
            </div>

            {couponError && <p className="text-[11px] font-bold text-red-500">{couponError}</p>}

            {appliedCoupon && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2 flex justify-between items-center text-emerald-900 font-extrabold">
                <span>🎉 Coupon {appliedCoupon.code} Applied (-₹{couponDiscount})</span>
                <button onClick={() => { setAppliedCoupon(null); setPromoCodeInput(''); }} className="text-red-600">Remove</button>
              </div>
            )}

            {/* Available Coupons List */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Available Coupons (Tap to Apply):</p>
              {coupons.map((cp) => (
                <div
                  key={cp.code}
                  onClick={() => handleApplyPromoCode(cp.code)}
                  className="bg-[#FAF8F2] border border-dashed border-emerald-300 rounded-xl p-2.5 flex justify-between items-center cursor-pointer hover:bg-emerald-50/60"
                >
                  <div>
                    <span className="font-black text-[#126E2E]">{cp.code}</span>
                    <p className="text-[10px] text-gray-600">{cp.desc}</p>
                  </div>
                  <span className="text-[10px] font-extrabold bg-white px-2.5 py-1 rounded-lg border text-[#126E2E]">
                    APPLY
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Item Subtotal</span>
              <span className="font-bold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee (Free above ₹{freeDeliveryMin})</span>
              <span className="font-bold text-[#126E2E]">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-extrabold">
                <span>Coupon Discount ({appliedCoupon.code})</span>
                <span>- ₹{couponDiscount}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between text-sm font-black text-gray-900">
              <span>To Pay</span>
              <span>₹{grandTotal}</span>
            </div>

            <button
              onClick={() => setScreen('payment')}
              className="w-full mt-2 bg-[#126E2E] text-white font-extrabold py-3.5 rounded-xl shadow-md text-sm"
            >
              Proceed to Payment Options (₹{grandTotal}) ➔
            </button>
          </div>
        </main>
      )}

      {/* =================================================================
          STEP 3: DEDICATED PAYMENT OPTIONS PAGE (ONE BY ONE: QR, PHONEPE, GPAY, PAYTM, OTHER APPS, COD)
         ================================================================= */}
      {screen === 'payment' && (
        <main className="px-4 pt-4 space-y-3 text-xs">
          <div className="flex items-center space-x-2">
            <button onClick={() => setScreen('checkout')} className="p-1.5 bg-white rounded-full shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h2 className="text-base font-black">Step 3: Select Payment Method</h2>
              <p className="text-[11px] text-gray-500">Payable Amount: <strong className="text-[#126E2E]">₹{grandTotal}</strong> • UPI: {payUpiId}</p>
            </div>
          </div>

          {/* ONE-BY-ONE PAYMENT OPTIONS LIST */}
          <div className="space-y-2.5">
            {/* 1. QR CODE SCAN */}
            <div className={`bg-white rounded-2xl p-3.5 border-2 transition ${selectedPayOption === 'qr' ? 'border-[#126E2E] shadow-md' : 'border-gray-100'}`}>
              <button onClick={() => setSelectedPayOption('qr')} className="w-full flex items-center justify-between font-extrabold text-sm">
                <div className="flex items-center space-x-2.5">
                  <span className="h-9 w-9 rounded-xl bg-emerald-50 text-[#126E2E] flex items-center justify-center"><QrCode className="h-5 w-5" /></span>
                  <span>1. Scan & Pay via QR Code</span>
                </div>
                <input type="radio" checked={selectedPayOption === 'qr'} readOnly className="accent-[#126E2E] h-4 w-4" />
              </button>
              {selectedPayOption === 'qr' && (
                <div className="mt-3 pt-3 border-t text-center space-y-2">
                  <img src={freeQrImageUrl} alt="UPI QR" className="w-36 h-36 mx-auto rounded-xl border p-1.5 bg-white" />
                  <p className="text-[11px] font-bold text-gray-600">Scan with any UPI app to pay ₹{grandTotal}</p>
                </div>
              )}
            </div>

            {/* 2. PHONEPE */}
            <div className={`bg-white rounded-2xl p-3.5 border-2 transition ${selectedPayOption === 'phonepe' ? 'border-[#5F259F] shadow-md' : 'border-gray-100'}`}>
              <button onClick={() => setSelectedPayOption('phonepe')} className="w-full flex items-center justify-between font-extrabold text-sm">
                <div className="flex items-center space-x-2.5">
                  <span className="h-9 w-9 rounded-xl bg-purple-100 text-[#5F259F] font-black flex items-center justify-center">Pe</span>
                  <span>2. PhonePe</span>
                </div>
                <input type="radio" checked={selectedPayOption === 'phonepe'} readOnly className="accent-[#5F259F] h-4 w-4" />
              </button>
              {selectedPayOption === 'phonepe' && (
                <div className="mt-2.5 pt-2.5 border-t">
                  <a href={phonePeUri} className="block w-full bg-[#5F259F] text-white text-center font-extrabold py-2.5 rounded-xl">
                    Open PhonePe & Pay ₹{grandTotal} ↗
                  </a>
                </div>
              )}
            </div>

{/* 3. GOOGLE PAY (GPAY) */}
            <div className={`bg-white rounded-2xl p-3.5 border-2 transition ${selectedPayOption === 'gpay' ? 'border-blue-600 shadow-md' : 'border-gray-100'}`}>
              <button onClick={() => setSelectedPayOption('gpay')} className="w-full flex items-center justify-between font-extrabold text-sm">
                <div className="flex items-center space-x-2.5">
                  <span className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 font-black flex items-center justify-center">G</span>
                  <span>3. Google Pay (GPay)</span>
                </div>
                <input type="radio" checked={selectedPayOption === 'gpay'} readOnly className="accent-blue-600 h-4 w-4" />
              </button>
              {selectedPayOption === 'gpay' && (
                <div className="mt-2.5 pt-2.5 border-t">
                  <a href={gpayUri} className="block w-full bg-blue-600 text-white text-center font-extrabold py-2.5 rounded-xl">
                    Open Google Pay & Pay ₹{grandTotal} ↗
                  </a>
                </div>
              )}
            </div>

            {/* 4. PAYTM */}
            <div className={`bg-white rounded-2xl p-3.5 border-2 transition ${selectedPayOption === 'paytm' ? 'border-sky-500 shadow-md' : 'border-gray-100'}`}>
              <button onClick={() => setSelectedPayOption('paytm')} className="w-full flex items-center justify-between font-extrabold text-sm">
                <div className="flex items-center space-x-2.5">
                  <span className="h-9 w-9 rounded-xl bg-sky-50 text-sky-600 font-black flex items-center justify-center">Pm</span>
                  <span>4. Paytm</span>
                </div>
                <input type="radio" checked={selectedPayOption === 'paytm'} readOnly className="accent-sky-500 h-4 w-4" />
              </button>
              {selectedPayOption === 'paytm' && (
                <div className="mt-2.5 pt-2.5 border-t">
                  <a href={paytmUri} className="block w-full bg-sky-500 text-white text-center font-extrabold py-2.5 rounded-xl">
                    Open Paytm & Pay ₹{grandTotal} ↗
                  </a>
                </div>
              )}
            </div>

            {/* 5. OTHER PAYMENT APPS (BHIM / CRED / AMAZON PAY) */}
            <div className={`bg-white rounded-2xl p-3.5 border-2 transition ${selectedPayOption === 'other' ? 'border-[#126E2E] shadow-md' : 'border-gray-100'}`}>
              <button onClick={() => setSelectedPayOption('other')} className="w-full flex items-center justify-between font-extrabold text-sm">
                <div className="flex items-center space-x-2.5">
                  <span className="h-9 w-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center"><Smartphone className="h-5 w-5" /></span>
                  <span>5. Other Payment Apps (BHIM / Cred / UPI)</span>
                </div>
                <input type="radio" checked={selectedPayOption === 'other'} readOnly className="accent-[#126E2E] h-4 w-4" />
              </button>
              {selectedPayOption === 'other' && (
                <div className="mt-2.5 pt-2.5 border-t">
                  <a href={genericUpiUri} className="block w-full bg-gray-800 text-white text-center font-extrabold py-2.5 rounded-xl">
                    Choose Installed UPI App & Pay ₹{grandTotal} ↗
                  </a>
                </div>
              )}
            </div>

            {/* 6. CASH ON DELIVERY */}
            <div className={`bg-white rounded-2xl p-3.5 border-2 transition ${selectedPayOption === 'cod' ? 'border-[#126E2E] shadow-md' : 'border-gray-100'}`}>
              <button onClick={() => setSelectedPayOption('cod')} className="w-full flex items-center justify-between font-extrabold text-sm">
                <div className="flex items-center space-x-2.5">
                  <span className="h-9 w-9 rounded-xl bg-green-50 text-green-700 flex items-center justify-center"><Wallet className="h-5 w-5" /></span>
                  <span>6. Cash on Delivery (COD)</span>
                </div>
                <input type="radio" checked={selectedPayOption === 'cod'} readOnly className="accent-[#126E2E] h-4 w-4" />
              </button>
            </div>
          </div>

          {selectedPayOption !== 'cod' && (
            <div className="bg-white rounded-2xl p-3 shadow-sm">
              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                UPI Transaction / UTR Reference Number (Optional)
              </label>
              <input
                type="text"
                value={upiRefInput}
                onChange={(e) => setUpiRefInput(e.target.value)}
                placeholder="Enter 12-digit UTR after completing UPI payment"
                className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-bold"
              />
            </div>
          )}

          <button
            onClick={handleConfirmFinalPayment}
            className="w-full bg-[#126E2E] text-white font-black py-3.5 rounded-2xl shadow-lg text-sm"
          >
            ✓ Confirm Order & Complete (₹{grandTotal})
          </button>
        </main>
      )}

{/* =================================================================
          MY ORDERS PAGE (FOR CUSTOMERS)
         ================================================================= */}
      {screen === 'myOrders' && (
        <main className="px-4 pt-4 space-y-3 text-xs">
          <h2 className="text-base font-black">My Orders</h2>
          {orders.map((ord) => (
            <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-1">
              <div className="flex justify-between font-black">
                <span>{ord.id} • {ord.status}</span>
                <span className="text-[#126E2E]">₹{ord.total}</span>
              </div>
              <p className="text-gray-600">{ord.summary}</p>
              <p className="text-[10px] font-bold text-gray-400">{ord.payment}</p>
            </div>
          ))}
        </main>
      )}

      {/* =================================================================
          WHOLESALE / RETAIL / FARMER DASHBOARD
         ================================================================= */}
      {screen === 'shopDashboard' && (
        <main className="px-4 pt-4 space-y-3">
          <div className="bg-[#126E2E] text-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
            <div>
              <span className="bg-white/20 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">{loggedInUser?.role?.bannerTitle}</span>
              <h2 className="text-base font-black mt-1">{loggedInUser?.name}</h2>
            </div>
            {currentShopRecord && (
              <span className={`text-[10px] font-extrabold px-2 py-1 rounded-lg ${currentShopRecord.approved ? 'bg-[#C8E99A] text-[#0C4A20]' : 'bg-amber-300 text-gray-900'}`}>
                {currentShopRecord.approved ? '✓ Approved' : '⏳ Pending Approval'}
              </span>
            )}
          </div>

          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {[
              { id: 'orders', label: `📋 Today's Orders (${myShopOrders.length})` },
              { id: 'stock', label: `📦 Stock & Min Qty` },
              { id: 'payments', label: `💰 Payments` },
              { id: 'bank', label: `🏦 Bank & UPI` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setShopTab(t.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-extrabold border ${
                  shopTab === t.id ? 'bg-[#126E2E] text-white border-[#126E2E]' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {shopTab === 'orders' && (
            <div className="space-y-2.5">
              {myShopOrders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-emerald-50 space-y-2 text-xs">
                  <div className="flex justify-between font-black">
                    <span>{ord.id} • {ord.status}</span>
                    <span className="text-[#126E2E]">₹{ord.total}</span>
                  </div>
                  <p className="font-bold text-gray-700">{ord.customer}</p>
                  <p className="text-[11px] text-gray-500">{ord.summary}</p>
                  <div className="flex space-x-2 pt-1">
                    {ord.status === 'Pending' && (
                      <>
                        <button onClick={() => setOrders((p) => p.map((x) => (x.id === ord.id ? { ...x, status: 'Accepted' } : x)))} className="flex-1 bg-[#126E2E] text-white font-extrabold py-2 rounded-xl">
                          ✓ Accept
                        </button>
                        <button onClick={() => setOrders((p) => p.map((x) => (x.id === ord.id ? { ...x, status: 'Rejected' } : x)))} className="flex-1 bg-red-50 text-red-600 font-extrabold py-2 rounded-xl">
                          ✕ Reject
                        </button>
                      </>
                    )}
                    {ord.status === 'Accepted' && (
                      <button onClick={() => handleMarkOrderDelivered(ord)} className="w-full bg-blue-600 text-white font-extrabold py-2 rounded-xl">
                        🚚 Mark Delivered & Auto-Send WhatsApp/SMS Invoice
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {shopTab === 'stock' && (
            <div className="space-y-3 text-xs">
              <form onSubmit={handleAddShopItem} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                <h3 className="font-extrabold">+ Add New Item</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required value={newItemEn} onChange={(e) => setNewItemEn(e.target.value)} placeholder="Item Name (English)" className="bg-[#FAF8F2] border rounded-xl px-2.5 py-2 font-bold" />
                  <input type="text" value={newItemTe} onChange={(e) => setNewItemTe(e.target.value)} placeholder="పేరు (తెలుగులో)" className="bg-[#FAF8F2] border rounded-xl px-2.5 py-2 font-bold" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <select value={newItemCat} onChange={(e) => setNewItemCat(e.target.value)} className="bg-[#FAF8F2] border rounded-xl px-2 py-2 font-bold">
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="dairy">Dairy</option>
                    <option value="livestock">Eggs/Poultry</option>
                  </select>
                  <input type="number" required value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} placeholder="Price ₹" className="bg-[#FAF8F2] border rounded-xl px-2.5 py-2 font-black text-[#126E2E]" />
                  {roleId === 'wholesale' ? (
                    <input type="number" min="1" value={newItemMinQty} onChange={(e) => setNewItemMinQty(e.target.value)} placeholder="Min Qty" className="bg-amber-50 border border-amber-300 rounded-xl px-2.5 py-2 font-black" />
                  ) : (
                    <select value={newItemUnit} onChange={(e) => setNewItemUnit(e.target.value)} className="bg-[#FAF8F2] border rounded-xl px-2 py-2 font-bold">
                      <option value="kg">kg</option>
                      <option value="L">L</option>
                      <option value="pc">pc</option>
                    </select>
                  )}
                </div>
                <button type="submit" className="w-full bg-[#126E2E] text-white font-extrabold py-2.5 rounded-xl">Add Item</button>
              </form>

              {myShopProducts.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold">{item.nameTe} ({item.nameEn})</h4>
                    {editingItemId === item.id ? (
                      <div className="flex items-center space-x-1.5 mt-1">
                        <input type="number" value={editPriceVal} onChange={(e) => setEditPriceVal(e.target.value)} className="w-16 border rounded px-2 py-1 font-black" />
                        {roleId === 'wholesale' && (
                          <input type="number" min="1" value={editMinQtyVal} onChange={(e) => setEditMinQtyVal(e.target.value)} className="w-16 bg-amber-50 border rounded px-2 py-1 font-black" />
                        )}
                        <button
                          onClick={() => {
                            setProducts((prev) => prev.map((p) => p.id === item.id ? { ...p, price: Number(editPriceVal) || p.price, minQty: roleId === 'wholesale' ? Math.max(1, Number(editMinQtyVal) || p.minQty) : p.minQty } : p));
                            setEditingItemId(null);
                          }}
                          className="bg-[#126E2E] text-white p-1.5 rounded-lg"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-[11px] font-bold text-[#126E2E]">
                        ₹{item.price}/{item.unit} {roleId === 'wholesale' ? `• Min Qty: ${item.minQty}` : ''}
                      </p>
                    )}
                  </div>
                  <button onClick={() => { setEditingItemId(item.id); setEditPriceVal(String(item.price)); setEditMinQtyVal(String(item.minQty)); }} className="bg-emerald-50 text-[#126E2E] px-2.5 py-1.5 rounded-xl font-extrabold">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}

          {shopTab === 'payments' && (
            <div className="space-y-2.5 text-xs">
              <div className="grid grid-cols-3 gap-2">
                {['today', 'week', 'month'].map((p) => (
                  <button key={p} onClick={() => setPaymentPeriodFilter(p)} className={`py-2 rounded-xl font-extrabold border uppercase ${paymentPeriodFilter === p ? 'bg-[#126E2E] text-white' : 'bg-white'}`}>
                    {p}
                  </button>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
                <span className="font-bold text-gray-500 uppercase">{paymentPeriodFilter} Earnings</span>
                <span className="text-xl font-black text-[#126E2E]">₹{filteredPaymentSum}</span>
              </div>
              {filteredPaymentOrders.map((o) => (
                <div key={o.id} className="bg-white rounded-2xl p-3 shadow-sm flex justify-between">
                  <span>{o.id} • {o.payment}</span>
                  <span className="font-black text-[#126E2E]">+₹{o.total}</span>
                </div>
              ))}
            </div>
          )}

 {shopTab === 'bank' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 text-xs">
              <h3 className="font-extrabold">Update Bank Account & UPI Details</h3>
              {bankSavedMsg && <div className="bg-emerald-50 text-emerald-800 font-bold p-2 rounded-xl">{bankSavedMsg}</div>}
              <input type="text" value={editUpi} onChange={(e) => setEditUpi(e.target.value)} placeholder="UPI ID" className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-bold" />
              <input type="text" value={editBank} onChange={(e) => setEditBank(e.target.value)} placeholder="Bank Account & IFSC" className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-bold" />
              <label className="flex items-center space-x-2 font-bold">
                <input type="checkbox" checked={editCod} onChange={(e) => setEditCod(e.target.checked)} />
                <span>Accept Cash on Delivery (COD)</span>
              </label>
              <button
                onClick={() => {
                  setShops((prev) => prev.map((s) => (s.id === loggedInUser.shopId ? { ...s, upiId: editUpi, bankAccount: editBank, acceptCod: editCod } : s)));
                  setBankSavedMsg('✅ Payment details saved!');
                  setTimeout(() => setBankSavedMsg(''), 3000);
                }}
                className="w-full bg-[#126E2E] text-white font-extrabold py-3 rounded-xl"
              >
                Save Bank & UPI
              </button>
            </div>
          )}
        </main>
      )}

      {/* =================================================================
          DELIVERY PARTNER DASHBOARD
         ================================================================= */}
      {screen === 'deliveryDashboard' && (
        <main className="px-4 pt-4 space-y-3 text-xs">
          <div className="bg-[#126E2E] text-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-base font-black">Delivery Partner Dashboard</h2>
            <p className="text-emerald-100">{loggedInUser?.name} • {loggedInUser?.mobile}</p>
          </div>
          {orders.map((ord) => (
            <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
              <div className="flex justify-between font-black">
                <span>{ord.id} • {ord.status}</span>
                <span className="text-[#126E2E]">₹{ord.total}</span>
              </div>
              <p className="text-gray-600">{ord.customer} — {ord.summary}</p>
              <div className="flex space-x-2">
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${ord.lat},${ord.lng}`} target="_blank" rel="noreferrer" className="flex-1 bg-blue-600 text-white font-extrabold py-2 rounded-xl text-center">
                  🗺️ Google Maps
                </a>
                {ord.status !== 'Delivered' && (
                  <button onClick={() => handleMarkOrderDelivered(ord)} className="flex-1 bg-[#126E2E] text-white font-extrabold py-2 rounded-xl">
                    ✓ Delivered + Send Bill
                  </button>
                )}
              </div>
            </div>
          ))}
        </main>
      )}

      {/* =================================================================
          COMPLETE MASTER ADMIN PANEL (ALL ADMIN OPTIONS ENABLED)
         ================================================================= */}
      {screen === 'adminPanel' && (
        <main className="px-4 pt-4 space-y-3.5 text-xs">
          <div className="bg-[#0C4A20] text-white rounded-2xl p-4 shadow-md">
            <span className="bg-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded">MASTER ADMIN CONTROL</span>
            <h2 className="text-base font-black mt-1">రైతు బాస్కెట్ పూర్తి అడ్మిన్ కంట్రోల్</h2>
          </div>

          {/* 5 Full Admin Tabs */}
          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {[
              { id: 'overview', label: '📊 Overview' },
              { id: 'approvals', label: `🏪 Shops (${shops.length})` },
              { id: 'items', label: `📦 Items (${products.length})` },
              { id: 'orders', label: `🚚 Orders (${orders.length})` },
              { id: 'settings', label: '⚙️ Coupons & Rules' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setAdminTab(t.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl font-extrabold border ${
                  adminTab === t.id ? 'bg-[#126E2E] text-white border-[#126E2E]' : 'bg-white text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* 1. OVERVIEW */}
          {adminTab === 'overview' && (
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white p-3.5 rounded-2xl shadow-sm">
                <p className="text-gray-400 font-bold">Total Sales Revenue</p>
                <p className="text-xl font-black text-[#126E2E] mt-1">₹{orders.reduce((s, o) => s + o.total, 0)}</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl shadow-sm">
                <p className="text-gray-400 font-bold">Total Orders</p>
                <p className="text-xl font-black text-gray-900 mt-1">{orders.length}</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl shadow-sm">
                <p className="text-gray-400 font-bold">Approved Shops</p>
                <p className="text-xl font-black text-emerald-700 mt-1">{shops.filter((s) => s.approved).length} / {shops.length}</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl shadow-sm">
                <p className="text-gray-400 font-bold">Active Coupons</p>
                <p className="text-xl font-black text-amber-600 mt-1">{coupons.length}</p>
              </div>
            </div>
          )}

{/* 2. SHOP PHOTO APPROVALS */}
          {adminTab === 'approvals' &&
            shops.map((shop) => (
              <div key={shop.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-emerald-50 space-y-2">
                <img src={shop.photoUrl} alt={shop.storeName} className="h-32 w-full object-cover rounded-xl border" />
                <div>
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-[#126E2E] px-2 py-0.5 rounded">{shop.role}</span>
                  <h4 className="text-sm font-black mt-1">{shop.storeName}</h4>
                  <p className="text-gray-600">Owner: {shop.ownerName} • {shop.mobile}</p>
                  <p className="text-gray-500">Address: {shop.address}</p>
                  <p className="text-[10px] font-bold text-emerald-700">UPI: {shop.upiId || 'N/A'} | Bank: {shop.bankAccount || 'N/A'}</p>
                </div>
                <button
                  onClick={() => setShops((prev) => prev.map((s) => (s.id === shop.id ? { ...s, approved: !s.approved } : s)))}
                  className={`w-full font-extrabold py-2.5 rounded-xl ${shop.approved ? 'bg-emerald-50 text-[#126E2E] border border-emerald-200' : 'bg-[#126E2E] text-white'}`}
                >
                  {shop.approved ? '✓ Approved & Live (Tap to Suspend)' : 'Verify Photo & Approve Shop'}
                </button>
              </div>
            ))}

          {/* 3. ALL ITEMS PRICE & STOCK CONTROL */}
          {adminTab === 'items' && (
            <div className="space-y-2">
              <input
                type="text"
                value={adminItemSearch}
                onChange={(e) => setAdminItemSearch(e.target.value)}
                placeholder="Search item to edit price / stock..."
                className="w-full bg-white border rounded-xl px-3 py-2 font-semibold"
              />
              {products
                .filter((p) => p.nameEn.toLowerCase().includes(adminItemSearch.toLowerCase()) || p.nameTe.includes(adminItemSearch))
                .map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold">{item.nameTe} ({item.nameEn})</h4>
                      <p className="text-[10px] text-gray-400">{item.sellerName}</p>
                      {adminEditPriceId === item.id ? (
                        <div className="flex items-center space-x-1 mt-1">
                          <input type="number" value={adminTempPrice} onChange={(e) => setAdminTempPrice(e.target.value)} className="w-20 border rounded px-2 py-0.5 font-black" />
                          <button
                            onClick={() => {
                              setProducts((prev) => prev.map((x) => (x.id === item.id ? { ...x, price: Number(adminTempPrice) || x.price } : x)));
                              setAdminEditPriceId(null);
                            }}
                            className="bg-[#126E2E] text-white p-1 rounded"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1.5 mt-1">
                          <span className="font-black text-[#126E2E]">₹{item.price}/{item.unit}</span>
                          <button onClick={() => { setAdminEditPriceId(item.id); setAdminTempPrice(String(item.price)); }} className="bg-emerald-50 text-[#126E2E] p-1 rounded">
                            <Edit3 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setProducts((prev) => prev.filter((x) => x.id !== item.id))}
                      className="p-2 bg-red-50 text-red-600 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
            </div>
          )}

          {/* 4. ALL ORDERS & DELIVERY ASSIGNMENT */}
          {adminTab === 'orders' &&
            orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                <div className="flex justify-between font-black">
                  <span>{ord.id} • {ord.status}</span>
                  <span className="text-[#126E2E]">₹{ord.total}</span>
                </div>
                <p className="text-gray-700">{ord.customer} — {ord.summary}</p>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={ord.status}
                    onChange={(e) => setOrders((p) => p.map((x) => (x.id === ord.id ? { ...x, status: e.target.value } : x)))}
                    className="bg-[#FAF8F2] border rounded-lg px-2 py-1.5 font-bold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <select
                    value={ord.driver || 'Unassigned'}
                    onChange={(e) => setOrders((p) => p.map((x) => (x.id === ord.id ? { ...x, driver: e.target.value } : x)))}
                    className="bg-[#FAF8F2] border rounded-lg px-2 py-1.5 font-bold"
                  >
                    <option value="Unassigned">Assign Driver</option>
                    <option value="Ravi (Kovur)">Ravi (Kovur)</option>
                    <option value="Suresh (Nellore)">Suresh (Nellore)</option>
                  </select>
                </div>
              </div>
            ))}

          {/* 5. COUPONS, UPI & DELIVERY SETTINGS */}
          {adminTab === 'settings' && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
                <h3 className="font-extrabold">Create New Promo Code / Coupon</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" value={newCouponCode} onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())} placeholder="Code (e.g., SAVE100)" className="bg-[#FAF8F2] border rounded-xl px-3 py-2 font-black uppercase" />
                  <input type="number" value={newCouponValue} onChange={(e) => setNewCouponValue(e.target.value)} placeholder="Discount ₹" className="bg-[#FAF8F2] border rounded-xl px-3 py-2 font-black" />
                </div>
                <button
                  onClick={() => {
                    if (!newCouponCode.trim() || !newCouponValue) return;
                    setCoupons([{ code: newCouponCode.trim(), type: 'flat', value: Number(newCouponValue), minOrder: 199, desc: `Flat ₹${newCouponValue} Off` }, ...coupons]);
                    setNewCouponCode('');
                    setNewCouponValue('');
                  }}
                  className="w-full bg-[#126E2E] text-white font-extrabold py-2.5 rounded-xl"
                >
                  + Add Coupon
                </button>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
                <label className="block font-bold">Default Platform UPI ID</label>
                <input type="text" value={merchantUpiId} onChange={(e) => setMerchantUpiId(e.target.value)} className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-black text-[#126E2E]" />
                <label className="block font-bold">Free Delivery Min Order (₹)</label>
                <input type="number" value={freeDeliveryMin} onChange={(e) => setFreeDeliveryMin(Number(e.target.value))} className="w-full bg-[#FAF8F2] border rounded-xl px-3 py-2 font-black" />
              </div>
            </div>
          )}
        </main>
      )}

{/* =================================================================
          ROLE-SPECIFIC BOTTOM NAVIGATION BAR (AFTER ROLE LOGIN)
         ================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0C4A20] text-white rounded-t-[26px] px-4 py-2.5 flex items-center justify-around shadow-2xl z-40">
        {/* Always allow returning to Home */}
        <button
          onClick={() => {
            setLoggedInUser(null);
            setScreen('portalHome');
          }}
          className="flex flex-col items-center text-emerald-100/80 text-[10px] font-bold"
        >
          <Home className="h-4 w-4 mb-0.5" />
          <span>Home</span>
        </button>

        {/* Customer, Retail & Wholesale can browse Market & Cart */}
        {(roleId === 'customer' || roleId === 'retail' || roleId === 'wholesale') && (
          <>
            <button
              onClick={() => setScreen('market')}
              className={`flex flex-col items-center text-[10px] font-bold ${screen === 'market' ? 'text-[#C8E99A]' : 'text-emerald-100/80'}`}
            >
              <Grid className="h-4 w-4 mb-0.5" />
              <span>Market</span>
            </button>

            <button
              onClick={() => setScreen('cart')}
              className={`relative flex flex-col items-center text-[10px] font-bold ${
                screen === 'cart' || screen === 'checkout' || screen === 'payment' ? 'text-[#C8E99A]' : 'text-emerald-100/80'
              }`}
            >
              <ShoppingCart className="h-4 w-4 mb-0.5" />
              <span>Cart ({totalItems})</span>
            </button>
          </>
        )}

        {/* Customer Orders */}
        {roleId === 'customer' && (
          <button
            onClick={() => setScreen('myOrders')}
            className={`flex flex-col items-center text-[10px] font-bold ${screen === 'myOrders' ? 'text-[#C8E99A]' : 'text-emerald-100/80'}`}
          >
            <ClipboardList className="h-4 w-4 mb-0.5" />
            <span>My Orders</span>
          </button>
        )}

        {/* Wholesale, Retail & Farmer Shop Dashboard */}
        {(roleId === 'wholesale' || roleId === 'retail' || roleId === 'farmer') && (
          <button
            onClick={() => setScreen('shopDashboard')}
            className={`flex flex-col items-center text-[10px] font-bold ${screen === 'shopDashboard' ? 'text-[#C8E99A]' : 'text-emerald-100/80'}`}
          >
            <Store className="h-4 w-4 mb-0.5" />
            <span>My Shop</span>
          </button>
        )}

        {/* Delivery Partner Deliveries */}
        {roleId === 'delivery' && (
          <button
            onClick={() => setScreen('deliveryDashboard')}
            className={`flex flex-col items-center text-[10px] font-bold ${screen === 'deliveryDashboard' ? 'text-[#C8E99A]' : 'text-emerald-100/80'}`}
          >
            <Navigation className="h-4 w-4 mb-0.5" />
            <span>Deliveries</span>
          </button>
        )}

        {/* Master Admin Panel */}
        {roleId === 'admin' && (
          <button
            onClick={() => setScreen('adminPanel')}
            className={`flex flex-col items-center text-[10px] font-bold ${screen === 'adminPanel' ? 'text-[#C8E99A]' : 'text-emerald-100/80'}`}
          >
            <ShieldCheck className="h-4 w-4 mb-0.5" />
            <span>Admin Panel</span>
          </button>
        )}
      </nav>
    </div>
  );
}