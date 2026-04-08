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
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Shirt,
  ExternalLink,
  Github,
  X,
} from "lucide-react";

type Screen = "dashboard" | "orders" | "clients" | "bills" | "delivery" | "products" | "sales";

const sidebarItems: { key: Screen; label: string; icon: React.ReactNode }[] = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: "orders", label: "Orders", icon: <ShoppingCart className="w-4 h-4" /> },
  { key: "clients", label: "Clients", icon: <Users className="w-4 h-4" /> },
  { key: "bills", label: "Bills", icon: <FileText className="w-4 h-4" /> },
  { key: "delivery", label: "Delivery", icon: <Truck className="w-4 h-4" /> },
  { key: "products", label: "Products", icon: <Package className="w-4 h-4" /> },
  { key: "sales", label: "Sales Reports", icon: <BarChart3 className="w-4 h-4" /> },
];

const DashboardScreen = () => (
  <div className="space-y-4">
    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        { label: "Today's Revenue", value: "₱12,450", icon: <DollarSign className="w-4 h-4" />, trend: "+12%", up: true },
        { label: "Active Orders", value: "24", icon: <ShoppingCart className="w-4 h-4" />, trend: "+3", up: true },
        { label: "Pending Delivery", value: "8", icon: <Truck className="w-4 h-4" />, trend: "-2", up: false },
        { label: "Total Clients", value: "156", icon: <Users className="w-4 h-4" />, trend: "+5", up: true },
      ].map((stat, i) => (
        <div key={i} className="bg-secondary/50 rounded-xl p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">{stat.label}</span>
            <span className="text-google-blue">{stat.icon}</span>
          </div>
          <p className="text-lg font-bold text-foreground">{stat.value}</p>
          <div className="flex items-center gap-1">
            {stat.up ? <TrendingUp className="w-3 h-3 text-google-green" /> : <TrendingDown className="w-3 h-3 text-google-red" />}
            <span className={`text-xs ${stat.up ? "text-google-green" : "text-google-red"}`}>{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>
    {/* Recent Activity */}
    <div className="bg-secondary/30 rounded-xl p-3 space-y-3">
      <h4 className="text-sm font-semibold text-foreground">Recent Activity</h4>
      {[
        { action: "Order #1247 completed", time: "2 min ago", icon: <CheckCircle className="w-3.5 h-3.5 text-google-green" /> },
        { action: "New client registered", time: "15 min ago", icon: <Users className="w-3.5 h-3.5 text-google-blue" /> },
        { action: "Payment received ₱2,500", time: "30 min ago", icon: <DollarSign className="w-3.5 h-3.5 text-google-yellow" /> },
        { action: "Delivery dispatched #1243", time: "1 hr ago", icon: <Truck className="w-3.5 h-3.5 text-google-blue" /> },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 text-xs">
          {item.icon}
          <span className="text-foreground flex-1">{item.action}</span>
          <span className="text-muted-foreground">{item.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const OrdersScreen = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-secondary/50 rounded-lg px-3 py-1.5 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Search orders...</span>
      </div>
      <button className="bg-google-blue text-primary-foreground text-xs px-3 py-1.5 rounded-lg font-medium">+ New</button>
    </div>
    <div className="space-y-2">
      {[
        { id: "#1247", customer: "Maria Santos", items: "3 items · Wash & Iron", amount: "₱850", status: "Ready", statusColor: "text-google-green" },
        { id: "#1246", customer: "Juan Cruz", items: "5 items · Dry Clean", amount: "₱1,200", status: "Processing", statusColor: "text-google-yellow" },
        { id: "#1245", customer: "Ana Reyes", items: "2 items · Iron Only", amount: "₱350", status: "Entry", statusColor: "text-google-blue" },
        { id: "#1244", customer: "Pedro Lim", items: "8 items · Urgent Wash", amount: "₱2,100", status: "Delivered", statusColor: "text-muted-foreground" },
      ].map((order, i) => (
        <div key={i} className="bg-secondary/30 rounded-lg p-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">{order.id}</span>
              <span className="text-xs text-foreground">{order.customer}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{order.items}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-semibold text-foreground">{order.amount}</p>
            <p className={`text-xs font-medium ${order.statusColor}`}>{order.status}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ClientsScreen = () => (
  <div className="space-y-3">
    <div className="bg-secondary/50 rounded-lg px-3 py-1.5 flex items-center gap-2">
      <Search className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">Search clients...</span>
    </div>
    {[
      { name: "Maria Santos", type: "VIP", balance: "₱0", orders: 42, phone: "+63 912 ***" },
      { name: "Juan Cruz", type: "Regular", balance: "₱1,200", orders: 15, phone: "+63 917 ***" },
      { name: "Golden Hotel", type: "Corporate", balance: "₱5,400", orders: 89, phone: "+63 933 ***" },
      { name: "Ana Reyes", type: "Regular", balance: "₱350", orders: 7, phone: "+63 921 ***" },
    ].map((client, i) => (
      <div key={i} className="bg-secondary/30 rounded-lg p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-google-blue/20 flex items-center justify-center text-google-blue text-xs font-bold shrink-0">
          {client.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">{client.name}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${client.type === "VIP" ? "bg-google-yellow/20 text-google-yellow" : client.type === "Corporate" ? "bg-google-blue/20 text-google-blue" : "bg-secondary text-muted-foreground"}`}>
              {client.type}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{client.orders} orders · {client.phone}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-foreground font-medium">Bal: {client.balance}</p>
        </div>
      </div>
    ))}
  </div>
);

const BillsScreen = () => (
  <div className="space-y-3">
    <div className="flex gap-2 text-xs">
      {["All", "Unpaid", "Paid", "Overdue"].map((tab, i) => (
        <button key={tab} className={`px-3 py-1 rounded-full ${i === 0 ? "bg-google-blue text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{tab}</button>
      ))}
    </div>
    {[
      { ref: "BILL-2024-0891", client: "Maria Santos", amount: "₱850", paid: true },
      { ref: "BILL-2024-0890", client: "Juan Cruz", amount: "₱1,200", paid: false },
      { ref: "BILL-2024-0889", client: "Golden Hotel", amount: "₱8,500", paid: false },
      { ref: "BILL-2024-0888", client: "Ana Reyes", amount: "₱350", paid: true },
    ].map((bill, i) => (
      <div key={i} className="bg-secondary/30 rounded-lg p-3 flex items-center gap-3">
        <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">{bill.ref}</p>
          <p className="text-xs text-muted-foreground">{bill.client}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs font-semibold text-foreground">{bill.amount}</p>
          <span className={`text-[10px] ${bill.paid ? "text-google-green" : "text-google-red"}`}>{bill.paid ? "Paid" : "Unpaid"}</span>
        </div>
      </div>
    ))}
  </div>
);

const DeliveryScreen = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-3 gap-2 text-center">
      {[
        { label: "Pending", count: 5, color: "text-google-yellow" },
        { label: "In Transit", count: 3, color: "text-google-blue" },
        { label: "Delivered", count: 12, color: "text-google-green" },
      ].map((s, i) => (
        <div key={i} className="bg-secondary/30 rounded-lg p-2">
          <p className={`text-lg font-bold ${s.color}`}>{s.count}</p>
          <p className="text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
    {[
      { order: "#1246", address: "123 Main St, Tagbilaran", time: "Est. 2:30 PM", status: "In Transit" },
      { order: "#1243", address: "456 Rizal Ave, Dauis", time: "Est. 3:00 PM", status: "Pending" },
      { order: "#1240", address: "789 Garcia St, Panglao", time: "Est. 4:15 PM", status: "Pending" },
    ].map((d, i) => (
      <div key={i} className="bg-secondary/30 rounded-lg p-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Order {d.order}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${d.status === "In Transit" ? "bg-google-blue/20 text-google-blue" : "bg-google-yellow/20 text-google-yellow"}`}>{d.status}</span>
        </div>
        <p className="text-xs text-muted-foreground">{d.address}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" /> {d.time}
        </div>
      </div>
    ))}
  </div>
);

const ProductsScreen = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-secondary/50 rounded-lg px-3 py-1.5 flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Search products...</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {[
        { name: "T-Shirt", price: "₱65", category: "Laundry", icon: <Shirt className="w-5 h-5" /> },
        { name: "Blanket (L)", price: "₱150", category: "Bedding", icon: <Package className="w-5 h-5" /> },
        { name: "Suit (Dry)", price: "₱350", category: "Dry Clean", icon: <Shirt className="w-5 h-5" /> },
        { name: "Curtain/sqm", price: "₱85", category: "Specialty", icon: <Package className="w-5 h-5" /> },
      ].map((p, i) => (
        <div key={i} className="bg-secondary/30 rounded-lg p-3 text-center space-y-1">
          <div className="text-google-blue mx-auto">{p.icon}</div>
          <p className="text-xs font-semibold text-foreground">{p.name}</p>
          <p className="text-xs text-google-green font-bold">{p.price}</p>
          <span className="text-[10px] text-muted-foreground">{p.category}</span>
        </div>
      ))}
    </div>
  </div>
);

const SalesScreen = () => (
  <div className="space-y-3">
    <div className="bg-secondary/30 rounded-xl p-3 space-y-2">
      <h4 className="text-xs font-semibold text-foreground">Weekly Revenue</h4>
      <div className="flex items-end gap-1 h-20">
        {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-google-blue/80 rounded-t" style={{ height: `${h}%` }} />
            <span className="text-[8px] text-muted-foreground">{"MTWTFSS"[i]}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-secondary/30 rounded-lg p-3">
        <p className="text-xs text-muted-foreground">This Week</p>
        <p className="text-sm font-bold text-google-green">₱87,250</p>
      </div>
      <div className="bg-secondary/30 rounded-lg p-3">
        <p className="text-xs text-muted-foreground">Last Week</p>
        <p className="text-sm font-bold text-foreground">₱72,180</p>
      </div>
    </div>
    <div className="bg-secondary/30 rounded-lg p-3 space-y-2">
      <h4 className="text-xs font-semibold text-foreground">Top Services</h4>
      {[
        { name: "Wash & Iron", pct: 45 },
        { name: "Dry Clean", pct: 25 },
        { name: "Iron Only", pct: 18 },
        { name: "Urgent Wash", pct: 12 },
      ].map((s, i) => (
        <div key={i} className="space-y-0.5">
          <div className="flex justify-between text-xs">
            <span className="text-foreground">{s.name}</span>
            <span className="text-muted-foreground">{s.pct}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div className="bg-google-blue rounded-full h-1.5" style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const screens: Record<Screen, { component: React.ReactNode; title: string }> = {
  dashboard: { component: <DashboardScreen />, title: "Dashboard" },
  orders: { component: <OrdersScreen />, title: "Orders" },
  clients: { component: <ClientsScreen />, title: "Clients" },
  bills: { component: <BillsScreen />, title: "Bills & Payments" },
  delivery: { component: <DeliveryScreen />, title: "Delivery" },
  products: { component: <ProductsScreen />, title: "Products & Pricing" },
  sales: { component: <SalesScreen />, title: "Sales Reports" },
};

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
            A comprehensive full-stack laundry sales and management system built for real-world business operations. 
            This production-grade application handles the complete lifecycle of a laundry business — from customer walk-in 
            order entry to delivery tracking, billing, payment processing, and sales analytics. Designed for multi-user 
            environments with role-based access for admins, workers, and delivery personnel.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Order Management", desc: "Full order lifecycle — entry, processing, ready, delivery with real-time status tracking and order numbering" },
              { title: "Client & CRM", desc: "Client profiles with transaction history, balance tracking, deposits, discount management, and VIP/corporate tiers" },
              { title: "Billing & Payments", desc: "Automated bill generation, partial payments, refunds, multiple payment methods (cash/card/bank), and receipt printing" },
              { title: "Product Catalog", desc: "Dynamic pricing for wash, dry clean, iron services with size variants (S/M/L), urgent pricing, and sqm-based pricing" },
              { title: "Delivery System", desc: "Delivery scheduling, route management, driver assignment, delivery history, and real-time dispatch tracking" },
              { title: "Sales Analytics", desc: "Daily sales reports, revenue trends, worker performance tracking, and comprehensive financial reporting" },
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
            {["TypeScript", "React", "Node.js", "Express", "PostgreSQL", "Drizzle ORM", "Vite", "Tailwind CSS", "shadcn/ui", "Docker", "Google Cloud"].map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-secondary text-secondary-foreground border border-border"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Architecture Highlights */}
          <div className="bg-secondary/20 rounded-xl p-4 space-y-2 border border-border">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4 text-google-blue" />
              Architecture & Technical Highlights
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>• <strong className="text-foreground">Full-Stack TypeScript</strong> — Shared types between client and server via monorepo structure</li>
              <li>• <strong className="text-foreground">RESTful API</strong> — Express.js backend with comprehensive route handling for all business entities</li>
              <li>• <strong className="text-foreground">Database Schema</strong> — 10+ PostgreSQL tables with Drizzle ORM for type-safe queries and migrations</li>
              <li>• <strong className="text-foreground">Role-Based Access</strong> — Admin, worker, and delivery user roles with permission management</li>
              <li>• <strong className="text-foreground">Cloud Deployment</strong> — Dockerized for Google Cloud Run with CI/CD via Cloud Build</li>
              <li>• <strong className="text-foreground">Credit Management</strong> — Client credit/debit system with running balance calculation</li>
              <li>• <strong className="text-foreground">Incident Tracking</strong> — Missing items and incident report management for quality assurance</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Monitor className="w-4 h-4" />
              {showPreview ? "Hide Preview" : "View App Preview"}
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

      {/* Interactive App Preview */}
      {showPreview && (
        <Card className="border-border shadow-google-xl overflow-hidden animate-fade-in">
          {/* App Title Bar */}
          <div className="bg-secondary/80 border-b border-border px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-google-red" />
                <div className="w-3 h-3 rounded-full bg-google-yellow" />
                <div className="w-3 h-3 rounded-full bg-google-green" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">lwl-laundry.app</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-muted-foreground" />
              <div className="w-5 h-5 rounded-full bg-google-blue/30 flex items-center justify-center">
                <span className="text-[8px] text-google-blue font-bold">A</span>
              </div>
            </div>
          </div>

          <div className="flex min-h-[400px] md:min-h-[480px]">
            {/* Sidebar */}
            <div className="w-12 md:w-44 bg-secondary/40 border-r border-border py-3 shrink-0">
              <div className="px-2 md:px-3 mb-4 hidden md:block">
                <h3 className="text-sm font-bold text-google-blue">LWL</h3>
                <p className="text-[10px] text-muted-foreground">Laundry Management</p>
              </div>
              <div className="space-y-0.5">
                {sidebarItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveScreen(item.key)}
                    className={`w-full flex items-center gap-2 px-2 md:px-3 py-2 text-xs transition-colors ${
                      activeScreen === item.key
                        ? "bg-google-blue/20 text-google-blue border-r-2 border-google-blue"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <span className="hidden md:inline">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-3 md:p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-foreground">{screens[activeScreen].title}</h3>
                <Settings className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              {screens[activeScreen].component}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-secondary/40 border-t border-border px-4 py-1.5 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Interactive UI Preview · Click sidebar to navigate</span>
            <span className="text-[10px] text-muted-foreground">Built with React + TypeScript</span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LWLAppPreview;
