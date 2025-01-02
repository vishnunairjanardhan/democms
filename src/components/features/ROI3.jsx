import React from "react";

const ResultsSection = ({ userInputs = {}, goBack }) => {
  const {
    annualOrders = 0,
    annualCustomers = 0,
    ProfitMargin = 0,
    Aov = 0,
    selectedIndustry = {},
  } = userInputs;

  // Default to 0 if selectedIndustry.price is not defined
  const industryPrice = selectedIndustry.value;

  console.log(selectedIndustry, "selected price");

  // Calculate revenue and profit impact
  const annualRevenue = (Aov * annualOrders);
  const profit = ((annualRevenue * ProfitMargin) / 100);
  const growth = annualRevenue+(annualRevenue*selectedIndustry.growth/100);
  // Handle cost and ROI calculation safely
  const cost = industryPrice * 12;
  const Roi =(((growth - cost) / cost) * 100) ;
  const profitImpact = ((growth*ProfitMargin/100) - cost);
  const finalProfit = profitImpact + profit

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
              <div className="col-span-1 shadow-xl border rounded-lg p-6 mb-0 h-28 w-64 lg:w-full">
                <p className="px-2 text-black text-left rounded-md">AOV</p>
                <p className="p-2 text-black font-semibold rounded-md">
                  ${Aov.toFixed(2)}
                </p>
              </div>
              <div className="shadow-xl border rounded-lg p-6 mb-0 h-28 w-64 lg:w-full">
                <p className="px-2 text-black text-left rounded-md">Profit Margin</p>
                <p className="p-2 text-black font-semibold rounded-md">
                  {ProfitMargin}%
                </p>
              </div>
            </div>
          </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-1 mt-6 lg:px-8 pb-0">
            <div className="lg:mr-auto px-8 w-full item-center py-0 rounded-lg">
              <p className="text-black justify-center">Annual Revenue</p>
              <div className="item-center mt-2">
                <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                  ${annualRevenue.toFixed(2)}
                </p>
              </div>
            </div>  
            <div className="px-8 ">
              <p className="text-black">Profit without 99minds</p>
              <div className="item-center mt-2">
                <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                  ${profit.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4 mt-4 lg:px-8 pb-8">  
            <div className="px-8">  
              <p className="mt-2 text-black">Profit Impact with 99minds</p>
              <div className="item-center mt-2">
                <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                  ${finalProfit.toFixed(2)}
                </p>
              </div>
            </div> 
            <div className="px-8"> 
              <p className="mt-2 text-black">Return on Investment with 99minds</p>
              <div className="item-center mt-2">
                <p className="w-full pt-5 h-20 bg-gray-800 text-center text-white text-3xl font-semibold rounded-md">
                  ${Roi.toFixed(2)}
                </p>
              </div>
            </div>  
          </div>
          </div>
        
      
    </section>
  );
};

export default ResultsSection;
