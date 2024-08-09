import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: 'Availibility',
    children: [
      {
        key: '11',
        label: 'In Stock',
      },
      {
        key: '12',
        label: 'Out Of Stock',
      },
    ],
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: 'Price',
    children: [
      {
        key: '21',
        label: 'Option 1',
      },
      {
        key: '22',
        label: 'Option 2',
      },
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: 'Sort By',
    children: [
        {
           key:"0",
           label:"Featured"
        },
        {
           key:"1",
           label:"Best Selling"
        },
        {
           key:"2",
           label:"Alphabatically, A-Z"
        },
        {
           key:"3",
           label:"Alphabatically, A-Z"
        },
        {
           key:"4",
           label:"Price, Low-High"
        },
        {
           key:"5",
           label:"Price, High-Low"
        },
        {
           key:"6",
           label:"Date, Old-New"
        },
        {
           key:"7",
           label:"Date, New-Old"
        }
    ] 
,
  },
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);
const Filter = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['3', '23']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
        height:400
      }}
      items={items}
    />
  );
};
export default Filter;