import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../components/ProductCard.jsx";
import { Menu, Search } from "lucide-react";
import { products as productData } from "../assets/assets.js";
import { AppContext } from "../Context/AppContext.jsx";
const CategoryPage = ({ darkMode }) => {
  const getUniqueValues = (items, key) => [
    "All",
    ...Array.from(new Set(items.map((item) => item[key]))),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

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

  const categories = getUniqueValues(products, "category");
  const companies = getUniqueValues(products, "company");
  const prices = ["All", "$0 - $5", "$5 - $10", "$10+"];
  const availabilityOptions = ["All", "In Stock", "Out of Stock"];
  const sortOptions = [
    "default",
    "priceAsc",
    "priceDesc",
    "nameAsc",
    "nameDesc",
  ];
  const filterOptions = [
    {
      label: "Company",
      value: selectedCompany,
      onChange: setSelectedCompany,
      options: companies,
    },
    {
      label: "Price",
      value: priceRange,
      onChange: setPriceRange,
      options: prices,
    },
    {
      label: "Availability",
      value: availability,
      onChange: setAvailability,
      options: availabilityOptions,
    },
    {
      label: "Sort By",
      value: sortOption,
      onChange: setSortOption,
      options: sortOptions.map((opt) => ({
        value: opt,
        label:
          opt === "default" ? "Default" : opt.replace(/([A-Z])/g, " $1").trim(),
      })),
    },
  ];
  const filterByPrice = (price, range) => {
    const val = parseFloat(price.replace("$", ""));
    if (range === "$0 - $5") return val <= 5;
    if (range === "$5 - $10") return val > 5 && val <= 10;
    if (range === "$10+") return val > 10;
    return true;
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchCompany =
      selectedCompany === "All" || product.company === selectedCompany;
    const matchPrice = filterByPrice(product.price, priceRange);
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchCompany && matchPrice && matchSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceAsc")
      return parseFloat(a.price) - parseFloat(b.price);
    if (sortOption === "priceDesc")
      return parseFloat(b.price) - parseFloat(a.price);
    if (sortOption === "nameAsc") return a.name.localeCompare(b.name);
    if (sortOption === "nameDesc") return b.name.localeCompare(a.name);
    return 0; // default
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 pt-20">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-2">
        Browse Medicines by Category
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
        Filter your results by category, company, and more
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Header Row for Mobile */}
        {/* Mobile Menu and Search Bar - Only for Small Screens */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="text-green-600"
            aria-label="Toggle Filters"
          >
            <Menu size={24} />
          </button>

          {/* Search bar */}
          <div className="flex-1 ml-4 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              size={18}
            />
          </div>
        </div>

        {/* Sidebar - Categories Only for Large Screens */}
        <aside className="hidden lg:block lg:w-1/5 h-fit bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md sticky top-24">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
            Categories
          </h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer px-4 py-2 rounded-md transition font-medium text-sm sm:text-base ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Filter Section - Only for Mobile Screens (toggleable) */}
        {showMobileFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 lg:hidden">
            {filterOptions.map((filter, i) => (
              <div key={i} className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  {filter.label}
                </label>
                <select
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                >
                  {(filter.options || []).map((opt) => (
                    <option key={opt.value || opt} value={opt.value || opt}>
                      {opt.label || opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Top Filters - Hidden on Small Screens */}
          <div className="hidden lg:grid sticky top-16 z-10 bg-white dark:bg-gray-800 p-4 rounded-b-xl shadow-md grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Search Bar */}
            <div className="col-span-full lg:col-span-2 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none" />
            </div>

            {/* Filters */}
            {filterOptions?.map((filter, i) => (
              <div key={i} className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  {filter?.label}
                </label>
                <select
                  value={filter?.value}
                  onChange={(e) => filter?.onChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm"
                >
                  {(filter?.options || []).map((opt, index) => (
                    <option key={index} value={opt?.value || opt}>
                      {opt?.label || opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Product Grid */}
          <div className="h-6/7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  darkMode={darkMode}
                  onAddToCart={() =>
                    handleAddToCart(
                      products.findIndex((p) => p.name === product.name)
                    )
                  }
                  onRemoveFromCart={() =>
                    handleRemoveFromCart(
                      products.findIndex((p) => p.name === product.name)
                    )
                  }
                />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-300 col-span-full text-center">
                No matching products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
