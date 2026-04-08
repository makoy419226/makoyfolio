import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Monitor,
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  Truck,
  BarChart3,
  Package,
  Settings,
  Search,
  Bell,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  Shirt,
  ExternalLink,
  Github,
  ClipboardList,
  AlertTriangle,
  HardHat,
  Phone,
  List,
  CircleDollarSign,
  Plus,
  Eye,
  Printer,
  Edit,
  Trash2,
  ChevronDown,
  LogOut,
  Shield,
  ArrowUpDown,
  Menu,
} from "lucide-react";

type Screen = "dashboard" | "orders" | "clients" | "bills" | "delivery" | "products" | "sales";

/* ──────────────────────── TRUE REPLICA SCREENS ──────────────────────── */

const DashboardScreen = () => (
  <div className="space-y-4">
    {/* Company Header - true replica */}
    <div className="bg-google-blue/10 border border-google-blue/20 rounded-lg p-3 flex items-center justify-between">
      <div>
        <p className="text-[10px] text-muted-foreground">Tel: 026 815 824 · Phone: +971 56 338 0001</p>
        <p className="text-[10px] text-muted-foreground">Email: info@lwl.ae</p>
      </div>
      <a className="text-[10px] text-google-blue font-medium">www.lwl.ae</a>
    </div>

    {/* Staff Dashboard Header */}
    <div>
      <h4 className="text-sm font-bold text-foreground">Staff Dashboard</h4>
      <p className="text-[10px] text-muted-foreground">Order Progress Overview</p>
    </div>

    {/* Status Cards - matches real app's 4 status cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {[
        { label: "Pending", count: 12, icon: <Clock className="w-4 h-4" />, color: "text-google-yellow", bg: "bg-google-yellow/10" },
        { label: "Tagging", count: 8, icon: <ClipboardList className="w-4 h-4" />, color: "text-google-blue", bg: "bg-google-blue/10" },
        { label: "Packing", count: 5, icon: <Package className="w-4 h-4" />, color: "text-google-red", bg: "bg-google-red/10" },
        { label: "Delivered Today", count: 19, icon: <CheckCircle className="w-4 h-4" />, color: "text-google-green", bg: "bg-google-green/10" },
      ].map((s, i) => (
        <div key={i} className={`${s.bg} border border-border rounded-lg p-3 text-center`}>
          <div className={`${s.color} mx-auto mb-1`}>{s.icon}</div>
          <p className="text-[10px] text-muted-foreground">{s.label}</p>
          <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
        </div>
      ))}
    </div>

    {/* Orders Needing Attention - true replica table */}
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="bg-secondary/50 px-3 py-2 border-b border-border">
        <h4 className="text-xs font-semibold text-foreground">Orders Needing Attention</h4>
      </div>
      <div className="divide-y divide-border">
        {[
          { num: "ORD-2024-1247", customer: "Maria Santos", status: "Pending", statusColor: "bg-google-yellow/20 text-google-yellow" },
          { num: "ORD-2024-1246", customer: "Golden Hotel (Corp)", status: "Tagging", statusColor: "bg-google-blue/20 text-google-blue" },
          { num: "ORD-2024-1245", customer: "Ana Reyes", status: "Packing", statusColor: "bg-google-red/20 text-google-red" },
          { num: "ORD-2024-1244", customer: "Juan Cruz", status: "Pending", statusColor: "bg-google-yellow/20 text-google-yellow" },
          { num: "ORD-2024-1243", customer: "Pedro Lim", status: "Tagging", statusColor: "bg-google-blue/20 text-google-blue" },
        ].map((order, i) => (
          <div key={i} className="px-3 py-2 flex items-center justify-between hover:bg-secondary/30 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-foreground">{order.num}</span>
              <span className="text-[10px] text-muted-foreground">{order.customer}</span>
            </div>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${order.statusColor}`}>
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const OrdersScreen = () => (
  <div className="space-y-3">
    {/* Top Bar - true replica search + filters */}
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">Search by order number, client name...</span>
      </div>
      <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 rounded-lg">
        <ArrowUpDown className="w-3 h-3" /> Sort
      </Button>
    </div>

    {/* Status Filter Tabs - true replica */}
    <div className="flex gap-1 overflow-x-auto">
      {[
        { label: "All", count: 44, active: true },
        { label: "Pending", count: 12, active: false },
        { label: "Tagging", count: 8, active: false },
        { label: "Packing", count: 5, active: false },
        { label: "Ready", count: 7, active: false },
        { label: "Delivered", count: 12, active: false },
      ].map((tab, i) => (
        <button
          key={tab.label}
          className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${
            tab.active
              ? "bg-google-blue text-white"
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

    {/* Orders Table - true replica */}
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 bg-secondary/60 px-3 py-1.5 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
        <span className="col-span-2">Order #</span>
        <span className="col-span-3">Client</span>
        <span className="col-span-2">Items</span>
        <span className="col-span-2">Amount</span>
        <span className="col-span-2">Status</span>
        <span className="col-span-1">Actions</span>
      </div>
      {/* Table Rows */}
      {[
        { id: "ORD-1247", client: "Maria Santos", items: "5 pcs", amount: "₱850", status: "Ready", color: "bg-google-green/20 text-google-green", urgent: true },
        { id: "ORD-1246", client: "Golden Hotel", items: "32 pcs", amount: "₱8,500", status: "Packing", color: "bg-google-red/20 text-google-red", urgent: false },
        { id: "ORD-1245", client: "Ana Reyes", items: "3 pcs", amount: "₱350", status: "Tagging", color: "bg-google-blue/20 text-google-blue", urgent: false },
        { id: "ORD-1244", client: "Pedro Lim", items: "8 pcs", amount: "₱2,100", status: "Pending", color: "bg-google-yellow/20 text-google-yellow", urgent: true },
        { id: "ORD-1243", client: "Juan Cruz", items: "12 pcs", amount: "₱1,200", status: "Delivered", color: "bg-secondary text-muted-foreground", urgent: false },
      ].map((order, i) => (
        <div key={i} className="grid grid-cols-12 px-3 py-2 items-center border-b border-border last:border-0 hover:bg-secondary/20 transition-colors text-[10px]">
          <div className="col-span-2 flex items-center gap-1">
            <span className="font-mono font-bold text-foreground">{order.id}</span>
            {order.urgent && (
              <span className="text-[7px] bg-google-red text-white px-1 rounded font-bold">URGENT</span>
            )}
          </div>
          <span className="col-span-3 text-foreground">{order.client}</span>
          <span className="col-span-2 text-muted-foreground">{order.items}</span>
          <span className="col-span-2 font-semibold text-foreground">{order.amount}</span>
          <div className="col-span-2">
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${order.color}`}>
              {order.status}
            </span>
          </div>
          <div className="col-span-1 flex gap-1">
            <Eye className="w-3 h-3 text-muted-foreground hover:text-google-blue cursor-pointer" />
            <Printer className="w-3 h-3 text-muted-foreground hover:text-google-blue cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ClientsScreen = () => (
  <div className="space-y-3">
    {/* Search + Add Client */}
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">Search clients...</span>
      </div>
      <Button variant="default" size="sm" className="h-7 text-[10px] gap-1 rounded-lg">
        <Plus className="w-3 h-3" /> Add Client
      </Button>
    </div>

    {/* Client Cards - true replica with avatar, type badge, balance */}
    <div className="space-y-2">
      {[
        { name: "Maria Santos", type: "VIP", phone: "+63 912 345 ****", orders: 42, balance: "₱0", lastOrder: "Apr 7, 2026" },
        { name: "Golden Hotel", type: "Corporate", phone: "+63 933 222 ****", orders: 89, balance: "₱5,400", lastOrder: "Apr 8, 2026" },
        { name: "Juan Cruz", type: "Regular", phone: "+63 917 111 ****", orders: 15, balance: "₱1,200", lastOrder: "Apr 5, 2026" },
        { name: "Ana Reyes", type: "Walk-in", phone: "+63 921 888 ****", orders: 7, balance: "₱350", lastOrder: "Apr 3, 2026" },
      ].map((client, i) => (
        <div key={i} className="border border-border rounded-lg p-3 hover:border-google-blue/40 transition-colors">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-google-blue/20 flex items-center justify-center text-google-blue text-xs font-bold shrink-0">
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
              <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                <span>{client.phone}</span>
                <span>·</span>
                <span>{client.orders} orders</span>
                <span>·</span>
                <span>Last: {client.lastOrder}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-muted-foreground">Balance</p>
              <p className={`text-xs font-bold ${parseFloat(client.balance.replace(/[₱,]/g, '')) > 0 ? "text-google-red" : "text-google-green"}`}>
                {client.balance}
              </p>
            </div>
          </div>
          {/* Actions */}
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

const BillsScreen = () => (
  <div className="space-y-3">
    {/* Filter Tabs */}
    <div className="flex gap-1">
      {["All", "Unpaid", "Partial", "Paid", "Overdue"].map((tab, i) => (
        <button key={tab} className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${i === 0 ? "bg-google-blue text-white" : "bg-secondary text-muted-foreground"}`}>
          {tab}
        </button>
      ))}
    </div>

    {/* Bills Table */}
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 bg-secondary/60 px-3 py-1.5 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
        <span className="col-span-3">Bill Ref</span>
        <span className="col-span-3">Client</span>
        <span className="col-span-2">Amount</span>
        <span className="col-span-2">Paid</span>
        <span className="col-span-2">Status</span>
      </div>
      {[
        { ref: "BILL-0891", client: "Maria Santos", amount: "₱850", paid: "₱850", status: "Paid", color: "text-google-green" },
        { ref: "BILL-0890", client: "Juan Cruz", amount: "₱1,200", paid: "₱600", status: "Partial", color: "text-google-yellow" },
        { ref: "BILL-0889", client: "Golden Hotel", amount: "₱8,500", paid: "₱0", status: "Unpaid", color: "text-google-red" },
        { ref: "BILL-0888", client: "Ana Reyes", amount: "₱350", paid: "₱350", status: "Paid", color: "text-google-green" },
        { ref: "BILL-0887", client: "Pedro Lim", amount: "₱2,100", paid: "₱0", status: "Overdue", color: "text-google-red" },
      ].map((bill, i) => (
        <div key={i} className="grid grid-cols-12 px-3 py-2 items-center border-b border-border last:border-0 hover:bg-secondary/20 transition-colors text-[10px]">
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

const DeliveryScreen = () => (
  <div className="space-y-3">
    {/* Status Summary */}
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Pending Pickup", count: 5, color: "text-google-yellow", bg: "bg-google-yellow/10" },
        { label: "In Transit", count: 3, color: "text-google-blue", bg: "bg-google-blue/10" },
        { label: "Delivered Today", count: 12, color: "text-google-green", bg: "bg-google-green/10" },
      ].map((s, i) => (
        <div key={i} className={`${s.bg} border border-border rounded-lg p-2 text-center`}>
          <p className={`text-lg font-bold ${s.color}`}>{s.count}</p>
          <p className="text-[9px] text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Delivery Queue */}
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="bg-secondary/50 px-3 py-2 border-b border-border">
        <h4 className="text-xs font-semibold text-foreground">Delivery Queue</h4>
      </div>
      {[
        { order: "ORD-1246", client: "Golden Hotel", address: "Al Dhanna City, Block 5", time: "2:30 PM", driver: "Ahmed", status: "In Transit", color: "bg-google-blue/20 text-google-blue" },
        { order: "ORD-1243", client: "Ana Reyes", address: "Al Ruwais, Villa 12", time: "3:00 PM", driver: "Unassigned", status: "Pending", color: "bg-google-yellow/20 text-google-yellow" },
        { order: "ORD-1240", client: "Pedro Lim", address: "Mirfa, Apt 3B", time: "4:15 PM", driver: "Unassigned", status: "Pending", color: "bg-google-yellow/20 text-google-yellow" },
      ].map((d, i) => (
        <div key={i} className="px-3 py-2.5 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-foreground">{d.order}</span>
              <span className="text-[10px] text-foreground">{d.client}</span>
            </div>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${d.color}`}>{d.status}</span>
          </div>
          <div className="flex items-center gap-3 text-[9px] text-muted-foreground">
            <span>📍 {d.address}</span>
            <span>🕐 {d.time}</span>
            <span>🚗 {d.driver}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProductsScreen = () => (
  <div className="space-y-3">
    {/* Search + Sort + Add */}
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">Search products...</span>
      </div>
      <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 rounded-lg">
        <ArrowUpDown className="w-3 h-3" /> Sort
      </Button>
      <Button variant="default" size="sm" className="h-7 text-[10px] gap-1 rounded-lg">
        <Plus className="w-3 h-3" /> Add Product
      </Button>
    </div>

    <div className="text-[10px] text-muted-foreground">
      Monitor your stock levels. · Total Items: <span className="text-foreground font-semibold">24</span>
    </div>

    {/* Product Cards Grid - true replica */}
    <div className="grid grid-cols-2 gap-2">
      {[
        { name: "T-Shirt", price: "₱65", category: "Laundry", stock: 150, icon: <Shirt className="w-5 h-5" /> },
        { name: "Blanket (Large)", price: "₱150", category: "Bedding", stock: 45, icon: <Package className="w-5 h-5" /> },
        { name: "Suit (Dry Clean)", price: "₱350", category: "Dry Clean", stock: 20, icon: <Shirt className="w-5 h-5" /> },
        { name: "Curtain / sqm", price: "₱85", category: "Specialty", stock: 0, icon: <Package className="w-5 h-5" /> },
        { name: "Bed Sheet", price: "₱120", category: "Bedding", stock: 65, icon: <Package className="w-5 h-5" /> },
        { name: "Uniform Set", price: "₱95", category: "Laundry", stock: 30, icon: <Shirt className="w-5 h-5" /> },
      ].map((p, i) => (
        <div key={i} className="border border-border rounded-lg p-3 hover:border-google-blue/40 transition-colors group">
          <div className="flex items-start justify-between mb-2">
            <div className="text-google-blue">{p.icon}</div>
            <span className="text-[8px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">{p.category}</span>
          </div>
          <p className="text-xs font-semibold text-foreground">{p.name}</p>
          <p className="text-sm font-bold text-google-green mt-0.5">{p.price}</p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <span className={`text-[9px] ${p.stock === 0 ? "text-google-red" : "text-muted-foreground"}`}>
              Stock: {p.stock === 0 ? "Out of stock" : p.stock}
            </span>
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

const SalesScreen = () => (
  <div className="space-y-3">
    {/* Daily Summary Cards */}
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-google-green/10 border border-border rounded-lg p-3 text-center">
        <p className="text-[9px] text-muted-foreground">Today's Revenue</p>
        <p className="text-sm font-bold text-google-green">₱12,450</p>
        <p className="text-[9px] text-google-green">+12% vs yesterday</p>
      </div>
      <div className="bg-google-blue/10 border border-border rounded-lg p-3 text-center">
        <p className="text-[9px] text-muted-foreground">Orders Processed</p>
        <p className="text-sm font-bold text-google-blue">34</p>
        <p className="text-[9px] text-google-blue">+5 from yesterday</p>
      </div>
      <div className="bg-google-yellow/10 border border-border rounded-lg p-3 text-center">
        <p className="text-[9px] text-muted-foreground">Outstanding</p>
        <p className="text-sm font-bold text-google-yellow">₱15,050</p>
        <p className="text-[9px] text-google-red">8 unpaid bills</p>
      </div>
    </div>

    {/* Weekly Revenue Chart */}
    <div className="border border-border rounded-lg p-3 space-y-2">
      <h4 className="text-xs font-semibold text-foreground">Weekly Revenue</h4>
      <div className="flex items-end gap-1 h-24">
        {[
          { day: "Mon", val: 40, amount: "₱8.2k" },
          { day: "Tue", val: 65, amount: "₱13.1k" },
          { day: "Wed", val: 55, amount: "₱11.0k" },
          { day: "Thu", val: 80, amount: "₱16.2k" },
          { day: "Fri", val: 70, amount: "₱14.1k" },
          { day: "Sat", val: 95, amount: "₱19.3k" },
          { day: "Sun", val: 45, amount: "₱9.0k" },
        ].map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
            <div className="absolute -top-4 opacity-0 group-hover:opacity-100 text-[7px] text-google-blue font-bold bg-secondary px-1 rounded transition-opacity">
              {d.amount}
            </div>
            <div
              className="w-full bg-google-blue/70 hover:bg-google-blue rounded-t transition-colors cursor-pointer"
              style={{ height: `${d.val}%` }}
            />
            <span className="text-[8px] text-muted-foreground">{d.day}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Top Services */}
    <div className="border border-border rounded-lg p-3 space-y-2">
      <h4 className="text-xs font-semibold text-foreground">Top Services</h4>
      {[
        { name: "Wash & Iron", pct: 45, revenue: "₱38,200" },
        { name: "Dry Clean", pct: 25, revenue: "₱21,500" },
        { name: "Iron Only", pct: 18, revenue: "₱15,100" },
        { name: "Urgent Wash", pct: 12, revenue: "₱10,800" },
      ].map((s, i) => (
        <div key={i} className="space-y-0.5">
          <div className="flex justify-between text-[10px]">
            <span className="text-foreground">{s.name}</span>
            <span className="text-muted-foreground">{s.revenue} · {s.pct}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div className="bg-google-blue rounded-full h-1.5 transition-all" style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const screens: Record<Screen, { component: React.ReactNode; title: string }> = {
  dashboard: { component: <DashboardScreen />, title: "Dashboard" },
  orders: { component: <OrdersScreen />, title: "Order Tracking" },
  clients: { component: <ClientsScreen />, title: "Clients" },
  bills: { component: <BillsScreen />, title: "Bills & Payments" },
  delivery: { component: <DeliveryScreen />, title: "Delivery Dashboard" },
  products: { component: <ProductsScreen />, title: "Inventory" },
  sales: { component: <SalesScreen />, title: "Sales Reports" },
};

/* ──────────────────────── SIDEBAR - TRUE REPLICA ──────────────────────── */

const sidebarGroups = [
  {
    label: "Operations",
    items: [
      { key: "dashboard" as Screen, label: "Dashboard", icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
      { key: "delivery" as Screen, label: "Delivery Dashboard", icon: <Truck className="w-3.5 h-3.5" /> },
      { key: "products" as Screen, label: "New Order", icon: <List className="w-3.5 h-3.5" /> },
      { key: "orders" as Screen, label: "Order Tracking", icon: <ClipboardList className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: "Business",
    items: [
      { key: "products" as Screen, label: "Inventory", icon: <Package className="w-3.5 h-3.5" /> },
      { key: "clients" as Screen, label: "Clients", icon: <Users className="w-3.5 h-3.5" /> },
      { key: "bills" as Screen, label: "Bills", icon: <FileText className="w-3.5 h-3.5" /> },
      { key: "bills" as Screen, label: "Due Customers", icon: <CircleDollarSign className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: "Reports",
    items: [
      { key: "sales" as Screen, label: "Sales Reports", icon: <BarChart3 className="w-3.5 h-3.5" /> },
      { key: "orders" as Screen, label: "Incidents", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
      { key: "orders" as Screen, label: "Public Tracking", icon: <Search className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: "Settings",
    items: [
      { key: "dashboard" as Screen, label: "Management", icon: <HardHat className="w-3.5 h-3.5" /> },
      { key: "dashboard" as Screen, label: "Admin Settings", icon: <Settings className="w-3.5 h-3.5" /> },
    ],
  },
];

/* ──────────────────────── MAIN COMPONENT ──────────────────────── */

const LWLAppPreview = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("dashboard");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-6">
      {/* Project Header Card */}
      <Card className="border-border p-6 shadow-google-lg">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-google-red/20 rounded-2xl flex items-center justify-center flex-shrink-0 text-google-red">
              <Monitor className="w-6 h-6" />
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
            ].map((feat, i) => (
              <div key={i} className="bg-secondary/30 rounded-lg p-3 space-y-1">
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
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Monitor className="w-4 h-4" />
              {showPreview ? "Hide Preview" : "View Live App Preview"}
            </Button>
            <a
              href="https://github.com/makoy419226/Liquid-Washes-Laundry-main-LEGACY"
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
          </div>
        </div>
      </Card>

      {/* ──────────── INTERACTIVE TRUE REPLICA PREVIEW ──────────── */}
      {showPreview && (
        <Card className="border-border shadow-google-xl overflow-hidden animate-fade-in">
          {/* Browser Chrome */}
          <div className="bg-secondary/80 border-b border-border px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-google-red" />
                <div className="w-3 h-3 rounded-full bg-google-yellow" />
                <div className="w-3 h-3 rounded-full bg-google-green" />
              </div>
              <div className="ml-3 bg-background/50 border border-border rounded-md px-3 py-0.5 text-[10px] text-muted-foreground flex items-center gap-1">
                🔒 lwl-laundry.app/dashboard
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-muted-foreground" />
              <div className="w-6 h-6 rounded-full bg-google-blue/30 flex items-center justify-center">
                <Shield className="w-3 h-3 text-google-blue" />
              </div>
            </div>
          </div>

          <div className="flex min-h-[500px] md:min-h-[550px]">
            {/* TRUE REPLICA SIDEBAR */}
            <div className="w-12 md:w-48 bg-card border-r border-border shrink-0 flex flex-col">
              {/* Logo Area */}
              <div className="p-2 md:p-3 border-b border-border">
                <div className="hidden md:block">
                  <h3 className="text-sm font-bold text-google-blue">Liquid Washes</h3>
                  <p className="text-[9px] text-muted-foreground">Laundry Management</p>
                </div>
                <div className="md:hidden flex justify-center">
                  <span className="text-sm font-bold text-google-blue">LW</span>
                </div>
              </div>

              {/* User Info */}
              <div className="hidden md:flex items-center gap-2 p-3 border-b border-border">
                <div className="w-7 h-7 rounded-full bg-google-blue/20 flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-google-blue" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-foreground">Admin User</p>
                  <p className="text-[9px] text-muted-foreground">admin</p>
                </div>
              </div>

              {/* Nav Groups */}
              <div className="flex-1 overflow-y-auto py-2">
                {sidebarGroups.map((group, gi) => (
                  <div key={gi} className="mb-2">
                    <p className="hidden md:block text-[8px] uppercase tracking-widest text-muted-foreground px-3 py-1 font-semibold">
                      {group.label}
                    </p>
                    {group.items.map((item, ii) => (
                      <button
                        key={`${gi}-${ii}`}
                        onClick={() => setActiveScreen(item.key)}
                        className={`w-full flex items-center gap-2 px-2 md:px-3 py-1.5 text-[10px] transition-colors ${
                          activeScreen === item.key && item.label === screens[item.key].title
                            ? "bg-google-blue/15 text-google-blue border-r-2 border-google-blue font-semibold"
                            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                        }`}
                      >
                        {item.icon}
                        <span className="hidden md:inline">{item.label}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="hidden md:block p-3 border-t border-border">
                <button className="w-full flex items-center gap-2 text-[10px] text-google-red hover:bg-google-red/10 px-2 py-1.5 rounded transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
                <div className="mt-2 text-[8px] text-muted-foreground text-center">
                  <p>Liquid Washes Laundry</p>
                  <p>Al Dhanna City, Al Ruwais · Abu Dhabi</p>
                  <p>© 2024</p>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 p-3 md:p-4 overflow-y-auto bg-background">
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <div>
                  <h3 className="text-sm font-bold text-foreground">{screens[activeScreen].title}</h3>
                  <p className="text-[10px] text-muted-foreground">
                    {activeScreen === "dashboard" && "Overview of today's operations"}
                    {activeScreen === "orders" && "Track and manage all orders"}
                    {activeScreen === "clients" && "Manage customer accounts"}
                    {activeScreen === "bills" && "Invoices and payment tracking"}
                    {activeScreen === "delivery" && "Dispatch and delivery management"}
                    {activeScreen === "products" && "Product catalog and pricing"}
                    {activeScreen === "sales" && "Revenue analytics and reports"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              {screens[activeScreen].component}
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-secondary/40 border-t border-border px-4 py-1.5 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">✨ Interactive UI Replica · Click sidebar to navigate</span>
            <span className="text-[10px] text-muted-foreground">React + TypeScript + Express + PostgreSQL</span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LWLAppPreview;
