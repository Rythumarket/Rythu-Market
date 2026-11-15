import React, { useState } from 'react';
import {
  Search, Mic, Heart, Bell, ShoppingCart, Plus, Minus, Home, Grid,
  ClipboardList, User, MapPin, Phone, Sprout, Store, Truck, ShieldCheck,
  ChevronRight, ArrowLeft, CheckCircle2, Lock, LogOut,
  Camera, Warehouse, Wallet, Navigation, Star,
  QrCode, Barcode, AlertTriangle, CreditCard,
  Eye, EyeOff, Trash2
} from 'lucide-react';

const IMG = {
  tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
  onion: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=400&q=80',
  potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
  spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
  mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
  banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
  milk: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80',
  eggs: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80',
  farmerHero: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80',
  shopHero: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
  deliveryHero: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80',
};

const INITIAL_PRODUCTS = [
  { id: 'p1', nameEn: 'Fresh Tomato (Grade A)', nameTe: 'తాజా టమాటా', cat: 'Vegetables', tier: 'Local', price: 40, unit: 'kg', rating: 4.5, reviews: 12, stock: 120, seller: 'Ramaiah Garu (Kaligiri)', img: IMG.tomato, desc: 'Fresh and juicy country tomatoes harvested directly from Kaligiri & Kovur farms.' },
  { id: 'p2', nameEn: 'Organic Tomato', nameTe: 'సేంద్రీయ టమాటా', cat: 'Vegetables', tier: 'Premium', price: 50, unit: 'kg', rating: 4.8, reviews: 24, stock: 80, seller: 'Ramaiah Garu (Kaligiri)', img: IMG.tomato, desc: '100% chemical-free organic tomatoes grown with natural compost.' },
  { id: 'p3', nameEn: 'Red Onion', nameTe: 'ఉల్లిపాయలు', cat: 'Vegetables', tier: 'Local', price: 30, unit: 'kg', rating: 4.4, reviews: 19, stock: 350, seller: 'Sri Venkateswara Traders', img: IMG.onion, desc: 'Crisp red onions ideal for daily cooking and bulk orders.' },
  { id: 'p4', nameEn: 'Farm Potato', nameTe: 'బంగాళాదుంప', cat: 'Vegetables', tier: 'Local', price: 28, unit: 'kg', rating: 4.3, reviews: 15, stock: 400, seller: 'Sri Venkateswara Traders', img: IMG.potato, desc: 'Clean, starchy farm potatoes graded for retail & household use.' },
  { id: 'p5', nameEn: 'Fresh Palakura (Spinach)', nameTe: 'పాలకూర', cat: 'Leafy Greens', tier: 'Local', price: 18, unit: 'bunch', rating: 4.7, reviews: 31, stock: 8, seller: 'Padma Farms (Nellore)', img: IMG.spinach, desc: 'Morning-harvested tender green spinach bunches.' },
  { id: 'p6', nameEn: 'Banganapalli Mangoes', nameTe: 'బంగినపల్లి మామిడి', cat: 'Fruits', tier: 'Premium', price: 110, unit: 'kg', rating: 4.9, reviews: 42, stock: 95, seller: 'Rapur Orchards', img: IMG.mango, desc: 'Sweet, naturally ripened Banganapalli mangoes from Nellore district.' },
  { id: 'p7', nameEn: 'Sweet Bananas', nameTe: 'అరటిపండ్లు', cat: 'Fruits', tier: 'Local', price: 45, unit: 'dozen', rating: 4.6, reviews: 18, stock: 60, seller: 'Kavali Banana Farms', img: IMG.banana, desc: 'Farm-fresh yellow bananas rich in natural energy.' },
  { id: 'p8', nameEn: 'Farm Fresh Milk', nameTe: 'చిక్కటి పాలు', cat: 'Dairy & Eggs', tier: 'Local', price: 68, unit: 'L', rating: 4.8, reviews: 50, stock: 45, seller: 'Kovur Dairy Farm', img: IMG.milk, desc: 'Pure, unadulterated morning buffalo milk.' },
  { id: 'p9', nameEn: 'Country Eggs (6 pcs)', nameTe: 'నాటు కోడి గుడ్లు', cat: 'Dairy & Eggs', tier: 'Premium', price: 54, unit: 'pack', rating: 4.7, reviews: 27, stock: 6, seller: 'Rapur Poultry', img: IMG.eggs, desc: 'Free-range country hen eggs with rich nutrition.' },
];

// ORIGINAL BRAND LOGOS FOR PHONEPE, GOOGLE PAY, PAYTM & CARDS
const PhonePeLogo = () => (
  <svg viewBox="0 0 36 36" className="h-7 w-7 flex-shrink-0">
    <rect width="36" height="36" rx="9" fill="#5F259F" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="sans-serif">
      पे
    </text>
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
    <text x="50%" y="53%" dominantBaseline="middle" textAnchor="middle" fill="#002970" fontSize="9.5" fontWeight="900" fontFamily="sans-serif">
      Paytm
    </text>
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
  const [lang, setLang] = useState('en');
  const [activeRole, setActiveRole] = useState(null);
  const [subScreen, setSubScreen] = useState('splash');

  // Shared Store & State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [wishlist, setWishlist] = useState(['p1', 'p6']);
  const [cart, setCart] = useState({ p1: 1, p3: 1 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  // Customer Addresses, Checkout & Coupons
  const [addresses, setAddresses] = useState([
    { id: 'a1', label: 'Home (Default)', line: '123, Green Park, Vedayapalem, Nellore - 524004' },
    { id: 'a2', label: 'Office', line: 'Magunta Layout Main Road, Nellore - 524003' },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState('a1');
  const [newAddressInput, setNewAddressInput] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Today, 6 PM – 8 PM');
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

// Payment States (PhonePe, Google Pay, Paytm, QR, Card, COD)
  const [paymentMethod, setPaymentMethod] = useState('phonepe'); // 'phonepe' | 'gpay' | 'paytm' | 'qr' | 'card' | 'cod'
  const [upiRefInput, setUpiRefInput] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [merchantUpiId] = useState('8328261103@ybl');

  // Orders List
  const [orders, setOrders] = useState([
    { id: 'RB123456', customerName: 'Sundar Reddy', phone: '9876543210', address: 'Flat No. 302, Green Park, Nellore', itemsSummary: 'Fresh Tomato (1 kg), Red Onion (1 kg)', total: 70, paymentInfo: 'PhonePe UPI', distanceKm: 2.5, deliveryFee: 25, pickupOtp: '4821', deliveryOtp: '9304', status: 'Out for Delivery', date: 'Today, 5:30 PM', driver: 'Ramesh Kumar', rating: 0 },
    { id: 'RB123455', customerName: 'Lakshmi Prasad', phone: '9848012345', address: 'Magunta Layout, Nellore', itemsSummary: 'Banganapalli Mangoes (2 kg)', total: 220, paymentInfo: 'Google Pay', distanceKm: 3.2, deliveryFee: 30, pickupOtp: '1122', deliveryOtp: '7744', status: 'Delivered', date: 'Delivered on 12 Nov', driver: 'Ramesh Kumar', rating: 5 },
  ]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderTabFilter, setOrderTabFilter] = useState('All');

  // Auth / Sign Up Form States
  const [authPhone, setAuthPhone] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authExtra, setAuthExtra] = useState('');
  const [authVehicle, setAuthVehicle] = useState('Bike / Scooter');
  const [authOtpMode, setAuthOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Farmer States
  const [farmerTab, setFarmerTab] = useState('Active');
  const [listStep, setListStep] = useState(1);
  const [listCrop, setListCrop] = useState('Tomato');
  const [listQty, setListQty] = useState('100');
  const [listPrice, setListPrice] = useState('18');
  const [listPhoto, setListPhoto] = useState(IMG.tomato);
  const [pickupDate, setPickupDate] = useState('Tomorrow, 7:00 AM');
  const [farmerBank, setFarmerBank] = useState('UPI: 9440112233@ybl | SBI A/C: 30981234567');
  const [negotiations, setNegotiations] = useState([
    { id: 'neg1', buyer: 'Sri Venkateswara Traders', crop: 'Tomato (200 kg)', ask: 20, offer: 18, status: 'Pending' },
  ]);

  // Wholesale & Retail States
  const [bulkUnit, setBulkUnit] = useState('KG');
  const [retailTab, setRetailTab] = useState('New');
  const [newProdName, setNewProdName] = useState('');
  const [newProdCat, setNewProdCat] = useState('Vegetables');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');
  const [newProdPhoto, setNewProdPhoto] = useState('');
  const [barcodeScanned, setBarcodeScanned] = useState('');

  // Delivery Partner States
  const [isOnline, setIsOnline] = useState(true);
  const [deliveryOtpInput, setDeliveryOtpInput] = useState('');
  const [deliveryProofPhoto, setDeliveryProofPhoto] = useState('');
  const [walletBalance, setWalletBalance] = useState(2450);

  // Admin Shops Approval
  const [shopsList, setShopsList] = useState([
    { id: 's1', name: 'Sri Venkateswara Wholesale', type: 'Wholesale', owner: 'M. Subba Rao', phone: '9989334455', gst: '37AABCS1429B1Z5', approved: true },
    { id: 's2', name: 'Sri Lakshmi Super Market', type: 'Retail', owner: 'S. Venkatesh', phone: '9849223344', gst: '37AAJCS8812K1Z2', approved: true },
    { id: 's3', name: 'Kovur Fresh Agro Mart', type: 'Retail', owner: 'P. Sudhakar', phone: '9000112233', gst: '37AAKCS9921M1Z9', approved: false },
  ]);

  const notify = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2800);
  };

  // Accurate Quantity Add / Increment / Decrement with Clear Feedback
  const handleAddOrIncrement = (p) => {
    const nextQty = (cart[p.id] || 0) + 1;
    setCart((prev) => ({ ...prev, [p.id]: nextQty }));
    notify(`🛒 ${p.nameEn}: ${nextQty} ${p.unit} in Cart (₹${p.price * nextQty})`);
  };

  const handleDecrement = (p) => {
    const current = cart[p.id] || 0;
    if (current <= 1) {
      setCart((prev) => {
        const copy = { ...prev };
        delete copy[p.id];
        return copy;
      });
      notify(`Removed ${p.nameEn} from Cart`);
    } else {
      const nextQty = current - 1;
      setCart((prev) => ({ ...prev, [p.id]: nextQty }));
      notify(`🛒 ${p.nameEn}: ${nextQty} ${p.unit} in Cart (₹${p.price * nextQty})`);
    }
  };

  const selectRole = (role) => {
    setActiveRole(role);
    setAuthOtpMode(false);
    setSubScreen('splash');
  };

  const handlePhotoChange = (e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result);
    reader.readAsDataURL(file);
  };

  // Cart Totals
  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const prod = products.find((p) => p.id === id);
    return sum + (prod ? prod.price * qty : 0);
  }, 0);
  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount);

  // Payment URIs & Dynamic QR
  const encodedMerchant = encodeURIComponent('Rythu Basket Nellore');
  const genericUpiUri = `upi://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodedMerchant}&am=${finalTotal}&cu=INR`;
  const phonePeUri = `phonepe://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodedMerchant}&am=${finalTotal}&cu=INR`;
  const gpayUri = `tez://upi/pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodedMerchant}&am=${finalTotal}&cu=INR`;
  const paytmUri = `paytmmp://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodedMerchant}&am=${finalTotal}&cu=INR`;
  const dynamicQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(genericUpiUri)}`;

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const sendWhatsAppInvoice = (ord) => {
    const text =
      `*RYTHU BASKET - INVOICE*\nOrder ID: ${ord.id}\nCustomer: ${ord.customerName}\nItems: ${ord.itemsSummary}\nTotal: ₹${ord.total}\nPayment: ${ord.paymentInfo || 'Paid'}\nStatus: ${ord.status}`;
    window.open(`https://wa.me/91${ord.phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Reusable Quantity Stepper Button (Shows `- 2 +` once added!)
  const QuantityControl = ({ product }) => {
    const qty = cart[product.id] || 0;
    if (qty === 0) {
      return (
        <button
          onClick={() => handleAddOrIncrement(product)}
          className="bg-[#167A37] hover:bg-[#11602B] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl shadow-sm active:scale-95 transition"
        >
          Add +
        </button>
      );
    }
    return (
      <div className="flex items-center bg-[#167A37] text-white rounded-xl px-1.5 py-1 space-x-2 shadow-sm">
        <button onClick={() => handleDecrement(product)} className="p-0.5 hover:bg-white/20 rounded">
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="text-xs font-black min-w-[16px] text-center">{qty}</span>
        <button onClick={() => handleAddOrIncrement(product)} className="p-0.5 hover:bg-white/20 rounded">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  };

// =========================================================================
  // ROLE LAUNCHER GATE (UNCHANGED LOGO + ALL ROLE APPS)
  // =========================================================================
  if (!activeRole) {
    const roleCards = [
      { id: 'customer', title: 'Customer App', te: 'వినియోగదారుల యాప్', desc: '14 Screens • Splash, Browse, Live Qty Cart, Checkout, UPI/Card Payments', icon: ShoppingCart, badge: 'B2C Store', bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
      { id: 'farmer', title: 'Farmers App', te: 'రైతుల యాప్', desc: '14 Screens • List Produce, Photo Upload, Mandi Rates, Earnings, Negotiation', icon: Sprout, badge: 'Farm Direct', bg: 'bg-lime-50 border-lime-200 text-lime-800' },
      { id: 'wholesale', title: 'Wholesale Store App', te: 'హోల్‌సేల్ స్టోర్', desc: 'Bulk Orders (KG/Quintal/Ton), Price Comparison, GST Invoice, Credit', icon: Warehouse, badge: 'B2B Bulk', bg: 'bg-amber-50 border-amber-200 text-amber-800' },
      { id: 'retail', title: 'Retail Store App', te: 'రిటైల్ స్టోర్', desc: 'Add Products, Barcode Scan, Wholesale/Farmer Buy, P&L, Digital Billing', icon: Store, badge: 'POS & Shop', bg: 'bg-orange-50 border-orange-200 text-orange-800' },
      { id: 'delivery', title: 'Delivery Partner App', te: 'డెలివరీ పార్టనర్', desc: '14 Screens • Online/Offline, Today Earnings, OTP & Proof Photo, Maps', icon: Truck, badge: 'Fleet App', bg: 'bg-sky-50 border-sky-200 text-sky-800' },
      { id: 'admin', title: 'Master Admin Control', te: 'అడ్మిన్ కంట్రోల్', desc: 'Verify Shops, Approve Listings, Live Orders & Platform Rules', icon: ShieldCheck, badge: 'Admin HQ', bg: 'bg-purple-50 border-purple-200 text-purple-800' },
    ];

    return (
      <div className="min-h-screen bg-[#F5F9F5] max-w-md mx-auto font-sans text-gray-800 shadow-2xl pb-8">
        <div className="bg-gradient-to-br from-[#0F6B2F] to-[#238E43] text-white rounded-b-[32px] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* YOUR EXACT UNCHANGED LOGO */}
              <div className="h-14 w-14 rounded-full bg-white p-0.5 shadow border-2 border-yellow-300 overflow-hidden">
                <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight">Rythu Basket</h1>
                <p className="text-xs text-emerald-100 font-medium">Fresh from Farmers... Healthy for You...</p>
              </div>
            </div>
            <button
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="bg-white/20 text-white text-xs font-extrabold px-3 py-1.5 rounded-full"
            >
              {lang === 'en' ? 'తెలుగు' : 'English'}
            </button>
          </div>
          <p className="text-xs text-emerald-50 mt-4 font-semibold">
            Select an App Module below:
          </p>
        </div>

        <div className="px-4 pt-5 space-y-3">
          {roleCards.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => selectRole(r.id)}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-[#167A37] flex items-center justify-between text-left transition active:scale-[0.99]"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${r.bg}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-sm font-black text-gray-900">{lang === 'te' ? r.te : r.title}</h2>
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-[#167A37]">
                        {r.badge}
                      </span>
                    </div>
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
  // 1. SPLASH SCREEN (WITH YOUR EXACT UNCHANGED LOGO)
  // =========================================================================
  if (subScreen === 'splash') {
    const splashMeta = {
      customer: { tagline: 'Fresh from Farmers... Healthy for You...', hero: IMG.farmerHero, btn: 'Start Shopping' },
      farmer: { tagline: 'Grow • Sell • Prosper', hero: IMG.farmerHero, btn: 'Enter Farmer Portal' },
      wholesale: { tagline: 'Wholesale Partner • Grow Together...', hero: IMG.shopHero, btn: 'Enter Wholesale Store' },
      retail: { tagline: 'Retail Partner • Fresh & Local...', hero: IMG.shopHero, btn: 'Enter Retail Store' },
      delivery: { tagline: 'Delivery Partner • Deliver Freshness, Earn More...', hero: IMG.deliveryHero, btn: 'Start Delivering' },
      admin: { tagline: 'Master Admin • Nellore Operations', hero: IMG.farmerHero, btn: 'Admin Login' },
    }[activeRole];

    return (
      <div className="min-h-screen max-w-md mx-auto relative flex flex-col justify-between overflow-hidden shadow-2xl font-sans">
        <img src={splashMeta.hero} alt="Splash" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/90 via-white/80 to-[#0E5A27]/95" />

        <div className="relative z-10 pt-6 px-5 flex justify-between items-center">
          <button onClick={() => setActiveRole(null)} className="bg-white/90 text-gray-800 text-xs font-extrabold px-3 py-1.5 rounded-full shadow">
            ← All Apps
          </button>
          <button onClick={() => setLang(lang === 'en' ? 'te' : 'en')} className="bg-white/90 text-[#167A37] text-xs font-extrabold px-3 py-1.5 rounded-full shadow">
            {lang === 'en' ? 'తెలుగు' : 'EN'}
          </button>
        </div>

        <div className="relative z-10 text-center px-6 my-auto">
          <div className="h-24 w-24 rounded-full bg-white p-1 shadow-xl mx-auto mb-4 border-2 border-[#167A37] overflow-hidden">
            <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
          </div>
          <h1 className="text-3xl font-black text-[#11652D] tracking-tight">Rythu Basket</h1>
          <p className="text-sm font-extrabold text-gray-800 mt-1">{splashMeta.tagline}</p>
        </div>

        <div className="relative z-10 p-6 space-y-3 text-center">
          <button
            onClick={() => setSubScreen('login')}
            className="w-full bg-[#167A37] hover:bg-[#0F5927] text-white font-black py-3.5 rounded-2xl shadow-xl text-sm transition"
          >
            {splashMeta.btn} ➔
          </button>
          <div className="flex justify-center space-x-1.5">
            <span className="h-2 w-5 rounded-full bg-white"></span>
            <span className="h-2 w-2 rounded-full bg-white/50"></span>
            <span className="h-2 w-2 rounded-full bg-white/50"></span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. LOGIN & 3. SIGN UP SCREENS
  // =========================================================================
  if (subScreen === 'login' || subScreen === 'signup') {
    const defaultAfterLogin =
      activeRole === 'customer'
        ? 'home'
        : activeRole === 'farmer'
        ? 'farmerHome'
        : activeRole === 'wholesale'
        ? 'wholesaleDash'
        : activeRole === 'retail'
        ? 'retailDash'
        : activeRole === 'delivery'
        ? 'deliveryDash'
        : 'adminDash';

    const roleTitles = {
      customer: { login: 'Welcome Back!', sub: 'Sign in to continue', signup: 'Create Account', signupSub: 'Join Rythu Basket' },
      farmer: { login: 'Welcome Farmer!', sub: 'Sign in to continue', signup: 'Join Rythu Basket', signupSub: 'Be a Proud Farmer' },
      wholesale: { login: 'Welcome Back!', sub: 'Login to wholesale store', signup: 'Join Rythu Basket Wholesale', signupSub: 'Store / Distributor Registration' },
      retail: { login: 'Welcome Back!', sub: 'Login to Retail Store', signup: 'Join Rythu Basket Retail Store', signupSub: 'Shop / Retailer Registration' },
      delivery: { login: 'Delivery Partner', sub: 'Login to continue', signup: 'Join Rythu Basket Delivery Partner', signupSub: 'Register with Driving License' },
      admin: { login: 'Master Admin Login', sub: 'Nellore HQ Control', signup: 'Admin Access', signupSub: 'Authorized Personnel Only' },
    }[activeRole];

    return (
      <div className="min-h-screen bg-white max-w-md mx-auto font-sans text-gray-800 shadow-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <button onClick={() => setSubScreen(subScreen === 'signup' ? 'login' : 'splash')} className="p-2 bg-gray-100 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button onClick={() => setActiveRole(null)} className="text-xs font-bold text-[#167A37]">
              Switch Role
            </button>
          </div>

          <div className="text-center mt-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-emerald-50 p-0.5 mx-auto mb-2 border border-emerald-200 overflow-hidden">
              <img src="/icon-512.png" alt="Logo" className="h-full w-full object-cover rounded-full" />
            </div>
            <h1 className="text-xl font-black text-gray-900">
              {subScreen === 'login' ? roleTitles.login : roleTitles.signup}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {subScreen === 'login' ? roleTitles.sub : roleTitles.signupSub}
            </p>
          </div>

          {subScreen === 'login' ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubScreen(defaultAfterLogin);
              }}
              className="space-y-3.5 text-xs"
            >
              <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-3 bg-gray-50">
                <Phone className="h-4 w-4 text-gray-400 mr-2.5" />
                <input
                  type="tel"
                  required
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  placeholder="Mobile Number (e.g., 9876543210)"
                  className="w-full bg-transparent font-bold focus:outline-none"
                />
              </div>

              {!authOtpMode ? (
                <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-3 bg-gray-50">
                  <Lock className="h-4 w-4 text-gray-400 mr-2.5" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={authPass}
                    onChange={(e) => setAuthPass(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-transparent font-bold focus:outline-none"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="bg-emerald-50 text-[#167A37] font-black p-2 rounded-xl text-center">
                    Demo OTP Sent: 4829
                  </div>
                  <input
                    type="tel"
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 4-Digit OTP"
                    className="w-full border border-emerald-300 rounded-xl py-3 text-center text-base font-black tracking-[0.4em]"
                  />
                </div>
              )}

              <button type="submit" className="w-full bg-[#167A37] text-white font-black py-3.5 rounded-xl shadow-md text-sm">
                Login
              </button>

              <div className="text-center text-gray-400 font-bold">or</div>

              <button
                type="button"
                onClick={() => setSubScreen(defaultAfterLogin)}
                className="w-full border border-gray-200 bg-white text-gray-800 font-extrabold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-sm"
              >
                <span className="text-blue-600 font-black text-sm">G</span>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthOtpMode(!authOtpMode)}
                className="w-full border border-emerald-200 bg-emerald-50/50 text-[#167A37] font-extrabold py-3 rounded-xl"
              >
                {authOtpMode ? 'Use Password Instead' : 'Continue with OTP'}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setSubScreen('signup')}
                  className="text-xs font-extrabold text-[#167A37] underline"
                >
                  Create New Account / Sign Up
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubScreen(defaultAfterLogin);
              }}
              className="space-y-3 text-xs"
            >
              <input type="text" required value={authName} onChange={(e) => setAuthName(e.target.value)} placeholder="Full Name / Store Name *" className="w-full bg-gray-50 border rounded-xl px-3.5 py-3 font-bold" />
              <input type="tel" required value={authPhone} onChange={(e) => setAuthPhone(e.target.value)} placeholder="Mobile Number *" className="w-full bg-gray-50 border rounded-xl px-3.5 py-3 font-bold" />
              {activeRole !== 'customer' && (
                <input
                  type="text"
                  required
                  value={authExtra}
                  onChange={(e) => setAuthExtra(e.target.value)}
                  placeholder={activeRole === 'farmer' ? 'Village (e.g., Kaligiri) *' : activeRole === 'delivery' ? 'Driving License Number *' : 'GST Number & Address *'}
                  className="w-full bg-gray-50 border rounded-xl px-3.5 py-3 font-bold"
                />
              )}
              {activeRole === 'delivery' && (
                <select value={authVehicle} onChange={(e) => setAuthVehicle(e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3.5 py-3 font-bold">
                  <option>Bike / Scooter</option>
                  <option>Auto / Mini Van</option>
                </select>
              )}
              <input type="password" required value={authPass} onChange={(e) => setAuthPass(e.target.value)} placeholder="Create Password *" className="w-full bg-gray-50 border rounded-xl px-3.5 py-3 font-bold" />
              <button type="submit" className="w-full bg-[#167A37] text-white font-black py-3.5 rounded-xl shadow-md text-sm">
                Sign Up & Continue
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  const ToastBanner = () =>
    toastMsg ? (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#11652D] text-white text-xs font-extrabold px-4 py-2.5 rounded-full shadow-xl whitespace-nowrap">
        {toastMsg}
      </div>
    ) : null;

// =========================================================================
  // ROLE A: CUSTOMER APP (1000043644_2.png EXACT UI + LIVE QTY + WORKING PAYMENTS)
  // =========================================================================
  if (activeRole === 'customer') {
    const filteredCustomerProducts = products.filter((p) => {
      const catMatch = selectedCategory === 'All' || p.cat === selectedCategory;
      const tierMatch = tierFilter === 'All' || p.tier === tierFilter;
      const q = searchQuery.toLowerCase();
      return catMatch && tierMatch && (p.nameEn.toLowerCase().includes(q) || p.nameTe.includes(q));
    });

    const currentAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

    const handleCompleteCustomerOrder = () => {
      setPaymentError('');
      if (paymentMethod === 'card') {
        const digits = cardNumber.replace(/\s+/g, '');
        if (digits.length < 12 || !cardExpiry.trim() || cardCvv.length < 3 || !cardHolder.trim()) {
          setPaymentError('Please enter valid Card Number, Expiry (MM/YY), CVV, and Cardholder Name.');
          return;
        }
      }

      const payNames = {
        phonepe: 'PhonePe UPI',
        gpay: 'Google Pay (GPay)',
        paytm: 'Paytm UPI',
        qr: 'UPI QR Scan',
        card: `Card ending •••• ${cardNumber.replace(/\s+/g, '').slice(-4) || '4242'}`,
        cod: 'Cash on Delivery (COD)',
      };

      const itemSummaryList = Object.entries(cart)
        .map(([id, qty]) => {
          const item = products.find((p) => p.id === id);
          return item ? `${item.nameEn} (${qty} ${item.unit})` : '';
        })
        .filter(Boolean)
        .join(', ');

      const newOrd = {
        id: 'RB' + Math.floor(123457 + Math.random() * 800),
        customerName: authName || 'Customer',
        phone: authPhone || '9876543210',
        address: currentAddr.line,
        itemsSummary: itemSummaryList,
        total: finalTotal,
        paymentInfo: `${payNames[paymentMethod]}${upiRefInput.trim() ? ` (UTR: ${upiRefInput.trim()})` : ''}`,
        distanceKm: 2.8,
        deliveryFee: 25,
        pickupOtp: '4821',
        deliveryOtp: '9304',
        status: 'Confirmed',
        date: 'Just now',
        driver: 'Ramesh Kumar',
        rating: 0,
      };

      setOrders([newOrd, ...orders]);
      setActiveOrder(newOrd);
      setCart({});
      setAppliedDiscount(0);
      setUpiRefInput('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
      setCardHolder('');
      setSubScreen('orderPlaced');
    };

    return (
      <div className="min-h-screen bg-[#F5F8F5] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
        <ToastBanner />

        {/* 4. CUSTOMER HOME (EXACT 1000043644_2.png LAYOUT) */}
        {subScreen === 'home' && (
          <div className="p-4 space-y-4">
            {/* Top Bar with Your Unchanged Logo, Location, Language & Wishlist */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-9 w-9 rounded-full bg-white p-0.5 shadow border border-[#167A37] overflow-hidden">
                  <img src="/icon-512.png" alt="Logo" className="h-full w-full object-cover rounded-full" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold">Deliver to</p>
                  <p className="text-xs font-black text-gray-900">Nellore • Vedayapalem ▾</p>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <button onClick={() => setLang(lang === 'en' ? 'te' : 'en')} className="bg-emerald-50 text-[#167A37] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-200">
                  {lang === 'en' ? 'తెలుగు' : 'EN'}
                </button>
                <button onClick={() => setSubScreen('wishlist')} className="p-2 bg-white rounded-full shadow-sm relative">
                  <Heart className="h-4 w-4 text-rose-500" />
                  <span className="text-[9px] font-black absolute -top-1 -right-1 bg-rose-500 text-white rounded-full px-1">{wishlist.length}</span>
                </button>
                <button onClick={() => setActiveRole(null)} className="p-2 bg-white rounded-full shadow-sm" title="Switch App">
                  <LogOut className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Search & Voice Search */}
            <div className="relative flex items-center bg-white rounded-2xl px-3.5 py-2.5 shadow-sm border border-gray-100">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fresh vegetables, fruits, milk..."
                className="w-full text-xs font-semibold focus:outline-none"
              />
              <button
                onClick={() => {
                  setSearchQuery('Tomato');
                  notify('🎙️ Voice Search: "Fresh Tomatoes"');
                }}
                className="p-1.5 bg-emerald-50 text-[#167A37] rounded-full"
              >
                <Mic className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-[#D9F2DC] to-[#BCE6C2] rounded-3xl p-4 flex items-center justify-between shadow-sm">
              <div className="max-w-[58%] space-y-2">
                <h2 className="text-lg font-black text-[#0F5927] leading-tight">
                  Fresh Vegetables Direct from Farmers
                </h2>
                <button
                  onClick={() => { setSelectedCategory('Vegetables'); setSubScreen('productList'); }}
                  className="bg-[#167A37] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow"
                >
                  Shop Now
                </button>
              </div>
              <img src={IMG.farmerHero} alt="Farmer" className="h-28 w-28 rounded-2xl object-cover border-2 border-white shadow" />
            </div>

            {/* 4 Quick Category Icons */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { name: 'Vegetables', emoji: '🥦', bg: 'bg-green-50' },
                { name: 'Fruits', emoji: '🍎', bg: 'bg-amber-50' },
                { name: 'Leafy Greens', emoji: '🥬', bg: 'bg-emerald-50' },
                { name: 'Dairy & Eggs', emoji: '🥛', bg: 'bg-blue-50' },
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setSelectedCategory(c.name); setSubScreen('productList'); }}
                  className={`${c.bg} rounded-2xl p-2.5 flex flex-col items-center space-y-1 border border-gray-100`}
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="text-[10px] font-extrabold text-gray-800">{c.name}</span>
                </button>
              ))}
            </div>

            {/* Popular Produce Grid with Live Quantity Stepper */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-black text-gray-900">Popular Produce</h3>
                <button onClick={() => setSubScreen('categories')} className="text-xs font-bold text-[#167A37]">
                  See All ›
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {filteredCustomerProducts.slice(0, 6).map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 space-y-2">
                    <div className="relative">
                      <img
                        src={p.img}
                        alt={p.nameEn}
                        onClick={() => { setSelectedProduct(p); setSubScreen('productDetails'); }}
                        className="h-24 w-full object-cover rounded-xl cursor-pointer"
                      />
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="absolute top-1.5 right-1.5 bg-white/90 p-1 rounded-full shadow"
                      >
                        <Heart className={`h-3.5 w-3.5 ${wishlist.includes(p.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <h4 onClick={() => { setSelectedProduct(p); setSubScreen('productDetails'); }} className="text-xs font-extrabold cursor-pointer truncate">
                      {lang === 'te' ? p.nameTe : p.nameEn}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#167A37]">₹{p.price}/{p.unit}</span>
                      <QuantityControl product={p} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

{/* Special Offer Banner */}
            <div className="bg-[#E4F5D8] rounded-2xl p-3.5 flex items-center justify-between border border-emerald-200">
              <div>
                <span className="text-[10px] font-black text-[#167A37] uppercase">Special Offer • Code: RYTHU20</span>
                <h4 className="text-base font-black text-gray-900">Get 20% OFF</h4>
                <p className="text-[11px] text-gray-600">on Fresh Farm Vegetables</p>
              </div>
              <img src={IMG.tomato} alt="Offer" className="h-16 w-16 rounded-xl object-cover" />
            </div>
          </div>
        )}

        {/* 5. BROWSE CATEGORIES */}
        {subScreen === 'categories' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <button onClick={() => setSubScreen('home')} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft className="h-4 w-4" /></button>
              <h2 className="text-base font-black">Browse Categories</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Vegetables', emoji: '🥦' },
                { name: 'Fruits', emoji: '🍎' },
                { name: 'Leafy Greens', emoji: '🥬' },
                { name: 'Dairy & Eggs', emoji: '🥛' },
                { name: 'All', emoji: '🧺' },
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => { setSelectedCategory(cat.name); setSubScreen('productList'); }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
                >
                  <span className="text-4xl">{cat.emoji}</span>
                  <span className="text-xs font-extrabold">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 6. PRODUCT LISTING (WITH LIVE QUANTITY STEPPER) */}
        {subScreen === 'productList' && (
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <button onClick={() => setSubScreen('home')} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft className="h-4 w-4" /></button>
              <h2 className="text-base font-black">{selectedCategory}</h2>
            </div>
            <div className="flex space-x-2">
              {['All', 'Local', 'Premium'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold ${tierFilter === t ? 'bg-[#167A37] text-white' : 'bg-white text-gray-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="space-y-2.5">
              {filteredCustomerProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3" onClick={() => { setSelectedProduct(p); setSubScreen('productDetails'); }}>
                    <img src={p.img} alt={p.nameEn} className="h-14 w-14 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-extrabold">{p.nameEn}</h4>
                      <p className="text-[10px] text-gray-500">{p.seller}</p>
                      <p className="text-xs font-black text-[#167A37] mt-0.5">₹{p.price} / {p.unit}</p>
                    </div>
                  </div>
                  <QuantityControl product={p} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. PRODUCT DETAILS (WITH LIVE QUANTITY STEPPER) */}
        {subScreen === 'productDetails' && selectedProduct && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <button onClick={() => setSubScreen('productList')} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft className="h-4 w-4" /></button>
              <button onClick={() => toggleWishlist(selectedProduct.id)} className="p-2 bg-white rounded-full shadow-sm">
                <Heart className={`h-4 w-4 ${wishlist.includes(selectedProduct.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
              </button>
            </div>
            <img src={selectedProduct.img} alt={selectedProduct.nameEn} className="h-52 w-full object-cover rounded-3xl shadow" />
            <div className="bg-white rounded-3xl p-4 shadow-sm space-y-3">
              <h2 className="text-lg font-black">{selectedProduct.nameEn} ({selectedProduct.nameTe})</h2>
              <p className="text-base font-black text-[#167A37]">₹{selectedProduct.price} / {selectedProduct.unit}</p>
              <div className="flex items-center space-x-1 text-xs font-bold text-amber-500">
                <Star className="h-4 w-4 fill-amber-400" />
                <span>{selectedProduct.rating} ({selectedProduct.reviews} verified reviews)</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{selectedProduct.desc}</p>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs font-extrabold text-gray-700">
                  Selected Quantity: <strong className="text-[#167A37]">{cart[selectedProduct.id] || 0} {selectedProduct.unit}</strong>
                </span>
                <QuantityControl product={selectedProduct} />
              </div>

              <button
                onClick={() => {
                  if (!cart[selectedProduct.id]) handleAddOrIncrement(selectedProduct);
                  setSubScreen('cart');
                }}
                className="w-full bg-[#167A37] text-white font-black py-3 rounded-2xl shadow text-sm"
              >
                Go to Cart ({cartItemsCount} items)
              </button>
            </div>
          </div>
        )}

        {/* WISHLIST */}
        {subScreen === 'wishlist' && (
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <button onClick={() => setSubScreen('home')} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft className="h-4 w-4" /></button>
              <h2 className="text-base font-black">My Wishlist ({wishlist.length})</h2>
            </div>
            {products.filter((p) => wishlist.includes(p.id)).map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-extrabold">{p.nameEn}</h4>
                  <p className="font-black text-[#167A37]">₹{p.price}/{p.unit}</p>
                </div>
                <QuantityControl product={p} />
              </div>
            ))}
          </div>
        )}

        {/* 8. MY CART */}
        {subScreen === 'cart' && (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black">My Cart ({cartItemsCount} items)</h2>
              {cartItemsCount > 0 && (
                <button onClick={() => setCart({})} className="text-xs font-bold text-red-500">Clear All</button>
              )}
            </div>
            {cartItemsCount === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center space-y-3">
                <p className="text-xs font-bold text-gray-500">Your cart is empty.</p>
                <button onClick={() => setSubScreen('home')} className="bg-[#167A37] text-white text-xs font-extrabold px-5 py-2.5 rounded-xl">
                  Browse Fresh Produce
                </button>
              </div>
            ) : (
              <>
                {Object.entries(cart).map(([id, qty]) => {
                  const p = products.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <div key={id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2.5">
                        <img src={p.img} alt={p.nameEn} className="h-12 w-12 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-extrabold">{p.nameEn}</h4>
                          <p className="text-[#167A37] font-black">
                            ₹{p.price} × {qty} {p.unit} = ₹{p.price * qty}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-xl font-black">
                        <button onClick={() => handleDecrement(p)}><Minus className="h-3 w-3" /></button>
                        <span>{qty}</span>
                        <button onClick={() => handleAddOrIncrement(p)}><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  );
                })}
                <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2.5">
                  <div className="flex justify-between font-black text-sm">
                    <span>Subtotal ({cartItemsCount} items)</span>
                    <span>₹{cartSubtotal}</span>
                  </div>
                  <button onClick={() => { setPaymentError(''); setSubScreen('checkout'); }} className="w-full bg-[#167A37] text-white font-black py-3 rounded-2xl shadow text-sm">
                    Proceed to Checkout ➔
                  </button>
                </div>
              </>
            )}
          </div>
        )}

{/* 9. CHECKOUT WITH ORIGINAL PAYMENT LOGOS (PHONEPE, GOOGLE PAY, PAYTM, QR, CARDS, COD) */}
        {subScreen === 'checkout' && (
          <div className="p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <button onClick={() => setSubScreen('cart')} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft className="h-4 w-4" /></button>
              <h2 className="text-base font-black">Checkout & Payment</h2>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
              <h3 className="font-extrabold">Delivery Address</h3>
              {addresses.map((addr) => (
                <label key={addr.id} className={`block p-2.5 rounded-xl border ${selectedAddressId === addr.id ? 'border-[#167A37] bg-emerald-50/40' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-2">
                    <input type="radio" checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="accent-[#167A37]" />
                    <span className="font-black">{addr.label}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 pl-5">{addr.line}</p>
                </label>
              ))}
              <div className="flex space-x-2 pt-1">
                <input type="text" value={newAddressInput} onChange={(e) => setNewAddressInput(e.target.value)} placeholder="Add new Nellore address..." className="flex-1 bg-gray-50 border rounded-xl px-2.5 py-1.5" />
                <button
                  onClick={() => {
                    if (!newAddressInput.trim()) return;
                    const id = 'a_' + Date.now();
                    setAddresses([...addresses, { id, label: 'New Address', line: newAddressInput.trim() }]);
                    setSelectedAddressId(id);
                    setNewAddressInput('');
                  }}
                  className="bg-gray-800 text-white font-bold px-3 rounded-xl"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Delivery Slot & Coupons */}
            <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
              <h3 className="font-extrabold">Delivery Slot</h3>
              <select value={deliverySlot} onChange={(e) => setDeliverySlot(e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold">
                <option>Today, 6 PM – 8 PM</option>
                <option>Tomorrow, 7 AM – 9 AM</option>
              </select>

              <h3 className="font-extrabold pt-1">Offers & Coupons (Try: RYTHU20)</h3>
              <div className="flex space-x-2">
                <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} placeholder="Enter Coupon Code" className="flex-1 bg-gray-50 border rounded-xl px-3 py-2 font-black" />
                <button
                  onClick={() => {
                    if (couponInput === 'RYTHU20') {
                      setAppliedDiscount(Math.round(cartSubtotal * 0.2));
                      notify('🎉 20% Coupon Applied!');
                    } else {
                      setAppliedDiscount(15);
                      notify('🎉 ₹15 Promo Applied!');
                    }
                  }}
                  className="bg-[#167A37] text-white font-extrabold px-4 rounded-xl"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* WORKING PAYMENT OPTIONS WITH ORIGINAL BRAND LOGOS */}
            <div className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2.5">
              <h3 className="font-extrabold text-sm">Select Payment Option (Pay ₹{finalTotal})</h3>

              {/* 1. PhonePe */}
              <div className={`rounded-xl border-2 p-3 transition ${paymentMethod === 'phonepe' ? 'border-[#5F259F] bg-purple-50/30' : 'border-gray-100'}`}>
                <label onClick={() => setPaymentMethod('phonepe')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <PhonePeLogo />
                    <div>
                      <p className="font-black text-gray-900">PhonePe</p>
                      <p className="text-[10px] text-gray-500">Instant UPI Payment via PhonePe</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'phonepe'} onChange={() => setPaymentMethod('phonepe')} className="accent-[#5F259F] h-4 w-4" />
                </label>
                {paymentMethod === 'phonepe' && (
                  <div className="mt-2.5 pt-2.5 border-t space-y-2">
                    <a href={phonePeUri} className="block w-full bg-[#5F259F] text-white text-center font-extrabold py-2.5 rounded-xl shadow-sm">
                      Open PhonePe App & Pay ₹{finalTotal} ↗
                    </a>
                    <input type="text" value={upiRefInput} onChange={(e) => setUpiRefInput(e.target.value)} placeholder="Enter 12-digit PhonePe UTR (Optional)" className="w-full bg-white border rounded-xl px-3 py-1.5 font-bold text-center" />
                  </div>
                )}
              </div>

              {/* 2. Google Pay */}
              <div className={`rounded-xl border-2 p-3 transition ${paymentMethod === 'gpay' ? 'border-[#4285F4] bg-blue-50/30' : 'border-gray-100'}`}>
                <label onClick={() => setPaymentMethod('gpay')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <GooglePayLogo />
                    <div>
                      <p className="font-black text-gray-900">Google Pay (GPay)</p>
                      <p className="text-[10px] text-gray-500">Pay directly with Google Pay UPI</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'gpay'} onChange={() => setPaymentMethod('gpay')} className="accent-[#4285F4] h-4 w-4" />
                </label>
                {paymentMethod === 'gpay' && (
                  <div className="mt-2.5 pt-2.5 border-t space-y-2">
                    <a href={gpayUri} className="block w-full bg-[#1A73E8] text-white text-center font-extrabold py-2.5 rounded-xl shadow-sm">
                      Open Google Pay & Pay ₹{finalTotal} ↗
                    </a>
                    <input type="text" value={upiRefInput} onChange={(e) => setUpiRefInput(e.target.value)} placeholder="Enter 12-digit GPay UPI Ref ID (Optional)" className="w-full bg-white border rounded-xl px-3 py-1.5 font-bold text-center" />
                  </div>
                )}
              </div>

              {/* 3. Paytm */}
              <div className={`rounded-xl border-2 p-3 transition ${paymentMethod === 'paytm' ? 'border-[#00BAF2] bg-sky-50/30' : 'border-gray-100'}`}>
                <label onClick={() => setPaymentMethod('paytm')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <PaytmLogo />
                    <div>
                      <p className="font-black text-gray-900">Paytm</p>
                      <p className="text-[10px] text-gray-500">Pay via Paytm UPI / Wallet</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'paytm'} onChange={() => setPaymentMethod('paytm')} className="accent-[#00BAF2] h-4 w-4" />
                </label>
                {paymentMethod === 'paytm' && (
                  <div className="mt-2.5 pt-2.5 border-t space-y-2">
                    <a href={paytmUri} className="block w-full bg-[#00BAF2] text-[#002970] text-center font-black py-2.5 rounded-xl shadow-sm">
                      Open Paytm & Pay ₹{finalTotal} ↗
                    </a>
                    <input type="text" value={upiRefInput} onChange={(e) => setUpiRefInput(e.target.value)} placeholder="Enter Paytm UPI Ref ID (Optional)" className="w-full bg-white border rounded-xl px-3 py-1.5 font-bold text-center" />
                  </div>
                )}
              </div>

              {/* 4. Scan QR Code */}
              <div className={`rounded-xl border-2 p-3 transition ${paymentMethod === 'qr' ? 'border-[#167A37] bg-emerald-50/30' : 'border-gray-100'}`}>
                <label onClick={() => setPaymentMethod('qr')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="h-7 w-7 rounded-lg bg-emerald-100 text-[#167A37] flex items-center justify-center"><QrCode className="h-4 w-4" /></span>
                    <div>
                      <p className="font-black text-gray-900">Scan QR Code (Any UPI App)</p>
                      <p className="text-[10px] text-gray-500">UPI ID: {merchantUpiId}</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'qr'} onChange={() => setPaymentMethod('qr')} className="accent-[#167A37] h-4 w-4" />
                </label>
                {paymentMethod === 'qr' && (
                  <div className="mt-2.5 pt-2.5 border-t text-center space-y-2">
                    <img src={dynamicQrUrl} alt="UPI QR" className="w-32 h-32 mx-auto rounded-xl border p-1 bg-white" />
                    <a href={genericUpiUri} className="inline-block text-[#167A37] font-extrabold underline">
                      Or Tap to Open Other UPI Apps ↗
                    </a>
                  </div>
                )}
              </div>

              {/* 5. Working Credit / Debit Card Option */}
              <div className={`rounded-xl border-2 p-3 transition ${paymentMethod === 'card' ? 'border-slate-800 bg-slate-50' : 'border-gray-100'}`}>
                <label onClick={() => setPaymentMethod('card')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <CardBrandLogo />
                    <div>
                      <p className="font-black text-gray-900">Credit / Debit Card</p>
                      <p className="text-[10px] text-gray-500">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-slate-800 h-4 w-4" />
                </label>
                {paymentMethod === 'card' && (
                  <div className="mt-3 pt-2.5 border-t space-y-2">
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                        setCardNumber(raw.replace(/(\d{4})(?=\d)/g, '$1 '));
                      }}
                      placeholder="Card Number (16 digits)"
                      className="w-full bg-white border rounded-xl px-3 py-2 font-bold tracking-wider"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
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
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Cardholder Name"
                      className="w-full bg-white border rounded-xl px-3 py-2 font-bold"
                    />
                  </div>
                )}
              </div>

              {/* 6. Cash on Delivery */}
              <div className={`rounded-xl border-2 p-3 transition ${paymentMethod === 'cod' ? 'border-[#167A37] bg-emerald-50/30' : 'border-gray-100'}`}>
                <label onClick={() => setPaymentMethod('cod')} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="h-7 w-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center"><Wallet className="h-4 w-4" /></span>
                    <div>
                      <p className="font-black text-gray-900">Cash on Delivery (COD)</p>
                      <p className="text-[10px] text-gray-500">Pay cash when fresh produce arrives</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-[#167A37] h-4 w-4" />
                </label>
              </div>

              {paymentError && <p className="text-xs font-extrabold text-red-600">{paymentError}</p>}
            </div>

            <button
              onClick={handleCompleteCustomerOrder}
              className="w-full bg-[#167A37] text-white font-black py-3.5 rounded-2xl shadow-lg text-sm"
            >
              Pay & Place Order • ₹{finalTotal}
            </button>
          </div>
        )}

{/* 10. ORDER PLACED */}
        {subScreen === 'orderPlaced' && activeOrder && (
          <div className="p-6 text-center space-y-4 my-auto pt-12">
            <div className="h-20 w-20 rounded-full bg-emerald-100 text-[#167A37] flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h2 className="text-xl font-black">Order Placed Successfully!</h2>
            <p className="text-xs font-bold text-gray-500">Order ID: {activeOrder.id} • Paid via {activeOrder.paymentInfo}</p>
            <div className="space-y-2.5 pt-2">
              <button onClick={() => setSubScreen('orderTracking')} className="w-full bg-[#167A37] text-white font-black py-3 rounded-2xl text-xs">
                Track Order
              </button>
              <button onClick={() => setSubScreen('home')} className="w-full bg-white border border-gray-200 font-extrabold py-3 rounded-2xl text-xs">
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {/* 11. ORDER TRACKING & 12. DELIVERY IN PROGRESS */}
        {(subScreen === 'orderTracking' || subScreen === 'deliveryProgress') && activeOrder && (
          <div className="p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <button onClick={() => setSubScreen('myOrders')} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft className="h-4 w-4" /></button>
              <h2 className="text-base font-black">Track Order • {activeOrder.id}</h2>
            </div>

            <div className="bg-gradient-to-r from-[#167A37] to-[#238E43] text-white rounded-3xl p-4 shadow">
              <p className="text-sm font-black">Out for Delivery • Arriving in ~25 mins</p>
              <p className="text-[11px] text-emerald-100 mt-0.5">Delivery OTP: <strong className="text-yellow-300">{activeOrder.deliveryOtp}</strong></p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              {['Order Placed', 'Confirmed', 'Out for Delivery', 'Delivered'].map((step, i) => (
                <div key={step} className="flex items-center space-x-3">
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black ${i <= 2 ? 'bg-[#167A37] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    ✓
                  </span>
                  <span className="font-extrabold">{step}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-bold">Delivery Partner</p>
                <h4 className="font-black text-sm">{activeOrder.driver}</h4>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=14.4426,79.9865"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-extrabold underline text-[11px]"
                >
                  📍 View Live Partner Location on Maps ↗
                </a>
              </div>
              <a href="tel:8328261103" className="p-3 bg-emerald-50 text-[#167A37] rounded-full">
                <Phone className="h-4 w-4" />
              </a>
            </div>

            <button onClick={() => setSubScreen('orderDelivered')} className="w-full bg-[#167A37] text-white font-black py-3 rounded-2xl">
              Mark Delivered & Rate
            </button>
          </div>
        )}

        {/* 13. ORDER DELIVERED */}
        {subScreen === 'orderDelivered' && activeOrder && (
          <div className="p-6 text-center space-y-4 pt-10">
            <div className="h-20 w-20 rounded-full bg-emerald-100 text-[#167A37] flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h2 className="text-xl font-black">Delivered!</h2>
            <p className="text-xs text-gray-600">Enjoy your fresh produce! Rate your delivery:</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setOrders((prev) => prev.map((o) => (o.id === activeOrder.id ? { ...o, rating: st, status: 'Delivered' } : o)));
                    notify(`⭐ Rated ${st} Stars!`);
                  }}
                >
                  <Star className={`h-7 w-7 ${(activeOrder.rating || 5) >= st ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
            <button onClick={() => setSubScreen('home')} className="w-full bg-[#167A37] text-white font-black py-3 rounded-2xl text-xs">
              Back to Home
            </button>
          </div>
        )}

        {/* 14. MY ORDERS */}
        {subScreen === 'myOrders' && (
          <div className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">My Orders</h2>
            <div className="flex space-x-2">
              {['All', 'Ongoing', 'Delivered'].map((tab) => (
                <button key={tab} onClick={() => setOrderTabFilter(tab)} className={`px-3 py-1.5 rounded-full font-extrabold ${orderTabFilter === tab ? 'bg-[#167A37] text-white' : 'bg-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                <div className="flex justify-between font-black">
                  <span>{ord.id} • {ord.status}</span>
                  <span className="text-[#167A37]">₹{ord.total}</span>
                </div>
                <p className="text-gray-600">{ord.itemsSummary}</p>
                <p className="text-[10px] font-bold text-gray-400">Paid via: {ord.paymentInfo}</p>
                <div className="flex space-x-2 pt-1">
                  <button onClick={() => { setActiveOrder(ord); setSubScreen('orderTracking'); }} className="flex-1 bg-emerald-50 text-[#167A37] font-extrabold py-1.5 rounded-xl">
                    Track Order
                  </button>
                  <button onClick={() => { setCart({ p1: 1, p3: 1 }); setSubScreen('cart'); notify('Items added to Cart!'); }} className="flex-1 bg-[#167A37] text-white font-extrabold py-1.5 rounded-xl">
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CUSTOMER BOTTOM NAV WITH LIVE CART COUNT BADGE */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-5 py-2 flex justify-between items-center z-40">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'categories', icon: Grid, label: 'Categories' },
            { id: 'cart', icon: ShoppingCart, label: 'Cart', badge: cartItemsCount },
            { id: 'myOrders', icon: ClipboardList, label: 'Orders' },
          ].map((nav) => {
            const Icon = nav.icon;
            return (
              <button key={nav.id} onClick={() => setSubScreen(nav.id)} className={`relative flex flex-col items-center text-[10px] font-extrabold ${subScreen === nav.id ? 'text-[#167A37]' : 'text-gray-400'}`}>
                <div className="relative">
                  <Icon className="h-5 w-5 mb-0.5" />
                  {nav.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                      {nav.badge}
                    </span>
                  )}
                </div>
                <span>{nav.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

 // =========================================================================
  // ROLE B: FARMERS APP
  // =========================================================================
  if (activeRole === 'farmer') {
    const lowStockItems = products.filter((p) => p.stock < 10);

    return (
      <div className="min-h-screen bg-[#F5F8F5] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
        <ToastBanner />
        <div className="bg-[#167A37] text-white p-4 rounded-b-3xl flex justify-between items-center">
          <div>
            <p className="text-[10px] text-emerald-100 font-bold">📍 Kaligiri / Nellore • Farmer ID: FB12345</p>
            <h1 className="text-base font-black">{authName || 'Ramaiah Garu'}</h1>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setSubScreen('farmerNotifs')} className="p-2 bg-white/20 rounded-full"><Bell className="h-4 w-4" /></button>
            <button onClick={() => setActiveRole(null)} className="p-2 bg-white/20 rounded-full"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>

        {subScreen === 'farmerHome' && (
          <div className="p-4 space-y-4 text-xs">
            <div className="bg-gradient-to-r from-[#D9F2DC] to-[#BCE6C2] rounded-3xl p-4 flex items-center justify-between">
              <div className="space-y-2 max-w-[60%]">
                <h2 className="text-lg font-black text-[#0F5927]">Sell Your Produce Get Best Price</h2>
                <button onClick={() => { setListStep(1); setSubScreen('listProduce'); }} className="bg-[#167A37] text-white font-extrabold px-4 py-2 rounded-full shadow">
                  List Your Produce ➔
                </button>
              </div>
              <img src={IMG.farmerHero} alt="Farmer" className="h-24 w-24 rounded-2xl object-cover border-2 border-white" />
            </div>

            {lowStockItems.length > 0 && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-center space-x-2 text-amber-900 font-extrabold">
                <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                <span>Low Stock Alert: {lowStockItems.map((x) => `${x.nameEn} (${x.stock} left)`).join(', ')}</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2.5 text-center">
              {[
                { id: 'myProduce', label: 'My Produce', emoji: '🌾' },
                { id: 'marketRates', label: 'Market Rates', emoji: '📈' },
                { id: 'farmerOrders', label: 'Orders & Bargain', emoji: '📦' },
                { id: 'farmerEarnings', label: 'Earnings', emoji: '💰' },
                { id: 'farmerSupport', label: 'Support', emoji: '🎧' },
                { id: 'farmerProfile', label: 'Bank & Profile', emoji: '👤' },
              ].map((tile) => (
                <button key={tile.id} onClick={() => setSubScreen(tile.id)} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 flex flex-col items-center space-y-1">
                  <span className="text-2xl">{tile.emoji}</span>
                  <span className="font-extrabold text-[11px]">{tile.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {subScreen === 'listProduce' && (
          <div className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">List Your Produce (Step {listStep} of 3)</h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              {listStep === 1 && (
                <>
                  <label className="block font-bold">Select Product</label>
                  <select value={listCrop} onChange={(e) => setListCrop(e.target.value)} className="w-full bg-gray-50 border rounded-xl p-2.5 font-bold">
                    <option>Tomato</option>
                    <option>Onion</option>
                    <option>Banganapalli Mango</option>
                    <option>Country Chicken (Live)</option>
                  </select>
                  <label className="block font-bold">Quantity (KG)</label>
                  <input type="number" value={listQty} onChange={(e) => setListQty(e.target.value)} className="w-full bg-gray-50 border rounded-xl p-2.5 font-bold" />
                  <label className="block font-bold">Expected Price (₹ / kg)</label>
                  <input type="number" value={listPrice} onChange={(e) => setListPrice(e.target.value)} className="w-full bg-gray-50 border rounded-xl p-2.5 font-black text-[#167A37]" />
                  <button onClick={() => setListStep(2)} className="w-full bg-[#167A37] text-white font-black py-3 rounded-xl">Next: Pickup Scheduling ➔</button>
                </>
              )}
              {listStep === 2 && (
                <>
                  <label className="block font-bold">Farm Gate Pickup Schedule</label>
                  <input type="text" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full bg-gray-50 border rounded-xl p-2.5 font-bold" />
                  <button onClick={() => setListStep(3)} className="w-full bg-[#167A37] text-white font-black py-3 rounded-xl">Next: Upload Photos ➔</button>
                </>
              )}
              {listStep === 3 && (
                <>
                  <label className="border-2 border-dashed border-emerald-300 rounded-2xl p-6 flex flex-col items-center cursor-pointer bg-emerald-50/40">
                    <Camera className="h-8 w-8 text-[#167A37] mb-1" />
                    <span className="font-extrabold">Tap to Upload Produce Photo</span>
                    <input type="file" accept="image/*" onChange={(e) => handlePhotoChange(e, setListPhoto)} className="hidden" />
                  </label>
                  {listPhoto && <img src={listPhoto} alt="Preview" className="h-32 w-full object-cover rounded-xl" />}
                  <button
                    onClick={() => {
                      setProducts([
                        { id: 'fp_' + Date.now(), nameEn: `${listCrop} (${listQty}kg Lot)`, nameTe: listCrop, cat: 'Vegetables', tier: 'Local', price: Number(listPrice), unit: 'kg', rating: 4.9, reviews: 1, stock: Number(listQty), seller: 'Ramaiah Garu (Kaligiri)', img: listPhoto || IMG.tomato, desc: `Pickup: ${pickupDate}` },
                        ...products,
                      ]);
                      notify('✅ Produce Listed & Alert Sent to Buyers!');
                      setSubScreen('myProduce');
                    }}
                    className="w-full bg-[#167A37] text-white font-black py-3 rounded-xl"
                  >
                    Publish Produce Live
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {subScreen === 'myProduce' && (
          <div className="p-4 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-black">My Produce</h2>
              <button onClick={() => { setListStep(1); setSubScreen('listProduce'); }} className="bg-[#167A37] text-white font-bold px-3 py-1.5 rounded-xl">+ List More</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Active', 'Sold'].map((t) => (
                <button key={t} onClick={() => setFarmerTab(t)} className={`py-2 rounded-xl font-extrabold ${farmerTab === t ? 'bg-[#167A37] text-white' : 'bg-white'}`}>{t}</button>
              ))}
            </div>
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold">{p.nameEn}</h4>
                  <p className="text-gray-500">Stock: {p.stock} {p.unit} • ₹{p.price}/{p.unit}</p>
                </div>
                <span className="bg-emerald-50 text-[#167A37] font-extrabold px-2.5 py-1 rounded-lg">{farmerTab}</span>
              </div>
            ))}
          </div>
        )}

        {subScreen === 'farmerOrders' && (
          <div className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">Bulk Orders & Buyer Negotiation</h2>
            {negotiations.map((n) => (
              <div key={n.id} className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 space-y-2">
                <p className="font-black text-amber-900">🤝 Buyer Negotiation: {n.buyer}</p>
                <p>{n.crop} • Your Ask: ₹{n.ask}/kg → Buyer Offer: <strong>₹{n.offer}/kg</strong> ({n.status})</p>
                <div className="flex space-x-2">
                  <button onClick={() => { setNegotiations([{ ...n, status: 'Accepted @ ₹' + n.offer }]); notify('Offer Accepted!'); }} className="flex-1 bg-[#167A37] text-white font-bold py-2 rounded-xl">Accept ₹{n.offer}</button>
                  <button onClick={() => { setNegotiations([{ ...n, status: 'Countered @ ₹' + (n.offer + 1) }]); notify('Counter Offer Sent'); }} className="flex-1 bg-white font-bold py-2 rounded-xl">Counter ₹{n.offer + 1}</button>
                </div>
              </div>
            ))}
            {orders.map((o) => (
              <div key={o.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-1.5">
                <div className="flex justify-between font-black">
                  <span>{o.id} • {o.status}</span>
                  <span className="text-[#167A37]">₹{o.total}</span>
                </div>
                <p>{o.itemsSummary}</p>
                <button onClick={() => sendWhatsAppInvoice(o)} className="bg-[#25D366] text-white font-bold px-3 py-1.5 rounded-lg">Send WhatsApp Receipt</button>
              </div>
            ))}
          </div>
        )}

        {subScreen === 'farmerEarnings' && (
          <div className="p-4 space-y-3 text-xs">
            <div className="bg-gradient-to-r from-[#167A37] to-[#238E43] text-white rounded-3xl p-5 shadow">
              <p className="text-emerald-100 font-bold">Total Earnings</p>
              <h2 className="text-3xl font-black mt-1">₹12,450</h2>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
              <h3 className="font-black">Recent Payment History</h3>
              <div className="flex justify-between py-2 border-b"><span>12 Nov 2026 • UPI Settled</span><span className="font-black text-[#167A37]">+₹2,800</span></div>
              <div className="flex justify-between py-2"><span>05 Nov 2026 • Bank Transfer</span><span className="font-black text-[#167A37]">+₹3,200</span></div>
            </div>
          </div>
        )}

        {subScreen === 'marketRates' && (
          <div className="p-4 space-y-2.5 text-xs">
            <h2 className="text-base font-black">Live Market Rates & Daily Alerts</h2>
            {['Tomato: ₹18/kg ↑', 'Onion: ₹20/kg ↑', 'Mirchi: ₹40/kg ↑', 'Potato: ₹15/kg'].map((m) => (
              <div key={m} className="bg-white rounded-2xl p-3.5 shadow-sm font-black">{m}</div>
            ))}
          </div>
        )}

        {(subScreen === 'farmerProfile' || subScreen === 'farmerSupport' || subScreen === 'farmerNotifs') && (
          <div className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">Bank Account, UPI & Support</h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
              <label className="font-bold">Bank Account & UPI Details</label>
              <input type="text" value={farmerBank} onChange={(e) => setFarmerBank(e.target.value)} className="w-full bg-gray-50 border rounded-xl p-2.5 font-bold" />
              <button onClick={() => notify('✅ Bank & UPI Details Updated!')} className="w-full bg-[#167A37] text-white font-extrabold py-2.5 rounded-xl">Save Bank / UPI</button>
            </div>
          </div>
        )}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-4 py-2 flex justify-between items-center z-40">
          {[
            { id: 'farmerHome', icon: Home, label: 'Home' },
            { id: 'myProduce', icon: Sprout, label: 'My Produce' },
            { id: 'farmerOrders', icon: ClipboardList, label: 'Orders' },
            { id: 'farmerEarnings', icon: Wallet, label: 'Earnings' },
            { id: 'farmerProfile', icon: User, label: 'Profile' },
          ].map((nav) => {
            const Icon = nav.icon;
            return (
              <button key={nav.id} onClick={() => setSubScreen(nav.id)} className={`flex flex-col items-center text-[10px] font-extrabold ${subScreen === nav.id ? 'text-[#167A37]' : 'text-gray-400'}`}>
                <Icon className="h-5 w-5 mb-0.5" />
                <span>{nav.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

// =========================================================================
  // ROLE C: WHOLESALE STORE APP
  // =========================================================================
  if (activeRole === 'wholesale') {
    const unitMultiplier = bulkUnit === 'KG' ? 1 : bulkUnit === 'Quintal' ? 100 : 1000;

    return (
      <div className="min-h-screen bg-[#F5F8F5] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
        <ToastBanner />
        <div className="bg-[#167A37] text-white p-4 rounded-b-3xl flex justify-between items-center">
          <div>
            <p className="text-[10px] text-emerald-100 font-bold">Wholesale Store • Nellore Mandi</p>
            <h1 className="text-base font-black">{authName || 'Sri Venkateswara Traders'}</h1>
          </div>
          <button onClick={() => setActiveRole(null)} className="p-2 bg-white/20 rounded-full"><LogOut className="h-4 w-4" /></button>
        </div>

        {subScreen === 'wholesaleDash' && (
          <div className="p-4 space-y-4 text-xs">
            <div className="bg-gradient-to-r from-[#167A37] to-[#238E43] text-white rounded-3xl p-4 shadow">
              <p className="text-emerald-100 font-bold">Today's Sales</p>
              <h2 className="text-3xl font-black mt-1">₹48,750 <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">↑ 12%</span></h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-2xl shadow-sm"><p className="text-gray-400 font-bold">Bulk Orders</p><p className="text-xl font-black text-blue-600 mt-1">24</p></div>
              <div className="bg-white p-3.5 rounded-2xl shadow-sm"><p className="text-gray-400 font-bold">Active Products</p><p className="text-xl font-black text-emerald-600 mt-1">250</p></div>
              <div className="bg-white p-3.5 rounded-2xl shadow-sm"><p className="text-gray-400 font-bold">Stock Alerts</p><p className="text-xl font-black text-amber-600 mt-1">5 Low</p></div>
              <div className="bg-white p-3.5 rounded-2xl shadow-sm"><p className="text-gray-400 font-bold">Monthly Earnings</p><p className="text-xl font-black text-[#167A37] mt-1">₹1,24,500</p></div>
            </div>
          </div>
        )}

        {subScreen === 'wholesaleBrowse' && (
          <div className="p-4 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-black">Bulk Browse ({bulkUnit})</h2>
              <div className="flex space-x-1 bg-white p-1 rounded-xl border">
                {['KG', 'Quintal', 'Ton'].map((u) => (
                  <button key={u} onClick={() => setBulkUnit(u)} className={`px-2.5 py-1 rounded-lg font-extrabold ${bulkUnit === u ? 'bg-[#167A37] text-white' : 'text-gray-600'}`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {products.slice(0, 6).map((p) => {
              const qtyKg = cart[p.id] || 0;
              return (
                <div key={p.id} className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold">{p.nameEn}</h4>
                    <p className="font-black text-[#167A37]">₹{(p.price - 4) * unitMultiplier} / {bulkUnit}</p>
                    {qtyKg > 0 && <p className="text-[10px] font-black text-amber-700">Selected: {qtyKg} KG</p>}
                  </div>
                  <button
                    onClick={() => {
                      const next = qtyKg + unitMultiplier;
                      setCart((c) => ({ ...c, [p.id]: next }));
                      notify(`Added ${next} KG ${p.nameEn}`);
                    }}
                    className="bg-[#167A37] text-white font-extrabold px-3 py-2 rounded-xl"
                  >
                    + 1 {bulkUnit}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {subScreen === 'wholesaleOrders' && (
          <div className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">Bulk Orders & GST Invoices</h2>
            {cartItemsCount > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-2">
                <p className="font-black text-[#167A37]">Bulk Cart: {cartItemsCount} KG • ₹{cartSubtotal}</p>
                <button
                  onClick={() => {
                    const gstOrd = {
                      id: 'WS-' + Math.floor(1025 + Math.random() * 900),
                      customerName: authName || 'Sri Venkateswara Traders',
                      phone: authPhone || '9989334455',
                      address: 'Nellore Mandi',
                      itemsSummary: `Bulk Order (${cartItemsCount} KG)`,
                      total: cartSubtotal,
                      paymentInfo: 'Wholesale GST Invoice',
                      status: 'Processing',
                    };
                    setOrders([gstOrd, ...orders]);
                    setCart({});
                    sendWhatsAppInvoice(gstOrd);
                    notify('✅ Bulk Order Placed & GST Invoice Sent!');
                  }}
                  className="w-full bg-[#167A37] text-white font-black py-2.5 rounded-xl"
                >
                  Place Bulk Order & Generate GST Invoice
                </button>
              </div>
            )}

            {orders.map((o) => (
              <div key={o.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-1.5">
                <div className="flex justify-between font-black">
                  <span>{o.id} • {o.status}</span>
                  <span className="text-[#167A37]">₹{o.total}</span>
                </div>
                <p>{o.itemsSummary}</p>
                <button onClick={() => sendWhatsAppInvoice(o)} className="bg-[#25D366] text-white font-bold px-3 py-1 rounded-lg">
                  Share GST Invoice on WhatsApp
                </button>
              </div>
            ))}
          </div>
        )}

        {subScreen === 'wholesaleAccount' && (
          <div className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">Credit & Analytics</h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
              <div className="flex justify-between font-bold"><span>Approved Credit Limit</span><span className="text-[#167A37] font-black">₹2,00,000</span></div>
              <div className="flex justify-between font-bold"><span>Available Credit</span><span className="font-black">₹1,65,000</span></div>
            </div>
          </div>
        )}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-5 py-2 flex justify-between items-center z-40">
          {[
            { id: 'wholesaleDash', icon: Home, label: 'Home' },
            { id: 'wholesaleBrowse', icon: Grid, label: 'Bulk Buy' },
            { id: 'wholesaleOrders', icon: ClipboardList, label: 'Orders/GST' },
            { id: 'wholesaleAccount', icon: User, label: 'Credit' },
          ].map((nav) => {
            const Icon = nav.icon;
            return (
              <button key={nav.id} onClick={() => setSubScreen(nav.id)} className={`flex flex-col items-center text-[10px] font-extrabold ${subScreen === nav.id ? 'text-[#167A37]' : 'text-gray-400'}`}>
                <Icon className="h-5 w-5 mb-0.5" />
                <span>{nav.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

// =========================================================================
  // ROLE D: RETAIL STORE APP
  // =========================================================================
  if (activeRole === 'retail') {
    return (
      <div className="min-h-screen bg-[#F5F8F5] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
        <ToastBanner />
        <div className="bg-[#167A37] text-white p-4 rounded-b-3xl flex justify-between items-center">
          <div>
            <p className="text-[10px] text-emerald-100 font-bold">Retail Store • Vedayapalem, Nellore</p>
            <h1 className="text-base font-black">{authName || 'Sri Lakshmi Super Market'}</h1>
          </div>
          <button onClick={() => setActiveRole(null)} className="p-2 bg-white/20 rounded-full"><LogOut className="h-4 w-4" /></button>
        </div>

        {subScreen === 'retailDash' && (
          <div className="p-4 space-y-4 text-xs">
            <div className="bg-gradient-to-r from-[#167A37] to-[#238E43] text-white rounded-3xl p-4 shadow">
              <p className="text-emerald-100 font-bold">Today's Sales</p>
              <h2 className="text-3xl font-black mt-1">₹12,560 <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">↑ 8%</span></h2>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <button onClick={() => setSubScreen('retailAddProduct')} className="bg-white p-3 rounded-2xl shadow-sm font-extrabold">+ Add Product</button>
              <button onClick={() => { setBarcodeScanned('8901058851234 • Fresh Tomato 1kg'); notify('📷 Barcode Scanned!'); }} className="bg-white p-3 rounded-2xl shadow-sm font-extrabold">📷 Barcode Scan</button>
              <button onClick={() => setSubScreen('retailStoreInfo')} className="bg-white p-3 rounded-2xl shadow-sm font-extrabold">📊 P&L & Reports</button>
            </div>
            {barcodeScanned && <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl font-black text-[#167A37]">Scanned: {barcodeScanned}</div>}
          </div>
        )}

        {subScreen === 'retailAddProduct' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newProdName || !newProdPrice) return;
              setProducts([
                { id: 'rp_' + Date.now(), nameEn: newProdName, nameTe: newProdName, cat: newProdCat, tier: 'Local', price: Number(newProdPrice), unit: 'kg', rating: 4.8, reviews: 1, stock: Number(newProdStock) || 20, seller: 'Sri Lakshmi Super Market', img: newProdPhoto || IMG.tomato, desc: 'Retail shop fresh stock' },
                ...products,
              ]);
              setNewProdName('');
              setNewProdPrice('');
              setNewProdStock('');
              notify('✅ Product Added to Retail Store!');
              setSubScreen('retailDash');
            }}
            className="p-4 space-y-3 text-xs"
          >
            <h2 className="text-base font-black">Add Product</h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              <label className="border-2 border-dashed border-gray-300 rounded-2xl p-5 flex flex-col items-center cursor-pointer bg-gray-50">
                <Camera className="h-7 w-7 text-[#167A37] mb-1" />
                <span className="font-extrabold">Upload Photo or Choose</span>
                <input type="file" accept="image/*" onChange={(e) => handlePhotoChange(e, setNewProdPhoto)} className="hidden" />
              </label>
              {newProdPhoto && <img src={newProdPhoto} alt="Preview" className="h-28 w-full object-cover rounded-xl" />}
              <input type="text" required value={newProdName} onChange={(e) => setNewProdName(e.target.value)} placeholder="Product Name *" className="w-full bg-gray-50 border rounded-xl p-2.5 font-bold" />
              <select value={newProdCat} onChange={(e) => setNewProdCat(e.target.value)} className="w-full bg-gray-50 border rounded-xl p-2.5 font-bold">
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Dairy & Eggs</option>
              </select>
              <input type="number" required value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} placeholder="Selling Price (₹) *" className="w-full bg-gray-50 border rounded-xl p-2.5 font-black text-[#167A37]" />
              <input type="number" required value={newProdStock} onChange={(e) => setNewProdStock(e.target.value)} placeholder="Stock Quantity *" className="w-full bg-gray-50 border rounded-xl p-2.5 font-bold" />
              <button type="submit" className="w-full bg-[#167A37] text-white font-black py-3 rounded-xl">Add Product</button>
            </div>
          </form>
        )}

        {subScreen === 'retailOrders' && (
          <div className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">Customer Orders</h2>
            <div className="grid grid-cols-3 gap-2">
              {['New', 'Preparing', 'Delivered'].map((t) => (
                <button key={t} onClick={() => setRetailTab(t)} className={`py-1.5 rounded-xl font-extrabold ${retailTab === t ? 'bg-[#167A37] text-white' : 'bg-white'}`}>{t}</button>
              ))}
            </div>
            {orders.map((o) => (
              <div key={o.id} className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-black">#{o.id} • ₹{o.total}</h4>
                  <p className="text-gray-500">{o.itemsSummary}</p>
                </div>
                <button onClick={() => { sendWhatsAppInvoice(o); notify('Order Accepted & Digital Bill Sent!'); }} className="bg-[#167A37] text-white font-extrabold px-3 py-1.5 rounded-xl">
                  Accept & Bill
                </button>
              </div>
            ))}
          </div>
        )}

        {subScreen === 'retailStoreInfo' && (
          <div className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">My Store • Profit & Loss</h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
              <div className="flex justify-between font-bold"><span>Monthly Sales</span><span className="font-black">₹1,45,000</span></div>
              <div className="flex justify-between font-bold"><span>Wholesale & Farmer Purchases</span><span className="font-black">₹1,08,000</span></div>
              <div className="flex justify-between font-extrabold text-[#167A37] border-t pt-2"><span>Net Profit</span><span>+₹37,000 (25.5%)</span></div>
            </div>
          </div>
        )}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-5 py-2 flex justify-between items-center z-40">
          {[
            { id: 'retailDash', icon: Home, label: 'Home' },
            { id: 'retailOrders', icon: ClipboardList, label: 'Orders' },
            { id: 'retailAddProduct', icon: Plus, label: 'Add Item' },
            { id: 'retailStoreInfo', icon: Store, label: 'My Store' },
          ].map((nav) => {
            const Icon = nav.icon;
            return (
              <button key={nav.id} onClick={() => setSubScreen(nav.id)} className={`flex flex-col items-center text-[10px] font-extrabold ${subScreen === nav.id ? 'text-[#167A37]' : 'text-gray-400'}`}>
                <Icon className="h-5 w-5 mb-0.5" />
                <span>{nav.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  // =========================================================================
  // ROLE E: DELIVERY PARTNER APP
  // =========================================================================
  if (activeRole === 'delivery') {
    const currentDeliveryOrd = activeOrder || orders[0];
    const newOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length;
    const acceptedCount = orders.filter((o) => o.status === 'Accepted' || o.status === 'Out for Delivery').length;
    const completedCount = orders.filter((o) => o.status === 'Delivered').length;

    return (
      <div className="min-h-screen bg-[#F5F8F5] max-w-md mx-auto relative pb-24 font-sans text-gray-800 shadow-2xl">
        <ToastBanner />

        <div className="bg-white px-4 py-3.5 border-b flex items-center justify-between sticky top-0 z-30">
          <div>
            <p className="text-[10px] text-gray-400 font-bold">Delivery Partner ID: DP2587</p>
            <h1 className="text-sm font-black text-gray-900">Hello, {authName || 'Ramesh Kumar'} 👋</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center space-x-1.5 shadow-sm ${
                isOnline ? 'bg-[#167A37] text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-lime-300 animate-pulse' : 'bg-gray-500'}`} />
              <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
            </button>
            <button onClick={() => setActiveRole(null)} className="p-2 bg-gray-100 rounded-full"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>

        {subScreen === 'deliveryDash' && (
          <div className="p-4 space-y-4 text-xs">
            <div className="bg-gradient-to-r from-[#167A37] to-[#238E43] text-white rounded-3xl p-4 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="text-emerald-100 font-bold">Today's Earnings</span>
                <span className="bg-white/20 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  {isOnline ? '🟢 Online' : '⚪ Offline'}
                </span>
              </div>
              <h2 className="text-3xl font-black mt-1">₹850 <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">↑ 12%</span></h2>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <button onClick={() => setSubScreen('availableOrders')} className="bg-white rounded-2xl p-3 shadow-sm border border-amber-100">
                <p className="text-[10px] text-gray-500 font-bold">New Orders</p>
                <p className="text-xl font-black text-amber-600 mt-1">({newOrdersCount})</p>
              </button>
              <button onClick={() => setSubScreen('orderDetails')} className="bg-white rounded-2xl p-3 shadow-sm border border-blue-100">
                <p className="text-[10px] text-gray-500 font-bold">Accepted Orders</p>
                <p className="text-xl font-black text-blue-600 mt-1">({acceptedCount})</p>
              </button>
              <button onClick={() => setSubScreen('deliveryOrders')} className="bg-white rounded-2xl p-3 shadow-sm border border-emerald-100">
                <p className="text-[10px] text-gray-500 font-bold">Completed</p>
                <p className="text-xl font-black text-[#167A37] mt-1">({28 + completedCount})</p>
              </button>
            </div>

            <button
              onClick={() => { setActiveOrder(currentDeliveryOrd); setSubScreen('orderDetails'); }}
              className="w-full bg-[#167A37] text-white font-black py-4 rounded-2xl shadow-lg text-sm flex items-center justify-center space-x-2"
            >
              <Truck className="h-5 w-5" />
              <span>Start Delivery ({currentDeliveryOrd.id}) ➔</span>
            </button>
          </div>
        )}

        {subScreen === 'availableOrders' && (
          <div className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">Available Nearby Orders</h2>
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2">
                <div className="flex justify-between font-black">
                  <span>#{ord.id} • {ord.distanceKm} km</span>
                  <span className="text-[#167A37]">Earn ₹{ord.deliveryFee}</span>
                </div>
                <p className="font-bold text-gray-700">{ord.customerName} • {ord.address}</p>
                <div className="flex space-x-2 pt-1">
                  <button
                    onClick={() => {
                      const updated = { ...ord, status: 'Accepted' };
                      setOrders((p) => p.map((x) => (x.id === ord.id ? updated : x)));
                      setActiveOrder(updated);
                      setSubScreen('orderDetails');
                    }}
                    className="flex-1 bg-[#167A37] text-white font-extrabold py-2 rounded-xl"
                  >
                    Accept Order
                  </button>
                  <button onClick={() => notify('Order Rejected')} className="px-4 bg-red-50 text-red-600 font-extrabold py-2 rounded-xl">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {subScreen === 'orderDetails' && currentDeliveryOrd && (
          <div className="p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <button onClick={() => setSubScreen('deliveryDash')} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft className="h-4 w-4" /></button>
              <h2 className="text-base font-black">Order Details • #{currentDeliveryOrd.id}</h2>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2.5">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-black">{currentDeliveryOrd.customerName}</h4>
                  <p className="text-gray-600">{currentDeliveryOrd.address}</p>
                </div>
                <a href={`tel:${currentDeliveryOrd.phone}`} className="p-3 bg-emerald-50 text-[#167A37] rounded-full">
                  <Phone className="h-4 w-4" />
                </a>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex justify-between font-black">
                <span>Pickup Verification OTP:</span>
                <span className="text-amber-800">{currentDeliveryOrd.pickupOtp}</span>
              </div>
              <button onClick={() => setSubScreen('deliveryNav')} className="w-full bg-[#167A37] text-white font-black py-3 rounded-xl text-sm">
                Start Delivery & Open Navigation ➔
              </button>
            </div>
          </div>
        )}

        {subScreen === 'deliveryNav' && currentDeliveryOrd && (
          <div className="p-4 space-y-3 text-xs">
            <div className="bg-[#167A37] text-white rounded-2xl p-4">
              <p className="font-black text-sm">On the Way • Arriving in 12 min</p>
              <p className="text-emerald-100">{currentDeliveryOrd.address}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              <a href="https://www.google.com/maps/dir/?api=1&destination=14.4426,79.9865" target="_blank" rel="noreferrer" className="block w-full bg-blue-600 text-white text-center font-black py-3 rounded-xl">
                🗺️ Open Google Maps Navigation ↗
              </a>
              <button onClick={() => setSubScreen('deliveryConfirm')} className="w-full bg-[#167A37] text-white font-black py-3 rounded-xl">
                Reached Customer Location ➔
              </button>
            </div>
          </div>
        )}

        {subScreen === 'deliveryConfirm' && currentDeliveryOrd && (
          <div className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-black">Delivery Confirmation</h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              <p className="font-bold text-gray-600">Customer Delivery OTP (Demo: {currentDeliveryOrd.deliveryOtp})</p>
              <input type="tel" maxLength={4} value={deliveryOtpInput} onChange={(e) => setDeliveryOtpInput(e.target.value)} placeholder="Enter 4-Digit OTP" className="w-full bg-gray-50 border rounded-xl py-3 text-center text-base font-black tracking-[0.4em]" />
              <label className="border-2 border-dashed border-emerald-300 rounded-2xl p-4 flex flex-col items-center cursor-pointer bg-emerald-50/40">
                <Camera className="h-6 w-6 text-[#167A37] mb-1" />
                <span className="font-extrabold">Upload Delivery Proof Photo</span>
                <input type="file" accept="image/*" onChange={(e) => handlePhotoChange(e, setDeliveryProofPhoto)} className="hidden" />
              </label>
              {deliveryProofPhoto && <img src={deliveryProofPhoto} alt="Proof" className="h-28 w-full object-cover rounded-xl" />}
              <button
                onClick={() => {
                  const done = { ...currentDeliveryOrd, status: 'Delivered' };
                  setOrders((p) => p.map((x) => (x.id === done.id ? done : x)));
                  setWalletBalance((w) => w + done.deliveryFee);
                  sendWhatsAppInvoice(done);
                  notify(`✅ Delivered! +₹${done.deliveryFee} credited`);
                  setSubScreen('deliveryDash');
                }}
                className="w-full bg-[#167A37] text-white font-black py-3.5 rounded-xl text-sm"
              >
                Complete Delivery & Credit ₹{currentDeliveryOrd.deliveryFee}
              </button>
            </div>
          </div>
        )}

        {(subScreen === 'deliveryWallet' || subScreen === 'deliveryOrders') && (
          <div className="p-4 space-y-3 text-xs">
            <div className="bg-gradient-to-r from-[#167A37] to-[#238E43] text-white rounded-3xl p-4 shadow">
              <p className="text-emerald-100 font-bold">Wallet Balance</p>
              <div className="flex justify-between items-center mt-1">
                <h2 className="text-3xl font-black">₹{walletBalance}</h2>
                <button onClick={() => { notify(`💸 ₹${walletBalance} Withdrawal Requested!`); setWalletBalance(0); }} className="bg-white text-[#167A37] font-black px-4 py-2 rounded-xl">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        )}

        {subScreen === 'deliveryProfile' && (
          <div className="p-4 space-y-3 text-xs">
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
              <h3 className="text-base font-black">Ramesh Kumar • ⭐ 4.9 Rating</h3>
              <a href="tel:8328261103" className="block w-full bg-red-600 text-white text-center font-black py-3 rounded-xl">
                🚨 Emergency Support Call
              </a>
            </div>
          </div>
        )}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-5 py-2 flex justify-between items-center z-40">
          {[
            { id: 'deliveryDash', icon: Home, label: 'Home' },
            { id: 'availableOrders', icon: ClipboardList, label: 'Orders' },
            { id: 'deliveryWallet', icon: Wallet, label: 'Earnings' },
            { id: 'deliveryProfile', icon: User, label: 'Profile' },
          ].map((nav) => {
            const Icon = nav.icon;
            return (
              <button key={nav.id} onClick={() => setSubScreen(nav.id)} className={`flex flex-col items-center text-[10px] font-extrabold ${subScreen === nav.id ? 'text-[#167A37]' : 'text-gray-400'}`}>
                <Icon className="h-5 w-5 mb-0.5" />
                <span>{nav.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

// =========================================================================
  // ROLE F: MASTER ADMIN CONTROL
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F5F8F5] max-w-md mx-auto relative pb-20 font-sans text-gray-800 shadow-2xl">
      <ToastBanner />
      <div className="bg-[#0F5927] text-white p-4 rounded-b-3xl flex justify-between items-center">
        <div>
          <p className="text-[10px] text-emerald-200 font-bold">Nellore Master Control</p>
          <h1 className="text-base font-black">Rythu Basket Admin</h1>
        </div>
        <button onClick={() => setActiveRole(null)} className="p-2 bg-white/20 rounded-full"><LogOut className="h-4 w-4" /></button>
      </div>

      <div className="p-4 space-y-3 text-xs">
        <h2 className="text-sm font-black">Wholesale & Retail Shop Approvals</h2>
        {shopsList.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl p-3.5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold bg-emerald-50 text-[#167A37] px-2 py-0.5 rounded">{s.type}</span>
              <h4 className="font-black text-sm mt-1">{s.name}</h4>
              <p className="text-gray-500">{s.owner} • {s.phone} • GST: {s.gst}</p>
            </div>
            <button
              onClick={() => {
                setShopsList((prev) => prev.map((x) => (x.id === s.id ? { ...x, approved: !x.approved } : x)));
                notify('Shop Status Updated');
              }}
              className={`px-3 py-1.5 rounded-xl font-extrabold ${s.approved ? 'bg-emerald-50 text-[#167A37]' : 'bg-[#167A37] text-white'}`}
            >
              {s.approved ? '✓ Approved' : 'Approve'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}