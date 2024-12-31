import React, { useState } from "react";
import { industries } from "../../config/RoiConfig";

const IndustryMarginForm = ({
  userInputs,
  updateInputs,
  goToNextStep,
  goBack,
}) => {
  const { selectedIndustry } = userInputs;

  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userName, setUserName] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const [errors, setErrors] = useState({});

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!validateEmail(event.target.value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
    } else {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  };

  const handleCompanyNameChange = (event) => {
    const value = event.target.value;
    setCompanyName(value);
    if (hasNumbers(value)) {
      setErrors((prev) => ({
        ...prev,
        companyName: "Company name should not contain numbers.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, companyName: null }));
    }
  };

  const handleUserNameChange = (event) => {
    const value = event.target.value;
    setUserName(value);
    if (hasNumbers(value)) {
      setErrors((prev) => ({
        ...prev,
        userName: "Name should not contain numbers.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, userName: null }));
    }
  };

  const handleIndustrySelect = (industry) => {
    updateInputs("selectedIndustry", industry);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const hasNumbers = (input) => {
    return /\d/.test(input);
  };

  const handleCalculate = async () => {
    setShowResult(true);

    const formData = new URLSearchParams();
    formData.append("userName", userName);
    formData.append("companyName", companyName);
    formData.append("email", email);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzN7MG7oQv9eQmMJEuDYrU2mGl8LaCFLR3UfV1TUJIA_YVrQEFtp1LooDsBkVIheXo3fg/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Data saved successfully", result);
      } else {
        console.error("Failed to save data:", result.message);
      }
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
    }
  };

  return (
    <div>
      {!showResult ? (
        <>
          <div className="py-2">
            <button
              type="button"
              className="w-32 raise relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
              onClick={goBack}
            >
              <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
              <span className="w-full relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400 font-medium">
                <span className="relative text-white">Back</span>
              </span>
            </button>
          </div>
          <div className="mt-4 py-10 grid lg:grid-cols-3 justify-between w-full mx-auto p-6 space-y-6 border border-opacity-70 border-white/20 bg-white bg-cover rounded-lg">
            <div className="space-y-4 col-span-2 px-4">
              <p className="text-xl font-semibold text-black">Pricing Plan:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] px-4">
                {industries.map((industry, index) => (
                  <button
                    key={index}
                    className={`h-44 flex flex-col items-center text-center p-3 rounded-lg transition-colors ${
                      selectedIndustry === industry.id
                        ? "bg-[#F7D691] shadow shadow-md"
                        : "bg-white text-black border shadow shadow-md"
                    }`}
                    onClick={() => handleIndustrySelect(industry.id)}
                  >
                    <span className="mt-6 text-lg font-medium text-center">
                      {industry.id.name}
                    </span>
                    <span className="border rounded-xl bg-vulcan-700 py-2 px-8 mt-6 text-xl text-white font-semibold text-center">
                      {industry.id.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid col-span-1 px-4">
              <div className="gap-4 bg-vulcan-800 lg:p-6 rounded-lg mt-6 border border-white/10">
                <div className="flex-1 mt-6 px-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2 border rounded-lg px-4"
                    value={userName}
                    onChange={handleUserNameChange}
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-md mt-3">
                      {errors.userName}
                    </p>
                  )}
                </div>
                <div className="p-4 mt-3">
                  <input
                    type="text"
                    placeholder="Your Company Name"
                    className="w-full p-2 border rounded-lg px-4"
                    value={companyName}
                    onChange={handleCompanyNameChange}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-md mt-3">
                      {errors.companyName}
                    </p>
                  )}
                </div>
                <div className="flex-1 mt-3 pb-4 px-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 border rounded-lg px-4"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-md mt-3">{errors.email}</p>
                  )}
                </div>

                <div className="px-4 lg:pb-0 pb-4 mt-3">
                  <button
                    className="bg-blue-600 font-semibold text-white px-8 py-2 rounded-lg"
                    onClick={() => {
                      handleCalculate();

                      goToNextStep();
                    }}
                    disabled={
                      !selectedIndustry ||
                      !email ||
                      !userName ||
                      !companyName ||
                      errors.userName ||
                      errors.companyName
                    }
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-white">
          <p>{result}</p>
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
