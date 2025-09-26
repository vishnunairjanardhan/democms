import ButtonsGrid from "../buttons/getStarted";

const HeroSection = ({ title, highlight, description, image }) => {
  return (
    <section className="relative">
      {/* Background lines */}
      <div className="w-full h-full -z-1 absolute flex flex-row justify-between left-0 lg:h-full lg:max-w-7xl lg:px-0 mx-auto px-6 right-0">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="w-full h-full border-[#f5f5f510]/5 border-x border-dashed"
            />
          ))}
      </div>

      {/* Content */}
      <div className="relative items-center w-full px-5 pt-24 mx-auto md:px-12 lg:px-12 max-w-7xl lg:pt-36">
        <div className="grid grid-cols-1 gap-6 p-8 pb-0 overflow-hidden lg:grid-cols-2 lg:gap-32 lg:p-0 lg:pt-8">
          {/* Left Side */}
          <div className="relative items-center gap-12 pb-12 m-auto lg:inline-flex md:order-first lg:pb-32 xl:pt-0">
            <div className="max-w-xl text-center lg:text-left">
                <h1
                    className="mt-8"
                    dangerouslySetInnerHTML={{
                    __html: title.replace(
                        highlight,
                        `<span class="text-[#EF5A3C]">${highlight}</span>`
                    ),
                    }}
                />
                <p className="max-w-2xl mt-4">{description}</p>

                {/* Force ButtonsGrid left aligned */}
                <div className="flex justify-start mt-6">
                    <ButtonsGrid />
                </div>
            </div>

          </div>

          {/* Right Side */}
          <div className="relative order-first w-full lg:block">
            <img
              className="object-cover object-center w-full mx-auto shadow-l lg:absolute lg:ml-auto shadow-black"
              alt="hero"
              src={image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
