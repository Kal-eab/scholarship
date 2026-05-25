import { useState } from "react";

// ─── DESIGN TOKENS (extracted from screenshots) ───────────────────────────
const C = {
  brand: "#2B9FD1",       // Mela teal-blue
  brandDark: "#1a7aaa",
  brandBg: "#EBF6FC",
  orange: "#F5A623",      // COD / warning amber
  orangeBg: "#FFF4E0",
  green: "#22A06B",       // delivered / success
  greenBg: "#E6F6EF",
  red: "#E53E3E",
  redBg: "#FFF0F0",
  navy: "#1C2B3A",        // sidebar / dark text
  text: "#1C2B3A",
  sub: "#6B7280",
  border: "#E5E9EF",
  bg: "#F4F6F9",
  white: "#FFFFFF",
  sidebarBg: "#FFFFFF",
  sidebarActive: "#EBF6FC",
  pill: { transit: { bg: "#DBEAFE", c: "#1D4ED8" }, pickup: { bg: "#FEF3C7", c: "#92400E" }, out: { bg: "#FEE2E2", c: "#991B1B" }, delivered: { bg: "#D1FAE5", c: "#065F46" }, failed: { bg: "#FEE2E2", c: "#991B1B" }, warehouse: { bg: "#E0E7FF", c: "#3730A3" } },
};

const F = {
  brand: "'DM Sans', 'Segoe UI', sans-serif",
  mono: "'DM Mono', 'Courier New', monospace",
};

// inject Google Font
if (typeof document !== "undefined") {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
  document.head.appendChild(l);
}

// ─── SHARED ───────────────────────────────────────────────────────────────

function StatusPill({ status }) {
  const map = {
    "In Transit": C.pill.transit,
    "Picked Up": C.pill.pickup,
    "Out for Delivery": C.pill.out,
    "Delivered": C.pill.delivered,
    "Failed": C.pill.failed,
    "In Warehouse": C.pill.warehouse,
    "Arrived at Destination": C.pill.delivered,
  };
  const s = map[status] || { bg: "#F3F4F6", c: "#6B7280" };
  return (
    <span style={{
      background: s.bg, color: s.c,
      borderRadius: 20, padding: "3px 10px",
      fontSize: 11, fontWeight: 600,
      fontFamily: F.brand, whiteSpace: "nowrap",
    }}>{status}</span>
  );
}

// ─── ADMIN SHELL ──────────────────────────────────────────────────────────

const ADMIN_NAVS = [
  { g: "OVERVIEW", items: [{ id: "dashboard", label: "Dashboard", icon: "▤" }, { id: "live", label: "Live activity", icon: "◎", badge: 24 }] },
  { g: "OPERATIONS", items: [{ id: "shipments", label: "Shipments", icon: "⊞", badge: "1.2k" }, { id: "routes", label: "Routes & couriers", icon: "↗" }, { id: "branches", label: "Branches", icon: "⌂" }] },
  { g: "PEOPLE", items: [{ id: "customers", label: "Customers", icon: "◉" }, { id: "workers", label: "Workers", icon: "◎" }, { id: "admins", label: "Admin access", icon: "⊛" }] },
  { g: "INSIGHTS", items: [{ id: "revenue", label: "Revenue", icon: "◈" }, { id: "audit", label: "Audit log", icon: "≡" }, { id: "settings", label: "Settings", icon: "⚙" }] },
];

function AdminShell({ children, activePage, onNav }) {
  return (
    <div style={{ display: "flex", height: "100%", fontFamily: F.brand, background: C.bg, minHeight: 680 }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: C.white, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "18px 16px 14px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: C.brand, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14 }}>✈</span>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, letterSpacing: "0.02em" }}>MELA <span style={{ color: C.brand }}>EXPRESS</span></div>
              <div style={{ fontSize: 9, color: C.sub, letterSpacing: "0.04em" }}>DELIVERY · ዴሊቨሪ</div>
            </div>
          </div>
          {/* Workspace */}
          <div style={{ marginTop: 12, background: C.bg, borderRadius: 8, padding: "7px 10px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 22, height: 22, background: C.brand, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>ET</div>
            <div>
              <div style={{ fontSize: 10, color: C.sub }}>Workspace</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text }}>Ethiopia · All branches</div>
            </div>
            <span style={{ marginLeft: "auto", color: C.sub, fontSize: 10 }}>▾</span>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
          {ADMIN_NAVS.map(g => (
            <div key={g.g} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.sub, letterSpacing: "0.1em", padding: "6px 8px 2px", textTransform: "uppercase" }}>{g.g}</div>
              {g.items.map(it => (
                <button key={it.id} onClick={() => onNav(it.id)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 8,
                  padding: "7px 8px", borderRadius: 8, border: "none",
                  background: activePage === it.id ? C.sidebarActive : "transparent",
                  color: activePage === it.id ? C.brand : C.text,
                  cursor: "pointer", fontSize: 12, fontWeight: activePage === it.id ? 600 : 400,
                  textAlign: "left",
                }}>
                  <span style={{ fontSize: 13 }}>{it.icon}</span>
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {it.badge && <span style={{ fontSize: 10, background: activePage === it.id ? C.brand : C.bg, color: activePage === it.id ? "#fff" : C.sub, borderRadius: 10, padding: "1px 6px", fontWeight: 600 }}>{it.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* User */}
        <div style={{ padding: "12px 14px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, background: C.brand, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>MA</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Meron Abebe</div>
            <div style={{ fontSize: 10, color: C.sub }}>Super admin</div>
          </div>
          <span style={{ marginLeft: "auto", color: C.sub, cursor: "pointer", fontSize: 14 }}>⚙</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

// ─── ADMIN PAGES ──────────────────────────────────────────────────────────

function MiniSparkline({ color, up }) {
  const pts = up
    ? [0, 10, 7, 15, 12, 20, 17, 25, 22, 30]
    : [30, 25, 28, 20, 25, 18, 22, 15, 18, 10];
  const max = Math.max(...pts), min = Math.min(...pts);
  const w = 80, h = 30;
  const coords = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline points={coords} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatCard({ label, value, delta, sub, color, icon, up }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 11, color: C.sub, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
        <div style={{ width: 28, height: 28, background: color + "22", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: C.text, marginTop: 8, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 8 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: up ? C.green : C.red }}>{delta}</span>
          <span style={{ fontSize: 11, color: C.sub, marginLeft: 4 }}>{sub}</span>
        </div>
        <MiniSparkline color={up ? C.green : C.red} up={up} />
      </div>
    </div>
  );
}

function EthMapSVG() {
  const cities = [
    { name: "Mekelle", x: 68, y: 22, hub: true },
    { name: "Gondar", x: 44, y: 20, hub: false },
    { name: "Bahir Dar", x: 38, y: 35, hub: false },
    { name: "Dire Dawa", x: 80, y: 52, hub: true },
    { name: "Addis Ababa", x: 52, y: 56, hub: true },
    { name: "Jimma", x: 36, y: 62, hub: false },
    { name: "Hawassa", x: 50, y: 74, hub: false },
  ];
  const routes = [[0,1],[1,2],[2,4],[4,3],[4,6],[4,5],[0,3]];
  return (
    <svg viewBox="0 0 100 95" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="52" cy="50" rx="42" ry="44" fill="none" stroke="#BEE3F8" strokeWidth="1.5" />
      {routes.map(([a, b], i) => (
        <line key={i} x1={cities[a].x} y1={cities[a].y} x2={cities[b].x} y2={cities[b].y} stroke={C.brand} strokeWidth="0.8" strokeDasharray="2,1.5" opacity="0.6" />
      ))}
      {cities.map(c => (
        <g key={c.name}>
          <circle cx={c.x} cy={c.y} r={c.hub ? 3.5 : 2.5} fill={c.hub ? C.brand : "#fff"} stroke={C.brand} strokeWidth="1" />
          <text x={c.x + 4} y={c.y + 1} fontSize="4" fill={C.sub} fontFamily={F.brand}>{c.name}</text>
        </g>
      ))}
    </svg>
  );
}

function AdminDashboard() {
  const activities = [
    { color: C.brand, icon: "↑", text: "Yonas A. updated", id: "ME-2418-AX", sub: "Out for Delivery", time: "12s ago" },
    { color: C.green, icon: "+", text: "Sara K. created", id: "ME-2419-PD", sub: "New shipment · Bole → Hawassa", time: "47s ago" },
    { color: C.orange, icon: "!", text: "Bereket M. flagged", id: "ME-2402-XX", sub: "Failed delivery · returning", time: "3m ago" },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>Dashboard</div>
          <div style={{ fontSize: 13, color: C.sub, marginTop: 2 }}>Operations overview · last 7 days</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.sub }}>
            <span>🔍</span> Search tracking#, customer, branch...
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: 8 }}>🔔</div>
          <button style={{ background: C.brand, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Create shipment</button>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
        <StatCard label="Active Shipments" value="1,284" delta="+12.4%" sub="vs last week" color={C.brand} icon="⊞" up />
        <StatCard label="Delivered Today" value="342" delta="+8.1%" sub="94% on-time" color={C.green} icon="✓" up />
        <StatCard label="Revenue (ETB)" value="486,210" delta="+24.7%" sub="May — date" color={C.orange} icon="◈" up />
        <StatCard label="Failed Deliveries" value="14" delta="-3.2%" sub="1.1% of total" color={C.red} icon="✕" up={false} />
      </div>

      {/* Bottom row */}
      <div style={{ display: "flex", gap: 14 }}>
        {/* Chart */}
        <div style={{ flex: 2, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Shipment volume</div>
              <div style={{ fontSize: 12, color: C.sub }}>Created vs delivered · last 14 days</div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {["7d", "14d", "30d", "All"].map(t => (
                <button key={t} style={{ padding: "3px 9px", fontSize: 11, borderRadius: 6, border: `1px solid ${t === "14d" ? C.brand : C.border}`, background: t === "14d" ? C.brand : "transparent", color: t === "14d" ? "#fff" : C.sub, cursor: "pointer", fontWeight: t === "14d" ? 600 : 400 }}>{t}</button>
              ))}
            </div>
          </div>
          {/* Bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 100 }}>
            {[120,150,130,160,145,170,155,190,175,200,185,210,195,220].map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100%" }}>
                <div style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 2 }}>
                  <div style={{ width: "100%", height: `${(v / 220) * 100}%`, background: C.brand, borderRadius: "3px 3px 0 0", opacity: 0.85 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.sub }}>
              <div style={{ width: 10, height: 10, background: C.brand, borderRadius: 2 }} /> Created
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.sub }}>
              <div style={{ width: 10, height: 3, background: C.green, borderRadius: 2 }} /> Delivered
            </div>
          </div>
        </div>

        {/* Live coverage */}
        <div style={{ flex: 1.2, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Live coverage</div>
              <div style={{ fontSize: 12, color: C.sub }}>7 active hubs · 84 routes</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, background: C.greenBg, borderRadius: 20, padding: "3px 10px" }}>
              <div style={{ width: 6, height: 6, background: C.green, borderRadius: "50%" }} />
              <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>Live</span>
            </div>
          </div>
          <div style={{ height: 130 }}><EthMapSVG /></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            {[["42", "in transit", C.brand], ["18", "out for delivery", C.orange], ["3", "delayed", C.red]].map(([n, l, c]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: c }}>{n}</div>
                <div style={{ fontSize: 10, color: C.sub }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity + Branch load */}
      <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
        <div style={{ flex: 2, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Live activity</div>
              <div style={{ fontSize: 12, color: C.sub }}>Streaming · auto-updating</div>
            </div>
            <span style={{ fontSize: 12, color: C.brand, cursor: "pointer" }}>Open audit log →</span>
          </div>
          {activities.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < activities.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ width: 30, height: 30, background: a.color + "22", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: a.color, fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, color: C.sub }}>{a.text} </span>
                <span style={{ fontSize: 13, color: C.brand, fontWeight: 600 }}>{a.id}</span>
                <div style={{ fontSize: 11, color: C.sub, marginTop: 1 }}>{a.sub}</div>
              </div>
              <div style={{ fontSize: 11, color: C.sub, flexShrink: 0 }}>{a.time}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1.2, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 14 }}>Branch load</div>
          {[["Bole HQ · Addis", 82, C.orange], ["Sabian · Dire Dawa", 64, C.green], ["Mekelle Central", 48, C.brand]].map(([name, pct, col]) => (
            <div key={name} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: col }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: C.border, borderRadius: 4 }}>
                <div style={{ height: "100%", width: `${pct}%`, background: col, borderRadius: 4, transition: "width 0.6s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SHIPMENTS = [
  { id: "ME-2418-AX", sender: "Dawit Bekele", recip: "Hana Tesfaye", route: "ADD → DIR", wt: "12.5kg", service: "Express", status: "In Transit", courier: "Yonas A.", eta: "Today 4:30 PM", fee: "360.50", upd: "2m" },
  { id: "ME-2419-PD", sender: "Sara Kebede", recip: "Mulu Hailu", route: "ADD → HWS", wt: "4.2kg", service: "Standard", status: "Picked Up", courier: "Bereket M.", eta: "May 26", fee: "145.00", upd: "5m" },
  { id: "ME-2417-PD", sender: "Bekele M.", recip: "Lily T.", route: "BHD → ADD", wt: "8.0kg", service: "Express", status: "Out for Delivery", courier: "Tigist M.", eta: "Today 6:00 PM", fee: "280.00", upd: "12m" },
  { id: "ME-2415-MN", sender: "Yared S.", recip: "Frehiwot G.", route: "ADD → MKL", wt: "2.1kg", service: "Same-day", status: "In Warehouse", courier: "—", eta: "May 25", fee: "540.00", upd: "34m" },
  { id: "ME-2412-WS", sender: "Selam A.", recip: "Robel T.", route: "JMA → ADD", wt: "15.4kg", service: "Standard", status: "In Transit", courier: "Mulu H.", eta: "May 26", fee: "220.00", upd: "1h" },
  { id: "ME-2410-AB", sender: "Marta L.", recip: "Daniel B.", route: "ADD → GDR", wt: "1.2kg", service: "Express", status: "Delivered", courier: "Yonas A.", eta: "—", fee: "195.00", upd: "3h" },
  { id: "ME-2408-XP", sender: "Henok D.", recip: "Bethel S.", route: "DIR → ADD", wt: "6.8kg", service: "Standard", status: "Delivered", courier: "Tigist M.", eta: "—", fee: "165.00", upd: "6h" },
  { id: "ME-2402-XX", sender: "Abeba R.", recip: "Solomon Y.", route: "ADD → MKL", wt: "3.4kg", service: "Standard", status: "Failed", courier: "Bereket M.", eta: "Returning", fee: "180.00", upd: "8h" },
  { id: "ME-2401-RQ", sender: "Hirut M.", recip: "Hana T.", route: "MKL → ADD", wt: "5.0kg", service: "Express", status: "Delivered", courier: "Yonas A.", eta: "—", fee: "295.00", upd: "1d" },
];

function AdminShipments() {
  const [filter, setFilter] = useState("All");
  const filters = [{ l: "All", n: "1.2k" }, { l: "Created", n: 86 }, { l: "In Transit", n: 412 }, { l: "Out for Delivery", n: 96 }, { l: "Delivered", n: "11842" }, { l: "Failed", n: 14 }];
  const shown = filter === "All" ? SHIPMENTS : SHIPMENTS.filter(s => s.status.includes(filter.replace("Out for Delivery", "Out")));
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>Shipments</div>
          <div style={{ fontSize: 13, color: C.sub }}>1,284 active · 12,492 lifetime</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 14px", fontSize: 12, color: C.sub }}>🔍 Search...</div>
          <button style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", fontSize: 12, color: C.sub, cursor: "pointer" }}>⊞ Filters · 2</button>
          <button style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", fontSize: 12, color: C.sub, cursor: "pointer" }}>↓ Export</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {filters.map(f => (
          <button key={f.l} onClick={() => setFilter(f.l)} style={{
            padding: "5px 12px", borderRadius: 20, border: `1px solid ${filter === f.l ? C.brand : C.border}`,
            background: filter === f.l ? C.brand : C.white, color: filter === f.l ? "#fff" : C.sub,
            fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", gap: 5, alignItems: "center",
          }}>
            {f.l} <span style={{ fontSize: 10, background: filter === f.l ? "rgba(255,255,255,0.25)" : C.bg, borderRadius: 10, padding: "0 5px" }}>{f.n}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["", "TRACKING #", "SENDER → RECEIVER", "ROUTE · WT", "SERVICE", "STATUS", "COURIER · ETA", "FEE (ETB)", "UPDATED", ""].map((h, i) => (
                <th key={i} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.sub, letterSpacing: "0.06em", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((s, i) => (
              <tr key={s.id} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : "#FAFBFC" }}>
                <td style={{ padding: "11px 12px" }}><input type="checkbox" /></td>
                <td style={{ padding: "11px 12px" }}><span style={{ color: C.brand, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>{s.id}</span></td>
                <td style={{ padding: "11px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{s.sender}</div>
                  <div style={{ fontSize: 11, color: C.sub }}>→ {s.recip}</div>
                </td>
                <td style={{ padding: "11px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{s.route}</div>
                  <div style={{ fontSize: 11, color: C.sub }}>{s.wt}</div>
                </td>
                <td style={{ padding: "11px 12px", fontSize: 12, color: C.text }}>{s.service}</td>
                <td style={{ padding: "11px 12px" }}><StatusPill status={s.status} /></td>
                <td style={{ padding: "11px 12px" }}>
                  <div style={{ fontSize: 12, color: C.text }}>{s.courier}</div>
                  <div style={{ fontSize: 11, color: C.sub }}>{s.eta}</div>
                </td>
                <td style={{ padding: "11px 12px", fontSize: 12, fontWeight: 600, color: C.text }}>{s.fee}</td>
                <td style={{ padding: "11px 12px", fontSize: 11, color: C.sub }}>{s.upd}</td>
                <td style={{ padding: "11px 12px", color: C.sub, cursor: "pointer" }}>···</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 12, color: C.sub }}>Showing 1–9 of 1,284</span>
          <div style={{ display: "flex", gap: 4 }}>
            {["‹", "1", "2", "3", "...", "143", "›"].map((p, i) => (
              <button key={i} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${p === "1" ? C.brand : C.border}`, background: p === "1" ? C.brand : C.white, color: p === "1" ? "#fff" : C.sub, cursor: "pointer", fontSize: 12, fontWeight: p === "1" ? 700 : 400 }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminBranches() {
  const branches = [
    { name: "Bole HQ", tag: "HUB", code: "ADD", city: "Addis Ababa", in: 142, out: 96, staff: 28, cap: 82, col: C.orange },
    { name: "Sabian", tag: "HUB", code: "DIR", city: "Dire Dawa", in: 86, out: 64, staff: 14, cap: 64, col: C.green },
    { name: "Mekelle Central", tag: "HUB", code: "MKL", city: "Mekelle", in: 54, out: 42, staff: 10, cap: 48, col: C.brand },
    { name: "Bahir Dar", tag: "", code: "BHD", city: "Bahir Dar", in: 38, out: 28, staff: 8, cap: 35, col: C.brand },
    { name: "Hawassa", tag: "", code: "HWS", city: "Hawassa", in: 44, out: 32, staff: 9, cap: 41, col: C.green },
    { name: "Jimma", tag: "", code: "JMA", city: "Jimma", in: 24, out: 18, staff: 5, cap: 22, col: C.brand },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 4 }}>Branches & warehouses</div>
      <div style={{ fontSize: 13, color: C.sub, marginBottom: 20 }}>7 branches · 3 regional hubs</div>

      <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
        {/* Map */}
        <div style={{ flex: 2, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 4 }}>Branch network</div>
          <div style={{ fontSize: 12, color: C.sub, marginBottom: 10 }}>Active routes between branches</div>
          <div style={{ height: 200 }}><EthMapSVG /></div>
        </div>
        {/* Stats */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          {[["TOTAL CAPACITY", "4,200", "63% utilized", "⊞", C.brand], ["INBOUND TODAY", "388", "+12% vs yesterday", "→", C.green], ["OUTBOUND TODAY", "288", "+8% vs yesterday", "↗", C.orange]].map(([l, v, s, ic, col]) => (
            <div key={l} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, flex: 1 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, background: col + "22", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: col, fontSize: 16 }}>{ic}</div>
                <div>
                  <div style={{ fontSize: 10, color: C.sub, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{l}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>{v}</div>
                  <div style={{ fontSize: 11, color: C.sub }}>{s}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Branch cards */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>All branches</div>
        <button style={{ background: C.brand, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ New branch</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {branches.map(b => (
          <div key={b.name} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{b.name} </span>
                {b.tag && <span style={{ fontSize: 9, background: C.brandBg, color: C.brand, borderRadius: 4, padding: "2px 6px", fontWeight: 700 }}>{b.tag}</span>}
              </div>
              <span style={{ fontSize: 11, color: C.sub, fontWeight: 600 }}>{b.code}</span>
            </div>
            <div style={{ fontSize: 11, color: C.sub, marginBottom: 12 }}>{b.city}</div>
            <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
              {[["IN", b.in], ["OUT", b.out], ["STAFF", b.staff]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 9, color: C.sub, fontWeight: 700, letterSpacing: "0.08em" }}>{l}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: C.sub, marginBottom: 4 }}>Capacity</div>
            <div style={{ height: 5, background: C.border, borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${b.cap}%`, background: b.col, borderRadius: 3 }} />
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: b.col, fontWeight: 700, marginTop: 3 }}>{b.cap}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PHONE FRAME ──────────────────────────────────────────────────────────

function PhoneFrame({ children, dark }) {
  return (
    <div style={{
      width: 320, flexShrink: 0,
      background: dark ? "#0a0e16" : C.white,
      borderRadius: 44,
      border: `2px solid ${dark ? "#1e2535" : "#D1D5DB"}`,
      overflow: "hidden",
      boxShadow: "0 32px 64px rgba(0,0,0,0.25), 0 0 0 6px rgba(0,0,0,0.06)",
      display: "flex", flexDirection: "column",
      height: 620,
    }}>
      {/* Notch */}
      <div style={{ height: 26, background: dark ? "#060810" : "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <div style={{ width: 70, height: 8, background: dark ? "#1a2030" : "#333", borderRadius: 6 }} />
      </div>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

// ─── CUSTOMER SCREENS ─────────────────────────────────────────────────────

function CustLogin() {
  return (
    <div style={{ flex: 1, background: C.white, fontFamily: F.brand }}>
      {/* Blue hero */}
      <div style={{ background: `linear-gradient(160deg, ${C.brand} 0%, #1a7aaa 100%)`, padding: "28px 24px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", top: 10, right: 30, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
          <div style={{ width: 22, height: 22, background: "rgba(255,255,255,0.3)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 12 }}>✈</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "0.04em" }}>MELA</span>
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1.15 }}>Track every<br />shipment.</div>
      </div>

      {/* Form */}
      <div style={{ padding: "24px 20px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.sub, letterSpacing: "0.1em", marginBottom: 6 }}>PHONE NUMBER</div>
        <div style={{ display: "flex", border: `1.5px solid ${C.brand}`, borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
          <div style={{ padding: "10px 10px", background: C.bg, display: "flex", alignItems: "center", gap: 4, borderRight: `1px solid ${C.border}` }}>
            <span>🇪🇹</span><span style={{ fontSize: 12, fontWeight: 600 }}>+251</span>
          </div>
          <div style={{ flex: 1, padding: "10px 12px", fontSize: 14, color: C.text, fontFamily: F.mono }}>911 23 45 67</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.sub, letterSpacing: "0.1em" }}>PASSWORD</span>
          <span style={{ fontSize: 11, color: C.brand, fontWeight: 600 }}>Forgot?</span>
        </div>
        <div style={{ border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ fontSize: 16, color: C.sub, letterSpacing: 4 }}>••••••••</span>
          <span style={{ color: C.sub }}>👁</span>
        </div>

        <button style={{ width: "100%", background: C.brand, color: "#fff", border: "none", borderRadius: 12, padding: "13px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Sign in →</button>

        <div style={{ textAlign: "center", margin: "14px 0", fontSize: 11, color: C.sub }}>OR</div>

        <button style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 0", fontSize: 12, fontWeight: 600, color: C.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span>⊞</span> Continue with tracking number
        </button>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: C.sub }}>
          New to Mela? <span style={{ color: C.brand, fontWeight: 600 }}>Create an account</span>
        </div>
      </div>
    </div>
  );
}

function CustHome() {
  return (
    <div style={{ flex: 1, background: C.bg, fontFamily: F.brand }}>
      {/* Header */}
      <div style={{ background: C.white, padding: "16px 18px 14px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 13, color: C.sub }}>Selam, Hana 👋</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>3 shipments active</div>
          </div>
          <div style={{ width: 36, height: 36, background: C.brand, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>HT</div>
        </div>
        {/* Search */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <div style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: C.sub }}>🔍</span>
            <span style={{ fontSize: 12, color: C.sub }}>Tracking number, e.g. ME-2418-AX</span>
          </div>
          <div style={{ width: 38, height: 38, background: C.brand, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16 }}>⊞</div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Promo */}
        <div style={{ background: `linear-gradient(135deg, ${C.brand} 0%, #1a7aaa 100%)`, borderRadius: 14, padding: 16, marginBottom: 16, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -10, top: -10, width: 70, height: 70, background: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>SAME-DAY IN ADDIS</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 4, lineHeight: 1.4 }}>Send before 11 AM<br />→ arrives by 6 PM</div>
          <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 20 }}>⚡</div>
        </div>

        {/* Active shipments */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, letterSpacing: "0.06em", textTransform: "uppercase" }}>ACTIVE SHIPMENTS</div>
          <span style={{ fontSize: 12, color: C.brand, fontWeight: 600 }}>See all →</span>
        </div>

        {[["ME-2418-AX", "IN TRANSIT", "Addis Ababa", "Dire Dawa", "Document", "Today · 4:30", 65],
          ["ME-2419-PD", "PICKED UP", "Addis Ababa", "Hawassa", "Package", "May 26", 15]].map(([id, st, from, to, type, eta, prog]) => (
          <div key={id} style={{ background: C.white, borderRadius: 14, padding: 14, border: `1px solid ${C.border}`, marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: F.mono }}>{id}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 6, height: 6, background: C.brand, borderRadius: "50%" }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.brand }}>{st}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: C.sub }}>FROM</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{from}</div>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 3 }}>
                <div style={{ flex: 1, height: 2, background: `linear-gradient(to right, ${C.brand} ${prog}%, ${C.border} ${prog}%)`, borderRadius: 2 }} />
                <span style={{ fontSize: 14 }}>🚚</span>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <div style={{ fontSize: 11, color: C.sub }}>TO</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{to}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 11, color: C.sub }}>{type}</span>
              <span style={{ fontSize: 11, color: C.sub }}>ETA: {eta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <CustTabBar active="home" />
    </div>
  );
}

function CustTabBar({ active }) {
  return (
    <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, display: "flex", paddingBottom: 4, marginTop: "auto" }}>
      {[["home", "🏠", "Home"], ["track", "📦", "Track"], ["qr", "⊞", ""], ["alerts", "🔔", "Alerts"], ["me", "👤", "Me"]].map(([id, ic, lb]) => (
        <button key={id} style={{ flex: 1, border: "none", background: "none", padding: "8px 0 4px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative" }}>
          {id === "qr"
            ? <div style={{ width: 42, height: 42, background: C.navy, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, marginTop: -14, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>⊞</div>
            : <>
                <span style={{ fontSize: 18 }}>{ic}</span>
                <span style={{ fontSize: 9, color: active === id ? C.brand : C.sub, fontWeight: active === id ? 700 : 400 }}>{lb}</span>
                {active === id && <div style={{ width: 16, height: 2, background: C.brand, borderRadius: 2 }} />}
              </>
          }
        </button>
      ))}
    </div>
  );
}

function CustTracking() {
  return (
    <div style={{ flex: 1, background: C.white, fontFamily: F.brand, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 18, cursor: "pointer", color: C.sub }}>←</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: C.sub, fontWeight: 600, letterSpacing: "0.08em" }}>TRACKING</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: F.mono }}>ME-2418-AX</div>
        </div>
        <span style={{ fontSize: 16, color: C.sub }}>···</span>
      </div>

      {/* Status card */}
      <div style={{ background: `linear-gradient(135deg, ${C.brand} 0%, #1a7aaa 100%)`, margin: 14, borderRadius: 16, padding: "18px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>CURRENT STATUS</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "2px 8px" }}>
            <div style={{ width: 6, height: 6, background: "#fff", borderRadius: "50%" }} />
            <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>LIVE</span>
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>In Transit</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Passed Awash junction · 142 km to destination</div>
        <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>ESTIMATED ARRIVAL</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Today, 4:30 PM</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>SERVICE</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Express</div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={{ margin: "0 14px", background: C.brandBg, borderRadius: 12, padding: 10, height: 100 }}>
        <EthMapSVG />
      </div>

      {/* QR promo */}
      <div style={{ margin: "12px 14px", background: C.navy, borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, background: C.brand, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff" }}>⊞</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Show QR at pickup</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>For proof of delivery</div>
        </div>
        <button style={{ background: C.brand, color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Open</button>
      </div>

      <CustTabBar active="track" />
    </div>
  );
}

// ─── WORKER SCREENS ───────────────────────────────────────────────────────

function WorkerTabBar({ active }) {
  return (
    <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, display: "flex", paddingBottom: 4, marginTop: "auto" }}>
      {[["routes", "🚚", "Routes"], ["new", "+", "New"], ["qr", "⊞", ""], ["history", "🕐", "History"], ["me", "👤", "Me"]].map(([id, ic, lb]) => (
        <button key={id} style={{ flex: 1, border: "none", background: "none", padding: "8px 0 4px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          {id === "qr"
            ? <div style={{ width: 42, height: 42, background: C.navy, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, marginTop: -14, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>⊞</div>
            : <>
                <span style={{ fontSize: 18 }}>{ic}</span>
                <span style={{ fontSize: 9, color: active === id ? C.brand : C.sub, fontWeight: active === id ? 700 : 400 }}>{lb}</span>
                {active === id && <div style={{ width: 16, height: 2, background: C.brand, borderRadius: 2 }} />}
              </>
          }
        </button>
      ))}
    </div>
  );
}

function WorkerRoutes() {
  return (
    <div style={{ flex: 1, background: C.bg, fontFamily: F.brand, display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.white, padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 13, color: C.sub }}>Tuesday · May 24</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>Today's route</div>
          </div>
          <div style={{ background: C.green, borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ fontSize: 9, color: "#fff", fontWeight: 700 }}>ON</div>
            <div style={{ fontSize: 10, color: "#fff", fontWeight: 800 }}>4/12</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
          {[["8", "DONE", C.green], ["4", "PENDING", C.orange], ["900", "COD ETB", C.orange], ["6.2h", "ON CLOCK", C.sub]].map(([v, l, c]) => (
            <div key={l}>
              <div style={{ fontSize: 18, fontWeight: 700, color: c }}>{v}</div>
              <div style={{ fontSize: 9, color: C.sub, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Route map strip */}
      <div style={{ background: C.brandBg, margin: 14, borderRadius: 12, height: 70, overflow: "hidden" }}>
        <EthMapSVG />
      </div>

      <div style={{ padding: "0 14px", fontSize: 11, fontWeight: 700, color: C.sub, letterSpacing: "0.08em", marginBottom: 10 }}>NEXT STOPS</div>

      {[
        { num: 1, name: "Hana Tesfaye", action: "DELIVER", cod: "COD · 361 ETB", loc: "Sabian, Dire Dawa", id: "ME-247…" },
        { num: 2, name: "Dawit Bekele", action: "PICKUP", cod: null, loc: "Bole HQ, Addis", id: "ME-248…" },
      ].map(s => (
        <div key={s.num} style={{ background: C.white, margin: "0 14px 10px", borderRadius: 14, padding: 14, border: `1px solid ${s.num === 1 ? C.brand : C.border}`, boxShadow: s.num === 1 ? `0 0 0 2px ${C.brand}22` : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 26, height: 26, background: C.brand, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.num}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{s.name}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.green, background: C.greenBg, padding: "1px 6px", borderRadius: 4 }}>{s.action}</span>
                {s.cod && <span style={{ fontSize: 10, fontWeight: 700, color: C.orange, background: C.orangeBg, padding: "1px 6px", borderRadius: 4 }}>{s.cod}</span>}
              </div>
              <div style={{ fontSize: 11, color: C.sub, marginTop: 3 }}>{s.loc} · {s.id}</div>
            </div>
            <button style={{ background: C.brand, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Start →</button>
          </div>
        </div>
      ))}

      <WorkerTabBar active="routes" />
    </div>
  );
}

function WorkerCreateShipment() {
  return (
    <div style={{ flex: 1, background: C.white, fontFamily: F.brand, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 18, cursor: "pointer", color: C.sub }}>✕</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>New shipment</div>
          <div style={{ fontSize: 11, color: C.sub }}>Step 2 of 4 · Package details</div>
        </div>
        <span style={{ fontSize: 12, color: C.brand, fontWeight: 600 }}>Save draft</span>
      </div>

      {/* Step tabs */}
      <div style={{ display: "flex", padding: "12px 16px 0", gap: 0, borderBottom: `1px solid ${C.border}` }}>
        {[["✓", "Sender"], ["✓", "Receiver"], ["•", "Package"], ["", "Review"]].map(([ic, l], i) => (
          <div key={l} style={{ flex: 1, textAlign: "center", paddingBottom: 10, borderBottom: `2px solid ${i === 2 ? C.brand : "transparent"}` }}>
            <span style={{ fontSize: 11, color: i < 2 ? C.green : i === 2 ? C.brand : C.sub, fontWeight: i === 2 ? 700 : 400 }}>{ic} {l}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {/* Route summary */}
        <div style={{ background: C.greenBg, border: `1px solid ${C.green}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 20, height: 20, background: C.green, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11 }}>✓</div>
          <div style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Dawit Bekele (Bole) → Hana Tesfaye (Dire Dawa)</div>
        </div>

        {/* Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          {[["PRODUCT NAME", "Coffee beans"], ["CATEGORY", "Food · packaged"]].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.sub, letterSpacing: "0.06em", marginBottom: 4 }}>{l}</div>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 10px", fontSize: 12, color: C.text }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          {[["WEIGHT", "12.5", "KG"], ["DECLARED VALUE", "3,200", "ETB"]].map(([l, v, u]) => (
            <div key={l}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.sub, letterSpacing: "0.06em", marginBottom: 4 }}>{l}</div>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 10px", fontSize: 12, color: C.text, display: "flex", justifyContent: "space-between" }}>
                <span>{v}</span><span style={{ color: C.sub }}>{u}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.sub, letterSpacing: "0.06em", marginBottom: 6 }}>DIMENSIONS (L × W × H CM)</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {[["40", "L"], ["30", "W"], ["25", "H"]].map(([v, u]) => (
            <div key={u} style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 10px", display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ fontWeight: 600 }}>{v}</span><span style={{ color: C.sub }}>{u}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
        <button style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.text }}>← Back</button>
        <button style={{ flex: 2, background: C.brand, border: "none", borderRadius: 10, padding: "11px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#fff" }}>Continue to review →</button>
      </div>
    </div>
  );
}

function WorkerLabel() {
  return (
    <div style={{ flex: 1, background: C.bg, fontFamily: F.brand, display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.white, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 18, cursor: "pointer", color: C.sub }}>←</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Shipping label</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
            <div style={{ width: 6, height: 6, background: C.green, borderRadius: "50%" }} />
            <span style={{ fontSize: 11, color: C.green }}>Generated · ready to print</span>
          </div>
        </div>
        <span style={{ fontSize: 14, color: C.sub }}>···</span>
      </div>

      <div style={{ margin: 14 }}>
        {/* Label card */}
        <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          {/* Label header */}
          <div style={{ background: C.navy, padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 20, background: C.brand, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 11 }}>✈</span>
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: "0.04em" }}>MELA EXPRESS</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginLeft: "auto" }}>WAYBILL · v1</span>
          </div>
          {/* Service strip */}
          <div style={{ background: C.brand, padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#fff", fontSize: 14 }}>⚡</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>EXPRESS · NEXT DAY</span>
            </div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>320 ETB</span>
          </div>
          {/* Tracking */}
          <div style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 10, color: C.sub, letterSpacing: "0.08em", fontWeight: 600, marginBottom: 4 }}>TRACKING NUMBER</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: "0.02em", fontFamily: F.mono, marginBottom: 10 }}>ME-2418-AX-991</div>
            {/* Barcode */}
            <div style={{ display: "flex", gap: 1, height: 40, marginBottom: 12 }}>
              {[3,1,2,1,3,2,1,3,1,2,1,4,1,2,3,1,2,1,3,2,1,3,1,2,1,3,2,1].map((w, i) => (
                <div key={i} style={{ width: w * 3, background: C.text, borderRadius: 1 }} />
              ))}
            </div>
            {/* From/To */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
              {[["FROM", "Dawit Bekele", "Bole HQ Branch", "Addis Ababa · ADD", "+251 911 23 45 67"], ["TO", "Hana Tesfaye", "Sabian Branch", "Dire Dawa · DIR", "+251 911 99 88 77"]].map(([dir, name, branch, city, phone]) => (
                <div key={dir}>
                  <div style={{ fontSize: 9, color: C.sub, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4 }}>{dir}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{name}</div>
                  <div style={{ fontSize: 10, color: C.sub }}>{branch}</div>
                  <div style={{ fontSize: 10, color: C.sub }}>{city}</div>
                  <div style={{ fontSize: 10, color: C.sub }}>{phone}</div>
                </div>
              ))}
            </div>
            {/* Package + QR */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 9, color: C.sub, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4 }}>PACKAGE</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Coffee beans · 12.5 kg</div>
                <div style={{ fontSize: 10, color: C.sub }}>40 × 30 × 25 cm · Fragile</div>
                <div style={{ fontSize: 10, color: C.sub }}>Weight: Val: 3,200</div>
              </div>
              {/* QR */}
              <div style={{ width: 64, height: 64 }}>
                <svg viewBox="0 0 21 21" width="64" height="64">
                  {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                    const pat = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
                    return pat[r]?.[c] ? <rect key={`${r}${c}`} x={c} y={r} width={1} height={1} fill={C.text} /> : null;
                  }))}
                  {[8,9,10,11,12,13,14,15,16,17,18,19,20].map((x, i) => [8,9,10,11,12,13,14,15,16,17,18,19,20].map((y, j) => (
                    Math.random() > 0.5 ? <rect key={`r${x}${y}`} x={x} y={y} width={1} height={1} fill={C.text} /> : null
                  )))}
                  <rect x={8} y={8} width={5} height={5} fill={C.brand} rx={0.5} />
                  <rect x={9.5} y={9.5} width={2} height={2} fill="#fff" />
                  <text x={10.5} y={11.5} textAnchor="middle" fontSize="1.8" fill="#fff" fontWeight="bold">M</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkerStatusUpdate() {
  const [sel, setSel] = useState("out");
  return (
    <div style={{ flex: 1, background: C.white, fontFamily: F.brand, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 18, cursor: "pointer", color: C.sub }}>←</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
            <div style={{ width: 6, height: 6, background: C.green, borderRadius: "50%" }} />
            <span style={{ fontSize: 10, color: C.green, fontWeight: 700 }}>QR SCANNED</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.text, fontFamily: F.mono }}>ME-2418-AX-991</div>
        </div>
        <span />
      </div>

      <div style={{ margin: 14, background: C.bg, borderRadius: 12, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 42, height: 42, background: C.brandBg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📦</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Coffee beans · 12.5 kg</div>
          <div style={{ fontSize: 11, color: C.sub }}>For Hana Tesfaye · Sabian</div>
          <StatusPill status="Arrived at Destination" />
        </div>
      </div>

      <div style={{ padding: "0 14px", fontSize: 11, fontWeight: 700, color: C.sub, letterSpacing: "0.08em", marginBottom: 10 }}>UPDATE TO</div>

      {[
        { id: "out", label: "Out for Delivery", sub: "Continue route to receiver", icon: "🚚" },
        { id: "branch", label: "Hand to Branch", sub: "Drop at destination warehouse", icon: "⊞" },
        { id: "failed", label: "Failed Delivery", sub: "Receiver unreachable", icon: "✕", warn: true },
      ].map(opt => (
        <button key={opt.id} onClick={() => setSel(opt.id)} style={{
          margin: "0 14px 10px", padding: "14px", borderRadius: 12,
          border: `2px solid ${sel === opt.id ? C.brand : C.border}`,
          background: sel === opt.id ? C.brandBg : C.white,
          display: "flex", gap: 12, alignItems: "center",
          cursor: "pointer", textAlign: "left",
        }}>
          <div style={{ width: 36, height: 36, background: opt.warn ? C.redBg : C.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{opt.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: opt.warn ? C.red : C.text }}>{opt.label}</div>
            <div style={{ fontSize: 11, color: C.sub }}>{opt.sub}</div>
          </div>
          <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${sel === opt.id ? C.brand : C.border}`, background: sel === opt.id ? C.brand : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {sel === opt.id && <div style={{ width: 6, height: 6, background: "#fff", borderRadius: "50%" }} />}
          </div>
        </button>
      ))}

      <div style={{ padding: "12px 14px", marginTop: "auto" }}>
        <button style={{ width: "100%", background: C.brand, color: "#fff", border: "none", borderRadius: 12, padding: "13px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Confirm · notify receiver ✓
        </button>
      </div>
    </div>
  );
}

function WorkerPayment() {
  return (
    <div style={{ flex: 1, background: C.white, fontFamily: F.brand, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 18, cursor: "pointer", color: C.sub }}>←</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Collect payment</div>
          <div style={{ fontSize: 11, color: C.sub }}>ME-2418-AX-991 · COD</div>
        </div>
        <span />
      </div>

      {/* Amount */}
      <div style={{ margin: 14, background: C.orange, borderRadius: 16, padding: "18px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 80, height: 80, background: "rgba(255,255,255,0.1)", borderRadius: "50%" }} />
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>AMOUNT DUE ON ARRIVAL</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>360.<span style={{ fontSize: 24 }}>50</span> <span style={{ fontSize: 18 }}>ETB</span></div>
        <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>Receiver</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Hana Tesfaye</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>Phone</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>+251 911 99 88 77</div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ margin: "0 14px", background: C.bg, borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.sub, letterSpacing: "0.08em", marginBottom: 10 }}>BREAKDOWN</div>
        {[["Shipping · Express", "320.00 ETB"], ["Fragile handling", "40.00 ETB"], ["VAT 15%", "0.50 ETB"]].map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 6, marginBottom: 6, borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 12, color: C.sub }}>{l}</span>
            <span style={{ fontSize: 12, color: C.text }}>{v}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Total due</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>360.50 ETB</span>
        </div>
      </div>

      <div style={{ padding: "12px 14px 0", fontSize: 10, fontWeight: 700, color: C.sub, letterSpacing: "0.08em" }}>HOW IS THE RECEIVER PAYING?</div>

      <div style={{ padding: "8px 14px", marginTop: "auto" }}>
        <button style={{ width: "100%", background: C.green, color: "#fff", border: "none", borderRadius: 12, padding: "13px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
          ✓ Confirm · 360.50 ETB received
        </button>
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, background: "#1a7aaa", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>tb</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Telebirr</span>
          <div style={{ marginLeft: "auto", width: 18, height: 18, border: `2px solid ${C.border}`, borderRadius: "50%" }} />
        </div>
      </div>
    </div>
  );
}

function WorkerProof() {
  return (
    <div style={{ flex: 1, background: C.white, fontFamily: F.brand, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 18, cursor: "pointer", color: C.sub }}>←</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Confirm delivery</div>
          <div style={{ fontSize: 11, color: C.sub }}>ME-2418-AX-991</div>
        </div>
        <span />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {/* Payment collected */}
        <div style={{ background: C.greenBg, border: `1px solid ${C.green}44`, borderRadius: 12, padding: 14, marginBottom: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ width: 32, height: 32, background: C.green, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, flexShrink: 0 }}>💵</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.green }}>Payment collected · 360.50 ETB</div>
            <div style={{ fontSize: 11, color: C.sub, marginTop: 2 }}>Cash · 400 ETB tendered · 39.50 ETB change given</div>
          </div>
          <div style={{ background: C.green, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>RCPT ✓</div>
        </div>

        {/* Verify receiver */}
        <div style={{ background: C.bg, borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.sub, letterSpacing: "0.08em", marginBottom: 10 }}>VERIFY RECEIVER</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: C.brand, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>HT</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Hana Tesfaye</div>
              <div style={{ fontSize: 11, color: C.sub }}>+251 911 99 88 77</div>
            </div>
            <div style={{ background: C.greenBg, border: `1px solid ${C.green}44`, borderRadius: 8, padding: "4px 10px", display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 12 }}>🪪</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.green }}>ID ✓</span>
            </div>
          </div>
        </div>

        {/* Proof photo */}
        <div style={{ fontSize: 11, fontWeight: 700, color: C.sub, letterSpacing: "0.08em", marginBottom: 8 }}>PROOF PHOTO</div>
        <div style={{ background: C.navy, borderRadius: 12, overflow: "hidden", height: 110, position: "relative" }}>
          <div style={{ position: "absolute", bottom: 6, left: 8, background: "rgba(0,0,0,0.5)", borderRadius: 6, padding: "2px 8px", display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 9, color: "#fff" }}>📍</span>
            <span style={{ fontSize: 9, color: "#fff" }}>Sabian, Dire Dawa</span>
          </div>
          <div style={{ position: "absolute", bottom: 6, right: 8, fontSize: 9, color: "rgba(255,255,255,0.5)" }}>24 May 2025 · 10:24</div>
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.3 }}>
            <div style={{ fontSize: 40 }}>📷</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 14px" }}>
        <button style={{ width: "100%", background: C.green, color: "#fff", border: "none", borderRadius: 12, padding: "13px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          ✓ Mark as delivered
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────

const VIEWS = [
  { id: "admin-dashboard", label: "Admin Dashboard", group: "admin" },
  { id: "admin-shipments", label: "Admin Shipments", group: "admin" },
  { id: "admin-branches", label: "Admin Branches", group: "admin" },
  { id: "cust-login", label: "Customer Login", group: "customer" },
  { id: "cust-home", label: "Customer Home", group: "customer" },
  { id: "cust-tracking", label: "Customer Tracking", group: "customer" },
  { id: "wk-routes", label: "Worker Routes", group: "worker" },
  { id: "wk-create", label: "Worker Create Shipment", group: "worker" },
  { id: "wk-label", label: "Worker Label / QR", group: "worker" },
  { id: "wk-status", label: "Worker Status Update", group: "worker" },
  { id: "wk-payment", label: "Worker Payment", group: "worker" },
  { id: "wk-proof", label: "Worker Proof of Delivery", group: "worker" },
];

const GROUP_COLORS = { admin: C.brand, customer: C.green, worker: C.orange };

export default function MelaApp() {
  const [view, setView] = useState("admin-dashboard");
  const [adminPage, setAdminPage] = useState("dashboard");
  const current = VIEWS.find(v => v.id === view);
  const isAdmin = current?.group === "admin";

  const renderContent = () => {
    if (view === "admin-dashboard") return <AdminDashboard />;
    if (view === "admin-shipments") return <AdminShipments />;
    if (view === "admin-branches") return <AdminBranches />;
    if (view === "cust-login") return <PhoneFrame><CustLogin /></PhoneFrame>;
    if (view === "cust-home") return <PhoneFrame><CustHome /></PhoneFrame>;
    if (view === "cust-tracking") return <PhoneFrame><CustTracking /></PhoneFrame>;
    if (view === "wk-routes") return <PhoneFrame><WorkerRoutes /></PhoneFrame>;
    if (view === "wk-create") return <PhoneFrame><WorkerCreateShipment /></PhoneFrame>;
    if (view === "wk-label") return <PhoneFrame><WorkerLabel /></PhoneFrame>;
    if (view === "wk-status") return <PhoneFrame><WorkerStatusUpdate /></PhoneFrame>;
    if (view === "wk-payment") return <PhoneFrame><WorkerPayment /></PhoneFrame>;
    if (view === "wk-proof") return <PhoneFrame><WorkerProof /></PhoneFrame>;
  };

  const handleAdminNav = (page) => {
    setAdminPage(page);
    if (page === "dashboard") setView("admin-dashboard");
    if (page === "shipments") setView("admin-shipments");
    if (page === "branches") setView("admin-branches");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", fontFamily: F.brand, display: "flex", flexDirection: "column" }}>
      {/* Top nav */}
      <div style={{ background: "#16191f", borderBottom: "1px solid #1e2535", padding: "10px 20px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 8 }}>
          <div style={{ width: 22, height: 22, background: C.brand, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 12 }}>✈</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>Mela Express</span>
          <span style={{ color: "#3d4455", fontSize: 12 }}>|</span>
          <span style={{ color: "#5a6278", fontSize: 11 }}>UI Demo</span>
        </div>
        {["admin", "customer", "worker"].map(g => (
          <div key={g} style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: GROUP_COLORS[g], fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 2 }}>{g}</span>
            {VIEWS.filter(v => v.group === g).map(v => (
              <button key={v.id} onClick={() => { setView(v.id); if (v.id.startsWith("admin")) setAdminPage(v.id.replace("admin-", "")); }} style={{
                padding: "4px 10px", borderRadius: 6, border: "none",
                background: view === v.id ? GROUP_COLORS[g] : "#1e2535",
                color: view === v.id ? "#fff" : "#6b7585",
                fontSize: 11, cursor: "pointer", fontWeight: view === v.id ? 700 : 400,
                transition: "all 0.15s",
              }}>{v.label.replace(/^(Admin|Customer|Worker) /, "")}</button>
            ))}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: isAdmin ? "stretch" : "center", justifyContent: "center", padding: isAdmin ? 0 : 32 }}>
        {isAdmin ? (
          <div style={{ width: "100%", maxWidth: 1100, background: C.white, margin: "20px auto", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column" }}>
            {/* Browser chrome */}
            <div style={{ background: "#2a2d38", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, background: c, borderRadius: "50%" }} />)}
              <div style={{ flex: 1, background: "#1e2030", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#5a6278", marginLeft: 8 }}>localhost:3000/{view.replace("admin-", "")}</div>
            </div>
            <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 600 }}>
              <AdminShell activePage={adminPage} onNav={handleAdminNav}>
                {renderContent()}
              </AdminShell>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 11, color: "#3d4455", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {current?.group?.toUpperCase()} · {current?.label}
            </div>
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
}
