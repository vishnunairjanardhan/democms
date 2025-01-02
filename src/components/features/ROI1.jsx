// import React, { useState, useEffect } from "react";
// import ReactSlider from "react-slider";

// const LoyaltyROICalculator = ({ userInputs, updateInputs, goToNextStep }) => {
//   const { annualOrders, annualCustomers, ProfitMargin, Aov } = userInputs;

//   useEffect(() => {
//     if (annualCustomers > 0) {
//       updateInputs("averageOrder", (annualOrders / annualCustomers).toFixed(2));
//     } else {
//       updateInputs("averageOrder", 0);
//     }
//   }, [annualOrders, annualCustomers, updateInputs]);
  

//   return (
//     <section className="border-t border-y border-white/5">
//       {/* Middle Section */}
//       <div className="lg:max-w-7xl col-span-1 lg:col-span-2 bg-white rounded-lg lg:mx-0 hover:shadow-lg transition-shadow duration-300 group flex flex-col">
//         <div className="grid lg:grid-cols-3">
//           {/* Left Section */}
//           <div className="lg:col-span-1 pt-8 pl-4 pr-8">
//             {/* Annual Orders */}
//             <div className="shadow-xl border rounded-lg p-6 mb-0 lg:h-44">
//               <div className="flex items-center mb-4">
//                 <p className="font-semibold text-black">Your annual orders</p>
//                 <input
//                   type="number"
//                   className="w-32 bg-vulcan-900 border px-4 float-right ml-auto text-right text-white rounded-md"
//                   value={annualOrders}
//                   onChange={(e) =>
//                     updateInputs("annualOrders", Number(e.target.value))
//                   }
//                 />
//               </div>
//               <ReactSlider
//                 className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
//                 thumbClassName="h-6 w-6 bg-black rounded-full border border-white border-[3px] drop-shadow-lg"
//                 trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
//                 value={annualOrders}
//                 min={0}
//                 max={1000000}
//                 onChange={(value) => updateInputs("annualOrders", value)}
//               />
//               <p className="text-sm mt-4">
//                 How many orders does your brand process per year?
//               </p>
//             </div>

//             {/* Annual Customers */}
//             <div className="shadow-xl border rounded-lg p-6 mb-0 lg:h-44 mt-8">
//               <div className="flex items-center mb-4">
//                 <p className="font-semibold text-black">
//                   Your annual customers
//                 </p>
//                 <input
//                   type="number"
//                   className="w-32 bg-vulcan-900 border px-4 float-right ml-auto text-right text-white rounded-md"
//                   value={annualCustomers}
//                   onChange={(e) =>
//                     updateInputs("annualCustomers", Number(e.target.value))
//                   }
//                 />
//               </div>
//               <ReactSlider
//                 className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
//                 thumbClassName="h-6 w-6 bg-black rounded-full border border-white border-[3px] drop-shadow-lg"
//                 trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
//                 value={annualCustomers}
//                 min={0}
//                 max={200000}
//                 onChange={(value) =>
//                   updateInputs("annualCustomers", value)
//                 }
//               />
//               <p className="text-sm mt-4">
//                 How many customers does your brand have annually?
//               </p>
//             </div>
//           </div>
//           <div className="col-span-1 pt-8 pl-4 pr-8">
//             {/* Profit Margin */}
//             <div className="shadow-xl border rounded-lg p-6 h-44">
//               <div className="flex items-center mb-4">
//                 <p className="font-semibold text-black">Profit Margin</p>
//                 <div className="relative w-32 ml-auto">
//                   <input
//                     type="number"
//                     className="pl-10 w-full bg-vulcan-900 border px-4 text-right text-white rounded-md"
//                     value={ProfitMargin}
//                     onChange={(e) =>
//                       updateInputs("ProfitMargin", Number(e.target.value))
//                     }
//                   />
//                   <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white">
//                     %
//                   </span>
//                 </div>
//               </div>
//               <ReactSlider
//                 className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
//                 thumbClassName="h-6 w-6 bg-black rounded-full border border-white border-[3px] drop-shadow-lg"
//                 trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
//                 value={ProfitMargin}
//                 min={0}
//                 max={100}
//                 onChange={(value) =>
//                   updateInputs("ProfitMargin", value)
//                 }
//               />
//               <p className="text-sm mt-4">What is your profit margin?</p>
//             </div>

//             {/* Average Order Value (AOV) */}
//             <div className="shadow-xl border rounded-lg p-6 mt-8 h-44">
//               <div className="flex items-center mb-4">
//                 <p className="font-semibold text-black">AOV </p>
//                 <div className="relative w-32 ml-auto">
//                   <input
//                     type="number"
//                     className="pl-10 w-full bg-vulcan-900 border px-4 text-right text-white rounded-md"
//                     value={Aov}
//                     onChange={(e) =>
//                       updateInputs("Aov", Number(e.target.value))
//                     }
//                   />
//                   <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white">
//                     $
//                   </span>
//                 </div>
//               </div>
//               <ReactSlider
//                 className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
//                 thumbClassName="h-6 w-6 bg-black rounded-full border border-white border-[3px] drop-shadow-lg"
//                 trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
//                 value={Aov} // Corrected the value here
//                 min={0}
//                 max={10000}
//                 onChange={(value) => updateInputs("Aov", value)}
//               />
//               <p className="text-sm mt-4">What is your average order value?</p>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="bg-[#202130] bg-cover px-20 py-8 rounded-tr-md rounded-br-md">
//             <p className="p-4 text-3xl rounded-lg text-center border border-white/60 bg-black font-bold text-white mb-4">
//             {userInputs.averageOrder}
//             </p>
//             <p className="text-xl text-white text-center mt-6">
//               Average Order per Customer
//             </p>
//             <p className="text-sm text-center text-white mt-2 mb-4">
//               Purchases per customer is the metric that is typically most
//               impacted by a loyalty program. Programs can be designed to focus
//               on increasing repeat purchase rate, decreasing time to second
//               purchase, and more.
//             </p>
//             <div className="py-4">
//               <button
//                 type="button"
//                 className="w-full raise relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
//                 onClick={goToNextStep}
//               >
//                 <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
//                 <span className="w-full relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400 font-medium">
//                   <span className="relative text-white">Next</span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LoyaltyROICalculator;


import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";

const LoyaltyROICalculator = ({ userInputs, updateInputs, goToNextStep }) => {
  const { annualOrders, annualCustomers, ProfitMargin, Aov } = userInputs;
  
  // State to store error messages for validation
  const [errors, setErrors] = useState({
    annualOrders: "",
    annualCustomers: "",
    ProfitMargin: "",
    Aov: ""
  });

  const formatNumber = (value) => {
    return value ? value.toLocaleString("en-US") : "";
  };

  const parseNumber = (value) => {
    return Number(value.replace(/,/g, ""));
  };

  // Validation function
  const validateInputs = () => {
    let isValid = true;
    let newErrors = { ...errors };

    if (annualOrders <= 0) {
      newErrors.annualOrders = "Annual orders must be greater than 0.";
      isValid = false;
    } else {
      newErrors.annualOrders = "";
    }

    if (annualCustomers <= 0) {
      newErrors.annualCustomers = "Annual customers must be greater than 0.";
      isValid = false;
    } else {
      newErrors.annualCustomers = "";
    }

    if (ProfitMargin <= 0) {
      newErrors.ProfitMargin = "Profit margin must be greater than 0.";
      isValid = false;
    } else {
      newErrors.ProfitMargin = "";
    }

    if (Aov <= 0) {
      newErrors.Aov = "AOV must be greater than 0.";
      isValid = false;
    } else {
      newErrors.Aov = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle button click
  const handleNextClick = () => {
    if (validateInputs()) {
      goToNextStep(); // Only go to the next step if inputs are valid
    }
  };

  useEffect(() => {
    if (annualCustomers > 0) {
      updateInputs("averageOrder", (annualOrders / annualCustomers).toFixed(2));
    } else {
      updateInputs("averageOrder", 0);
    }
  }, [annualOrders, annualCustomers, updateInputs]);

  return (
    <section className="border-t border-y border-white/5">
      {/* Middle Section */}
      <div className="lg:max-w-7xl col-span-1 lg:col-span-2 bg-white rounded-lg lg:mx-0 hover:shadow-lg transition-shadow duration-300 group flex flex-col">
        <div className="grid lg:grid-cols-3">
          {/* Left Section */}
          <div className="lg:col-span-1 pt-8 pl-4 pr-8">
            {/* Annual Orders */}
            <div className="shadow-xl border rounded-lg p-6 mb-0 lg:h-44">
              <div className="flex items-center mb-4">
                <p className="font-semibold text-black">Your annual orders</p>
                <input
                  type="text"
                  className="w-32 bg-vulcan-900 border px-4 float-right ml-auto text-right text-white rounded-md"
                  value={formatNumber(annualOrders)}
                  onChange={(e) =>
                    updateInputs("annualOrders", parseNumber(e.target.value))
                  }
                />
              </div>
              <ReactSlider
                className="w-full h-2 bg-gray-200 rounded-lg relative flex items-center"
                thumbClassName="h-6 w-6 bg-black rounded-full border border-white border-[3px] drop-shadow-lg"
                trackClassName="h-2 bg-gradient-to-r rounded-full from-[#ff8a05] to-[#ff5478]"
                value={annualOrders}
                min={0}
                max={1000000}
                onChange={(value) => updateInputs("annualOrders", value)}
              />
              <p className="text-sm mt-4">
                How many orders does your brand process per year?
              </p>
              {errors.annualOrders && (
                <p className="text-red-500 text-sm">{errors.annualOrders}</p>
              )}
            </div>

            {/* Annual Customers */}
            <div className="shadow-xl border rounded-lg p-6 mb-0 lg:h-44 mt-8">
              <div className="flex items-center mb-4">
                <p className="font-semibold text-black">
                  Your annual customers
                </p>
                <input
                  type="text"
                  className="w-32 bg-vulcan-900 border px-4 float-right ml-auto text-right text-white rounded-md"
                  value={formatNumber(annualCustomers)}
                  onChange={(e) =>
                    updateInputs("annualCustomers", parseNumber(e.target.value))
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
                onChange={(value) =>
                  updateInputs("annualCustomers", value)
                }
              />
              <p className="text-sm mt-4">
                How many customers does your brand have annually?
              </p>
              {errors.annualCustomers && (
                <p className="text-red-500 text-sm">{errors.annualCustomers}</p>
              )}
            </div>
          </div>
          <div className="col-span-1 pt-8 pl-4 pr-8">
            {/* Profit Margin */}
            <div className="shadow-xl border rounded-lg p-6 h-44">
              <div className="flex items-center mb-4">
                <p className="font-semibold text-black">Profit Margin</p>
                <div className="relative w-32 ml-auto">
                  <input
                    type="text"
                    className="pl-10 w-full bg-vulcan-900 border px-4 text-right text-white rounded-md"
                    value={formatNumber(ProfitMargin)}
                    onChange={(e) =>
                      updateInputs("ProfitMargin", parseNumber(e.target.value))
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
                onChange={(value) =>
                  updateInputs("ProfitMargin", value)
                }
              />
              <p className="text-sm mt-4">What is your profit margin?</p>
              {errors.ProfitMargin && (
                <p className="text-red-500 text-sm mt-2">{errors.ProfitMargin}</p>
              )}
            </div>

            {/* Average Order Value (AOV) */}
            <div className="shadow-xl border rounded-lg p-6 mt-8 h-44">
              <div className="flex items-center mb-4">
                <p className="font-semibold text-black">AOV </p>
                <div className="relative w-32 ml-auto">
                  <input
                    type="text"
                    className="pl-10 w-full bg-vulcan-900 border px-4 text-right text-white rounded-md"
                    value={formatNumber(Aov)}
                    onChange={(e) =>
                      updateInputs("Aov", parseNumber(e.target.value))
                    }
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
                onChange={(value) => updateInputs("Aov", value)}
              />
              <p className="text-sm mt-4">What is your average order value?</p>
              {errors.Aov && (
                <p className="text-red-500 text-sm mt-2">{errors.Aov}</p>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-[#202130] bg-cover px-20 py-8 rounded-tr-md rounded-br-md">
            <p className="p-4 text-3xl rounded-lg text-center border border-white/60 bg-black font-bold text-white mb-4">
              {userInputs.averageOrder}
            </p>
            <p className="text-xl text-white text-center mt-6">
              Average Order per Customer
            </p>
            <p className="text-sm text-center text-white mt-2 mb-4">
              Purchases per customer is the metric that is typically most
              impacted by a loyalty program. Programs can be designed to focus
              on increasing repeat purchase rate, decreasing time to second
              purchase, and more.
            </p>
            <div className="py-4">
              <button
                type="button"
                className="w-full raise relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                onClick={handleNextClick} // Button click handler
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
