import React, { useState } from "react";

const ROICalculator = () => {
  // State variables to hold input values
  const [annualOrders, setAnnualOrders] = useState("");
  const [annualCustomers, setAnnualCustomers] = useState("");
  const [aov, setAOV] = useState("");
  const [roi, setROI] = useState(null);
  const [revenue, setRevenue] = useState(null);

  // Constants for investment calculation
  const IMPLEMENTATION_COST = 5000; // Example: Implementation cost
  const SUBSCRIPTION_COST = 2000; // Example: Annual subscription cost

  // Function to calculate ROI
  const calculateROI = () => {
    const parsedAnnualOrders = parseFloat(annualOrders);
    const parsedAOV = parseFloat(aov);

    if (isNaN(parsedAnnualOrders) || isNaN(parsedAOV)) {
      alert("Please enter valid numeric values for Annual Orders and AOV.");
      return;
    }

    const totalRevenue = parsedAnnualOrders * parsedAOV;
    const totalInvestment = IMPLEMENTATION_COST + SUBSCRIPTION_COST;

    const calculatedROI = ((totalRevenue - totalInvestment) / totalInvestment) * 100;

    setRevenue(totalRevenue);
    setROI(calculatedROI.toFixed(2)); // Limit to 2 decimal places
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">99minds ROI Calculator</h1>
      <div className="space-y-4">
        {/* Annual Orders Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Annual Orders</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            placeholder="e.g., 10000"
            value={annualOrders}
            onChange={(e) => setAnnualOrders(e.target.value)}
          />
        </div>
        {/* Annual Customers Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Annual Customers</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            placeholder="e.g., 2000"
            value={annualCustomers}
            onChange={(e) => setAnnualCustomers(e.target.value)}
          />
        </div>
        {/* Average Order Value Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Average Order Value (AOV)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            placeholder="e.g., 50"
            value={aov}
            onChange={(e) => setAOV(e.target.value)}
          />
        </div>
        {/* Calculate Button */}
        <button
          onClick={calculateROI}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full"
        >
          Calculate ROI
        </button>
        {/* Results */}
        {roi !== null && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-medium mb-2">Results</h2>
            <p>Total Revenue: <span className="font-bold">${revenue}</span></p>
            <p>ROI: <span className="font-bold">{roi}%</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROICalculator;
