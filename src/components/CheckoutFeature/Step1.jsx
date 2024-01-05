import React, { useState } from 'react';

const WalletPage = ({ onNextButtonClick }) => {
    const [brandName, setBrandName] = useState('');
    const [showCoupons, setShowCoupons] = useState(true);
    const [showGiftCard, setShowGiftCard] = useState(true);
    const [showLoyaltyPoints, setShowLoyaltyPoints] = useState(true);
    const [showStoreCredits, setShowStoreCredits] = useState(true);
    const [formErrors, setFormErrors] = useState({});
    const handleSubmit = () => {
        const errors = {};
        if (!brandName.trim()) {
            errors.brandName = 'Brand Name is required';
        }
        if (Object.keys(errors).length === 0) {
            onNextButtonClick({
                brandName,
                showCoupons,
                showGiftCard,
                showLoyaltyPoints,
                showStoreCredits,
            });
        } else {
            setFormErrors(errors);
        }
    };
    return (
        <article className="relative py-12 mx-auto max-w-7xl lg:py-24 w-full">
            <div className="flex flex-col items-center justify-center h-screen text-white">
                <h1 className="text-2xl font-bold mb-4">Create Your Brand Wallet</h1>
                <div className="mb-4">
                    <label htmlFor="brandName" className="mr-2">
                        Brand Name:
                    </label>
                    <input
                        type="text"
                        id="brandName"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder='Enter your wallet name'
                        className={`border p-2 rounded-md text-black ${formErrors.brandName ? 'border-red-500' : ''}`}
                    />
                    {formErrors.brandName && (
                        <p className="text-red-500 text-sm">{formErrors.brandName}</p>
                    )}
                </div>
                <h1 className='p-2 pb-2 font-bold text-xl'>Customize Your Wallet</h1>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => setShowGiftCard(!showGiftCard)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${showGiftCard ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                aria-hidden="true"
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showGiftCard ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                            ></span>
                        </button>
                        <label htmlFor="giftCardCheckbox" className="ml-2">
                            Gift Card
                        </label>
                    </div>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => setShowCoupons(!showCoupons)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${showCoupons ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                aria-hidden="true"
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showCoupons ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                            ></span>
                        </button>
                        <label htmlFor="giftCardCheckbox" className="ml-2">
                            Coupon
                        </label>
                    </div>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => setShowLoyaltyPoints(!showLoyaltyPoints)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${showLoyaltyPoints ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                aria-hidden="true"
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showLoyaltyPoints ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                            ></span>
                        </button>
                        <label htmlFor="giftCardCheckbox" className="ml-2">
                            Loyalty Points
                        </label>
                    </div>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => setShowStoreCredits(!showStoreCredits)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${showStoreCredits ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                aria-hidden="true"
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showStoreCredits ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                            ></span>
                        </button>
                        <label htmlFor="giftCardCheckbox" className="ml-2">
                            Store Credit
                        </label>
                    </div>
                </div>
                <div className="p-2">
                    <button
                        type="button"
                        className="relative p-1 mt-4 flex inline-flex m-4 items-center justify-center font-bold overflow-hidden group rounded-md"
                        onClick={handleSubmit}
                    >
                        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                        <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-100 duration-400 w-full">
                            <span className="relative text-white flex items-center justify-center">
                                <h1 className="px-2">Next</h1>
                            </span>
                        </span>
                    </button>
                </div>
                <h1 className="text-xl font-bold pb-2">Wallet Preview</h1>
                <div className="lg:flex">
                    <div className="pb-4 h-60 w-80">
                        <form
                            action="/components/all-features"
                            className="flex-1 space-y-2 border p-4 pb-4 rounded-md bg-white text-black"
                        >
                            <div>
                                <button
                                    type="button"
                                    className="relative p-1 flex inline-flex items-center justify-center font-bold overflow-hidden group rounded-md w-full"
                                >
                                    <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                                    <span className="relative px-4 py-2 transition-all ease-out bg-gray-900 bg-opacity-0 rounded-md group-hover:bg-opacity-100 duration-400 w-full">
                                        <span className="relative text-white flex items-center justify-center">
                                            <h1 className="px-2">{brandName}</h1>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-wallet2"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                                            </svg>
                                        </span>
                                    </span>
                                </button>
                            </div>
                            <div className="flex-1 border p-4 rounded-md space-y-1">
                                {showGiftCard && (
                                    <div>
                                        <h2 className="text-lg font-medium">Gift Cards</h2>
                                        <div className="flex space-x-2">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    id="giftCardCode"
                                                    name="giftCardCode"
                                                    className="p-2 w-full rounded-md bg-gray-200"
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="bg-green-500 text-white p-2 rounded-md h-full hover:bg-green-600 w-24"
                                                >
                                                    Redeem
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showCoupons && (
                                    <div>
                                        <h2 className="text-lg font-medium">Coupons</h2>
                                        <div className="flex space-x-2">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    id="giftCardCode"
                                                    name="giftCardCode"
                                                    className="p-2 w-full rounded-md bg-gray-200"
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="bg-green-500 text-white p-2 rounded-md h-full hover:bg-green-600 w-24"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showLoyaltyPoints && (
                                    <div>
                                        <h2 className="text-lg font-medium">Loyalty points</h2>
                                        <div className="flex space-x-2">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    id="giftCardCode"
                                                    name="giftCardCode"
                                                    className="p-2 w-full rounded-md bg-gray-200"
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="bg-green-500 text-white p-2 rounded-md h-full hover:bg-green-600 w-24"
                                                >
                                                    Redeem
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showStoreCredits && (
                                    <div>
                                        <h2 className="text-lg font-medium">Store credits</h2>
                                        <div className="flex space-x-2">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    id="giftCardCode"
                                                    name="giftCardCode"
                                                    className="p-2 w-full rounded-md bg-gray-200"
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="bg-green-500 text-white p-2 rounded-md h-full hover:bg-green-600 w-24"
                                                >
                                                    Redeem
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default WalletPage;