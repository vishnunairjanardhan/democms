import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TabbedImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const scrollContainerRef = useRef(null);
  const tabsRef = useRef([]);

  const tabs = [
    { id: "gift-card", label: "Gift Card", img: "/assets/wallet/gift_card.webp", alt: "Gift Card" },
    { id: "store-credit", label: "Cashback & Store Credit", img: "/assets/wallet/cashback.webp", alt: "Cashback & Store Credit" },
    { id: "loyalty-reward", label: "Loyalty & Referrals", img: "/assets/wallet/loyalty.webp", alt: "Loyalty & Rewards" },
    { id: "automation", label: "Automation", img: "/assets/wallet/automation.webp", alt: "Automation Workflow" },
    { id: "wallet", label: "Wallet", img: "/assets/wallet/wallet.webp", alt: "Wallet Passes" },
    { id: "membership", label: "Memberships", img: "/assets/wallet/membership.webp", alt: "Membership Programs" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    }, 3500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible]);

  useEffect(() => {
  const activeTab = tabsRef.current[activeIndex];
  if (activeTab && scrollContainerRef.current) {
    activeTab.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center', // This centers the tab in the viewport
    });
  }
}, [activeIndex]);

  return (
    <section ref={containerRef} className="relative">
      <div className="relative max-w-7xl px-8 md:px-0 mx-auto lg:py-5 py-2">
        <div className="flex flex-col md:flex-col items-center">
          {/* Desktop Tabs */}
          <div 
              ref={scrollContainerRef}
              className="flex items-center justify-start lg:justify-center w-full gap-2 lg:gap-4 lg:py-8 py-4 overflow-x-auto scrollbar-hide"
            >
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(el) => (tabsRef.current[index] = el)} // Assign each button to the ref array
                  onClick={() => setActiveIndex(index)}
                  className={`lg:px-4 px-3 lg:py-2 py-1 lg:w-[250px] rounded-full border lg:text-sm text-[10px] font-medium transition whitespace-nowrap ${
                    activeIndex === index 
                      ? "bg-[#E6DEFF] border-[#6F4DFF] text-black" 
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          {/* Image */}
          <div className="sm:order-last relative w-full max-w-[1313px] lg:h-[523px] md:h-[270px] h-[150px] mx-auto aspect-[16/9] overflow-hidden lg:rounded-2xl rounded-md md:mt-6">
            {isMobile ? (
              <img
                src={tabs[activeIndex].img}
                alt={tabs[activeIndex].alt}
                fetchpriority="low"
                loading="lazy"
                decoding="async"
                width="1313"
                height="525"
                className="absolute inset-0 w-full h-[150px] lg:h-auto object-cover"
              />
            ) : (
              <AnimatePresence mode="sync">
                <motion.img
                  key={tabs[activeIndex].id}
                  src={tabs[activeIndex].img}
                  alt={tabs[activeIndex].alt}
                  loading="lazy"
                  decoding="async"
                  width="1313"
                  height="513"
                  className="absolute inset-0 w-full h-auto object-cover lg:rounded-2xl"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabbedImages;
