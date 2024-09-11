/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { links } from "../../constant";
import { GoDash } from 'react-icons/go';
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
          <HiMiniBars3BottomRight size={30} />
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
                {
                  item.label === "Home Gym" || item.label ==="Products"?<div className="w-[25rem]">
                  <ul className="overflow-y-scroll max-h-[20rem] no-scrollbar">
                    <li className="bg-[#0a2444] text-white p-2 text-xl ">{item.label}</li>
                    {links.map((item,ind) => (
                      <div key={ind} className="p-2  duration-300 underline-offset-8 flex flex-col  gap-1">
                        {/* <GoDash className="text-indigo-500 font-bold" /> */}
                        <li onClick={() => window.location.replace(`/product-category${item.route}`)} className="">{item.name}</li>
                        {item.submenu &&
                          item.sublink.map((sublink, ind) => (
                            <ul
                              key={ind}
                              className=" flex flex-col gap-2 justify-start  font-medium hover:underline-none items-start"
                            >
                              <div onClick={() => window.location.replace("/product-category"+sublink.route)} className="flex">
                                <GoDash />
                                <li
                                  className="hover:underline-none hover:font-bold hover:pl-2 duration-300"
                                  key={sublink.key}
                                >
                                  {sublink.label}
                                </li>
                              </div>
                            </ul>
                          ))}
                      </div>
                    ))}
                  </ul>
                </div>
                   :
                <li className="p-2 list-none font-bold text-xl" onClick={onClose}> {item.label}</li>
                }
              </Link>
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};
export default MobileNav;