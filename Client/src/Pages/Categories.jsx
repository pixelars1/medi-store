import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../components/ProductCard.jsx";
import { Menu, Search } from "lucide-react";

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


          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product, index) => (
                <ProductCard key={index} medicine={product} />
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
