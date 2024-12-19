import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";

const LoyaltyROICalculator = ({ goToNextStep }) => {
  // Define state variables for the inputs
  const [annualOrders, setAnnualOrders] = useState(10000); // Default value
  const [annualCustomers, setAnnualCustomers] = useState(500); // Default value
  const [ProfitMargin, setProfitMargin] = useState(20); // Default value
  const [Aov, setAov] = useState(50);
  const [averageOrder, setAverageOrder] = useState(0);

  // Calculate Average Order Value (averageOrder)
  useEffect(() => {
    if (annualCustomers > 0) {
      setAverageOrder((annualOrders / annualCustomers).toFixed(2));
    } else {
      setAverageOrder(0); // Avoid division by zero
    }
  }, [annualOrders, annualCustomers]);

  return (
    <section className="border-t border-y border-white/5">
      {/* Middle Section */}
      <div className="lg:max-w-4xl col-span-1 lg:col-span-2 bg-white rounded-lg mx-4 lg:mx-0 hover:shadow-lg transition-shadow duration-300 group flex flex-col">
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
                thumbClassName="h-6 w-6 bg-black rounded-full border border-white border-[3px] drop-shadow-lg"
                trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
                value={annualOrders}
                min={0}
                max={1000000}
                onChange={(value) => setAnnualOrders(value)}
              />
              <p className="text-sm mt-4">
                How many orders does your brand process per year?
              </p>
            </div>

            {/* Annual Customers */}
            <div className="shadow-xl border rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <p className="font-semibold text-black">
                  Your annual customers
                </p>
                <input
                  type="number"
                  className="w-32 bg-vulcan-900 border px-4 float-right ml-auto text-right text-white rounded-md"
                  value={annualCustomers}
                  onChange={(e) =>
                    setAnnualCustomers(Number(e.target.value))
                  }
                />
              </div>
              <ReactSlider
                className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
                thumbClassName="h-6 w-6 bg-black rounded-full border border-white border-[3px] drop-shadow-lg"
                trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
                value={annualCustomers}
                min={0}
                max={200000}
                onChange={(value) => setAnnualCustomers(value)}
              />
              <p className="text-sm mt-4">
                How many customers does your brand have annually?
              </p>
            </div>

            {/* Profit Margin */}
            <div className="shadow-xl border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <p className="font-semibold text-black">Profit Margin</p>
                <div className="relative w-32 ml-auto">
                  <input
                    type="number"
                    className="pl-10 w-full bg-vulcan-900 border px-4 text-right text-white rounded-md"
                    value={ProfitMargin}
                    onChange={(e) =>
                      setProfitMargin(Number(e.target.value))
                    }
                  />
                  <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white">
                    %
                  </span>
                </div>
              </div>
              <ReactSlider
                className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
                thumbClassName="h-6 w-6 bg-black rounded-full border border-white border-[3px] drop-shadow-lg"
                trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
                value={ProfitMargin}
                min={0}
                max={100}
                onChange={(value) => setProfitMargin(value)}
              />
              <p className="text-sm mt-4">What is your profit margin?</p>
            </div>

            {/* Average Order Value (AOV) */}
            <div className="shadow-xl border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <p className="font-semibold text-black">AOV </p>
                <div className="relative w-32 ml-auto">
                  <input
                    type="number"
                    className="pl-10 w-full bg-vulcan-900 border px-4 text-right text-white rounded-md"
                    value={Aov}
                    onChange={(e) => setAov(Number(e.target.value))}
                  />
                  <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white">
                    $
                  </span>
                </div>
              </div>
              <ReactSlider
                className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
                thumbClassName="h-6 w-6 bg-black rounded-full border border-white border-[3px] drop-shadow-lg"
                trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
                value={Aov} // Corrected the value here
                min={0}
                max={10000}
                onChange={(value) => setAov(value)} // Corrected the onChange handler
              />
              <p className="text-sm mt-4">What is your average order value?</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-[#202130] bg-cover px-10 py-8 rounded-tr-md rounded-br-md">
            <p className="p-4 text-2xl rounded-lg text-center border border-white/60 bg-black font-bold text-white mb-4">
              ${averageOrder}
            </p>
            <p className="text-xl text-white text-center mb-4">
              Average Order per Customer
            </p>
            <p className="text-sm text-center text-white mb-6">
              Purchases per customer is the metric that is typically most
              impacted by a loyalty program. Programs can be designed to focus
              on increasing repeat purchase rate, decreasing time to second
              purchase, and more.
            </p>
            <div className="py-4">
              <button
                type="button"
                className="w-full raise relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                onClick={goToNextStep}
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
    </section>
  );
};

export default LoyaltyROICalculator;
