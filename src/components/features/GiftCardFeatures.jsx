import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const featuresData = [
  {
    title: "Create Gift Cards In Bulk",
    description:
      "Need thousands of gift cards? Create 1000 gift cards at once with 99minds.",
    image: "/assets/giftcard/bulk-giftcard1.webp",
  },
  {
    title: "Seamless Migration and Import",
    description:
      "We help you migrate from any existing gift card software to <br /> 99minds and even import existing gift card balances.",
    image: "/assets/giftcard/import-migration1.webp",
  },
  {
    title: "Multiple Currency Support",
    description:
      "Get support for 100+ currencies, including USD, CAD, EUR, GBP, KRW, JPY, CNY and more.",
    image: "/assets/giftcard/multi-currency1.webp",
  },
  {
    title: "Multi-store",
    description:
      "Gift card can be used at multiple stores and provide valuable customer spending insights through analytics.",
    image: "/assets/giftcard/multi-store1.webp",
  },
  {
    title: "Manage Returns with Gift Cards",
    description:
      "Issue gift cards on merchandise returns or update the balance in an existing gift card.",
    image: "/assets/giftcard/refund-giftcard.png",
  },
  {
    title: "Gift Cards Delivery For Special Occasions",
    description:
      "Schedule gift card delivery on special occasions like birthdays, anniversaries, Christmas, Hanukkah or any other.",
    image: "/assets/giftcard/schedule-delivery1.webp",
  },
];

export default function GiftCardFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev === featuresData.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleTabClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index); // collapse if same
    startTimer();
  };

  return (
    <section className="flex justify-center bg-white border-y border-white/5 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-16 max-w-7xl py-[72px] w-full">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-medium text-2xl lg:text-3xl text-gray-900">
            The Ultimate Gift Card Software
          </h2>
          <p className="mt-4 text-gray-600">
            The devil is in the details. Create gift card programs that consider
            all the nitty-gritty of your business.
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col-reverse md:flex-row items-start gap-14 mt-12 md:mt-20">
          {/* Left: Accordion Tabs */}
          <div className="flex-1 border-l border-gray-200 relative">
            {featuresData.map((feature, index) => (
              <div key={feature.title} className="mb-2">
                <button
                  onClick={() => handleTabClick(index)}
                  className={`relative w-full text-left py-2 px-3 transition-all duration-300 rounded-md flex items-center justify-between ${
                    activeIndex === index
                      ? "bg-gray-50 border-l-4 border-[#6820EE] text-[#6820EE]"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <h3 className="font-normal">{feature.title}</h3>
                  <span
                    className={`ml-2 transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                    </svg>
                  </span>
                </button>

                {/* Dropdown Description */}
                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      key={`desc-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 mt-2 pr-28 text-base text-[#475467] overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: feature.description,
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right: Image */}
          <div className="flex-1 w-full md:w-1/2 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={`img-${activeIndex}`}
                src={
                  activeIndex >= 0
                    ? featuresData[activeIndex].image
                    : featuresData[0].image
                }
                alt={
                  activeIndex >= 0
                    ? featuresData[activeIndex].title
                    : featuresData[0].title
                }
                className="rounded-2xl w-auto lg:h-[450px] object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                loading="lazy"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
