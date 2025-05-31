import React, { useState } from "react";
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

function Footer() {
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
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-600",
    },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "hover:text-blue-700",
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-green-100 dark:border-gray-700 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-md">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  MediCare
                </span>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Health Solutions
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
              Your trusted partner in healthcare solutions. We provide
              high-quality medical products and services to healthcare
              professionals and patients worldwide.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                <Phone className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span>info@medicare.com</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
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
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-sm font-semibold text-red-800 dark:text-red-300">
                  Medical Emergency
                </span>
              </div>
              <p className="text-xs text-red-700 dark:text-red-300">
                Call 911 or your local emergency number immediately
              </p>
            </div>
          </div>

          {/* Quick Links & Product Categories */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Product Categories
            </h3>
            <ul className="space-y-3">
              {productCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <li key={category.name}>
                    <a
                      href={category.href}
                      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 group"
                    >
                      <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span className="group-hover:underline">
                        {category.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Customer Support
            </h3>
            <ul className="space-y-3 mb-8">
              {customerSupport.map((support) => {
                const IconComponent = support.icon;
                return (
                  <li key={support.name}>
                    <a
                      href={support.href}
                      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 group"
                    >
                      <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span className="group-hover:underline">
                        {support.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Customer Service Hours */}
            <div className="bg-green-50 dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Support Hours
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <div>Mon-Fri: 8:00 AM - 8:00 PM EST</div>
                <div>Sat-Sun: 9:00 AM - 5:00 PM EST</div>
                <div className="text-green-600 dark:text-green-400 font-medium">
                  24/7 Emergency Support Available
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Stay Connected
            </h3>

            {/* Newsletter Signup */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Subscribe to receive medical tips, product updates, and health
                news.
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleNewsletterSubmit(e);
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleNewsletterSubmit}
                  disabled={isSubscribed}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed"
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
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 ${social.color} transition-all duration-200 hover:scale-110 hover:shadow-md`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Medical Certifications */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>FDA Approved Products</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                <Stethoscope className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Licensed Healthcare Provider</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="border-t border-green-100 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              © {currentYear} MediCare Health Solutions. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 hover:underline"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 hover:underline"
              >
                HIPAA Notice
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 hover:underline"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
