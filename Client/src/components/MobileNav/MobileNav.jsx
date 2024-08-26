import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';
const MobileNav = ({navlinks}) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('top');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onChange}>
        </Radio.Group>
        <Button onClick={showDrawer} className='hover:bg-none border-none bg-transparent text-white'>
         <HiMiniBars3BottomRight size={25}/>
        </Button>
      </Space>
      <Drawer
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div className="">
            {
                navlinks.map((link) => (
                    <div className="hover:bg-red-400">
                        <Link to={link.route} key={link.label} className=" hover:border-b-2 hover:border-[#ff4700] uppercase font-light text-base">
                        <li className="list-none py-2">{link.label}</li>
                        </Link>
                    </div>
                ))
            }
        </div>
        
      </Drawer>
    </>
  );
};
export default MobileNav;