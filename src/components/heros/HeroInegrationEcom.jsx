import React from "react";
import ButtonsGrid from "../buttons/getStarted2";

export default function IntegrationSection({ config }) {
  return (
    <section className="relative">
      <div className="relative w-full px-5 py-12 mx-auto md:px-12 lg:px-12 max-w-7xl lg:pb-0 pt-24 lg:pt-32">
        <div className="text-center">
          {/* Dynamic Logo */}
          {config.logo && (
            <div className="grid grid-cols-1 place-content-center">
              <img
                className="m-auto"
                width={config.logo.width}
                height={config.logo.height}
                src={config.logo.src}
                alt={config.logo.alt}
              />
            </div>
          )}

          {/* Dynamic Heading */}
          <h1 className="mt-2">{config.heading}</h1>

          {/* Dynamic Description */}
          <p className="max-w-5xl mx-auto mt-4">{config.description}</p>

          {/* Dynamic Reviews */}
          {config.reviews && (
            <div className="flex flex-wrap justify-center max-w-xl gap-2 mx-auto py-8 sm:flex-row">
              <p className="justify-center mx-auto">
                <span className="flex items-center">
                  <img
                    src={config.reviews.image}
                    alt={config.reviews.alt}
                    className="w-24 h-auto mr-2"
                  />
                  {config.reviews.text}
                </span>
              </p>
            </div>
          )}

          {/* Dynamic CTA */}
          {config.cta && (
            <div className="flex flex-wrap justify-center max-w-xl gap-2 mx-auto sm:flex-row">
              <a
                href={config.cta.link}
                target="_blank"
                rel="noopener noreferrer"
                className="raise1 relative px-4 py-3 inline-flex items-center justify-center font-bold overflow-hidden group rounded-lg font-medium"
              >
                <span className="w-full h-full bg-white absolute border border-black rounded-lg"></span>
                <span className="relative text-black"></span>
                <span class="relative text-black">Install on </span>
                <img
                  className="z-40 m-auto ml-2"
                  width={config.cta.logo.width}
                  src={config.cta.logo.src}
                  alt={config.cta.logo.alt}
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
