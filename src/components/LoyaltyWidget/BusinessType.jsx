import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const optionImages = {
  'ELECTRONICS': '/images/electronics.png',
  'STYLE & FASHION': '/images/fashion.png',
  'BEAUTY & BEYOND': '/images/health-&-beauty.png',
  'HOME DECOR': '/images/home-&-garden.png',
  'FUN & SPORTS': '/images/Sports-&-outdoor.png',
  'FOOD & BEVERAGES': '/images/food.png',
  'BEDDING & BATH': '/images/bath-&-bedding.png',
  'SHOES': '/images/shoes.png',
};

const BusinessType = ({ onBusinessTypeSelect, handleNextStep }) => {
  const options = Object.keys(optionImages);
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const selectedType = event.target.checked ? event.target.value : '';
    setSelectedOption(selectedType);
    onBusinessTypeSelect(selectedType); 
  };

  const isNextButtonDisabled = selectedOption === '';

  return (
    <div className="container mt-5 text-center" id='LoyalyWidget'>
      <h1 className='pb-5'>Choose Your Business Category</h1>
      <div className="row">
        {options.map((option, index) => (
          <div className="col-12 col-md-3 col-lg-3 mt-5" key={index}>
            <label
              className={`btn ${
                selectedOption === option ? 'selected' : ''
              } s_integration_item`}
              htmlFor={`btn-check-outlined-${index}`}
            >
              <input
                type="checkbox"
                className="btn-check"
                id={`btn-check-outlined-${index}`}
                autoComplete="off"
                value={option}
                checked={selectedOption === option}
                onChange={handleChange}
              />
              <img className='pb-1' src={optionImages[option]} alt={option} />
              <br />
              {option}
            </label>
          </div>
        ))}
      </div>
      <button className="bg_color2 btn btn-primary mb-5 px-5" onClick={handleNextStep} disabled={isNextButtonDisabled}>
        Next
      </button>
    </div>
  );
};

export default BusinessType;
