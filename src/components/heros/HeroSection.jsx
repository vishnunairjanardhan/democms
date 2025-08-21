import { useState } from "react";

export default function HeroSection({ title, redText, description, image }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative">
      {/* Background Grid */}
      <div className="w-full h-full -z-1 absolute flex flex-row justify-between left-0 lg:h-full lg:max-w-7xl lg:px-0 mx-auto px-6 right-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-full h-full border-[#f5f5f510]/5 border-x border-dashed"
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative items-center w-full px-5 pt-24 mx-auto md:px-12 lg:px-12 max-w-7xl lg:pt-36">
        <div className="grid grid-cols-1 gap-6 p-8 pb-0 overflow-hidden lg:grid-cols-2 lg:gap-32 lg:p-0 lg:pt-8">
          {/* Left Section */}
          <div className="relative items-center gap-12 pb-12 m-auto lg:inline-flex md:order-first lg:pb-32 xl:pt-0">
            <div className="max-w-xl text-center lg:text-left">
              <h1 className="mt-8">
                {title} <span className="text-[#EF5A3C]">{redText}</span>
              </h1>
              <p className="max-w-2xl mt-4">{description}</p>
              <div className="lg:flex gap-2 mt-10">
                <div className="flex justify-center">
                  {/* Trigger */}
                  <button
                    type="button"
                    role="button"
                    aria-label="Get Started for Free"
                    onClick={() => setOpen(true)}
                    className="raise1 relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md font-medium"
                  >
                    <span className="w-full h-full bg-black group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                    <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400">
                      <span className="relative text-white">Get started for free</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative order-first w-full lg:block">
            <img
              className="object-cover object-center w-full mx-auto shadow-l lg:absolute lg:ml-auto shadow-black"
              alt="hero"
              src={image}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 w-screen overflow-y-auto"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-vulcan-950 bg-opacity-50"
            onClick={() => setOpen(false)}
          ></div>
          {/* Panel */}
          <div className="relative flex min-h-screen items-center justify-center p-4">
            <div className="relative w-full max-w-3xl overflow-y-auto shadow-2xl rounded-3xl p-[0.060rem]">
              <div className="bg-white rounded-3xl p-4 text-center">
                <iframe
                  src="../GetStarted"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  allowFullScreen
                  title="Calendly"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
