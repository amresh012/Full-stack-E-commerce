// import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { base_url } from "../../Utils/baseUrl";
import {Link} from "react-router-dom"
import { config } from "../../Utils/axiosConfig";
import Copoun from "../../components/Copoun/Copoun"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import ShippingModal from "../../components/Models/ShippingModel";
import {
  useCartHooks,
  useDeleteCartHook,
  useUpdateCartHook,
  useResetCartHook
} from "../../hooks/cartHooks";
import toast, { Toaster } from "react-hot-toast";

const CheckOut = () => {
   const [user , setUser] = useState([])
  //  getUser
  const User = useSelector((state) => state.auth.user)
  const id = localStorage.getItem("id") || User?._id
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id)
        try {
          const response = await fetch(`${base_url}user/${id}`, {
            method: "GET",
            ...config,
          });
          const data = await response.json();
          if (!data.error) {
            setUser(data);
          }
        } catch (error) {
          toast.error(error.message);
        }
    };
    fetchUserDetails();
  }, []);


  const selectedAddress = useSelector((state) => state.address); // Access selected address
  const newAdd = selectedAddress?.selectedAddress;
  const deliverpin = newAdd?.zipcode;
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [couriercompnies, setCourierCompnies] = useState([]);
  const [selectedShiping, setSelectedShipping] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isdisabled , setDisabled]  = useState(false)
  const token = localStorage.getItem("token");

  // to close the model if there is no courier company
  useEffect(() => {
    if (!couriercompnies && couriercompnies?.length <= 0) {
      setIsModalOpen(false);
    }
  }, [couriercompnies]);

  const { data: cartItems } = useCartHooks();
  const { mutation: removeitemCartMutation } = useDeleteCartHook();
  const { mutation: updateCartItemMutation } = useUpdateCartHook();
  const { mutation: resetCartMutation } = useResetCartHook()


  // getting auth fouserId name email mobile data from authSlice
  // calculating total checkout amount after adding Shipping Charges from shiprocket api
  const deliverCharge = Number(
    selectedShiping?.freight_charge?.toFixed(0) || 0
  );
  let CartTotal = cartItems?.totalCartValue + deliverCharge;
  // calculate discount
  if (discountType === "percentage" && discount > 0) {
    CartTotal = CartTotal - CartTotal * (discount / 100);
  } else if (discountType === "fixed") {
    CartTotal = CartTotal - discount;
  }
  // handle reset cart
  const handleResetCart = () => {
    resetCartMutation.mutate();
    toast.success("Cart has been reset!");
  };



  // data to create order in Razorpay for payments
  const amount = CartTotal;
  const currency = "INR";
  const receiptId = `recipt_${Math.random() * 100}`;
  const address = newAdd;

  //Function for getting Shipping Partners and
  const calculateShippingCharge = async () => {
    const pickup_postcode = "121004"; // Replace with your pickup postcode
    const delivery_postcode = deliverpin || ""; // Use the user's pincode
    const weight = cartItems?.totalCartWeight || 0;

    const response = await fetch(
      `${base_url}shiprocket/shiprocket-rate-calculation`,
      {
        method: "POST",
        body: JSON.stringify({
          pickup_postcode,
          delivery_postcode,
          weight,
          declared_value: cartItems?.totalCartValue,
        }),
        ...config,
      }
    );

    const data = await response.json();
    if (data?.status) {
      setCourierCompnies(data?.mainset?.data?.available_courier_companies);
    } else {
      console.error("Error fetching shipping charges:", data?.message);
    }
  };

  // Call the shipping charge calculation when the component mounts or address changes
  // useEffect(() => {
  //   if (cartItems?.products?.length > 0) {
  //     calculateShippingCharge();
  //   }
  // }, [cartItems , selectedShiping]);
  // Calculate Shipping Charges on Orders

  const handleShippingSelect = (shippingData) => {
    if (shippingData) {
      setSelectedShipping(shippingData);
    } else {
      toast.error("No Courier Company Selected");
    } // Store the selected shipping option in the state
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    if(!newAdd){
      toast("Please Select a Shipping Address")
      return
    }
    try {
      const response = await fetch(`${base_url}payment/createOrder`, {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
          cartItems: cartItems?.products,
          address: address,
          user: user,
        }),
        ...config,
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const order = await response.json();

        const {
          orderId,
          amount: order_amount,
          cartItems,
          address: orderaddress,
        } = order;

        var options = {
          key: "rzp_test_oLA0LztRZUjDkX",
          // key:"rzp_live_74Bq9petAbrxL2",
          amount: order_amount,
          currency,
          name: "KFS Fitness",
          description: "Transaction",
          image: "https://images.deepmart.shop",
          order_id: orderId,
          handler: async function (response) {
            const paymentData = {
              paymentId: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: order_amount,
              items: cartItems,
              address: orderaddress,
              user: user,
            };

            try {
              const validateRes = await fetch(
                `${base_url}payment/verifyPayment`,
                {
                  method: "POST",
                  ...config,
                  body: JSON.stringify(paymentData),
                }
              );

              // Check the response content type
              const validateContentType =
                validateRes.headers.get("content-type");
              if (
                validateContentType &&
                validateContentType.includes("application/json")
              ) {
                // eslint-disable-next-line no-unused-vars
                const jsonRes = await validateRes.json();

                const orderCreateResponse = await fetch(
                  `${base_url}shiprocket`,
                  {
                    method: "POST",
                    ...config,
                    body: JSON.stringify({
                      addr: newAdd,
                      email: user?.email,
                      productinfo: cartItems
                        ?.map((item) => item._id)
                        ?.join(" "),
                      amount: order_amount,
                    }),
                  }
                );
                const orderData = await orderCreateResponse.json();
                const datatosend = { user, address, ...paymentData };
                const CreateUserOrder = await fetch(
                  `${base_url}order/create-order`,
                  {
                    method: "POST",
                    ...config,
                    body: JSON.stringify({
                      datatosend,
                    }),
                  }
                );
                const UserOrders = await CreateUserOrder.json();
                if (orderData.success) {
                  const ConfirmedOrder = {
                    ...paymentData,
                    deliverCharge,
                    CartTotal,
                    selectedShiping,
                    orderData,
                    email: user.email,
                  };
                  navigate(`/order-confirmed`, { state: ConfirmedOrder });
                  handleResetCart()
                  
                }
              } else {
                const text = await validateRes.text();
                console.error(
                  "Unexpected response format from verifyPayment:",
                  text
                );
              }
            } catch (error) {
              console.error("Error validating payment:", error);
            }
          },

          prefill: {
            name: user?.name,
            email: user?.email,
            contact: user?.mobile,
          },
          notes: {
            address: user?.address,
          },
          theme: {
            color: "#0a2444",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed");
        e.preventDefault();
        rzp1.open();
      } else {
        const text = await response.text();
        console.error("Unexpected response format:", text);
      }
    } catch (error) {
      console.log(error);
      console.error("Error processing payment:", error);
    }
  };

  // handleRemoveItem
  const handleRemoveItem = (item) => {
    removeitemCartMutation.mutate(item._id);
    toast.success("item removed successfully");
  };
  // handleQuantity update
  const handleIncr = (item) => {
    updateCartItemMutation.mutate({ id: item._id, type: "inc" });
    toast.success("Product Quantity updated by one Successfully");
  };
  const handleDecr = (item) => {
    if (item.count === 1) {
      toast.error("Product quantity can't be less than 1");
      return;
    }
    updateCartItemMutation.mutate({ id: item._id, type: "dec" });
    toast.success("Product Quantity updated by one Successfully");
  };




  return (
    <>
      <Toaster/>
      <div className=" flex lg:flex-row flex-col p-4">
        <div className="left-box w-[100vw] min-w-[40rem] h-full p-4 ">
          <div className="bg-gray-100 rounded-md p-2 ">
            <h1 className="text-2xl font-bold uppercase">Cart CheckOut</h1>
            <p className="item">
              {cartItems?.products?.length} Item in your cart
            </p>
          </div>
          <div className="cart-items w-[95%]">
            <div className="cart-container rounded-b-md  w-full flex flex-col gap-2 items-start justify-star h-auto overflow-y-scroll  no-scrollbar">
              {/* cart items here */}
              {cartItems?.products?.length === 0 ? (
                <div className="  mt-12 w-full bg-white  capitalize text-xl font-bold grid place-content-center text-center ">
                  <img
                    src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                    alt=""
                    className="lg:h-[20vw] "
                  />
                  <p className="text-2xl font-bold text-gray-500">
                    Your Cart is Empty
                  </p>
                  <Link to="/product">
                    <button className="mt-12 bg-[#0a2444] text-white p-2 rounded-md">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                cartItems?.products?.map((item) => (
                  <div
                    className="flex border-b  w-[100%] items-start justify-start gap-2 p-2 relative"
                    key={item?.id}
                  >
                    <span
                      className="cursor-pointer rounded-full absolute right-3 font-bold"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <IoIosCloseCircleOutline size={22} />
                    </span>
                    <div className="img p-2 w-fit">
                      {item?.url && (
                        <img
                          src={item?.url[0]}
                          alt={item?.name}
                          className=" object-cover h-44 w-44"
                        />
                      )}
                    </div>
                    <div className="flex items-start w-full pt-2  justify-around flex-col">
                      <p className="font-bold">{item?.name?.slice(0, 20)}</p>
                      <p className="flex items-center">
                        <LiaRupeeSignSolid />
                        {(+item?.price)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </p>
                      <p className="quantity">{item?.count}</p>
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
                ))
              )}
            </div>
          </div>
        </div>
        <div className="right-box h-fit p-4 bg-gray-100 md:w-full lg:w-fit rounded-md shadow-sm mt-4">
          <div className="address p-4 Copoun-Code rounded-md space-y-4 bg-gray-200 shadow-sm">
            <h1 className="text-2xl font-bold uppercase">
              Address Information
            </h1>
            {newAdd === null ? (
              <div className="flex gap-2">
                <p className="text-gray-500">Please select an address</p>
                {token ? (
                  <Link to="/profile/shipping-add"  className="underline font-bold text-red-500">
                    <p>Click here to select address</p>
                  </Link>
                ) : (
                  <Link to="/login" className="underline">
                    <p>Login To Get Address</p>
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span>Address:</span>
                  <p className="">{newAdd?.address}</p>
                </div>
                <div className="flex justify-between">
                  <span>City:</span>
                  <p className="">{newAdd?.city}</p>
                </div>
                <div className="flex justify-between">
                  <span>State:</span>
                  <p className="">{newAdd?.state}</p>
                </div>
                <div className="flex justify-between">
                  <span>PinCode:</span>
                  <p className="">{newAdd?.zipcode}</p>
                </div>
                <div className="flex justify-between">
                  <span>Country:</span>
                  <p className="">INDIA</p>
                </div>
              </>
            )}
          </div>
          <div className=" p-4 Copoun-Code rounded-md space-y-4">
            <Copoun
              setDiscount={setDiscount}
              setDiscountType={setDiscountType}
            />
          </div>
          <div className="cart-box p-4 space-y-2">
            <div className="bg-[#0A2440] text-white p-4 rounded-md uppercase font-bold">
              <h1>Cart Total</h1>
            </div>
            <div className="calculation-box border-2 p-2 rounded-md bg-gray-200">
              <div className="sub-total flex justify-between p-2 ">
                <p className="">Sub Total</p>
                <p className=" font-bold flex items-center">
                  <LiaRupeeSignSolid />
                  {cartItems?.totalCartValue
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </p>
              </div>

              <div className="sub-total flex justify-between p-2">
                <p>Copoun Discount</p>
                <p className=" font-bold flex gap-1 items-center">
                  {discountType === "percentage" ? (
                    `${discount}%`
                  ) : (
                    <p className="flex  items-center">
                      <LiaRupeeSignSolid />
                      {discount || 0}
                    </p>
                  )}
                </p>
              </div>

              <div className="sub-total flex justify-between p-2">
                <p>Shipping Charges</p>
                <p className=" font-bold flex items-center ">
                  <LiaRupeeSignSolid />
                  { cartItems?.totalCartValue !==0? selectedShiping?.freight_charge : 0}
                </p>
              </div>

              <div className="sub-total flex justify-between p-2 font-bold text-xl">
                <p>Cart Total</p>
                <p className=" font-bold flex items-center">
                  <LiaRupeeSignSolid />
                  {cartItems?.totalCartValue !==0?   CartTotal.toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,") : 0}
                </p>
              </div>
            </div>
            {token ? (
              <div className="cursor-not-allowed" onClick={paymentHandler}>
                <button
                  className={"bg-[#0A2440] w-full text-white p-2 rounded-md"}
                  disabled ={isdisabled}
                >
                  CheckOut
                </button>
              </div>
            ) : (
              <Link to="/login">
                <div className="Login button w-full flex items-center justify-center">
                  <button className="bg-[#0A2440] w-full text-white p-2 rounded-md">
                    Login
                  </button>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ShippingModal
        data={couriercompnies}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onShippingSelect={handleShippingSelect}
      />
    </>
  );
};

export default CheckOut;