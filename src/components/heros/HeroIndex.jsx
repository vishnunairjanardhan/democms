import React, { useEffect, useState } from "react";
import ButtonsGrid from "../buttons/getStarted2";
import TabbedImages from "../features/FeartureTabs.jsx";

function Hero({ title, title2, highlight = [], description }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState("flip-down-in");

  useEffect(() => {
    if (!highlight.length) return;

    let timeout;

    const loop = () => {
      setAnimation("flip-down-out");

      timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % highlight.length);
        setAnimation("flip-down-in");
      }, 400);
    };

    const interval = setInterval(loop, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [highlight.length]);

  return (
    <section>
      <div className="relative max-w-7xl px-0 md:px-12 lg:px-16 mx-auto py-4 lg:py-6">
        <section className="text-center pt-20 lg:pt-28">
          <h1 className="py-4 lg:mt-4 mx-auto justify-center text-center flex flex-col md:flex-row text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug md:max-w-3xl">
            {title}
            <span className="text-[#EF5A3C] ml-2">
              {title2}
              {/* <span className={animation}>{highlight[currentIndex]}</span> */}
            </span>
          </h1>

          <p className="max-w-xs sm:max-w-md md:max-w-4xl mx-auto text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 px-8" role="group">
            <a href="#giftcardsection" className="raise1 relative px-4 py-3 inline-flex items-center justify-center font-bold overflow-hidden group rounded-lg font-medium">
              <span className="w-full h-full bg-white absolute border border-[#6820EE] rounded-lg"></span>
              <span className="relative text-[#6820EE]">Learn more</span>
            </a>

            <a href="/Get-Started" aria-label="Get Started for Free" className="raise1 relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md font-medium">
              <span className="w-full h-full bg-[#6820EE] absolute"></span>
              <span className="relative px-4 py-2 bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400">
                <span className="relative text-white">Get Started for Free</span>
              </span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 px-8" role="group">
            <ButtonsGrid />
          </div>

          <TabbedImages client:visible />
        </section>
      </div>
    </section>
  );
}

export default Hero;
