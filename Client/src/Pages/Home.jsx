import React, { useState } from "react";
import {
  Heart,
  Shield,
  Clock,
  Users,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Pill,
  Stethoscope,
  Thermometer,
  Syringe,
  Bandage,
  Eye,
  Moon,
  Sun,
} from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark bg-gray-900"
          : "bg-gradient-to-br from-green-50 via-white to-emerald-50"
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
            darkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Hero Section */}
      <section
        className={`relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${
          darkMode ? "dark:bg-gray-900" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    darkMode
                      ? "bg-green-900 text-green-200"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Trusted Healthcare Since 1985
                </div>
                <h1
                  className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Your Health,{" "}
                  <span
                    className={`text-transparent bg-clip-text ${
                      darkMode
                        ? "bg-gradient-to-r from-green-400 to-emerald-400"
                        : "bg-gradient-to-r from-green-600 to-emerald-600"
                    }`}
                  >
                    Our Priority
                  </span>
                </h1>
                <p
                  className={`text-xl leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Experience world-class medical care with our comprehensive
                  range of healthcare products, expert physicians, and
                  state-of-the-art facilities designed for your unique needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={`px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center ${
                    darkMode
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                  }`}
                >
                  Browse Products
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
                <button
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    darkMode
                      ? "border-2 border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400"
                      : "border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600"
                  }`}
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div
                className={`grid grid-cols-3 gap-8 pt-8 border-t ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    50K+
                  </div>
                  <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    Patients Served
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    95%
                  </div>
                  <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    Success Rate
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    24/7
                  </div>
                  <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    Care Available
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div
                className={`rounded-3xl p-8 shadow-2xl ${
                  darkMode
                    ? "bg-gradient-to-br from-green-700 to-emerald-800"
                    : "bg-gradient-to-br from-green-400 to-emerald-500"
                }`}
              >
                <div
                  className={`rounded-2xl p-8 h-96 flex items-center justify-center ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="text-center space-y-4">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                        darkMode
                          ? "bg-gradient-to-br from-green-800 to-emerald-900"
                          : "bg-gradient-to-br from-green-100 to-emerald-100"
                      }`}
                    >
                      <Heart
                        className={`w-10 h-10 ${
                          darkMode ? "text-green-400" : "text-green-600"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-2xl font-bold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Expert Medical Care
                    </h3>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                      Compassionate healthcare professionals dedicated to your
                      wellbeing
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div
                className={`absolute -top-4 -left-4 p-4 rounded-xl shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Online 24/7
                  </span>
                </div>
              </div>

              <div
                className={`absolute -bottom-4 -right-4 p-4 rounded-xl shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    4.9/5 Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        className={`px-4 py-16 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Product Categories
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Explore our comprehensive range of medical products and healthcare
              solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Pill,
                title: "Medications",
                description: "Prescription and over-the-counter medicines",
                count: "500+ Products",
              },
              {
                icon: Stethoscope,
                title: "Medical Devices",
                description: "Professional diagnostic and monitoring equipment",
                count: "200+ Items",
              },
              {
                icon: Bandage,
                title: "First Aid",
                description:
                  "Essential supplies for wound care and emergency treatment",
                count: "150+ Supplies",
              },
              {
                icon: Eye,
                title: "Vision Care",
                description: "Eye care products and optical solutions",
                count: "100+ Options",
              },
            ].map((category, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl hover:shadow-xl transition-all duration-300 border cursor-pointer ${
                  darkMode
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 hover:border-green-500"
                    : "bg-gradient-to-br from-gray-50 to-white border-gray-100 hover:border-green-200"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    darkMode
                      ? "bg-gradient-to-r from-green-600 to-emerald-700"
                      : "bg-gradient-to-r from-green-500 to-emerald-500"
                  }`}
                >
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {category.title}
                </h3>
                <p
                  className={`leading-relaxed mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {category.description}
                </p>
                <div
                  className={`text-sm font-medium ${
                    darkMode ? "text-green-400" : "text-green-600"
                  }`}
                >
                  {category.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section
        className={`px-4 py-16 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-900" : "bg-green-50"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Featured Products
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Top-quality medical products trusted by healthcare professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Digital Thermometer Pro",
                price: "$29.99",
                rating: 4.8,
                image: "🌡️",
                description:
                  "Fast, accurate temperature readings with memory function",
              },
              {
                name: "Blood Pressure Monitor",
                price: "$89.99",
                rating: 4.9,
                image: "🩺",
                description:
                  "Professional-grade BP monitor with smartphone connectivity",
              },
              {
                name: "First Aid Kit Premium",
                price: "$45.99",
                rating: 4.7,
                image: "🏥",
                description:
                  "Comprehensive emergency kit for home and office use",
              },
              {
                name: "Pulse Oximeter",
                price: "$39.99",
                rating: 4.8,
                image: "📊",
                description:
                  "Accurate oxygen saturation and pulse rate monitoring",
              },
              {
                name: "Smart Glucometer",
                price: "$69.99",
                rating: 4.9,
                image: "💉",
                description:
                  "Bluetooth-enabled glucose meter with app integration",
              },
              {
                name: "N95 Respirator Masks",
                price: "$24.99",
                rating: 4.6,
                image: "😷",
                description: "Medical-grade protection masks (Pack of 20)",
              },
            ].map((product, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-100"
                }`}
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">{product.image}</div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`text-sm mb-3 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {product.description}
                  </p>
                  <div className="flex items-center justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
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
                      ({product.rating})
                    </span>
                  </div>
                  <div
                    className={`text-2xl font-bold mb-4 ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {product.price}
                  </div>
                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      darkMode
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className={`px-4 py-16 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2
              className={`text-4xl font-bold ${
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
              Real experiences from people who trust us with their healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Patient",
                content:
                  "The quality of products and service is exceptional. I've been ordering my medical supplies here for over 2 years and never been disappointed.",
                rating: 5,
                avatar: "👩‍💼",
              },
              {
                name: "Dr. Michael Chen",
                role: "Family Physician",
                content:
                  "As a healthcare provider, I recommend this platform to my patients. Their products are reliable, and delivery is always on time.",
                rating: 5,
                avatar: "👨‍⚕️",
              },
              {
                name: "Emily Rodriguez",
                role: "Nurse",
                content:
                  "Great selection of medical equipment at competitive prices. The customer support team is knowledgeable and very helpful.",
                rating: 5,
                avatar: "👩‍⚕️",
              },
              {
                name: "James Wilson",
                role: "Patient",
                content:
                  "Fast shipping and excellent packaging. My glucose monitoring supplies arrive fresh and well-protected every month.",
                rating: 5,
                avatar: "👨‍💼",
              },
              {
                name: "Lisa Thompson",
                role: "Pharmacy Manager",
                content:
                  "Professional service and authentic products. We've established a great partnership for our clinic's supply needs.",
                rating: 5,
                avatar: "👩‍🔬",
              },
              {
                name: "Robert Davis",
                role: "Patient",
                content:
                  "The mobile app makes reordering so convenient. Product information is detailed and helps me make informed choices.",
                rating: 5,
                avatar: "👨‍🦳",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
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
                      {testimonial.role}
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
        className={`px-4 py-16 sm:px-6 lg:px-8 ${
          darkMode
            ? "bg-gradient-to-r from-green-800 to-emerald-900"
            : "bg-gradient-to-r from-green-600 to-emerald-600"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-white">Why Choose Us</h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                darkMode ? "text-green-100" : "text-green-100"
              }`}
            >
              Experience the difference that quality healthcare makes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Quality Products",
                description:
                  "FDA-approved and certified medical products from trusted manufacturers",
                stat: "100%",
              },
              {
                title: "Fast Delivery",
                description:
                  "Quick and secure shipping with real-time tracking",
                stat: "24-48h",
              },
              {
                title: "Customer Satisfaction",
                description:
                  "Consistently high ratings from our valued customers",
                stat: "98%",
              },
              {
                title: "Years of Service",
                description:
                  "Decades of trusted healthcare solutions in our community",
                stat: "35+",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="text-4xl font-bold text-white">
                  {feature.stat}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    darkMode ? "text-green-100" : "text-green-100"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className={`px-4 py-16 sm:px-6 lg:px-8 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div
            className={`rounded-3xl shadow-xl overflow-hidden ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="grid lg:grid-cols-2">
              {/* Left Side */}
              <div className="p-8 lg:p-12 space-y-8">
                <div>
                  <h2
                    className={`text-3xl font-bold mb-4 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Need Help with Your Order?
                  </h2>
                  <p
                    className={`text-lg ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Our healthcare specialists are here to help you find the
                    right products and answer any questions about your medical
                    needs.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone
                      className={darkMode ? "text-green-400" : "text-green-600"}
                      size={20}
                    />
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail
                      className={darkMode ? "text-green-400" : "text-green-600"}
                      size={20}
                    />
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      support@medicalstore.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin
                      className={darkMode ? "text-green-400" : "text-green-600"}
                      size={20}
                    />
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-700"}
                    >
                      123 Healthcare Plaza, Medical District
                    </span>
                  </div>
                </div>

                <button
                  className={`px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center ${
                    darkMode
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                  }`}
                >
                  Contact Support
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>

              {/* Right Side */}
              <div
                className={`p-8 lg:p-12 flex items-center justify-center ${
                  darkMode
                    ? "bg-gradient-to-br from-green-800 to-emerald-900"
                    : "bg-gradient-to-br from-green-500 to-emerald-600"
                }`}
              >
                <div className="text-center text-white space-y-6">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Secure & Reliable</h3>
                  <p
                    className={`${
                      darkMode ? "text-green-100" : "text-green-100"
                    }`}
                  >
                    Your health information is protected with enterprise-grade
                    security and HIPAA compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
