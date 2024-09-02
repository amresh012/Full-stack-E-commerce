// toast.success("Copoun Created Successfully!");
// navigate("/admin/coupon")
// dispatch(getAdmindata())
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"
import {base_url} from "../../Utils/baseUrl"
import {config} from "../../Utils/axiosConfig"
import {toast , Toaster } from "react-hot-toast"
import { useState } from "react";

const CouponFormSchema = Yup.object().shape({
  usageLimit: Yup.string()
    .required("Copoun Limit  is required")
    .min(1, "Coupon Usage Limit must be greater than or equal to 1"),
    discountType: Yup.string()
    .required("discountType is required")
    .oneOf(["percentage", "fixed"], "Invalid DiscountType"),
  discountValue: Yup.number()
    .required("Discount Value is required")
    .min(1, "Discount Value must be greater than or equal to 0"),
    daysValid: Yup.number()
    .required("Copoun Validity is required")
    .min(1, "Discount Validity time must be greater than or equal to 1"),
    usageCount: Yup.number()
    .required("Copoun Usage Count is required")
    .min(1, "Copoun Usage Count must be greater than or equal to 0"),
});

const AddCoupon = () => {
  const [isAdding, setIsAdding] = useState(false);
  const err = {
    color: "red",
    fontSize: "12px",
    padding: "0px 0px 0px 9px",
  };
  return (
    <>
    <Toaster/>
    <Formik
      initialValues={{
        discountType:"",
        discountValue: 0,
        usageLimit:1,
        daysValid:1,
        usageCount:1
      }}
      validationSchema={CouponFormSchema}
      onSubmit={async(values, { setSubmitting }) => {
        // console.log(values)
        try {
          setIsAdding(true);
          const response = await axios.post(`${base_url}coupon/create`, values, config);
          toast.success(response.data.message)
        } catch (error) {
          console.log(response.data.message)
          toast.error(response.data.message)
        }
        finally{
          setIsAdding(false);
          setSubmitting(false)
        }
         
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form className="flex flex-col w-full ">
            <div className='border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4'>
           <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="uppercase">Create Copoun</h1>
           </div>
           </div>
           <div className="flex p-2 shadow-md mx-4 flex-wrap">
            <div className=" flex flex-col gap-2  w-1/2 p-2">
              <label htmlFor="code">Copoun Limit</label>
              <Field
                type="text"
                id="usageLimit"
                name="usageLimit"
                className={`rounded-md h-12 outline-none border-2 px-2 ${
                  touched.code && errors.code ? "is-invalid" : ""
                }`}
                placeholder="Enter 6 Digit Copoun Code"
                />
              <ErrorMessage style={err} name="usageLimit" component="div" />
            </div>

            <div className=" flex flex-col gap-2 w-1/2  p-2">
              <label htmlFor="type">Discount Type</label>
              <Field
                as="select"
                id="discountType"
                className={`rounded-md h-12 outline-none border-2 px-2 ${
                  touched.code && errors.code ? "is-invalid" : ""
                }`}
                name="discountType"
                >
                <option value="" disabled className="text-lg">
                  Select Type
                </option>
                <option value="percentage" className="text-lg">
                percentage
                </option>
                <option value="fixed" className="text-lg">
                  fixed
                </option>
              </Field>
              <ErrorMessage style={err} name="discountType" component="div" />
            </div>

            <div className=" flex flex-col w-1/2  gap-2 p-2">
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
            <div className=" flex flex-col w-1/4  gap-2 p-2">
              <label htmlFor="discountValue">Copoun Validity</label>
              <Field
                type="number"
                id="daysValid"
                name="daysValid"
                className={`rounded-md h-12 outline-none border-2 px-2 ${
                  touched.code && errors.code ? "is-invalid" : ""
                }`}
                 placeholder="Enter Copoun Value 1-100"
                />
              <ErrorMessage style={err} name="daysValid" component="div" />
            </div>
            <div className=" flex flex-col w-1/4  gap-2 p-2">
              <label htmlFor="discountValue">Copoun Usage Limit</label>
              <Field
                type="number"
                id="usageCount"
                name="usageCount"
                className={`rounded-md h-12 outline-none border-2 px-2 ${
                  touched.code && errors.code ? "is-invalid" : ""
                }`}
                 placeholder="Enter Copoun Value 1-100"
                />
              <ErrorMessage style={err} name="usageCount" component="div" />
            </div> 
                </div>
                <div
            className="flex justify-center gap-4 w-full text-center duration-300 mt-4"
          >
            <button disabled={isAdding} className="bg-[#0a2440] w-2/6 p-2 rounded-md text-white uppercase disabled:bg-[#d9d5d5] disabled:border-[#d9d5d5] disabled:text-black disabled:cursor-not-allowed">{isAdding ? 'Adding...' : 'Add Copoun'}</button>
           
          </div>
          </Form>
        );
      }}
    </Formik>
        </>
  );
};

export default AddCoupon;



// onSubmit={(values, { setSubmitting }) => {
//   console.log(values)
//   dispatch(addCoupon(values))
//     .then(() => {
//       toast.success("Coupon added successfully!");
//       setSubmitting(false);
//     })
//     .catch((error) => {
//       toast.error("Error adding coupon: " + error.message);
//       setSubmitting(false);
//     });
// }}