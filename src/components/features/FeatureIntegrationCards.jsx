import React from "react";
import Verticalgrid from "../assets/Verticalgrid"; // Assuming this is a React component or SVG

const FeatureIntegrationCards = ({ toolsData, ctaText, ctaLink }) => {
  return (
    <section className="bg-[#f9f9f9] relative">
      <Verticalgrid />

      <div className="mx-auto max-w-7xl py-24 lg:px-16 md:px-12 px-8 xl:px-18 items-center lg:py-[72px] w-full">
        {/* Header Section */}
        <div className="mx-auto text-center">
          <h2>The Tools You Need To Grow Repeat Sales</h2>
          <p className="max-w-4xl mx-auto mt-4">
            Points, VIP, referrals, gift cards, and store credit work seamlessly
            together to create the ultimate rewards program for your business.
          </p>
        </div>

        {/* Dynamic Cards */}
        <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-14 mt-10">
          {toolsData.map((tool, index) => (
            <div
              key={index}
              className="flex flex-col p-[0.060rem] bg-white rounded-2xl border border-gray-200"
            >
              <div className="px-6 py-8 sm:p-10 sm:pb-6">
                <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                  <div>
                    <img
                      alt={tool.alt}
                      className="text-center"
                      width="176"
                      height="176"
                      loading="lazy"
                      src={tool.imgSrc}
                    />
                    <p className="text-xl font-medium mt-8">{tool.title}</p>
                    <p className="mt-2">{tool.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col justify-center max-w-xl gap-2 mx-auto sm:flex-row">
          <div className="flex flex-wrap justify-center gap-2 lg:mt-10">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="raise1 relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md font-medium"
            >
              <span className="w-full h-full bg-black absolute"></span>
              <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400">
                <span className="relative text-white">{ctaText}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureIntegrationCards;
