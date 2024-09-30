import React from 'react';
import { FiRefreshCw } from "react-icons/fi";
const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className='px-4 group cursor-pointer flex gap-2 items-center w-fit rounded-md py-2 bg-[#0a2444] text-white uppercase'>
      <button className='' onClick={handleRefresh}>Refresh Page</button>
     <span className='group-hover:animate-spin transition-transform duration-500'> <FiRefreshCw/></span>
    </div>
  );
};

export default RefreshButton;
