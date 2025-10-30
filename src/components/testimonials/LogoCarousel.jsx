import React from "react";
import { CLIENT_LOGOS } from "../../config/logos";

const LogoCarousel = () => {
  // duplicate logos to create infinite loop effect
  const duplicatedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="border-y">
      <div className="relative max-w-7xl mx-auto lg:px-14 lg:py-14 py-8">
        <p className="text-center mb-12">Trusted by teams at</p>

        <div className="relative overflow-hidden bg-white">
          {/* Fading Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>

          {/* Scrolling Container */}
          <div className="flex w-max animate-clientCarouselScroll">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center px-10"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`h-auto object-contain 
                    w-[${logo.sizes.base}px] 
                    sm:w-[${logo.sizes.sm}px] 
                    lg:w-[${logo.sizes.lg}px]`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes clientCarouselScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-clientCarouselScroll {
          animation: clientCarouselScroll 120s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default LogoCarousel;
