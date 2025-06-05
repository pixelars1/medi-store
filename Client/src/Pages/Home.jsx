import {
  Heart,
  Shield,
  Search,
  Star,
  Pill,
  Syringe,
  Truck,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function Home({ darkMode }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={`transition-colors duration-300 ${
        darkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`relative min-h-screen flex items-center justify-center px-4 py-20 bg-[url(/public/banner-bg.jpg)]`}
      >
        <div className="absolute inset-0 bg-opacity-20"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your Trusted{" "}
              <span className="text-lime-200 block md:inline">
                Online Pharmacy
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-4xl mx-auto leading-relaxed">
              Fast, Safe, Affordable - Get your medications delivered to your
              doorstep in no time!
            </p>
            <p className="text-md text-blue-200 mb-12 max-w-3xl mx-auto">
              Licensed pharmacists • FDA-approved medications • Secure delivery
              • Insurance accepted
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for medications"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-6 py-5 text-lg bg-white rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 border-0"
              />
              <button className="absolute inset-y-0 cursor-pointer right-0 pr-6 flex items-center">
                <Search className="h-6 w-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "50K+", label: "Happy Patients" },
              { number: "5000+", label: "Medications" },
              { number: "24/7", label: "Support" },
              { number: "Fast", label: "Delivery" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        className={`px-4 py-20 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Medicine Categories
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Browse our comprehensive range of prescription and
              over-the-counter medications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Pill,
                title: "Prescription Drugs",
                description:
                  "FDA-approved prescription medications from licensed manufacturers",
                count: "2000+ Medicines",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: Heart,
                title: "Chronic Care",
                description:
                  "Medications for diabetes, hypertension, and heart conditions",
                count: "800+ Options",
                color: "from-red-500 to-pink-600",
              },
              {
                icon: Shield,
                title: "OTC Medicines",
                description:
                  "Over-the-counter treatments for common health issues",
                count: "1200+ Products",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: Syringe,
                title: "Specialized Care",
                description:
                  "Oncology, rare diseases, and specialty medications",
                count: "500+ Treatments",
                color: "from-purple-500 to-violet-600",
              },
            ].map((category, index) => (
              <div
                key={index}
                className={`group p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 border cursor-pointer transform hover:-translate-y-2 ${
                  darkMode
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 hover:border-blue-500"
                    : "bg-white border-gray-100 hover:border-blue-200 shadow-lg"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r ${category.color}`}
                >
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {category.title}
                </h3>
                <p
                  className={`leading-relaxed mb-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {category.description}
                </p>
                <div
                  className={`text-sm font-semibold ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {category.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Medicines Section */}
      <section
        className={`px-4 py-20 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Popular Medications
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Trusted medications prescribed by healthcare professionals
              worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Lisinopril 10mg",
                genericName: "ACE Inhibitor",
                price: "$12.99",
                originalPrice: "$18.99",
                rating: 4.8,
                reviews: 1247,
                description:
                  "For high blood pressure and heart failure treatment",
                inStock: true,
              },
              {
                name: "Metformin 500mg",
                genericName: "Diabetes Medication",
                price: "$8.99",
                originalPrice: "$15.99",
                rating: 4.9,
                reviews: 2156,
                description:
                  "Type 2 diabetes management and blood sugar control",
                inStock: true,
              },
              {
                name: "Ibuprofen 200mg",
                genericName: "Pain Reliever",
                price: "$6.99",
                originalPrice: "$9.99",
                rating: 4.7,
                reviews: 891,
                description: "Anti-inflammatory pain relief and fever reducer",
                inStock: true,
              },
              {
                name: "Omeprazole 20mg",
                genericName: "Proton Pump Inhibitor",
                price: "$14.99",
                originalPrice: "$22.99",
                rating: 4.8,
                reviews: 756,
                description:
                  "Gastric acid reduction for GERD and ulcer treatment",
                inStock: true,
              },
              {
                name: "Atorvastatin 20mg",
                genericName: "Statin",
                price: "$16.99",
                originalPrice: "$28.99",
                rating: 4.9,
                reviews: 1834,
                description:
                  "Cholesterol management and cardiovascular protection",
                inStock: true,
              },
              {
                name: "Cetirizine 10mg",
                genericName: "Antihistamine",
                price: "$9.99",
                originalPrice: "$13.99",
                rating: 4.6,
                reviews: 634,
                description:
                  "Allergy relief for seasonal and year-round symptoms",
                inStock: true,
              },
            ].map((medicine, index) => (
              <div
                key={index}
                className={`rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 group cursor-pointer border transform hover:-translate-y-1 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 hover:border-blue-500"
                    : "bg-white border-gray-100 hover:border-blue-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`flex items-center text-xs ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    In Stock
                  </div>
                </div>

                <div className="mb-4">
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {medicine.name}
                  </h3>
                  <p
                    className={`text-sm font-medium mb-2 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {medicine.genericName}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {medicine.description}
                  </p>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(medicine.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span
                    className={`ml-2 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {medicine.rating} ({medicine.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span
                      className={`text-2xl font-bold ${
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
                  <div
                    className={`text-sm font-semibold px-2 py-1 rounded ${
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
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className={`px-4 py-20 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              What Our Patients Say
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Real experiences from people who trust us with their medication
              needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Martinez",
                condition: "Diabetes Patient",
                content:
                  "Getting my diabetes medication has never been easier. Same-day delivery and competitive prices make managing my condition stress-free.",
                rating: 5,
                avatar: "👩‍💼",
                verified: true,
              },
              {
                name: "Dr. Michael Chen",
                condition: "Family Physician",
                content:
                  "I recommend this pharmacy to my patients. They maintain high standards for medication quality and patient safety protocols.",
                rating: 5,
                avatar: "👨‍⚕️",
                verified: true,
              },
              {
                name: "Emily Rodriguez",
                condition: "Heart Patient",
                content:
                  "My heart medications arrive on time every month. The automatic refill service is a lifesaver for managing my treatment schedule.",
                rating: 5,
                avatar: "👩‍⚕️",
                verified: true,
              },
              {
                name: "James Wilson",
                condition: "Senior Patient",
                content:
                  "Excellent service for seniors. The large-print labels and easy-to-open containers make taking my medications much simpler.",
                rating: 5,
                avatar: "👨‍🦳",
                verified: true,
              },
              {
                name: "Lisa Thompson",
                condition: "Cancer Survivor",
                content:
                  "During my treatment, they ensured I never ran out of critical medications. The pharmacist consultations were incredibly helpful.",
                rating: 5,
                avatar: "👩‍🔬",
                verified: true,
              },
              {
                name: "Robert Davis",
                condition: "Chronic Pain Patient",
                content:
                  "Reliable service for my pain management medications. The secure delivery and prescription tracking give me peace of mind.",
                rating: 5,
                avatar: "👨‍💼",
                verified: true,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  {testimonial.verified && (
                    <div
                      className={`flex items-center text-xs ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                <p
                  className={`mb-6 leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div
                      className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {testimonial.condition}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        className={`px-4 py-20 sm:px-6 lg:px-8 ${
          darkMode
            ? "bg-gradient-to-r from-green-600 to-green-700"
            : "bg-[#1DA678]"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Why Choose Our Pharmacy
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Your health and safety are our top priorities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "FDA Approved",
                description:
                  "All medications sourced from licensed manufacturers with FDA approval",
                stat: "100%",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description:
                  "Fast delivery options with temperature-controlled shipping",
                stat: "Delivery",
              },
              {
                icon: Heart,
                title: "Patient Satisfaction",
                description:
                  "Consistently high ratings from patients who trust us with their medications",
                stat: "98.5%",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-14 h-14 text-white" />
                </div>
                <div className="text-4xl font-bold text-white">
                  {feature.stat}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="leading-relaxed w-80 mx-auto text-blue-100 text-md">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
