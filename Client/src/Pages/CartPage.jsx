import React, { useContext, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { products as productData } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

export default function CartPage({ darkMode }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Get cart names from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter from actual product data
    const initialItems = productData
      .filter((product) => storedCart.includes(product.name))
      .map((item, index) => ({
        ...item,
        id: index + 1,
        quantity: 1,
        price: parseFloat(item.price.replace("$", "").split("–")[0]),
      }));

    setCartItems(initialItems);
    
  }, []);

  // Quantity update
  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Remove from cart (also update localStorage)
  const removeItem = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);

    // Update localStorage cart
    const currentCartNames = JSON.parse(localStorage.getItem("cart")) || [];
    const newCartNames = currentCartNames.filter(
      (name) => name !== itemToRemove.name
    );
    localStorage.setItem("cart", JSON.stringify(newCartNames));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const { setCartCount } = useContext(AppContext);
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems, setCartCount]);

  return (
    <section
      className={`px-4 py-16 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-600 dark:text-green-400 mb-10">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p
            className={`text-center text-lg sm:text-xl font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl shadow-md ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{item.name}</h4>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      ${item.price.toFixed(2)} per unit
                    </p>
                    <div className="flex items-center mt-3 gap-2">
                      <button
                        className="px-2 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        −
                      </button>
                      <span className="px-3 font-medium">{item.quantity}</span>
                      <button
                        className="px-2 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Remove"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              className={`rounded-2xl shadow-md p-6 h-fit ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
                Order Summary
              </h3>
              <div className="flex justify-between mb-2">
                <span>Total Items:</span>
                <span>{cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
