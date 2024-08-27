import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Goals = ({ handleNextStep, handlePrevStep }) => {
  const options = {
    'Increase Customer Acquisition': '/images/goal_icons/new-customer.png',
    'Enhance Customer Value': '/images/goal_icons/Increase-customer-lifetime-value.png',
    'Encourage Customer Engagement': '/images/goal_icons/Encourage-new-Customer1.png',
    'Strengthen Relations': '/images/goal_icons/Deepen-relationships-with-top-customers.png',
    'Increase the Average Purchases': '/images/goal_icons/Raise-average-order-value.png',
    'Enhance Social Media Interaction': '/images/goal_icons/Boost-social-media-engagement.png',
    'Increase Purchase Frequency': '/images/goal_icons/increase-.png',
    'Decrease Cost of Acquisition': '/images/goal_icons/Lower-customer-acquisition-cost.png',
  };

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, option]);
    }
  };

  const isNextButtonDisabled = selectedOptions.length === 0;

  return (
    <div className="container mt-5 text-center">
      <h1 className="pb-5">What Do You Hope To Achieve?</h1>
      <div className="row">
        {Object.keys(options).map((option, index) => (
          <div className="col-12 col-md-3 col-lg-3" key={index}>
            <label
              className={`s_integration_item ${
                selectedOptions.includes(option) ? 'selected' : ''
              }`}
            >
              <div>
                <img src={options[option]} alt={option} />
              </div>
              <input
                type="checkbox"
                className="btn-check"
                autoComplete="off"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleChange(option)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      <button className="bg_color2 btn btn-primary m-3 px-5" onClick={handlePrevStep}>
        Back
      </button>
      <button
        className={`bg_color2 btn btn-primary m-3 px-5 ${isNextButtonDisabled ? 'disabled' : ''}`}
        onClick={handleNextStep}
        disabled={isNextButtonDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Goals;
