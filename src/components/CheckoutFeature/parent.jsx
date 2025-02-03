import React, { useState } from 'react';
import CheckoutPage from './checkout'; 
import WalletPage from './Step1';
import PaymentSuccessPage from './SuccessPage';

function ParentPage() {
  const [currentPage, setCurrentPage] = useState('wallet'); // Manages which page to display
  const [walletData, setWalletData] = useState(null);

  const handleNextButtonClick = (data) => {
    // Go to CheckoutPage and save wallet data
    setCurrentPage('checkout');
    setWalletData(data);
  };

  const handlePaymentSuccess = () => {
    // Go to PaymentSuccessPage after payment
    setCurrentPage('success');
  };

  return (
    <div className='text-center'>
      <h2>Experience How Brand Wallet Works</h2>

      {currentPage === 'wallet' && (
        <WalletPage onNextButtonClick={handleNextButtonClick} />
      )}
      
      {currentPage === 'checkout' && (
        <CheckoutPage walletData={walletData} onPaymentSuccess={handlePaymentSuccess} />
      )}
      
      {currentPage === 'success' && <PaymentSuccessPage />}
    </div>
  );
}

export default ParentPage;
