import React, { useState } from "react";
import LoyaltyROICalculator from "./ROI1";
import IndustryMarginForm from "./ROI2";
import ResultsSection from "./ROI3";


const ROICalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInputs, setUserInputs] = useState({
    annualOrders: 10000,
    annualCustomers: 5000,
    ProfitMargin: 20,
    averageOrder:0,
    Aov:50,
    selectedIndustry: "",
  });

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // const updateInputs = (key, value) => {
  //   setUserInputs((prevInputs) => ({
  //     ...prevInputs,
  //     [key]: value,
  //   }));
  // };
  const updateInputs = React.useCallback((key, value) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  }, []);
  

  return (
    <section className="lg:px-16 py-0 border-t border-y border-white/5">
      <div className="items-stretch gap-5 mx-auto max-w-7xl py-12 lg:px-0 md:px-0 px-6 sm:px-4 w-full">
        {/* Left Section */}
        <div className="py-6 items-center rounded-lg mx-0 transition-shadow duration-300">
          <h2 className="px-0 font-semibold lg:text-left text-center">
            Loyalty ROI Calculator
          </h2>
          <p className="px-0 mt-4 text-center text-base lg:text-left">
            Calculate the potential revenue uplift from a Loyalty & Referrals program.
          </p>
        </div>

        {/* Middle Section */}
        <div className="lg:max-w-7xl mt-2 col-span-1 lg:col-span-1 rounded-lg mx-4 lg:mx-0 hover:shadow-lg transition-shadow duration-300 group flex flex-col">
          {currentStep === 1 && (
            <LoyaltyROICalculator
              userInputs={userInputs}
              updateInputs={updateInputs}
              goToNextStep={goToNextStep}
            />
          )}
          {currentStep === 2 && (
            <IndustryMarginForm
              userInputs={userInputs}
              updateInputs={updateInputs}
              goToNextStep={goToNextStep}
              goBack={goBack}
            />
          )}
          {currentStep === 3 && (
            <ResultsSection
              userInputs={userInputs}
              goBack={goBack}
            />
          )}
        </div>
      </div>
    </section>
  );
};



export default ROICalculator;
