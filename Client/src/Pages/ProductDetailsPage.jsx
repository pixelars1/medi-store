import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products as productData } from "../assets/assets";
import { ArrowBigLeft } from "lucide-react";
import { AppContext } from "../Context/AppContext.jsx";

export default function ProductDetailsPage() {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState("180");
  const { darkMode, setCartCount } = useContext(AppContext);
  const [inCart, setInCart] = useState(0);

  useEffect(() => {
    const decodedName = decodeURIComponent(productName);
    const foundProduct = productData.find((p) => p.name === decodedName);
    setProduct(foundProduct || null);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (foundProduct) {
      setInCart(storedCart.includes(foundProduct.name) ? 1 : 0);
    }
  }, [productName]);

  const handleAdd = () => {
    setInCart(1);
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = [...storedCart, product.name];
    const uniqueCart = [...new Set(newCart)];
    localStorage.setItem("cart", JSON.stringify(uniqueCart));
    setCartCount(uniqueCart.length);
  };

  const handleRemove = () => {
    setInCart(0);
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = storedCart.filter((item) => item !== product.name);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartCount(newCart.length);
  };

  const handleBuyNow = () => {
    if (inCart === 1) {
      navigate("/checkout");
    } else {
      handleAdd();
      navigate("/checkout");
    }
  }

  if (!product) {
    return (
      <section
        className={`min-h-screen flex flex-col items-center justify-center px-6 text-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <p className="text-xl font-semibold mb-4">Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
          Go Back
        </button>
      </section>
    );
  }

  const hasMultiplePrices = product.price.includes("–");
  const [lowPrice, highPrice] = product.price
    .replace(/\$/g, "")
    .split("–")
    .map((p) => parseFloat(p.trim()));

  const displayPrice = hasMultiplePrices
    ? selectedQuantity === "90"
      ? `$${lowPrice.toFixed(2)}`
      : `$${highPrice.toFixed(2)}`
    : product.price;

  return (
    <section
      className={`w-full pt-28 min-h-screen px-6 py-16 max-w-6xl mx-auto transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-[400px] object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">
            {product.name}
          </h1>

          {/* Price Section */}
          <div className="flex items-center gap-4">
            {hasMultiplePrices ? (
              <>
                <span className="text-xl line-through text-gray-400">
                  ${lowPrice.toFixed(2)}
                </span>
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {displayPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {product.price}
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity:
            </label>
            {hasMultiplePrices ? (
              <select
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                className="border rounded-md px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="90">90 Tablets</option>
                <option value="180">180 Tablets</option>
              </select>
            ) : (
              <span className="text-base font-semibold">180 Tablets</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-4 pt-0 flex gap-4 flex-col sm:flex-row">
            <button
              onClick={handleAdd}
              disabled={inCart === 1}
              className={`flex-1  text-white py-3 rounded-lg font-semibold transition-all" ${
                inCart === 1
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {inCart === 1 ? "In Cart" : "Add to Cart"}
            </button>

            {inCart === 1 && (
              <button
                onClick={handleRemove}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all duration-300"
              >
                Remove
              </button>
            )}

            <button onClick={handleBuyNow} className="flex-1 py-2.5 bg-black text-white rounded-xl font-semibold text-sm hover:bg-gray-800">
              Buy Now
            </button>
          </div>

          {/* Additional Info */}
          <div className="pt-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
            {product.category && <p><strong>Category:</strong> {product.category}</p>}
            <p><strong>Share:</strong> [Social Share Icons]</p>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      {product.description && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">
            Product Description
          </h2>
          <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300 space-y-2">
            {product.description.split(".").map((line, i) =>
              line.trim() ? <p key={i}>{line.trim()}.</p> : null
            )}
          </div>
        </div>
      )}
    </section>
  );
}
