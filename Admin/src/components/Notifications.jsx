import { useState } from "react";
import { brand } from "../utils/constant";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AlertTriangle, Send, ShieldAlert, ShoppingCart } from "lucide-react";

const NotificationsPanel = ({ list }) => {
  const [items, setItems] = useState(list);

  const markOne = (id) =>
    setItems((arr) => arr.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAll = () =>
    setItems((arr) => arr.map((n) => ({ ...n, read: true })));

  useState(() => {
    document.title = "Notifications - MediCare Admin";
  }, []);
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button
          variant="outline"
          onClick={markAll}
          className="rounded-xl w-full sm:w-auto"
        >
          Mark all as read
        </Button>

        <div className="flex w-full sm:w-auto items-center gap-2">
          <Input
            placeholder="Send notification… (mock)"
            className="w-full sm:w-64"
          />
          <Button
            className={`rounded-xl bg-gradient-to-r ${brand.primary} ${brand.hover}`}
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>

      {/* Notification List */}
      <div className="grid gap-4">
        {items.map((n) => (
          <div
            key={n.id}
            className={`flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-2xl border transition 
              ${n.read ? "bg-gray-50" : "bg-emerald-50 border-emerald-200 shadow-sm"}`}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 shrink-0">
              {n.type === "order" && <ShoppingCart className="h-5 w-5" />}
              {n.type === "stock" && <AlertTriangle className="h-5 w-5" />}
              {n.type === "security" && <ShieldAlert className="h-5 w-5" />}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="font-medium text-gray-800">{n.title}</div>
              <div className="text-sm text-gray-600">{n.message}</div>
              <div className="text-xs text-gray-400 mt-1">{n.createdAt}</div>
            </div>

            {/* Action */}
            {!n.read && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => markOne(n.id)}
                className="rounded-xl mt-2 sm:mt-0"
              >
                Mark read
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;