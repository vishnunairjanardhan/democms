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
    // {
    //   id: "embed",
    //   label: "Embed",
    //   img: "/assets/homepage/SC1.webp",
    //   alt: "gift card embed",
    // },
  ];

  return (
    <section className="relative">
      <div className="relative max-w-7xl px-8 md:px-12 lg:px-16 mx-auto py-4 lg:py-4 space-y-4">
        <div className="w-full max-w-6xl mx-auto py-4">
          {/* Tabs aligned to end (right) */}
          <div className="flex justify-end space-x-4 mb-10 lg:mr-24">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full border border-gray-300 text-sm font-medium focus:outline-none ${
                  activeTab === tab.id ? "bg-gray-700 text-white" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content (image centered) */}
          <div className="relative flex justify-center">
            {tabs.map((tab) => (
              <img
                key={tab.id}
                src={tab.img}
                alt={tab.alt}
                width="900"
                loading="lazy"
                className={` rounded-2xl shadow-vulcan-950/50 ${
                  activeTab === tab.id ? "block" : "hidden"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabbedImages;
