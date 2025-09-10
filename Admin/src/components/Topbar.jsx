import { BadgeCheck, Bell } from "lucide-react";
import { brand } from "../utils/constant";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Topbar = ({ onSearch }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Input onChange={(e) => onSearch?.(e.target.value)} placeholder="Quick search…" className="w-52 md:w-72" />
          <Button variant="outline" className="rounded-2xl"><Bell className="h-4 w-4 mr-2"/>Alerts</Button>
          <Button className={`rounded-2xl bg-gradient-to-r ${brand.primary} ${brand.hover}`}><BadgeCheck className="h-4 w-4 mr-2"/>Publish</Button>
        </div>
      </div>
    </header>
  );
};
export default Topbar;