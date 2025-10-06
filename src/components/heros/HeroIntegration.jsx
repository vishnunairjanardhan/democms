import React from "react";
import ButtonsGrid from "../buttons/getStarted2";

export default function HeroIntegration({ logo, heading, description }) {
  return (
    <section className="relative">
      {/* Background grid lines */}
      <div className="absolute inset-0 flex flex-row justify-between w-full h-full -z-10 lg:max-w-7xl lg:mx-auto lg:px-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-full h-full border-x border-dashed border-[#f5f5f510]/5"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl px-5 py-12 lg:py-0 mx-auto md:px-12 lg:px-12 pt-24 lg:pt-32">
        <div className="text-center">
          {/* Logo */}
          <div className="grid grid-cols-1">
            <img
              className="m-auto"
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt={logo.alt}
              loading="lazy"
            />
          </div>

          {/* Heading */}
          <h1 className="mt-0">{heading}</h1>

          {/* Subtext */}
          <p className="max-w-5xl mx-auto my-4 pb-4">{description}</p>

          {/* Buttons */}
          <ButtonsGrid />
        </div>
      </div>
    </section>
  );
}
