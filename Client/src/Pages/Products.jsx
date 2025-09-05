import { useState, useContext } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { AppContext } from "../Context/AppContext";
import ProductCard from "../components/ProductCard";

const Products = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [updatedProducts, setUpdatedProducts] = useState([]);
  const { products } = useContext(AppContext);

  // 🔄 Load cart from API or localStorage (if available)
  // useEffect(() => {
  //   const loadCart = async () => {
  //     try {
  //       // Example: fetch cart items for user (if API exists)
  //       const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //       const updatedProducts = products?.map((product) => ({
  //         ...product,
  //         inCart: storedCart.includes(product._id) ? true : false,
  //       }));
  //       setUpdatedProducts(updatedProducts);
  //       setCartCount(storedCart.length);
  //     } catch (error) {
  //       console.error("Cart load error:", error);
  //     }
  //   };
  //   loadCart();
  // }, [products, setCartCount]);

  // Refresh cart count globally
  // const refreshCart = async () => {
  //   try {
  //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //     setCartCount(storedCart.length);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              darkMode={darkMode}
              // refreshCart={refreshCart}
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
