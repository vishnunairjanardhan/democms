import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";

const LoyaltyROICalculator = () => {
  // State variables for sliders
  const [annualOrders, setAnnualOrders] = useState(10000);
  const [annualCustomers, setAnnualCustomers] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [purchasePerCustomer, setPurchasePerCustomer] = useState(0);

  // Calculate purchases per customer dynamically
  useEffect(() => {
    if (annualCustomers > 0) {
      setPurchasePerCustomer((annualOrders / annualCustomers).toFixed(2));
    } else {
      setPurchasePerCustomer(0); // Avoid division by zero
    }
  }, [annualOrders, annualCustomers]);

  return (
    <section className="lg:p-16 border-t border-y border-white/5">
      <div className="flex lg:flex-row flex-col items-stretch grid grid-cols-1 lg:grid-cols-3 gap-5 mx-auto max-w-7xl py-12 lg:px-0 md:px-0 px-6 sm:px-4 w-full">
        {/* Left Section */}
        <div className="py-6 items-center rounded-lg mx-0 transition-shadow duration-300 flex flex-col">
          <h2 className="px-16 font-semibold lg:text-left text-center">Loyalty ROI Calculator</h2>
          <p className="px-16 mt-2 text-center lg:text-left">
            Savvy brands are doubling down on Loyalty & Referrals to offset rising acquisition costs. But what’s the bottom line of implementing these solutions on your site? Based on metrics from thousands of Yotpo Loyalty & Referrals programs, this calculator is designed to show you the revenue uplift you can potentially see from a strategic Loyalty & Referrals program.
          </p>
        </div>

        {/* Middle Section */}
        <div className="py-4 lg:max-w-4xl col-span-1 lg:col-span-2 border border-vulcan-700 bg-white rounded-lg mx-4 lg:mx-0 hover:shadow-lg transition-shadow duration-300 group flex flex-col">
          <div className="grid lg:grid-cols-3">
            {/* Left Section */}
            <div className="lg:col-span-2 p-8">
              {/* Annual Orders */}
              <div className="shadow-xl border rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <p className="font-semibold text-black">Your annual orders</p>
                  <input
                    type="number"
                    className="w-32 bg-vulcan-900 border px-4 float-right ml-auto text-right text-white rounded-md"
                    value={annualOrders}
                    onChange={(e) => setAnnualOrders(Number(e.target.value))}
                  />
                </div>
                <ReactSlider
                  className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
                  thumbClassName="h-4 w-4 bg-black rounded-full"
                  trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
                  value={annualOrders}
                  min={0}
                  max={1000000}
                  onChange={(value) => setAnnualOrders(value)}
                />
                <p className="text-sm mt-4">How many orders does your brand process per year?</p>
              </div>

              {/* Annual Customers */}
              <div className="shadow-xl border rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <p className="font-semibold text-black">Your annual customers</p>
                  <input
                    type="number"
                    className="w-32 bg-vulcan-900 border px-4 float-right ml-auto text-right text-white rounded-md"
                    value={annualCustomers}
                    onChange={(e) => setAnnualCustomers(Number(e.target.value))}
                  />
                </div>
                <ReactSlider
                  className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
                  thumbClassName="h-4 w-4 bg-black rounded-full"
                  trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
                  value={annualCustomers}
                  min={0}
                  max={200000}
                  onChange={(value) => setAnnualCustomers(value)}
                />
                <p className="text-sm mt-4">How many customers does your brand have annually?</p>
              </div>

              {/* Average Order Value */}
              <div className="shadow-xl border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <p className="font-semibold text-black">AOV</p>
                  <input
                    type="number"
                    className="w-32 bg-vulcan-900 border px-4 float-right ml-auto text-right text-white rounded-md"
                    value={averageOrderValue}
                    onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                  />
                </div>
                <ReactSlider
                  className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
                  thumbClassName="h-4 w-4 bg-black rounded-full"
                  trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
                  value={averageOrderValue}
                  min={0}
                  max={10000}
                  onChange={(value) => setAverageOrderValue(value)}
                />
                <p className="text-sm mt-4">What is your average order value?</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="bg-[#202130] bg-cover px-10 py-8 rounded-tr-md rounded-br-md">
              <p className="p-6 text-5xl rounded-lg text-center border border-white/60 bg-black font-bold text-white mb-4">
                {purchasePerCustomer}
              </p>
              <p className="text-xl text-white text-center mb-4">Purchases per customer</p>
              <p className="text-sm text-white mb-6">
                Purchases per customer is the metric that is typically most impacted by a loyalty program. Programs can be designed to focus on increasing repeat purchase rate, decreasing time to second purchase, and more.
              </p>
              <div className="py-4">
                <button
                  type="button"
                  className="w-full raise relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                  onClick={() => window.open("https://www.99minds.io/bfcm", "_blank")}
                >
                  <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                  <span className="w-full relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400 font-medium">
                    <span className="relative text-white">Next</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LoyaltyROICalculator;
