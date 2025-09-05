import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext.jsx";
import { addToCart, removeCartItem, getCart } from "../api/cartApi";
import { ShoppingCart, Trash2, Share2 } from "lucide-react";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { darkMode, products, user } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState("180");
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(null);

  const userId = user?.uid;

  // ✅ Load product
  useEffect(() => {
    const foundProduct = products.find((p) => p._id === productId);
    setProduct(foundProduct || null);

    if (user && foundProduct) {
      (async () => {
        try {
          const cart = await getCart(userId);
          setCartId(cart._id);
          const exists = cart.items.find((item) => item.productId._id === productId);
          setInCart(!!exists);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [productId, products, user, userId]);

  // ✅ Handle Add
  const handleAdd = async () => {
    if (!userId) return alert("Please login to add items to cart");

    try {
      setLoading(true);
      const cartData = {
        userId,
        productId: product._id,
        quantity: 1,
        tablet: selectedQuantity,
      };
      await addToCart(cartData);
      setInCart(true);
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Remove
  const handleRemove = async () => {
    if (!userId || !cartId) return;

    try {
      setLoading(true);
      await removeCartItem(cartId, product._id);
      setInCart(false);
    } catch (error) {
      console.error("Remove from cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Buy Now
  const handleBuyNow = async () => {
    if (!inCart) await handleAdd();
    navigate("/checkout");
  };

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

  // ✅ Price Handling
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
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-[400px] object-contain rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">
            {product.name}
          </h1>

          {/* Price */}
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

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Quantity:</label>
            {hasMultiplePrices ? (
              <select
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                className="border rounded-md px-4 py-2 bg-white dark:bg-gray-800"
              >
                <option value="90">90 Tablets</option>
                <option value="180">180 Tablets</option>
              </select>
            ) : (
              <span className="text-base font-semibold">180 Tablets</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAdd}
              disabled={inCart || loading}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                inCart
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {loading ? "Adding..." : inCart ? "In Cart" : "Add to Cart"}
            </button>

            {inCart && (
              <button
                onClick={handleRemove}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
              >
                <Trash2 className="w-5 h-5" />
                {loading ? "Removing..." : "Remove"}
              </button>
            )}

            <button
              onClick={handleBuyNow}
              className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
            >
              Buy Now
            </button>
          </div>

          {/* Info */}
          <div className="pt-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {product.category && <p><strong>Category:</strong> {product.category}</p>}
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <p>Share this product</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
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
