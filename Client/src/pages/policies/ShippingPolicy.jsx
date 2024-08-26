import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className=" py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 ">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Shipping Policy</h1>
        <p className="text-gray-600 mb-4">
          Thank you for shopping with us. Below are the terms and conditions that constitute our Shipping Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Shipping Processing Time</h2>
        <p className="text-gray-600 mb-4">
          All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Shipping Rates & Delivery Estimates</h2>
        <p className="text-gray-600 mb-4">
          Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Shipment Confirmation & Order Tracking</h2>
        <p className="text-gray-600 mb-4">
          You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Customs, Duties, and Taxes</h2>
        <p className="text-gray-600 mb-4">
          [Your Company Name] is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Damages</h2>
        <p className="text-gray-600 mb-4">
          [Your Company Name] is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">International Shipping Policy</h2>
        <p className="text-gray-600 mb-4">
          We currently do not ship outside [your country]. If you need international shipping, please contact us for more details.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-700">Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions about our Shipping Policy, please contact us at shipping@example.com.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
