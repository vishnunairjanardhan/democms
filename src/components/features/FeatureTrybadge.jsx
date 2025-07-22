import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TabbedImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const tabs = [
    {
      id: "ui",
      label: "Wallet",
      img: "/assets/wallet/wallet_banner.webp",
      alt: "gift card ui",
    },
    {
      id: "api",
      label: "Push Notification",
      img: "/assets/wallet/Push Notification.png",
      alt: "gift card api",
    },
  ];

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    }, 3000); // 3 seconds
  };

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current); // Cleanup
  }, []);

  const activeTab = tabs[activeIndex];

  return (
    <section className="relative">
      <div className="relative max-w-7xl px-8 md:px-12 lg:px-16 mx-auto py-10 lg:py-4">
        <div className="flex flex-col-reverse md:flex-col items-center md:items-stretch space-y-6 md:space-y-4 md:space-y-reverse">
          {/* Tabs */}
          <div className="flex justify-center md:justify-end gap-2 lg:mb-3 lg:py-0 py-6 lg:mr-32">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveIndex(index);
                  resetAutoSlide(); // Manual click resets timer
                }}
                className={`px-4 py-2 rounded-full border border-gray-300 text-sm font-medium transition whitespace-nowrap ${
                  activeIndex === index ? "bg-gray-700 text-white" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Animated Image Section */}
          <div className="relative flex justify-center overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab.id}
                src={activeTab.img}
                alt={activeTab.alt}
                width="900"
                loading="lazy"
                className="rounded-2xl shadow-vulcan-950/50"
                initial={{ opacity: 0, scale: 0.9, rotate: 2, x: 60 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: -2, x: -60 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabbedImages;
