import React from "react";
 import { Image } from "astro:assets";
export default function FeatureSection({ sectionTitle, features }) {
  return (
    <section className="relative bg-[#FEFCF5]">
      {/* Section Heading */}
      <div className="mx-auto lg:text-center px-8 lg:pt-[72px]">
        <h2 className="font-medium">{sectionTitle}</h2>
      </div>

      {/* Feature Grid */}
      <div className="relative max-w-7xl px-8 md:px-12 lg:px-16 mx-auto py-12 lg:pb-[72px]">
        {features.map((feature, i) => {
          const isRight = feature.orientation === "right";

          return (
            <div
              key={i}
              className={`grid grid-cols-1 gap-8 mt-6 sm:grid-cols-2 lg:gap-24 items-center ${
                isRight ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Text Section */}
              <div
                className={`${
                  isRight ? "sm:order-last" : ""
                } flex flex-col`}
              >
                <p className="text-base font-medium text-[#6820EE] uppercase bg-clip-text">{feature.smallheading}</p>
                <h2 className="py-4 font-medium">{feature.title}</h2>
                <p className="">{feature.description}</p>
                  {feature.list && feature.list.length > 0 && (
                  <ul className="mt-4 list-disc list-inside text-lg  space-y-2">
                    {feature.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
                 <div class="lg:flex gap-2 mt-6" role="button">
                <div x-data="{ open: false }" class="flex justify-start lg:justify-center">
                  <span x-on:click="open = true">
                      <a href="/Get-Started" target="_blank" type="button" role="button" aria-label="Get Started for Free"
                        class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md font-medium">
                        
                        <span class="relative text-[#6820EE] text-lg transition-colors duration-300">
                          Get started for free
                        </span>

                        <svg
                          class="ml-3 h-5 w-5 text-[#6820EE] transition-all duration-300 transform group-hover:translate-x-1"
                          width="16" height="16" viewBox="0 0 24 24"
                          stroke-width="2" stroke="currentColor" fill="none"
                          stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <line x1="13" y1="18" x2="19" y2="12" />
                          <line x1="13" y1="6" x2="19" y2="12" />
                        </svg>
                      </a>
                    </span>
                    </div>
                  </div>             
              </div>

              {/* Image Section */}
              <div className="h-full">
                <img
                  alt={feature.alt}
                  src={feature.img?.src || feature.img}
                  className="rounded-2xl shadow-vulcan-950/50 w-full w-[550px] h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
