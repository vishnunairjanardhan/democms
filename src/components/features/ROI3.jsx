import React from "react";

const ResultsSection = ({ userInputs = {}, goBack }) => {
    const { annualOrders = 0, annualCustomers = 0, ProfitMargin = 0, Aov = 0 } = userInputs;
  
    // Calculate revenue and profit impact
    const annualRevenue = (Aov * annualOrders).toFixed(2);
    
    const profitImpact = ((annualRevenue * ProfitMargin) / 100).toFixed(2);
  
    return (
      <section className="lg:p-16 border-t border-y border-white/5">
        <div className="py-6 bg-white h-auto items-center rounded-lg mx-0 transition-shadow duration-300 flex flex-col">
          <p className="px-0 font-semibold text-2xl lg:float-left text-center text-black">
            Your Inputs
          </p>
          <div className="grid grid-cols-2 gap-12 px-6 float-left mt-8 lg:mr-auto w-full">
            <div className="col-span-1">
              <p className="px-2 text-black text-base text-left rounded-md">Annual Orders</p>
              <p className="px-2 text-black text-base font-semibold rounded-md">
                {annualOrders}
              </p>
            </div>
            <div>
              <p className="px-2 text-black text-base text-left rounded-md">Annual Customers</p>
              <p className="px-2 text-black text-base font-semibold rounded-md">
                {annualCustomers}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 px-6 float-left mt-6 lg:mr-auto w-full">
            <div className="col-span-1">
              <p className="px-2 text-black text-base text-left rounded-md">AOV</p>
              <p className="px-2 text-black text-base font-semibold rounded-md">${Aov}</p>
            </div>
            <div>
              <p className="px-2 text-black text-base text-left rounded-md">Profit Margin</p>
              <p className="px-2 text-black text-base font-semibold rounded-md">{ProfitMargin}%</p>
            </div>
          </div>
          <div className="mr-auto px-8 mt-6 w-full border-t pt-6">
            <p className="text-base text-black">Annual Revenue</p>
            <p className="w-full mt-2 h-14 bg-gray-800 text-center text-white text-2xl font-semibold rounded-md">
              ${annualRevenue}
            </p>
            <p className="mt-6 text-base text-black">Profit Impact</p>
            <p className="w-full mt-2 h-14 bg-gray-800 text-center text-white text-2xl font-semibold rounded-md">
              ${profitImpact}
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={goBack}
              className="bg-gradient-to-r from-[#ff8a05] via-[#ff5478] to-[#ff00c6] text-white px-6 py-2 rounded-md font-medium"
            >
              Back
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default ResultsSection;
  
