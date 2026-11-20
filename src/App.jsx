import React, { useState, useEffect, useCallback, useRef } from 'react';
import { db, requestFcmDeviceToken } from './firebase';
import {
  Search, ShoppingCart, Plus, Home, ClipboardList, User, MapPin,
  Phone, MessageSquare, Sprout, Store, Truck, ShieldCheck, ChevronRight,
  ArrowLeft, CheckCircle2, Wallet, Sparkles, Bell, Globe,
  LocateFixed, LogOut, Printer, Warehouse, ChevronDown,
  Briefcase, Grid, Check, Tag, Edit3,
  TrendingUp, Package, HelpCircle, Navigation, Camera, Landmark, Volume2, VolumeX, Trash2, Image,
  Heart, UserPlus, RefreshCw, Clock
} from 'lucide-react';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// EmailJS Credentials
const EMAILJS_SERVICE_ID = 'service_auf6gch';
const EMAILJS_TEMPLATE_ID = 'template_z42k41l';
const EMAILJS_INVOICE_TEMPLATE_ID = 'template_fhx6p4e';
const EMAILJS_PUBLIC_KEY = 'r2D35iT3N2N_f_T7S';

const MASTER_ADMIN_EMAIL = 'madhavareddy2516@gmail.com';
const MASTER_ADMIN_MOBILE = '8328261103';
const PLATFORM_UPI_ID = 'madhavam.com@ybl';
const PLATFORM_UPI_NAME = 'Rythu Basket Nellore';

// =========================================================================
// BILINGUAL DICTIONARY & TRANSLATION HELPER (EN <-> TE)
// =========================================================================
const EN_TO_TE = {
  'tomato': 'టమాటా', 'tomatoes': 'టమాటాలు', 'onion': 'ఉల్లిపాయ', 'onions': 'ఉల్లిపాయలు',
  'potato': 'బంగాళాదుంప', 'potatoes': 'బంగాళాదుంపలు', 'brinjal': 'వంకాయ',
  'okra': 'బెండకాయ', 'lady finger': 'బెండకాయ', 'carrot': 'క్యారెట్',
  'green chilli': 'పచ్చిమిర్చి', 'coriander': 'కొత్తిమీర', 'curry leaves': 'కరివేపాకు',
  'spinach': 'పాలకూర', 'banana': 'అరటిపండు', 'mango': 'మామిడి', 'apple': 'ఆపిల్',
  'pomegranate': 'దానిమ్మ', 'papaya': 'బొప్పాయి', 'watermelon': 'పుచ్చకాయ',
  'milk': 'పాలు', 'curd': 'పెరుగు', 'paneer': 'పనీర్', 'ghee': 'నెయ్యి',
  'rice': 'బియ్యం', 'sona masoori rice': 'సోనా మసూరి బియ్యం', 'toor dal': 'కందిపప్పు',
  'sunflower oil': 'సన్‌ఫ్లవర్ ఆయిల్', 'groundnut oil': 'వేరుశెనగ నూనె',
  'wheat flour': 'గోధుమ పిండి', 'atta': 'గోధుమ పిండి', 'turmeric': 'పసుపు',
  'chilli powder': 'కారం పొడి', 'salt': 'ఉప్పు', 'sugar': 'చక్కెర',
  'jaggery': 'బెల్లం', 'tamarind': 'చింతపండు', 'garlic': 'వెల్లుల్లి', 'ginger': 'అల్లం'
};

const TE_TO_EN = Object.fromEntries(Object.entries(EN_TO_TE).map(([en, te]) => [te, en]));

const UI_TEXT = {
  en: {
    deliverTo: 'Deliver to',
    searchPlaceholder: 'Search Vegetables, Dairy, Atta, Masala, Tea, Juices...',
    dailyEssentials: 'Daily essentials',
    morningFresh: 'Morning Fresh',
    offersCoupons: 'Offers & Coupons',
    tapToCopy: 'Tap to Copy',
    categories: 'Categories',
    seeAll: 'See All',
    freshToday: 'Fresh Picks in Nellore',
    add: 'Add',
    home: 'Home',
    cart: 'Cart',
    orders: 'Orders',
    profile: 'Profile',
    placeOrder: 'Place Order',
    freeDelivery: 'FREE Delivery',
    wallet: 'Wallet',
    trackOrder: 'Track Order',
    needHelp: 'Need Help?',
  },
  te: {
    deliverTo: 'డెలివరీ చిరునామా',
    searchPlaceholder: 'కూరగాయలు, పాలు, బియ్యం, మసాలా వెతకండి...',
    dailyEssentials: 'నిత్యావసరాలు',
    morningFresh: 'ఉదయం తాజా సరుకు',
    offersCoupons: 'ఆఫర్లు & కూపన్లు',
    tapToCopy: 'కాపీ చేయండి',
    categories: 'విభాగాలు',
    seeAll: 'అన్నీ చూడండి',
    freshToday: 'నెల్లూరులో తాజా సరుకులు',
    add: 'యాడ్',
    home: 'హోమ్',
    cart: 'కార్ట్',
    orders: 'ఆర్డర్లు',
    profile: 'ప్రొఫైల్',
    placeOrder: 'ఆర్డర్ చేయండి',
    freeDelivery: 'ఉచిత డెలివరీ',
    wallet: 'వాలెట్',
    trackOrder: 'ట్రాక్ ఆర్డర్',
    needHelp: 'సహాయం కావాలా?',
  }
};

const INITIAL_CATEGORIES = [
  { id: 'Vegetables', labelEn: 'Vegetables', labelTe: 'కూరగాయలు', isDailyEssential: true, img: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=200&q=80' },
  { id: 'Fruits', labelEn: 'Fruits', labelTe: 'పండ్లు', isDailyEssential: true, img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=200&q=80' },
  { id: 'Leafy Greens', labelEn: 'Leafy Greens', labelTe: 'ఆకుకూరలు', isDailyEssential: true, img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=200&q=80' },
  { id: 'Dairy products', labelEn: 'Dairy products', labelTe: 'పాల ఉత్పత్తులు', isDailyEssential: true, img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=200&q=80' },
  { id: 'Atta, rice, Oils and dals', labelEn: 'Atta, rice, Oils and dals', labelTe: 'పిండి, బియ్యం, నూనెలు', isDailyEssential: true, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80' },
  { id: 'Masala and Dry fruits', labelEn: 'Masala and Dry fruits', labelTe: 'మసాలా & డ్రై ఫ్రూట్స్', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=200&q=80' },
  { id: 'Snacks & Biscuits', labelEn: 'Snacks & Biscuits', labelTe: 'స్నాక్స్ & బిస్కెట్లు', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=200&q=80' },
  { id: 'Tea, Coffee & Beverages', labelEn: 'Tea, Coffee & Beverages', labelTe: 'టీ, కాఫీ & పానీయాలు', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=200&q=80' },
  { id: 'Sweet Cravings', labelEn: 'Sweet Cravings', labelTe: 'స్వీట్లు & ఐస్ క్రీమ్', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=200&q=80' },
  { id: 'Cold Drinks & Juices', labelEn: 'Cold Drinks & Juices', labelTe: 'కూల్ డ్రింక్స్ & జ్యూస్', isDailyEssential: false, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80' }
];

const INITIAL_MASTER_CATALOG = [
  { id: 'cat_1', nameEn: 'Fresh Tomatoes', nameTe: 'తాజా టమాటాలు', cat: 'Vegetables', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_2', nameEn: 'Red Onions', nameTe: 'ఎర్ర ఉల్లిపాయలు', cat: 'Vegetables', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_3', nameEn: 'Organic Potatoes', nameTe: 'బంగాళాదుంపలు', cat: 'Vegetables', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_4', nameEn: 'Fresh Okra (Bendakaya)', nameTe: 'బెండకాయలు', cat: 'Vegetables', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_5', nameEn: 'Green Chillies', nameTe: 'పచ్చిమిర్చి', cat: 'Vegetables', defaultUnit: 'Grams', img: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_6', nameEn: 'Fresh Palak (Spinach)', nameTe: 'పాలకూర', cat: 'Leafy Greens', defaultUnit: 'Grams', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_7', nameEn: 'Fresh Coriander Leaves', nameTe: 'కొత్తిమీర', cat: 'Leafy Greens', defaultUnit: 'Grams', img: 'https://images.unsplash.com/photo-1588879460618-9249e7d947d1?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_8', nameEn: 'Banganapalli Mangoes', nameTe: 'బంగినపల్లి మామిడి', cat: 'Fruits', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_9', nameEn: 'Yelakki Bananas', nameTe: 'అరటిపండ్లు', cat: 'Fruits', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_10', nameEn: 'Fresh Farm Buffalo Milk', nameTe: 'తాజా గేదె పాలు', cat: 'Dairy products', defaultUnit: 'Litres', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_11', nameEn: 'Pure Village Curd', nameTe: 'గడ్డ పెరుగు', cat: 'Dairy products', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_12', nameEn: 'Nellore Sona Masoori Rice', nameTe: 'నెల్లూరు సోనా మసూరి బియ్యం', cat: 'Atta, rice, Oils and dals', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_13', nameEn: 'Toor Dal (Kandi Pappu)', nameTe: 'కందిపప్పు', cat: 'Atta, rice, Oils and dals', defaultUnit: 'Kg', img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_14', nameEn: 'Cold Pressed Groundnut Oil', nameTe: 'వేరుశెనగ నూనె', cat: 'Atta, rice, Oils and dals', defaultUnit: 'Litres', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_15', nameEn: 'Guntur Red Chilli Powder', nameTe: 'గుంటూరు కారం పొడి', cat: 'Masala and Dry fruits', defaultUnit: 'Grams', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat_16', nameEn: 'Premium Cashews (Jeedipappu)', nameTe: 'జీడిపప్పు', cat: 'Masala and Dry fruits', defaultUnit: 'Grams', img: 'https://images.unsplash.com/photo-1536591375667-f36067923892?auto=format&fit=crop&w=400&q=80' },
];

const INITIAL_COUPONS = [
  { id: 'cp_1', code: 'FIRST50', title: '50% on First 3 Orders', subtitle: 'Valid on orders above ₹149', discount: 50, minOrder: 149, badge: 'OFFER', active: true },
  { id: 'cp_2', code: 'NELLORE30', title: 'Flat ₹30 OFF on Fresh Veggies', subtitle: 'Valid on orders above ₹199', discount: 30, minOrder: 199, badge: 'POPULAR', active: true },
  { id: 'cp_3', code: 'RYTHU100', title: 'Flat ₹100 OFF on Monthly Groceries', subtitle: 'Valid on orders above ₹699', discount: 100, minOrder: 699, badge: 'MEGA SAVER', active: true },
];

const INITIAL_NELLORE_MANDI_RATES = [
  { id: 'mr_1', cropEn: 'Tomato (Hybrid)', cropTe: 'టమాటా', minPrice: 18, modalPrice: 24, maxPrice: 28, trend: '+12%', mandi: 'Nellore APMC Yard' },
  { id: 'mr_2', cropEn: 'Red Onion (Kurnool)', cropTe: 'ఎర్ర ఉల్లిపాయ', minPrice: 26, modalPrice: 32, maxPrice: 36, trend: '+5%', mandi: 'Nellore APMC Yard' },
  { id: 'mr_3', cropEn: 'Green Chilli', cropTe: 'పచ్చిమిర్చి', minPrice: 40, modalPrice: 48, maxPrice: 55, trend: '+8%', mandi: 'Nellore APMC Yard' },
  { id: 'mr_4', cropEn: 'Okra (Bendakaya)', cropTe: 'బెండకాయ', minPrice: 28, modalPrice: 34, maxPrice: 40, trend: '-3%', mandi: 'Nellore APMC Yard' },
  { id: 'mr_5', cropEn: 'Brinjal (Long)', cropTe: 'వంకాయ', minPrice: 22, modalPrice: 28, maxPrice: 32, trend: '+4%', mandi: 'Nellore APMC Yard' },
  { id: 'mr_6', cropEn: 'Sona Masoori Paddy', cropTe: 'సోనా మసూరి ధాన్యం', minPrice: 24, modalPrice: 27, maxPrice: 30, trend: '+2%', mandi: 'Nellore APMC Yard' },
];

const INITIAL_USERS = [
  {
    id: 'u_admin',
    role: 'admin',
    name: 'Madhava Reddy (Master Admin)',
    mobile: MASTER_ADMIN_MOBILE,
    email: MASTER_ADMIN_EMAIL,
    password: '',
    village: 'Nellore HQ',
    approved: true,
    wallet: 5000,
    lat: 14.4426,
    lng: 79.9865,
  },
  {
    id: 'u_farmer_1',
    role: 'farmer',
    name: 'Ramesh Naidu',
    mobile: '9848011111',
    email: 'ramesh.farmer@nellore.in',
    password: 'password123',
    village: 'Kovur, Nellore',
    approved: true,
    wallet: 1250,
    lat: 14.4912,
    lng: 79.9854,
  },
  {
    id: 'u_wholesale_1',
    role: 'wholesale',
    name: 'Sri Venkateswara Mandi',
    mobile: '9848022222',
    email: 'svm.mandi@nellore.in',
    password: 'password123',
    village: 'Stonehousepet, Nellore',
    approved: true,
    wallet: 4500,
    lat: 14.4498,
    lng: 79.9882,
  },
  {
    id: 'u_retail_1',
    role: 'retail',
    name: 'Balaji Fresh Supermarket',
    mobile: '9848033333',
    email: 'balaji.store@nellore.in',
    password: 'password123',
    village: 'Magunta Layout, Nellore',
    approved: true,
    wallet: 2100,
    lat: 14.4321,
    lng: 79.9756,
  }
];

const INITIAL_PRODUCTS = [
  { id: 'p1', sellerId: 'u_farmer_1', sellerName: 'Ramesh Naidu', sellerRole: 'farmer', nameEn: 'Fresh Tomatoes', nameTe: 'తాజా టమాటాలు', cat: 'Vegetables', price: 28, mrp: 38, unit: 'Kg', qtyStep: 1, stock: 80, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80', lat: 14.4912, lng: 79.9854 },
  { id: 'p2', sellerId: 'u_farmer_1', sellerName: 'Ramesh Naidu', sellerRole: 'farmer', nameEn: 'Red Onions', nameTe: 'ఎర్ర ఉల్లిపాయలు', cat: 'Vegetables', price: 34, mrp: 45, unit: 'Kg', qtyStep: 1, stock: 120, img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80', lat: 14.4912, lng: 79.9854 },
  { id: 'p3', sellerId: 'u_farmer_1', sellerName: 'Ramesh Naidu', sellerRole: 'farmer', nameEn: 'Fresh Okra (Bendakaya)', nameTe: 'బెండకాయలు', cat: 'Vegetables', price: 36, mrp: 48, unit: 'Kg', qtyStep: 1, stock: 45, img: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=400&q=80', lat: 14.4912, lng: 79.9854 },
  { id: 'p4', sellerId: 'u_farmer_1', sellerName: 'Ramesh Naidu', sellerRole: 'farmer', nameEn: 'Fresh Palak (Spinach)', nameTe: 'పాలకూర', cat: 'Leafy Greens', price: 18, mrp: 25, unit: 'Grams', qtyStep: 250, stock: 60, img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80', lat: 14.4912, lng: 79.9854 },
  { id: 'p5', sellerId: 'u_wholesale_1', sellerName: 'Sri Venkateswara Mandi', sellerRole: 'wholesale', nameEn: 'Nellore Sona Masoori Rice', nameTe: 'నెల్లూరు సోనా మసూరి బియ్యం', cat: 'Atta, rice, Oils and dals', price: 54, mrp: 68, unit: 'Kg', qtyStep: 1, stock: 500, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80', lat: 14.4498, lng: 79.9882 },
  { id: 'p6', sellerId: 'u_wholesale_1', sellerName: 'Sri Venkateswara Mandi', sellerRole: 'wholesale', nameEn: 'Toor Dal (Kandi Pappu)', nameTe: 'కందిపప్పు', cat: 'Atta, rice, Oils and dals', price: 138, mrp: 165, unit: 'Kg', qtyStep: 1, stock: 200, img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=400&q=80', lat: 14.4498, lng: 79.9882 },
  { id: 'p7', sellerId: 'u_retail_1', sellerName: 'Balaji Fresh Supermarket', sellerRole: 'retail', nameEn: 'Fresh Farm Buffalo Milk', nameTe: 'తాజా గేదె పాలు', cat: 'Dairy products', price: 66, mrp: 74, unit: 'Litres', qtyStep: 1, stock: 90, img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80', lat: 14.4321, lng: 79.9756 },
  { id: 'p8', sellerId: 'u_retail_1', sellerName: 'Balaji Fresh Supermarket', sellerRole: 'retail', nameEn: 'Banganapalli Mangoes', nameTe: 'బంగినపల్లి మామిడి', cat: 'Fruits', price: 85, mrp: 110, unit: 'Kg', qtyStep: 1, stock: 75, img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80', lat: 14.4321, lng: 79.9756 },
];

// =========================================================================
// HELPERS: DISTANCE, TRAFFIC ETA, VALIDATION, IMAGE COMPRESSION & INVOICE
// =========================================================================
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 3.2;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.max(0.8, Number((R * c).toFixed(1)));
}

function getTrafficAndDeliveryEta(distanceKm, status = 'Order Placed') {
  const hr = new Date().getHours();
  const isPeakTraffic = (hr >= 8 && hr <= 11) || (hr >= 17 && hr <= 21);
  const trafficLabel = isPeakTraffic ? 'Moderate-Heavy Traffic' : 'Smooth Traffic';
  const speedFactorMinPerKm = isPeakTraffic ? 4.2 : 2.6;
  const prepMinutes = status === 'Order Placed' ? 10 : status === 'Accepted' ? 7 : status === 'Picked' ? 4 : 0;
  const travelMinutes = Math.max(5, Math.round(distanceKm * speedFactorMinPerKm));
  if (status === 'Delivered') {
    return { etaMinutes: 0, trafficLabel, distanceKm };
  }
  return {
    etaMinutes: prepMinutes + travelMinutes,
    trafficLabel,
    distanceKm,
  };
}

function calculateDeliveryFee(itemTotal, distanceKm) {
  if (itemTotal >= 499) return 0;
  if (distanceKm <= 3) return 20;
  if (distanceKm <= 7) return 30;
  return 40;
}

const isValidIndianMobile = (m) => /^[6-9]\d{9}$/.test(String(m || '').trim());
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || '').trim());

const compressImageFileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSide = 480;
        let w = img.width;
        let h = img.height;
        if (w > maxSide || h > maxSide) {
          if (w > h) {
            h = Math.round((h * maxSide) / w);
            w = maxSide;
          } else {
            w = Math.round((w * maxSide) / h);
            h = maxSide;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.78));
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const sendEmailViaEmailJS = async (templateId, templateParams) => {
  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: templateId,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: templateParams,
      }),
    });
  } catch {}
};

// Trigger Push Notification to Device Lock Screen + Status Bar via Vercel /api/send-push
const triggerPushAlert = async ({ tokens, title, body }) => {
  const validTokens = (tokens || []).filter(Boolean);
  if (validTokens.length === 0) return;
  try {
    await fetch('/api/send-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokens: validTokens, title, body }),
    });
  } catch {}
};

// =========================================================================
// MAIN APPLICATION COMPONENT
// =========================================================================
export default function App() {
  const [lang, setLang] = useState('en');
  const t = UI_TEXT[lang];

  const [users, setUsers] = useState(INITIAL_USERS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [masterCatalog, setMasterCatalog] = useState(INITIAL_MASTER_CATALOG);
  const [categoriesList, setCategoriesList] = useState(INITIAL_CATEGORIES);
  const [couponsList, setCouponsList] = useState(INITIAL_COUPONS);
  const [marketRates, setMarketRates] = useState(INITIAL_NELLORE_MANDI_RATES);
  const [orders, setOrders] = useState([]);
  const [broadcastOffers, setBroadcastOffers] = useState([]);
  const [subAdmins, setSubAdmins] = useState([]);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rythu_active_session_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Auth States
  const [authMode, setAuthMode] = useState('login');
  const [loginRole, setLoginRole] = useState('customer');
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [adminOtpSent, setAdminOtpSent] = useState(false);
  const [adminGeneratedOtp, setAdminGeneratedOtp] = useState('');
  const [adminEnteredOtp, setAdminEnteredOtp] = useState('');

// Registration States
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regVillage, setRegVillage] = useState('Vedayapalem, Nellore');
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regGeneratedOtp, setRegGeneratedOtp] = useState('');
  const [regEnteredOtp, setRegEnteredOtp] = useState('');

  // Navigation & Customer UI States
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAllCategoriesModal, setShowAllCategoriesModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [useWalletBalance, setUseWalletBalance] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('Vedayapalem Main Road, Nellore');
  const [userCoords, setUserCoords] = useState({ lat: 14.4345, lng: 79.9781 });
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [toast, setToast] = useState('');

  // Seller Listing States
  const [sellerTab, setSellerTab] = useState('orders');
  const [selectedCatalogId, setSelectedCatalogId] = useState('');
  const [prodNameEn, setProdNameEn] = useState('');
  const [prodNameTe, setProdNameTe] = useState('');
  const [prodCat, setProdCat] = useState('Vegetables');
  const [prodPrice, setProdPrice] = useState('');
  const [prodMrp, setProdMrp] = useState('');
  const [prodUnit, setProdUnit] = useState('Kg');
  const [prodStock, setProdStock] = useState('50');
  const [prodImg, setProdImg] = useState('');

  // Admin HQ States
  const [adminTab, setAdminTab] = useState('approvals');
  const [catNameEn, setCatNameEn] = useState('');
  const [catNameTe, setCatNameTe] = useState('');
  const [catCategory, setCatCategory] = useState('Vegetables');
  const [catUnit, setCatUnit] = useState('Kg');
  const [catImgPreview, setCatImgPreview] = useState('');
  const [catImgUrl, setCatImgUrl] = useState('');

  const [editingCatId, setEditingCatId] = useState(null);
  const [newCatEn, setNewCatEn] = useState('');
  const [newCatTe, setNewCatTe] = useState('');
  const [newCatDaily, setNewCatDaily] = useState(true);
  const [newCatImgPreview, setNewCatImgPreview] = useState('');
  const [newCatImgUrl, setNewCatImgUrl] = useState('');

  const [editingCouponId, setEditingCouponId] = useState(null);
  const [cpCode, setCpCode] = useState('');
  const [cpTitle, setCpTitle] = useState('');
  const [cpDiscount, setCpDiscount] = useState('30');
  const [cpMinOrder, setCpMinOrder] = useState('149');
  const [cpBadge, setCpBadge] = useState('OFFER');

  const [promoOfferTag, setPromoOfferTag] = useState('SPECIAL OFFER');
  const [promoMsgText, setPromoMsgText] = useState('');
  const [walletUserId, setWalletUserId] = useState('');
  const [walletCreditAmt, setWalletCreditAmt] = useState('50');
  const [walletReason, setWalletReason] = useState('Welcome Cashback Bonus');

  const [subName, setSubName] = useState('');
  const [subMobile, setSubMobile] = useState('');
  const [subEmail, setSubEmail] = useState('');
  const [subPermissions, setSubPermissions] = useState('Catalogue, Categories, Coupons & Approvals');

  const notify = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }, []);

  // Persist Active Session
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('rythu_active_session_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('rythu_active_session_user');
      }
    } catch {}
  }, [currentUser]);

  // Save Device FCM Push Token to Firestore when user logs in
  useEffect(() => {
    if (!currentUser?.id) return;
    requestFcmDeviceToken().then((fcmToken) => {
      if (fcmToken && fcmToken !== currentUser.fcmToken) {
        setCurrentUser((prev) => (prev ? { ...prev, fcmToken } : prev));
        updateDoc(doc(db, 'users', currentUser.id), { fcmToken }).catch(() => {});
      }
    });
  }, [currentUser?.id]);

 // Keep currentUser synced with live Firestore user approval / wallet changes
  useEffect(() => {
    if (!currentUser?.id) return;
    const liveMatch = users.find((u) => u.id === currentUser.id);
    if (liveMatch) {
      if (liveMatch.approved !== currentUser.approved || liveMatch.wallet !== currentUser.wallet) {
        setCurrentUser((prev) => (prev ? { ...prev, approved: liveMatch.approved, wallet: liveMatch.wallet } : prev));
      }
    }
  }, [users, currentUser?.id]);

  // Firestore Real-Time Sync
  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setUsers(list);
      }
    });
    const unsubProducts = onSnapshot(collection(db, 'products'), (snap) => {
      if (!snap.empty) {
        setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    });
    const unsubOrders = onSnapshot(collection(db, 'orders'), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setOrders(list);
    });
    const unsubCatalog = onSnapshot(collection(db, 'masterCatalog'), (snap) => {
      if (!snap.empty) {
        setMasterCatalog(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    });
    const unsubCats = onSnapshot(collection(db, 'categories'), (snap) => {
      if (!snap.empty) {
        setCategoriesList(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    });
    const unsubCoupons = onSnapshot(collection(db, 'coupons'), (snap) => {
      if (!snap.empty) {
        setCouponsList(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    });
    const unsubSubAdmins = onSnapshot(collection(db, 'subAdmins'), (snap) => {
      setSubAdmins(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubMarketRates = onSnapshot(collection(db, 'marketRates'), (snap) => {
      if (!snap.empty) {
        setMarketRates(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    });

    let isFirstBroadcastLoad = true;
    const unsubBroadcasts = onSnapshot(collection(db, 'broadcastOffers'), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setBroadcastOffers(list);

      if (!isFirstBroadcastLoad && list.length > 0) {
        const latest = list[0];
        const isForMe = !latest.targetUserId || latest.targetUserId === currentUser?.id;
        if (isForMe && 'Notification' in window && Notification.permission === 'granted' && 'serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification(`Rythu Basket • ${latest.tag}`, {
              body: latest.message,
              icon: '/icon-512.png',
              badge: '/icon-192.png',
              vibrate: [200, 100, 200],
              tag: latest.id,
            });
          });
        }
      }
      isFirstBroadcastLoad = false;
    });

    return () => {
      unsubUsers();
      unsubProducts();
      unsubOrders();
      unsubCatalog();
      unsubCats();
      unsubCoupons();
      unsubSubAdmins();
      unsubMarketRates();
      unsubBroadcasts();
    };
  }, [currentUser?.id]);

// Fetch Real-Time APMC Nellore Mandi Market Rates (Data.gov.in / Agmarknet Feed)
  const refreshLiveMandiRates = useCallback(async () => {
    try {
      const res = await fetch(
        'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters[state]=Andhra%20Pradesh&filters[district]=Nellore&limit=15'
      );
      const data = await res.json();
      if (data && Array.isArray(data.records) && data.records.length > 0) {
        const mapped = data.records.slice(0, 8).map((rec, idx) => {
          const minKg = Math.max(10, Math.round(Number(rec.min_price || 1800) / 100));
          const modalKg = Math.max(12, Math.round(Number(rec.modal_price || 2400) / 100));
          const maxKg = Math.max(15, Math.round(Number(rec.max_price || 2800) / 100));
          const cropName = rec.commodity || 'Crop';
          return {
            id: 'agm_' + idx,
            cropEn: cropName,
            cropTe: EN_TO_TE[cropName.toLowerCase()] || cropName,
            minPrice: minKg,
            modalPrice: modalKg,
            maxPrice: maxKg,
            trend: modalKg >= minKg ? '+4%' : '-2%',
            mandi: `${rec.market || 'Nellore'} APMC (Agmarknet)`,
            updatedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          };
        });
        setMarketRates(mapped);
        mapped.forEach((m) => setDoc(doc(db, 'marketRates', m.id), m).catch(() => {}));
        notify('Synced Live Agmarknet Nellore APMC Rates!');
      } else {
        // Fallback live timestamp refresh on Nellore APMC rates
        const stamped = marketRates.map((m) => ({
          ...m,
          updatedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        }));
        setMarketRates(stamped);
        notify('Nellore APMC Market Rates Updated!');
      }
    } catch {
      notify('Showing Latest Nellore APMC Mandi Rates');
    }
  }, [marketRates, notify]);

  const detectGpsLocation = () => {
    if (!navigator.geolocation) {
      notify('GPS not supported on this browser');
      return;
    }
    notify('Detecting your Nellore GPS location...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setDeliveryAddress(`GPS Pin (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}), Nellore`);
        notify('Live GPS Location Updated!');
      },
      () => notify('Please enable location permission in browser settings')
    );
  };

  // Cart Quantity Helpers (Direct + / - Stepper on Product Card & Cart)
  const getCartQty = (productId) => {
    const found = cart.find((c) => c.id === productId);
    return found ? found.qty : 0;
  };

  const addToCart = (prod) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === prod.id);
      if (existing) {
        return prev.map((c) => (c.id === prod.id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { ...prod, qty: 1 }];
    });
  };

  const updateCartQty = (prodId, delta) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === prodId ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const toggleWishlist = (prodId) => {
    setWishlistIds((prev) => (prev.includes(prodId) ? prev.filter((id) => id !== prodId) : [...prev, prodId]));
  };

  const isCurrentUserMasterAdmin =
    currentUser?.role === 'admin' &&
    (currentUser?.email?.toLowerCase() === MASTER_ADMIN_EMAIL || currentUser?.mobile === MASTER_ADMIN_MOBILE);

  const fontStyle = { fontFamily: "'Plus Jakarta Sans', 'Noto Sans Telugu', sans-serif" };

// =========================================================================
  // AUTH GATE (UNIFIED LOGIN & REGISTRATION)
  // =========================================================================
  if (!currentUser) {
    const handleSendAdminOtp = () => {
      const clean = loginInput.trim().toLowerCase();
      const matchedSub = subAdmins.find(
        (s) => s.active && (s.email?.toLowerCase() === clean || s.mobile === clean.replace(/\D/g, ''))
      );
      if (clean !== MASTER_ADMIN_EMAIL && clean.replace(/\D/g, '') !== MASTER_ADMIN_MOBILE && !matchedSub) {
        notify('Unauthorized Admin! Only Master Admin or approved Sub-Admins allowed.');
        return;
      }
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      setAdminGeneratedOtp(otp);
      setAdminOtpSent(true);
      const targetEmail = matchedSub?.email || MASTER_ADMIN_EMAIL;
      sendEmailViaEmailJS(EMAILJS_TEMPLATE_ID, {
        to_email: targetEmail,
        to_name: matchedSub?.name || 'Master Admin',
        otp_code: otp,
      });
      notify(`OTP sent to ${targetEmail} (Demo OTP: ${otp})`);
    };

    const handleVerifyAdminOtp = (e) => {
      e.preventDefault();
      if (adminEnteredOtp.trim() !== adminGeneratedOtp) {
        notify('Invalid Admin OTP!');
        return;
      }
      const clean = loginInput.trim().toLowerCase();
      const matchedSub = subAdmins.find(
        (s) => s.active && (s.email?.toLowerCase() === clean || s.mobile === clean.replace(/\D/g, ''))
      );
      if (matchedSub) {
        setCurrentUser({
          id: matchedSub.id,
          role: 'admin',
          isSubAdmin: true,
          name: matchedSub.name,
          mobile: matchedSub.mobile,
          email: matchedSub.email,
          approved: true,
          wallet: 0,
        });
      } else {
        const master = users.find((u) => u.role === 'admin') || INITIAL_USERS[0];
        setCurrentUser(master);
      }
      notify('Welcome to Rythu Basket Control HQ!');
    };

    const handleUserLogin = (e) => {
      e.preventDefault();
      const clean = loginInput.trim().toLowerCase();
      const digits = clean.replace(/\D/g, '');
      const found = users.find(
        (u) =>
          u.role === loginRole &&
          (u.mobile === digits || u.email?.toLowerCase() === clean) &&
          u.password === loginPassword
      );
      if (!found) {
        notify('Invalid credentials or role mismatch. Please check or Register.');
        return;
      }
      setCurrentUser(found);
      setActiveTab('home');
      notify(`Namaste ${found.name}!`);
    };

    const handleSendRegistrationOtp = () => {
      if (!regName.trim() || !isValidIndianMobile(regMobile) || !isValidEmail(regEmail) || regPassword.length < 4) {
        notify('Enter valid Name, 10-digit Mobile, Email & Password (min 4 chars)');
        return;
      }
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      setRegGeneratedOtp(otp);
      setRegOtpSent(true);
      sendEmailViaEmailJS(EMAILJS_TEMPLATE_ID, {
        to_email: regEmail.trim(),
        to_name: regName.trim(),
        otp_code: otp,
      });
      notify(`Verification OTP sent to ${regEmail} (Demo OTP: ${otp})`);
    };

    const handleCompleteRegistration = async (e) => {
      e.preventDefault();
      if (regEnteredOtp.trim() !== regGeneratedOtp) {
        notify('Incorrect OTP! Please check your email.');
        return;
      }
      const isSeller = loginRole === 'farmer' || loginRole === 'wholesale' || loginRole === 'retail';
      const newUser = {
        id: 'u_' + Date.now(),
        role: loginRole,
        name: regName.trim(),
        mobile: regMobile.trim(),
        email: regEmail.trim().toLowerCase(),
        password: regPassword,
        village: regVillage.trim() || 'Nellore',
        approved: !isSeller, // Shops & Farmers require Master Admin approval before accepting orders
        wallet: loginRole === 'customer' ? 50 : 0,
        lat: userCoords.lat,
        lng: userCoords.lng,
      };
      setUsers((prev) => [newUser, ...prev]);
      await setDoc(doc(db, 'users', newUser.id), newUser).catch(() => {});
      setCurrentUser(newUser);
      setActiveTab('home');
      notify(
        isSeller
          ? 'Registered! Waiting for Master Admin approval before accepting orders.'
          : 'Registration Successful! ₹50 Welcome Bonus added!'
      );
    };

return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto flex flex-col justify-between p-5 text-slate-800 shadow-2xl">
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <div className="space-y-5 pt-4">
          <div className="bg-gradient-to-br from-[#0F5132] to-[#15803D] text-white p-6 rounded-[30px] shadow-lg">
            <span className="bg-white/15 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Nellore District Live</span>
            <h1 className="text-2xl font-extrabold mt-2">Rythu Basket 🌾</h1>
            <p className="text-xs text-emerald-100 mt-1">రైతు నుండి నేరుగా మీ ఇంటి వద్దకు • Fresh Farm & Mandi Marketplace</p>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 space-y-3">
            <p className="text-[11px] font-extrabold text-slate-500 uppercase">Select Your Role</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'customer', label: 'Customer', icon: ShoppingCart },
                { id: 'farmer', label: 'Farmer', icon: Sprout },
                { id: 'wholesale', label: 'Wholesaler', icon: Warehouse },
                { id: 'retail', label: 'Retail Shop', icon: Store },
                { id: 'admin', label: 'Admin HQ', icon: ShieldCheck },
              ].map((r) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setLoginRole(r.id);
                      setAdminOtpSent(false);
                      setRegOtpSent(false);
                    }}
                    className={`p-2.5 rounded-2xl border font-extrabold flex flex-col items-center space-y-1 ${
                      loginRole === r.id ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>

            {loginRole !== 'admin' && (
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl text-xs font-extrabold">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`py-2 rounded-xl ${authMode === 'login' ? 'bg-white text-[#15803D] shadow-sm' : 'text-slate-500'}`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`py-2 rounded-xl ${authMode === 'register' ? 'bg-white text-[#15803D] shadow-sm' : 'text-slate-500'}`}
                >
                  New Register
                </button>
              </div>
            )}

            {loginRole === 'admin' ? (
              <form onSubmit={handleVerifyAdminOtp} className="space-y-3 pt-1">
                <input
                  type="text"
                  required
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="Master Admin Email or Mobile"
                  className="w-full bg-slate-50 border rounded-xl px-3.5 py-3 text-xs font-bold"
                />
                {!adminOtpSent ? (
                  <button
                    type="button"
                    onClick={handleSendAdminOtp}
                    className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl text-xs shadow"
                  >
                    Send Admin OTP
                  </button>
                ) : (
                  <>
                    <input
                      type="text"
                      required
                      value={adminEnteredOtp}
                      onChange={(e) => setAdminEnteredOtp(e.target.value)}
                      placeholder="Enter 6-Digit OTP"
                      className="w-full bg-emerald-50 border border-emerald-300 rounded-xl px-3.5 py-3 text-xs font-extrabold text-center tracking-widest"
                    />
                    <button type="submit" className="w-full bg-[#0F5132] text-white font-extrabold py-3 rounded-2xl text-xs shadow">
                      Verify & Open Control HQ
                    </button>
                  </>
                )}
              </form>
            ) : authMode === 'login' ? (
              <form onSubmit={handleUserLogin} className="space-y-3 pt-1">
                <input
                  type="text"
                  required
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="10-Digit Mobile or Email"
                  className="w-full bg-slate-50 border rounded-xl px-3.5 py-3 text-xs font-bold"
                />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-slate-50 border rounded-xl px-3.5 py-3 text-xs font-bold"
                />
                <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl text-xs shadow">
                  Login as {loginRole.toUpperCase()}
                </button>
              </form>
            ) : (
              <form onSubmit={handleCompleteRegistration} className="space-y-2.5 pt-1 text-xs">
                <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Full Name / Shop Name *" className="w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 font-bold" />
                <input type="tel" maxLength={10} required value={regMobile} onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))} placeholder="10-Digit Mobile Number *" className="w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 font-bold" />
                <input type="email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="Email Address (For OTP) *" className="w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 font-bold" />
                <input type="password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Create Password *" className="w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 font-bold" />
                <input type="text" required value={regVillage} onChange={(e) => setRegVillage(e.target.value)} placeholder="Area / Village in Nellore *" className="w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 font-bold" />

{!regOtpSent ? (
                  <button type="button" onClick={handleSendRegistrationOtp} className="w-full bg-[#EA580C] text-white font-extrabold py-3 rounded-2xl shadow">
                    Send Email OTP
                  </button>
                ) : (
                  <>
                    <input type="text" required value={regEnteredOtp} onChange={(e) => setRegEnteredOtp(e.target.value)} placeholder="Enter 6-Digit Email OTP" className="w-full bg-emerald-50 border border-emerald-300 rounded-xl px-3.5 py-2.5 font-extrabold text-center tracking-widest" />
                    <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow">
                      Verify OTP & Register
                    </button>
                  </>
                )}
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-400 font-bold pb-2">
          Rythu Basket Nellore • 100% Farm Fresh & Direct Delivery
        </p>
      </div>
    );
  }

  // Shared Profile Tab
  const renderSharedProfileTab = () => (
    <main className="p-4 space-y-3 text-xs">
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded">{currentUser.role}</span>
          <h2 className="text-base font-extrabold text-slate-900 mt-1">{currentUser.name}</h2>
          <p className="text-slate-500 font-semibold">+91 {currentUser.mobile} • {currentUser.email}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{currentUser.village}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400 font-bold">Wallet</p>
          <p className="text-lg font-extrabold text-[#15803D]">₹{currentUser.wallet || 0}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          const shareText = `🌾 *Rythu Basket – Nellore*\nFresh Vegetables, Fruits & Groceries directly from Farmers!\n👉 https://rythu-market.vercel.app`;
          if (navigator.share) {
            navigator.share({ title: 'Rythu Basket Nellore', text: shareText, url: 'https://rythu-market.vercel.app' }).catch(() => {});
          } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
          }
        }}
        className="w-full bg-emerald-50 border border-emerald-200 text-[#15803D] font-extrabold py-3.5 rounded-2xl flex items-center justify-center space-x-2"
      >
        <Share2Icon />
        <span>Share Rythu Basket App with Friends</span>
      </button>

      <button
        type="button"
        onClick={() => {
          setCurrentUser(null);
          setActiveTab('home');
        }}
        className="w-full bg-rose-50 text-rose-600 font-extrabold py-3.5 rounded-2xl flex items-center justify-center space-x-2"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </main>
  );

// =========================================================================
  // CUSTOMER STOREFRONT VIEW
  // =========================================================================
  if (currentUser.role === 'customer') {
    const filteredProducts = products.filter((p) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesCat = selectedCategory === 'All' || p.cat === selectedCategory;
      const matchesSearch =
        !q ||
        p.nameEn.toLowerCase().includes(q) ||
        p.nameTe.includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        (TE_TO_EN[q] && p.nameEn.toLowerCase().includes(TE_TO_EN[q]));
      return matchesCat && matchesSearch;
    });

    const itemTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const avgDistanceKm =
      cart.length > 0
        ? Number(
            (
              cart.reduce((s, c) => s + calculateDistanceKm(userCoords.lat, userCoords.lng, c.lat, c.lng), 0) /
              cart.length
            ).toFixed(1)
          )
        : 2.5;
    const deliveryFee = cart.length > 0 ? calculateDeliveryFee(itemTotal, avgDistanceKm) : 0;
    const couponDiscount =
      appliedCoupon && itemTotal >= appliedCoupon.minOrder ? Number(appliedCoupon.discount) : 0;
    const walletUsed = useWalletBalance ? Math.min(Number(currentUser.wallet || 0), Math.max(0, itemTotal + deliveryFee - couponDiscount)) : 0;
    const grandTotal = Math.max(0, itemTotal + deliveryFee - couponDiscount - walletUsed);

    const customerUnreadAlerts = broadcastOffers.filter(
      (bo) => !bo.targetUserId || bo.targetUserId === currentUser.id
    );

    const handlePlaceCustomerOrder = async () => {
      if (cart.length === 0) return;
      const sellerId = cart[0].sellerId;
      const sellerObj = users.find((u) => u.id === sellerId);
      const distKm = calculateDistanceKm(userCoords.lat, userCoords.lng, cart[0].lat, cart[0].lng);
      const etaInfo = getTrafficAndDeliveryEta(distKm, 'Order Placed');

      const newOrder = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        customerId: currentUser.id,
        customerName: currentUser.name,
        customerMobile: currentUser.mobile,
        customerEmail: currentUser.email,
        customerFcmToken: currentUser.fcmToken || '',
        deliveryAddress,
        sellerId,
        sellerName: cart[0].sellerName,
        sellerRole: cart[0].sellerRole,
        items: cart,
        itemTotal,
        deliveryFee,
        couponDiscount,
        walletUsed,
        grandTotal,
        paymentMethod,
        distanceKm: distKm,
        etaMinutes: etaInfo.etaMinutes,
        trafficStatus: etaInfo.trafficLabel,
        status: 'Order Placed',
        statusHistory: [{ status: 'Order Placed', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }],
        createdAt: Date.now(),
      };

      setOrders((prev) => [newOrder, ...prev]);
      await setDoc(doc(db, 'orders', newOrder.id), newOrder).catch(() => {});

      if (walletUsed > 0) {
        const updatedBal = Math.max(0, Number(currentUser.wallet || 0) - walletUsed);
        setCurrentUser((prev) => ({ ...prev, wallet: updatedBal }));
        updateDoc(doc(db, 'users', currentUser.id), { wallet: updatedBal }).catch(() => {});
      }

      // Notify Seller via Push Notification
      if (sellerObj?.fcmToken) {
        triggerPushAlert({
          tokens: [sellerObj.fcmToken],
          title: `New Order ${newOrder.id} • ₹${grandTotal}`,
          body: `${currentUser.name} ordered ${cart.length} item(s). Tap to Accept!`,
        });
      }

// Send Invoice Email
      sendEmailViaEmailJS(EMAILJS_INVOICE_TEMPLATE_ID, {
        to_email: currentUser.email,
        to_name: currentUser.name,
        order_id: newOrder.id,
        order_total: `₹${grandTotal}`,
        delivery_address: deliveryAddress,
      });

      setCart([]);
      setAppliedCoupon(null);
      setTrackingOrderId(newOrder.id);
      setActiveTab('orders');
      notify(`Order ${newOrder.id} Placed! ETA ~${etaInfo.etaMinutes} mins`);
    };

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        {/* TOP HEADER */}
        <header className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white p-4 rounded-b-[28px] shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div onClick={detectGpsLocation} className="flex items-center space-x-2 cursor-pointer min-w-0">
              <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-[#FDE047]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-emerald-200 font-bold flex items-center space-x-1">
                  <span>{t.deliverTo}</span>
                  <LocateFixed className="h-3 w-3" />
                </p>
                <p className="text-xs font-extrabold truncate">{deliveryAddress}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
                className="bg-white/15 px-2.5 py-1.5 rounded-full text-[10px] font-extrabold"
              >
                {lang === 'en' ? 'తెలుగు' : 'ENG'}
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className="bg-white text-[#15803D] px-2.5 py-1.5 rounded-full text-xs font-extrabold flex items-center space-x-1"
              >
                <Wallet className="h-3.5 w-3.5" />
                <span>₹{currentUser.wallet || 0}</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className="h-9 w-9 rounded-full bg-white flex items-center justify-center relative"
              >
                <Bell className="h-4 w-4 text-slate-700" />
                {customerUnreadAlerts.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center">
                    {customerUnreadAlerts.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'home') setActiveTab('home');
              }}
              placeholder={t.searchPlaceholder}
              className="w-full bg-white text-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold shadow-inner focus:outline-none"
            />
          </div>
        </header>

{/* HOME TAB */}
        {activeTab === 'home' && (
          <main className="p-4 space-y-5 text-xs">
            {/* DAILY ESSENTIALS */}
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-900">{t.dailyEssentials}</h2>
                <span className="text-[11px] font-extrabold text-[#15803D]">{t.morningFresh}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {categoriesList.filter((c) => c.isDailyEssential !== false).slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.labelEn ? 'All' : cat.labelEn)}
                    className={`bg-white p-2 rounded-2xl border text-center space-y-1.5 shadow-sm ${
                      selectedCategory === cat.labelEn ? 'border-[#15803D] ring-2 ring-emerald-200' : 'border-slate-100'
                    }`}
                  >
                    <img src={cat.img} alt={cat.labelEn} className="h-14 w-14 rounded-xl object-cover mx-auto" />
                    <p className="text-[10px] font-extrabold text-slate-800 leading-tight line-clamp-2">
                      {lang === 'te' ? cat.labelTe : cat.labelEn}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            {/* OFFERS & COUPONS */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-900 flex items-center space-x-1">
                  <Tag className="h-4 w-4 text-[#EA580C]" />
                  <span>{t.offersCoupons}</span>
                </h2>
                <span className="text-[10px] font-bold text-slate-400">{t.tapToCopy}</span>
              </div>
              <div className="flex space-x-3 overflow-x-auto pb-1 no-scrollbar">
                {couponsList.filter((c) => c.active !== false).map((cp) => (
                  <div
                    key={cp.id}
                    onClick={() => {
                      navigator.clipboard?.writeText(cp.code);
                      setAppliedCoupon(cp);
                      notify(`Coupon ${cp.code} Copied & Applied!`);
                    }}
                    className="min-w-[220px] bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3 flex-shrink-0 cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-[#EA580C] text-white text-[9px] font-extrabold px-2 py-0.5 rounded">{cp.badge}</span>
                      <span className="bg-white border border-dashed border-amber-400 text-slate-900 font-mono font-extrabold text-[11px] px-2 py-0.5 rounded">
                        {cp.code}
                      </span>
                    </div>
                    <p className="font-extrabold text-slate-900 text-xs pt-1">{cp.title}</p>
                    <p className="text-[10px] text-slate-500 font-semibold">{cp.subtitle}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CATEGORIES GRID */}
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-900">{t.categories}</h2>
                <button
                  onClick={() => setShowAllCategoriesModal(!showAllCategoriesModal)}
                  className="text-[11px] font-extrabold text-[#15803D]"
                >
                  {t.seeAll} ({categoriesList.length}) &gt;
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {(showAllCategoriesModal ? categoriesList : categoriesList.slice(0, 6)).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.labelEn ? 'All' : cat.labelEn)}
                    className={`bg-white p-2.5 rounded-2xl border text-center space-y-1 shadow-sm ${
                      selectedCategory === cat.labelEn ? 'border-[#15803D] bg-emerald-50/40' : 'border-slate-100'
                    }`}
                  >
                    <img src={cat.img} alt={cat.labelEn} className="h-16 w-16 rounded-xl object-cover mx-auto" />
                    <p className="text-[11px] font-extrabold text-slate-900 leading-tight">{cat.labelEn}</p>
                    <p className="text-[10px] font-bold text-[#15803D]">{cat.labelTe}</p>
                  </button>
                ))}
              </div>
            </section>

{/* PRODUCTS LIST WITH + / - STEPPER BUTTONS */}
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-900">
                  {selectedCategory === 'All' ? t.freshToday : selectedCategory}
                </h2>
                {selectedCategory !== 'All' && (
                  <button onClick={() => setSelectedCategory('All')} className="text-[11px] font-extrabold text-rose-600">
                    Clear Filter
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {filteredProducts.map((prod) => {
                  const qtyInCart = getCartQty(prod.id);
                  const distKm = calculateDistanceKm(userCoords.lat, userCoords.lng, prod.lat, prod.lng);
                  const etaInfo = getTrafficAndDeliveryEta(distKm);
                  return (
                    <div key={prod.id} className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 flex flex-col justify-between space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => toggleWishlist(prod.id)}
                        className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-white/90 shadow flex items-center justify-center"
                      >
                        <Heart className={`h-3.5 w-3.5 ${wishlistIds.includes(prod.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                      </button>

                      <div>
                        <img src={prod.img} alt={prod.nameEn} className="h-28 w-full rounded-2xl object-cover bg-slate-50" />
                        <span className="inline-block mt-1.5 text-[9px] font-extrabold bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded-full">
                          ⚡ {etaInfo.etaMinutes} mins • {prod.sellerRole}
                        </span>
                        <h3 className="font-extrabold text-slate-900 text-xs mt-1 leading-snug">
                          {lang === 'te' ? prod.nameTe : prod.nameEn}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold">
                          {lang === 'te' ? prod.nameEn : prod.nameTe} • 1 {prod.unit}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-sm font-extrabold text-slate-900">₹{prod.price}</span>
                          {prod.mrp > prod.price && (
                            <span className="text-[10px] text-slate-400 line-through ml-1">₹{prod.mrp}</span>
                          )}
                        </div>

                        {/* DIRECT + / - STEPPER ON PRODUCT CARD */}
                        {qtyInCart === 0 ? (
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(prod);
                              notify(`Added ${prod.nameEn} (+ / - ready)`);
                            }}
                            className="bg-emerald-50 border border-[#15803D] text-[#15803D] font-extrabold px-3.5 py-1.5 rounded-xl text-xs hover:bg-[#15803D] hover:text-white transition"
                          >
                            + {t.add}
                          </button>
                        ) : (
                          <div className="flex items-center bg-[#15803D] text-white rounded-xl font-extrabold text-xs shadow-sm">
                            <button
                              type="button"
                              onClick={() => updateCartQty(prod.id, -1)}
                              className="px-2.5 py-1.5 text-sm font-extrabold"
                            >
                              -
                            </button>
                            <span className="px-2 py-1">{qtyInCart}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQty(prod.id, 1)}
                              className="px-2.5 py-1.5 text-sm font-extrabold"
                            >
                              +
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

{/* CART TAB */}
        {activeTab === 'cart' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-extrabold text-slate-900">Your Basket ({cart.reduce((s, c) => s + c.qty, 0)} items)</h2>

            {cart.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center space-y-2 border border-slate-100">
                <p className="font-extrabold text-slate-500">Your Rythu Basket is empty!</p>
                <button onClick={() => setActiveTab('home')} className="bg-[#15803D] text-white font-extrabold px-5 py-2.5 rounded-2xl">
                  Browse Fresh Items
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={item.img} alt={item.nameEn} className="h-12 w-12 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-extrabold text-slate-900">{item.nameEn}</h4>
                          <p className="text-[10px] text-slate-500 font-bold">₹{item.price} / {item.unit}</p>
                        </div>
                      </div>
                      <div className="flex items-center bg-[#15803D] text-white rounded-xl font-extrabold">
                        <button onClick={() => updateCartQty(item.id, -1)} className="px-2.5 py-1">-</button>
                        <span className="px-2">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} className="px-2.5 py-1">+</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* BILL SUMMARY */}
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-2">
                  <div className="flex justify-between font-bold text-slate-600">
                    <span>Item Total</span>
                    <span>₹{itemTotal}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-600">
                    <span>Delivery Fee ({avgDistanceKm} km • {getTrafficAndDeliveryEta(avgDistanceKm).trafficLabel})</span>
                    <span className={deliveryFee === 0 ? 'text-[#15803D] font-extrabold' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between font-extrabold text-[#15803D]">
                      <span>Coupon ({appliedCoupon.code})</span>
                      <span>- ₹{couponDiscount}</span>
                    </div>
                  )}
                  {(currentUser.wallet || 0) > 0 && (
                    <label className="flex items-center justify-between bg-emerald-50 p-2.5 rounded-xl font-extrabold text-[#15803D]">
                      <span>Use Wallet Balance (₹{currentUser.wallet})</span>
                      <input type="checkbox" checked={useWalletBalance} onChange={(e) => setUseWalletBalance(e.target.checked)} className="accent-[#15803D]" />
                    </label>
                  )}
                  <div className="border-t pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                {/* PAYMENT METHOD */}
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-2">
                  <p className="font-extrabold text-slate-900">Payment Mode</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['UPI', 'COD'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPaymentMethod(m)}
                        className={`py-2.5 rounded-xl font-extrabold border ${paymentMethod === m ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-slate-50 text-slate-700'}`}
                      >
                        {m === 'UPI' ? 'UPI Instant Pay' : 'Cash on Delivery'}
                      </button>
                    ))}
                  </div>
                  {paymentMethod === 'UPI' && (
                    <p className="text-[10px] font-bold text-slate-500">UPI ID: <span className="font-mono text-slate-900">{PLATFORM_UPI_ID}</span></p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handlePlaceCustomerOrder}
                  className="w-full bg-[#15803D] text-white font-extrabold py-4 rounded-2xl shadow-lg text-sm"
                >
                  {t.placeOrder} • ₹{grandTotal}
                </button>
              </>
            )}
          </main>
        )}

{/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <main className="p-4 space-y-3 text-xs">
            <div className="flex items-center space-x-3">
              <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-base font-extrabold text-slate-900">Notifications & Alerts ({customerUnreadAlerts.length})</h2>
            </div>

            {customerUnreadAlerts.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center font-bold text-slate-400">
                No notifications yet.
              </div>
            ) : (
              customerUnreadAlerts.map((bo) => (
                <div key={bo.id} className="bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-300 rounded-2xl p-3.5 shadow-sm space-y-1">
                  <span className="bg-[#15803D] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">{bo.tag}</span>
                  <p className="text-xs font-extrabold text-slate-900 pt-0.5">{bo.message}</p>
                  <p className="text-[9px] text-slate-500">{bo.date}</p>
                </div>
              ))
            )}
          </main>
        )}

        {/* ORDERS & LIVE TRACKING TAB */}
        {activeTab === 'orders' && (
          <main className="p-4 space-y-3 text-xs">
            <h2 className="text-base font-extrabold text-slate-900">My Orders & Live Tracking</h2>
            {orders.filter((o) => o.customerId === currentUser.id).length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center font-bold text-slate-400">
                No orders yet. Start shopping fresh items!
              </div>
            ) : (
              orders
                .filter((o) => o.customerId === currentUser.id)
                .map((ord) => {
                  const etaInfo = getTrafficAndDeliveryEta(ord.distanceKm || 2.8, ord.status);
                  const stages = ['Order Placed', 'Accepted', 'Picked', 'Out for Delivery', 'Delivered'];
                  const currentStageIdx = stages.indexOf(ord.status);
                  return (
                    <div key={ord.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono font-extrabold text-slate-900">{ord.id}</span>
                          <p className="text-[10px] text-slate-500 font-bold">From: {ord.sellerName} ({ord.sellerRole})</p>
                        </div>
                        <span className="bg-emerald-50 text-[#15803D] font-extrabold px-2.5 py-1 rounded-full text-[10px]">
                          {ord.status}
                        </span>
                      </div>

                      {/* LIVE TRAFFIC & DISTANCE ETA BANNER */}
                      {ord.status !== 'Delivered' ? (
                        <div className="bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-[#15803D]" />
                            <div>
                              <p className="font-extrabold text-slate-900">Arriving in ~{etaInfo.etaMinutes} mins</p>
                              <p className="text-[10px] font-bold text-slate-600">
                                Distance: {etaInfo.distanceKm} km • {etaInfo.trafficLabel}
                              </p>
                            </div>
                          </div>
                          <Truck className="h-5 w-5 text-[#EA580C]" />
                        </div>
                      ) : (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 font-extrabold text-[#15803D] text-center">
                          ✓ Delivered Fresh to Your Doorstep!
                        </div>
                      )}

                      {/* STEP-BY-STEP TRACKING TIMELINE */}
                      <div className="grid grid-cols-5 gap-1 pt-1">
                        {stages.map((st, idx) => (
                          <div key={st} className="text-center space-y-1">
                            <div
                              className={`h-2 rounded-full ${
                                idx <= currentStageIdx ? 'bg-[#15803D]' : 'bg-slate-200'
                              }`}
                            />
                            <p className={`text-[8px] font-extrabold leading-tight ${idx <= currentStageIdx ? 'text-[#15803D]' : 'text-slate-400'}`}>
                              {st}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-2 flex justify-between font-extrabold text-slate-800">
                        <span>{ord.items?.length || 1} Item(s) • {ord.paymentMethod}</span>
                        <span>₹{ord.grandTotal}</span>
                      </div>
                    </div>
                  );
                })
            )}
          </main>
        )}

        {activeTab === 'profile' && renderSharedProfileTab()}

{/* BOTTOM NAVIGATION */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-6 py-2.5 flex justify-between items-center z-40">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <Home className="h-5 w-5 mb-0.5" />
            <span>{t.home}</span>
          </button>
          <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center text-[10px] font-extrabold relative ${activeTab === 'cart' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <ShoppingCart className="h-5 w-5 mb-0.5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#EA580C] text-white text-[9px] font-extrabold h-4 w-4 rounded-full flex items-center justify-center">
                {cart.reduce((s, c) => s + c.qty, 0)}
              </span>
            )}
            <span>{t.cart}</span>
          </button>
          <button onClick={() => setActiveTab('orders')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'orders' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <ClipboardList className="h-5 w-5 mb-0.5" />
            <span>{t.orders}</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'profile' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <User className="h-5 w-5 mb-0.5" />
            <span>{t.profile}</span>
          </button>
        </nav>
      </div>
    );
  }

  // =========================================================================
  // SELLER PORTAL (FARMER, WHOLESALER, RETAIL SHOP)
  // =========================================================================
  if (currentUser.role === 'farmer' || currentUser.role === 'wholesale' || currentUser.role === 'retail') {
    const myOrders = orders.filter((o) => o.sellerId === currentUser.id);
    const myProducts = products.filter((p) => p.sellerId === currentUser.id);
    const isApprovedShop = Boolean(currentUser.approved);

    const handleAdvanceOrderStage = async (ord, nextStatus) => {
      if (!isApprovedShop) {
        notify('Account Pending Master Admin Approval! Cannot accept orders yet.');
        return;
      }

      const etaInfo = getTrafficAndDeliveryEta(ord.distanceKm || 2.8, nextStatus);
      const updatedOrder = {
        ...ord,
        status: nextStatus,
        etaMinutes: etaInfo.etaMinutes,
        trafficStatus: etaInfo.trafficLabel,
        statusHistory: [
          ...(ord.statusHistory || []),
          { status: nextStatus, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) },
        ],
      };

      setOrders((prev) => prev.map((o) => (o.id === ord.id ? updatedOrder : o)));
      await updateDoc(doc(db, 'orders', ord.id), {
        status: nextStatus,
        etaMinutes: etaInfo.etaMinutes,
        trafficStatus: etaInfo.trafficLabel,
        statusHistory: updatedOrder.statusHistory,
      }).catch(() => {});

      // Push Notification + In-App Alert at EVERY Stage (Accepted, Picked, Out for Delivery, Delivered)
      const stageMessages = {
        Accepted: `Order ${ord.id} Accepted by ${currentUser.name}! Preparing your fresh items. Live ETA: ~${etaInfo.etaMinutes} mins (${etaInfo.trafficLabel}).`,
        Picked: `Order ${ord.id} Picked Up! Delivery partner is on the way. Live ETA: ~${etaInfo.etaMinutes} mins (${etaInfo.trafficLabel}).`,
        'Out for Delivery': `Order ${ord.id} is Out for Delivery! Reaching your doorstep in ~${etaInfo.etaMinutes} mins (${etaInfo.trafficLabel}).`,
        Delivered: `Order ${ord.id} Delivered! Thank you for shopping fresh with Rythu Basket Nellore.`,
      };

      const msgBody = stageMessages[nextStatus] || `Order ${ord.id} updated to ${nextStatus}`;
      const alertObj = {
        id: 'bo_' + Date.now(),
        tag: `ORDER ${nextStatus.toUpperCase()}`,
        targetUserId: ord.customerId,
        message: msgBody,
        createdAt: Date.now(),
        date: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      };

      setBroadcastOffers((prev) => [alertObj, ...prev]);
      await setDoc(doc(db, 'broadcastOffers', alertObj.id), alertObj).catch(() => {});

      const custUser = users.find((u) => u.id === ord.customerId);
      const targetTokens = [ord.customerFcmToken, custUser?.fcmToken].filter(Boolean);
      if (targetTokens.length > 0) {
        triggerPushAlert({
          tokens: [...new Set(targetTokens)],
          title: `Rythu Basket • Order ${nextStatus}!`,
          body: msgBody,
        });
      }

      notify(`Order ${ord.id} → ${nextStatus} & Push Alert Sent!`);
    };

const handleAddSellerProduct = async (e) => {
      e.preventDefault();
      if (!prodNameEn.trim() || !prodPrice) return;
      const newProd = {
        id: 'p_' + Date.now(),
        sellerId: currentUser.id,
        sellerName: currentUser.name,
        sellerRole: currentUser.role,
        nameEn: prodNameEn.trim(),
        nameTe: prodNameTe.trim() || EN_TO_TE[prodNameEn.trim().toLowerCase()] || prodNameEn.trim(),
        cat: prodCat,
        price: Number(prodPrice),
        mrp: Number(prodMrp || Number(prodPrice) + 10),
        unit: prodUnit,
        qtyStep: prodUnit === 'Grams' ? 250 : 1,
        stock: Number(prodStock || 50),
        img: prodImg || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
        lat: currentUser.lat || 14.4426,
        lng: currentUser.lng || 79.9865,
      };
      setProducts((prev) => [newProd, ...prev]);
      await setDoc(doc(db, 'products', newProd.id), newProd).catch(() => {});
      setProdNameEn('');
      setProdNameTe('');
      setProdPrice('');
      setProdMrp('');
      notify('Product Listed Live to Customers!');
    };

    return (
      <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
        {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

        <header className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white p-4 rounded-b-[28px] flex justify-between items-center shadow-md">
          <div>
            <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded font-extrabold uppercase">{currentUser.role} Portal</span>
            <h1 className="text-base font-extrabold mt-0.5">{currentUser.name}</h1>
          </div>
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${isApprovedShop ? 'bg-[#EAB308] text-slate-900' : 'bg-rose-500 text-white'}`}>
            {isApprovedShop ? '✓ Approved' : '⏳ Pending Approval'}
          </span>
        </header>

        {activeTab === 'home' && (
          <main className="p-4 space-y-3 text-xs">
            {/* ADMIN APPROVAL LOCK WARNING */}
            {!isApprovedShop && (
              <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3.5 rounded-2xl font-extrabold space-y-1">
                <p>⚠️ Account Pending Master Admin Approval</p>
                <p className="text-[11px] font-semibold">
                  Master Admin మీ షాప్/రైతు అకౌంట్‌ను Approve చేసిన తర్వాతే మీరు ఆర్డర్స్ Accept చేయగలరు.
                </p>
              </div>
            )}

            {/* SELLER TABS */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSellerTab('orders')}
                className={`py-2.5 rounded-xl font-extrabold border ${sellerTab === 'orders' ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-white text-slate-700'}`}
              >
                Orders ({myOrders.length})
              </button>
              <button
                onClick={() => setSellerTab('products')}
                className={`py-2.5 rounded-xl font-extrabold border ${sellerTab === 'products' ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-white text-slate-700'}`}
              >
                My Stock ({myProducts.length})
              </button>
              {currentUser.role === 'farmer' ? (
                <button
                  onClick={() => setSellerTab('mandi')}
                  className={`py-2.5 rounded-xl font-extrabold border ${sellerTab === 'mandi' ? 'bg-[#EA580C] text-white border-[#EA580C]' : 'bg-orange-50 text-orange-900 border-orange-200'}`}
                >
                  Live Mandi Rates
                </button>
              ) : (
                <button
                  onClick={() => setSellerTab('add')}
                  className={`py-2.5 rounded-xl font-extrabold border ${sellerTab === 'add' ? 'bg-[#15803D] text-white border-[#15803D]' : 'bg-white text-slate-700'}`}
                >
                  + Add Item
                </button>
              )}
            </div>

            {currentUser.role === 'farmer' && (
              <button
                onClick={() => setSellerTab('add')}
                className={`w-full py-2.5 rounded-xl font-extrabold border ${sellerTab === 'add' ? 'bg-[#0F5132] text-white' : 'bg-emerald-50 text-[#15803D] border-emerald-200'}`}
              >
                + List Fresh Harvest to Storefront
              </button>
            )}

            {/* FARMERS LIVE APMC / AGMARKNET MARKET RATES */}
            {sellerTab === 'mandi' && currentUser.role === 'farmer' && (
              <div className="space-y-2.5">
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-orange-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-[#EA580C] flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>Today's Live Mandi Rates</span>
                    </h3>
                    <p className="text-[10px] text-slate-500 font-bold">Source: Data.gov.in / Agmarknet APMC Nellore</p>
                  </div>
                  <button
                    type="button"
                    onClick={refreshLiveMandiRates}
                    className="bg-orange-50 text-[#EA580C] p-2 rounded-xl border border-orange-200"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                {marketRates.map((mr) => (
                  <div key={mr.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900">{mr.cropEn} • {mr.cropTe}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">{mr.mandi} {mr.updatedAt ? `• ${mr.updatedAt}` : ''}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-[#15803D]">₹{mr.modalPrice}/Kg</p>
                      <p className="text-[10px] font-bold text-slate-500">Min ₹{mr.minPrice} • Max ₹{mr.maxPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

{/* ORDERS MANAGEMENT WITH MULTI-STAGE PUSH NOTIFICATIONS & LIVE TRAFFIC ETA */}
            {sellerTab === 'orders' && (
              <div className="space-y-3">
                {myOrders.length === 0 ? (
                  <div className="bg-white rounded-3xl p-8 text-center font-bold text-slate-400">
                    No customer orders yet.
                  </div>
                ) : (
                  myOrders.map((ord) => {
                    const etaInfo = getTrafficAndDeliveryEta(ord.distanceKm || 2.8, ord.status);
                    return (
                      <div key={ord.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-2.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono font-extrabold text-slate-900">{ord.id}</span>
                            <p className="font-bold text-slate-700">{ord.customerName} • +91 {ord.customerMobile}</p>
                            <p className="text-[10px] text-slate-500">{ord.deliveryAddress}</p>
                          </div>
                          <span className="bg-emerald-50 text-[#15803D] font-extrabold px-2.5 py-1 rounded-full text-[10px]">
                            {ord.status}
                          </span>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-2.5 flex justify-between items-center text-[11px] font-bold">
                          <span>Distance: {etaInfo.distanceKm} km ({etaInfo.trafficLabel})</span>
                          <span className="text-[#15803D] font-extrabold">
                            {ord.status === 'Delivered' ? 'Completed' : `ETA: ~${etaInfo.etaMinutes} mins`}
                          </span>
                        </div>

                        <div className="text-[11px] font-bold text-slate-600">
                          {ord.items?.map((i) => `${i.nameEn} x${i.qty}`).join(', ')} — <span className="text-slate-900 font-extrabold">₹{ord.grandTotal}</span>
                        </div>

                        {/* STAGE ACTION BUTTONS (LOCKED UNTIL ADMIN APPROVES SHOP) */}
                        {ord.status === 'Order Placed' && (
                          <button
                            type="button"
                            disabled={!isApprovedShop}
                            onClick={() => handleAdvanceOrderStage(ord, 'Accepted')}
                            className={`w-full py-3 rounded-2xl font-extrabold shadow ${
                              isApprovedShop ? 'bg-[#15803D] text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            {isApprovedShop ? '✓ Accept Order & Notify Customer' : '🔒 Awaiting Admin Approval to Accept'}
                          </button>
                        )}
                        {ord.status === 'Accepted' && (
                          <button
                            type="button"
                            onClick={() => handleAdvanceOrderStage(ord, 'Picked')}
                            className="w-full bg-[#EA580C] text-white py-3 rounded-2xl font-extrabold shadow"
                          >
                            📦 Mark Order Picked & Push Notify
                          </button>
                        )}
                        {ord.status === 'Picked' && (
                          <button
                            type="button"
                            onClick={() => handleAdvanceOrderStage(ord, 'Out for Delivery')}
                            className="w-full bg-amber-600 text-white py-3 rounded-2xl font-extrabold shadow"
                          >
                            🚚 Out for Delivery & Push Notify
                          </button>
                        )}
                        {ord.status === 'Out for Delivery' && (
                          <button
                            type="button"
                            onClick={() => handleAdvanceOrderStage(ord, 'Delivered')}
                            className="w-full bg-[#0F5132] text-white py-3 rounded-2xl font-extrabold shadow"
                          >
                            ✅ Mark Delivered & Notify Customer
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

{/* SELLER STOCK */}
            {sellerTab === 'products' && (
              <div className="space-y-2">
                {myProducts.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={p.img} alt={p.nameEn} className="h-12 w-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-extrabold text-slate-900">{p.nameEn}</h4>
                        <p className="text-[10px] font-bold text-[#15803D]">₹{p.price}/{p.unit} • Stock: {p.stock}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setProducts((prev) => prev.filter((x) => x.id !== p.id));
                        deleteDoc(doc(db, 'products', p.id)).catch(() => {});
                        notify('Item Removed');
                      }}
                      className="p-2 text-rose-600 bg-rose-50 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* ADD PRODUCT FORM */}
            {sellerTab === 'add' && (
              <form onSubmit={handleAddSellerProduct} className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100 space-y-2.5">
                <h3 className="font-extrabold text-sm text-[#15803D]">List New Product</h3>
                <select
                  value={selectedCatalogId}
                  onChange={(e) => {
                    setSelectedCatalogId(e.target.value);
                    const found = masterCatalog.find((c) => c.id === e.target.value);
                    if (found) {
                      setProdNameEn(found.nameEn);
                      setProdNameTe(found.nameTe);
                      setProdCat(found.cat);
                      setProdUnit(found.defaultUnit);
                      setProdImg(found.img);
                    }
                  }}
                  className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-bold"
                >
                  <option value="">-- Quick Pick from Master Catalogue --</option>
                  {masterCatalog.map((c) => (
                    <option key={c.id} value={c.id}>{c.nameEn} ({c.nameTe})</option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required value={prodNameEn} onChange={(e) => setProdNameEn(e.target.value)} placeholder="Item Name (EN) *" className="bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                  <input type="text" value={prodNameTe} onChange={(e) => setProdNameTe(e.target.value)} placeholder="తెలుగు పేరు" className="bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input type="number" required value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} placeholder="Selling Price ₹ *" className="bg-slate-50 border rounded-xl px-3 py-2 font-extrabold text-[#15803D]" />
                  <input type="number" value={prodMrp} onChange={(e) => setProdMrp(e.target.value)} placeholder="MRP ₹" className="bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select value={prodUnit} onChange={(e) => setProdUnit(e.target.value)} className="bg-slate-50 border rounded-xl px-3 py-2 font-bold">
                    <option value="Kg">Kg</option>
                    <option value="Grams">Grams</option>
                    <option value="Litres">Litres</option>
                  </select>
                  <input type="number" value={prodStock} onChange={(e) => setProdStock(e.target.value)} placeholder="Stock Qty" className="bg-slate-50 border rounded-xl px-3 py-2 font-bold" />
                </div>

                <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow text-sm">
                  + Publish Live
                </button>
              </form>
            )}
          </main>
        )}

        {activeTab === 'profile' && renderSharedProfileTab()}

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-12 py-2.5 flex justify-between items-center z-40">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center text-[10px] font-extrabold ${activeTab === 'home' ? 'text-[#15803D]' : 'text-slate-400'}`}>
            <Store className="h-5 w-5 mb-0.5" />
            <span>Dashboard</span>
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
  // 7. MASTER ADMIN & SUB-ADMIN HQ
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

    const nextList = editingCatId
      ? categoriesList.map((c) => (c.id === editingCatId ? catObj : c))
      : [catObj, ...categoriesList];

    setCategoriesList(nextList);
    nextList.forEach((item) => {
      setDoc(doc(db, 'categories', item.id), item).catch(() => {});
    });

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

    const nextCoupons = editingCouponId
      ? couponsList.map((c) => (c.id === editingCouponId ? couponObj : c))
      : [couponObj, ...couponsList];

    setCouponsList(nextCoupons);
    nextCoupons.forEach((cp) => {
      setDoc(doc(db, 'coupons', cp.id), cp).catch(() => {});
    });

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

const handleGrantSubAdminAccess = (e) => {
    e.preventDefault();
    const cleanM = subMobile.replace(/\D/g, '');
    const cleanE = subEmail.trim().toLowerCase();
    if (!subName.trim() || (!isValidIndianMobile(cleanM) && !isValidEmail(cleanE))) {
      notify('Enter valid Sub-Admin Name and 10-digit Mobile or Email!');
      return;
    }
    const newSub = {
      id: 'sub_' + Date.now(),
      name: subName.trim(),
      mobile: cleanM,
      email: cleanE,
      permissions: subPermissions,
      active: true,
      grantedBy: currentUser.name,
    };
    setSubAdmins((prev) => [newSub, ...prev]);
    setDoc(doc(db, 'subAdmins', newSub.id), newSub).catch(() => {});
    setSubName('');
    setSubMobile('');
    setSubEmail('');
    notify(`Sub-Admin Access Granted to ${newSub.name}!`);
  };

  return (
    <div style={fontStyle} className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto relative pb-24 text-slate-800 shadow-2xl">
      {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0F5132] text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">{toast}</div>}

      <header className="bg-gradient-to-r from-[#0F5132] to-[#15803D] text-white p-4 rounded-b-[28px] flex justify-between items-center shadow-md">
        <div>
          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded font-extrabold uppercase">
            {isCurrentUserMasterAdmin ? 'Master Admin HQ' : 'Sub-Admin HQ'}
          </span>
          <h1 className="text-base font-extrabold mt-0.5">Rythu Basket Control</h1>
        </div>
        <span className="bg-[#EAB308] text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-full">
          {isCurrentUserMasterAdmin ? 'Master Admin' : 'Sub-Admin'}
        </span>
      </header>

      {activeTab === 'home' && (
        <main className="p-4 space-y-3 text-xs">
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
              Approvals & Shops ({users.filter((u) => u.role !== 'customer' && u.role !== 'admin').length})
            </button>
            <button
              type="button"
              onClick={() => setAdminTab('broadcast')}
              className={`py-2.5 rounded-xl font-extrabold border ${adminTab === 'broadcast' ? 'bg-[#EA580C] text-white border-[#EA580C]' : 'bg-orange-50 text-orange-900 border-orange-200'}`}
            >
              Send Offer Alerts ({broadcastOffers.length})
            </button>
            <button
              type="button"
              onClick={() => setAdminTab('walletCredit')}
              className={`py-2.5 rounded-xl font-extrabold border ${adminTab === 'walletCredit' ? 'bg-[#0F5132] text-white border-[#0F5132]' : 'bg-emerald-50 text-emerald-950 border-emerald-200'}`}
            >
              Credit Customer Wallet
            </button>
          </div>

{isCurrentUserMasterAdmin && (
            <button
              type="button"
              onClick={() => setAdminTab('subadmins')}
              className={`w-full py-2.5 rounded-xl font-extrabold border flex items-center justify-center space-x-1.5 ${
                adminTab === 'subadmins' ? 'bg-slate-900 text-[#FDE047] border-slate-900' : 'bg-amber-50 text-amber-950 border-amber-300'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Grant / Manage Sub-Admin Access ({subAdmins.length})</span>
            </button>
          )}

          {/* A. SEND OFFER NOTIFICATION TO ALL REGISTERED USERS (LOCK SCREEN PUSH + IN-APP) */}
          {adminTab === 'broadcast' && (
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-3xl border border-orange-200 shadow-sm space-y-2.5">
                <h3 className="font-extrabold text-sm text-[#EA580C]">Send Offer Notification to All Registered Users</h3>
                <input
                  type="text"
                  value={promoOfferTag}
                  onChange={(e) => setPromoOfferTag(e.target.value.toUpperCase())}
                  placeholder="Offer Tag (e.g., HUNGRY SPECIAL)"
                  className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-extrabold"
                />
                <textarea
                  rows={3}
                  value={promoMsgText}
                  onChange={(e) => setPromoMsgText(e.target.value)}
                  placeholder='e.g., "Aakali avuthunda? Aithe neekosam fresh noodles & fruits wait chesthunnaayi, ipude order chesuko!"'
                  className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-bold"
                />
                <button
                  type="button"
                  onClick={async () => {
                    if (!promoMsgText.trim()) return;
                    const newOffer = {
                      id: 'bo_' + Date.now(),
                      tag: promoOfferTag || 'OFFER',
                      message: promoMsgText.trim(),
                      createdAt: Date.now(),
                      date: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
                    };
                    setBroadcastOffers((prev) => [newOffer, ...prev]);
                    await setDoc(doc(db, 'broadcastOffers', newOffer.id), newOffer).catch(() => {});

                    const allTokens = users.map((u) => u.fcmToken).filter(Boolean);
                    if (allTokens.length > 0) {
                      triggerPushAlert({
                        tokens: [...new Set(allTokens)],
                        title: `Rythu Basket • ${newOffer.tag}`,
                        body: newOffer.message,
                      });
                    }

                    setPromoMsgText('');
                    notify(`App & Lock-Screen Notification Sent (${allTokens.length} devices)!`);
                  }}
                  className="w-full bg-[#EA580C] text-white font-extrabold py-3 rounded-2xl shadow text-sm"
                >
                  Send App Notification to All Users 🔔
                </button>
              </div>

              {broadcastOffers.map((bo) => (
                <div key={bo.id} className="bg-white p-3 rounded-2xl border flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">{bo.tag}</span>
                    <p className="font-bold text-slate-800 mt-1">{bo.message}</p>
                    <p className="text-[9px] text-slate-400">{bo.date}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBroadcastOffers((prev) => prev.filter((x) => x.id !== bo.id));
                      deleteDoc(doc(db, 'broadcastOffers', bo.id)).catch(() => {});
                    }}
                    className="p-2 text-rose-600 bg-rose-50 rounded-xl"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

{/* B. CREDIT CUSTOMER WALLET + DIRECT LOCK SCREEN PUSH NOTIFICATION */}
          {adminTab === 'walletCredit' && (
            <div className="space-y-3 bg-white p-4 rounded-3xl border border-emerald-200 shadow-sm">
              <h3 className="font-extrabold text-sm text-[#15803D]">Credit Cashback / Bonus to Customer Wallet</h3>
              <select
                value={walletUserId}
                onChange={(e) => setWalletUserId(e.target.value)}
                className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-extrabold"
              >
                <option value="">-- Select Registered Customer --</option>
                {users
                  .filter((u) => u.role === 'customer')
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (+91 {c.mobile}) • Wallet: ₹{c.wallet || 0}
                    </option>
                  ))}
              </select>

              <input
                type="number"
                value={walletCreditAmt}
                onChange={(e) => setWalletCreditAmt(e.target.value)}
                placeholder="Amount to Credit (₹)"
                className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-extrabold text-[#15803D]"
              />
              <input
                type="text"
                value={walletReason}
                onChange={(e) => setWalletReason(e.target.value)}
                placeholder="Reason / Offer Note"
                className="w-full bg-slate-50 border rounded-xl px-3 py-2 font-bold"
              />

              <button
                type="button"
                onClick={async () => {
                  const targetUser = users.find((u) => u.id === walletUserId);
                  const amt = Number(walletCreditAmt);
                  if (!targetUser || amt <= 0) {
                    notify('Select a customer and enter valid amount!');
                    return;
                  }
                  const newWalletBal = Number(targetUser.wallet || 0) + amt;

                  setUsers((prev) =>
                    prev.map((u) => (u.id === targetUser.id ? { ...u, wallet: newWalletBal } : u))
                  );
                  await setDoc(
                    doc(db, 'users', targetUser.id),
                    { ...targetUser, wallet: newWalletBal },
                    { merge: true }
                  ).catch(() => {});

                  const walletAlertObj = {
                    id: 'bo_' + Date.now(),
                    tag: 'WALLET CREDITED ₹' + amt,
                    targetUserId: targetUser.id,
                    message: `Namaste ${targetUser.name}! ₹${amt} credited to your Rythu Basket Wallet (${walletReason}). Updated Balance: ₹${newWalletBal}.`,
                    createdAt: Date.now(),
                    date: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
                  };
                  setBroadcastOffers((prev) => [walletAlertObj, ...prev]);
                  await setDoc(doc(db, 'broadcastOffers', walletAlertObj.id), walletAlertObj).catch(() => {});

                  if (targetUser.fcmToken) {
                    triggerPushAlert({
                      tokens: [targetUser.fcmToken],
                      title: `Rythu Basket • ₹${amt} Wallet Credited!`,
                      body: walletAlertObj.message,
                    });
                  }

                  notify(`₹${amt} Credited & Lock-Screen Notification Sent to ${targetUser.name}!`);
                }}
                className="w-full bg-[#15803D] text-white font-extrabold py-3.5 rounded-2xl shadow text-sm"
              >
                Credit Wallet & Send App Notification 🔔
              </button>
            </div>
          )}

{adminTab === 'subadmins' && isCurrentUserMasterAdmin && (
            <div className="space-y-3">
              <form onSubmit={handleGrantSubAdminAccess} className="bg-white rounded-3xl p-4 shadow-sm border border-amber-300 space-y-2.5">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center space-x-1.5">
                  <UserPlus className="h-4 w-4 text-[#15803D]" />
                  <span>Grant Sub-Admin Access to Staff / Partner</span>
                </h3>
                <input type="text" required value={subName} onChange={(e) => setSubName(e.target.value)} placeholder="Sub-Admin Full Name *" className="w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-bold" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="tel" maxLength={10} value={subMobile} onChange={(e) => setSubMobile(e.target.value.replace(/\D/g, ''))} placeholder="Mobile Number (10 digits)" className="bg-slate-50 border rounded-xl px-3 py-2.5 font-bold" />
                  <input type="email" value={subEmail} onChange={(e) => setSubEmail(e.target.value)} placeholder="Email ID (For OTP Reg)" className="bg-slate-50 border rounded-xl px-3 py-2.5 font-bold" />
                </div>
                <select value={subPermissions} onChange={(e) => setSubPermissions(e.target.value)} className="w-full bg-emerald-50/60 border border-emerald-200 rounded-xl px-3 py-2.5 font-extrabold text-[#15803D]">
                  <option value="Catalogue, Categories, Coupons & Approvals">Access: Full Operations</option>
                  <option value="Catalogue & Categories Only">Access: Catalogue & Categories Only</option>
                  <option value="Seller Approvals & Coupons">Access: Seller Approvals & Coupons</option>
                </select>
                <button type="submit" className="w-full bg-[#15803D] text-white font-extrabold py-3 rounded-2xl shadow text-sm">
                  + Grant Sub-Admin Access
                </button>
              </form>

              <div className="space-y-2">
                {subAdmins.length === 0 ? (
                  <div className="bg-white rounded-2xl p-5 text-center text-slate-400 font-bold">No Sub-Admins added yet.</div>
                ) : (
                  subAdmins.map((sa) => (
                    <div key={sa.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900">{sa.name}</h4>
                        <p className="text-[10px] font-bold text-slate-500">{sa.mobile ? `+91 ${sa.mobile}` : ''} {sa.email ? `• ${sa.email}` : ''}</p>
                        <p className="text-[10px] font-extrabold text-[#15803D] mt-0.5">{sa.permissions}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSubAdmins((prev) => prev.filter((x) => x.id !== sa.id));
                          deleteDoc(doc(db, 'subAdmins', sa.id)).catch(() => {});
                          notify(`Revoked Sub-Admin access for ${sa.name}`);
                        }}
                        className="p-2 text-rose-600 bg-rose-50 rounded-xl font-extrabold text-[10px]"
                      >
                        Revoke
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

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

{/* APPROVALS & DELETE SHOPS / FARMERS */}
          {adminTab === 'approvals' && (
            <div className="space-y-2.5">
              {users
                .filter((u) => u.role === 'farmer' || u.role === 'wholesale' || u.role === 'retail')
                .map((u) => (
                  <div key={u.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded">{u.role}</span>
                      <h4 className="font-extrabold text-sm mt-1 truncate">{u.name}</h4>
                      <p className="text-slate-500 truncate">{u.email} • +91 {u.mobile}</p>
                      <p className="text-[10px] text-slate-400">{u.village}</p>
                    </div>
                    <div className="flex items-center space-x-1.5 flex-shrink-0">
                      <button
                        onClick={() => {
                          const nextApproved = !u.approved;
                          setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, approved: nextApproved } : x)));
                          updateDoc(doc(db, 'users', u.id), { approved: nextApproved }).catch(() => {});
                          if (nextApproved && u.fcmToken) {
                            triggerPushAlert({
                              tokens: [u.fcmToken],
                              title: 'Rythu Basket • Shop Approved! 🎉',
                              body: `Namaste ${u.name}! Your ${u.role} account is approved. You can now accept customer orders!`,
                            });
                          }
                          notify(nextApproved ? `${u.name} Approved!` : `${u.name} Approval Revoked`);
                        }}
                        className={`px-3 py-2 rounded-xl font-extrabold ${u.approved ? 'bg-emerald-50 text-[#15803D]' : 'bg-[#15803D] text-white'}`}
                      >
                        {u.approved ? 'Approved' : 'Approve'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUsers((prev) => prev.filter((x) => x.id !== u.id));
                          deleteDoc(doc(db, 'users', u.id)).catch(() => {});
                          // Also remove products belonging to the deleted shop/farmer
                          setProducts((prev) => prev.filter((p) => p.sellerId !== u.id));
                          notify(`Deleted ${u.name} (${u.role})`);
                        }}
                        className="p-2 text-rose-600 bg-rose-50 rounded-xl"
                        title="Delete Shop / Farmer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

function Share2Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}