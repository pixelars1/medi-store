/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  brand,
  initialProducts,
  mockNotifications,
  mockOrders,
  mockSearches,
  mockUsers,
  mockVisitors,
} from "../utils/constant.js";
import { Button } from "@/components/ui/button";
import { Plus, Menu } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import SettingsPanel from "@/components/SettingsPanel";
import SearchesPanel from "@/components/SearchPanel";
import Orders from "@/components/Orders";
import Products from "@/components/Products";
import Overview from "@/components/Overview";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import NotificationsPanel from "@/components/Notifications";
import UsersPanel from "@/components/UsersPanel";

export default function Dashboard() {
  const [active, setActive] = useState("overview");
  const [products, setProducts] = useState(initialProducts);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 flex flex-col">
      {/* Topbar (always visible) */}
      <div className="sticky top-0 z-20 bg-white shadow-sm md:shadow-none">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <h1 className="font-bold text-lg md:text-xl">{brand.name || "Dashboard"}</h1>
          <div className="flex items-center gap-2">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg border border-gray-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform duration-300 md:static md:translate-x-0 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar active={active} onChange={(val) => {
            setActive(val);        // change active panel
            setSidebarOpen(false); // close sidebar after click
          }}  />
        </div>

        {/* Content */}
        <div className="flex-1 min-h-screen flex flex-col overflow-y-auto">
          <Topbar />

          <main className="p-3 sm:p-4 md:p-6 space-y-6">
            {active === "overview" && (
              <Overview
                visitors={mockVisitors}
                searches={mockSearches}
                orders={mockOrders}
                topProducts={[{ name: "Adderall 30mg", sales: 42 }]}
              />
            )}

            {active === "products" && (
              <Products products={products} setProducts={setProducts} />
            )}

            {active === "orders" && <Orders orders={mockOrders} />}
            {active === "users" && <UsersPanel users={mockUsers} />}
            {active === "searches" && (
              <SearchesPanel searches={mockSearches} />
            )}
            {active === "notifications" && (
              <NotificationsPanel list={mockNotifications} />
            )}
            {active === "settings" && <SettingsPanel />}

            <Separator />
          </main>
        </div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40"
      >
        <Button
          className={`shadow-lg rounded-2xl px-4 py-2 text-sm md:text-base bg-gradient-to-r ${brand.primary} ${brand.hover}`}
        >
          <Plus className="h-4 w-4 mr-2" />
          Quick Add
        </Button>
      </motion.div>
    </div>
  );
}
