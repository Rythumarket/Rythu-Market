import React, { useState, useEffect } from 'react';
import {
  Search, ShoppingCart, Plus, Minus, Home, ClipboardList, User, MapPin,
  Phone, MessageSquare, Sprout, Store, Truck, ShieldCheck, ChevronRight,
  ArrowLeft, CheckCircle2, Wallet, Gift, Sparkles,
  LocateFixed, LogOut, Printer, Warehouse,
  Heart, Clock, ChevronDown, Briefcase
} from 'lucide-react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebase';

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
  { id: 'All', labelEn: 'All Items', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=160&q=80' },
  { id: 'Vegetables', labelEn: 'Vegetables', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=160&q=80' },
  { id: 'Fruits', labelEn: 'Fruits', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=160&q=80' },
  { id: 'Leafy Greens', labelEn: 'Leafy Greens', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=160&q=80' },
  { id: 'Staples', labelEn: 'Staples', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=160&q=80' },
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

const PaymentBadge = ({ type }) => {
  if (type === 'phonepe') return <span className="h-8 w-8 rounded-xl bg-[#5F259F] text-white font-black text-xs flex items-center justify-center shadow-sm">पे</span>;
  if (type === 'gpay') return <span className="h-8 w-8 rounded-xl bg-white border border-gray-200 text-[#1A73E8] font-black text-xs flex items-center justify-center shadow-sm">G</span>;
  if (type === 'paytm') return <span className="h-8 w-8 rounded-xl bg-[#00BAF2] text-[#002970] font-black text-[9px] flex items-center justify-center shadow-sm">Paytm</span>;
  if (type === 'cred') return <span className="h-8 w-8 rounded-xl bg-slate-900 text-amber-300 font-black text-[9px] flex items-center justify-center shadow-sm">CRED</span>;
  if (type === 'card') return <span className="h-8 w-8 rounded-xl bg-slate-800 text-white font-black text-[9px] flex items-center justify-center shadow-sm">CARD</span>;
  return (
    <span className="h-8 w-8 rounded-xl bg-emerald-100 text-[#15803D] flex items-center justify-center shadow-sm">
      <Wallet className="h-4 w-4" />
    </span>
  );
};

const isValidIndianMobile = (num) => /^[6-9]\d{9}$/.test(num);

// Build Android Intent + UPI Deep Link so PhonePe / GPay / Paytm launch reliably on mobile Chrome
const buildPaymentLaunchUrl = (mode, upiId, amount) => {
  const pa = encodeURIComponent(upiId);
  const pn = encodeURIComponent('Rythu Basket Nellore');
  const am = Number(amount || 1).toFixed(2);
  const query = `pa=${pa}&pn=${pn}&am=${am}&cu=INR`;

  const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
  const pkgMap = {
    phonepe: 'com.phonepe.app',
    gpay: 'com.google.android.apps.nbu.paisa.user',
    paytm: 'net.one97.paytm',
    cred: 'com.dreamplug.androidapp',
  };

  if (isAndroid && pkgMap[mode]) {
    return `intent://pay?${query}#Intent;scheme=upi;package=${pkgMap[mode]};end`;
  }
  return `upi://pay?${query}`;
};

export default function App() {
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
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('rythu_registered_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  useEffect(() => {
    try {
      localStorage.setItem('rythu_registered_users', JSON.stringify(users));
    } catch {
      // ignore storage errors
    }
  }, [users]);

  // Real Firebase SMS OTP States
  const [authScreen, setAuthScreen] = useState('login');
  const [loginMobile, setLoginMobile] = useState('');
  const [loginOtpSent, setLoginOtpSent] = useState(false);
  const [loginOtp, setLoginOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [sendingSms, setSendingSms] = useState(false);
  const [verifyingSms, setVerifyingSms] = useState(false);
  const [authMsg, setAuthMsg] = useState('');

  // Registration Form States
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regReferralCode, setRegReferralCode] = useState('');
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtpInput, setRegOtpInput] = useState('');
  const [showWelcomeSmile, setShowWelcomeSmile] = useState(false);

  // Navigation & Store States
  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState(['p1', 'p3']);

  // Location & Map Pin States
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr1',
      tag: 'Home',
      title: 'Vedayapalem Main Road',
      full: 'Vedayapalem, Nellore, Andhra Pradesh',
      distance: '57 m',
      lat: 14.4285,
      lng: 79.9692,
    },
  ]);
  const [activeAddrId, setActiveAddrId] = useState('addr1');
  const [locSearch, setLocSearch] = useState('');
  const [mapPinCoords, setMapPinCoords] = useState({ lat: 14.4426, lng: 79.9865 });
  const [mapPinTitle, setMapPinTitle] = useState('Vedayapalem, Nellore');
  const [mapPinFullAddress, setMapPinFullAddress] = useState('Vedayapalem, Nellore, Andhra Pradesh, 524004');
  const [mapPinTag, setMapPinTag] = useState('Home');
  const [isEditingPinText, setIsEditingPinText] = useState(false);
  const [isLocatingGps, setIsLocatingGps] = useState(false);

// Cart & Payments
  const [cart, setCart] = useState({ p1: 2, p3: 1 });
  const [useWalletBalance, setUseWalletBalance] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [payMode, setPayMode] = useState('phonepe');
  const [utrRefInput, setUtrRefInput] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardError, setCardError] = useState('');
  const [merchantUpiId] = useState('8328261103@ybl');

  // B2B States
  const [b2bSource, setB2bSource] = useState('farmer');
  const [b2bDeliveryMode, setB2bDeliveryMode] = useState('pickup');

  // Scratch Card & Notifications
  const [scratchCard, setScratchCard] = useState(null);
  const [notifications, setNotifications] = useState([
    'Wallet Alert: Cashback expires in 15 days (48h–6h reminder active).',
  ]);
  const [orders, setOrders] = useState([]);

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
    setTimeout(() => setToast(''), 3500);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  };

  const triggerFirebaseSmsOtp = async (tenDigitMobile) => {
    setSendingSms(true);
    setAuthMsg('');
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = `+91${tenDigitMobile}`;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      notify(`SMS OTP sent to +91 ${tenDigitMobile}! Check your phone SMS inbox.`);
      return true;
    } catch (err) {
      setAuthMsg(`SMS Failed: ${err.message}`);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      return false;
    } finally {
      setSendingSms(false);
    }
  };

  const verifyFirebaseSmsOtp = async (sixDigitCode) => {
    if (!confirmationResult) {
      setAuthMsg('Please tap Send OTP first.');
      return false;
    }
    setVerifyingSms(true);
    try {
      await confirmationResult.confirm(sixDigitCode);
      return true;
    } catch {
      setAuthMsg('Incorrect 6-digit OTP! Check your SMS inbox and try again.');
      return false;
    } finally {
      setVerifyingSms(false);
    }
  };

  const handleSendLoginOtp = async () => {
    const clean = loginMobile.replace(/\D/g, '');
    if (!isValidIndianMobile(clean)) {
      setAuthMsg('Please enter a valid 10-digit Indian mobile number (starts with 6–9).');
      return;
    }
    const existing = users.find((u) => u.mobile === clean && u.role === selectedRole);
    if (!existing) {
      setAuthMsg('Mobile number not registered, please register.');
      setLoginOtpSent(false);
      return;
    }
    setLoginOtp('');
    const ok = await triggerFirebaseSmsOtp(clean);
    if (ok) setLoginOtpSent(true);
  };

  const handleVerifyLogin = async (e) => {
    e.preventDefault();
    const clean = loginMobile.replace(/\D/g, '');
    const existing = users.find((u) => u.mobile === clean && u.role === selectedRole);
    if (!existing) {
      setAuthMsg('Mobile number not registered, please register.');
      return;
    }
    const verified = await verifyFirebaseSmsOtp(loginOtp.trim());
    if (!verified) return;

    setCurrentUser(existing);
    setActiveTab('home');
  };

  const handleSendRegisterOtp = async () => {
    const clean = regMobile.replace(/\D/g, '');
    if (!regName.trim() || !regAddress.trim()) {
      setAuthMsg('Please fill Full Name / Store Name and Address first.');
      return;
    }
    if (!isValidIndianMobile(clean)) {
      setAuthMsg('Enter a valid 10-digit Indian mobile number (starts with 6–9).');
      return;
    }
    const already = users.find((u) => u.mobile === clean && u.role === selectedRole);
    if (already) {
      setAuthMsg('This mobile number is already registered for this role. Please Login.');
      return;
    }
    setRegOtpInput('');
    const ok = await triggerFirebaseSmsOtp(clean);
    if (ok) setRegOtpSent(true);
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    const verified = await verifyFirebaseSmsOtp(regOtpInput.trim());
    if (!verified) return;

    const clean = regMobile.replace(/\D/g, '');
    const needsApproval = selectedRole === 'farmer' || selectedRole === 'wholesale' || selectedRole === 'retail';
    const newUser = {
      id: 'u_' + Date.now(),
      role: selectedRole,
      name: regName.trim(),
      mobile: clean,
      address: regAddress.trim(),
      approved: !needsApproval,
      wallet: 0,
      referralsCount: 0,
      ordersCompleted: 0,
      referredBy: regReferralCode.trim() || null,
    };

    setUsers([newUser, ...users]);
    if (needsApproval) {
      setNotifications((prev) => [
        `New ${selectedRole.toUpperCase()} registration (${newUser.name} • ${clean}) awaiting Admin approval.`,
        ...prev,
      ]);
    }
    setRegOtpSent(false);
    setCurrentUser(newUser);
    setShowWelcomeSmile(true);
    setActiveTab('home');
    setTimeout(() => setShowWelcomeSmile(false), 3500);
  };

  const handleStrictLogout = () => {
    setCurrentUser(null);
    setSelectedRole(null);
    setLoginMobile('');
    setLoginOtpSent(false);
    setConfirmationResult(null);
    setAuthMsg('');
    setActiveTab('home');
  };

  // Reverse Geocoding + GPS Current Location
  const fetchAddressFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await res.json();
      if (data && data.display_name) {
        const parts = data.display_name.split(',').map((s) => s.trim());
        setMapPinTitle(parts.slice(0, 2).join(', ') || 'Current Pinned Location');
        setMapPinFullAddress(data.display_name);
        return;
      }
    } catch {
      // fallback
    }
    setMapPinTitle(`Pinned Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    setMapPinFullAddress(`Lat ${lat.toFixed(5)}, Lng ${lng.toFixed(5)}, Nellore, Andhra Pradesh`);
  };

const handleUseCurrentLocationMap = () => {
    setIsLocatingGps(true);
    setIsEditingPinText(false);
    setActiveTab('mapPin');
    if (!navigator.geolocation) {
      setIsLocatingGps(false);
      fetchAddressFromCoords(mapPinCoords.lat, mapPinCoords.lng);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lng = Number(pos.coords.longitude.toFixed(5));
        setMapPinCoords({ lat, lng });
        await fetchAddressFromCoords(lat, lng);
        setIsLocatingGps(false);
      },
      async () => {
        const lat = 14.4426;
        const lng = 79.9865;
        setMapPinCoords({ lat, lng });
        await fetchAddressFromCoords(lat, lng);
        setIsLocatingGps(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleAdjustPin = async (dLat, dLng) => {
    const lat = Number((mapPinCoords.lat + dLat).toFixed(5));
    const lng = Number((mapPinCoords.lng + dLng).toFixed(5));
    setMapPinCoords({ lat, lng });
    await fetchAddressFromCoords(lat, lng);
  };

  const handleConfirmSetLocation = () => {
    const newId = 'loc_' + Date.now();
    const newEntry = {
      id: newId,
      tag: mapPinTag,
      title: mapPinTitle,
      full: mapPinFullAddress,
      distance: '0 m',
      lat: mapPinCoords.lat,
      lng: mapPinCoords.lng,
    };
    setSavedAddresses((prev) => [newEntry, ...prev]);
    setActiveAddrId(newId);
    setCurrentUser((prev) => (prev ? { ...prev, address: mapPinTitle } : prev));
    setActiveTab('home');
    notify(`Selected Location - ${mapPinTitle}`);
  };

  const handleFarmerEnChange = (val) => {
    setFNameEn(val);
    const key = val.trim().toLowerCase();
    if (EN_TO_TE[key]) setFNameTe(EN_TO_TE[key]);
  };

  const handleFarmerTeChange = (val) => {
    setFNameTe(val);
    if (TE_TO_EN[val.trim()]) setFNameEn(TE_TO_EN[val.trim()]);
  };

  const fontStyle = { fontFamily: "'Plus Jakarta Sans', 'Noto Sans Telugu', sans-serif" };

  // =========================================================================
  // 1. ROLE ENTRY GATE
  // =========================================================================
  if (!selectedRole) {
    const roles = [
      { id: 'customer', title: 'Customer Store', te: 'వినియోగదారుడు', desc: 'Map pin location, tiered offers, wallet & live tracking', icon: ShoppingCart, accent: 'bg-emerald-50 text-[#15803D] border-emerald-200' },
      { id: 'farmer', title: 'Farmer Portal', te: 'రైతు విభాగం', desc: 'Auto Telugu/English listing, 40km shop alerts & stock sync', icon: Sprout, accent: 'bg-lime-50 text-lime-800 border-lime-200' },
      { id: 'wholesale', title: 'Wholesale Store', te: 'హోల్‌సేల్ వ్యాపారి', desc: 'Bulk orders, farm pickup vs delivery & GST PDF invoices', icon: Warehouse, accent: 'bg-amber-50 text-amber-800 border-amber-200' },
      { id: 'retail', title: 'Retail Shopkeeper', te: 'రిటైల్ షాపు', desc: 'Farmer vs wholesale pricing, min qty & digital PDF bills', icon: Store, accent: 'bg-orange-50 text-orange-800 border-orange-200' },
      { id: 'delivery', title: 'Delivery Partner', te: 'డెలివరీ పార్టనర్', desc: 'Weekly 100-order ₹1,500 bonus, live GPS & B2B OTP', icon: Truck, accent: 'bg-sky-50 text-sky-800 border-sky-200' },
      { id: 'admin', title: 'Master Admin', te: 'మాస్టర్ అడ్మిన్', desc: 'Scratch card limits, offer toggles, stock & shop approvals', icon: ShieldCheck, accent: 'bg-purple-50 text-purple-800 border-purple-200' },
    ];

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto text-slate-800 shadow-2xl pb-10">
        <div id="recaptcha-container"></div>
        <div className="bg-gradient-to-br from-[#0F5132] via-[#15803D] to-[#16A34A] text-white rounded-b-[36px] p-6 shadow-xl">
          <div className="flex items-center space-x-3.5">
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
                  setRegOtpSent(false);
                  setAuthMsg('');
                }}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-[#15803D] hover:shadow-md flex items-center justify-between text-left transition-all"
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
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

// =========================================================================
  // 2. REAL SMS INBOX OTP LOGIN / REGISTRATION SCREEN
  // =========================================================================
  if (!currentUser) {
    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto text-slate-800 shadow-2xl pb-10">
        <div id="recaptcha-container"></div>
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl">
            {toast}
          </div>
        )}

        <div className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white rounded-b-[32px] p-5 shadow-lg flex items-center space-x-3">
          <button onClick={() => setSelectedRole(null)} className="p-2.5 bg-white/15 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="h-12 w-12 rounded-full bg-white p-0.5 border border-[#EAB308] overflow-hidden">
            <img src="/icon-512.png" alt="Logo" className="h-full w-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="text-base font-extrabold uppercase">{selectedRole} Portal</h2>
            <p className="text-[11px] text-emerald-100">Direct Phone SMS OTP Authentication</p>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-2xl font-extrabold">
              <button
                type="button"
                onClick={() => { setAuthScreen('login'); setAuthMsg(''); }}
                className={`py-2.5 rounded-xl ${authScreen === 'login' ? 'bg-[#15803D] text-white' : 'text-slate-600'}`}
              >
                Existing Login
              </button>
              <button
                type="button"
                onClick={() => { setAuthScreen('register'); setAuthMsg(''); }}
                className={`py-2.5 rounded-xl ${authScreen === 'register' ? 'bg-[#15803D] text-white' : 'text-slate-600'}`}
              >
                New Registration
              </button>
            </div>

            {authScreen === 'login' ? (
              <form onSubmit={handleVerifyLogin} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Registered 10-Digit Mobile Number</label>
                  <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3 bg-slate-50">
                    <span className="font-extrabold text-slate-500 pr-2.5 border-r">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={loginMobile}
                      onChange={(e) => {
                        setLoginMobile(e.target.value.replace(/\D/g, ''));
                        setAuthMsg('');
                        setLoginOtpSent(false);
                      }}
                      placeholder="Enter your 10-digit mobile"
                      className="w-full bg-transparent pl-3 font-bold text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {authMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl font-bold flex items-center justify-between">
                    <span>{authMsg}</span>
                    {authMsg.includes('not registered') && (
                      <button
                        type="button"
                        onClick={() => {
                          setRegMobile(loginMobile);
                          setAuthScreen('register');
                          setAuthMsg('');
                        }}
                        className="bg-red-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-extrabold ml-2 flex-shrink-0"
                      >
                        Register Now
                      </button>
                    )}
                  </div>
                )}

                {!loginOtpSent ? (
                  <button
                    type="button"
                    disabled={sendingSms}
                    onClick={handleSendLoginOtp}
                    className="w-full bg-[#15803D] disabled:opacity-60 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                  >
                    {sendingSms ? 'Sending SMS OTP...' : 'Send SMS OTP to Phone'}
                  </button>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold text-slate-500">Enter 6-Digit SMS OTP</label>
                        <button type="button" onClick={handleSendLoginOtp} className="text-[11px] font-extrabold text-[#15803D] underline">
                          Resend SMS
                        </button>
                      </div>
                      <input
                        type="tel"
                        maxLength={6}
                        required
                        value={loginOtp}
                        onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="• • • • • •"
                        className="w-full bg-slate-50 border border-emerald-300 rounded-2xl py-3 text-center text-base font-extrabold tracking-[0.4em]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={verifyingSms}
                      className="w-full bg-[#15803D] disabled:opacity-60 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                    >
                      {verifyingSms ? 'Verifying...' : 'Verify SMS OTP & Login'}
                    </button>
                  </>
                )}
              </form>
            ) : (
              <form onSubmit={handleCompleteRegistration} className="space-y-3">
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Full Name / Store Name *"
                  className="w-full bg-slate-50 border rounded-2xl px-3.5 py-3 font-bold"
                />
                <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3 bg-slate-50">
                  <span className="font-extrabold text-slate-500 pr-2.5 border-r">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={regMobile}
                    onChange={(e) => {
                      setRegMobile(e.target.value.replace(/\D/g, ''));
                      setRegOtpSent(false);
                      setAuthMsg('');
                    }}
                    placeholder="Valid 10-Digit Mobile Number *"
                    className="w-full bg-transparent pl-3 font-bold text-sm focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  required
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="Complete Address in Nellore *"
                  className="w-full bg-slate-50 border rounded-2xl px-3.5 py-3 font-bold"
                />
                {selectedRole === 'customer' && (
                  <input
                    type="text"
                    value={regReferralCode}
                    onChange={(e) => setRegReferralCode(e.target.value.toUpperCase())}
                    placeholder="Referral Code (Optional • ₹50 Bonus)"
                    className="w-full bg-amber-50/70 border border-amber-200 rounded-2xl px-3.5 py-3 font-bold"
                  />
                )}

                {authMsg && <p className="text-red-600 font-bold">{authMsg}</p>}

                {!regOtpSent ? (
                  <button
                    type="button"
                    disabled={sendingSms}
                    onClick={handleSendRegisterOtp}
                    className="w-full bg-[#15803D] disabled:opacity-60 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                  >
                    {sendingSms ? 'Sending SMS OTP...' : 'Send SMS OTP to Verify Mobile'}
                  </button>
                ) : (
                  <>
                    <input
                      type="tel"
                      maxLength={6}
                      required
                      value={regOtpInput}
                      onChange={(e) => setRegOtpInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-Digit SMS OTP"
                      className="w-full bg-slate-50 border border-emerald-300 rounded-2xl py-3 text-center text-base font-extrabold tracking-[0.4em]"
                    />
                    <button
                      type="submit"
                      disabled={verifyingSms}
                      className="w-full bg-[#EA580C] disabled:opacity-60 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                    >
                      {verifyingSms ? 'Verifying...' : 'Verify SMS OTP & Register'}
                    </button>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

const WelcomeSmileModal = () =>
    showWelcomeSmile ? (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 text-center max-w-xs w-full space-y-3 shadow-2xl">
          <div className="h-16 w-16 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">Thanks for Register with Us!</h3>
          <p className="text-xs text-slate-500">Welcome to Rythu Basket Nellore, {currentUser.name}.</p>
        </div>
      </div>
    ) : null;

  const renderSharedProfileTab = () => (
    <div className="p-4 space-y-3.5 text-xs">
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center space-x-3.5">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#15803D] to-[#22C55E] text-white font-extrabold text-xl flex items-center justify-center shadow">
          {currentUser.name.charAt(0)}
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded-md">
            {currentUser.role}
          </span>
          <h2 className="text-base font-extrabold text-slate-900 mt-0.5">{currentUser.name}</h2>
          <p className="text-slate-500 font-semibold">+91 {currentUser.mobile} • {currentUser.address}</p>
        </div>
      </div>

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
          <p className="text-[11px] text-slate-500">
            Earn <strong>₹50</strong> wallet cashback when your friend installs & completes their 1st order of <strong>₹200+</strong> (valid for first 10 referrals).
          </p>
          <div className="flex space-x-2">
            <input readOnly value={`https://rythu-market.vercel.app/?ref=${currentUser.mobile}`} className="flex-1 bg-slate-50 border rounded-xl px-3 py-2 text-[10px] font-bold" />
            <button onClick={() => notify('Referral link copied!')} className="bg-[#EA580C] text-white font-extrabold px-3.5 py-2 rounded-xl">
              Share
            </button>
          </div>
        </div>
      )}

      <a href="tel:8328261103" className="w-full bg-white border border-slate-200 text-slate-800 font-extrabold py-3.5 rounded-2xl flex items-center justify-center space-x-2 shadow-sm">
        <Phone className="h-4 w-4 text-[#15803D]" />
        <span>Contact Support (8328261103)</span>
      </a>

      <button onClick={handleStrictLogout} className="w-full bg-rose-600 text-white font-extrabold py-3.5 rounded-2xl shadow-md flex items-center justify-center space-x-2">
        <LogOut className="h-4 w-4" />
        <span>Logout (Switch Role)</span>
      </button>
    </div>
  );

// =========================================================================
  // 3. CUSTOMER STOREFRONT (FIXED LOCATION PICKER + ANDROID UPI INTENT LAUNCH)
  // =========================================================================
  if (currentUser.role === 'customer') {
    const activeAddr = savedAddresses.find((a) => a.id === activeAddrId) || savedAddresses[0];

    if (activeTab === 'selectLocation') {
      const filteredAddrs = savedAddresses.filter(
        (a) =>
          a.title.toLowerCase().includes(locSearch.toLowerCase()) ||
          a.full.toLowerCase().includes(locSearch.toLowerCase())
      );

      return (
        <div style={fontStyle} className="min-h-screen bg-[#0F5132] max-w-md mx-auto text-slate-800 shadow-2xl flex flex-col">
          <div className="px-4 py-4 text-white flex items-center space-x-3">
            <button type="button" onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white/15">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-extrabold tracking-wide uppercase">SELECT DELIVERY LOCATION</h1>
          </div>

          <div className="flex-1 bg-white rounded-t-[30px] p-4 space-y-4">
            <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3 bg-slate-50">
              <Search className="h-4 w-4 text-slate-400 mr-2.5" />
              <input
                type="text"
                value={locSearch}
                onChange={(e) => setLocSearch(e.target.value)}
                placeholder="Search for location in Nellore..."
                className="w-full bg-transparent text-xs font-semibold focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleUseCurrentLocationMap}
              className="w-full border-2 border-[#15803D] bg-emerald-50 rounded-2xl py-3.5 px-4 flex items-center justify-center space-x-2 text-[#15803D] font-extrabold text-xs shadow-sm active:scale-[0.99]"
            >
              <LocateFixed className="h-4 w-4" />
              <span>Use current location (Open GPS Map)</span>
            </button>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-extrabold text-slate-500">Saved addresses</span>
              <button
                type="button"
                onClick={handleUseCurrentLocationMap}
                className="text-xs font-extrabold text-[#15803D] flex items-center space-x-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>ADD NEW ADDRESS</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {filteredAddrs.map((addr) => (
                <button
                  key={addr.id}
                  type="button"
                  onClick={() => {
                    setActiveAddrId(addr.id);
                    setCurrentUser((prev) => ({ ...prev, address: addr.title }));
                    setActiveTab('home');
                    notify(`Selected Location - ${addr.title}`);
                  }}
                  className={`w-full text-left rounded-2xl p-3.5 border flex items-start space-x-3 transition ${
                    activeAddrId === addr.id ? 'border-[#15803D] bg-emerald-50/40' : 'border-slate-100 bg-white shadow-sm'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                    <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#15803D] flex items-center justify-center">
                      {addr.tag === 'Office' ? <Briefcase className="h-4 w-4" /> : <Home className="h-4 w-4" />}
                    </div>
                    <span className="text-[10px] font-extrabold text-[#15803D]">{addr.distance}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold text-slate-900">{addr.tag}</h3>
                      {activeAddrId === addr.id && <Check className="h-4 w-4 text-[#15803D]" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{addr.full}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'mapPin') {
      return (
        <div style={fontStyle} className="min-h-screen bg-[#0F5132] max-w-md mx-auto text-slate-800 shadow-2xl flex flex-col">
          <div className="px-4 py-4 text-white flex items-center space-x-3">
            <button type="button" onClick={() => setActiveTab('selectLocation')} className="p-2 rounded-full bg-white/15">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-extrabold tracking-wide uppercase">PIN DELIVERY LOCATION</h1>
          </div>

          <div className="flex-1 bg-white rounded-t-[30px] overflow-hidden flex flex-col justify-between relative">
            <div className="relative flex-1 min-h-[340px] bg-slate-100">
              <div className="absolute top-3 left-3 right-3 z-20 bg-white rounded-2xl px-3.5 py-2.5 shadow-md flex items-center border border-slate-100">
                <Search className="h-4 w-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  value={mapPinTitle}
                  onChange={(e) => setMapPinTitle(e.target.value)}
                  placeholder="Enter area / street name"
                  className="w-full text-xs font-bold focus:outline-none"
                />
              </div>

              <iframe
                title="Adjust Pin Map"
                width="100%"
                height="100%"
                frameBorder="0"
                className="w-full h-full min-h-[340px]"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapPinCoords.lng - 0.008}%2C${mapPinCoords.lat - 0.008}%2C${mapPinCoords.lng + 0.008}%2C${mapPinCoords.lat + 0.008}&layer=mapnik&marker=${mapPinCoords.lat}%2C${mapPinCoords.lng}`}
              />

              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10 pb-8">
                <div className="bg-slate-900 text-white px-3.5 py-2 rounded-xl shadow-lg text-center mb-1.5">
                  <p className="text-[11px] font-extrabold leading-tight">Your order will be delivered here</p>
                  <p className="text-[9px] text-slate-300">Use N/S/E/W buttons to fine-tune pin</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#15803D]/25 flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full bg-[#15803D] border-2 border-white shadow-md" />
                </div>
              </div>

              <div className="absolute right-3 top-20 z-20 flex flex-col space-y-1 bg-white/95 p-1.5 rounded-xl shadow border text-[10px] font-extrabold">
                <button type="button" onClick={() => handleAdjustPin(0.0015, 0)} className="px-2 py-1 bg-slate-100 rounded">↑ N</button>
                <button type="button" onClick={() => handleAdjustPin(-0.0015, 0)} className="px-2 py-1 bg-slate-100 rounded">↓ S</button>
                <button type="button" onClick={() => handleAdjustPin(0, 0.0015)} className="px-2 py-1 bg-slate-100 rounded">→ E</button>
                <button type="button" onClick={() => handleAdjustPin(0, -0.0015)} className="px-2 py-1 bg-slate-100 rounded">← W</button>
              </div>

              <div className="absolute bottom-3 left-0 right-0 flex justify-center z-20">
                <button
                  type="button"
                  onClick={handleUseCurrentLocationMap}
                  className="bg-white text-[#15803D] border border-slate-200 text-xs font-extrabold px-4 py-2 rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <LocateFixed className="h-4 w-4" />
                  <span>{isLocatingGps ? 'Detecting GPS...' : 'Go to current location'}</span>
                </button>
              </div>
            </div>

            <div className="bg-white p-4 border-t shadow-lg space-y-3 z-20">
              <div className="flex items-start justify-between space-x-2">
                <div className="flex items-start space-x-2 flex-1">
                  <MapPin className="h-5 w-5 text-slate-900 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    {isEditingPinText ? (
                      <div className="space-y-1.5">
                        <input type="text" value={mapPinTitle} onChange={(e) => setMapPinTitle(e.target.value)} className="w-full border rounded-lg px-2.5 py-1 text-xs font-extrabold" />
                        <input type="text" value={mapPinFullAddress} onChange={(e) => setMapPinFullAddress(e.target.value)} className="w-full border rounded-lg px-2.5 py-1 text-[11px]" />
                      </div>
                    ) : (
                      <>
                        <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                          {isLocatingGps ? 'Fetching current address...' : mapPinTitle}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{mapPinFullAddress}</p>
                      </>
                    )}
                  </div>
                </div>
                <button type="button" onClick={() => setIsEditingPinText(!isEditingPinText)} className="border border-slate-200 text-[#15803D] text-xs font-extrabold px-3 py-1 rounded-lg">
                  {isEditingPinText ? 'Done' : 'Change'}
                </button>
              </div>

              <div className="flex items-center space-x-2 text-[11px]">
                <span className="font-bold text-slate-400">Save as:</span>
                {['Home', 'Office', 'Others'].map((t) => (
                  <button key={t} type="button" onClick={() => setMapPinTag(t)} className={`px-3 py-1 rounded-full font-extrabold border ${mapPinTag === t ? 'bg-emerald-50 border-[#15803D] text-[#15803D]' : 'bg-slate-50 text-slate-600'}`}>
                    {t}
                  </button>
                ))}
              </div>

              <button type="button" onClick={handleConfirmSetLocation} className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md">
                Set Location
              </button>
            </div>
          </div>
        </div>
      );
    }

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

    const paymentAppLaunchUrl = buildPaymentLaunchUrl(payMode, merchantUpiId, payableTotal);
    const genericUpiQr = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
      `upi://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodeURIComponent('Rythu Basket Nellore')}&am=${payableTotal}&cu=INR`
    )}`;

    const finalizeCustomerOrder = () => {
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
        buyerAddress: activeAddr.full,
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
      setUtrRefInput('');
      setActiveTab('orders');
      notify(`Order ${newOrd.id} Placed! ₹${estimatedCashback} Cashback credits on delivery.`);
    };

    const handlePayAndPlaceOrderTrigger = () => {
      setCardError('');
      if (payMode === 'card') {
        const digits = cardNo.replace(/\s+/g, '');
        if (digits.length < 12 || !cardExp.trim() || cardCvv.length < 3) {
          setCardError('Please enter valid 16-digit Card Number, Expiry (MM/YY) & CVV.');
          return;
        }
        finalizeCustomerOrder();
        return;
      }
      if (payMode === 'cod') {
        finalizeCustomerOrder();
        return;
      }

      // Launch PhonePe / GPay / Paytm / CRED via Android Intent URL first, then show confirmation screen
      window.location.assign(paymentAppLaunchUrl);
      setTimeout(() => {
        setActiveTab('upiProcessing');
      }, 300);
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

        {/* TOP HEADER WITH HIGH-PRIORITY CLICKABLE LOCATION SELECTOR */}
        <header className="bg-gradient-to-b from-[#0F5132] to-[#15803D] text-white sticky top-0 z-40 px-4 pt-3.5 pb-4 rounded-b-[28px] shadow-lg space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                setLocSearch('');
                setActiveTab('selectLocation');
              }}
              className="flex items-center space-x-2.5 flex-1 min-w-0 text-left bg-white/10 hover:bg-white/15 active:scale-[0.99] px-2.5 py-1.5 rounded-2xl transition cursor-pointer"
            >
              <div className="h-9 w-9 rounded-full bg-white p-0.5 border border-[#EAB308] overflow-hidden shadow flex-shrink-0">
                <img src="/icon-512.png" alt="Logo" className="h-full w-full object-cover rounded-full" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1 text-[10px] font-bold text-[#FDE047]">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span>SELECTED LOCATION</span>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="text-xs font-extrabold truncate">{activeAddr.title}</p>
                  <ChevronDown className="h-3.5 w-3.5 text-emerald-200 flex-shrink-0" />
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className="bg-white/15 backdrop-blur-md border border-white/20 text-white px-3 py-2 rounded-full text-xs font-extrabold flex items-center space-x-1.5 shadow-sm flex-shrink-0"
            >
              <Wallet className="h-3.5 w-3.5 text-[#FDE047]" />
              <span>₹{currentUser.wallet || 0}</span>
            </button>
          </div>

          <div className="bg-white/95 text-slate-800 rounded-2xl px-3.5 py-2.5 flex items-center shadow-sm">
            <Search className="h-4 w-4 text-slate-400 mr-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); if (activeTab !== 'home') setActiveTab('home'); }}
              placeholder="Search 'Nellore Sona Masuri' or 'Tomato'..."
              className="w-full bg-transparent text-xs font-semibold focus:outline-none"
            />
          </div>

          {offersEnabled && (
            <div className="bg-black/20 rounded-xl px-3 py-1.5 text-[10px] font-bold text-[#FDE047] flex items-center justify-between">
              <span>FREE Delivery above ₹99 • 1st 2 Orders 50% OFF</span>
              <span className="bg-[#EA580C] text-white px-1.5 py-0.5 rounded text-[9px] font-extrabold">RYTHU30</span>
            </div>
          )}
        </header>

        {activeTab === 'home' && (
          <main className="px-4 pt-4 space-y-4 text-xs">
            <div className="flex space-x-3 overflow-x-auto pb-1">
              {CATEGORIES.map((c) => {
                const active = selectedCat === c.id;
                return (
                  <button key={c.id} onClick={() => setSelectedCat(c.id)} className="flex-shrink-0 flex flex-col items-center space-y-1.5">
                    <div className={`h-14 w-14 rounded-full p-0.5 border-2 transition ${active ? 'border-[#15803D] scale-105 shadow-md' : 'border-slate-200'}`}>
                      <img src={c.img} alt={c.labelEn} className="h-full w-full object-cover rounded-full" />
                    </div>
                    <span className={`text-[10px] font-extrabold ${active ? 'text-[#15803D]' : 'text-slate-600'}`}>{c.labelEn}</span>
                  </button>
                );
              })}
            </div>

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
                          className="bg-[#EA580C] text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-xl shadow-sm"
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

        {activeTab === 'cart' && (
          <main className="p-4 space-y-3.5 text-xs">
            <h2 className="text-base font-extrabold text-slate-900">Checkout & Payment</h2>

            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400">Delivering to ({activeAddr.tag})</p>
                <p className="font-extrabold text-slate-900 truncate max-w-[215px]">{activeAddr.full}</p>
              </div>
              <button type="button" onClick={() => setActiveTab('selectLocation')} className="text-[#15803D] font-extrabold underline">
                Change
              </button>
            </div>

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

                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2.5">
                  <div className="flex space-x-2">
                    <input type="text" value={promoInput} onChange={(e) => setPromoInput(e.target.value.toUpperCase())} placeholder="Promo Code: RYTHU30" className="flex-1 bg-slate-50 border rounded-xl px-3 py-2 font-extrabold" />
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

                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2">
                  <h3 className="font-extrabold text-slate-900">Select Payment Mode</h3>
                  {[
                    { id: 'phonepe', label: 'PhonePe UPI' },
                    { id: 'gpay', label: 'Google Pay (GPay)' },
                    { id: 'paytm', label: `Paytm (₹${Math.max(5, Math.round(payableTotal * 0.05))} Cashback)` },
                    { id: 'cred', label: `CRED UPI (₹${Math.max(10, Math.round(payableTotal * 0.08))} Cashback)` },
                    { id: 'card', label: `Credit / Debit Card (₹${Math.max(5, Math.round(payableTotal * 0.05))} Cashback)` },
                    { id: 'cod', label: 'Cash on Delivery (COD)' },
                  ].map((pm) => (
                    <div key={pm.id} className={`rounded-xl border-2 p-2.5 transition ${payMode === pm.id ? 'border-[#15803D] bg-emerald-50/40' : 'border-slate-100'}`}>
                      <label onClick={() => setPayMode(pm.id)} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center space-x-2.5">
                          <PaymentBadge type={pm.id} />
                          <span className="font-extrabold text-slate-800">{pm.label}</span>
                        </div>
                        <input type="radio" checked={payMode === pm.id} onChange={() => setPayMode(pm.id)} className="accent-[#15803D]" />
                      </label>

                      {payMode === pm.id && (pm.id === 'phonepe' || pm.id === 'gpay' || pm.id === 'paytm' || pm.id === 'cred') && (
                        <div className="mt-2.5 pt-2 border-t border-emerald-200/70">
                          <a
                            href={buildPaymentLaunchUrl(pm.id, merchantUpiId, payableTotal)}
                            onClick={() => setTimeout(() => setActiveTab('upiProcessing'), 400)}
                            className="block w-full bg-[#15803D] text-white text-center font-extrabold py-2.5 rounded-xl shadow-sm"
                          >
                            Launch {pm.label.split(' (')[0]} & Pay ₹{payableTotal} ↗
                          </a>
                        </div>
                      )}
                    </div>
                  ))}

                  {payMode === 'card' && (
                    <div className="pt-2 space-y-2">
                      <input type="text" maxLength={19} value={cardNo} onChange={(e) => setCardNo(e.target.value)} placeholder="16-Digit Card Number" className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" maxLength={5} value={cardExp} onChange={(e) => setCardExp(e.target.value)} placeholder="MM/YY" className="bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                        <input type="password" maxLength={4} value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="CVV" className="bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                      </div>
                    </div>
                  )}

                  {cardError && <p className="text-rose-600 font-bold">{cardError}</p>}
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-1.5">
                  <div className="flex justify-between"><span>Item Subtotal</span><span className="font-bold">₹{subtotal}</span></div>
                  {autoTierDiscount > 0 && <div className="flex justify-between text-[#15803D] font-extrabold"><span>{autoTierLabel}</span><span>-₹{autoTierDiscount}</span></div>}
                  {promoDeduction > 0 && <div className="flex justify-between text-[#15803D] font-extrabold"><span>Promo RYTHU30</span><span>-₹{promoDeduction}</span></div>}
                  {walletDeduction > 0 && <div className="flex justify-between text-amber-700 font-extrabold"><span>Wallet Used</span><span>-₹{walletDeduction}</span></div>}
                  <div className="flex justify-between"><span>Delivery Fee (Free ₹99+)</span><span className="font-bold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                  <div className="border-t pt-2 flex justify-between text-sm font-extrabold text-slate-900"><span>Grand Total</span><span>₹{payableTotal}</span></div>
                  <p className="text-[10px] font-extrabold text-[#EA580C]">₹{estimatedCashback} Cashback + Scratch Card unlocks on delivery!</p>

                  {payMode === 'card' || payMode === 'cod' ? (
                    <button type="button" onClick={handlePayAndPlaceOrderTrigger} className="w-full mt-2 bg-[#EA580C] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm">
                      Pay & Place Order • ₹{payableTotal}
                    </button>
                  ) : (
                    <a
                      href={paymentAppLaunchUrl}
                      onClick={() => setTimeout(() => setActiveTab('upiProcessing'), 400)}
                      className="block w-full mt-2 bg-[#EA580C] text-white text-center font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                    >
                      Pay & Place Order • ₹{payableTotal}
                    </a>
                  )}
                </div>
              </>
            )}
          </main>
        )}

        {activeTab === 'upiProcessing' && (
          <main className="p-4 space-y-4 text-xs">
            <div className="bg-white rounded-3xl p-5 shadow-md border border-emerald-200 text-center space-y-3">
              <div className="flex justify-center">
                <PaymentBadge type={payMode} />
              </div>
              <h2 className="text-base font-extrabold text-slate-900">Complete Payment of ₹{payableTotal}</h2>
              <p className="text-slate-500">
                Opening <strong>{payMode.toUpperCase()}</strong> on your phone... If it didn't open automatically, tap below or scan QR:
              </p>

              <a
                href={paymentAppLaunchUrl}
                className="block w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow"
              >
                Open {payMode.toUpperCase()} App Now ↗
              </a>

              <img src={genericUpiQr} alt="UPI QR" className="w-32 h-32 mx-auto rounded-xl border p-1 bg-white" />

              <input
                type="text"
                value={utrRefInput}
                onChange={(e) => setUtrRefInput(e.target.value)}
                placeholder="Enter 12-Digit UPI UTR / Ref ID (Optional)"
                className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-center font-bold"
              />

              <button
                type="button"
                onClick={finalizeCustomerOrder}
                className="w-full bg-[#EA580C] text-white font-extrabold py-3.5 rounded-2xl shadow-lg text-sm"
              >
                Payment Completed — Confirm Order ➔
              </button>
            </div>
          </main>
        )}

{activeTab === 'orders' && (
          <main className="p-4 space-y-3.5 text-xs">
            <h2 className="text-base font-extrabold text-slate-900">My Orders & Live Tracking</h2>

            {orders.filter((o) => o.buyerRole === 'customer').length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center font-bold text-slate-400">No orders placed yet.</div>
            ) : (
              orders
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
                })
            )}
          </main>
        )}

        {activeTab === 'profile' && renderSharedProfileTab()}

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
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-slate-400 font-bold">No orders yet.</div>
            ) : (
              orders.map((ord) => (
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
              ))
            )}
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
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-slate-400 font-bold">No B2B orders yet.</div>
            ) : (
              orders.map((ord) => (
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
              ))
            )}
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
    const weeklyCompleted = currentUser.weeklyOrders || 0;

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
                <div className="flex justify-between"><span>Base Delivery Fees</span><span className="font-extrabold">₹{currentUser.wallet}</span></div>
                <div className="flex justify-between"><span>Weekly 100-Order Target</span><span className="font-extrabold text-[#15803D]">₹1,500 Bonus</span></div>
              </div>
            ) : (delivFilter === 'available' ? availOrders : delivOrders).length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-slate-400 font-bold">No orders in this list.</div>
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
                              const entered = window.prompt(`Enter ${ord.buyerRole.toUpperCase()} Delivery OTP (${ord.b2bOtp}):`);
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