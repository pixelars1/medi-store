import React from "react";
import { CheckCircle } from "lucide-react";

const ProductCard = ({ product, darkMode, onAddToCart, onRemoveFromCart }) => {
  const { name, image, description, price, originalPrice, inCart } = product;

  const discount = Math.round(
    ((parseFloat(originalPrice.slice(1)) - parseFloat(price.slice(1))) /
      parseFloat(originalPrice.slice(1))) *
      100
  );

  return (
    <div
      className={`rounded-3xl overflow-hidden hover:shadow-xl border transition-transform duration-300 transform hover:-translate-y-1 group flex flex-col justify-between ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:border-blue-500"
          : "bg-white border-gray-200 hover:border-blue-200"
      }`}
    >
      {/* Image */}
      <div className="w-full aspect-[4/3] min-h-[150px] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
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
          <p
            className={`text-sm leading-relaxed mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {description}
          </p>
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

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onAddToCart}
            disabled={inCart === 1}
            className={`w-full  py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              inCart === 1
                ? "bg-gray-400 text-white "
                : "bg-blue-600 cursor-pointer text-white hover:bg-blue-700"
            }`}
          >
            {inCart === 1 ? "In Cart" : "Add to Cart"}
          </button>

          {inCart === 1 && (
            <button
              onClick={onRemoveFromCart}
              className="w-full cursor-pointer py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all duration-300"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
