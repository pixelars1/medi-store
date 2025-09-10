import { Bell, LayoutDashboard, Package, Search, Settings, ShieldCheck, ShoppingCart, Users } from "lucide-react";
import { brand } from "../utils/constant";

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
    <aside className="h-full w-64 shrink-0 border-r bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 p-4">
      <div className="flex items-center gap-2 mb-6">
        <div className={`h-9 w-9 rounded-2xl bg-gradient-to-r ${brand.primary}`}></div>
        <div className="font-semibold text-lg">MediCare Admin</div>
      </div>
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
      <div className="mt-6 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800">
        <div className="flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4" /><span className="text-sm font-semibold">Compliance</span></div>
        <p className="text-xs leading-relaxed">Prescription-only medicines must be verified before dispatch. Enable checks in Settings → Compliance.</p>
      </div>
    </aside>
  );
};
export default Sidebar;