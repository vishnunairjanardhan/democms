import React, { useState } from "react";

const WalletPage = ({ onNextButtonClick }) => {
  const [brandName, setBrandName] = useState("");
  const [showCoupons, setShowCoupons] = useState(true);
  const [showGiftCard, setShowGiftCard] = useState(true);
  const [showLoyaltyPoints, setShowLoyaltyPoints] = useState(false);
  const [showStoreCredits, setShowStoreCredits] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const handleSubmit = () => {
    const errors = {};
    if (!brandName.trim()) {
      errors.brandName = "Brand Name is required";
    }
    if (Object.keys(errors).length === 0) {
      onNextButtonClick({
        brandName,
        showCoupons,
        showGiftCard,
        showLoyaltyPoints,
        showStoreCredits,
      });
    } else {
      setFormErrors(errors);
    }
  };
  return (
    <article className="relative py-12 mx-auto max-w-7xl md:py-24 lg:px-16 w-full">
      <div className="flex flex-col items-center justify-center pb-8">
        <h1 className="text-2xl font-bold mb-4 pt-4">
          Create Your Brand Wallet
        </h1>
        <div className="p-3 mt-4 bg-white rounded-xl shadow-xl shadow-vulcan-950 border border-black/20">
          <div className="lg:flex justify-center ">
            <div className="lg:flex flex-col pb-4 mr-4">
              <div className="mb-4 flex flex-col">
                <div className="flex flex-col p-10">
                  <label
                    htmlFor="brandName"
                    className="mr-2 pb-2 text-lg  font-bold"
                  >
                    Brand Name
                  </label>
                  <input
                    type="text"
                    id="brandName"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter your brand name"
                    className={`border p-2 rounded-md text-black ${
                      formErrors.brandName ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.brandName && (
                    <p className="text-red-500 text-sm">
                      {formErrors.brandName}
                    </p>
                  )}
                  <h1 className="py-4 pb-2 font-medium text-lg">
                    Customize Your Wallet
                  </h1>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-1">
                    <div className="flex items-center text-black">
                      <button
                        type="button"
                        onClick={() => setShowGiftCard(!showGiftCard)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  ${
                          showGiftCard ? "bg-gray-900" : "bg-gray-200"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            showGiftCard ? "translate-x-5" : "translate-x-0"
                          }`}
                        ></span>
                      </button>
                      <label htmlFor="giftCardCheckbox" className="ml-2 py-1 ">
                        Gift Card
                      </label>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowCoupons(!showCoupons)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  ${
                          showCoupons ? "bg-gray-900" : "bg-gray-200"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            showCoupons ? "translate-x-5" : "translate-x-0"
                          }`}
                        ></span>
                      </button>
                      <label htmlFor="giftCardCheckbox" className="ml-2 py-1 ">
                        Coupon
                      </label>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowLoyaltyPoints(!showLoyaltyPoints)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          showLoyaltyPoints ? "bg-gray-900" : "bg-gray-200"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            showLoyaltyPoints
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        ></span>
                      </button>
                      <label htmlFor="giftCardCheckbox" className="ml-2 py-1 ">
                        Loyalty Points
                      </label>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowStoreCredits(!showStoreCredits)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  ${
                          showStoreCredits ? "bg-gray-900" : "bg-gray-200"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            showStoreCredits ? "translate-x-5" : "translate-x-0"
                          }`}
                        ></span>
                      </button>
                      <label htmlFor="giftCardCheckbox" className="ml-2 py-1 ">
                        Store Credit
                      </label>
                    </div>
                  </div>
                  <div className="py-2">
                    {/* <button
                                            type="button"
                                            className="relative p-1 mt-4 flex inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                                            onClick={handleSubmit}
                                        >
                                            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                                            <span className="relative px-4 py-1 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-100 duration-400 w-full">
                                                <span className="relative  flex items-center justify-center">
                                                    <h4 className="px-2">Next</h4>
                                                </span>
                                            </span>
                                        </button> */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      class="raise1 relative p-1 mt-4 inline-flex items-center justify-center overflow-hidden group rounded-md"
                    >
                      {" "}
                      <span class="w-full h-full bg-black group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>{" "}
                      <span class="relative px-4 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-10 duration-400 inline-flex items-center gap-2">
                        <span class="relative flex items-center justify-center text-white"><h4 className="px-2">Next</h4></span>{" "}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:flex flex-col pb-4 py-10 pr-10">
              <h3 className="text-lg font-bold pb-2">Wallet Preview</h3>
              <div className="bg-white mt-2 rounded shadow-md py-5 w-full px-8">
                <div className="w-full flex h-8 bg-gray-200 pl-2 rounded-lg my-3">
                  <p className="text-center w-full justify-center items-center pt-1.5 text-black pr-8 text-xs">
                    www.99kicks.com
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 text-black">
                  <img
                    className="mr-4 rounded border-1 border-black shadow-md"
                    src={"/assets/Yourcart2.png"}
                    alt="Product image"
                  />
                  <div>
                    <form className="flex-1 space-y-2 border border-black p-4 mb-2 rounded-md bg-white mt-4 lg:mt-0 text-balck">
                      <label className="relative w-full flex flex-col">
                        {/* <button type="button" className="relative p-1 flex inline-flex items-center justify-center font-bold overflow-hidden group rounded-md w-full">
                                                    <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                                                    <span className="relative px-4 py-2 transition-all ease-out bg-black bg-opacity-0 rounded-md group-hover:bg-opacity-100 duration-400 w-full">
                                                        <span className="relative  flex items-center justify-center">
                                                            <h4 className="px-2">{brandName}</h4>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                className="bi bi-wallet"
                                                                viewBox="0 0 16 16">
                                                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                                                            </svg>
                                                        </span>
                                                    </span>
                                                </button> */}
                        <button
                          type="button"
                          className="relative p-1 flex inline-flex items-center justify-center font-bold overflow-hidden group rounded-md w-full"
                        >
                          <span className="w-full h-full bg-black group-hover:bg-neutral-900 absolute transition-all duration-300 ease-out"></span>
                          <span className="relative px-4 py-2 bg-opacity-0 rounded-md w-full group-hover:bg-opacity-100 transition-all duration-400 ease-out">
                            <span className="relative text-white flex items-center justify-center">
                              <h4 className="px-2">{brandName}</h4>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-wallet"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                              </svg>
                            </span>
                          </span>
                        </button>
                      </label>
                      <div className="flex-1 border p-4 rounded-md space-y-1">
                        {showGiftCard && (
                          <div>
                            <h2 className="text-sm font-small">Gift Card</h2>
                            <div className="flex space-x-2">
                              <div className="flex-1 relative">
                                <input className="p-2 w-full rounded-md border-2 border-gray-300 bg-gray-100 bg-gray-200" />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-credit-card absolute top-3 right-2"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                        {showCoupons && (
                          <div>
                            <h2 className="text-sm  font-small">Coupon</h2>
                            <div className="flex space-x-2">
                              <div className="flex-1 relative">
                                <input className="p-2 w-full rounded-md border-2 border-gray-300 bg-gray-100 bg-gray-200" />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-tag absolute top-3 right-2"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0" />
                                  <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                        {showLoyaltyPoints && (
                          <div>
                            <h2 className="text-sm  font-small">
                              Loyalty points
                            </h2>
                            <div className="flex space-x-2">
                              <div className="flex-1 relative">
                                <input className="p-2 w-full rounded-md border-2 border-gray-300 bg-gray-100 bg-gray-200" />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-star-fill absolute top-3 right-2"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                        {showStoreCredits && (
                          <div>
                            <h2 className="text-sm  font-small">
                              Store credits
                            </h2>
                            <div className="flex space-x-2">
                              <div className="flex-1 relative">
                                <input className="p-2 w-full rounded-md border-2 border-gray-300 bg-gray-100 bg-gray-200" />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-currency-dollar absolute top-3 right-2"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                    <form className="flex-1 space-y-2 border p-4 rounded-md bg-white mt-4 lg:mt-0 text-balck">
                      <label className="relative w-full flex flex-col">
                        <input
                          className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 bg-gray-100 placeholder-gray-300"
                          type="text"
                          name="card_number"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </label>
                      <div className="w-full pt-2">
                        <button
                          type="button"
                          className="bg-black text-white p-3 rounded-md w-full"
                        >
                          Pay
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WalletPage;
