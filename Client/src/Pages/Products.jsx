import { useState, useEffect } from "react";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { products as productData } from "../assets/assets";

const Products = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  // 🔄 Load cart state from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedProducts = productData.map((product) => ({
      ...product,
      inCart: storedCart.includes(product.name) ? 1 : 0,
    }));
    setProducts(updatedProducts);
  }, []);

  // ✅ Handle Add to Cart
  const handleAddToCart = (index) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, inCart: 1 } : product
    );
    setProducts(updatedProducts);

    const newCart = updatedProducts
      .filter((p) => p.inCart === 1)
      .map((p) => p.name);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  );

  return (
    <div className="pt-20 pb-4 px-4 sm:px-8 lg:px-16 bg-amber-50 dark:bg-[#101828] min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-amber-700 dark:text-white mb-12">
          Explore Medicines
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for medications"
              className="w-full pl-5 pr-12 py-4 text-lg bg-white dark:bg-gray-900 dark:text-white rounded-2xl shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 h-5 w-5" />
          </div>
        </div>

        {/* Product Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedProducts.map((medicine, index) => (
            <div
              key={index}
              className={`rounded-3xl overflow-hidden hover:shadow-xl border transition-transform duration-300 transform hover:-translate-y-1 group flex flex-col justify-between ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:border-blue-500"
                  : "bg-white border-gray-200 hover:border-blue-200"
              }`}
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] min-h-[150px] overflow-hidden">
                <img
                  src={medicine.image}
                  alt={medicine.name}
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
                    {medicine.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-4 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {medicine.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline">
                    <span
                      className={`text-lg font-bold ${
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

                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
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
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={medicine.inCart === 1}
                  onClick={() =>
                    handleAddToCart(
                      products.findIndex((p) => p.name === medicine.name)
                    )
                  }
                  className={`w-full py-2.5 cursor-pointer rounded-xl font-semibold text-sm transition-all duration-300 ${
                    medicine.inCart === 1
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {medicine.inCart === 1 ? "In Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="col-span-full flex justify-center">
            {filteredProducts.length > 8 && (
              <div className="flex items-center justify-center space-x-4 mt-10">
                <a
                  className="text-white cursor-pointer"
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                >
                  <ChevronLeft />
                </a>
                {Array.from({
                  length: Math.ceil(filteredProducts.length / 8),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex justify-center items-center border border-gray-300 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <a
                  className="text-white cursor-pointer"
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        currentPage + 1,
                        Math.ceil(filteredProducts.length / 8)
                      )
                    )
                  }
                >
                  <ChevronRight />
                </a>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
