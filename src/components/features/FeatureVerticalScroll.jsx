import {
  leftColumnPhones,
  rightColumnPhones,
} from "../../config/giftCardConfig";

const HeroSection = () => {
  const PhoneCard = ({ phone }) => {
    return (
      <div className={"relative w-60 py-3 mx-auto flex-shrink-0"}>
        {/* Card with Image */}
        <div
          className={`rounded-lg h-full w-full overflow-hidden flex items-center justify-center`}
        >
          {phone.content.image && (
            <img
              src={phone.content.image}
              alt={phone.content.title}
              className="w-full h-full object-contain rounded-lg"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="text-black relative overflow-hidden">
      <div className="max-w-7xl relative items-center w-full px-5 pt-24 mx-auto md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start lg:pt-16">
          {/* Left Content */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="space-y-6">
            <h1 class="mt-8">All-in-One <span class="text-[#EF5A3C]">Gift Card Software</span> for E-commerce and Retail Stores</h1>
            <p class="max-w-2xl mt-4">The go-to gift card software solution for businesses to boost revenue, elevate customer experience, and enhance brand rapport.</p>
            </div>

            <button
              type="button"
              role="button"
              aria-label="book a demo"
              className="raise1 mt-8 mx-auto relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
              onClick={() =>
                window.Calendly?.initPopupWidget({
                  url: "https://calendly.com/99minds/30min",
                })
              }
            >
              <span className="w-full h-full bg-black absolute"></span>
              <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400 font-medium">
                <span className="relative text-white">Book a Demo</span>
              </span>
            </button>
          </div>

          {/* Right Content - Scrolling Phone Mockups */}
          <div
            className="flex space-x-6 h-screen overflow-hidden relative justify-center"
            style={{ maxHeight: "540px" }}
          >
            {/* Left Column - Larger Phones */}
            <div className="w-auto overflow-hidden">
              <div className="scroll-up-container">
                {/* Triple the cards for seamless loop */}
                {[
                  ...leftColumnPhones,
                  ...leftColumnPhones,
                  ...leftColumnPhones,
                ].map((phone, index) => (
                  <PhoneCard
                    key={`large-${index}`}
                    phone={phone}
                    size="large"
                  />
                ))}
              </div>
            </div>

            <div className="w-auto overflow-hidden">
              <div className="scroll-down-container">
                {/* Triple the cards for seamless loop */}
                {[
                  ...rightColumnPhones,
                  ...rightColumnPhones,
                  ...rightColumnPhones,
                ].map((phone, index) => (
                  <PhoneCard
                    key={`small-${index}`}
                    phone={phone}
                    size="small"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll-up-container {
          display: flex;
          flex-direction: column;
          animation: scrollUpStep 16s ease-in-out infinite;
        }

        .scroll-down-container {
          display: flex;
          flex-direction: column;
          animation: scrollDownStep 16s ease-in-out infinite;
        }

        @keyframes scrollUpStep {
          0%,
          20% {
            transform: translateY(0);
          }
          25%,
          45% {
            transform: translateY(calc(-100% / 12));
          }
          50%,
          70% {
            transform: translateY(calc(-200% / 12));
          }
          75%,
          95% {
            transform: translateY(calc(-300% / 12));
          }
          100% {
            transform: translateY(calc(-400% / 12));
          }
        }

        @keyframes scrollDownStep {
          0%,
          20% {
            transform: translateY(calc(-400% / 12));
          }
          25%,
          45% {
            transform: translateY(calc(-300% / 12));
          }
          50%,
          70% {
            transform: translateY(calc(-200% / 12));
          }
          75%,
          95% {
            transform: translateY(calc(-100% / 12));
          }
          100% {
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
