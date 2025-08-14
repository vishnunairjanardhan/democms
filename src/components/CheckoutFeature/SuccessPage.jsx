import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const PaymentSuccessPage = () => {
  const orderId = uuidv4();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-8 text-center">Thank you for your purchase. Your order has been successfully processed.</p>
      <p className="text-sm text-gray-500 mb-8">Order ID: {orderId}</p>
      <form action="/components/all-features">
        <div className="flex space-x-4">
          <a href="/components/all-features" className="raise1 bg-black group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] text-white p-3 rounded-md">
            Restart Demo
          </a>
          <a href="https://giftcard.99minds.io/access/register" className="raise1 group-hover:bg-opacity-10 bg-white border border-solid border-black rounded-lg hover:bg-gray-200 font-medium text-black p-3 rounded-md">
            Sign Up Now
          </a>
        </div>
      </form>
    </div>
  );
};

export default PaymentSuccessPage;
