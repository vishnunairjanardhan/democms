import React, { useMemo } from "react";
import "../../assets/brand/brand.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useOption, useColorContext } from './OptionContext';

const Rewards = [
  { title: 'GET $5 OFF', points: '300 POINTS' },
  { title: 'GET $10 OFF', points: '600 POINTS' },
  { title: 'GET $25 OFF', points: '800 POINTS' }
];

const businessTypeImages = {
    'ELECTRONICS': [
        '/images/LW-IMG1.jpg',
        '/images/LW-IMG2.jpg',
        '/images/LW-IMG3.jpg',
        '/images/LW-IMG4.jpg',
        '/images/LW-IMG5.jpg',
        '/images/LW-IMG6.jpg',
    ],
    'FASHION & ACCESSORIES': [
        '/images/FA-IMG1.jpg',
        '/images/FA-IMG2.jpg',
        '/images/FA-IMG3.jpg',
        '/images/FA-IMG4.jpg',
        '/images/FA-IMG5.jpg',
        '/images/FA-IMG6.jpg',
    ],
    'HEALTH & BEAUTY': [
        '/images/HB-IMG1.jpg',
        '/images/HB-IMG2.jpg',
        '/images/HB-IMG3.jpg',
        '/images/HB-IMG4.jpg',
        '/images/HB-IMG5.jpg',
        '/images/HB-IMG6.jpg',
    ],
    'HOME & GARDEN': [
        '/images/HG-IMG1.jpg',
        '/images/HG-IMG2.jpg',
        '/images/HG-IMG3.jpg',
        '/images/HG-IMG4.jpg',
        '/images/HG-IMG5.jpg',
        '/images/HG-IMG6.jpg',
    ],
    'SPORTS & OUTDOORS': [
        '/images/SO-IMG1.jpg',
        '/images/SO-IMG2.jpg',
        '/images/SO-IMG3.jpg',
        '/images/SO-IMG4.jpg',
        '/images/SO-IMG5.jpg',
        '/images/SO-IMG6.jpg',
    ],
    'FOOD & TOBACCO': [
        '/images/FT-IMG1.jpg',
        '/images/FT-IMG2.jpg',
        '/images/FT-IMG3.jpg',
        '/images/FT-IMG4.jpg',
        '/images/FT-IMG5.jpg',
        '/images/FT-IMG6.jpg',
    ],
    'BEDDING & BATH': [
        '/images/BB-IMG1.jpg',
        '/images/BB-IMG2.jpg',
        '/images/BB-IMG3.jpg',
        '/images/BB-IMG4.jpg',
        '/images/BB-IMG5.jpg',
        '/images/BB-IMG6.jpg',
    ],
    'FOOTWEAR': [
        '/images/S-IMG2.jpg',
        '/images/S-IMG1.jpg',
        '/images/S-IMG3.jpg',
        '/images/S-IMG4.jpg',
        '/images/S-IMG5.jpg',
        '/images/S-IMG6.jpg',
    ],
};
const LoyaltyProgram = ({ selectedBusinessType }) => {
  const { selectedOptions } = useOption();
  const {
    color_1,
    color_2,
    selected,
    previewcolor_1,
    previewcolor_2,
  } = useColorContext();

  const loyaltyTiers = ['Bronze', 'Silver', 'Gold'];

  const greenTickCriteria = {
    Bronze: [0],
    Silver: [0, 1, 2, 3],
    Gold: [0, 1, 2, 3, 4, 5]
  };

  const calculateTextColor = (backgroundColor) => {
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const isColor2Light=calculateTextColor(color_2)

  // Use useMemo to memoize the selectedBusinessTypeImage
  const selectedBusinessTypeImage = useMemo(() => {
    return businessTypeImages[selectedBusinessType] || [];
  }, [selectedBusinessType]);
  console.log("Selected Image",selectedBusinessTypeImage[0]);

  return (
    <div>
      <div className="container text-center p-5 color-smoke">
        <div className="container bg-light">
          <h2 className="mb-5 mt-5">Your Custom Loyalty Widget Is Ready</h2>
        </div>

        <div
          className={previewcolor_2}
          style={{
            backgroundColor: selected ? color_2 : "",
          }}
        >
          <h4 className="p-3" style={{
                color: calculateTextColor(selected ? color_2 : ""),
              }}>Rewards</h4>
          <h2 className='pb-3' style={{
                color: calculateTextColor(selected ? color_2 : ""),
              }}>How to redeem your Points</h2>
        </div>

        <div>
          <div
            className={previewcolor_1}
            style={{ backgroundColor: selected ? color_1 : "" }}
          >
            <div className="row p-5">
              {Rewards.map((reward, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card mb-3 text-center">
                    <div className="card-body">
                      <h5 className="card-title">{reward.title}</h5>
                      <h3 className="card-text">{reward.points}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div
            className={previewcolor_1}
            style={{ backgroundColor: selected ? color_1 : "" }}
          >
            <div className="row p-5">
              {selectedOptions.map((option, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card mb-3">
                    <img
                      src={selectedBusinessTypeImage?.[index]}
                      className="card-img-top"
                      alt="Your Alt Text"
                    />
                    <div className="card-body text-black">
                      <h3><i className={option.icon} style={{ color: selected ? color_2: "black"}}></i></h3>
                      <h5
                        className="card-title text-black">
                        {option.title}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div
            className={previewcolor_2}
            style={{
              backgroundColor: selected ? color_2 : "",
              color: isColor2Light ? "black" : "white",
            }}
          >
            <h2 className="pt-3" style={{
                color: calculateTextColor(selected ? color_2 : ""),
              }}>VIP Tier</h2>
            <table className="table" style={{
                color: calculateTextColor(selected ? color_2 : ""),
              }}>
              <thead>
                <tr>
                  <th>Options</th>
                  {loyaltyTiers.map((tier, index) => (
                    <th key={index}>{tier}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedOptions.map((option, optionIndex) => (
                  <tr key={optionIndex}>
                    <td>{option.title}</td>
                    {loyaltyTiers.map((tier, tierIndex) => (
                      <td key={tierIndex}>
                        {greenTickCriteria[tier].includes(optionIndex) && (
                          <i className="bi bi-check-circle" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
