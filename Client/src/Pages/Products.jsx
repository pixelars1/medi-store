import { useState, useEffect, useContext } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { products as productData } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import ProductCard from "../components/ProductCard";

const Products = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const { setCartCount } = useContext(AppContext);

  // 🔄 Load cart state from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedProducts = productData.map((product) => ({
      ...product,
      inCart: storedCart.includes(product.name) ? 1 : 0,
    }));
    setProducts(updatedProducts);
    setCartCount(storedCart.length);
  }, [setCartCount]);

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
    setCartCount(newCart.length);
  };
  const handleRemoveFromCart = (index) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, inCart: 0 } : product
    );
    setProducts(updatedProducts);

    const newCart = updatedProducts
      .filter((p) => p.inCart === 1)
      .map((p) => p.name);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartCount(newCart.length);
  }

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
          {paginatedProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              darkMode={darkMode}
              onAddToCart={() =>
                handleAddToCart(products.findIndex((p) => p.name === product.name))
              }
              onRemoveFromCart={() =>
                handleRemoveFromCart(products.findIndex((p) => p.name === product.name))
              }
            />
          ))}
        </section>

        {/* Pagination */}
        <div className="col-span-full flex justify-center">
          {filteredProducts.length > 8 && (
            <div className="flex items-center justify-center space-x-4 mt-10">
              <button
                className="text-white cursor-pointer"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              >
                <ChevronLeft />
              </button>
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
              <button
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
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
