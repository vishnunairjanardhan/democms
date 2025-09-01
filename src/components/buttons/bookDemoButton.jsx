import React from "react";

export default function BookDemoButton() {
  const handleClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/99minds/30min",
      });
    } else {
      console.error("Calendly not loaded");
    }
  };

  return (
    <button
      type="button"
      className="raise1 relative p-0.5 inline-flex items-center justify-center overflow-hidden group rounded-md"
      onClick={handleClick}
    >
      <span className="w-full h-full bg-white border border-black rounded-md group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="relative px-4 py-2 transition-all ease-out rounded-md group-hover:bg-opacity-10 duration-400 inline-flex items-center gap-2">
        <span className="relative text-black">Book a Demo</span>
      </span>
    </button>
  );
}
