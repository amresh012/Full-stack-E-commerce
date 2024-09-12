/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

// Modal component
const ShippingModal = ({ data, isOpen, setIsOpen,onShippingSelect }) => {
    // 
  const [selectedShipping, setSelectedShipping] = useState(null);
  
  useEffect(() => {
    if (data.length <= 0 || data === null || data === undefined) {
      setIsOpen(false);
      return
    }
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);
  const handleSelectShipping = (item) => {
    setSelectedShipping(item);
    onShippingSelect(item)
    setIsOpen(false)
    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white w-3/4 md:w-1/2 p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[80vh]">
      <button
        className="absolute top-2 right-2 text-xl font-bold"
        onClick={() => setIsOpen(false)}
      >
        &times;
      </button>
      <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>

      {/* Map over the array of shipping data */}
      {data?.length <=0 ? 
      <div className="text-xl h-[20rem] w-full flex items-center  justify-center">
        <p>No shipping options available</p>
      </div>
       :
      data?.map((item, index) => (
        <div key={index} className="border-b-2 mb-4 pb-4">
          <div className="mb-2 bg-[#0a2444] p-2 text-white flex justify-between ">
          <h3 className="text-lg font-semibold ">Shipping Option {index + 1}</h3>
          <div className="flex items-center gap-2 justify-center">
            <span>Select</span>
            <input
              type="checkbox"
              className=""
              checked={selectedShipping?.id === item.id}
              onChange={() => handleSelectShipping(item)}
            />
          </div>
          </div>
          <div className="space-y-2">
            <p><strong >Courier Company Name:</strong> {item.courier_name}</p>
            <p><strong>City:</strong> {item.city}</p>
            <p><strong>State:</strong> {item.state}</p>
            <p className='font-bold bg-red-200 w-fit p-2 text-red-500'><strong>COD Charges:</strong> {item.cod_charges}</p>
            <p><strong>Freight Charge:</strong> {item.freight_charge}</p>
            <p><strong>Estimated Delivery Date:</strong> {item.etd}</p>
            <p><strong>Courier Type:</strong> {item.courier_type}</p>
            <p><strong>Charge Weight:</strong> {item.charge_weight}</p>
            <p><strong>Rating:</strong> {item.rating}</p>
            <p><strong>Real-time Tracking:</strong> {item.realtime_tracking}</p>
            <p><strong>RTO Charges:</strong> {item.rto_charges}</p>
            <p><strong>Pickup Performance:</strong> {item.pickup_performance}</p>
          </div>
        </div>
      ))}

      <button
        className="mt-6 bg-blue-600 text-white p-2 rounded-md w-full"
        onClick={() => setIsOpen(false)}
      >
        Close
      </button>
    </div>
  </div>
  );
};

export default ShippingModal