import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RevenueCalculator() {
  const [orders, setOrders] = useState('1000');
  const [value, setValue] = useState('75');
  const [orderPercent, setOrderPercent] = useState(1);
  const [valuePercent, setValuePercent] = useState(1);
  const [ordersError, setOrdersError] = useState('');
  const [valueError, setValueError] = useState('');
  const [orderPercentError, setOrderPercentError] = useState('');
  const [valuePercentError, setValuePercentError] = useState('');

  const error = 'Enter a valid number greater than 0'
  const handleOrdersChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0) {
      setOrdersError(error);
    } else {
      setOrdersError('');
      setOrders(inputValue);
    }
  };

  const handleValueChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0) {
      setValueError(error);
    } else {
      setValueError('');
      setValue(inputValue);
    }
  };

  const annualRev = (value, orders) => {
    const AR = value * orders * 12;
    return AR;
  };

  const handleOrdersPercent = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0) {
      setOrderPercentError(error);
    } else {
      setOrderPercentError('');
      setOrderPercent(inputValue);
    }
  };

  const handleValuePercent = (e) => {
    const inputValue = e.target.value;
    if (inputValue < 0) {
      setValuePercentError(error);
    } else {
      setValuePercentError('');
      setValuePercent(inputValue);
    }
  };

  const newAnnualRev = (orders, value, orderPercent, valuePercent) => {
    const val1 = orders * Math.pow(1 + orderPercent / 12, 12 * 1) - orders;
    const val2 = value * Math.pow(1 + valuePercent / 12, 12 * 1) - value;
    const Nar = val1 * val2 * 12;
    return Nar;
  };

  return (
    <div className="container mt-5 text-center">
      <div>
        <h1>Annual Revenue Calculator</h1>
        <div className="row justify-content-center">
          <div className="col">
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="monthlyOrders" className="form-label">
                  Monthly Orders:
                </label>
                <input
                  type="number"
                  id="monthlyOrders"
                  className="form-control"
                  value={orders}
                  onChange={handleOrdersChange}
                />
                {ordersError && <div className="text-danger">{ordersError}</div>}
              </div>
              <div className="col">
                <label htmlFor="averageOrderValue" className="form-label">
                  Average Order Value:
                </label>
                <input
                  type="number"
                  id="averageOrderValue"
                  className="form-control"
                  value={value}
                  onChange={handleValueChange}
                />
                {valueError && <div className="text-danger">{valueError}</div>}
              </div>
            </div>
            <p>Annual Revenue: ${annualRev(value, orders)}</p>
          </div>
        </div>
      </div>

      <div>
        <h1>Annual Growth Calculator</h1>
        <div className="row justify-content-center">
          <div className="col">
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="orderPercent" className="form-label">
                  Increase in Monthly Orders in %:
                </label>
                <input
                  type="number"
                  id="orderPercent"
                  className="form-control"
                  value={orderPercent}
                  onChange={handleOrdersPercent}
                />
                {orderPercentError && (
                  <div className="text-danger">{orderPercentError}</div>
                )}
              </div>
              <div className="col">
                <label htmlFor="valuePercent" className="form-label">
                  Increase in Average Order Value in %:
                </label>
                <input
                  type="number"
                  id="valuePercent"
                  className="form-control"
                  value={valuePercent}
                  onChange={handleValuePercent}
                />
                {valuePercentError && (
                  <div className="text-danger">{valuePercentError}</div>
                )}
              </div>
            </div>
            <p>
              Annual Revenue: $
              {newAnnualRev(value, orders, orderPercent, valuePercent)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueCalculator;
