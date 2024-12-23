// import React, { useState } from "react";
// import { industries } from "../../config/RoiConfig";

// const IndustryMarginForm = ({goToNextStep, goBack }) => {
//   const [selectedMargin, setSelectedMargin] = useState("<10%");
//   const [email, setEmail] = useState("");
//   const [selectedIndustry, setSelectedIndustry] = useState(""); // Ensure it's a string for comparison
//   const [showResult, setShowResult] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleMarginChange = (event) => {
//     setSelectedMargin(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleIndustrySelect = (industry) => {
//     setSelectedIndustry(industry); // Save the name or unique ID
//   };

//   const handleCalculate = () => {
//     const calculationResult = `Your selected industry is ${selectedIndustry}, your margin range is ${selectedMargin}, and your email is ${email}.`;
//     setResult(calculationResult);
//     setShowResult(true);
//   };

//   return (
//     <div className="">
//       {!showResult ? (
//         <>
//           <div className="py-2">
//             <button
//               type="button"
//               className="w-32 raise relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
//               onClick={goBack}
//             >
//               <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
//               <span className="w-full relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-10 duration-400 font-medium">
//                 <span className="relative text-white">Back</span>
//               </span>
//             </button>
//           </div>
//           <div className="mt-4 lg:flex-row justify-between w-full mx-auto p-6 space-y-6 border border-opacity-70 border-white/20 bg-[#202130] bg-cover rounded-t-lg mt-18">
//             <div className="space-y-4">
//               <p className="text-lg font-semibold text-gray-200">Industry:</p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.5rem] px-4">
//                 {industries.map((industry, index) => (
//                   <button
//                     key={index}
//                     className={`h-24 flex flex-col items-center text-center p-3 rounded-lg transition-colors ${
//                       selectedIndustry === industry.name
//                         ? "bg-blue-500 text-white border-2 border-blue-500"
//                         : "bg-white text-black border border-white/10"
//                     }`}
//                     onClick={() => handleIndustrySelect(industry.name)}
//                   >
//                     <div className="flex items-center justify-center mt-1">
//                       {industry.imageSrc ? (
//                         <img
//                           src={industry.imageSrc}
//                           alt={industry.name}
//                           className="w-10 h-10 object-contain"
//                         />
//                       ) : (
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M13 3h4a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h4"
//                           />
//                         </svg>
//                       )}
//                     </div>
//                     <span className="mt-2 text-sm text-center">
//                       {industry.name}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <p className="text-lg font-semibold text-gray-200 whitespace-nowrap mt-2">
//                 Your gross margin:
//               </p>
//               <div className="grid lg:grid-cols-6 gap-10 px-4">
//                 {[
//                   "<10%",
//                   "10%-20%",
//                   "20%-30%",
//                   "30%-50%",
//                   "50%-70%",
//                   "70+%",
//                 ].map((margin) => (
//                   <div
//                     key={margin}
//                     className="flex items-center space-x-2 text-gray-100"
//                   >
//                     <input
//                       type="radio"
//                       id={margin}
//                       name="margin"
//                       value={margin}
//                       checked={selectedMargin === margin}
//                       onChange={handleMarginChange}
//                     />
//                     <label htmlFor={margin}>{margin}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-4 bg-gray-100 p-6 rounded-b-lg">
//             <div className="flex-1">
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 className="w-full p-2 border rounded-lg"
//                 value={email}
//                 onChange={handleEmailChange}
//               />
//             </div>
//             <button
//               className="bg-blue-600 font-semibold text-white px-8 py-2 rounded-lg"
//               onClick={goToNextStep}
//               // disabled={!selectedIndustry || !email}
//             >
//               Calculate
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="text-center text-white">
//           <p className="text-lg text-white font-bold">Calculation Result</p>
//           <p className="mt-4">{result}</p>
//           <button
//             className="bg-blue-600 font-semibold text-white px-8 py-2 rounded-lg mt-6"
//             onClick={() => setShowResult(false)}
//           >
//             Reset
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IndustryMarginForm;


import React, { useState } from "react";
import { industries } from "../../config/RoiConfig";

const IndustryMarginForm = ({ goToNextStep, goBack }) => {
  const [selectedMargin, setSelectedMargin] = useState("<10%");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState(""); // Added company name state
  const [userName, setUserName] = useState(""); // Added name state
  const [selectedIndustry, setSelectedIndustry] = useState(""); // Ensure it's a string for comparison
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleMarginChange = (event) => {
    setSelectedMargin(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value); // Handle company name input
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value); // Handle user name input
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry); // Save the name or unique ID
  };

  const handleCalculate = async () => {
    // First, calculate the result
    const calculationResult = `Your selected industry is ${selectedIndustry}, your margin range is ${selectedMargin}, and your email is ${email}.`;
    setResult(calculationResult); // Store the result
    setShowResult(true); // Show the result (you can display it if needed)

    // Then, send the form data to Google Sheets
    const formData = {
      userName,
      companyName,
      email,
      
    };
    
    console.log("Form data being sent:", formData); // Log the data before sending
    
    try {
      // Send POST request to Google Sheets
      const response = await fetch("https://script.google.com/macros/s/AKfycbySdbl5PGPouhSU7UzaWz4VWPThPGVGavx41RUKjC_iUvckjCi-vxp0KLiow1VJwwf7/exec", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',  // Send JSON data instead of URL encoded form data
        },
        body: JSON.stringify(formData),
        mode: 'no-cors'
        // Convert the form data to JSON
      });
    
      const result = await response.json(); // Get the result from the response
      if (response.ok) {
        console.log("Data saved successfully", result);
        goToNextStep();
      } else {
        console.error("Failed to save data:", result.message);
      }
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
    }
    
  };

  return (
    <div className="">
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
          <div className="mt-4 py-10 grid lg:grid-cols-3 justify-between w-full mx-auto p-6 space-y-6 border border-opacity-70 border-white/20 bg-[#202130] bg-cover rounded-lg">
            <div className="space-y-4 col-span-2 px-4">
              <p className="text-lg font-semibold text-gray-200">Industry:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem] px-4">
                {industries.map((industry, index) => (
                  <button
                    key={index}
                    className={`h-24 flex flex-col items-center text-center p-3 rounded-lg transition-colors ${
                      selectedIndustry === industry.name
                        ? "bg-[#F7D691]"
                        : "bg-white text-black border border-white/10"
                    }`}
                    onClick={() => handleIndustrySelect(industry.name)}
                  >
                    <div className="flex items-center justify-center mt-1">
                      {industry.imageSrc ? (
                        <img
                          src={industry.imageSrc}
                          alt={industry.name}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 3h4a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h4"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="mt-2 text-sm text-center">{industry.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-200 whitespace-nowrap mt-2">
                Your gross margin:
              </p>
              <div className="grid lg:grid-cols-6 gap-10 px-4">
                {[
                  "<10%",
                  "10%-20%",
                  "20%-30%",
                  "30%-50%",
                  "50%-70%",
                  "70+%",
                ].map((margin) => (
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
            </div> */}
            <div className="grid col-span-1 px-4">
              <div className="gap-4 bg-vulcan-800 p-6 rounded-lg mt-6 border border-white/10">
                <div className="flex-1 mt-6 px-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2 border rounded-lg px-4"
                    value={userName}
                    onChange={handleUserNameChange} // Handle name input
                  />
                </div>
                <div className="p-4 mt-3">
                  <input
                    type="text"
                    placeholder="Your Company Name"
                    className="w-full p-2 border rounded-lg px-4"
                    value={companyName}
                    onChange={handleCompanyNameChange} // Handle company name input
                  />
                </div>
                <div className="flex-1 mt-3 pb-4 px-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 border rounded-lg px-4"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="px-4 mt-3">
                  <button
                    className="bg-blue-600 font-semibold text-white px-8 py-2 rounded-lg"
                    onClick={() => {
                      handleCalculate();  // Perform calculation before going to the next step
                      goToNextStep();
                    }}
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
          <p>{result}</p> {/* Optionally display the result */}
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

