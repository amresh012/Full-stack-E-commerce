import { FiRefreshCw } from "react-icons/fi";
const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div title="Page Refresh" className='cursor-pointer group  duration-300'>
     <span  onClick={handleRefresh} className='group-hover:animate-spin transition-transform duration-500'>
       <FiRefreshCw/>
       </span>
    </div>
  );
};

export default RefreshButton;
