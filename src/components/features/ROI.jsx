import React, { useState } from "react";
import LoyaltyROICalculator from "./ROI1";
import IndustryMarginForm from "./ROI2";

const ROICalculator = () => {
  // State to manage the current step
  const [currentStep, setCurrentStep] = useState(1);

  // Function to go to the next step
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <section className="lg:p-16 border-t border-y border-white/5">
      <div className="flex lg:flex-row flex-col items-stretch grid grid-cols-1 lg:grid-cols-3 gap-5 mx-auto max-w-7xl py-12 lg:px-0 md:px-0 px-6 sm:px-4 w-full">
        {/* Left Section */}
        <div className="py-6 items-center rounded-lg mx-0 transition-shadow duration-300 flex flex-col">
          <h2 className="px-16 font-semibold lg:text-left text-center">Loyalty ROI Calculator</h2>
          <p className="px-16 mt-4 text-center text-base lg:text-left">
            Savvy brands are doubling down on Loyalty & Referrals to offset rising acquisition costs. But what’s the bottom line of implementing these solutions on your site? Based on metrics from thousands of Yotpo Loyalty & Referrals programs, this calculator is designed to show you the revenue uplift you can potentially see from a strategic Loyalty & Referrals program.
          </p>
        </div>

        {/* Middle Section */}
        <div className="lg:max-w-4xl col-span-1 lg:col-span-2 border border-vulcan-700 bg-white rounded-lg mx-4 lg:mx-0 hover:shadow-lg transition-shadow duration-300 group flex flex-col">
          {/* Conditional rendering based on currentStep */}
          {currentStep === 1 && (
            <LoyaltyROICalculator goToNextStep={goToNextStep} />
          )}

          {currentStep === 2 && <IndustryMarginForm />}
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
