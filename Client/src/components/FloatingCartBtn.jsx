import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Correct hook
import { useEffect, useState } from "react";

const FloatingCartBtn = ({ darkMode }) => {
  const navigate = useNavigate(); // ✅ useNavigate instead of useRouter
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-[9999]">
      <button
        onClick={() => navigate("/cart")} // ✅ Correct navigation
        className={`relative p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          darkMode
            ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-600"
            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white px-1.5 py-[2px] rounded-full">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingCartBtn;
