import React, { useEffect, useState } from "react";
import GetStartedButton from "../buttons/getStartedButton";
import BookDemoButton from "../buttons/bookDemoButton";
import ButtonsGrid from "../buttons/getStarted2";
import  TabbedImages from "../features/FeartureTabs.jsx";

function Hero({ title, title2, highlight, description }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState("flip-down-in");

  useEffect(() => {
    const interval = setInterval(() => {
      // play OUT animation
      setAnimation("flip-down-out");

      setTimeout(() => {
        // change word after out animation ends
        setCurrentIndex((prev) => (prev + 1) % highlight.length);
        // play IN animation
        setAnimation("flip-down-in");
      }, 500); // match out animation duration
    }, 3000);

    return () => clearInterval(interval);
  }, [highlight.length]);

  return (
    <section>
      <div className="relative max-w-7xl px-0 md:px-12 lg:px-16 mx-auto py-4 lg:py-6">
        <section className="text-center pt-20 lg:pt-28">
          <h1 className="py-4 mt-4 mx-auto text-center flex text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug md:max-w-3xl">
            {title}
            <span
              className="text-[#EF5A3C] ml-2"
            >
              {title2}
              {/* {highlight[currentIndex]} */}
            </span>
          </h1>

          <p className="max-w-xs sm:max-w-md md:max-w-4xl mx-auto text-base sm:text-lg text-gray-600 mb-8 text-center leading-relaxed">
            {description}
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-4 pb-8"
            role="group"
          > 
            <ButtonsGrid />
          </div>
          <TabbedImages client:load/>
        </section>
      </div>
    </section>
  );
}

export default Hero;
