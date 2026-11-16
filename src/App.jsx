import React, { useState } from 'react';
import {
  Search, ShoppingCart, Plus, Minus, Home, ClipboardList, User, MapPin,
  Phone, MessageSquare, Sprout, Store, Truck, ShieldCheck, ChevronRight,
  ArrowLeft, CheckCircle2, Wallet, Gift, Sparkles, Bell, Navigation,
  LocateFixed, LogOut, Trash2, Printer, Share2, Tag, AlertCircle, Check
} from 'lucide-react';

// Bilingual Dictionary for Farmer Auto-Translation (English <-> Telugu)
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
  rice: 'బియ్యం',
  milk: 'పాలు',
  eggs: 'గుడ్లు',
  chicken: 'నాటు కోడి',
};

const TE_TO_EN = Object.fromEntries(Object.entries(EN_TO_TE).map(([en, te]) => [te, en.charAt(0).toUpperCase() + en.slice(1)]));

const INITIAL_USERS = [
  { id: 'u_cust_1', role: 'customer', name: 'Madhav Reddy', mobile: '9876543210', address: 'Vedayapalem, Nellore', approved: true, wallet: 100, walletExpiryDays: 2, referralsCount: 2, ordersCompleted: 1 },
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
    farmerName: 'Ramaiah Farm (Kovur • 12 km)',
    distanceKm: 12,
    nameEn: 'Fresh Tomato',
    nameTe: 'టమాటా',
    cat: 'Vegetables',
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
    farmerName: 'Subba Rao Farm (Buchi • 18 km)',
    distanceKm: 18,
    nameEn: 'Red Onion',
    nameTe: 'ఉల్లిపాయలు',
    cat: 'Vegetables',
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
    farmerName: 'Rapur Orchards (32 km)',
    distanceKm: 32,
    nameEn: 'Banganapalli Mango',
    nameTe: 'మామిడిపండు',
    cat: 'Fruits',
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
    farmerName: 'Padma Organic (Nellore • 6 km)',
    distanceKm: 6,
    nameEn: 'Spinach (Palakura)',
    nameTe: 'పాలకూర',
    cat: 'Leafy Greens',
    retailPrice: 20,
    farmerDirectPrice: 14,
    wholesalePrice: 16,
    minWholesaleQty: 15,
    stockKg: 150,
    inStock: true,
    availableFrom: 'Today, 6:00 AM',
    img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
  },
];

// Brand Logos
const PhonePeLogo = () => (
  <span className="h-7 w-7 rounded-lg bg-[#5F259F] text-white font-black text-xs flex items-center justify-center flex-shrink-0">पे</span>
);
const GPayLogo = () => (
  <span className="h-7 w-7 rounded-lg bg-white border border-gray-200 text-[#4285F4] font-black text-xs flex items-center justify-center flex-shrink-0">G</span>
);
const PaytmLogo = () => (
  <span className="h-7 w-7 rounded-lg bg-[#00BAF2] text-[#002970] font-black text-[9px] flex items-center justify-center flex-shrink-0">Paytm</span>
);
const CredLogo = () => (
  <span className="h-7 w-7 rounded-lg bg-gray-900 text-amber-300 font-black text-[9px] flex items-center justify-center flex-shrink-0">CRED</span>
);

export default function App() {
  const [selectedRole, setSelectedRole] = useState(null); // null | 'customer' | 'farmer' | 'wholesale' | 'retail' | 'delivery' | 'admin'
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Auth & Smile Registration Modal States
  const [authScreen, setAuthScreen] = useState('login'); // 'login' | 'register'
  const [loginMobile, setLoginMobile] = useState('');
  const [loginOtpSent, setLoginOtpSent] = useState(false);
  const [loginOtp, setLoginOtp] = useState('');
  const [authMsg, setAuthMsg] = useState('');
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regReferralCode, setRegReferralCode] = useState('');
  const [showWelcomeSmile, setShowWelcomeSmile] = useState(false);

// Navigation Tabs per Role
  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState('');

  // Customer Store, Cart, Checkout & Payment States
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({ p1: 2, p3: 1 });
  const [useWalletBalance, setUseWalletBalance] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [payMode, setPayMode] = useState('cred'); // 'phonepe' | 'gpay' | 'paytm' | 'cred' | 'card' | 'qr' | 'cod'
  const [cardNo, setCardNo] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [pendingCashback, setPendingCashback] = useState(0);

  // B2B Wholesale / Retail Checkout States
  const [b2bSource, setB2bSource] = useState('farmer'); // 'farmer' | 'wholesale'
  const [b2bDeliveryMode, setB2bDeliveryMode] = useState('pickup'); // 'pickup' | 'delivery'

  // Scratch Card & Wallet Alert States
  const [scratchCard, setScratchCard] = useState(null); // { orderId, reward, scratched }
  const [notifications, setNotifications] = useState([
    '⚠️ Wallet Alert: ₹100 wallet cashback expires in 36 hours (within 48h–6h window). Use it before expiry!',
    '🌾 Kovur Farmer posted 500 KG Fresh Tomato (within 40 km radius).',
  ]);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: 'RB-501',
      buyerRole: 'customer',
      buyerName: 'Madhav Reddy',
      buyerMobile: '9876543210',
      buyerAddress: 'Vedayapalem, Nellore (14.4285, 79.9692)',
      items: [{ id: 'p1', name: 'Fresh Tomato', qty: 2, price: 36 }],
      total: 72,
      cashback: 12,
      status: 'Out for Delivery', // 'Order Placed' | 'Order Accepted' | 'Partner Assigned' | 'Out for Delivery' | 'Delivered'
      driverName: 'Ramesh Kumar',
      driverMobile: '9000334455',
      driverCoords: '14.4350, 79.9780 (1.2 km away)',
      b2bOtp: null, // Customer delivery requires NO OTP
      date: 'Today, 4:10 PM',
    },
    {
      id: 'RB-502',
      buyerRole: 'wholesale',
      buyerName: 'Nellore Mandi Wholesale',
      buyerMobile: '9989334455',
      buyerAddress: 'Atmakur Bus Stand, Nellore (14.4426, 79.9865)',
      items: [{ id: 'p1', name: 'Fresh Tomato', qty: 50, price: 24 }],
      total: 1200,
      cashback: 0,
      status: 'Order Placed',
      driverName: null,
      driverMobile: null,
      driverCoords: null,
      b2bOtp: '6492', // B2B Wholesale/Retail delivery requires OTP!
      date: 'Today, 4:25 PM',
    },
  ]);
  const [selectedOrderForTrack, setSelectedOrderForTrack] = useState(null);

  // Farmer Add Product Form States (Bilingual Auto-Translate + Availability Time)
  const [fNameEn, setFNameEn] = useState('');
  const [fNameTe, setFNameTe] = useState('');
  const [fQty, setFQty] = useState('100');
  const [fPrice, setFPrice] = useState('22');
  const [fAvailTime, setFAvailTime] = useState('Tomorrow, 6:30 AM');

  // Delivery Dashboard Filter
  const [delivFilter, setDelivFilter] = useState('available'); // 'available' | 'delivered' | 'earnings'

  // Admin Settings States
  const [scratchMin, setScratchMin] = useState(4);
  const [scratchMax, setScratchMax] = useState(25);
  const [offersEnabled, setOffersEnabled] = useState(true);
  const [adminTab, setAdminTab] = useState('approvals');

  const notify = (m) => {
    setToast(m);
    setTimeout(() => setToast(''), 3000);
  };

  // Farmer Bilingual Auto-Translate Handlers
  const handleFarmerEnChange = (val) => {
    setFNameEn(val);
    const key = val.trim().toLowerCase();
    if (EN_TO_TE[key]) setFNameTe(EN_TO_TE[key]);
  };

  const handleFarmerTeChange = (val) => {
    setFNameTe(val);
    if (TE_TO_EN[val.trim()]) setFNameEn(TE_TO_EN[val.trim()]);
  };

  // Strict Login Check (Shows "Mobile number not registered please register")
  const handleSendOtp = () => {
    const clean = loginMobile.replace(/\D/g, '');
    if (clean.length !== 10) {
      setAuthMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    const existing = users.find((u) => u.mobile === clean && u.role === selectedRole);
    if (!existing) {
      setAuthMsg('❌ Mobile number not registered, please register.');
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
      setAuthMsg('❌ Mobile number not registered, please register.');
      return;
    }
    setCurrentUser(existing);
    setActiveTab('home');
  };

  // Registration with Smiling Animation + Admin Notification + Referral Bonus
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
      walletExpiryDays: 15,
      referralsCount: 0,
      ordersCompleted: 0,
      referredBy: regReferralCode.trim() || null,
    };
    setUsers([newUser, ...users]);
    if (needsApproval) {
      setNotifications((prev) => [
        `🔔 New ${selectedRole.toUpperCase()} Registration (${newUser.name}) awaiting Admin approval!`,
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

 // =========================================================================
  // 1. ROLE ENTRY GATE (NO ROLE SWITCHING INSIDE APPS — LOGOUT REQUIRED)
  // =========================================================================
  if (!selectedRole) {
    const roles = [
      { id: 'customer', title: 'Customer Store', te: 'వినియోగదారుడు', desc: 'Offers, Wallet, Scratch Cards, CRED/UPI/Cards & Animated Live Tracking', icon: ShoppingCart, bg: 'bg-emerald-50 text-[#167A37] border-emerald-200' },
      { id: 'farmer', title: 'Farmer Portal', te: 'రైతు విభాగం', desc: 'Telugu/English Auto-Translate, 40km Shop Alerts & Auto Stock Deduction', icon: Sprout, bg: 'bg-lime-50 text-lime-800 border-lime-200' },
      { id: 'wholesale', title: 'Wholesale Store', te: 'హోల్‌సేల్ వ్యాపారి', desc: 'Farm Pickup vs Delivery Charges, B2B OTP & Printable PDF Invoice', icon: Warehouse, bg: 'bg-amber-50 text-amber-800 border-amber-200' },
      { id: 'retail', title: 'Retail Shopkeeper', te: 'రిటైల్ షాపు', desc: 'Farmer vs Wholesale Rates, Min Qty, PDF Invoice & B2B Delivery OTP', icon: Store, bg: 'bg-orange-50 text-orange-800 border-orange-200' },
      { id: 'delivery', title: 'Delivery Partner', te: 'డెలివరీ పార్టనర్', desc: '100 Orders Weekly Incentive, Buyer GPS & B2B OTP Verification', icon: Truck, bg: 'bg-sky-50 text-sky-800 border-sky-200' },
      { id: 'admin', title: 'Master Admin', te: 'మాస్టర్ అడ్మిన్', desc: 'Daily Scratch Card Range, Toggle Offers, Stock Control & Approvals', icon: ShieldCheck, bg: 'bg-purple-50 text-purple-800 border-purple-200' },
    ];

    return (
      <div className="min-h-screen bg-[#F4F7F4] max-w-md mx-auto font-sans text-gray-800 shadow-2xl pb-8">
        <div className="bg-gradient-to-br from-[#0F5927] to-[#238E43] text-white rounded-b-[32px] p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="h-14 w-14 rounded-full bg-white p-0.5 shadow border-2 border-yellow-300 overflow-hidden">
              <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-xl font-black">రైతు బాస్కెట్ • Rythu Basket</h1>
              <p className="text-xs text-emerald-100">Nellore Farm-to-Home & B2B Marketplace</p>
            </div>
          </div>
          <p className="text-xs text-yellow-200 font-bold mt-4">
            Select your role to Login or Register (Logout required to switch roles):
          </p>
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
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-[#167A37] flex items-center justify-between text-left transition"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${r.bg}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-gray-900">{r.title} ({r.te})</h2>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{r.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

// =========================================================================
  // 2. LOGIN & REGISTRATION SCREEN (WITH UNREGISTERED CHECK & SMILE POPUP)
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
      <div className="min-h-screen bg-[#F4F7F4] max-w-md mx-auto font-sans text-gray-800 shadow-2xl pb-10">
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#11652D] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">
            {toast}
          </div>
        )}

        <div className="bg-[#167A37] text-white rounded-b-[28px] p-5 shadow-md flex items-center space-x-3">
          <button onClick={() => setSelectedRole(null)} className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <img src="/icon-512.png" alt="Logo" className="h-11 w-11 rounded-full bg-white p-0.5 object-cover" />
          <div>
            <h2 className="text-base font-black uppercase">{selectedRole} Portal</h2>
            <p className="text-[11px] text-emerald-100">Login or Register to Continue</p>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-3xl p-5 shadow-md space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl font-extrabold">
              <button
                type="button"
                onClick={() => { setAuthScreen('login'); setAuthMsg(''); }}
                className={`py-2 rounded-lg ${authScreen === 'login' ? 'bg-[#167A37] text-white' : 'text-gray-600'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => { setAuthScreen('register'); setAuthMsg(''); }}
                className={`py-2 rounded-lg ${authScreen === 'register' ? 'bg-[#167A37] text-white' : 'text-gray-600'}`}
              >
                Register
              </button>
            </div>

            {authScreen === 'login' ? (
              <form onSubmit={handleVerifyLogin} className="space-y-3">
                <p className="text-[10px] text-gray-400">
                  Registered Demo Number: <strong>{demoNumbers[selectedRole]}</strong> (Try an unregistered number to see the alert!)
                </p>
                <input
                  type="tel"
                  maxLength={10}
                  value={loginMobile}
                  onChange={(e) => { setLoginMobile(e.target.value.replace(/\D/g, '')); setAuthMsg(''); }}
                  placeholder="Enter 10-Digit Mobile Number"
                  className="w-full bg-gray-50 border rounded-xl px-3.5 py-3 font-bold"
                />

                {authMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl font-extrabold flex items-center justify-between">
                    <span>{authMsg}</span>
                    <button type="button" onClick={() => { setRegMobile(loginMobile); setAuthScreen('register'); setAuthMsg(''); }} className="underline ml-2">
                      Register
                    </button>
                  </div>
                )}

                {!loginOtpSent ? (
                  <button type="button" onClick={handleSendOtp} className="w-full bg-[#167A37] text-white font-black py-3 rounded-xl">
                    Send OTP
                  </button>
                ) : (
                  <>
                    <div className="bg-emerald-50 text-[#167A37] font-black p-2 rounded-xl text-center">Demo OTP: 4829</div>
                    <input
                      type="tel"
                      maxLength={4}
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      placeholder="Enter 4-Digit OTP"
                      className="w-full bg-gray-50 border rounded-xl py-2.5 text-center font-black tracking-[0.4em]"
                    />
                    <button type="submit" className="w-full bg-[#167A37] text-white font-black py-3 rounded-xl">
                      Verify OTP & Login
                    </button>
                  </>
                )}
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Full Name / Shop Name *" className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 font-bold" />
                <input type="tel" maxLength={10} required value={regMobile} onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))} placeholder="10-Digit Mobile Number *" className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 font-bold" />
                <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Address in Nellore *" className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 font-bold" />
                {selectedRole === 'customer' && (
                  <input type="text" value={regReferralCode} onChange={(e) => setRegReferralCode(e.target.value.toUpperCase())} placeholder="Referral Code (Optional - ₹50 Bonus on ₹200+ 1st order)" className="w-full bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 font-bold" />
                )}
                {authMsg && <p className="text-red-600 font-bold">{authMsg}</p>}
                <button type="submit" className="w-full bg-[#167A37] text-white font-black py-3 rounded-xl">
                  Complete Registration
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Smiling Registration Welcome Modal
  const WelcomeSmileModal = () =>
    showWelcomeSmile ? (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 text-center max-w-xs space-y-3 shadow-2xl animate-bounce">
          <div className="text-5xl">😊</div>
          <h3 className="text-lg font-black text-[#167A37]">Thanks for Register with Us!</h3>
          <p className="text-xs text-gray-600">Welcome to Rythu Basket Nellore, {currentUser.name}!</p>
        </div>
      </div>
    ) : null;

  // Shared Profile Tab Across All Roles (With Strict Logout)
  const renderSharedProfileTab = () => (
    <div className="p-4 space-y-3 text-xs">
      <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center space-x-3">
        <div className="h-14 w-14 rounded-full bg-emerald-100 text-[#167A37] font-black text-xl flex items-center justify-center">
          {currentUser.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-base font-black text-gray-900">{currentUser.name}</h2>
          <p className="text-gray-500 font-bold">+91 {currentUser.mobile} • {currentUser.role.toUpperCase()}</p>
          <p className="text-[11px] text-gray-400">{currentUser.address}</p>
        </div>
      </div>

      {/* Wallet Card with 15-Day Expiry & 48h-6h Alert */}
      <div className="bg-gradient-to-r from-[#167A37] to-[#238E43] text-white rounded-2xl p-4 shadow space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="font-bold text-emerald-100">Rythu Wallet Balance</span>
          <span className="bg-white/20 text-[10px] font-black px-2 py-0.5 rounded-full">15-Day Validity</span>
        </div>
        <h3 className="text-2xl font-black">₹{currentUser.wallet || 0}</h3>
        <p className="text-[10px] text-yellow-200 font-bold">
          ⏰ Auto-Alert: Wallet balance expires in 15 days. Alert triggered 48h–6h before expiry!
        </p>
      </div>

      {/* Refer & Earn (First 10 Referrals = ₹50 Cashback each) */}
      {currentUser.role === 'customer' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-black text-amber-900">🎁 Refer & Earn (₹50 / Referral)</span>
            <span className="text-[10px] font-black bg-amber-200 px-2 py-0.5 rounded-full">
              {currentUser.referralsCount || 0} / 10 Used
            </span>
          </div>
          <p className="text-[11px] text-gray-700">
            Share your link! When your friend installs & places their 1st order of <strong>₹200+</strong>, <strong>₹50</strong> is credited to your wallet (up to 10 referrals).
          </p>
          <div className="flex space-x-2">
            <input readOnly value={`https://rythu-market.vercel.app/?ref=${currentUser.mobile}`} className="flex-1 bg-white border rounded-xl px-2.5 py-1.5 text-[10px] font-bold" />
            <button
              onClick={() => notify('Referral link copied! Share on WhatsApp')}
              className="bg-[#167A37] text-white font-extrabold px-3 py-1.5 rounded-xl"
            >
              Share
            </button>
          </div>
        </div>
      )}

{/* Coupons & Offers List */}
      <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
        <h3 className="font-black text-gray-900">Coupons & Loyalty Offers</h3>
        <div className="p-2.5 bg-emerald-50 rounded-xl font-bold text-[#167A37]">
          • 1st 2 Orders: 50% OFF (Max ₹100)
        </div>
        <div className="p-2.5 bg-blue-50 rounded-xl font-bold text-blue-800">
          • 3rd to 5th Orders: 25% OFF
        </div>
        <div className="p-2.5 bg-amber-50 rounded-xl font-bold text-amber-800">
          • 5th to 10th Orders: Flat ₹20 Wallet Cashback
        </div>
      </div>

      <a href="tel:8328261103" className="block w-full bg-white border border-gray-200 text-center font-extrabold py-3 rounded-2xl">
        📞 Contact Support (8328261103)
      </a>

      {/* STRICT LOGOUT BUTTON (ONLY WAY TO SWITCH ROLES) */}
      <button
        onClick={handleStrictLogout}
        className="w-full bg-red-600 text-white font-black py-3.5 rounded-2xl shadow flex items-center justify-center space-x-2"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout (Switch Role)</span>
      </button>
    </div>
  );

  // =========================================================================
  // 3. CUSTOMER STOREFRONT (OFFERS TICKER, WALLET, CRED/PAYTM/CARDS, SCRATCH CARD, ANIMATED TRACKING)
  // =========================================================================
  if (currentUser.role === 'customer') {
    const orderNum = (currentUser.ordersCompleted || 0) + 1;
    const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = products.find((x) => x.id === id);
      return sum + (p ? p.retailPrice * qty : 0);
    }, 0);

    // Tiered Loyalty Offer Calculation
    let autoTierDiscount = 0;
    let autoTierLabel = '';
    if (offersEnabled && subtotal > 0) {
      if (orderNum <= 2) {
        autoTierDiscount = Math.min(100, Math.round(subtotal * 0.5));
        autoTierLabel = `1st 2 Orders 50% OFF (-₹${autoTierDiscount})`;
      } else if (orderNum <= 5) {
        autoTierDiscount = Math.min(80, Math.round(subtotal * 0.25));
        autoTierLabel = `Orders 3-5 25% OFF (-₹${autoTierDiscount})`;
      }
    }

    const deliveryFee = subtotal === 0 ? 0 : subtotal >= 99 ? 0 : 20; // Free delivery above ₹99!
    const walletDeduction = useWalletBalance ? Math.min(currentUser.wallet || 0, Math.max(0, subtotal - autoTierDiscount)) : 0;
    const promoDeduction = appliedPromo ? 30 : 0;
    const payableTotal = Math.max(0, subtotal + deliveryFee - autoTierDiscount - promoDeduction - walletDeduction);

    // Dynamic Cashback for CRED, Paytm & Credit Card based on Order Value
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

      // Deduct used wallet & increment order count; credit referral ₹50 if 1st order >= ₹200
      const updatedUser = {
        ...currentUser,
        wallet: (currentUser.wallet || 0) - walletDeduction,
        ordersCompleted: (currentUser.ordersCompleted || 0) + 1,
      };
      setCurrentUser(updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      setPendingCashback((c) => c + estimatedCashback);
      setOrders([newOrd, ...orders]);
      setCart({});
      setSelectedOrderForTrack(newOrd);
      setActiveTab('orders');
      notify(`✅ Order ${newOrd.id} Placed! ₹${estimatedCashback} Cashback will credit upon delivery.`);
    };

    const handleSimulateCustomerDelivery = (ord) => {
      // Credit cashback + generate Scratch Card (₹4 to ₹25 or Better Luck Next Time)
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

return (
      <div className="min-h-screen bg-[#F4F7F4] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
        <WelcomeSmileModal />
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#11652D] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">
            {toast}
          </div>
        )}

        {/* SCRATCH CARD MODAL */}
        {scratchCard && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 text-center max-w-xs w-full space-y-4 shadow-2xl">
              <Sparkles className="h-10 w-10 text-amber-500 mx-auto" />
              <h3 className="text-lg font-black">Order {scratchCard.orderId} Delivered!</h3>
              {!scratchCard.scratched ? (
                <button
                  onClick={() => setScratchCard({ ...scratchCard, scratched: true })}
                  className="w-full h-32 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-base shadow-lg flex flex-col items-center justify-center animate-pulse"
                >
                  <span>👆 TAP TO SCRATCH CARD</span>
                  <span className="text-xs font-semibold mt-1">Win up to ₹{scratchMax} Wallet Cashback!</span>
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <p className="text-xl font-black text-[#167A37]">
                    {scratchCard.reward > 0 ? `🎉 You Won ₹${scratchCard.reward}!` : '😅 Better Luck Next Time!'}
                  </p>
                  <p className="text-[11px] text-gray-600">
                    {scratchCard.reward > 0 ? 'Credited to your Rythu Wallet (Valid 15 days).' : 'Order again for another scratch card!'}
                  </p>
                </div>
              )}
              <button onClick={() => setScratchCard(null)} className="w-full bg-[#167A37] text-white font-black py-2.5 rounded-xl text-xs">
                Close
              </button>
            </div>
          </div>
        )}

        {/* TOP HEADER WITH WALLET ICON + SCROLLING OFFERS TICKER */}
        <header className="bg-[#167A37] text-white sticky top-0 z-30 px-4 pt-3 pb-3 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <img src="/icon-512.png" alt="Logo" className="h-9 w-9 rounded-full bg-white p-0.5 object-cover" />
              <div>
                <p className="text-[10px] text-emerald-200 font-bold">⚡ FREE Delivery above ₹99</p>
                <p className="text-xs font-black truncate max-w-[165px]">{currentUser.address}</p>
              </div>
            </div>

            {/* TOP WALLET PILL */}
            <button
              onClick={() => setActiveTab('profile')}
              className="bg-yellow-300 text-gray-900 px-3 py-1.5 rounded-full text-xs font-black flex items-center space-x-1 shadow"
            >
              <Wallet className="h-3.5 w-3.5" />
              <span>₹{currentUser.wallet || 0}</span>
            </button>
          </div>

          {/* SCROLLING OFFERS & COUPONS MARQUEE */}
          {offersEnabled && (
            <div className="bg-[#0E5224] rounded-xl px-3 py-1.5 overflow-hidden whitespace-nowrap text-[11px] font-extrabold text-yellow-200">
              <div className="animate-pulse">
                🎉 FREE Delivery ₹99+ • 1st 2 Orders 50% OFF • Orders 3–5 25% OFF • Code RYTHU30 for ₹30 OFF!
              </div>
            </div>
          )}
        </header>

        {/* TAB 1: CUSTOMER HOME */}
        {activeTab === 'home' && (
          <main className="p-4 space-y-3.5 text-xs">
            <div className="bg-white rounded-2xl px-3.5 py-2.5 flex items-center shadow-sm border">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Tomato, Mango, Spinach..."
                className="w-full font-semibold focus:outline-none"
              />
            </div>

            {/* Active Coupons Banner on Home */}
            {offersEnabled && (
              <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <span className="bg-[#167A37] text-white text-[9px] font-black px-2 py-0.5 rounded">YOUR TIER OFFER</span>
                  <p className="font-black text-gray-900 mt-1">
                    {orderNum <= 2 ? '50% OFF on this order!' : orderNum <= 5 ? '25% OFF on this order!' : '₹20 Cashback on this order!'}
                  </p>
                </div>
                <button onClick={() => setActiveTab('cart')} className="bg-[#167A37] text-white font-black px-3 py-1.5 rounded-xl">
                  Use Now
                </button>
              </div>
            )}

 {/* Products List */}
            <div className="grid grid-cols-2 gap-3">
              {products
                .filter((p) => p.nameEn.toLowerCase().includes(search.toLowerCase()) || p.nameTe.includes(search))
                .map((p) => {
                  const q = cart[p.id] || 0;
                  return (
                    <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between space-y-2">
                      <div>
                        <img src={p.img} alt={p.nameEn} className="h-24 w-full object-cover rounded-xl mb-2" />
                        <h4 className="font-extrabold text-gray-900">{p.nameEn}</h4>
                        <p className="text-[10px] text-gray-500">{p.nameTe} • {p.farmerName}</p>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-black text-[#167A37]">₹{p.retailPrice}/kg</span>
                        {!p.inStock ? (
                          <span className="text-[10px] font-bold text-red-500">Out of Stock</span>
                        ) : q === 0 ? (
                          <button onClick={() => setCart({ ...cart, [p.id]: 1 })} className="bg-[#167A37] text-white font-extrabold px-3 py-1 rounded-lg">
                            Add +
                          </button>
                        ) : (
                          <div className="flex items-center bg-[#167A37] text-white rounded-lg px-2 py-1 space-x-2 font-black">
                            <button onClick={() => setCart((c) => { const n = { ...c }; if (n[p.id] <= 1) delete n[p.id]; else n[p.id]--; return n; })}>-</button>
                            <span>{q}</span>
                            <button onClick={() => setCart({ ...cart, [p.id]: q + 1 })}>+</button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </main>
        )}

        {/* TAB 2: CART & CHECKOUT (COUPONS, CRED/PAYTM/CARD CASHBACK, WALLET) */}
        {activeTab === 'cart' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">Checkout & Payment</h2>

            {Object.keys(cart).length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center font-bold text-gray-500">Your cart is empty.</div>
            ) : (
              <>
                {Object.entries(cart).map(([id, qty]) => {
                  const p = products.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <div key={id} className="bg-white rounded-2xl p-3 shadow-sm flex justify-between items-center">
                      <div>
                        <h4 className="font-extrabold">{p.nameEn} ({p.nameTe})</h4>
                        <p className="text-[#167A37] font-black">₹{p.retailPrice} × {qty} kg = ₹{p.retailPrice * qty}</p>
                      </div>
                      <div className="flex items-center bg-[#167A37] text-white rounded-lg px-2 py-1 space-x-2 font-black">
                        <button onClick={() => setCart((c) => { const n = { ...c }; if (n[id] <= 1) delete n[id]; else n[id]--; return n; })}>-</button>
                        <span>{qty}</span>
                        <button onClick={() => setCart({ ...cart, [id]: qty + 1 })}>+</button>
                      </div>
                    </div>
                  );
                })}

                {/* Promo Code & Wallet Toggle */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2.5">
                  <div className="flex space-x-2">
                    <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value.toUpperCase())} placeholder="Promo Code: RYTHU30" className="flex-1 bg-gray-50 border rounded-xl px-3 py-2 font-black" />
                    <button onClick={() => { setAppliedPromo('RYTHU30'); notify('🎉 RYTHU30 Applied (-₹30)'); }} className="bg-[#167A37] text-white font-extrabold px-4 rounded-xl">
                      Apply
                    </button>
                  </div>

                  {(currentUser.wallet || 0) > 0 && (
                    <label className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-xl font-extrabold">
                      <span>Use Wallet Balance (Available: ₹{currentUser.wallet})</span>
                      <input type="checkbox" checked={useWalletBalance} onChange={(e) => setUseWalletBalance(e.target.checked)} className="accent-[#167A37] h-4 w-4" />
                    </label>
                  )}
                </div>

                {/* Payment Modes with Dynamic Cashback for CRED, Paytm & Credit Card */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                  <h3 className="font-black">Select Payment Mode</h3>
                  {[
                    { id: 'cred', label: `CRED UPI (Instant ₹${Math.max(10, Math.round(payableTotal * 0.08))} Cashback!)`, logo: <CredLogo /> },
                    { id: 'paytm', label: `Paytm (₹${Math.max(5, Math.round(payableTotal * 0.05))} Cashback)`, logo: <PaytmLogo /> },
                    { id: 'card', label: `Credit / Debit Card (₹${Math.max(5, Math.round(payableTotal * 0.05))} Cashback)`, logo: <span className="h-7 w-7 rounded-lg bg-slate-800 text-white font-black text-[10px] flex items-center justify-center">CARD</span> },
                    { id: 'phonepe', label: 'PhonePe UPI', logo: <PhonePeLogo /> },
                    { id: 'gpay', label: 'Google Pay (GPay)', logo: <GPayLogo /> },
                    { id: 'cod', label: 'Cash on Delivery (COD)', logo: <Wallet className="h-6 w-6 text-green-700" /> },
                  ].map((pm) => (
                    <label key={pm.id} className={`flex items-center justify-between p-2.5 rounded-xl border-2 cursor-pointer ${payMode === pm.id ? 'border-[#167A37] bg-emerald-50/40' : 'border-gray-100'}`}>
                      <div className="flex items-center space-x-2.5">
                        {pm.logo}
                        <span className="font-extrabold">{pm.label}</span>
                      </div>
                      <input type="radio" checked={payMode === pm.id} onChange={() => setPayMode(pm.id)} className="accent-[#167A37]" />
                    </label>
                  ))}

                  {payMode === 'card' && (
                    <div className="pt-2 space-y-2">
                      <input type="text" value={cardNo} onChange={(e) => setCardNo(e.target.value)} placeholder="16-Digit Card Number" className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={cardExp} onChange={(e) => setCardExp(e.target.value)} placeholder="MM/YY" className="bg-gray-50 border rounded-xl px-3 py-2 font-bold" />
                        <input type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="CVV" className="bg-gray-50 border rounded-xl px-3 py-2 font-bold" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bill Summary */}
                <div className="bg-white rounded-2xl p-4 shadow-sm space-y-1.5">
                  <div className="flex justify-between"><span>Item Subtotal</span><span className="font-bold">₹{subtotal}</span></div>
                  {autoTierDiscount > 0 && <div className="flex justify-between text-emerald-700 font-extrabold"><span>{autoTierLabel}</span><span>-₹{autoTierDiscount}</span></div>}
                  {promoDeduction > 0 && <div className="flex justify-between text-emerald-700 font-extrabold"><span>Promo RYTHU30</span><span>-₹{promoDeduction}</span></div>}
                  {walletDeduction > 0 && <div className="flex justify-between text-amber-700 font-extrabold"><span>Wallet Used</span><span>-₹{walletDeduction}</span></div>}
                  <div className="flex justify-between"><span>Delivery Fee (Free ₹99+)</span><span className="font-bold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                  <div className="border-t pt-2 flex justify-between text-sm font-black"><span>Grand Total</span><span>₹{payableTotal}</span></div>
                  <p className="text-[10px] font-extrabold text-amber-700">✨ ₹{estimatedCashback} Cashback + Scratch Card unlocks upon delivery!</p>
                  <button onClick={handlePlaceCustomerOrder} className="w-full mt-2 bg-[#167A37] text-white font-black py-3.5 rounded-2xl shadow text-sm">
                    Pay & Place Order • ₹{payableTotal}
                  </button>
                </div>
              </>
            )}
          </main>
        )}

{/* TAB 3: ORDERS + ANIMATED LIVE TRACKING (ONLY WHEN PARTNER ASSIGNED) + REORDER */}
        {activeTab === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">My Orders & Animated Live Tracking</h2>

            {orders
              .filter((o) => o.buyerRole === 'customer')
              .map((ord) => {
                const isDelivered = ord.status === 'Delivered';
                const steps = ['Order Placed', 'Order Accepted', 'Partner Assigned', 'Out for Delivery', 'Delivered'];
                const currentStepIdx = steps.indexOf(ord.status);

                return (
                  <div key={ord.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-sm">{ord.id} • <span className="text-[#167A37]">{ord.status}</span></span>
                      <span className="font-black text-sm">₹{ord.total}</span>
                    </div>
                    <p className="text-gray-600">{ord.items.map((i) => `${i.qty}kg ${i.name}`).join(', ')} • {ord.date}</p>

                    {isDelivered ? (
                      /* DELIVERED ORDERS: NO LIVE TRACKING — REORDER AT PRESENT DAY RATES */
                      <div className="pt-2 border-t flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-emerald-700">✓ Delivered on {ord.date}</span>
                        <button
                          onClick={() => {
                            const updatedCart = {};
                            ord.items.forEach((it) => { updatedCart[it.id] = it.qty; });
                            setCart(updatedCart);
                            setActiveTab('cart');
                            notify('Cart updated with present day rates!');
                          }}
                          className="bg-[#167A37] text-white font-extrabold px-4 py-2 rounded-xl"
                        >
                          Reorder (Today's Rates)
                        </button>
                      </div>
                    ) : (
                      /* ACTIVE ORDERS: ANIMATED STEP TRACKER + PARTNER LIVE LOCATION, CALL & MESSAGE */
                      <div className="space-y-3 pt-2 border-t">
                        <div className="grid grid-cols-4 gap-1 text-center">
                          {['Order Placed', 'Order Accepted', 'Partner Assigned', 'Out for Delivery'].map((st, idx) => {
                            const active = idx <= currentStepIdx;
                            return (
                              <div key={st} className="space-y-1">
                                <div className={`h-2 rounded-full transition-all duration-500 ${active ? 'bg-[#167A37] animate-pulse' : 'bg-gray-200'}`} />
                                <p className={`text-[9px] font-extrabold leading-tight ${active ? 'text-[#167A37]' : 'text-gray-400'}`}>{st}</p>
                              </div>
                            );
                          })}
                        </div>

                        {ord.driverName ? (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[10px] font-bold text-emerald-800">🛵 Live Delivery Partner Assigned</p>
                                <p className="font-black text-gray-900">{ord.driverName}</p>
                                <p className="text-[10px] text-gray-600">GPS: {ord.driverCoords || 'Nellore Live Tracking'}</p>
                              </div>
                              <div className="flex space-x-2">
                                <a href={`tel:${ord.driverMobile}`} className="p-2.5 bg-[#167A37] text-white rounded-full shadow">
                                  <Phone className="h-4 w-4" />
                                </a>
                                <a href={`sms:${ord.driverMobile}`} className="p-2.5 bg-blue-600 text-white rounded-full shadow">
                                  <MessageSquare className="h-4 w-4" />
                                </a>
                              </div>
                            </div>

                            <button
                              onClick={() => handleSimulateCustomerDelivery(ord)}
                              className="w-full bg-amber-500 text-white font-black py-2 rounded-xl"
                            >
                              Simulate Delivery Complete (Unlock Cashback & Scratch Card)
                            </button>
                          </div>
                        ) : (
                          <p className="text-[11px] font-bold text-amber-700 bg-amber-50 p-2 rounded-xl text-center">
                            ⏳ Waiting for Store Acceptance & Delivery Partner Assignment to enable Live Map...
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

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-6 py-2 flex justify-between items-center z-40">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'cart', icon: ShoppingCart, label: `Cart (${Object.values(cart).reduce((a, b) => a + b, 0)})` },
            { id: 'orders', icon: ClipboardList, label: 'Orders' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === t.id ? 'text-[#167A37]' : 'text-gray-400'}`}>
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
  // 4. FARMER PORTAL (BILINGUAL TRANSLATE, AVAILABILITY TIME, 40KM SHOP ALERT, AUTO STOCK DEDUCT)
  // =========================================================================
  if (currentUser.role === 'farmer') {
    const handlePublishFarmerProduct = (e) => {
      e.preventDefault();
      if (!fNameEn.trim() || !fPrice) return;
      const newProd = {
        id: 'p_' + Date.now(),
        farmerId: currentUser.id,
        farmerName: `${currentUser.name} (14 km)`,
        distanceKm: 14,
        nameEn: fNameEn.trim(),
        nameTe: fNameTe.trim() || fNameEn.trim(),
        cat: 'Vegetables',
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
        `📢 40km Wholesale Alert: ${currentUser.name} listed ${fQty}kg ${newProd.nameEn} (${newProd.nameTe}) available ${fAvailTime}!`,
        ...prev,
      ]);
      setFNameEn('');
      setFNameTe('');
      notify('✅ Published! Notification sent to Wholesale Shops within 40 km.');
    };

    return (
      <div className="min-h-screen bg-[#F4F7F4] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
        <WelcomeSmileModal />
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#11652D] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-[#167A37] text-white p-4 rounded-b-3xl flex justify-between items-center">
          <div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-extrabold">FARMER PORTAL</span>
            <h1 className="text-base font-black mt-0.5">{currentUser.name}</h1>
          </div>
          <span className="bg-yellow-300 text-gray-900 text-xs font-black px-3 py-1 rounded-full">₹{currentUser.wallet}</span>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-3 text-xs">
            {/* Bilingual Auto-Translate Product Listing Form */}
            <form onSubmit={handlePublishFarmerProduct} className="bg-white rounded-2xl p-4 shadow-sm space-y-2.5">
              <h2 className="font-black text-sm">Publish Harvest (Auto English ↔ తెలుగు Translate)</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-400">Name in English</label>
                  <input type="text" required value={fNameEn} onChange={(e) => handleFarmerEnChange(e.target.value)} placeholder="e.g., Tomato" className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400">పేరు తెలుగులో (Auto)</label>
                  <input type="text" required value={fNameTe} onChange={(e) => handleFarmerTeChange(e.target.value)} placeholder="ఉదా: టమాటా" className="w-full bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 font-bold text-[#167A37]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-400">Qty (KG)</label>
                  <input type="number" required value={fQty} onChange={(e) => setFQty(e.target.value)} className="w-full bg-gray-50 border rounded-xl px-2.5 py-2 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400">Price ₹/kg</label>
                  <input type="number" required value={fPrice} onChange={(e) => setFPrice(e.target.value)} className="w-full bg-gray-50 border rounded-xl px-2.5 py-2 font-black text-[#167A37]" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400">Available Time</label>
                  <input type="text" required value={fAvailTime} onChange={(e) => setFAvailTime(e.target.value)} className="w-full bg-gray-50 border rounded-xl px-2.5 py-2 font-bold" />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#167A37] text-white font-black py-3 rounded-xl">
                Publish & Notify Wholesale Shops (Within 40 km)
              </button>
            </form>

            {/* Live Stock & Remaining Quantity */}
            <h3 className="font-black text-sm">My Live Stock (Auto-updates after delivery)</h3>
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm flex justify-between items-center">
                <div>
                  <h4 className="font-extrabold">{p.nameEn} • {p.nameTe}</h4>
                  <p className="text-[10px] text-gray-500">Available: {p.availableFrom} • ₹{p.farmerDirectPrice}/kg</p>
                </div>
                <span className="bg-emerald-50 text-[#167A37] font-black px-3 py-1 rounded-xl">
                  {p.stockKg} KG Left
                </span>
              </div>
            ))}
          </main>
        )}

        {activeTab === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">Shop Orders (Accepting Notifies Delivery Partners)</h2>
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                <div className="flex justify-between font-black">
                  <span>{ord.id} • {ord.status}</span>
                  <span className="text-[#167A37]">₹{ord.total}</span>
                </div>
                <p>{ord.buyerName} • {ord.items.map((i) => `${i.qty}kg ${i.name}`).join(', ')}</p>
                {ord.b2bOtp && <p className="text-amber-700 font-extrabold">B2B Handover OTP sent to Buyer: {ord.b2bOtp}</p>}
                {ord.status === 'Order Placed' && (
                  <button
                    onClick={() => {
                      setOrders((prev) => prev.map((o) => (o.id === ord.id ? { ...o, status: 'Order Accepted' } : o)));
                      setNotifications((prev) => [`🛵 Delivery Alert: Farmer accepted ${ord.id}. Ready for pickup!`, ...prev]);
                      notify('✅ Order Accepted! Notification sent to nearby Delivery Partners & OTP sent to Buyer.');
                    }}
                    className="w-full bg-[#167A37] text-white font-black py-2.5 rounded-xl"
                  >
                    Accept Order & Notify Delivery Partners
                  </button>
                )}
              </div>
            ))}
          </main>
        )}

        {activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-8 py-2 flex justify-between items-center z-40">
          {[
            { id: 'home', icon: Sprout, label: 'My Farm' },
            { id: 'orders', icon: ClipboardList, label: 'Orders' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === t.id ? 'text-[#167A37]' : 'text-gray-400'}`}>
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
  // 5. WHOLESALE & RETAIL PORTAL (FARM PICKUP vs DELIVERY FEE, MIN QTY, PDF INVOICE)
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
      notify(`✅ B2B Order Placed! Delivery OTP: ${otp} • PDF Invoice Ready`);
      setActiveTab('orders');
    };

    return (
      <div className="min-h-screen bg-[#F4F7F4] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
        <WelcomeSmileModal />
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#11652D] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-[#167A37] text-white p-4 rounded-b-3xl flex justify-between items-center">
          <div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-extrabold uppercase">{currentUser.role} PORTAL</span>
            <h1 className="text-base font-black mt-0.5">{currentUser.name}</h1>
          </div>
          <span className="bg-yellow-300 text-gray-900 text-xs font-black px-3 py-1 rounded-full">₹{currentUser.wallet}</span>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-3 text-xs">
            {/* Retail Supplier Selector (Farmer Rate vs Wholesale Rate) */}
            {isRetail && (
              <div className="bg-white rounded-2xl p-3 shadow-sm space-y-1.5">
                <p className="font-extrabold text-gray-500">Compare Supplier Prices:</p>
                <div className="grid grid-cols-2 gap-2 font-black">
                  <button onClick={() => setB2bSource('farmer')} className={`py-2 rounded-xl border ${b2bSource === 'farmer' ? 'bg-[#167A37] text-white' : 'bg-gray-50'}`}>
                    🌾 Direct Farmer Rate
                  </button>
                  <button onClick={() => setB2bSource('wholesale')} className={`py-2 rounded-xl border ${b2bSource === 'wholesale' ? 'bg-indigo-700 text-white' : 'bg-gray-50'}`}>
                    🏭 Wholesale Rate
                  </button>
                </div>
              </div>
            )}

            {/* Farm Pickup (₹0) vs Delivery to Shop (Distance + Qty Fee) */}
            <div className="bg-white rounded-2xl p-3 shadow-sm space-y-1.5">
              <p className="font-extrabold text-gray-500">Select Fulfillment Option:</p>
              <div className="grid grid-cols-2 gap-2 font-black">
                <button onClick={() => setB2bDeliveryMode('pickup')} className={`py-2 rounded-xl border ${b2bDeliveryMode === 'pickup' ? 'bg-emerald-50 border-[#167A37] text-[#167A37]' : 'bg-gray-50'}`}>
                  🚜 Farm Pickup (₹0 Fee)
                </button>
                <button onClick={() => setB2bDeliveryMode('delivery')} className={`py-2 rounded-xl border ${b2bDeliveryMode === 'delivery' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-gray-50'}`}>
                  🚚 Delivery to Shop
                </button>
              </div>
            </div>

            {products.map((p) => {
              const rate = b2bSource === 'farmer' ? p.farmerDirectPrice : p.wholesalePrice;
              const estDeliv = b2bDeliveryMode === 'pickup' ? 0 : Math.round(p.distanceKm * 5 + p.minWholesaleQty * 0.5);
              return (
                <div key={p.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-sm">{p.nameEn} ({p.nameTe})</h4>
                      <p className="text-[10px] text-gray-500">{p.farmerName} • Stock: {p.stockKg} KG</p>
                      <p className="text-[11px] font-extrabold text-[#167A37] mt-1">
                        Rate: ₹{rate}/kg • Min Qty: {p.minWholesaleQty} KG • Delivery Fee: ₹{estDeliv}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handlePlaceB2BOrder(p)} className="w-full bg-[#167A37] text-white font-black py-2.5 rounded-xl">
                    Order {p.minWholesaleQty} KG (₹{rate * p.minWholesaleQty + estDeliv}) + Auto PDF Invoice
                  </button>
                </div>
              );
            })}
          </main>
        )}

        {activeTab === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">My Orders, B2B OTP & PDF Invoices</h2>
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                <div className="flex justify-between font-black">
                  <span>{ord.id} • {ord.status}</span>
                  <span className="text-[#167A37]">₹{ord.total}</span>
                </div>
                <p>{ord.items.map((i) => `${i.qty}kg ${i.name}`).join(', ')}</p>
                {ord.b2bOtp && (
                  <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl font-black text-amber-900">
                    🔐 Delivery Verification OTP (Share with Delivery Partner): {ord.b2bOtp}
                  </div>
                )}
                <button onClick={() => window.print()} className="w-full bg-gray-900 text-white font-extrabold py-2 rounded-xl flex items-center justify-center space-x-1.5">
                  <Printer className="h-3.5 w-3.5" />
                  <span>Download / Print PDF Invoice (Both Parties)</span>
                </button>
              </div>
            ))}
          </main>
        )}

{activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-8 py-2 flex justify-between items-center z-40">
          {[
            { id: 'home', icon: Store, label: 'Buy Bulk' },
            { id: 'orders', icon: ClipboardList, label: 'Orders & PDF' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === t.id ? 'text-[#167A37]' : 'text-gray-400'}`}>
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
  // 6. DELIVERY PARTNER PORTAL (100 ORDERS WEEKLY INCENTIVE, B2B OTP ONLY, AUTO STOCK DEDUCT)
  // =========================================================================
  if (currentUser.role === 'delivery') {
    const availOrders = orders.filter((o) => o.status !== 'Delivered');
    const delivOrders = orders.filter((o) => o.status === 'Delivered');
    const weeklyCompleted = currentUser.weeklyOrders || 78;

    const handleCompleteDelivery = (ord) => {
      // Deduct delivered quantity from Farmer's product stock!
      setProducts((prev) =>
        prev.map((p) => {
          const orderedItem = ord.items.find((it) => it.id === p.id);
          if (!orderedItem) return p;
          return { ...p, stockKg: Math.max(0, p.stockKg - orderedItem.qty) };
        })
      );

      setOrders((prev) => prev.map((o) => (o.id === ord.id ? { ...o, status: 'Delivered' } : o)));
      setCurrentUser({ ...currentUser, wallet: (currentUser.wallet || 0) + 40, weeklyOrders: weeklyCompleted + 1 });
      notify('✅ Delivered! Farmer stock automatically reduced & ₹40 credited.');
    };

    return (
      <div className="min-h-screen bg-[#F4F7F4] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#11652D] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-[#167A37] text-white p-4 rounded-b-3xl flex justify-between items-center">
          <div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-extrabold">DELIVERY FLEET</span>
            <h1 className="text-base font-black mt-0.5">{currentUser.name}</h1>
          </div>
          <span className="bg-yellow-300 text-gray-900 text-xs font-black px-3 py-1 rounded-full">₹{currentUser.wallet}</span>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-3 text-xs">
            {/* Clickable Metrics Cards */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <button onClick={() => setDelivFilter('available')} className={`p-3 rounded-2xl shadow-sm border ${delivFilter === 'available' ? 'bg-emerald-50 border-[#167A37]' : 'bg-white'}`}>
                <p className="text-[10px] text-gray-500 font-bold">Available</p>
                <p className="text-xl font-black text-amber-600">{availOrders.length}</p>
              </button>
              <button onClick={() => setDelivFilter('delivered')} className={`p-3 rounded-2xl shadow-sm border ${delivFilter === 'delivered' ? 'bg-emerald-50 border-[#167A37]' : 'bg-white'}`}>
                <p className="text-[10px] text-gray-500 font-bold">Delivered</p>
                <p className="text-xl font-black text-[#167A37]">{delivOrders.length}</p>
              </button>
              <button onClick={() => setDelivFilter('earnings')} className={`p-3 rounded-2xl shadow-sm border ${delivFilter === 'earnings' ? 'bg-emerald-50 border-[#167A37]' : 'bg-white'}`}>
                <p className="text-[10px] text-gray-500 font-bold">Earnings</p>
                <p className="text-xl font-black text-blue-600">₹{currentUser.wallet}</p>
              </button>
            </div>

            {/* Weekly 100 Orders Incentive Banner */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-3.5 shadow space-y-1.5">
              <div className="flex justify-between font-black">
                <span>🏆 Weekly 100 Orders Bonus: ₹1,500</span>
                <span>{weeklyCompleted} / 100</span>
              </div>
              <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full" style={{ width: `${Math.min(100, weeklyCompleted)}%` }} />
              </div>
            </div>

            {/* Filtered Data Display */}
            {delivFilter === 'earnings' ? (
              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
                <h3 className="font-black">Earnings & Incentive Breakdown</h3>
                <div className="flex justify-between"><span>Base Delivery Fees</span><span className="font-black">₹2,950</span></div>
                <div className="flex justify-between"><span>Weekly Target Bonus</span><span className="font-black text-[#167A37]">+₹500</span></div>
              </div>
            ) : (
              (delivFilter === 'available' ? availOrders : delivOrders).map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                  <div className="flex justify-between font-black">
                    <span>{ord.id} ({ord.buyerRole.toUpperCase()})</span>
                    <span className="text-[#167A37]">₹{ord.total}</span>
                  </div>
                  <p className="font-bold">📍 Buyer Location: {ord.buyerAddress}</p>
                  <div className="flex space-x-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ord.buyerAddress)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-blue-600 text-white font-extrabold py-2 rounded-xl text-center"
                    >
                      🗺️ Navigate Map
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
                            notify('✅ Accepted! Live GPS shared with Customer.');
                          } else {
                            if (ord.b2bOtp) {
                              const entered = window.prompt(`Enter ${ord.buyerRole.toUpperCase()} Delivery OTP (Demo: ${ord.b2bOtp}):`);
                              if (entered !== ord.b2bOtp) {
                                notify('❌ Invalid B2B OTP!');
                                return;
                              }
                            }
                            handleCompleteDelivery(ord);
                          }
                        }}
                        className="flex-1 bg-[#167A37] text-white font-extrabold py-2 rounded-xl"
                      >
                        {!ord.driverName ? 'Accept Order' : ord.b2bOtp ? 'Verify B2B OTP & Deliver' : 'Deliver (No OTP Needed)'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </main>
        )}

{activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-12 py-2 flex justify-between items-center z-40">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' ? 'text-[#167A37]' : 'text-gray-400'}`}>
            <Truck className="h-5 w-5 mb-0.5" />
            <span>Deliveries</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'profile' ? 'text-[#167A37]' : 'text-gray-400'}`}>
            <User className="h-5 w-5 mb-0.5" />
            <span>Profile</span>
          </button>
        </nav>
      </div>
    );
  }

  // =========================================================================
  // 7. MASTER ADMIN CONTROL (SCRATCH RANGE, TOGGLE OFFERS, STOCK IN/OUT, APPROVALS)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F4F7F4] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
      {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#11652D] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

      <header className="bg-[#0F5927] text-white p-4 rounded-b-3xl flex justify-between items-center">
        <div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-extrabold">MASTER ADMIN HQ</span>
          <h1 className="text-base font-black mt-0.5">Rythu Basket Admin</h1>
        </div>
        <span className="bg-amber-400 text-gray-900 text-xs font-black px-2.5 py-1 rounded-full">
          {notifications.length} Alerts
        </span>
      </header>

      {activeTab === 'home' && (
        <main className="p-4 space-y-3 text-xs">
          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {[
              { id: 'approvals', label: '🔔 Approvals' },
              { id: 'stock', label: '📦 Stock Control' },
              { id: 'controls', label: '⚙️ Scratch & Offers' },
            ].map((t) => (
              <button key={t.id} onClick={() => setAdminTab(t.id)} className={`px-3 py-1.5 rounded-xl font-extrabold border ${adminTab === t.id ? 'bg-[#167A37] text-white' : 'bg-white'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {adminTab === 'approvals' && (
            <div className="space-y-2.5">
              {notifications.map((n, idx) => (
                <div key={idx} className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl font-bold text-amber-900">
                  {n}
                </div>
              ))}
              {users
                .filter((u) => u.role === 'farmer' || u.role === 'wholesale' || u.role === 'retail')
                .map((u) => (
                  <div key={u.id} className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase bg-emerald-50 text-[#167A37] px-2 py-0.5 rounded">{u.role}</span>
                      <h4 className="font-black text-sm mt-1">{u.name}</h4>
                      <p className="text-gray-500">{u.mobile} • {u.address}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, approved: !x.approved } : x)));
                        notify('Approval Status Updated!');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-extrabold ${u.approved ? 'bg-emerald-50 text-[#167A37]' : 'bg-[#167A37] text-white'}`}
                    >
                      {u.approved ? '✓ Approved' : 'Approve'}
                    </button>
                  </div>
                ))}
            </div>
          )}

          {adminTab === 'stock' &&
            products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold">{p.nameEn} ({p.nameTe})</h4>
                  <p className="text-gray-500">Remaining: {p.stockKg} KG • Retail: ₹{p.retailPrice}/kg</p>
                </div>
                <button
                  onClick={() => {
                    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, inStock: !x.inStock } : x)));
                    notify('Stock Status Updated!');
                  }}
                  className={`px-3 py-1.5 rounded-xl font-extrabold ${p.inStock ? 'bg-emerald-50 text-[#167A37]' : 'bg-red-50 text-red-600'}`}
                >
                  {p.inStock ? 'In Stock' : 'Out of Stock'}
                </button>
              </div>
            ))}

          {adminTab === 'controls' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black">Customer Loyalty Offers & Promo Codes</span>
                <button
                  onClick={() => {
                    setOffersEnabled(!offersEnabled);
                    notify(offersEnabled ? 'Offers Disabled' : 'Offers Enabled');
                  }}
                  className={`px-4 py-1.5 rounded-full font-black ${offersEnabled ? 'bg-[#167A37] text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  {offersEnabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <div>
                  <label className="block font-bold text-gray-500 mb-1">Daily Scratch Min (₹)</label>
                  <input type="number" value={scratchMin} onChange={(e) => setScratchMin(Number(e.target.value))} className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-black" />
                </div>
                <div>
                  <label className="block font-bold text-gray-500 mb-1">Daily Scratch Max (₹)</label>
                  <input type="number" value={scratchMax} onChange={(e) => setScratchMax(Number(e.target.value))} className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-black" />
                </div>
              </div>
              <button onClick={() => notify(`✅ Daily Scratch Card Range Set: ₹${scratchMin} – ₹${scratchMax}`)} className="w-full bg-[#167A37] text-white font-black py-2.5 rounded-xl">
                Save Admin Rules
              </button>
            </div>
          )}
        </main>
      )}

      {activeTab === 'profile' && renderSharedProfileTab()}

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-12 py-2 flex justify-between items-center z-40">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' ? 'text-[#167A37]' : 'text-gray-400'}`}>
          <ShieldCheck className="h-5 w-5 mb-0.5" />
          <span>Admin HQ</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'profile' ? 'text-[#167A37]' : 'text-gray-400'}`}>
          <User className="h-5 w-5 mb-0.5" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}