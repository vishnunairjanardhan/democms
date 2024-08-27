import React, { useState } from 'react';
import InputSlider from 'react-input-slider';

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ProfitImpactCalculator = ({handlePrevStep}) => {
    const [totalCustomers, setTotalCustomers] = useState('1000');
    const [averageProfit, setAverageProfit] = useState('20');
    const [costPerNewCustomer, setCostPerNewCustomer] = useState('Bronze');
    const [profitImpact, setProfitImpact] = useState(null);
    const [errors, setErrors] = useState({}); // State variable for errors

    const costValues = {
        Bronze: { cost: 99, newCustomerPercentage: 15 },
        Silver: { cost: 199, newCustomerPercentage: 35 },
        Gold: { cost: 499, newCustomerPercentage: 50 }
    };

    const validateInputs = () => {
        const newErrors = {};
        let isValid = true;

        if (totalCustomers.trim() === '' || parseFloat(totalCustomers) <= 0) {
            newErrors.totalCustomers = 'Total Customers must be a positive number.';
            isValid = false;
        }

        if (averageProfit.trim() === '' || parseFloat(averageProfit) <= 0) {
            newErrors.averageProfit = 'Average Profit per Customer must be a positive number.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const calculateProfitImpact = () => {
        if (!validateInputs()) {
            // If validation fails, return without calculating
            setProfitImpact(null);
            return;
        }

        const customers = parseFloat(totalCustomers);
        const percentage = costValues[costPerNewCustomer].newCustomerPercentage;
        const profit = parseFloat(averageProfit);
        const cost = costValues[costPerNewCustomer].cost;
        const newCustomers = (percentage / 100) * customers;
        const impactSingleMonth = (newCustomers * profit) - (newCustomers * cost / customers);
        const impactTwelveMonths = impactSingleMonth * 12;

        setProfitImpact(impactTwelveMonths);
    };

    return (
        <div className="container p-5">
            <h1 className="mb-4 text-center">Profit Impact Calculator</h1>
            <form>
                <div className="row mb-3">
                    <div className="col-md-6 mb-5">
                        <div className="form-group">
                            <label htmlFor="totalCustomers">Current Monthly Customers:</label>
                            <input
                                type="number"
                                id="totalCustomers"
                                className={`form-control ${errors.totalCustomers ? 'is-invalid' : ''}`}
                                value={totalCustomers}
                                onChange={(e) => setTotalCustomers(e.target.value)}
                            />
                            {errors.totalCustomers && (
                                <div className="invalid-feedback">{errors.totalCustomers}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6 mb-5">
                        <div className="form-group">
                            <label htmlFor="costPerNewCustomer">Select Your Loyalty Program:</label>
                            
                            <select
                                id="costPerNewCustomer"
                                className="form-select"
                                value={costPerNewCustomer}
                                onChange={(e) => {
                                    setCostPerNewCustomer(e.target.value);
                                }}
                            >
                                <option value="Bronze">Bronze - $99</option>
                                <option value="Silver">Silver - $199</option>
                                <option value="Gold">Gold - $499</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 mb-5">
                        <div className="form-group">
                            <label htmlFor="averageProfit">Average Profit per Customer:</label>
                            <input
                                type="number"
                                id="averageProfit"
                                className={`form-control ${errors.averageProfit ? 'is-invalid' : ''}`}
                                value={averageProfit}
                                onChange={(e) => setAverageProfit(e.target.value)}
                            />
                            {errors.averageProfit && (
                                <div className="invalid-feedback">{errors.averageProfit}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6 mb-5">
                        <div className="form-group">
                            <label>New Customer Percentage:</label>
                            <div className="d-flex align-items-center">
                                <InputSlider
                                    className="w-100"
                                    axis="x"
                                    x={costValues[costPerNewCustomer].newCustomerPercentage}
                                    onChange={({ x }) => { }}
                                    xmax={50}
                                    xmin={1}
                                    xstep={1}
                                />
                                <span className="ms-3">{costValues[costPerNewCustomer].newCustomerPercentage}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button className="bg_color2 btn btn-primary px-5 m-3" onClick={handlePrevStep}>
                        Back
                    </button>
                    <button
                        type="button"
                        className="bg_color2 btn btn-primary"
                        onClick={calculateProfitImpact}
                    >
                        Calculate Profit Impact
                    </button>

                </div>
            </form>
            {profitImpact !== null && (
                <div className="mt-3 text-center">
                    <h2>Profit Impact Per Annum: ${numberWithCommas(profitImpact.toFixed(2))}</h2>
                </div>
            )}
        </div>
    );
};

export default ProfitImpactCalculator;
