import {
  leftColumnPhones,
  rightColumnPhones,
} from "../../config/giftCardConfig";

const HeroSection = () => {
  const PhoneCard = ({ phone }) => {
    return (
      <div className={"relative w-72 h-[200px] mb-4 mx-auto flex-shrink-0"}>
        {/* Card with Image */}
        <div
          className={`rounded-2xl h-full w-full overflow-hidden flex items-center justify-center`}
        >
          {phone.content.image && (
            <img
              src={phone.content.image}
              alt={phone.content.title || phone.brand}
              className="w-full h-full object-contain rounded-lg"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-black relative overflow-hidden">
      <div className="max-w-7xl relative items-center w-full px-5 pt-24 mx-auto md:px-12 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start pt-16">
          {/* Left Content */}
          <div className="space-y-8 lg:pt-16">
            <div className="space-y-6">
              <h1 className="text-2xl lg:text-5xl font-bold leading-tight text-gray-800">
                Scale end to end
                <br />
                99minds Creator
                <br />
                programs
              </h1>

              <p className="text-xl text-gray-800 leading-relaxed max-w-lg">
                Empower your customers and creators with 99minds' cobranded
                landing pages, cash and store credit rewards, gift cards, and
                comprehensive creator monetization tools!
              </p>
            </div>

            <button
              type="button"
              role="button"
              aria-label="book a demo"
              className="raise1 mt-4 mx-auto relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
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
            className="flex space-x-6 h-screen overflow-hidden relative"
            style={{ height: "650px", maxHeight: "700px" }}
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
