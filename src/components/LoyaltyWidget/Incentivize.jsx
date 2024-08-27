import React from 'react';
import { useOption } from './OptionContext';

const Incentivize = ({ handleNextStep, handlePrevStep }) => {
  const { selectedOptions, toggleOption } = useOption();

  const options = [
    { title: 'Write a Review', icon: 'icon_color bi bi-pencil-square' },//*
    { title: 'Share on X', icon: 'icon_color bi bi-twitter' },//*
    { title: 'Purchase Gift Card', icon: 'icon_color bi bi-credit-card' },//*
    { title: 'Refer a Friend', icon: 'icon_color bi bi-person-add' },//*
    { title: 'Birthday Gift', icon: 'icon_color bi bi-gift' },//*
    { title: 'Like on Facebook', icon: 'icon_color bi bi-facebook' },//*
    { title: 'Make a Purchase', icon: 'icon_color bi bi-bag' },//*
    { title: 'Share on Facebook', icon: 'icon_color bi bi-share' },//*
    { title: 'Sign Up', icon: 'icon_color bi bi-person' },//*
    { title: 'Get a Coupon', icon: 'icon_color bi bi-ticket-perforated' },//*
    { title: 'Follow on Instagram', icon: 'icon_color bi bi-instagram' },//*
    { title: 'Store Credit', icon: 'icon_color bi bi-currency-dollar' },//*
  ];

  const handleOptionToggle = (option) => {
    toggleOption(option);
  };

  const handleProceedClick = () => {
    // Proceed to the next page or perform an action
    console.log('Selected options page5:', selectedOptions);
  };

  return (
    <div className="container mt-5 text-center" id='Incentivize'>
      <h1>Offer Rewards To Your Customers</h1>
      <h3 className='pt-5'>Select Any 6 Insentives You Want to Provide to Your Customer</h3>
      <div className="row justify-content-center p-5">
        <div className="col">
          <div className="row">
            {options.map((option, index) => (
              <div className="col-12 col-md-4 col-lg-3" key={index}>
                <div
                  className={`card s_integration_item ${selectedOptions.map((item) => item.title).includes(option.title)
                      ? "selected"
                      : ""
                    }`}
                >
                  <div className="card-body">
                    <label className="btn">
                      <input
                        type="checkbox"
                        className="btn-check"
                        autoComplete="off"
                        checked={selectedOptions.map((item) => item.title).includes(option.title)}
                        onChange={() => handleOptionToggle(option)}
                      />
                      <h1><i className={option.icon}></i></h1>
                      <br/> {option.title}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="bg_color2 btn btn-primary m-3 px-5" onClick={handlePrevStep}>
            Back
          </button>
          <button
            className={`bg_color2 btn btn-primary m-3 px-5 ${selectedOptions.length === 6 ? "" : "disabled"}`}
            onClick={() => { handleProceedClick(); handleNextStep(); }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Incentivize;
