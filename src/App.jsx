mport React, { useEffect, useMemo, useState } from "react";
import {
  ShoppingBasket, Sprout, Store, Truck, ShieldCheck, Search, Plus,
  Minus, Trash2, LogOut, UserPlus, LogIn, Package, Languages,
  ShoppingCart, ClipboardList, CheckCircle2, Menu, X
} from "lucide-react";
import "./App.css";

const STORAGE_KEY = "rythu_market_v2";
const roles = [
  { id: "customer", label: "Customer", te: "వినియోగదారుడు", icon: ShoppingBasket },
  { id: "farmer", label: "Farmer", te: "రైతు", icon: Sprout },
  { id: "shopkeeper", label: "Shopkeeper", te: "దుకాణదారుడు", icon: Store },
  { id: "delivery", label: "Delivery", te: "డెలివరీ", icon: Truck },
  { id: "admin", label: "Admin", te: "అడ్మిన్", icon: ShieldCheck },
];

const seedProducts = [
  { id: "p1", name: "Tomatoes", te: "టమోటాలు", category: "Vegetables", price: 32, unit: "kg", stock: 100, farmer: "Ramaiah", area: "Kovur" },
  { id: "p2", name: "Onions", te: "ఉల్లిపాయలు", category: "Vegetables", price: 38, unit: "kg", stock: 80, farmer: "Ramaiah", area: "Kovur" },
  { id: "p3", name: "Banganapalli Mangoes", te: "బంగినపల్లి మామిడి", category: "Fruits", price: 90, unit: "kg", stock: 45, farmer: "Subba Reddy", area: "Buchireddypalem" },
  { id: "p4", name: "Rice", te: "బియ్యం", category: "Groceries", price: 58, unit: "kg", stock: 120, farmer: "Venkateswarlu", area: "Nellore" },
  { id: "p5", name: "Okra", te: "బెండకాయ", category: "Vegetables", price: 42, unit: "kg", stock: 55, farmer: "Lakshmi", area: "Podalakur" },
  { id: "p6", name: "Spinach", te: "పాలకూర", category: "Leafy Greens", price: 20, unit: "bunch", stock: 35, farmer: "Lakshmi", area: "Podalakur" },
];

const initialData = {
  users: [],
  products: seedProducts,
  orders: [],
};

function readData() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (value && Array.isArray(value.users) && Array.isArray(value.products) && Array.isArray(value.orders)) return value;
  } catch { /* use defaults */ }
  return initialData;
}

export default function App() {
  const [data, setData] = useState(readData);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`${STORAGE_KEY}_session`)); } catch { return null; }
  });
  const [language, setLanguage] = useState("en");
  const [authTab, setAuthTab] = useState("login");
  const [role, setRole] = useState("customer");
  const [form, setForm] = useState({ name: "", contact: "", password: "", area: "Nellore" });
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [page, setPage] = useState("home");
  const [productForm, setProductForm] = useState({ name: "", te: "", category: "Vegetables", price: "", stock: "", unit: "kg" });
  const [mobileMenu, setMobileMenu] = useState(false);

  const te = language === "te";
  const words = {
    title: te ? "రైతు మార్కెట్" : "Rythu Market",
    tagline: te ? "రైతు నుండి నేరుగా మీ ఇంటికి" : "Fresh produce, directly from local farmers",
    login: te ? "లాగిన్" : "Login",
    register: te ? "ఖాతా సృష్టించండి" : "Create account",
    logout: te ? "లాగౌట్" : "Logout",
    home: te ? "మార్కెట్" : "Market",
    orders: te ? "నా ఆర్డర్లు" : "My orders",
    products: te ? "నా ఉత్పత్తులు" : "My products",
    add: te ? "కార్ట్‌లో వేయండి" : "Add to cart",
    cart: te ? "కార్ట్" : "Cart",
    place: te ? "ఆర్డర్ చేయండి" : "Place order",
    search: te ? "ఉత్పత్తుల కోసం వెతకండి..." : "Search products...",
    name: te ? "పేరు" : "Full name",
    contact: te ? "మొబైల్ లేదా ఈమెయిల్" : "Mobile number or email",
    password: te ? "పాస్‌వర్డ్" : "Password",
    area: te ? "ప్రాంతం" : "Village / Area",
  };
useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);
  useEffect(() => {
    if (user) localStorage.setItem(`${STORAGE_KEY}_session`, JSON.stringify(user));
    else localStorage.removeItem(`${STORAGE_KEY}_session`);
  }, [user]);

  const visibleProducts = useMemo(() => data.products.filter(p => {
    const term = query.trim().toLowerCase();
    const matchesText = !term || p.name.toLowerCase().includes(term) || (p.te || "").includes(query) || p.area.toLowerCase().includes(term);
    return matchesText && (category === "All" || p.category === category);
  }), [data.products, query, category]);

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = data.products.find(p => p.id === id);
    return product ? { ...product, qty, lineTotal: product.price * qty } : null;
  }).filter(Boolean);
  const subtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  function updateForm(key, value) { setForm(current => ({ ...current, [key]: value })); }
  function authenticate(event) {
    event.preventDefault();
    setError("");
    const contact = form.contact.trim().toLowerCase();
    if (!contact || !form.password.trim()) { setError("Enter your mobile/email and password."); return; }
    if (authTab === "register") {
      if (!form.name.trim()) { setError("Enter your name."); return; }
      if (role === "admin") { setError("Admin accounts cannot be self-registered."); return; }
      if (data.users.some(u => u.contact.toLowerCase() === contact && u.role === role)) {
        setError("An account with these details already exists for this role."); return;
      }
      const created = { id: crypto.randomUUID(), name: form.name.trim(), contact, password: form.password, role, area: form.area, status: role === "customer" ? "approved" : "pending" };
      setData(current => ({ ...current, users: [...current.users, created] }));
      if (created.status === "pending") { setError("Registration submitted. Please wait for admin approval."); setAuthTab("login"); return; }
      setUser(created);
      return;
    }
    const found = data.users.find(u => u.role === role && u.contact.toLowerCase() === contact && u.password === form.password);
    if (!found) { setError("Account not found or password is incorrect. Please register first."); return; }
    if (found.status !== "approved") { setError("Your account is awaiting admin approval."); return; }
    setUser(found);
    setPage("home");
  }
function logout() { setUser(null); setCart({}); setPage("home"); setForm({ name: "", contact: "", password: "", area: "Nellore" }); }
  function changeQty(id, amount) {
    setCart(current => {
      const next = { ...current };
      const qty = (next[id] || 0) + amount;
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, data.products.find(p => p.id === id)?.stock || qty);
      return next;
    });
  }
  function addProduct(event) {
    event.preventDefault();
    const price = Number(productForm.price), stock = Number(productForm.stock);
    if (!productForm.name.trim() || !Number.isFinite(price) || price <= 0 || !Number.isInteger(stock) || stock <= 0) return;
    setData(current => ({ ...current, products: [{
      ...productForm, id: crypto.randomUUID(), price, stock,
      farmer: user.name, area: user.area, createdBy: user.id
    }, ...current.products] }));
    setProductForm({ name: "", te: "", category: "Vegetables", price: "", stock: "", unit: "kg" });
    setPage("products");
  }
  function placeOrder() {
    if (!cartItems.length) return;
    const order = {
      id: `RM-${Date.now().toString().slice(-8)}`, customerId: user.id,
      customer: user.name, area: user.area, items: cartItems.map(({ id, name, qty, price }) => ({ id, name, qty, price })),
      total: subtotal, status: "Order placed", createdAt: new Date().toISOString()
    };
    setData(current => ({
      ...current,
      orders: [order, ...current.orders],
      products: current.products.map(p => {
        const line = cartItems.find(item => item.id === p.id);
        return line ? { ...p, stock: Math.max(0, p.stock - line.qty) } : p;
      })
    }));
    setCart({});
    setPage("orders");
  }

  const myOrders = data.orders.filter(o => user && (user.role === "admin" || o.customerId === user.id));
  const myProducts = data.products.filter(p => p.createdBy === user?.id);
  const pendingUsers = data.users.filter(u => u.status === "pending");

  if (!user) return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="brand-mark"><Sprout size={34} /></div>
        <h1>{words.title}</h1><p className="muted">{words.tagline}</p>
        <button className="language-toggle" onClick={() => setLanguage(te ? "en" : "te")}><Languages size={16}/>{te ? "English" : "తెలుగు"}</button>
        <div className="role-grid">
          {roles.filter(r => r.id !== "admin").map(r => <button key={r.id} className={role === r.id ? "role active" : "role"} onClick={() => { setRole(r.id); setError(""); }}>
            <r.icon size={19}/><span>{te ? r.te : r.label}</span>
          </button>)}
        </div>
        <div className="auth-tabs">
          <button className={authTab === "login" ? "selected" : ""} onClick={() => { setAuthTab("login"); setError(""); }}>{words.login}</button>
          <button className={authTab === "register" ? "selected" : ""} onClick={() => { setAuthTab("register"); setError(""); }}>{words.register}</button>
        </div>
        <form onSubmit={authenticate} className="stack">
          {authTab === "register" && <label>{words.name}<input value={form.name} onChange={e => updateForm("name", e.target.value)} required /></label>}
          <label>{words.contact}<input value={form.contact} onChange={e => updateForm("contact", e.target.value)} autoComplete="username" required /></label>
          <label>{words.password}<input type="password" value={form.password} onChange={e => updateForm("password", e.target.value)} autoComplete={authTab === "login" ? "current-password" : "new-password"} minLength={6} required /></label>
          {authTab === "register" && <label>{words.area}<input value={form.area} onChange={e => updateForm("area", e.target.value)} required /></label>}
          {error && <p className="error">{error}</p>}
          <button className="primary full" type="submit">{authTab === "login" ? <LogIn size={18}/> : <UserPlus size={18}/>} {authTab === "login" ? words.login : words.register}</button>
        </form>
        <p className="small muted">New farmer, shopkeeper and delivery accounts require admin approval.</p>
      </section>
    </main>
  );
 return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={e => { e.preventDefault(); setPage("home"); }}><span className="brand-mark small-mark"><Sprout size={24}/></span><span><b>{words.title}</b><small>{words.tagline}</small></span></a>
        <div className="header-actions">
          <button className="language-toggle" onClick={() => setLanguage(te ? "en" : "te")}><Languages size={16}/>{te ? "EN" : "తెలుగు"}</button>
          <button className="icon-button mobile-only" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
          <span className="welcome">{user.name} · {roles.find(r => r.id === user.role)?.[te ? "te" : "label"]}</span>
          <button className="outline" onClick={logout}><LogOut size={16}/>{words.logout}</button>
        </div>
      </header>

      <div className="layout">
        <aside className={mobileMenu ? "sidebar open" : "sidebar"}>
          <p className="side-caption">MENU</p>
          <button className={page === "home" ? "nav-item active" : "nav-item"} onClick={() => {setPage("home");setMobileMenu(false);}}><ShoppingBasket size={18}/>{words.home}</button>
          {user.role === "farmer" && <button className={page === "products" ? "nav-item active" : "nav-item"} onClick={() => {setPage("products");setMobileMenu(false);}}><Package size={18}/>{words.products}</button>}
          <button className={page === "orders" ? "nav-item active" : "nav-item"} onClick={() => {setPage("orders");setMobileMenu(false);}}><ClipboardList size={18}/>{words.orders}</button>
          {user.role === "customer" && <button className={page === "cart" ? "nav-item active" : "nav-item"} onClick={() => {setPage("cart");setMobileMenu(false);}}><ShoppingCart size={18}/>{words.cart} ({cartItems.length})</button>}
          {user.role === "admin" && <button className={page === "approvals" ? "nav-item active" : "nav-item"} onClick={() => {setPage("approvals");setMobileMenu(false);}}> <ShieldCheck size={18}/>Approvals ({pendingUsers.length})</button>}
          <div className="sidebar-note"><Sprout size={22}/><b>Support local farmers</b><span>Buy fresh. Buy local.</span></div>
        </aside>

        <main className="content">
          {page === "home" && <>
            <section className="hero"><div><span className="eyebrow">NELLORE · ANDHRA PRADESH</span><h1>{te ? "తాజా పంటలు, నేరుగా రైతుల నుండి" : "Good food starts with local farmers."}</h1><p>{words.tagline}</p></div><div className="hero-icon"><Sprout size={82}/></div></section>
            {user.role === "farmer" && <section className="panel"><h2>List your harvest / పంటను జాబితా చేయండి</h2><form className="product-form" onSubmit={addProduct}>
              <input placeholder="Product name" value={productForm.name} onChange={e => setProductForm({...productForm,name:e.target.value})} required/>
              <input placeholder="పేరు (optional)" value={productForm.te} onChange={e => setProductForm({...productForm,te:e.target.value})}/>
              <select value={productForm.category} onChange={e => setProductForm({...productForm,category:e.target.value})}><option>Vegetables</option><option>Fruits</option><option>Groceries</option><option>Leafy Greens</option></select>
              <input type="number" min="1" step="0.5" placeholder="Price ₹" value={productForm.price} onChange={e => setProductForm({...productForm,price:e.target.value})} required/>
              <input type="number" min="1" step="1" placeholder="Stock" value={productForm.stock} onChange={e => setProductForm({...productForm,stock:e.target.value})} required/>
              <button className="primary" type="submit"><Plus size={17}/> Add product</button>
</form></section>}
            {user.role === "admin" && <section className="stats"><div><b>{data.users.length}</b><span>Registered users</span></div><div><b>{data.products.length}</b><span>Products</span></div><div><b>{data.orders.length}</b><span>Orders</span></div><div><b>{pendingUsers.length}</b><span>Pending approvals</span></div></section>}
            <div className="section-heading"><div><h2>{te ? "మార్కెట్‌లో తాజా ఉత్పత్తులు" : "Fresh from the market"}</h2><p className="muted">Browse local produce available near you.</p></div></div>
            <div className="filters"><div className="search-box"><Search size={18}/><input placeholder={words.search} value={query} onChange={e => setQuery(e.target.value)}/></div>
              <select value={category} onChange={e => setCategory(e.target.value)}><option>All</option><option>Vegetables</option><option>Fruits</option><option>Groceries</option><option>Leafy Greens</option></select>
            </div>
            <div className="product-grid">{visibleProducts.map(p => <article className="product-card" key={p.id}><div className="produce-art"><Sprout size={42}/><span>{p.category}</span></div><div className="product-info"><h3>{te && p.te ? p.te : p.name}</h3><p className="muted">{p.farmer} · {p.area}</p><div className="product-bottom"><strong>₹{p.price}<small> / {p.unit}</small></strong>{user.role === "customer" ? <button className="primary compact" disabled={p.stock <= 0} onClick={() => changeQty(p.id,1)}><Plus size={15}/>{p.stock > 0 ? words.add : "Out of stock"}</button> : <span className="stock">{p.stock} in stock</span>}</div></div></article>)}</div>
            {!visibleProducts.length && <div className="empty">No matching products found.</div>}
          </>}
          {page === "products" && <><h1>{words.products}</h1><p className="muted">Products listed from your farmer account.</p><div className="product-grid">{myProducts.map(p => <article className="panel" key={p.id}><h3>{p.name}</h3><p>₹{p.price} / {p.unit}</p><p>Available stock: {p.stock}</p></article>)}</div>{!myProducts.length && <p className="empty">You have not listed any products yet. Add your harvest from the Market page.</p>}</>}
          {page === "cart" && <><h1>{words.cart}</h1>{cartItems.length ? <section className="panel">{cartItems.map(item => <div className="cart-line" key={item.id}><div><b>{item.name}</b><small>₹{item.price} / {item.unit}</small></div><div className="quantity"><button onClick={() => changeQty(item.id,-1)}><Minus size={15}/></button><b>{item.qty}</b><button onClick={() => changeQty(item.id,1)}><Plus size={15}/></button><button className="danger-icon" onClick={() => setCart(c => {const n={...c};delete n[item.id];return n;})}><Trash2 size={15}/></button></div><strong>₹{item.lineTotal}</strong></div>)}<div className="total-row"><b>Subtotal</b><strong>₹{subtotal}</strong></div><button className="primary full" onClick={placeOrder}>{words.place} · ₹{subtotal}</button></section> : <div className="empty">Your cart is empty. Add products from the market.</div>}</>}
 {page === "orders" && <><h1>{words.orders}</h1>{myOrders.length ? myOrders.map(o => <article className="panel order-card" key={o.id}><div className="order-top"><div><b>{o.id}</b><small>{new Date(o.createdAt).toLocaleString()}</small></div><span className="status">{o.status}</span></div><p>{o.items.map(i => `${i.name} × ${i.qty}`).join(", ")}</p><div className="total-row"><span>{o.customer}</span><strong>₹{o.total}</strong></div>{user.role === "admin" && <button className="outline" onClick={() => setData(d => ({...d,orders:d.orders.map(x => x.id === o.id ? {...x,status:"Delivered"} : x)}))}><CheckCircle2 size={16}/> Mark delivered</button>}</article>) : <div className="empty">No orders yet.</div>}</>}
          {page === "approvals" && <><h1>User approvals</h1>{pendingUsers.length ? pendingUsers.map(u => <article className="panel approval" key={u.id}><div><b>{u.name}</b><small>{u.role} · {u.contact} · {u.area}</small></div><button className="primary" onClick={() => setData(d => ({...d,users:d.users.map(x => x.id === u.id ? {...x,status:"approved"} : x)}))}><CheckCircle2 size={16}/> Approve</button></article>) : <div className="empty">No pending registrations.</div>}</>}
        </main>
      </div>
      <footer>© {new Date().getFullYear()} Rythu Market · Supporting local farmers</footer>
    </div>
  );
}