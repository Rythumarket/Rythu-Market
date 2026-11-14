import React, { useState } from 'react';
import {
  Search, ShoppingCart, Plus, Minus, Home, Grid,
  ClipboardList, User, MapPin, Phone, Sprout,
  Store, Truck, ShieldCheck, ChevronRight, ArrowLeft, CheckCircle2
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('te'); // 'te' | 'en'
  const [screen, setScreen] = useState('home'); // 'home' | 'categories' | 'cart' | 'roles'
  const [activeRole, setActiveRole] = useState('customer');
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({ tomatoes: 1, palakura: 2 });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const categories = [
    { id: 'all', nameEn: 'All Items', nameTe: 'అన్నీ', emoji: '🧺', bg: 'bg-emerald-50' },
    { id: 'vegetables', nameEn: 'Vegetables', nameTe: 'కూరగాయలు', emoji: '🍅', bg: 'bg-orange-50' },
    { id: 'fruits', nameEn: 'Fruits', nameTe: 'పండ్లు', emoji: '🥭', bg: 'bg-amber-50' },
    { id: 'leafy', nameEn: 'Leafy Greens', nameTe: 'ఆకుకూరలు', emoji: '🥬', bg: 'bg-green-50' },
    { id: 'rice', nameEn: 'Rice & Grains', nameTe: 'బియ్యం', emoji: '🌾', bg: 'bg-yellow-50' },
    { id: 'dairy', nameEn: 'Milk & Eggs', nameTe: 'పాలు & గుడ్లు', emoji: '🥚', bg: 'bg-blue-50' },
  ];

  const products = [
    {
      id: 'tomatoes',
      nameEn: 'Country Tomatoes',
      nameTe: 'దేశవాళీ టమోటాలు',
      unit: '1 kg',
      price: 28,
      oldPrice: 36,
      cat: 'vegetables',
      img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'mangoes',
      nameEn: 'Banganapalli Mangoes',
      nameTe: 'బంగినపల్లి మామిడి',
      unit: '1 kg',
      price: 110,
      oldPrice: 140,
      cat: 'fruits',
      img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'palakura',
      nameEn: 'Fresh Palakura',
      nameTe: 'తాజా పాలకూర',
      unit: '2 bunches',
      price: 20,
      oldPrice: 30,
      cat: 'leafy',
      img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'brinjal',
      nameEn: 'Nellore Purple Brinjal',
      nameTe: 'నెల్లూరు వంకాయలు',
      unit: '500 g',
      price: 24,
      oldPrice: 32,
      cat: 'vegetables',
      img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'rice',
      nameEn: 'Nellore Sona Masuri',
      nameTe: 'నెల్లూరు సోనా మసూరి',
      unit: '5 kg',
      price: 285,
      oldPrice: 320,
      cat: 'rice',
      img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'eggs',
      nameEn: 'Country Farm Eggs',
      nameTe: 'నాటు కోడి గుడ్లు',
      unit: '6 pcs',
      price: 48,
      oldPrice: 60,
      cat: 'dairy',
      img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const roles = [
    {
      id: 'customer',
      titleTe: 'వినియోగదారుడు',
      subTe: 'తాజా పంటలు కొనండి',
      subEn: 'Customer • Buy fresh produce',
      icon: ShoppingCart,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'farmer',
      titleTe: 'రైతు',
      subTe: 'పంట అమ్మండి',
      subEn: 'Farmer • Sell your harvest',
      icon: Sprout,
      color: 'bg-green-50 text-green-600',
    },
    {
      id: 'shopkeeper',
      titleTe: 'దుకాణదారు',
      subTe: 'హోల్‌సేల్ సరుకు కొనండి',
      subEn: 'Shopkeeper • Wholesale orders',
      icon: Store,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'delivery',
      titleTe: 'డెలివరీ',
      subTe: 'సరుకు అందించండి',
      subEn: 'Delivery • Deliver orders',
      icon: Truck,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'admin',
      titleTe: 'అడ్మిన్',
      subTe: 'అన్నీ చూడండి',
      subEn: 'Admin • Manage everything',
      icon: ShieldCheck,
      color: 'bg-purple-50 text-purple-600',
    },
  ];
const addItem = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeItem = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id] <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((item) => item.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 25;
  const grandTotal = subtotal + deliveryFee;

  const filteredProducts = products.filter((p) => {
    const catOk = selectedCat === 'all' || p.cat === selectedCat;
    const q = search.toLowerCase();
    const searchOk = p.nameEn.toLowerCase().includes(q) || p.nameTe.includes(q);
    return catOk && searchOk;
  });

  return (
    <div className="min-h-screen bg-[#F6FBF8] max-w-md mx-auto relative pb-28 font-sans text-gray-800 shadow-xl">
      {/* GRONIK STYLE BRIGHT GREEN TOP HEADER WITH CUSTOM RYTHU BASKET LOGO */}
      <header className="bg-[#00B251] text-white rounded-b-[28px] px-4 pt-4 pb-5 shadow-md sticky top-0 z-30">
        <div className="flex items-center justify-between mb-3.5">
          {/* Left: Custom Logo + Brand Name */}
          <div className="flex items-center space-x-2.5">
            <div className="h-11 w-11 rounded-full bg-white p-0.5 shadow-md overflow-hidden flex-shrink-0 border-2 border-yellow-300">
              <img
                src="/icon-512.png"
                alt="Rythu Basket Logo"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-base font-extrabold leading-tight tracking-tight">
                {lang === 'te' ? 'రైతు బాస్కెట్' : 'Rythu Basket'}
              </h1>
              <div className="flex items-center text-[11px] text-emerald-100 font-medium">
                <MapPin className="h-3 w-3 mr-0.5 text-yellow-300" />
                <span>{lang === 'te' ? 'నెల్లూరు • పొలం నుండి నేరుగా' : 'Nellore • Farm to Home'}</span>
              </div>
            </div>
          </div>

          {/* Right: Bilingual Toggle + Role Button */}
          <div className="flex items-center space-x-1.5">
            <div className="bg-[#008F41] p-0.5 rounded-full flex text-[11px] font-bold">
              <button
                onClick={() => setLang('te')}
                className={`px-2.5 py-1 rounded-full transition ${
                  lang === 'te' ? 'bg-white text-[#00B251] shadow-sm' : 'text-white'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-full transition ${
                  lang === 'en' ? 'bg-white text-[#00B251] shadow-sm' : 'text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* White Search Input Inside Green Header (Gronik 1st Image Style) */}
        <div className="relative">
          <Search className="h-4 w-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (screen !== 'home') setScreen('home');
            }}
            placeholder={
              lang === 'te'
                ? 'తాజా కూరగాయలు, పండ్లు వెతకండి...'
                : 'Search your daily grocery item...'
            }
            className="w-full bg-white text-gray-800 placeholder-gray-400 text-xs font-medium rounded-xl py-2.5 pl-10 pr-4 shadow-sm focus:outline-none"
          />
        </div>
      </header>

      {/* SCREEN 1: HOME (GRONIK LAYOUT) */}
      {screen === 'home' && (
        <main className="px-4 pt-4 space-y-5">
          {/* Categories Header + Pastel Cards (Gronik 1st Image Style) */}
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-sm font-extrabold text-gray-900">
                {lang === 'te' ? 'విభాగాలు' : 'Categories'}
              </h2>
              <button
                onClick={() => setScreen('categories')}
                className="text-xs font-bold text-[#00B251]"
              >
                {lang === 'te' ? 'అన్నీ చూడండి' : 'See all'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {categories.slice(1, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(selectedCat === cat.id ? 'all' : cat.id)}
                  className={`${cat.bg} rounded-2xl p-3 flex flex-col items-center justify-center border transition ${
                    selectedCat === cat.id
                      ? 'border-[#00B251] ring-2 ring-[#00B251]/20'
                      : 'border-transparent'
                  }`}
                >
                  <span className="text-3xl mb-1.5">{cat.emoji}</span>
                  <span className="text-[11px] font-bold text-gray-800 text-center">
                    {lang === 'te' ? cat.nameTe : cat.nameEn}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* 30% DISCOUNT MINT BANNER WITH CUSTOM LOGO (Gronik 1st Image Style) */}
          <section className="bg-[#DCF7E6] rounded-2xl p-4 flex items-center justify-between relative overflow-hidden border border-[#B8ECCC]">
            <div className="max-w-[62%] z-10">
              <span className="inline-block bg-[#00B251] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md mb-1">
                {lang === 'te' ? 'రైతు నేరుగా ఆఫర్' : 'FARM DIRECT'}
              </span>
              <h3 className="text-lg font-black text-[#008F41] leading-tight">
                {lang === 'te' ? '30% తగ్గింపు!' : '30% Discount'}
              </h3>
              <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                {lang === 'te'
                  ? '₹499 పైన ఆర్డర్లకు ఉచిత డెలివరీ (నెల్లూరు)'
                  : 'Free delivery on orders above ₹499 in Nellore'}
              </p>
              <button
                onClick={() => setSelectedCat('all')}
                className="mt-2.5 bg-[#00B251] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm active:scale-95 transition"
              >
                {lang === 'te' ? 'ఇప్పుడే కొనండి' : 'Order Now'}
              </button>
            </div>
<div className="w-24 h-24 rounded-full bg-white p-1 shadow-md flex-shrink-0 border-2 border-[#00B251]/20">
              <img
                src="/icon-512.png"
                alt="Rythu Basket"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </section>

          {/* POPULAR DEALS / FRESH PRODUCE GRID */}
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-sm font-extrabold text-gray-900">
                {lang === 'te' ? 'ప్రత్యేక ధరలు • తాజా పంటలు' : 'Popular Deals'}
              </h2>
              {selectedCat !== 'all' && (
                <button
                  onClick={() => setSelectedCat('all')}
                  className="text-[11px] font-bold text-[#00B251]"
                >
                  {lang === 'te' ? 'ఫిల్టర్ తీసేయండి' : 'Show all'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((item) => {
                const qty = cart[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-24 w-full rounded-xl bg-gray-50 overflow-hidden mb-2">
                        <img
                          src={item.img}
                          alt={item.nameEn}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h4 className="text-xs font-extrabold text-gray-900 leading-snug">
                        {lang === 'te' ? item.nameTe : item.nameEn}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                        {item.unit}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2.5 pt-1">
                      <div>
                        <span className="text-xs font-black text-[#00B251]">
                          ₹{item.price}
                        </span>
                        <span className="text-[10px] text-gray-400 line-through ml-1">
                          ₹{item.oldPrice}
                        </span>
                      </div>

                      {qty === 0 ? (
                        <button
                          onClick={() => addItem(item.id)}
                          className="h-7 w-7 rounded-lg bg-[#00B251] text-white flex items-center justify-center shadow-sm active:scale-90 transition"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#00B251] text-white rounded-lg px-1.5 py-1 space-x-1.5">
                          <button onClick={() => removeItem(item.id)}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-[11px] font-bold">{qty}</span>
                          <button onClick={() => addItem(item.id)}>
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      )}

      {/* SCREEN 2: ALL CATEGORIES (GRONIK 2ND SCREEN STYLE) */}
      {screen === 'categories' && (
        <main className="px-4 pt-4">
          <div className="flex items-center space-x-2 mb-4">
            <button
              onClick={() => setScreen('home')}
              className="p-1.5 bg-white rounded-full shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 text-gray-700" />
            </button>
            <h2 className="text-base font-extrabold text-gray-900">
              {lang === 'te' ? 'అన్ని విభాగాలు' : 'All Categories'}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCat(cat.id);
                  setScreen('home');
                }}
                className={`${cat.bg} rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-gray-100 active:scale-95 transition`}
              >
                <span className="text-3xl mb-2">{cat.emoji}</span>
                <span className="text-xs font-bold text-gray-800 text-center">
                  {lang === 'te' ? cat.nameTe : cat.nameEn}
                </span>
              </button>
            ))}
          </div>
        </main>
      )}
{/* SCREEN 3: CART & CHECKOUT */}
      {screen === 'cart' && (
        <main className="px-4 pt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setScreen('home')}
              className="p-1.5 bg-white rounded-full shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 text-gray-700" />
            </button>
            <h2 className="text-base font-extrabold text-gray-900">
              {lang === 'te' ? 'మీ బాస్కెట్ (Cart)' : 'My Basket'}
            </h2>
          </div>

          {orderPlaced ? (
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm space-y-3">
              <CheckCircle2 className="h-12 w-12 text-[#00B251] mx-auto" />
              <h3 className="text-base font-extrabold text-gray-900">
                {lang === 'te' ? 'ఆర్డర్ విజయవంతమైంది!' : 'Order Confirmed!'}
              </h3>
              <p className="text-xs text-gray-500">
                {lang === 'te'
                  ? 'నెల్లూరు రైతు కేంద్రం నుండి మీ ఇంటికి త్వరలో డెలివరీ అవుతుంది.'
                  : 'Fresh produce from Nellore farms will reach you shortly.'}
              </p>
              <button
                onClick={() => {
                  setOrderPlaced(false);
                  setCart({});
                  setScreen('home');
                }}
                className="bg-[#00B251] text-white text-xs font-bold px-5 py-2.5 rounded-xl"
              >
                {lang === 'te' ? 'మరిన్ని కొనండి' : 'Continue Shopping'}
              </button>
            </div>
          ) : totalItems === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <p className="text-sm font-bold text-gray-500">
                {lang === 'te' ? 'మీ బాస్కెట్ ఖాళీగా ఉంది' : 'Your basket is empty'}
              </p>
              <button
                onClick={() => setScreen('home')}
                className="mt-3 bg-[#00B251] text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                {lang === 'te' ? 'సరుకులు చూడండి' : 'Browse Produce'}
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2.5">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = products.find((p) => p.id === id);
                  if (!item) return null;
                  return (
                    <div
                      key={id}
                      className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.img}
                          alt={item.nameEn}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-extrabold text-gray-900">
                            {lang === 'te' ? item.nameTe : item.nameEn}
                          </h4>
                          <p className="text-[11px] text-gray-400">
                            ₹{item.price} × {qty}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center bg-[#00B251] text-white rounded-lg px-2 py-1 space-x-2">
                        <button onClick={() => removeItem(id)}>
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold">{qty}</span>
                        <button onClick={() => addItem(id)}>
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bill Summary (Nellore ₹499 Free Delivery Rule) */}
              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>{lang === 'te' ? 'వస్తువుల ధర' : 'Item Total'}</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>
                    {lang === 'te'
                      ? 'డెలివరీ ఛార్జీ (₹499 పైన ఉచితం)'
                      : 'Delivery Fee (Free above ₹499)'}
                  </span>
                  <span className="font-bold text-[#00B251]">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between text-sm font-black text-gray-900">
                  <span>{lang === 'te' ? 'మొత్తం చెల్లింపు' : 'Grand Total'}</span>
                  <span>₹{grandTotal}</span>
                </div>

                <button
                  onClick={() => setOrderPlaced(true)}
                  className="w-full mt-2 bg-[#00B251] text-white font-extrabold py-3 rounded-xl shadow-md active:scale-95 transition"
                >
                  {lang === 'te' ? `ఆర్డర్ చేయండి • ₹${grandTotal}` : `Place Order • ₹${grandTotal}`}
                </button>
              </div>
            </>
          )}
        </main>
      )}
{/* SCREEN 4: ROLE SWITCHER (3RD REFERENCE IMAGE STYLE: నమస్కారం! మీరు ఎవరు?) */}
      {screen === 'roles' && (
        <main className="px-4 pt-4 space-y-3">
          <div className="bg-[#0B5D34] text-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-lg font-black">నమస్కారం!</h2>
            <p className="text-xs text-emerald-100 mt-0.5">
              మీరు ఎవరు? ఒక్కటి నొక్కండి • Who are you? Tap one.
            </p>
          </div>

          <div className="space-y-2.5">
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = activeRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setActiveRole(r.id);
                    setScreen('home');
                  }}
                  className={`w-full bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-sm border transition ${
                    isSelected ? 'border-[#00B251] ring-2 ring-[#00B251]/20' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${r.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-extrabold text-gray-900">{r.titleTe}</h3>
                      <p className="text-[11px] font-semibold text-[#00B251]">{r.subTe}</p>
                      <p className="text-[10px] text-gray-400">{r.subEn}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              );
            })}
          </div>

          <a
            href="tel:8328261103"
            className="w-full bg-[#0B5D34] text-white text-xs font-bold py-3.5 rounded-2xl flex items-center justify-center space-x-2 shadow-md"
          >
            <Phone className="h-4 w-4" />
            <span>సహాయం కావాలా? ఫోన్ చేయండి</span>
          </a>
        </main>
      )}

      {/* GRONIK STYLE GREEN BOTTOM NAVIGATION WITH FLOATING WHITE CIRCULAR CART BUTTON */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#00B251] text-white rounded-t-[26px] px-6 py-2.5 flex items-center justify-between shadow-2xl z-40">
        <button
          onClick={() => setScreen('home')}
          className={`flex flex-col items-center space-y-0.5 ${
            screen === 'home' ? 'text-white font-extrabold' : 'text-emerald-100/80'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px]">{lang === 'te' ? 'హోమ్' : 'Home'}</span>
        </button>

        <button
          onClick={() => setScreen('categories')}
          className={`flex flex-col items-center space-y-0.5 ${
            screen === 'categories' ? 'text-white font-extrabold' : 'text-emerald-100/80'
          }`}
        >
          <Grid className="h-5 w-5" />
          <span className="text-[10px]">{lang === 'te' ? 'విభాగాలు' : 'Categories'}</span>
        </button>

        {/* CENTER FLOATING WHITE CART CIRCLE (Exact 1st Image Style) */}
        <button
          onClick={() => setScreen('cart')}
          className="relative -mt-8 h-14 w-14 rounded-full bg-white text-[#00B251] shadow-lg border-4 border-[#F6FBF8] flex items-center justify-center active:scale-95 transition"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-400 text-gray-900 text-[10px] font-black flex items-center justify-center shadow">
              {totalItems}
            </span>
          )}
        </button>

        <button
          onClick={() => setScreen('cart')}
          className={`flex flex-col items-center space-y-0.5 ${
            screen === 'cart' ? 'text-white font-extrabold' : 'text-emerald-100/80'
          }`}
        >
          <ClipboardList className="h-5 w-5" />
          <span className="text-[10px]">{lang === 'te' ? 'ఆర్డర్లు' : 'Orders'}</span>
        </button>

        <button
          onClick={() => setScreen('roles')}
          className={`flex flex-col items-center space-y-0.5 ${
            screen === 'roles' ? 'text-white font-extrabold' : 'text-emerald-100/80'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px]">{lang === 'te' ? 'రోల్స్' : 'Roles'}</span>
        </button>
      </nav>
    </div>
  );
}