import React, { useContext, useState } from "react";
import { Star } from "lucide-react";
import { AppContext } from "../Context/AppContext";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const {darkMode} = useContext(AppContext)


  const product = {
    name: "Digital Thermometer Pro",
    price: "$29.99",
    rating: 4.8,
    image: "🌡️",
    description: "Fast, accurate temperature readings with memory function",
  };

  const relatedProducts = [
    {
      name: "Digital Thermometer Pro",
      price: "$29.99",
      rating: 4.8,
      image: "🌡️",
      description:
        "Fast, accurate temperature readings with memory function",
    },
    {
      name: "Blood Pressure Monitor",
      price: "$89.99",
      rating: 4.9,
      image: "🩺",
      description:
        "Professional-grade BP monitor with smartphone connectivity",
    },
    {
      name: "First Aid Kit Premium",
      price: "$45.99",
      rating: 4.7,
      image: "🏥",
      description: "Comprehensive emergency kit for home and office use",
    },
    {
      name: "Pulse Oximeter",
      price: "$39.99",
      rating: 4.8,
      image: "📊",
      description: "Accurate oxygen saturation and pulse rate monitoring",
    },
    {
      name: "Smart Glucometer",
      price: "$69.99",
      rating: 4.9,
      image: "💉",
      description: "Bluetooth-enabled glucose meter with app integration",
    },
    {
      name: "N95 Respirator Masks",
      price: "$24.99",
      rating: 4.6,
      image: "😷",
      description: "Medical-grade protection masks (Pack of 20)",
    },
  ];

  return (
    <div
      className={`min-h-screen px-4 py-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-50 via-white to-emerald-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">Product Details</h1>
      </div>

      {/* Product info */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        <div className="md:w-1/2 flex justify-center">
          <div
            className={`p-4 rounded-md w-full max-w-md flex items-center justify-center text-7xl ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {product.image}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-semibold">Zincovit Multivitamin Tablets</h2>
          <p className="text-red-500 text-xl">
            <del
              className={`mr-2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              $30.00
            </del>
            $25.00
          </p>
          <ul className="list-disc ml-6 text-base space-y-1">
            <li>Helps maintain immunity</li>
            <li>Rich in vitamins and minerals</li>
            <li>Recommended by health professionals</li>
          </ul>
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className={`px-3 py-1 border rounded transition ${
                darkMode
                  ? "border-gray-600 hover:bg-gray-600"
                  : "border-gray-300 hover:bg-gray-200"
              }`}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className={`px-3 py-1 border rounded transition ${
                darkMode
                  ? "border-gray-600 hover:bg-gray-600"
                  : "border-gray-300 hover:bg-gray-200"
              }`}
              aria-label="Increase quantity"
            >
              +
            </button>
            <button className="ml-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Add to Cart
            </button>
          </div>
          <div className="text-sm space-y-1 mt-4">
            <p>
              <strong>SKU:</strong> zincovit-100
            </p>
            <p>
              <strong>Category:</strong> Multivitamins
            </p>
            <p>
              <strong>Tag:</strong> Immunity
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {relatedProducts.map((prod, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 transition-shadow duration-300 cursor-pointer border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:shadow-xl"
                  : "bg-white border-gray-200 hover:shadow-lg"
              }`}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">{prod.image}</div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {prod.name}
                </h3>
                <p
                  className={`text-sm mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {prod.description}
                </p>
                <div className="flex items-center justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(prod.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span
                    className={`ml-2 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    ({prod.rating})
                  </span>
                </div>
                <div
                  className={`text-2xl font-bold mb-4 ${
                    darkMode ? "text-green-400" : "text-green-600"
                  }`}
                >
                  {prod.price}
                </div>
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-colors duration-300 ${
                    darkMode
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
