import { CheckCircle } from "lucide-react";
function ProductCard({ medicine, index, darkMode }) {
  return (
    <div
      className={`rounded-3xl p-3 hover:shadow-2xl transition-all duration-300 group cursor-pointer border transform hover:-translate-y-1 ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:border-blue-500"
          : "bg-white border-gray-100 hover:border-blue-200"
      }`}
    >
      <div className="w-full h-60 mb-4 rounded-t-lg bg-red-400 overflow-hidden">
        <img
          src={medicine.image}
          alt={medicine.title}
          className="h-full w-full "
        />
      </div>
      <div className="flex justify-between items-start mb-4">
        <div
          className={`flex items-center text-xs ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          In Stock
        </div>
      </div>

      <div className="mb-4">
        <h3
          className={`text-xl font-bold mb-1 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {medicine.name}
        </h3>
        <p
          className={`text-sm font-medium mb-2 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {medicine.genericName}
        </p>
        <p
          className={`text-sm leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {medicine.description}
        </p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span
            className={`text-2xl font-bold ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {medicine.price}
          </span>
          <span
            className={`ml-2 text-sm line-through ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {medicine.originalPrice}
          </span>
        </div>
        <div
          className={`text-sm font-semibold px-2 py-1 rounded ${
            darkMode
              ? "bg-green-900 text-green-200"
              : "bg-green-100 text-green-800"
          }`}
        >
          Save{" "}
          {Math.round(
            ((parseFloat(medicine.originalPrice.slice(1)) -
              parseFloat(medicine.price.slice(1))) /
              parseFloat(medicine.originalPrice.slice(1))) *
              100
          )}
          %
        </div>
      </div>

      <button
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300  ${
          darkMode
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
}
export default ProductCard;
