import { useState } from "react";
import lwlLogo from "@/assets/lwl-logo.png";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Smartphone, Maximize2, Minimize2, X, Monitor,
  LayoutDashboard, ShoppingCart, Users, FileText, Truck,
  BarChart3, Package, Settings, Search, Bell,
  ChevronRight, TrendingUp, Clock, CheckCircle,
  DollarSign, Shirt, ExternalLink, Github,
  ClipboardList, AlertTriangle, HardHat, Phone, List,
  CircleDollarSign, Plus, Eye, Printer, Edit, Trash2,
  ChevronDown, LogOut, Shield, ArrowUpDown, Menu,
  Lock, User, Droplets, Tag, Home, MoreHorizontal,
} from "lucide-react";

type Screen =
  | "login"
  | "dashboard"
  | "orders"
  | "clients"
  | "bills"
  | "delivery"
  | "products"
  | "sales"
  | "inventory"
  | "todaysWork"
  | "workers"
  | "incidents"
  | "missingItems"
  | "dueCustomers"
  | "adminSettings"
  | "trackOrder"
  | "lockdown";

const USE_LEGACY_LWL_PREVIEW = false;

/* ──────────────────────── LOGIN SCREEN — TRUE REPLICA ──────────────────────── */

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="flex items-center justify-center h-full bg-gradient-to-br from-[hsl(var(--google-blue)/0.05)] to-background p-4">
    <div className="w-full max-w-sm space-y-6">
      {/* Laundry Animation / Logo area */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-google-blue/10 border-2 border-google-blue/20 flex items-center justify-center">
          <Droplets className="w-10 h-10 text-google-blue animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Liquid Washes Laundry</h2>
          <p className="text-xs text-muted-foreground">Management System</p>
        </div>
      </div>

      {/* Login Card */}
      <div className="border border-border rounded-xl bg-card p-5 shadow-lg space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">Sign In</h3>
          <p className="text-[10px] text-muted-foreground">Enter your credentials to access the system</p>
        </div>

        {/* Username field */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-medium text-foreground">Username</label>
          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background focus-within:border-google-blue transition-colors">
            <User className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-foreground">admin</span>
          </div>
        </div>

        {/* Password field */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-medium text-foreground">Password</label>
          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background focus-within:border-google-blue transition-colors">
            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">••••••••</span>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={onLogin}
          className="w-full bg-google-blue text-white text-xs font-medium py-2.5 rounded-lg hover:bg-google-blue/90 transition-colors shadow-md"
        >
          Sign In
        </button>
      </div>

      {/* Footer */}
      <div className="text-center space-y-1">
        <p className="text-[9px] text-muted-foreground">Al Dhanna City, Al Ruwais · Abu Dhabi</p>
        <p className="text-[9px] text-muted-foreground">Tel: 026 815 824 · Phone: +971 56 338 0001</p>
        <p className="text-[8px] text-muted-foreground">© 2024 Liquid Washes Laundry</p>
      </div>
    </div>
  </div>
);

/* ──────────────────────── STAFF DASHBOARD — TRUE REPLICA ──────────────────────── */

const DashboardScreen = () => (
  <div className="space-y-4">
    {/* Company Header — exact replica */}
    <div className="bg-google-blue/10 border border-google-blue/20 rounded-lg p-3 flex items-center justify-between">
      <div>
        <p className="text-[10px] text-muted-foreground">Tel: 026 815 824 · Phone: +971 56 338 0001</p>
        <p className="text-[10px] text-muted-foreground">Email: info@lwl.ae</p>
      </div>
      <a className="text-[10px] text-google-blue font-medium cursor-pointer">www.lwl.ae</a>
    </div>

    {/* Staff Dashboard Header */}
    <div>
      <h4 className="text-sm font-bold text-foreground">Staff Dashboard</h4>
      <p className="text-[10px] text-muted-foreground">Order Progress Overview</p>
    </div>

    {/* 4 Status Cards — exact replica from Dashboard.tsx */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {[
        { label: "Pending", count: 12, icon: <Clock className="w-4 h-4" />, color: "text-google-yellow", bg: "bg-google-yellow/10", border: "border-google-yellow/20" },
        { label: "Tagging", count: 8, icon: <Tag className="w-4 h-4" />, color: "text-google-blue", bg: "bg-google-blue/10", border: "border-google-blue/20" },
        { label: "Packing", count: 5, icon: <Package className="w-4 h-4" />, color: "text-google-red", bg: "bg-google-red/10", border: "border-google-red/20" },
        { label: "Delivered Today", count: 19, icon: <CheckCircle className="w-4 h-4" />, color: "text-google-green", bg: "bg-google-green/10", border: "border-google-green/20" },
      ].map((s, i) => (
        <div key={i} className={`${s.bg} border ${s.border} rounded-xl p-4 text-center transition-transform hover:scale-[1.02]`}>
          <div className={`${s.color} mx-auto mb-1.5`}>{s.icon}</div>
          <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
          <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
        </div>
      ))}
    </div>

    {/* Orders Needing Attention — exact replica table */}
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="bg-secondary/50 px-4 py-2.5 border-b border-border flex items-center justify-between">
        <h4 className="text-xs font-semibold text-foreground">Orders Needing Attention</h4>
        <span className="text-[9px] text-muted-foreground">Showing 5 of 25</span>
      </div>
      <div className="divide-y divide-border">
        {[
          { num: "ORD-2024-1247", customer: "Maria Santos", status: "Pending", statusColor: "bg-google-yellow/20 text-google-yellow", time: "2 hrs ago" },
          { num: "ORD-2024-1246", customer: "Golden Hotel (Corp)", status: "Tagging", statusColor: "bg-google-blue/20 text-google-blue", time: "3 hrs ago" },
          { num: "ORD-2024-1245", customer: "Ana Reyes", status: "Packing", statusColor: "bg-google-red/20 text-google-red", time: "4 hrs ago" },
          { num: "ORD-2024-1244", customer: "Juan Cruz", status: "Pending", statusColor: "bg-google-yellow/20 text-google-yellow", time: "5 hrs ago" },
          { num: "ORD-2024-1243", customer: "Pedro Lim", status: "Tagging", statusColor: "bg-google-blue/20 text-google-blue", time: "6 hrs ago" },
        ].map((order, i) => (
          <div key={i} className="px-4 py-2.5 flex items-center justify-between hover:bg-secondary/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-foreground">{order.num}</span>
              <span className="text-[10px] text-muted-foreground">{order.customer}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-muted-foreground">{order.time}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${order.statusColor}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ──────────────────────── INVENTORY / DASHBOARD (Admin) — TRUE REPLICA ──────────────────────── */

const InventoryScreen = () => (
  <div className="space-y-3">
    {/* TopBar replica — search + sort + add product */}
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex-1 min-w-[200px] bg-secondary/50 border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">Search inventory...</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 rounded-lg">
          <ArrowUpDown className="w-3 h-3" /> Sort
        </Button>
        <Button variant="default" size="sm" className="h-7 text-[10px] gap-1 rounded-lg">
          <Plus className="w-3 h-3" /> Add Product
        </Button>
      </div>
    </div>

    <div className="text-[10px] text-muted-foreground">
      Monitor your stock levels. · Total Items: <span className="text-foreground font-semibold">24</span>
    </div>

    {/* Product Cards Grid — replica of ProductCard component */}
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      {[
        { name: "T-Shirt", price: "AED 15", category: "Laundry", stock: 150, allocated: 12 },
        { name: "Blanket (Large)", price: "AED 35", category: "Bedding", stock: 45, allocated: 5 },
        { name: "Suit (Dry Clean)", price: "AED 80", category: "Dry Clean", stock: 20, allocated: 3 },
        { name: "Curtain / sqm", price: "AED 20", category: "Specialty", stock: 0, allocated: 0 },
        { name: "Bed Sheet", price: "AED 25", category: "Bedding", stock: 65, allocated: 8 },
        { name: "Uniform Set", price: "AED 22", category: "Laundry", stock: 30, allocated: 4 },
      ].map((p, i) => (
        <div key={i} className="border border-border rounded-xl p-3 hover:border-google-blue/40 hover:shadow-md transition-all group bg-card">
          <div className="flex items-start justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-google-blue/10 flex items-center justify-center">
              <Shirt className="w-4 h-4 text-google-blue" />
            </div>
            <span className="text-[8px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-full">{p.category}</span>
          </div>
          <p className="text-xs font-semibold text-foreground">{p.name}</p>
          <p className="text-sm font-bold text-google-green mt-0.5">{p.price}</p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <div className="space-y-0.5">
              <span className={`text-[9px] block ${p.stock === 0 ? "text-google-red font-medium" : "text-muted-foreground"}`}>
                Stock: {p.stock === 0 ? "Out of stock" : p.stock}
              </span>
              {p.allocated > 0 && (
                <span className="text-[8px] text-google-blue block">Allocated: {p.allocated}</span>
              )}
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Edit className="w-3 h-3 text-muted-foreground hover:text-google-blue cursor-pointer" />
              <Trash2 className="w-3 h-3 text-muted-foreground hover:text-google-red cursor-pointer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── ORDERS — TRUE REPLICA ──────────────────────── */

const OrdersScreen = () => (
  <div className="space-y-3">
    {/* TopBar — search + filters */}
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">Search by order number, client name...</span>
      </div>
      <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 rounded-lg">
        <ArrowUpDown className="w-3 h-3" /> Sort
      </Button>
    </div>

    {/* Status Filter Tabs — exact replica */}
    <div className="flex gap-1 overflow-x-auto pb-1">
      {[
        { label: "All", count: 44, active: true },
        { label: "Pending", count: 12, active: false },
        { label: "Tagging", count: 8, active: false },
        { label: "Packing", count: 5, active: false },
        { label: "Ready", count: 7, active: false },
        { label: "Delivered", count: 12, active: false },
      ].map((tab) => (
        <button
          key={tab.label}
          className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${
            tab.active
              ? "bg-google-blue text-white shadow-sm"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          {tab.label}
          <span className={`text-[8px] ${tab.active ? "bg-white/20" : "bg-muted"} px-1 rounded-full`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>

    {/* Orders Table — true replica with expanded columns */}
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="grid grid-cols-12 bg-secondary/60 px-3 py-2 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
        <span className="col-span-2">Order #</span>
        <span className="col-span-3">Client</span>
        <span className="col-span-2">Items</span>
        <span className="col-span-2">Amount</span>
        <span className="col-span-2">Status</span>
        <span className="col-span-1">Actions</span>
      </div>
      {[
        { id: "ORD-1247", client: "Maria Santos", items: "5 pcs", amount: "AED 850", status: "Ready", color: "bg-google-green/20 text-google-green", urgent: true, delivery: "Pickup" },
        { id: "ORD-1246", client: "Golden Hotel", items: "32 pcs", amount: "AED 8,500", status: "Packing", color: "bg-google-red/20 text-google-red", urgent: false, delivery: "Delivery" },
        { id: "ORD-1245", client: "Ana Reyes", items: "3 pcs", amount: "AED 350", status: "Tagging", color: "bg-google-blue/20 text-google-blue", urgent: false, delivery: "Pickup" },
        { id: "ORD-1244", client: "Pedro Lim", items: "8 pcs", amount: "AED 2,100", status: "Pending", color: "bg-google-yellow/20 text-google-yellow", urgent: true, delivery: "Delivery" },
        { id: "ORD-1243", client: "Juan Cruz", items: "12 pcs", amount: "AED 1,200", status: "Delivered", color: "bg-secondary text-muted-foreground", urgent: false, delivery: "Delivery" },
      ].map((order, i) => (
        <div key={i} className="grid grid-cols-12 px-3 py-2.5 items-center border-b border-border last:border-0 hover:bg-secondary/20 transition-colors text-[10px]">
          <div className="col-span-2 flex items-center gap-1">
            <span className="font-mono font-bold text-foreground">{order.id}</span>
            {order.urgent && (
              <span className="text-[7px] bg-google-red text-white px-1 rounded font-bold animate-pulse">URGENT</span>
            )}
          </div>
          <div className="col-span-3">
            <span className="text-foreground block">{order.client}</span>
            <span className="text-[8px] text-muted-foreground">{order.delivery}</span>
          </div>
          <span className="col-span-2 text-muted-foreground">{order.items}</span>
          <span className="col-span-2 font-semibold text-foreground">{order.amount}</span>
          <div className="col-span-2">
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${order.color}`}>
              {order.status}
            </span>
          </div>
          <div className="col-span-1 flex gap-1">
            <Eye className="w-3.5 h-3.5 text-muted-foreground hover:text-google-blue cursor-pointer transition-colors" />
            <Printer className="w-3.5 h-3.5 text-muted-foreground hover:text-google-blue cursor-pointer transition-colors" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── CLIENTS — TRUE REPLICA (ClientCard) ──────────────────────── */

const ClientsScreen = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">Search clients...</span>
      </div>
      <Button variant="default" size="sm" className="h-7 text-[10px] gap-1 rounded-lg">
        <Plus className="w-3 h-3" /> Add Client
      </Button>
    </div>

    <div className="space-y-2">
      {[
        { name: "Maria Santos", type: "VIP", phone: "+971 50 ***", orders: 42, balance: "AED 0", credit: 0, lastOrder: "Apr 7, 2026" },
        { name: "Golden Hotel", type: "Corporate", phone: "+971 56 ***", orders: 89, balance: "AED 5,400", credit: 5400, lastOrder: "Apr 8, 2026" },
        { name: "Juan Cruz", type: "Regular", phone: "+971 55 ***", orders: 15, balance: "AED 1,200", credit: 1200, lastOrder: "Apr 5, 2026" },
        { name: "Ana Reyes", type: "Walk-in", phone: "+971 52 ***", orders: 7, balance: "AED 0", credit: 0, lastOrder: "Apr 3, 2026" },
      ].map((client, i) => (
        <div key={i} className="border border-border rounded-xl p-3 hover:border-google-blue/40 hover:shadow-sm transition-all bg-card">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-google-blue/15 flex items-center justify-center text-google-blue text-sm font-bold shrink-0">
              {client.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-foreground">{client.name}</span>
                <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium ${
                  client.type === "VIP" ? "bg-google-yellow/20 text-google-yellow" :
                  client.type === "Corporate" ? "bg-google-blue/20 text-google-blue" :
                  client.type === "Walk-in" ? "bg-secondary text-muted-foreground" :
                  "bg-google-green/20 text-google-green"
                }`}>
                  {client.type}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground flex-wrap">
                <span>{client.phone}</span>
                <span>·</span>
                <span>{client.orders} orders</span>
                <span>·</span>
                <span>Last: {client.lastOrder}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-muted-foreground">Balance</p>
              <p className={`text-xs font-bold ${client.credit > 0 ? "text-google-red" : "text-google-green"}`}>
                {client.balance}
              </p>
            </div>
          </div>
          <div className="flex gap-1 mt-2 pt-2 border-t border-border">
            {[
              { icon: <Eye className="w-3 h-3" />, label: "View" },
              { icon: <Edit className="w-3 h-3" />, label: "Edit" },
              { icon: <FileText className="w-3 h-3" />, label: "Bills" },
              { icon: <Phone className="w-3 h-3" />, label: "Contact" },
            ].map((action, j) => (
              <button key={j} className="flex items-center gap-1 text-[9px] text-muted-foreground hover:text-google-blue px-1.5 py-0.5 rounded transition-colors">
                {action.icon} {action.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── BILLS — TRUE REPLICA ──────────────────────── */

const BillsScreen = () => (
  <div className="space-y-3">
    <div className="flex gap-1">
      {["All", "Unpaid", "Partial", "Paid", "Overdue"].map((tab, i) => (
        <button key={tab} className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${i === 0 ? "bg-google-blue text-white shadow-sm" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
          {tab}
        </button>
      ))}
    </div>

    <div className="border border-border rounded-xl overflow-hidden">
      <div className="grid grid-cols-12 bg-secondary/60 px-3 py-2 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
        <span className="col-span-3">Bill Ref</span>
        <span className="col-span-3">Client</span>
        <span className="col-span-2">Amount</span>
        <span className="col-span-2">Paid</span>
        <span className="col-span-2">Status</span>
      </div>
      {[
        { ref: "BILL-0891", client: "Maria Santos", amount: "AED 850", paid: "AED 850", status: "Paid", color: "text-google-green" },
        { ref: "BILL-0890", client: "Juan Cruz", amount: "AED 1,200", paid: "AED 600", status: "Partial", color: "text-google-yellow" },
        { ref: "BILL-0889", client: "Golden Hotel", amount: "AED 8,500", paid: "AED 0", status: "Unpaid", color: "text-google-red" },
        { ref: "BILL-0888", client: "Ana Reyes", amount: "AED 350", paid: "AED 350", status: "Paid", color: "text-google-green" },
        { ref: "BILL-0887", client: "Pedro Lim", amount: "AED 2,100", paid: "AED 0", status: "Overdue", color: "text-google-red" },
      ].map((bill, i) => (
        <div key={i} className="grid grid-cols-12 px-3 py-2.5 items-center border-b border-border last:border-0 hover:bg-secondary/20 transition-colors text-[10px]">
          <span className="col-span-3 font-mono font-bold text-foreground">{bill.ref}</span>
          <span className="col-span-3 text-foreground">{bill.client}</span>
          <span className="col-span-2 font-semibold text-foreground">{bill.amount}</span>
          <span className="col-span-2 text-muted-foreground">{bill.paid}</span>
          <span className={`col-span-2 font-medium ${bill.color}`}>{bill.status}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── DELIVERY — TRUE REPLICA ──────────────────────── */

const DeliveryScreen = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Pending Pickup", count: 5, color: "text-google-yellow", bg: "bg-google-yellow/10" },
        { label: "In Transit", count: 3, color: "text-google-blue", bg: "bg-google-blue/10" },
        { label: "Delivered Today", count: 12, color: "text-google-green", bg: "bg-google-green/10" },
      ].map((s, i) => (
        <div key={i} className={`${s.bg} border border-border rounded-xl p-3 text-center`}>
          <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
          <p className="text-[9px] text-muted-foreground font-medium">{s.label}</p>
        </div>
      ))}
    </div>

    <div className="border border-border rounded-xl overflow-hidden">
      <div className="bg-secondary/50 px-4 py-2.5 border-b border-border">
        <h4 className="text-xs font-semibold text-foreground">Delivery Queue</h4>
      </div>
      {[
        { order: "ORD-1246", client: "Golden Hotel", address: "Al Dhanna City, Block 5", time: "2:30 PM", driver: "Ahmed", status: "In Transit", color: "bg-google-blue/20 text-google-blue" },
        { order: "ORD-1243", client: "Ana Reyes", address: "Al Ruwais, Villa 12", time: "3:00 PM", driver: "Unassigned", status: "Pending", color: "bg-google-yellow/20 text-google-yellow" },
        { order: "ORD-1240", client: "Pedro Lim", address: "Mirfa, Apt 3B", time: "4:15 PM", driver: "Unassigned", status: "Pending", color: "bg-google-yellow/20 text-google-yellow" },
      ].map((d, i) => (
        <div key={i} className="px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-foreground">{d.order}</span>
              <span className="text-[10px] text-foreground font-medium">{d.client}</span>
            </div>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${d.color}`}>{d.status}</span>
          </div>
          <div className="flex items-center gap-3 text-[9px] text-muted-foreground">
            <span>📍 {d.address}</span>
            <span>🕐 {d.time}</span>
            <span className={d.driver === "Unassigned" ? "text-google-red" : ""}>🚗 {d.driver}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── SALES — TRUE REPLICA ──────────────────────── */

const SalesScreen = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-google-green/10 border border-google-green/20 rounded-xl p-3 text-center">
        <p className="text-[9px] text-muted-foreground">Today's Revenue</p>
        <p className="text-sm font-bold text-google-green">AED 12,450</p>
        <p className="text-[9px] text-google-green flex items-center justify-center gap-0.5"><TrendingUp className="w-3 h-3" /> +12%</p>
      </div>
      <div className="bg-google-blue/10 border border-google-blue/20 rounded-xl p-3 text-center">
        <p className="text-[9px] text-muted-foreground">Orders Processed</p>
        <p className="text-sm font-bold text-google-blue">34</p>
        <p className="text-[9px] text-google-blue">+5 from yesterday</p>
      </div>
      <div className="bg-google-yellow/10 border border-google-yellow/20 rounded-xl p-3 text-center">
        <p className="text-[9px] text-muted-foreground">Outstanding</p>
        <p className="text-sm font-bold text-google-yellow">AED 15,050</p>
        <p className="text-[9px] text-google-red">8 unpaid bills</p>
      </div>
    </div>

    {/* Weekly Revenue Chart */}
    <div className="border border-border rounded-xl p-4 space-y-2">
      <h4 className="text-xs font-semibold text-foreground">Weekly Revenue</h4>
      <div className="flex items-end gap-1.5 h-28">
        {[
          { day: "Mon", val: 40, amount: "AED 8.2k" },
          { day: "Tue", val: 65, amount: "AED 13.1k" },
          { day: "Wed", val: 55, amount: "AED 11.0k" },
          { day: "Thu", val: 80, amount: "AED 16.2k" },
          { day: "Fri", val: 70, amount: "AED 14.1k" },
          { day: "Sat", val: 95, amount: "AED 19.3k" },
          { day: "Sun", val: 45, amount: "AED 9.0k" },
        ].map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
            <div className="absolute -top-5 opacity-0 group-hover:opacity-100 text-[7px] text-google-blue font-bold bg-card border border-border px-1.5 py-0.5 rounded shadow-sm transition-opacity z-10 whitespace-nowrap">
              {d.amount}
            </div>
            <div
              className="w-full bg-google-blue/60 hover:bg-google-blue rounded-t-sm transition-colors cursor-pointer"
              style={{ height: `${d.val}%` }}
            />
            <span className="text-[8px] text-muted-foreground font-medium">{d.day}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Top Services */}
    <div className="border border-border rounded-xl p-4 space-y-2">
      <h4 className="text-xs font-semibold text-foreground">Top Services</h4>
      {[
        { name: "Wash & Iron", pct: 45, revenue: "AED 38,200" },
        { name: "Dry Clean", pct: 25, revenue: "AED 21,500" },
        { name: "Iron Only", pct: 18, revenue: "AED 15,100" },
        { name: "Urgent Wash", pct: 12, revenue: "AED 10,800" },
      ].map((s, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-foreground font-medium">{s.name}</span>
            <span className="text-muted-foreground">{s.revenue} · {s.pct}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-google-blue rounded-full h-2 transition-all" style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── TODAY'S WORK — REPLICA ──────────────────────── */
const TodaysWorkScreen = () => (
  <div className="space-y-3">
    <div className="bg-google-blue text-white rounded-xl px-4 py-2 overflow-hidden">
      <div className="flex gap-8 text-[10px] whitespace-nowrap animate-pulse">
        <span>📞 +971 56 338 0001</span>
        <span>✉ info@lwl.ae</span>
        <span>🌐 www.lwl.ae</span>
        <span>☎ 026 815 824</span>
      </div>
    </div>
    <div className="border border-border rounded-2xl p-6 text-center bg-gradient-to-br from-google-blue/5 to-transparent">
      <p className="text-4xl font-bold text-foreground">14:32<span className="text-2xl">:08</span></p>
      <p className="text-[10px] text-muted-foreground mt-1">Wednesday, May 13 · UAE Time (GMT+4)</p>
    </div>
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-foreground">Today's Work</h4>
      <Badge className="bg-google-blue/15 text-google-blue border border-google-blue/30 text-[9px]">
        <Clock className="w-2.5 h-2.5 mr-1" />Live Updates
      </Badge>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {[
        { label: "Pending", val: 12, bg: "bg-google-yellow/10 border-google-yellow/20", text: "text-google-yellow" },
        { label: "In Wash", val: 8, bg: "bg-google-blue/10 border-google-blue/20", text: "text-google-blue" },
        { label: "Packing", val: 5, bg: "bg-google-red/10 border-google-red/20", text: "text-google-red" },
        { label: "Ready", val: 14, bg: "bg-google-green/10 border-google-green/20", text: "text-google-green" },
      ].map((s) => (
        <div key={s.label} className={`${s.bg} border rounded-xl p-3`}>
          <p className="text-[9px] text-muted-foreground">{s.label}</p>
          <p className={`text-xl font-bold ${s.text}`}>{s.val}</p>
        </div>
      ))}
    </div>
    <div className="border border-border rounded-xl p-3 space-y-1.5">
      <h4 className="text-[11px] font-semibold text-foreground mb-2">Worker Productivity Today</h4>
      {[
        { name: "Ahmed K.", done: 18, target: 20 },
        { name: "Maria S.", done: 15, target: 18 },
        { name: "John P.", done: 22, target: 20 },
      ].map((w) => (
        <div key={w.name} className="space-y-1">
          <div className="flex justify-between text-[10px]"><span className="text-foreground">{w.name}</span><span className="text-muted-foreground">{w.done}/{w.target}</span></div>
          <div className="w-full bg-secondary rounded-full h-1.5"><div className="bg-google-green rounded-full h-1.5" style={{ width: `${(w.done/w.target)*100}%` }} /></div>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── WORKERS — REPLICA ──────────────────────── */
const WorkersScreen = () => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-foreground">Workers Roster</h4>
      <button className="text-[10px] bg-google-blue text-white px-3 py-1.5 rounded-lg flex items-center gap-1"><Plus className="w-3 h-3" />Add Worker</button>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Active", val: 14, bg: "bg-google-green/10 border-google-green/20", text: "text-google-green" },
        { label: "On Leave", val: 2, bg: "bg-google-yellow/10 border-google-yellow/20", text: "text-google-yellow" },
        { label: "Total Staff", val: 16, bg: "bg-google-blue/10 border-google-blue/20", text: "text-google-blue" },
      ].map((s) => (
        <div key={s.label} className={`${s.bg} border rounded-xl p-3 text-center`}>
          <p className="text-[9px] text-muted-foreground">{s.label}</p>
          <p className={`text-base font-bold ${s.text}`}>{s.val}</p>
        </div>
      ))}
    </div>
    <div className="border border-border rounded-xl divide-y divide-border">
      {[
        { name: "Ahmed Khan", role: "Counter", shift: "Morning", status: "Active" },
        { name: "Maria Santos", role: "Section", shift: "Morning", status: "Active" },
        { name: "John Perez", role: "Driver", shift: "Full Day", status: "Active" },
        { name: "Rashid Ali", role: "Reception", shift: "Evening", status: "On Leave" },
        { name: "Liza Cruz", role: "Staff", shift: "Evening", status: "Active" },
      ].map((w, i) => (
        <div key={i} className="flex items-center justify-between p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-google-blue/15 text-google-blue text-[10px] font-bold flex items-center justify-center">{w.name.split(" ").map((n) => n[0]).join("")}</div>
            <div>
              <p className="text-[11px] font-medium text-foreground">{w.name}</p>
              <p className="text-[9px] text-muted-foreground">{w.role} · {w.shift}</p>
            </div>
          </div>
          <Badge className={`text-[9px] ${w.status === "Active" ? "bg-google-green/15 text-google-green" : "bg-google-yellow/15 text-google-yellow"} border-0`}>{w.status}</Badge>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── INCIDENTS — REPLICA ──────────────────────── */
const IncidentsScreen = () => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-google-red" />Incidents Log</h4>
      <button className="text-[10px] bg-google-red text-white px-3 py-1.5 rounded-lg flex items-center gap-1"><Plus className="w-3 h-3" />Report</button>
    </div>
    <div className="space-y-2">
      {[
        { id: "INC-024", date: "May 12, 2026", severity: "High", title: "Damaged garment — silk shirt", who: "Maria S.", badge: "bg-google-red/15 text-google-red" },
        { id: "INC-023", date: "May 11, 2026", severity: "Medium", title: "Wrong tag applied to ORD-1244", who: "Ahmed K.", badge: "bg-google-yellow/15 text-google-yellow" },
        { id: "INC-022", date: "May 10, 2026", severity: "Low", title: "Late delivery — traffic delay", who: "John P.", badge: "bg-google-blue/15 text-google-blue" },
        { id: "INC-021", date: "May 09, 2026", severity: "Medium", title: "Misplaced bill receipt", who: "Liza C.", badge: "bg-google-yellow/15 text-google-yellow" },
      ].map((i) => (
        <div key={i.id} className="border border-border rounded-xl p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground">{i.id}</span>
            <Badge className={`text-[9px] ${i.badge} border-0`}>{i.severity}</Badge>
          </div>
          <p className="text-[11px] font-medium text-foreground">{i.title}</p>
          <div className="flex items-center justify-between text-[9px] text-muted-foreground"><span>Reported by {i.who}</span><span>{i.date}</span></div>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── MISSING ITEMS — REPLICA ──────────────────────── */
const MissingItemsScreen = () => (
  <div className="space-y-3">
    <div className="bg-google-yellow/10 border border-google-yellow/30 rounded-xl p-3 flex items-center gap-3">
      <AlertTriangle className="w-5 h-5 text-google-yellow flex-shrink-0" />
      <div>
        <p className="text-[11px] font-semibold text-foreground">5 items currently flagged as missing</p>
        <p className="text-[9px] text-muted-foreground">Cross-checked against intake checklists</p>
      </div>
    </div>
    <div className="border border-border rounded-xl divide-y divide-border">
      {[
        { order: "ORD-1247", item: "1× Black trousers", reported: "Today", status: "Investigating" },
        { order: "ORD-1241", item: "2× White shirts", reported: "Yesterday", status: "Investigating" },
        { order: "ORD-1238", item: "1× Silk scarf", reported: "May 11", status: "Found" },
        { order: "ORD-1235", item: "1× Children's jacket", reported: "May 10", status: "Investigating" },
        { order: "ORD-1230", item: "1× Bedsheet set", reported: "May 09", status: "Refunded" },
      ].map((m, i) => (
        <div key={i} className="p-2.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-foreground">{m.item}</p>
            <p className="text-[9px] text-muted-foreground font-mono">{m.order} · {m.reported}</p>
          </div>
          <Badge className={`text-[9px] border-0 ${m.status === "Found" ? "bg-google-green/15 text-google-green" : m.status === "Refunded" ? "bg-google-blue/15 text-google-blue" : "bg-google-yellow/15 text-google-yellow"}`}>{m.status}</Badge>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── DUE CUSTOMERS — REPLICA ──────────────────────── */
const DueCustomersScreen = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-google-red/10 border border-google-red/20 rounded-xl p-3">
        <p className="text-[9px] text-muted-foreground">Total Outstanding</p>
        <p className="text-base font-bold text-google-red">AED 28,450</p>
      </div>
      <div className="bg-google-yellow/10 border border-google-yellow/20 rounded-xl p-3">
        <p className="text-[9px] text-muted-foreground">Customers Due</p>
        <p className="text-base font-bold text-google-yellow">17</p>
      </div>
    </div>
    <div className="border border-border rounded-xl divide-y divide-border">
      {[
        { name: "Golden Hotel", phone: "+971 50 111 2222", due: "AED 8,500", days: 12 },
        { name: "Pedro Lim", phone: "+971 55 333 4444", due: "AED 2,100", days: 8 },
        { name: "Marina Tower", phone: "+971 52 555 6666", due: "AED 6,200", days: 21 },
        { name: "Juan Cruz", phone: "+971 50 777 8888", due: "AED 1,200", days: 5 },
        { name: "Royal Suites", phone: "+971 56 999 0000", due: "AED 4,800", days: 15 },
      ].map((c, i) => (
        <div key={i} className="p-2.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-foreground">{c.name}</p>
            <p className="text-[9px] text-muted-foreground">{c.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold text-google-red">{c.due}</p>
            <p className="text-[9px] text-muted-foreground">{c.days}d overdue</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ──────────────────────── ADMIN SETTINGS — REPLICA ──────────────────────── */
const AdminSettingsScreen = () => (
  <div className="space-y-3">
    <h4 className="text-sm font-bold text-foreground flex items-center gap-2"><Settings className="w-4 h-4" />Admin Settings</h4>
    {[
      { title: "System Lockdown", desc: "Block all non-admin access for maintenance", status: "Disabled", icon: <Shield className="w-4 h-4 text-google-red" /> },
      { title: "Database Export", desc: "Backup all tables to JSON archive", status: "Last: May 12", icon: <Package className="w-4 h-4 text-google-blue" /> },
      { title: "Order Cleanup", desc: "Bulk delete orders older than selected month", status: "Configure", icon: <Trash2 className="w-4 h-4 text-google-yellow" /> },
      { title: "Reset Selections", desc: "Reset orders / clients / staff data", status: "Manage", icon: <ArrowUpDown className="w-4 h-4 text-google-green" /> },
      { title: "Payroll Cutoff", desc: "End-of-day reconciliation and payroll period", status: "May 1 – May 15", icon: <CircleDollarSign className="w-4 h-4 text-google-blue" /> },
    ].map((s, i) => (
      <div key={i} className="border border-border rounded-xl p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">{s.icon}</div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-foreground">{s.title}</p>
            <p className="text-[9px] text-muted-foreground truncate">{s.desc}</p>
          </div>
        </div>
        <span className="text-[9px] text-muted-foreground flex-shrink-0">{s.status}</span>
      </div>
    ))}
  </div>
);

/* ──────────────────────── TRACK ORDER (PUBLIC) — REPLICA ──────────────────────── */
const TrackOrderScreen = () => (
  <div className="space-y-3">
    <div className="text-center space-y-1">
      <div className="w-12 h-12 mx-auto rounded-2xl bg-google-blue/10 border-2 border-google-blue/20 flex items-center justify-center">
        <Search className="w-6 h-6 text-google-blue" />
      </div>
      <h4 className="text-sm font-bold text-foreground">Track Your Order</h4>
      <p className="text-[10px] text-muted-foreground">Enter your order number below</p>
    </div>
    <div className="flex gap-2">
      <div className="flex-1 border border-border rounded-lg px-3 py-2 bg-background text-[11px] text-foreground">ORD-1245</div>
      <button className="bg-google-blue text-white text-[10px] px-3 py-2 rounded-lg">Search</button>
    </div>
    <div className="border border-border rounded-xl p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-muted-foreground">Order</p>
          <p className="text-[12px] font-bold text-foreground font-mono">ORD-1245</p>
        </div>
        <Badge className="bg-google-yellow/15 text-google-yellow border-0 text-[9px]">In Packing</Badge>
      </div>
      <div className="space-y-2">
        {[
          { label: "Tagged", done: true },
          { label: "Washed", done: true },
          { label: "Packed", done: false, current: true },
          { label: "Delivered", done: false },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step.done ? "bg-google-green text-white" : step.current ? "bg-google-yellow text-white animate-pulse" : "bg-secondary text-muted-foreground"}`}>
              {step.done ? <CheckCircle className="w-3 h-3" /> : <span className="text-[9px] font-bold">{i + 1}</span>}
            </div>
            <span className={`text-[11px] ${step.done ? "text-foreground" : step.current ? "text-google-yellow font-semibold" : "text-muted-foreground"}`}>{step.label}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-2 flex justify-between text-[10px]">
        <span className="text-muted-foreground">Balance Due</span>
        <span className="font-bold text-foreground">AED 240</span>
      </div>
    </div>
    <div className="border border-border rounded-xl p-3 space-y-1.5">
      <p className="text-[10px] font-semibold text-foreground">Rate Your Service</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`text-base ${n <= 4 ? "text-google-yellow" : "text-muted-foreground/40"}`}>★</span>
        ))}
      </div>
    </div>
  </div>
);

/* ──────────────────────── LOCKDOWN — REPLICA ──────────────────────── */
const LockdownScreen = () => (
  <div className="flex items-center justify-center h-full p-4">
    <div className="max-w-sm w-full space-y-4 text-center">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-google-red/10 border-2 border-google-red/30 flex items-center justify-center">
        <Lock className="w-8 h-8 text-google-red" />
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold text-foreground">System Lockdown Active</h4>
        <p className="text-[10px] text-muted-foreground">Scheduled maintenance in progress.<br />Locked May 13, 2026 · 09:30</p>
      </div>
      <div className="border border-border rounded-xl bg-card p-4 space-y-3 text-left">
        <p className="text-[10px] font-semibold text-foreground">Admin Override</p>
        <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">admin</span>
        </div>
        <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 bg-background">
          <Lock className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">••••••••</span>
        </div>
        <button className="w-full bg-google-red text-white text-[11px] font-medium py-2 rounded-lg">Unlock System</button>
      </div>
    </div>
  </div>
);

const screens: Record<Exclude<Screen, "login">, { component: React.ReactNode; title: string; subtitle: string }> = {
  dashboard: { component: <DashboardScreen />, title: "Dashboard", subtitle: "Overview of today's operations" },
  inventory: { component: <InventoryScreen />, title: "Inventory", subtitle: "Monitor your stock levels" },
  orders: { component: <OrdersScreen />, title: "Order Tracking", subtitle: "Track and manage all orders" },
  clients: { component: <ClientsScreen />, title: "Clients", subtitle: "Manage customer accounts" },
  bills: { component: <BillsScreen />, title: "Bills & Payments", subtitle: "Invoices and payment tracking" },
  delivery: { component: <DeliveryScreen />, title: "Delivery Dashboard", subtitle: "Dispatch and delivery management" },
  products: { component: <InventoryScreen />, title: "New Order", subtitle: "Create a new order from price list" },
  sales: { component: <SalesScreen />, title: "Sales Reports", subtitle: "Revenue analytics and reports" },
  todaysWork: { component: <TodaysWorkScreen />, title: "Today's Work", subtitle: "Live daily work queue (UAE time)" },
  workers: { component: <WorkersScreen />, title: "Workers", subtitle: "Roster, shifts and productivity" },
  incidents: { component: <IncidentsScreen />, title: "Incidents", subtitle: "Logged incidents and accountability" },
  missingItems: { component: <MissingItemsScreen />, title: "Missing Items", subtitle: "Items reported missing per order" },
  dueCustomers: { component: <DueCustomersScreen />, title: "Due Customers", subtitle: "Customers with outstanding balances" },
  adminSettings: { component: <AdminSettingsScreen />, title: "Admin Settings", subtitle: "System configuration and lockdown controls" },
  trackOrder: { component: <TrackOrderScreen />, title: "Public Tracking", subtitle: "Customer-facing order status lookup" },
  lockdown: { component: <LockdownScreen />, title: "System Lockdown", subtitle: "Maintenance mode — admin override" },
};

/* ──────────────────────── SIDEBAR — EXACT REPLICA from Sidebar.tsx ──────────────────────── */

const sidebarGroups: { label: string; items: { key: Screen; label: string; icon: React.ReactNode; roles: string[] }[] }[] = [
  {
    label: "Operations",
    items: [
      { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, roles: ["admin", "counter", "reception", "section", "staff"] },
      { key: "todaysWork", label: "Today's Work", icon: <Clock className="w-4 h-4" />, roles: ["admin", "section", "staff"] },
      { key: "delivery", label: "Delivery Dashboard", icon: <Truck className="w-4 h-4" />, roles: ["admin", "driver"] },
      { key: "products", label: "New Order", icon: <List className="w-4 h-4" />, roles: ["admin", "counter", "reception", "driver"] },
      { key: "orders", label: "Order Tracking", icon: <ClipboardList className="w-4 h-4" />, roles: ["admin", "counter", "reception", "section", "staff", "driver"] },
    ],
  },
  {
    label: "Business",
    items: [
      { key: "inventory", label: "Inventory", icon: <Package className="w-4 h-4" />, roles: ["admin", "counter", "reception"] },
      { key: "clients", label: "Clients", icon: <Users className="w-4 h-4" />, roles: ["admin", "counter", "reception"] },
      { key: "bills", label: "Bills", icon: <FileText className="w-4 h-4" />, roles: ["admin", "counter", "reception", "driver"] },
      { key: "dueCustomers", label: "Due Customers", icon: <CircleDollarSign className="w-4 h-4" />, roles: ["admin", "counter", "reception"] },
    ],
  },
  {
    label: "Reports",
    items: [
      { key: "sales", label: "Sales Reports", icon: <BarChart3 className="w-4 h-4" />, roles: ["admin"] },
      { key: "incidents", label: "Incidents", icon: <AlertTriangle className="w-4 h-4" />, roles: ["admin", "counter", "reception", "section", "staff"] },
      { key: "missingItems", label: "Missing Items", icon: <Search className="w-4 h-4" />, roles: ["admin", "counter", "reception", "section", "staff"] },
      { key: "trackOrder", label: "Public Tracking", icon: <Search className="w-4 h-4" />, roles: ["admin", "counter", "reception", "section", "staff"] },
      { key: "dashboard", label: "Contact", icon: <Phone className="w-4 h-4" />, roles: ["admin", "counter", "reception", "section", "staff", "driver"] },
    ],
  },
  {
    label: "Settings",
    items: [
      { key: "workers", label: "Workers", icon: <HardHat className="w-4 h-4" />, roles: ["admin"] },
      { key: "adminSettings", label: "Admin Settings", icon: <Settings className="w-4 h-4" />, roles: ["admin"] },
      { key: "lockdown", label: "Lockdown Mode", icon: <Lock className="w-4 h-4" />, roles: ["admin"] },
    ],
  },
];

/* ──────────────────────── MAIN COMPONENT ──────────────────────── */

const LWLAppPreview = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("login");
  const [showPreview, setShowPreview] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = () => setActiveScreen("dashboard");
  const handleLogout = () => setActiveScreen("login");

  const currentScreen = activeScreen === "login" ? null : screens[activeScreen];

  return (
    <div className="space-y-6">
      {/* Project Header Card */}
      <Card className="border-border p-6 shadow-google-lg">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-google-blue/15 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5">
              <img src={lwlLogo} alt="LWL Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-foreground">
                LWL — Liquid Washes Laundry Management System
              </h3>
              <span className="text-sm text-google-yellow">⭐ Full-Stack Production App</span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            A comprehensive full-stack laundry sales and management system built for real-world business operations
            in Al Dhanna City, Al Ruwais, Abu Dhabi. This production-grade application handles the complete lifecycle
            of a laundry business — from customer walk-in order entry to delivery tracking, billing, payment processing,
            and sales analytics. Features role-based access for admin, counter, reception, section, staff, and driver users.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Order Management", desc: "Full lifecycle — Pending → Tagging → Packing → Ready → Delivered with urgent order support, checklist stages, and order receipts" },
              { title: "Client & CRM", desc: "Client profiles with VIP/Corporate/Walk-in tiers, credit/debit balance tracking, deposits, discounts, and transaction history" },
              { title: "Billing & Payments", desc: "Automated billing with partial payments, multiple payment methods (cash/card/bank), receipt/invoice printing, and overdue tracking" },
              { title: "Product Catalog", desc: "Dynamic pricing for wash, dry clean, iron services with stock management, category sorting, and allocated stock tracking" },
              { title: "Delivery System", desc: "Driver assignment, delivery scheduling, route management with address-based dispatch and real-time status updates" },
              { title: "Sales Analytics", desc: "Daily/weekly sales reports, revenue trends, service performance analytics, worker productivity tracking, and due customer reports" },
              { title: "Public Order Tracking", desc: "Customer-facing track-order portal — look up live status by order ID without needing a login" },
              { title: "Admin Settings & Lockdown", desc: "Admin control panel with system lockdown mode for maintenance, payroll cutoffs, and end-of-day reconciliation" },
              { title: "Workers & Incidents", desc: "Worker roster management with incident logging, missing-items reports, and accountability tracking per shift" },
              { title: "Today's Work & Due Customers", desc: "At-a-glance daily work queue, daily sales totals, due-customer follow-up list, and delivery history archive" },
            ].map((feat, i) => (
              <div key={i} className="bg-secondary/30 rounded-xl p-3 space-y-1 border border-border/50">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-google-blue" />
                  {feat.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {["TypeScript", "React", "Node.js", "Express", "PostgreSQL", "Drizzle ORM", "Vite", "Tailwind CSS", "shadcn/ui", "Docker", "Google Cloud", "Wouter", "TanStack Query", "Framer Motion"].map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-secondary text-secondary-foreground border border-border"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Architecture */}
          <div className="bg-secondary/20 rounded-xl p-4 space-y-2 border border-border">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4 text-google-blue" />
              Architecture & Technical Highlights
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>• <strong className="text-foreground">Full-Stack TypeScript Monorepo</strong> — Shared types between client and server with unified build system</li>
              <li>• <strong className="text-foreground">RESTful API</strong> — Express.js backend with comprehensive route handling for all business entities</li>
              <li>• <strong className="text-foreground">Database Schema</strong> — 10+ PostgreSQL tables with Drizzle ORM for type-safe queries and migrations</li>
              <li>• <strong className="text-foreground">Role-Based Access</strong> — Admin, counter, reception, section, staff, and driver roles with permission management</li>
              <li>• <strong className="text-foreground">Cloud Deployment</strong> — Dockerized for Google Cloud Run with CI/CD via Cloud Build</li>
              <li>• <strong className="text-foreground">Credit Management</strong> — Client credit/debit system with running balance calculation and due customer reports</li>
              <li>• <strong className="text-foreground">Incident Tracking</strong> — Missing items and incident report management for quality assurance</li>
              <li>• <strong className="text-foreground">Invoice System</strong> — Auto-generated invoices with item descriptions, company branding, and thermal print support</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="http://77.37.44.92/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="default"
                size="sm"
                className="gap-2 rounded-full"
              >
                <Monitor className="w-4 h-4" />
                Open Live App
                <ExternalLink className="w-3 h-3" />
              </Button>
            </a>
            <a
              href="https://github.com/mclasstourism/Liquid-Washes-Laundry"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full hover:border-google-blue hover:text-google-blue transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3" />
              </Button>
            </a>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full hover:border-google-green hover:text-google-green transition-colors"
              onClick={() => { setShowPreview(!showPreview); if (!showPreview) { setIsFullscreen(true); setActiveScreen("login"); } }}
            >
              <Smartphone className="w-4 h-4" />
              {showPreview ? "Hide UI Replica" : "View UI Replica"}
            </Button>
          </div>
        </div>
      </Card>

      {/* ──────────── INTERACTIVE TRUE REPLICA PREVIEW ──────────── */}
      {showPreview && (
        <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4" : ""} animate-fade-in`}>
          <div className={`${isFullscreen ? "w-full h-full max-w-[1400px] flex flex-col" : ""} ${viewMode === "mobile" && !isFullscreen ? "max-w-[375px] mx-auto" : ""}`}>
            <Card className={`border-border shadow-google-xl overflow-hidden flex flex-col ${isFullscreen ? "flex-1 h-full" : ""}`}>
              {/* Browser Chrome Bar */}
              <div className="bg-secondary/80 border-b border-border px-3 md:px-4 py-2 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <button onClick={() => { setShowPreview(false); setIsFullscreen(false); }} className="w-3 h-3 rounded-full bg-google-red hover:brightness-75 transition" />
                    <div className="w-3 h-3 rounded-full bg-google-yellow" />
                    <div className="w-3 h-3 rounded-full bg-google-green" />
                  </div>
                  <div className="ml-2 md:ml-3 bg-background/50 border border-border rounded-md px-2 md:px-3 py-0.5 text-[10px] text-muted-foreground flex items-center gap-1">
                    🌐 77.37.44.92
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode("desktop")}
                    className={`p-1 rounded transition-colors ${viewMode === "desktop" ? "bg-google-blue/20 text-google-blue" : "text-muted-foreground hover:text-foreground"}`}
                    title="Desktop view"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("mobile")}
                    className={`p-1 rounded transition-colors ${viewMode === "mobile" ? "bg-google-blue/20 text-google-blue" : "text-muted-foreground hover:text-foreground"}`}
                    title="Mobile view"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-border mx-0.5" />
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                    title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => { setShowPreview(false); setIsFullscreen(false); }}
                    className="p-1 rounded text-muted-foreground hover:text-google-red transition-colors"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* App Content — Live iframe */}
              <div className={`flex flex-1 overflow-hidden bg-background ${!isFullscreen ? "min-h-[500px] md:min-h-[600px]" : ""}`}>
                <div className={`w-full h-full ${viewMode === "mobile" ? "max-w-[375px] mx-auto border-x border-border" : ""}`}>
                  <iframe
                    src="http://77.37.44.92/"
                    title="Liquid Washes Laundry — Live App"
                    className="w-full h-full border-0"
                    loading="lazy"
                    sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-modals"
                  />
                </div>
              </div>
              {USE_LEGACY_LWL_PREVIEW && (viewMode === "mobile" ? (
                  /* ───── MOBILE VIEW ───── */
                  <div className={`flex flex-col w-full ${isFullscreen ? "max-w-[375px] mx-auto border-x border-border" : ""}`}>
                    {/* Mobile Top Bar */}
                    <div className="bg-card border-b border-border px-3 py-2.5 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-google-blue/10 flex items-center justify-center">
                          <Droplets className="w-4 h-4 text-google-blue" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-google-blue block leading-none">LWL</span>
                          <span className="text-[8px] text-muted-foreground">Laundry System</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <div className="relative">
                          <Bell className="w-4 h-4 text-muted-foreground" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-google-red rounded-full" />
                        </div>
                        <div className="w-7 h-7 rounded-full bg-google-blue/20 flex items-center justify-center">
                          <Shield className="w-3.5 h-3.5 text-google-blue" />
                        </div>
                      </div>
                    </div>

                    {/* Mobile Content */}
                    <div className="flex-1 overflow-y-auto p-3 bg-background">
                      <div className="mb-3">
                        <h3 className="text-sm font-bold text-foreground">{currentScreen?.title}</h3>
                        <p className="text-[10px] text-muted-foreground">{currentScreen?.subtitle}</p>
                      </div>
                      {currentScreen?.component}
                    </div>

                    {/* Mobile Bottom Navigation — true replica */}
                    <div className="bg-card border-t border-border px-1 py-1.5 flex items-center justify-around shrink-0">
                      {[
                        { key: "dashboard" as Screen, icon: <Home className="w-5 h-5" />, label: "Home" },
                        { key: "orders" as Screen, icon: <ClipboardList className="w-5 h-5" />, label: "Orders" },
                        { key: "clients" as Screen, icon: <Users className="w-5 h-5" />, label: "Clients" },
                        { key: "bills" as Screen, icon: <FileText className="w-5 h-5" />, label: "Bills" },
                        { key: "sales" as Screen, icon: <MoreHorizontal className="w-5 h-5" />, label: "More" },
                      ].map((tab) => (
                        <button
                          key={tab.label}
                          onClick={() => setActiveScreen(tab.key)}
                          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                            activeScreen === tab.key
                              ? "text-google-blue bg-google-blue/10"
                              : "text-muted-foreground active:bg-secondary"
                          }`}
                        >
                          {tab.icon}
                          <span className="text-[8px] font-medium">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ───── DESKTOP VIEW ───── */
                  <>
                    {/* Sidebar — exact replica from Sidebar.tsx */}
                    <div className={`${sidebarCollapsed ? "w-14" : "w-14 md:w-56"} bg-card border-r border-border shrink-0 flex flex-col transition-all duration-200`}>
                      {/* Logo + Brand */}
                      <div className="p-2.5 md:p-3 border-b border-border">
                        {!sidebarCollapsed ? (
                          <div className="hidden md:flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-google-blue/10 flex items-center justify-center shrink-0">
                              <Droplets className="w-4 h-4 text-google-blue" />
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-google-blue leading-none">Liquid Washes</h3>
                              <p className="text-[8px] text-muted-foreground">Laundry Management</p>
                            </div>
                          </div>
                        ) : null}
                        <div className="md:hidden flex justify-center">
                          <Droplets className="w-5 h-5 text-google-blue" />
                        </div>
                      </div>

                      {/* User Profile */}
                      <div className={`hidden ${sidebarCollapsed ? "" : "md:flex"} items-center gap-2 p-3 border-b border-border`}>
                        <div className="w-8 h-8 rounded-full bg-google-blue/15 flex items-center justify-center shrink-0">
                          <Shield className="w-4 h-4 text-google-blue" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold text-foreground truncate">Admin User</p>
                          <p className="text-[9px] text-muted-foreground">admin</p>
                        </div>
                      </div>

                      {/* Navigation Groups */}
                      <div className="flex-1 overflow-y-auto py-2">
                        {sidebarGroups.map((group, gi) => (
                          <div key={gi} className="mb-1">
                            <p className={`hidden ${sidebarCollapsed ? "" : "md:block"} text-[8px] uppercase tracking-widest text-muted-foreground px-3 py-1.5 font-semibold`}>
                              {group.label}
                            </p>
                            {group.items.map((item, ii) => {
                              const isActive = activeScreen === item.key && item.label === (screens[item.key as Exclude<Screen, "login">]?.title || "");
                              return (
                                <button
                                  key={`${gi}-${ii}`}
                                  onClick={() => setActiveScreen(item.key)}
                                  className={`w-full flex items-center gap-2.5 px-2 md:px-3 py-2 text-[11px] transition-all ${
                                    isActive
                                      ? "bg-google-blue/15 text-google-blue border-r-2 border-google-blue font-semibold"
                                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                                  }`}
                                >
                                  {item.icon}
                                  <span className={`hidden ${sidebarCollapsed ? "" : "md:inline"} truncate`}>{item.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>

                      {/* Sidebar Footer */}
                      <div className={`hidden ${sidebarCollapsed ? "" : "md:block"} p-3 border-t border-border`}>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 text-[10px] text-google-red hover:bg-google-red/10 px-2 py-1.5 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                        <div className="mt-2.5 text-[8px] text-muted-foreground text-center space-y-0.5">
                          <p className="font-medium">Liquid Washes Laundry</p>
                          <p>Al Dhanna City, Al Ruwais · Abu Dhabi</p>
                          <p>© 2024</p>
                        </div>
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-3 md:p-5 overflow-y-auto bg-background">
                      {/* Content Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                        <div>
                          <h3 className="text-sm font-bold text-foreground">{currentScreen?.title}</h3>
                          <p className="text-[10px] text-muted-foreground">{currentScreen?.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Bell className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-google-red rounded-full" />
                          </div>
                          <Settings className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                        </div>
                      </div>
                      {currentScreen?.component}
                    </div>
                  </>
                ))}

              {/* Status Bar */}
              <div className="bg-secondary/40 border-t border-border px-4 py-1.5 flex items-center justify-between shrink-0">
                <span className="text-[10px] text-muted-foreground">
                  🟢 Live App · {viewMode === "mobile" ? "📱 Mobile" : "🖥️ Desktop"} · 77.37.44.92
                </span>
                <span className="text-[10px] text-muted-foreground">React + TypeScript + Express + PostgreSQL</span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default LWLAppPreview;
