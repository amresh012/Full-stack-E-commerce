/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import Megamenu from '../MegaMenu/Megamenu';
import { BiPlus } from 'react-icons/bi';
const MobileNav = ({ navlinks }) => {


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
        <Radio.Group value={placement} onChange={onChange}></Radio.Group>
        <Button
          className="bg-transparent border-none text-white p-0 pt-2 "
          onClick={showDrawer}
        >
          <HiMiniBars3BottomRight size={25} />
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
          {navlinks.map((item) => (
            <div className="" key={item.id}>
              <Link
                to={item.route}
                key={item.label}
                className=" hover:border-b-2 hover:border-[#ff4700] uppercase font-light text-base"
              >
                <li className="p-2 list-none"> {item.label}</li>
              </Link>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};
export default MobileNav;