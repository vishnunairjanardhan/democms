import React from "react";

const ResultsSection = ({ userInputs = {}, goBack }) => {
  const { annualOrders = 0, annualCustomers = 0, ProfitMargin = 0, Aov = 0, selectedIndustry="" } = userInputs;
 

  console.log(selectedIndustry, "selected price");
  
  // Calculate revenue and profit impact
  const annualRevenue = (Aov * annualOrders).toFixed(2);
    
  const profitImpact = ((annualRevenue * ProfitMargin) / 100).toFixed(2);
  const newRevenue = profitImpact - (selectedIndustry.price * 12);
  const growth = ((newRevenue * selectedIndustry.growth) / 100).toFixed(2);
  const profitGrowthImpact = growth + profitImpact
  
  
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
        <div className="lg:max-w-7xl col-span-1 lg:col-span-2 bg-white rounded-lg lg:mx-0 hover:shadow-lg transition-shadow duration-300 group flex flex-col">
          <div className="grid lg:grid-cols-2 pb-6">
            <div className="grid col-span-1">
            <p className="px-8 mt-6 font-semibold text-2xl lg:float-left text-black">
            Your Inputs
          </p>
              <div className="grid lg:grid-cols-2 gap-8 px-6 float-left mt-0 lg:mr-auto w-full ">
                <div className="col-span-1 shadow-xl border rounded-lg p-6 mb-0 h-28 w-64 lg:w-full">
                  <p className="px-2 text-black text-left rounded-md">Annual Orders</p>
                  <p className="p-2 text-black font-semibold rounded-md">
                    {annualOrders}
                  </p>
                </div>
                <div className="shadow-xl border rounded-lg p-6 mb-0 h-28 w-64 lg:w-full">
                  <p className="px-2 text-black text-left rounded-md">Annual Customers</p>
                  <p className="p-2 text-black font-semibold rounded-md">
                    {annualCustomers}
                  </p>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 px-6 float-left mt-6 lg:mr-auto w-full">
                <div className="col-span-1 shadow-xl border rounded-lg p-6 mb-0 h-28 w-64 lg:w-full">
                  <p className="px-2 text-black text-left rounded-md">AOV</p>
                  <p className="p-2 text-black font-semibold rounded-md">${Aov}</p>
                </div>
                <div className="shadow-xl border rounded-lg p-6 mb-0 h-28 w-64 lg:w-full">
                  <p className="px-2 text-black  text-left rounded-md">Profit Margin</p>
                  <p className="p-2 text-black font-semibold rounded-md">{ProfitMargin}%</p>
                </div>
              </div>
            </div>
            <div className="grid col-span-1 gap-16 mt-12 lg:px-12 pb-4">  
              <div className="lg:mr-auto px-8 w-full item-center border py-8 rounded-lg">
                <p className=" text-black justify-center">Annual Revenue</p>
                <div className="item-center mt-2">
                  <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                    ${annualRevenue}
                  </p>
                </div>
                <p className="mt-8 text-black">Profit Impact without 99minds</p>
                <div className="item-center mt-2">
                  <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                    ${profitImpact}
                  </p>
                </div>  
                <p className="mt-8 text-black">Profit Impact with 99minds</p>
                <div className="item-center mt-2">
                  <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                    ${profitGrowthImpact}
                  </p>
                </div>  
              </div>
            </div>
          </div>  
        </div>
      </section>
    );
  };
  
  export default ResultsSection;
  
