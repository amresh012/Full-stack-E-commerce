import React from 'react';

const RefundPolicy = () => {
  return (
    <div className=" py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 ">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Refund Policy</h1>
        <p className="text-gray-600 mb-4">
          Thank you for shopping with us. If you are not entirely satisfied with your purchase, we're here to help.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Returns</h2>
        <p className="text-gray-600 mb-4">
          You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging and must have the receipt or proof of purchase.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Refunds</h2>
        <p className="text-gray-600 mb-4">
          Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you of the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain amount of days, depending on your card issuer's policies.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Shipping</h2>
        <p className="text-gray-600 mb-4">
          You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions on how to return your item to us, contact us at support@kfsfitness.com.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
