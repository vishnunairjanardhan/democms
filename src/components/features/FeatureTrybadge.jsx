import { useState } from "react";

const TabbedImages = () => {
  const [activeTab, setActiveTab] = useState("ui");

  const tabs = [
    {
      id: "ui",
      label: "Wallet",
      img: "/assets/wallet/wallet_banner.webp",
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
      <div className="relative max-w-7xl px-8 md:px-12 lg:px-16 mx-auto py-10 lg:py-4">
        <div className="flex flex-col-reverse md:flex-col items-center md:items-stretch space-y-6 md:space-y-4 md:space-y-reverse">
          <div className="flex justify-center md:justify-end gap-2 lg:mb-3 lg:py-0 py-6 lg:mr-32">
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
