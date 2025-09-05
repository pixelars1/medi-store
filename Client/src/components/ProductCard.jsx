import React, { useState, useEffect, useContext } from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart, removeCartItem, getCart } from "../api/cartApi";
import { AppContext } from "@/Context/AppContext";
const ProductCard = ({ product, darkMode }) => {
  const { _id, name, image, price, originalPrice,tablet } = product;
  console.log("product price",price);
  
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [cartId, setCartId] = useState(null); // store cartId
  const {user,setCartCount}=useContext(AppContext)

  const userId = user?.uid;

  const discount = Math.round(
    ((parseFloat(originalPrice.slice(1)) - parseFloat(price.slice(1))) /
      parseFloat(originalPrice.slice(1))) *
      100
  );

  useEffect(() => {
  const fetchCart = async () => {
    if (!user) return;
    try {
      const cart = await getCart(userId);
      setCartId(cart._id);

      const exists = cart.items.find(
        (item) => item.productId && item.productId._id === _id
      );
      setCartCount(cart.items.length);
      setInCart(!!exists);
    } catch (err) {
      console.error(err);
    }
  };
  fetchCart();
}, [userId, _id, user, setCartCount]);


  const handleAdd = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please login to add items to cart");

    try {
      setLoading(true);
      const cartData = { userId, productId: _id, quantity: 1 ,tablet};
      const carts= await addToCart(cartData);
      setCartCount(carts?.cart?.items.length || 0);
      setInCart(true);

    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    if (!userId || !cartId) return;

    try {
      setLoading(true);
      const updatedCarts= await removeCartItem(cartId, _id);
      setCartCount(updatedCarts?.cart?.items.length || 0);
      setInCart(false);
    } catch (error) {
      console.error("Remove from cart error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`rounded-3xl overflow-hidden hover:shadow-xl border transition-transform duration-300 transform hover:-translate-y-1 group flex flex-col justify-between ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:border-blue-500"
          : "bg-white border-gray-200 hover:border-blue-200"
      }`}
    >
      <Link to={`/product/${_id}`} className="block">
        <div className="w-full aspect-[4/3] min-h-[150px] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <div
              className={`flex items-center text-xs mb-2 ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              In Stock
            </div>

            <h3
              className={`text-lg font-bold mb-1 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {name}
            </h3>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline">
              <span
                className={`text-lg font-bold ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {price}
              </span>
              <span
                className={`ml-2 text-sm line-through ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {originalPrice}
              </span>
            </div>

            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                darkMode
                  ? "bg-green-900 text-green-200"
                  : "bg-green-100 text-green-800"
              }`}
            >
              Save {discount}%
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0 flex gap-2">
        <button
          onClick={handleAdd}
          disabled={loading || inCart}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
            inCart
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : inCart ? "In Cart" : "Add to Cart"}
        </button>

        {inCart && (
          <button
            onClick={handleRemove}
            disabled={loading}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all duration-300"
          >
            {loading ? "Removing..." : "Remove"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
