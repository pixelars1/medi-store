import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
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
    originalPrice: "$7.99",
  },
  {
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    image:
      "https://plus.unsplash.com/premium_photo-1723921254681-1cd80686b44e?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A broad-spectrum antibiotic used to treat various bacterial infections.",
    price: "$6.50",
    originalPrice: "$8.99",
  },
  {
    name: "Cetirizine Hydrochloride",
    category: "Allergy Relief",
    image:
      "https://images.unsplash.com/photo-1748385367968-6fd2af37aafb?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Antihistamine used to treat hay fever, allergies, and hives.",
    price: "$3.25",
    originalPrice: "$5.75",
  },
  {
    name: "Metformin 500mg",
    category: "Diabetes",
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
    image:
      "https://www.adegenpharma.com/wp-content/uploads/2023/02/OMILESS-20-CAPSULE.jpg",
    description:
      "Reduces stomach acid; used for GERD and ulcers. the Digestive Health",
    price: "$5.10",
    originalPrice: "$8.99",
  },
];

const ProductCard = ({ darkMode, product, index }) => (
  <div
    key={index}
    className={`rounded-3xl h-[28rem] w-[22rem] p-4 hover:shadow-2xl transition-all duration-300 group cursor-pointer border transform hover:-translate-y-1 ${
      darkMode
        ? "bg-gray-800 border-gray-700 hover:border-blue-500"
        : "bg-white border-gray-100 hover:border-blue-200"
    }`}
  >
    <div className="relative w-full h-[45%] mb-4 rounded-t-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-contain"
      />
      <div className="absolute top-2 mb-4">
        <div
          className={`flex items-center text-xs ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          In Stock
        </div>
      </div>
    </div>

    <div className="mb-4">
      <h3
        className={`text-xl font-bold mb-1 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {product.name}
      </h3>
      <p
        className={`text-sm font-medium mb-2 ${
          darkMode ? "text-blue-400" : "text-blue-600"
        }`}
      >
        {product.category}
      </p>
      <p
        className={`text-sm leading-relaxed h-12 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {product.description}
      </p>
    </div>
    <div className="flex items-center justify-between mb-4">
      <div>
        <span
          className={`text-2xl font-bold ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {product.price}
        </span>
        <span
          className={`ml-2 text-sm line-through ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {product.originalPrice}
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
          ((parseFloat(product.originalPrice.slice(1)) -
            parseFloat(product.price.slice(1))) /
            parseFloat(product.originalPrice.slice(1))) *
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
                <FaChevronLeft
                  className={`${scrollX > 0 && `opacity-[0.5]`}`}
                />
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
      <div className="grid md:px-18 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
