import React, { useState } from "react";

const ResultsSection = ({ userInputs = {}, goBack }) => {
  const [showPopup, setShowPopup] = useState(false);

  const {
    annualOrders = 0,
    annualCustomers = 0,
    ProfitMargin = 0,
    Aov = 0,
    selectedIndustry = {},
  } = userInputs;

  const industryPrice = selectedIndustry.value || 0;

  console.log(selectedIndustry, "selected price");

  // Calculate revenue and profit impact
  const annualRevenue = Aov * annualOrders;
  const profit = (annualRevenue * ProfitMargin) / 100;
  const growth =
    annualRevenue + (annualRevenue * (selectedIndustry.growth || 0)) / 100;
  const cost = industryPrice * 12;
  const Roi = ((growth - cost) / cost) * 100;
  const profitImpact = (growth * ProfitMargin) / 100 - cost;
  const finalProfit = profitImpact;

  // Check if finalProfit is less than profit
  React.useEffect(() => {
    if (finalProfit < profit) {
      setShowPopup(true);
    }
  }, [finalProfit, profit]);

  // Formatter for US conventions
  const formatNumber = (value) =>
    new Intl.NumberFormat("en-US", { style: "decimal" }).format(value);

  return (
    <section className="lg:p-0">
      <div className="mt-4 pb-6">
        <button
          onClick={goBack}
          className="w-32 raise bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6] text-white px-6 py-2 rounded-md font-medium"
        >
          Back
        </button>
      </div>
      <div className="lg:max-w-7xl col-span-1 lg:col-span-1 bg-white rounded-lg lg:mx-0 hover:shadow-lg transition-shadow duration-300 group">
        <div className="grid px-6 pb-6">
          <div className="">
            <p className="px-8 mt-8 font-semibold text-2xl lg:float-left text-black">
              Your Inputs
            </p>
            <div className="grid lg:grid-cols-4 gap-8 lg:px-6 lg:float-left mt-6 lg:mr-auto w-full">
              <div className="col-span-1 shadow-xl border rounded-lg p-6 mb-0 h-28 w-64 lg:w-full">
                <p className="px-2 text-black text-left rounded-md">
                  Annual Orders
                </p>
                <p className="p-2 text-black font-semibold rounded-md">
                  {formatNumber(annualOrders)}
                </p>
              </div>
              <div className="shadow-xl border rounded-lg p-6 mb-0 h-28 w-64 lg:w-full">
                <p className="px-2 text-black text-left rounded-md">
                  Annual Customers
                </p>
                <p className="p-2 text-black font-semibold rounded-md">
                  {formatNumber(annualCustomers)}
                </p>
              </div>
              <div className="col-span-1 shadow-xl border rounded-lg p-6 mb-0 h-28 w-64 lg:w-full">
                <p className="px-2 text-black text-left rounded-md">AOV</p>
                <p className="p-2 text-black font-semibold rounded-md">
                  ${formatNumber(Aov.toFixed(2))}
                </p>
              </div>
              <div className="shadow-xl border rounded-lg p-6 mb-0 h-28 w-64 lg:w-full">
                <p className="px-2 text-black text-left rounded-md">
                  Profit Margin
                </p>
                <p className="p-2 text-black font-semibold rounded-md">
                  {formatNumber(ProfitMargin)}%
                </p>
              </div>
            </div>
          </div>
          <div className="grid col-span-1 gap-16 mt-12 lg:px-12 pb-4">
            <div className="lg:mr-auto px-8 w-full item-center border py-8 rounded-lg">
              <p className="text-black justify-center">Annual Revenue</p>
              <div className="item-center mt-2">
                <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                  ${formatNumber(annualRevenue.toFixed(2))}
                </p>
              </div>
              <p className="mt-8 text-black">Profit without 99minds</p>
              <div className="item-center mt-2">
                <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                  ${formatNumber(profit.toFixed(2))}
                </p>
              </div>
              <p className="mt-8 text-black">Profit Impact with 99minds</p>
              <div className="item-center mt-2">
                <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                  ${formatNumber(finalProfit.toFixed(2))}
                </p>
              </div>
              <p className="mt-8 text-black">
                Return on Investment with 99minds
              </p>
              <div className="item-center mt-2">
                <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                  {formatNumber(Roi.toFixed(2))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl font-bold text-red-500">
              Final profit is less than the current profit!
            </p>
            <p className="text-black">Please choose a different plan.</p>
            <button
              onClick={goBack}
              className="w-32 raise bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6] text-white px-6 py-2 rounded-md font-medium"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultsSection;
