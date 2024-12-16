import React, { useState } from "react";
import { industries } from "../../config/RoiConfig";

const IndustryMarginForm = (goBack) => {
  const [selectedMargin, setSelectedMargin] = useState("<10%");
  const [email, setEmail] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  

  const handleMarginChange = (event) => {
    setSelectedMargin(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
  };

  const handleCalculate = () => {
    // Mock calculation logic
    const calculationResult = `Your selected industry is ${selectedIndustry}, your margin range is ${selectedMargin}, and your email is ${email}.`;
    setResult(calculationResult);
    setShowResult(true);
  };

  return (
      <div className="w-full mx-auto p-6 space-y-6 border bg-[#202130] bg-cover rounded-lg mt-18">
        {!showResult ? (
          <>
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="space-y-4">
                <p className="text-lg font-semibold text-gray-200">Industry:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {industries.map((industry, index) => (
                    <button
                      key={index}
                      className={`flex flex-col items-center p-4 border hover:bg-gray-500 transition-colors ${selectedIndustry === industry.name ? 'bg-gray-500' : ''}`}
                      style={{
                        border: "1px solid #e7edf7",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all .4s",
                      }}
                      onClick={() => handleIndustrySelect(industry.name)}
                    >
                      <div className="flex items-center justify-center text-navy-900">
                        {industry.imageSrc(
                          <img
                            src={industry.imageSrc}
                            alt={industry.name}
                            className="w-12 h-12 object-contain"
                          />
                        )}
                      </div>
                      <span className="mt-2 text-sm text-center text-gray-200">{industry.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
              <button
                  type="button"
                  className="w-full raise relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                  onClick={goBack}
                >
                  <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                  <span className="w-full relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400 font-medium">
                  <span className="relative text-white">Back</span>
                  </span>
                </button>
                <p className="text-lg font-semibold text-gray-200 whitespace-nowrap mt-2">
                  Your gross margin:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {["<10%", "10%-20%", "20%-30%", "30%-50%", "50%-70%", "70+%"].map((margin) => (
                    <div key={margin} className="flex items-center space-x-2 text-gray-100">
                      <input
                        type="radio"
                        id={margin}
                        name="margin"
                        value={margin}
                        checked={selectedMargin === margin}
                        onChange={handleMarginChange}
                      />
                      <label htmlFor={margin}>{margin}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 bg-gray-100 p-6 rounded-lg">
              <div className="flex-1 ">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-2 border rounded-lg"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <button
                className="bg-blue-600 font-semibold text-white px-8 py-2 rounded-lg "
                onClick={handleCalculate}
                disabled={!selectedIndustry || !email}
              >
                Calculate
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-white">
            <p className="text-lg text-white font-bold">Calculation Result</p>
            <p className="mt-4">{result}</p>
            <button
              className="bg-blue-600 font-semibold text-white px-8 py-2 rounded-lg mt-6"
              onClick={() => setShowResult(false)}
            >
              Reset
            </button>
          </div>
        )}
      </div>
  );
};

export default IndustryMarginForm;
