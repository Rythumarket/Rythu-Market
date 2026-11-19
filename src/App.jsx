import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search, ShoppingCart, Plus, Home, ClipboardList, User, MapPin,
  Phone, MessageSquare, Sprout, Store, Truck, ShieldCheck, ChevronRight,
  ArrowLeft, CheckCircle2, Wallet, Sparkles, Bell, Globe,
  LocateFixed, LogOut, Printer, Warehouse, ChevronDown,
  Briefcase, Leaf, Shield, Zap, Grid, Check, Tag, Edit3,
  TrendingUp, Package, HelpCircle, Navigation, Camera, Landmark, Volume2, VolumeX, Trash2, Image
} from 'lucide-react';
import { db } from './firebase';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// EmailJS Credentials for Direct Free 6-Digit Email OTP & Automatic Delivery Invoice
const EMAILJS_SERVICE_ID = 'service_auf6gch';
const EMAILJS_TEMPLATE_ID = 'template_z42k41l';
const EMAILJS_INVOICE_TEMPLATE_ID = 'template_fhx6p4e';
const EMAILJS_PUBLIC_KEY = 'Y1UQmUcSoEzEtFR1m';

// Role Hero Images
const FARMER_HERO_IMG = 'https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=500';
const WHOLESALE_HERO_IMG = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80';
const RETAIL_HERO_IMG = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
const DELIVERY_HERO_IMG = 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&w=600&q=80';

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
  curd: 'పెరుగు',
  ghee: 'నెయ్యి',
  atta: 'గోధుమ పిండి',
  oil: 'వంట నూనె',
  dal: 'కందిపప్పు',
  masala: 'మసాలా దినుసులు',
  cashew: 'జీడిపప్పు',
  tea: 'టీ పొడి',
  coffee: 'కాఫీ పొడి',
  icecream: 'ఐస్ క్రీమ్',
  juice: 'పండ్ల రసం',
};

const TE_TO_EN = Object.fromEntries(
  Object.entries(EN_TO_TE).map(([en, te]) => [te, en.charAt(0).toUpperCase() + en.slice(1)])
);

const DEFAULT_CATEGORIES = [
  { id: 'Vegetables', labelEn: 'Vegetables', labelTe: 'కూరగాయలు', isDailyEssential: true, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80' },
  { id: 'Fruits', labelEn: 'Fruits', labelTe: 'పండ్లు', isDailyEssential: true, img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=200&q=80' },
  { id: 'Leafy Greens', labelEn: 'Leafy Greens', labelTe: 'ఆకుకూరలు', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=200&q=80' },
  { id: 'Dairy products', labelEn: 'Dairy products', labelTe: 'పాల ఉత్పత్తులు', isDailyEssential: true, img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=200&q=80' },
  { id: 'Atta, rice, Oils and dals', labelEn: 'Atta, rice, Oils and dals', labelTe: 'పిండి, బియ్యం, నూనెలు & పప్పులు', isDailyEssential: true, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80' },
  { id: 'Masala and Dry fruits', labelEn: 'Masala and Dry fruits', labelTe: 'మసాలా & డ్రై ఫ్రూట్స్', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=200&q=80' },
  { id: 'Packaged food', labelEn: 'Packaged food', labelTe: 'ప్యాకేజ్డ్ ఫుడ్', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=200&q=80' },
  { id: 'Tea, Coffee and more', labelEn: 'Tea, Coffee and more', labelTe: 'టీ, కాఫీ & మరిన్ని', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=200&q=80' },
  { id: 'Icecreams and more', labelEn: 'Icecreams and more', labelTe: 'ఐస్ క్రీమ్స్ & మరిన్ని', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=200&q=80' },
  { id: 'Cold drinks and Juices', labelEn: 'Cold drinks and Juices', labelTe: 'కూల్ డ్రింక్స్ & జ్యూస్‌లు', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80' },
];

const DEFAULT_COUPONS = [
  { id: 'cp_1', code: 'RYTHU30', title: 'Flat ₹30 OFF on Fresh Orders', subtitle: 'Valid on orders above ₹149', discount: 30, minOrder: 149, active: true, badge: 'POPULAR' },
  { id: 'cp_2', code: 'FARM50', title: 'Flat ₹50 OFF Direct Farm Basket', subtitle: 'Valid on orders above ₹299', discount: 50, minOrder: 299, active: true, badge: 'MEGA SAVER' },
  { id: 'cp_3', code: 'DAIRY20', title: '₹20 Cashback on Morning Milk & Dairy', subtitle: 'Valid on orders above ₹99', discount: 20, minOrder: 99, active: true, badge: 'MORNING' },
];

const QUALITY_GRADES = ['Grade A (Export)', 'Grade A', 'Grade B', 'Organic'];

const DEFAULT_MASTER_CATALOG = [
  { id: 'cat_tomato', nameEn: 'Fresh Tomato', nameTe: 'టమాటా', cat: 'Vegetables', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_onion', nameEn: 'Red Onion', nameTe: 'ఉల్లిపాయలు', cat: 'Vegetables', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_mango', nameEn: 'Banganapalli Mango', nameTe: 'మామిడిపండు', cat: 'Fruits', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_spinach', nameEn: 'Fresh Spinach (Palakura)', nameTe: 'పాలకూర', cat: 'Leafy Greens', defaultUnit: 'Grams', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_milk', nameEn: 'Fresh Farm Buffalo Milk', nameTe: 'చిక్కటి గేదె పాలు', cat: 'Dairy products', defaultUnit: 'Litres', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_rice', nameEn: 'Nellore Sona Masuri Rice', nameTe: 'సోనా మసూరి బియ్యం', cat: 'Atta, rice, Oils and dals', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_masala', nameEn: 'Guntur Chilli & Cashew Pack', nameTe: 'మసాలా & జీడిపప్పు', cat: 'Masala and Dry fruits', defaultUnit: 'Grams', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_packaged', nameEn: 'Crispy Mixture & Snacks', nameTe: 'ప్యాకేజ్డ్ స్నాక్స్', cat: 'Packaged food', defaultUnit: 'Grams', img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_tea', nameEn: 'Assam Gold Tea & Filter Coffee', nameTe: 'టీ & ఫిల్టర్ కాఫీ', cat: 'Tea, Coffee and more', defaultUnit: 'Grams', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_icecream', nameEn: 'Vanilla & Mango Family Pack Ice Cream', nameTe: 'ఐస్ క్రీమ్ ఫ్యామిలీ ప్యాక్', cat: 'Icecreams and more', defaultUnit: 'Litres', img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_juice', nameEn: 'Fresh Mango Juice & Cold Drink', nameTe: 'మామిడి జ్యూస్ & కూల్ డ్రింక్', cat: 'Cold drinks and Juices', defaultUnit: 'Litres', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80' },
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
  { id: 'p1', postedByRole: 'farmer', farmerId: 'u_farm_1', farmerName: 'Ramaiah Farm • Kovur, Nellore', sellerLat: 14.4920, sellerLng: 79.9850, distanceKm: 12, nameEn: 'Fresh Tomato', nameTe: 'టమాటా', cat: 'Vegetables', quality: 'Grade A', unit: 'Kg', packLabel: '1 Kg', mrp: 48, retailPrice: 36, farmerDirectPrice: 24, wholesalePrice: 28, minWholesaleQty: 25, stockKg: 500, inStock: true, desc: 'Fresh and juicy country tomatoes harvested this morning from Kovur farms, Nellore.', availableFrom: 'Available Now', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80' },
  { id: 'p2', postedByRole: 'farmer', farmerId: 'u_farm_2', farmerName: 'Subba Rao Farm • Buchi, Nellore', sellerLat: 14.5360, sellerLng: 79.8820, distanceKm: 18, nameEn: 'Red Onion', nameTe: 'ఉల్లిపాయలు', cat: 'Vegetables', quality: 'Grade A', unit: 'Kg', packLabel: '1 Kg', mrp: 44, retailPrice: 34, farmerDirectPrice: 22, wholesalePrice: 26, minWholesaleQty: 50, stockKg: 800, inStock: true, desc: 'Farm-cured crisp red onions sourced directly from Buchireddypalem growers.', availableFrom: 'Tomorrow Morning 6:00 AM', img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=500&q=80' },
  { id: 'p3', postedByRole: 'farmer', farmerId: 'u_farm_3', farmerName: 'Rapur Orchards • Nellore', sellerLat: 14.1980, sellerLng: 79.5380, distanceKm: 32, nameEn: 'Banganapalli Mango', nameTe: 'మామిడిపండు', cat: 'Fruits', quality: 'Grade A (Export)', unit: 'Kg', packLabel: '1 Kg', mrp: 140, retailPrice: 110, farmerDirectPrice: 85, wholesalePrice: 95, minWholesaleQty: 20, stockKg: 300, inStock: true, desc: 'Naturally ripened carbide-free Banganapalli mangoes from Rapur orchards.', availableFrom: 'Available Now', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80' },
  { id: 'p4', postedByRole: 'retail', farmerId: 'u_ret_1', farmerName: 'Sri Lakshmi Fresh Mart • Magunta Layout, Nellore', sellerLat: 14.4426, sellerLng: 79.9865, distanceKm: 6, nameEn: 'Fresh Spinach (Palakura)', nameTe: 'పాలకూర', cat: 'Leafy Greens', quality: 'Organic', unit: 'Grams', packLabel: '500 Grams', mrp: 28, retailPrice: 20, farmerDirectPrice: 14, wholesalePrice: 16, minWholesaleQty: 15, stockKg: 150, inStock: true, desc: 'Pesticide-free tender green spinach bundles harvested at dawn.', availableFrom: 'After 1 Hour', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80' },
  { id: 'p_dairy_1', postedByRole: 'farmer', farmerId: 'u_farm_4', farmerName: 'Gokulam Dairy Farm • Nellore', sellerLat: 14.4480, sellerLng: 79.9820, distanceKm: 5, nameEn: 'Pure Farm Buffalo Milk', nameTe: 'చిక్కటి గేదె పాలు', cat: 'Dairy products', quality: 'Organic', unit: 'Litres', packLabel: '1 Litre', mrp: 80, retailPrice: 68, farmerDirectPrice: 56, wholesalePrice: 60, minWholesaleQty: 20, stockKg: 200, inStock: true, desc: 'Unadulterated fresh morning buffalo milk from Nellore dairy farms.', availableFrom: 'Available Now', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80' },
  { id: 'p5', postedByRole: 'wholesale', farmerId: 'u_ws_1', farmerName: 'Nellore Heritage Wholesale Mills • Stonehousepet', sellerLat: 14.4510, sellerLng: 79.9910, distanceKm: 8, nameEn: 'Nellore Sona Masuri Rice', nameTe: 'సోనా మసూరి బియ్యం', cat: 'Atta, rice, Oils and dals', quality: 'Grade A', unit: 'Kg', packLabel: '5 Kg', mrp: 340, retailPrice: 285, farmerDirectPrice: 250, wholesalePrice: 265, minWholesaleQty: 10, stockKg: 1200, inStock: true, desc: 'Authentic aged Nellore Sona Masuri steam rice direct from local rice mills.', availableFrom: 'Available Now', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80' },
  { id: 'p_masala_1', postedByRole: 'wholesale', farmerId: 'u_ws_1', farmerName: 'Nellore Spice & Dry Fruit Traders', sellerLat: 14.4510, sellerLng: 79.9910, distanceKm: 7, nameEn: 'Premium Cashew & Garam Masala Pack', nameTe: 'జీడిపప్పు & గరం మసాలా', cat: 'Masala and Dry fruits', quality: 'Grade A (Export)', unit: 'Grams', packLabel: '250 Grams', mrp: 240, retailPrice: 195, farmerDirectPrice: 165, wholesalePrice: 175, minWholesaleQty: 10, stockKg: 300, inStock: true, desc: 'Whole W240 cashews and aromatic home-ground spices.', availableFrom: 'Available Now', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80' },
  { id: 'p_pkg_1', postedByRole: 'retail', farmerId: 'u_ret_1', farmerName: 'Sri Lakshmi Fresh Mart • Magunta Layout, Nellore', sellerLat: 14.4426, sellerLng: 79.9865, distanceKm: 4, nameEn: 'Nellore Karam Mixture & Biscuits', nameTe: 'కారం మిక్చర్ & బిస్కెట్లు', cat: 'Packaged food', quality: 'Grade A', unit: 'Grams', packLabel: '500 Grams', mrp: 120, retailPrice: 95, farmerDirectPrice: 80, wholesalePrice: 85, minWholesaleQty: 15, stockKg: 250, inStock: true, desc: 'Freshly packed crunchy savory mixture and bakery biscuits.', availableFrom: 'Available Now', img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=500&q=80' },
  { id: 'p_tea_1', postedByRole: 'retail', farmerId: 'u_ret_1', farmerName: 'Sri Lakshmi Fresh Mart • Magunta Layout, Nellore', sellerLat: 14.4426, sellerLng: 79.9865, distanceKm: 4, nameEn: 'Strong Dust Tea & Filter Coffee Powder', nameTe: 'టీ పొడి & ఫిల్టర్ కాఫీ', cat: 'Tea, Coffee and more', quality: 'Grade A', unit: 'Grams', packLabel: '250 Grams', mrp: 150, retailPrice: 125, farmerDirectPrice: 105, wholesalePrice: 112, minWholesaleQty: 12, stockKg: 180, inStock: true, desc: 'Rich aroma Assam tea dust and Chikmagalur filter coffee blend.', availableFrom: 'Available Now', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80' },
  { id: 'p_ice_1', postedByRole: 'retail', farmerId: 'u_ret_1', farmerName: 'Sri Lakshmi Fresh Mart • Magunta Layout, Nellore', sellerLat: 14.4426, sellerLng: 79.9865, distanceKm: 4, nameEn: 'Alphonso Mango & Vanilla Ice Cream Tub', nameTe: 'మామిడి & వెనీలా ఐస్ క్రీమ్', cat: 'Icecreams and more', quality: 'Grade A', unit: 'Litres', packLabel: '1 Litre', mrp: 220, retailPrice: 185, farmerDirectPrice: 155, wholesalePrice: 165, minWholesaleQty: 10, stockKg: 90, inStock: true, desc: 'Creamy real-milk Alphonso mango and vanilla family tub.', availableFrom: 'Available Now', img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=500&q=80' },
  { id: 'p_juice_1', postedByRole: 'retail', farmerId: 'u_ret_1', farmerName: 'Sri Lakshmi Fresh Mart • Magunta Layout, Nellore', sellerLat: 14.4426, sellerLng: 79.9865, distanceKm: 4, nameEn: 'Chilled Mango Pulp Juice & Cola Pack', nameTe: 'మామిడి జ్యూస్ & కూల్ డ్రింక్', cat: 'Cold drinks and Juices', quality: 'Grade A', unit: 'Litres', packLabel: '1 Litre', mrp: 90, retailPrice: 75, farmerDirectPrice: 60, wholesalePrice: 65, minWholesaleQty: 20, stockKg: 300, inStock: true, desc: 'Refreshing chilled fruit juice and carbonated cold drinks.', availableFrom: 'Available Now', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80' },
];

const compressImageFileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSide = 360;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.78));
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

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

// Live Scooter Overlay Map Component
const LiveScooterMap = ({ lat, lng, title, height = 200, badgeText }) => (
  <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#15803D] shadow-md" style={{ height }}>
    <iframe
      title={title}
      width="100%"
      height={height}
      style={{ border: 0 }}
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008}%2C${lat - 0.008}%2C${lng + 0.008}%2C${lat + 0.008}&layer=mapnik&marker=${lat}%2C${lng}`}
    />
    {/* Animated Scooter Icon Badge at Map Center */}
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div className="relative flex flex-col items-center -mt-6">
        <span className="bg-[#0F5132] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow mb-0.5">
          Rider Live
        </span>
        <div className="h-10 w-10 rounded-full bg-white border-2 border-[#15803D] shadow-lg flex items-center justify-center text-xl animate-bounce">
          🛵
        </div>
      </div>
    </div>
    {badgeText && (
      <span className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[10px] font-extrabold px-3 py-1 rounded-full">
        {badgeText}
      </span>
    )}
  </div>
);

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

const buildPickupStopsFromItems = (itemsArr) => {
  const stopMap = new Map();
  itemsArr.forEach((item) => {
    const sellerKey = `${item.postedByRole || 'farmer'}__${item.sellerName || 'Rythu Hub'}`;
    if (!stopMap.has(sellerKey)) {
      stopMap.set(sellerKey, {
        stopId: 'stop_' + (stopMap.size + 1),
        sellerId: item.sellerId || null,
        sellerName: item.sellerName || 'Rythu Basket Hub, Nellore',
        sellerRole: item.postedByRole || 'farmer',
        sellerLat: item.sellerLat || 14.4450,
        sellerLng: item.sellerLng || 79.9850,
        itemsSummary: [`${item.qty} ${item.unit || 'Kg'} ${item.name}`],
        stopSubtotal: item.price * item.qty,
        stopStatus: 'Pending',
        acceptedByUserId: null,
        acceptedByUserName: null,
        pickedUp: false,
      });
    } else {
      const existing = stopMap.get(sellerKey);
      existing.itemsSummary.push(`${item.qty} ${item.unit || 'Kg'} ${item.name}`);
      existing.stopSubtotal += item.price * item.qty;
    }
  });
  return Array.from(stopMap.values());
};

const computeOrderAcceptanceStatus = (stops, currentStatus) => {
  if (['Partner Assigned', 'Out for Delivery', 'Delivered'].includes(currentStatus)) {
    return currentStatus;
  }
  const activeStops = stops.filter((s) => s.stopStatus !== 'Declined');
  if (activeStops.length === 0) return 'Order Placed';
  const acceptedCount = activeStops.filter((s) => s.stopStatus === 'Accepted').length;
  if (acceptedCount === 0) return 'Order Placed';
  if (acceptedCount < activeStops.length) return 'Order Partially Accepted';
  return 'Order Fully Accepted';
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('invoiceData');
    if (raw) {
      try {
        const parsed = JSON.parse(decodeURIComponent(raw));
        setSharedInvoiceData(parsed);
        setTimeout(() => window.print(), 800);
      } catch {
        // ignore
      }
    }
  }, []);

  const [showPermissionPrompt, setShowPermissionPrompt] = useState(() => {
    try {
      return localStorage.getItem('rythu_permissions_granted') !== 'true';
    } catch {
      return true;
    }
  });

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

  // Admin-Managed Categories, Master Catalog & Coupons (Synced via Firestore)
  const [categoriesList, setCategoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem('rythu_managed_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  const [masterCatalog, setMasterCatalog] = useState(() => {
    try {
      const saved = localStorage.getItem('rythu_master_catalog');
      return saved ? JSON.parse(saved) : DEFAULT_MASTER_CATALOG;
    } catch {
      return DEFAULT_MASTER_CATALOG;
    }
  });

  const [couponsList, setCouponsList] = useState(() => {
    try {
      const saved = localStorage.getItem('rythu_managed_coupons');
      return saved ? JSON.parse(saved) : DEFAULT_COUPONS;
    } catch {
      return DEFAULT_COUPONS;
    }
  });

  useEffect(() => {
    try { localStorage.setItem('rythu_managed_categories', JSON.stringify(categoriesList)); } catch {}
  }, [categoriesList]);

  useEffect(() => {
    try { localStorage.setItem('rythu_master_catalog', JSON.stringify(masterCatalog)); } catch {}
  }, [masterCatalog]);

  useEffect(() => {
    try { localStorage.setItem('rythu_managed_coupons', JSON.stringify(couponsList)); } catch {}
  }, [couponsList]);

  useEffect(() => {
    try { localStorage.setItem('rythu_registered_users', JSON.stringify(users)); } catch {}
  }, [users]);

// Auth States
  const [authScreen, setAuthScreen] = useState('login');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState('');
  const [emailOtpExpiry, setEmailOtpExpiry] = useState(0);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [authMsg, setAuthMsg] = useState('');

  // Role-Specific Registration Form States
  const [regName, setRegName] = useState('');
  const [regOwnerName, setRegOwnerName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regAadhaar, setRegAadhaar] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regVillage, setRegVillage] = useState('');
  const [regMandal, setRegMandal] = useState('');
  const [regDistrict, setRegDistrict] = useState('Nellore');
  const [regState, setRegState] = useState('Andhra Pradesh');
  const [regGstNumber, setRegGstNumber] = useState('');
  const [regStoreType, setRegStoreType] = useState('Distributor');
  const [regLandAcres, setRegLandAcres] = useState('');
  const [regMajorCrops, setRegMajorCrops] = useState('Tomato, Paddy, Chillies');
  const [regVehicleType, setRegVehicleType] = useState('Bike / Scooter');
  const [regVehicleNumber, setRegVehicleNumber] = useState('');
  const [regBankAccount, setRegBankAccount] = useState('');
  const [regIfscCode, setRegIfscCode] = useState('');
  const [regUpiId, setRegUpiId] = useState('');
  const [regPhotoName, setRegPhotoName] = useState('');
  const [regDocName, setRegDocName] = useState('');
  const [regTermsAccepted, setRegTermsAccepted] = useState(true);
  const [regReferralCode, setRegReferralCode] = useState('');
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtpInput, setRegOtpInput] = useState('');
  const [showWelcomeSmile, setShowWelcomeSmile] = useState(false);

  // Navigation & Screens
  const [activeTab, setActiveTab] = useState('home');
  const [detailProduct, setDetailProduct] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [deliverySlot] = useState('Today, 6:00 PM – 8:00 PM');

  const [toast, setToast] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');

  // Location & Map Pin States
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 'addr1', tag: 'Home', title: 'Vedayapalem Main Road', full: 'Vedayapalem, Nellore, Andhra Pradesh - 524004', distance: '57 m', lat: 14.4285, lng: 79.9692 },
    { id: 'addr2', tag: 'Office', title: 'Magunta Layout, Nellore', full: 'Magunta Layout Main Road, Dargamitta, Nellore - 524003', distance: '2.5 kms', lat: 14.4426, lng: 79.9865 },
  ]);
  const [activeAddrId, setActiveAddrId] = useState('addr1');
  const [locSearch, setLocSearch] = useState('');
  const [mapPinCoords, setMapPinCoords] = useState({ lat: 14.4426, lng: 79.9865 });
  const [mapPinTitle, setMapPinTitle] = useState('Vedayapalem, Nellore');
  const [mapPinFullAddress, setMapPinFullAddress] = useState('Vedayapalem, Nellore, Andhra Pradesh, 524004');
  const [mapPinTag] = useState('Home');
  const [isEditingPinText, setIsEditingPinText] = useState(false);
  const [isLocatingGps, setIsLocatingGps] = useState(false);

  // Cart & Payments
  const [cart, setCart] = useState({ p1: 2, p4: 1 });
  const [useWalletBalance] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [appliedCouponObj, setAppliedCouponObj] = useState(null);
  const [payMode, setPayMode] = useState('phonepe');
  const [utrRefInput, setUtrRefInput] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardError, setCardError] = useState('');
  const [merchantUpiId] = useState('madhavam.com@ybl');

  // B2B States
  const [b2bDeliveryMode, setB2bDeliveryMode] = useState('pickup');

  // Scratch Card & Notifications
  const [scratchCard, setScratchCard] = useState(null);
  const [notifications, setNotifications] = useState([
    'Wallet Alert: Cashback expires in 15 days (48h–6h reminder active).',
  ]);
  const [orders, setOrders] = useState([]);

  // Seller Post Product States (Search + Category Dropdown + Catalog Picker)
  const [sellerCatalogFilter, setSellerCatalogFilter] = useState('All');
  const [sellerCatalogSearch, setSellerCatalogSearch] = useState('');
  const [selectedCatalogId, setSelectedCatalogId] = useState('cat_tomato');
  const [fNameEn, setFNameEn] = useState('Fresh Tomato');
  const [fNameTe, setFNameTe] = useState('టమాటా');
  const [fCat, setFCat] = useState('Vegetables');
  const [fQuality, setFQuality] = useState('Grade A');
  const [fQty, setFQty] = useState('100');
  const [fUnit, setFUnit] = useState('Kg');
  const [fPrice, setFPrice] = useState('22');
  const [fImg, setFImg] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80');
  const [fAvailTime, setFAvailTime] = useState('Available Now');

  // Admin Management Tabs & Form States
  const [adminTab, setAdminTab] = useState('catalogue'); // 'catalogue' | 'categories' | 'coupons' | 'approvals'
  const [catNameEn, setCatNameEn] = useState('');
  const [catNameTe, setCatNameTe] = useState('');
  const [catCategory, setCatCategory] = useState('Vegetables');
  const [catUnit, setCatUnit] = useState('Kg');
  const [catImgPreview, setCatImgPreview] = useState('');
  const [catImgUrl, setCatImgUrl] = useState('');

  // Admin Manage Categories Form States
  const [editingCatId, setEditingCatId] = useState(null);
  const [newCatEn, setNewCatEn] = useState('');
  const [newCatTe, setNewCatTe] = useState('');
  const [newCatDaily, setNewCatDaily] = useState(true);
  const [newCatImgPreview, setNewCatImgPreview] = useState('');
  const [newCatImgUrl, setNewCatImgUrl] = useState('');

  // Admin Manage Coupons Form States
  const [editingCouponId, setEditingCouponId] = useState(null);
  const [cpCode, setCpCode] = useState('');
  const [cpTitle, setCpTitle] = useState('');
  const [cpDiscount, setCpDiscount] = useState('30');
  const [cpMinOrder, setCpMinOrder] = useState('149');
  const [cpBadge, setCpBadge] = useState('OFFER');

  // Delivery & Admin States
  const [delivFilter, setDelivFilter] = useState('available');
  const [scratchMin] = useState(4);
  const [scratchMax] = useState(25);
  const [offersEnabled] = useState(true);

  // 15-Second Ringtone Alert Controller
  const [isRinging, setIsRinging] = useState(false);
  const lastRungKeyRef = useRef(null);
  const ringTimerRef = useRef(null);

  const stopAlertRingtone = useCallback(() => {
    if (ringTimerRef.current) {
      clearInterval(ringTimerRef.current);
      ringTimerRef.current = null;
    }
    setIsRinging(false);
  }, []);

  const play15SecondAlertTone = useCallback(() => {
    stopAlertRingtone();
    setIsRinging(true);

    const playSingleChime = () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.46);
      } catch {}
    };

    playSingleChime();
    let elapsed = 0;
    ringTimerRef.current = setInterval(() => {
      elapsed += 1;
      if (elapsed >= 15) {
        stopAlertRingtone();
      } else {
        playSingleChime();
      }
    }, 1000);
  }, [stopAlertRingtone]);

const getPendingStopsForSeller = useCallback(
    (ord) => {
      if (!currentUser || !['farmer', 'wholesale', 'retail'].includes(currentUser.role)) return [];
      if (ord.buyerId === currentUser.id || ord.status === 'Delivered') return [];
      const stops = ord.pickupStops || buildPickupStopsFromItems(ord.items || []);
      return stops.filter(
        (st) =>
          st.sellerRole === currentUser.role &&
          st.stopStatus === 'Pending' &&
          !(ord.declinedBy || []).includes(`${currentUser.id}_${st.stopId}`)
      );
    },
    [currentUser]
  );

  useEffect(() => {
    if (!currentUser || !['farmer', 'wholesale', 'retail'].includes(currentUser.role)) {
      stopAlertRingtone();
      return;
    }
    const ordersWithMyPendingStops = orders.filter((o) => getPendingStopsForSeller(o).length > 0);
    if (ordersWithMyPendingStops.length > 0) {
      const newest = ordersWithMyPendingStops[0];
      const ringKey = `${newest.id}_${currentUser.role}`;
      if (lastRungKeyRef.current !== ringKey) {
        lastRungKeyRef.current = ringKey;
        play15SecondAlertTone();
      }
    } else {
      stopAlertRingtone();
    }
  }, [currentUser, orders, getPendingStopsForSeller, play15SecondAlertTone, stopAlertRingtone]);

  const notify = (m) => {
    setToast(m);
    setTimeout(() => setToast(''), 3500);
  };

  // Hardware Back Button Handler
  const handleHardwareBack = useCallback(() => {
    if (sharedInvoiceData) {
      window.history.replaceState({}, '', '/');
      setSharedInvoiceData(null);
      return;
    }
    if (currentUser) {
      if (activeTab !== 'home') {
        setActiveTab('home');
        window.history.pushState({ rythuNav: true }, '');
        return;
      }
      setCurrentUser(null);
      setSelectedRole(null);
      window.history.pushState({ rythuNav: true }, '');
      return;
    }
    if (selectedRole) {
      if (authScreen === 'register') {
        setAuthScreen('login');
        window.history.pushState({ rythuNav: true }, '');
        return;
      }
      setSelectedRole(null);
      window.history.pushState({ rythuNav: true }, '');
    }
  }, [sharedInvoiceData, currentUser, activeTab, selectedRole, authScreen]);

  useEffect(() => {
    window.history.pushState({ rythuNav: true }, '');
    const onPopState = () => {
      handleHardwareBack();
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [handleHardwareBack]);

  const handleGrantDevicePermissions = () => {
    try { localStorage.setItem('rythu_permissions_granted', 'true'); } catch {}
    setShowPermissionPrompt(false);

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = Number(pos.coords.latitude.toFixed(5));
          const lng = Number(pos.coords.longitude.toFixed(5));
          setMapPinCoords({ lat, lng });
          await fetchAddressFromCoords(lat, lng);
          notify('Location, Message & Phone permissions enabled!');
        },
        () => notify('Permissions saved!'),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  };

  // Real-Time Cloud Firestore Sync (Orders, Products, Master Catalog, Categories, Coupons, Users)
  useEffect(() => {
    const unsubOrders = onSnapshot(
      collection(db, 'orders'),
      (snapshot) => {
        const liveOrders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        liveOrders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setOrders(liveOrders);
        setTrackingOrder((prev) => (prev ? liveOrders.find((o) => o.id === prev.id) || prev : null));
      },
      () => {}
    );

    const unsubProducts = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        if (!snapshot.empty) {
          const liveProds = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setProducts((prev) => {
            const ids = new Set(liveProds.map((p) => p.id));
            return [...liveProds, ...prev.filter((p) => !ids.has(p.id))];
          });
        }
      },
      () => {}
    );

    const unsubCatalog = onSnapshot(
      collection(db, 'masterCatalog'),
      (snapshot) => {
        if (!snapshot.empty) {
          const liveCat = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setMasterCatalog((prev) => {
            const ids = new Set(liveCat.map((c) => c.id));
            return [...liveCat, ...prev.filter((c) => !ids.has(c.id))];
          });
        }
      },
      () => {}
    );

    const unsubCategories = onSnapshot(
      collection(db, 'categories'),
      (snapshot) => {
        if (!snapshot.empty) {
          const liveCategories = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCategoriesList(liveCategories);
        }
      },
      () => {}
    );

    const unsubCoupons = onSnapshot(
      collection(db, 'coupons'),
      (snapshot) => {
        if (!snapshot.empty) {
          const liveCoupons = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setCouponsList(liveCoupons);
        }
      },
      () => {}
    );

    const unsubUsers = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        if (!snapshot.empty) {
          const liveUsers = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setUsers((prev) => {
            const ids = new Set(liveUsers.map((u) => u.id));
            return [...liveUsers, ...prev.filter((u) => !ids.has(u.id))];
          });
        }
      },
      () => {}
    );

    return () => {
      unsubOrders();
      unsubProducts();
      unsubCatalog();
      unsubCategories();
      unsubCoupons();
      unsubUsers();
    };
  }, []);

  // Continuous Live GPS Broadcast while Delivery Partner is Active
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'delivery' || !navigator.geolocation) return;
    const activeAssigned = orders.filter(
      (o) =>
        o.driverMobile === currentUser.mobile &&
        (o.status === 'Partner Assigned' || o.status === 'Out for Delivery')
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
    } catch {}
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

  const handleDirectLogin = (e) => {
    e.preventDefault();
    const raw = loginIdentifier.trim();
    if (!raw) {
      setAuthMsg('Enter your registered Mobile Number or Email ID.');
      return;
    }
    const digitsOnly = raw.replace(/\D/g, '');
    const lowerEmail = raw.toLowerCase();

    const existing = users.find(
      (u) =>
        u.role === selectedRole &&
        ((digitsOnly.length === 10 && u.mobile === digitsOnly) ||
          (u.email && u.email.toLowerCase() === lowerEmail))
    );

    if (!existing) {
      setAuthMsg('Account not found for this role. Please complete 1-time Registration with Email OTP.');
      return;
    }

    setAuthMsg('');
    setCurrentUser(existing);
    setActiveTab('home');
    window.history.pushState({ rythuNav: true }, '');
  };

  const handleSendRegisterOtp = async () => {
    const cleanMobile = regMobile.replace(/\D/g, '');
    const cleanEmail = regEmail.trim().toLowerCase();

    if (!regName.trim()) {
      setAuthMsg('Please enter Name / Store Name.');
      return;
    }
    if (!isValidIndianMobile(cleanMobile)) {
      setAuthMsg('Enter a valid 10-digit Indian Mobile Number.');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setAuthMsg('Valid Email ID is mandatory to receive 6-digit verification OTP.');
      return;
    }
    if (!regTermsAccepted) {
      setAuthMsg('Please accept Terms & Conditions and Privacy Policy.');
      return;
    }

    const already = users.find(
      (u) =>
        u.role === selectedRole &&
        (u.mobile === cleanMobile || (u.email || '').toLowerCase() === cleanEmail)
    );
    if (already) {
      setAuthMsg('Mobile or Email already registered for this role. Please Login directly.');
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

    const fullLocation =
      selectedRole === 'farmer'
        ? `${regVillage || regAddress}, ${regMandal || ''}, ${regDistrict || 'Nellore'}`.replace(/,\s*,/g, ',')
        : regAddress.trim() || `${regVillage || 'Nellore'}, ${regState}`;

const newUser = {
      id: 'u_' + Date.now(),
      role: selectedRole,
      name: regName.trim(),
      ownerName: regOwnerName.trim() || regName.trim(),
      mobile: cleanMobile,
      email: cleanEmail,
      aadhaarOptional: regAadhaar.trim() || null,
      address: fullLocation,
      lat: mapPinCoords.lat,
      lng: mapPinCoords.lng,
      village: regVillage.trim(),
      mandal: regMandal.trim(),
      district: regDistrict.trim(),
      state: regState,
      gstNumber: regGstNumber.trim(),
      storeType: regStoreType,
      landAcres: regLandAcres.trim(),
      majorCrops: regMajorCrops.trim(),
      vehicleType: regVehicleType,
      vehicleNumber: regVehicleNumber.trim().toUpperCase(),
      bankAccount: regBankAccount.trim(),
      ifscCode: regIfscCode.trim().toUpperCase(),
      upiId: regUpiId.trim(),
      approved: !needsApproval,
      wallet: 0,
      referralsCount: 0,
      ordersCompleted: 0,
      referredBy: regReferralCode.trim() || null,
    };

    setUsers([newUser, ...users]);
    setDoc(doc(db, 'users', newUser.id), newUser).catch(() => {});

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
    window.history.pushState({ rythuNav: true }, '');
    setTimeout(() => setShowWelcomeSmile(false), 3500);
  };

  const handleStrictLogout = () => {
    stopAlertRingtone();
    setCurrentUser(null);
    setSelectedRole(null);
    setLoginIdentifier('');
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
    } catch {}
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
    setCurrentUser((prev) => (prev ? { ...prev, address: mapPinTitle, lat: mapPinCoords.lat, lng: mapPinCoords.lng } : prev));
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

  const handleSelectCatalogProduct = (item) => {
    if (!item) {
      setSelectedCatalogId('custom');
      setFNameEn('');
      setFNameTe('');
      setFImg('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80');
      return;
    }
    setSelectedCatalogId(item.id);
    setFNameEn(item.nameEn);
    setFNameTe(item.nameTe);
    setFCat(item.cat || 'Vegetables');
    setFUnit(item.defaultUnit || 'Kg');
    setFImg(item.img);
  };

  const handlePublishRoleProduct = (e, roleSource) => {
    e.preventDefault();
    if (!fNameEn.trim() || !fPrice) return;
    const baseRate = Number(fPrice);
    const newProd = {
      id: 'p_' + Date.now(),
      postedByRole: roleSource,
      farmerId: currentUser.id,
      farmerName: `${currentUser.name} • ${currentUser.address}`,
      sellerLat: currentUser.lat || mapPinCoords.lat,
      sellerLng: currentUser.lng || mapPinCoords.lng,
      distanceKm: 12,
      nameEn: fNameEn.trim(),
      nameTe: fNameTe.trim() || fNameEn.trim(),
      cat: fCat,
      quality: fQuality,
      unit: fUnit,
      packLabel: `1 ${fUnit}`,
      mrp: baseRate + 16,
      retailPrice: roleSource === 'retail' ? baseRate : baseRate + 10,
      farmerDirectPrice: baseRate,
      wholesalePrice: roleSource === 'wholesale' ? baseRate : baseRate + 4,
      minWholesaleQty: 25,
      stockKg: Number(fQty),
      inStock: true,
      desc: `${fQuality} ${fNameEn.trim()} (${fCat}) listed by ${currentUser.name}.`,
      availableFrom: fAvailTime,
      img: fImg || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    };
    setProducts((prev) => [newProd, ...prev]);
    setDoc(doc(db, 'products', newProd.id), newProd).catch(() => {});
    notify(`Published ${newProd.nameEn} (${fCat} • ${fQuality} • ${fQty} ${fUnit})!`);
  };

  // Seller Product Form with Search Bar + Category Dropdown + Admin Catalog Picker
  const renderPostProductForm = (roleSource, submitLabel) => {
    const q = sellerCatalogSearch.trim().toLowerCase();
    const filteredSellerCatalog = masterCatalog.filter((c) => {
      const catOk = sellerCatalogFilter === 'All' || c.cat === sellerCatalogFilter;
      const searchOk =
        !q ||
        c.nameEn.toLowerCase().includes(q) ||
        c.nameTe.includes(sellerCatalogSearch.trim()) ||
        c.cat.toLowerCase().includes(q);
      return catOk && searchOk;
    });

    return (
      <form onSubmit={(e) => handlePublishRoleProduct(e, roleSource)} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-extrabold text-[#15803D]">
              1. Search or Select from Admin Catalog ({masterCatalog.length})
            </label>
            <button
              type="button"
              onClick={() => handleSelectCatalogProduct(null)}
              className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                selectedCatalogId === 'custom' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600'
              }`}
            >
              + Custom Item
            </button>
          </div>

          {/* Search Bar + Category Dropdown Side by Side */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2">
              <Search className="h-3.5 w-3.5 text-slate-400 mr-1.5 flex-shrink-0" />
              <input
                type="text"
                value={sellerCatalogSearch}
                onChange={(e) => {
                  setSellerCatalogSearch(e.target.value);
                  if (e.target.value.trim()) {
                    handleFarmerEnChange(e.target.value);
                  }
                }}
                placeholder="Search item..."
                className="w-full bg-transparent text-[11px] font-bold focus:outline-none"
              />
            </div>

            <select
              value={sellerCatalogFilter}
              onChange={(e) => setSellerCatalogFilter(e.target.value)}
              className="bg-emerald-50/70 border border-emerald-200 rounded-xl px-2.5 py-2 font-extrabold text-[11px] text-[#0F5132]"
            >
              <option value="All">All Categories</option>
              {categoriesList.map((c) => (
                <option key={c.id} value={c.labelEn}>{c.labelEn}</option>
              ))}
            </select>
          </div>

 <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-0.5">
            {filteredSellerCatalog.map((item) => {
              const isSel = selectedCatalogId === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleSelectCatalogProduct(item)}
                  className={`rounded-2xl p-2 border text-center transition ${
                    isSel ? 'border-2 border-[#15803D] bg-emerald-50 shadow-sm' : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <img src={item.img} alt={item.nameEn} className="h-12 w-12 rounded-xl object-cover mx-auto mb-1" />
                  <p className="text-[10px] font-extrabold text-slate-900 truncate">{item.nameEn}</p>
                  <p className="text-[9px] font-bold text-[#15803D] truncate">{item.nameTe}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Product Preview & Editable Name Fields */}
        <div className="flex items-center space-x-2.5 bg-emerald-50/50 border border-emerald-200 rounded-2xl p-2.5">
          <img src={fImg} alt={fNameEn} className="h-12 w-12 rounded-xl object-cover flex-shrink-0 bg-white" />
          <div className="grid grid-cols-2 gap-1.5 flex-1">
            <input
              type="text"
              required
              value={fNameEn}
              onChange={(e) => handleFarmerEnChange(e.target.value)}
              placeholder="Product Name (EN)"
              className="w-full bg-white border rounded-xl px-2.5 py-2 font-bold text-xs"
            />
            <input
              type="text"
              required
              value={fNameTe}
              onChange={(e) => handleFarmerTeChange(e.target.value)}
              placeholder="పేరు తెలుగులో"
              className="w-full bg-white border rounded-xl px-2.5 py-2 font-bold text-xs text-[#15803D]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-bold text-slate-400">Category</label>
            <select value={fCat} onChange={(e) => setFCat(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-extrabold text-slate-800">
              {categoriesList.map((c) => (
                <option key={c.id} value={c.labelEn}>{c.labelEn}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400">Quality Grade</label>
            <select value={fQuality} onChange={(e) => setFQuality(e.target.value)} className="w-full bg-emerald-50/60 border border-emerald-200 rounded-xl px-3 py-2.5 font-extrabold text-[#15803D]">
              {QUALITY_GRADES.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-bold text-slate-400">Quantity & Unit</label>
            <div className="flex space-x-1.5">
              <input type="number" required value={fQty} onChange={(e) => setFQty(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-bold" />
              <select value={fUnit} onChange={(e) => setFUnit(e.target.value)} className="bg-emerald-50 border border-emerald-200 text-[#15803D] rounded-xl px-2.5 py-2.5 font-extrabold">
                <option value="Kg">Kg</option>
                <option value="Grams">Grams</option>
                <option value="Litres">Litres</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400">Price (₹ / {fUnit})</label>
            <input type="number" required value={fPrice} onChange={(e) => setFPrice(e.target.value)} className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-extrabold text-[#15803D]" />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400">Availability Slot</label>
          <select value={fAvailTime} onChange={(e) => setFAvailTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-extrabold text-slate-800 mt-1">
            {AVAILABILITY_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm">
          {submitLabel}
        </button>
      </form>
    );
  };

  const fontStyle = { fontFamily: "'Plus Jakarta Sans', 'Noto Sans Telugu', sans-serif" };

  // =========================================================================
  // 0. DIRECT INVOICE PDF PRINT VIEW
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
  // 1. HOME / ROLE ENTRY PAGE + ONE-TIME DEVICE PERMISSIONS DIALOG
  // =========================================================================
  if (!selectedRole) {
    const roleCards = [
      { id: 'customer', te: 'వినియోగదారులు', en: 'Shop for Fresh Produce', bg: 'bg-[#ECFDF5] border-[#BBF7D0]', badgeBg: 'bg-[#DCFCE7] text-[#15803D]', arrowBg: 'bg-[#D1FAE5] text-[#15803D]', icon: ShoppingCart },
      { id: 'farmer', te: 'రైతు విభాగం', en: 'Farmers Section', bg: 'bg-[#FFFBEB] border-[#FDE68A]', badgeBg: 'bg-[#FEF3C7] text-[#B45309]', arrowBg: 'bg-[#FDE68A] text-[#B45309]', icon: Sprout },
      { id: 'retail', te: 'రిటైల్ షాపులు', en: 'Retail Shops', bg: 'bg-[#FFF7ED] border-[#FED7AA]', badgeBg: 'bg-[#FFEDD5] text-[#C2410C]', arrowBg: 'bg-[#FED7AA] text-[#C2410C]', icon: Store },
      { id: 'wholesale', te: 'హోల్‌సేల్ మండీ', en: 'Wholesale Market', bg: 'bg-[#EFF6FF] border-[#BFDBFE]', badgeBg: 'bg-[#DBEAFE] text-[#1D4ED8]', arrowBg: 'bg-[#BFDBFE] text-[#1D4ED8]', icon: Warehouse },
      { id: 'delivery', te: 'డెలివరీ & ట్రాకింగ్', en: 'Delivery Fleet', bg: 'bg-[#F5F3FF] border-[#DDD6FE]', badgeBg: 'bg-[#EDE9FE] text-[#6D28D9]', arrowBg: 'bg-[#DDD6FE] text-[#6D28D9]', icon: Truck },
      { id: 'admin', te: 'అడ్మిన్ (Admin)', en: 'Admin Login', bg: 'bg-[#F0FDFA] border-[#99F6E4]', badgeBg: 'bg-[#CCFBF1] text-[#0F766E]', arrowBg: 'bg-[#99F6E4] text-[#0F766E]', icon: ShieldCheck },
    ];

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F5F7F5] max-w-md mx-auto text-slate-800 shadow-2xl pb-24 relative overflow-x-hidden">
        {showPermissionPrompt && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-5 max-w-xs w-full space-y-4 shadow-2xl border border-emerald-100">
              <div className="flex items-center space-x-3">
                <img src="/icon-512.png" alt="Logo" className="h-12 w-12 rounded-full border-2 border-[#15803D]" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Allow Rythu Basket Permissions</h3>
                  <p className="text-[10px] text-slate-500">One-time setup for accurate delivery & alerts</p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2.5 bg-emerald-50/70 p-2.5 rounded-xl">
                  <MapPin className="h-4 w-4 text-[#15803D] flex-shrink-0" />
                  <span><strong>Precise Location:</strong> Accurate customer, farm & delivery tracking</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-emerald-50/70 p-2.5 rounded-xl">
                  <MessageSquare className="h-4 w-4 text-[#15803D] flex-shrink-0" />
                  <span><strong>Messages & Sound Alerts:</strong> 15-sec order ringtone & SMS updates</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-emerald-50/70 p-2.5 rounded-xl">
                  <Phone className="h-4 w-4 text-[#15803D] flex-shrink-0" />
                  <span><strong>Phone Calls:</strong> Direct rider-to-customer & store call support</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGrantDevicePermissions}
                className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow text-xs"
              >
                Allow All Permissions (One-Time)
              </button>
            </div>
          </div>
        )}

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
                  window.history.pushState({ rythuNav: true }, '');
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
                  setLoginIdentifier('');
                  setRegOtpSent(false);
                  setAuthMsg('');
                  window.history.pushState({ rythuNav: true }, '');
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
  // 2. ROLE-SPECIFIC REGISTRATION & DIRECT LOGIN
  // =========================================================================
  if (!currentUser) {
    const roleMeta = {
      farmer: { title: 'Farmer Registration', subtitle: 'Sell your fresh produce directly to buyers', cta: 'Register as Farmer →', hero: FARMER_HERO_IMG, icon: Sprout },
      wholesale: { title: 'Wholesale Registration', subtitle: 'Buy in bulk at the best prices', cta: 'Register as Wholesale →', hero: WHOLESALE_HERO_IMG, icon: Warehouse },
      retail: { title: 'Retail Store Registration', subtitle: 'Grow your store with Rythu Basket', cta: 'Register as Retail Store →', hero: RETAIL_HERO_IMG, icon: Store },
      delivery: { title: 'Delivery Partner Registration', subtitle: 'Deliver Freshness, Earn More', cta: 'Register as Delivery Partner →', hero: DELIVERY_HERO_IMG, icon: Truck },
      customer: { title: 'Create Account', subtitle: 'Verify your Email inbox with 6-digit OTP to join', cta: 'Create Customer Account →', hero: FARMER_HERO_IMG, icon: ShoppingCart },
      admin: { title: 'Admin Registration', subtitle: 'Master Marketplace Administration', cta: 'Register as Admin →', hero: FARMER_HERO_IMG, icon: ShieldCheck },
    }[selectedRole];

    const RoleHeaderIcon = roleMeta.icon;

    const renderBankAndUpiBlock = () => (
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center space-x-1.5 text-xs font-extrabold text-[#15803D]">
          <Landmark className="h-4 w-4" />
          <span>Bank / UPI Payout Details (Enter Bank or UPI)</span>
        </div>
        <input
          type="text"
          value={regBankAccount}
          onChange={(e) => setRegBankAccount(e.target.value)}
          placeholder="Bank Account Number (Optional if UPI entered)"
          className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold"
        />
        <input
          type="text"
          value={regIfscCode}
          onChange={(e) => setRegIfscCode(e.target.value.toUpperCase())}
          placeholder="IFSC Code (e.g., SBIN0001234)"
          className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold"
        />
        <input
          type="text"
          value={regUpiId}
          onChange={(e) => setRegUpiId(e.target.value)}
          placeholder="UPI ID (e.g., name@ybl / name@okicici)"
          className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-3.5 py-2.5 font-bold"
        />
      </div>
    );

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F4F8F4] max-w-md mx-auto text-slate-800 shadow-2xl pb-12">
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl text-center">
            {toast}
          </div>
        )}

        {authScreen === 'login' ? (
          <div className="bg-white min-h-screen">
            <div className="p-4 flex items-center justify-between">
              <button onClick={() => setSelectedRole(null)} className="p-2 rounded-full bg-slate-100 text-slate-700">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#15803D] px-3 py-1 rounded-full">
                {selectedRole} Login
              </span>
            </div>

            <div className="px-6 pt-3 text-center space-y-2">
              <div className="h-16 w-16 rounded-full bg-white p-0.5 border-2 border-[#15803D] shadow mx-auto overflow-hidden">
                <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
              </div>
              <h1 className="text-xl font-extrabold text-[#15803D]">Rythu Basket</h1>
              <h2 className="text-lg font-extrabold text-slate-900">Welcome Back!</h2>
              <p className="text-xs text-slate-500">
                Login directly with your registered <strong>Mobile Number</strong> or <strong>Email ID</strong> (No OTP needed)
              </p>
            </div>

            <form onSubmit={handleDirectLogin} className="p-6 space-y-3.5 text-xs">
              <div className="flex items-center border border-slate-200 rounded-2xl px-3.5 py-3.5 bg-slate-50">
                <User className="h-4 w-4 text-slate-400 mr-2.5 flex-shrink-0" />
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => {
                    setLoginIdentifier(e.target.value);
                    setAuthMsg('');
                  }}
                  placeholder="Registered Mobile Number or Email ID"
                  className="w-full bg-transparent font-bold text-sm focus:outline-none"
                />
              </div>

{authMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl font-bold flex items-center justify-between">
                  <span>{authMsg}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthScreen('register');
                      setAuthMsg('');
                    }}
                    className="bg-red-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-extrabold ml-2 flex-shrink-0"
                  >
                    Register
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
              >
                Login Now →
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthScreen('register');
                    setRegOtpSent(false);
                    setAuthMsg('');
                  }}
                  className="w-full border-2 border-[#15803D]/30 bg-emerald-50/40 text-[#15803D] font-extrabold py-3.5 rounded-2xl"
                >
                  New {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}? Create Account (1-Time Email OTP)
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="relative bg-gradient-to-b from-[#DCFCE7] to-[#F4F8F4] pt-3 pb-2">
              <div className="px-4 flex items-center justify-between">
                <button onClick={() => setAuthScreen('login')} className="p-2 rounded-full bg-white/90 shadow text-slate-700">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center space-x-2">
                  <img src="/icon-512.png" alt="Logo" className="h-9 w-9 rounded-full border border-[#15803D]" />
                  <div>
                    <p className="text-sm font-extrabold text-[#15803D] leading-none">Rythu Basket™</p>
                    <p className="text-[10px] font-bold text-slate-600">Grow Together...</p>
                  </div>
                </div>
                <span className="w-8" />
              </div>

              {selectedRole !== 'customer' && (
                <div className="px-4 pt-2">
                  <img
                    src={roleMeta.hero}
                    alt={roleMeta.title}
                    className="w-full h-32 object-cover rounded-2xl shadow-sm border border-emerald-200"
                  />
                </div>
              )}

              <div className="mx-3 mt-2 bg-gradient-to-r from-[#0E5A2B] to-[#15803D] text-white rounded-2xl px-4 py-3 flex items-center space-x-3 shadow-md">
                <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <RoleHeaderIcon className="h-5 w-5 text-[#FDE047]" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold leading-tight">{roleMeta.title}</h2>
                  <p className="text-[11px] text-emerald-100">{roleMeta.subtitle}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleCompleteRegistration} className="p-4 space-y-3 text-xs">
              {selectedRole === 'customer' && (
                <>
                  <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Full Name *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-3 font-bold" />
                  <input type="tel" maxLength={10} required value={regMobile} onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))} placeholder="Mobile Number (10 Digits) *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-3 font-bold" />
                  <input type="email" required value={regEmail} onChange={(e) => { setRegEmail(e.target.value); setRegOtpSent(false); }} placeholder="Email ID (Mandatory for 6-Digit OTP) *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-3 font-bold" />
                  <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Delivery Address in Nellore *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-3 font-bold" />
                  <input type="text" value={regReferralCode} onChange={(e) => setRegReferralCode(e.target.value.toUpperCase())} placeholder="Referral Code (Optional • ₹50 Bonus)" className="w-full bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5 font-bold" />
                </>
              )}

              {selectedRole === 'farmer' && (
                <>
                  <p className="font-extrabold text-[#15803D]">— Personal Details</p>
                  <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Full Name *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="tel" maxLength={10} required value={regMobile} onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))} placeholder="Mobile Number *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="email" required value={regEmail} onChange={(e) => { setRegEmail(e.target.value); setRegOtpSent(false); }} placeholder="Email ID (Mandatory for OTP) *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="text" maxLength={12} value={regAadhaar} onChange={(e) => setRegAadhaar(e.target.value.replace(/\D/g, ''))} placeholder="Aadhaar Number (Optional)" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Address *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" required value={regVillage} onChange={(e) => setRegVillage(e.target.value)} placeholder="Village *" className="bg-white border border-slate-200 rounded-xl px-2.5 py-2.5 font-bold" />
                    <input type="text" required value={regMandal} onChange={(e) => setRegMandal(e.target.value)} placeholder="Mandal *" className="bg-white border border-slate-200 rounded-xl px-2.5 py-2.5 font-bold" />
                    <input type="text" required value={regDistrict} onChange={(e) => setRegDistrict(e.target.value)} placeholder="District *" className="bg-white border border-slate-200 rounded-xl px-2.5 py-2.5 font-bold" />
                  </div>

                  <p className="font-extrabold text-[#15803D] pt-1">— Farm Details</p>
                  <input type="text" value={regLandAcres} onChange={(e) => setRegLandAcres(e.target.value)} placeholder="Land Holding (Acres)" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="text" value={regMajorCrops} onChange={(e) => setRegMajorCrops(e.target.value)} placeholder="Major Crops (e.g., Tomato, Paddy)" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />

                  <label className="block border-2 border-dashed border-emerald-300 bg-white rounded-2xl p-3 text-center cursor-pointer">
                    <Camera className="h-5 w-5 text-[#15803D] mx-auto mb-1" />
                    <span className="font-bold text-slate-600">{regPhotoName || 'Upload Farm Photo (JPG, PNG)'}</span>
                    <input type="file" accept="image/*" onChange={(e) => setRegPhotoName(e.target.files?.[0]?.name || '')} className="hidden" />
                  </label>

                  {renderBankAndUpiBlock()}
                </>
              )}

              {selectedRole === 'wholesale' && (
                <>
                  <p className="font-extrabold text-[#15803D]">— Business Details</p>
                  <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Business Name *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="text" required value={regOwnerName} onChange={(e) => setRegOwnerName(e.target.value)} placeholder="Owner Name *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="tel" maxLength={10} required value={regMobile} onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))} placeholder="Mobile Number *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="email" required value={regEmail} onChange={(e) => { setRegEmail(e.target.value); setRegOtpSent(false); }} placeholder="Email ID (Mandatory for OTP) *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="text" value={regGstNumber} onChange={(e) => setRegGstNumber(e.target.value.toUpperCase())} placeholder="GST Number (Optional)" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Business Address *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" required value={regDistrict} onChange={(e) => setRegDistrict(e.target.value)} placeholder="City *" className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 font-bold" />
                    <input type="text" required value={regState} onChange={(e) => setRegState(e.target.value)} placeholder="State *" className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 font-bold" />
                  </div>

                  <p className="font-extrabold text-[#15803D] pt-1">— Store Type</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Distributor', 'Wholesaler', 'Trader'].map((st) => (
                      <button
                        type="button"
                        key={st}
                        onClick={() => setRegStoreType(st)}
                        className={`py-2 rounded-full font-extrabold border ${regStoreType === st ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-white text-slate-600'}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {renderBankAndUpiBlock()}

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <label className="border-2 border-dashed border-emerald-300 bg-white rounded-xl p-2.5 text-center cursor-pointer">
                      <span className="font-bold text-[10px] text-slate-600">{regPhotoName || 'GST Certificate (Optional)'}</span>
                      <input type="file" onChange={(e) => setRegPhotoName(e.target.files?.[0]?.name || '')} className="hidden" />
                    </label>
                    <label className="border-2 border-dashed border-emerald-300 bg-white rounded-xl p-2.5 text-center cursor-pointer">
                      <span className="font-bold text-[10px] text-slate-600">{regDocName || 'Shop License (Optional)'}</span>
                      <input type="file" onChange={(e) => setRegDocName(e.target.files?.[0]?.name || '')} className="hidden" />
                    </label>
                  </div>
                </>
              )}

{selectedRole === 'retail' && (
                <>
                  <p className="font-extrabold text-[#15803D]">— Store Details</p>
                  <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Store Name *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="text" required value={regOwnerName} onChange={(e) => setRegOwnerName(e.target.value)} placeholder="Owner Name *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="tel" maxLength={10} required value={regMobile} onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))} placeholder="Mobile Number *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="email" required value={regEmail} onChange={(e) => { setRegEmail(e.target.value); setRegOtpSent(false); }} placeholder="Email ID (Mandatory for OTP) *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Shop Address *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" required value={regDistrict} onChange={(e) => setRegDistrict(e.target.value)} placeholder="City *" className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 font-bold" />
                    <input type="text" required value={regState} onChange={(e) => setRegState(e.target.value)} placeholder="State *" className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 font-bold" />
                  </div>

                  <p className="font-extrabold text-[#15803D] pt-1">— Business Type</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Grocery Store', 'Supermarket', 'Others'].map((bt) => (
                      <button
                        type="button"
                        key={bt}
                        onClick={() => setRegStoreType(bt)}
                        className={`py-2 rounded-full font-extrabold border text-[10px] ${regStoreType === bt ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-white text-slate-600'}`}
                      >
                        {bt}
                      </button>
                    ))}
                  </div>

                  {renderBankAndUpiBlock()}

                  <label className="block border-2 border-dashed border-emerald-300 bg-white rounded-2xl p-3 text-center cursor-pointer">
                    <Camera className="h-5 w-5 text-[#15803D] mx-auto mb-1" />
                    <span className="font-bold text-slate-600">{regPhotoName || 'Upload Shop Photo (JPG, PNG)'}</span>
                    <input type="file" accept="image/*" onChange={(e) => setRegPhotoName(e.target.files?.[0]?.name || '')} className="hidden" />
                  </label>
                </>
              )}

              {selectedRole === 'delivery' && (
                <>
                  <p className="font-extrabold text-[#15803D]">— Personal Details</p>
                  <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Full Name *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="tel" maxLength={10} required value={regMobile} onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))} placeholder="Mobile Number *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="email" required value={regEmail} onChange={(e) => { setRegEmail(e.target.value); setRegOtpSent(false); }} placeholder="Email ID (Mandatory for OTP) *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />

                  <p className="font-extrabold text-[#15803D] pt-1">— Vehicle Details</p>
                  <select value={regVehicleType} onChange={(e) => setRegVehicleType(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold">
                    <option value="Bike / Scooter">Bike / Scooter</option>
                    <option value="Auto / 3-Wheeler">Auto / 3-Wheeler</option>
                    <option value="Mini Truck / Tempo">Mini Truck / Tempo</option>
                  </select>
                  <input type="text" required value={regVehicleNumber} onChange={(e) => setRegVehicleNumber(e.target.value.toUpperCase())} placeholder="Vehicle Number (e.g., AP 26 BX 1234) *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />

                  <p className="font-extrabold text-[#15803D] pt-1">— Location</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" required value={regDistrict} onChange={(e) => setRegDistrict(e.target.value)} placeholder="City *" className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 font-bold" />
                    <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Area / Locality *" className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 font-bold" />
                  </div>

                  {renderBankAndUpiBlock()}

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <label className="border-2 border-dashed border-emerald-300 bg-white rounded-xl p-2.5 text-center cursor-pointer">
                      <span className="font-bold text-[10px] text-slate-600">{regPhotoName || 'Driving License (Optional)'}</span>
                      <input type="file" onChange={(e) => setRegPhotoName(e.target.files?.[0]?.name || '')} className="hidden" />
                    </label>
                    <label className="border-2 border-dashed border-emerald-300 bg-white rounded-xl p-2.5 text-center cursor-pointer">
                      <span className="font-bold text-[10px] text-slate-600">{regDocName || 'Vehicle RC (Optional)'}</span>
                      <input type="file" onChange={(e) => setRegDocName(e.target.files?.[0]?.name || '')} className="hidden" />
                    </label>
                  </div>
                </>
              )}

              {selectedRole === 'admin' && (
                <>
                  <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Admin Name *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="tel" maxLength={10} required value={regMobile} onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))} placeholder="Mobile Number *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="email" required value={regEmail} onChange={(e) => { setRegEmail(e.target.value); setRegOtpSent(false); }} placeholder="Admin Email ID (Mandatory for OTP) *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                  <input type="text" required value={regAddress} onChange={(e) => setRegAddress(e.target.value)} placeholder="Office Location *" className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-bold" />
                </>
              )}

              <label className="flex items-center space-x-2 text-[11px] font-bold text-slate-600 pt-1">
                <input type="checkbox" checked={regTermsAccepted} onChange={(e) => setRegTermsAccepted(e.target.checked)} className="accent-[#15803D] h-4 w-4" />
                <span>I agree to the <span className="text-[#15803D]">Terms & Conditions</span> and <span className="text-[#15803D]">Privacy Policy</span></span>
              </label>

              {authMsg && <p className="text-red-600 font-bold bg-red-50 p-2.5 rounded-xl border border-red-200">{authMsg}</p>}

              {!regOtpSent ? (
                <button
                  type="button"
                  disabled={sendingEmail}
                  onClick={handleSendRegisterOtp}
                  className="w-full bg-[#15803D] disabled:opacity-60 text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
                >
                  {sendingEmail ? 'Sending 6-Digit Email OTP...' : `Verify Email & ${roleMeta.cta}`}
                </button>
              ) : (
                <div className="space-y-2.5 bg-white p-3.5 rounded-2xl border-2 border-[#15803D]">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-600">
                    <span>6-Digit OTP sent to {regEmail}</span>
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
                    className="w-full bg-emerald-50/50 border border-emerald-400 rounded-xl py-3 text-center text-base font-extrabold tracking-[0.4em]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-xl shadow-md text-sm"
                  >
                    {roleMeta.cta}
                  </button>
                </div>
              )}

              <p className="text-center text-slate-600 font-bold pt-2">
                Already have an account?{' '}
                <button type="button" onClick={() => setAuthScreen('login')} className="text-[#15803D] font-extrabold underline">
                  Login
                </button>
              </p>
            </form>
          </div>
        )}
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

      {(currentUser.bankAccount || currentUser.upiId) && (
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-1">
          <p className="font-extrabold text-[#15803D]">Registered Payout Details</p>
          {currentUser.bankAccount && <p className="text-slate-600">Bank A/C: <strong>{currentUser.bankAccount}</strong> ({currentUser.ifscCode})</p>}
          {currentUser.upiId && <p className="text-slate-600">UPI ID: <strong>{currentUser.upiId}</strong></p>}
        </div>
      )}

      <div className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white rounded-3xl p-5 shadow-md space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-emerald-100 flex items-center space-x-1.5">
            <Wallet className="h-4 w-4 text-[#FDE047]" />
            <span>Rythu Wallet Balance</span>
          </span>
          <span className="bg-white/15 text-[10px] font-bold px-2.5 py-0.5 rounded-full">15-Day Validity</span>
        </div>
        <h3 className="text-3xl font-extrabold">₹{currentUser.wallet || 0}</h3>
      </div>

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
  // 3. CUSTOMER STOREFRONT (TOP SEARCH + DAILY ESSENTIALS + OFFERS/COUPONS + CATEGORIES)
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
    const promoDeduction =
      appliedCouponObj && subtotal >= (appliedCouponObj.minOrder || 0)
        ? Number(appliedCouponObj.discount || 0)
        : 0;
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

    const handleApplyCouponCode = (codeStr) => {
      const clean = codeStr.trim().toUpperCase();
      const found = couponsList.find((c) => c.active && c.code.toUpperCase() === clean);
      if (!found) {
        notify('Invalid or inactive coupon code.');
        return;
      }
      if (subtotal < (found.minOrder || 0)) {
        notify(`Add ₹${found.minOrder - subtotal} more to apply ${found.code}!`);
        return;
      }
      setAppliedCouponObj(found);
      setPromoInput(found.code);
      notify(`Coupon ${found.code} Applied (-₹${found.discount})!`);
    };

    const finalizeCustomerOrder = () => {
      const itemsArr = Object.entries(cart)
        .map(([id, qty]) => {
          const p = products.find((x) => x.id === id);
          return p
            ? {
                id: p.id,
                name: p.nameEn,
                quality: p.quality || 'Grade A',
                unit: p.unit || 'Kg',
                qty,
                price: p.retailPrice,
                img: p.img,
                sellerId: p.farmerId || null,
                sellerName: p.farmerName,
                sellerLat: p.sellerLat || 14.4450,
                sellerLng: p.sellerLng || 79.9850,
                postedByRole: p.postedByRole || 'farmer',
              }
            : null;
        })
        .filter(Boolean);

      if (itemsArr.length === 0) return;

      const pickupStops = buildPickupStopsFromItems(itemsArr);
      const extraStopsCount = Math.max(0, pickupStops.length - 1);
      const riderBaseFee = 30;
      const riderMultiStopBonus = extraStopsCount * 15;

      const newOrd = {
        id: 'RB' + Math.floor(123450 + Math.random() * 800000),
        buyerId: currentUser.id,
        buyerRole: 'customer',
        buyerName: currentUser.name,
        buyerMobile: currentUser.mobile,
        buyerEmail: currentUser.email,
        buyerAddress: activeAddr.full,
        buyerLat: activeAddr.lat || mapPinCoords.lat,
        buyerLng: activeAddr.lng || mapPinCoords.lng,
        deliverySlot,
        items: itemsArr,
        pickupStops,
        riderBaseFee,
        riderMultiStopBonus,
        totalRiderPayout: riderBaseFee + riderMultiStopBonus,
        total: payableTotal,
        cashback: estimatedCashback,
        status: 'Order Placed',
        declinedBy: [],
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
      setDoc(doc(db, 'orders', newOrd.id), newOrd).catch(() => {});
      setLastPlacedOrder(newOrd);
      setCart({});
      setUtrRefInput('');
      setActiveTab('orderPlaced');
      notify(`Order sent to ${pickupStops.length} seller group(s) with 15s alert!`);
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

    const renderCustomerProductCard = (p) => {
      const q = cart[p.id] || 0;
      const isFarmerItem = (p.postedByRole || 'farmer') === 'farmer';
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
              <div className="flex items-center flex-wrap gap-1 mb-0.5">
                {isFarmerItem && (
                  <span className="inline-flex items-center space-x-1 bg-emerald-100 text-[#15803D] text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                    <Sprout className="h-2.5 w-2.5" />
                    <span>From Farmer</span>
                  </span>
                )}
                {p.quality && (
                  <span className="bg-amber-50 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                    {p.quality}
                  </span>
                )}
              </div>
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
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 text-[#15803D] flex items-center justify-center flex-shrink-0">
                    {addr.tag === 'Office' ? <Briefcase className="h-4 w-4" /> : <Home className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-extrabold text-slate-900">{addr.tag} • {addr.distance}</h3>
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

              <button type="button" onClick={handleConfirmSetLocation} className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl text-sm shadow-md">
                Set Location
              </button>
            </div>
          </div>
        </div>
      );
    }

const q = search.toLowerCase();
    const searchedProducts = products.filter(
      (p) =>
        p.nameEn.toLowerCase().includes(q) ||
        p.nameTe.includes(search) ||
        p.cat.toLowerCase().includes(q)
    );

    const dailyEssentialCats = categoriesList.filter((c) => c.isDailyEssential !== false).slice(0, 4);
    const activeCoupons = couponsList.filter((c) => c.active);

    const liveLat = trackingOrder?.driverLat || mapPinCoords.lat;
    const liveLng = trackingOrder?.driverLng || mapPinCoords.lng;
    const isOutForCustomerDrop = trackingOrder?.status === 'Out for Delivery' || trackingOrder?.status === 'Delivered';

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
              <Sparkles className="h-8 w-8 text-amber-500 mx-auto" />
              <h3 className="text-lg font-extrabold text-slate-900">Order {scratchCard.orderId} Delivered!</h3>
              <p className="text-[11px] font-bold text-[#15803D]">Invoice PDF sent to {currentUser.email}</p>
              {!scratchCard.scratched ? (
                <button
                  onClick={() => setScratchCard({ ...scratchCard, scratched: true })}
                  className="w-full h-32 rounded-2xl bg-gradient-to-br from-[#EAB308] to-[#EA580C] text-white font-extrabold text-base shadow-lg"
                >
                  TAP TO SCRATCH CARD
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <p className="text-xl font-extrabold text-[#15803D]">
                    {scratchCard.reward > 0 ? `You Won ₹${scratchCard.reward}!` : 'Better Luck Next Time!'}
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
            {/* Top Bar: Location + Wallet */}
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
                </button>
              </div>
            </div>

            {/* 1. TOP PRODUCTS SEARCH BAR */}
            <div className="bg-white border-2 border-emerald-100 rounded-2xl px-3.5 py-2.5 flex items-center shadow-sm">
              <Search className="h-4 w-4 text-[#15803D] mr-2 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Vegetables, Dairy, Atta, Masala, Tea, Juices..."
                className="w-full bg-transparent font-bold text-xs focus:outline-none"
              />
              {search && (
                <button type="button" onClick={() => setSearch('')} className="text-slate-400 font-extrabold ml-1">✕</button>
              )}
            </div>

            {/* 2. DAILY ESSENTIALS SECTION */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-900">Daily essentials</h2>
                <span className="text-[10px] font-bold text-[#15803D]">Morning Fresh</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {dailyEssentialCats.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedCat(selectedCat === item.labelEn ? 'All' : item.labelEn)}
                    className={`rounded-2xl p-2 border text-center transition shadow-sm ${
                      selectedCat === item.labelEn
                        ? 'bg-emerald-50 border-2 border-[#15803D]'
                        : 'bg-gradient-to-b from-emerald-50/70 to-white border-emerald-100'
                    }`}
                  >
                    <div className="h-14 w-14 rounded-xl bg-white p-1 mx-auto mb-1.5 shadow-sm overflow-hidden">
                      <img src={item.img} alt={item.labelEn} className="h-full w-full object-cover rounded-lg" />
                    </div>
                    <p className="text-[10px] font-extrabold text-slate-900 line-clamp-2 leading-tight">
                      {item.labelEn}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            {/* 3. OFFERS AND COUPONS SECTION (MANAGED BY ADMIN) */}
            {activeCoupons.length > 0 && (
              <section className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-extrabold text-slate-900 flex items-center space-x-1">
                    <Tag className="h-4 w-4 text-[#EA580C]" />
                    <span>Offers & Coupons</span>
                  </h2>
                  <span className="text-[10px] font-bold text-slate-400">Tap to Copy</span>
                </div>
                <div className="flex space-x-2.5 overflow-x-auto pb-1">
                  {activeCoupons.map((cp) => (
                    <button
                      key={cp.id}
                      type="button"
                      onClick={() => {
                        setPromoInput(cp.code);
                        setAppliedCouponObj(cp);
                        notify(`Coupon ${cp.code} selected for Checkout (-₹${cp.discount})!`);
                      }}
                      className="flex-shrink-0 w-56 bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border border-amber-300 rounded-2xl p-3 text-left shadow-sm space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="bg-[#15803D] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                          {cp.badge || 'OFFER'}
                        </span>
                        <span className="font-mono font-extrabold text-[11px] text-[#0F5132] bg-white px-2 py-0.5 rounded border border-emerald-200">
                          {cp.code}
                        </span>
                      </div>
                      <p className="text-xs font-extrabold text-slate-900 truncate pt-0.5">{cp.title}</p>
                      <p className="text-[10px] font-semibold text-slate-600 truncate">{cp.subtitle}</p>
                    </button>
                  ))}
                </div>
              </section>
            )}

  {/* 4. CATEGORIES GRID SECTION */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-900">Categories</h2>
                <button type="button" onClick={() => setActiveTab('categories')} className="text-[11px] font-extrabold text-[#15803D]">
                  See All ({categoriesList.length}) &gt;
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {categoriesList.map((cat) => {
                  const isSel = selectedCat === cat.labelEn;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCat(isSel ? 'All' : cat.labelEn)}
                      className={`rounded-2xl p-2.5 border text-center transition ${
                        isSel ? 'border-2 border-[#15803D] bg-emerald-50 shadow-sm' : 'border-slate-100 bg-white shadow-sm'
                      }`}
                    >
                      <img src={cat.img} alt={cat.labelEn} className="h-14 w-14 rounded-2xl object-cover mx-auto mb-1.5" />
                      <p className="text-[10px] font-extrabold text-slate-900 line-clamp-2 leading-tight">{cat.labelEn}</p>
                      <p className="text-[9px] font-bold text-[#15803D] truncate mt-0.5">{cat.labelTe}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 5. SECTION-WISE PRODUCTS LIST */}
            {selectedCat !== 'All' || search.trim() !== '' ? (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {selectedCat !== 'All' ? selectedCat : `Search Results (${searchedProducts.length})`}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedCat('All');
                      setSearch('');
                    }}
                    className="text-[11px] font-extrabold text-[#15803D]"
                  >
                    Show All Sections
                  </button>
                </div>
                {searchedProducts
                  .filter((p) => selectedCat === 'All' || p.cat === selectedCat)
                  .map((p) => renderCustomerProductCard(p))}
              </div>
            ) : (
              categoriesList.map((catObj) => {
                const catItems = products.filter((p) => p.cat === catObj.labelEn);
                if (catItems.length === 0) return null;
                return (
                  <section key={catObj.id} className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-1.5">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">{catObj.labelEn}</h3>
                        <p className="text-[10px] font-bold text-[#15803D]">{catObj.labelTe}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCat(catObj.labelEn)}
                        className="text-[11px] font-extrabold text-[#15803D] bg-emerald-50 px-2.5 py-1 rounded-full"
                      >
                        See All ({catItems.length})
                      </button>
                    </div>
                    <div className="space-y-2">
                      {catItems.map((p) => renderCustomerProductCard(p))}
                    </div>
                  </section>
                );
              })
            )}
          </main>
        )}

        {/* CATEGORIES TAB (MATCHING HOME CATEGORIES VISUAL LAYOUT) */}
        {activeTab === 'categories' && (
          <main className="p-4 space-y-4 text-xs">
            <div className="flex items-center space-x-3">
              <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-extrabold text-slate-900">All Categories ({categoriesList.length})</h2>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCat(cat.labelEn);
                    setActiveTab('home');
                  }}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 text-center space-y-1.5 hover:border-[#15803D]"
                >
                  <img src={cat.img} alt={cat.labelEn} className="h-16 w-16 rounded-2xl object-cover mx-auto" />
                  <h3 className="text-[10px] font-extrabold text-slate-900 line-clamp-2 leading-tight">{cat.labelEn}</h3>
                  <p className="text-[9px] font-bold text-[#15803D] truncate">{cat.labelTe}</p>
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
            </div>
            <div className="p-5 space-y-4">
              <div>
                {(detailProduct.postedByRole || 'farmer') === 'farmer' && (
                  <span className="inline-flex items-center space-x-1 bg-emerald-100 text-[#15803D] text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                    <Sprout className="h-3 w-3" />
                    <span>From Farmer • {detailProduct.farmerName}</span>
                  </span>
                )}
                <h2 className="text-xl font-extrabold text-slate-900 mt-2">{detailProduct.nameEn} ({detailProduct.quality || 'Grade A'})</h2>
                <p className="text-sm font-bold text-[#15803D]">{detailProduct.nameTe} • ₹{detailProduct.retailPrice} / {detailProduct.packLabel}</p>
              </div>
              <p className="text-slate-600">{detailProduct.desc}</p>
              <button
                onClick={() => {
                  setCart({ ...cart, [detailProduct.id]: detailQty });
                  notify('Added to Cart!');
                  setActiveTab('cart');
                }}
                className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
              >
                Add to Cart • ₹{detailProduct.retailPrice * detailQty}
              </button>
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
                          <p className="text-[10px] text-slate-500">{p.farmerName}</p>
                          <p className="text-[#15803D] font-extrabold">₹{p.retailPrice} / {p.packLabel}</p>
                        </div>
                      </div>
                      <div className="flex items-center border border-slate-200 rounded-xl px-2.5 py-1 space-x-2.5 font-extrabold">
                        <button onClick={() => setCart((c) => { const n = { ...c }; if (n[id] <= 1) delete n[id]; else n[id]--; return n; })}>-</button>
                        <span>{qty}</span>
                        <button onClick={() => setCart({ ...cart, [id]: qty + 1 })}>+</button>
                      </div>
                    </div>
                  );
                })}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-2">
                  <div className="flex justify-between text-sm font-extrabold">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <button onClick={() => setActiveTab('checkout')} className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm">
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

            <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-start justify-between">
              <div>
                <p className="font-extrabold text-slate-900">Delivery Address ({activeAddr.tag})</p>
                <p className="text-slate-500 mt-0.5">{activeAddr.full}</p>
              </div>
              <button onClick={() => setActiveTab('selectLocation')} className="text-[#15803D] font-extrabold">Change</button>
            </div>

            {/* Coupon Apply Section */}
            <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  placeholder="Enter Coupon Code (e.g., RYTHU30)"
                  className="flex-1 bg-slate-50 border rounded-xl px-3 py-2 font-extrabold"
                />
                <button
                  type="button"
                  onClick={() => handleApplyCouponCode(promoInput)}
                  className="bg-[#15803D] text-white font-extrabold px-4 rounded-xl"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900">Payment Method</h3>
                <span className="text-[10px] font-bold text-[#15803D]">{merchantUpiId}</span>
              </div>
              {[
                { id: 'phonepe', label: 'PhonePe UPI' },
                { id: 'gpay', label: 'Google Pay (GPay)' },
                { id: 'paytm', label: 'Paytm UPI' },
                { id: 'cred', label: 'CRED UPI' },
                { id: 'card', label: 'Credit / Debit Card' },
                { id: 'cod', label: 'Cash on Delivery (COD)' },
              ].map((pm) => (
                <label key={pm.id} onClick={() => setPayMode(pm.id)} className={`flex items-center justify-between rounded-xl border-2 p-2.5 cursor-pointer ${payMode === pm.id ? 'border-[#15803D] bg-emerald-50/40' : 'border-slate-100'}`}>
                  <div className="flex items-center space-x-2.5">
                    <PaymentBadge type={pm.id} />
                    <span className="font-extrabold text-slate-800">{pm.label}</span>
                  </div>
                  <input type="radio" checked={payMode === pm.id} onChange={() => setPayMode(pm.id)} className="accent-[#15803D]" />
                </label>
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
              {promoDeduction > 0 && <div className="flex justify-between text-[#15803D] font-extrabold"><span>Coupon ({appliedCouponObj.code})</span><span>-₹{promoDeduction}</span></div>}
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
              <h2 className="text-base font-extrabold text-slate-900">Pay ₹{payableTotal} to {merchantUpiId}</h2>
              <a href={paymentAppLaunchUrl} className="block w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow">
                Open {payMode.toUpperCase()} App Now ↗
              </a>
              <img src={genericUpiQr} alt="UPI QR" className="w-32 h-32 mx-auto rounded-xl border p-1 bg-white" />
              <input type="text" value={utrRefInput} onChange={(e) => setUtrRefInput(e.target.value)} placeholder="Enter 12-Digit UPI UTR (Optional)" className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-center font-bold" />
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
              <p className="text-xs text-slate-500 pt-1">
                Sent to {(lastPlacedOrder.pickupStops || []).length} seller group(s). Live scooter tracking activates once picked up!
              </p>
            </div>
            <div className="w-full space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setTrackingOrder(lastPlacedOrder);
                  setActiveTab('trackOrder');
                }}
                className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md text-sm"
              >
                Track Order Status
              </button>
              <button onClick={() => setActiveTab('home')} className="w-full border border-slate-300 text-slate-800 font-extrabold py-3.5 rounded-2xl text-sm">
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
                  <p className="text-[11px] text-emerald-100">Order ID: {trackingOrder.id}</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3.5">
              {(trackingOrder.pickupStops || []).length > 0 && (
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2">
                  <p className="font-extrabold text-slate-900">
                    Seller Acceptance ({trackingOrder.pickupStops.filter((s) => s.stopStatus === 'Accepted').length}/{trackingOrder.pickupStops.length} Accepted)
                  </p>
                  {trackingOrder.pickupStops.map((st, idx) => (
                    <div key={st.stopId} className="flex items-center justify-between text-[11px] border-t pt-1.5">
                      <div className="min-w-0 pr-2">
                        <p className="font-extrabold text-slate-800 truncate">
                          {idx + 1}. {st.acceptedByUserName || st.sellerName} ({st.sellerRole.toUpperCase()})
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">{st.itemsSummary.join(', ')}</p>
                      </div>
                      <span
                        className={`font-extrabold px-2 py-0.5 rounded-full text-[10px] flex-shrink-0 ${
                          st.pickedUp
                            ? 'bg-emerald-100 text-[#15803D]'
                            : st.stopStatus === 'Accepted'
                            ? 'bg-sky-100 text-sky-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {st.pickedUp ? '✓ Picked Up' : st.stopStatus}
                      </span>
                    </div>
                  ))}
                </div>
              )}

   {/* LIVE SCOOTER ICON MAP */}
              {isOutForCustomerDrop ? (
                <LiveScooterMap
                  lat={liveLat}
                  lng={liveLng}
                  title="Delivery Partner Live Scooter"
                  height={208}
                  badgeText={`🛵 Rider Out for Delivery • GPS: ${liveLat}, ${liveLng}`}
                />
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1 text-amber-950">
                  <p className="font-extrabold">Stage 1: Store Acceptance & Pickup in Progress</p>
                  <p className="text-[11px]">
                    Once all accepted sellers' items are picked up by the delivery partner, live scooter tracking will appear here!
                  </p>
                </div>
              )}

              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-11 w-11 rounded-full bg-emerald-100 text-[#15803D] font-extrabold flex items-center justify-center text-xl">
                    🛵
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold">Delivery Partner</p>
                    <h4 className="font-extrabold text-slate-900">
                      {trackingOrder.driverName || 'Assigning Delivery Partner...'}
                    </h4>
                    {trackingOrder.driverMobile && (
                      <p className="text-[10px] text-slate-500">+91 {trackingOrder.driverMobile}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={`tel:${trackingOrder.driverMobile || '8328261103'}`}
                    className="p-2.5 bg-emerald-50 text-[#15803D] border border-emerald-200 rounded-full flex items-center space-x-1 font-extrabold text-[10px]"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`sms:${trackingOrder.driverMobile || '8328261103'}`}
                    className="p-2.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-full flex items-center space-x-1 font-extrabold text-[10px]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Msg</span>
                  </a>
                </div>
              </div>

              {trackingOrder.status !== 'Delivered' ? (
                <button onClick={() => handleSimulateCustomerDelivery(trackingOrder)} className="w-full bg-[#EA580C] text-white font-extrabold py-3.5 rounded-2xl shadow">
                  Complete Delivery (Auto Email Invoice PDF)
                </button>
              ) : (
                <button onClick={() => window.print()} className="w-full bg-slate-900 text-white font-extrabold py-3.5 rounded-2xl shadow flex items-center justify-center space-x-2">
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
            {orders.filter((o) => o.buyerRole === 'customer').length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center font-bold text-slate-400">No orders placed yet.</div>
            ) : (
              orders
                .filter((o) => o.buyerRole === 'customer')
                .map((ord) => (
                  <div key={ord.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-2">
                    <div className="flex justify-between font-extrabold">
                      <span>{ord.id} • {ord.status}</span>
                      <span>₹{ord.total}</span>
                    </div>
                    <button onClick={() => { setTrackingOrder(ord); setActiveTab('trackOrder'); }} className="text-[#15803D] font-extrabold">
                      Track Order &gt;
                    </button>
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
  // INDEPENDENT MULTI-VENDOR ORDER ALERTS & SEQUENTIAL PICKUP TRACKING (WITH SCOOTER ICON)
  // =========================================================================
  const renderBroadcastOrderAlertsAndPickupTracking = () => {
    const incomingAlertCards = [];
    orders.forEach((ord) => {
      const pendingStops = getPendingStopsForSeller(ord);
      pendingStops.forEach((st) => {
        incomingAlertCards.push({ ord, st });
      });
    });

    const myAcceptedStopCards = [];
    orders.forEach((ord) => {
      const stops = ord.pickupStops || buildPickupStopsFromItems(ord.items || []);
      const acceptedStops = stops.filter((s) => s.stopStatus === 'Accepted');
      const currentActiveStop = acceptedStops.find((s) => !s.pickedUp);

      stops.forEach((st) => {
        if (st.stopStatus === 'Accepted' && st.acceptedByUserId === currentUser.id) {
          const isMyTurnForRiderPickup =
            currentActiveStop && currentActiveStop.stopId === st.stopId && !st.pickedUp;
          myAcceptedStopCards.push({ ord, st, isMyTurnForRiderPickup });
        }
      });
    });

    return (
      <div className="space-y-3">
        {incomingAlertCards.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-amber-800">
              <div className="flex items-center space-x-1.5">
                <Bell className="h-4 w-4 text-[#EA580C] animate-bounce" />
                <span>New {currentUser.role.toUpperCase()} Order Alert ({incomingAlertCards.length})</span>
              </div>
              {isRinging ? (
                <button
                  type="button"
                  onClick={stopAlertRingtone}
                  className="bg-rose-600 text-white px-2.5 py-1 rounded-full text-[10px] flex items-center space-x-1"
                >
                  <VolumeX className="h-3 w-3" />
                  <span>Stop Ring (15s)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={play15SecondAlertTone}
                  className="bg-amber-200 text-amber-950 px-2.5 py-1 rounded-full text-[10px] flex items-center space-x-1"
                >
                  <Volume2 className="h-3 w-3" />
                  <span>Ring Alert</span>
                </button>
              )}
            </div>

            {incomingAlertCards.map(({ ord, st }) => (
              <div key={`${ord.id}_${st.stopId}`} className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-3.5 shadow-md space-y-2">
                <div className="flex justify-between font-extrabold text-slate-900">
                  <span>Order #{ord.id} • {ord.buyerName}</span>
                  <span className="text-[#15803D]">₹{st.stopSubtotal || ord.total}</span>
                </div>
                <p className="text-[11px] font-bold text-slate-800">
                  Your Items ({currentUser.role.toUpperCase()}): {st.itemsSummary.join(', ')}
                </p>
                <p className="text-[10px] text-slate-500">Customer Drop: {ord.buyerAddress}</p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      stopAlertRingtone();
                      const sellerLat = currentUser.lat || mapPinCoords.lat;
                      const sellerLng = currentUser.lng || mapPinCoords.lng;
                      const allStops = (ord.pickupStops || buildPickupStopsFromItems(ord.items || [])).map((itemStop) =>
                        itemStop.stopId === st.stopId
                          ? {
                              ...itemStop,
                              stopStatus: 'Accepted',
                              acceptedByUserId: currentUser.id,
                              acceptedByUserName: currentUser.name,
                              sellerName: `${currentUser.name} • ${currentUser.address}`,
                              sellerLat,
                              sellerLng,
                            }
                          : itemStop
                      );
                      const nextOrderStatus = computeOrderAcceptanceStatus(allStops, ord.status);
                      const updateData = {
                        status: nextOrderStatus,
                        pickupStops: allStops,
                      };
                      setOrders((prev) => prev.map((o) => (o.id === ord.id ? { ...o, ...updateData } : o)));
                      updateDoc(doc(db, 'orders', ord.id), updateData).catch(() => {});
                      notify(`Accepted your items in #${ord.id}! Added to your Orders & Pickup Tracking.`);
                    }}
                    className="bg-[#15803D] text-white font-extrabold py-2.5 rounded-xl shadow-sm"
                  >
                    ✓ Accept Order
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      stopAlertRingtone();
                      const nextDeclined = [...(ord.declinedBy || []), `${currentUser.id}_${st.stopId}`];
                      setOrders((prev) => prev.map((o) => (o.id === ord.id ? { ...o, declinedBy: nextDeclined } : o)));
                      updateDoc(doc(db, 'orders', ord.id), { declinedBy: nextDeclined }).catch(() => {});
                      notify(`Declined Stop in #${ord.id}`);
                    }}
                    className="bg-white border border-rose-300 text-rose-600 font-extrabold py-2.5 rounded-xl"
                  >
                    ✕ Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {myAcceptedStopCards.map(({ ord, st, isMyTurnForRiderPickup }) => {
          const rLat = ord.driverLat || 14.4390;
          const rLng = ord.driverLng || 79.9810;
          return (
            <div key={`${ord.id}_${st.stopId}_accepted`} className="bg-white border-2 border-[#15803D] rounded-2xl p-3.5 shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-slate-900">Order #{ord.id} • {ord.buyerName}</span>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${st.pickedUp ? 'bg-emerald-100 text-[#15803D]' : 'bg-amber-100 text-amber-900'}`}>
                  {st.pickedUp ? '✓ Picked Up by Rider' : isMyTurnForRiderPickup ? '🛵 Rider En Route to You' : 'Queued Next Pickup'}
                </span>
              </div>
              <p className="text-[11px] font-bold text-[#15803D]">Items: {st.itemsSummary.join(', ')}</p>

              {!st.pickedUp && isMyTurnForRiderPickup && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-extrabold text-[#15803D]">
                    {ord.driverName
                      ? `🛵 Live Rider Pickup Tracking: ${ord.driverName} (+91 ${ord.driverMobile}) • GPS: ${rLat}, ${rLng}`
                      : 'Waiting for Delivery Partner to accept pickup route...'}
                  </p>
                  <LiveScooterMap
                    lat={rLat}
                    lng={rLng}
                    title={`Pickup Map ${ord.id}_${st.stopId}`}
                    height={148}
                    badgeText={`🛵 Rider arriving for pickup • ${rLat}, ${rLng}`}
                  />
                </div>
              )}

              {!st.pickedUp && !isMyTurnForRiderPickup && (
                <p className="text-[10px] text-slate-500">
                  Rider is picking up the previous accepted stop first — live scooter tracking will automatically switch to you right after!
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // =========================================================================
  // 4. FARMER PORTAL
  // =========================================================================
  if (currentUser.role === 'farmer') {
    return (
      <div style={fontStyle} className="min-h-screen bg-[#F5F7F5] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
        <WelcomeSmileModal />
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-[#15803D]" />
            <span className="text-xs font-extrabold text-slate-900">{currentUser.address} ▾</span>
          </div>
          <span className="bg-emerald-50 text-[#15803D] text-xs font-extrabold px-3 py-1 rounded-full">₹{currentUser.wallet || 0}</span>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-4 text-xs">
            {renderBroadcastOrderAlertsAndPickupTracking()}

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
              <img src={FARMER_HERO_IMG} alt="Farmer" className="h-24 w-24 rounded-2xl object-cover object-top shadow" />
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
                  <button key={tile.id} onClick={() => setActiveTab(tile.id)} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col items-center space-y-1.5">
                    <div className={`h-11 w-11 rounded-2xl ${tile.bg} flex items-center justify-center`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-800">{tile.label}</span>
                  </button>
                );
              })}
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
            {renderPostProductForm('farmer', 'Publish to Wholesale, Retail & Customers')}
          </main>
        )}

        {activeTab === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-extrabold">My Farmer Orders & Pickup Tracking</h2>
            {renderBroadcastOrderAlertsAndPickupTracking()}
          </main>
        )}

        {activeTab === 'marketRates' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-extrabold">Nellore Mandi Rates</h2>
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3.5 shadow-sm flex justify-between">
                <span className="font-extrabold">{p.nameEn} ({p.quality || 'Grade A'})</span>
                <span className="font-extrabold text-[#15803D]">₹{p.farmerDirectPrice}/{p.unit || 'Kg'}</span>
              </div>
            ))}
          </main>
        )}

        {activeTab === 'earnings' && (
          <main className="p-4 text-xs">
            <div className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white rounded-3xl p-5 shadow-md">
              <p className="text-emerald-100 font-bold">Total Farm Earnings</p>
              <h3 className="text-3xl font-extrabold mt-1">₹{currentUser.wallet || 0}</h3>
            </div>
          </main>
        )}

        {activeTab === 'support' && (
          <main className="p-4 text-xs text-center">
            <div className="bg-white rounded-3xl p-6 shadow-sm space-y-3">
              <h2 className="text-base font-extrabold">Farmer Support Desk</h2>
              <a href="tel:8328261103" className="block w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl">Call 8328261103</a>
            </div>
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

    const visibleB2BProducts = products.filter((p) => {
      const src = p.postedByRole || 'farmer';
      return isRetail ? src === 'farmer' || src === 'wholesale' : src === 'farmer';
    });

    const myPlacedBulkOrders = orders.filter((o) => o.buyerId === currentUser.id);

    const handlePlaceB2BOrder = (prod) => {
      const qty = prod.minWholesaleQty;
      const unitRate = (prod.postedByRole || 'farmer') === 'farmer' ? prod.farmerDirectPrice : prod.wholesalePrice;
      const itemTotal = qty * unitRate;
      const delivCharge = b2bDeliveryMode === 'pickup' ? 0 : Math.round(prod.distanceKm * 5 + qty * 0.5);
      const otp = String(Math.floor(1000 + Math.random() * 9000));
      const itemsArr = [
        {
          id: prod.id,
          name: prod.nameEn,
          quality: prod.quality || 'Grade A',
          unit: prod.unit || 'Kg',
          qty,
          price: unitRate,
          sellerId: prod.farmerId || null,
          sellerName: prod.farmerName,
          sellerLat: prod.sellerLat || 14.4450,
          sellerLng: prod.sellerLng || 79.9850,
          postedByRole: prod.postedByRole || 'farmer',
        },
      ];
      const pickupStops = buildPickupStopsFromItems(itemsArr);

      const newOrd = {
        id: (isRetail ? 'RIT-' : 'WS-') + Math.floor(1000 + Math.random() * 8999),
        buyerId: currentUser.id,
        buyerRole: currentUser.role,
        buyerName: currentUser.name,
        buyerMobile: currentUser.mobile,
        buyerEmail: currentUser.email,
        buyerAddress: currentUser.address,
        buyerLat: currentUser.lat || mapPinCoords.lat,
        buyerLng: currentUser.lng || mapPinCoords.lng,
        items: itemsArr,
        pickupStops,
        riderBaseFee: 30,
        riderMultiStopBonus: 0,
        totalRiderPayout: 30,
        total: itemTotal + delivCharge,
        deliveryMode: b2bDeliveryMode === 'pickup' ? 'Pickup at Store / Farm (₹0 Fee)' : `Home Delivery (${prod.distanceKm} km • ₹${delivCharge})`,
        status: 'Order Placed',
        declinedBy: [],
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
      notify(`Bulk Order Placed! Live Delivery Tracking unlocks once picked up. OTP: ${otp}`);
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
            {renderBroadcastOrderAlertsAndPickupTracking()}

            <div className="bg-gradient-to-r from-[#0F5132] to-[#16A34A] text-white rounded-3xl p-4 shadow-md flex items-center justify-between">
              <div>
                <p className="text-emerald-100 font-bold">Today's Sales</p>
                <h2 className="text-2xl font-extrabold mt-0.5">
                  ₹{orders.reduce((s, o) => s + o.total, 0)} <span className="text-xs text-[#FDE047]">↑ 12%</span>
                </h2>
              </div>
              <TrendingUp className="h-10 w-10 text-[#FDE047] opacity-90" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setActiveTab('browse')} className="bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow-md">
                Buy Bulk Stock →
              </button>
              <button onClick={() => setActiveTab('sellStock')} className="bg-slate-900 text-white font-extrabold py-3.5 rounded-2xl shadow-md">
                + Post Store Product
              </button>
            </div>
          </main>
        )}

        {activeTab === 'sellStock' && (
          <main className="p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-extrabold">
                {isRetail ? 'Post Product for Customers' : 'Post Wholesale Stock'}
              </h2>
            </div>
            {renderPostProductForm(currentUser.role, 'Publish Product Now')}
          </main>
        )}

        {activeTab === 'browse' && (
          <main className="p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-extrabold text-slate-900">Browse Farm & Wholesale Produce</h2>
            </div>

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

            {visibleB2BProducts.map((p) => {
              const rate = (p.postedByRole || 'farmer') === 'farmer' ? p.farmerDirectPrice : p.wholesalePrice;
              const estDeliv = b2bDeliveryMode === 'pickup' ? 0 : Math.round(p.distanceKm * 5 + p.minWholesaleQty * 0.5);
              return (
                <div key={p.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2.5">
                  <div className="flex items-center space-x-3">
                    <img src={p.img} alt={p.nameEn} className="h-14 w-14 rounded-xl object-cover" />
                    <div>
                      <span className="text-[9px] font-extrabold uppercase bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded">
                        From {(p.postedByRole || 'farmer').toUpperCase()} • {p.quality || 'Grade A'}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">{p.nameEn} ({p.nameTe})</h4>
                      <p className="text-[11px] font-extrabold text-[#15803D]">
                        ₹{rate}/{p.unit || 'Kg'} • Min: {p.minWholesaleQty} {p.unit || 'Kg'} • Delivery: ₹{estDeliv}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handlePlaceB2BOrder(p)} className="w-full bg-[#15803D] text-white font-extrabold py-2.5 rounded-xl">
                    Place Bulk Order ({p.minWholesaleQty} {p.unit || 'Kg'} • ₹{rate * p.minWholesaleQty + estDeliv})
                  </button>
                </div>
              );
            })}
          </main>
        )}

{activeTab === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-extrabold">{currentUser.role.toUpperCase()} Orders & Live Tracking</h2>
            {renderBroadcastOrderAlertsAndPickupTracking()}

            {myPlacedBulkOrders.map((ord) => {
              const isPickedUp = ord.status === 'Out for Delivery' || ord.status === 'Delivered';
              const rLat = ord.driverLat || 14.4390;
              const rLng = ord.driverLng || 79.9810;
              return (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 space-y-2">
                  <div className="flex justify-between font-extrabold">
                    <span>My Bulk Order #{ord.id} • {ord.status}</span>
                    <span className="text-[#15803D]">₹{ord.total}</span>
                  </div>
                  <p className="text-slate-600">{ord.items.map((i) => `${i.qty} ${i.unit || 'Kg'} ${i.name}`).join(', ')}</p>
                  {ord.b2bOtp && (
                    <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl font-extrabold text-amber-950">
                      Delivery Verification OTP: {ord.b2bOtp}
                    </div>
                  )}

                  {isPickedUp ? (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-extrabold text-[#15803D]">
                        🛵 Rider {ord.driverName} Picked Up Order — Live Delivery GPS: {rLat}, {rLng}
                      </p>
                      <LiveScooterMap
                        lat={rLat}
                        lng={rLng}
                        title={`Bulk Drop Map ${ord.id}`}
                        height={148}
                        badgeText={`🛵 Live Delivery GPS: ${rLat}, ${rLng}`}
                      />
                    </div>
                  ) : (
                    <p className="text-[10px] font-bold text-slate-500">
                      Waiting for seller acceptance & rider pickup...
                    </p>
                  )}

                  <button onClick={() => window.print()} className="w-full bg-slate-900 text-white font-extrabold py-2.5 rounded-xl flex items-center justify-center space-x-1.5">
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print / Save PDF Invoice</span>
                  </button>
                </div>
              );
            })}
          </main>
        )}

        {activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-6 py-2.5 flex justify-between items-center z-40">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'browse', icon: Package, label: 'Buy Stock' },
            { id: 'sellStock', icon: Plus, label: 'Post Item' },
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
  // 6. DELIVERY PARTNER PORTAL
  // =========================================================================
  if (currentUser.role === 'delivery') {
    const availOrders = orders.filter((o) => o.status !== 'Delivered');
    const delivOrders = orders.filter((o) => o.status === 'Delivered');
    const weeklyCompleted = currentUser.weeklyOrders || 0;

    const handleMarkOrderPickedUp = (ord, stopIdx) => {
      const stops = [...(ord.pickupStops || [])];
      if (stops[stopIdx]) {
        stops[stopIdx] = { ...stops[stopIdx], pickedUp: true };
      }
      const acceptedStops = stops.filter((s) => s.stopStatus === 'Accepted');
      const allAcceptedPicked =
        acceptedStops.length > 0
          ? acceptedStops.every((s) => s.pickedUp)
          : stops.every((s) => s.pickedUp);

      const nextStatus = allAcceptedPicked ? 'Out for Delivery' : 'Partner Assigned';

      setOrders((prev) =>
        prev.map((o) => (o.id === ord.id ? { ...o, pickupStops: stops, status: nextStatus } : o))
      );
      updateDoc(doc(db, 'orders', ord.id), {
        pickupStops: stops,
        status: nextStatus,
      }).catch(() => {});
      notify(
        allAcceptedPicked
          ? 'All accepted stops Picked Up! Customer live scooter tracking enabled.'
          : `Stop ${stopIdx + 1} Picked Up! Next accepted seller now tracking your scooter.`
      );
    };

    const handleCompleteDelivery = (ord) => {
      const stopsCount = (ord.pickupStops || []).length || 1;
      const baseFee = ord.riderBaseFee || 30;
      const multiBonus = ord.riderMultiStopBonus ?? Math.max(0, stopsCount - 1) * 15;
      const totalEarned = baseFee + multiBonus;

      setProducts((prev) =>
        prev.map((p) => {
          const orderedItem = ord.items.find((it) => it.id === p.id);
          if (!orderedItem) return p;
          return { ...p, stockKg: Math.max(0, p.stockKg - orderedItem.qty) };
        })
      );
      setOrders((prev) => prev.map((o) => (o.id === ord.id ? { ...o, status: 'Delivered' } : o)));
      updateDoc(doc(db, 'orders', ord.id), { status: 'Delivered' }).catch(() => {});
      setCurrentUser({
        ...currentUser,
        wallet: (currentUser.wallet || 0) + totalEarned,
        weeklyOrders: weeklyCompleted + 1,
      });
      sendAutomaticInvoiceEmail(ord);
      notify(`Delivered! ₹${baseFee} Base + ₹${multiBonus} Multi-Stop Bonus (Total ₹${totalEarned}) credited!`);
    };

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F5F7F5] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-white px-4 py-3.5 flex items-center justify-between border-b border-slate-100 sticky top-0 z-30">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block">Hello,</span>
            <h1 className="text-sm font-extrabold text-slate-900">{currentUser.name} 🛵</h1>
          </div>
          <span className="bg-emerald-50 text-[#15803D] text-xs font-extrabold px-3 py-1 rounded-full">₹{currentUser.wallet || 0}</span>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-3.5 text-xs">
            <div className="bg-gradient-to-r from-[#0F5132] to-[#16A34A] text-white rounded-3xl p-4 shadow-md flex items-center justify-between">
              <div>
                <p className="text-emerald-100 font-bold">Today's Earnings</p>
                <h2 className="text-2xl font-extrabold mt-0.5">₹{currentUser.wallet || 0}</h2>
                <p className="text-[10px] text-amber-200 font-bold mt-0.5">₹30 Base + ₹15 Extra Pickup Stop Bonus</p>
              </div>
              <TrendingUp className="h-10 w-10 text-[#FDE047]" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <button onClick={() => setDelivFilter('available')} className={`p-2.5 rounded-2xl border ${delivFilter === 'available' ? 'bg-emerald-50 border-[#15803D]' : 'bg-white'}`}>
                <p className="text-[10px] text-slate-500 font-bold">Active</p>
                <p className="text-base font-extrabold text-[#EA580C]">{availOrders.length}</p>
              </button>
              <button onClick={() => setDelivFilter('delivered')} className={`p-2.5 rounded-2xl border ${delivFilter === 'delivered' ? 'bg-emerald-50 border-[#15803D]' : 'bg-white'}`}>
                <p className="text-[10px] text-slate-500 font-bold">Completed</p>
                <p className="text-base font-extrabold text-[#15803D]">{delivOrders.length}</p>
              </button>
              <div className="p-2.5 rounded-2xl border bg-white">
                <p className="text-[10px] text-slate-500 font-bold">Weekly</p>
                <p className="text-base font-extrabold text-sky-600">{weeklyCompleted}/100</p>
              </div>
            </div>

            {(delivFilter === 'available' ? availOrders : delivOrders).length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-slate-400 font-bold">No orders in this list.</div>
            ) : (
              (delivFilter === 'available' ? availOrders : delivOrders).map((ord) => {
                const stops = ord.pickupStops || buildPickupStopsFromItems(ord.items || []);
                const baseFee = ord.riderBaseFee || 30;
                const multiBonus = ord.riderMultiStopBonus ?? Math.max(0, stops.length - 1) * 15;
                const riderPayout = baseFee + multiBonus;
                const isAssignedToMe = ord.status === 'Partner Assigned' || ord.status === 'Out for Delivery';
                const dropMapQuery = ord.buyerLat && ord.buyerLng
                  ? `${ord.buyerLat},${ord.buyerLng}`
                  : encodeURIComponent(ord.buyerAddress);

return (
                  <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 space-y-2.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-extrabold text-slate-900">#{ord.id} ({ord.buyerRole.toUpperCase()})</span>
                        <p className="text-[10px] font-bold text-slate-500">{ord.buyerName} • +91 {ord.buyerMobile}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-emerald-100 text-[#15803D] font-extrabold px-2.5 py-1 rounded-full text-[11px]">
                          Earn ₹{riderPayout}
                        </span>
                        {multiBonus > 0 && (
                          <p className="text-[9px] font-extrabold text-[#EA580C] mt-0.5">
                            +₹{multiBonus} Multi-Stop Bonus
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-2">
                      <p className="text-[10px] font-extrabold text-slate-700 uppercase">
                        1. Farmer / Shop Pickup Stops ({stops.length}):
                      </p>
                      {stops.map((st, idx) => {
                        const stMap = st.sellerLat && st.sellerLng
                          ? `${st.sellerLat},${st.sellerLng}`
                          : encodeURIComponent(st.sellerName);
                        return (
                          <div key={st.stopId} className="bg-white rounded-lg p-2 border border-slate-100 flex items-center justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="font-extrabold text-[11px] text-slate-900 truncate">
                                Stop {idx + 1}: {st.acceptedByUserName || st.sellerName} ({st.stopStatus})
                              </p>
                              <p className="text-[10px] text-slate-500 truncate">{st.itemsSummary.join(', ')}</p>
                            </div>
                            <div className="flex items-center space-x-1.5 flex-shrink-0">
                              <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${stMap}`}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-sky-600 text-white px-2.5 py-1 rounded-lg font-extrabold text-[10px] flex items-center space-x-1"
                              >
                                <Navigation className="h-3 w-3" />
                                <span>Pickup Map</span>
                              </a>
                              {isAssignedToMe && (
                                <button
                                  type="button"
                                  onClick={() => handleMarkOrderPickedUp(ord, idx)}
                                  className={`px-2 py-1 rounded-lg font-extrabold text-[10px] ${
                                    st.pickedUp ? 'bg-[#15803D] text-white' : 'bg-amber-200 text-amber-950'
                                  }`}
                                >
                                  {st.pickedUp ? '✓ Picked' : 'Mark Picked'}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      <p className="text-[10px] font-extrabold text-[#0F5132] uppercase pt-1">
                        2. Customer / Buyer Drop Location:
                      </p>
                      <div className="bg-emerald-50/80 rounded-lg p-2 border border-emerald-200 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-extrabold text-[11px] text-[#0F5132]">{ord.buyerName}</p>
                          <p className="text-[10px] text-slate-600 truncate">{ord.buyerAddress}</p>
                        </div>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${dropMapQuery}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-[#15803D] text-white px-2.5 py-1.5 rounded-lg font-extrabold text-[10px] flex items-center space-x-1 flex-shrink-0"
                        >
                          <Navigation className="h-3 w-3" />
                          <span>Customer Map</span>
                        </a>
                      </div>
                    </div>

                    {isAssignedToMe && (
                      <p className="text-[10px] font-extrabold text-[#15803D] bg-emerald-50 px-2.5 py-1 rounded-lg">
                        🛵 Live Scooter GPS Active ({ord.driverCoords})
                      </p>
                    )}

                    {ord.status !== 'Delivered' && (
                      <button
                        onClick={() => {
                          if (!isAssignedToMe) {
                            const initLat = mapPinCoords.lat;
                            const initLng = mapPinCoords.lng;
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
                            notify('Accepted! Live scooter pickup tracking sent to 1st accepted seller.');
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
                        className="w-full bg-[#15803D] text-white font-extrabold py-2.5 rounded-xl"
                      >
                        {!isAssignedToMe
                          ? `Accept Route (Earn ₹${riderPayout})`
                          : ord.b2bOtp
                          ? 'Verify B2B OTP & Complete'
                          : `Complete Delivery (Collect ₹${riderPayout})`}
                      </button>
                    )}
                  </div>
                );
              })
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
  // 7. MASTER ADMIN HQ (MANAGE CATALOGUE + MANAGE CATEGORIES + MANAGE COUPONS + APPROVALS)
  // =========================================================================
  const handleAdminCatalogPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFileToDataUrl(file);
      setCatImgPreview(compressed);
      notify('Product photo ready!');
    } catch {
      notify('Could not process image file.');
    }
  };

  const handleAddMasterCatalogItem = (e) => {
    e.preventDefault();
    if (!catNameEn.trim()) return;
    const finalImg =
      catImgPreview ||
      catImgUrl.trim() ||
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80';

    const newItem = {
      id: 'cat_' + Date.now(),
      nameEn: catNameEn.trim(),
      nameTe: catNameTe.trim() || EN_TO_TE[catNameEn.trim().toLowerCase()] || catNameEn.trim(),
      cat: catCategory,
      defaultUnit: catUnit,
      img: finalImg,
    };

    setMasterCatalog((prev) => [newItem, ...prev]);
    setDoc(doc(db, 'masterCatalog', newItem.id), newItem).catch(() => {});
    setCatNameEn('');
    setCatNameTe('');
    setCatImgPreview('');
    setCatImgUrl('');
    notify(`Added "${newItem.nameEn}" (${catCategory}) to Master Catalog!`);
  };

  const handleDeleteCatalogItem = (itemId) => {
    setMasterCatalog((prev) => prev.filter((c) => c.id !== itemId));
    deleteDoc(doc(db, 'masterCatalog', itemId)).catch(() => {});
    notify('Removed from Master Catalog');
  };

  // Admin Category Icon Photo Upload
  const handleAdminCategoryPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFileToDataUrl(file);
      setNewCatImgPreview(compressed);
      notify('Category icon uploaded!');
    } catch {
      notify('Could not process category image.');
    }
  };

  // Add or Update Category (Syncs immediately to Customer & Seller pages)
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!newCatEn.trim()) return;
    const finalImg =
      newCatImgPreview ||
      newCatImgUrl.trim() ||
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80';

    const catObj = {
      id: editingCatId || newCatEn.trim(),
      labelEn: newCatEn.trim(),
      labelTe: newCatTe.trim() || newCatEn.trim(),
      isDailyEssential: newCatDaily,
      img: finalImg,
    };

    setCategoriesList((prev) => {
      if (editingCatId) {
        return prev.map((c) => (c.id === editingCatId ? catObj : c));
      }
      return [catObj, ...prev];
    });
    setDoc(doc(db, 'categories', catObj.id), catObj).catch(() => {});
    setEditingCatId(null);
    setNewCatEn('');
    setNewCatTe('');
    setNewCatImgPreview('');
    setNewCatImgUrl('');
    notify(editingCatId ? 'Category Updated Across All Pages!' : 'New Category Added!');
  };

  const handleDeleteCategory = (catId) => {
    setCategoriesList((prev) => prev.filter((c) => c.id !== catId));
    deleteDoc(doc(db, 'categories', catId)).catch(() => {});
    notify('Category Deleted');
  };

// Add or Update Coupon / Offer (Syncs immediately to Customer Home & Checkout)
  const handleSaveCoupon = (e) => {
    e.preventDefault();
    if (!cpCode.trim() || !cpTitle.trim()) return;
    const couponObj = {
      id: editingCouponId || 'cp_' + Date.now(),
      code: cpCode.trim().toUpperCase(),
      title: cpTitle.trim(),
      subtitle: `Valid on orders above ₹${cpMinOrder || 0}`,
      discount: Number(cpDiscount || 0),
      minOrder: Number(cpMinOrder || 0),
      badge: cpBadge.trim().toUpperCase() || 'OFFER',
      active: true,
    };

    setCouponsList((prev) => {
      if (editingCouponId) {
        return prev.map((c) => (c.id === editingCouponId ? couponObj : c));
      }
      return [couponObj, ...prev];
    });
    setDoc(doc(db, 'coupons', couponObj.id), couponObj).catch(() => {});
    setEditingCouponId(null);
    setCpCode('');
    setCpTitle('');
    setCpDiscount('30');
    setCpMinOrder('149');
    notify(editingCouponId ? 'Coupon Updated!' : 'New Coupon Published to Customer Page!');
  };

  const handleDeleteCoupon = (cpId) => {
    setCouponsList((prev) => prev.filter((c) => c.id !== cpId));
    deleteDoc(doc(db, 'coupons', cpId)).catch(() => {});
    notify('Coupon Removed');
  };

  return (
    <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
      {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

      <header className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white p-4 rounded-b-[28px] flex justify-between items-center shadow-md">
        <div>
          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded font-extrabold uppercase">Master Admin HQ</span>
          <h1 className="text-base font-extrabold mt-0.5">Rythu Basket Control</h1>
        </div>
        <span className="bg-[#EAB308] text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-full">
          Live Sync
        </span>
      </header>

      {activeTab === 'home' && (
        <main className="p-4 space-y-3 text-xs">
          {/* 4 Admin Management Tabs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAdminTab('catalogue')}
              className={`py-2.5 rounded-xl font-extrabold border ${adminTab === 'catalogue' ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-white text-slate-700'}`}
            >
              Manage Catalogue ({masterCatalog.length})
            </button>
            <button
              type="button"
              onClick={() => setAdminTab('categories')}
              className={`py-2.5 rounded-xl font-extrabold border ${adminTab === 'categories' ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-white text-slate-700'}`}
            >
              Manage Categories ({categoriesList.length})
            </button>
            <button
              type="button"
              onClick={() => setAdminTab('coupons')}
              className={`py-2.5 rounded-xl font-extrabold border ${adminTab === 'coupons' ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-white text-slate-700'}`}
            >
              Manage Coupons ({couponsList.length})
            </button>
            <button
              type="button"
              onClick={() => setAdminTab('approvals')}
              className={`py-2.5 rounded-xl font-extrabold border ${adminTab === 'approvals' ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-white text-slate-700'}`}
            >
              Seller Approvals ({users.filter((u) => u.role !== 'customer' && u.role !== 'admin').length})
            </button>
          </div>

          {/* 1. MANAGE CATALOGUE */}
          {adminTab === 'catalogue' && (
            <div className="space-y-3">
              <form onSubmit={handleAddMasterCatalogItem} className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100 space-y-3">
                <div className="flex items-center space-x-1.5 font-extrabold text-[#15803D] text-sm">
                  <Image className="h-4 w-4" />
                  <span>Add Product & Picture to Catalogue</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={catNameEn}
                    onChange={(e) => {
                      setCatNameEn(e.target.value);
                      const autoTe = EN_TO_TE[e.target.value.trim().toLowerCase()];
                      if (autoTe) setCatNameTe(autoTe);
                    }}
                    placeholder="Product Name (English) *"
                    className="bg-slate-50 border rounded-xl px-3 py-2.5 font-bold"
                  />
                  <input
                    type="text"
                    required
                    value={catNameTe}
                    onChange={(e) => setCatNameTe(e.target.value)}
                    placeholder="పేరు తెలుగులో *"
                    className="bg-emerald-50/70 border border-emerald-200 rounded-xl px-3 py-2.5 font-bold text-[#15803D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select value={catCategory} onChange={(e) => setCatCategory(e.target.value)} className="bg-slate-50 border rounded-xl px-3 py-2.5 font-extrabold">
                    {categoriesList.map((c) => (
                      <option key={c.id} value={c.labelEn}>{c.labelEn}</option>
                    ))}
                  </select>
                  <select value={catUnit} onChange={(e) => setCatUnit(e.target.value)} className="bg-slate-50 border rounded-xl px-3 py-2.5 font-extrabold">
                    <option value="Kg">Default Unit: Kg</option>
                    <option value="Grams">Default Unit: Grams</option>
                    <option value="Litres">Default Unit: Litres</option>
                  </select>
                </div>

<label className="block border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-2xl p-3 text-center cursor-pointer">
                  {catImgPreview ? (
                    <img src={catImgPreview} alt="Preview" className="h-20 w-20 rounded-xl object-cover mx-auto mb-1 border" />
                  ) : (
                    <Camera className="h-6 w-6 text-[#15803D] mx-auto mb-1" />
                  )}
                  <span className="font-extrabold text-[#15803D] block">
                    {catImgPreview ? 'Change Uploaded Photo' : 'Tap to Upload Product Photo'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleAdminCatalogPhotoUpload} className="hidden" />
                </label>

                <input
                  type="url"
                  value={catImgUrl}
                  onChange={(e) => setCatImgUrl(e.target.value)}
                  placeholder="Or paste Image URL (Optional)"
                  className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-semibold text-[11px]"
                />

                <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow text-sm">
                  + Save to Master Catalogue
                </button>
              </form>

              <div className="space-y-2">
                {masterCatalog.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={item.img} alt={item.nameEn} className="h-12 w-12 rounded-xl object-cover bg-slate-100" />
                      <div>
                        <h4 className="font-extrabold text-slate-900">{item.nameEn} • {item.nameTe}</h4>
                        <p className="text-[10px] font-bold text-slate-500">{item.cat} • Unit: {item.defaultUnit}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteCatalogItem(item.id)}
                      className="p-2 text-rose-600 bg-rose-50 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. MANAGE CATEGORIES (ADD NEW, EDIT NAME/TELUGU, CHANGE CATEGORY ICON/PHOTO) */}
          {adminTab === 'categories' && (
            <div className="space-y-3">
              <form onSubmit={handleSaveCategory} className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[#15803D] text-sm">
                    {editingCatId ? 'Edit Category & Icon' : '+ Add New Category'}
                  </span>
                  {editingCatId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCatId(null);
                        setNewCatEn('');
                        setNewCatTe('');
                        setNewCatImgPreview('');
                        setNewCatImgUrl('');
                      }}
                      className="text-rose-600 font-bold text-[11px]"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={newCatEn}
                    onChange={(e) => setNewCatEn(e.target.value)}
                    placeholder="Category Name (EN) *"
                    className="bg-slate-50 border rounded-xl px-3 py-2.5 font-bold"
                  />
                  <input
                    type="text"
                    required
                    value={newCatTe}
                    onChange={(e) => setNewCatTe(e.target.value)}
                    placeholder="తెలుగు పేరు *"
                    className="bg-emerald-50/70 border border-emerald-200 rounded-xl px-3 py-2.5 font-bold text-[#15803D]"
                  />
                </div>

                <label className="flex items-center justify-between bg-slate-50 border rounded-xl px-3 py-2.5 font-bold">
                  <span>Show in Customer "Daily essentials"</span>
                  <input
                    type="checkbox"
                    checked={newCatDaily}
                    onChange={(e) => setNewCatDaily(e.target.checked)}
                    className="accent-[#15803D] h-4 w-4"
                  />
                </label>

                <label className="block border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-2xl p-3 text-center cursor-pointer">
                  {(newCatImgPreview || newCatImgUrl) ? (
                    <img src={newCatImgPreview || newCatImgUrl} alt="Icon Preview" className="h-16 w-16 rounded-xl object-cover mx-auto mb-1 border" />
                  ) : (
                    <Camera className="h-6 w-6 text-[#15803D] mx-auto mb-1" />
                  )}
                  <span className="font-extrabold text-[#15803D] block">
                    Tap to Change / Upload Category Icon
                  </span>
                  <input type="file" accept="image/*" onChange={handleAdminCategoryPhotoUpload} className="hidden" />
                </label>

                <input
                  type="url"
                  value={newCatImgUrl}
                  onChange={(e) => setNewCatImgUrl(e.target.value)}
                  placeholder="Or paste Category Icon URL"
                  className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-semibold text-[11px]"
                />

  <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow text-sm">
                  {editingCatId ? 'Update Category Everywhere' : '+ Add Category'}
                </button>
              </form>

              <div className="space-y-2">
                {categoriesList.map((cat) => (
                  <div key={cat.id} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0">
                      <img src={cat.img} alt={cat.labelEn} className="h-12 w-12 rounded-xl object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-900 truncate">{cat.labelEn}</h4>
                        <p className="text-[10px] font-bold text-[#15803D] truncate">{cat.labelTe}</p>
                        {cat.isDailyEssential !== false && (
                          <span className="text-[9px] font-extrabold bg-emerald-50 text-[#15803D] px-1.5 py-0.5 rounded">Daily Essential</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCatId(cat.id);
                          setNewCatEn(cat.labelEn);
                          setNewCatTe(cat.labelTe);
                          setNewCatDaily(cat.isDailyEssential !== false);
                          setNewCatImgUrl(cat.img);
                          setNewCatImgPreview('');
                        }}
                        className="p-2 text-[#15803D] bg-emerald-50 rounded-xl"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2 text-rose-600 bg-rose-50 rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. MANAGE COUPONS & OFFERS (SYNCED LIVE TO CUSTOMER HOME & CHECKOUT) */}
          {adminTab === 'coupons' && (
            <div className="space-y-3">
              <form onSubmit={handleSaveCoupon} className="bg-white rounded-3xl p-4 shadow-sm border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[#EA580C] text-sm">
                    {editingCouponId ? 'Edit Coupon / Offer' : '+ Create New Coupon / Offer'}
                  </span>
                  {editingCouponId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCouponId(null);
                        setCpCode('');
                        setCpTitle('');
                      }}
                      className="text-rose-600 font-bold text-[11px]"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={cpCode}
                    onChange={(e) => setCpCode(e.target.value.toUpperCase())}
                    placeholder="Coupon Code (e.g., SAVE40) *"
                    className="bg-slate-50 border rounded-xl px-3 py-2.5 font-mono font-extrabold"
                  />
                  <input
                    type="text"
                    value={cpBadge}
                    onChange={(e) => setCpBadge(e.target.value.toUpperCase())}
                    placeholder="Tag (e.g., MEGA SAVER)"
                    className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 font-extrabold"
                  />
                </div>

                <input
                  type="text"
                  required
                  value={cpTitle}
                  onChange={(e) => setCpTitle(e.target.value)}
                  placeholder="Offer Title (e.g., Flat ₹40 OFF on Vegetables) *"
                  className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-bold"
                />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400">Discount Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={cpDiscount}
                      onChange={(e) => setCpDiscount(e.target.value)}
                      className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-extrabold text-[#15803D]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400">Min Order Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={cpMinOrder}
                      onChange={(e) => setCpMinOrder(e.target.value)}
                      className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-extrabold"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow text-sm">
                  {editingCouponId ? 'Update Coupon' : '+ Publish Coupon to Customer Page'}
                </button>
              </form>

<div className="space-y-2">
                {couponsList.map((cp) => (
                  <div key={cp.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-extrabold bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded border border-emerald-200">
                          {cp.code}
                        </span>
                        <span className="text-[10px] font-extrabold text-amber-700">₹{cp.discount} OFF (Min ₹{cp.minOrder})</span>
                      </div>
                      <p className="font-bold text-slate-800 mt-1">{cp.title}</p>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...cp, active: !cp.active };
                          setCouponsList((prev) => prev.map((x) => (x.id === cp.id ? updated : x)));
                          updateDoc(doc(db, 'coupons', cp.id), { active: updated.active }).catch(() => {});
                          notify(updated.active ? 'Coupon Activated!' : 'Coupon Paused');
                        }}
                        className={`px-2.5 py-1 rounded-lg font-extrabold text-[10px] ${cp.active ? 'bg-emerald-100 text-[#15803D]' : 'bg-slate-200 text-slate-600'}`}
                      >
                        {cp.active ? 'ON' : 'OFF'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCouponId(cp.id);
                          setCpCode(cp.code);
                          setCpTitle(cp.title);
                          setCpDiscount(String(cp.discount));
                          setCpMinOrder(String(cp.minOrder));
                          setCpBadge(cp.badge || 'OFFER');
                        }}
                        className="p-2 text-[#15803D] bg-emerald-50 rounded-xl"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCoupon(cp.id)}
                        className="p-2 text-rose-600 bg-rose-50 rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. SELLER APPROVALS */}
          {adminTab === 'approvals' && (
            <div className="space-y-2.5">
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
                        updateDoc(doc(db, 'users', u.id), { approved: !u.approved }).catch(() => {});
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