import {
  Bell,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Users,
} from "lucide-react";
import { brand } from "../utils/constant";
import logo from "../assets/favicon.png"

const Sidebar = ({ active, onChange }) => {
  const items = [
    { key: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { key: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
    { key: "searches", label: "Searches", icon: <Search className="h-4 w-4" /> },
    { key: "products", label: "Products", icon: <Package className="h-4 w-4" /> },
    { key: "orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
    { key: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { key: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <aside
      className="
        h-full w-64 shrink-0 border-r bg-white/90 backdrop-blur 
        supports-[backdrop-filter]:bg-white/70 p-4
        fixed inset-y-0 left-0 z-30 transform transition-transform duration-300
        md:static md:translate-x-0
      "
    >
      {/* Brand */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`h-8 w-8 md:h-9 md:w-9 rounded-2xl `} ><img className="rounded-lg" src={logo} alt="" /></div>
        <div className="font-semibold text-base md:text-lg">MediCare Admin</div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
              active === it.key
                ? `bg-gradient-to-r ${brand.primary} text-white shadow`
                : "hover:bg-gray-100"
            }`}
          >
            {it.icon}
            <span className="text-sm font-medium">{it.label}</span>
          </button>
        ))}
      </nav>

      {/* Compliance Box */}
      <div className="mt-6 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-sm font-semibold">Compliance</span>
        </div>
        <p className="text-xs leading-relaxed">
          Prescription-only medicines must be verified before dispatch.
          Enable checks in Settings → Compliance.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
