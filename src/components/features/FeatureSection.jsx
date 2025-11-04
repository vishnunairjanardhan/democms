import React from "react";

export default function FeatureSection({ sectionTitle, features }) {
  return (
    <section className="relative bg-[#FEFCF5]">
      {/* Section Heading */}
      <div className="mx-auto lg:text-center px-8 lg:pt-[72px]">
        <h2 className="font-medium">{sectionTitle}</h2>
      </div>

      {/* Feature Grid */}
      <div className="relative max-w-7xl px-8 md:px-12 lg:px-16 mx-auto py-12 lg:py-[72px] space-y-12 md:space-y-24">
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
                <h2 className="font-medium">{feature.title}</h2>
                <p className="mt-4 text-[#4b4b4b]">{feature.description}</p>
              </div>

              {/* Image Section */}
              <div className="h-full">
                <img
                  alt={feature.alt}
                  src={feature.img}
                  className="rounded-2xl shadow-vulcan-950/50 w-full"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
