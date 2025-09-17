import { BadgeCheck, Bell } from "lucide-react";
import { brand } from "../utils/constant";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Topbar = ({ onSearch }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Title */}
        <h1 className="text-lg md:text-xl font-semibold hidden sm:block">
          Dashboard
        </h1>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-1 sm:flex-none sm:ml-auto">
          {/* Search input */}{" "}
          <Input
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Quick search…"
            className="flex-1 sm:flex-none w-full sm:w-52 md:w-72"
          />
          {/* Notification: icon on mobile, text on desktop */}
          <Button variant="outline" className="rounded-2xl px-3 sm:px-4">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Alerts</span>
          </Button>
          {/* Publish: always with text */}
          <Button
            className={`rounded-2xl bg-gradient-to-r ${brand.primary} ${brand.hover}`}
          >
            <BadgeCheck className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
