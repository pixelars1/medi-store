import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

const categories = [
  "All",
  "Pain Relief",
  "Antibiotics",
  "Allergy Relief",
  "Diabetes",
  "Digestive Health",
  "Vitamins",
  "Heart Health",
  "Cold & Flu",
];

const products = [
  {
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    image:
      "https://images.unsplash.com/photo-1629451565902-4c40a51b374e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Effective for fever and mild pain relief. Suitable for adults and children.",
    price: "$4.99",
    rating: 4.5,
  },
  {
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    image:
      "https://plus.unsplash.com/premium_photo-1723921254681-1cd80686b44e?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A broad-spectrum antibiotic used to treat various bacterial infections.",
    price: "$6.50",
    rating: 4.8,
  },
  {
    name: "Cetirizine Hydrochloride",
    category: "Allergy Relief",
    image:
      "https://images.unsplash.com/photo-1748385367968-6fd2af37aafb?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Antihistamine used to treat hay fever, allergies, and hives.",
    price: "$3.25",
    rating: 4.4,
  },
  {
    name: "Metformin 500mg",
    category: "Diabetes",
    image:
      "https://www.netmeds.com/images/product-v1/400x400/916665/metform_500mg_tablet_20s_0_0.webp",
    description:
      "Used to control high blood sugar in people with type 2 diabetes.",
    price: "$7.00",
    rating: 4.7,
  },
  {
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/6/319597573/MH/NE/SR/135658020/ibuprofen-400-mg-bp-tablets.jpg",
    description:
      "Non-steroidal anti-inflammatory drug (NSAID) for pain and inflammation.",
    price: "$4.20",
    rating: 4.6,
  },
  {
    name: "Omeprazole 20mg",
    category: "Digestive Health",
    image:
      "https://www.adegenpharma.com/wp-content/uploads/2023/02/OMILESS-20-CAPSULE.jpg",
    description:
      "Reduces stomach acid; used for GERD and ulcers. the Digestive Health",
    price: "$5.10",
    rating: 4.3,
  },
];

const ProductCard = ({ product }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 w-[280px] sm:w-[300px] md:w-[350px] border border-gray-200 hover:shadow-lg"
  >
    <img
      src={product.image}
      alt={product.name}
      className="h-[180px] w-full object-cover rounded-t-2xl"
    />
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-semibold text-blue-900 line-clamp-1">
        {product.name}
      </h2>
      <p className="text-sm text-blue-600 font-medium">{product.category}</p>
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>
      <div className="flex justify-between items-center pt-1">
        <span className="text-base font-bold text-green-700">
          {product.price}
        </span>
        <span className="flex items-center text-yellow-500 text-sm">
          <FaStar className="mr-1" /> {product.rating}
        </span>
      </div>
      <button className="w-full mt-2 py-2 cursor-pointer text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex justify-center items-center gap-2">
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  </motion.div>
);

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);

  const scroll = (shift) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += shift;
      setScrollX(containerRef.current.scrollLeft);
      checkScrollEnd();
    }
  };

  const checkScrollEnd = () => {
    const el = containerRef.current;
    if (el) {
      setScrollEnd(el.scrollWidth - el.scrollLeft <= el.clientWidth + 5);
    }
  };

  useEffect(() => {
    checkScrollEnd();
  }, []);

  return (
    <div className="p-10 pt-20 bg-gradient-to-br from-[#1DA678] to-[#18a375] min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-10">
        Explore Medicines
      </h1>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md bg-white border border-blue-300 rounded-full shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow outline-none text-sm text-zinc-700 placeholder:text-zinc-400 bg-transparent"
          />
          <button className="text-blue-600 hover:text-blue-800 transition">
            <FaSearch size={18} />
          </button>
        </div>

        {/* Category Filter - responsive & Scrollable */}
        <div className="w-full flex items-center gap-2">

          {/* Category Scroll Container */}
          <div className="w-full">
            <div className="flex items-center gap-3">
              {/* Static Filter Label */}
              <div className="flex-shrink-0 flex items-center gap-2 text-blue-900 font-medium text-sm whitespace-nowrap">
                <FaFilter />
                <span>Filter by Category:</span>
              </div>
              {/* Left Scroll Button */}
              <button
                onClick={() => scroll(-200)}
                className="text-blue-900 text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(0,0,0,0.2)] cursor-pointer hover:shadow-[0_0_25px_rgba(0,0,0,0.4)]"
              >
                <FaChevronLeft className={`${scrollX > 0 && `opacity-[0.5]`}`} />
              </button> 
              {/* Scrollable Category Buttons */}
              <div
                className="flex-1 overflow-x-auto scrollbar-hide"
                ref={containerRef}
              >
                <div className="flex gap-3 w-max lg:max-w-[400px]">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center gap-2 text-xs md:text-sm px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <span className="capitalize">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll(200)}
            className="text-blue-900 text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(0,0,0,0.2)] cursor-pointer hover:shadow-[0_0_25px_rgba(0,0,0,0.4)]"
          >
            {<FaChevronRight className={`${scrollEnd && `opacity-[0.5]`}`} />}
          </button>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:px-4 xl:grid-cols-4 gap-12 justify-items-center">
        {filteredProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
