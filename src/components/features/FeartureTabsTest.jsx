import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TabbedImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  // Tabs: label + dark/white logos
  const tabs = [
    {
      id: "mud-aus",
      label: "Mud Australia",
      logoDark: "/assets/icons/mud-aus-dark.svg",
      logoLight: "/assets/icons/mud-aus-white.svg",
      gradient: "bg-gradient-to-r from-pink-500 to-orange-500", // tab button (active)
      sectionGradient: "bg-gradient-to-br from-pink-50 via-rose-100 to-orange-100" // FULL SECTION
    },
    {
      id: "solstice",
      label: "Solstice",
      logoDark: "/assets/icons/solstice-dark.svg",
      logoLight: "/assets/icons/solstice-white.svg",
      gradient: "bg-gradient-to-r from-purple-500 to-indigo-500",
      sectionGradient: "bg-gradient-to-br from-violet-50 via-indigo-100 to-blue-100"
    },
    {
      id: "natori",
      label: "Natori",
      logoDark: "/assets/icons/natori-dark.svg",
      logoLight: "/assets/icons/natori-white.svg",
      gradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
      sectionGradient: "bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-100"
    },
    {
      id: "bestop",
      label: "Bestop",
      logoDark: "/assets/icons/bestop-dark.svg",
      logoLight: "/assets/icons/bestop-white.svg",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
      sectionGradient: "bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-100"
    },
    {
      id: "calico",
      label: "Calico",
      logoDark: "/assets/icons/calico-dark.svg",
      logoLight: "/assets/icons/calico-white.svg",
      gradient: "bg-gradient-to-r from-yellow-500 to-orange-400",
      sectionGradient: "bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-100"
    },
    {
      id: "tassels",
      label: "Tassels",
      logoDark: "/assets/icons/tassels-dark.svg",
      logoLight: "/assets/icons/tassels-white.svg",
      gradient: "bg-gradient-to-r from-rose-500 to-pink-500",
      sectionGradient: "bg-gradient-to-br from-rose-50 via-pink-100 to-fuchsia-100"
    },
  ];
  
  

  // Slides content (1:1 with tabs)
  const slides = [
    // 1) Mud Australia
    (
      <div className="w-full flex flex-col shrink-0 snap-start h-full">
        <figure className="h-full">
          <ul className="h-full">
            <li className="lg:mt-10 p-[0.060rem] snap-start w-full lg:h-[500px] h-auto sm:h-[400px]">
              <div className="lg:py-6 py-4 h-full">
                <div className="lg:flex lg:h-full lg:items-center justify-between gap-0 max-w-7xl mx-auto">
                  <div className="w-full lg:w-[42rem] mb-6 lg:mb-0 lg:px-4 2xl:px-12">
                    <div className="ml-4 h-9">
                      <img className="h-12" alt="Mud Australia" src="/assets/testimonial/MudAustralia-B-logo.svg" />
                    </div>
                    <div className="grid grid-cols-2 w-full mt-10 gap-4">
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl text-[#303030]">
                          <h3 className="font-semibold text-lg md:text-3xl lg:text-3xl">38%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Increase Average Spend Over Gift Card Value</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-lg md:text-3xl lg:text-3xl">Multi-Currency</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">AUS $ USD $ GBP £</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-lg md:text-3xl lg:text-3xl">30%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Increase in Sales due to rise in Gift card Redemption frequency</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-lg md:text-3xl lg:text-3xl">Saved 400hrs</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Manual work</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[570px] lg:mr-10 2xl:mr-16 mt-4 lg:mt-0">
                    <img className="object-cover object-center rounded-3xl w-full h-full" loading="lazy" src="/assets/testimonial/mud-aus-t.webp" alt="Mud Australia testimonial" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </figure>
      </div>
    ),

    // 2) Solstice
    (
      <div className="w-full flex flex-col shrink-0 snap-start h-full">
        <figure className="h-full">
          <ul className="h-full">
            <li className="lg:mt-10 p-[0.060rem] snap-start w-full lg:h-[500px] h-auto sm:h-[400px]">
              <div className="lg:py-5 py-4 h-full">
                <div className="lg:flex lg:h-full lg:items-center justify-between gap-0 max-w-7xl mx-auto">
                  <div className="w-full lg:w-[42rem] mb-6 lg:mb-0 lg:px-4 2xl:px-12">
                    <div className="ml-4">
                      <img className="h-12" alt="Solstice" src="/assets/testimonial/Solistice-logo.svg" />
                    </div>
                    <div className="grid grid-cols-2 w-full mt-10 gap-4">
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">$640K</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">In Sales due to Promotional Gift Cards</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">45 Days</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Summer Promotion</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">28%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Increase in AOV</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">Gift Card</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">As new promotion channel</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[570px] lg:mr-10 2xl:mr-16 mt-4 lg:mt-0">
                    <img className="object-cover object-center rounded-3xl w-full" loading="lazy" src="/assets/testimonial/Solstice-t.webp" alt="Solstice testimonial" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </figure>
      </div>
    ),

    // 3) Natori
    (
      <div className="w-full flex flex-col shrink-0 snap-start h-full">
        <figure className="h-full">
          <ul className="h-full">
            <li className="lg:mt-10 p-[0.060rem] snap-start w-full lg:h-[500px] h-auto sm:h-[400px]">
              <div className="lg:py-6 py-4 h-full">
                <div className="lg:flex lg:h-full lg:items-center justify-between gap-0 max-w-7xl mx-auto">
                  <div className="w-full lg:w-[42rem] mb-6 lg:mb-0 lg:px-4 2xl:px-12">
                    <div className="ml-4 mt-2">
                      <img className="h-6" alt="Natori" src="/assets/testimonial/Natori-logo.svg" />
                    </div>
                    <div className="grid grid-cols-2 w-full mt-10 gap-4">
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">25%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Increase in <br /> Customer LTV</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">Omnichannel</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Online and Instore</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">40%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Higher Spending on Redemption</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">Gift Cards</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">As new marketing channel</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[570px] lg:mr-10 2xl:mr-16 mt-4 lg:mt-0">
                    <img className="object-cover object-center rounded-3xl w-full" loading="lazy" src="/assets/testimonial/Natori-t.webp" alt="Natori testimonial" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </figure>
      </div>
    ),

    // 4) Bestop
    (
      <div className="w-full flex flex-col shrink-0 snap-start h-full">
        <figure className="h-full">
          <ul className="h-full">
            <li className="lg:mt-10 p-[0.060rem] snap-start w-full lg:h-[500px] h-auto sm:h-[400px]">
              <div className="lg:py-6 py-4 h-full">
                <div className="lg:flex lg:h-full lg:items-center justify-between gap-0 max-w-7xl mx-auto">
                  <div className="w-full lg:w-[42rem] mb-6 lg:mb-0 lg:px-4 2xl:px-12">
                    <div className="ml-4 h-9">
                      <img alt="Bestop" src="/assets/testimonial/Bestop-logo.svg" />
                    </div>
                    <div className="grid grid-cols-2 w-full mt-10 gap-4">
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">$1.5M</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">In Sales due to Gift Card Promotion</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">60 Days</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Social Media promotion with Heather Storm</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">20%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Increase in AOV</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">15%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Increase in Conversion Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[570px] lg:mr-10 2xl:mr-16 mt-4 lg:mt-0">
                    <img className="object-cover object-center rounded-3xl w-full" loading="lazy" src="/assets/testimonial/Bestop-T1.webp" alt="Bestop testimonial" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </figure>
      </div>
    ),

    // 5) Calico
    (
      <div className="w-full flex flex-col shrink-0 snap-start h-full">
        <figure className="h-full">
          <ul className="h-full">
            <li className="lg:mt-10 p-[0.060rem] snap-start w-full lg:h-[500px] h-auto sm:h-[400px]">
              <div className="lg:py-5 py-4 h-full">
                <div className="lg:flex lg:h-full lg:items-center justify-between gap-0 max-w-7xl mx-auto">
                  <div className="w-full lg:w-[42rem] mb-6 lg:mb-0 lg:px-4 2xl:px-12">
                    <div className="ml-4">
                      <img className="h-10" alt="Calico" src="/assets/testimonial/calico-logo.svg" />
                    </div>
                    <div className="grid grid-cols-2 w-full mt-10 gap-4">
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">25%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Increase in <br /> Customer LTV</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">30%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Increase in ARR</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">10%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">Increase in AOV</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-2xl">Omnichannel Loyalty & Referral</h3>
                          <p className="text-sm md:text-base lg:text-lg text-[#303030]">New Customer Acquisition & Retention channel</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[570px] lg:mr-10 2xl:mr-16 mt-4 lg:mt-0">
                    <img className="object-cover object-center rounded-3xl w-full" loading="lazy" src="/assets/testimonial/Calico-t.webp" alt="Calico testimonial" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </figure>
      </div>
    ),

    // 6) Tassels
    (
      <div className="w-full flex flex-col shrink-0 snap-start h-full">
        <figure className="h-full">
          <ul className="h-full">
            <li className="lg:mt-10 p-[0.060rem] snap-start w-full lg:h-[500px] h-auto sm:h-[400px]">
              <div className="lg:py-6 py-4 h-full">
                <div className="lg:flex lg:h-full lg:items-center justify-between gap-0 max-w-7xl mx-auto">
                  <div className="w-full lg:w-[42rem] mb-6 lg:mb-0 lg:px-4 2xl:px-12">
                    <div className="ml-4">
                      <img className="h-10" alt="Tassels" src="/assets/testimonial/Tassels-logo.svg" />
                    </div>
                    <div className="grid grid-cols-2 w-full mt-10 gap-2">
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">15%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-black">Increase in <br /> Customer LTV</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">20%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-black">Increase in ARR</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-4xl">15%</h3>
                          <p className="text-sm md:text-base lg:text-lg text-black">Increase in AOV</p>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="p-4 rounded-3xl">
                          <h3 className="font-semibold text-black text-lg md:text-3xl lg:text-2xl">Omnichannel Loyalty & Referral</h3>
                          <p className="text-sm md:text-base lg:text-lg text-black">New Customer Acquisition & Retention channel</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[570px] lg:mr-10 2xl:mr-16 mt-4 lg:mt-0">
                    <img className="object-cover object-center rounded-3xl w-full" loading="lazy" src="/assets/testimonial/tassels-t.webp" alt="Tassels testimonial" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </figure>
      </div>
    ),
  ];

  // Auto-slide
  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    }, 3000);
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-7xl px-8 md:px-12 lg:px-0 mx-auto py-5 lg:py-8 lg:mt-8">
        <div className="flex flex-col-reverse md:flex-col justify-center items-center md:items-stretch space-y-6 md:space-y-4 md:space-y-reverse">

          {/* Tabs with dark/white logos + labels */}
          <div className="relative inline-grid items-center justify-center w-full gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mx-auto py-6">
            {tabs.map((tab, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveIndex(index);
                    resetAutoSlide();
                  }}
                  aria-selected={isActive}
                  className={`flex flex-col items-center justify-center px-4 py-2 rounded-full border border-gray-300 text-xs sm:text-sm font-medium transition ${
                    isActive ? "bg-gray-700 text-white" : "bg-white text-gray-700"
                  }`}
                >
                  <img
                    src={isActive ? tab.logoLight : tab.logoDark}
                    alt={tab.label}
                    className="h-6 w-6 object-contain mb-1"
                  />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* SLIDER: use full content instead of images */}
          <div className="relative flex justify-center w-full min-h-[200px] md:min-h-[400px]">
            <div className="relative w-full max-w-[1300px] h-auto lg:h-[518px] overflow-hidden rounded-2xl mt-4">
            <AnimatePresence mode="sync">
              {slides.map((slide, index) =>
                index === activeIndex ? (
                  <motion.div
                    key={tabs[index].id}
                    className={`absolute inset-0 rounded-2xl p-6 ${tabs[index].gradient}`}
                    initial={{ opacity: 0, scale: 0.96, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 1.02, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {slide}
                  </motion.div>
                ) : null
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
