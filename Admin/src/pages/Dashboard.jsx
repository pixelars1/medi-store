import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";
import { brand, initialProducts, mockNotifications, mockOrders, mockSearches, mockUsers, mockVisitors } from "../utils/constant.js";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

  return (
    <div className="min-h-screen pt-2 bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <div className="max-w-screen-2xl grid grid-cols-1 md:grid-cols-[16rem_1fr]">
        <Sidebar active={active} onChange={setActive} />
        <div className="min-h-screen flex flex-col">
          <Topbar />

          <main className="p-4 md:p-6 space-y-6">
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

            {active === "searches" && <SearchesPanel searches={mockSearches} />}

            {active === "notifications" && (
              <NotificationsPanel list={mockNotifications} />
            )}

            {active === "settings" && <SettingsPanel />}

            <Separator />
            <footer className="text-xs text-gray-400 pb-10">
              <div>Part 1/2 — Overview, Products (CRUD), Orders, Users, Searches, Notifications, and Compliance toggles are implemented with mocked data. Next part can add: role-based access, real analytics pipeline, Rx verification workflow, inventory thresholds, export CSV/PDF, and API integration (Mongo/Prisma/Express).</div>
            </footer>
          </main>
        </div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-4 right-4"
      >
        <Button className={`shadow-lg rounded-2xl bg-gradient-to-r ${brand.primary} ${brand.hover}`}>
          <Plus className="h-4 w-4 mr-2"/>Quick Add Product
        </Button>
      </motion.div>
    </div>
  );
}