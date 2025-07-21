import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TabbedImages = () => {
  const [activeTab, setActiveTab] = useState("ui");

  const tabs = [
    {
      id: "ui",
      label: "Wallet",
      img: "/assets/wallet/Wallet-banner.png",
      alt: "gift card ui",
    },
    {
      id: "api",
      label: "Push Notification",
      img: "/assets/wallet/Push Notification.png",
      alt: "gift card api",
    },
  ];

  const intervalRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeTab]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabs.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <section className="relative w-full">
      <div className="relative w-full max-w-7xl px-4 sm:px-6 md:px-8 mx-auto space-y-6">
        <div
          className="flex flex-col-reverse md:flex-col items-center md:items-stretch space-y-6 md:space-y-4 md:space-y-reverse"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          {/* Tabs */}
          <div className="flex justify-center md:justify-end gap-2 py-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full border border-gray-300 text-sm font-medium transition whitespace-nowrap ${
                  activeTab === tab.id ? "bg-gray-700 text-white shadow-md" : ""
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Image Slider with Zoom-in Animation */}
          <div className="w-full flex justify-center relative min-h-[120px]">
            <AnimatePresence>
              {tabs.map((tab) =>
                activeTab === tab.id ? (
                 <motion.img
  key={tab?.img}
  src={tab?.img}
  alt={tab?.alt}
  initial={{ opacity: 0, scale: 0.9, rotate: 2, x: 60 }}
  animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
  exit={{ opacity: 0, scale: 0.95, rotate: -2, x: -60 }}
  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
  className="absolute rounded-2xl shadow-md w-full max-w-[900px] h-auto"
/>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabbedImages;
