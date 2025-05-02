import { useState, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function ModernWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "Trigger",
      description: "When order status is updated to paid",
      label: "Set up Trigger",
      icon: <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">1</div>
    },
    {
      title: "Conditions",
      description: "If total value of order is greater than $50",
      label: "Logic Conditions",
      icon: <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">2</div>
    },
    {
      title: "Action",
      description: "Send a text/email message with a discount gift card",
      label: "Execute Action",
      icon: <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full">3</div>
    }
  ];

  return (
    <div className="px-6 py-16 mx-auto max-w-7xl md:px-12 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">How it works</h2>
        <p className="mt-4 text-xl text-gray-600">Automate your workflow in three simple steps</p>
      </div>
      
      <div className="flex justify-center mb-10">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <button 
                onClick={() => setActiveStep(index)}
                className={`transition-all duration-300 ${
                  index === activeStep ? "scale-110" : "opacity-70"
                }`}
              >
                <div className={`rounded-full w-4 h-4 ${
                  index <= activeStep ? "bg-indigo-600" : "bg-gray-300"
                }`}>
                  {index < activeStep && (
                    <Check className="text-white w-4 h-4" />
                  )}
                </div>
              </button>
              
              {index < steps.length - 1 && (
                <div className={`h-1 w-16 mx-2 transition-colors duration-500 ${
                  index < activeStep ? "bg-indigo-600" : "bg-gray-300"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 relative">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`transform transition-all duration-500 w-full md:w-80 
            ${activeStep === index ? "scale-105 z-10" : "scale-95 opacity-70"}
            ${activeStep > index ? "-translate-x-4 md:translate-x-0" : ""}
            ${activeStep < index ? "translate-x-4 md:translate-x-0" : ""}
            `}
          >
            <div className={`rounded-xl bg-white shadow-lg overflow-hidden border border-gray-100 h-full transition-shadow duration-300 ${
              activeStep === index ? "shadow-xl" : ""
            }`}>
              <div className={`h-2 w-full ${
                index === 0 ? "bg-blue-500" :
                index === 1 ? "bg-indigo-500" :
                "bg-violet-500"
              }`}></div>
              <div className="p-8">
                <div className="flex justify-between items-center">
                  {step.icon}
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{step.label}</span>
                </div>
                
                <h3 className="text-xl font-semibold mt-6 text-gray-900">{step.title}</h3>
                <p className="mt-4 text-gray-600">{step.description}</p>
                
                {activeStep === index && (
                  <div className="mt-6 flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* <div className="flex justify-center mt-12 gap-4">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeStep === index ? "bg-indigo-600 w-8" : "bg-gray-300"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}