import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const PaymentSuccessPage = () => {
  const orderId = uuidv4();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-8">Thank you for your purchase. Your order has been successfully processed.</p>
      <p className="text-sm text-gray-500 mb-8">Order ID: {orderId}</p>
    <form action="/components/all-features">
      <div className="flex space-x-4">
        <button className="bg-green-500 text-white p-3 rounded-md">
          Restart Demo 
        </button>
        <button  className="bg-blue-500 text-white p-3 rounded-md">
          Sign Up Now
        </button>
      </div>
    </form>
    </div>
  );
};

export default PaymentSuccessPage;