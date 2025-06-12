import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const reviews = [
  {
    name: "Kristin Watson",
    img: "https://legitmedications.com/wp-content/uploads/elementor/thumbs/w-lawyer-testimonials-1-opt-qt8ozy21rntckuh4usnz3t1vawm3sj5mk44ljezgpk.jpg",
    rating: 5,
    text: "Fast shipping, excellent service, and accurate orders. Highly satisfied with Legit Medications!",
  },
  {
    name: "Ronald Richards",
    img: "https://legitmedications.com/wp-content/uploads/elementor/thumbs/w-lawyer-testimonials-2-opt-qt8ozy21rntckuh4usnz3t1vawm3sj5mk44ljezgpk.jpg",
    rating: 5,
    text: "Great user experience and reliable delivery. Always receive my medications quickly and safely.",
  },
  {
    name: "Wade Warren",
    img: "https://legitmedications.com/wp-content/uploads/elementor/thumbs/w-lawyer-testimonials-3-opt-qt8ozyzvyhumwgfrpb2loatbwahh089cw8s30oy2jc.jpg",
    rating: 5,
    text: "Efficient service and user-friendly website. Orders are processed promptly and always correct.",
  },
  {
    name: "Aviana Plummer",
    img: "https://legitmedications.com/wp-content/uploads/elementor/thumbs/w-lawyer-testimonials-4-opt-qt8ozyzvyhumwgfrpb2loatbwahh089cw8s30oy2jc.jpg",
    rating: 5,
    text: "Exceptional service with quick processing. Orders arrive on time, and the website is very convenient.",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex justify-center space-x-1 text-yellow-400 mt-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-current" : "text-gray-300 dark:text-gray-600"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.922-.755 1.688-1.54 1.118l-3.388-2.455a1 1 0 00-1.176 0l-3.388 2.455c-.785.57-1.838-.196-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm uppercase text-blue-600 dark:text-blue-400 mb-2 tracking-wider">
          Testimonials
        </p>
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Customer Reviews
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Our clients speak for us — discover real stories from real customers
          who trust MediCare for safe and reliable health solutions.
        </p>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map(({ name, img, rating, text }, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 mx-2 h-full flex flex-col items-center text-center">
                <img
                  src={img}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 mb-4"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {name}
                </h3>
                <StarRating rating={rating} />
                <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm italic">
                  "{text}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
