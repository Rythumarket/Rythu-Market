import React, { useState } from 'react';
import {
  Search, ShoppingCart, Plus, Minus, Home, Grid,
  ClipboardList, User, MapPin, Phone, Sprout,
  Store, Truck, ShieldCheck, ChevronRight, ArrowLeft,
  CheckCircle2, Lock, KeyRound, PackagePlus, LogOut,
  Trash2, Edit3, Check, Navigation, QrCode, Wallet,
  LocateFixed, Bell, MessageCircle, FileText, ArrowLeftRight,
  Warehouse, Camera, Building2, CreditCard, MessageSquare
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
  // FARMER POSTED ITEMS
  { id: 'v1', sellerId: 'shop_farmer_1', sellerType: 'farmer', sellerName: 'Ramaiah Farm (Kovur)', nameEn: 'Tomato', nameTe: 'టమాటా', sub: 'Daily Staples', unit: 'kg', minQty: 1, price: 24, oldPrice: 32, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80' },
  { id: 'v24', sellerId: 'shop_farmer_1', sellerType: 'farmer', sellerName: 'Ramaiah Farm (Kovur)', nameEn: 'Spinach', nameTe: 'పాలకూర', sub: 'Leafy Greens', unit: 'bunches', minQty: 1, price: 18, oldPrice: 25, cat: 'vegetables', inStock: true, img: CAT_IMG.leafy },
  { id: 'f10', sellerId: 'shop_farmer_1', sellerType: 'farmer', sellerName: 'Ramaiah Farm (Kovur)', nameEn: 'Banganapalli Mango', nameTe: 'బంగినపల్లి మామిడి', sub: 'Seasonal & Exotic', unit: 'kg', minQty: 1, price: 95, oldPrice: 120, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80' },
  { id: 'c2', sellerId: 'shop_farmer_1', sellerType: 'farmer', sellerName: 'Ramaiah Farm (Kovur)', nameEn: 'Country Chicken (Live)', nameTe: 'నాటు కోడి', sub: 'Live Chicken', unit: 'kg', minQty: 1, price: 360, oldPrice: 420, cat: 'livestock', inStock: true, img: CAT_IMG.poultry },
  { id: 'sh1', sellerId: 'shop_farmer_1', sellerType: 'farmer', sellerName: 'Ramaiah Farm (Kovur)', nameEn: 'Nellore Jodipi Sheep', nameTe: 'నెల్లూరు జోడిపి గొర్రె', sub: 'Live Sheep', unit: 'animal', minQty: 1, price: 8900, oldPrice: 9800, cat: 'livestock', inStock: true, img: CAT_IMG.livestock },

  // RETAIL SHOPKEEPER POSTED ITEMS
  { id: 'v2', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Red Onion', nameTe: 'ఉల్లిపాయ', sub: 'Daily Staples', unit: 'kg', minQty: 1, price: 32, oldPrice: 40, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=300&q=80' },
  { id: 'v14', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Brinjal / Eggplant', nameTe: 'వంకాయ', sub: 'Common Veggies', unit: 'kg', minQty: 1, price: 28, oldPrice: 35, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=300&q=80' },
  { id: 'm1', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Full Cream Milk', nameTe: 'చిక్కటి పాలు', sub: 'Liquid Dairy', unit: 'L', minQty: 1, price: 68, oldPrice: 75, cat: 'dairy', inStock: true, img: CAT_IMG.dairy },
  { id: 'm9', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Pure Cow Ghee', nameTe: 'నెయ్యి', sub: 'Fats & Solids', unit: '500 ml', minQty: 1, price: 340, oldPrice: 390, cat: 'dairy', inStock: true, img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80' },
  { id: 'b6', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Tender Coconut Water', nameTe: 'కొబ్బరి నీళ్లు', sub: 'Cold & Packaged', unit: 'pc', minQty: 1, price: 40, oldPrice: 50, cat: 'beverages', inStock: true, img: CAT_IMG.beverages },
  { id: 'e2', sellerId: 'shop_retail_1', sellerType: 'retail', sellerName: 'Balaji Retail Mart', nameEn: 'Country Eggs (6 pcs)', nameTe: 'నాటు కోడి గుడ్లు', sub: 'Eggs', unit: 'pack', minQty: 1, price: 54, oldPrice: 66, cat: 'livestock', inStock: true, img: CAT_IMG.eggs },

  // WHOLESALE SHOPKEEPER POSTED ITEMS (MINIMUM QUANTITY ENFORCED FOR CUSTOMERS)
  { id: 'w1', sellerId: 'shop_wholesale_1', sellerType: 'wholesale', sellerName: 'Nellore Mandi Wholesale', nameEn: 'Onion Bulk Sack', nameTe: 'ఉల్లిపాయలు (హోల్‌సేల్)', sub: 'Daily Staples', unit: 'kg', minQty: 10, price: 23, oldPrice: 32, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=300&q=80' },
  { id: 'w2', sellerId: 'shop_wholesale_1', sellerType: 'wholesale', sellerName: 'Nellore Mandi Wholesale', nameEn: 'Potato Bulk Crate', nameTe: 'బంగాళాదుంప (హోల్‌సేల్)', sub: 'Daily Staples', unit: 'kg', minQty: 15, price: 21, oldPrice: 30, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80' },
  { id: 'w3', sellerId: 'shop_wholesale_1', sellerType: 'wholesale', sellerName: 'Nellore Mandi Wholesale', nameEn: 'Banana Bulk Bunch', nameTe: 'అరటిపండ్లు (హోల్‌సేల్)', sub: 'Everyday Fruits', unit: 'dozen', minQty: 5, price: 34, oldPrice: 45, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80' },
  { id: 'w4', sellerId: 'shop_wholesale_1', sellerType: 'wholesale', sellerName: 'Nellore Mandi Wholesale', nameEn: 'Broiler Chicken Live Bulk', nameTe: 'బ్రాయిలర్ కోడి (హోల్‌సేల్)', sub: 'Live Chicken', unit: 'kg', minQty: 10, price: 150, oldPrice: 180, cat: 'livestock', inStock: true, img: CAT_IMG.poultry },
];

export default function App() {
  const [lang, setLang] = useState('te');
  const [screen, setScreen] = useState('roles'); // Starts at Role Selection + Auth Gate
  const [shops, setShops] = useState(INITIAL_SHOPS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Storefront Filters
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('all'); // 'all' | 'farmer' | 'retail' | 'wholesale'
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({});
  const [latestInvoice, setLatestInvoice] = useState(null);

  // GPS & Checkout Payment States
  const [deliveryAddress, setDeliveryAddress] = useState('Vedayapalem, Nellore');
  const [gpsCoords, setGpsCoords] = useState({ lat: 14.4426, lng: 79.9865 });
  const [gpsStatus, setGpsStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiRefInput, setUpiRefInput] = useState('');

  // Admin Settings
  const [merchantUpiId, setMerchantUpiId] = useState('8328261103@ybl');
  const [freeDeliveryMin, setFreeDeliveryMin] = useState(499);
  const [baseDeliveryFee, setBaseDeliveryFee] = useState(25);
  const [bannerDiscount, setBannerDiscount] = useState(30);

  // Orders with Payment Dates (today / week / month) for Seller Payment History
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
      payment: 'UPI Paid (UTR: 43198201)',
      period: 'today',
      status: 'Pending',
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
      payment: 'UPI Paid (UTR: 88219034)',
      period: 'today',
      status: 'Pending',
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
      payment: 'Bank Transfer Settled',
      period: 'week',
      status: 'Delivered',
    },
    {
      id: 'RB-085',
      sellerId: 'shop_retail_1',
      buyerMobile: '9000112233',
      customer: 'Customer (9000112233 • Kovur)',
      lat: 14.4912,
      lng: 79.9854,
      summary: '500 ml Pure Cow Ghee + Country Eggs',
      total: 394,
      payment: 'UPI Settled',
      period: 'month',
      status: 'Delivered',
    },
  ]);

  // Auth & First-Time Registration States
  const [selectedRoleForLogin, setSelectedRoleForLogin] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // { role, mobile, shopId, name }
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [mobileInput, setMobileInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [authError, setAuthError] = useState('');

  // Mandatory Registration Fields (for Farmer, Retail, Wholesale, Delivery)
  const [regStoreName, setRegStoreName] = useState('');
  const [regOwnerName, setRegOwnerName] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPayType, setRegPayType] = useState('upi'); // 'upi' | 'bank' | 'cod'
  const [regUpiId, setRegUpiId] = useState('');
  const [regBankAcc, setRegBankAcc] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhotoPreview, setRegPhotoPreview] = useState('');

  // Seller Dashboard Sub-Tabs (Wholesale & Retail)
  const [shopTab, setShopTab] = useState('orders'); // 'orders' | 'stock' | 'payments' | 'bank'
  const [paymentPeriodFilter, setPaymentPeriodFilter] = useState('today'); // 'today' | 'week' | 'month'
  const [editingItemId, setEditingItemId] = useState(null);
  const [editPriceVal, setEditPriceVal] = useState('');
  const [editMinQtyVal, setEditMinQtyVal] = useState('');

  // Add New Stock Item Form (Wholesale / Retail / Farmer)
  const [newItemEn, setNewItemEn] = useState('');
  const [newItemTe, setNewItemTe] = useState('');
  const [newItemCat, setNewItemCat] = useState('vegetables');
  const [newItemUnit, setNewItemUnit] = useState('kg');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemMinQty, setNewItemMinQty] = useState('1');

  // Shop Payment Details Edit States
  const [editUpi, setEditUpi] = useState('');
  const [editBank, setEditBank] = useState('');
  const [editCod, setEditCod] = useState(true);
  const [bankSavedMsg, setBankSavedMsg] = useState('');

  // Admin Tab
  const [adminTab, setAdminTab] = useState('approvals'); // 'approvals' | 'orders' | 'settings'
  const [alertBanner, setAlertBanner] = useState('');

  const roles = [
    { id: 'customer', titleTe: 'వినియోగదారుడు', titleEn: 'Customer', subTe: 'రైతులు, రిటైల్ & హోల్‌సేల్ సరుకులు కొనండి', subEn: 'Buy from Farmers, Retail & Wholesale', icon: ShoppingCart, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'farmer', titleTe: 'రైతు', titleEn: 'Farmer', subTe: 'రిజిస్ట్రేషన్ & పంట అమ్మకం', subEn: 'Register & sell farm harvest', icon: Sprout, color: 'bg-green-50 text-green-600' },
    { id: 'retail', titleTe: 'రిటైల్ షాపు', titleEn: 'Retail Shopkeeper', subTe: 'Today Orders, Stock ధరలు, Payments & Bank', subEn: 'Orders, Stock Prices, Payments & Bank', icon: Store, color: 'bg-amber-50 text-amber-600' },
    { id: 'wholesale', titleTe: 'హోల్‌సేల్ వ్యాపారి', titleEn: 'Wholesale Shopkeeper', subTe: 'Min Qty కంట్రోల్, Orders, Payments & Bank', subEn: 'Min Qty Control, Orders, Payments & Bank', icon: Warehouse, color: 'bg-indigo-50 text-indigo-600' },
    { id: 'delivery', titleTe: 'డెలివరీ పార్టనర్', titleEn: 'Delivery Partner', subTe: 'Google Maps రూట్ & ఆటో ఇన్‌వాయిస్', subEn: 'Maps navigation & auto invoice', icon: Truck, color: 'bg-blue-50 text-blue-600' },
    { id: 'admin', titleTe: 'అడ్మిన్ (Admin)', titleEn: 'Master Admin', subTe: 'షాపుల ఫోటో వెరిఫికేషన్ & అప్రూవల్', subEn: 'Verify Shop Photos & Approve Shops', icon: ShieldCheck, color: 'bg-purple-50 text-purple-600' },
  ];

const categories = [
    { id: 'all', nameEn: 'All', nameTe: 'అన్నీ', emoji: '🧺' },
    { id: 'vegetables', nameEn: 'Vegetables', nameTe: 'కూరగాయలు', emoji: '🍅' },
    { id: 'fruits', nameEn: 'Fruits', nameTe: 'పండ్లు', emoji: '🥭' },
    { id: 'dairy', nameEn: 'Dairy', nameTe: 'పాల ఉత్పత్తులు', emoji: '🥛' },
    { id: 'beverages', nameEn: 'Beverages', nameTe: 'పానీయాలు', emoji: '🥥' },
    { id: 'livestock', nameEn: 'Eggs & Poultry', nameTe: 'గుడ్లు, కోళ్లు', emoji: '🐓' },
  ];

  // Only show products from APPROVED shops (or farmers)
  const approvedShopIds = new Set(shops.filter((s) => s.approved).map((s) => s.id));

  const visibleProducts = products.filter((p) => {
    const isApprovedSeller = approvedShopIds.has(p.sellerId);
    const catOk = selectedCat === 'all' || p.cat === selectedCat;
    const srcOk = selectedSourceFilter === 'all' || p.sellerType === selectedSourceFilter;
    const q = search.toLowerCase();
    const searchOk = p.nameEn.toLowerCase().includes(q) || p.nameTe.includes(q) || p.sellerName.toLowerCase().includes(q);
    return isApprovedSeller && catOk && srcOk && searchOk;
  });

  // Cart Handlers (Enforces Wholesale Minimum Quantity!)
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
      if (current <= product.minQty) {
        delete next[product.id];
      } else {
        next[product.id] = current - 1;
      }
      return next;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((item) => item.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= freeDeliveryMin ? 0 : baseDeliveryFee;
  const grandTotal = subtotal + deliveryFee;

  // GPS Capture
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

  // Auto Build WhatsApp & SMS Text Invoice Links upon Delivery
  const buildInvoiceText = (ord) =>
    `RYTHU BASKET NELLORE - INVOICE\n` +
    `Order ID: ${ord.id}\n` +
    `Customer: ${ord.customer}\n` +
    `Items: ${ord.summary}\n` +
    `Total Amount: Rs.${ord.total}\n` +
    `Payment: ${ord.payment}\n` +
    `Status: DELIVERED\n` +
    `Thank you for shopping with Rythu Basket!`;

  const getWhatsAppInvoiceLink = (ord) => {
    const phone = `91${(ord.buyerMobile || '9876543210').replace(/\D/g, '').slice(-10)}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(buildInvoiceText(ord))}`;
  };

  const getSmsInvoiceLink = (ord) => {
    const phone = `+91${(ord.buyerMobile || '9876543210').replace(/\D/g, '').slice(-10)}`;
    return `sms:${phone}?body=${encodeURIComponent(buildInvoiceText(ord))}`;
  };

  // Mark Order Delivered & Trigger Automatic Invoice Dispatch
  const handleMarkOrderDelivered = (ord) => {
    const updatedOrd = { ...ord, status: 'Delivered' };
    setOrders((prev) => prev.map((o) => (o.id === ord.id ? updatedOrd : o)));
    setLatestInvoice(updatedOrd);
    // Automatically open WhatsApp invoice to registered mobile number
    window.open(getWhatsAppInvoiceLink(updatedOrd), '_blank');
  };

  // Place Customer Order
  const handlePlaceCustomerOrder = () => {
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

    const paymentStr =
      paymentMethod === 'upi'
        ? `UPI (${upiRefInput.trim() ? 'UTR: ' + upiRefInput.trim() : 'Paid via UPI'})`
        : 'Cash on Delivery (COD)';

    const newOrd = {
      id: 'RB-' + Math.floor(105 + Math.random() * 890),
      sellerId: firstProd?.sellerId || 'shop_retail_1',
      buyerMobile: loggedInUser?.mobile || '9876543210',
      customer: `${loggedInUser?.mobile || '9876543210'} (${deliveryAddress})`,
      lat: gpsCoords.lat,
      lng: gpsCoords.lng,
      summary: itemLines,
      total: grandTotal,
      payment: paymentStr,
      period: 'today',
      status: 'Pending',
    };

    setOrders([newOrd, ...orders]);
    setCart({});
    setUpiRefInput('');
    setAlertBanner(`✅ Order ${newOrd.id} placed! Seller will accept & deliver shortly.`);
    setScreen('home');
  };

  // Role Card Tap -> Open Auth Gate
  const handleSelectRole = (roleObj) => {
    setSelectedRoleForLogin(roleObj);
    setMobileInput('');
    setPasswordInput('');
    setOtpInput('');
    setOtpSent(false);
    setAuthError('');
    setAuthMode('login');
    setScreen('auth');
  };

 // Send OTP (Customer & Admin)
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

  // Verify Login (OTP for Customer/Admin; Mobile + Password for Shops/Farmers/Delivery)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const roleId = selectedRoleForLogin.id;

    if (roleId === 'customer' || roleId === 'admin') {
      if (otpInput.trim() !== generatedOtp) {
        setAuthError('తప్పు OTP! మళ్ళీ ప్రయత్నించండి');
        return;
      }
      setLoggedInUser({ role: selectedRoleForLogin, mobile: mobileInput, name: selectedRoleForLogin.titleEn });
      setScreen(roleId === 'admin' ? 'adminPanel' : 'home');
      return;
    }

    // Shop / Farmer / Delivery Password Login
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
      role: selectedRoleForLogin,
      mobile: matchedShop.mobile,
      shopId: matchedShop.id,
      name: matchedShop.storeName,
    });
    setEditUpi(matchedShop.upiId || '');
    setEditBank(matchedShop.bankAccount || '');
    setEditCod(matchedShop.acceptCod);
    setShopTab('orders');

    if (roleId === 'wholesale' || roleId === 'retail' || roleId === 'farmer') {
      setScreen('shopDashboard');
    } else {
      setScreen('deliveryDashboard');
    }
  };

  // Handle Shop Photo Upload (FileReader)
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setRegPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // First-Time Registration Submit (Mandatory Store Name, Owner, Phone, Address, Payment/Bank/COD, Password, Shop Photo)
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
    if (regPayType === 'upi' && !regUpiId.trim()) {
      setAuthError('పేమెంట్ రిసీవ్ చేసుకోవడానికి UPI ID తప్పనిసరి');
      return;
    }
    if (regPayType === 'bank' && !regBankAcc.trim()) {
      setAuthError('పేమెంట్ రిసీవ్ చేసుకోవడానికి Bank Account Number తప్పనిసరి');
      return;
    }
    if ((selectedRoleForLogin.id === 'wholesale' || selectedRoleForLogin.id === 'retail') && !regPhotoPreview) {
      setAuthError('షాపు ఫోటో అప్‌లోడ్ చేయడం తప్పనిసరి (Admin Approval కోసం)');
      return;
    }

    const newShopId = 'shop_' + Date.now();
    const needsAdminApproval = selectedRoleForLogin.id === 'wholesale' || selectedRoleForLogin.id === 'retail';

    const newShopObj = {
      id: newShopId,
      role: selectedRoleForLogin.id,
      storeName: regStoreName.trim(),
      ownerName: regOwnerName.trim(),
      mobile: mobileInput,
      password: regPassword,
      address: regAddress.trim(),
      upiId: regUpiId.trim(),
      bankAccount: regBankAcc.trim(),
      acceptCod: regPayType === 'cod' || true,
      photoUrl: regPhotoPreview || CAT_IMG.vegetables,
      approved: !needsAdminApproval, // Wholesale & Retail stay hidden until Admin approves photo!
    };

    setShops([newShopObj, ...shops]);
    setLoggedInUser({
      role: selectedRoleForLogin,
      mobile: newShopObj.mobile,
      shopId: newShopId,
      name: newShopObj.storeName,
    });
    setEditUpi(newShopObj.upiId);
    setEditBank(newShopObj.bankAccount);
    setEditCod(newShopObj.acceptCod);
    setShopTab('orders');

    if (needsAdminApproval) {
      setAlertBanner(
        `⏳ Registration Complete! మీ షాపు ఫోటో Admin వెరిఫికేషన్‌కు పంపబడింది. Admin Approve చేసిన వెంటనే మీ షాపు & ఐటమ్స్ Customer కి కనిపిస్తాయి.`
      );
    }

    if (selectedRoleForLogin.id === 'delivery') setScreen('deliveryDashboard');
    else setScreen('shopDashboard');
  };

  // Seller Add Stock Item
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
      sub: loggedInUser.role.id === 'wholesale' ? 'Wholesale Bulk' : 'Fresh Stock',
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
    setAlertBanner(`✅ ${newProd.nameEn} added to your shop inventory!`);
  };

  const currentShopRecord = shops.find((s) => s.id === loggedInUser?.shopId);
  const myShopProducts = products.filter((p) => p.sellerId === loggedInUser?.shopId);
  const myShopOrders = orders.filter((o) => o.sellerId === loggedInUser?.shopId);
  const filteredPaymentOrders = myShopOrders.filter((o) => o.period === paymentPeriodFilter);
  const filteredPaymentSum = filteredPaymentOrders.reduce((s, o) => s + o.total, 0);

  const activeSellerShop = (() => {
    const firstId = Object.keys(cart)[0];
    const prod = products.find((p) => p.id === firstId);
    return shops.find((s) => s.id === prod?.sellerId);
  })();

const activeUpiId = activeSellerShop?.upiId || merchantUpiId;
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(activeUpiId)}&pn=${encodeURIComponent(
    activeSellerShop?.storeName || 'Rythu Basket'
  )}&am=${grandTotal}&cu=INR`;
  const freeQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(upiDeepLink)}`;

  // =========================================================================
  // GATE 1: ROLE SELECTION & REGISTRATION / LOGIN
  // =========================================================================
  if (!loggedInUser || screen === 'roles' || screen === 'auth') {
    return (
      <div className="min-h-screen bg-[#F6FBF8] max-w-md mx-auto font-sans text-gray-800 shadow-xl pb-10">
        <div className="bg-[#0B5D34] text-white rounded-b-[32px] px-5 pt-6 pb-7 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-white p-0.5 shadow-md border-2 border-yellow-300 overflow-hidden">
                <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
              </div>
              <div>
                <h1 className="text-lg font-black">రైతు బాస్కెట్</h1>
                <p className="text-[11px] text-emerald-200 font-semibold">Rythu Basket • నెల్లూరు</p>
              </div>
            </div>

            <div className="bg-white/15 p-0.5 rounded-full flex text-[11px] font-bold">
              <button
                onClick={() => setLang('te')}
                className={`px-3 py-1 rounded-full ${lang === 'te' ? 'bg-white text-[#0B5D34]' : 'text-white'}`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full ${lang === 'en' ? 'bg-white text-[#0B5D34]' : 'text-white'}`}
              >
                EN
              </button>
            </div>
          </div>

          <h2 className="text-xl font-black">
            {lang === 'te' ? 'నమస్కారం! మీరు ఎవరు?' : 'Welcome! Select Your Role'}
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            {lang === 'te'
              ? 'Customer & Admin కి OTP Login • Shops & Farmers కి Registration'
              : 'OTP Login for Customer/Admin • Mandatory Registration for Shops/Farmers'}
          </p>
        </div>

        {screen !== 'auth' ? (
          <div className="px-4 pt-5 space-y-2.5">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelectRole(r)}
                  className="w-full bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-sm border border-gray-100 hover:border-[#00B251]"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${r.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-extrabold text-gray-900">
                        {lang === 'te' ? r.titleTe : r.titleEn}
                      </h3>
                      <p className="text-[11px] font-bold text-[#00B251]">
                        {lang === 'te' ? r.subTe : r.subEn}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="px-4 pt-5">
            <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 space-y-4">
              <div className="flex items-center space-x-2">
                <button onClick={() => setScreen('roles')} className="p-2 bg-gray-100 rounded-full">
                  <ArrowLeft className="h-4 w-4 text-gray-700" />
                </button>
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    {lang === 'te' ? selectedRoleForLogin.titleTe : selectedRoleForLogin.titleEn}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {selectedRoleForLogin.id === 'customer' || selectedRoleForLogin.id === 'admin'
                      ? 'Mobile Number + OTP Login'
                      : 'Login or First-Time Shop/Partner Registration'}
                  </p>
                </div>
              </div>

              {/* CUSTOMER & ADMIN: DIRECT OTP LOGIN */}
              {selectedRoleForLogin.id === 'customer' || selectedRoleForLogin.id === 'admin' ? (
                <div className="space-y-3">
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileInput}
                    onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-Digit Mobile Number (e.g., 8328261103)"
                    className="w-full bg-gray-50 border rounded-xl px-3.5 py-2.5 text-sm font-bold"
                  />
                  {!otpSent ? (
                    <button
                      onClick={handleSendOtp}
                      className="w-full bg-[#00B251] text-white font-extrabold text-xs py-3 rounded-xl"
                    >
                      Send OTP
                    </button>
                  ) : (
                    <>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-center text-xs font-black text-[#00B251]">
                        Demo OTP: {generatedOtp}
                      </div>
                      <input
                        type="tel"
                        maxLength={4}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="Enter 4-Digit OTP"
                        className="w-full bg-gray-50 border rounded-xl px-3.5 py-2.5 text-center text-base font-black tracking-[0.4em]"
                      />
                      <button
                        onClick={handleLoginSubmit}
                        className="w-full bg-[#00B251] text-white font-extrabold text-xs py-3 rounded-xl"
                      >
                        Verify OTP & Enter
                      </button>
                    </>
                  )}
                  {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}
                </div>
              ) : (
                /* FARMER, RETAIL, WHOLESALE, DELIVERY: LOGIN OR MANDATORY FIRST-TIME REGISTRATION */
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl text-xs font-extrabold">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setAuthError('');
                      }}
                      className={`py-2 rounded-lg ${authMode === 'login' ? 'bg-white text-[#00B251] shadow-sm' : 'text-gray-600'}`}
                    >
                      Existing Login
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setAuthError('');
                      }}
                      className={`py-2 rounded-lg ${authMode === 'register' ? 'bg-white text-[#00B251] shadow-sm' : 'text-gray-600'}`}
                    >
                      New Registration
                    </button>
                  </div>

                  {authMode === 'login' ? (
                    <form onSubmit={handleLoginSubmit} className="space-y-3">
                      <p className="text-[10px] text-gray-400">
                        Demo Numbers: Wholesale `9989334455`, Retail `9849223344`, Farmer `9440112233` (Password: `123`)
                      </p>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        value={mobileInput}
                        onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="Registered 10-Digit Phone Number"
                        className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 text-xs font-bold"
                      />
                      <input
                        type="password"
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Password"
                        className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 text-xs font-bold"
                      />
                      {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}
                      <button
                        type="submit"
                        className="w-full bg-[#00B251] text-white font-extrabold text-xs py-3 rounded-xl shadow-md"
                      >
                        Login to Dashboard
                      </button>
                    </form>
                  ) : (
                    /* MANDATORY FIRST-TIME REGISTRATION FORM */
                    <form onSubmit={handleRegisterSubmit} className="space-y-2.5 text-xs">
                      <input
                        type="text"
                        required
                        value={regStoreName}
                        onChange={(e) => setRegStoreName(e.target.value)}
                        placeholder="Name of the Store / Farm *"
                        className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold"
                      />
                      <input
                        type="text"
                        required
                        value={regOwnerName}
                        onChange={(e) => setRegOwnerName(e.target.value)}
                        placeholder="Owner Name *"
                        className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold"
                      />
<input
                        type="tel"
                        maxLength={10}
                        required
                        value={mobileInput}
                        onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="Phone Number (10 digits) *"
                        className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold"
                      />
                      <input
                        type="text"
                        required
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        placeholder="Full Shop / Farm Address in Nellore *"
                        className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold"
                      />

                      {/* Mandatory Payment Receive Details (UPI / Bank / COD) */}
                      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 space-y-2">
                        <label className="block font-extrabold text-emerald-900">
                          Payment Receive Details (ఆర్డర్ అంగీకరించాక డబ్బు పొందడానికి) *
                        </label>
                        <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                          <button
                            type="button"
                            onClick={() => setRegPayType('upi')}
                            className={`py-1.5 rounded-lg border ${regPayType === 'upi' ? 'bg-[#00B251] text-white' : 'bg-white'}`}
                          >
                            UPI ID
                          </button>
                          <button
                            type="button"
                            onClick={() => setRegPayType('bank')}
                            className={`py-1.5 rounded-lg border ${regPayType === 'bank' ? 'bg-[#00B251] text-white' : 'bg-white'}`}
                          >
                            Bank A/C
                          </button>
                          <button
                            type="button"
                            onClick={() => setRegPayType('cod')}
                            className={`py-1.5 rounded-lg border ${regPayType === 'cod' ? 'bg-[#00B251] text-white' : 'bg-white'}`}
                          >
                            COD Only
                          </button>
                        </div>

                        {regPayType === 'upi' && (
                          <input
                            type="text"
                            required
                            value={regUpiId}
                            onChange={(e) => setRegUpiId(e.target.value)}
                            placeholder="Enter Shop UPI ID (e.g., 9849223344@ybl) *"
                            className="w-full bg-white border rounded-lg px-2.5 py-1.5 font-bold"
                          />
                        )}
                        {regPayType === 'bank' && (
                          <input
                            type="text"
                            required
                            value={regBankAcc}
                            onChange={(e) => setRegBankAcc(e.target.value)}
                            placeholder="Bank Name, A/C Number & IFSC *"
                            className="w-full bg-white border rounded-lg px-2.5 py-1.5 font-bold"
                          />
                        )}
                      </div>

                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Create Password *"
                        className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold"
                      />

                      {/* Mandatory Shop Photo Upload for Admin Verification */}
                      {(selectedRoleForLogin.id === 'wholesale' || selectedRoleForLogin.id === 'retail') && (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center space-y-1.5">
                          <label className="cursor-pointer flex flex-col items-center space-y-1">
                            <Camera className="h-5 w-5 text-[#00B251]" />
                            <span className="font-extrabold text-gray-700">
                              Upload Shop Photo (Admin Verification కోసం) *
                            </span>
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                          </label>
                          {regPhotoPreview && (
                            <img src={regPhotoPreview} alt="Shop Preview" className="h-24 w-full object-cover rounded-lg mt-1" />
                          )}
                        </div>
                      )}

                      {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}

                      <button
                        type="submit"
                        className="w-full bg-[#00B251] text-white font-extrabold py-3 rounded-xl shadow-md"
                      >
                        Complete Registration
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

// =========================================================================
  // GATE 2: LOGGED-IN APPLICATION
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F6FBF8] max-w-md mx-auto relative pb-28 font-sans text-gray-800 shadow-xl">
      {/* GREEN HEADER */}
      <header className="bg-[#00B251] text-white rounded-b-[28px] px-4 pt-4 pb-5 shadow-md sticky top-0 z-30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="h-11 w-11 rounded-full bg-white p-0.5 shadow-md overflow-hidden border-2 border-yellow-300">
              <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-base font-extrabold leading-tight">
                {lang === 'te' ? 'రైతు బాస్కెట్' : 'Rythu Basket'}
              </h1>
              <p className="text-[11px] text-emerald-100 font-medium truncate max-w-[180px]">
                {loggedInUser.name} • {loggedInUser.mobile}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <div className="bg-[#008F41] p-0.5 rounded-full flex text-[11px] font-bold">
              <button
                onClick={() => setLang('te')}
                className={`px-2 py-1 rounded-full ${lang === 'te' ? 'bg-white text-[#00B251]' : 'text-white'}`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-full ${lang === 'en' ? 'bg-white text-[#00B251]' : 'text-white'}`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => {
                setLoggedInUser(null);
                setScreen('roles');
              }}
              className="bg-white/20 p-2 rounded-full text-white"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="h-4 w-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (screen !== 'home') setScreen('home');
            }}
            placeholder={lang === 'te' ? 'రైతు, రిటైల్, హోల్‌సేల్ సరుకులు వెతకండి...' : 'Search Farmer, Retail & Wholesale items...'}
            className="w-full bg-white text-gray-800 placeholder-gray-400 text-xs font-medium rounded-xl py-2.5 pl-10 pr-4 shadow-sm focus:outline-none"
          />
        </div>
      </header>

      {/* ALERT BANNER */}
      {alertBanner && (
        <div className="mx-4 mt-3 bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-start justify-between shadow-sm">
          <p className="text-[11px] font-extrabold text-amber-900">{alertBanner}</p>
          <button onClick={() => setAlertBanner('')} className="text-xs font-bold text-amber-700 ml-2">✕</button>
        </div>
      )}

      {/* AUTOMATIC WHATSAPP & SMS TEXT INVOICE CARD UPON DELIVERY */}
      {latestInvoice && (
        <div className="mx-4 mt-3 bg-white border-2 border-[#00B251] rounded-2xl p-4 shadow-lg space-y-2">
          <div className="flex justify-between items-center border-b pb-1.5">
            <span className="text-xs font-black text-[#00B251]">✅ DELIVERED & INVOICE SENT ({latestInvoice.id})</span>
            <button onClick={() => setLatestInvoice(null)} className="text-xs font-bold text-gray-400">✕</button>
          </div>
          <p className="text-[11px] text-gray-700">
            <strong>To:</strong> {latestInvoice.customer} • <strong>Amount:</strong> ₹{latestInvoice.total}
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={getWhatsAppInvoiceLink(latestInvoice)}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white text-xs font-extrabold py-2 rounded-xl flex items-center justify-center space-x-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Invoice</span>
            </a>
            <a
              href={getSmsInvoiceLink(latestInvoice)}
              className="bg-blue-600 text-white text-xs font-extrabold py-2 rounded-xl flex items-center justify-center space-x-1"
            >
              <MessageSquare className="h-4 w-4" />
              <span>SMS Text Invoice</span>
            </a>
          </div>
        </div>
      )}

      {/* =================================================================
          SCREEN 1: CUSTOMER STOREFRONT (FARMER + RETAIL + WHOLESALE ITEMS)
         ================================================================= */}
      {screen === 'home' && (
        <main className="px-4 pt-4 space-y-4">
          {/* Seller Source Filter Pills */}
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
                  selectedSourceFilter === s.id ? 'bg-[#00B251] text-white border-[#00B251]' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-2xl border flex items-center space-x-1.5 ${
                  selectedCat === cat.id ? 'bg-emerald-50 border-[#00B251] text-[#00B251]' : 'bg-white border-gray-100'
                }`}
              >
                <span>{cat.emoji}</span>
                <span className="text-[11px] font-extrabold">{lang === 'te' ? cat.nameTe : cat.nameEn}</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-3">
            {visibleProducts.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div key={item.id} className="bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="h-24 w-full rounded-xl bg-gray-50 overflow-hidden mb-2 relative">
                      <img src={item.img} alt={item.nameEn} className="h-full w-full object-cover" />
                      <span
                        className={`absolute top-1 left-1 text-[8px] font-black px-1.5 py-0.5 rounded uppercase text-white ${
                          item.sellerType === 'farmer'
                            ? 'bg-green-600'
                            : item.sellerType === 'wholesale'
                            ? 'bg-indigo-700'
                            : 'bg-amber-600'
                        }`}
                      >
                        {item.sellerType}
                      </span>
                      {item.minQty > 1 && (
                        <span className="absolute bottom-1 left-1 bg-amber-300 text-gray-900 text-[9px] font-black px-1.5 py-0.5 rounded">
                          Min: {item.minQty} {item.unit}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-extrabold text-gray-900 leading-snug">
                      {lang === 'te' ? item.nameTe : item.nameEn}
                    </h4>
                    <p className="text-[9px] text-gray-500 font-semibold truncate">{item.sellerName}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2.5 pt-1">
                    <div>
                      <span className="text-xs font-black text-[#00B251]">₹{item.price}/{item.unit}</span>
                    </div>

                    {qty === 0 ? (
                      <button
                        onClick={() => addItem(item)}
                        className="px-2.5 py-1 rounded-lg bg-[#00B251] text-white text-[10px] font-extrabold shadow-sm"
                      >
                        + {item.minQty > 1 ? `Add ${item.minQty}` : 'Add'}
                      </button>
                    ) : (
                      <div className="flex items-center bg-[#00B251] text-white rounded-lg px-1.5 py-1 space-x-1.5">
                        <button onClick={() => removeItem(item)}>
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-[11px] font-bold">{qty}</span>
                        <button onClick={() => addItem(item)}>
                          <Plus className="h-3 w-3" />
                        </button>
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
          SCREEN 2: CART & CHECKOUT (PAYS DIRECTLY TO SELLER UPI/BANK/COD)
         ================================================================= */}
      {screen === 'cart' && (
        <main className="px-4 pt-4 space-y-3.5">
          <div className="flex items-center space-x-2">
            <button onClick={() => setScreen('home')} className="p-1.5 bg-white rounded-full shadow-sm">
              <ArrowLeft className="h-4 w-4 text-gray-700" />
            </button>
            <h2 className="text-base font-extrabold text-gray-900">My Basket & Checkout</h2>
          </div>

          {totalItems === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <p className="text-sm font-bold text-gray-500">Your basket is empty</p>
              <button onClick={() => setScreen('home')} className="mt-3 bg-[#00B251] text-white text-xs font-bold px-4 py-2 rounded-xl">
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
                    <div key={id} className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm">
                      <div>
                        <h4 className="text-xs font-extrabold">{item.nameTe} ({item.nameEn})</h4>
                        <p className="text-[10px] text-gray-500">
                          ₹{item.price}/{item.unit} × {qty} = ₹{item.price * qty}
                          {item.minQty > 1 ? ` (Wholesale Min: ${item.minQty} ${item.unit})` : ''}
                        </p>
                      </div>
                      <div className="flex items-center bg-[#00B251] text-white rounded-lg px-2 py-1 space-x-2">
                        <button onClick={() => removeItem(item)}><Minus className="h-3 w-3" /></button>
                        <span className="text-xs font-bold">{qty}</span>
                        <button onClick={() => addItem(item)}><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold">Delivery Address & GPS</span>
                  <button onClick={handleCaptureGps} className="text-[10px] font-extrabold text-[#00B251] bg-emerald-50 px-2 py-1 rounded-lg">
                    📍 Pin GPS
                  </button>
                </div>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs font-semibold"
                />
                {gpsStatus && <p className="text-[10px] font-bold text-emerald-700">{gpsStatus}</p>}
              </div>

              <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2.5 text-xs">
                <div className="grid grid-cols-2 gap-2 font-extrabold">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2 rounded-xl border ${paymentMethod === 'upi' ? 'bg-emerald-50 border-[#00B251] text-[#00B251]' : 'bg-gray-50'}`}
                  >
                    UPI / QR Pay
                  </button>
                  <button
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 rounded-xl border ${paymentMethod === 'cod' ? 'bg-emerald-50 border-[#00B251] text-[#00B251]' : 'bg-gray-50'}`}
                  >
                    Cash on Delivery
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-center space-y-2">
                    <p className="text-[11px] font-bold">Pay directly to Seller UPI: {activeUpiId}</p>
                    <img src={freeQrImageUrl} alt="UPI QR" className="w-28 h-28 mx-auto rounded-xl bg-white p-1 border" />
                    <a href={upiDeepLink} className="block w-full bg-[#5F259F] text-white font-extrabold py-2 rounded-xl">
                      Pay ₹{grandTotal} via PhonePe / GPay ↗
                    </a>
                    <input
                      type="text"
                      value={upiRefInput}
                      onChange={(e) => setUpiRefInput(e.target.value)}
                      placeholder="Enter UPI UTR / Ref ID"
                      className="w-full bg-white border rounded-xl px-3 py-1.5 text-center font-bold"
                    />
                  </div>
                )}

                <div className="border-t pt-2 flex justify-between text-sm font-black">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
                <button
                  onClick={handlePlaceCustomerOrder}
                  className="w-full bg-[#00B251] text-white font-extrabold py-3 rounded-xl shadow-md"
                >
                  Confirm Order • ₹{grandTotal}
                </button>
              </div>
            </>
          )}
        </main>
      )}

      {/* =================================================================
          SCREEN 3: WHOLESALE / RETAIL / FARMER DASHBOARD
          (Today Orders Accept/Reject, Stock Price + Min Qty, Today/Week/Month Payments, Bank/UPI Update)
         ================================================================= */}
      {screen === 'shopDashboard' && (
        <main className="px-4 pt-4 space-y-3.5">
          <div className="bg-indigo-900 text-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-indigo-700 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  {loggedInUser.role.titleEn} Dashboard
                </span>
                <h2 className="text-base font-black mt-1">{loggedInUser.name}</h2>
              </div>
              {currentShopRecord && (
                <span
                  className={`text-[10px] font-extrabold px-2 py-1 rounded-lg ${
                    currentShopRecord.approved ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-gray-900'
                  }`}
                >
                  {currentShopRecord.approved ? '✓ Approved Live' : '⏳ Pending Admin Approval'}
                </span>
              )}
            </div>
          </div>

          {/* 4 MANDATORY DASHBOARD TABS */}
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
                  shopTab === t.id ? 'bg-indigo-800 text-white border-indigo-800' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB 1: TODAY'S ORDERS (ACCEPT / REJECT / MARK DELIVERED -> AUTO INVOICE) */}
          {shopTab === 'orders' && (
            <div className="space-y-2.5">
              {myShopOrders.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 text-center text-xs font-bold text-gray-400">
                  No orders received yet.
                </div>
              ) : (
                myShopOrders.map((ord) => (
                  <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-2 text-xs">
                    <div className="flex justify-between font-black">
                      <span>{ord.id} • {ord.status}</span>
                      <span className="text-[#00B251]">₹{ord.total}</span>
                    </div>
                    <p className="font-bold text-gray-700">{ord.customer}</p>
                    <p className="text-[11px] text-gray-500">{ord.summary}</p>
                    <p className="text-[10px] font-bold text-indigo-700">{ord.payment}</p>

                    <div className="flex space-x-2 pt-1">
                      {ord.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => setOrders((p) => p.map((x) => (x.id === ord.id ? { ...x, status: 'Accepted' } : x)))}
                            className="flex-1 bg-[#00B251] text-white font-extrabold py-2 rounded-xl"
                          >
                            ✓ Accept Order
                          </button>
                          <button
                            onClick={() => setOrders((p) => p.map((x) => (x.id === ord.id ? { ...x, status: 'Rejected' } : x)))}
                            className="flex-1 bg-red-50 text-red-600 font-extrabold py-2 rounded-xl"
                          >
                            ✕ Reject
                          </button>
                        </>
                      )}

                      {ord.status === 'Accepted' && (
                        <button
                          onClick={() => handleMarkOrderDelivered(ord)}
                          className="w-full bg-blue-600 text-white font-extrabold py-2 rounded-xl"
                        >
                          🚚 Mark Delivered & Auto-Send WhatsApp/SMS Invoice
                        </button>
                      )}

                      {ord.status === 'Delivered' && (
                        <div className="w-full grid grid-cols-2 gap-2">
                          <a
                            href={getWhatsAppInvoiceLink(ord)}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#25D366] text-white font-bold py-1.5 rounded-lg text-center"
                          >
                            WhatsApp Bill
                          </a>
                          <a
                            href={getSmsInvoiceLink(ord)}
                            className="bg-gray-100 text-gray-800 font-bold py-1.5 rounded-lg text-center"
                          >
                            SMS Text Bill
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

{/* TAB 2: STOCK ITEM-WISE PRICE UPDATE & WHOLESALE MINIMUM QUANTITY CONTROL */}
          {shopTab === 'stock' && (
            <div className="space-y-3">
              {/* Add New Stock Item */}
              <form onSubmit={handleAddShopItem} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2.5 text-xs">
                <h3 className="font-extrabold text-gray-900">+ Add New Item to Your Shop</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={newItemEn}
                    onChange={(e) => setNewItemEn(e.target.value)}
                    placeholder="Item Name (English)"
                    className="bg-gray-50 border rounded-xl px-2.5 py-2 font-bold"
                  />
                  <input
                    type="text"
                    value={newItemTe}
                    onChange={(e) => setNewItemTe(e.target.value)}
                    placeholder="పేరు (తెలుగులో)"
                    className="bg-gray-50 border rounded-xl px-2.5 py-2 font-bold"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <select value={newItemCat} onChange={(e) => setNewItemCat(e.target.value)} className="bg-gray-50 border rounded-xl px-2 py-2 font-bold">
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="dairy">Dairy</option>
                    <option value="beverages">Beverages</option>
                    <option value="livestock">Eggs/Poultry</option>
                  </select>
                  <input
                    type="number"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="Price (₹)"
                    className="bg-gray-50 border rounded-xl px-2.5 py-2 font-black text-[#00B251]"
                  />
                  {loggedInUser.role.id === 'wholesale' ? (
                    <input
                      type="number"
                      required
                      min="1"
                      value={newItemMinQty}
                      onChange={(e) => setNewItemMinQty(e.target.value)}
                      placeholder="Min Qty"
                      className="bg-amber-50 border border-amber-300 rounded-xl px-2.5 py-2 font-black"
                    />
                  ) : (
                    <select value={newItemUnit} onChange={(e) => setNewItemUnit(e.target.value)} className="bg-gray-50 border rounded-xl px-2 py-2 font-bold">
                      <option value="kg">per kg</option>
                      <option value="L">per L</option>
                      <option value="pc">per pc</option>
                    </select>
                  )}
                </div>
                <button type="submit" className="w-full bg-[#00B251] text-white font-extrabold py-2.5 rounded-xl">
                  Add Stock Item
                </button>
              </form>

              {/* Edit Existing Shop Stock Prices & Wholesale Min Qty */}
              {myShopProducts.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-extrabold text-gray-900">{item.nameTe} ({item.nameEn})</h4>
                    {editingItemId === item.id ? (
                      <div className="flex items-center space-x-1.5 mt-1.5">
                        <input
                          type="number"
                          value={editPriceVal}
                          onChange={(e) => setEditPriceVal(e.target.value)}
                          placeholder="₹ Price"
                          className="w-16 border rounded px-2 py-1 font-black"
                        />
                        {loggedInUser.role.id === 'wholesale' && (
                          <input
                            type="number"
                            min="1"
                            value={editMinQtyVal}
                            onChange={(e) => setEditMinQtyVal(e.target.value)}
                            placeholder="Min Qty"
                            className="w-16 bg-amber-50 border border-amber-300 rounded px-2 py-1 font-black"
                          />
                        )}
                        <button
                          onClick={() => {
                            setProducts((prev) =>
                              prev.map((p) =>
                                p.id === item.id
                                  ? {
                                      ...p,
                                      price: Number(editPriceVal) || p.price,
                                      minQty:
                                        loggedInUser.role.id === 'wholesale'
                                          ? Math.max(1, Number(editMinQtyVal) || p.minQty)
                                          : p.minQty,
                                    }
                                  : p
                              )
                            );
                            setEditingItemId(null);
                          }}
                          className="bg-[#00B251] text-white p-1.5 rounded-lg"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-[11px] font-bold text-[#00B251] mt-0.5">
                        Price: ₹{item.price}/{item.unit}
                        {loggedInUser.role.id === 'wholesale' ? ` • Min Order Qty: ${item.minQty} ${item.unit}` : ''}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setEditingItemId(item.id);
                      setEditPriceVal(String(item.price));
                      setEditMinQtyVal(String(item.minQty));
                    }}
                    className="bg-indigo-50 text-indigo-700 px-2.5 py-1.5 rounded-xl font-extrabold flex items-center space-x-1"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: TODAY / WEEKLY / MONTHLY PAYMENTS HISTORY */}
          {shopTab === 'payments' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'today', label: "Today's" },
                  { id: 'week', label: 'Weekly' },
                  { id: 'month', label: 'Monthly' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPaymentPeriodFilter(p.id)}
                    className={`py-2 rounded-xl font-extrabold border ${
                      paymentPeriodFilter === p.id
                        ? 'bg-[#00B251] text-white border-[#00B251]'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
                <span className="font-bold text-gray-500 uppercase">{paymentPeriodFilter} Earnings</span>
                <span className="text-xl font-black text-[#00B251]">₹{filteredPaymentSum}</span>
              </div>

              {filteredPaymentOrders.map((o) => (
                <div key={o.id} className="bg-white rounded-2xl p-3 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="font-black text-gray-900">{o.id} • {o.customer}</p>
                    <p className="text-[10px] text-gray-500">{o.payment} ({o.status})</p>
                  </div>
                  <span className="font-black text-[#00B251]">+₹{o.total}</span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: BANK ACCOUNT & UPI DETAILS UPDATE */}
          {shopTab === 'bank' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 text-xs">
              <h3 className="font-extrabold text-gray-900">Update Bank Account & UPI Details</h3>
              {bankSavedMsg && (
                <div className="bg-emerald-50 text-emerald-800 font-bold p-2 rounded-xl">{bankSavedMsg}</div>
              )}
              <div>
                <label className="block font-bold text-gray-600 mb-1">Shop UPI ID (PhonePe / GPay / Paytm)</label>
                <input
                  type="text"
                  value={editUpi}
                  onChange={(e) => setEditUpi(e.target.value)}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-600 mb-1">Bank Name, Account Number & IFSC</label>
                <input
                  type="text"
                  value={editBank}
                  onChange={(e) => setEditBank(e.target.value)}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold"
                />
              </div>
              <label className="flex items-center space-x-2 font-bold">
                <input type="checkbox" checked={editCod} onChange={(e) => setEditCod(e.target.checked)} />
                <span>Accept Cash on Delivery (COD)</span>
              </label>
              <button
                onClick={() => {
                  setShops((prev) =>
                    prev.map((s) =>
                      s.id === loggedInUser.shopId
                        ? { ...s, upiId: editUpi, bankAccount: editBank, acceptCod: editCod }
                        : s
                    )
                  );
                  setBankSavedMsg('✅ Bank & UPI payment details updated successfully!');
                  setTimeout(() => setBankSavedMsg(''), 3000);
                }}
                className="w-full bg-indigo-800 text-white font-extrabold py-3 rounded-xl"
              >
                Save Bank & UPI Details
              </button>
            </div>
          )}
        </main>
      )}

{/* =================================================================
          SCREEN 4: DELIVERY PARTNER DASHBOARD
         ================================================================= */}
      {screen === 'deliveryDashboard' && (
        <main className="px-4 pt-4 space-y-3">
          <div className="bg-blue-900 text-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-base font-black">Delivery Partner Dashboard</h2>
            <p className="text-xs text-blue-200">{loggedInUser.name} • {loggedInUser.mobile}</p>
          </div>
          {orders.map((ord) => (
            <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2 text-xs">
              <div className="flex justify-between font-black">
                <span>{ord.id} • {ord.status}</span>
                <span className="text-[#00B251]">₹{ord.total}</span>
              </div>
              <p className="text-[11px] text-gray-600">{ord.customer} — {ord.summary}</p>
              <div className="flex space-x-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${ord.lat},${ord.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-blue-600 text-white font-extrabold py-2 rounded-xl text-center"
                >
                  🗺️ Google Maps
                </a>
                {ord.status !== 'Delivered' && (
                  <button
                    onClick={() => handleMarkOrderDelivered(ord)}
                    className="flex-1 bg-[#00B251] text-white font-extrabold py-2 rounded-xl"
                  >
                    ✓ Delivered + Send Bill
                  </button>
                )}
              </div>
            </div>
          ))}
        </main>
      )}

      {/* =================================================================
          SCREEN 5: MASTER ADMIN PANEL (SHOP PHOTO VERIFICATION & APPROVAL)
         ================================================================= */}
      {screen === 'adminPanel' && (
        <main className="px-4 pt-4 space-y-3.5">
          <div className="bg-purple-900 text-white rounded-2xl p-4 shadow-md">
            <span className="bg-purple-700 text-[10px] font-extrabold px-2 py-0.5 rounded">MASTER ADMIN</span>
            <h2 className="text-base font-black mt-1">రైతు బాస్కెట్ అడ్మిన్ కంట్రోల్</h2>
          </div>

          <div className="flex space-x-2">
            {[
              { id: 'approvals', label: `🏪 Shop Approvals (${shops.length})` },
              { id: 'orders', label: `🚚 All Orders (${orders.length})` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setAdminTab(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border ${
                  adminTab === t.id ? 'bg-purple-800 text-white border-purple-800' : 'bg-white text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {adminTab === 'approvals' && (
            <div className="space-y-3">
              {shops.map((shop) => (
                <div key={shop.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-2 text-xs">
                  <img src={shop.photoUrl} alt={shop.storeName} className="h-32 w-full object-cover rounded-xl border" />
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                        {shop.role}
                      </span>
                      <h4 className="text-sm font-black text-gray-900 mt-1">{shop.storeName}</h4>
                      <p className="text-[11px] text-gray-600">Owner: {shop.ownerName} • {shop.mobile}</p>
                      <p className="text-[11px] text-gray-500">Address: {shop.address}</p>
                      <p className="text-[10px] font-bold text-emerald-700 mt-0.5">
                        UPI: {shop.upiId || 'N/A'} | Bank: {shop.bankAccount || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setShops((prev) =>
                        prev.map((s) => (s.id === shop.id ? { ...s, approved: !s.approved } : s))
                      )
                    }
                    className={`w-full font-extrabold py-2.5 rounded-xl ${
                      shop.approved
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-[#00B251] text-white shadow-md'
                    }`}
                  >
                    {shop.approved ? '✓ Approved & Visible on App (Tap to Suspend)' : 'Verify Photo & Approve Shop'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'orders' && (
            <div className="space-y-2.5">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3 shadow-sm text-xs space-y-1">
                  <div className="flex justify-between font-black">
                    <span>{ord.id} • {ord.status}</span>
                    <span className="text-[#00B251]">₹{ord.total}</span>
                  </div>
                  <p>{ord.customer} — {ord.summary}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#00B251] text-white rounded-t-[26px] px-6 py-2.5 flex items-center justify-between shadow-2xl z-40">
        <button
          onClick={() => setScreen('home')}
          className={`flex flex-col items-center space-y-0.5 ${screen === 'home' ? 'text-white font-extrabold' : 'text-emerald-100/80'}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px]">{lang === 'te' ? 'మార్కెట్' : 'Market'}</span>
        </button>

        <button
          onClick={() => {
            const r = loggedInUser.role.id;
            if (r === 'admin') setScreen('adminPanel');
            else if (r === 'delivery') setScreen('deliveryDashboard');
            else if (r === 'customer') setScreen('cart');
            else setScreen('shopDashboard');
          }}
          className="flex flex-col items-center space-y-0.5 text-emerald-100/80"
        >
          <ClipboardList className="h-5 w-5" />
          <span className="text-[10px]">
            {loggedInUser.role.id === 'customer' ? 'Orders' : 'Dashboard'}
          </span>
        </button>

        <button
          onClick={() => setScreen('cart')}
          className="relative -mt-8 h-14 w-14 rounded-full bg-white text-[#00B251] shadow-lg border-4 border-[#F6FBF8] flex items-center justify-center"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-400 text-gray-900 text-[10px] font-black flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            if (loggedInUser.role.id === 'wholesale' || loggedInUser.role.id === 'retail' || loggedInUser.role.id === 'farmer') {
              setShopTab('payments');
              setScreen('shopDashboard');
            } else {
              setScreen('home');
            }
          }}
          className="flex flex-col items-center space-y-0.5 text-emerald-100/80"
        >
          <Wallet className="h-5 w-5" />
          <span className="text-[10px]">Payments</span>
        </button>

        <button
          onClick={() => {
            setLoggedInUser(null);
            setScreen('roles');
          }}
          className="flex flex-col items-center space-y-0.5 text-emerald-100/80"
        >
          <User className="h-5 w-5" />
          <span className="text-[10px]">{lang === 'te' ? 'రోల్ మార్చు' : 'Switch'}</span>
        </button>
      </nav>
    </div>
  );
}