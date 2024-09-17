import React from 'react';

const PaymentsPolicy = () => {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 ">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Payments Policy</h1>
        <p className="text-gray-600 mb-4">
          We offer a variety of payment options to ensure your shopping experience is convenient and secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Accepted Payment Methods</h2>
        <p className="text-gray-600 mb-4">
          We accept the following payment methods:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Credit/Debit Cards (Visa, MasterCard, American Express)</li>
          <li>PayPal</li>
          <li>Bank Transfers</li>
          <li>Gift Cards</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Payment Security</h2>
        <p className="text-gray-600 mb-4">
          Your payment information is processed securely. We do not store credit card details, and all transactions are encrypted.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Billing Information</h2>
        <p className="text-gray-600 mb-4">
          Please ensure that your billing information is accurate and up-to-date. Incorrect billing details may delay your order.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Payment Confirmation</h2>
        <p className="text-gray-600 mb-4">
          After your payment is successfully processed, you will receive a confirmation email with the details of your order.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions or concerns about our payment methods, please contact us at <span className='text-blue-400 underline'>support@kfsfitness.com</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentsPolicy;
