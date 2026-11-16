import React, { useState } from 'react';
import {
  Search, Mic, Heart, ShoppingCart, Plus, Minus, Home, Grid,
  ClipboardList, User, MapPin, Phone, ArrowLeft, CheckCircle2,
  Star, QrCode, Wallet, Clock, Tag, ChevronDown, Trash2,
  ShieldCheck, Truck, RefreshCw, MessageCircle, X
} from 'lucide-react';

const CATALOG = [
  {
    id: 'tomato',
    nameEn: 'Fresh Country Tomato (టమాటా)',
    brand: 'Rythu Farm Direct • Kovur',
    cat: 'Vegetables',
    rating: 4.6,
    reviews: 142,
    img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '500 g', price: 20, mrp: 26 },
      { label: '1 kg', price: 38, mrp: 50 },
      { label: '2 kg', price: 72, mrp: 96 },
    ],
  },
  {
    id: 'onion',
    nameEn: 'Red Onion (ఉల్లిపాయలు)',
    brand: 'Nellore Mandi Fresh',
    cat: 'Vegetables',
    rating: 4.5,
    reviews: 98,
    img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '1 kg', price: 32, mrp: 42 },
      { label: '2 kg', price: 60, mrp: 80 },
      { label: '5 kg', price: 145, mrp: 195 },
    ],
  },
  {
    id: 'potato',
    nameEn: 'Farm Potato (బంగాళాదుంప)',
    brand: 'Rythu Farm Direct',
    cat: 'Vegetables',
    rating: 4.4,
    reviews: 76,
    img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '1 kg', price: 30, mrp: 38 },
      { label: '2 kg', price: 58, mrp: 75 },
    ],
  },
  {
    id: 'spinach',
    nameEn: 'Fresh Palakura / Spinach (పాలకూర)',
    brand: 'Padma Organic Farms',
    cat: 'Leafy Greens',
    rating: 4.8,
    reviews: 64,
    img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '1 Bunch', price: 12, mrp: 18 },
      { label: '3 Bunches', price: 32, mrp: 48 },
    ],
  },
  {
    id: 'mango',
    nameEn: 'Banganapalli Mango (బంగినపల్లి మామిడి)',
    brand: 'Rapur Orchards • Nellore',
    cat: 'Fruits',
    rating: 4.9,
    reviews: 215,
    img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '1 kg', price: 110, mrp: 145 },
      { label: '3 kg Box', price: 310, mrp: 420 },
    ],
  },
  {
    id: 'banana',
    nameEn: 'Sweet Yelakki Banana (అరటిపండ్లు)',
    brand: 'Kavali Farms',
    cat: 'Fruits',
    rating: 4.7,
    reviews: 89,
    img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '6 pcs', price: 25, mrp: 32 },
      { label: '1 Dozen', price: 46, mrp: 60 },
    ],
  },
  {
    id: 'rice',
    nameEn: 'Nellore Sona Masuri Rice (సోనా మసూరి)',
    brand: 'Nellore Heritage Mills',
    cat: 'Rice & Staples',
    rating: 4.8,
    reviews: 310,
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '5 kg', price: 285, mrp: 340 },
      { label: '25 kg Bag', price: 1350, mrp: 1600 },
    ],
  },
  {
    id: 'milk',
    nameEn: 'Farm Fresh Buffalo Milk (చిక్కటి పాలు)',
    brand: 'Kovur Dairy Farm',
    cat: 'Dairy & Eggs',
    rating: 4.9,
    reviews: 184,
    img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80',
    variants: [
      { label: '500 ml', price: 35, mrp: 40 },
      { label: '1 Liter', price: 68, mrp: 76 },
    ],
  },
  {
    id: 'eggs',
    nameEn: 'Country Hen Eggs (నాటు కోడి గుడ్లు)',
    brand: 'Rapur Free-Range Poultry',
    cat: 'Dairy & Eggs',
    rating: 4.7,
    reviews: 112,
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
  const [tab, setTab] = useState('home'); // 'home' | 'categories' | 'cart' | 'checkout' | 'orders' | 'tracking' | 'profile'
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedVariants, setSelectedVariants] = useState({}); // { productId: variantIndex }
  // Cart keys are `${productId}__${variantIndex}` -> qty
  const [cart, setCart] = useState({ tomato__1: 1, rice__0: 1 });
  const [wishlist, setWishlist] = useState(['mango', 'tomato']);
  const [toast, setToast] = useState('');

  // Addresses & Delivery Slots
  const [addresses, setAddresses] = useState([
    { id: 'addr1', tag: 'Home', text: 'Flat 204, Green Park Apts, Vedayapalem, Nellore - 524004' },
    { id: 'addr2', tag: 'Office', text: 'Magunta Layout Main Road, Nellore - 524003' },
  ]);
  const [activeAddrId, setActiveAddrId] = useState('addr1');
  const [newAddrText, setNewAddrText] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Today, 6:00 PM - 8:00 PM');

  // Coupons & Payment States
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discount }
  const [payMethod, setPayMethod] = useState('phonepe'); // 'phonepe' | 'gpay' | 'paytm' | 'qr' | 'card' | 'cod'
  const [utrNumber, setUtrNumber] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [payError, setPayError] = useState('');

  // Orders & Live Tracking
  const [orders, setOrders] = useState([
    {
      id: 'RB-90412',
      date: 'Today, 10:15 AM',
      status: 'Out for Delivery',
      slot: 'Today, 12:00 PM - 2:00 PM',
      payment: 'PhonePe UPI',
      total: 323,
      driver: 'Ramesh Kumar (9848012345)',
      otp: '4829',
      items: ['1 × Fresh Country Tomato (1 kg)', '1 × Nellore Sona Masuri Rice (5 kg)'],
    },
  ]);
  const [trackingOrder, setTrackingOrder] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // Cart Operations
  const getVariantIdx = (prodId) => selectedVariants[prodId] || 0;

  const updateCartQty = (prod, vIdx, delta) => {
    const key = `${prod.id}__${vIdx}`;
    const variant = prod.variants[vIdx];
    const current = cart[key] || 0;
    const next = current + delta;

    setCart((prev) => {
      const updated = { ...prev };
      if (next <= 0) delete updated[key];
      else updated[key] = next;
      return updated;
    });

    if (next > 0) {
      showToast(`${prod.nameEn.split(' (')[0]} (${variant.label}): ${next} in Cart`);
    } else {
      showToast(`Removed ${prod.nameEn.split(' (')[0]} from Cart`);
    }
  };

  const cartLines = Object.entries(cart)
    .map(([key, qty]) => {
      const [prodId, vIdxStr] = key.split('__');
      const prod = CATALOG.find((p) => p.id === prodId);
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

  // Payment Deep Links
  const upiId = '8328261103@ybl';
  const payeeName = encodeURIComponent('Rythu Basket Nellore');
  const genericUpi = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${grandTotal}&cu=INR`;
  const phonePeLink = `phonepe://pay?pa=${upiId}&pn=${payeeName}&am=${grandTotal}&cu=INR`;
  const gpayLink = `tez://upi/pay?pa=${upiId}&pn=${payeeName}&am=${grandTotal}&cu=INR`;
  const paytmLink = `paytmmp://pay?pa=${upiId}&pn=${payeeName}&am=${grandTotal}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(genericUpi)}`;

  const handleApplyCoupon = (code) => {
    const clean = (code || couponCode).trim().toUpperCase();
    if (clean === 'RYTHU50' && itemSubtotal >= 250) {
      setAppliedCoupon({ code: 'RYTHU50', discount: 50 });
      setCouponCode('RYTHU50');
      showToast('🎉 Coupon RYTHU50 Applied (-₹50)');
    } else if (clean === 'FRESH20') {
      setAppliedCoupon({ code: 'FRESH20', discount: 20 });
      setCouponCode('FRESH20');
      showToast('🎉 Coupon FRESH20 Applied (-₹20)');
    } else {
      showToast('Use RYTHU50 (min ₹250) or FRESH20');
    }
  };

const methodLabels = {
      phonepe: 'PhonePe UPI',
      gpay: 'Google Pay (GPay)',
      paytm: 'Paytm UPI',
      qr: 'UPI QR Scan',
      card: `Card •••• ${cardNum.replace(/\s+/g, '').slice(-4) || '4242'}`,
      cod: 'Cash on Delivery (COD)',
    };

    const newOrder = {
      id: 'RB-' + Math.floor(90500 + Math.random() * 9000),
      date: 'Just now',
      status: 'Confirmed',
      slot: deliverySlot,
      payment: `${methodLabels[payMethod]}${utrNumber ? ` (UTR: ${utrNumber})` : ''}`,
      total: grandTotal,
      driver: 'Ramesh Kumar (9848012345)',
      otp: String(Math.floor(1000 + Math.random() * 9000)),
      items: cartLines.map((l) => `${l.qty} × ${l.prod.nameEn.split(' (')[0]} (${l.variant.label})`),
    };

    setOrders([newOrder, ...orders]);
    setTrackingOrder(newOrder);
    setCart({});
    setAppliedCoupon(null);
    setUtrNumber('');
    setTab('tracking');
    showToast('✅ Order Placed Successfully!');
  };

  const filteredCatalog = CATALOG.filter((p) => {
    const catOk = selectedCat === 'All' || p.cat === selectedCat;
    const q = search.toLowerCase();
    return catOk && (p.nameEn.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  });

  const activeAddressObj = addresses.find((a) => a.id === activeAddrId) || addresses[0];

  return (
    <div className="min-h-screen bg-[#F4F6F5] max-w-md mx-auto relative pb-28 font-sans text-gray-800 shadow-2xl">
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1B5E20] text-white text-xs font-extrabold px-4 py-2.5 rounded-full shadow-xl whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* BIGBASKET-STYLE TOP STICKY HEADER */}
      <header className="bg-white sticky top-0 z-30 border-b border-gray-200 px-4 pt-3 pb-3 shadow-sm">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2.5">
            <img src="/icon-512.png" alt="Rythu Basket" className="h-10 w-10 rounded-full border-2 border-[#689F38] object-cover" />
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-[10px] font-black uppercase bg-[#E8F5E9] text-[#2E7D32] px-1.5 py-0.5 rounded">
                  ⚡ 15 Mins Delivery
                </span>
              </div>
              <p className="text-xs font-black text-gray-900 flex items-center mt-0.5">
                <MapPin className="h-3.5 w-3.5 text-[#689F38] mr-1" />
                <span className="truncate max-w-[200px]">{activeAddressObj.tag}: {activeAddressObj.text}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setTab('orders')}
            className="bg-[#F1F8E9] text-[#33691E] text-[11px] font-extrabold px-2.5 py-1.5 rounded-xl border border-[#C5E1A5]"
          >
            Orders ({orders.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center bg-gray-100 rounded-xl px-3 py-2">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (tab !== 'home') setTab('home');
            }}
            placeholder="Search for Tomato, Mango, Sona Masuri, Milk..."
            className="w-full bg-transparent text-xs font-semibold focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-400 mr-1">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={() => {
              setSearch('Mango');
              showToast('🎙️ Voice Search: "Banganapalli Mango"');
            }}
            className="text-[#558B2F] pl-2 border-l border-gray-300"
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </header>

{/* =================================================================
          TAB 1: BIGBASKET-STYLE HOME & PRODUCT CARDS WITH PACK SIZE SELECTOR
         ================================================================= */}
      {tab === 'home' && (
        <main className="px-3.5 pt-3 space-y-4">
          {/* Promo Banner */}
          <div className="bg-gradient-to-r from-[#33691E] to-[#689F38] rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
            <div className="max-w-[65%] space-y-1.5">
              <span className="bg-yellow-300 text-gray-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                FARM TO HOME • NELLORE
              </span>
              <h2 className="text-lg font-black leading-tight">
                Fresh Harvest & Groceries
              </h2>
              <p className="text-[11px] text-lime-100">
                Use Code <strong>RYTHU50</strong> for ₹50 OFF • Free Delivery above ₹499
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=250&q=80"
              alt="Basket"
              className="h-20 w-20 rounded-2xl object-cover border-2 border-white/40"
            />
          </div>

          {/* Horizontal Category Pills */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {['All', 'Vegetables', 'Fruits', 'Leafy Greens', 'Rice & Staples', 'Dairy & Eggs'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition ${
                  selectedCat === cat
                    ? 'bg-[#558B2F] text-white border-[#558B2F] shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* BigBasket-Style Product Cards (With Pack Size Dropdown + Live `- 2 +` Stepper) */}
          <div className="space-y-3">
            {filteredCatalog.map((prod) => {
              const vIdx = getVariantIdx(prod.id);
              const activeVariant = prod.variants[vIdx];
              const cartKey = `${prod.id}__${vIdx}`;
              const qtyInCart = cart[cartKey] || 0;
              const discountPct = Math.round(((activeVariant.mrp - activeVariant.price) / activeVariant.mrp) * 100);
              const isWished = wishlist.includes(prod.id);

              return (
                <div key={prod.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex space-x-3">
                  {/* Left Product Photo + Discount Badge */}
                  <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <img src={prod.img} alt={prod.nameEn} className="w-full h-full object-cover" />
                    {discountPct > 0 && (
                      <span className="absolute top-0 left-0 bg-[#689F38] text-white text-[9px] font-black px-1.5 py-0.5 rounded-br-lg">
                        {discountPct}% OFF
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setWishlist((w) => (w.includes(prod.id) ? w.filter((x) => x !== prod.id) : [...w, prod.id]));
                      }}
                      className="absolute bottom-1.5 right-1.5 bg-white/90 p-1 rounded-full shadow"
                    >
                      <Heart className={`h-3.5 w-3.5 ${isWished ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                    </button>
                  </div>

                  {/* Right Info + Pack Size Selector + Add/Counter */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400">{prod.brand}</p>
                      <h3 className="text-xs font-extrabold text-gray-900 leading-snug mt-0.5">{prod.nameEn}</h3>
                      <div className="flex items-center space-x-1 mt-0.5">
                        <span className="bg-emerald-50 text-[#2E7D32] text-[10px] font-black px-1.5 py-0.2 rounded flex items-center">
                          {prod.rating} ★
                        </span>
                        <span className="text-[10px] text-gray-400">({prod.reviews})</span>
                      </div>
                    </div>

                    {/* Pack Size Selector */}
                    <div className="mt-2">
                      <select
                        value={vIdx}
                        onChange={(e) => setSelectedVariants({ ...selectedVariants, [prod.id]: Number(e.target.value) })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-bold text-gray-700 focus:outline-none"
                      >
                        {prod.variants.map((v, idx) => (
                          <option key={v.label} value={idx}>
                            {v.label} — ₹{v.price} (MRP ₹{v.mrp})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price & Live Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div>
                        <span className="text-sm font-black text-gray-900">₹{activeVariant.price}</span>
                        <span className="text-[10px] text-gray-400 line-through ml-1.5">₹{activeVariant.mrp}</span>
                      </div>

                      {qtyInCart === 0 ? (
                        <button
                          onClick={() => updateCartQty(prod, vIdx, 1)}
                          className="bg-[#E53935] hover:bg-[#C62828] text-white text-xs font-black px-4 py-1.5 rounded-lg shadow-sm active:scale-95 transition"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#E53935] text-white rounded-lg overflow-hidden shadow-sm">
                          <button onClick={() => updateCartQty(prod, vIdx, -1)} className="px-2.5 py-1.5 hover:bg-black/10">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-black">{qtyInCart}</span>
                          <button onClick={() => updateCartQty(prod, vIdx, 1)} className="px-2.5 py-1.5 hover:bg-black/10">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
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

{/* =================================================================
          TAB 2: CATEGORIES GRID
         ================================================================= */}
      {tab === 'categories' && (
        <main className="p-4 space-y-3">
          <h2 className="text-base font-black">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Vegetables', emoji: '🍅', sub: 'Farm Fresh Daily' },
              { name: 'Fruits', emoji: '🥭', sub: 'Seasonal & Exotic' },
              { name: 'Leafy Greens', emoji: '🥬', sub: 'Morning Harvest' },
              { name: 'Rice & Staples', emoji: '🌾', sub: 'Nellore Sona Masuri' },
              { name: 'Dairy & Eggs', emoji: '🥛', sub: 'Pure Milk & Country Eggs' },
              { name: 'All', emoji: '🛒', sub: 'Browse Complete Store' },
            ].map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setSelectedCat(c.name);
                  setTab('home');
                }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left space-y-1.5 hover:border-[#689F38]"
              >
                <span className="text-3xl">{c.emoji}</span>
                <h3 className="text-xs font-black text-gray-900">{c.name}</h3>
                <p className="text-[10px] text-gray-500">{c.sub}</p>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* =================================================================
          TAB 3: BIGBASKET CART (WITH FREE DELIVERY PROGRESS BAR & SAVINGS)
         ================================================================= */}
      {tab === 'cart' && (
        <main className="p-4 space-y-3.5 text-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black">My Basket ({totalUnits} items)</h2>
            {cartLines.length > 0 && (
              <button onClick={() => setCart({})} className="text-red-600 font-extrabold">
                Clear Basket
              </button>
            )}
          </div>

          {cartLines.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center space-y-3 shadow-sm">
              <p className="text-sm font-bold text-gray-500">Your Rythu Basket is empty!</p>
              <button onClick={() => setTab('home')} className="bg-[#689F38] text-white font-black px-5 py-2.5 rounded-xl">
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Free Delivery Progress Banner */}
              <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-2xl p-3 space-y-1.5">
                <p className="font-extrabold text-[#1B5E20]">
                  {itemSubtotal >= freeDeliveryTarget
                    ? '🎉 Yay! You unlocked FREE Delivery!'
                    : `Add ₹${freeDeliveryTarget - itemSubtotal} more to unlock FREE Delivery`}
                </p>
                <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#43A047] h-full transition-all"
                    style={{ width: `${Math.min(100, (itemSubtotal / freeDeliveryTarget) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-2.5">
                {cartLines.map((line) => (
                  <div key={line.key} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-2.5 max-w-[62%]">
                      <img src={line.prod.img} alt={line.prod.nameEn} className="h-12 w-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-extrabold text-gray-900 leading-tight">{line.prod.nameEn}</h4>
                        <p className="text-[10px] text-gray-500 font-bold">Pack: {line.variant.label}</p>
                        <p className="font-black text-[#2E7D32] mt-0.5">
                          ₹{line.lineTotal} <span className="text-gray-400 line-through font-normal">₹{line.lineMrp}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center bg-[#E53935] text-white rounded-lg overflow-hidden">
                      <button onClick={() => updateCartQty(line.prod, line.vIdx, -1)} className="px-2.5 py-1.5">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-2.5 font-black">{line.qty}</span>
                      <button onClick={() => updateCartQty(line.prod, line.vIdx, 1)} className="px-2.5 py-1.5">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Savings & Subtotal Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
                <div className="flex justify-between text-emerald-700 font-extrabold">
                  <span>Your Total MRP Savings</span>
                  <span>₹{totalSavings}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span className="font-bold">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-sm font-black text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{itemSubtotal + deliveryCharge}</span>
                </div>
                <button
                  onClick={() => {
                    setPayError('');
                    setTab('checkout');
                  }}
                  className="w-full mt-2 bg-[#E53935] text-white font-black py-3.5 rounded-xl shadow-md text-sm"
                >
                  Proceed to Checkout ➔
                </button>
              </div>
            </>
          )}
        </main>
      )}

{/* =================================================================
          TAB 4: CHECKOUT & WORKING PAYMENTS (PHONEPE, GPAY, PAYTM, QR, CARD, COD)
         ================================================================= */}
      {tab === 'checkout' && (
        <main className="p-4 space-y-3.5 text-xs">
          <div className="flex items-center space-x-2">
            <button onClick={() => setTab('cart')} className="p-2 bg-white rounded-full shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h2 className="text-base font-black">Checkout & Payment</h2>
          </div>

          {/* 1. Delivery Address */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
            <h3 className="font-black text-gray-900">1. Delivery Address</h3>
            {addresses.map((a) => (
              <label key={a.id} className={`block p-2.5 rounded-xl border cursor-pointer ${activeAddrId === a.id ? 'border-[#558B2F] bg-[#F1F8E9]' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-2">
                  <input type="radio" checked={activeAddrId === a.id} onChange={() => setActiveAddrId(a.id)} className="accent-[#558B2F]" />
                  <span className="font-black">{a.tag}</span>
                </div>
                <p className="text-[11px] text-gray-600 pl-5">{a.text}</p>
              </label>
            ))}
            <div className="flex space-x-2 pt-1">
              <input
                type="text"
                value={newAddrText}
                onChange={(e) => setNewAddrText(e.target.value)}
                placeholder="Add another Nellore address..."
                className="flex-1 bg-gray-50 border rounded-xl px-3 py-2 font-semibold"
              />
              <button
                onClick={() => {
                  if (!newAddrText.trim()) return;
                  const id = 'addr_' + Date.now();
                  setAddresses([...addresses, { id, tag: 'Other', text: newAddrText.trim() }]);
                  setActiveAddrId(id);
                  setNewAddrText('');
                }}
                className="bg-gray-900 text-white font-bold px-3 rounded-xl"
              >
                + Add
              </button>
            </div>
          </div>

          {/* 2. Delivery Slot & Coupons */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2.5">
            <h3 className="font-black text-gray-900">2. Delivery Slot & Promo Coupons</h3>
            <select value={deliverySlot} onChange={(e) => setDeliverySlot(e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold">
              <option>Today, 6:00 PM - 8:00 PM</option>
              <option>Tomorrow, 7:00 AM - 9:00 AM</option>
              <option>Tomorrow, 10:00 AM - 1:00 PM</option>
            </select>

            <div className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter Code: RYTHU50 or FRESH20"
                className="flex-1 bg-gray-50 border rounded-xl px-3 py-2 font-black uppercase"
              />
              <button onClick={() => handleApplyCoupon()} className="bg-[#558B2F] text-white font-extrabold px-4 rounded-xl">
                Apply
              </button>
            </div>
            {appliedCoupon && (
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl flex justify-between font-extrabold text-emerald-800">
                <span>🎉 {appliedCoupon.code} Applied (-₹{appliedCoupon.discount})</span>
                <button onClick={() => setAppliedCoupon(null)} className="text-red-600">Remove</button>
              </div>
            )}
          </div>

          {/* 3. WORKING PAYMENT METHODS WITH ORIGINAL BRAND LOGOS */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2.5">
            <h3 className="font-black text-gray-900 text-sm">3. Select Payment Option (Pay ₹{grandTotal})</h3>

            {/* PhonePe */}
            <div className={`rounded-xl border-2 p-3 ${payMethod === 'phonepe' ? 'border-[#5F259F] bg-purple-50/30' : 'border-gray-100'}`}>
              <label onClick={() => setPayMethod('phonepe')} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-3">
                  <PhonePeLogo />
                  <div>
                    <p className="font-black text-gray-900">PhonePe</p>
                    <p className="text-[10px] text-gray-500">Pay instantly via PhonePe UPI</p>
                  </div>
                </div>
                <input type="radio" checked={payMethod === 'phonepe'} onChange={() => setPayMethod('phonepe')} className="accent-[#5F259F] h-4 w-4" />
              </label>
              {payMethod === 'phonepe' && (
                <div className="mt-2.5 pt-2.5 border-t space-y-2">
                  <a href={phonePeLink} className="block w-full bg-[#5F259F] text-white text-center font-extrabold py-2.5 rounded-xl">
                    Open PhonePe & Pay ₹{grandTotal} ↗
                  </a>
                  <input type="text" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} placeholder="Enter PhonePe 12-digit UTR (Optional)" className="w-full bg-white border rounded-xl px-3 py-1.5 text-center font-bold" />
                </div>
              )}
            </div>

            {/* Google Pay */}
            <div className={`rounded-xl border-2 p-3 ${payMethod === 'gpay' ? 'border-[#4285F4] bg-blue-50/30' : 'border-gray-100'}`}>
              <label onClick={() => setPayMethod('gpay')} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-3">
                  <GooglePayLogo />
                  <div>
                    <p className="font-black text-gray-900">Google Pay (GPay)</p>
                    <p className="text-[10px] text-gray-500">Pay via Google Pay UPI</p>
                  </div>
                </div>
                <input type="radio" checked={payMethod === 'gpay'} onChange={() => setPayMethod('gpay')} className="accent-[#4285F4] h-4 w-4" />
              </label>
              {payMethod === 'gpay' && (
                <div className="mt-2.5 pt-2.5 border-t space-y-2">
                  <a href={gpayLink} className="block w-full bg-[#1A73E8] text-white text-center font-extrabold py-2.5 rounded-xl">
                    Open Google Pay & Pay ₹{grandTotal} ↗
                  </a>
                  <input type="text" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} placeholder="Enter GPay UPI Ref ID (Optional)" className="w-full bg-white border rounded-xl px-3 py-1.5 text-center font-bold" />
                </div>
              )}
            </div>

            {/* Paytm */}
            <div className={`rounded-xl border-2 p-3 ${payMethod === 'paytm' ? 'border-[#00BAF2] bg-sky-50/30' : 'border-gray-100'}`}>
              <label onClick={() => setPayMethod('paytm')} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-3">
                  <PaytmLogo />
                  <div>
                    <p className="font-black text-gray-900">Paytm</p>
                    <p className="text-[10px] text-gray-500">Pay via Paytm UPI / Wallet</p>
                  </div>
                </div>
                <input type="radio" checked={payMethod === 'paytm'} onChange={() => setPayMethod('paytm')} className="accent-[#00BAF2] h-4 w-4" />
              </label>
              {payMethod === 'paytm' && (
                <div className="mt-2.5 pt-2.5 border-t space-y-2">
                  <a href={paytmLink} className="block w-full bg-[#00BAF2] text-[#002970] text-center font-black py-2.5 rounded-xl">
                    Open Paytm & Pay ₹{grandTotal} ↗
                  </a>
                  <input type="text" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} placeholder="Enter Paytm Ref ID (Optional)" className="w-full bg-white border rounded-xl px-3 py-1.5 text-center font-bold" />
                </div>
              )}
            </div>

            {/* Scan QR Code */}
            <div className={`rounded-xl border-2 p-3 ${payMethod === 'qr' ? 'border-[#558B2F] bg-[#F1F8E9]' : 'border-gray-100'}`}>
              <label onClick={() => setPayMethod('qr')} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="h-7 w-7 rounded-lg bg-emerald-100 text-[#2E7D32] flex items-center justify-center"><QrCode className="h-4 w-4" /></span>
                  <div>
                    <p className="font-black text-gray-900">Scan QR Code (Any UPI App)</p>
                    <p className="text-[10px] text-gray-500">UPI ID: {upiId}</p>
                  </div>
                </div>
                <input type="radio" checked={payMethod === 'qr'} onChange={() => setPayMethod('qr')} className="accent-[#558B2F] h-4 w-4" />
              </label>
              {payMethod === 'qr' && (
                <div className="mt-2.5 pt-2.5 border-t text-center space-y-2">
                  <img src={qrUrl} alt="QR" className="w-32 h-32 mx-auto rounded-xl border p-1 bg-white" />
                  <a href={genericUpi} className="inline-block text-[#2E7D32] font-extrabold underline">
                    Or Tap to Open Other UPI Apps ↗
                  </a>
                </div>
              )}
            </div>

            {/* Credit / Debit Card */}
            <div className={`rounded-xl border-2 p-3 ${payMethod === 'card' ? 'border-slate-800 bg-slate-50' : 'border-gray-100'}`}>
              <label onClick={() => setPayMethod('card')} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-3">
                  <CardBrandLogo />
                  <div>
                    <p className="font-black text-gray-900">Credit / Debit Card</p>
                    <p className="text-[10px] text-gray-500">Visa, Mastercard, RuPay</p>
                  </div>
                </div>
                <input type="radio" checked={payMethod === 'card'} onChange={() => setPayMethod('card')} className="accent-slate-800 h-4 w-4" />
              </label>
              {payMethod === 'card' && (
                <div className="mt-3 pt-2.5 border-t space-y-2">
                  <input
                    type="text"
                    maxLength={19}
                    value={cardNum}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                      setCardNum(raw.replace(/(\d{4})(?=\d)/g, '$1 '));
                    }}
                    placeholder="Card Number (16 digits)"
                    className="w-full bg-white border rounded-xl px-3 py-2 font-bold tracking-wider"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      maxLength={5}
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      placeholder="Expiry (MM/YY)"
                      className="bg-white border rounded-xl px-3 py-2 font-bold"
                    />
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="CVV"
                      className="bg-white border rounded-xl px-3 py-2 font-bold"
                    />
                  </div>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Cardholder Name"
                    className="w-full bg-white border rounded-xl px-3 py-2 font-bold"
                  />
                </div>
              )}
            </div>

{/* Cash on Delivery */}
            <div className={`rounded-xl border-2 p-3 ${payMethod === 'cod' ? 'border-[#558B2F] bg-[#F1F8E9]' : 'border-gray-100'}`}>
              <label onClick={() => setPayMethod('cod')} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="h-7 w-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center"><Wallet className="h-4 w-4" /></span>
                  <div>
                    <p className="font-black text-gray-900">Cash on Delivery (COD)</p>
                    <p className="text-[10px] text-gray-500">Pay cash/UPI when order arrives</p>
                  </div>
                </div>
                <input type="radio" checked={payMethod === 'cod'} onChange={() => setPayMethod('cod')} className="accent-[#558B2F] h-4 w-4" />
              </label>
            </div>

            {payError && <p className="text-xs font-extrabold text-red-600">{payError}</p>}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#E53935] text-white font-black py-3.5 rounded-2xl shadow-lg text-sm"
          >
            Pay & Place Order • ₹{grandTotal}
          </button>
        </main>
      )}

      {/* =================================================================
          TAB 5: LIVE ORDER TRACKING & WHATSAPP INVOICE
         ================================================================= */}
      {tab === 'tracking' && (trackingOrder || orders[0]) && (() => {
        const ord = trackingOrder || orders[0];
        const waText = `RYTHU BASKET INVOICE\nOrder: ${ord.id}\nTotal: ₹${ord.total}\nPayment: ${ord.payment}\nItems: ${ord.items.join(', ')}`;
        return (
          <main className="p-4 space-y-3 text-xs">
            <div className="bg-[#2E7D32] text-white rounded-2xl p-4 shadow">
              <span className="bg-white/20 text-[10px] font-black px-2 py-0.5 rounded">ORDER CONFIRMED</span>
              <h2 className="text-lg font-black mt-1">Order {ord.id}</h2>
              <p className="text-emerald-100">Slot: {ord.slot} • Delivery OTP: <strong className="text-yellow-300">{ord.otp}</strong></p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2.5">
              {['Order Placed', 'Packed at Nellore Hub', 'Out for Delivery', 'Delivered'].map((st, idx) => (
                <div key={st} className="flex items-center space-x-3">
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black ${idx <= 2 ? 'bg-[#43A047] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    ✓
                  </span>
                  <span className="font-extrabold">{st}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-bold">Delivery Partner</p>
                <p className="font-black text-sm">{ord.driver}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=14.4426,79.9865" target="_blank" rel="noreferrer" className="text-blue-600 font-extrabold underline">
                  📍 Track Live on Google Maps ↗
                </a>
              </div>
              <a href="tel:9848012345" className="p-3 bg-emerald-50 text-[#2E7D32] rounded-full">
                <Phone className="h-4 w-4" />
              </a>
            </div>

            <a
              href={`https://wa.me/918328261103?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-[#25D366] text-white text-center font-black py-3 rounded-2xl shadow"
            >
              📲 Send Digital Invoice on WhatsApp
            </a>
          </main>
        );
      })()}

      {/* =================================================================
          TAB 6: MY ORDERS (REORDER + TRACK + CANCEL)
         ================================================================= */}
      {tab === 'orders' && (
        <main className="p-4 space-y-3 text-xs">
          <h2 className="text-base font-black">My Orders ({orders.length})</h2>
          {orders.map((ord) => (
            <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
              <div className="flex justify-between font-black">
                <span>{ord.id} • {ord.status}</span>
                <span className="text-[#2E7D32]">₹{ord.total}</span>
              </div>
              <p className="text-gray-600">{ord.items.join(', ')}</p>
              <p className="text-[10px] font-bold text-gray-400">{ord.date} • {ord.payment}</p>
              <div className="flex space-x-2 pt-1">
                <button
                  onClick={() => {
                    setTrackingOrder(ord);
                    setTab('tracking');
                  }}
                  className="flex-1 bg-[#E8F5E9] text-[#2E7D32] font-extrabold py-2 rounded-xl"
                >
                  Track Order
                </button>
                <button
                  onClick={() => {
                    setCart({ tomato__1: 1, onion__0: 1 });
                    setTab('cart');
                    showToast('Items added to Basket!');
                  }}
                  className="flex-1 bg-[#558B2F] text-white font-extrabold py-2 rounded-xl"
                >
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </main>
      )}

{/* BIGBASKET FLOATING GREEN CART BAR */}
      {totalUnits > 0 && tab !== 'cart' && tab !== 'checkout' && (
        <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-3.5 z-40">
          <button
            onClick={() => setTab('cart')}
            className="w-full bg-[#33691E] text-white px-4 py-3 rounded-2xl flex items-center justify-between shadow-xl"
          >
            <div className="text-left">
              <p className="text-xs font-black">{totalUnits} Items • ₹{itemSubtotal}</p>
              <p className="text-[10px] text-lime-200">You saved ₹{totalSavings} on this basket!</p>
            </div>
            <span className="bg-white text-[#33691E] text-xs font-black px-3.5 py-1.5 rounded-xl">
              View Basket ➔
            </span>
          </button>
        </div>
      )}

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center z-40">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'categories', icon: Grid, label: 'Categories' },
          { id: 'cart', icon: ShoppingCart, label: 'Basket', badge: totalUnits },
          { id: 'orders', icon: ClipboardList, label: 'My Orders' },
        ].map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex flex-col items-center text-[10px] font-extrabold ${active ? 'text-[#558B2F]' : 'text-gray-400'}`}
            >
              <div className="relative">
                <Icon className="h-5 w-5 mb-0.5" />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#E53935] text-white text-[9px] font-black h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}