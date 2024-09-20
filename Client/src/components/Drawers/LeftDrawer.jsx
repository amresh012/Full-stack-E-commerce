/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import rupee from '../../assets/image.png'
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { toast, Toaster } from 'react-hot-toast';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useMediaQuery } from '@mui/material';
import { useUpdateCartHook,useCartHooks, useResetCartHook,useDeleteCartHook } from '../../hooks/cartHooks';

export default function SwipeableTemporaryDrawer({icon}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { data } = useCartHooks();
const token = localStorage.getItem("token")
  // mediaquery for drawer width
const isMobile = useMediaQuery('(max-width: 600px)');
const isTablet = useMediaQuery('(min-width: 601px) and (max-width: 1024px)');

// useCarthook
const { mutation: resetCartMutation } = useResetCartHook()
const { mutation: removeitemCartMutation } = useDeleteCartHook()
const { mutation: updateCartItemMutation } = useUpdateCartHook()




// handleResetCart
const handleResetCart = (anchor) => {
  resetCartMutation.mutate();
  toggleDrawer(anchor, false); // Trigger cart reset
  toast.success("Cart has been reset!");
};
// handleRemoveItem
const handleRemoveItem =(item)=>{
  removeitemCartMutation.mutate(item._id)
  toast.success("item removed successfully")
}
// handleQuantity update
  const handleIncr = (item) => {
  updateCartItemMutation.mutate({id:item._id , type:"inc"})
  toast.success("Product Quantity updated by one Successfully")
}
  const handleDecr = (item) => {
    console.log(item)
    if (item.count === 1) {
      toast.error("Product quantity can't be less than 1");
      return;
    }
  updateCartItemMutation.mutate({ id: item._id, type: "dec" });
  toast.success("Product Quantity updated by one Successfully")
}


//  cart 
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
    <>
      <Toaster position='top-right' />
      <Box
        sx={{ width: isMobile ? 250 : isTablet ? 350 : 450 }}
        role="presentation"
        onKeyDown={toggleDrawer(anchor, false)}
        className="no-scrollbar"
      >
        <div className="wrapper-main w-full">
          <div className="top text-center p-4 font-bold  text-black uppercase">
            <p>Your Cart {data?.products?.length || 0}</p>
          </div>
          <Divider />
          {/* cart **************************************************/}
          <div className="cart-wrapper min-h-32 flex items-center flex-col p-4 ">
            <div className="flex flex-col items-center w-full p-4">
              {data?.products?.length === 0 && (
                <h1 className="text-2xl text-center font-bold tracking-wide uppercase">
                  Your Cart Is Empty !
                </h1>
              )}
              {data?.products?.length === 0 ? (
                <p className="pt-2 text-center w-full">
                  Add Your Favourite Item Here
                </p>
              ) : (
                <p className="font-bold text-xl uppercase">
                  Your Cart have {data?.products?.length} Items
                </p>
              )}
            </div>
            <div className="cart-container w-full flex flex-col gap-2 items-center justify-around max-h-[50vh] overflow-y-scroll  no-scrollbar">
              {/* cart items here */}
              {data?.products?.length !== 0 &&
                data?.products?.map((item) => (
                  <div
                    className="flex justify-start  border-2 w-full items-start gap-2 p-2 relative"
                    key={item?.id}
                  >
                    <span
                      className="text-red-500  cursor-pointer rounded-full absolute right-3 font-bold"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <IoIosCloseCircleOutline size={22} />
                    </span>
                    <div className="img p-2 bg-gray-300/20 w-1/2">
                      <Carousel
                        renderIndicator={false}
                        autoPlay={true}
                        infiniteLoop={true}
                        showStatus={false}
                        showThumbs={false}
                        showArrows={false}
                      >
                        {item?.url &&
                          item?.url.map((image, i) => (
                            <img
                              src={image}
                              alt={item?.name}
                              className=" object-cover h-24 w-24"
                              key={i}
                            />
                          ))}
                      </Carousel>
                    </div>
                    <div className="flex items-start w-full  justify-around flex-col">
                      <p className="font-bold">{item?.name?.slice(0, 20)}</p>
                      <p className="flex items-center">
                        <img src={rupee} alt="" className="h-3" />
                        {(+item?.price)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </p>
                      <p className="quantity">Qty: {item?.count}</p>
                      <div className="flex items-center  gap-2  rounded-full bg-[#0A2440]/10  w-fit p-2">
                        <button
                          className="bg-[#0A2440] active:scale-95 h-6 w-6 rounded-full text-white  "
                          onClick={() => handleIncr(item)}
                        >
                          +
                        </button>
                        <p className="">{item?.count}</p>
                        <button
                          className="bg-[#0A2440] h-6 w-6 active:scale-95 rounded-full text-white "
                          onClick={() => handleDecr(item)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {data?.products?.length !== 0 && token ? (
              <div className="flex flex-col  gap-2 w-full items-center justify-center p-4">
                <Link
                  to="/checkout"
                  className="bg-[#0A2440] text-white w-full text-center rounded-md active:scale-95"
                  onClick={toggleDrawer(anchor, false)}
                >
                  <button className=" p-2  uppercase">
                    Check Out{" "}
                    <span className="pl-2 font-light">
                      {" "}
                      ₹
                      {data?.totalCartValue
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </span>
                  </button>
                </Link>

                <button
                  onClick={handleResetCart}
                  className=" p-2 bg-red-500 text-white uppercase  w-full text-center rounded-md active:scale-95"
                >
                  Reset Cart
                </button>
              </div>
            ) : (
              <div onClick={toggleDrawer(anchor, false)} className="w-full">
                <Link to="/product">
                  <button className="w-full px-12 py-2 bg-[#0A2440] mt-4 text-white uppercase">
                    Shop Now
                  </button>
                </Link>
              </div>
            )}
          </div>
          {/* cart-end */}
          {/* ************************************************** */}
        </div>
      </Box>
    </>
  );
  
  return (
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
  );
}
