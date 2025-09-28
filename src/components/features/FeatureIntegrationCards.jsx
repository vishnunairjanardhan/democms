import React from "react";

export default function FeatureIntegrationCards({ title, description, features, cta }) {
  return (
    <section className="bg-[#f9f9f9]">
      {/* Top Heading */}
      <div className="mx-auto max-w-7xl py-24 lg:px-16 md:px-12 px-8 xl:px-18 items-center lg:py-[72px] relative w-full">
        <div className="mx-auto text-center">
          <h2 className="lg:mt-0 mt-8">{title}</h2>
          <p className="max-w-2xl mx-auto mt-4">{description}</p>
        </div>

        {/* Dynamic Feature Grid */}
        <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col p-[0.060rem] bg-white rounded-3xl border border-gray-500"
            >
              <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                  <div>
                    <img
                      alt={feature.alt}
                      className="text-center"
                      width="176"
                      height="176"
                      src={feature.img}
                      loading="lazy"
                    />
                    <h3 className="text-2xl mt-8 text-black">{feature.title}</h3>
                    <p className="mt-2 text-base">{feature.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {cta && (
          <div className="flex flex-wrap justify-center max-w-xl gap-2 mx-auto mt-16 sm:flex-row">
            <a
              href={cta.href}
              target="_blank"
              className="raise1 relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md font-medium"
            >
              <span className="w-full h-full bg-black absolute"></span>
              <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400">
                <span className="relative text-white">{cta.label}</span>
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
