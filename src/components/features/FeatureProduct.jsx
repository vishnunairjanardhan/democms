import React from "react";

const GiftCardFeatures = ({ heading, features }) => {
  return (
    <section className="relative bg-[#FEFCF5]">
      <div className="mx-auto lg:text-center px-8 lg:pt-12">
        {heading && <h2 className="mt-4 font-medium">{heading}</h2>}
      </div>

      <div className="relative max-w-7xl px-8 md:px-12 lg:px-16 mx-auto py-12 lg:py-24 md:space-y-24 space-y-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-24 items-center ${
              feature.reverse ? "sm:flex-row-reverse" : ""
            }`}
          >
            {/* Text Section */}
            <div className={feature.reverse ? "sm:order-last" : ""}>
              <h2 className="font-medium">{feature.title}</h2>

              {feature.description && (
                <p className="mt-4 text-[#4b4b4b]">{feature.description}</p>
              )}

              {feature.list && (
                <ul className="mt-4">
                  {feature.list.map((item, liIndex) => (
                    <li key={liIndex} className="py-2">
                      <p className="leading-6 text-[#4b4b4b]">{item}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Image Section */}
            <div className="h-full">
              <img
                alt={feature.title}
                src={feature.image}
                className="rounded-2xl shadow-vulcan-950/50 w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GiftCardFeatures;
