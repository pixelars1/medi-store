import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../Components/ProductCard.jsx";

const CategoryPage = () => {
  const products = [
    {
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      company: "Cipla",
      image:
        "https://images.unsplash.com/photo-1629451565902-4c40a51b374e?q=80&w=1932&auto=format&fit=crop",
      description:
        "Effective for fever and mild pain relief. Suitable for adults and children.",
      price: "$4.99",
      originalPrice: "$7.99",
    },
    {
      name: "Amoxicillin 250mg",
      category: "Antibiotics",
      company: "Sun Pharma",
      image:
        "https://plus.unsplash.com/premium_photo-1723921254681-1cd80686b44e?q=80&w=2020&auto=format&fit=crop",
      description:
        "A broad-spectrum antibiotic used to treat various bacterial infections.",
      price: "$6.50",
      originalPrice: "$8.99",
    },
    {
      name: "Cetirizine Hydrochloride",
      category: "Allergy Relief",
      company: "Pfizer",
      image:
        "https://images.unsplash.com/photo-1748385367968-6fd2af37aafb?q=80&w=1984&auto=format&fit=crop",
      description:
        "Antihistamine used to treat hay fever, allergies, and hives.",
      price: "$3.25",
      originalPrice: "$5.75",
    },
    {
      name: "Metformin 500mg",
      category: "Diabetes",
      company: "Modafinil",
      image:
        "https://www.netmeds.com/images/product-v1/400x400/916665/metform_500mg_tablet_20s_0_0.webp",
      description:
        "Used to control high blood sugar in people with type 2 diabetes.",
      price: "$7.00",
      originalPrice: "$11.25",
    },
    {
      name: "Ibuprofen 400mg",
      category: "Pain Relief",
      company: "Cipla",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/6/319597573/MH/NE/SR/135658020/ibuprofen-400-mg-bp-tablets.jpg",
      description:
        "Non-steroidal anti-inflammatory drug (NSAID) for pain and inflammation.",
      price: "$4.20",
      originalPrice: "$7.75",
    },
    {
      name: "Omeprazole 20mg",
      category: "Digestive Health",
      company: "Sun Pharma",
      image:
        "https://www.adegenpharma.com/wp-content/uploads/2023/02/OMILESS-20-CAPSULE.jpg",
      description: "Reduces stomach acid; used for GERD and ulcers.",
      price: "$5.10",
      originalPrice: "$8.99",
    },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 pt-20">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-2">
        Browse Medicines by Category
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Filter your results by category, company, and more
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Categories Only */}
        <aside className="lg:w-1/5 h-fit sticky top-24 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
            Categories
          </h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer px-4 py-2 rounded-md transition duration-200 font-medium ${
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Top Filters */}
          <div className="sticky top-18 z-10 bg-white dark:bg-gray-800 p-4 rounded-b-xl shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
            {/* Search Bar */}
            <div className="col-span-full lg:col-span-2 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none" />
            </div>

            {/* Company Filter */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Company
              </label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              >
                {companies.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Price
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              >
                {prices.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              >
                {availabilityOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Sort By
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "default"
                      ? "Default"
                      : option.replace(/([A-Z])/g, " $1").trim()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product, index) => (
                <ProductCard key={index} medicine={product} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-300 col-span-full">
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
