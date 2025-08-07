const HeroSection = () => {
  const leftColumnPhones = [
    {
      id: 1,
      brand: "99minds",
      bgColor: "bg-indigo-900",
      content: {
        image: "/assets/homepage/Gift_Card1.png",
        title: "Digital Gift Cards",
        amount: "$50 - $500",
        description: "Send personalized gift cards instantly",
        discount: "Save 10% on first purchase",
        cta: "Issue Now",
      },
    },
    {
      id: 2,
      brand: "99minds",
      bgColor: "bg-emerald-600",
      content: {
        image: "/assets/homepage/Gift_Card1.png",
        title: "Loyalty Rewards",
        subtitle: "Turn every purchase into points",
        cta: "Build Customer Loyalty",
      },
    },
    {
      id: 3,
      brand: "99minds",
      bgColor: "bg-pink-600",
      content: {
        image: "/assets/homepage/Gift_Card1.png",
        title: "Membership Passes",
        subtitle: "Engage your VIP customers",
        user: "E-commerce Brands",
        paypal: true,
      },
    },
    {
      id: 4,
      brand: "99minds",
      bgColor: "bg-blue-800",
      content: {
        image: "/assets/homepage/Gift_Card1.png",
        title: "Promo & Coupon Campaigns",
        subtitle: "Drive conversions with time-limited offers",
        user: "Marketing Teams",
      },
    },
  ];

  const rightColumnPhones = [
    {
      id: 5,
      brand: "99minds",
      bgColor: "bg-yellow-500",
      content: {
        image: "/assets/homepage/gift_card2.png",
        title: "Apple & Google Wallet Integration",
        subtitle: "Go fully digital with mobile passes",
      },
    },
    {
      id: 6,
      brand: "99minds",
      bgColor: "bg-red-500",
      content: {
        image: "/assets/homepage/gift_card2.png",
        title: "Automated Rewards",
        subtitle: "Trigger rewards based on behavior",
      },
    },
    {
      id: 7,
      brand: "99minds",
      bgColor: "bg-green-700",
      content: {
        image: "/assets/homepage/gift_card2.png",
        title: "Real-Time Analytics",
        subtitle: "Track engagement and redemptions",
      },
    },
    {
      id: 8,
      brand: "99minds",
      bgColor: "bg-purple-600",
      content: {
        image: "/assets/homepage/gift_card2.png",
        title: "Omnichannel Campaigns",
        subtitle: "Deliver personalized messages across SMS, Email, and Push",
      },
    },
  ];

  const PhoneCard = ({ phone, size = "large" }) => {
    const isLarge = size === "large";

    return (
      <div
        className={`relative ${
          isLarge ? "w-72 h-[500px]" : "w-56 h-[300px]"
        } mb-8 mx-auto flex-shrink-0`}
      >
        {/* Background Card */}
        <div className={`absolute inset-0 ${phone.bgColor} rounded-3xl`}></div>

        {/* Phone Frame */}
        <div
          className={`relative bg-black rounded-3xl p-1 shadow-2xl ${
            isLarge
              ? "w-52 h-[390px] mx-auto mt-16"
              : "w-40 h-[230px] mx-auto mt-12"
          }`}
        >
          {/* Phone Notch */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-black rounded-full z-10"></div>

          {/* Phone Screen */}
          <div className="bg-white rounded-2xl h-full w-full overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-800">
              <div className="flex items-center space-x-1">
                {/* <span>9:41</span> */}
              </div>
              <div className="flex items-center space-x-1">
                {/* <div className="w-4 h-2 border border-gray-400 rounded-sm"> */}
                {/* <div className="w-3 h-1 bg-green-500 rounded-sm m-0.5"></div> */}
                {/* </div> */}
              </div>
            </div>

            {/* Content */}
            <div className="px-3 mt-4 h-full">
              {/* Brand Header */}
              <div className="text-center mb-3">
                <h3 className="font-bold text-gray-900 text-sm">
                  {phone.brand}
                </h3>
              </div>

              {/* Main Content */}
              {phone.content.image && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <img
                    src={phone.content.image}
                    alt={phone.content.title}
                    className={`w-full object-cover ${
                      isLarge ? "h-28" : "h-20"
                    }`}
                  />
                </div>
              )}

              {phone.content.title && (
                <h4
                  className={`font-semibold text-gray-900 mb-2 ${
                    isLarge ? "text-sm" : "text-xs"
                  }`}
                >
                  {phone.content.title}
                </h4>
              )}

              {phone.content.amount && (
                <div
                  className={`text-green-600 font-bold mb-2 ${
                    isLarge ? "text-lg" : "text-base"
                  }`}
                >
                  {phone.content.amount}
                </div>
              )}

              {phone.content.subtitle && (
                <p
                  className={`text-gray-600 mb-2 ${
                    isLarge ? "text-xs" : "text-xs"
                  }`}
                >
                  {phone.content.subtitle}
                </p>
              )}

              {phone.content.description && (
                <p
                  className={`text-gray-700 mb-2 ${
                    isLarge ? "text-xs" : "text-xs"
                  }`}
                >
                  {phone.content.description}
                </p>
              )}

              {phone.content.discount && (
                <div
                  className={`bg-orange-100 text-orange-800 px-2 py-1 rounded-full inline-block mb-2 text-xs font-medium`}
                >
                  {phone.content.discount}
                </div>
              )}

              {phone.content.paypal && (
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PP</span>
                    </div>
                    <span className="text-gray-700 text-xs">PayPal</span>
                  </div>
                </div>
              )}

              {phone.content.cta && (
                <button
                  className={`w-full bg-black text-white py-2 rounded-lg font-medium mt-auto text-xs`}
                >
                  {phone.content.cta}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <div className="max-w-7xl relative items-center w-full px-5 pt-24 mx-auto md:px-12 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start pt-16">
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
            className="flex space-x-6 overflow-hidden relative"
            style={{ height: "730px", maxHeight: "800px" }}
          >
            {/* Left Column - Larger Phones */}
            <div className="w-auto overflow-hidden relative">
              <div className="scroll-up-container-peek">
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

            {/* Right Column - Smaller Phones */}
            <div className="w-auto overflow-hidden relative">
              <div className="scroll-down-container-peek">
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
        .scroll-up-container-peek {
          display: flex;
          flex-direction: column;
          animation: scrollUpStepPeek 16s ease-in-out infinite;
          transform: translateY(50px);
        }

        .scroll-down-container-peek {
          display: flex;
          flex-direction: column;
          animation: scrollDownStepPeek 16s ease-in-out infinite;
          transform: translateY(50px);
        }

        @keyframes scrollUpStepPeek {
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

        @keyframes scrollDownStepPeek {
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
      `}</style>
    </div>
  );
};

export default HeroSection;
