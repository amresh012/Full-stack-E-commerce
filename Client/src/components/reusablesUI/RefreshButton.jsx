import React from 'react';
import { FiRefreshCw } from "react-icons/fi";
const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className='px-4 flex gap-2 items-center w-fit rounded-md py-2 bg-[#0a2444] text-white uppercase'>
      <button className='' onClick={handleRefresh}>Refresh Page</button>
      <FiRefreshCw/>
    </div>
  );
};

export default RefreshButton;
