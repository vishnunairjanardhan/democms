import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TabbedImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);


  const tabs = [
    
    {
      id: "api",
      label: "Wallet",
      img: "/assets/wallet/wallet_banner.webp",
      alt: "gift card api",
    },
    {
      id: "ui",
      label: "Push Notification",
      img: "/assets/wallet/push_notification.webp",
      alt: "gift card ui",
    },
  ];

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    }, 3000);
  };

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const activeTab = tabs[activeIndex];

  return (
    <section className="relative">
      <div className="relative max-w-7xl px-8 md:px-12 lg:px-16 mx-auto py-10 lg:py-4">
        <div className="flex flex-col-reverse md:flex-col items-center md:items-stretch space-y-6 md:space-y-4 md:space-y-reverse">
          {/* Tabs */}
          <div className="flex justify-center gap-4 lg:mb-3 lg:py-8 py-6">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveIndex(index);
                  resetAutoSlide();
                }}
                className={`px-4 py-2 rounded-full border border-gray-300 text-sm font-medium transition whitespace-nowrap ${
                  activeIndex === index ? "bg-gray-700 text-white" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image Slider with Smooth Animation */}
          <div className="relative flex justify-center w-full min-h-[200px] md:min-h-[400px]">
            <div className="relative w-full max-w-[900px] lg:h-[518px] overflow-hidden rounded-2xl ">
              <AnimatePresence mode="sync">
                {tabs.map(
                  (tab, index) =>
                    index === activeIndex && (
                      <motion.img
                        key={tab.id}
                        src={tab.img}
                        alt={tab.alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabbedImages;
