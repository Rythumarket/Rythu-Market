import React, { useState } from 'react';
import {
  Search, ShoppingCart, Plus, Minus, Home, Grid,
  ClipboardList, User, MapPin, Phone, Sprout,
  Store, Truck, ShieldCheck, ChevronRight, ArrowLeft,
  CheckCircle2, Lock, KeyRound, PackagePlus, LogOut,
  Trash2, Edit3, Check, Navigation, QrCode, Wallet, LocateFixed
} from 'lucide-react';

const CAT_IMG = {
  vegetables: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80',
  leafy: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80',
  fruits: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80',
  dairy: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300&q=80',
  beverages: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=300&q=80',
  eggs: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=300&q=80',
  poultry: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=300&q=80',
  livestock: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=300&q=80',
};

const INITIAL_PRODUCTS = [
  // 1. VEGETABLES - Daily Staples
  { id: 'v1', nameEn: 'Tomato', nameTe: 'టమాటా', sub: 'Daily Staples', unit: '1 kg', price: 28, oldPrice: 36, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80' },
  { id: 'v2', nameEn: 'Onion', nameTe: 'ఉల్లిపాయ', sub: 'Daily Staples', unit: '1 kg', price: 32, oldPrice: 40, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=300&q=80' },
  { id: 'v3', nameEn: 'Potato', nameTe: 'బంగాళాదుంప', sub: 'Daily Staples', unit: '1 kg', price: 30, oldPrice: 38, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80' },
  { id: 'v4', nameEn: 'Green Chillies', nameTe: 'పచ్చిమిర్చి', sub: 'Daily Staples', unit: '250 g', price: 15, oldPrice: 20, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=300&q=80' },
  { id: 'v5', nameEn: 'Ginger', nameTe: 'అల్లం', sub: 'Daily Staples', unit: '250 g', price: 25, oldPrice: 32, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=300&q=80' },
  { id: 'v6', nameEn: 'Garlic', nameTe: 'వెల్లుల్లి', sub: 'Daily Staples', unit: '250 g', price: 45, oldPrice: 55, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=300&q=80' },

  // 1. VEGETABLES - Gourds & Beans
  { id: 'v7', nameEn: 'Bottle Gourd', nameTe: 'సొరకాయ', sub: 'Gourds & Beans', unit: '1 pc', price: 24, oldPrice: 30, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v8', nameEn: 'Ridge Gourd', nameTe: 'బీరకాయ', sub: 'Gourds & Beans', unit: '500 g', price: 28, oldPrice: 35, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v9', nameEn: 'Bitter Gourd', nameTe: 'కాకరకాయ', sub: 'Gourds & Beans', unit: '500 g', price: 26, oldPrice: 34, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v10', nameEn: 'Ivy Gourd', nameTe: 'దొండకాయ', sub: 'Gourds & Beans', unit: '500 g', price: 22, oldPrice: 28, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v11', nameEn: 'Cluster Beans', nameTe: 'గోరుచిక్కుడు', sub: 'Gourds & Beans', unit: '500 g', price: 25, oldPrice: 32, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v12', nameEn: 'French Beans', nameTe: 'బీన్స్', sub: 'Gourds & Beans', unit: '500 g', price: 32, oldPrice: 40, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v13', nameEn: 'Broad Beans', nameTe: 'చిక్కుడుకాయ', sub: 'Gourds & Beans', unit: '500 g', price: 30, oldPrice: 38, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },

  // 1. VEGETABLES - Common Veggies
  { id: 'v14', nameEn: 'Brinjal / Eggplant', nameTe: 'వంకాయ', sub: 'Common Veggies', unit: '500 g', price: 24, oldPrice: 32, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=300&q=80' },
  { id: 'v15', nameEn: 'Okra / Ladies Finger', nameTe: 'బెండకాయ', sub: 'Common Veggies', unit: '500 g', price: 22, oldPrice: 30, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=300&q=80' },
  { id: 'v16', nameEn: 'Carrot', nameTe: 'క్యారెట్', sub: 'Common Veggies', unit: '500 g', price: 28, oldPrice: 36, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80' },
  { id: 'v17', nameEn: 'Beetroot', nameTe: 'బీట్‌రూట్', sub: 'Common Veggies', unit: '500 g', price: 24, oldPrice: 30, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=300&q=80' },
  { id: 'v18', nameEn: 'Cabbage', nameTe: 'క్యాబేజీ', sub: 'Common Veggies', unit: '1 pc', price: 22, oldPrice: 28, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=300&q=80' },
  { id: 'v19', nameEn: 'Cauliflower', nameTe: 'కాలిఫ్లవర్', sub: 'Common Veggies', unit: '1 pc', price: 28, oldPrice: 35, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=300&q=80' },
  { id: 'v20', nameEn: 'Capsicum', nameTe: 'క్యాప్సికమ్', sub: 'Common Veggies', unit: '500 g', price: 34, oldPrice: 42, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=300&q=80' },
  { id: 'v21', nameEn: 'Drumstick', nameTe: 'మునగకాయ', sub: 'Common Veggies', unit: '4 pcs', price: 20, oldPrice: 28, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v22', nameEn: 'Radish', nameTe: 'ముల్లంగి', sub: 'Common Veggies', unit: '500 g', price: 18, oldPrice: 24, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v23', nameEn: 'Cucumber', nameTe: 'దోసకాయ', sub: 'Common Veggies', unit: '500 g', price: 20, oldPrice: 26, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=300&q=80' },

  // 1. VEGETABLES - Leafy Greens
  { id: 'v24', nameEn: 'Spinach', nameTe: 'పాలకూర', sub: 'Leafy Greens', unit: '2 bunches', price: 20, oldPrice: 28, cat: 'vegetables', inStock: true, img: CAT_IMG.leafy },
  { id: 'v25', nameEn: 'Coriander', nameTe: 'కొత్తిమీర', sub: 'Leafy Greens', unit: '2 bunches', price: 15, oldPrice: 20, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80' },
  { id: 'v26', nameEn: 'Mint', nameTe: 'పుదీనా', sub: 'Leafy Greens', unit: '2 bunches', price: 14, oldPrice: 20, cat: 'vegetables', inStock: true, img: CAT_IMG.leafy },
  { id: 'v27', nameEn: 'Curry Leaves', nameTe: 'కరివేపాకు', sub: 'Leafy Greens', unit: '100 g', price: 10, oldPrice: 15, cat: 'vegetables', inStock: true, img: CAT_IMG.leafy },
  { id: 'v28', nameEn: 'Fenugreek Leaves', nameTe: 'మెంతికూర', sub: 'Leafy Greens', unit: '2 bunches', price: 18, oldPrice: 25, cat: 'vegetables', inStock: true, img: CAT_IMG.leafy },
  { id: 'v29', nameEn: 'Sorrel Leaves', nameTe: 'గోంగూర', sub: 'Leafy Greens', unit: '2 bunches', price: 20, oldPrice: 28, cat: 'vegetables', inStock: true, img: CAT_IMG.leafy },
  { id: 'v30', nameEn: 'Amaranth', nameTe: 'తోటకూర', sub: 'Leafy Greens', unit: '2 bunches', price: 18, oldPrice: 24, cat: 'vegetables', inStock: true, img: CAT_IMG.leafy },

  // 2. FRUITS
  { id: 'f1', nameEn: 'Banana', nameTe: 'అరటిపండు', sub: 'Everyday Fruits', unit: '1 Dozen', price: 45, oldPrice: 55, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80' },
  { id: 'f2', nameEn: 'Apple', nameTe: 'ఆపిల్', sub: 'Everyday Fruits', unit: '4 pcs', price: 110, oldPrice: 135, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80' },
  { id: 'f3', nameEn: 'Orange', nameTe: 'నారింజ', sub: 'Everyday Fruits', unit: '1 kg', price: 65, oldPrice: 80, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=300&q=80' },
  { id: 'f4', nameEn: 'Sweet Lime', nameTe: 'బత్తాయి', sub: 'Everyday Fruits', unit: '1 kg', price: 55, oldPrice: 70, cat: 'fruits', inStock: true, img: CAT_IMG.fruits },
  { id: 'f5', nameEn: 'Pomegranate', nameTe: 'దానిమ్మ', sub: 'Everyday Fruits', unit: '500 g', price: 75, oldPrice: 95, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80' },
  { id: 'f6', nameEn: 'Papaya', nameTe: 'బొప్పాయి', sub: 'Everyday Fruits', unit: '1 pc', price: 40, oldPrice: 50, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=300&q=80' },
  { id: 'f7', nameEn: 'Guava', nameTe: 'జామకాయ', sub: 'Everyday Fruits', unit: '500 g', price: 35, oldPrice: 45, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=300&q=80' },
  { id: 'f8', nameEn: 'Watermelon', nameTe: 'పుచ్చకాయ', sub: 'Everyday Fruits', unit: '1 pc (~2kg)', price: 55, oldPrice: 70, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&q=80' },
  { id: 'f9', nameEn: 'Muskmelon', nameTe: 'కర్బూజా', sub: 'Everyday Fruits', unit: '1 pc', price: 42, oldPrice: 55, cat: 'fruits', inStock: true, img: CAT_IMG.fruits },
  { id: 'f10', nameEn: 'Mango', nameTe: 'మామిడిపండు', sub: 'Seasonal & Exotic', unit: '1 kg', price: 110, oldPrice: 140, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80' },
  { id: 'f11', nameEn: 'Grapes', nameTe: 'ద్రాక్ష', sub: 'Seasonal & Exotic', unit: '500 g', price: 50, oldPrice: 65, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=300&q=80' },
  { id: 'f12', nameEn: 'Pineapple', nameTe: 'అనాసపండు', sub: 'Seasonal & Exotic', unit: '1 pc', price: 55, oldPrice: 70, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=300&q=80' },
  { id: 'f13', nameEn: 'Sapota / Chikoo', nameTe: 'సపోటా', sub: 'Seasonal & Exotic', unit: '500 g', price: 38, oldPrice: 48, cat: 'fruits', inStock: true, img: CAT_IMG.fruits },
  { id: 'f14', nameEn: 'Custard Apple', nameTe: 'సీతాఫలం', sub: 'Seasonal & Exotic', unit: '500 g', price: 60, oldPrice: 75, cat: 'fruits', inStock: true, img: CAT_IMG.fruits },
  { id: 'f15', nameEn: 'Kiwi', nameTe: 'కివి', sub: 'Seasonal & Exotic', unit: '3 pcs', price: 95, oldPrice: 120, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=300&q=80' },
  { id: 'f16', nameEn: 'Dragon Fruit', nameTe: 'డ్రాగన్ ఫ్రూట్', sub: 'Seasonal & Exotic', unit: '1 pc', price: 85, oldPrice: 110, cat: 'fruits', inStock: true, img: 'https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=300&q=80' },

  // 3. MILK & DAIRY
  { id: 'm1', nameEn: 'Full Cream Milk', nameTe: 'చిక్కటి పాలు', sub: 'Liquid Dairy', unit: '1 L', price: 68, oldPrice: 75, cat: 'dairy', inStock: true, img: CAT_IMG.dairy },
  { id: 'm2', nameEn: 'Toned Milk', nameTe: 'టోన్డ్ మిల్క్', sub: 'Liquid Dairy', unit: '1 L', price: 56, oldPrice: 62, cat: 'dairy', inStock: true, img: CAT_IMG.dairy },
  { id: 'm3', nameEn: 'Buttermilk', nameTe: 'మజ్జిగ', sub: 'Liquid Dairy', unit: '500 ml', price: 22, oldPrice: 28, cat: 'dairy', inStock: true, img: CAT_IMG.dairy },
  { id: 'm4', nameEn: 'Lassi', nameTe: 'లస్సీ', sub: 'Liquid Dairy', unit: '250 ml', price: 30, oldPrice: 38, cat: 'dairy', inStock: true, img: CAT_IMG.dairy },
  { id: 'm5', nameEn: 'Curd / Yogurt', nameTe: 'పెరుగు', sub: 'Thick & Fermented', unit: '500 g', price: 38, oldPrice: 45, cat: 'dairy', inStock: true, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80' },
  { id: 'm6', nameEn: 'Fresh Cream', nameTe: 'మీగడ', sub: 'Thick & Fermented', unit: '200 g', price: 65, oldPrice: 78, cat: 'dairy', inStock: true, img: CAT_IMG.dairy },
  { id: 'm7', nameEn: 'Malai', nameTe: 'మలై', sub: 'Thick & Fermented', unit: '200 g', price: 75, oldPrice: 90, cat: 'dairy', inStock: true, img: CAT_IMG.dairy },
  { id: 'm8', nameEn: 'Butter', nameTe: 'వెన్న', sub: 'Fats & Solids', unit: '200 g', price: 115, oldPrice: 130, cat: 'dairy', inStock: true, img: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=300&q=80' },
  { id: 'm9', nameEn: 'Ghee', nameTe: 'నెయ్యి', sub: 'Fats & Solids', unit: '500 ml', price: 340, oldPrice: 390, cat: 'dairy', inStock: true, img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80' },
  { id: 'm10', nameEn: 'Paneer / Cottage Cheese', nameTe: 'పనీర్', sub: 'Fats & Solids', unit: '200 g', price: 85, oldPrice: 100, cat: 'dairy', inStock: true, img: 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&w=300&q=80' },
  { id: 'm11', nameEn: 'Cheese', nameTe: 'చీజ్', sub: 'Fats & Solids', unit: '200 g', price: 120, oldPrice: 140, cat: 'dairy', inStock: true, img: CAT_IMG.dairy },
  { id: 'm12', nameEn: 'Khoya / Mawa', nameTe: 'కోవా', sub: 'Fats & Solids', unit: '250 g', price: 110, oldPrice: 130, cat: 'dairy', inStock: true, img: CAT_IMG.dairy },

  // 4. BEVERAGES
  { id: 'b1', nameEn: 'Tea Powder', nameTe: 'టీ పొడి', sub: 'Hot Drinks', unit: '250 g', price: 95, oldPrice: 115, cat: 'beverages', inStock: true, img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=300&q=80' },
  { id: 'b2', nameEn: 'Green Tea', nameTe: 'గ్రీన్ టీ', sub: 'Hot Drinks', unit: '25 bags', price: 130, oldPrice: 155, cat: 'beverages', inStock: true, img: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=300&q=80' },
  { id: 'b3', nameEn: 'Coffee Powder', nameTe: 'కాఫీ పొడి', sub: 'Hot Drinks', unit: '200 g', price: 120, oldPrice: 145, cat: 'beverages', inStock: true, img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80' },
  { id: 'b4', nameEn: 'Filter Coffee', nameTe: 'ఫిల్టర్ కాఫీ', sub: 'Hot Drinks', unit: '200 g', price: 135, oldPrice: 160, cat: 'beverages', inStock: true, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80' },
  { id: 'b5', nameEn: 'Health Drink Mixes', nameTe: 'హార్లిక్స్ / బూస్ట్', sub: 'Hot Drinks', unit: '500 g', price: 235, oldPrice: 265, cat: 'beverages', inStock: true, img: CAT_IMG.beverages },
  { id: 'b6', nameEn: 'Coconut Water', nameTe: 'కొబ్బరి నీళ్లు', sub: 'Cold & Packaged', unit: '1 pc', price: 40, oldPrice: 50, cat: 'beverages', inStock: true, img: CAT_IMG.beverages },
  { id: 'b7', nameEn: 'Packaged Fruit Juices', nameTe: 'పండ్ల రసాలు', sub: 'Cold & Packaged', unit: '1 L', price: 95, oldPrice: 115, cat: 'beverages', inStock: true, img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=300&q=80' },
  { id: 'b8', nameEn: 'Soft Drinks / Soda', nameTe: 'కూల్ డ్రింక్స్', sub: 'Cold & Packaged', unit: '750 ml', price: 40, oldPrice: 45, cat: 'beverages', inStock: true, img: CAT_IMG.beverages },
  { id: 'b9', nameEn: 'Flavored Milk (Badam/Rose)', nameTe: 'బాదం పాలు / రోజ్ మిల్క్', sub: 'Cold & Packaged', unit: '200 ml', price: 32, oldPrice: 40, cat: 'beverages', inStock: true, img: CAT_IMG.beverages },
  { id: 'b10', nameEn: 'Mineral Water', nameTe: 'మినరల్ వాటర్', sub: 'Cold & Packaged', unit: '1 L', price: 20, oldPrice: 20, cat: 'beverages', inStock: true, img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=300&q=80' },

  // 5. EGGS, LIVE POULTRY & LIVESTOCK
  { id: 'e1', nameEn: 'White Eggs', nameTe: 'తెల్ల గుడ్లు', sub: 'Eggs', unit: '12 pcs', price: 72, oldPrice: 84, cat: 'livestock', inStock: true, img: CAT_IMG.eggs },
  { id: 'e2', nameEn: 'Brown / Country Eggs', nameTe: 'నాటు కోడి గుడ్లు', sub: 'Eggs', unit: '6 pcs', price: 54, oldPrice: 66, cat: 'livestock', inStock: true, img: CAT_IMG.eggs },
  { id: 'e3', nameEn: 'Quail Eggs', nameTe: 'కౌజు పిట్ట గుడ్లు', sub: 'Eggs', unit: '12 pcs', price: 60, oldPrice: 75, cat: 'livestock', inStock: true, img: CAT_IMG.eggs },
  { id: 'c1', nameEn: 'Broiler Chicken (Live)', nameTe: 'బ్రాయిలర్ కోడి', sub: 'Live Chicken', unit: '1 kg live', price: 165, oldPrice: 190, cat: 'livestock', inStock: true, img: CAT_IMG.poultry },
  { id: 'c2', nameEn: 'Country Chicken / Desi (Live)', nameTe: 'నాటు కోడి', sub: 'Live Chicken', unit: '1 kg live', price: 380, oldPrice: 430, cat: 'livestock', inStock: true, img: CAT_IMG.poultry },
  { id: 'c3', nameEn: 'Kadaknath Chicken (Live)', nameTe: 'కడక్‌నాథ్ కోడి', sub: 'Live Chicken', unit: '1 kg live', price: 550, oldPrice: 620, cat: 'livestock', inStock: true, img: CAT_IMG.poultry },
  { id: 'c4', nameEn: 'Layer / Parent Bird (Live)', nameTe: 'లేయర్ కోడి', sub: 'Live Chicken', unit: '1 kg live', price: 210, oldPrice: 245, cat: 'livestock', inStock: true, img: CAT_IMG.poultry },
  { id: 'gt1', nameEn: 'Osmanabadi Goat (Live)', nameTe: 'ఉస్మానాబాదీ మేక', sub: 'Live Goat', unit: '1 Goat (~15kg)', price: 8500, oldPrice: 9500, cat: 'livestock', inStock: true, img: CAT_IMG.livestock },
  { id: 'gt2', nameEn: 'Sirohi Goat (Live)', nameTe: 'సిరోహి మేక', sub: 'Live Goat', unit: '1 Goat (~18kg)', price: 9800, oldPrice: 11000, cat: 'livestock', inStock: true, img: CAT_IMG.livestock },
  { id: 'gt3', nameEn: 'Tellicherry / Malabari Goat', nameTe: 'తలసేరి మేక', sub: 'Live Goat', unit: '1 Goat (~16kg)', price: 9200, oldPrice: 10200, cat: 'livestock', inStock: true, img: CAT_IMG.livestock },
  { id: 'gt4', nameEn: 'Local Desi Goat (Live)', nameTe: 'దేశీ మేక', sub: 'Live Goat', unit: '1 Goat (~14kg)', price: 7800, oldPrice: 8800, cat: 'livestock', inStock: true, img: CAT_IMG.livestock },
  { id: 'sh1', nameEn: 'Nellore Jodipi / Brown Sheep', nameTe: 'నెల్లూరు జోడిపి గొర్రె', sub: 'Live Sheep', unit: '1 Sheep (~16kg)', price: 8900, oldPrice: 9900, cat: 'livestock', inStock: true, img: CAT_IMG.livestock },
  { id: 'sh2', nameEn: 'Deccani Sheep (Live)', nameTe: 'దక్కని గొర్రె', sub: 'Live Sheep', unit: '1 Sheep (~15kg)', price: 8200, oldPrice: 9100, cat: 'livestock', inStock: true, img: CAT_IMG.livestock },
  { id: 'sh3', nameEn: 'Bellary Sheep (Live)', nameTe: 'బళ్లారి గొర్రె', sub: 'Live Sheep', unit: '1 Sheep (~17kg)', price: 9100, oldPrice: 10000, cat: 'livestock', inStock: true, img: CAT_IMG.livestock },
  { id: 'sh4', nameEn: 'Bannur / Mandya Sheep', nameTe: 'బన్నూర్ గొర్రె', sub: 'Live Sheep', unit: '1 Sheep (~16kg)', price: 9500, oldPrice: 10500, cat: 'livestock', inStock: true, img: CAT_IMG.livestock },
];
export default function App() {
  const [lang, setLang] = useState('te');
  const [screen, setScreen] = useState('home'); // 'home' | 'categories' | 'cart' | 'roles' | 'otp' | 'farmerPanel' | 'adminPanel' | 'roleDashboard'
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedSub, setSelectedSub] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({ v1: 1, f10: 1 });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Free Maps & Address Checkout States
  const [deliveryAddress, setDeliveryAddress] = useState('Vedayapalem, Nellore');
  const [gpsCoords, setGpsCoords] = useState({ lat: 14.4426, lng: 79.9865, pinned: false });
  const [gpsStatus, setGpsStatus] = useState('');

  // Free UPI & COD Payment States
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'cod'
  const [upiRefInput, setUpiRefInput] = useState('');

  // Admin Controlled Global Settings
  const [merchantUpiId, setMerchantUpiId] = useState('8328261103@ybl');
  const [freeDeliveryMin, setFreeDeliveryMin] = useState(499);
  const [baseDeliveryFee, setBaseDeliveryFee] = useState(25);
  const [bannerDiscount, setBannerDiscount] = useState(30);

  // Live Orders State (Includes GPS Coords & Payment Info for Delivery & Admin)
  const [orders, setOrders] = useState([
    {
      id: 'RB-101',
      customer: '9848012345 (Vedayapalem, Nellore)',
      lat: 14.4285,
      lng: 79.9692,
      itemsCount: 4,
      total: 245,
      payment: 'UPI Paid (UTR: 431982019283)',
      status: 'Confirmed',
      driver: 'Ravi (Kovur)',
    },
    {
      id: 'RB-102',
      customer: '9989123456 (Magunta Layout, Nellore)',
      lat: 14.4426,
      lng: 79.9865,
      itemsCount: 2,
      total: 560,
      payment: 'Cash on Delivery',
      status: 'Pending',
      driver: 'Unassigned',
    },
  ]);

  // Registered Platform Users (Managed by Admin)
  const [platformUsers, setPlatformUsers] = useState([
    { id: 'u1', name: 'Ramaiah (Kovur)', role: 'Farmer', mobile: '9440112233', verified: true },
    { id: 'u2', name: 'Sri Balaji Kirana (Nellore)', role: 'Shopkeeper', mobile: '9849223344', verified: true },
    { id: 'u3', name: 'Ravi Kumar (Delivery)', role: 'Delivery', mobile: '9000334455', verified: true },
    { id: 'u4', name: 'Venkateswarlu (Rapur)', role: 'Farmer', mobile: '9701445566', verified: false },
  ]);

  // Admin Panel Sub-Tab & Edit States
  const [adminTab, setAdminTab] = useState('overview');
  const [adminSearch, setAdminSearch] = useState('');
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  // OTP & Role Authentication States
  const [selectedRoleForLogin, setSelectedRoleForLogin] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [mobileInput, setMobileInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpStep, setOtpStep] = useState('phone');
  const [authError, setAuthError] = useState('');

  // Farmer Add Item Form States
  const [fNameTe, setFNameTe] = useState('');
  const [fNameEn, setFNameEn] = useState('');
  const [fCat, setFCat] = useState('vegetables');
  const [fSub, setFSub] = useState('Daily Staples');
  const [fQty, setFQty] = useState('1');
  const [fUnit, setFUnit] = useState('kg');
  const [fPrice, setFPrice] = useState('');
  const [fSuccessMsg, setFSuccessMsg] = useState('');

  const categories = [
    { id: 'all', nameEn: 'All Items', nameTe: 'అన్నీ', emoji: '🧺', bg: 'bg-emerald-50' },
    { id: 'vegetables', nameEn: 'Vegetables', nameTe: 'కూరగాయలు', emoji: '🍅', bg: 'bg-orange-50' },
    { id: 'fruits', nameEn: 'Fruits', nameTe: 'పండ్లు', emoji: '🥭', bg: 'bg-amber-50' },
    { id: 'dairy', nameEn: 'Milk & Dairy', nameTe: 'పాల ఉత్పత్తులు', emoji: '🥛', bg: 'bg-blue-50' },
    { id: 'beverages', nameEn: 'Beverages', nameTe: 'పానీయాలు', emoji: '🥥', bg: 'bg-teal-50' },
    { id: 'livestock', nameEn: 'Eggs, Poultry & Livestock', nameTe: 'గుడ్లు, కోళ్లు, మేకలు', emoji: '🐓', bg: 'bg-rose-50' },
  ];

  const subCategoriesMap = {
    all: ['All'],
    vegetables: ['All', 'Daily Staples', 'Gourds & Beans', 'Common Veggies', 'Leafy Greens'],
    fruits: ['All', 'Everyday Fruits', 'Seasonal & Exotic'],
    dairy: ['All', 'Liquid Dairy', 'Thick & Fermented', 'Fats & Solids'],
    beverages: ['All', 'Hot Drinks', 'Cold & Packaged'],
    livestock: ['All', 'Eggs', 'Live Chicken', 'Live Goat', 'Live Sheep'],
  };

  const roles = [
    { id: 'customer', titleTe: 'వినియోగదారుడు', titleEn: 'Customer', subTe: 'తాజా సరుకులు కొనండి', subEn: 'Buy fresh produce & livestock', icon: ShoppingCart, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'farmer', titleTe: 'రైతు', titleEn: 'Farmer', subTe: 'పంట / కోళ్లు / మేకల ధర & పరిమాణం పెట్టి అమ్మండి', subEn: 'Set price & qty to sell harvest/livestock', icon: Sprout, color: 'bg-green-50 text-green-600' },
    { id: 'shopkeeper', titleTe: 'దుకాణదారు', titleEn: 'Shopkeeper', subTe: 'హోల్‌సేల్ సరుకు కొనండి', subEn: 'Wholesale bulk orders', icon: Store, color: 'bg-amber-50 text-amber-600' },
    { id: 'delivery', titleTe: 'డెలివరీ పార్టనర్', titleEn: 'Delivery Partner', subTe: 'గూగుల్ మ్యాప్స్ రూట్ & డెలివరీ ఆర్డర్లు', subEn: 'Google Maps route & Nellore deliveries', icon: Truck, color: 'bg-blue-50 text-blue-600' },
    { id: 'admin', titleTe: 'అడ్మిన్ (Admin Control)', titleEn: 'Admin', subTe: 'ధరలు, ఆర్డర్లు, UPI, యూజర్లు కంట్రోల్', subEn: 'Full platform, price, UPI & order control', icon: ShieldCheck, color: 'bg-purple-50 text-purple-600' },
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
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= freeDeliveryMin ? 0 : baseDeliveryFee;
  const grandTotal = subtotal + deliveryFee;

  // Free Browser GPS Capture (Zero Cost)
  const handleCaptureGps = () => {
    if (!navigator.geolocation) {
      setGpsStatus('GPS not supported on this browser');
      return;
    }
    setGpsStatus(lang === 'te' ? 'లొకేషన్ తీసుకుంటోంది...' : 'Fetching GPS location...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lng = Number(pos.coords.longitude.toFixed(5));
        setGpsCoords({ lat, lng, pinned: true });
        setGpsStatus(`📍 GPS Pinned (${lat}, ${lng})`);
      },
      () => {
        setGpsCoords({ lat: 14.4426, lng: 79.9865, pinned: true });
        setGpsStatus('📍 Nellore Center Pinned (14.4426, 79.9865)');
      }
    );
  };

  // Free UPI Deep Link & Dynamic QR URL (0% Commission)
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodeURIComponent(
    'Rythu Basket Nellore'
  )}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent('Rythu Basket Order')}`;

  const freeQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    upiDeepLink
  )}`;

  const handlePlaceOrder = () => {
    const paymentSummary =
      paymentMethod === 'upi'
        ? `UPI (${upiRefInput.trim() ? 'Ref: ' + upiRefInput.trim() : 'Paid via App'})`
        : 'Cash on Delivery';

    const newOrder = {
      id: 'RB-' + Math.floor(103 + Math.random() * 890),
      customer: `${loggedInUser?.mobile || '9876543210'} (${deliveryAddress})`,
      lat: gpsCoords.lat,
      lng: gpsCoords.lng,
      itemsCount: totalItems,
      total: grandTotal,
      payment: paymentSummary,
      status: 'Pending',
      driver: 'Unassigned',
    };
    setOrders([newOrder, ...orders]);
    setOrderPlaced(true);
    setUpiRefInput('');
  };

  // OTP Login Flow
  const openRoleLogin = (roleObj) => {
    setSelectedRoleForLogin(roleObj);
    setMobileInput('');
    setOtpInput('');
    setGeneratedOtp('');
    setOtpStep('phone');
    setAuthError('');
    setScreen('otp');
  };

  const handleSendOtp = () => {
    const cleaned = mobileInput.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setAuthError(lang === 'te' ? 'సరైన 10 అంకెల మొబైల్ నంబర్ ఇవ్వండి' : 'Enter a valid 10-digit mobile number');
      return;
    }
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(code);
    setOtpStep('verify');
    setAuthError('');
  };

  const handleVerifyOtp = () => {
    if (otpInput.trim() !== generatedOtp) {
      setAuthError(lang === 'te' ? 'తప్పు OTP! మళ్ళీ ప్రయత్నించండి' : 'Invalid OTP! Please check and retry');
      return;
    }
    const userObj = { role: selectedRoleForLogin, mobile: mobileInput };
    setLoggedInUser(userObj);
    setAuthError('');
    if (selectedRoleForLogin.id === 'farmer') {
      setScreen('farmerPanel');
    } else if (selectedRoleForLogin.id === 'admin') {
      setScreen('adminPanel');
    } else if (selectedRoleForLogin.id === 'customer') {
      setScreen('home');
    } else {
      setScreen('roleDashboard');
    }
  };

  // Farmer Add Product
  const handleFarmerAddProduct = (e) => {
    e.preventDefault();
    if (!fNameEn.trim() || !fPrice || Number(fPrice) <= 0) return;

    const newItem = {
      id: 'f_' + Date.now(),
      nameEn: fNameEn.trim(),
      nameTe: fNameTe.trim() || fNameEn.trim(),
      sub: fSub,
      unit: `${fQty} ${fUnit}`,
      price: Number(fPrice),
      oldPrice: Math.round(Number(fPrice) * 1.15),
      cat: fCat,
      inStock: true,
      img: CAT_IMG[fCat] || CAT_IMG.vegetables,
    };

    setProducts([newItem, ...products]);
    setFNameEn('');
    setFNameTe('');
    setFQty('1');
    setFPrice('');
    setFSuccessMsg(
      lang === 'te' ? 'మీ సరుకు మార్కెట్‌లో విజయవంతంగా జతచేయబడింది!' : 'Your item is now live on Rythu Basket!'
    );
    setTimeout(() => setFSuccessMsg(''), 3500);
  };

  // Admin Product Actions
  const saveEditedPrice = (id) => {
    if (!tempPrice || Number(tempPrice) <= 0) return;
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, price: Number(tempPrice) } : p)));
    setEditingPriceId(null);
    setTempPrice('');
  };

  const toggleProductStock = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) => {
    const catOk = selectedCat === 'all' || p.cat === selectedCat;
    const subOk = selectedSub === 'All' || p.sub === selectedSub;
    const q = search.toLowerCase();
    const searchOk =
      p.nameEn.toLowerCase().includes(q) || p.nameTe.includes(q) || p.sub.toLowerCase().includes(q);
    return catOk && subOk && searchOk;
  });

  const adminFilteredProducts = products.filter((p) => {
    const q = adminSearch.toLowerCase();
    return p.nameEn.toLowerCase().includes(q) || p.nameTe.includes(q);
  });
const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="min-h-screen bg-[#F6FBF8] max-w-md mx-auto relative pb-28 font-sans text-gray-800 shadow-xl">
      {/* BRIGHT GREEN CURVED HEADER + CUSTOM LOGO */}
      <header className="bg-[#00B251] text-white rounded-b-[28px] px-4 pt-4 pb-5 shadow-md sticky top-0 z-30">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center space-x-2.5">
            <div className="h-11 w-11 rounded-full bg-white p-0.5 shadow-md overflow-hidden flex-shrink-0 border-2 border-yellow-300">
              <img src="/icon-512.png" alt="Rythu Basket Logo" className="h-full w-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-base font-extrabold leading-tight tracking-tight">
                {lang === 'te' ? 'రైతు బాస్కెట్' : 'Rythu Basket'}
              </h1>
              <div className="flex items-center text-[11px] text-emerald-100 font-medium">
                <MapPin className="h-3 w-3 mr-0.5 text-yellow-300" />
                <span>
                  {loggedInUser
                    ? `${lang === 'te' ? loggedInUser.role.titleTe : loggedInUser.role.titleEn} • ${loggedInUser.mobile}`
                    : lang === 'te'
                    ? 'నెల్లూరు • పొలం నుండి నేరుగా'
                    : 'Nellore • Farm to Home'}
                </span>
              </div>
            </div>
          </div>

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
                ? 'టమాటా, మామిడి, పాలు, నాటు కోడి, మేకలు వెతకండి...'
                : 'Search vegetables, fruits, milk, chicken, goats...'
            }
            className="w-full bg-white text-gray-800 placeholder-gray-400 text-xs font-medium rounded-xl py-2.5 pl-10 pr-4 shadow-sm focus:outline-none"
          />
        </div>
      </header>

      {/* SCREEN 1: HOME */}
      {screen === 'home' && (
        <main className="px-4 pt-4 space-y-4">
          <section>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-extrabold text-gray-900">
                {lang === 'te' ? 'విభాగాలు' : 'Categories'}
              </h2>
              <button onClick={() => setScreen('categories')} className="text-xs font-bold text-[#00B251]">
                {lang === 'te' ? 'అన్నీ చూడండి' : 'See all'}
              </button>
            </div>

            <div className="flex space-x-2.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCat(cat.id);
                    setSelectedSub('All');
                  }}
                  className={`${cat.bg} flex-shrink-0 w-24 rounded-2xl p-2.5 flex flex-col items-center justify-center border transition ${
                    selectedCat === cat.id ? 'border-[#00B251] ring-2 ring-[#00B251]/25' : 'border-gray-100'
                  }`}
                >
                  <span className="text-2xl mb-1">{cat.emoji}</span>
                  <span className="text-[10px] font-extrabold text-gray-800 text-center leading-tight">
                    {lang === 'te' ? cat.nameTe : cat.nameEn}
                  </span>
                </button>
              ))}
            </div>

            {subCategoriesMap[selectedCat]?.length > 1 && (
              <div className="flex space-x-1.5 overflow-x-auto pt-2.5 pb-1">
                {subCategoriesMap[selectedCat].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSub(sub)}
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-bold border transition ${
                      selectedSub === sub
                        ? 'bg-[#00B251] text-white border-[#00B251]'
                        : 'bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* DYNAMIC OFFER BANNER */}
          <section className="bg-[#DCF7E6] rounded-2xl p-4 flex items-center justify-between border border-[#B8ECCC]">
            <div className="max-w-[62%]">
              <span className="inline-block bg-[#00B251] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md mb-1">
                {lang === 'te' ? 'రైతు నేరుగా ఆఫర్' : 'FARM DIRECT'}
              </span>
              <h3 className="text-lg font-black text-[#008F41] leading-tight">
                {lang === 'te' ? `${bannerDiscount}% తగ్గింపు!` : `${bannerDiscount}% Discount`}
              </h3>
              <p className="text-[11px] text-gray-600 mt-1">
                {lang === 'te'
                  ? `₹${freeDeliveryMin} పైన ఆర్డర్లకు ఉచిత డెలివరీ (నెల్లూరు)`
                  : `Free delivery above ₹${freeDeliveryMin} in Nellore`}
              </p>
              <button
                onClick={() => setScreen('roles')}
                className="mt-2.5 bg-[#00B251] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm"
              >
                {lang === 'te' ? 'అన్ని రోల్స్ / OTP లాగిన్' : 'Roles / OTP Login'}
              </button>
            </div>

            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md flex-shrink-0 border-2 border-[#00B251]/20">
              <img src="/icon-512.png" alt="Rythu Basket" className="w-full h-full object-cover rounded-full" />
            </div>
          </section>

          {/* PRODUCTS GRID */}
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-sm font-extrabold text-gray-900">
                {lang === 'te'
                  ? `అందుబాటులో ఉన్న సరుకులు (${filteredProducts.length})`
                  : `Available Items (${filteredProducts.length})`}
              </h2>
              {selectedCat !== 'all' && (
                <button
                  onClick={() => {
                    setSelectedCat('all');
                    setSelectedSub('All');
                  }}
                  className="text-[11px] font-bold text-[#00B251]"
                >
                  {lang === 'te' ? 'అన్నీ చూపు' : 'Show all'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((item) => {
                const qty = cart[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex flex-col justify-between ${
                      !item.inStock ? 'opacity-60' : ''
                    }`}
                  >
                    <div>
                      <div className="h-24 w-full rounded-xl bg-gray-50 overflow-hidden mb-2 relative">
                        <img src={item.img} alt={item.nameEn} className="h-full w-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-white/95 text-[9px] font-bold text-gray-800 px-1.5 py-0.5 rounded shadow-sm">
                          {item.unit}
                        </span>
                        {!item.inStock && (
                          <span className="absolute inset-0 bg-black/50 text-white text-[10px] font-black flex items-center justify-center">
                            OUT OF STOCK
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {item.sub}
                      </span>
                      <h4 className="text-xs font-extrabold text-gray-900 leading-snug mt-1">
                        {lang === 'te' ? item.nameTe : item.nameEn}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {lang === 'te' ? item.nameEn : item.nameTe}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2.5 pt-1">
                      <div>
                        <span className="text-xs font-black text-[#00B251]">₹{item.price}</span>
                        <span className="text-[10px] text-gray-400 line-through ml-1">₹{item.oldPrice}</span>
                      </div>

                      {!item.inStock ? (
                        <span className="text-[10px] font-bold text-red-500">Sold Out</span>
                      ) : qty === 0 ? (
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
{/* SCREEN 2: ALL CATEGORIES */}
      {screen === 'categories' && (
        <main className="px-4 pt-4">
          <div className="flex items-center space-x-2 mb-4">
            <button onClick={() => setScreen('home')} className="p-1.5 bg-white rounded-full shadow-sm">
              <ArrowLeft className="h-4 w-4 text-gray-700" />
            </button>
            <h2 className="text-base font-extrabold text-gray-900">
              {lang === 'te' ? 'అన్ని విభాగాలు' : 'All Categories'}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCat(cat.id);
                  setSelectedSub('All');
                  setScreen('home');
                }}
                className={`${cat.bg} rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-gray-100`}
              >
                <span className="text-3xl mb-2">{cat.emoji}</span>
                <span className="text-xs font-extrabold text-gray-800 text-center">
                  {lang === 'te' ? cat.nameTe : cat.nameEn}
                </span>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* SCREEN 3: CART, FREE GPS LOCATION PIN & FREE UPI PAYMENT / QR */}
      {screen === 'cart' && (
        <main className="px-4 pt-4 space-y-3.5">
          <div className="flex items-center space-x-2">
            <button onClick={() => setScreen('home')} className="p-1.5 bg-white rounded-full shadow-sm">
              <ArrowLeft className="h-4 w-4 text-gray-700" />
            </button>
            <h2 className="text-base font-extrabold text-gray-900">
              {lang === 'te' ? 'మీ బాస్కెట్ & పేమెంట్' : 'My Basket & Checkout'}
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
                  ? 'మీ GPS లొకేషన్ & ఆర్డర్ వివరాలు Admin & Delivery Boy కి పంపబడ్డాయి.'
                  : 'Your GPS location & order details are sent to Admin & Delivery Partner.'}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${gpsCoords.lat},${gpsCoords.lng}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-4 py-2 rounded-xl"
              >
                <MapPin className="h-4 w-4" />
                <span>{lang === 'te' ? 'గూగుల్ మ్యాప్స్ లో పిన్ చూడండి' : 'View Pinned Location on Maps'}</span>
              </a>
              <div>
                <button
                  onClick={() => {
                    setOrderPlaced(false);
                    setCart({});
                    setScreen('home');
                  }}
                  className="bg-[#00B251] text-white text-xs font-bold px-5 py-2.5 rounded-xl mt-2"
                >
                  {lang === 'te' ? 'మరిన్ని కొనండి' : 'Continue Shopping'}
                </button>
              </div>
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
              {/* Cart Items */}
              <div className="space-y-2">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = products.find((p) => p.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm">
                      <div className="flex items-center space-x-3">
                        <img src={item.img} alt={item.nameEn} className="h-11 w-11 rounded-xl object-cover" />
                        <div>
                          <h4 className="text-xs font-extrabold text-gray-900">
                            {lang === 'te' ? item.nameTe : item.nameEn}
                          </h4>
                          <p className="text-[11px] text-gray-400">
                            ₹{item.price} × {qty} ({item.unit})
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

              {/* FREE MAPS & GPS LOCATION PINNING CARD */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-gray-900 flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-[#00B251]" />
                    <span>{lang === 'te' ? 'డెలివరీ చిరునామా & GPS పిన్' : 'Delivery Address & GPS Pin'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCaptureGps}
                    className="bg-emerald-50 text-[#00B251] border border-emerald-200 text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <LocateFixed className="h-3 w-3" />
                    <span>{lang === 'te' ? 'Live GPS పిన్' : 'Pin GPS'}</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="House No, Street, Area in Nellore..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                />

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-emerald-700 font-bold">
                    {gpsStatus || `Nellore Coords: ${gpsCoords.lat}, ${gpsCoords.lng}`}
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${gpsCoords.lat},${gpsCoords.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-extrabold underline"
                  >
                    Open Google Maps ↗
                  </a>
                </div>
              </div>

{/* FREE UPI PAYMENT (PHONEPE / GPAY / QR) & COD CARD */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-3">
                <span className="text-xs font-extrabold text-gray-900 flex items-center space-x-1">
                  <Wallet className="h-4 w-4 text-[#00B251]" />
                  <span>{lang === 'te' ? 'చెల్లింపు విధానం (0% Fee)' : 'Select Payment Method'}</span>
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold border flex items-center justify-center space-x-1.5 ${
                      paymentMethod === 'upi'
                        ? 'bg-emerald-50 border-[#00B251] text-[#00B251]'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    <QrCode className="h-4 w-4" />
                    <span>UPI / QR Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold border flex items-center justify-center space-x-1.5 ${
                      paymentMethod === 'cod'
                        ? 'bg-emerald-50 border-[#00B251] text-[#00B251]'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    <span>💵 Cash on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-center space-y-2">
                    <p className="text-[11px] font-bold text-gray-700">
                      Scan QR or Tap Below to Pay <span className="text-[#00B251] font-black">₹{grandTotal}</span>
                    </p>
                    <img
                      src={freeQrImageUrl}
                      alt="UPI Payment QR"
                      className="w-32 h-32 mx-auto rounded-xl bg-white p-1.5 shadow-sm border"
                    />
                    <p className="text-[10px] font-bold text-gray-500">UPI ID: {merchantUpiId}</p>

                    <a
                      href={upiDeepLink}
                      className="block w-full bg-[#5F259F] text-white text-xs font-extrabold py-2.5 rounded-xl shadow-sm"
                    >
                      Pay ₹{grandTotal} via PhonePe / GPay / Paytm ↗
                    </a>

                    <input
                      type="text"
                      value={upiRefInput}
                      onChange={(e) => setUpiRefInput(e.target.value)}
                      placeholder={
                        lang === 'te'
                          ? 'పేమెంట్ తర్వాత 12-అంకెల UPI Ref / UTR నంబర్ ఇవ్వండి'
                          : 'Enter 12-digit UPI UTR / Ref ID after payment'
                      }
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[11px] font-bold text-center"
                    />
                  </div>
                )}
              </div>

              {/* BILL SUMMARY */}
              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>{lang === 'te' ? 'వస్తువుల ధర' : 'Item Total'}</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>
                    {lang === 'te'
                      ? `డెలివరీ ఛార్జీ (₹${freeDeliveryMin} పైన ఉచితం)`
                      : `Delivery Fee (Free above ₹${freeDeliveryMin})`}
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
                  onClick={handlePlaceOrder}
                  className="w-full mt-2 bg-[#00B251] text-white font-extrabold py-3 rounded-xl shadow-md active:scale-95 transition"
                >
                  {lang === 'te' ? `ఆర్డర్ కన్ఫర్మ్ చేయండి • ₹${grandTotal}` : `Confirm Order • ₹${grandTotal}`}
                </button>
              </div>
            </>
          )}
        </main>
      )}

      {/* SCREEN 4: ROLE SELECTION (EVERY ROLE REQUIRES MOBILE + OTP LOGIN) */}
      {screen === 'roles' && (
        <main className="px-4 pt-4 space-y-3">
          <div className="bg-[#0B5D34] text-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black">నమస్కారం!</h2>
              <p className="text-xs text-emerald-100 mt-0.5">
                {lang === 'te'
                  ? 'మీ రోల్ ఎంచుకుని మొబైల్ OTP తో లాగిన్ అవ్వండి'
                  : 'Select your role to login via Mobile OTP'}
              </p>
            </div>
            {loggedInUser && (
              <button onClick={() => setLoggedInUser(null)} className="bg-white/20 p-2 rounded-xl text-white">
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => openRoleLogin(r)}
                  className="w-full bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-sm border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${r.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-extrabold text-gray-900">
                        {lang === 'te' ? r.titleTe : r.titleEn}
                      </h3>
                      <p className="text-[11px] font-semibold text-[#00B251]">
                        {lang === 'te' ? r.subTe : r.subEn}
                      </p>
                      <p className="text-[10px] text-gray-400">Mobile Number + OTP Login</p>
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
{/* SCREEN 5: MOBILE NUMBER + OTP LOGIN GATE */}
      {screen === 'otp' && selectedRoleForLogin && (
        <main className="px-4 pt-5">
          <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 space-y-4">
            <div className="flex items-center space-x-2">
              <button onClick={() => setScreen('roles')} className="p-1.5 bg-gray-100 rounded-full">
                <ArrowLeft className="h-4 w-4 text-gray-700" />
              </button>
              <div>
                <h2 className="text-base font-black text-gray-900">
                  {lang === 'te' ? selectedRoleForLogin.titleTe : selectedRoleForLogin.titleEn} Login
                </h2>
                <p className="text-[11px] text-gray-500">
                  {lang === 'te' ? 'మొబైల్ నంబర్ & OTP ధృవీకరణ' : 'Mobile Number & OTP Verification'}
                </p>
              </div>
            </div>

            {otpStep === 'phone' ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-700">
                  {lang === 'te' ? '10 అంకెల మొబైల్ నంబర్' : '10-Digit Mobile Number'}
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50">
                  <span className="text-xs font-extrabold text-gray-600 pr-2 border-r">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileInput}
                    onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="8328261103"
                    className="w-full bg-transparent pl-2.5 text-sm font-bold tracking-wider focus:outline-none"
                  />
                </div>
                {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-[#00B251] text-white font-extrabold text-xs py-3 rounded-xl shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Lock className="h-4 w-4" />
                  <span>{lang === 'te' ? 'OTP పంపండి' : 'Send OTP'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center">
                  <p className="text-[11px] text-emerald-800 font-semibold">
                    {lang === 'te' ? `+91 ${mobileInput} కి OTP పంపబడింది` : `OTP sent to +91 ${mobileInput}`}
                  </p>
                  <p className="text-xs font-black text-[#00B251] mt-0.5">Demo OTP: {generatedOtp}</p>
                </div>

                <label className="block text-xs font-bold text-gray-700">
                  {lang === 'te' ? '4 అంకెల OTP నమోదు చేయండి' : 'Enter 4-Digit OTP'}
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50">
                  <KeyRound className="h-4 w-4 text-[#00B251] mr-2" />
                  <input
                    type="tel"
                    maxLength={4}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • •"
                    className="w-full bg-transparent text-base font-black tracking-[0.5em] focus:outline-none"
                  />
                </div>
                {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}

                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-[#00B251] text-white font-extrabold text-xs py-3 rounded-xl shadow-md"
                >
                  {lang === 'te' ? 'OTP నిర్ధారించి లోపలికి వెళ్ళండి' : 'Verify OTP & Continue'}
                </button>
                <button onClick={() => setOtpStep('phone')} className="w-full text-[11px] font-bold text-gray-500 underline">
                  {lang === 'te' ? 'నంబర్ మార్చండి' : 'Change Mobile Number'}
                </button>
              </div>
            )}
          </div>
        </main>
      )}

      {/* SCREEN 6: FARMER HARVEST & LIVESTOCK LISTING PANEL */}
      {screen === 'farmerPanel' && (
        <main className="px-4 pt-4 space-y-4">
          <div className="bg-[#0B5D34] text-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-base font-black">
                {lang === 'te' ? 'రైతు విక్రయ కేంద్రం' : 'Farmer Listing Panel'}
              </h2>
              <p className="text-[11px] text-emerald-100">
                {lang === 'te'
                  ? 'పంట / పాలు / కోళ్లు / మేకల పరిమాణం & ధర ఎంచుకుని అమ్మండి'
                  : 'Select item quantity & your price to sell'}
              </p>
            </div>
            <button onClick={() => setScreen('home')} className="bg-white/20 text-xs font-bold px-3 py-1.5 rounded-xl">
              {lang === 'te' ? 'మార్కెట్ చూడు' : 'View Store'}
            </button>
          </div>

          <form onSubmit={handleFarmerAddProduct} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
            <div className="flex items-center space-x-1.5 text-[#00B251] font-extrabold text-xs">
              <PackagePlus className="h-4 w-4" />
              <span>{lang === 'te' ? 'కొత్త సరుకు వివరాలు నమోదు చేయండి' : 'Add Produce / Livestock'}</span>
            </div>

            {fSuccessMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-2.5 rounded-xl">
                {fSuccessMsg}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Category (విభాగం)</label>
                <select
                  value={fCat}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFCat(val);
                    setFSub(subCategoriesMap[val]?.[1] || 'General');
                  }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-bold"
                >
                  <option value="vegetables">Vegetables (కూరగాయలు)</option>
                  <option value="fruits">Fruits (పండ్లు)</option>
                  <option value="dairy">Milk & Dairy (పాలు & డైరీ)</option>
                  <option value="beverages">Beverages (పానీయాలు)</option>
                  <option value="livestock">Eggs, Poultry & Goats/Sheep</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Sub-Type (రకం)</label>
                <select
                  value={fSub}
                  onChange={(e) => setFSub(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2 text-xs font-bold"
                >
                  {(subCategoriesMap[fCat] || ['General'])
                    .filter((s) => s !== 'All')
                    .map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">Item Name (English)*</label>
                <input
                  type="text"
                  required
                  value={fNameEn}
                  onChange={(e) => setFNameEn(e.target.value)}
                  placeholder="e.g., Nellore Jodipi Sheep"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">పేరు (తెలుగులో)</label>
                <input
                  type="text"
                  value={fNameTe}
                  onChange={(e) => setFNameTe(e.target.value)}
                  placeholder="ఉదా: నెల్లూరు జోడిపి"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  {lang === 'te' ? 'పరిమాణం (Qty)' : 'Quantity'}
                </label>
                <select
                  value={fQty}
                  onChange={(e) => setFQty(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2 py-2 text-xs font-bold"
                >
                  <option value="250">250</option>
                  <option value="500">500</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  {lang === 'te' ? 'కొలత (Unit)' : 'Unit'}
                </label>
                <select
                  value={fUnit}
                  onChange={(e) => setFUnit(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2 py-2 text-xs font-bold"
                >
<option value="kg">kg</option>
                  <option value="g">grams</option>
                  <option value="bunches">bunches</option>
                  <option value="L">Liters</option>
                  <option value="pcs">pcs</option>
                  <option value="bird">bird (కోడి)</option>
                  <option value="animal">goat/sheep</option>
                  <option value="quintal">quintal</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  {lang === 'te' ? 'మీ ధర (₹)*' : 'Your Price (₹)*'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={fPrice}
                  onChange={(e) => setFPrice(e.target.value)}
                  placeholder="₹"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-black text-[#00B251]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00B251] text-white font-extrabold text-xs py-3 rounded-xl shadow-md active:scale-95 transition"
            >
              {lang === 'te' ? '+ మార్కెట్‌లో అమ్మకానికి పెట్టండి' : '+ Publish to Rythu Basket'}
            </button>
          </form>
        </main>
      )}

      {/* SCREEN 7: FULL ADMIN CONTROL DASHBOARD */}
      {screen === 'adminPanel' && (
        <main className="px-4 pt-4 space-y-3.5">
          <div className="bg-purple-900 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
            <div>
              <span className="bg-purple-700 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                Master Admin Control
              </span>
              <h2 className="text-base font-black mt-1">
                {lang === 'te' ? 'రైతు బాస్కెట్ అడ్మిన్ ప్యానెల్' : 'Rythu Basket Admin'}
              </h2>
              <p className="text-[11px] text-purple-200">
                +91 {loggedInUser?.mobile || '8328261103'} • UPI: {merchantUpiId}
              </p>
            </div>
            <button onClick={() => setScreen('home')} className="bg-white/15 text-xs font-bold px-3 py-1.5 rounded-xl">
              Store
            </button>
          </div>

          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {[
              { id: 'overview', label: '📊 Overview' },
              { id: 'products', label: `📦 Items (${products.length})` },
              { id: 'orders', label: `🚚 Orders (${orders.length})` },
              { id: 'users', label: `👥 Users (${platformUsers.length})` },
              { id: 'settings', label: '⚙️ UPI & Rules' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setAdminTab(t.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-extrabold border transition ${
                  adminTab === t.id
                    ? 'bg-purple-800 text-white border-purple-800 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {adminTab === 'overview' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-[11px] text-gray-400 font-bold">Total Sales Revenue</p>
                  <p className="text-xl font-black text-[#00B251] mt-1">₹{totalRevenue}</p>
                </div>
                <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-[11px] text-gray-400 font-bold">Total Live Orders</p>
                  <p className="text-xl font-black text-purple-700 mt-1">{orders.length}</p>
                </div>
                <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-[11px] text-gray-400 font-bold">Active Products</p>
                  <p className="text-xl font-black text-gray-900 mt-1">
                    {products.filter((p) => p.inStock).length} / {products.length}
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-[11px] text-gray-400 font-bold">Verified Partners</p>
                  <p className="text-xl font-black text-amber-600 mt-1">
                    {platformUsers.filter((u) => u.verified).length}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-2">
                <h3 className="text-xs font-extrabold text-gray-900">Quick Admin Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAdminTab('products')}
                    className="bg-emerald-50 text-emerald-800 text-xs font-bold py-2.5 px-3 rounded-xl text-left"
                  >
                    + Edit Item Prices
                  </button>
                  <button
                    onClick={() => setScreen('farmerPanel')}
                    className="bg-amber-50 text-amber-800 text-xs font-bold py-2.5 px-3 rounded-xl text-left"
                  >
                    + Add New Item
                  </button>
                  <button
                    onClick={() => setAdminTab('orders')}
                    className="bg-blue-50 text-blue-800 text-xs font-bold py-2.5 px-3 rounded-xl text-left"
                  >
                    Maps & Delivery
                  </button>
                  <button
                    onClick={() => setAdminTab('settings')}
                    className="bg-purple-50 text-purple-800 text-xs font-bold py-2.5 px-3 rounded-xl text-left"
                  >
                    Edit UPI ID & Rules
                  </button>
                </div>
              </div>
            </div>
          )}
{adminTab === 'products' && (
            <div className="space-y-2.5">
              <input
                type="text"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="Search item to edit price / stock..."
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-medium"
              />

              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-0.5">
                {adminFilteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center justify-between"
                  >
                    <div className="max-w-[55%]">
                      <h4 className="text-xs font-extrabold text-gray-900 truncate">
                        {item.nameTe} ({item.nameEn})
                      </h4>
                      <p className="text-[10px] text-gray-400">
                        {item.sub} • {item.unit}
                      </p>

                      {editingPriceId === item.id ? (
                        <div className="flex items-center space-x-1 mt-1.5">
                          <input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(e.target.value)}
                            className="w-20 border border-purple-400 rounded-lg px-2 py-0.5 text-xs font-black"
                          />
                          <button onClick={() => saveEditedPrice(item.id)} className="bg-[#00B251] text-white p-1 rounded-lg">
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1.5 mt-1">
                          <span className="text-xs font-black text-[#00B251]">₹{item.price}</span>
                          <button
                            onClick={() => {
                              setEditingPriceId(item.id);
                              setTempPrice(String(item.price));
                            }}
                            className="text-purple-700 bg-purple-50 p-1 rounded"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => toggleProductStock(item.id)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-extrabold ${
                          item.inStock
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-600 border border-red-200'
                        }`}
                      >
                        {item.inStock ? 'In Stock' : 'Out'}
                      </button>
                      <button onClick={() => deleteProduct(item.id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminTab === 'orders' && (
            <div className="space-y-2.5">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-800">{ord.id}</span>
                    <span className="text-xs font-black text-[#00B251]">₹{ord.total} ({ord.itemsCount} items)</span>
                  </div>
                  <p className="text-[11px] font-semibold text-gray-700">Customer: {ord.customer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">
                      {ord.payment}
                    </span>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${ord.lat},${ord.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-extrabold text-blue-600 flex items-center space-x-1 underline"
                    >
                      <Navigation className="h-3 w-3" />
                      <span>Maps Route</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400">Order Status</label>
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          setOrders((prev) =>
                            prev.map((o) => (o.id === ord.id ? { ...o, status: e.target.value } : o))
                          )
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-bold"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-gray-400">Assign Delivery Boy</label>
                      <select
                        value={ord.driver}
                        onChange={(e) =>
                          setOrders((prev) =>
                            prev.map((o) => (o.id === ord.id ? { ...o, driver: e.target.value } : o))
                          )
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-bold"
                      >
                        <option value="Unassigned">Unassigned</option>
                        <option value="Ravi (Kovur)">Ravi (Kovur)</option>
                        <option value="Suresh (Nellore Town)">Suresh (Nellore Town)</option>
                        <option value="Kiran (Buchireddypalem)">Kiran (Buchi)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'users' && (
            <div className="space-y-2.5">
              {platformUsers.map((u) => (
                <div
                  key={u.id}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900">{u.name}</h4>
                    <p className="text-[11px] text-gray-500">
                      {u.role} • +91 {u.mobile}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setPlatformUsers((prev) =>
                        prev.map((usr) => (usr.id === u.id ? { ...usr, verified: !usr.verified } : usr))
                      )
                    }
                    className={`px-3 py-1 rounded-xl text-[11px] font-extrabold ${
                      u.verified
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {u.verified ? '✓ Verified' : 'Approve Now'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'settings' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Merchant UPI ID (PhonePe / GPay / Paytm)
                </label>
                <input
                  type="text"
                  value={merchantUpiId}
                  onChange={(e) => setMerchantUpiId(e.target.value)}
                  placeholder="8328261103@ybl"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-black text-purple-800"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Free Delivery Minimum Order (₹)
                </label>
                <input
                  type="number"
                  value={freeDeliveryMin}
                  onChange={(e) => setFreeDeliveryMin(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-black text-[#00B251]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Standard Nellore Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  value={baseDeliveryFee}
                  onChange={(e) => setBaseDeliveryFee(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-black text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Home Banner Discount Percentage (%)
                </label>
                <input
                  type="number"
                  value={bannerDiscount}
                  onChange={(e) => setBannerDiscount(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-black text-purple-800"
                />
              </div>

              <button
                onClick={() => setScreen('home')}
                className="w-full bg-purple-800 text-white font-extrabold py-3 rounded-xl shadow-md"
              >
                Save & Preview Live App
              </button>
            </div>
          )}
        </main>
      )}
{/* SCREEN 8: DELIVERY PARTNER (WITH FREE GOOGLE MAPS NAVIGATION) & SHOPKEEPER DASHBOARD */}
      {screen === 'roleDashboard' && loggedInUser && (
        <main className="px-4 pt-4 space-y-3">
          <div className="bg-[#0B5D34] text-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-base font-black">
              {lang === 'te' ? loggedInUser.role.titleTe : loggedInUser.role.titleEn} Dashboard
            </h2>
            <p className="text-xs text-emerald-100">Verified Mobile: +91 {loggedInUser.mobile}</p>
          </div>

          {loggedInUser.role.id === 'delivery' ? (
            <div className="space-y-2.5">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-gray-900">{ord.id} • {ord.status}</span>
                    <span className="text-xs font-black text-[#00B251]">₹{ord.total}</span>
                  </div>
                  <p className="text-[11px] text-gray-600">{ord.customer}</p>
                  <p className="text-[10px] font-bold text-gray-500">{ord.payment}</p>

                  <div className="flex space-x-2 pt-1">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${ord.lat},${ord.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-blue-600 text-white text-xs font-extrabold py-2 rounded-xl flex items-center justify-center space-x-1.5 shadow-sm"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      <span>{lang === 'te' ? 'Google Maps లో రూట్ చూడు' : 'Navigate in Google Maps'}</span>
                    </a>

                    {ord.status !== 'Delivered' && (
                      <button
                        onClick={() =>
                          setOrders((prev) =>
                            prev.map((o) => (o.id === ord.id ? { ...o, status: 'Delivered' } : o))
                          )
                        }
                        className="bg-[#00B251] text-white text-xs font-extrabold px-3 py-2 rounded-xl"
                      >
                        ✓ Delivered
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2.5 text-xs">
              <p className="font-bold text-gray-800">
                {lang === 'te'
                  ? 'నెల్లూరు రైతుల నుండి నేరుగా హోల్‌సేల్ ధరలకు సరుకు ఆర్డర్ చేయండి.'
                  : 'Order bulk wholesale produce & livestock directly from Nellore farmers.'}
              </p>
              <button onClick={() => setScreen('home')} className="bg-[#00B251] text-white font-bold px-4 py-2 rounded-xl">
                {lang === 'te' ? 'లైవ్ మార్కెట్ కి వెళ్ళండి' : 'Go to Live Marketplace'}
              </button>
            </div>
          )}
        </main>
      )}

      {/* GREEN BOTTOM NAVIGATION WITH FLOATING WHITE CIRCULAR CART */}
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
          onClick={() =>
            loggedInUser?.role?.id === 'admin'
              ? setScreen('adminPanel')
              : loggedInUser?.role?.id === 'farmer'
              ? setScreen('farmerPanel')
              : loggedInUser?.role?.id === 'delivery'
              ? setScreen('roleDashboard')
              : setScreen('cart')
          }
          className="flex flex-col items-center space-y-0.5 text-emerald-100/80"
        >
          <ClipboardList className="h-5 w-5" />
          <span className="text-[10px]">
            {loggedInUser?.role?.id === 'admin'
              ? 'Admin'
              : loggedInUser?.role?.id === 'farmer'
              ? lang === 'te'
                ? 'పంట చేర్చు'
                : 'Sell'
              : loggedInUser?.role?.id === 'delivery'
              ? 'Maps'
              : lang === 'te'
              ? 'ఆర్డర్లు'
              : 'Orders'}
          </span>
        </button>

        <button
          onClick={() => setScreen('roles')}
          className={`flex flex-col items-center space-y-0.5 ${
            screen === 'roles' || screen === 'otp' ? 'text-white font-extrabold' : 'text-emerald-100/80'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px]">{lang === 'te' ? 'లాగిన్' : 'Roles'}</span>
        </button>
      </nav>
    </div>
  );
}