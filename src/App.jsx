import React, { useState } from 'react';
import {
  Search, ShoppingCart, Plus, Minus, Home, Grid,
  ClipboardList, User, MapPin, Phone, Sprout,
  Store, Truck, ShieldCheck, ChevronRight, ArrowLeft,
  CheckCircle2, Lock, KeyRound, PackagePlus, LogOut,
  Trash2, Edit3, Check, Navigation, QrCode, Wallet,
  LocateFixed, Bell, MessageCircle, FileText, ArrowLeftRight,
  Warehouse, AlertTriangle, Handshake
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
  // 1. VEGETABLES
  { id: 'v1', nameEn: 'Tomato', nameTe: 'టమాటా', sub: 'Daily Staples', unit: '1 kg', price: 28, oldPrice: 36, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80' },
  { id: 'v2', nameEn: 'Onion', nameTe: 'ఉల్లిపాయ', sub: 'Daily Staples', unit: '1 kg', price: 32, oldPrice: 40, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1508747705729-e0613307ab6e?auto=format&fit=crop&w=300&q=80' },
  { id: 'v3', nameEn: 'Potato', nameTe: 'బంగాళాదుంప', sub: 'Daily Staples', unit: '1 kg', price: 30, oldPrice: 38, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80' },
  { id: 'v4', nameEn: 'Green Chillies', nameTe: 'పచ్చిమిర్చి', sub: 'Daily Staples', unit: '250 g', price: 15, oldPrice: 20, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=300&q=80' },
  { id: 'v5', nameEn: 'Ginger', nameTe: 'అల్లం', sub: 'Daily Staples', unit: '250 g', price: 25, oldPrice: 32, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=300&q=80' },
  { id: 'v6', nameEn: 'Garlic', nameTe: 'వెల్లుల్లి', sub: 'Daily Staples', unit: '250 g', price: 45, oldPrice: 55, cat: 'vegetables', inStock: true, img: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=300&q=80' },
  { id: 'v7', nameEn: 'Bottle Gourd', nameTe: 'సొరకాయ', sub: 'Gourds & Beans', unit: '1 pc', price: 24, oldPrice: 30, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v8', nameEn: 'Ridge Gourd', nameTe: 'బీరకాయ', sub: 'Gourds & Beans', unit: '500 g', price: 28, oldPrice: 35, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v9', nameEn: 'Bitter Gourd', nameTe: 'కాకరకాయ', sub: 'Gourds & Beans', unit: '500 g', price: 26, oldPrice: 34, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v10', nameEn: 'Ivy Gourd', nameTe: 'దొండకాయ', sub: 'Gourds & Beans', unit: '500 g', price: 22, oldPrice: 28, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v11', nameEn: 'Cluster Beans', nameTe: 'గోరుచిక్కుడు', sub: 'Gourds & Beans', unit: '500 g', price: 25, oldPrice: 32, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v12', nameEn: 'French Beans', nameTe: 'బీన్స్', sub: 'Gourds & Beans', unit: '500 g', price: 32, oldPrice: 40, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
  { id: 'v13', nameEn: 'Broad Beans', nameTe: 'చిక్కుడుకాయ', sub: 'Gourds & Beans', unit: '500 g', price: 30, oldPrice: 38, cat: 'vegetables', inStock: true, img: CAT_IMG.vegetables },
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

  // 5. EGGS, POULTRY & LIVESTOCK
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
  // STARTS AT 'roles' SO USER MUST PICK USER TYPE & VERIFY OTP FIRST
  const [screen, setScreen] = useState('roles');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedSub, setSelectedSub] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({ v1: 1, f10: 1 });
  const [latestInvoice, setLatestInvoice] = useState(null);

  // Free Maps & Address States
  const [deliveryAddress, setDeliveryAddress] = useState('Vedayapalem, Nellore');
  const [gpsCoords, setGpsCoords] = useState({ lat: 14.4426, lng: 79.9865 });
  const [gpsStatus, setGpsStatus] = useState('');

  // Free UPI & COD Payment States
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiRefInput, setUpiRefInput] = useState('');

  // Admin Settings
  const [merchantUpiId, setMerchantUpiId] = useState('8328261103@ybl');
  const [freeDeliveryMin, setFreeDeliveryMin] = useState(499);
  const [baseDeliveryFee, setBaseDeliveryFee] = useState(25);
  const [bannerDiscount, setBannerDiscount] = useState(30);

  // 1. LIVE FARMER BULK HARVEST & ALERTS
  const [farmerLots, setFarmerLots] = useState([
    { id: 'fl1', farmer: 'Ramaiah (Kovur)', mobile: '9440112233', item: 'Tomato (టమాటా)', qtyKg: 500, pricePerKg: 21, minOrderKg: 25, pickupReady: true, status: 'Live Alert Sent to Shops' },
    { id: 'fl2', farmer: 'Subba Rao (Buchireddypalem)', mobile: '9848556677', item: 'Onion (ఉల్లిపాయ)', qtyKg: 400, pricePerKg: 22, minOrderKg: 50, pickupReady: true, status: 'Live Alert Sent to Shops' },
    { id: 'fl3', farmer: 'Narayana (Rapur)', mobile: '9701223344', item: 'Country Chicken (నాటు కోడి)', qtyKg: 60, pricePerKg: 340, minOrderKg: 10, pickupReady: false, status: 'Available' },
  ]);

  // 2. WHOLESALE INVENTORY + EXCESS STOCK CLEARANCE
  const [wholesaleStock, setWholesaleStock] = useState([
    { id: 'ws1', shop: 'Sri Balaji Wholesale (Nellore Mandi)', mobile: '9849223344', distance: '1.8 km', item: 'Onion (ఉల్లిపాయ)', totalKg: 800, soldKg: 500, excessKg: 300, regularPrice: 24, excessPrice: 21, minKg: 25, delivery: true },
    { id: 'ws2', shop: 'Kaligiri Agro Traders', mobile: '9989334455', distance: '4.2 km', item: 'Onion (ఉల్లిపాయ)', totalKg: 600, soldKg: 450, excessKg: 150, regularPrice: 23, excessPrice: 20, minKg: 20, delivery: true },
    { id: 'ws3', shop: 'Nellore Potato Depot', mobile: '9440778899', distance: '2.5 km', item: 'Potato (బంగాళాదుంప)', totalKg: 1000, soldKg: 700, excessKg: 300, regularPrice: 25, excessPrice: 19, minKg: 30, delivery: true },
  ]);

  // 3. SHOP-TO-SHOP NEARBY TRADING LISTINGS
  const [nearbyShops, setNearbyShops] = useState([
    { id: 'ns1', shopName: 'Lakshmi Fresh Mart (Magunta Layout)', type: 'Retail Shop', distance: '0.9 km', item: 'Carrot (క్యారెట్)', availKg: 50, pricePerKg: 24, delivery: 'Available (₹20)', mobile: '9121334455' },
    { id: 'ns2', shopName: 'Venkateswara Kirana & Veg (Vedayapalem)', type: 'Retail Shop', distance: '1.4 km', item: 'Green Chillies (పచ్చిమిర్చి)', availKg: 35, pricePerKg: 38, delivery: 'Self Pickup / Delivery', mobile: '9391445566' },
    { id: 'ns3', shopName: 'Sri Balaji Wholesale (Nellore)', type: 'Wholesale Shop', distance: '1.8 km', item: 'Potato Excess Deal (బంగాళాదుంప)', availKg: 300, pricePerKg: 19, delivery: 'Free Shop-to-Shop', mobile: '9849223344' },
  ]);

  // 4. B2B / B2C ORDERS & NEGOTIATIONS
  const [orders, setOrders] = useState([
    { id: 'RB-101', type: 'Retail → Farmer', customer: '9849223344 (Balaji Mart, Nellore)', lat: 14.4285, lng: 79.9692, itemsCount: 1, summary: '100 kg Onion @ ₹22/kg', total: 2200, payment: 'UPI Paid (UTR: 43198201)', status: 'Confirmed', driver: 'Ravi (Kovur)' },
    { id: 'RB-102', type: 'Customer Order', customer: '9989123456 (Magunta Layout)', lat: 14.4426, lng: 79.9865, itemsCount: 2, summary: 'Tomato + Mango', total: 138, payment: 'Cash on Delivery', status: 'Pending', driver: 'Unassigned' },
  ]);

  const [negotiations, setNegotiations] = useState([
    { id: 'neg1', buyer: 'Balaji Retail Shop', item: 'Tomato (200 kg)', farmerAsk: 21, buyerOffer: 19, status: 'Pending Farmer Reply' },
  ]);

  // Sub-Tabs
  const [farmerTab, setFarmerTab] = useState('sell');
  const [retailTab, setRetailTab] = useState('compare');
  const [wholesaleTab, setWholesaleTab] = useState('excess');
  const [adminTab, setAdminTab] = useState('overview');

  // Search / Filter states
  const [retailCompareItem, setRetailCompareItem] = useState('Onion');
  const [adminSearch, setAdminSearch] = useState('');
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  // OTP Auth States
  const [selectedRoleForLogin, setSelectedRoleForLogin] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [mobileInput, setMobileInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpStep, setOtpStep] = useState('phone');
  const [authError, setAuthError] = useState('');

  // Farmer Form States
  const [fNameEn, setFNameEn] = useState('');
  const [fNameTe, setFNameTe] = useState('');
  const [fCat, setFCat] = useState('vegetables');
  const [fQtyKg, setFQtyKg] = useState('500');
  const [fPrice, setFPrice] = useState('');
  const [fPickup, setFPickup] = useState(true);
  const [alertBanner, setAlertBanner] = useState('');

  // Wholesale Form States
  const [wItem, setWItem] = useState('');
  const [wTotalKg, setWTotalKg] = useState('1000');
  const [wSoldKg, setWSoldKg] = useState('700');
  const [wRegPrice, setWRegPrice] = useState('25');
  const [wExcessPrice, setWExcessPrice] = useState('19');

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
    { id: 'customer', titleTe: 'వినియోగదారుడు', titleEn: 'Customer', subTe: 'ఇంటికి తాజా సరుకులు కొనండి', subEn: 'Buy fresh produce & livestock', icon: ShoppingCart, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'farmer', titleTe: 'రైతు', titleEn: 'Farmer', subTe: 'పంట అమ్మకం, మండి ధరలు, పికప్ & ఆదాయం', subEn: 'Sell harvest, Mandi rates, Pickup & Earnings', icon: Sprout, color: 'bg-green-50 text-green-600' },
    { id: 'retail', titleTe: 'రిటైల్ దుకాణదారు', titleEn: 'Retail Shopkeeper', subTe: 'రైతు vs హోల్‌సేల్ ధరల పోలిక & Shop-to-Shop', subEn: 'Compare Farmer vs Wholesale & Nearby Shops', icon: Store, color: 'bg-amber-50 text-amber-600' },
    { id: 'wholesale', titleTe: 'హోల్‌సేల్ వ్యాపారి', titleEn: 'Wholesale Shopkeeper', subTe: 'Bulk స్టాక్ & Sell Excess Stock క్లియరెన్స్', subEn: 'Bulk inventory & Sell Excess Stock', icon: Warehouse, color: 'bg-indigo-50 text-indigo-600' },
    { id: 'delivery', titleTe: 'డెలివరీ పార్టనర్', titleEn: 'Delivery Partner', subTe: 'Google Maps రూట్ & డెలివరీ ఆర్డర్లు', subEn: 'Google Maps route & Nellore deliveries', icon: Truck, color: 'bg-blue-50 text-blue-600' },
    { id: 'admin', titleTe: 'అడ్మిన్ (Admin)', titleEn: 'Admin', subTe: 'ధరలు, ఆర్డర్లు, UPI, యూజర్లు కంట్రోల్', subEn: 'Full platform, price, UPI & order control', icon: ShieldCheck, color: 'bg-purple-50 text-purple-600' },
  ];
// Cart & Calculations
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

  // Free GPS Pin
  const handleCaptureGps = () => {
    if (!navigator.geolocation) {
      setGpsStatus('GPS not supported');
      return;
    }
    setGpsStatus(lang === 'te' ? 'లొకేషన్ తీసుకుంటోంది...' : 'Fetching GPS...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lng = Number(pos.coords.longitude.toFixed(5));
        setGpsCoords({ lat, lng });
        setGpsStatus(`📍 GPS Pinned (${lat}, ${lng})`);
      },
      () => {
        setGpsCoords({ lat: 14.4426, lng: 79.9865 });
        setGpsStatus('📍 Nellore Pinned (14.4426, 79.9865)');
      }
    );
  };

  // UPI Deep Link & Dynamic QR
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodeURIComponent(
    'Rythu Basket Nellore'
  )}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent('Rythu Basket Order')}`;
  const freeQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(upiDeepLink)}`;

  // Generate Invoice & WhatsApp Share Link Helper
  const createInvoiceAndOrder = ({ type, buyerLabel, summary, amount, paymentStr, sellerMobile }) => {
    const invNo = 'INV-' + Math.floor(1000 + Math.random() * 9000);
    const ordId = 'RB-' + Math.floor(105 + Math.random() * 890);
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    const invoiceObj = {
      invNo,
      ordId,
      date: now,
      type,
      buyer: buyerLabel,
      summary,
      amount,
      payment: paymentStr,
      mapsLink: `https://www.google.com/maps/search/?api=1&query=${gpsCoords.lat},${gpsCoords.lng}`,
      targetMobile: sellerMobile || '8328261103',
    };

    const newOrder = {
      id: ordId,
      type,
      customer: buyerLabel,
      lat: gpsCoords.lat,
      lng: gpsCoords.lng,
      itemsCount: 1,
      summary,
      total: amount,
      payment: paymentStr,
      status: 'Confirmed',
      driver: 'Unassigned',
    };

    setOrders([newOrder, ...orders]);
    setLatestInvoice(invoiceObj);
  };

  const buildWhatsAppUrl = (inv) => {
    const text =
      `*🌾 RYTHU BASKET - NELLORE (DIGITAL INVOICE)*\n` +
      `----------------------------------\n` +
      `*Invoice No:* ${inv.invNo}\n` +
      `*Order ID:* ${inv.ordId}\n` +
      `*Date:* ${inv.date}\n` +
      `*Order Type:* ${inv.type}\n` +
      `*Buyer:* ${inv.buyer}\n` +
      `*Items:* ${inv.summary}\n` +
      `*Total Amount:* ₹${inv.amount}\n` +
      `*Payment:* ${inv.payment}\n` +
      `*GPS Location:* ${inv.mapsLink}\n` +
      `----------------------------------\n` +
      `Thank you for trading on Rythu Basket!`;
    const phone = inv.targetMobile ? `91${inv.targetMobile.replace(/\D/g, '').slice(-10)}` : '';
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const handleCustomerCheckout = () => {
    const itemLines = Object.entries(cart)
      .map(([id, qty]) => {
        const p = products.find((x) => x.id === id);
        return p ? `${p.nameEn} (${qty} × ₹${p.price})` : '';
      })
      .filter(Boolean)
      .join(', ');

    const paymentStr =
      paymentMethod === 'upi'
        ? `UPI (${upiRefInput.trim() ? 'UTR: ' + upiRefInput.trim() : 'Paid via UPI App'})`
        : 'Cash on Delivery';

    createInvoiceAndOrder({
      type: 'Customer Order',
      buyerLabel: `${loggedInUser?.mobile || '9876543210'} (${deliveryAddress})`,
      summary: itemLines,
      amount: grandTotal,
      paymentStr,
      sellerMobile: '8328261103',
    });
    setCart({});
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
    if (selectedRoleForLogin.id === 'farmer') setScreen('farmerPanel');
    else if (selectedRoleForLogin.id === 'retail') setScreen('retailPanel');
    else if (selectedRoleForLogin.id === 'wholesale') setScreen('wholesalePanel');
    else if (selectedRoleForLogin.id === 'admin') setScreen('adminPanel');
    else if (selectedRoleForLogin.id === 'delivery') setScreen('roleDashboard');
    else setScreen('home');
  };
const handleLogout = () => {
    setLoggedInUser(null);
    setSelectedRoleForLogin(null);
    setLatestInvoice(null);
    setScreen('roles');
  };

  // Farmer Post Harvest
  const handleFarmerPublishLot = (e) => {
    e.preventDefault();
    if (!fNameEn.trim() || !fPrice) return;
    const itemLabel = `${fNameEn.trim()} (${fNameTe.trim() || fNameEn.trim()})`;
    const newLot = {
      id: 'fl_' + Date.now(),
      farmer: `Farmer (${loggedInUser?.mobile || 'Nellore'})`,
      mobile: loggedInUser?.mobile || '9440112233',
      item: itemLabel,
      qtyKg: Number(fQtyKg),
      pricePerKg: Number(fPrice),
      minOrderKg: 20,
      pickupReady: fPickup,
      status: 'Live Alert Sent to Shops',
    };
    setFarmerLots([newLot, ...farmerLots]);

    setProducts([
      {
        id: 'p_' + Date.now(),
        nameEn: fNameEn.trim(),
        nameTe: fNameTe.trim() || fNameEn.trim(),
        sub: 'Farm Direct Bulk',
        unit: '1 kg',
        price: Number(fPrice) + 4,
        oldPrice: Number(fPrice) + 10,
        cat: fCat,
        inStock: true,
        img: CAT_IMG[fCat] || CAT_IMG.vegetables,
      },
      ...products,
    ]);

    setAlertBanner(
      `🔔 Alert Sent: ${newLot.farmer} posted ${fQtyKg} KG ${itemLabel} @ ₹${fPrice}/kg to all Nellore Retail & Wholesale Shops!`
    );
    setFNameEn('');
    setFNameTe('');
    setFPrice('');
  };

  // Wholesale Add / Excess Stock
  const handleAddWholesaleExcess = (e) => {
    e.preventDefault();
    if (!wItem.trim()) return;
    const total = Number(wTotalKg);
    const sold = Number(wSoldKg);
    const excess = Math.max(0, total - sold);
    const entry = {
      id: 'ws_' + Date.now(),
      shop: `Wholesale (${loggedInUser?.mobile || 'Nellore'})`,
      mobile: loggedInUser?.mobile || '9849223344',
      distance: '1.5 km',
      item: wItem.trim(),
      totalKg: total,
      soldKg: sold,
      excessKg: excess,
      regularPrice: Number(wRegPrice),
      excessPrice: Number(wExcessPrice),
      minKg: 25,
      delivery: true,
    };
    setWholesaleStock([entry, ...wholesaleStock]);
    setNearbyShops([
      {
        id: 'ns_' + Date.now(),
        shopName: entry.shop,
        type: 'Wholesale Excess',
        distance: '1.5 km',
        item: `${entry.item} (Excess Clearance)`,
        availKg: excess,
        pricePerKg: Number(wExcessPrice),
        delivery: 'Free Shop-to-Shop',
        mobile: entry.mobile,
      },
      ...nearbyShops,
    ]);
    setAlertBanner(`📢 Excess Stock Alert: ${excess} KG ${wItem} listed @ ₹${wExcessPrice}/kg for Nearby Shops!`);
    setWItem('');
  };

  const filteredProducts = products.filter((p) => {
    const catOk = selectedCat === 'all' || p.cat === selectedCat;
    const subOk = selectedSub === 'All' || p.sub === selectedSub;
    const q = search.toLowerCase();
    return catOk && subOk && (p.nameEn.toLowerCase().includes(q) || p.nameTe.includes(q));
  });

  const adminFilteredProducts = products.filter((p) => {
    const q = adminSearch.toLowerCase();
    return p.nameEn.toLowerCase().includes(q) || p.nameTe.includes(q);
  });

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  // =========================================================================
  // GATE 1: INITIAL FULL-SCREEN USER TYPE SELECTION & OTP LOGIN (BEFORE MENU)
  // =========================================================================
  if (!loggedInUser || screen === 'roles' || screen === 'otp') {
    return (
      <div className="min-h-screen bg-[#F6FBF8] max-w-md mx-auto font-sans text-gray-800 shadow-xl flex flex-col justify-between">
        <div>
          {/* Branded Green Welcome Header */}
          <div className="bg-[#0B5D34] text-white rounded-b-[32px] px-5 pt-6 pb-7 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-white p-0.5 shadow-md border-2 border-yellow-300 overflow-hidden">
                  <img src="/icon-512.png" alt="Rythu Basket" className="h-full w-full object-cover rounded-full" />
                </div>
                <div>
                  <h1 className="text-lg font-black tracking-tight">రైతు బాస్కెట్</h1>
                  <p className="text-[11px] text-emerald-200 font-semibold">Rythu Basket • నెల్లూరు</p>
                </div>
              </div>

              {/* Language Toggle */}
              <div className="bg-white/15 p-0.5 rounded-full flex text-[11px] font-bold">
                <button
                  onClick={() => setLang('te')}
                  className={`px-3 py-1 rounded-full transition ${
                    lang === 'te' ? 'bg-white text-[#0B5D34] shadow-sm' : 'text-white'
                  }`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-full transition ${
                    lang === 'en' ? 'bg-white text-[#0B5D34] shadow-sm' : 'text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-black mt-1">
              {lang === 'te' ? 'నమస్కారం!' : 'Welcome!'}
            </h2>
            <p className="text-xs text-emerald-100 mt-1">
              {lang === 'te'
                ? 'మీరు ఎవరు? ఒక్కటి నొక్కి మొబైల్ OTP తో లాగిన్ అవ్వండి'
                : 'Who are you? Tap your role to login with Mobile OTP'}
            </p>
          </div>

{/* STEP A: SELECT USER ROLE */}
          {screen !== 'otp' ? (
            <div className="px-4 pt-5 pb-6 space-y-2.5">
              {roles.map((r) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    onClick={() => openRoleLogin(r)}
                    className="w-full bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-sm border border-gray-100 hover:border-[#00B251] active:scale-[0.99] transition"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${r.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-extrabold text-gray-900">
                          {lang === 'te' ? r.titleTe : r.titleEn}
                        </h3>
                        <p className="text-[11px] font-bold text-[#00B251]">
                          {lang === 'te' ? r.subTe : r.subEn}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {r.titleEn} • Mobile OTP Login
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                );
              })}

              <a
                href="tel:8328261103"
                className="w-full mt-3 bg-[#0B5D34] text-white text-xs font-extrabold py-3.5 rounded-2xl flex items-center justify-center space-x-2 shadow-md"
              >
                <Phone className="h-4 w-4" />
                <span>{lang === 'te' ? 'సహాయం కావాలా? ఫోన్ చేయండి' : 'Need Help? Call Support'}</span>
              </a>
            </div>
          ) : (
            /* STEP B: MOBILE NUMBER & OTP VERIFICATION */
            <div className="px-4 pt-6 pb-8">
              <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 space-y-4">
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => setScreen('roles')}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    <ArrowLeft className="h-4 w-4 text-gray-700" />
                  </button>
                  <div>
                    <h3 className="text-base font-black text-gray-900">
                      {lang === 'te' ? selectedRoleForLogin?.titleTe : selectedRoleForLogin?.titleEn} Login
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      {lang === 'te' ? 'మొబైల్ నంబర్ & OTP ధృవీకరణ' : 'Mobile Number & OTP Verification'}
                    </p>
                  </div>
                </div>

                {otpStep === 'phone' ? (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-700">
                      {lang === 'te' ? '10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి' : 'Enter 10-Digit Mobile Number'}
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-3 bg-gray-50 focus-within:border-[#00B251]">
                      <span className="text-xs font-extrabold text-gray-600 pr-2.5 border-r">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobileInput}
                        onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="8328261103"
                        className="w-full bg-transparent pl-3 text-sm font-bold tracking-wider focus:outline-none"
                      />
                    </div>
                    {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}
                    <button
                      onClick={handleSendOtp}
                      className="w-full bg-[#00B251] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md flex items-center justify-center space-x-1.5"
                    >
                      <Lock className="h-4 w-4" />
                      <span>{lang === 'te' ? 'OTP పంపండి' : 'Send OTP'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                      <p className="text-[11px] text-emerald-800 font-semibold">
                        {lang === 'te' ? `+91 ${mobileInput} కి OTP పంపబడింది` : `OTP sent to +91 ${mobileInput}`}
                      </p>
                      <p className="text-sm font-black text-[#00B251] mt-0.5">Demo OTP: {generatedOtp}</p>
                    </div>

                    <label className="block text-xs font-bold text-gray-700">
                      {lang === 'te' ? '4 అంకెల OTP నమోదు చేయండి' : 'Enter 4-Digit OTP'}
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-2.5 bg-gray-50">
                      <KeyRound className="h-4 w-4 text-[#00B251] mr-2" />
                      <input
                        type="tel"
                        maxLength={4}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="• • • •"
                        className="w-full bg-transparent text-center text-base font-black tracking-[0.5em] focus:outline-none"
                      />
                    </div>
                    {authError && <p className="text-xs font-bold text-red-500">{authError}</p>}

                    <button
                      onClick={handleVerifyOtp}
                      className="w-full bg-[#00B251] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md"
                    >
                      {lang === 'te' ? 'OTP నిర్ధారించి లోపలికి వెళ్ళండి' : 'Verify OTP & Enter App'}
                    </button>
                    <button
                      onClick={() => setOtpStep('phone')}
                      className="w-full text-[11px] font-bold text-gray-500 underline"
                    >
                      {lang === 'te' ? 'మొబైల్ నంబర్ మార్చండి' : 'Change Mobile Number'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // GATE 2: LOGGED-IN MAIN APPLICATION (MENU + ROLE PORTALS)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F6FBF8] max-w-md mx-auto relative pb-28 font-sans text-gray-800 shadow-xl">
      {/* TOP BRIGHT GREEN HEADER WITH LOGO & LOGOUT */}
      <header className="bg-[#00B251] text-white rounded-b-[28px] px-4 pt-4 pb-5 shadow-md sticky top-0 z-30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="h-11 w-11 rounded-full bg-white p-0.5 shadow-md overflow-hidden flex-shrink-0 border-2 border-yellow-300">
              <img src="/icon-512.png" alt="Rythu Basket Logo" className="h-full w-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-base font-extrabold leading-tight">
                {lang === 'te' ? 'రైతు బాస్కెట్' : 'Rythu Basket'}
              </h1>
              <div className="flex items-center text-[11px] text-emerald-100 font-medium">
                <MapPin className="h-3 w-3 mr-0.5 text-yellow-300" />
                <span>
                  {lang === 'te' ? loggedInUser.role.titleTe : loggedInUser.role.titleEn} • {loggedInUser.mobile}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <div className="bg-[#008F41] p-0.5 rounded-full flex text-[11px] font-bold">
              <button
                onClick={() => setLang('te')}
                className={`px-2 py-1 rounded-full transition ${
                  lang === 'te' ? 'bg-white text-[#00B251] shadow-sm' : 'text-white'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-full transition ${
                  lang === 'en' ? 'bg-white text-[#00B251] shadow-sm' : 'text-white'
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30"
              title="Switch Role / Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
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

{/* LIVE SHOP NOTIFICATION BANNER */}
      {alertBanner && (
        <div className="mx-4 mt-3 bg-amber-50 border border-amber-300 rounded-2xl p-3 flex items-start justify-between shadow-sm">
          <div className="flex items-start space-x-2">
            <Bell className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] font-extrabold text-amber-900 leading-snug">{alertBanner}</p>
          </div>
          <button onClick={() => setAlertBanner('')} className="text-xs font-bold text-amber-700 ml-2">
            ✕
          </button>
        </div>
      )}

      {/* DIGITAL INVOICE + WHATSAPP SHARE MODAL */}
      {latestInvoice && (
        <div className="mx-4 mt-3 bg-white border-2 border-[#00B251] rounded-2xl p-4 shadow-lg space-y-2.5">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center space-x-1.5 text-[#00B251]">
              <FileText className="h-4 w-4" />
              <span className="text-xs font-black">DIGITAL INVOICE ({latestInvoice.invNo})</span>
            </div>
            <button onClick={() => setLatestInvoice(null)} className="text-xs font-bold text-gray-400">
              Close ✕
            </button>
          </div>

          <div className="text-[11px] space-y-1 text-gray-700">
            <p><strong>Order ID:</strong> {latestInvoice.ordId} • {latestInvoice.date}</p>
            <p><strong>Type:</strong> {latestInvoice.type}</p>
            <p><strong>Buyer:</strong> {latestInvoice.buyer}</p>
            <p><strong>Items:</strong> {latestInvoice.summary}</p>
            <p><strong>Payment:</strong> <span className="text-[#00B251] font-bold">{latestInvoice.payment}</span></p>
            <p className="text-sm font-black text-gray-900 pt-1">Grand Total: ₹{latestInvoice.amount}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={buildWhatsAppUrl(latestInvoice)}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white text-xs font-extrabold py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Send on WhatsApp</span>
            </a>
            <button
              onClick={() => window.print()}
              className="bg-gray-100 text-gray-800 text-xs font-extrabold py-2.5 px-3 rounded-xl"
            >
              🖨️ Print / Save PDF
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 1: HOME (CUSTOMER STOREFRONT) */}
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

          {/* OFFER BANNER */}
          <section className="bg-[#DCF7E6] rounded-2xl p-4 flex items-center justify-between border border-[#B8ECCC]">
            <div className="max-w-[63%]">
              <span className="inline-block bg-[#00B251] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md mb-1">
                FARM DIRECT • NELLORE
              </span>
              <h3 className="text-base font-black text-[#008F41] leading-tight">
                {lang === 'te' ? `${bannerDiscount}% తగ్గింపు!` : `${bannerDiscount}% Off Today`}
              </h3>
              <p className="text-[11px] text-gray-600 mt-1">
                {lang === 'te'
                  ? `₹${freeDeliveryMin} పైన ఆర్డర్లకు ఉచిత డెలివరీ`
                  : `Free delivery on orders above ₹${freeDeliveryMin}`}
              </p>
              <button
                onClick={handleLogout}
                className="mt-2.5 bg-[#00B251] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm"
              >
                {lang === 'te' ? 'రోల్ మార్చండి (Switch Role)' : 'Switch Role'}
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

      {/* SCREEN 3: CART, GPS PIN, UPI QR & DIGITAL INVOICE */}
      {screen === 'cart' && (
        <main className="px-4 pt-4 space-y-3.5">
          <div className="flex items-center space-x-2">
            <button onClick={() => setScreen('home')} className="p-1.5 bg-white rounded-full shadow-sm">
              <ArrowLeft className="h-4 w-4 text-gray-700" />
            </button>
            <h2 className="text-base font-extrabold text-gray-900">
              {lang === 'te' ? 'మీ బాస్కెట్ & బిల్లింగ్' : 'My Basket & Billing'}
            </h2>
          </div>

          {totalItems === 0 ? (
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

              {/* GPS Address */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-gray-900 flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-[#00B251]" />
                    <span>Delivery Location & GPS Pin</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCaptureGps}
                    className="bg-emerald-50 text-[#00B251] border border-emerald-200 text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center space-x-1"
                  >
                    <LocateFixed className="h-3 w-3" />
                    <span>Pin GPS</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                />
                <p className="text-[10px] font-bold text-emerald-700">
                  {gpsStatus || `Coords: ${gpsCoords.lat}, ${gpsCoords.lng}`}
                </p>
              </div>

              {/* UPI QR + COD */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold border ${
                      paymentMethod === 'upi'
                        ? 'bg-emerald-50 border-[#00B251] text-[#00B251]'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    UPI / QR Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold border ${
                      paymentMethod === 'cod'
                        ? 'bg-emerald-50 border-[#00B251] text-[#00B251]'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-center space-y-2">
                    <img src={freeQrImageUrl} alt="UPI QR" className="w-28 h-28 mx-auto rounded-xl bg-white p-1 border" />
                    <a
                      href={upiDeepLink}
                      className="block w-full bg-[#5F259F] text-white text-xs font-extrabold py-2 rounded-xl"
                    >
                      Pay ₹{grandTotal} via PhonePe / GPay ↗
                    </a>
                    <input
                      type="text"
                      value={upiRefInput}
                      onChange={(e) => setUpiRefInput(e.target.value)}
                      placeholder="Enter 12-digit UPI UTR / Ref ID"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-[11px] font-bold text-center"
                    />
                  </div>
                )}

                <div className="border-t pt-2 flex justify-between text-sm font-black text-gray-900">
                  <span>Grand Total (incl. Delivery ₹{deliveryFee})</span>
                  <span>₹{grandTotal}</span>
                </div>

                <button
                  onClick={handleCustomerCheckout}
                  className="w-full bg-[#00B251] text-white font-extrabold py-3 rounded-xl shadow-md"
                >
                  Confirm Order & Generate Invoice • ₹{grandTotal}
                </button>
              </div>
            </>
          )}
        </main>
      )}

      {/* =========================================================
          1. FARMER MODULE
         ========================================================= */}
      {screen === 'farmerPanel' && (
        <main className="px-4 pt-4 space-y-3.5">
          <div className="bg-[#0B5D34] text-white rounded-2xl p-4 shadow-sm">
            <span className="bg-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded">FARMER PORTAL</span>
            <h2 className="text-base font-black mt-1">రైతు విక్రయ & మండి కేంద్రం</h2>
            <p className="text-[11px] text-emerald-100">+91 {loggedInUser.mobile} • Nellore</p>
          </div>

          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {[
              { id: 'sell', label: '🌾 Sell & Alert Shops' },
              { id: 'mandi', label: '📈 Today Mandi Rates' },
              { id: 'orders', label: '🤝 Shop Orders & Bargain' },
              { id: 'earnings', label: '💰 My Earnings' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFarmerTab(t.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-extrabold border ${
                  farmerTab === t.id ? 'bg-[#00B251] text-white border-[#00B251]' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {farmerTab === 'sell' && (
            <form onSubmit={handleFarmerPublishLot} className="bg-white rounded-2xl p-4 shadow-sm space-y-3 border border-gray-100">
              <h3 className="text-xs font-extrabold text-gray-900">
                Post Harvest Lot (పోస్ట్ చేయగానే సమీప షాపులకు నోటిఫికేషన్ వెళ్తుంది)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={fNameEn}
                  onChange={(e) => setFNameEn(e.target.value)}
                  placeholder="Crop Name (e.g., Tomato)"
                  className="bg-gray-50 border rounded-xl px-3 py-2 text-xs font-semibold"
                />
                <input
                  type="text"
                  value={fNameTe}
                  onChange={(e) => setFNameTe(e.target.value)}
                  placeholder="పేరు (ఉదా: టమాటా)"
                  className="bg-gray-50 border rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <select value={fCat} onChange={(e) => setFCat(e.target.value)} className="bg-gray-50 border rounded-xl px-2 py-2 text-xs font-bold">
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="dairy">Milk & Dairy</option>
                  <option value="livestock">Poultry/Goats</option>
                </select>
                <input
                  type="number"
                  required
                  value={fQtyKg}
                  onChange={(e) => setFQtyKg(e.target.value)}
                  placeholder="Qty (KG)"
                  className="bg-gray-50 border rounded-xl px-2.5 py-2 text-xs font-bold"
                />
                <input
                  type="number"
                  required
                  value={fPrice}
                  onChange={(e) => setFPrice(e.target.value)}
                  placeholder="₹ / KG"
                  className="bg-gray-50 border rounded-xl px-2.5 py-2 text-xs font-black text-[#00B251]"
                />
              </div>

              <label className="flex items-center space-x-2 text-xs font-bold text-gray-700">
                <input type="checkbox" checked={fPickup} onChange={(e) => setFPickup(e.target.checked)} className="accent-[#00B251]" />
                <span>🚜 Request Farm Gate Pickup (పొలం దగ్గర నుండి పికప్ కావాలి)</span>
              </label>

              <button type="submit" className="w-full bg-[#00B251] text-white font-extrabold text-xs py-3 rounded-xl shadow-md">
                🔔 Post Stock & Notify Nearby Shops
              </button>
            </form>
          )}

          {farmerTab === 'mandi' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2 text-xs">
              <h3 className="font-extrabold text-gray-900">Today's Nellore Mandi Wholesale Rates (Per KG)</h3>
              {[
                { crop: 'Tomato (టమాటా)', min: 20, max: 24 },
                { crop: 'Onion (ఉల్లిపాయ)', min: 21, max: 25 },
                { crop: 'Potato (బంగాళాదుంప)', min: 22, max: 26 },
                { crop: 'Banganapalli Mango (మామిడి)', min: 85, max: 105 },
                { crop: 'Country Chicken (నాటు కోడి)', min: 340, max: 380 },
              ].map((m, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b last:border-0">
                  <span className="font-bold text-gray-800">{m.crop}</span>
                  <span className="font-black text-[#00B251]">₹{m.min} – ₹{m.max} / kg</span>
                </div>
              ))}
            </div>
          )}

          {farmerTab === 'orders' && (
            <div className="space-y-2.5">
              {negotiations.map((neg) => (
                <div key={neg.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-800 flex items-center space-x-1">
                      <Handshake className="h-4 w-4" />
                      <span>Price Negotiation • {neg.buyer}</span>
                    </span>
                    <span className="text-[10px] font-bold bg-amber-50 px-2 py-0.5 rounded">{neg.status}</span>
                  </div>
                  <p className="text-xs font-bold">{neg.item}: Your Price ₹{neg.farmerAsk}/kg → Shop Offer ₹{neg.buyerOffer}/kg</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        setNegotiations((prev) =>
                          prev.map((n) => (n.id === neg.id ? { ...n, status: 'Accepted @ ₹' + n.buyerOffer } : n))
                        )
                      }
                      className="flex-1 bg-[#00B251] text-white text-xs font-bold py-2 rounded-xl"
                    >
                      Accept ₹{neg.buyerOffer}/kg
                    </button>
                    <button
                      onClick={() =>
                        setNegotiations((prev) =>
                          prev.map((n) => (n.id === neg.id ? { ...n, status: 'Countered @ ₹' + (n.buyerOffer + 1) } : n))
                        )
                      }
                      className="flex-1 bg-gray-100 text-gray-800 text-xs font-bold py-2 rounded-xl"
                    >
                      Counter ₹{neg.buyerOffer + 1}/kg
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {farmerTab === 'earnings' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold">Total Harvest Earnings</span>
                <span className="text-lg font-black text-[#00B251]">₹24,850</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold">UPI Settled</span>
                <span className="font-extrabold text-gray-900">₹22,650 (Completed)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold">Pending Payout</span>
                <span className="font-extrabold text-amber-600">₹2,200 (Processing)</span>
              </div>
            </div>
          )}
        </main>
      )}

{/* =========================================================
          2. RETAIL SHOPKEEPER MODULE
         ========================================================= */}
      {screen === 'retailPanel' && (
        <main className="px-4 pt-4 space-y-3.5">
          <div className="bg-amber-700 text-white rounded-2xl p-4 shadow-sm">
            <span className="bg-amber-900/50 text-[10px] font-extrabold px-2 py-0.5 rounded">RETAIL SHOPKEEPER</span>
            <h2 className="text-base font-black mt-1">కిరాణా & కూరగాయల షాపు కొనుగోలు</h2>
            <p className="text-[11px] text-amber-100">Compare Farmers vs Wholesale & Nearby Shop-to-Shop</p>
          </div>

          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {[
              { id: 'compare', label: '⚖️ Farmer vs Wholesale' },
              { id: 'nearby', label: '🏪 Nearby Shops (Shop-to-Shop)' },
              { id: 'orders', label: '🧾 My Invoices' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setRetailTab(t.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-extrabold border ${
                  retailTab === t.id ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {retailTab === 'compare' && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-2">
                <label className="block text-xs font-extrabold text-gray-800">
                  Select Commodity to Compare Suppliers (ఉదా: 100 KG Onion):
                </label>
                <div className="flex space-x-2">
                  {['Onion', 'Tomato', 'Potato'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setRetailCompareItem(c)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        retailCompareItem === c ? 'bg-[#00B251] text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {farmerLots
                .filter((f) => f.item.toLowerCase().includes(retailCompareItem.toLowerCase()))
                .map((f) => (
                  <div key={f.id} className="bg-white rounded-2xl p-3.5 shadow-sm border-l-4 border-[#00B251] space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-extrabold bg-emerald-50 text-[#00B251] px-2 py-0.5 rounded">
                          A. Direct Farmer
                        </span>
                        <h4 className="text-xs font-black text-gray-900 mt-1">{f.farmer}</h4>
                        <p className="text-[11px] text-gray-500">
                          {f.item} • Available: {f.qtyKg} KG (Min: {f.minOrderKg} KG)
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-[#00B251]">₹{f.pricePerKg}/kg</span>
                        <p className="text-[10px] text-gray-400">100 KG = ₹{f.pricePerKg * 100}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          createInvoiceAndOrder({
                            type: 'Retail → Farmer Direct',
                            buyerLabel: `Retail Shop (${loggedInUser.mobile})`,
                            summary: `100 KG ${f.item} from ${f.farmer}`,
                            amount: f.pricePerKg * 100,
                            paymentStr: 'UPI / Bank Settlement',
                            sellerMobile: f.mobile,
                          })
                        }
                        className="flex-1 bg-[#00B251] text-white text-xs font-extrabold py-2 rounded-xl"
                      >
                        Order 100 KG + Invoice
                      </button>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Kovur+Nellore"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-2 rounded-xl flex items-center"
                      >
                        <MapPin className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ))}

              {wholesaleStock
                .filter((w) => w.item.toLowerCase().includes(retailCompareItem.toLowerCase()))
                .map((w) => (
                  <div key={w.id} className="bg-white rounded-2xl p-3.5 shadow-sm border-l-4 border-indigo-600 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                          B. Wholesale Shop • {w.distance}
                        </span>
                        <h4 className="text-xs font-black text-gray-900 mt-1">{w.shop}</h4>
                        <p className="text-[11px] text-gray-500">
                          {w.item} • Stock: {w.excessKg} KG (Min: {w.minKg} KG)
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-indigo-700">₹{w.regularPrice}/kg</span>
                        <p className="text-[10px] text-emerald-700 font-bold">Excess Deal: ₹{w.excessPrice}/kg</p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        createInvoiceAndOrder({
                          type: 'Retail → Wholesale Bulk',
                          buyerLabel: `Retail Shop (${loggedInUser.mobile})`,
                          summary: `100 KG ${w.item} from ${w.shop}`,
                          amount: w.regularPrice * 100,
                          paymentStr: 'UPI / Shop-to-Shop Delivery',
                          sellerMobile: w.mobile,
                        })
                      }
                      className="w-full bg-indigo-700 text-white text-xs font-extrabold py-2 rounded-xl"
                    >
                      Buy 100 KG from Wholesale + WhatsApp Bill
                    </button>
                  </div>
                ))}
            </div>
          )}

          {retailTab === 'nearby' && (
            <div className="space-y-2.5">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs font-bold text-amber-900 flex items-center space-x-2">
                <ArrowLeftRight className="h-4 w-4 text-amber-700 flex-shrink-0" />
                <span>Nearby Shops Trading: మీ షాపులో స్టాక్ అయిపోతే పక్క షాపు నుండి వెంటనే కొనండి!</span>
              </div>

              {nearbyShops.map((ns) => (
                <div key={ns.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-extrabold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                        {ns.type} • {ns.distance}
                      </span>
                      <h4 className="text-xs font-black text-gray-900 mt-1">{ns.shopName}</h4>
                      <p className="text-[11px] font-bold text-[#00B251]">{ns.item} • {ns.availKg} KG Available</p>
                      <p className="text-[10px] text-gray-400">Delivery: {ns.delivery}</p>
                    </div>
                    <span className="text-sm font-black text-gray-900">₹{ns.pricePerKg}/kg</span>
                  </div>

                  <button
                    onClick={() =>
                      createInvoiceAndOrder({
                        type: 'Shop-to-Shop Trade',
                        buyerLabel: `Retail Shop (${loggedInUser.mobile})`,
                        summary: `25 KG ${ns.item} from ${ns.shopName}`,
                        amount: ns.pricePerKg * 25,
                        paymentStr: 'UPI Instant Transfer',
                        sellerMobile: ns.mobile,
                      })
                    }
                    className="w-full bg-[#00B251] text-white text-xs font-extrabold py-2 rounded-xl"
                  >
                    Buy 25 KG Now + Send WhatsApp Invoice
                  </button>
                </div>
              ))}
            </div>
          )}

          {retailTab === 'orders' && (
            <div className="space-y-2">
              {orders.map((o) => (
                <div key={o.id} className="bg-white rounded-2xl p-3 shadow-sm text-xs flex justify-between items-center">
                  <div>
                    <p className="font-black text-gray-900">{o.id} • {o.summary}</p>
                    <p className="text-[10px] text-gray-500">{o.type} • {o.payment}</p>
                  </div>
                  <span className="font-black text-[#00B251]">₹{o.total}</span>
                </div>
              ))}
            </div>
          )}
        </main>
      )}
{/* =========================================================
          3. WHOLESALE SHOPKEEPER MODULE
         ========================================================= */}
      {screen === 'wholesalePanel' && (
        <main className="px-4 pt-4 space-y-3.5">
          <div className="bg-indigo-900 text-white rounded-2xl p-4 shadow-sm">
            <span className="bg-indigo-700 text-[10px] font-extrabold px-2 py-0.5 rounded">WHOLESALE MANDI PORTAL</span>
            <h2 className="text-base font-black mt-1">హోల్‌సేల్ వ్యాపారి & Excess Stock</h2>
            <p className="text-[11px] text-indigo-200">Manage Bulk Stock & Clear Unsold Inventory</p>
          </div>

          <div className="flex space-x-1.5 overflow-x-auto pb-1">
            {[
              { id: 'excess', label: '🔥 Sell Excess Stock' },
              { id: 'inventory', label: '📦 Wholesale Inventory' },
              { id: 'orders', label: '📋 Retail Orders' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setWholesaleTab(t.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-extrabold border ${
                  wholesaleTab === t.id ? 'bg-indigo-800 text-white border-indigo-800' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {wholesaleTab === 'excess' && (
            <form onSubmit={handleAddWholesaleExcess} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
              <div className="flex items-center space-x-1.5 text-amber-700 text-xs font-black">
                <AlertTriangle className="h-4 w-4" />
                <span>Sell Excess Stock (మిగిలిన స్టాక్ తక్కువ ధరకు ఇతర షాపులకు అమ్మండి)</span>
              </div>

              <input
                type="text"
                required
                value={wItem}
                onChange={(e) => setWItem(e.target.value)}
                placeholder="Item Name (e.g., Potato / బంగాళాదుంప)"
                className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-xs font-bold"
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-500">Total Stock (KG)</label>
                  <input type="number" value={wTotalKg} onChange={(e) => setWTotalKg(e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-1.5 text-xs font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500">Already Sold (KG)</label>
                  <input type="number" value={wSoldKg} onChange={(e) => setWSoldKg(e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-1.5 text-xs font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-500">Regular Price (₹/kg)</label>
                  <input type="number" value={wRegPrice} onChange={(e) => setWRegPrice(e.target.value)} className="w-full bg-gray-50 border rounded-xl px-3 py-1.5 text-xs font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-emerald-700">Excess Clearance Price (₹/kg)</label>
                  <input type="number" value={wExcessPrice} onChange={(e) => setWExcessPrice(e.target.value)} className="w-full bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-1.5 text-xs font-black text-[#00B251]" />
                </div>
              </div>

              <button type="submit" className="w-full bg-indigo-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md">
                Publish {Math.max(0, Number(wTotalKg) - Number(wSoldKg))} KG Excess Deal to Nearby Shops
              </button>
            </form>
          )}

          {wholesaleTab === 'inventory' && (
            <div className="space-y-2.5">
              {wholesaleStock.map((ws) => (
                <div key={ws.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 text-xs space-y-1">
                  <div className="flex justify-between font-black">
                    <span>{ws.item}</span>
                    <span className="text-[#00B251]">Excess: {ws.excessKg} KG @ ₹{ws.excessPrice}/kg</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Total: {ws.totalKg} KG • Sold: {ws.soldKg} KG • Regular: ₹{ws.regularPrice}/kg
                  </p>
                </div>
              ))}
            </div>
          )}

          {wholesaleTab === 'orders' && (
            <div className="space-y-2">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3 shadow-sm text-xs space-y-1.5">
                  <div className="flex justify-between font-black">
                    <span>{ord.id} • {ord.type}</span>
                    <span className="text-[#00B251]">₹{ord.total}</span>
                  </div>
                  <p className="text-[11px] text-gray-600">{ord.summary}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setOrders((p) => p.map((x) => (x.id === ord.id ? { ...x, status: 'Accepted' } : x)))}
                      className="bg-[#00B251] text-white px-3 py-1 rounded-lg font-bold"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => setOrders((p) => p.map((x) => (x.id === ord.id ? { ...x, status: 'Rejected' } : x)))}
                      className="bg-red-50 text-red-600 px-3 py-1 rounded-lg font-bold"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* =========================================================
          4. MASTER ADMIN PANEL
         ========================================================= */}
      {screen === 'adminPanel' && (
        <main className="px-4 pt-4 space-y-3.5">
          <div className="bg-purple-900 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
            <div>
              <span className="bg-purple-700 text-[10px] font-extrabold px-2 py-0.5 rounded">MASTER ADMIN</span>
              <h2 className="text-base font-black mt-1">రైతు బాస్కెట్ అడ్మిన్</h2>
              <p className="text-[11px] text-purple-200">UPI: {merchantUpiId}</p>
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
              { id: 'settings', label: '⚙️ UPI & Rules' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setAdminTab(t.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-extrabold border ${
                  adminTab === t.id ? 'bg-purple-800 text-white border-purple-800' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {adminTab === 'overview' && (
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white p-3.5 rounded-2xl shadow-sm">
                <p className="text-[11px] text-gray-400 font-bold">Total GMV / Sales</p>
                <p className="text-xl font-black text-[#00B251] mt-1">₹{totalRevenue}</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl shadow-sm">
                <p className="text-[11px] text-gray-400 font-bold">Total Orders</p>
                <p className="text-xl font-black text-purple-700 mt-1">{orders.length}</p>
              </div>
            </div>
          )}

          {adminTab === 'products' && (
            <div className="space-y-2">
              <input
                type="text"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="Search item to edit price..."
                className="w-full bg-white border rounded-xl px-3 py-2 text-xs"
              />
              {adminFilteredProducts.slice(0, 20).map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold">{item.nameTe} ({item.nameEn})</h4>
                    {editingPriceId === item.id ? (
                      <div className="flex items-center space-x-1 mt-1">
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(e.target.value)}
                          className="w-20 border rounded px-2 py-0.5 text-xs font-black"
                        />
                        <button
                          onClick={() => {
                            setProducts((p) => p.map((x) => (x.id === item.id ? { ...x, price: Number(tempPrice) } : x)));
                            setEditingPriceId(null);
                          }}
                          className="bg-[#00B251] text-white p-1 rounded"
                        >
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
                  <button
                    onClick={() => setProducts((p) => p.filter((x) => x.id !== item.id))}
                    className="p-1.5 bg-red-50 text-red-600 rounded-lg"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

{adminTab === 'orders' && (
            <div className="space-y-2.5">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-1.5 text-xs">
                  <div className="flex justify-between font-black">
                    <span>{ord.id} ({ord.type})</span>
                    <span className="text-[#00B251]">₹{ord.total}</span>
                  </div>
                  <p className="text-[11px] text-gray-600">{ord.summary}</p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${ord.lat},${ord.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-blue-600 font-bold underline"
                  >
                    <Navigation className="h-3 w-3" />
                    <span>Open Google Maps Route</span>
                  </a>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'settings' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Merchant UPI ID</label>
                <input
                  type="text"
                  value={merchantUpiId}
                  onChange={(e) => setMerchantUpiId(e.target.value)}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-black text-purple-800"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Free Delivery Above (₹)</label>
                <input
                  type="number"
                  value={freeDeliveryMin}
                  onChange={(e) => setFreeDeliveryMin(Number(e.target.value))}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-black"
                />
              </div>
            </div>
          )}
        </main>
      )}

      {/* =========================================================
          5. DELIVERY PARTNER DASHBOARD
         ========================================================= */}
      {screen === 'roleDashboard' && (
        <main className="px-4 pt-4 space-y-3">
          <div className="bg-blue-900 text-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-base font-black">Delivery Partner Dashboard</h2>
            <p className="text-xs text-blue-200">+91 {loggedInUser.mobile} • Nellore Fleet</p>
          </div>
          {orders.map((ord) => (
            <div key={ord.id} className="bg-white rounded-2xl p-3.5 shadow-sm space-y-2 text-xs">
              <div className="flex justify-between font-black">
                <span>{ord.id} • {ord.status}</span>
                <span className="text-[#00B251]">₹{ord.total}</span>
              </div>
              <p className="text-[11px] text-gray-600">{ord.customer} — {ord.summary}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${ord.lat},${ord.lng}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-blue-600 text-white font-extrabold py-2 rounded-xl flex items-center justify-center space-x-1.5"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Navigate in Google Maps</span>
              </a>
            </div>
          ))}
        </main>
      )}

      {/* BOTTOM GREEN NAVIGATION BAR WITH FLOATING WHITE CART */}
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
          onClick={() => {
            const r = loggedInUser?.role?.id;
            if (r === 'farmer') setScreen('farmerPanel');
            else if (r === 'retail') setScreen('retailPanel');
            else if (r === 'wholesale') setScreen('wholesalePanel');
            else if (r === 'admin') setScreen('adminPanel');
            else if (r === 'delivery') setScreen('roleDashboard');
            else setScreen('cart');
          }}
          className="flex flex-col items-center space-y-0.5 text-emerald-100/80"
        >
          <ClipboardList className="h-5 w-5" />
          <span className="text-[10px]">{loggedInUser.role.titleEn.split(' ')[0]}</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center space-y-0.5 text-emerald-100/80"
        >
          <User className="h-5 w-5" />
          <span className="text-[10px]">{lang === 'te' ? 'రోల్ మార్చు' : 'Switch'}</span>
        </button>
      </nav>
    </div>
  );
}