import React, { useState } from 'react';
import CheckoutPage from './checkout'; // Make sure to import the correct file path
import WalletPage from './Step1'; // Make sure to import the correct file path

function ParentPage() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [walletData, setWalletData] = useState(null);

  const handleNextButtonClick = (data) => {
    // Set showCheckout to true when the "Next" button is clicked
    setShowCheckout(true);
    // Store wallet data in state
    setWalletData(data);
  };

  return (
    <div>
      <div className='py-4'>
        {!showCheckout && (
          <WalletPage onNextButtonClick={handleNextButtonClick} />
        )}
      </div>
      {showCheckout && (
        <div>
          {/* Pass the walletData as a prop to CheckoutPage */}
          <CheckoutPage walletData={walletData} />
        </div>
      )}
    </div>
  );
}

export default ParentPage;