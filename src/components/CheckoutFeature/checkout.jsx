import React, { useState, useEffect } from "react";
const CheckoutPage = (walletData) => {
  const [denomination, setDenomination] = useState(0);
  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const ProductValue1 = 55.0;
  const ProductValue2 = 45.0;
  const CouponDiscount = 20.0;
  const Taxes = 2.0;
  const Shipping = 3.0;
  const Loyalty = 5.0;
  useEffect(() => {
    const newSubtotal = ProductValue1 * quantity1 + ProductValue2 * quantity2;
    setSubtotal(newSubtotal);
  }, [quantity1, quantity2]);
  useEffect(() => {
    const newTotal = subtotal + Taxes + Shipping - denomination;
    const finalTotal = Math.max(newTotal, 0);
    setTotalAmount(parseFloat(finalTotal.toFixed(2)));
  }, [subtotal, Taxes, Shipping, denomination]);
  const availableCoupons = [{ code: "SAVE10", discount: 10.0 }];
  const increment = (product) => {
    if (product === 1) {
      setQuantity1(quantity1 + 1);
      updateTotal();
    } else if (product === 2) {
      setQuantity2(quantity2 + 1);
      updateTotal();
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
  const [storeCreditsRedeemed, setStoreCreditsRedeemed] = useState(false);
  const [loyaltyPointsRedeemed, setLoyaltyPointsRedeemed] = useState(false);
  const [couponRedeemed, setCouponRedeemed] = useState(false);
  const [giftCardCode, setGiftCardCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [openCoupons, setOpenCoupons] = useState(false);
  const [redeemablePoints, setRedeemablePoints] = useState(100.0);
  const [storeCredits, setStoreCredits] = useState(30.0);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [displayCoupons, setDisplayCoupons] = useState(false);
  const giftCardDiscount = 15.0;
  const creditAmount = 30.0;
  const [copyStatus, setCopyStatus] = useState("");
  const updateTotal = () => {
    const totalDeductions =
      appliedCoupons.reduce((acc, couponCode) => {
        const coupon = availableCoupons.find(
          (coupon) => coupon.code === couponCode
        );
        return acc + (coupon ? coupon.discount : 0);
      }, 0) + denomination;

    const newTotal = subtotal + Taxes + Shipping - totalDeductions;
    const finalTotal = Math.max(newTotal, 0);
    setTotalAmount(parseFloat(finalTotal.toFixed(2)));
  };
  const handleGiftCardRedeem = (giftCardCode) => {
    if (giftCardCode === "1234567890") {
      if (totalAmount === 0 || giftCardRedeemed == true) {
        console.error("Insufficient funds for gift card redemption");
      } else {
        setDenomination(
          (prevDenomination) => prevDenomination + giftCardDiscount
        );
        updateTotal();
        setGiftCardRedeemed(true);
      }
    } else {
      console.error("Invalid gift card code", giftCardCode);
    }
  };
  const CouponRedeem = (couponCode) => {
    if (couponCode === "20OFF") {
      if (totalAmount === 0 || couponRedeemed == true) {
        console.error("Insufficient funds for gift card redemption");
      } else {
        setDenomination(
          (prevDenomination) => prevDenomination + CouponDiscount
        );
        updateTotal();
        setCouponRedeemed(true);
      }
    } else {
      console.error("Invalid gift card code", couponCode);
    }
  };
  const handleCouponApply = (couponCode, discount) => {
    if (!appliedCoupons.includes(couponCode)) {
      const newDenomination = denomination + discount;
      if (totalAmount === 0) {
        console.error("Insufficient funds for coupon redemption");
      } else {
        setDenomination(newDenomination);
        updateTotal();
        setAppliedCoupons([...appliedCoupons, couponCode]);
        setDisplayCoupons(true);
      }
    } else {
      console.error("Coupon already applied", couponCode);
    }
  };
  const handleLoyaltyPointsRedeem = () => {
    const loyaltyPointsDiscount = 20.0;
    if (redeemablePoints < 20 || totalAmount === 0) {
      console.error(
        "Insufficient funds or points for loyalty points redemption"
      );
    } else {
      const remainingPoints =
        redeemablePoints - (loyaltyPointsDiscount / 5) * 100;
      if (remainingPoints >= 0) {
        setDenomination(
          (prevDenomination) => prevDenomination + loyaltyPointsDiscount
        );
        setRedeemablePoints(remainingPoints);
      } else {
        const remainingDiscount = (redeemablePoints / 100) * 5;
        setDenomination(
          (prevDenomination) => prevDenomination + remainingDiscount
        );
        setLoyaltyPointsRedeemed(true);
        setRedeemablePoints(0);
      }
      updateTotal();
    }
  };
  const handleStoreCreditsRedeem = () => {
    if (storeCredits <= 0) {
      console.error(
        "Insufficient funds or credits for store credits redemption"
      );
    } else {
      setDenomination((prevDenomination) => prevDenomination + creditAmount);
      setStoreCredits(0);
      setStoreCreditsRedeemed(true);
      updateTotal();
    }
  };
  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  const cancleCoupon = () => {
    setCouponRedeemed(false);
    setDenomination((prevDenomination) => prevDenomination - CouponDiscount);
    updateTotal();
  };
  const cancleAppliedCoupon = () => {
    setDenomination((prevDenomination) => prevDenomination - 10);
    setDisplayCoupons(false);
    setAppliedCoupons([]);
    console.log(appliedCoupons);
    updateTotal();
  };
  const cancleGiftcard = () => {
    setGiftCardRedeemed(false);
    setDenomination((prevDenomination) => prevDenomination - giftCardDiscount);
    updateTotal();
  };
  const cancleLoyaltyPoints = () => {
    setDenomination((prevDenomination) => prevDenomination - 5.0);
    setLoyaltyPointsRedeemed(false);
    setRedeemablePoints(100);
  };
  const cancleStoreCredits = () => {
    setDenomination((prevDenomination) => prevDenomination - creditAmount);
    setStoreCredits(30.0);
    setStoreCreditsRedeemed(false);
    updateTotal();
  };
  const handleCopyCode = (code) => {
    copyToClipboard(code);
    setCopyStatus("Copied");
    setTimeout(() => {
      setCopyStatus("");
    }, 2000);
  };
  const ProductRow = ({
    image,
    name,
    price,
    quantity,
    onIncrement,
    onDecrement,
  }) => {
    const formattedPrice = typeof price === "number" ? price.toFixed(2) : price;
    return (
      <tr className="lg:w-full">
        <td className="py-4">
          <div className="flex flex-col lg:flex-row items-center">
            <img
              className="h-16 w-16 lg:mr-4 lg:rounded-md"
              src={image}
              alt="Product image"
            />
            <span className="font-semibold">{name}</span>
          </div>
        </td>
        <td className="py-4">
          <div className="flex items-center">
            <button
              onClick={onDecrement}
              className="border rounded-md py-2 px-4 mr-2"
            >
              -
            </button>
            <span className="text-center w-8">{quantity}</span>
            <button
              onClick={onIncrement}
              className="border rounded-md py-2 px-4 ml-2"
            >
              +
            </button>
          </div>
        </td>
        <td className="py-4">${(price * quantity).toFixed(2)}</td>
      </tr>
    );
  };
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const handleCouponToggle = () => {
    setIsCouponOpen(!isCouponOpen);
    setIsGiftCardOpen(false);
  };
  const handleGiftCardToggle = () => {
    setIsGiftCardOpen(!isGiftCardOpen);
    setIsCouponOpen(false);
  };
  return (
    <article className="relative py-12 mx-auto max-w-7xl md:py-24 lg:px-16 w-full">
      <div className="flex justify-between">
        {/* <button type="button" class="relative p-1 flex inline-flex items-center justify-center font-bold overflow-hidden group rounded-md" onClick={() => { window.location.reload(); }}>
          <span class="w-full h-full bg-black group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
          <span class="relative px-4 py-1 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-100 duration-400 w-full">
            <span class="relative text-white flex items-center justify-center"><h4 className='px-2'>Back</h4></span>
          </span></button> */}
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          class="raise1 relative p-1 mt-4 inline-flex items-center justify-center overflow-hidden group rounded-md"
        >
          {" "}
          <span class="w-full h-full bg-black group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>{" "}
          <span class="relative px-4 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-10 duration-400 inline-flex items-center gap-2">
            <span class="relative flex items-center justify-center text-white">
              <h4 className="px-2">Back</h4>
            </span>{" "}
          </span>
        </button>
        {/* <a type="button" class="relative p-1 flex inline-flex items-center justify-center font-bold overflow-hidden group rounded-md" href='/submit-order'>
          <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
          <span class="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-100 duration-400 w-full">
            <span class="relative text-white flex items-center justify-center"><h4 className='px-2'>Next</h4></span>
          </span></a> */}
      </div>
      <h4 className="text-2xl text-white text-center font-bold mb-4 pt-4">
        {walletData["walletData"]["brandName"]}'s Wallet
      </h4>
      <div className="bg-white rounded p-3">
        <div className="w-full flex h-8 bg-gray-200 pl-2 rounded-lg my-3">
          <div class="rounded-full bg-white h-4 w-4 mt-2 mx-2"></div>
          <div class="rounded-full bg-white h-4 w-4 mt-2"></div>
          <div class="rounded-full bg-white h-4 w-4 mt-2 mx-2"></div>
          <h4 className="text-center w-full justify-center items-center pt-1.5 text-sm">
            www.99kicks.com
          </h4>
        </div>
        <div className="lg:flex">
          <div className="lg:w-1/2 flex flex-col flex-1">
            <div className="p-4 bg-gray-100 h-full">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                <h2 className="text-lg font-medium py-4 text-black">
                  Order Details
                </h2>
              </div>
              <div className="md:w-full">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left font-semibold">Product</th>
                        <th className="text-left font-semibold">Quantity</th>
                        <th className="text-left font-semibold">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <ProductRow
                        image="/assets/shoes1.jpg"
                        name="Solina"
                        price={ProductValue1.toFixed(2)}
                        quantity={quantity1}
                        onIncrement={() => increment(1)}
                        onDecrement={() => decrement(1)}
                      />
                      <ProductRow
                        image="/assets/shoes2.jpg"
                        name="Freesia"
                        price={ProductValue2.toFixed(2)}
                        quantity={quantity2}
                        onIncrement={() => increment(2)}
                        onDecrement={() => decrement(2)}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:w-full">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    <span>${Taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>${Shipping.toFixed(2)}</span>
                  </div>
                  {displayCoupons && (
                    <div className="flex justify-between mb-2">
                      <span className="flex">
                        Coupon SAVE10
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-x-circle m-1"
                          viewBox="0 0 16 16"
                          onClick={cancleAppliedCoupon}
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                      </span>
                      <span className=" ">
                        -$
                        {appliedCoupons
                          .reduce((acc, code) => {
                            const coupon = availableCoupons.find(
                              (c) => c.code === code
                            );
                            return acc + (coupon ? coupon.discount : 0);
                          }, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  )}
                  {giftCardRedeemed && (
                    <div className="flex justify-between mb-2">
                      <span className="flex  ">
                        Gift Card 1234567890
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-x-circle m-1"
                          viewBox="0 0 16 16"
                          onClick={cancleGiftcard}
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                      </span>
                      <span className=" ">-${giftCardDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  {loyaltyPointsRedeemed && (
                    <div className="flex justify-between mb-2">
                      <span className="flex  ">
                        100 Loyalty Points
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-x-circle m-1"
                          viewBox="0 0 16 16"
                          onClick={cancleLoyaltyPoints}
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                      </span>
                      <span className=" ">-${Loyalty.toFixed(2)}</span>
                    </div>
                  )}
                  {couponRedeemed && (
                    <div className="flex justify-between mb-2">
                      <span className="flex  ">
                        Coupon 20OFF
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-x-circle m-1"
                          viewBox="0 0 16 16"
                          onClick={cancleCoupon}
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                      </span>
                      <span className=" ">-${CouponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  {storeCreditsRedeemed && (
                    <div className="flex justify-between mb-2">
                      <span className="flex  ">
                        Store Credits Discount
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-x-circle m-1"
                          viewBox="0 0 16 16"
                          onClick={cancleStoreCredits}
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                      </span>
                      <span className=" ">-${creditAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 mt-4 lg:mt-0 flex flex-col flex-1">
            <div className="flex justify-between gap-8 fixed bottom-5 right-20 z-50 text-white">
              {walletData["walletData"]["showCoupons"] && (
                <div className="text-white relative">
                  <button
                    onClick={handleCouponToggle}
                    className="px-4 py-2 text-sm font-semibold bg-[#C6D8FF] rounded-lg text-black"
                  >
                    Test Coupon
                  </button>
                  {isCouponOpen && (
                    <div
                      className="flex flex-col absolute bottom-12 p-2 w-52 rounded-lg bg-[#C6D8FF]"
                      role="none"
                    >
                      <button
                        onClick={() => handleCopyCode("20OFF")}
                        onMouseEnter={() => setCopyStatus("Copy")}
                        onMouseLeave={() => setCopyStatus("")}
                        className="text-black block px-4 py-2 text-md justify-center items-center text-center font-bold bg-gray-100 rounded hover:text-indigo-400 cursor-pointer"
                        role="menuitem"
                        tabIndex={-1}
                      >
                        {copyStatus || "20OFF"}
                      </button>
                      <h4 className="text-black text-xs text-center block py-2">
                        Click on the code to copy
                      </h4>
                    </div>
                  )}
                </div>
              )}
              {walletData["walletData"]["showGiftCard"] && (
                <div className="text-white relative">
                  <button
                    onClick={handleGiftCardToggle}
                    className="px-4 py-2 text-sm font-semibold bg-[#C6D8FF] text-black rounded-lg"
                  >
                    Test $15 Gift Card
                  </button>
                  {isGiftCardOpen && (
                    <div
                      className="absolute flex flex-col bottom-12 p-2 w-52 rounded-lg bg-[#C6D8FF]"
                      role="none"
                    >
                      <button
                        onClick={() => handleCopyCode("1234567890")}
                        onMouseEnter={() => setCopyStatus("Copy")}
                        onMouseLeave={() => setCopyStatus("")}
                        className="text-black block px-4 py-2 text-md justify-center items-center text-center font-bold bg-gray-100 rounded hover:text-indigo-400 cursor-pointer"
                        role="menuitem"
                        tabIndex={-1}
                      >
                        {copyStatus || "1234567890"}
                      </button>
                      <h4 className="text-black text-xs text-center block py-2">
                        Click on the code to copy
                      </h4>
                    </div>
                  )}
                </div>
              )}
            </div>
            <form method="post" className="flex-1 space-y-2 p-4 bg-white">
              <div>
                <button
                  type="button"
                  class="relative p-1 flex inline-flex items-center justify-center font-bold overflow-hidden group rounded-md w-full"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  <span class="w-full h-full bg-black group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                  <span class="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-100 duration-400 w-full">
                    <span class="relative text-white flex items-center justify-center">
                      <h4 className="px-2">
                        {walletData["walletData"]["brandName"]}
                      </h4>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="16"
                        fill="currentColor"
                        class="bi bi-wallet2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3h43V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h43a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
              <div className="flex-1 p-4 rounded-md space-y-1">
                {/* giftcard */}
                {walletData["walletData"]["showGiftCard"] && (
                  <div>
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
                          className="p-2 w-full border rounded-md"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleGiftCardRedeem(giftCardCode)}
                          className="bg-white border-2 border-gray-500 text-black p-2 rounded-md h-full hover:bg-gray-200 font-medium w-24"
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {walletData["walletData"]["showCoupons"] && (
                  <div>
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
                          className="p-2 w-full border rounded-md"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => CouponRedeem(couponCode)}
                          className="bg-white border-2 border-gray-500 text-black p-2 rounded-md h-full hover:bg-gray-200 font-medium w-24 w-[6rem]"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenCoupons(!openCoupons)}
                        className="p-3 rounded-md w-full"
                      >
                        <span>Available Coupons</span>
                        <svg
                          className={`icon icon-tabler icon-tabler-chevron-down inline h-4 transition-transform duration-200 transform ${
                            openCoupons ? "rotate-180" : "rotate-0"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M6 9l6 6l6 -6"></path>
                        </svg>
                      </button>
                      {openCoupons && (
                        <div className="mt-2 w-full origin-top-right rounded-xl ring-1 ring-inset ring-white/5 focus:outline-none p-[0.060rem]">
                          <div className="py-1 bg-gray-200 rounded-xl w-full">
                            {availableCoupons.map(
                              (coupon) =>
                                !appliedCoupons.includes(coupon.code) && (
                                  <div
                                    key={coupon.code}
                                    className="flex p-2 justify-between"
                                  >
                                    <p
                                      className="block px-4 p-2 text-sm font-bold"
                                      role="menuitem"
                                      tabIndex="-1"
                                      id="menu-item-1"
                                    >
                                      {coupon.code}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleCouponApply(
                                          coupon.code,
                                          coupon.discount
                                        )
                                      }
                                      className="bg-white border-2 border-gray-500 text-black p-2 rounded-md h-full hover:bg-gray-200 font-medium w-24"
                                    >
                                      Apply
                                    </button>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* loyalty points */}
                {walletData["walletData"]["showLoyaltyPoints"] && (
                  <div>
                    <h2 className="text-lg font-medium">Loyalty Points</h2>
                    <p className="text-sm font-small">$5 for 100 points</p>
                    <div className="flex space-x-2">
                      <div className="flex-1 border p-2 rounded-md bg-white">
                        <h4 className="text-sm text-gray-800">
                          You have {redeemablePoints} points available for
                          redemption.
                        </h4>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={handleLoyaltyPointsRedeem}
                          className="bg-green-500 text-white p-2 rounded-md h-full hover:bg-green-600 w-[6rem]"
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Store credit */}
                {walletData["walletData"]["showStoreCredits"] && (
                  <div>
                    <h2 className="text-lg font-medium">Store Credits</h2>
                    <div className="flex space-x-2">
                      <div className="flex-1 border p-2 rounded-md bg-white">
                        <h4 className="text-sm text-gray-800">
                          You have ${storeCredits.toFixed(2)} in your store
                          credits
                        </h4>
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
                )}
              </div>
              <p className="text-gray-500 text-center pt-4">
                ---Or Pay Using Card---
              </p>
              <form
                method="post"
                className="flex-1 space-y-2 border p-4 rounded-md bg-white mt-4 lg:mt-0"
              >
                <label className="relative w-full flex flex-col">
                  <span className="mb-1.5">Card number</span>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-black"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <rect x="3" y="5" width="18" height="14" rx="3" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <line x1="7" y1="15" x2="7.01" y2="15" />
                      <line x1="11" y1="15" x2="13" y2="15" />
                    </svg>
                    <input
                      className="rounded-md pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                      type="text"
                      name="card_number"
                      placeholder="4242 4242 4242 4242"
                      defaultValue="4242 4242 4242 4242"
                    />
                  </div>
                </label>

                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <label className="relative flex-1 flex flex-col">
                    <span className="mb-1.5">Expire date</span>
                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <input
                        className="rounded-md pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        type="text"
                        name="expire_date"
                        placeholder="MM/YY"
                        defaultValue="12/25"
                      />
                    </div>
                  </label>

                  <label className="relative flex-1 flex flex-col">
                    <span className="flex items-center gap-3 mb-1.5">
                      CVC/CVV
                      <span className="relative group">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </span>
                    </span>
                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <input
                        className="rounded-md pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300 w-full"
                        type="text"
                        name="card_cvc"
                        placeholder="•••"
                        defaultValue="123"
                      />
                    </div>
                  </label>
                </div>
                <div className="w-full pt-2">
                  <a href="/submit-order">
                    <button
                      type="button"
                      className="bg-black text-white p-3 rounded-md w-full"
                    >
                      Pay
                    </button>
                  </a>
                </div>
              </form>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
};
export default CheckoutPage;
