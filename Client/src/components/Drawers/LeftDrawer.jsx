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
import {resetCart ,removeItem }  from "../../features/cartSlice"
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useMediaQuery } from '@mui/material';
export default function SwipeableTemporaryDrawer({icon}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // mediaquery for drawer width
const isMobile = useMediaQuery('(max-width: 600px)');
const isTablet = useMediaQuery('(min-width: 601px) and (max-width: 1024px)');
const isDesktop = useMediaQuery('(min-width: 1025px)');


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

    // carthandles
    const cartItems = useSelector((state) => {
      return state.cart;
    });
    const { carts ,totalAmount,totalQuantity } = cartItems;
    const dispatch = useDispatch();
    
    const handleCartReset = () => {
      dispatch(resetCart());
    };
     
    const handleRemoveItem= (id)=>{
      dispatch(removeItem(id))
    }

    // quantity
    const handleIncr = (quantity)=>{
      quantity < 5 &&  quantity++
     }
     const handleDecr = (quantity)=>{
      quantity> 1 && quantity--
     }
  const list = (anchor) => (
    <Box
    sx={{ width:  isMobile ? 250 : isTablet? 350 : 450 }}
    role="presentation"
    // onClick={toggleDrawer(anchor, false)}
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
              <h1 className="text-2xl text-center font-bold tracking-wide uppercase">
                Your Cart Is Empty !
              </h1>
            )}
            {carts.length === 0 ? (
              <p className="pt-2 text-center w-full">Add Your Favourite Item Here</p>
            ) : (
              <p className="font-bold text-xl uppercase">
                Your Cart have {carts.length} Items
              </p>
            )}
          </div>
          <div className="cart-container w-full flex flex-col gap-2 items-center justify-around max-h-[50vh] overflow-y-scroll  no-scrollbar">
            {/* cart items here */}
            {carts.length !== 0 &&
              carts?.map((item) => (
                <div
                  className="flex justify-start  border-2 w-full items-start gap-2 p-2 relative"
                  key={item.id}
                >
                  <span className='text-red-500  cursor-pointer rounded-full absolute right-3 font-bold' onClick={()=>handleRemoveItem(item)}><IoIosCloseCircleOutline size={22}/></span>
                  <div className="img p-2 bg-gray-300/20 w-1/2">
                    <Carousel
                      renderIndicator={false} 
                      autoPlay={true} infiniteLoop={true} 
                      showStatus={false} showThumbs={false}
                       showArrows={false}
                    >
                      {item.images &&  item?.images.map((image, i) => (
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
                    <p className="quantity">{totalQuantity}</p>
                    <div className="flex items-center  gap-2  rounded-full bg-[#0A2440]/10  w-fit p-2">
                    <button className='bg-[#0A2440] active:scale-95 h-6 w-6 rounded-full text-white  ' onClick={handleIncr(item.quantity)}>+</button>
                    <p className=''>{item.quantity}</p>
                    <button  className='bg-[#0A2440] h-6 w-6 active:scale-95 rounded-full text-white ' onClick={handleDecr(item.quantity)}>-</button>
                  </div>
                  </div>
                </div>
              ))}
          </div>
          {carts.length !== 0 ? (
            <div className="flex flex-col  gap-2 w-full items-center justify-center p-4">
              <Link
                to="/checkout"
                className="bg-blue-500 text-white w-full text-center rounded-md active:scale-95"
              >
                <button className=" p-2  uppercase">
                  Check Out
                </button>
              </Link>
              <button
                onClick={handleCartReset}
                className=" p-2 bg-red-500 text-white uppercase  w-full text-center rounded-md active:scale-95"
                >
                Reset Cart
              </button>
            </div>
          ) : (
            <div onClick={toggleDrawer(anchor, false)} className='w-full'>
              <Link  to="/product">
             <button className="w-full px-12 py-2 bg-[#0A2440] mt-4 text-white uppercase">
              Shop Now
            </button>
           </Link>
            </div>
          )}
        </div>
        {/* cart-end */}
        {/* ************************************************** */}

        {/* like section */}
        {/* bastsellers category products */}
        {/* <div className="like-item-wrapper mt-12">
          <div className="p-4 text-center uppercase bg-[#0A2440] font-bold text-white">
            <h1>You May Also Like</h1>
          </div>
          <div className="like-item_container max-h-full p-2 flex flex-col gap-4 w-full overflow-y-scroll  no-scrollbar">
            {LikeItem.map((item) => (
              <div className="flex flex-col lg:flex-row gap-4 w-full items-center " key={item.name}>
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
                <div className="p-2 w-full lg:w-fit rounded-md text-base  text-center uppercase bg-[#0A2440] hover:bg-[#0A2440]/80 cursor-pointer  text-white">
                  <h1>Add To Cart</h1>
                </div>
              </div>
            ))}
          </div>
        </div> */}
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
