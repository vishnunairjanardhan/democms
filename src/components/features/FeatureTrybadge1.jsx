import { useState } from "react";

const TabbedImages = () => {
  const [activeTab, setActiveTab] = useState("ui");

  const tabs = [
    {
      id: "ui",
      label: "Wallet",
      img: "/assets/wallet/Wallet-banner.png",
      alt: "gift card ui",
    },
    {
      id: "api",
      label: "Push Notification",
      img: "/assets/wallet/Push Notification.png",
      alt: "gift card api",
    },
  ];

  return (
    <section className="relative w-full">
      <div className="relative w-full max-w-7xl px-4 sm:px-6 md:px-8 mx-auto space-y-6">

        <div className="flex flex-col-reverse md:flex-col items-center md:items-stretch space-y-6 md:space-y-4 md:space-y-reverse">
          <div className="flex justify-center md:justify-end gap-2 lg:mb-3 lg:py-0 py-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full border border-gray-300 text-sm font-medium transition whitespace-nowrap ${
                  activeTab === tab.id ? "bg-gray-700 text-white" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Image */}
          <div className="w-full flex justify-center">
            {tabs.map((tab) => (
              <img
                key={tab.id}
                src={tab.img}
                alt={tab.alt}
                className={`rounded-2xl shadow-md w-full max-w-[900px] h-auto ${
                  activeTab === tab.id ? "block" : "hidden"
                }`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabbedImages;
