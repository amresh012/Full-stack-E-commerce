/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
// import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { LikeItem } from '../../constant';
import rupee from '../../assets/image.png'

let CartCount = 0

export default function SwipeableTemporaryDrawer({icon}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor, open) =>
    (event ) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event).key === 'Tab' ||
          (event).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 450 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="wrapper-main">
        <div className="top text-center p-4 font-bold  text-black uppercase">
          <p>Your Cart {CartCount}</p>
        </div>
        <Divider />
        {/* cart **************************************************/}
        <div className="cart-wrapper min-h-32 flex items-center flex-col ">
          <div className="flex flex-col items-center w-full p-4">
            <h1 className="text-2xl font-bold tracking-wide uppercase">
              Your Cart Is Empty !
            </h1>
            <p className="pt-2">Add Your Favourite Item Here</p>
            <button className="w-full px-12 py-2 bg-black mt-4 text-white uppercase">
              Shop Now
            </button>
          </div>
          <div className="cart-container max-h-96 overflow-y-scroll  no-scrollbar"></div>
        </div>
        {/* cart-end */}
        {/* ************************************************** */}

        {/* like section */}
        <div className="like-item-wrapper">
          <div className="p-4 text-center uppercase bg-black font-bold text-white">
            <h1>You May Also Like</h1>
          </div>
          <div className="like-item_container max-h-[30rem] flex flex-col gap-4 w-full overflow-y-scroll pt-4  no-scrollbar">
            {LikeItem.map((item) => (
              <div className="flex gap-4 w-full items-center " key={item.name}>
                <div className="flex gap-2 p-2 ">
                  <div className="img p-2 bg-gray-300/20">
                    <img
                      src={item.ImgUrl}
                      alt={item.name}
                      className="h-20 w-20"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold">{item.name}</p>
                    <p className="flex items-center">
                      <img src={rupee} alt="" className="h-3" />
                      {item.price}
                    </p>
                  </div>
                </div>
                <div className="p-2  text-center uppercase bg-black hover:bg-black/80 cursor-pointer  text-white">
                  <h1>Add To Cart</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
  
  return (
    <div>
      {(['left']).map((anchor) => (
        <React.Fragment key={anchor}>
              <Button sx={{padding:0 , width:0, height:0}} onClick={toggleDrawer(anchor, true)}>{icon }</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
