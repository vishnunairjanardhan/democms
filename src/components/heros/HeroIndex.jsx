// src/components/heros/Hero.jsx
import React, { useEffect, useState } from "react";
import GetStartedButton from "../buttons/getStartedButton";
import BookDemoButton from "../buttons/bookDemoButton";
import TabbedImages from "../features/FeatureTrybadge";

function Hero({ title, highlight, description }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % highlight.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [highlight.length]);

  return (
    <section>
      <div className="relative max-w-7xl px-0 md:px-12 lg:px-16 mx-auto py-4 lg:py-6">
        <section className="text-center pt-20 lg:pt-28">
          <h1 className="py-4 pl-6 mt-4 mx-auto text-left flex text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug max-w-xs lg:max-w-3xl md:max-w-3xl">
            {title}
            <span
              className={`text-[#EF5A3C] block transition-opacity duration-500  ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {highlight[currentIndex]}
            </span>
          </h1>
          <p className="max-w-xs sm:max-w-md md:max-w-4xl mx-auto text-base sm:text-lg text-gray-600 mb-8 text-center leading-relaxed">
            {description}
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-4 pb-8"
            role="group"
          >
            <GetStartedButton />
            <BookDemoButton />
          </div>

          <TabbedImages />
        </section>
      </div>
    </section>
  );
}

export default Hero;
