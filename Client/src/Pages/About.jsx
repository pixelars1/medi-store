import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Testimonials from "../Components/Testimonials";

const whyUsData = [
  {
    img: "https://cdn-icons-png.flaticon.com/512/3209/3209033.png",
    title: "Certified Medications",
    desc: "All our products are 100% authentic, sourced from licensed manufacturers and thoroughly vetted by professionals.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    title: "24/7 Support",
    desc: "Whether it's late-night queries or dosage doubts, our support team is here to assist you anytime, anywhere.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048941.png",
    title: "Fast & Discreet Shipping",
    desc: "We ensure quick delivery in discreet packaging to protect your privacy and save your time.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png",
    title: "Affordable Pricing",
    desc: "Get premium medications at competitive prices with regular discounts and loyalty rewards.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/2630/2630646.png",
    title: "Wide Product Range",
    desc: "From anxiety to weight loss, our extensive product catalog covers all essential health categories.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/609/609803.png",
    title: "Easy Online Ordering",
    desc: "A user-friendly interface ensures a smooth and hassle-free ordering process from start to finish.",
  },
];

const AboutPage = () => {
  const faqs = [
    {
      question: "How long does shipping take?",
      answers: [
        "Standard shipping takes 3-7 business days.",
        "Expedited shipping options are available at checkout.",
        "Shipping times may vary based on location and product availability.",
      ],
    },
    {
      question: "Is my personal information secure?",
      answers: [
        "Yes, we use industry-grade SSL encryption.",
        "We never share or sell customer data.",
        "Your payment details are processed via trusted gateways.",
      ],
    },
    {
      question: "What is your return policy?",
      answers: [
        "Returns are accepted within 14 days of delivery.",
        "Items must be unused and in original packaging.",
        "Refunds are processed within 5-7 working days.",
      ],
    },
    {
      question: "Do I need a prescription for all products?",
      answers: [
        "Some medications do require a valid prescription.",
        "Over-the-counter products are available without prescriptions.",
        "You will be notified at checkout if a prescription is needed.",
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const cardsRef = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              if (!prev.includes(index)) return [...prev, index];
              return prev;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    cardsRef.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      cardsRef.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);
  return (
    <div className="font-sans">
      {/* Section 1 - About Us Styled Like LegitMedications */}
      <section className="relative py-20 px-6 md:px-12 bg-gradient-to-r from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
        {/* Heading  */}
        {/* <h1 className="text-[2rem] font-bold text-white py-4 text-center">About Us</h1> */}
        <div className="max-w-7xl pt-10 mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 text-gray-800 dark:text-gray-100">
            <h2 className="text-5xl font-extrabold leading-tight">
              Empowering Better Health
            </h2>
            <p className="text-lg">
              At <strong>MediCare</strong>, we’re driven by one mission — making
              healthcare accessible, affordable, and authentic. Whether it's for
              chronic pain, mental wellness, or vitality, we offer only
              medically certified, lab-tested solutions.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="p-2 bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                  🧪
                </span>
                <span>
                  Advanced research-backed formulations tailored to modern
                  lifestyles.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-2 bg-green-600 dark:bg-green-500 text-white rounded-full">
                  🚚
                </span>
                <span>
                  Rapid and discreet delivery across all serviceable regions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-2 bg-purple-600 dark:bg-purple-500 text-white rounded-full">
                  🛡️
                </span>
                <span>
                  Strict compliance with international pharmaceutical quality
                  standards.
                </span>
              </li>
            </ul>
            <a
              href="/shop"
              className="inline-block mt-6 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              Explore Our Products
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://plus.unsplash.com/premium_photo-1672759455907-bdaef741cd88?q=80&w=2016&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Pharmacy Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Why Us */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base">
            At MediCare, we understand the value of trust, quality, and care in
            healthcare. That’s why we offer more than just medicines — we
            deliver peace of mind. From verified products to expert support,
            every part of your experience is built around your well-being.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {whyUsData.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              data-index={idx}
              className={`transform transition-all duration-700 ease-out
              ${
                visibleCards.includes(idx)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }
              bg-white/70 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl group`}
            >
              <div className="flex justify-center mb-5">
                <div className="p-4 bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-white rounded-full text-3xl transition-transform group-hover:scale-110">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {item.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 - Customer Reviews */}
      <Testimonials />

      {/* Section 5 - FAQ */}
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4">
        <div className="text-center md:text-left mb-8">
          <h2 className="text-4xl font-bold text-indigo-800 dark:text-indigo-300 mb-3 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Clear answers to your most common queries
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* FAQ Section */}

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center px-6 py-5 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-left"
                >
                  <span className="text-lg font-medium text-gray-800 dark:text-white">
                    {faq.question}
                  </span>
                  {activeIndex === i ? (
                    <ChevronUp className="w-5 h-5 text-indigo-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-indigo-500" />
                  )}
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                    activeIndex === i ? "max-h-96 py-4" : "max-h-0"
                  }`}
                >
                  <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-600 dark:text-gray-300">
                    {faq.answers.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Illustration */}
          <div className="flex justify-center items-center">
            <img
              src="https://img.freepik.com/premium-vector/faq-icon-line-art-logo-set_1223784-17794.jpg"
              alt="FAQ illustration"
              className="w-full max-w-sm object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
