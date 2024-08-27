import React, { useState } from 'react';
// import Layout from "./components/Layout";
import LoyaltyWidget from "../../components/LoyaltyWidget/index";
import BusinessType from "../../components/LoyaltyWidget/BusinessType";
import Goals from "../../components/LoyaltyWidget/Goals";
import Incentivize from "../../components/LoyaltyWidget/Incentivize";
import CustomTemplates from "../../components/LoyaltyWidget/CustomTemplates";
import LoyaltyProgram from "../../components/LoyaltyWidget/LoyaltyProgram";
import { ColorProvider, OptionProvider } from '../../components/LoyaltyWidget/OptionContext';
import ProfitImpactCalculator from '../../components/LoyaltyWidget/ProfitImpactCalculator';

import {
  SeoHead,
} from "../../components";
import {
  LOYALTYWIDGET_SEO_HEAD,
} from "../../config";

const Loyalty = () => {
  const [currentStep, setCurrentStep] = useState(1); // Initialize with the first step

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedBusinessType, setSelectedBusinessType] = useState('');

  // Function to handle the selected business type
  const handleBusinessTypeSelect = (type) => {
    setSelectedBusinessType(type);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Render components based on the current step
  let content;
  switch (currentStep) {
    case 1:
      content = (
        <>
          <LoyaltyWidget />
          <BusinessType onBusinessTypeSelect={handleBusinessTypeSelect} handleNextStep={handleNextStep}/>
        </>
      )
      break;
   
    case 2:
      content = (
          <Goals handleNextStep={handleNextStep} handlePrevStep={handlePrevStep}/>
      );
      break;
    case 3:
      content = (
          <Incentivize selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />
      );
      break;
    case 4:
      content = (
          <CustomTemplates handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />
      );
      break;
    case 5:
      content = (
        <>
          <LoyaltyProgram selectedOptions={selectedOptions} handlePrevStep={handlePrevStep} selectedBusinessType={selectedBusinessType} />
          <ProfitImpactCalculator handlePrevStep={handlePrevStep}/>
        </>
      );
      break;
    default:
      content = <div>Invalid step</div>;
      
  }
  console.log("state",currentStep)
  return (
    
      <OptionProvider>
        <ColorProvider>
          {content}
        </ColorProvider>
      </OptionProvider>
  );
};
export default Loyalty;

