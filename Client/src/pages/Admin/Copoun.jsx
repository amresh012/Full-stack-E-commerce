import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { addCoupon, getAdmindata } from "../../features/admin/adminSlice";
import {toast , Toaster } from "react-hot-toast"
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';

const CouponFormSchema = Yup.object().shape({
  code: Yup.string()
    .required("Code is required")
    .min(6, "Coupon Code must be at least 6 characters")
    .max(12, "Coupon Code must not exceed 12 characters"),
  type: Yup.string()
    .required("Type is required")
    .oneOf(["Percentage", "Fixed"], "Invalid type"),
  discountValue: Yup.number()
    .required("Discount Value is required")
    .min(1, "Discount Value must be greater than or equal to 0"),
});

const AddCoupon = () => {
  const err = {
    color: "red",
    fontSize: "12px",
    padding: "0px 0px 0px 9px",
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
    <Toaster/>
    <Formik
      initialValues={{
        code: "",
        type: "",
        discountValue: 0,
      }}
      validationSchema={CouponFormSchema}
      onSubmit={(values) => {
        console.log(values)
        dispatch(addCoupon(values)).then(unwrapResult).then(()=>{
          toast.success("Copoun Created Successfully!");
          navigate("/admin/coupon")
          dispatch(getAdmindata())
        })
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form className="flex flex-col w-full">
            <div className='border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4'>
           <div className="text-3xl font-bold p-8 bg-[#038CCC] text-white w-full shadow-md rounded-md ">
          <h1 className="uppercase">Create Copoun</h1>
           </div>
           </div>
           <div className="flex p-2 shadow-md mx-4">
            <div className=" flex flex-col gap-2  w-full p-2">
              <label htmlFor="code"> Coupon Code</label>
              <Field
                type="text"
                id="code"
                name="code"
                className={`rounded-md h-12 outline-none border-2 px-2 ${
                  touched.code && errors.code ? "is-invalid" : ""
                }`}
                placeholder="Enter 6 Digit Copoun Code"
                />
              <ErrorMessage style={err} name="code" component="div" />
            </div>

            <div className=" flex flex-col w-full p-2">
              <label htmlFor="type">Type</label>
              <Field
                as="select"
                id="type"
                className={`rounded-md h-12 outline-none border-2 px-2 ${
                  touched.code && errors.code ? "is-invalid" : ""
                }`}
                name="type"
                >
                <option value="" disabled className="text-lg">
                  Select Type
                </option>
                <option value="Percentage" className="text-lg">
                  Percentage
                </option>
                <option value="Fixed" className="text-lg">
                  Fixed
                </option>
              </Field>
              <ErrorMessage style={err} name="type" component="div" />
            </div>

            <div className=" flex flex-col w-full p-2">
              <label htmlFor="discountValue">Discount Value</label>
              <Field
                type="number"
                id="discountValue"
                name="discountValue"
                className={`rounded-md h-12 outline-none border-2 px-2 ${
                  touched.code && errors.code ? "is-invalid" : ""
                }`}
                 placeholder="Enter Copoun Value 1-100"
                />
              <ErrorMessage style={err} name="discountValue" component="div" />
            </div>
                </div>
                <div
            className="flex justify-center gap-4 w-full text-center duration-300 mt-4"
          >
            <button  className="bg-[#038CCC] w-2/6 p-2 rounded-md text-white uppercase">Add Copoun</button>
           
          </div>
          </Form>
        );
      }}
    </Formik>
        </>
  );
};

export default AddCoupon;
