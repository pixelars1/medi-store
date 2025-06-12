import { useEffect, useRef, useState } from "react";
import { CheckCircle, Search } from "lucide-react";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
} from "react-icons/fa";
import ProductCard from "../components/ProductCard";

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

const Products = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="p-10 pt-20 bg-amber-50 dark:bg-[#101828] min-h-screen">
      <div className="w-full">
        <h1
          className={`text-5xl mt-8 font-extrabold text-center text-amber-50 mb-10`}
        >
          Explore Medicines
        </h1>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-2">
          {/* Search Bar */}
          <div className="w-[100%] md:w-[70%] mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for medications"
                className="w-full pl-4 pr-6 py-5 text-lg bg-white rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 border-0"
              />
              <button className="absolute inset-y-0 cursor-pointer right-0 pr-6 flex items-center">
                <Search className="h-6 w-6 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto md:flex">
        {/* filters */}
        <div className="w-[30%] border-r-2 border-r-amber-100 md:block hidden"></div>
        {/* Product Cards Grid */}
        <div className="grid mx-0 md:mx-auto md:px-18 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((medicine, index) => (
            <div
              key={index}
              className={`rounded-3xl p-3 h-[22rem] w-[17rem] hover:shadow-2xl transition-all duration-300 group cursor-pointer border transform hover:-translate-y-1 flex flex-col ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:border-blue-500"
                  : "bg-white border-gray-100 hover:border-blue-200"
              }`}
            >
              {/* Image Section - Reduced height */}
              <div className="w-full h-42 mb-3 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={medicine.image}
                  alt={medicine.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content Section - Flexible */}
              <div className="flex-1 flex flex-col">
                {/* Stock Status */}
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`flex items-center text-xs ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    In Stock
                  </div>
                </div>

                {/* Medicine Info */}
                <div className="mb-3 flex-1">
                  <h3
                    className={`text-lg font-bold mb-1 leading-tight ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {medicine.name}
                  </h3>
                  <p
                    className={`text-xs font-medium mb-2 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {medicine.genericName}
                  </p>
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-baseline">
                    <span
                      className={`text-lg font-bold ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {medicine.price}
                    </span>
                    <span
                      className={`ml-1 text-xs line-through ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {medicine.originalPrice}
                    </span>
                  </div>
                  <div
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
                  </div>
                </div>

                {/* Button - Fixed at bottom */}
                <button
                  className={`w-full py-2.5 rounded-xl font-semibold transition-all duration-300 text-sm ${
                    darkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
