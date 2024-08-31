// import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { applyCouponcode } from "../../features/cartSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {removeItem } from "../../features/cartSlice";
import { addcarts } from "../../features/cartSlice";
import { base_url } from "../../Utils/baseUrl";
import {Link} from "react-router-dom"
const CheckOut = () => {
  //generate teperory random id 

  function generateRandomId(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

  const { carts, totalAmount} = useSelector((state) => state.cart);
  const {user , token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
      const amount = totalAmount * 100;
      const currency = "INR";
      const receiptId = `recipt_${Math.random()*1000}`;
      const  address={
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
      }
      const id = Math.random()*6
  const paymentHandler = async (e) => {
    const response = await fetch( `${ base_url}payment/createOrder`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
        cartItems:carts,
        address:address,
        userId: generateRandomId()
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    const {orderId , amount:order_amount} = order

    var options = {
      key: "rzp_test_oLA0LztRZUjDkX", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "KFS Fitness", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id:orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          `${ base_url}payment/verifyPayments`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: user?.name, //your customer's name
        email: user?.email,
        contact: user?.mobile //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: address
      },
      theme: {
        color: "#0a2444",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };


  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleIncr = (item) => {
    dispatch(addcarts(item));
  };

  const handleDecr = (item) => {
    dispatch(removeItem(item));
  };
  return (
    <>
      <div className=" flex p-4">
        <div className="left-box w-[100vw] h-full p-4 ">
          <div className="bg-gray-100 rounded-md p-2 ">
            <h1 className="text-2xl font-bold uppercase">Cart CheckOut</h1>
            <p className="item">{carts.length} Item in your cart</p>
          </div>
          <div className="cart-items">
            <div className="cart-container w-full flex flex-col gap-2 items-center justify-around max-h-[50vh] overflow-y-scroll  no-scrollbar">
              {/* cart items here */}
              {carts.length === 0 ?
                 <div className="h-full w-full bg-white  capitalize text-xl font-bold grid place-content-center text-center ">
                 <img
                   src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                   alt=""
                   className="h-44 "
                 />
                 <p className="text-2xl font-bold text-gray-500">Your Cart is Empty</p>
                 <Link to='/product'>
                   <button className="mt-12 bg-[#0a2444] text-white p-2 rounded-md">
                     Continue Shopping
                   </button>
                 </Link>
               </div>
               : carts?.map((item) => (
                  <div
                    className="flex  border-2 w-full items-start justify-start gap-2 p-2 relative"
                    key={item.id}
                  >
                    <span
                      className="text-red-500  cursor-pointer rounded-full absolute right-3 font-bold"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <IoIosCloseCircleOutline size={22} />
                    </span>
                    <div className="img p-2 w-fit">
                      {item.images && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className=" object-cover h-44 w-44"
                        />
                      )}
                    </div>
                    <div className="flex items-start w-full pt-2  justify-around flex-col">
                      <p className="font-bold">{item.name.slice(0, 20)}</p>
                      <p className="flex items-center">
                        <LiaRupeeSignSolid />
                        {(+item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </p>
                      <p className="quantity">{item.quantity}</p>
                      <div className="flex items-center  gap-2  rounded-full bg-[#0A2440]/10  w-fit p-2">
                        <button
                          className="bg-[#0A2440] active:scale-95 h-6 w-6 rounded-full text-white  "
                          onClick={() => handleIncr(item)}
                        >
                          +
                        </button>
                        <p className="">{item.quantity}</p>
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
          </div>
        </div>
        <div className="right-box h-fit p-4 bg-gray-100 rounded-md shadow-sm mt-4">
          <div className="address h-24">
            <h1>Shipping Address</h1>
              <div className="">
                <span>Na</span>
              </div>
          </div>
          <div className=" p-4 Copoun-Code rounded-md space-y-4">
            <div className=" space-y-2">
              <h1 className="text-2xl font-bold">Copoun Code</h1>
              <p className="some-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis recusandae accusamus dolor maiores.
              </p>
            </div>
            <div className="copoun-input flex flex-col gap-4 ">
              <input
                type="text"
                value={20}
                className="h-12 rounded-full border px-4 placeholder:px-2 focus:outline-[#0A2440]"
                placeholder="Enter your copoun code"
              />
              <button className="bg-[#0A2440] text-white p-2 rounded-md">
                Apply Copoun
              </button>
            </div>
          </div>
          <div className="cart-box p-4 space-y-2">
            <div className="bg-[#0A2440] text-white p-4 rounded-md uppercase font-bold">
              <h1>Cart Total</h1>
            </div>
            <div className="calculation-box border-2 p-2 rounded-md bg-gray-200">
              <div className="sub-total flex justify-between p-2 ">
                <p className="">Sub Total</p>
                <p className=" font-bold flex gap-1 items-center">
                  <LiaRupeeSignSolid />
                  {totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </p>
              </div>

              <div className="sub-total flex justify-between p-2">
                <p>Copoun Discount</p>
                <p className=" font-bold flex gap-1 items-center">
                  <LiaRupeeSignSolid />
                  {/* {totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} */}
                  0
                </p>
              </div>

              {/* <div className="sub-total flex justify-between p-2">
                <p>Shipping Charges</p>
                <p className=" font-bold flex gap-1 items-center ">
                  <LiaRupeeSignSolid />
                  {totalAmount}
                </p>
              </div> */}

              <div className="sub-total flex justify-between p-2 font-bold text-xl">
                <p>Cart Total</p>
                <p className=" font-bold flex gap-1 items-center">
                  <LiaRupeeSignSolid />
                  {totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </p>
              </div>
            </div>
              <div 
             className="checkout-button w-full flex items-center justify-center" 
             onClick={paymentHandler}>
               <button className="bg-[#0A2440] w-full text-white p-2 rounded-md">
                 CheckOut
               </button>
             </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
