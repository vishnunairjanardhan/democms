import { useState } from "react";
import {
  AppleRenderPassPreview,
  AppleRenderPassForm,
} from "./platforms/applePass";
import {
  GoogleRenderPassPreview,
  GoogleRenderPassForm,
} from "./platforms/googlePass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGifts, faStar, faPalette } from "@fortawesome/free-solid-svg-icons";
import { WalletPassIcon } from "./commonComponent";

const WalletPassCustomizer = () => {
  const [passData, setPassData] = useState({
    type: "giftcard",
    platform: "apple",
    passTitle: "Summer Pass",
    organization: "MagicKicks",
    description: "Premium membership benefits",
    foregroundColor: "#ffffff",
    logoText: "MagicKicks",
    cardLabel: "Card Number",
    expiryLabel: "Valid Till",
    balanceLabel: "Balance",
    textColor: "#000000",
    labelColor: "#000000",
    backgroundColor: "#FF9A7B",
    bannerImage: "../assets/wallet/Wallet-banner.jpg",
    logoUrl: "../assets/wallet/wp-logo.png",
    pointLabel: "Points",
    memberLabel: "Member",
    tierLabel: "Tier",
  });

  const passTypes = [
    { id: "giftcard", name: "Gift Card", icon: faGifts },
    { id: "loyalty", name: "Loyalty Card", icon: faStar },
  ];

  const updatePassData = (key, value) => {
    setPassData((prev) => ({ ...prev, [key]: value }));
  };

  const fileOnChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePassData(key, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
    <div className="relative px-8 py-12 mx-auto max-w-7xl md:px-12 lg:px-16 lg:py-[72px]">
      <div className="flex flex-col items-center justify-center">
        <h1 class="mt-16 tracking-tight text-center text-black">
          Free Wallet Pass Creator – Design & Share in Minutes
        </h1>
        <p class="mt-6 text-center text-vulcan-700">
          Check the preview for your digital wallet passes for gift cards and
          loyalty programs.
        </p>
      </div>
      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Controls */}
            <div className="drop-shadow-md border border-black/20 rounded-xl lg:col-span-2">
              {/* Platform & Type Selection */}
              <div className="bg-white p-6 rounded-t-xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Pass Configuration
                </h2>

                {/* Platform Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Platform
                  </label>
                  <div className="flex space-x-3"></div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        id: "apple",
                        name: "Apple Pass",
                        icon: <WalletPassIcon {...{ platform: "apple" }} />,
                        color: "#000000",
                      },
                      {
                        id: "google",
                        name: "Google Pass",
                        icon: <WalletPassIcon {...{ platform: "google" }} />,
                        color: "#A4C639",
                      },
                    ].map((type) => {
                      return (
                        <button
                          key={type.id}
                          onClick={() => updatePassData("platform", type.id)}
                          className={`flex items-center px-4 py-3 rounded-lg border transition-all ${
                            passData.platform === type.id
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {type.icon}
                          {type.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pass Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Pass Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {passTypes.map((type) => {
                      return (
                        <button
                          key={type.id}
                          onClick={() => updatePassData("type", type.id)}
                          className={`flex items-center px-4 py-3 rounded-lg border transition-all ${
                            passData.type === type.id
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {/* <IconComponent className="w-5 h-5 mr-2" /> */}
                          <FontAwesomeIcon
                            className="w-5 w-5 ml-1 mr-1"
                            icon={type.icon}
                          />
                          {type.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Design Controls */}
              <div className="bg-white p-6 rounded-b-xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  {/* <Palette className="w-5 h-5 mr-2" /> */}
                  <FontAwesomeIcon className="w-5 h-5 mr-2" icon={faPalette} />
                  Design & Branding
                </h2>
                {passData.platform === "apple" && (
                  <AppleRenderPassForm
                    {...{ ...passData, updatePassData, fileOnChange }}
                  />
                )}
                {passData.platform === "google" && (
                  <GoogleRenderPassForm
                    {...{ ...passData, updatePassData, fileOnChange }}
                  />
                )}
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="flex items-center flex-col">
                  <div className="flex items-center justify-center mb-0 rounded-xl px-6 p-3 drop-shadow-md border border-black/20 bg-white">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      {/* <Smartphone className="w-5 h-5 mr-2" /> */}
                      <WalletPassIcon
                        {...{ platform: passData.platform }}
                      />{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {passData.platform} Pass Preview
                      </span>
                    </h2>
                  </div>

                  <div
                    className="rounded-xl p-6 bg-white"
                    style={{ width: 400 }}
                  >
                    {passData.platform === "apple" && (
                      <AppleRenderPassPreview {...passData} />
                    )}
                    {passData.platform === "google" && (
                      <GoogleRenderPassPreview {...passData} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="flex flex-col gap-4 items-center justify-center">
          <p class="mt-4 text-gray-600">
            Transform Loyalty, Gift Card, and Payment Experiences into a Single
            Smart Wallet
          </p>

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
        {/*  */}
      </div>
    </div>
  );
};

export default WalletPassCustomizer;
