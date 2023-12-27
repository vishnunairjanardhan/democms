import React, { useState, useEffect } from 'react';
const CheckoutPage = () => {
  const [denomination, setDenomination] = useState(0);
  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const ProductValue1 = 20.00;
  const ProductValue2 = 30.00;
  const Taxes = 2.00;
  const Shipping = 3.00;
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const newSubtotal = ProductValue1 * quantity1 + ProductValue2 * quantity2;
    setSubtotal(newSubtotal);
  }, [quantity1, quantity2]);
  useEffect(() => {
    const newTotal = subtotal + Taxes + Shipping - denomination;
    const finalTotal = Math.max(newTotal, 0);
    setTotalAmount(parseFloat(finalTotal.toFixed(2)));
  }, [subtotal, Taxes, Shipping, denomination]);
  const availableCoupons = [
    { code: 'SummerSale$10', discount: 10.00 },
    { code: 'Special$10OFF', discount: 10.00 },
  ];
  const increment = (product) => {
    if (product === 1) {
      setQuantity1(quantity1 + 1);
      updateTotal();
      console.log(quantity1)
    } else if (product === 2) {
      setQuantity2(quantity2 + 1);
      updateTotal();
      console.log(quantity2)
    }
  };
  const decrement = (product) => {
    if (product === 1 && quantity1 > 1) {
      setQuantity1(quantity1 - 1);
    } else if (product === 2 && quantity2 > 1) {
      setQuantity2(quantity2 - 1);
    }
  };
  const [giftCardRedeemed, setGiftCardRedeemed] = useState(false);
  const [giftCardCode, setGiftCardCode] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [openCoupons, setOpenCoupons] = useState(false);
  const [redeemablePoints, setRedeemablePoints] = useState(100.00);
  const [storeCredits, setStoreCredits] = useState(50.00);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const updateTotal = () => {
    const totalDeductions = appliedCoupons.reduce((acc, couponCode) => {
      const coupon = availableCoupons.find((coupon) => coupon.code === couponCode);
      return acc + (coupon ? coupon.discount : 0);
    }, 0) + denomination;

    const newTotal = subtotal + Taxes + Shipping - totalDeductions;
    const finalTotal = Math.max(newTotal, 0);
    setTotalAmount(parseFloat(finalTotal.toFixed(2)));
  };
  const handleGiftCardRedeem = (giftCardCode) => {
    if (giftCardCode === '1234567890') {
      const giftCardDiscount = 10.00;
      if (totalAmount === 0 || giftCardRedeemed == true) {
        console.error('Insufficient funds for gift card redemption');
      } else {
        setDenomination((prevDenomination) => prevDenomination + giftCardDiscount);
        updateTotal();
        setGiftCardRedeemed(true);
      }
    } else {
      console.error('Invalid gift card code', giftCardCode);
    }
  };
  const handleCodeRedeem = (couponCode) => {
    if (couponCode === '30OFF') {
      const couponDiscount = 30.00;
      if (totalAmount === 0) {
        console.error('Insufficient funds for coupon redemption');
      } else {
        setDenomination((prevDenomination) => prevDenomination + couponDiscount);
        updateTotal();
      }
    } else {
      console.error('Invalid coupon code', couponCode);
    }
  };
  const handleCouponApply = (couponCode, discount) => {
    if (!appliedCoupons.includes(couponCode)) {
      const newDenomination = denomination + discount;
      if (totalAmount === 0) {
        console.error('Insufficient funds for coupon redemption');
      } else {
        setDenomination(newDenomination);
        updateTotal();
        setAppliedCoupons([...appliedCoupons, couponCode]);
      }
    } else {
      console.error('Coupon already applied', couponCode);
    }
  };
  const handleLoyaltyPointsRedeem = () => {
    const loyaltyPointsDiscount = 20.00;
    if (redeemablePoints < 20) {
      console.error('Insufficient funds or points for loyalty points redemption');
    } else {
      const remainingPoints = redeemablePoints - (loyaltyPointsDiscount / 5) * 100;
      if (remainingPoints >= 0) {
        setDenomination((prevDenomination) => prevDenomination + loyaltyPointsDiscount);
        setRedeemablePoints(remainingPoints);
      } else {
        const remainingDiscount = redeemablePoints / 100 * 5;
        setDenomination((prevDenomination) => prevDenomination + remainingDiscount);
        setRedeemablePoints(0);
      }
      updateTotal();
    }
  };
  const handleStoreCreditsRedeem = () => {
    if (storeCredits <= 0) {
      console.error('Insufficient funds or credits for store credits redemption');
    } else {
      const remainingStoreCredits = Math.max(storeCredits - totalAmount, 0);
      const redeemedAmount = storeCredits - remainingStoreCredits;

      setDenomination((prevDenomination) => prevDenomination + redeemedAmount);
      setStoreCredits(remainingStoreCredits);
      console.log('remaining credits', remainingStoreCredits);
      updateTotal();
    }
  };
  const ProductRow = ({ image, name, price, quantity, onIncrement, onDecrement }) => (
    <tr className="lg:w-full">
      <td className="py-4">
        <div className="flex flex-col lg:flex-row items-center">
          <img className="h-16 w-16 lg:mr-4 lg:rounded-md" src={image} alt="Product image" />
          <span className="font-semibold">{name}</span>
        </div>
      </td>
      <td className="py-4">${price}</td>
      <td className="py-4">
        <div className="flex items-center">
          <button onClick={onDecrement} className="border rounded-md py-2 px-4 mr-2">-</button>
          <span className="text-center w-8">{quantity}</span>
          <button onClick={onIncrement} className="border rounded-md py-2 px-4 ml-2">+</button>
        </div>
      </td>
      <td className="py-4">${price * quantity}</td>
    </tr>
  );
  return (
    <article className="relative py-12 mx-auto max-w-7xl lg:py-24 w-full">
      
      <div className="lg:flex"> 
        <div className="lg:w-1/2 lg:pr-4 flex flex-col flex-1">
        <div className="border p-4 rounded-md bg-gray-100 h-full">
          <h2 className="text-lg font-medium">Order Details</h2>
          <br />
          <div className="md:w-full">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <ProductRow
                    image="/assets/product.jpg"
                    name="Product1"
                    price={ProductValue1}
                    quantity={quantity1}
                    onIncrement={() => increment(1)}
                    onDecrement={() => decrement(1)} />
                  <ProductRow
                    image="/assets/product2.jpg"
                    name="Product2"
                    price={ProductValue2}
                    quantity={quantity2}
                    onIncrement={() => increment(2)}
                    onDecrement={() => decrement(2)} />
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-full">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>${Taxes}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${Shipping}</span>
              </div>
              {denomination > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Redeemed Amount</span>
                  <span className="font-semibold">${denomination}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${totalAmount}</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0">
        <div className="lg:pt-4" onBlur={closeDropdown} tabIndex={0}>
          <div className="relative text-white justify-center">
            <button onClick={toggleDropdown} className="inline-flex items-center gap-2 px-2 py-2 text-sm font-normal text-black lg:px-3 md:px-3 hover:text-black/50">
              <span>Try Coupons and Giftcard</span>
              <svg
                className={`icon icon-tabler icon-tabler-chevron-down inline h-4 transition-transform duration-200 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 9l6 6l6 -6"></path>
              </svg>
            </button>
            {isOpen && (
              <div className="absolute w-52 right-0 z-50 mt-2 w-full origin-top-right rounded-xl bg-gradient-to-b from-indigo-500 via-indigo-500/ ring-1 ring-inset ring-white/5 focus:outline-none p-[0.060rem]" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1 bg-vulcan-900 rounded-xl" role="none">
                  <p className="text-white block px-4 py-2 text-sm hover:text-indigo-400" role="menuitem" tabIndex={-1} id="menu-item-1">
                    Try Gift Card use code- 1234567890
                  </p>
                  <p className="text-white block px-4 py-2 text-sm hover:text-indigo-400" role="menuitem" tabIndex={-1} id="menu-item-2">
                    Try Coupon use code- 30OFF
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
          </div>
        </div>
        </div>
        <div className="lg:w-1/2 lg:pl-4 mt-4 lg:mt-0 flex flex-col flex-1">
        <form method="post" className="flex-1 space-y-2 border p-4 rounded-md bg-white">
          <div>
            <button type="submit" className="bg-black text-white p-3 rounded-md w-full">
              99Wallet
            </button>
          </div>
          <div className="flex-1 border p-4 rounded-md space-y-1">
            <h2 className="text-lg font-medium">Gift Card</h2>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  id="giftCardCode"
                  name="giftCardCode"
                  placeholder="Enter Gift Card Code"
                  value={giftCardCode}
                  onChange={(e) => setGiftCardCode(e.target.value)}
                  className="p-2 w-full border rounded-md" />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleGiftCardRedeem(giftCardCode)}
                  className="bg-green-500 text-white p-2 rounded-md h-full hover:bg-green-600 w-24"
                >
                  Redeem
                </button>
              </div>
            </div>
            <h2 className="text-lg font-medium">Coupon</h2>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  id="couponCode"
                  name="couponCode"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="p-2 w-full border rounded-md" />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleCodeRedeem(couponCode)}
                  className="bg-green-500 text-white p-2 rounded-md h-full hover:bg-green-600 w-24">
                  Apply
                </button>
              </div>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenCoupons(!openCoupons)}
                className="p-3 rounded-md w-full">
                <span>Available Coupons</span>
                <svg
                  className={`icon icon-tabler icon-tabler-chevron-down inline h-4 transition-transform duration-200 transform ${openCoupons ? 'rotate-180' : 'rotate-0'
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M6 9l6 6l6 -6"></path>
                </svg>
              </button>
              {openCoupons && (
                <div className="mt-2 w-full origin-top-right rounded-xl ring-1 ring-inset ring-white/5 focus:outline-none p-[0.060rem]">
                  <div className="py-1 bg-gray-200 rounded-xl w-full">
                    {availableCoupons.map((coupon) => (
                      !appliedCoupons.includes(coupon.code) && (
                        <div key={coupon.code} className="flex p-2 justify-between">
                          <p className="block px-4 p-2 text-sm font-bold" role="menuitem" tabIndex="-1" id="menu-item-1">
                            {coupon.code}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleCouponApply(coupon.code, coupon.discount)}
                            className="bg-green-500 text-white p-2 rounded-md h-full hover:bg-green-600 w-24">
                            Apply
                          </button>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
            <h2 className="text-lg font-medium">Loyalty Points</h2>
            <p className="text-sm font-small">$5 for 100 points</p>
            <div className="flex space-x-2">
              <div className="flex-1 border p-2 rounded-md bg-white">
                <h1 className="text-sm text-gray-800">You have {redeemablePoints} points available for redemption.</h1>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleLoyaltyPointsRedeem}
                  className="bg-green-500 text-white p-2 rounded-md h-full hover:bg-green-600 w-24">
                  Redeem
                </button>
              </div>
            </div>
            <h2 className="text-lg font-medium">Store Credits</h2>
            <div className="flex space-x-2">
              <div className="flex-1 border p-2 rounded-md bg-white">
                <h1 className="text-sm text-gray-800">You have ${storeCredits} in your store credits</h1>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleStoreCreditsRedeem}
                  className="bg-green-500 text-white p-2 rounded-md h-full hover:bg-green-600 w-24"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-center pt-4">---Or Pay Using Card---</p>
          <form method="post" action="/submit-order" className="flex-1 space-y-2 border p-4 rounded-md bg-white mt-4 lg:mt-0">
          <label className="relative w-full flex flex-col">
            <span className="mb-1.5">Card number</span>
            <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="card_number" placeholder="4242 4242 4242 4242" />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </label>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <label className="relative flex-1 flex flex-col">
              <span className="mb-1.5">Expire date</span>
              <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="expire_date" placeholder="MM/YY" />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </label>
            <label className="relative flex-1 flex flex-col">
              <span className="flex items-center gap-3 mb-1.5">
                CVC/CVV
                <span className="relative group">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </span>
              </span>
              <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="card_cvc" placeholder="•••" />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </label>
          </div>
          <div className='w-full'>
            <button type="submit" className="bg-black text-white p-3 rounded-md w-full">Pay</button>
          </div>
        </form>
        </form>
        </div>
      </div>
    </article>
  );
};
export default CheckoutPage;