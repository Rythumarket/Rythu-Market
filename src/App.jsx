import React, { useState } from 'react';
import {
  Search, ShoppingCart, Plus, Minus, Home,
  ClipboardList, MapPin, Phone, Sprout, Store, Truck, ShieldCheck,
  ChevronRight, ArrowLeft, CheckCircle2, QrCode,
  Eye, EyeOff, Trash2, LogOut, Check, Camera, Warehouse, Wallet,
  LocateFixed, Navigation, ChevronDown, X
} from 'lucide-react';

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
    photoUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80',
    approved: true,
  },
];

const INITIAL_CATALOG = [
  {
    id: 'tomato',
    sellerId: 'shop_farmer_1',
    sellerType: 'farmer',
    nameEn: 'Fresh Country Tomato (టమాటా)',
    brand: 'Ramaiah Farm Direct • Kovur',
    cat: 'Vegetables',
    rating: 4.6,
    reviews: 142,
    minQty: 1,
    img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '500 g', price: 20, mrp: 26 },
      { label: '1 kg', price: 38, mrp: 50 },
      { label: '2 kg', price: 72, mrp: 96 },
    ],
  },
  {
    id: 'onion',
    sellerId: 'shop_wholesale_1',
    sellerType: 'wholesale',
    nameEn: 'Red Onion Bulk/Retail (ఉల్లిపాయలు)',
    brand: 'Nellore Mandi Wholesale',
    cat: 'Vegetables',
    rating: 4.5,
    reviews: 98,
    minQty: 1,
    img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '1 kg', price: 32, mrp: 42 },
      { label: '5 kg', price: 145, mrp: 195 },
      { label: '25 kg Sack', price: 650, mrp: 850 },
    ],
  },
  {
    id: 'potato',
    sellerId: 'shop_wholesale_1',
    sellerType: 'wholesale',
    nameEn: 'Farm Potato (బంగాళాదుంప)',
    brand: 'Nellore Mandi Wholesale',
    cat: 'Vegetables',
    rating: 4.4,
    reviews: 76,
    minQty: 1,
    img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '1 kg', price: 30, mrp: 38 },
      { label: '5 kg', price: 135, mrp: 180 },
    ],
  },
  {
    id: 'spinach',
    sellerId: 'shop_farmer_1',
    sellerType: 'farmer',
    nameEn: 'Fresh Palakura / Spinach (పాలకూర)',
    brand: 'Ramaiah Organic Farm',
    cat: 'Leafy Greens',
    rating: 4.8,
    reviews: 64,
    minQty: 1,
    img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '1 Bunch', price: 12, mrp: 18 },
      { label: '3 Bunches', price: 32, mrp: 48 },
    ],
  },
  {
    id: 'mango',
    sellerId: 'shop_farmer_1',
    sellerType: 'farmer',
    nameEn: 'Banganapalli Mango (బంగినపల్లి మామిడి)',
    brand: 'Rapur Orchards • Nellore',
    cat: 'Fruits',
    rating: 4.9,
    reviews: 215,
    minQty: 1,
    img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '1 kg', price: 110, mrp: 145 },
      { label: '3 kg Box', price: 310, mrp: 420 },
    ],
  },
  {
    id: 'rice',
    sellerId: 'shop_retail_1',
    sellerType: 'retail',
    nameEn: 'Nellore Sona Masuri Rice (సోనా మసూరి)',
    brand: 'Balaji Fresh Retail Mart',
    cat: 'Rice & Staples',
    rating: 4.8,
    reviews: 310,
    minQty: 1,
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '5 kg', price: 285, mrp: 340 },
      { label: '25 kg Bag', price: 1350, mrp: 1600 },
    ],
  },
  {
    id: 'milk',
    sellerId: 'shop_retail_1',
    sellerType: 'retail',
    nameEn: 'Farm Fresh Buffalo Milk (చిక్కటి పాలు)',
    brand: 'Balaji Fresh Retail Mart',
    cat: 'Dairy & Eggs',
    rating: 4.9,
    reviews: 184,
    minQty: 1,
    img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '500 ml', price: 35, mrp: 40 },
      { label: '1 Liter', price: 68, mrp: 76 },
    ],
  },
  {
    id: 'eggs',
    sellerId: 'shop_retail_1',
    sellerType: 'retail',
    nameEn: 'Country Hen Eggs (నాటు కోడి గుడ్లు)',
    brand: 'Balaji Fresh Retail Mart',
    cat: 'Dairy & Eggs',
    rating: 4.7,
    reviews: 112,
    minQty: 1,
    img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '6 pcs Pack', price: 54, mrp: 66 },
      { label: '12 pcs Tray', price: 102, mrp: 126 },
    ],
  },
];

// ORIGINAL PAYMENT BRAND LOGOS
const PhonePeLogo = () => (
  <svg viewBox="0 0 36 36" className="h-7 w-7 flex-shrink-0">
    <rect width="36" height="36" rx="9" fill="#5F259F" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900">पे</text>
  </svg>
);

const GooglePayLogo = () => (
  <svg viewBox="0 0 36 36" className="h-7 w-7 flex-shrink-0">
    <rect width="36" height="36" rx="9" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
    <path d="M24.5 18.2c0-.5 0-1-.1-1.4H18v2.7h3.7c-.2.9-.7 1.7-1.5 2.2v1.8h2.4c1.4-1.3 1.9-3.2 1.9-5.3z" fill="#4285F4" />
    <path d="M18 24.8c2 0 3.7-.7 4.9-1.8l-2.4-1.8c-.7.5-1.5.7-2.5.7-1.9 0-3.5-1.3-4.1-3h-2.5v1.9c1.2 2.4 3.7 4 6.6 4z" fill="#34A853" />
    <path d="M13.9 18.9c-.2-.5-.2-1-.2-1.5s.1-1 .2-1.5v-1.9h-2.5c-.5 1-.8 2.2-.8 3.4s.3 2.4.8 3.4l2.5-1.9z" fill="#FBBC05" />
    <path d="M18 13c1.1 0 2.1.4 2.8 1.1l2.1-2.1C21.7 10.8 20 10 18 10c-2.9 0-5.4 1.6-6.6 4l2.5 1.9c.6-1.7 2.2-2.9 4.1-2.9z" fill="#EA4335" />
  </svg>
);

const PaytmLogo = () => (
  <svg viewBox="0 0 36 36" className="h-7 w-7 flex-shrink-0">
    <rect width="36" height="36" rx="9" fill="#00BAF2" />
    <text x="50%" y="53%" dominantBaseline="middle" textAnchor="middle" fill="#002970" fontSize="9.5" fontWeight="900">Paytm</text>
  </svg>
);

const CardBrandLogo = () => (
  <svg viewBox="0 0 36 36" className="h-7 w-7 flex-shrink-0">
    <rect width="36" height="36" rx="9" fill="#1E293B" />
    <circle cx="14.5" cy="18" r="6" fill="#EB001B" />
    <circle cx="21.5" cy="18" r="6" fill="#F79E1B" fillOpacity="0.88" />
  </svg>
);

export default function App() {
  const [lang, setLang] = useState('te');
  const [activeRole, setActiveRole] = useState(null);
  const [subScreen, setSubScreen] = useState('auth'); // 'auth' | 'home' | 'cart' | 'checkout' | 'upiProcessing' | 'tracking' | 'orders' | 'roleDash'

  const [shops, setShops] = useState(INITIAL_SHOPS);
  const [catalog, setCatalog] = useState(INITIAL_CATALOG);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Storefront States
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [cart, setCart] = useState({ onion__0: 2 });
  const [toast, setToast] = useState('');

  // TOP ADDRESS DROPDOWN + GPS + MANUAL MAP PIN STATES
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([
    { id: 'addr1', tag: 'Home', text: 'Flat 204, Green Park Apts, Vedayapalem, Nellore', lat: 14.4285, lng: 79.9692 },
    { id: 'addr2', tag: 'Office', text: 'Magunta Layout Main Road, Nellore', lat: 14.4426, lng: 79.9865 },
  ]);
  const [activeAddrId, setActiveAddrId] = useState('addr1');
  const [newAddrTag, setNewAddrTag] = useState('Home');
  const [newAddrText, setNewAddrText] = useState('');
  const [pinnedCoords, setPinnedCoords] = useState({ lat: 14.4426, lng: 79.9865 });
  const [gpsLoading, setGpsLoading] = useState(false);

  // Delivery Slot & Coupons
  const [deliverySlot, setDeliverySlot] = useState('Today, 6:00 PM - 8:00 PM');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Payment States
  const [payMethod, setPayMethod] = useState('gpay'); // 'phonepe' | 'gpay' | 'paytm' | 'qr' | 'card' | 'cod'
  const [utrNumber, setUtrNumber] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [payError, setPayError] = useState('');
  const [merchantUpiId] = useState('8328261103@ybl');

  // Orders & Live Tracking
  const [orders, setOrders] = useState([
    {
      id: 'RB-90412',
      sellerId: 'shop_retail_1',
      customerName: 'Sundar Reddy (9876543210)',
      phone: '9876543210',
      address: 'Flat 204, Green Park Apts, Vedayapalem, Nellore',
      lat: 14.4285,
      lng: 79.9692,
      date: 'Today, 10:15 AM',
      period: 'today',
      status: 'Out for Delivery',
      stepIndex: 3, // 0: Placed, 1: Confirmed, 2: Packed, 3: Out for Delivery, 4: Delivered
      slot: 'Today, 12:00 PM - 2:00 PM',
      payment: 'PhonePe UPI',
      total: 323,
      driver: 'Ramesh Kumar',
      driverPhone: '9848012345',
      otp: '4829',
      items: ['1 × Fresh Country Tomato (1 kg)', '1 × Nellore Sona Masuri Rice (5 kg)'],
    },
    {
      id: 'RB-90415',
      sellerId: 'shop_wholesale_1',
      customerName: 'Balaji Retail Mart (9849223344)',
      phone: '9849223344',
      address: 'Kovur Road, Nellore',
      lat: 14.4912,
      lng: 79.9854,
      date: 'Today, 11:00 AM',
      period: 'today',
      status: 'Confirmed',
      stepIndex: 1,
      slot: 'Today, 6:00 PM - 8:00 PM',
      payment: 'Google Pay (GPay)',
      total: 650,
      driver: 'Ramesh Kumar',
      driverPhone: '9848012345',
      otp: '7312',
      items: ['1 × Red Onion Bulk (25 kg Sack)'],
    },
  ]);
  const [trackingOrderId, setTrackingOrderId] = useState('RB-90412');

 // Auth & Registration Form States
  const [authTab, setAuthTab] = useState('login');
  const [mobileInput, setMobileInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');
  const [authError, setAuthError] = useState('');

  const [regStoreName, setRegStoreName] = useState('');
  const [regOwnerName, setRegOwnerName] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regUpi, setRegUpi] = useState('');
  const [regBank, setRegBank] = useState('');
  const [regPhoto, setRegPhoto] = useState('');

  // Seller / Delivery / Admin Dashboard States
  const [dashTab, setDashTab] = useState('orders');
  const [payPeriod, setPayPeriod] = useState('today');
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState('Vegetables');
  const [newItemPack, setNewItemPack] = useState('1 kg');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemMinQty, setNewItemMinQty] = useState('1');
  const [editProdId, setEditProdId] = useState(null);
  const [editPriceVal, setEditPriceVal] = useState('');
  const [editMinQtyVal, setEditMinQtyVal] = useState('');
  const [editShopUpi, setEditShopUpi] = useState('');
  const [editShopBank, setEditShopBank] = useState('');
  const [isDriverOnline, setIsDriverOnline] = useState(true);
  const [driverWallet, setDriverWallet] = useState(2450);
  const [adminTab, setAdminTab] = useState('approvals');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2600);
  };

  const handlePhotoUpload = (e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result);
    reader.readAsDataURL(file);
  };

  // USE CURRENT LOCATION (AUTO GPS + MAPS)
  const handleUseCurrentLocation = (autoSaveToHeader = false) => {
    setGpsLoading(true);
    if (!navigator.geolocation) {
      setGpsLoading(false);
      showToast('GPS not supported on this browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lng = Number(pos.coords.longitude.toFixed(5));
        setPinnedCoords({ lat, lng });
        const detectedLabel = `Current GPS Location, Nellore (${lat}, ${lng})`;
        setNewAddrText(detectedLabel);
        setGpsLoading(false);

        if (autoSaveToHeader) {
          const id = 'gps_' + Date.now();
          setAddresses((prev) => [{ id, tag: 'Current GPS', text: detectedLabel, lat, lng }, ...prev]);
          setActiveAddrId(id);
          setShowAddressDropdown(false);
          showToast('📍 Current GPS Location Captured & Pinned!');
        } else {
          showToast(`📍 GPS Coordinates Captured: ${lat}, ${lng}`);
        }
      },
      () => {
        // Fallback Nellore coordinates if permission blocked
        const lat = 14.4426;
        const lng = 79.9865;
        setPinnedCoords({ lat, lng });
        const detectedLabel = `Nellore City Center (${lat}, ${lng})`;
        setNewAddrText(detectedLabel);
        setGpsLoading(false);
        if (autoSaveToHeader) {
          const id = 'gps_' + Date.now();
          setAddresses((prev) => [{ id, tag: 'Current GPS', text: detectedLabel, lat, lng }, ...prev]);
          setActiveAddrId(id);
          setShowAddressDropdown(false);
        }
        showToast('📍 Nellore Location Pinned on Map');
      }
    );
  };

  const handleSaveManualPinnedAddress = (e) => {
    e.preventDefault();
    if (!newAddrText.trim()) return;
    const id = 'addr_' + Date.now();
    const newEntry = {
      id,
      tag: newAddrTag,
      text: newAddrText.trim(),
      lat: pinnedCoords.lat,
      lng: pinnedCoords.lng,
    };
    setAddresses([newEntry, ...addresses]);
    setActiveAddrId(id);
    setNewAddrText('');
    setShowAddAddressModal(false);
    setShowAddressDropdown(false);
    showToast('✅ New Address & Map Pin Saved!');
  };

  // Cart Operations
  const getVariantIdx = (prodId) => selectedVariants[prodId] || 0;

  const updateCartQty = (prod, vIdx, delta) => {
    const key = `${prod.id}__${vIdx}`;
    const variant = prod.variants[vIdx];
    const current = cart[key] || 0;
    const step = current === 0 && delta > 0 ? Math.max(1, prod.minQty || 1) : delta;
    const next = current + step;

    setCart((prev) => {
      const updated = { ...prev };
      if (next < (prod.minQty || 1)) delete updated[key];
      else updated[key] = next;
      return updated;
    });

    if (next >= (prod.minQty || 1)) {
      showToast(`${prod.nameEn.split(' (')[0]} (${variant.label}): ${next} in Basket`);
    }
  };

  const cartLines = Object.entries(cart)
    .map(([key, qty]) => {
      const [prodId, vIdxStr] = key.split('__');
      const prod = catalog.find((p) => p.id === prodId);
      const vIdx = Number(vIdxStr);
      if (!prod) return null;
      const variant = prod.variants[vIdx] || prod.variants[0];
      return {
        key,
        prod,
        vIdx,
        variant,
        qty,
        lineTotal: variant.price * qty,
        lineMrp: variant.mrp * qty,
      };
    })
    .filter(Boolean);

  const totalUnits = cartLines.reduce((s, l) => s + l.qty, 0);
  const itemSubtotal = cartLines.reduce((s, l) => s + l.lineTotal, 0);
  const totalMrp = cartLines.reduce((s, l) => s + l.lineMrp, 0);
  const totalSavings = totalMrp - itemSubtotal;
  const freeDeliveryTarget = 499;
  const deliveryCharge = itemSubtotal === 0 ? 0 : itemSubtotal >= freeDeliveryTarget ? 0 : 25;
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, itemSubtotal + deliveryCharge - couponDiscount);

// Payment App Links
  const activeSellerShop = (() => {
    const first = cartLines[0]?.prod;
    return shops.find((s) => s.id === first?.sellerId);
  })();
  const targetUpi = activeSellerShop?.upiId || merchantUpiId;
  const payeeName = encodeURIComponent(activeSellerShop?.storeName || 'Rythu Basket Nellore');
  const genericUpi = `upi://pay?pa=${encodeURIComponent(targetUpi)}&pn=${payeeName}&am=${grandTotal}&cu=INR`;
  const phonePeLink = `phonepe://pay?pa=${encodeURIComponent(targetUpi)}&pn=${payeeName}&am=${grandTotal}&cu=INR`;
  const gpayLink = `tez://upi/pay?pa=${encodeURIComponent(targetUpi)}&pn=${payeeName}&am=${grandTotal}&cu=INR`;
  const paytmLink = `paytmmp://pay?pa=${encodeURIComponent(targetUpi)}&pn=${payeeName}&am=${grandTotal}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(genericUpi)}`;

  const handleApplyCoupon = () => {
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'RYTHU50' && itemSubtotal >= 250) {
      setAppliedCoupon({ code: 'RYTHU50', discount: 50 });
      showToast('🎉 Coupon RYTHU50 Applied (-₹50)');
    } else if (clean === 'FRESH20') {
      setAppliedCoupon({ code: 'FRESH20', discount: 20 });
      showToast('🎉 Coupon FRESH20 Applied (-₹20)');
    } else {
      showToast('Try RYTHU50 (min ₹250) or FRESH20');
    }
  };

  // Finalize Order & Jump Directly to Live Order Tracking Screen
  const finalizeAndOpenLiveTracking = () => {
    const methodLabels = {
      phonepe: 'PhonePe UPI',
      gpay: 'Google Pay (GPay)',
      paytm: 'Paytm UPI',
      qr: 'UPI QR Scan',
      card: `Card •••• ${cardNum.replace(/\s+/g, '').slice(-4) || '4242'}`,
      cod: 'Cash on Delivery (COD)',
    };

    const activeAddr = addresses.find((a) => a.id === activeAddrId) || addresses[0];
    const firstProd = cartLines[0]?.prod;
    const newOrdId = 'RB-' + Math.floor(90500 + Math.random() * 9000);

    const newOrder = {
      id: newOrdId,
      sellerId: firstProd?.sellerId || 'shop_retail_1',
      customerName: `${loggedInUser?.name || 'Customer'} (${loggedInUser?.mobile || '9876543210'})`,
      phone: loggedInUser?.mobile || '9876543210',
      address: activeAddr.text,
      lat: activeAddr.lat,
      lng: activeAddr.lng,
      date: 'Just now',
      period: 'today',
      status: 'Order Placed',
      stepIndex: 1,
      slot: deliverySlot,
      payment: `${methodLabels[payMethod]}${utrNumber ? ` (UTR: ${utrNumber})` : ''}`,
      total: grandTotal,
      driver: 'Ramesh Kumar',
      driverPhone: '9848012345',
      otp: String(Math.floor(1000 + Math.random() * 9000)),
      items: cartLines.map((l) => `${l.qty} × ${l.prod.nameEn.split(' (')[0]} (${l.variant.label})`),
    };

    setOrders([newOrder, ...orders]);
    setTrackingOrderId(newOrdId);
    setCart({});
    setAppliedCoupon(null);
    setUtrNumber('');
    setSubScreen('tracking');
    showToast('✅ Order Placed! Live Tracking Started');
  };

  // Trigger Payment App When Pressing "Pay & Place Order"
  const handlePayAndPlaceOrderClick = () => {
    setPayError('');
    if (payMethod === 'card') {
      const digits = cardNum.replace(/\s+/g, '');
      if (digits.length < 12 || !cardExp.trim() || cardCvv.length < 3 || !cardName.trim()) {
        setPayError('Please enter valid Card Number, Expiry (MM/YY), CVV & Cardholder Name.');
        return;
      }
      finalizeAndOpenLiveTracking();
      return;
    }

    if (payMethod === 'cod') {
      finalizeAndOpenLiveTracking();
      return;
    }

    // Launch PhonePe / Google Pay / Paytm / UPI App first, then show Payment Confirmation Gate
    const appUriMap = {
      phonepe: phonePeLink,
      gpay: gpayLink,
      paytm: paytmLink,
      qr: genericUpi,
    };

    setSubScreen('upiProcessing');
    window.location.href = appUriMap[payMethod] || genericUpi;
  };

  const sendWhatsAppInvoice = (ord) => {
    const text =
      `RYTHU BASKET INVOICE\nOrder ID: ${ord.id}\nCustomer: ${ord.customerName}\nItems: ${ord.items.join(', ')}\nTotal: Rs.${ord.total}\nPayment: ${ord.payment}\nStatus: ${ord.status}`;
    const cleanPhone = (ord.phone || '9876543210').replace(/\D/g, '').slice(-10);
    window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // =========================================================================
  // 1. ALL ROLES LAUNCHER
  // =========================================================================
  if (!activeRole) {
    const rolesList = [
      { id: 'customer', title: 'Customer Store (BigBasket Style)', te: 'వినియోగదారుల స్టోర్', desc: 'Address Dropdown + GPS Pin, Live Qty, PhonePe/GPay/Paytm & Live Tracking', icon: ShoppingCart, color: 'bg-emerald-50 text-[#2E7D32] border-emerald-200' },
      { id: 'farmer', title: 'Farmer Portal', te: 'రైతు విభాగం', desc: 'List Harvest, Mandi Rates, Buyer Negotiation, Bank/UPI & Earnings', icon: Sprout, color: 'bg-lime-50 text-lime-800 border-lime-200' },
      { id: 'retail', title: 'Retail Shopkeeper', te: 'రిటైల్ షాపు', desc: 'Today Orders Accept/Reject, Item Price Update, Payments & Bank/UPI', icon: Store, color: 'bg-amber-50 text-amber-800 border-amber-200' },
      { id: 'wholesale', title: 'Wholesale Shopkeeper', te: 'హోల్‌సేల్ వ్యాపారి', desc: 'Min Order Qty Control, Today Orders, Payments & Bank/UPI Settings', icon: Warehouse, color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
      { id: 'delivery', title: 'Delivery Partner', te: 'డెలివరీ పార్టనర్', desc: 'Online/Offline Toggle, Today Earnings, Google Maps, OTP & Proof Photo', icon: Truck, color: 'bg-sky-50 text-sky-800 border-sky-200' },
      { id: 'admin', title: 'Master Admin Control', te: 'మాస్టర్ అడ్మిన్', desc: 'Shop Photo Approvals, All Item Prices, Orders & Platform Rules', icon: ShieldCheck, color: 'bg-purple-50 text-purple-800 border-purple-200' },
    ];

    return (
      <div className="min-h-screen bg-[#F4F6F5] max-w-md mx-auto font-sans text-gray-800 shadow-2xl pb-8">
        <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#558B2F] text-white rounded-b-[32px] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-14 w-14 rounded-full bg-white p-0.5 shadow-md border-2 border-yellow-300 overflow-hidden">
                <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight">రైతు బాస్కెట్</h1>
                <p className="text-xs font-extrabold text-yellow-200">Rythu Basket • Nellore</p>
                <p className="text-[10px] text-emerald-100">Fresh from Farmers... Healthy for You...</p>
              </div>
            </div>
            <button onClick={() => setLang(lang === 'te' ? 'en' : 'te')} className="bg-white/20 text-white text-xs font-extrabold px-3 py-1.5 rounded-full">
              {lang === 'te' ? 'English' : 'తెలుగు'}
            </button>
          </div>
          <p className="text-xs text-emerald-50 mt-4 font-semibold">
            {lang === 'te' ? 'మీ రోల్ ఎంచుకుని లోపలికి వెళ్ళండి:' : 'Select your role to continue:'}
          </p>
        </div>

        <div className="px-4 pt-5 space-y-3">
          {rolesList.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => {
                  setActiveRole(r.id);
                  setAuthTab('login');
                  setMobileInput('');
                  setPassInput('');
                  setOtpSent(false);
                  setAuthError('');
                  setSubScreen('auth');
                }}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-[#558B2F] flex items-center justify-between text-left transition active:scale-[0.99]"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${r.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-gray-900">{lang === 'te' ? r.te : r.title}</h2>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{r.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

// =========================================================================
  // 2. ROLE AUTHENTICATION & REGISTRATION
  // =========================================================================
  if (subScreen === 'auth') {
    const handleEnterRole = (e) => {
      e.preventDefault();
      setAuthError('');

      if (activeRole === 'customer' || activeRole === 'admin') {
        const userObj = {
          role: activeRole,
          mobile: mobileInput || '8328261103',
          name: activeRole === 'admin' ? 'Master Admin' : 'Nellore Customer',
        };
        setLoggedInUser(userObj);
        setSubScreen(activeRole === 'admin' ? 'roleDash' : 'home');
        return;
      }

      if (authTab === 'login') {
        const found = shops.find((s) => s.role === activeRole && s.mobile === mobileInput);
        if (found) {
          if (found.password !== passInput) {
            setAuthError('Wrong password! (Demo password: 123)');
            return;
          }
          setLoggedInUser({ role: activeRole, mobile: found.mobile, shopId: found.id, name: found.storeName });
          setEditShopUpi(found.upiId || '');
          setEditShopBank(found.bankAccount || '');
          setDashTab('orders');
          setSubScreen('roleDash');
        } else {
          const fallback = shops.find((s) => s.role === activeRole) || { id: 'shop_demo', storeName: `${activeRole.toUpperCase()} Store`, upiId: '8328261103@ybl', bankAccount: 'SBIN0001234' };
          setLoggedInUser({ role: activeRole, mobile: mobileInput || '9849223344', shopId: fallback.id, name: fallback.storeName });
          setEditShopUpi(fallback.upiId);
          setEditShopBank(fallback.bankAccount);
          setDashTab('orders');
          setSubScreen('roleDash');
        }
      } else {
        if (!regStoreName.trim() || !regOwnerName.trim() || mobileInput.length !== 10 || !regAddress.trim() || !passInput.trim()) {
          setAuthError('Please fill Store Name, Owner Name, 10-digit Mobile, Address & Password.');
          return;
        }
        if ((activeRole === 'retail' || activeRole === 'wholesale') && !regPhoto) {
          setAuthError('Please upload Shop Photo for Admin Verification.');
          return;
        }
        const newId = 'shop_' + Date.now();
        const needsApproval = activeRole === 'retail' || activeRole === 'wholesale';
        const newShop = {
          id: newId,
          role: activeRole,
          storeName: regStoreName.trim(),
          ownerName: regOwnerName.trim(),
          mobile: mobileInput,
          password: passInput,
          address: regAddress.trim(),
          upiId: regUpi.trim(),
          bankAccount: regBank.trim(),
          photoUrl: regPhoto || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
          approved: !needsApproval,
        };
        setShops([newShop, ...shops]);
        setLoggedInUser({ role: activeRole, mobile: newShop.mobile, shopId: newId, name: newShop.storeName });
        setEditShopUpi(newShop.upiId);
        setEditShopBank(newShop.bankAccount);
        setDashTab('orders');
        if (needsApproval) showToast('⏳ Shop photo sent to Admin for approval!');
        setSubScreen('roleDash');
      }
    };

    return (
      <div className="min-h-screen bg-[#F4F6F5] max-w-md mx-auto font-sans text-gray-800 shadow-2xl pb-10">
        <div className="bg-[#2E7D32] text-white rounded-b-[28px] p-5 shadow-md flex items-center space-x-3">
          <button onClick={() => setActiveRole(null)} className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="h-11 w-11 rounded-full bg-white p-0.5 overflow-hidden">
            <img src="/icon-512.png" alt="Logo" className="h-full w-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="text-base font-black uppercase">{activeRole} Login / Registration</h2>
            <p className="text-[11px] text-emerald-100">Rythu Basket • Nellore</p>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-3xl p-5 shadow-md space-y-4 text-xs">
            {activeRole !== 'customer' && activeRole !== 'admin' && (
              <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl font-extrabold">
                <button type="button" onClick={() => setAuthTab('login')} className={`py-2 rounded-lg ${authTab === 'login' ? 'bg-[#2E7D32] text-white' : 'text-gray-600'}`}>
                  Existing Login
                </button>
                <button type="button" onClick={() => setAuthTab('register')} className={`py-2 rounded-lg ${authTab === 'register' ? 'bg-[#2E7D32] text-white' : 'text-gray-600'}`}>
                  New Registration
                </button>
              </div>
            )}

            <form onSubmit={handleEnterRole} className="space-y-3">
              {authTab === 'register' && activeRole !== 'customer' && activeRole !== 'admin' && (
                <>
                  <input type="text" required value={regStoreName} onChange={(e) => setRegStoreName(e.target.value)} placeholder="Name of the Store / Farm *" className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 font-bold" />
                  <input type="text" required value={regOwnerName} onChange={(e) => setRegOwnerName(e.target.value)} placeholder="Owner Name *" className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 font-bold" />
                  <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Full Address in Nellore *" className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 font-bold" />
                  <input type="text" value={regUpi} onChange={(e) => setRegUpi(e.target.value)} placeholder="UPI ID (e.g., 9849223344@ybl)" className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 font-bold" />
                  <input type="text" value={regBank} onChange={(e) => setRegBank(e.target.value)} placeholder="Bank Account Number & IFSC" className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 font-bold" />

                  {(activeRole === 'retail' || activeRole === 'wholesale') && (
                    <label className="border-2 border-dashed border-emerald-300 rounded-xl p-3 flex flex-col items-center cursor-pointer bg-emerald-50/40">
                      <Camera className="h-5 w-5 text-[#2E7D32] mb-1" />
                      <span className="font-extrabold">Upload Shop Photo (Admin Approval) *</span>
                      <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e, setRegPhoto)} className="hidden" />
                      {regPhoto && <img src={regPhoto} alt="Shop" className="h-24 w-full object-cover rounded-lg mt-2" />}
                    </label>
                  )}
                </>
              )}

              <input
                type="tel"
                maxLength={10}
                value={mobileInput}
                onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))}
                placeholder="10-Digit Mobile Number (e.g., 9849223344)"
                className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 font-bold"
              />

              {activeRole === 'customer' || activeRole === 'admin' ? (
                <>
                  {!otpSent ? (
                    <button type="button" onClick={() => setOtpSent(true)} className="w-full bg-[#2E7D32] text-white font-black py-3 rounded-xl">
                      Send OTP
                    </button>
                  ) : (
                    <>
                      <div className="bg-emerald-50 text-[#2E7D32] font-black p-2 rounded-xl text-center">Demo OTP: 4829</div>
                      <input type="tel" maxLength={4} value={otpVal} onChange={(e) => setOtpVal(e.target.value)} placeholder="Enter 4-Digit OTP (or tap Verify)" className="w-full bg-gray-50 border rounded-xl py-2.5 text-center font-black tracking-[0.4em]" />
                      <button type="submit" className="w-full bg-[#2E7D32] text-white font-black py-3 rounded-xl">
                        Verify & Enter App
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {authTab === 'login' && (
                    <p className="text-[10px] text-gray-400">
                      Demo: Retail `9849223344`, Wholesale `9989334455`, Farmer `9440112233` (Pass: `123`)
                    </p>
                  )}
                  <div className="flex items-center border rounded-xl px-3 py-2.5 bg-gray-50">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={passInput}
                      onChange={(e) => setPassInput(e.target.value)}
                      placeholder="Password (Demo: 123)"
                      className="w-full bg-transparent font-bold focus:outline-none"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <button type="submit" className="w-full bg-[#2E7D32] text-white font-black py-3 rounded-xl">
                    {authTab === 'login' ? 'Login to Dashboard' : 'Complete Registration'}
                  </button>
                </>
              )}

              {authError && <p className="text-red-600 font-bold">{authError}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  const ToastBar = () =>
    toast ? (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1B5E20] text-white text-xs font-extrabold px-4 py-2.5 rounded-full shadow-xl whitespace-nowrap">
        {toast}
      </div>
    ) : null;

// =========================================================================
  // 3. CUSTOMER APP (CLICKABLE TOP ADDRESS DROPDOWN + AUTO UPI LAUNCH + LIVE TRACKING)
  // =========================================================================
  if (activeRole === 'customer') {
    const approvedIds = new Set(shops.filter((s) => s.approved).map((s) => s.id));
    const filteredCatalog = catalog.filter((p) => {
      const okSeller = approvedIds.has(p.sellerId);
      const okCat = selectedCat === 'All' || p.cat === selectedCat;
      const q = search.toLowerCase();
      return okSeller && okCat && (p.nameEn.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    });
    const activeAddr = addresses.find((a) => a.id === activeAddrId) || addresses[0];
    const currentTrackingOrder = orders.find((o) => o.id === trackingOrderId) || orders[0];

    return (
      <div className="min-h-screen bg-[#F4F6F5] max-w-md mx-auto relative pb-28 font-sans text-gray-800 shadow-2xl">
        <ToastBar />

        {/* TOP HEADER WITH WORKING CLICKABLE ADDRESS DROPDOWN */}
        <header className="bg-white sticky top-0 z-30 border-b px-4 pt-3 pb-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 max-w-[74%]">
              <img src="/icon-512.png" alt="Rythu Basket" className="h-9 w-9 rounded-full border border-[#558B2F] object-cover flex-shrink-0" />
              <button
                type="button"
                onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                className="text-left focus:outline-none group"
              >
                <span className="text-[9px] font-black uppercase bg-[#E8F5E9] text-[#2E7D32] px-1.5 py-0.5 rounded">
                  ⚡ 15 MINS DELIVERY
                </span>
                <div className="flex items-center space-x-1 mt-0.5">
                  <p className="text-xs font-black text-gray-900 truncate max-w-[175px]">
                    {activeAddr.tag}: {activeAddr.text}
                  </p>
                  <ChevronDown className="h-3.5 w-3.5 text-[#2E7D32] flex-shrink-0" />
                </div>
              </button>
            </div>

            <button onClick={() => setActiveRole(null)} className="bg-gray-100 text-gray-700 text-[11px] font-extrabold px-2.5 py-1.5 rounded-xl flex items-center space-x-1">
              <LogOut className="h-3.5 w-3.5" />
              <span>Roles</span>
            </button>
          </div>

          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); if (subScreen !== 'home') setSubScreen('home'); }}
              placeholder="Search Tomato, Mango, Sona Masuri, Milk..."
              className="w-full bg-transparent text-xs font-semibold focus:outline-none"
            />
          </div>

          {/* CLICKABLE ADDRESS DROPDOWN PANEL */}
          {showAddressDropdown && (
            <div className="mt-2.5 bg-white border-2 border-[#558B2F] rounded-2xl p-3.5 shadow-2xl space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-black text-gray-900">Select Delivery Location</span>
                <button onClick={() => setShowAddressDropdown(false)} className="p-1 bg-gray-100 rounded-full">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* 1. USE CURRENT LOCATION (AUTO GPS + OPENS MAP) */}
              <button
                type="button"
                onClick={() => handleUseCurrentLocation(true)}
                className="w-full bg-[#E8F5E9] border border-[#A5D6A7] text-[#1B5E20] font-extrabold py-2.5 px-3 rounded-xl flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <LocateFixed className="h-4 w-4 text-[#2E7D32]" />
                  <span>{gpsLoading ? 'Capturing Current GPS...' : 'Use Current Location (Auto GPS)'}</span>
                </span>
                <span className="text-[10px] bg-[#2E7D32] text-white px-2 py-0.5 rounded-full">AUTO</span>
              </button>

              {/* 2. SAVED ADDRESSES LIST */}
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {addresses.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      setActiveAddrId(a.id);
                      setShowAddressDropdown(false);
                      showToast(`📍 Delivering to ${a.tag}`);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-start justify-between ${
                      activeAddrId === a.id ? 'border-[#558B2F] bg-[#F1F8E9]' : 'border-gray-200'
                    }`}
                  >
                    <div>
                      <p className="font-black text-gray-900">{a.tag}</p>
                      <p className="text-[11px] text-gray-600">{a.text}</p>
                    </div>
                    {activeAddrId === a.id && <Check className="h-4 w-4 text-[#2E7D32] flex-shrink-0" />}
                  </button>
                ))}
              </div>

              {/* 3. ADD NEW ADDRESS & PIN MANUALLY ON MAP */}
              <button
                type="button"
                onClick={() => {
                  setShowAddressDropdown(false);
                  setShowAddAddressModal(true);
                }}
                className="w-full bg-[#2E7D32] text-white font-black py-2.5 rounded-xl flex items-center justify-center space-x-1.5"
              >
                <MapPin className="h-4 w-4" />
                <span>+ Add New Address & Pin on Map</span>
              </button>
            </div>
          )}
        </header>

        {/* MODAL: ADD ADDRESS MANUALLY & PIN ON LIVE MAP */}
        {showAddAddressModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <form onSubmit={handleSaveManualPinnedAddress} className="bg-white rounded-3xl p-4 w-full max-w-sm space-y-3 text-xs shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black">Add Address & Pin Location</h3>
                <button type="button" onClick={() => setShowAddAddressModal(false)} className="p-1 bg-gray-100 rounded-full">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Embedded Live Map Preview */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 h-36 relative">
                <iframe
                  title="Nellore Location Pin"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${pinnedCoords.lng - 0.015}%2C${pinnedCoords.lat - 0.015}%2C${pinnedCoords.lng + 0.015}%2C${pinnedCoords.lat + 0.015}&layer=mapnik&marker=${pinnedCoords.lat}%2C${pinnedCoords.lng}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleUseCurrentLocation(false)}
                  className="bg-emerald-50 border border-emerald-200 text-[#1B5E20] font-extrabold py-2 rounded-xl flex items-center justify-center space-x-1"
                >
                  <LocateFixed className="h-3.5 w-3.5" />
                  <span>{gpsLoading ? 'Fetching...' : 'Use Current GPS'}</span>
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${pinnedCoords.lat},${pinnedCoords.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-50 border border-blue-200 text-blue-700 font-extrabold py-2 rounded-xl flex items-center justify-center space-x-1"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Open Google Maps ↗</span>
                </a>
              </div>

              {/* Manual Pin Coordinate Fine-Tuning */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-500">Latitude (Pin)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={pinnedCoords.lat}
                    onChange={(e) => setPinnedCoords({ ...pinnedCoords, lat: Number(e.target.value) })}
                    className="w-full bg-gray-50 border rounded-xl px-2.5 py-1.5 font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500">Longitude (Pin)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={pinnedCoords.lng}
                    onChange={(e) => setPinnedCoords({ ...pinnedCoords, lng: Number(e.target.value) })}
                    className="w-full bg-gray-50 border rounded-xl px-2.5 py-1.5 font-bold"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                {['Home', 'Office', 'Other'].map((tg) => (
                  <button
                    key={tg}
                    type="button"
                    onClick={() => setNewAddrTag(tg)}
                    className={`px-3 py-1 rounded-full font-extrabold border ${newAddrTag === tg ? 'bg-[#2E7D32] text-white' : 'bg-gray-50'}`}
                  >
                    {tg}
                  </button>
                ))}
              </div>

              <input
                type="text"
                required
                value={newAddrText}
                onChange={(e) => setNewAddrText(e.target.value)}
                placeholder="House No, Street, Area in Nellore *"
                className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 font-bold"
              />

              <button type="submit" className="w-full bg-[#2E7D32] text-white font-black py-3 rounded-xl">
                Save Pinned Address
              </button>
            </form>
          </div>
        )}

        {/* CUSTOMER HOME */}
        {subScreen === 'home' && (
          <main className="px-3.5 pt-3 space-y-3.5">
            <div className="bg-gradient-to-r from-[#33691E] to-[#689F38] rounded-2xl p-4 text-white flex items-center justify-between shadow">
              <div className="max-w-[65%] space-y-1">
                <span className="bg-yellow-300 text-gray-900 text-[9px] font-black px-2 py-0.5 rounded">FARM TO HOME • NELLORE</span>
                <h2 className="text-base font-black leading-tight">Fresh Harvest & Groceries</h2>
                <p className="text-[11px] text-lime-100">Code <strong>RYTHU50</strong> for ₹50 OFF • Free Delivery ₹499+</p>
              </div>
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80" alt="Banner" className="h-16 w-16 rounded-xl object-cover" />
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-1">
              {['All', 'Vegetables', 'Fruits', 'Leafy Greens', 'Rice & Staples', 'Dairy & Eggs'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-extrabold border ${selectedCat === cat ? 'bg-[#558B2F] text-white border-[#558B2F]' : 'bg-white text-gray-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              {filteredCatalog.map((prod) => {
                const vIdx = getVariantIdx(prod.id);
                const activeVariant = prod.variants[vIdx];
                const cartKey = `${prod.id}__${vIdx}`;
                const qtyInCart = cart[cartKey] || 0;
                const discountPct = Math.round(((activeVariant.mrp - activeVariant.price) / activeVariant.mrp) * 100);

                return (
                  <div key={prod.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex space-x-3">
                    <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                      <img src={prod.img} alt={prod.nameEn} className="w-full h-full object-cover" />
                      {discountPct > 0 && (
                        <span className="absolute top-0 left-0 bg-[#689F38] text-white text-[9px] font-black px-1.5 py-0.5 rounded-br-lg">
                          {discountPct}% OFF
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400">{prod.brand}</p>
                        <h3 className="text-xs font-extrabold text-gray-900">{prod.nameEn}</h3>
                      </div>

                      <select
                        value={vIdx}
                        onChange={(e) => setSelectedVariants({ ...selectedVariants, [prod.id]: Number(e.target.value) })}
                        className="mt-1.5 w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-bold"
                      >
                        {prod.variants.map((v, idx) => (
                          <option key={v.label} value={idx}>
                            {v.label} — ₹{v.price} (MRP ₹{v.mrp})
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <span className="text-sm font-black text-gray-900">₹{activeVariant.price}</span>
                          <span className="text-[10px] text-gray-400 line-through ml-1">₹{activeVariant.mrp}</span>
                        </div>

                        {qtyInCart === 0 ? (
                          <button
                            onClick={() => updateCartQty(prod, vIdx, 1)}
                            className="bg-[#E53935] text-white text-xs font-black px-4 py-1.5 rounded-lg shadow-sm"
                          >
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center bg-[#E53935] text-white rounded-lg overflow-hidden">
                            <button onClick={() => updateCartQty(prod, vIdx, -1)} className="px-2.5 py-1.5"><Minus className="h-3.5 w-3.5" /></button>
                            <span className="px-2.5 text-xs font-black">{qtyInCart}</span>
                            <button onClick={() => updateCartQty(prod, vIdx, 1)} className="px-2.5 py-1.5"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        )}

{/* CART */}
        {subScreen === 'cart' && (
          <main className="p-4 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-black">My Basket ({totalUnits} items)</h2>
              {cartLines.length > 0 && <button onClick={() => setCart({})} className="text-red-600 font-bold">Clear</button>}
            </div>

            {cartLines.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center space-y-2">
                <p className="font-bold text-gray-500">Basket is empty</p>
                <button onClick={() => setSubScreen('home')} className="bg-[#558B2F] text-white font-black px-4 py-2 rounded-xl">Shop Now</button>
              </div>
            ) : (
              <>
                <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-2xl p-3">
                  <p className="font-extrabold text-[#1B5E20]">
                    {itemSubtotal >= freeDeliveryTarget ? '🎉 FREE Delivery Unlocked!' : `Add ₹${freeDeliveryTarget - itemSubtotal} more for FREE Delivery`}
                  </p>
                </div>

                {cartLines.map((line) => (
                  <div key={line.key} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold">{line.prod.nameEn}</h4>
                      <p className="text-[10px] text-gray-500">Pack: {line.variant.label} • ₹{line.lineTotal}</p>
                    </div>
                    <div className="flex items-center bg-[#E53935] text-white rounded-lg overflow-hidden">
                      <button onClick={() => updateCartQty(line.prod, line.vIdx, -1)} className="px-2.5 py-1.5"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="px-2.5 font-black">{line.qty}</span>
                      <button onClick={() => updateCartQty(line.prod, line.vIdx, 1)} className="px-2.5 py-1.5"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}

                <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
                  <div className="flex justify-between text-emerald-700 font-extrabold"><span>Total MRP Savings</span><span>₹{totalSavings}</span></div>
                  <div className="flex justify-between"><span>Delivery Fee</span><span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span></div>
                  <div className="border-t pt-2 flex justify-between text-sm font-black"><span>Total</span><span>₹{itemSubtotal + deliveryCharge}</span></div>
                  <button onClick={() => { setPayError(''); setSubScreen('checkout'); }} className="w-full bg-[#E53935] text-white font-black py-3 rounded-xl text-sm">
                    Proceed to Checkout ➔
                  </button>
                </div>
              </>
            )}
          </main>
        )}

        {/* CHECKOUT & PAYMENTS */}
        {subScreen === 'checkout' && (
          <main className="p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <button onClick={() => setSubScreen('cart')} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft className="h-4 w-4" /></button>
              <h2 className="text-base font-black">Checkout & Payment</h2>
            </div>

            <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-black">Delivering To: {activeAddr.tag}</h3>
                <button onClick={() => setShowAddressDropdown(true)} className="text-[#2E7D32] font-extrabold underline">Change</button>
              </div>
              <p className="text-gray-600">{activeAddr.text}</p>

              <select value={deliverySlot} onChange={(e) => setDeliverySlot(e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold">
                <option>Today, 6:00 PM - 8:00 PM</option>
                <option>Tomorrow, 7:00 AM - 9:00 AM</option>
              </select>

              <div className="flex space-x-2 pt-1">
                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Coupon: RYTHU50 or FRESH20" className="flex-1 bg-gray-50 border rounded-xl px-3 py-2 font-black" />
                <button onClick={handleApplyCoupon} className="bg-[#558B2F] text-white font-extrabold px-4 rounded-xl">Apply</button>
              </div>
            </div>

            {/* PAYMENT OPTIONS */}
            <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2.5">
              <h3 className="font-black text-sm">Select Payment Option (Pay ₹{grandTotal})</h3>

              {/* PhonePe */}
              <div className={`rounded-xl border-2 p-3 ${payMethod === 'phonepe' ? 'border-[#5F259F] bg-purple-50/30' : 'border-gray-100'}`}>
                <label onClick={() => setPayMethod('phonepe')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3"><PhonePeLogo /><span className="font-black">PhonePe</span></div>
                  <input type="radio" checked={payMethod === 'phonepe'} onChange={() => setPayMethod('phonepe')} />
                </label>
              </div>

              {/* Google Pay */}
              <div className={`rounded-xl border-2 p-3 ${payMethod === 'gpay' ? 'border-[#4285F4] bg-blue-50/30' : 'border-gray-100'}`}>
                <label onClick={() => setPayMethod('gpay')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3"><GooglePayLogo /><span className="font-black">Google Pay (GPay)</span></div>
                  <input type="radio" checked={payMethod === 'gpay'} onChange={() => setPayMethod('gpay')} />
                </label>
              </div>

              {/* Paytm */}
              <div className={`rounded-xl border-2 p-3 ${payMethod === 'paytm' ? 'border-[#00BAF2] bg-sky-50/30' : 'border-gray-100'}`}>
                <label onClick={() => setPayMethod('paytm')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3"><PaytmLogo /><span className="font-black">Paytm</span></div>
                  <input type="radio" checked={payMethod === 'paytm'} onChange={() => setPayMethod('paytm')} />
                </label>
              </div>

              {/* QR Code */}
              <div className={`rounded-xl border-2 p-3 ${payMethod === 'qr' ? 'border-[#558B2F] bg-[#F1F8E9]' : 'border-gray-100'}`}>
                <label onClick={() => setPayMethod('qr')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3"><QrCode className="h-6 w-6 text-[#2E7D32]" /><span className="font-black">Scan QR Code</span></div>
                  <input type="radio" checked={payMethod === 'qr'} onChange={() => setPayMethod('qr')} />
                </label>
                {payMethod === 'qr' && (
                  <div className="mt-2 pt-2 border-t text-center space-y-1.5">
                    <img src={qrUrl} alt="QR" className="w-28 h-28 mx-auto rounded-xl border p-1 bg-white" />
                    <p className="text-[10px] font-bold">UPI ID: {targetUpi}</p>
                  </div>
                )}
              </div>

              {/* Credit / Debit Card */}
              <div className={`rounded-xl border-2 p-3 ${payMethod === 'card' ? 'border-slate-800 bg-slate-50' : 'border-gray-100'}`}>
                <label onClick={() => setPayMethod('card')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3"><CardBrandLogo /><span className="font-black">Credit / Debit Card</span></div>
                  <input type="radio" checked={payMethod === 'card'} onChange={() => setPayMethod('card')} />
                </label>
                {payMethod === 'card' && (
                  <div className="mt-2.5 pt-2 border-t space-y-2">
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNum}
                      onChange={(e) => setCardNum(e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 '))}
                      placeholder="16-Digit Card Number"
                      className="w-full bg-white border rounded-xl px-3 py-2 font-bold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" maxLength={5} value={cardExp} onChange={(e) => setCardExp(e.target.value)} placeholder="MM/YY" className="bg-white border rounded-xl px-3 py-2 font-bold" />
                      <input type="password" maxLength={4} value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))} placeholder="CVV" className="bg-white border rounded-xl px-3 py-2 font-bold" />
                    </div>
                    <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Cardholder Name" className="w-full bg-white border rounded-xl px-3 py-2 font-bold" />
                  </div>
                )}
              </div>

              {/* Cash on Delivery */}
              <div className={`rounded-xl border-2 p-3 ${payMethod === 'cod' ? 'border-[#558B2F] bg-[#F1F8E9]' : 'border-gray-100'}`}>
                <label onClick={() => setPayMethod('cod')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3"><Wallet className="h-6 w-6 text-green-700" /><span className="font-black">Cash on Delivery (COD)</span></div>
                  <input type="radio" checked={payMethod === 'cod'} onChange={() => setPayMethod('cod')} />
                </label>
              </div>

              {payError && <p className="text-red-600 font-bold">{payError}</p>}
            </div>

            <button onClick={handlePayAndPlaceOrderClick} className="w-full bg-[#E53935] text-white font-black py-3.5 rounded-2xl shadow-lg text-sm">
              Pay & Place Order • ₹{grandTotal}
            </button>
          </main>
        )}

        {/* UPI PAYMENT LAUNCH & VERIFICATION SCREEN (WHEN PHONEPE / GPAY / PAYTM SELECTED) */}
        {subScreen === 'upiProcessing' && (
          <main className="p-4 space-y-4 text-xs">
            <div className="bg-white rounded-3xl p-5 shadow-md border border-emerald-200 text-center space-y-3">
              <div className="flex justify-center">
                {payMethod === 'phonepe' && <PhonePeLogo />}
                {payMethod === 'gpay' && <GooglePayLogo />}
                {payMethod === 'paytm' && <PaytmLogo />}
                {payMethod === 'qr' && <QrCode className="h-8 w-8 text-[#2E7D32]" />}
              </div>
              <h2 className="text-base font-black text-gray-900">
                Complete Payment of ₹{grandTotal}
              </h2>
              <p className="text-gray-500">
                Opening <strong>{payMethod.toUpperCase()}</strong> app on your phone... If it didn't open automatically, tap below or scan QR:
              </p>

              <a
                href={payMethod === 'phonepe' ? phonePeLink : payMethod === 'gpay' ? gpayLink : payMethod === 'paytm' ? paytmLink : genericUpi}
                className="block w-full bg-[#2E7D32] text-white font-black py-3 rounded-xl shadow"
              >
                Launch {payMethod.toUpperCase()} App Now ↗
              </a>

              <img src={qrUrl} alt="UPI QR" className="w-32 h-32 mx-auto rounded-xl border p-1 bg-white" />

              <input
                type="text"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                placeholder="Enter 12-Digit UPI Ref / UTR Number (Optional)"
                className="w-full bg-gray-50 border rounded-xl px-3 py-2.5 text-center font-bold"
              />

              <button
                onClick={finalizeAndOpenLiveTracking}
                className="w-full bg-[#E53935] text-white font-black py-3.5 rounded-xl shadow-lg text-sm"
              >
                ✓ Payment Done — View Live Order Tracking ➔
              </button>
            </div>
          </main>
        )}

        {/* DEDICATED LIVE ORDER TRACKING & STATUS SCREEN */}
        {subScreen === 'tracking' && currentTrackingOrder && (
          <main className="p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <button onClick={() => setSubScreen('orders')} className="p-2 bg-white rounded-full shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-black">Live Order Tracking</h2>
              <span className="bg-emerald-100 text-[#1B5E20] font-black px-2.5 py-1 rounded-full">
                OTP: {currentTrackingOrder.otp}
              </span>
            </div>

            {/* Live Status Header Banner */}
            <div className="bg-gradient-to-r from-[#1B5E20] to-[#43A047] text-white rounded-3xl p-4 shadow-md space-y-1">
              <div className="flex justify-between items-center">
                <span className="bg-white/20 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  {currentTrackingOrder.status}
                </span>
                <span className="font-black text-sm">₹{currentTrackingOrder.total}</span>
              </div>
              <h3 className="text-lg font-black pt-1">Order {currentTrackingOrder.id}</h3>
              <p className="text-emerald-100">Arriving in ~15-25 mins • {currentTrackingOrder.slot}</p>
            </div>

            {/* Embedded Live Delivery Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <div className="h-40 w-full">
                <iframe
                  title="Live Tracking Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${(currentTrackingOrder.lng || 79.9865) - 0.015}%2C${(currentTrackingOrder.lat || 14.4426) - 0.015}%2C${(currentTrackingOrder.lng || 79.9865) + 0.015}%2C${(currentTrackingOrder.lat || 14.4426) + 0.015}&layer=mapnik&marker=${currentTrackingOrder.lat || 14.4426}%2C${currentTrackingOrder.lng || 79.9865}`}
                />
              </div>
              <div className="p-3 flex items-center justify-between bg-gray-50">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold">Delivery Partner</p>
                  <p className="font-black text-gray-900">{currentTrackingOrder.driver}</p>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${currentTrackingOrder.lat || 14.4426},${currentTrackingOrder.lng || 79.9865}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white font-extrabold px-3 py-2 rounded-xl flex items-center space-x-1"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    <span>Maps ↗</span>
                  </a>
                  <a href={`tel:${currentTrackingOrder.driverPhone || '9848012345'}`} className="bg-[#2E7D32] text-white p-2 rounded-xl">
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

{/* Step-by-Step Live Status Timeline */}
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              <h4 className="font-black text-gray-900">Order Progress</h4>
              {[
                { title: 'Order Placed', desc: 'Your order has been received by Rythu Basket' },
                { title: 'Confirmed by Seller', desc: 'Fresh items verified & accepted' },
                { title: 'Packed at Nellore Hub', desc: 'Hygienically packed & ready for pickup' },
                { title: 'Out for Delivery', desc: `${currentTrackingOrder.driver} is on the way` },
                { title: 'Delivered', desc: 'Handed over with OTP verification' },
              ].map((st, idx) => {
                const done = idx <= (currentTrackingOrder.stepIndex ?? 1);
                return (
                  <div key={st.title} className="flex items-start space-x-3">
                    <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 ${done ? 'bg-[#2E7D32] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {done ? '✓' : idx + 1}
                    </span>
                    <div>
                      <p className={`font-extrabold ${done ? 'text-gray-900' : 'text-gray-400'}`}>{st.title}</p>
                      <p className="text-[10px] text-gray-500">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => sendWhatsAppInvoice(currentTrackingOrder)}
              className="w-full bg-[#25D366] text-white font-black py-3 rounded-2xl shadow"
            >
              📲 Share Invoice on WhatsApp
            </button>
          </main>
        )}

        {/* MY ORDERS LIST (WITH TRACK LIVE BUTTON) */}
        {subScreen === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">My Orders ({orders.length})</h2>
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                <div className="flex justify-between font-black">
                  <span>{ord.id} • <span className="text-[#2E7D32]">{ord.status}</span></span>
                  <span>₹{ord.total}</span>
                </div>
                <p className="text-gray-600">{ord.items.join(', ')}</p>
                <p className="text-[10px] text-gray-400 font-bold">{ord.payment} • Delivery OTP: {ord.otp}</p>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() => {
                      setTrackingOrderId(ord.id);
                      setSubScreen('tracking');
                    }}
                    className="bg-[#2E7D32] text-white font-extrabold py-2 rounded-xl"
                  >
                    📍 Track Live
                  </button>
                  <button onClick={() => sendWhatsAppInvoice(ord)} className="bg-[#25D366] text-white font-extrabold py-2 rounded-xl">
                    WhatsApp Bill
                  </button>
                  <button
                    onClick={() => {
                      setCart({ tomato__1: 1, onion__0: 1 });
                      setSubScreen('cart');
                      showToast('Items added to Basket!');
                    }}
                    className="bg-gray-100 text-gray-800 font-extrabold py-2 rounded-xl"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </main>
        )}

        {/* Floating Cart Bar */}
        {totalUnits > 0 && subScreen === 'home' && (
          <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-3.5 z-40">
            <button onClick={() => setSubScreen('cart')} className="w-full bg-[#33691E] text-white px-4 py-3 rounded-2xl flex items-center justify-between shadow-xl">
              <div className="text-left">
                <p className="text-xs font-black">{totalUnits} Items • ₹{itemSubtotal}</p>
                <p className="text-[10px] text-lime-200">Saved ₹{totalSavings}</p>
              </div>
              <span className="bg-white text-[#33691E] text-xs font-black px-3.5 py-1.5 rounded-xl">View Basket ➔</span>
            </button>
          </div>
        )}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-6 py-2 flex justify-between items-center z-40">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'cart', icon: ShoppingCart, label: 'Basket', badge: totalUnits },
            { id: 'tracking', icon: Navigation, label: 'Live Track' },
            { id: 'orders', icon: ClipboardList, label: 'My Orders' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setSubScreen(item.id)} className={`relative flex flex-col items-center text-[10px] font-extrabold ${subScreen === item.id ? 'text-[#558B2F]' : 'text-gray-400'}`}>
                <Icon className="h-5 w-5 mb-0.5" />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#E53935] text-white text-[9px] font-black h-4 px-1 rounded-full">
                    {item.badge}
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

// =========================================================================
  // 4. FARMER, RETAIL & WHOLESALE SHOPKEEPER DASHBOARD
  // =========================================================================
  if (activeRole === 'farmer' || activeRole === 'retail' || activeRole === 'wholesale') {
    const myProducts = catalog.filter((p) => p.sellerId === loggedInUser?.shopId || p.sellerType === activeRole);
    const myOrders = orders;
    const periodOrders = myOrders.filter((o) => o.period === payPeriod);
    const periodSum = periodOrders.reduce((s, o) => s + o.total, 0);

    return (
      <div className="min-h-screen bg-[#F4F6F5] max-w-md mx-auto relative pb-20 font-sans text-gray-800 shadow-2xl">
        <ToastBar />
        <div className="bg-[#2E7D32] text-white p-4 rounded-b-3xl flex justify-between items-center">
          <div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase font-extrabold">{activeRole} Dashboard</span>
            <h1 className="text-base font-black mt-1">{loggedInUser?.name}</h1>
          </div>
          <button onClick={() => setActiveRole(null)} className="p-2 bg-white/20 rounded-full"><LogOut className="h-4 w-4" /></button>
        </div>

        <div className="px-4 pt-3 flex space-x-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'orders', label: `📋 Today's Orders (${myOrders.length})` },
            { id: 'stock', label: `📦 Stock & Prices` },
            { id: 'payments', label: `💰 Payments` },
            { id: 'bank', label: `🏦 Bank & UPI` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setDashTab(t.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl font-extrabold border ${dashTab === t.id ? 'bg-[#2E7D32] text-white border-[#2E7D32]' : 'bg-white text-gray-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {dashTab === 'orders' && (
          <div className="p-4 space-y-2.5 text-xs">
            {myOrders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                <div className="flex justify-between font-black">
                  <span>{ord.id} • {ord.status}</span>
                  <span className="text-[#2E7D32]">₹{ord.total}</span>
                </div>
                <p className="font-bold">{ord.customerName}</p>
                <p className="text-gray-500">{ord.items.join(', ')}</p>
                <div className="flex space-x-2 pt-1">
                  {ord.status !== 'Delivered' && (
                    <>
                      <button
                        onClick={() => {
                          setOrders((p) => p.map((x) => (x.id === ord.id ? { ...x, status: 'Out for Delivery', stepIndex: 3 } : x)));
                          showToast('Order Accepted & Out for Delivery!');
                        }}
                        className="flex-1 bg-[#2E7D32] text-white font-extrabold py-2 rounded-xl"
                      >
                        ✓ Accept & Dispatch
                      </button>
                      <button
                        onClick={() => {
                          const done = { ...ord, status: 'Delivered', stepIndex: 4 };
                          setOrders((p) => p.map((x) => (x.id === ord.id ? done : x)));
                          sendWhatsAppInvoice(done);
                          showToast('Delivered & WhatsApp Invoice Sent!');
                        }}
                        className="flex-1 bg-blue-600 text-white font-extrabold py-2 rounded-xl"
                      >
                        Mark Delivered
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {dashTab === 'stock' && (
          <div className="p-4 space-y-3 text-xs">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newItemName || !newItemPrice) return;
                const itemObj = {
                  id: 'item_' + Date.now(),
                  sellerId: loggedInUser?.shopId || 'shop_retail_1',
                  sellerType: activeRole,
                  nameEn: newItemName,
                  brand: loggedInUser?.name || 'Nellore Seller',
                  cat: newItemCat,
                  rating: 4.8,
                  reviews: 1,
                  minQty: activeRole === 'wholesale' ? Math.max(1, Number(newItemMinQty)) : 1,
                  img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
                  variants: [{ label: newItemPack, price: Number(newItemPrice), mrp: Math.round(Number(newItemPrice) * 1.2) }],
                };
                setCatalog([itemObj, ...catalog]);
                setNewItemName('');
                setNewItemPrice('');
                showToast('✅ Item Added to Live Store!');
              }}
              className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2"
            >
              <h3 className="font-black">+ Add New Product</h3>
              <input type="text" required value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="Item Name (English / Telugu)" className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold" />
              <div className="grid grid-cols-3 gap-2">
                <select value={newItemCat} onChange={(e) => setNewItemCat(e.target.value)} className="bg-gray-50 border rounded-xl px-2 py-2 font-bold">
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Dairy & Eggs</option>
                </select>
                <input type="text" value={newItemPack} onChange={(e) => setNewItemPack(e.target.value)} placeholder="1 kg" className="bg-gray-50 border rounded-xl px-2 py-2 font-bold" />
                <input type="number" required value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} placeholder="₹ Price" className="bg-gray-50 border rounded-xl px-2 py-2 font-black text-[#2E7D32]" />
              </div>
              {activeRole === 'wholesale' && (
                <input type="number" min="1" value={newItemMinQty} onChange={(e) => setNewItemMinQty(e.target.value)} placeholder="Minimum Order Quantity" className="w-full bg-amber-50 border border-amber-300 rounded-xl px-3 py-2 font-black" />
              )}
              <button type="submit" className="w-full bg-[#2E7D32] text-white font-black py-2.5 rounded-xl">Publish to Store</button>
            </form>

            {myProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold">{p.nameEn}</h4>
                  {editProdId === p.id ? (
                    <div className="flex items-center space-x-1.5 mt-1">
                      <input type="number" value={editPriceVal} onChange={(e) => setEditPriceVal(e.target.value)} className="w-16 border rounded px-2 py-1 font-black" />
                      {activeRole === 'wholesale' && (
                        <input type="number" value={editMinQtyVal} onChange={(e) => setEditMinQtyVal(e.target.value)} className="w-16 bg-amber-50 border rounded px-2 py-1 font-black" />
                      )}
                      <button
                        onClick={() => {
                          setCatalog((prev) =>
                            prev.map((x) =>
                              x.id === p.id
                                ? {
                                    ...x,
                                    minQty: activeRole === 'wholesale' ? Math.max(1, Number(editMinQtyVal) || x.minQty) : x.minQty,
                                    variants: x.variants.map((v, idx) => (idx === 0 ? { ...v, price: Number(editPriceVal) || v.price } : v)),
                                  }
                                : x
                            )
                          );
                          setEditProdId(null);
                          showToast('Price Updated!');
                        }}
                        className="bg-[#2E7D32] text-white p-1.5 rounded-lg"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-[11px] font-bold text-[#2E7D32]">
                      ₹{p.variants[0].price} ({p.variants[0].label}) {activeRole === 'wholesale' ? `• Min Qty: ${p.minQty}` : ''}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setEditProdId(p.id);
                    setEditPriceVal(String(p.variants[0].price));
                    setEditMinQtyVal(String(p.minQty || 1));
                  }}
                  className="bg-emerald-50 text-[#2E7D32] px-2.5 py-1.5 rounded-xl font-extrabold"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {dashTab === 'payments' && (
          <div className="p-4 space-y-3 text-xs">
            <div className="grid grid-cols-3 gap-2">
              {['today', 'week', 'month'].map((per) => (
                <button key={per} onClick={() => setPayPeriod(per)} className={`py-2 rounded-xl font-extrabold uppercase border ${payPeriod === per ? 'bg-[#2E7D32] text-white' : 'bg-white'}`}>
                  {per}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
              <span className="font-bold text-gray-500 uppercase">{payPeriod} Payments</span>
              <span className="text-xl font-black text-[#2E7D32]">₹{periodSum}</span>
            </div>
            {periodOrders.map((o) => (
              <div key={o.id} className="bg-white rounded-2xl p-3 shadow-sm flex justify-between">
                <span>{o.id} • {o.payment}</span>
                <span className="font-black text-[#2E7D32]">+₹{o.total}</span>
              </div>
            ))}
          </div>
        )}

        {dashTab === 'bank' && (
          <div className="p-4 space-y-3 text-xs">
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              <h3 className="font-black">Bank Account & UPI Details</h3>
              <input type="text" value={editShopUpi} onChange={(e) => setEditShopUpi(e.target.value)} placeholder="UPI ID" className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold" />
              <input type="text" value={editShopBank} onChange={(e) => setEditShopBank(e.target.value)} placeholder="Bank Account & IFSC" className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold" />
              <button
                onClick={() => {
                  setShops((prev) => prev.map((s) => (s.id === loggedInUser?.shopId ? { ...s, upiId: editShopUpi, bankAccount: editShopBank } : s)));
                  showToast('✅ Bank & UPI Details Saved!');
                }}
                className="w-full bg-[#2E7D32] text-white font-black py-3 rounded-xl"
              >
                Save Payment Details
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

// =========================================================================
  // 5. DELIVERY PARTNER DASHBOARD
  // =========================================================================
  if (activeRole === 'delivery') {
    const newCount = orders.filter((o) => o.status === 'Order Placed' || o.status === 'Confirmed').length;
    const accCount = orders.filter((o) => o.status === 'Out for Delivery').length;
    const doneCount = orders.filter((o) => o.status === 'Delivered').length;

    return (
      <div className="min-h-screen bg-[#F4F6F5] max-w-md mx-auto relative pb-20 font-sans text-gray-800 shadow-2xl">
        <ToastBar />
        <div className="bg-white p-4 border-b flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold">Delivery Partner • Nellore</p>
            <h1 className="text-sm font-black">{loggedInUser?.name}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setIsDriverOnline(!isDriverOnline)} className={`px-3 py-1 rounded-full text-xs font-black ${isDriverOnline ? 'bg-[#2E7D32] text-white' : 'bg-gray-200 text-gray-600'}`}>
              {isDriverOnline ? '🟢 Online' : '⚪ Offline'}
            </button>
            <button onClick={() => setActiveRole(null)} className="p-2 bg-gray-100 rounded-full"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="p-4 space-y-3 text-xs">
          <div className="bg-gradient-to-r from-[#1B5E20] to-[#43A047] text-white rounded-3xl p-4 shadow">
            <div className="flex justify-between">
              <span>Today's Earnings</span>
              <span>Wallet: ₹{driverWallet}</span>
            </div>
            <h2 className="text-3xl font-black mt-1">₹850</h2>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-3 rounded-2xl shadow-sm"><p className="text-[10px] text-gray-400 font-bold">New Orders</p><p className="text-lg font-black text-amber-600">{newCount}</p></div>
            <div className="bg-white p-3 rounded-2xl shadow-sm"><p className="text-[10px] text-gray-400 font-bold">Accepted</p><p className="text-lg font-black text-blue-600">{accCount}</p></div>
            <div className="bg-white p-3 rounded-2xl shadow-sm"><p className="text-[10px] text-gray-400 font-bold">Completed</p><p className="text-lg font-black text-[#2E7D32]">{28 + doneCount}</p></div>
          </div>

          {orders.map((ord) => (
            <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
              <div className="flex justify-between font-black">
                <span>{ord.id} • {ord.status}</span>
                <span className="text-[#2E7D32]">₹{ord.total}</span>
              </div>
              <p className="font-bold">{ord.customerName} • {ord.address}</p>
              <div className="flex space-x-2">
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${ord.lat || 14.4426},${ord.lng || 79.9865}`} target="_blank" rel="noreferrer" className="flex-1 bg-blue-600 text-white font-extrabold py-2 rounded-xl text-center">
                  🗺️ Google Maps
                </a>
                {ord.status !== 'Delivered' && (
                  <button
                    onClick={() => {
                      const done = { ...ord, status: 'Delivered', stepIndex: 4 };
                      setOrders((p) => p.map((x) => (x.id === ord.id ? done : x)));
                      setDriverWallet((w) => w + 35);
                      sendWhatsAppInvoice(done);
                      showToast('✅ Delivered! +₹35 Earned');
                    }}
                    className="flex-1 bg-[#2E7D32] text-white font-extrabold py-2 rounded-xl"
                  >
                    Start / Complete Delivery
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. MASTER ADMIN CONTROL PANEL
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F4F6F5] max-w-md mx-auto relative pb-20 font-sans text-gray-800 shadow-2xl">
      <ToastBar />
      <div className="bg-[#1B5E20] text-white p-4 rounded-b-3xl flex justify-between items-center">
        <div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-extrabold">MASTER ADMIN HQ</span>
          <h1 className="text-base font-black mt-1">Rythu Basket Admin</h1>
        </div>
        <button onClick={() => setActiveRole(null)} className="p-2 bg-white/20 rounded-full"><LogOut className="h-4 w-4" /></button>
      </div>

      <div className="px-4 pt-3 flex space-x-2 text-xs">
        {[
          { id: 'approvals', label: `🏪 Shops (${shops.length})` },
          { id: 'items', label: `📦 Items (${catalog.length})` },
          { id: 'orders', label: `🚚 Orders (${orders.length})` },
        ].map((t) => (
          <button key={t.id} onClick={() => setAdminTab(t.id)} className={`px-3 py-1.5 rounded-xl font-extrabold border ${adminTab === t.id ? 'bg-[#1B5E20] text-white' : 'bg-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-3 text-xs">
        {adminTab === 'approvals' &&
          shops.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
              <img src={s.photoUrl} alt={s.storeName} className="h-28 w-full object-cover rounded-xl" />
              <h4 className="font-black text-sm">{s.storeName} ({s.role})</h4>
              <p className="text-gray-600">Owner: {s.ownerName} • {s.mobile} • {s.address}</p>
              <button
                onClick={() => {
                  setShops((prev) => prev.map((x) => (x.id === s.id ? { ...x, approved: !x.approved } : x)));
                  showToast('Shop Approval Updated!');
                }}
                className={`w-full font-extrabold py-2.5 rounded-xl ${s.approved ? 'bg-emerald-50 text-[#2E7D32] border border-emerald-200' : 'bg-[#2E7D32] text-white'}`}
              >
                {s.approved ? '✓ Approved & Live (Tap to Suspend)' : 'Verify Photo & Approve Shop'}
              </button>
            </div>
          ))}

        {adminTab === 'items' &&
          catalog.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-extrabold">{item.nameEn}</h4>
                <p className="text-[#2E7D32] font-black">₹{item.variants[0].price} ({item.variants[0].label})</p>
              </div>
              <button onClick={() => setCatalog((prev) => prev.filter((x) => x.id !== item.id))} className="p-2 bg-red-50 text-red-600 rounded-xl">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

        {adminTab === 'orders' &&
          orders.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-1">
              <div className="flex justify-between font-black">
                <span>{o.id} • {o.status}</span>
                <span className="text-[#2E7D32]">₹{o.total}</span>
              </div>
              <p>{o.customerName} — {o.items.join(', ')}</p>
            </div>
          ))}
      </div>
    </div>
  );
}