/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import Divider from '@mui/material/Divider';
import { LikeItem } from '../../constant';
import rupee from '../../assets/image.png'
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { toast, Toaster } from 'react-hot-toast';
// import {resetCart} from "../../features/cartSlice"

export default function SwipeableTemporaryDrawer({icon}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
//  cart 
  const handleCheckOut = () => {
    if (!localStorage.getItem("token"))
    {
      toast.error("Please Login first")
    }
   
}

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

    // carthandles
    const cartItems = useSelector((state) => {
      return state.cart;
    });
    const { carts } = cartItems;
    // const dipatch = useDispatch();
    
    // const handleCartReset = () => {
    //   dipatch(resetCart());
    // };

  const list = (anchor) => (
    <Box
    sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 450 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
    className="no-scrollbar"
    >
      <div className="wrapper-main w-full">
        <div className="top text-center p-4 font-bold  text-black uppercase">
          <p>Your Cart {carts.length || 0}</p>
        </div>
        <Divider />
        {/* cart **************************************************/}
        <div className="cart-wrapper min-h-32 flex items-center flex-col p-4 ">
          <div className="flex flex-col items-center w-full p-4">
            {carts.length === 0 && (
              <h1 className="text-2xl font-bold tracking-wide uppercase">
                Your Cart Is Empty !
              </h1>
            )}
            {carts.length === 0 ? (
              <p className="pt-2">Add Your Favourite Item Here</p>
            ) : (
              <p className="font-bold text-xl uppercase">
                Your Cart have {carts.length} Items
              </p>
            )}
            <Link to="/product" className="w-full"></Link>
          </div>
          <div className="cart-container w-full flex flex-col gap-2 items-center justify-around max-h-[50vh] overflow-y-scroll  no-scrollbar">
            {/* cart items here */}
            {carts.length !== 0 &&
              carts.map((item) => (
                <div
                  className="flex justify-start max-h-[20rem] border-2 w-full items-center gap-2 p-2"
                  key={item.id}
                >
                  <div className="img p-2 bg-gray-300/20 w-1/2 h-24">
                    <Carousel
                      renderIndicator={false} 
                      autoPlay={true} infiniteLoop={true} 
                      showStatus={false} showThumbs={false}
                       showArrows={false}
                    >
                      {item.images.map((image, i) => (
                        <img
                          src={image}
                          alt={item.name}
                          className=" object-cover h-24 w-24"
                          key={i}
                        />
                      ))}
                    </Carousel>
                  </div>
                  <div className="flex items-start w-full  justify-around flex-col">
                    <p className="font-bold">{item.name.slice(0, 20)}</p>
                    <p className="flex items-center">
                      <img src={rupee} alt="" className="h-3" />
                      {item.price}
                    </p>
                    <div className="quantity"></div>
                  </div>
                </div>
              ))}
          </div>
          {carts.length !== 0 ? (
            <div className="flex gap-2 w-full items-center justify-center p-4">
              <Link
                to="/checkout"
                className="bg-blue-500 text-white"
              >
                <button className=" p-2  uppercase" onClick={handleCheckOut}>
                  Check Out
                </button>
              </Link>
              <button
                // onClick={handleCartReset}
                className=" p-2 bg-red-500 text-white uppercase"
                >
                Reset Cart
              </button>
            </div>
          ) : (
            <button className="w-full px-12 py-2 bg-black mt-4 text-white uppercase">
              Shop Now
            </button>
          )}
        </div>
        {/* cart-end */}
        {/* ************************************************** */}

        {/* like section */}
        {/* bastsellers category products */}
        <div className="like-item-wrapper mt-12">
          <div className="p-4 text-center uppercase bg-black font-bold text-white">
            <h1>You May Also Like</h1>
          </div>
          <div className="like-item_container max-h-full flex flex-col gap-4 w-full overflow-y-scroll pt-4  no-scrollbar">
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
    <>
      <Toaster/>
    <div>
      {(['right']).map((anchor) => (
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
      </>
  );
}
