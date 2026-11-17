import React, { useState, useEffect } from 'react';
import {
  Search, ShoppingCart, Plus, Home, ClipboardList, User, MapPin,
  Phone, MessageSquare, Sprout, Store, Truck, ShieldCheck, ChevronRight,
  ArrowLeft, CheckCircle2, Wallet, Gift, Sparkles, Bell, Globe,
  LocateFixed, LogOut, Printer, Warehouse, Heart, Clock, ChevronDown,
  Briefcase, Leaf, Shield, Zap, Grid, Star, Trash2, Check, Mail,
  TrendingUp, Package, HelpCircle, Navigation
} from 'lucide-react';
import { db } from './firebase';
import { collection, doc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';

// EmailJS Credentials for Direct Free 6-Digit Email OTP & Automatic Delivery Invoice
const EMAILJS_SERVICE_ID = 'service_auf6gch';
const EMAILJS_TEMPLATE_ID = 'template_z42k41l';
const EMAILJS_INVOICE_TEMPLATE_ID = 'template_fhx6p4e';
const EMAILJS_PUBLIC_KEY = 'Y1UQmUcSoEzEtFR1m';

// Guaranteed Indian Farmer Photo
const FARMER_HERO_IMG = 'https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=400';

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

const TOP_CATEGORIES = [
  { id: 'Vegetables', labelEn: 'Vegetables', labelTe: 'కూరగాయలు', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=160&q=80' },
  { id: 'Fruits', labelEn: 'Fruits', labelTe: 'పండ్లు', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=160&q=80' },
  { id: 'Staples', labelEn: 'Groceries', labelTe: 'కిరాణా', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=160&q=80' },
  { id: 'Leafy Greens', labelEn: 'Farm Fresh', labelTe: 'ఆకుకూరలు', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=160&q=80' },
];

const POPULAR_CIRCLES = [
  { id: 'p1', name: 'Tomatoes', nameTe: 'టమాటా', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=160&q=80' },
  { id: 'p2', name: 'Onions', nameTe: 'ఉల్లి', img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=160&q=80' },
  { id: 'p5', name: 'Sona Rice', nameTe: 'బియ్యం', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=160&q=80' },
  { id: 'p4', name: 'Green Leafy', nameTe: 'ఆకుకూరలు', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=160&q=80' },
];

const AVAILABILITY_SLOTS = [
  'Available Now',
  'After 1 Hour',
  'After 3 Hours',
  'Today Evening 6:00 PM',
  'Tomorrow Morning 6:00 AM',
  'Tomorrow Morning 9:00 AM',
];

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    farmerId: 'u_farm_1',
    farmerName: 'Ramaiah Farm • Kovur',
    distanceKm: 12,
    nameEn: 'Fresh Tomato (Grade A)',
    nameTe: 'టమాటా',
    cat: 'Vegetables',
    unit: 'Kg',
    packLabel: '1 Kg',
    mrp: 48,
    retailPrice: 36,
    farmerDirectPrice: 24,
    wholesalePrice: 28,
    minWholesaleQty: 25,
    stockKg: 500,
    inStock: true,
    rating: 4.5,
    reviews: 128,
    desc: 'Fresh and juicy country tomatoes harvested this morning from Kovur farms, Nellore.',
    availableFrom: 'Available Now',
    img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'p2',
    farmerId: 'u_farm_1',
    farmerName: 'Subba Rao Farm • Buchi',
    distanceKm: 18,
    nameEn: 'Red Onion (Grade A)',
    nameTe: 'ఉల్లిపాయలు',
    cat: 'Vegetables',
    unit: 'Kg',
    packLabel: '1 Kg',
    mrp: 44,
    retailPrice: 34,
    farmerDirectPrice: 22,
    wholesalePrice: 26,
    minWholesaleQty: 50,
    stockKg: 800,
    inStock: true,
    rating: 4.6,
    reviews: 94,
    desc: 'Farm-cured crisp red onions sourced directly from Buchireddypalem growers.',
    availableFrom: 'Tomorrow Morning 6:00 AM',
    img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'p3',
    farmerId: 'u_farm_1',
    farmerName: 'Rapur Orchards • Nellore',
    distanceKm: 32,
    nameEn: 'Banganapalli Mango',
    nameTe: 'మామిడిపండు',
    cat: 'Fruits',
    unit: 'Kg',
    packLabel: '1 Kg',
    mrp: 140,
    retailPrice: 110,
    farmerDirectPrice: 85,
    wholesalePrice: 95,
    minWholesaleQty: 20,
    stockKg: 300,
    inStock: true,
    rating: 4.8,
    reviews: 210,
    desc: 'Naturally ripened carbide-free Banganapalli mangoes from Rapur orchards.',
    availableFrom: 'Available Now',
    img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80',
  },
  {
id: 'p4',
    farmerId: 'u_farm_1',
    farmerName: 'Padma Organic • Nellore',
    distanceKm: 6,
    nameEn: 'Fresh Spinach (Palakura)',
    nameTe: 'పాలకూర',
    cat: 'Leafy Greens',
    unit: 'Grams',
    packLabel: '500 Grams',
    mrp: 28,
    retailPrice: 20,
    farmerDirectPrice: 14,
    wholesalePrice: 16,
    minWholesaleQty: 15,
    stockKg: 150,
    inStock: true,
    rating: 4.7,
    reviews: 76,
    desc: 'Pesticide-free tender green spinach bundles harvested at dawn.',
    availableFrom: 'After 1 Hour',
    img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'p5',
    farmerId: 'u_farm_1',
    farmerName: 'Nellore Heritage Mills',
    distanceKm: 8,
    nameEn: 'Nellore Sona Masuri Rice',
    nameTe: 'సోనా మసూరి బియ్యం',
    cat: 'Staples',
    unit: 'Kg',
    packLabel: '5 Kg',
    mrp: 340,
    retailPrice: 285,
    farmerDirectPrice: 250,
    wholesalePrice: 265,
    minWholesaleQty: 10,
    stockKg: 1200,
    inStock: true,
    rating: 4.9,
    reviews: 315,
    desc: 'Authentic aged Nellore Sona Masuri steam rice direct from local rice mills.',
    availableFrom: 'Available Now',
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
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
const isValidEmail = (em) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim());

const buildPaymentLaunchUrl = (mode, upiId, amount) => {
  const pa = encodeURIComponent(upiId);
  const pn = encodeURIComponent('Rythu Basket Nellore');
  const am = Number(amount || 1).toFixed(2);
  const query = `pa=${pa}&pn=${pn}&am=${am}&cu=INR`;

  if (mode === 'phonepe') return `phonepe://pay?${query}`;
  if (mode === 'gpay') return `tez://upi/pay?${query}`;
  if (mode === 'paytm') return `paytmmp://pay?${query}`;
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

  const [sharedInvoiceData, setSharedInvoiceData] = useState(null);

  // 1. Open Direct Tax Invoice PDF View when clicked from Customer Email
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('invoiceData');
    if (raw) {
      try {
        const parsed = JSON.parse(decodeURIComponent(raw));
        setSharedInvoiceData(parsed);
        setTimeout(() => window.print(), 800);
      } catch {
        // ignore invalid link
      }
    }
  }, []);

const [lang, setLang] = useState('te');
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
      // ignore
    }
  }, [users]);

  // Direct Email 6-Digit OTP States
  const [authScreen, setAuthScreen] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginOtpSent, setLoginOtpSent] = useState(false);
  const [loginOtp, setLoginOtp] = useState('');
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState('');
  const [emailOtpExpiry, setEmailOtpExpiry] = useState(0);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [authMsg, setAuthMsg] = useState('');

  // Registration Form States
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regReferralCode, setRegReferralCode] = useState('');
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtpInput, setRegOtpInput] = useState('');
  const [showWelcomeSmile, setShowWelcomeSmile] = useState(false);

  // Navigation & Customer Screens
  const [activeTab, setActiveTab] = useState('home');
  const [detailProduct, setDetailProduct] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [deliverySlot, setDeliverySlot] = useState('Today, 6:00 PM – 8:00 PM');
  const [orderListFilter, setOrderListFilter] = useState('All');

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
      full: 'Vedayapalem, Nellore, Andhra Pradesh - 524004',
      distance: '57 m',
      lat: 14.4285,
      lng: 79.9692,
    },
    {
      id: 'addr2',
      tag: 'Office',
      title: 'Magunta Layout, Nellore',
      full: 'Magunta Layout Main Road, Dargamitta, Nellore - 524003',
      distance: '2.5 kms',
      lat: 14.4426,
      lng: 79.9865,
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

  // Cart & Payments — ALL PAYMENTS GO TO madhavam.com@ybl
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
  const [merchantUpiId] = useState('madhavam.com@ybl');

  // B2B States
  const [b2bSource, setB2bSource] = useState('farmer');
  const [b2bDeliveryMode, setB2bDeliveryMode] = useState('pickup');

  // Scratch Card & Notifications
  const [scratchCard, setScratchCard] = useState(null);
  const [notifications, setNotifications] = useState([
    'Wallet Alert: Cashback expires in 15 days (48h–6h reminder active).',
  ]);
  const [orders, setOrders] = useState([]);

// 2. Real-Time Cross-Device Sync for Orders (Customer Phone <-> Friend Delivery Phone)
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'orders'),
      (snapshot) => {
        const liveOrders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        liveOrders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setOrders(liveOrders);
        setTrackingOrder((prev) => (prev ? liveOrders.find((o) => o.id === prev.id) || prev : null));
      },
      () => {
        // fallback if offline
      }
    );
    return () => unsub();
  }, []);

  // 3. Continuous Live GPS Broadcast while Friend is Delivering an Active Order
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'delivery' || !navigator.geolocation) return;
    const activeAssigned = orders.filter(
      (o) => o.driverMobile === currentUser.mobile && o.status === 'Partner Assigned'
    );
    if (activeAssigned.length === 0) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lng = Number(pos.coords.longitude.toFixed(5));
        activeAssigned.forEach((ord) => {
          updateDoc(doc(db, 'orders', ord.id), {
            driverLat: lat,
            driverLng: lng,
            driverCoords: `${lat}, ${lng}`,
          }).catch(() => {});
        });
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [currentUser, orders]);

  // Farmer Form States
  const [fNameEn, setFNameEn] = useState('');
  const [fNameTe, setFNameTe] = useState('');
  const [fQty, setFQty] = useState('100');
  const [fUnit, setFUnit] = useState('Kg');
  const [fPrice, setFPrice] = useState('22');
  const [fAvailTime, setFAvailTime] = useState('Available Now');

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

  // SEND REAL 6-DIGIT OTP TO USER EMAIL INBOX VIA EMAILJS
  const triggerEmailOtp = async (targetEmail, userName) => {
    setSendingEmail(true);
    setAuthMsg('');
    const code = String(Math.floor(100000 + Math.random() * 900000));
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: targetEmail.trim(),
            to_name: userName || 'Rythu Basket Member',
            otp_code: code,
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to send email');
      }

      setGeneratedEmailOtp(code);
      setEmailOtpExpiry(Date.now() + 5 * 60 * 1000);
      notify(`6-Digit OTP sent to ${targetEmail}! Check your Inbox/Spam.`);
      return true;
    } catch (err) {
      setAuthMsg(`Email OTP Error: ${err.message}`);
      return false;
    } finally {
      setSendingEmail(false);
    }
  };

 // AUTOMATIC EMAIL INVOICE DISPATCH UPON ORDER DELIVERY
  const sendAutomaticInvoiceEmail = async (ord) => {
    const recipientEmail = ord.buyerEmail || currentUser?.email;
    if (!recipientEmail) return;

    const invoiceDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const rowsHtml = ord.items
      .map(
        (i, idx) => `
        <tr>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:center;">${idx + 1}</td>
          <td style="border:1px solid #cbd5e1;padding:6px;">${i.name}</td>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:center;">${i.qty}</td>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:center;">${i.unit || 'Kg'}</td>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:right;">${Number(i.price).toFixed(2)}</td>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:right;">${(i.price * i.qty).toFixed(2)}</td>
        </tr>`
      )
      .join('');

    const invoiceHtml = `
      <div style="border:1px solid #cbd5e1;padding:16px;border-radius:10px;background:#ffffff;font-family:Arial,sans-serif;font-size:12px;color:#1e293b;">
        <div style="text-align:center;margin-bottom:12px;">
          <img src="https://rythu-market.vercel.app/icon-512.png" width="56" height="56" style="border-radius:50%;border:2px solid #EAB308;" />
          <h3 style="margin:6px 0 0;color:#15803D;">రైతు బాస్కెట్ • Rythu Basket</h3>
        </div>
        <div style="background:#ecfdf5;border:1px solid #15803D;padding:10px;display:flex;justify-content:space-between;margin-bottom:12px;">
          <strong style="color:#0f5132;font-size:14px;">TAX INVOICE / SALES INVOICE</strong>
          <span><strong>INVOICE NO:</strong> ${ord.id} | <strong>DATE:</strong> ${invoiceDate}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
          <tr>
            <td style="border:1px solid #cbd5e1;padding:8px;vertical-align:top;width:33%;">
              <strong>FROM / SELLER</strong><br/>Rythu Basket Nellore<br/>Phone: 8328261103
            </td>
            <td style="border:1px solid #cbd5e1;padding:8px;vertical-align:top;width:33%;">
              <strong>BILL TO</strong><br/>${ord.buyerName}<br/>Phone: ${ord.buyerMobile}
            </td>
            <td style="border:1px solid #cbd5e1;padding:8px;vertical-align:top;width:34%;">
              <strong>DELIVER TO</strong><br/>${ord.buyerName}<br/>${ord.buyerAddress}
            </td>
          </tr>
        </table>
        <table style="width:100%;border-collapse:collapse;margin-bottom:12px;">
          <thead>
            <tr style="background:#15803D;color:#ffffff;">
              <th style="border:1px solid #15803D;padding:6px;">#</th>
              <th style="border:1px solid #15803D;padding:6px;text-align:left;">Product / Description</th>
              <th style="border:1px solid #15803D;padding:6px;">Qty</th>
              <th style="border:1px solid #15803D;padding:6px;">Unit</th>
              <th style="border:1px solid #15803D;padding:6px;text-align:right;">Rate (₹)</th>
              <th style="border:1px solid #15803D;padding:6px;text-align:right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
            <tr style="background:#ecfdf5;font-weight:bold;">
              <td colspan="5" style="border:1px solid #cbd5e1;padding:6px;text-align:right;">Grand Total</td>
              <td style="border:1px solid #cbd5e1;padding:6px;text-align:right;">₹${Number(ord.total).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <p style="margin:4px 0;"><strong>Payment status:</strong> PAID &nbsp;|&nbsp; <strong>UPI ID:</strong> ${merchantUpiId}</p>
        <p style="text-align:right;margin-top:18px;">Authorized Signatory: <strong>Rythu Basket</strong></p>
      </div>
    `;

    const invoicePayload = encodeURIComponent(
      JSON.stringify({
        id: ord.id,
        date: invoiceDate,
        name: ord.buyerName,
        mobile: ord.buyerMobile,
        address: ord.buyerAddress,
        total: ord.total,
        items: ord.items,
      })
    );

    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_INVOICE_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: recipientEmail,
            order_id: ord.id,
            invoice_html: invoiceHtml,
            invoice_pdf_link: `https://rythu-market.vercel.app/?invoiceData=${invoicePayload}`,
          },
        }),
      });
      notify(`Official Tax Invoice sent to ${recipientEmail}!`);
    } catch {
      // silent fallback
    }
  };

  const verifyEmailOtpCode = (enteredCode) => {
    if (!generatedEmailOtp || Date.now() > emailOtpExpiry) {
      setAuthMsg('OTP expired or not requested. Please tap Resend OTP.');
      return false;
    }
    if (enteredCode.trim() !== generatedEmailOtp) {
      setAuthMsg('Incorrect 6-digit OTP! Please enter the exact code sent to your Email.');
      return false;
    }
    return true;
  };

  const handleSendLoginOtp = async () => {
    const cleanEmail = loginEmail.trim().toLowerCase();
    if (!isValidEmail(cleanEmail)) {
      setAuthMsg('Please enter a valid Email address (e.g., name@gmail.com).');
      return;
    }
    const existing = users.find((u) => (u.email || '').toLowerCase() === cleanEmail && u.role === selectedRole);
    if (!existing) {
      setAuthMsg('Email not registered for this role, please Sign Up.');
      setLoginOtpSent(false);
      return;
    }
    setLoginOtp('');
    const ok = await triggerEmailOtp(cleanEmail, existing.name);
    if (ok) setLoginOtpSent(true);
  };

  const handleVerifyLogin = (e) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();
    const existing = users.find((u) => (u.email || '').toLowerCase() === cleanEmail && u.role === selectedRole);
    if (!existing) {
      setAuthMsg('Email not registered for this role, please Sign Up.');
      return;
    }
    if (!verifyEmailOtpCode(loginOtp)) return;

    setGeneratedEmailOtp('');
    setCurrentUser(existing);
    setActiveTab('home');
  };

const handleSendRegisterOtp = async () => {
    const cleanMobile = regMobile.replace(/\D/g, '');
    const cleanEmail = regEmail.trim().toLowerCase();

    if (!regName.trim() || !regAddress.trim()) {
      setAuthMsg('Please enter Full Name / Store Name and Address first.');
      return;
    }
    if (!isValidIndianMobile(cleanMobile)) {
      setAuthMsg('Enter a valid 10-digit Indian mobile number (for delivery contact).');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setAuthMsg('Enter a valid Email ID to receive your 6-digit OTP.');
      return;
    }
    const already = users.find((u) => (u.email || '').toLowerCase() === cleanEmail && u.role === selectedRole);
    if (already) {
      setAuthMsg('This Email is already registered for this role. Please Login.');
      return;
    }

    setRegOtpInput('');
    const ok = await triggerEmailOtp(cleanEmail, regName.trim());
    if (ok) setRegOtpSent(true);
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    if (!verifyEmailOtpCode(regOtpInput)) return;

    const cleanMobile = regMobile.replace(/\D/g, '');
    const cleanEmail = regEmail.trim().toLowerCase();
    const needsApproval = selectedRole === 'farmer' || selectedRole === 'wholesale' || selectedRole === 'retail';

    const newUser = {
      id: 'u_' + Date.now(),
      role: selectedRole,
      name: regName.trim(),
      mobile: cleanMobile,
      email: cleanEmail,
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
        `New ${selectedRole.toUpperCase()} registration (${newUser.name} • ${cleanEmail}) awaiting Admin approval.`,
        ...prev,
      ]);
    }
    setGeneratedEmailOtp('');
    setRegOtpSent(false);
    setCurrentUser(newUser);
    setShowWelcomeSmile(true);
    setActiveTab('home');
    setTimeout(() => setShowWelcomeSmile(false), 3500);
  };

  const handleStrictLogout = () => {
    setCurrentUser(null);
    setSelectedRole(null);
    setLoginEmail('');
    setLoginOtpSent(false);
    setGeneratedEmailOtp('');
    setAuthMsg('');
    setActiveTab('home');
  };

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
    setMapPinTitle(`Nellore Pinned (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
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
  // 0. DIRECT INVOICE PDF PRINT VIEW (OPENED FROM EMAIL DOWNLOAD BUTTON)
  // =========================================================================
  if (sharedInvoiceData) {
    return (
      <div style={fontStyle} className="min-h-screen bg-white max-w-xl mx-auto p-6 text-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#15803D] pb-4">
          <div className="flex items-center space-x-3">
            <img src="/icon-512.png" alt="Logo" className="h-14 w-14 rounded-full border-2 border-[#EAB308]" />
            <div>
              <h1 className="text-xl font-extrabold text-[#15803D]">రైతు బాస్కెట్ • Rythu Basket</h1>
              <p className="text-xs text-slate-500">Nellore Direct Farm-to-Home Marketplace</p>
            </div>
          </div>
          <div className="text-right text-xs">
            <span className="bg-emerald-50 text-[#15803D] font-extrabold px-2.5 py-1 rounded">TAX INVOICE</span>
            <p className="font-bold mt-1">#{sharedInvoiceData.id}</p>
            <p className="text-slate-500">{sharedInvoiceData.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border">
          <div>
            <p className="font-extrabold text-slate-500">FROM / SELLER</p>
            <p className="font-bold mt-0.5">Rythu Basket Nellore</p>
            <p>Support: 8328261103</p>
          </div>
          <div>
            <p className="font-extrabold text-slate-500">BILL & DELIVER TO</p>
            <p className="font-bold mt-0.5">{sharedInvoiceData.name} (+91 {sharedInvoiceData.mobile})</p>
            <p>{sharedInvoiceData.address}</p>
          </div>
        </div>

        <table className="w-full text-xs border-collapse border border-slate-200">
          <thead>
            <tr className="bg-[#15803D] text-white">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {(sharedInvoiceData.items || []).map((it, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2 font-bold">{it.name}</td>
                <td className="p-2 text-center">{it.qty} {it.unit || 'Kg'}</td>
                <td className="p-2 text-right">₹{Number(it.price).toFixed(2)}</td>
                <td className="p-2 text-right font-bold">₹{(it.price * it.qty).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="bg-emerald-50 font-extrabold text-sm">
              <td colSpan={4} className="p-2.5 text-right">Grand Total Paid</td>
              <td className="p-2.5 text-right text-[#15803D]">₹{Number(sharedInvoiceData.total).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex space-x-3 pt-2 print:hidden">
          <button onClick={() => window.print()} className="flex-1 bg-[#15803D] text-white font-extrabold py-3 rounded-xl">
            Save / Print PDF
          </button>
          <button
            onClick={() => {
              window.history.replaceState({}, '', '/');
              setSharedInvoiceData(null);
            }}
            className="px-4 border border-slate-300 font-extrabold py-3 rounded-xl"
          >
            Back to App
          </button>
        </div>
      </div>
    );
  }

 // =========================================================================
  // 1. HOME / ROLE ENTRY PAGE (ONLY 'HOME' IN BOTTOM BAR + STRICT FARMER PHOTO)
  // =========================================================================
  if (!selectedRole) {
    const roleCards = [
      {
        id: 'customer',
        te: 'వినియోగదారులు',
        en: 'Shop for Fresh Produce',
        bg: 'bg-[#ECFDF5] border-[#BBF7D0]',
        badgeBg: 'bg-[#DCFCE7] text-[#15803D]',
        arrowBg: 'bg-[#D1FAE5] text-[#15803D]',
        icon: ShoppingCart,
      },
      {
        id: 'farmer',
        te: 'రైతు విభాగం',
        en: 'Farmers Section',
        bg: 'bg-[#FFFBEB] border-[#FDE68A]',
        badgeBg: 'bg-[#FEF3C7] text-[#B45309]',
        arrowBg: 'bg-[#FDE68A] text-[#B45309]',
        icon: Sprout,
      },
      {
        id: 'retail',
        te: 'రిటైల్ షాపులు',
        en: 'Retail Shops',
        bg: 'bg-[#FFF7ED] border-[#FED7AA]',
        badgeBg: 'bg-[#FFEDD5] text-[#C2410C]',
        arrowBg: 'bg-[#FED7AA] text-[#C2410C]',
        icon: Store,
      },
      {
        id: 'wholesale',
        te: 'హోల్‌సేల్ మండీ',
        en: 'Wholesale Market',
        bg: 'bg-[#EFF6FF] border-[#BFDBFE]',
        badgeBg: 'bg-[#DBEAFE] text-[#1D4ED8]',
        arrowBg: 'bg-[#BFDBFE] text-[#1D4ED8]',
        icon: Warehouse,
      },
      {
        id: 'delivery',
        te: 'డెలివరీ & ట్రాకింగ్',
        en: 'Delivery Fleet',
        bg: 'bg-[#F5F3FF] border-[#DDD6FE]',
        badgeBg: 'bg-[#EDE9FE] text-[#6D28D9]',
        arrowBg: 'bg-[#DDD6FE] text-[#6D28D9]',
        icon: Truck,
      },
      {
        id: 'admin',
        te: 'అడ్మిన్ (Admin)',
        en: 'Admin Login',
        bg: 'bg-[#F0FDFA] border-[#99F6E4]',
        badgeBg: 'bg-[#CCFBF1] text-[#0F766E]',
        arrowBg: 'bg-[#99F6E4] text-[#0F766E]',
        icon: ShieldCheck,
      },
    ];

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F5F7F5] max-w-md mx-auto text-slate-800 shadow-2xl pb-24 relative overflow-x-hidden">
        <div className="bg-gradient-to-b from-[#0E5A2B] via-[#15803D] to-[#4ADE80]/30 text-white rounded-b-[36px] px-4 pt-4 pb-6 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-2.5">
              <div className="h-12 w-12 rounded-full bg-white p-0.5 border-2 border-[#EAB308] shadow overflow-hidden flex-shrink-0">
                <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold leading-tight tracking-tight">రైతు బాస్కెట్</h1>
                <p className="text-xs font-extrabold text-emerald-100 leading-tight">Rythu Basket</p>
                <p className="text-[10px] text-emerald-200">రైతు నుండి వినియోగదారుడి వరకు...</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setLang(lang === 'te' ? 'en' : 'te')}
                className="bg-white text-[#15803D] px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center space-x-1 shadow"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{lang === 'te' ? 'తెలుగు ▾' : 'English ▾'}</span>
              </button>
              <div className="relative h-9 w-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                <Bell className="h-4 w-4 text-white" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gradient-to-r from-white/95 via-white/90 to-emerald-50/90 rounded-3xl p-3.5 shadow-md flex items-center justify-between relative z-10 text-slate-900">
            <div className="space-y-2 max-w-[55%]">
              <p className="text-xs font-extrabold text-[#15803D] leading-snug">
                మా రైతు ఉత్పత్తులు
              </p>
              <h2 className="text-base font-extrabold text-slate-900 leading-tight border-b-2 border-[#EAB308] pb-1 inline-block">
                మీ ఇంటి వద్దకు!
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('customer');
                  setAuthScreen('login');
                }}
                className="bg-[#15803D] hover:bg-[#0F5132] text-white text-[11px] font-extrabold px-3.5 py-2 rounded-full shadow flex items-center space-x-1 transition"
              >
                <span>ఇప్పుడే ఆర్డర్ చేయండి</span>
                <span>→</span>
              </button>
            </div>

            <div className="w-[43%] flex justify-end">
              <img
                src={FARMER_HERO_IMG}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/icon-512.png';
                }}
                alt="Indian Farmer"
                className="h-28 w-28 rounded-2xl object-cover object-top border-2 border-[#15803D]/30 shadow-md bg-emerald-50"
              />
            </div>
          </div>

          <div className="flex justify-center space-x-1.5 mt-3">
            <span className="h-2 w-2 rounded-full bg-[#15803D]" />
            <span className="h-2 w-2 rounded-full bg-white/70" />
            <span className="h-2 w-2 rounded-full bg-white/70" />
          </div>
        </div>

        <div className="px-3.5 pt-4 grid grid-cols-2 gap-2.5">
          {roleCards.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setSelectedRole(r.id);
                  setAuthScreen('login');
                  setLoginEmail('');
                  setLoginOtpSent(false);
                  setRegOtpSent(false);
                  setAuthMsg('');
                }}
                className={`${r.bg} border rounded-2xl p-3 shadow-sm hover:shadow-md flex items-center justify-between text-left transition active:scale-[0.98]`}
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <div className={`h-11 w-11 rounded-2xl ${r.badgeBg} flex items-center justify-center flex-shrink-0 shadow-inner`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-extrabold text-slate-900 truncate">{r.te}</h3>
                    <p className="text-[10px] font-semibold text-slate-600 leading-tight mt-0.5">{r.en}</p>
                  </div>
                </div>
                <span className={`h-6 w-6 rounded-full ${r.arrowBg} flex items-center justify-center flex-shrink-0 ml-1`}>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-3.5 pt-3.5">
          <div className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white rounded-2xl p-3.5 shadow-md flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-full bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-[#FDE047]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold leading-tight">సహాయం కావాలా?</h3>
                <p className="text-[11px] text-emerald-100">Contact Support</p>
              </div>
            </div>
            <a
              href="tel:8328261103"
              className="bg-[#FEF9C3] text-[#0F5132] font-extrabold text-xs px-4 py-2.5 rounded-full shadow flex items-center space-x-1.5"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

  <div className="px-3.5 pt-3.5">
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2.5">
            <div className="flex items-center space-x-1.5 text-xs font-extrabold text-slate-800">
              <Leaf className="h-4 w-4 text-[#15803D]" />
              <span>Rythu Basket Highlights</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <div className="space-y-1">
                <div className="h-8 w-8 rounded-full bg-emerald-50 text-[#15803D] flex items-center justify-center mx-auto">
                  <Leaf className="h-4 w-4" />
                </div>
                <p className="text-[9px] font-bold text-slate-600 leading-tight">100% Fresh Produce</p>
              </div>
              <div className="space-y-1">
                <div className="h-8 w-8 rounded-full bg-emerald-50 text-[#15803D] flex items-center justify-center mx-auto">
                  <Sprout className="h-4 w-4" />
                </div>
                <p className="text-[9px] font-bold text-slate-600 leading-tight">Direct from Farmers</p>
              </div>
              <div className="space-y-1">
                <div className="h-8 w-8 rounded-full bg-emerald-50 text-[#15803D] flex items-center justify-center mx-auto">
                  <Shield className="h-4 w-4" />
                </div>
                <p className="text-[9px] font-bold text-slate-600 leading-tight">Safe & Secure Payments</p>
              </div>
              <div className="space-y-1">
                <div className="h-8 w-8 rounded-full bg-emerald-50 text-[#15803D] flex items-center justify-center mx-auto">
                  <Zap className="h-4 w-4" />
                </div>
                <p className="text-[9px] font-bold text-slate-600 leading-tight">Fast Delivery</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0D4A24] text-white px-6 py-2.5 rounded-t-3xl flex justify-center items-center z-40 shadow-2xl">
          <button
            type="button"
            onClick={() => setSelectedRole(null)}
            className="bg-[#D9F99D] text-[#0D4A24] px-8 py-1.5 rounded-2xl flex items-center space-x-2 text-xs font-extrabold shadow"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>
        </nav>
      </div>
    );
  }

// =========================================================================
  // 2. DIRECT EMAIL 6-DIGIT OTP LOGIN / SIGN UP SCREEN
  // =========================================================================
  if (!currentUser) {
    return (
      <div style={fontStyle} className="min-h-screen bg-white max-w-md mx-auto text-slate-800 shadow-2xl pb-10">
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl text-center">
            {toast}
          </div>
        )}

        <div className="p-4 flex items-center justify-between">
          <button onClick={() => setSelectedRole(null)} className="p-2 rounded-full bg-slate-100 text-slate-700">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-[11px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#15803D] px-3 py-1 rounded-full">
            {selectedRole} Portal
          </span>
        </div>

        <div className="px-6 pt-2 text-center space-y-2">
          <div className="h-16 w-16 rounded-full bg-white p-0.5 border-2 border-[#15803D] shadow mx-auto overflow-hidden">
            <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
          </div>
          <h1 className="text-xl font-extrabold text-[#15803D]">Rythu Basket</h1>
          <h2 className="text-lg font-extrabold text-slate-900">
            {authScreen === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-xs text-slate-500">
            {authScreen === 'login'
              ? 'Sign in with 6-digit OTP sent directly to your Email'
              : 'Verify your Email inbox with 6-digit OTP to join'}
          </p>
        </div>

        <div className="p-6 space-y-4 text-xs">
          {authScreen === 'login' ? (
            <form onSubmit={handleVerifyLogin} className="space-y-3.5">
              <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3.5 bg-slate-50">
                <Mail className="h-4 w-4 text-slate-400 mr-2.5 flex-shrink-0" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    setAuthMsg('');
                    setLoginOtpSent(false);
                  }}
                  placeholder="Enter your registered Email ID"
                  className="w-full bg-transparent font-bold text-sm focus:outline-none"
                />
              </div>

              {authMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl font-bold flex items-center justify-between">
                  <span>{authMsg}</span>
                  {authMsg.includes('not registered') && (
                    <button
                      type="button"
                      onClick={() => {
                        setRegEmail(loginEmail);
                        setAuthScreen('register');
                        setAuthMsg('');
                      }}
                      className="bg-red-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-extrabold ml-2 flex-shrink-0"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              )}

              {!loginOtpSent ? (
                <button
                  type="button"
                  disabled={sendingEmail}
                  onClick={handleSendLoginOtp}
                  className="w-full bg-[#15803D] disabled:opacity-60 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                >
                  {sendingEmail ? 'Sending OTP to Email...' : 'Send Email OTP'}
                </button>
              ) : (
                <>
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500">
                    <span>Check your Email Inbox / Spam</span>
                    <button type="button" onClick={handleSendLoginOtp} className="text-[#15803D] font-extrabold underline">
                      Resend OTP
                    </button>
                  </div>
                  <input
                    type="tel"
                    maxLength={6}
                    required
                    value={loginOtp}
                    onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-Digit Email OTP"
                    className="w-full bg-slate-50 border border-emerald-400 rounded-2xl py-3.5 text-center text-base font-extrabold tracking-[0.4em]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                  >
                    Verify Email OTP & Login
                  </button>
                </>
              )}

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => { setAuthScreen('register'); setAuthMsg(''); }}
                  className="w-full border border-slate-200 text-slate-800 font-extrabold py-3.5 rounded-2xl"
                >
                  Create New Account
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCompleteRegistration} className="space-y-3">
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Full Name / Store Name *"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-bold"
              />
              <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3.5 bg-slate-50">
                <Mail className="h-4 w-4 text-slate-400 mr-2.5 flex-shrink-0" />
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => {
                    setRegEmail(e.target.value);
                    setRegOtpSent(false);
                    setAuthMsg('');
                  }}
                  placeholder="Email ID (for 6-Digit OTP & Invoices) *"
                  className="w-full bg-transparent font-bold text-sm focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3.5 bg-slate-50">
                <span className="font-extrabold text-slate-500 pr-2 border-r">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  value={regMobile}
                  onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="Mobile Number (for Delivery) *"
                  className="w-full bg-transparent pl-2.5 font-bold text-sm focus:outline-none"
                />
              </div>
              <input
                type="text"
                required
                value={regAddress}
                onChange={(e) => setRegAddress(e.target.value)}
                placeholder="Village / Area Address in Nellore *"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 font-bold"
              />
              {selectedRole === 'customer' && (
                <input
                  type="text"
                  value={regReferralCode}
                  onChange={(e) => setRegReferralCode(e.target.value.toUpperCase())}
                  placeholder="Referral Code (Optional • ₹50 Bonus)"
                  className="w-full bg-amber-50/70 border border-amber-200 rounded-2xl px-4 py-3 font-bold"
                />
              )}

{authMsg && <p className="text-red-600 font-bold">{authMsg}</p>}

              {!regOtpSent ? (
                <button
                  type="button"
                  disabled={sendingEmail}
                  onClick={handleSendRegisterOtp}
                  className="w-full bg-[#15803D] disabled:opacity-60 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                >
                  {sendingEmail ? 'Sending OTP to Email...' : 'Send 6-Digit Email OTP'}
                </button>
              ) : (
                <>
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500">
                    <span>Sent to {regEmail}</span>
                    <button type="button" onClick={handleSendRegisterOtp} className="text-[#15803D] font-extrabold underline">
                      Resend OTP
                    </button>
                  </div>
                  <input
                    type="tel"
                    maxLength={6}
                    required
                    value={regOtpInput}
                    onChange={(e) => setRegOtpInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-Digit Email OTP"
                    className="w-full bg-slate-50 border border-emerald-400 rounded-2xl py-3.5 text-center text-base font-extrabold tracking-[0.4em]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#EA580C] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                  >
                    Verify Email OTP & Complete Sign Up
                  </button>
                </>
              )}

              <p className="text-center text-slate-500 pt-2">
                Already have an account?{' '}
                <button type="button" onClick={() => setAuthScreen('login')} className="text-[#15803D] font-extrabold">
                  Login
                </button>
              </p>
            </form>
          )}
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
        <div className="min-w-0">
          <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded-md">
            {currentUser.role}
          </span>
          <h2 className="text-base font-extrabold text-slate-900 mt-0.5 truncate">{currentUser.name}</h2>
          <p className="text-slate-500 font-semibold truncate">{currentUser.email}</p>
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
  // 3. CUSTOMER STOREFRONT & LIVE CROSS-DEVICE TRACKING
  // =========================================================================
  if (currentUser.role === 'customer') {
    const activeAddr = savedAddresses.find((a) => a.id === activeAddrId) || savedAddresses[0];
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
          return p ? { id: p.id, name: p.nameEn, unit: p.unit || 'Kg', qty, price: p.retailPrice, img: p.img } : null;
        })
        .filter(Boolean);

      if (itemsArr.length === 0) return;

      const newOrd = {
        id: 'RB' + Math.floor(123450 + Math.random() * 800000),
        buyerRole: 'customer',
        buyerName: currentUser.name,
        buyerMobile: currentUser.mobile,
        buyerEmail: currentUser.email,
        buyerAddress: activeAddr.full,
        deliverySlot,
        items: itemsArr,
        total: payableTotal,
        cashback: estimatedCashback,
        status: 'Order Placed',
        driverName: null,
        driverMobile: null,
        driverLat: 14.4350,
        driverLng: 79.9780,
        driverCoords: '14.4350, 79.9780',
        b2bOtp: null,
        createdAt: Date.now(),
        date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const updatedUser = {
        ...currentUser,
        wallet: (currentUser.wallet || 0) - walletDeduction,
        ordersCompleted: (currentUser.ordersCompleted || 0) + 1,
      };
      setCurrentUser(updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      setOrders((prev) => [newOrd, ...prev]);
      // Sync live to Cloud Firestore so Friend's Delivery Phone receives it instantly
      setDoc(doc(db, 'orders', newOrd.id), newOrd).catch(() => {});
      setLastPlacedOrder(newOrd);
      setCart({});
      setUtrRefInput('');
      setActiveTab('orderPlaced');
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
      window.location.href = paymentAppLaunchUrl;
      setTimeout(() => {
        setActiveTab('upiProcessing');
      }, 350);
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
      updateDoc(doc(db, 'orders', ord.id), { status: 'Delivered' }).catch(() => {});
      if (trackingOrder && trackingOrder.id === ord.id) {
        setTrackingOrder({ ...ord, status: 'Delivered' });
      }
      sendAutomaticInvoiceEmail(ord);
      setScratchCard({ orderId: ord.id, reward, scratched: false });
    };

    if (activeTab === 'selectLocation') {
      const filteredAddrs = savedAddresses.filter(
        (a) =>
          a.title.toLowerCase().includes(locSearch.toLowerCase()) ||
          a.full.toLowerCase().includes(locSearch.toLowerCase())
      );

      return (
        <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto text-slate-800 shadow-2xl pb-10">
          <div className="bg-[#0F5132] px-4 py-4 text-white flex items-center space-x-3 rounded-b-3xl shadow">
            <button type="button" onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white/15">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-extrabold tracking-wide uppercase">SELECT DELIVERY LOCATION</h1>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3 bg-white shadow-sm">
              <Search className="h-4 w-4 text-slate-400 mr-2.5" />
              <input
                type="text"
                value={locSearch}
                onChange={(e) => setLocSearch(e.target.value)}
                placeholder="Search area in Nellore..."
                className="w-full bg-transparent text-xs font-semibold focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleUseCurrentLocationMap}
              className="w-full border-2 border-[#15803D] bg-emerald-50 rounded-2xl py-3.5 px-4 flex items-center justify-center space-x-2 text-[#15803D] font-extrabold text-xs shadow-sm"
            >
              <LocateFixed className="h-4 w-4" />
              <span>Use current location (Capture GPS & Pin Map)</span>
            </button>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-extrabold text-slate-500">Saved addresses</span>
              <button type="button" onClick={handleUseCurrentLocationMap} className="text-xs font-extrabold text-[#15803D] flex items-center space-x-1">
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
                    activeAddrId === addr.id ? 'border-[#15803D] bg-emerald-50/60' : 'border-slate-200 bg-white shadow-sm'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                    <div className="h-9 w-9 rounded-xl bg-emerald-100 text-[#15803D] flex items-center justify-center">
                      {addr.tag === 'Office' ? <Briefcase className="h-4 w-4" /> : <Home className="h-4 w-4" />}
                    </div>
                    <span className="text-[10px] font-extrabold text-[#15803D]">{addr.distance}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold text-slate-900">{addr.tag}</h3>
                      {activeAddrId === addr.id && <Check className="h-4 w-4 text-[#15803D]" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{addr.full}</p>
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
        <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto text-slate-800 shadow-2xl pb-10">
          <div className="bg-[#0F5132] px-4 py-4 text-white flex items-center space-x-3 rounded-b-3xl shadow">
            <button type="button" onClick={() => setActiveTab('selectLocation')} className="p-2 rounded-full bg-white/15">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-extrabold tracking-wide uppercase">PIN DELIVERY LOCATION</h1>
          </div>

          <div className="p-4 space-y-3.5">
            <div className="relative h-72 w-full rounded-3xl overflow-hidden border-2 border-emerald-200 bg-emerald-50 shadow-md">
              <iframe
                title="Nellore Location Map"
                width="100%"
                height="288"
                style={{ border: 0, display: 'block' }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapPinCoords.lng - 0.008}%2C${mapPinCoords.lat - 0.008}%2C${mapPinCoords.lng + 0.008}%2C${mapPinCoords.lat + 0.008}&layer=mapnik&marker=${mapPinCoords.lat}%2C${mapPinCoords.lng}`}
              />
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center pb-6">
                <div className="bg-slate-900/90 text-white px-3 py-1.5 rounded-xl shadow text-center mb-1">
                  <p className="text-[10px] font-extrabold">Your order will be delivered here</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#15803D]/30 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-[#15803D] border-2 border-white shadow" />
                </div>
              </div>
              <div className="absolute right-2.5 top-2.5 flex flex-col space-y-1 bg-white/95 p-1.5 rounded-xl shadow border text-[10px] font-extrabold">
                <button type="button" onClick={() => handleAdjustPin(0.0015, 0)} className="px-2 py-1 bg-slate-100 rounded">↑ N</button>
                <button type="button" onClick={() => handleAdjustPin(-0.0015, 0)} className="px-2 py-1 bg-slate-100 rounded">↓ S</button>
                <button type="button" onClick={() => handleAdjustPin(0, 0.0015)} className="px-2 py-1 bg-slate-100 rounded">→ E</button>
                <button type="button" onClick={() => handleAdjustPin(0, -0.0015)} className="px-2 py-1 bg-slate-100 rounded">← W</button>
              </div>
              <div className="absolute bottom-2.5 left-0 right-0 flex justify-center">
                <button
                  type="button"
                  onClick={handleUseCurrentLocationMap}
                  className="bg-white text-[#15803D] border border-emerald-200 text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow flex items-center space-x-1.5"
                >
                  <LocateFixed className="h-3.5 w-3.5" />
                  <span>{isLocatingGps ? 'Detecting GPS...' : 'Go to current location'}</span>
                </button>
              </div>
            </div>

 <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between space-x-2">
                <div className="flex items-start space-x-2 flex-1">
                  <MapPin className="h-5 w-5 text-[#15803D] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    {isEditingPinText ? (
                      <div className="space-y-1.5">
                        <input type="text" value={mapPinTitle} onChange={(e) => setMapPinTitle(e.target.value)} className="w-full border rounded-lg px-2.5 py-1.5 text-xs font-extrabold" />
                        <input type="text" value={mapPinFullAddress} onChange={(e) => setMapPinFullAddress(e.target.value)} className="w-full border rounded-lg px-2.5 py-1.5 text-[11px]" />
                      </div>
                    ) : (
                      <>
                        <h3 className="text-sm font-extrabold text-slate-900">{isLocatingGps ? 'Fetching current address...' : mapPinTitle}</h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">{mapPinFullAddress}</p>
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

              <button type="button" onClick={handleConfirmSetLocation} className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl text-sm shadow-md">
                Set Location
              </button>
            </div>
          </div>
        </div>
      );
    }

    const visibleProducts = products.filter((p) => {
      const catOk = selectedCat === 'All' || p.cat === selectedCat;
      const q = search.toLowerCase();
      return catOk && (p.nameEn.toLowerCase().includes(q) || p.nameTe.includes(search));
    });

    const liveLat = trackingOrder?.driverLat || mapPinCoords.lat;
    const liveLng = trackingOrder?.driverLng || mapPinCoords.lng;

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
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
              <p className="text-[11px] font-bold text-[#15803D]">Invoice PDF sent automatically to {currentUser.email}</p>
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

{activeTab === 'home' && (
          <main className="px-4 pt-3.5 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setLocSearch('');
                  setActiveTab('selectLocation');
                }}
                className="flex items-center space-x-2 text-left"
              >
                <div className="h-9 w-9 rounded-full bg-emerald-50 text-[#15803D] flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">Deliver to</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-extrabold text-slate-900 truncate max-w-[175px]">{activeAddr.title}</span>
                    <ChevronDown className="h-4 w-4 text-slate-600" />
                  </div>
                </div>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="bg-emerald-50 text-[#15803D] border border-emerald-200 px-3 py-1.5 rounded-full font-extrabold flex items-center space-x-1"
                >
                  <Wallet className="h-3.5 w-3.5" />
                  <span>₹{currentUser.wallet || 0}</span>
                </button>
                <button onClick={() => setActiveTab('orders')} className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center relative">
                  <Bell className="h-4 w-4 text-slate-700" />
                  <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-rose-500" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#DCFCE7] via-[#BBF7D0] to-[#86EFAC] rounded-3xl p-4 shadow-sm flex items-center justify-between overflow-hidden">
              <div className="space-y-2 max-w-[58%]">
                <h2 className="text-base font-extrabold text-[#0F5132] leading-snug">
                  Fresh Vegetables Direct from Farmers
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedCat('All')}
                  className="bg-[#15803D] text-white font-extrabold px-4 py-2 rounded-xl shadow text-xs"
                >
                  Shop Now
                </button>
              </div>
              <img
                src={FARMER_HERO_IMG}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/icon-512.png';
                }}
                alt="Farmer"
                className="h-24 w-24 rounded-2xl object-cover object-top shadow"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {TOP_CATEGORIES.map((c) => {
                const active = selectedCat === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCat(active ? 'All' : c.id)}
                    className={`rounded-2xl p-2 border transition ${active ? 'border-[#15803D] bg-emerald-50 shadow-sm' : 'border-slate-100 bg-white'}`}
                  >
                    <img src={c.img} alt={c.labelEn} className="h-12 w-12 rounded-xl object-cover mx-auto mb-1" />
                    <p className="text-[10px] font-extrabold text-slate-800 truncate">{c.labelEn}</p>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">Popular Categories</h3>
                <button type="button" onClick={() => setActiveTab('categories')} className="text-xs font-extrabold text-[#15803D]">
                  See All &gt;
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {POPULAR_CIRCLES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const found = products.find((p) => p.id === item.id);
                      if (found) {
                        setDetailProduct(found);
                        setDetailQty(cart[found.id] || 1);
                        setActiveTab('productDetail');
                      }
                    }}
                    className="space-y-1"
                  >
                    <div className="h-14 w-14 rounded-full bg-white p-1 border border-slate-200 shadow-sm mx-auto overflow-hidden">
                      <img src={item.img} alt={item.name} className="h-full w-full object-cover rounded-full" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 truncate">{item.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {offersEnabled && (
              <div className="bg-gradient-to-r from-[#86EFAC] to-[#FEF08A] rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
                <div>
                  <span className="bg-[#15803D] text-white text-[9px] font-extrabold px-2 py-0.5 rounded">
                    Special Offer • Order #{orderNum}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                    {orderNum <= 2 ? 'Get 50% OFF on Fresh Produce' : 'Get 25% OFF + Free Delivery ₹99+'}
                  </h4>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=140&q=80"
                  alt="Offer"
                  className="h-14 w-14 rounded-xl object-cover"
                />
              </div>
            )}

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">
                  {selectedCat === 'All' ? 'Fresh Harvest in Nellore' : selectedCat}
                </h3>
                {selectedCat !== 'All' && (
                  <button onClick={() => setSelectedCat('All')} className="text-[11px] font-extrabold text-[#15803D]">
                    Show All
                  </button>
                )}
              </div>

              {visibleProducts.map((p) => {
                const q = cart[p.id] || 0;
                return (
                  <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div
                      onClick={() => {
                        setDetailProduct(p);
                        setDetailQty(q || 1);
                        setActiveTab('productDetail');
                      }}
                      className="flex items-center space-x-3 flex-1 cursor-pointer"
                    >
                      <img src={p.img} alt={p.nameEn} className="h-16 w-16 rounded-2xl object-cover bg-slate-50" />
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">{p.nameEn}</h4>
                        <p className="text-[11px] font-bold text-[#15803D]">{p.nameTe} • {p.packLabel}</p>
                        <div className="mt-1">
                          <span className="text-sm font-extrabold text-slate-900">₹{p.retailPrice}</span>
                          <span className="text-[10px] text-slate-400 line-through ml-1.5">₹{p.mrp}</span>
                        </div>
                      </div>
                    </div>

  {!p.inStock ? (
                      <span className="text-[10px] font-extrabold text-rose-500 bg-rose-50 px-2.5 py-1.5 rounded-xl">Sold Out</span>
                    ) : q === 0 ? (
                      <button
                        onClick={() => setCart({ ...cart, [p.id]: 1 })}
                        className="bg-[#15803D] text-white font-extrabold px-4 py-2 rounded-xl shadow-sm"
                      >
                        Add +
                      </button>
                    ) : (
                      <div className="flex items-center bg-[#15803D] text-white rounded-xl px-2.5 py-1.5 space-x-2.5 font-extrabold">
                        <button onClick={() => setCart((c) => { const n = { ...c }; if (n[p.id] <= 1) delete n[p.id]; else n[p.id]--; return n; })}>-</button>
                        <span>{q}</span>
                        <button onClick={() => setCart({ ...cart, [p.id]: q + 1 })}>+</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </main>
        )}

        {activeTab === 'categories' && (
          <main className="p-4 space-y-4 text-xs">
            <div className="flex items-center space-x-3">
              <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-extrabold text-slate-900">Categories</h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl px-3.5 py-2.5 flex items-center shadow-sm">
              <Search className="h-4 w-4 text-slate-400 mr-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setActiveTab('home'); }}
                placeholder="Search for products..."
                className="w-full bg-transparent font-semibold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'Vegetables', title: 'Vegetables', te: 'కూరగాయలు', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80' },
                { id: 'Fruits', title: 'Fruits', te: 'పండ్లు', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80' },
                { id: 'Staples', title: 'Groceries & Rice', te: 'బియ్యం & కిరాణా', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80' },
                { id: 'Leafy Greens', title: 'Leafy Greens', te: 'ఆకుకూరలు', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCat(cat.id);
                    setActiveTab('home');
                  }}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 text-center space-y-2 hover:border-[#15803D] transition"
                >
                  <img src={cat.img} alt={cat.title} className="h-24 w-24 rounded-2xl object-cover mx-auto" />
                  <h3 className="text-sm font-extrabold text-slate-900">{cat.title}</h3>
                  <p className="text-[11px] font-bold text-[#15803D]">{cat.te}</p>
                </button>
              ))}
            </div>
          </main>
        )}

        {activeTab === 'productDetail' && detailProduct && (
          <main className="bg-white min-h-screen pb-24 text-xs">
            <div className="relative h-64 w-full bg-slate-100">
              <img src={detailProduct.img} alt={detailProduct.nameEn} className="h-full w-full object-cover" />
              <button onClick={() => setActiveTab('home')} className="absolute top-4 left-4 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center shadow">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setWishlist((w) => (w.includes(detailProduct.id) ? w.filter((x) => x !== detailProduct.id) : [...w, detailProduct.id]))}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center shadow"
              >
                <Heart className={`h-4 w-4 ${wishlist.includes(detailProduct.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] font-extrabold bg-emerald-50 text-[#15803D] px-2.5 py-1 rounded-full">
                  {detailProduct.farmerName} ({detailProduct.distanceKm} km)
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-2">{detailProduct.nameEn}</h2>
                <p className="text-sm font-bold text-[#15803D]">{detailProduct.nameTe}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-slate-900">₹{detailProduct.retailPrice}</span>
                  <span className="text-xs text-slate-400 font-bold"> / {detailProduct.packLabel}</span>
                </div>
                <div className="flex items-center space-x-1 bg-amber-50 px-2.5 py-1 rounded-full font-extrabold text-amber-800">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{detailProduct.rating} ({detailProduct.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">{detailProduct.desc}</p>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center border border-slate-200 rounded-2xl px-3 py-2 space-x-4 font-extrabold text-base">
                  <button onClick={() => setDetailQty(Math.max(1, detailQty - 1))}>-</button>
                  <span>{detailQty}</span>
                  <button onClick={() => setDetailQty(detailQty + 1)}>+</button>
                </div>

<button
                  onClick={() => {
                    setCart({ ...cart, [detailProduct.id]: detailQty });
                    notify('Added to Cart!');
                    setActiveTab('cart');
                  }}
                  className="flex-1 ml-3 bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                >
                  Add to Cart • ₹{detailProduct.retailPrice * detailQty}
                </button>
              </div>
            </div>
          </main>
        )}

        {activeTab === 'cart' && (
          <main className="p-4 space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900">My Cart</h2>
              {Object.keys(cart).length > 0 && (
                <button onClick={() => setCart({})} className="text-rose-600 font-extrabold">Clear All</button>
              )}
            </div>

            {Object.keys(cart).length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center font-bold text-slate-400 shadow-sm">Your cart is empty.</div>
            ) : (
              <>
                {Object.entries(cart).map(([id, qty]) => {
                  const p = products.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <div key={id} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={p.img} alt={p.nameEn} className="h-14 w-14 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-extrabold text-slate-900">{p.nameEn}</h4>
                          <p className="text-[#15803D] font-extrabold">₹{p.retailPrice} / {p.packLabel}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border border-slate-200 rounded-xl px-2.5 py-1 space-x-2.5 font-extrabold">
                          <button onClick={() => setCart((c) => { const n = { ...c }; if (n[id] <= 1) delete n[id]; else n[id]--; return n; })}>-</button>
                          <span>{qty}</span>
                          <button onClick={() => setCart({ ...cart, [id]: qty + 1 })}>+</button>
                        </div>
                        <button onClick={() => setCart((c) => { const n = { ...c }; delete n[id]; return n; })} className="p-1.5 text-slate-400 hover:text-rose-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-2">
                  <div className="flex justify-between text-sm font-extrabold">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('checkout')}
                    className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </main>
        )}

        {activeTab === 'checkout' && (
          <main className="p-4 space-y-3.5 text-xs">
            <div className="flex items-center space-x-3">
              <button onClick={() => setActiveTab('cart')} className="p-2 rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-extrabold text-slate-900">Checkout</h2>
            </div>

            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 grid grid-cols-3 text-center font-extrabold text-[10px]">
              <div className="text-[#15803D]">● Address</div>
              <div className="text-[#15803D]">● Payment</div>
              <div className="text-[#15803D]">● Review</div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-start justify-between">
              <div>
                <p className="font-extrabold text-slate-900">Delivery Address ({activeAddr.tag})</p>
                <p className="text-slate-500 mt-0.5">{activeAddr.full}</p>
              </div>
              <button onClick={() => setActiveTab('selectLocation')} className="text-[#15803D] font-extrabold">Change</button>
            </div>

            <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-extrabold text-slate-900">Delivery Slot</p>
                <p className="text-slate-500 mt-0.5">{deliverySlot}</p>
              </div>
              <button
                onClick={() => setDeliverySlot(deliverySlot.includes('Today') ? 'Tomorrow, 7:00 AM – 9:00 AM' : 'Today, 6:00 PM – 8:00 PM')}
                className="text-[#15803D] font-extrabold"
              >
                Change
              </button>
            </div>

            <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2">
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
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900">Payment Method</h3>
                <span className="text-[10px] font-bold text-[#15803D]">{merchantUpiId}</span>
              </div>

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
                    <div className="mt-2 pt-2 border-t border-emerald-200/70">
                      <a
                        href={buildPaymentLaunchUrl(pm.id, merchantUpiId, payableTotal)}
                        onClick={() => setTimeout(() => setActiveTab('upiProcessing'), 400)}
                        className="block w-full bg-[#15803D] text-white text-center font-extrabold py-2 rounded-xl shadow-sm"
                      >
                        Open {pm.label.split(' (')[0]} & Pay ₹{payableTotal} ↗
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
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">₹{subtotal}</span></div>
              {autoTierDiscount > 0 && <div className="flex justify-between text-[#15803D] font-extrabold"><span>{autoTierLabel}</span><span>-₹{autoTierDiscount}</span></div>}
              {promoDeduction > 0 && <div className="flex justify-between text-[#15803D] font-extrabold"><span>Promo RYTHU30</span><span>-₹{promoDeduction}</span></div>}
              {walletDeduction > 0 && <div className="flex justify-between text-amber-700 font-extrabold"><span>Wallet Used</span><span>-₹{walletDeduction}</span></div>}
              <div className="flex justify-between"><span>Delivery (Free ₹99+)</span><span className="font-bold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
              <div className="border-t pt-2 flex justify-between text-sm font-extrabold text-slate-900"><span>Payable Total</span><span>₹{payableTotal}</span></div>

              {payMode === 'card' || payMode === 'cod' ? (
                <button type="button" onClick={handlePayAndPlaceOrderTrigger} className="w-full mt-2 bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm">
                  Place Order • ₹{payableTotal}
                </button>
              ) : (
                <a
                  href={paymentAppLaunchUrl}
                  onClick={() => setTimeout(() => setActiveTab('upiProcessing'), 400)}
                  className="block w-full mt-2 bg-[#15803D] text-white text-center font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                >
                  Place Order & Pay ₹{payableTotal}
                </a>
              )}
            </div>
          </main>
        )}

        {activeTab === 'upiProcessing' && (
          <main className="p-4 space-y-4 text-xs">
            <div className="bg-white rounded-3xl p-5 shadow-md border border-emerald-200 text-center space-y-3">
              <div className="flex justify-center">
                <PaymentBadge type={payMode} />
              </div>
              <h2 className="text-base font-extrabold text-slate-900">Pay ₹{payableTotal} to {merchantUpiId}</h2>
              <a href={paymentAppLaunchUrl} className="block w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow">
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
              <button type="button" onClick={finalizeCustomerOrder} className="w-full bg-[#EA580C] text-white font-extrabold py-3.5 rounded-2xl shadow-lg text-sm">
                Payment Completed — Confirm Order ➔
              </button>
            </div>
          </main>
        )}

        {activeTab === 'orderPlaced' && lastPlacedOrder && (
          <main className="p-6 text-center space-y-5 flex flex-col items-center justify-center min-h-[75vh]">
            <div className="h-20 w-20 rounded-full bg-[#15803D] text-white flex items-center justify-center shadow-lg">
              <Check className="h-10 w-10 stroke-[3]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900">Order Placed Successfully!</h2>
              <p className="text-xs font-extrabold text-[#15803D]">Order ID: {lastPlacedOrder.id}</p>
              <p className="text-xs text-slate-500 pt-1">You will receive live updates on your order status</p>
            </div>
            <div className="w-full space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setTrackingOrder(lastPlacedOrder);
                  setActiveTab('trackOrder');
                }}
                className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
              >
                Track Order (Live GPS)
              </button>
              <button
                onClick={() => setActiveTab('home')}
                className="w-full border border-slate-300 text-slate-800 font-extrabold py-3.5 rounded-2xl text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </main>
        )}

{activeTab === 'trackOrder' && trackingOrder && (
          <main className="pb-10 text-xs">
            <div className="bg-gradient-to-b from-[#15803D] to-[#22C55E] text-white p-5 rounded-b-[32px] shadow-md space-y-2">
              <div className="flex items-center space-x-3">
                <button onClick={() => setActiveTab('orders')} className="p-2 rounded-full bg-white/15">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div>
                  <h2 className="text-base font-extrabold">{trackingOrder.status}</h2>
                  <p className="text-[11px] text-emerald-100">
                    {trackingOrder.driverName ? `Live GPS: ${trackingOrder.driverCoords}` : 'Waiting for Delivery Partner...'} • {trackingOrder.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3.5">
              <div className="relative h-48 w-full rounded-3xl overflow-hidden border border-emerald-200 shadow-sm">
                <iframe
                  title="Live Scooter Route"
                  width="100%"
                  height="192"
                  style={{ border: 0 }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${liveLng - 0.008}%2C${liveLat - 0.008}%2C${liveLng + 0.008}%2C${liveLat + 0.008}&layer=mapnik&marker=${liveLat}%2C${liveLng}`}
                />
                <span className="absolute bottom-2 left-2 bg-slate-900/85 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                  Live Rider GPS: {liveLat}, {liveLng}
                </span>
              </div>

              <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
                {['Order Placed', 'Partner Assigned', 'Out for Delivery', 'Delivered'].map((step, idx) => {
                  const activeStep =
                    trackingOrder.status === 'Delivered' ||
                    idx === 0 ||
                    (idx <= 2 && trackingOrder.status === 'Partner Assigned');
                  return (
                    <div key={step} className="flex items-center space-x-3">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white font-bold ${activeStep ? 'bg-[#15803D]' : 'bg-slate-200'}`}>
                        ✓
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900">{step}</p>
                        <p className="text-[10px] text-slate-400">{trackingOrder.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-11 w-11 rounded-full bg-emerald-100 text-[#15803D] font-extrabold flex items-center justify-center">
                    {(trackingOrder.driverName || 'DP').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">Delivery Partner</p>
                    <h4 className="font-extrabold text-slate-900">{trackingOrder.driverName || 'Assigning Rider...'}</h4>
                  </div>
                </div>
                {trackingOrder.driverMobile && (
                  <div className="flex space-x-2">
                    <a href={`tel:${trackingOrder.driverMobile}`} className="p-2.5 bg-emerald-50 text-[#15803D] rounded-full">
                      <Phone className="h-4 w-4" />
                    </a>
                    <a href={`sms:${trackingOrder.driverMobile}`} className="p-2.5 bg-sky-50 text-sky-600 rounded-full">
                      <MessageSquare className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>

              {trackingOrder.status !== 'Delivered' ? (
                <button
                  onClick={() => handleSimulateCustomerDelivery(trackingOrder)}
                  className="w-full bg-[#EA580C] text-white font-extrabold py-3.5 rounded-2xl shadow"
                >
                  Complete Delivery (Auto Email Invoice PDF + Cashback)
                </button>
              ) : (
                <button
                  onClick={() => window.print()}
                  className="w-full bg-slate-900 text-white font-extrabold py-3.5 rounded-2xl shadow flex items-center justify-center space-x-2"
                >
                  <Printer className="h-4 w-4" />
                  <span>Download / Print Invoice PDF</span>
                </button>
              )}
            </div>
          </main>
        )}

        {activeTab === 'orders' && (
          <main className="p-4 space-y-3.5 text-xs">
            <h2 className="text-base font-extrabold text-slate-900">My Orders</h2>

            <div className="flex space-x-2">
              {['All', 'Ongoing', 'Delivered'].map((f) => (
                <button
                  key={f}
                  onClick={() => setOrderListFilter(f)}
                  className={`px-4 py-1.5 rounded-full font-extrabold ${orderListFilter === f ? 'bg-[#15803D] text-white' : 'bg-white text-slate-600 border'}`}
                >
                  {f}
                </button>
              ))}
            </div>

  {orders.filter((o) => o.buyerRole === 'customer').length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center font-bold text-slate-400">No orders placed yet.</div>
            ) : (
              orders
                .filter((o) => o.buyerRole === 'customer')
                .filter((o) => (orderListFilter === 'All' ? true : orderListFilter === 'Delivered' ? o.status === 'Delivered' : o.status !== 'Delivered'))
                .map((ord) => (
                  <div key={ord.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="h-10 w-10 rounded-full bg-emerald-50 text-[#15803D] flex items-center justify-center">
                          <Truck className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900">{ord.id}</h4>
                          <p className="text-[10px] text-slate-400">{ord.date}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-sm">₹{ord.total}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t gap-2">
                      <span className="font-extrabold text-[#15803D]">{ord.status}</span>
                      {ord.status === 'Delivered' ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.print()}
                            className="bg-slate-900 text-white font-extrabold px-3 py-1.5 rounded-xl flex items-center space-x-1"
                          >
                            <Printer className="h-3.5 w-3.5" />
                            <span>PDF</span>
                          </button>
                          <button
                            onClick={() => {
                              const updatedCart = {};
                              ord.items.forEach((it) => { updatedCart[it.id] = it.qty; });
                              setCart(updatedCart);
                              setActiveTab('cart');
                              notify('Cart updated with present day rates!');
                            }}
                            className="bg-[#15803D] text-white font-extrabold px-3.5 py-1.5 rounded-xl"
                          >
                            Reorder
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setTrackingOrder(ord);
                            setActiveTab('trackOrder');
                          }}
                          className="text-[#15803D] font-extrabold"
                        >
                          Track Order &gt;
                        </button>
                      )}
                    </div>
                  </div>
                ))
            )}
          </main>
        )}

        {activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-4 py-2 flex justify-between items-center z-40 shadow-lg">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <Home className="h-5 w-5 mb-0.5" />
            <span>Home</span>
          </button>

          <button onClick={() => setActiveTab('categories')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'categories' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <Grid className="h-5 w-5 mb-0.5" />
            <span>Categories</span>
          </button>

          <button onClick={() => setActiveTab('cart')} className={`relative flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'cart' || activeTab === 'checkout' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <ShoppingCart className="h-5 w-5 mb-0.5" />
            <span>Cart</span>
            {totalUnits > 0 && (
              <span className="absolute -top-1.5 right-0 h-4 min-w-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center">
                {totalUnits}
              </span>
            )}
          </button>

          <button onClick={() => setActiveTab('orders')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'orders' || activeTab === 'trackOrder' ? 'text-[#15803D]' : 'text-slate-400'}`}>
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
        unit: fUnit,
        packLabel: `1 ${fUnit}`,
        mrp: Number(fPrice) + 16,
        retailPrice: Number(fPrice) + 10,
        farmerDirectPrice: Number(fPrice),
        wholesalePrice: Number(fPrice) + 4,
        minWholesaleQty: 25,
        stockKg: Number(fQty),
        inStock: true,
        rating: 4.8,
        reviews: 12,
        desc: 'Fresh harvest directly from Nellore farmer.',
        availableFrom: fAvailTime,
        img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
      };
      setProducts([newProd, ...products]);
      setNotifications((prev) => [
        `40km Wholesale Alert: ${currentUser.name} listed ${fQty} ${fUnit} ${newProd.nameEn} (${newProd.nameTe}) • ${fAvailTime}.`,
        ...prev,
      ]);
      setFNameEn('');
      setFNameTe('');
      notify('Produce Listed! Notification sent to Wholesale Shops within 40 km.');
    };

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F5F7F5] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
        <WelcomeSmileModal />
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-[#15803D]" />
            <span className="text-xs font-extrabold text-slate-900">{currentUser.address} ▾</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-50 text-[#15803D] text-xs font-extrabold px-3 py-1 rounded-full">₹{currentUser.wallet || 0}</span>
            <Bell className="h-4 w-4 text-slate-600" />
          </div>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-4 text-xs">
            <div className="bg-gradient-to-r from-[#DCFCE7] via-[#BBF7D0] to-[#86EFAC] rounded-3xl p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-2 max-w-[58%]">
                <h2 className="text-base font-extrabold text-[#0F5132] leading-snug">
                  Sell Your Produce Get Best Price
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('listProduce')}
                  className="bg-[#15803D] text-white font-extrabold px-3.5 py-2 rounded-xl shadow text-xs"
                >
                  List Your Produce →
                </button>
              </div>
              <img
                src={FARMER_HERO_IMG}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/icon-512.png';
                }}
                alt="Farmer"
                className="h-24 w-24 rounded-2xl object-cover object-top shadow"
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              {[
                { id: 'listProduce', label: 'My Produce', icon: Sprout, bg: 'bg-emerald-50 text-[#15803D]' },
                { id: 'marketRates', label: 'Market Rates', icon: TrendingUp, bg: 'bg-sky-50 text-sky-700' },
                { id: 'orders', label: 'Orders', icon: ClipboardList, bg: 'bg-amber-50 text-amber-700' },
                { id: 'earnings', label: 'Earnings', icon: Wallet, bg: 'bg-orange-50 text-orange-700' },
                { id: 'support', label: 'Support', icon: HelpCircle, bg: 'bg-indigo-50 text-indigo-700' },
                { id: 'profile', label: 'Profile', icon: User, bg: 'bg-rose-50 text-rose-700' },
              ].map((tile) => {
                const Icon = tile.icon;
                return (
                  <button
                    key={tile.id}
                    onClick={() => setActiveTab(tile.id)}
                    className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col items-center space-y-1.5 hover:border-[#15803D] transition"
                  >
                    <div className={`h-11 w-11 rounded-2xl ${tile.bg} flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-800">{tile.label}</span>
                  </button>
                );
              })}
            </div>

 <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">Today's Market Rates</h3>
                <button onClick={() => setActiveTab('marketRates')} className="text-[#15803D] font-extrabold">View All &gt;</button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {products.slice(0, 3).map((p) => (
                  <div key={p.id} className="bg-slate-50 rounded-2xl p-2 border border-slate-100">
                    <img src={p.img} alt={p.nameEn} className="h-10 w-10 rounded-full object-cover mx-auto mb-1" />
                    <p className="font-extrabold text-slate-800 truncate">{p.nameTe}</p>
                    <p className="text-[#15803D] font-extrabold">₹{p.farmerDirectPrice}/{p.unit || 'Kg'}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}

        {activeTab === 'listProduce' && (
          <main className="p-4 space-y-3.5 text-xs">
            <div className="flex items-center space-x-2">
              <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-extrabold text-slate-900">List Your Produce</h2>
            </div>

            <form onSubmit={handlePublishFarmerProduct} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Product Name (English)</label>
                  <input type="text" required value={fNameEn} onChange={(e) => handleFarmerEnChange(e.target.value)} placeholder="e.g., Tomato" className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400">పేరు తెలుగులో (Auto)</label>
                  <input type="text" required value={fNameTe} onChange={(e) => handleFarmerTeChange(e.target.value)} placeholder="ఉదా: టమాటా" className="w-full bg-emerald-50/70 border border-emerald-200 rounded-xl px-3 py-2.5 font-bold text-[#15803D]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Quantity & Unit</label>
                  <div className="flex space-x-1.5">
                    <input type="number" required value={fQty} onChange={(e) => setFQty(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-bold" />
                    <select
                      value={fUnit}
                      onChange={(e) => setFUnit(e.target.value)}
                      className="bg-emerald-50 border border-emerald-200 text-[#15803D] rounded-xl px-2.5 py-2.5 font-extrabold focus:outline-none"
                    >
                      <option value="Kg">Kg</option>
                      <option value="Grams">Grams</option>
                      <option value="Litres">Litres</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400">Expected Price (₹ / {fUnit})</label>
                  <input type="number" required value={fPrice} onChange={(e) => setFPrice(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-extrabold text-[#15803D]" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400">Harvest Availability Slot</label>
                <select
                  value={fAvailTime}
                  onChange={(e) => setFAvailTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-extrabold text-slate-800 focus:outline-none mt-1"
                >
                  {AVAILABILITY_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm">
                Publish Produce & Notify Shops (40 km)
              </button>
            </form>

            <h3 className="font-extrabold text-sm text-slate-900">Active Farm Listings</h3>
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                  <h4 className="font-extrabold text-slate-900">{p.nameEn} • {p.nameTe}</h4>
                  <p className="text-[10px] text-slate-500">{p.availableFrom} • ₹{p.farmerDirectPrice}/{p.unit || 'Kg'}</p>
                </div>
                <span className="bg-emerald-50 text-[#15803D] font-extrabold px-3 py-1.5 rounded-xl">
                  {p.stockKg} {p.unit || 'Kg'}
                </span>
              </div>
            ))}
          </main>
        )}

        {activeTab === 'marketRates' && (
          <main className="p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-extrabold text-slate-900">Nellore Mandi Market Rates</h2>
            </div>
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={p.img} alt={p.nameEn} className="h-11 w-11 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-extrabold text-slate-900">{p.nameEn}</h4>
                    <p className="text-[11px] font-bold text-[#15803D]">{p.nameTe}</p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-[#15803D]">₹{p.farmerDirectPrice}/{p.unit || 'Kg'} ↑</span>
              </div>
            ))}
          </main>
        )}

  {activeTab === 'earnings' && (
          <main className="p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-extrabold text-slate-900">My Earnings</h2>
            </div>
            <div className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white rounded-3xl p-5 shadow-md">
              <p className="text-emerald-100 font-bold">Total Farm Earnings</p>
              <h3 className="text-3xl font-extrabold mt-1">₹{currentUser.wallet || 0}</h3>
            </div>
          </main>
        )}

        {activeTab === 'support' && (
          <main className="p-4 space-y-3 text-xs text-center">
            <div className="bg-white rounded-3xl p-6 shadow-sm space-y-3">
              <h2 className="text-base font-extrabold">Need Help?</h2>
              <p className="text-slate-500">Nellore Farmer Support Desk (8328261103)</p>
              <a href="tel:8328261103" className="block w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl">
                Call Support (8328261103)
              </a>
            </div>
          </main>
        )}

        {activeTab === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-extrabold">My Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-slate-400 font-bold">No orders yet.</div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2">
                  <div className="flex justify-between font-extrabold">
                    <span>{ord.id} • {ord.status}</span>
                    <span className="text-[#15803D]">₹{ord.total}</span>
                  </div>
                  <p className="text-slate-600">{ord.buyerName} • {ord.items.map((i) => `${i.qty} ${i.unit || 'Kg'} ${i.name}`).join(', ')}</p>
                  {ord.b2bOtp && <p className="text-amber-800 font-extrabold bg-amber-50 p-2 rounded-xl">B2B Handover OTP: {ord.b2bOtp}</p>}
                  {ord.status === 'Order Placed' && (
                    <button
                      onClick={() => {
                        setOrders((prev) => prev.map((o) => (o.id === ord.id ? { ...o, status: 'Order Accepted' } : o)));
                        updateDoc(doc(db, 'orders', ord.id), { status: 'Order Accepted' }).catch(() => {});
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

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-4 py-2 flex justify-between items-center z-40">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'listProduce', icon: Sprout, label: 'My Produce' },
            { id: 'orders', icon: ClipboardList, label: 'Orders' },
            { id: 'earnings', icon: Wallet, label: 'Earnings' },
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
  // 5. WHOLESALE & RETAIL STORE PORTALS
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
        id: (isRetail ? 'RIT-' : 'WS-') + Math.floor(1000 + Math.random() * 8999),
        buyerRole: currentUser.role,
        buyerName: currentUser.name,
        buyerMobile: currentUser.mobile,
        buyerEmail: currentUser.email,
        buyerAddress: currentUser.address,
        items: [{ id: prod.id, name: prod.nameEn, unit: prod.unit || 'Kg', qty, price: unitRate }],
        total: itemTotal + delivCharge,
        deliveryMode: b2bDeliveryMode === 'pickup' ? 'Pickup at Store / Farm (₹0 Fee)' : `Home Delivery (${prod.distanceKm} km • ₹${delivCharge})`,
        status: 'Order Placed',
        driverName: null,
        driverMobile: null,
        driverLat: 14.4350,
        driverLng: 79.9780,
        b2bOtp: otp,
        createdAt: Date.now(),
        date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setOrders((prev) => [newOrd, ...prev]);
      setDoc(doc(db, 'orders', newOrd.id), newOrd).catch(() => {});
      notify(`B2B Order Placed! Delivery OTP: ${otp}`);
      setActiveTab('orders');
    };

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F5F7F5] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
        <WelcomeSmileModal />
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-white px-4 py-3.5 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30">
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#15803D] flex items-center justify-center">
              {isRetail ? <Store className="h-5 w-5" /> : <Warehouse className="h-5 w-5" />}
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block">Welcome,</span>
              <h1 className="text-sm font-extrabold text-slate-900">{currentUser.name}</h1>
            </div>
          </div>
          <span className="bg-[#EAB308] text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full">₹{currentUser.wallet || 0}</span>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-4 text-xs">
            <div className="bg-gradient-to-r from-[#0F5132] to-[#16A34A] text-white rounded-3xl p-4 shadow-md flex items-center justify-between">
              <div>
                <p className="text-emerald-100 font-bold">Today's Sales</p>
                <h2 className="text-2xl font-extrabold mt-0.5">
                  ₹{orders.reduce((s, o) => s + o.total, 0)} <span className="text-xs text-[#FDE047]">↑ 12%</span>
                </h2>
              </div>
              <TrendingUp className="h-10 w-10 text-[#FDE047] opacity-90" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-3">
                <p className="text-[10px] font-bold text-slate-500">Orders</p>
                <p className="text-base font-extrabold text-[#1D4ED8] mt-0.5">({orders.length})</p>
              </div>
              <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-3">
                <p className="text-[10px] font-bold text-slate-500">Products</p>
                <p className="text-base font-extrabold text-[#B45309] mt-0.5">({products.length})</p>
              </div>
              <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-3">
                <p className="text-[10px] font-bold text-slate-500">Stock Alert</p>
                <p className="text-base font-extrabold text-[#C2410C] mt-0.5">({products.filter((p) => p.stockKg < 200).length})</p>
              </div>
              <div className="bg-[#ECFDF5] border border-[#BBF7D0] rounded-2xl p-3">
                <p className="text-[10px] font-bold text-slate-500">Earnings</p>
                <p className="text-base font-extrabold text-[#15803D] mt-0.5">₹{currentUser.wallet || 0}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-slate-900">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <button onClick={() => setActiveTab('browse')} className="bg-white border rounded-2xl p-3 shadow-sm space-y-1">
                  <Plus className="h-5 w-5 text-[#15803D] mx-auto" />
                  <p className="font-extrabold text-[10px]">{isRetail ? 'Buy Stock' : 'Add Stock'}</p>
                </button>
                <button onClick={() => setActiveTab('orders')} className="bg-white border rounded-2xl p-3 shadow-sm space-y-1">
                  <ClipboardList className="h-5 w-5 text-[#15803D] mx-auto" />
                  <p className="font-extrabold text-[10px]">View Orders</p>
                </button>
                <button onClick={() => window.print()} className="bg-white border rounded-2xl p-3 shadow-sm space-y-1">
                  <Printer className="h-5 w-5 text-[#15803D] mx-auto" />
                  <p className="font-extrabold text-[10px]">GST Invoices</p>
                </button>
              </div>
            </div>

<button onClick={() => setActiveTab('browse')} className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm">
              Browse Farm Produce & Place Bulk Order →
            </button>
          </main>
        )}

        {activeTab === 'browse' && (
          <main className="p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-extrabold text-slate-900">Browse Products</h2>
            </div>

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
              <p className="font-extrabold text-slate-500">Delivery Mode:</p>
              <div className="grid grid-cols-2 gap-2 font-extrabold">
                <button onClick={() => setB2bDeliveryMode('pickup')} className={`py-2 rounded-xl border ${b2bDeliveryMode === 'pickup' ? 'bg-emerald-50 border-[#15803D] text-[#15803D]' : 'bg-slate-50'}`}>
                  Pickup at Store (₹0)
                </button>
                <button onClick={() => setB2bDeliveryMode('delivery')} className={`py-2 rounded-xl border ${b2bDeliveryMode === 'delivery' ? 'bg-sky-50 border-sky-600 text-sky-700' : 'bg-slate-50'}`}>
                  Home Delivery
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
                      <p className="text-[10px] text-slate-500">{p.farmerName} • Stock: {p.stockKg} {p.unit || 'Kg'}</p>
                      <p className="text-[11px] font-extrabold text-[#15803D] mt-0.5">
                        ₹{rate}/{p.unit || 'Kg'} • Min: {p.minWholesaleQty} {p.unit || 'Kg'} • Delivery: ₹{estDeliv}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handlePlaceB2BOrder(p)} className="w-full bg-[#15803D] text-white font-extrabold py-2.5 rounded-xl">
                    Place Order ({p.minWholesaleQty} {p.unit || 'Kg'} • ₹{rate * p.minWholesaleQty + estDeliv})
                  </button>
                </div>
              );
            })}
          </main>
        )}

        {activeTab === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-extrabold">My Orders & PDF Invoices</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-slate-400 font-bold">No orders yet.</div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2">
                  <div className="flex justify-between font-extrabold">
                    <span>#{ord.id} • {ord.status}</span>
                    <span className="text-[#15803D]">₹{ord.total}</span>
                  </div>
                  <p className="text-slate-600">{ord.items.map((i) => `${i.qty} ${i.unit || 'Kg'} ${i.name}`).join(', ')}</p>
                  {ord.b2bOtp && (
                    <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl font-extrabold text-amber-950">
                      Delivery Verification OTP (Share with Rider): {ord.b2bOtp}
                    </div>
                  )}
                  <button onClick={() => window.print()} className="w-full bg-slate-900 text-white font-extrabold py-2.5 rounded-xl flex items-center justify-center space-x-1.5">
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print / Save PDF Invoice</span>
                  </button>
                </div>
              ))
            )}
          </main>
        )}

        {activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-6 py-2.5 flex justify-between items-center z-40">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'browse', icon: Package, label: 'Inventory' },
            { id: 'orders', icon: ClipboardList, label: 'Orders' },
            { id: 'profile', icon: User, label: 'Account' },
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
  // 6. DELIVERY PARTNER PORTAL (LIVE MULTI-DEVICE GPS + AUTO EMAIL INVOICE)
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
      updateDoc(doc(db, 'orders', ord.id), { status: 'Delivered' }).catch(() => {});
      setCurrentUser({ ...currentUser, wallet: (currentUser.wallet || 0) + 40, weeklyOrders: weeklyCompleted + 1 });
      sendAutomaticInvoiceEmail(ord);
      notify('Delivery Completed! Invoice PDF sent to Customer Email & ₹40 credited.');
    };

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F5F7F5] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-white px-4 py-3.5 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block">Hello,</span>
            <h1 className="text-sm font-extrabold text-slate-900">{currentUser.name} 👋</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-50 text-[#15803D] text-xs font-extrabold px-3 py-1 rounded-full">₹{currentUser.wallet || 0}</span>
            <Bell className="h-4 w-4 text-slate-600" />
          </div>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-3.5 text-xs">
            <div className="bg-gradient-to-r from-[#0F5132] to-[#16A34A] text-white rounded-3xl p-4 shadow-md flex items-center justify-between">
              <div>
                <p className="text-emerald-100 font-bold">Today's Earnings</p>
                <h2 className="text-2xl font-extrabold mt-0.5">
                  ₹{currentUser.wallet || 0} <span className="text-xs text-[#FDE047]">↑ 12%</span>
                </h2>
              </div>
              <TrendingUp className="h-10 w-10 text-[#FDE047]" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => setDelivFilter('available')} className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-3 text-left">
                <p className="text-[10px] font-bold text-slate-500">New Orders</p>
                <p className="text-base font-extrabold text-[#C2410C] mt-0.5">({availOrders.length})</p>
              </button>
              <button onClick={() => setDelivFilter('available')} className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-3 text-left">
                <p className="text-[10px] font-bold text-slate-500">On Going</p>
                <p className="text-base font-extrabold text-[#B45309] mt-0.5">({availOrders.filter((o) => o.driverName).length})</p>
              </button>
              <button onClick={() => setDelivFilter('delivered')} className="bg-[#ECFDF5] border border-[#BBF7D0] rounded-2xl p-3 text-left">
                <p className="text-[10px] font-bold text-slate-500">Completed</p>
                <p className="text-base font-extrabold text-[#15803D] mt-0.5">({delivOrders.length})</p>
              </button>
              <button onClick={() => setDelivFilter('earnings')} className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-3 text-left">
                <p className="text-[10px] font-bold text-slate-500">My Wallet</p>
                <p className="text-base font-extrabold text-[#1D4ED8] mt-0.5">₹{currentUser.wallet || 0}</p>
              </button>
            </div>

            <div className="bg-gradient-to-r from-[#EA580C] to-[#EAB308] text-white rounded-2xl p-3.5 shadow space-y-1.5">
              <div className="flex justify-between font-extrabold">
                <span>Weekly 100 Orders Bonus: ₹1,500</span>
                <span>{weeklyCompleted} / 100</span>
              </div>
              <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full rounded-full" style={{ width: `${Math.min(100, weeklyCompleted)}%` }} />
              </div>
            </div>

{delivFilter === 'earnings' ? (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-2">
                <h3 className="font-extrabold">Earnings & Incentive Breakdown</h3>
                <div className="flex justify-between"><span>Available Balance</span><span className="font-extrabold">₹{currentUser.wallet || 0}</span></div>
                <div className="flex justify-between"><span>Weekly 100-Order Target</span><span className="font-extrabold text-[#15803D]">₹1,500 Bonus</span></div>
              </div>
            ) : (delivFilter === 'available' ? availOrders : delivOrders).length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-slate-400 font-bold">No orders in this list.</div>
            ) : (
              (delivFilter === 'available' ? availOrders : delivOrders).map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2.5">
                  <div className="flex justify-between font-extrabold">
                    <span>#{ord.id} ({ord.buyerRole.toUpperCase()})</span>
                    <span className="text-[#15803D]">₹{ord.total}</span>
                  </div>
                  <p className="font-bold text-slate-700">{ord.buyerName} • +91 {ord.buyerMobile}</p>
                  <p className="text-slate-500 flex items-center space-x-1">
                    <MapPin className="h-3.5 w-3.5 text-[#EA580C]" />
                    <span>{ord.buyerAddress}</span>
                  </p>
                  {ord.status === 'Partner Assigned' && (
                    <p className="text-[10px] font-extrabold text-[#15803D] bg-emerald-50 px-2.5 py-1 rounded-lg">
                      ● Broadcasting Live GPS ({ord.driverCoords}) to Customer
                    </p>
                  )}
                  <div className="flex space-x-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ord.buyerAddress)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-sky-600 text-white font-extrabold py-2.5 rounded-xl text-center flex items-center justify-center space-x-1"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      <span>Navigate</span>
                    </a>
                    {ord.status !== 'Delivered' && (
                      <button
                        onClick={() => {
                          if (ord.status !== 'Partner Assigned') {
                            const initLat = 14.4390;
                            const initLng = 79.9810;
                            setOrders((prev) =>
                              prev.map((o) =>
                                o.id === ord.id
                                  ? { ...o, status: 'Partner Assigned', driverName: currentUser.name, driverMobile: currentUser.mobile, driverLat: initLat, driverLng: initLng, driverCoords: `${initLat}, ${initLng}` }
                                  : o
                              )
                            );
                            updateDoc(doc(db, 'orders', ord.id), {
                              status: 'Partner Assigned',
                              driverName: currentUser.name,
                              driverMobile: currentUser.mobile,
                              driverLat: initLat,
                              driverLng: initLng,
                              driverCoords: `${initLat}, ${initLng}`,
                            }).catch(() => {});
                            notify('Accepted! Live GPS broadcasting to Customer.');
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
                        {ord.status !== 'Partner Assigned' ? 'Accept Order' : ord.b2bOtp ? 'Verify B2B OTP' : 'Reached Customer'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </main>
        )}

  {activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-6 py-2.5 flex justify-between items-center z-40">
          <button onClick={() => { setDelivFilter('available'); setActiveTab('home'); }} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' && delivFilter === 'available' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <Home className="h-5 w-5 mb-0.5" />
            <span>Home</span>
          </button>
          <button onClick={() => { setDelivFilter('delivered'); setActiveTab('home'); }} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' && delivFilter === 'delivered' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <ClipboardList className="h-5 w-5 mb-0.5" />
            <span>Orders</span>
          </button>
          <button onClick={() => { setDelivFilter('earnings'); setActiveTab('home'); }} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' && delivFilter === 'earnings' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <Wallet className="h-5 w-5 mb-0.5" />
            <span>Earnings</span>
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
                      <p className="text-slate-500">{u.email} • +91 {u.mobile}</p>
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
                  <p className="text-slate-500">Remaining: {p.stockKg} {p.unit || 'Kg'} • Retail: ₹{p.retailPrice}/{p.unit || 'Kg'}</p>
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