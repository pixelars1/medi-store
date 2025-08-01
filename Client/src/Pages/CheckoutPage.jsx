import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { products as productData } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import { ArrowBigLeft } from "lucide-react";

export default function CheckoutPage() {
  const { darkMode } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    notes: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
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

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!customer.name || !customer.email || !customer.address || !customer.city || !customer.state || !customer.zip) {
      setMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const orderData = { customer, cartItems, totalPrice };

    try {
      const response = await fetch("/api/sendOrderEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setMessage("Order placed successfully! Please check your email.");
        localStorage.removeItem("cart");
        setCartItems([]);
        setCustomer({
          name: "",
          email: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          notes: "",
        });
      } else {
        setMessage("Failed to place order. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Order error:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <section
      className={`min-h-screen px-6 py-16 max-w-5xl mx-auto transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
     
      <h2 className="text-4xl font-extrabold mb-14 text-center text-green-600 dark:text-green-400 tracking-tight">
        Checkout
      </h2>

      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-1 md:grid-cols-3 gap-10 rounded-3xl shadow-lg p-10 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        noValidate
      >
        {/* Customer Details */}
        <div className="md:col-span-2 space-y-7">
          <fieldset className="space-y-6">
            {[...Array(8)].map((_, i) => {
              const fields = [
                { label: "Full Name", name: "name", type: "text", required: true },
                { label: "Email Address", name: "email", type: "email", required: true },
                { label: "Street Address", name: "address", type: "textarea", required: true },
                { label: "City", name: "city", type: "text", required: true },
                { label: "State/Province", name: "state", type: "text", required: true },
                { label: "ZIP / Postal Code", name: "zip", type: "text", required: true },
                { label: "Phone Number", name: "phone", type: "tel", required: false },
                { label: "Order Notes (optional)", name: "notes", type: "textarea", required: false },
              ];
              const { label, name, type, required } = fields[i];
              return (
                <div key={name} className="relative">
                  {type === "textarea" ? (
                    <>
                      <textarea
                        id={name}
                        name={name}
                        value={customer[name]}
                        onChange={handleChange}
                        rows={4}
                        required={required}
                        placeholder={label}
                        className={`peer w-full rounded-xl border shadow-sm ${
                          darkMode ? "border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                        } px-5 pt-6 pb-2 resize-none placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                      />
                      <label
                        htmlFor={name}
                        className={`absolute left-5 top-3 text-sm cursor-text transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-sm peer-focus:text-green-500`}
                      >
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    </>
                  ) : (
                    <>
                      <input
                        id={name}
                        name={name}
                        type={type}
                        value={customer[name]}
                        onChange={handleChange}
                        required={required}
                        placeholder={label}
                        className={`peer w-full rounded-xl border shadow-sm ${
                          darkMode ? "border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400" : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                        } px-5 pt-6 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                      />
                      <label
                        htmlFor={name}
                        className={`absolute left-5 top-3 text-sm cursor-text transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-sm peer-focus:text-green-500`}
                      >
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    </>
                  )}
                </div>
              );
            })}
          </fieldset>
           <div className="flex items-center justify-between mt-5 mb-5">
        <button
          onClick={() => navigate("/cart")}
          className={`flex max-sm:hidden items-center mx-auto gap-2 text-sm font-semibold rounded-lg px-4 py-2 transition-colors duration-300 ${
            darkMode
              ? "bg-green-700 text-green-100 hover:bg-green-600"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
          aria-label="Back to Cart"
        >
          <ArrowBigLeft /> Back to Cart
        </button>
      </div>

        </div>

        {/* Order Summary */}
        <aside
          className={`rounded-3xl p-7 flex flex-col justify-between shadow-inner md:sticky md:top-24 h-fit ${
            darkMode ? "bg-gray-900 text-gray-100" : "bg-green-50 text-green-900"
          }`}
          aria-label="Order summary"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-green-700 dark:text-green-400">
              Order Summary
            </h3>
            <ul className="space-y-4 max-h-64 overflow-y-auto mb-6 pr-2">
              {cartItems.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Your cart is empty.
                </p>
              )}
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-green-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-green-400 dark:border-green-600 pt-4">
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {message && (
              <p
                className={`mb-4 text-center font-semibold text-sm ${
                  message.includes("successfully")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
                role="alert"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className={`w-full py-3 rounded-2xl font-semibold text-white transition-colors duration-300 ${
                cartItems.length === 0 || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </aside>
      </form>
    </section>
  );
}
