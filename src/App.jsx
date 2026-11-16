import React, { useState, useEffect } from 'react';
import {
  Search, ShoppingCart, Plus, Minus, Home, ClipboardList, User, MapPin,
  Phone, MessageSquare, Sprout, Store, Truck, ShieldCheck, ChevronRight,
  ArrowLeft, CheckCircle2, Wallet, Gift, Sparkles, Bell, Navigation,
  LocateFixed, LogOut, Trash2, Printer, Share2, Tag, Check, Warehouse,
  Heart, Award, TrendingUp, Clock, Sliders, X, Package
} from 'lucide-react';

// Bilingual Auto-Translation Dictionary (English <-> Telugu)
const EN_TO_TE = {
  tomato: 'టమాటా',
  onion: 'ఉల్లిపాయలు',
  potato: 'బంగాళాదుంప',
  spinach: 'పాలకూర',
  mango: 'మామిడిపండు',
  banana: 'అరటిపండు',
  brinjal: 'వంకాయ',
  okra: 'బెండకాయ',
  carrot: 'క్యారెట్',
  chillies: 'పచ్చిమిర్చి',
  rice: 'సోనా మసూరి బియ్యం',
  milk: 'చిక్కటి పాలు',
  eggs: 'నాటు కోడి గుడ్లు',
  chicken: 'నాటు కోడి',
};

const TE_TO_EN = Object.fromEntries(
  Object.entries(EN_TO_TE).map(([en, te]) => [te, en.charAt(0).toUpperCase() + en.slice(1)])
);

const CATEGORIES = [
  { id: 'All', labelEn: 'All Items', labelTe: 'అన్నీ', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=160&q=80' },
  { id: 'Vegetables', labelEn: 'Vegetables', labelTe: 'కూరగాయలు', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=160&q=80' },
  { id: 'Fruits', labelEn: 'Fruits', labelTe: 'పండ్లు', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=160&q=80' },
  { id: 'Leafy Greens', labelEn: 'Leafy Greens', labelTe: 'ఆకుకూరలు', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=160&q=80' },
  { id: 'Staples', labelEn: 'Staples', labelTe: 'బియ్యం & పప్పులు', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=160&q=80' },
];

const INITIAL_USERS = [
  { id: 'u_cust_1', role: 'customer', name: 'Madhav Reddy', mobile: '9876543210', address: 'Vedayapalem, Nellore', approved: true, wallet: 100, walletExpiryHours: 36, referralsCount: 2, ordersCompleted: 1 },
  { id: 'u_farm_1', role: 'farmer', name: 'K. Ramaiah (Kovur Farm)', mobile: '9440112233', address: 'Kovur, Nellore (12 km)', approved: true, wallet: 2450 },
  { id: 'u_whole_1', role: 'wholesale', name: 'Nellore Mandi Wholesale', mobile: '9989334455', address: 'Atmakur Bus Stand, Nellore', approved: true, wallet: 5200 },
  { id: 'u_ret_1', role: 'retail', name: 'Balaji Fresh Retail Mart', mobile: '9849223344', address: 'Magunta Layout, Nellore', approved: true, wallet: 1800 },
  { id: 'u_del_1', role: 'delivery', name: 'Ramesh Kumar (Fleet)', mobile: '9000334455', address: 'Nellore Zone 1', approved: true, wallet: 3450, weeklyOrders: 78 },
  { id: 'u_admin_1', role: 'admin', name: 'Master Admin HQ', mobile: '8328261103', address: 'Nellore HQ', approved: true, wallet: 0 },
];

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    farmerId: 'u_farm_1',
    farmerName: 'Ramaiah Farm • Kovur',
    distanceKm: 12,
    nameEn: 'Fresh Country Tomato',
    nameTe: 'టమాటా',
    cat: 'Vegetables',
    packLabel: '1 kg',
    mrp: 48,
    retailPrice: 36,
    farmerDirectPrice: 24,
    wholesalePrice: 28,
    minWholesaleQty: 25,
    stockKg: 500,
    inStock: true,
    availableFrom: 'Today, 5:00 PM',
    img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'p2',
    farmerId: 'u_farm_1',
    farmerName: 'Subba Rao Farm • Buchi',
    distanceKm: 18,
    nameEn: 'Red Onion',
    nameTe: 'ఉల్లిపాయలు',
    cat: 'Vegetables',
    packLabel: '1 kg',
    mrp: 44,
    retailPrice: 34,
    farmerDirectPrice: 22,
    wholesalePrice: 26,
    minWholesaleQty: 50,
    stockKg: 800,
    inStock: true,
    availableFrom: 'Tomorrow, 6:00 AM',
    img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'p3',
    farmerId: 'u_farm_1',
    farmerName: 'Rapur Orchards • Nellore',
    distanceKm: 32,
    nameEn: 'Banganapalli Mango',
    nameTe: 'మామిడిపండు',
    cat: 'Fruits',
    packLabel: '1 kg',
    mrp: 140,
    retailPrice: 110,
    farmerDirectPrice: 85,
    wholesalePrice: 95,
    minWholesaleQty: 20,
    stockKg: 300,
    inStock: true,
    availableFrom: 'Available Now',
    img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
  },
  {
id: 'p4',
    farmerId: 'u_farm_1',
    farmerName: 'Padma Organic • Nellore',
    distanceKm: 6,
    nameEn: 'Fresh Spinach (Palakura)',
    nameTe: 'పాలకూర',
    cat: 'Leafy Greens',
    packLabel: '2 Bunches',
    mrp: 28,
    retailPrice: 20,
    farmerDirectPrice: 14,
    wholesalePrice: 16,
    minWholesaleQty: 15,
    stockKg: 150,
    inStock: true,
    availableFrom: 'Today, 6:00 AM',
    img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'p5',
    farmerId: 'u_farm_1',
    farmerName: 'Nellore Heritage Mills',
    distanceKm: 8,
    nameEn: 'Sona Masuri Rice',
    nameTe: 'సోనా మసూరి బియ్యం',
    cat: 'Staples',
    packLabel: '5 kg',
    mrp: 340,
    retailPrice: 285,
    farmerDirectPrice: 250,
    wholesalePrice: 265,
    minWholesaleQty: 10,
    stockKg: 1200,
    inStock: true,
    availableFrom: 'Available Now',
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
  },
];

// Crisp Vector Payment Badges
const PaymentBadge = ({ type }) => {
  if (type === 'phonepe') {
    return <span className="h-8 w-8 rounded-xl bg-[#5F259F] text-white font-black text-xs flex items-center justify-center shadow-sm">पे</span>;
  }
  if (type === 'gpay') {
    return <span className="h-8 w-8 rounded-xl bg-white border border-gray-200 text-[#1A73E8] font-black text-xs flex items-center justify-center shadow-sm">G</span>;
  }
  if (type === 'paytm') {
    return <span className="h-8 w-8 rounded-xl bg-[#00BAF2] text-[#002970] font-black text-[9px] flex items-center justify-center shadow-sm">Paytm</span>;
  }
  if (type === 'cred') {
    return <span className="h-8 w-8 rounded-xl bg-slate-900 text-amber-300 font-black text-[9px] flex items-center justify-center shadow-sm">CRED</span>;
  }
  if (type === 'card') {
    return <span className="h-8 w-8 rounded-xl bg-slate-800 text-white font-black text-[9px] flex items-center justify-center shadow-sm">CARD</span>;
  }
  return (
    <span className="h-8 w-8 rounded-xl bg-emerald-100 text-[#15803D] flex items-center justify-center shadow-sm">
      <Wallet className="h-4 w-4" />
    </span>
  );
};

export default function App() {
  // Load Google Fonts (Plus Jakarta Sans + Noto Sans Telugu) for commercial typography
  useEffect(() => {
    const id = 'rythu-google-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@500;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const [selectedRole, setSelectedRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Auth & Registration States
  const [authScreen, setAuthScreen] = useState('login');
  const [loginMobile, setLoginMobile] = useState('');
  const [loginOtpSent, setLoginOtpSent] = useState(false);
  const [loginOtp, setLoginOtp] = useState('');
  const [authMsg, setAuthMsg] = useState('');
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regReferralCode, setRegReferralCode] = useState('');
  const [showWelcomeSmile, setShowWelcomeSmile] = useState(false);

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState(['p1', 'p3']);

  // Cart, Checkout & Payment States
  const [cart, setCart] = useState({ p1: 2, p3: 1 });
  const [useWalletBalance, setUseWalletBalance] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [payMode, setPayMode] = useState('cred');
  const [cardNo, setCardNo] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

// B2B Wholesale / Retail States
  const [b2bSource, setB2bSource] = useState('farmer');
  const [b2bDeliveryMode, setB2bDeliveryMode] = useState('pickup');

  // Scratch Card & Notifications
  const [scratchCard, setScratchCard] = useState(null);
  const [notifications, setNotifications] = useState([
    'Wallet Alert: ₹100 cashback expires in 36 hours (48h–6h window). Use it on your next order!',
    '40km Wholesale Alert: Kovur Farmer listed 500 KG Fresh Country Tomato.',
  ]);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: 'RB-501',
      buyerRole: 'customer',
      buyerName: 'Madhav Reddy',
      buyerMobile: '9876543210',
      buyerAddress: 'Vedayapalem, Nellore (14.4285, 79.9692)',
      items: [{ id: 'p1', name: 'Fresh Country Tomato', qty: 2, price: 36 }],
      total: 72,
      cashback: 12,
      status: 'Out for Delivery',
      driverName: 'Ramesh Kumar',
      driverMobile: '9000334455',
      driverCoords: '14.4350, 79.9780 (1.2 km away)',
      b2bOtp: null,
      date: 'Today, 4:10 PM',
    },
    {
      id: 'RB-502',
      buyerRole: 'wholesale',
      buyerName: 'Nellore Mandi Wholesale',
      buyerMobile: '9989334455',
      buyerAddress: 'Atmakur Bus Stand, Nellore (14.4426, 79.9865)',
      items: [{ id: 'p1', name: 'Fresh Country Tomato', qty: 50, price: 24 }],
      total: 1200,
      cashback: 0,
      status: 'Order Placed',
      driverName: null,
      driverMobile: null,
      driverCoords: null,
      b2bOtp: '6492',
      date: 'Today, 4:25 PM',
    },
  ]);

  // Farmer Form States
  const [fNameEn, setFNameEn] = useState('');
  const [fNameTe, setFNameTe] = useState('');
  const [fQty, setFQty] = useState('100');
  const [fPrice, setFPrice] = useState('22');
  const [fAvailTime, setFAvailTime] = useState('Tomorrow, 6:30 AM');

  // Delivery & Admin States
  const [delivFilter, setDelivFilter] = useState('available');
  const [scratchMin, setScratchMin] = useState(4);
  const [scratchMax, setScratchMax] = useState(25);
  const [offersEnabled, setOffersEnabled] = useState(true);
  const [adminTab, setAdminTab] = useState('approvals');

  const notify = (m) => {
    setToast(m);
    setTimeout(() => setToast(''), 3000);
  };

  // Farmer Bilingual Translation Handlers
  const handleFarmerEnChange = (val) => {
    setFNameEn(val);
    const key = val.trim().toLowerCase();
    if (EN_TO_TE[key]) setFNameTe(EN_TO_TE[key]);
  };

  const handleFarmerTeChange = (val) => {
    setFNameTe(val);
    if (TE_TO_EN[val.trim()]) setFNameEn(TE_TO_EN[val.trim()]);
  };

  // Login Verification
  const handleSendOtp = () => {
    const clean = loginMobile.replace(/\D/g, '');
    if (clean.length !== 10) {
      setAuthMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    const existing = users.find((u) => u.mobile === clean && u.role === selectedRole);
    if (!existing) {
      setAuthMsg('Mobile number not registered, please register.');
      setLoginOtpSent(false);
      return;
    }
    setAuthMsg('');
    setLoginOtpSent(true);
    notify('OTP Sent: 4829');
  };

  const handleVerifyLogin = (e) => {
    e.preventDefault();
    const clean = loginMobile.replace(/\D/g, '');
    const existing = users.find((u) => u.mobile === clean && u.role === selectedRole);
    if (!existing) {
      setAuthMsg('Mobile number not registered, please register.');
      return;
    }
    setCurrentUser(existing);
    setActiveTab('home');
  };

  // Registration with Welcome Smile Animation
  const handleRegister = (e) => {
    e.preventDefault();
    const clean = regMobile.replace(/\D/g, '');
    if (!regName.trim() || clean.length !== 10 || !regAddress.trim()) {
      setAuthMsg('Please enter Full Name, 10-digit Mobile & Address.');
      return;
    }
    const needsApproval = selectedRole === 'farmer' || selectedRole === 'wholesale' || selectedRole === 'retail';
    const newUser = {
      id: 'u_' + Date.now(),
      role: selectedRole,
      name: regName.trim(),
      mobile: clean,
      address: regAddress.trim(),
      approved: !needsApproval,
      wallet: 0,
      walletExpiryHours: 360,
      referralsCount: 0,
      ordersCompleted: 0,
      referredBy: regReferralCode.trim() || null,
    };
    setUsers([newUser, ...users]);
    if (needsApproval) {
      setNotifications((prev) => [
        `New ${selectedRole.toUpperCase()} registration (${newUser.name}) awaiting Admin approval.`,
        ...prev,
      ]);
    }
    setCurrentUser(newUser);
    setShowWelcomeSmile(true);
    setActiveTab('home');
    setTimeout(() => setShowWelcomeSmile(false), 3500);
  };

  // Strict Logout (Only way to switch roles)
  const handleStrictLogout = () => {
    setCurrentUser(null);
    setSelectedRole(null);
    setLoginMobile('');
    setLoginOtpSent(false);
    setAuthMsg('');
    setActiveTab('home');
  };

  const fontStyle = { fontFamily: "'Plus Jakarta Sans', 'Noto Sans Telugu', sans-serif" };

  // =========================================================================
  // 1. COMMERCIAL ROLE ENTRY GATE (DEEP FOREST GREEN + GOLD THEME)
  // =========================================================================
  if (!selectedRole) {
    const roles = [
      { id: 'customer', title: 'Customer Store', te: 'వినియోగదారుడు', desc: 'Fresh harvest, tiered offers, wallet cashback & live tracking', icon: ShoppingCart, accent: 'bg-emerald-50 text-[#15803D] border-emerald-200' },
      { id: 'farmer', title: 'Farmer Portal', te: 'రైతు విభాగం', desc: 'Auto Telugu/English listing, 40km shop alerts & stock sync', icon: Sprout, accent: 'bg-lime-50 text-lime-800 border-lime-200' },
      { id: 'wholesale', title: 'Wholesale Store', te: 'హోల్‌సేల్ వ్యాపారి', desc: 'Bulk orders, farm pickup vs delivery & GST PDF invoices', icon: Warehouse, accent: 'bg-amber-50 text-amber-800 border-amber-200' },
      { id: 'retail', title: 'Retail Shopkeeper', te: 'రిటైల్ షాపు', desc: 'Farmer vs wholesale pricing, min qty & digital PDF bills', icon: Store, accent: 'bg-orange-50 text-orange-800 border-orange-200' },
      { id: 'delivery', title: 'Delivery Partner', te: 'డెలివరీ పార్టనర్', desc: 'Weekly 100-order ₹1,500 bonus, live GPS & B2B OTP', icon: Truck, accent: 'bg-sky-50 text-sky-800 border-sky-200' },
      { id: 'admin', title: 'Master Admin', te: 'మాస్టర్ అడ్మిన్', desc: 'Scratch card limits, offer toggles, stock & shop approvals', icon: ShieldCheck, accent: 'bg-purple-50 text-purple-800 border-purple-200' },
    ];

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto text-slate-800 shadow-2xl pb-10">
        <div className="bg-gradient-to-br from-[#0F5132] via-[#15803D] to-[#16A34A] text-white rounded-b-[36px] p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center space-x-3.5 relative z-10">
            <div className="h-16 w-16 rounded-full bg-white p-0.5 shadow-lg border-2 border-[#EAB308] overflow-hidden flex-shrink-0">
              <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
            </div>
            <div>
              <span className="bg-white/15 text-[#FDE047] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Nellore Agri-Commerce
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight mt-1">రైతు బాస్కెట్</h1>
              <p className="text-xs font-semibold text-emerald-100">Rythu Basket • Farm to Everyone</p>
            </div>
          </div>

          <div className="mt-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-xs text-emerald-50 flex items-center justify-between">
            <span>Select your workspace role to continue</span>
            <span className="text-[#FDE047] font-bold">v2.0 Pro</span>
          </div>
        </div>

        <div className="px-4 pt-5 space-y-3">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRole(r.id);
                  setAuthScreen('login');
                  setLoginMobile('');
                  setLoginOtpSent(false);
                  setAuthMsg('');
                }}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-[#15803D] hover:shadow-md flex items-center justify-between text-left transition-all active:scale-[0.99]"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${r.accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-sm font-extrabold text-slate-900">{r.title}</h2>
                      <span className="text-[11px] font-bold text-[#15803D]">• {r.te}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{r.desc}</p>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

// =========================================================================
  // 2. LOGIN & REGISTRATION SCREEN
  // =========================================================================
  if (!currentUser) {
    const demoNumbers = {
      customer: '9876543210',
      farmer: '9440112233',
      wholesale: '9989334455',
      retail: '9849223344',
      delivery: '9000334455',
      admin: '8328261103',
    };

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto text-slate-800 shadow-2xl pb-10">
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl">
            {toast}
          </div>
        )}

        <div className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white rounded-b-[32px] p-5 shadow-lg flex items-center space-x-3">
          <button onClick={() => setSelectedRole(null)} className="p-2.5 bg-white/15 rounded-full hover:bg-white/25 transition">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="h-12 w-12 rounded-full bg-white p-0.5 border border-[#EAB308] overflow-hidden">
            <img src="/icon-512.png" alt="Logo" className="h-full w-full object-cover rounded-full" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Authentication</span>
            <h2 className="text-base font-extrabold uppercase">{selectedRole} Portal</h2>
          </div>
        </div>

        <div className="p-4 -mt-2">
          <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-2xl font-extrabold">
              <button
                type="button"
                onClick={() => { setAuthScreen('login'); setAuthMsg(''); }}
                className={`py-2.5 rounded-xl transition ${authScreen === 'login' ? 'bg-[#15803D] text-white shadow-sm' : 'text-slate-600'}`}
              >
                Existing Login
              </button>
              <button
                type="button"
                onClick={() => { setAuthScreen('register'); setAuthMsg(''); }}
                className={`py-2.5 rounded-xl transition ${authScreen === 'register' ? 'bg-[#15803D] text-white shadow-sm' : 'text-slate-600'}`}
              >
                New Registration
              </button>
            </div>

            {authScreen === 'login' ? (
              <form onSubmit={handleVerifyLogin} className="space-y-3.5">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Demo Number:</span>
                  <strong className="text-[#15803D] font-extrabold">{demoNumbers[selectedRole]}</strong>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Mobile Number</label>
                  <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3 bg-slate-50 focus-within:border-[#15803D] focus-within:bg-white transition">
                    <span className="font-extrabold text-slate-500 pr-2.5 border-r border-slate-200">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={loginMobile}
                      onChange={(e) => { setLoginMobile(e.target.value.replace(/\D/g, '')); setAuthMsg(''); }}
                      placeholder="Enter 10-digit mobile"
                      className="w-full bg-transparent pl-3 font-bold text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {authMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl font-bold flex items-center justify-between">
                    <span>{authMsg}</span>
                    <button
                      type="button"
                      onClick={() => { setRegMobile(loginMobile); setAuthScreen('register'); setAuthMsg(''); }}
                      className="bg-red-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-extrabold ml-2"
                    >
                      Register
                    </button>
                  </div>
                )}

                {!loginOtpSent ? (
                  <button type="button" onClick={handleSendOtp} className="w-full bg-[#15803D] hover:bg-[#116932] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm transition">
                    Send Verification OTP
                  </button>
                ) : (
                  <>
                    <div className="bg-emerald-50 border border-emerald-200 text-[#15803D] font-extrabold p-2.5 rounded-2xl text-center">
                      Demo OTP Code: 4829
                    </div>
                    <input
                      type="tel"
                      maxLength={4}
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      placeholder="• • • •"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 text-center text-base font-extrabold tracking-[0.5em] focus:border-[#15803D] focus:outline-none"
                    />
                    <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm">
                      Verify & Continue
                    </button>
                  </>
                )}
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Full Name / Store Name *" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 font-bold" />
                <input type="tel" maxLength={10} required value={regMobile} onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))} placeholder="10-Digit Mobile Number *" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 font-bold" />
                <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Complete Address in Nellore *" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 font-bold" />
                {selectedRole === 'customer' && (
                  <input type="text" value={regReferralCode} onChange={(e) => setRegReferralCode(e.target.value.toUpperCase())} placeholder="Referral Code (Optional • ₹50 Bonus)" className="w-full bg-amber-50/70 border border-amber-200 rounded-2xl px-3.5 py-3 font-bold" />
                )}
                {authMsg && <p className="text-red-600 font-bold">{authMsg}</p>}
                <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm">
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

// Smiling Welcome Modal
  const WelcomeSmileModal = () =>
    showWelcomeSmile ? (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 text-center max-w-xs w-full space-y-3 shadow-2xl border border-emerald-100">
          <div className="h-16 w-16 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">Thanks for Register with Us!</h3>
          <p className="text-xs text-slate-500">Welcome to Rythu Basket Nellore, {currentUser.name}.</p>
        </div>
      </div>
    ) : null;

  // Shared Professional Profile Tab
  const renderSharedProfileTab = () => (
    <div className="p-4 space-y-3.5 text-xs">
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center space-x-3.5">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#15803D] to-[#22C55E] text-white font-extrabold text-xl flex items-center justify-center shadow">
          {currentUser.name.charAt(0)}
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded-md">
            {currentUser.role}
          </span>
          <h2 className="text-base font-extrabold text-slate-900 mt-0.5">{currentUser.name}</h2>
          <p className="text-slate-500 font-semibold">+91 {currentUser.mobile} • {currentUser.address}</p>
        </div>
      </div>

      {/* Wallet Card with 15-Day Expiry & 48h-6h Alert */}
      <div className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white rounded-3xl p-5 shadow-md space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-emerald-100 flex items-center space-x-1.5">
            <Wallet className="h-4 w-4 text-[#FDE047]" />
            <span>Rythu Wallet Balance</span>
          </span>
          <span className="bg-white/15 text-[10px] font-bold px-2.5 py-0.5 rounded-full">15-Day Validity</span>
        </div>
        <h3 className="text-3xl font-extrabold">₹{currentUser.wallet || 0}</h3>
        <div className="bg-white/10 rounded-xl p-2 text-[10px] text-amber-200 font-semibold flex items-center space-x-1.5">
          <Clock className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Auto-Alert active: Notifies 48h–6h before 15-day expiry.</span>
        </div>
      </div>

      {/* Refer & Earn */}
      {currentUser.role === 'customer' && (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-amber-200/70 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-slate-900 flex items-center space-x-1.5">
              <Gift className="h-4 w-4 text-[#EA580C]" />
              <span>Refer & Earn (₹50 / Referral)</span>
            </span>
            <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
              {currentUser.referralsCount || 0} / 10 Claimed
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Earn <strong>₹50</strong> wallet cashback when your friend installs & completes their 1st order of <strong>₹200+</strong> (valid for first 10 referrals).
          </p>
          <div className="flex space-x-2">
            <input readOnly value={`https://rythu-market.vercel.app/?ref=${currentUser.mobile}`} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600" />
            <button onClick={() => notify('Referral link copied to clipboard!')} className="bg-[#EA580C] text-white font-extrabold px-3.5 py-2 rounded-xl">
              Share
            </button>
          </div>
        </div>
      )}

      {/* Coupons & Offers */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-2">
        <h3 className="font-extrabold text-slate-900 flex items-center space-x-1.5">
          <Tag className="h-4 w-4 text-[#15803D]" />
          <span>Active Loyalty Tiers & Coupons</span>
        </h3>
        <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl font-bold text-[#15803D]">
          Orders 1–2: 50% OFF (Up to ₹100)
        </div>
        <div className="p-2.5 bg-sky-50/70 border border-sky-100 rounded-xl font-bold text-sky-800">
          Orders 3–5: 25% OFF Instant Discount
        </div>
        <div className="p-2.5 bg-amber-50/70 border border-amber-100 rounded-xl font-bold text-amber-800">
          Orders 5–10: ₹20 Assured Wallet Cashback
        </div>
      </div>

      <a href="tel:8328261103" className="w-full bg-white border border-slate-200 text-slate-800 font-extrabold py-3.5 rounded-2xl flex items-center justify-center space-x-2 shadow-sm">
        <Phone className="h-4 w-4 text-[#15803D]" />
        <span>Contact Support (8328261103)</span>
      </a>

      <button
        onClick={handleStrictLogout}
        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md flex items-center justify-center space-x-2 transition"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout (Switch Role)</span>
      </button>
    </div>
  );

  // =========================================================================
  // 3. CUSTOMER STOREFRONT (COMMERCIAL AGRI-FRESH UI)
  // =========================================================================
  if (currentUser.role === 'customer') {
    const orderNum = (currentUser.ordersCompleted || 0) + 1;
    const totalUnits = Object.values(cart).reduce((a, b) => a + b, 0);
    const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = products.find((x) => x.id === id);
      return sum + (p ? p.retailPrice * qty : 0);
    }, 0);

    let autoTierDiscount = 0;
    let autoTierLabel = '';
    if (offersEnabled && subtotal > 0) {
      if (orderNum <= 2) {
        autoTierDiscount = Math.min(100, Math.round(subtotal * 0.5));
        autoTierLabel = `1st 2 Orders 50% OFF`;
      } else if (orderNum <= 5) {
        autoTierDiscount = Math.min(80, Math.round(subtotal * 0.25));
        autoTierLabel = `Orders 3-5 25% OFF`;
      }
    }

const deliveryFee = subtotal === 0 ? 0 : subtotal >= 99 ? 0 : 20;
    const walletDeduction = useWalletBalance ? Math.min(currentUser.wallet || 0, Math.max(0, subtotal - autoTierDiscount)) : 0;
    const promoDeduction = appliedPromo ? 30 : 0;
    const payableTotal = Math.max(0, subtotal + deliveryFee - autoTierDiscount - promoDeduction - walletDeduction);

    const estimatedCashback =
      payMode === 'cred'
        ? Math.max(10, Math.round(payableTotal * 0.08))
        : payMode === 'paytm' || payMode === 'card'
        ? Math.max(5, Math.round(payableTotal * 0.05))
        : orderNum >= 5 && orderNum <= 10
        ? 20
        : 5;

    const handlePlaceCustomerOrder = () => {
      const itemsArr = Object.entries(cart)
        .map(([id, qty]) => {
          const p = products.find((x) => x.id === id);
          return p ? { id: p.id, name: p.nameEn, qty, price: p.retailPrice } : null;
        })
        .filter(Boolean);

      if (itemsArr.length === 0) return;

      const newOrd = {
        id: 'RB-' + Math.floor(600 + Math.random() * 390),
        buyerRole: 'customer',
        buyerName: currentUser.name,
        buyerMobile: currentUser.mobile,
        buyerAddress: currentUser.address,
        items: itemsArr,
        total: payableTotal,
        cashback: estimatedCashback,
        status: 'Order Placed',
        driverName: null,
        driverMobile: null,
        driverCoords: null,
        b2bOtp: null,
        date: 'Just now',
      };

      const updatedUser = {
        ...currentUser,
        wallet: (currentUser.wallet || 0) - walletDeduction,
        ordersCompleted: (currentUser.ordersCompleted || 0) + 1,
      };
      setCurrentUser(updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      setOrders([newOrd, ...orders]);
      setCart({});
      setActiveTab('orders');
      notify(`Order ${newOrd.id} Placed! ₹${estimatedCashback} Cashback credits on delivery.`);
    };

    const handleSimulateCustomerDelivery = (ord) => {
      const isLucky = Math.random() > 0.2;
      const reward = isLucky ? Math.floor(scratchMin + Math.random() * (scratchMax - scratchMin + 1)) : 0;

      const updatedUser = {
        ...currentUser,
        wallet: (currentUser.wallet || 0) + (ord.cashback || 0) + reward,
      };
      setCurrentUser(updatedUser);
      setOrders((prev) => prev.map((o) => (o.id === ord.id ? { ...o, status: 'Delivered' } : o)));
      setScratchCard({ orderId: ord.id, reward, scratched: false });
    };

    const visibleProducts = products.filter((p) => {
      const catOk = selectedCat === 'All' || p.cat === selectedCat;
      const q = search.toLowerCase();
      return catOk && (p.nameEn.toLowerCase().includes(q) || p.nameTe.includes(search));
    });

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto relative pb-28 text-slate-800 shadow-2xl">
        <WelcomeSmileModal />
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2.5 rounded-full shadow-xl whitespace-nowrap">
            {toast}
          </div>
        )}

        {/* SCRATCH CARD POPUP */}
        {scratchCard && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 text-center max-w-xs w-full space-y-4 shadow-2xl">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Order {scratchCard.orderId} Delivered!</h3>
              {!scratchCard.scratched ? (
                <button
                  onClick={() => setScratchCard({ ...scratchCard, scratched: true })}
                  className="w-full h-32 rounded-2xl bg-gradient-to-br from-[#EAB308] to-[#EA580C] text-white font-extrabold text-base shadow-lg flex flex-col items-center justify-center"
                >
                  <span>TAP TO SCRATCH CARD</span>
                  <span className="text-xs font-medium mt-1 opacity-90">Win up to ₹{scratchMax} Wallet Cashback</span>
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <p className="text-xl font-extrabold text-[#15803D]">
                    {scratchCard.reward > 0 ? `You Won ₹${scratchCard.reward}!` : 'Better Luck Next Time!'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {scratchCard.reward > 0 ? 'Added to Rythu Wallet (15-day validity).' : 'Order again for your next reward!'}
                  </p>
                </div>
              )}
              <button onClick={() => setScratchCard(null)} className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl text-xs">
                Done
              </button>
            </div>
          </div>
        )}

        {/* GLASSMORPHISM FOREST-GREEN HEADER */}
        <header className="bg-gradient-to-b from-[#0F5132] to-[#15803D] text-white sticky top-0 z-30 px-4 pt-3.5 pb-4 rounded-b-[28px] shadow-lg space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="h-10 w-10 rounded-full bg-white p-0.5 border border-[#EAB308] overflow-hidden shadow">
                <img src="/icon-512.png" alt="Logo" className="h-full w-full object-cover rounded-full" />
              </div>
              <div>
                <div className="flex items-center space-x-1 text-[10px] font-bold text-[#FDE047]">
                  <MapPin className="h-3 w-3" />
                  <span>DELIVERING TO</span>
                </div>
                <p className="text-xs font-extrabold truncate max-w-[175px]">{currentUser.address}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className="bg-white/15 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center space-x-1.5 shadow-sm"
            >
              <Wallet className="h-3.5 w-3.5 text-[#FDE047]" />
              <span>₹{currentUser.wallet || 0}</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="bg-white/95 text-slate-800 rounded-2xl px-3.5 py-2.5 flex items-center shadow-sm">
            <Search className="h-4 w-4 text-slate-400 mr-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 'Nellore Sona Masuri' or 'Tomato'..."
              className="w-full bg-transparent text-xs font-semibold focus:outline-none"
            />
          </div>

          {/* Offers & Free Delivery ₹99 Ticker */}
          {offersEnabled && (
            <div className="bg-black/20 rounded-xl px-3 py-1.5 text-[10px] font-bold text-[#FDE047] flex items-center justify-between">
              <span>FREE Delivery above ₹99 • 1st 2 Orders 50% OFF</span>
              <span className="bg-[#EA580C] text-white px-1.5 py-0.5 rounded text-[9px] font-extrabold">RYTHU30</span>
            </div>
          )}
        </header>

{/* TAB 1: HOME STOREFRONT */}
        {activeTab === 'home' && (
          <main className="px-4 pt-4 space-y-4 text-xs">
            {/* HD Circular Category Cutout Strip */}
            <div className="flex space-x-3 overflow-x-auto pb-1">
              {CATEGORIES.map((c) => {
                const active = selectedCat === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCat(c.id)}
                    className="flex-shrink-0 flex flex-col items-center space-y-1.5"
                  >
                    <div className={`h-14 w-14 rounded-full p-0.5 border-2 transition ${active ? 'border-[#15803D] scale-105 shadow-md' : 'border-slate-200'}`}>
                      <img src={c.img} alt={c.labelEn} className="h-full w-full object-cover rounded-full" />
                    </div>
                    <span className={`text-[10px] font-extrabold ${active ? 'text-[#15803D]' : 'text-slate-600'}`}>
                      {c.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tiered Loyalty Offer Card */}
            {offersEnabled && (
              <div className="bg-gradient-to-r from-[#FEF9C3] to-[#DCFCE7] border border-emerald-200/80 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
                <div>
                  <span className="bg-[#15803D] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                    Order #{orderNum} Reward
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                    {orderNum <= 2 ? '50% OFF Unlocked!' : orderNum <= 5 ? '25% OFF Unlocked!' : '₹20 Cashback Unlocked!'}
                  </h3>
                  <p className="text-[10px] text-slate-600">Applied automatically at checkout</p>
                </div>
                <button onClick={() => setActiveTab('cart')} className="bg-[#EA580C] text-white font-extrabold px-3.5 py-2 rounded-xl shadow-sm">
                  View Cart
                </button>
              </div>
            )}

            {/* Commercial Product Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {visibleProducts.map((p) => {
                const q = cart[p.id] || 0;
                const offPct = Math.round(((p.mrp - p.retailPrice) / p.mrp) * 100);
                const wished = wishlist.includes(p.id);

                return (
                  <div key={p.id} className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="relative h-28 w-full rounded-xl bg-slate-50 overflow-hidden mb-2">
                        <img src={p.img} alt={p.nameEn} className="h-full w-full object-cover" />
                        <span className="absolute top-0 left-0 bg-[#15803D] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-br-xl">
                          {offPct}% OFF
                        </span>
                        <button
                          onClick={() => setWishlist((w) => (w.includes(p.id) ? w.filter((x) => x !== p.id) : [...w, p.id]))}
                          className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                        >
                          <Heart className={`h-3.5 w-3.5 ${wished ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                        </button>
                      </div>

                      <p className="text-[10px] font-bold text-slate-400 truncate">{p.farmerName} • {p.distanceKm} km</p>
                      <h4 className="text-xs font-extrabold text-slate-900 leading-snug mt-0.5">{p.nameEn}</h4>
                      <p className="text-[11px] font-bold text-[#15803D]">{p.nameTe}</p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-50 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block">{p.packLabel}</span>
                        <span className="text-sm font-extrabold text-slate-900">₹{p.retailPrice}</span>
                        <span className="text-[10px] text-slate-400 line-through ml-1">₹{p.mrp}</span>
                      </div>

                      {!p.inStock ? (
                        <span className="text-[10px] font-extrabold text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">Sold Out</span>
                      ) : q === 0 ? (
                        <button
                          onClick={() => setCart({ ...cart, [p.id]: 1 })}
                          className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-xl shadow-sm transition active:scale-95"
                        >
                          ADD
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#15803D] text-white rounded-xl px-2 py-1 space-x-2 font-extrabold shadow-sm">
                          <button onClick={() => setCart((c) => { const n = { ...c }; if (n[p.id] <= 1) delete n[p.id]; else n[p.id]--; return n; })}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span>{q}</span>
                          <button onClick={() => setCart({ ...cart, [p.id]: q + 1 })}>
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

        {/* TAB 2: CART & CHECKOUT */}
        {activeTab === 'cart' && (
          <main className="p-4 space-y-3.5 text-xs">
            <h2 className="text-base font-extrabold text-slate-900">Checkout & Payment</h2>

            {Object.keys(cart).length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center font-bold text-slate-400 shadow-sm">Your basket is empty.</div>
            ) : (
              <>
                {Object.entries(cart).map(([id, qty]) => {
                  const p = products.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <div key={id} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex justify-between items-center">
                      <div className="flex items-center space-x-2.5">
                        <img src={p.img} alt={p.nameEn} className="h-12 w-12 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-extrabold text-slate-900">{p.nameEn} ({p.nameTe})</h4>
                          <p className="text-[#15803D] font-extrabold">₹{p.retailPrice} × {qty} = ₹{p.retailPrice * qty}</p>
                        </div>
                      </div>
                      <div className="flex items-center bg-[#15803D] text-white rounded-xl px-2 py-1 space-x-2 font-extrabold">
                        <button onClick={() => setCart((c) => { const n = { ...c }; if (n[id] <= 1) delete n[id]; else n[id]--; return n; })}>-</button>
                        <span>{qty}</span>
                        <button onClick={() => setCart({ ...cart, [id]: qty + 1 })}>+</button>
                      </div>
                    </div>
                  );
                })}

                {/* Promo Code & Wallet */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2.5">
                  <div className="flex space-x-2">
                    <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value.toUpperCase())} placeholder="Promo Code: RYTHU30" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-extrabold" />
                    <button onClick={() => { setAppliedPromo('RYTHU30'); notify('RYTHU30 Applied (-₹30)'); }} className="bg-[#15803D] text-white font-extrabold px-4 rounded-xl">
                      Apply
                    </button>
                  </div>

                  {(currentUser.wallet || 0) > 0 && (
                    <label className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-xl font-extrabold text-amber-950">
                      <span>Use Rythu Wallet (Available: ₹{currentUser.wallet})</span>
                      <input type="checkbox" checked={useWalletBalance} onChange={(e) => setUseWalletBalance(e.target.checked)} className="accent-[#15803D] h-4 w-4" />
                    </label>
                  )}
                </div>

                {/* Payment Modes */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2">
                  <h3 className="font-extrabold text-slate-900">Select Payment Mode</h3>
                  {[
                    { id: 'cred', label: `CRED UPI (₹${Math.max(10, Math.round(payableTotal * 0.08))} Cashback)` },
                    { id: 'paytm', label: `Paytm (₹${Math.max(5, Math.round(payableTotal * 0.05))} Cashback)` },
                    { id: 'card', label: `Credit / Debit Card (₹${Math.max(5, Math.round(payableTotal * 0.05))} Cashback)` },
                    { id: 'phonepe', label: 'PhonePe UPI' },
                    { id: 'gpay', label: 'Google Pay (GPay)' },
                    { id: 'cod', label: 'Cash on Delivery (COD)' },
                  ].map((pm) => (
                    <label key={pm.id} className={`flex items-center justify-between p-2.5 rounded-xl border-2 cursor-pointer transition ${payMode === pm.id ? 'border-[#15803D] bg-emerald-50/40' : 'border-slate-100'}`}>
                      <div className="flex items-center space-x-2.5">
                        <PaymentBadge type={pm.id} />
                        <span className="font-extrabold text-slate-800">{pm.label}</span>
                      </div>
                      <input type="radio" checked={payMode === pm.id} onChange={() => setPayMode(pm.id)} className="accent-[#15803D]" />
                    </label>
                  ))}

                  {payMode === 'card' && (
                    <div className="pt-2 space-y-2">
                      <input type="text" value={cardNo} onChange={(e) => setCardNo(e.target.value)} placeholder="16-Digit Card Number" className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={cardExp} onChange={(e) => setCardExp(e.target.value)} placeholder="MM/YY" className="bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                        <input type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="CVV" className="bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bill Summary */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-1.5">
                  <div className="flex justify-between"><span>Item Subtotal</span><span className="font-bold">₹{subtotal}</span></div>
                  {autoTierDiscount > 0 && <div className="flex justify-between text-[#15803D] font-extrabold"><span>{autoTierLabel}</span><span>-₹{autoTierDiscount}</span></div>}
                  {promoDeduction > 0 && <div className="flex justify-between text-[#15803D] font-extrabold"><span>Promo RYTHU30</span><span>-₹{promoDeduction}</span></div>}
                  {walletDeduction > 0 && <div className="flex justify-between text-amber-700 font-extrabold"><span>Wallet Used</span><span>-₹{walletDeduction}</span></div>}
                  <div className="flex justify-between"><span>Delivery Fee (Free ₹99+)</span><span className="font-bold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                  <div className="border-t pt-2 flex justify-between text-sm font-extrabold text-slate-900"><span>Grand Total</span><span>₹{payableTotal}</span></div>
                  <p className="text-[10px] font-extrabold text-[#EA580C]">₹{estimatedCashback} Cashback + Scratch Card unlocks on delivery!</p>
                  <button onClick={handlePlaceCustomerOrder} className="w-full mt-2 bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm transition">
                    Pay & Place Order • ₹{payableTotal}
                  </button>
                </div>
              </>
            )}
          </main>
        )}

{/* TAB 3: ORDERS + ANIMATED TRACKING + REORDER */}
        {activeTab === 'orders' && (
          <main className="p-4 space-y-3.5 text-xs">
            <h2 className="text-base font-extrabold text-slate-900">My Orders & Live Tracking</h2>

            {orders
              .filter((o) => o.buyerRole === 'customer')
              .map((ord) => {
                const isDelivered = ord.status === 'Delivered';
                const steps = ['Order Placed', 'Order Accepted', 'Partner Assigned', 'Out for Delivery', 'Delivered'];
                const currentStepIdx = steps.indexOf(ord.status);

                return (
                  <div key={ord.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm">{ord.id} • <span className="text-[#15803D]">{ord.status}</span></span>
                      <span className="font-extrabold text-sm">₹{ord.total}</span>
                    </div>
                    <p className="text-slate-500">{ord.items.map((i) => `${i.qty}kg ${i.name}`).join(', ')} • {ord.date}</p>

                    {isDelivered ? (
                      <div className="pt-2.5 border-t flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-[#15803D]">Delivered on {ord.date}</span>
                        <button
                          onClick={() => {
                            const updatedCart = {};
                            ord.items.forEach((it) => { updatedCart[it.id] = it.qty; });
                            setCart(updatedCart);
                            setActiveTab('cart');
                            notify('Cart updated with present day rates!');
                          }}
                          className="bg-[#15803D] text-white font-extrabold px-4 py-2 rounded-xl"
                        >
                          Reorder (Today's Rates)
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-2.5 border-t">
                        <div className="grid grid-cols-4 gap-1 text-center">
                          {['Order Placed', 'Order Accepted', 'Partner Assigned', 'Out for Delivery'].map((st, idx) => {
                            const active = idx <= currentStepIdx;
                            return (
                              <div key={st} className="space-y-1">
                                <div className={`h-2 rounded-full transition-all duration-500 ${active ? 'bg-[#15803D] animate-pulse' : 'bg-slate-200'}`} />
                                <p className={`text-[9px] font-extrabold leading-tight ${active ? 'text-[#15803D]' : 'text-slate-400'}`}>{st}</p>
                              </div>
                            );
                          })}
                        </div>

                        {ord.driverName ? (
                          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-[9px] font-extrabold uppercase bg-[#15803D] text-white px-2 py-0.5 rounded">Live Partner Assigned</span>
                                <p className="font-extrabold text-slate-900 mt-1">{ord.driverName}</p>
                                <p className="text-[10px] text-slate-600">GPS: {ord.driverCoords || 'Nellore Live Tracking'}</p>
                              </div>
                              <div className="flex space-x-2">
                                <a href={`tel:${ord.driverMobile}`} className="p-2.5 bg-[#15803D] text-white rounded-full shadow">
                                  <Phone className="h-4 w-4" />
                                </a>
                                <a href={`sms:${ord.driverMobile}`} className="p-2.5 bg-sky-600 text-white rounded-full shadow">
                                  <MessageSquare className="h-4 w-4" />
                                </a>
                              </div>
                            </div>

                            <button
                              onClick={() => handleSimulateCustomerDelivery(ord)}
                              className="w-full bg-[#EA580C] text-white font-extrabold py-2.5 rounded-xl shadow-sm"
                            >
                              Complete Delivery (Unlock Cashback & Scratch Card)
                            </button>
                          </div>
                        ) : (
                          <p className="text-[11px] font-bold text-amber-800 bg-amber-50 p-2.5 rounded-xl text-center">
                            Live map activates automatically once a Delivery Partner is assigned.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </main>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && renderSharedProfileTab()}

        {/* ELEVATED FLOATING BOTTOM DOCK */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-2 flex justify-between items-center z-40 shadow-lg">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <Home className="h-5 w-5 mb-0.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className="relative -mt-7 h-14 w-14 rounded-full bg-gradient-to-br from-[#15803D] to-[#22C55E] text-white shadow-xl border-4 border-[#F8FAFC] flex items-center justify-center active:scale-95 transition"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalUnits > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-[#EA580C] text-white text-[10px] font-extrabold flex items-center justify-center shadow">
                {totalUnits}
              </span>
            )}
          </button>

          <button onClick={() => setActiveTab('orders')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'orders' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <ClipboardList className="h-5 w-5 mb-0.5" />
            <span>Orders</span>
          </button>

          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'profile' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <User className="h-5 w-5 mb-0.5" />
            <span>Profile</span>
          </button>
        </nav>
      </div>
    );
  }

// =========================================================================
  // 4. FARMER PORTAL
  // =========================================================================
  if (currentUser.role === 'farmer') {
    const handlePublishFarmerProduct = (e) => {
      e.preventDefault();
      if (!fNameEn.trim() || !fPrice) return;
      const newProd = {
        id: 'p_' + Date.now(),
        farmerId: currentUser.id,
        farmerName: `${currentUser.name} • 14 km`,
        distanceKm: 14,
        nameEn: fNameEn.trim(),
        nameTe: fNameTe.trim() || fNameEn.trim(),
        cat: 'Vegetables',
        packLabel: '1 kg',
        mrp: Number(fPrice) + 16,
        retailPrice: Number(fPrice) + 10,
        farmerDirectPrice: Number(fPrice),
        wholesalePrice: Number(fPrice) + 4,
        minWholesaleQty: 25,
        stockKg: Number(fQty),
        inStock: true,
        availableFrom: fAvailTime,
        img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
      };
      setProducts([newProd, ...products]);
      setNotifications((prev) => [
        `40km Wholesale Alert: ${currentUser.name} listed ${fQty}kg ${newProd.nameEn} (${newProd.nameTe}) available ${fAvailTime}.`,
        ...prev,
      ]);
      setFNameEn('');
      setFNameTe('');
      notify('Published! Notification sent to Wholesale Shops within 40 km.');
    };

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
        <WelcomeSmileModal />
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white p-4 rounded-b-[28px] flex justify-between items-center shadow-md">
          <div>
            <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded font-extrabold uppercase">Farmer Workspace</span>
            <h1 className="text-base font-extrabold mt-0.5">{currentUser.name}</h1>
          </div>
          <span className="bg-[#EAB308] text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full">₹{currentUser.wallet}</span>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-3.5 text-xs">
            <form onSubmit={handlePublishFarmerProduct} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
              <h2 className="font-extrabold text-sm text-slate-900">Publish Harvest (Auto English ↔ తెలుగు)</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Name in English</label>
                  <input type="text" required value={fNameEn} onChange={(e) => handleFarmerEnChange(e.target.value)} placeholder="e.g., Tomato" className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400">పేరు తెలుగులో (Auto)</label>
                  <input type="text" required value={fNameTe} onChange={(e) => handleFarmerTeChange(e.target.value)} placeholder="ఉదా: టమాటా" className="w-full bg-emerald-50/70 border border-emerald-200 rounded-xl px-3 py-2 font-bold text-[#15803D]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Qty (KG)</label>
                  <input type="number" required value={fQty} onChange={(e) => setFQty(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-2.5 py-2 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Price ₹/kg</label>
                  <input type="number" required value={fPrice} onChange={(e) => setFPrice(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-2.5 py-2 font-extrabold text-[#15803D]" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Available Time</label>
                  <input type="text" required value={fAvailTime} onChange={(e) => setFAvailTime(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-2.5 py-2 font-bold" />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow-sm">
                Publish & Notify Wholesale Shops (40 km)
              </button>
            </form>

            <h3 className="font-extrabold text-sm text-slate-900">Live Farm Inventory</h3>
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                  <h4 className="font-extrabold text-slate-900">{p.nameEn} • {p.nameTe}</h4>
                  <p className="text-[10px] text-slate-500">Available: {p.availableFrom} • ₹{p.farmerDirectPrice}/kg</p>
                </div>
                <span className="bg-emerald-50 text-[#15803D] font-extrabold px-3 py-1.5 rounded-xl">
                  {p.stockKg} KG Left
                </span>
              </div>
            ))}
          </main>
        )}

        {activeTab === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-extrabold">Incoming Shop Orders</h2>
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2">
                <div className="flex justify-between font-extrabold">
                  <span>{ord.id} • {ord.status}</span>
                  <span className="text-[#15803D]">₹{ord.total}</span>
                </div>
                <p className="text-slate-600">{ord.buyerName} • {ord.items.map((i) => `${i.qty}kg ${i.name}`).join(', ')}</p>
                {ord.b2bOtp && <p className="text-amber-800 font-extrabold bg-amber-50 p-2 rounded-xl">B2B Handover OTP: {ord.b2bOtp}</p>}
                {ord.status === 'Order Placed' && (
                  <button
                    onClick={() => {
                      setOrders((prev) => prev.map((o) => (o.id === ord.id ? { ...o, status: 'Order Accepted' } : o)));
                      setNotifications((prev) => [`Delivery Alert: Farmer accepted ${ord.id}. Ready for pickup!`, ...prev]);
                      notify('Order Accepted! Nearby Delivery Partners notified.');
                    }}
                    className="w-full bg-[#15803D] text-white font-extrabold py-2.5 rounded-xl"
                  >
                    Accept Order & Notify Delivery Partners
                  </button>
                )}
              </div>
            ))}
          </main>
        )}

        {activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-8 py-2.5 flex justify-between items-center z-40">
          {[
            { id: 'home', icon: Sprout, label: 'My Farm' },
            { id: 'orders', icon: ClipboardList, label: 'Orders' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === t.id ? 'text-[#15803D]' : 'text-slate-400'}`}>
                <Icon className="h-5 w-5 mb-0.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

 // =========================================================================
  // 5. WHOLESALE & RETAIL PORTAL
  // =========================================================================
  if (currentUser.role === 'wholesale' || currentUser.role === 'retail') {
    const isRetail = currentUser.role === 'retail';

    const handlePlaceB2BOrder = (prod) => {
      const qty = prod.minWholesaleQty;
      const unitRate = b2bSource === 'farmer' ? prod.farmerDirectPrice : prod.wholesalePrice;
      const itemTotal = qty * unitRate;
      const delivCharge = b2bDeliveryMode === 'pickup' ? 0 : Math.round(prod.distanceKm * 5 + qty * 0.5);
      const otp = String(Math.floor(1000 + Math.random() * 9000));

      const newOrd = {
        id: 'B2B-' + Math.floor(200 + Math.random() * 799),
        buyerRole: currentUser.role,
        buyerName: currentUser.name,
        buyerMobile: currentUser.mobile,
        buyerAddress: currentUser.address,
        items: [{ id: prod.id, name: prod.nameEn, qty, price: unitRate }],
        total: itemTotal + delivCharge,
        deliveryMode: b2bDeliveryMode === 'pickup' ? 'Farm Pickup (₹0 Fee)' : `Delivery to Shop (${prod.distanceKm} km • ₹${delivCharge})`,
        status: 'Order Placed',
        driverName: null,
        b2bOtp: otp,
        date: 'Just now',
      };

      setOrders([newOrd, ...orders]);
      notify(`B2B Order Placed! Delivery OTP: ${otp}`);
      setActiveTab('orders');
    };

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
        <WelcomeSmileModal />
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white p-4 rounded-b-[28px] flex justify-between items-center shadow-md">
          <div>
            <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded font-extrabold uppercase">{currentUser.role} Store</span>
            <h1 className="text-base font-extrabold mt-0.5">{currentUser.name}</h1>
          </div>
          <span className="bg-[#EAB308] text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full">₹{currentUser.wallet}</span>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-3 text-xs">
            {isRetail && (
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 space-y-1.5">
                <p className="font-extrabold text-slate-500">Compare Supplier Rates:</p>
                <div className="grid grid-cols-2 gap-2 font-extrabold">
                  <button onClick={() => setB2bSource('farmer')} className={`py-2 rounded-xl border ${b2bSource === 'farmer' ? 'bg-[#15803D] text-white' : 'bg-slate-50'}`}>
                    Direct Farmer Rate
                  </button>
                  <button onClick={() => setB2bSource('wholesale')} className={`py-2 rounded-xl border ${b2bSource === 'wholesale' ? 'bg-slate-900 text-white' : 'bg-slate-50'}`}>
                    Wholesale Rate
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 space-y-1.5">
              <p className="font-extrabold text-slate-500">Select Fulfillment Option:</p>
              <div className="grid grid-cols-2 gap-2 font-extrabold">
                <button onClick={() => setB2bDeliveryMode('pickup')} className={`py-2 rounded-xl border ${b2bDeliveryMode === 'pickup' ? 'bg-emerald-50 border-[#15803D] text-[#15803D]' : 'bg-slate-50'}`}>
                  Farm Pickup (₹0 Fee)
                </button>
                <button onClick={() => setB2bDeliveryMode('delivery')} className={`py-2 rounded-xl border ${b2bDeliveryMode === 'delivery' ? 'bg-sky-50 border-sky-600 text-sky-700' : 'bg-slate-50'}`}>
                  Delivery to Shop
                </button>
              </div>
            </div>

            {products.map((p) => {
              const rate = b2bSource === 'farmer' ? p.farmerDirectPrice : p.wholesalePrice;
              const estDeliv = b2bDeliveryMode === 'pickup' ? 0 : Math.round(p.distanceKm * 5 + p.minWholesaleQty * 0.5);
              return (
                <div key={p.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2.5">
                  <div className="flex items-center space-x-3">
                    <img src={p.img} alt={p.nameEn} className="h-14 w-14 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{p.nameEn} ({p.nameTe})</h4>
                      <p className="text-[10px] text-slate-500">{p.farmerName} • Stock: {p.stockKg} KG</p>
                      <p className="text-[11px] font-extrabold text-[#15803D] mt-0.5">
                        ₹{rate}/kg • Min Qty: {p.minWholesaleQty} KG • Delivery: ₹{estDeliv}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handlePlaceB2BOrder(p)} className="w-full bg-[#15803D] text-white font-extrabold py-2.5 rounded-xl">
                    Order {p.minWholesaleQty} KG (₹{rate * p.minWholesaleQty + estDeliv}) + PDF Invoice
                  </button>
                </div>
              );
            })}
          </main>
        )}

        {activeTab === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-extrabold">B2B Orders, Delivery OTP & PDF Invoices</h2>
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2">
                <div className="flex justify-between font-extrabold">
                  <span>{ord.id} • {ord.status}</span>
                  <span className="text-[#15803D]">₹{ord.total}</span>
                </div>
                <p className="text-slate-600">{ord.items.map((i) => `${i.qty}kg ${i.name}`).join(', ')}</p>
                {ord.b2bOtp && (
                  <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl font-extrabold text-amber-950">
                    Delivery Verification OTP (Share with Rider): {ord.b2bOtp}
                  </div>
                )}
                <button onClick={() => window.print()} className="w-full bg-slate-900 text-white font-extrabold py-2.5 rounded-xl flex items-center justify-center space-x-1.5">
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print / Save PDF Invoice (Both Parties)</span>
                </button>
              </div>
            ))}
          </main>
        )}

        {activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-8 py-2.5 flex justify-between items-center z-40">
          {[
            { id: 'home', icon: Store, label: 'Buy Bulk' },
            { id: 'orders', icon: ClipboardList, label: 'Orders & PDF' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === t.id ? 'text-[#15803D]' : 'text-slate-400'}`}>
                <Icon className="h-5 w-5 mb-0.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

// =========================================================================
  // 6. DELIVERY PARTNER PORTAL
  // =========================================================================
  if (currentUser.role === 'delivery') {
    const availOrders = orders.filter((o) => o.status !== 'Delivered');
    const delivOrders = orders.filter((o) => o.status === 'Delivered');
    const weeklyCompleted = currentUser.weeklyOrders || 78;

    const handleCompleteDelivery = (ord) => {
      setProducts((prev) =>
        prev.map((p) => {
          const orderedItem = ord.items.find((it) => it.id === p.id);
          if (!orderedItem) return p;
          return { ...p, stockKg: Math.max(0, p.stockKg - orderedItem.qty) };
        })
      );

      setOrders((prev) => prev.map((o) => (o.id === ord.id ? { ...o, status: 'Delivered' } : o)));
      setCurrentUser({ ...currentUser, wallet: (currentUser.wallet || 0) + 40, weeklyOrders: weeklyCompleted + 1 });
      notify('Delivered! Farmer stock reduced & ₹40 credited.');
    };

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white p-4 rounded-b-[28px] flex justify-between items-center shadow-md">
          <div>
            <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded font-extrabold uppercase">Delivery Fleet</span>
            <h1 className="text-base font-extrabold mt-0.5">{currentUser.name}</h1>
          </div>
          <span className="bg-[#EAB308] text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full">₹{currentUser.wallet}</span>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-3 text-xs">
            <div className="grid grid-cols-3 gap-2 text-center">
              <button onClick={() => setDelivFilter('available')} className={`p-3 rounded-2xl shadow-sm border ${delivFilter === 'available' ? 'bg-emerald-50 border-[#15803D]' : 'bg-white border-slate-100'}`}>
                <p className="text-[10px] text-slate-500 font-bold">Available</p>
                <p className="text-xl font-extrabold text-[#EA580C]">{availOrders.length}</p>
              </button>
              <button onClick={() => setDelivFilter('delivered')} className={`p-3 rounded-2xl shadow-sm border ${delivFilter === 'delivered' ? 'bg-emerald-50 border-[#15803D]' : 'bg-white border-slate-100'}`}>
                <p className="text-[10px] text-slate-500 font-bold">Delivered</p>
                <p className="text-xl font-extrabold text-[#15803D]">{delivOrders.length}</p>
              </button>
              <button onClick={() => setDelivFilter('earnings')} className={`p-3 rounded-2xl shadow-sm border ${delivFilter === 'earnings' ? 'bg-emerald-50 border-[#15803D]' : 'bg-white border-slate-100'}`}>
                <p className="text-[10px] text-slate-500 font-bold">Earnings</p>
                <p className="text-xl font-extrabold text-sky-600">₹{currentUser.wallet}</p>
              </button>
            </div>

            <div className="bg-gradient-to-r from-[#EA580C] to-[#EAB308] text-white rounded-2xl p-4 shadow space-y-2">
              <div className="flex justify-between font-extrabold">
                <span>Weekly 100 Orders Bonus: ₹1,500</span>
                <span>{weeklyCompleted} / 100</span>
              </div>
              <div className="w-full bg-white/30 h-2.5 rounded-full overflow-hidden">
                <div className="bg-white h-full rounded-full" style={{ width: `${Math.min(100, weeklyCompleted)}%` }} />
              </div>
            </div>

            {delivFilter === 'earnings' ? (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-2">
                <h3 className="font-extrabold">Earnings & Incentive Breakdown</h3>
                <div className="flex justify-between"><span>Base Delivery Fees</span><span className="font-extrabold">₹2,950</span></div>
                <div className="flex justify-between"><span>Weekly Target Bonus</span><span className="font-extrabold text-[#15803D]">+₹500</span></div>
              </div>
            ) : (
              (delivFilter === 'available' ? availOrders : delivOrders).map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2.5">
                  <div className="flex justify-between font-extrabold">
                    <span>{ord.id} ({ord.buyerRole.toUpperCase()})</span>
                    <span className="text-[#15803D]">₹{ord.total}</span>
                  </div>
                  <p className="font-bold text-slate-600 flex items-center space-x-1">
                    <MapPin className="h-3.5 w-3.5 text-[#EA580C]" />
                    <span>{ord.buyerAddress}</span>
                  </p>
                  <div className="flex space-x-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ord.buyerAddress)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-sky-600 text-white font-extrabold py-2.5 rounded-xl text-center"
                    >
                      Navigate Map
                    </a>
                    {ord.status !== 'Delivered' && (
                      <button
                        onClick={() => {
                          if (!ord.driverName) {
                            setOrders((prev) =>
                              prev.map((o) =>
                                o.id === ord.id
                                  ? { ...o, status: 'Partner Assigned', driverName: currentUser.name, driverMobile: currentUser.mobile, driverCoords: '14.4390, 79.9810' }
                                  : o
                              )
                            );
                            notify('Accepted! Live GPS shared with Customer.');
                          } else {
                            if (ord.b2bOtp) {
                              const entered = window.prompt(`Enter ${ord.buyerRole.toUpperCase()} Delivery OTP (Demo: ${ord.b2bOtp}):`);
                              if (entered !== ord.b2bOtp) {
                                notify('Invalid B2B OTP!');
                                return;
                              }
                            }
                            handleCompleteDelivery(ord);
                          }
                        }}
                        className="flex-1 bg-[#15803D] text-white font-extrabold py-2.5 rounded-xl"
                      >
                        {!ord.driverName ? 'Accept Order' : ord.b2bOtp ? 'Verify B2B OTP' : 'Deliver (No OTP)'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </main>
        )}

        {activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-12 py-2.5 flex justify-between items-center z-40">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <Truck className="h-5 w-5 mb-0.5" />
            <span>Deliveries</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'profile' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <User className="h-5 w-5 mb-0.5" />
            <span>Profile</span>
          </button>
        </nav>
      </div>
    );
  }

// =========================================================================
  // 7. MASTER ADMIN HQ
  // =========================================================================
  return (
    <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
      {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

      <header className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white p-4 rounded-b-[28px] flex justify-between items-center shadow-md">
        <div>
          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded font-extrabold uppercase">Master Admin HQ</span>
          <h1 className="text-base font-extrabold mt-0.5">Rythu Basket Control</h1>
        </div>
        <span className="bg-[#EAB308] text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-full">
          {notifications.length} Alerts
        </span>
      </header>

      {activeTab === 'home' && (
        <main className="p-4 space-y-3 text-xs">
          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {[
              { id: 'approvals', label: 'Approvals' },
              { id: 'stock', label: 'Stock Control' },
              { id: 'controls', label: 'Scratch & Offers' },
            ].map((t) => (
              <button key={t.id} onClick={() => setAdminTab(t.id)} className={`px-3.5 py-2 rounded-xl font-extrabold border ${adminTab === t.id ? 'bg-[#15803D] text-white' : 'bg-white text-slate-700'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {adminTab === 'approvals' && (
            <div className="space-y-2.5">
              {notifications.map((n, idx) => (
                <div key={idx} className="bg-amber-50 border border-amber-200 p-3 rounded-2xl font-bold text-amber-950">
                  {n}
                </div>
              ))}
              {users
                .filter((u) => u.role === 'farmer' || u.role === 'wholesale' || u.role === 'retail')
                .map((u) => (
                  <div key={u.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded">{u.role}</span>
                      <h4 className="font-extrabold text-sm mt-1">{u.name}</h4>
                      <p className="text-slate-500">{u.mobile} • {u.address}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, approved: !x.approved } : x)));
                        notify('Approval Status Updated!');
                      }}
                      className={`px-3.5 py-2 rounded-xl font-extrabold ${u.approved ? 'bg-emerald-50 text-[#15803D]' : 'bg-[#15803D] text-white'}`}
                    >
                      {u.approved ? 'Approved' : 'Approve'}
                    </button>
                  </div>
                ))}
            </div>
          )}

          {adminTab === 'stock' &&
            products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900">{p.nameEn} ({p.nameTe})</h4>
                  <p className="text-slate-500">Remaining: {p.stockKg} KG • Retail: ₹{p.retailPrice}/kg</p>
                </div>
                <button
                  onClick={() => {
                    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, inStock: !x.inStock } : x)));
                    notify('Stock Status Updated!');
                  }}
                  className={`px-3.5 py-2 rounded-xl font-extrabold ${p.inStock ? 'bg-emerald-50 text-[#15803D]' : 'bg-rose-50 text-rose-600'}`}
                >
                  {p.inStock ? 'In Stock' : 'Out of Stock'}
                </button>
              </div>
            ))}

          {adminTab === 'controls' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900">Customer Loyalty Offers</span>
                <button
                  onClick={() => {
                    setOffersEnabled(!offersEnabled);
                    notify(offersEnabled ? 'Offers Disabled' : 'Offers Enabled');
                  }}
                  className={`px-4 py-1.5 rounded-full font-extrabold ${offersEnabled ? 'bg-[#15803D] text-white' : 'bg-slate-200 text-slate-600'}`}
                >
                  {offersEnabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Daily Scratch Min (₹)</label>
                  <input type="number" value={scratchMin} onChange={(e) => setScratchMin(Number(e.target.value))} className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-extrabold" />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Daily Scratch Max (₹)</label>
                  <input type="number" value={scratchMax} onChange={(e) => setScratchMax(Number(e.target.value))} className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-extrabold" />
                </div>
              </div>
              <button onClick={() => notify(`Daily Scratch Card Range Set: ₹${scratchMin} – ₹${scratchMax}`)} className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl">
                Save Admin Rules
              </button>
            </div>
          )}
        </main>
      )}

      {activeTab === 'profile' && renderSharedProfileTab()}

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-12 py-2.5 flex justify-between items-center z-40">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' ? 'text-[#15803D]' : 'text-slate-400'}`}>
          <ShieldCheck className="h-5 w-5 mb-0.5" />
          <span>Admin HQ</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'profile' ? 'text-[#15803D]' : 'text-slate-400'}`}>
          <User className="h-5 w-5 mb-0.5" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}