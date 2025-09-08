import React, { useState, useContext } from "react";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Shield,
  Award,
  Clock,
  Send,
  Stethoscope,
  Pill,
  Activity,
  Eye,
  Cross,
  HelpCircle,
  Truck,
  RotateCcw,
  Users,
} from "lucide-react";
import { AppContext } from "@/Context/AppContext";

function Footer() {
  const { darkMode } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Products", href: "#" },
    { name: "Categories", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  const productCategories = [
    { name: "Medications", icon: Pill, href: "#" },
    { name: "Medical Devices", icon: Stethoscope, href: "#" },
    { name: "First Aid", icon: Cross, href: "#" },
    { name: "Vision Care", icon: Eye, href: "#" },
  ];

  const customerSupport = [
    { name: "Help Center", icon: HelpCircle, href: "#" },
    { name: "Shipping Info", icon: Truck, href: "#" },
    { name: "Returns & Exchanges", icon: RotateCcw, href: "#" },
    { name: "Customer Reviews", icon: Users, href: "#" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", colorClass: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", colorClass: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, href: "#", colorClass: "hover:text-pink-600" },
    { name: "LinkedIn", icon: Linkedin, href: "#", colorClass: "hover:text-blue-700" },
  ];

  // Helper small class builders to keep things tidy
  const headingClass = `text-lg font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`;
  // const smallTextClass = `${darkMode ? "text-gray-300" : "text-gray-800"} text-sm`;
  const iconGreenClass = `${darkMode ? "text-green-400" : "text-green-600"}`;

  return (
    <footer
      className={`transition-colors duration-300 border-t ${
        darkMode ? "bg-gray-900 text-gray-100 border-gray-700" : "bg-white text-gray-800 border-green-100"
      }`}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg shadow-md" style={{
                background: darkMode ? "linear-gradient(135deg,#059669,#10b981)" : undefined
              }}>
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>MediCare</span>
                <span className={`text-sm ${darkMode ? "text-green-400" : "text-green-600"} font-medium`}>Health Solutions</span>
              </div>
            </div>

            <p className={`${darkMode ? "text-gray-300" : "text-gray-800"} text-sm mb-6 leading-relaxed`}>
              Your trusted partner in healthcare solutions. We provide high-quality medical products and services to
              healthcare professionals and patients worldwide.
            </p>

            <div className="space-y-3 text-sm">
              <div className={`flex items-center space-x-3 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                <Phone className={`w-4 h-4 ${iconGreenClass} flex-shrink-0`} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={`flex items-center space-x-3 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                <Mail className={`w-4 h-4 ${iconGreenClass} flex-shrink-0`} />
                <span>info@medicare.com</span>
              </div>
              <div className={`flex items-start space-x-3 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                <MapPin className={`w-4 h-4 ${iconGreenClass} flex-shrink-0 mt-0.5`} />
                <span>
                  123 Medical Plaza
                  <br />
                  Healthcare District
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>

            {/* Emergency Contact */}
            <div
              className={`mt-6 p-4 rounded-lg border ${
                darkMode ? "bg-red-900/20 border-red-800" : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Activity className={`w-4 h-4 ${darkMode ? "text-red-400" : "text-red-600"}`} />
                <span className={`${darkMode ? "text-red-300" : "text-red-800"} text-sm font-semibold`}>
                  Medical Emergency
                </span>
              </div>
              <p className={`${darkMode ? "text-red-300" : "text-red-700"} text-xs`}>
                Call 911 or your local emergency number immediately
              </p>
            </div>
          </div>

          {/* Quick Links & Product Categories */}
          <div>
            <h3 className={headingClass}>Quick Links</h3>
            <ul className="space-y-3 mb-8 mt-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`${darkMode ? "text-gray-300" : "text-gray-800"} text-sm transition-colors duration-200 hover:underline ${
                      darkMode ? "hover:text-green-400" : "hover:text-green-600"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className={headingClass}>Product Categories</h3>
            <ul className="space-y-3 mt-3">
              {productCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <li key={category.name}>
                    <a
                      href={category.href}
                      className={`flex items-center space-x-2 text-sm transition-colors duration-200 group ${
                        darkMode ? "text-gray-300" : "text-gray-800"
                      } ${darkMode ? "hover:text-green-400" : "hover:text-green-600"}`}
                    >
                      <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span className="group-hover:underline">{category.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className={headingClass}>Customer Support</h3>
            <ul className="space-y-3 mb-8 mt-3">
              {customerSupport.map((support) => {
                const IconComponent = support.icon;
                return (
                  <li key={support.name}>
                    <a
                      href={support.href}
                      className={`flex items-center space-x-2 text-sm transition-colors duration-200 group ${
                        darkMode ? "text-gray-300" : "text-gray-800"
                      } ${darkMode ? "hover:text-green-400" : "hover:text-green-600"}`}
                    >
                      <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span className="group-hover:underline">{support.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Support Hours */}
            <div
              className={`p-4 rounded-lg border ${
                darkMode ? "bg-gray-800 border-gray-600" : "bg-green-50 border-green-200"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Clock className={`w-4 h-4 ${iconGreenClass}`} />
                <span className={`text-sm font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                  Support Hours
                </span>
              </div>
              <div className={`${darkMode ? "text-gray-300" : "text-gray-800"} text-xs space-y-1`}>
                <div>Mon-Fri: 8:00 AM - 8:00 PM EST</div>
                <div>Sat-Sun: 9:00 AM - 5:00 PM EST</div>
                <div className={`${darkMode ? "text-green-400" : "text-green-600"} font-medium`}>
                  24/7 Emergency Support Available
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className={headingClass}>Stay Connected</h3>

            {/* Newsletter Signup */}
            <div className="mb-8 mt-3">
              <p className={`${darkMode ? "text-gray-300" : "text-gray-800"} text-sm mb-4`}>
                Subscribe to receive medical tips, product updates, and health news.
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                      darkMode
                        ? "bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-green-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-500"
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleNewsletterSubmit(e);
                    }}
                  />
                </div>
                <button
                  onClick={handleNewsletterSubmit}
                  disabled={isSubscribed}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-white text-sm font-medium transition-all duration-200 ${
                    isSubscribed ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 shadow-md"
                  }`}
                >
                  {isSubscribed ? (
                    <>
                      <Award className="w-4 h-4" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-8">
              <h4 className={`text-sm font-semibold mb-4 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md ${
                        darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
                      } ${social.colorClass}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3 text-xs">
              <div className={`flex items-center space-x-2 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                <Shield className={`w-4 h-4 ${iconGreenClass}`} />
                <span>FDA Approved Products</span>
              </div>
              <div className={`flex items-center space-x-2 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                <Award className={`w-4 h-4 ${iconGreenClass}`} />
                <span>HIPAA Compliant</span>
              </div>
              <div className={`flex items-center space-x-2 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                <Stethoscope className={`w-4 h-4 ${iconGreenClass}`} />
                <span>Licensed Healthcare Provider</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={`py-6 border-t ${darkMode ? "border-gray-700 bg-gray-900" : "border-green-100 bg-white"}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 space-y-4 md:space-y-0">
          <div className={`${darkMode ? "text-gray-300" : "text-gray-800"} text-sm`}>
            © {currentYear} MediCare Health Solutions. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            <a
              href="#"
              className={`${darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-800 hover:text-green-600"} hover:underline`}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className={`${darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-800 hover:text-green-600"} hover:underline`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`${darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-800 hover:text-green-600"} hover:underline`}
            >
              HIPAA Notice
            </a>
            <a
              href="#"
              className={`${darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-800 hover:text-green-600"} hover:underline`}
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
