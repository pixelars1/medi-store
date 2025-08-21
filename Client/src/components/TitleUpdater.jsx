import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "Home | MediCare",
  "/about": "About | MediCare",
  "/contact": "Contact | MediCare",
  "/products": "Products | MediCare",
  "/categories": "Categories | MediCare",
  "/auth": "Sign-in | MediCare",
  "/cart": "Cart | MediCare",
  "/checkout": "Checkout | MediCare",
};

function TitleUpdater() {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    let title = titles[path]; // direct match first

    // Handle dynamic product route
    if (!title && path.startsWith("/product/")) {
      const productName = path.split("/")[2]; // get from URL
      title = `${decodeURIComponent(productName)} | Product Details | MediCare`;
    }

    document.title = title || "MediCare"; // default fallback
  }, [path]);

  return null;
}

export default TitleUpdater;
