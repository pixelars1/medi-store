import { useState } from "react";
import { brand } from "../utils/constant";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AlertTriangle, Send, ShieldAlert, ShoppingCart } from "lucide-react";

const NotificationsPanel = ({ list, onMarkAll }) => {
  const [items, setItems] = useState(list);
  const markOne = (id) => setItems((arr) => arr.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => setItems((arr) => arr.map((n) => ({ ...n, read: true })))} className="rounded-2xl">
          Mark all as read
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Input placeholder="Send notification… (mock)" className="w-64" />
          <Button className={`rounded-2xl bg-gradient-to-r ${brand.primary} ${brand.hover}`}><Send className="h-4 w-4 mr-2"/>Send</Button>
        </div>
      </div>
      <div className="grid gap-3">
        {items.map((n) => (
          <div key={n.id} className={`flex items-start gap-3 p-4 rounded-2xl border ${n.read ? "bg-gray-50" : "bg-emerald-50 border-emerald-100"}`}>
            <div className="pt-1">
              {n.type === "order" && <ShoppingCart className="h-5 w-5"/>}
              {n.type === "stock" && <AlertTriangle className="h-5 w-5"/>}
              {n.type === "security" && <ShieldAlert className="h-5 w-5"/>}
            </div>
            <div className="flex-1">
              <div className="font-medium">{n.title}</div>
              <div className="text-sm text-gray-600">{n.message}</div>
              <div className="text-xs text-gray-400 mt-1">{n.createdAt}</div>
            </div>
            {!n.read && (
              <Button size="sm" variant="outline" onClick={() => markOne(n.id)} className="rounded-xl">Mark read</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default NotificationsPanel;