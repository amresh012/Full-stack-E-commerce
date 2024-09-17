import React from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, MedicineBoxFilled } from '@ant-design/icons';
import { Steps } from 'antd';
import { CiBoxes } from "react-icons/ci";
import { MdOutlineCurrencyRupee } from "react-icons/md";


const Stepper = () => (
  <Steps
    items={[
      {
        title: 'Order Confirmed',
        status: 'finish',
        icon: <CiBoxes />,
      },
      {
        title: 'Payment Verified',
        status: 'finish',
        icon: <MdOutlineCurrencyRupee />,
      },
      {
        title: 'Shipping',
        status: 'process',
        icon: <LoadingOutlined />,
      },
      {
        title: 'Deliverd',
        status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
  />
);
export default Stepper;