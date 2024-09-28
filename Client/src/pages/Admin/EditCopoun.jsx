// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios"
// import {base_url} from "../../Utils/baseUrl"
// import {config} from "../../Utils/axiosConfig"
// import {toast , Toaster } from "react-hot-toast"
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import moment from "moment";

// const CouponFormSchema = Yup.object().shape({
//   usageLimit: Yup.string()
//     .required("Copoun Limit  is required")
//     .min(1, "Coupon Usage Limit must be greater than or equal to 1"),
//     discountType: Yup.string()
//     .required("discountType is required")
//     .oneOf(["percentage", "fixed"], "Invalid DiscountType"),
//   discountValue: Yup.number()
//     .required("Discount Value is required")
//     .min(1, "Discount Value must be greater than or equal to 0"),
//     daysValid: Yup.number()
//     .required("Copoun Validity is required")
//     .min(1, "Discount Validity time must be greater than or equal to 1"),
//     usageCount: Yup.number()
//     .required("Copoun Usage Count is required")
//     .min(1, "Copoun Usage Count must be greater than or equal to 0"),
// });

// const EditCoupon = () => {
//     const { id } = useParams();
//   const [isAdding, setIsAdding] = useState(false);
//   const err = {
//     color: "red",
//     fontSize: "12px",
//     padding: "0px 0px 0px 9px",
//   };
//   const [copoun, setCopoun] = useState({
//        discountType:"",
//         discountValue: 0,
//         usageLimit:1,
//         daysValid:1,
//         usageCount:1
//   })

//   const fetchCopounDetails = async (id) => {
//     try {
//       const response = await fetch(`${base_url}coupon/${id}`);
//       const data = await response.json();
//     //   console.log(data)
//       setCopoun({
//         discountType:data?.discountType,
//         discountValue: data.discountValue,
//         usageLimit:data.usageLimit,
//         daysValid: moment(data.expiryDate).diff(moment(), 'days'),

//         usageCount:data.usageCount
//       });
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   const handleChange = (key, value) => {
//     setCopoun((prev) => {
//       return { ...prev, [key]: value };
//     });
//   };


//   useEffect(() => {
//     if (!id) {
//       return;
//     } else {
//       fetchCopounDetails(id);
//     }
//   }, []);











//   return (
//     <>
//     <Toaster/>
//     <Formik
//       initialValues={{
//         discountType:copoun.discountType,
//         discountValue: copoun.discountValue,
//         usageLimit:copoun.usageLimit,
//         daysValid:copoun.daysValid,
//         usageCount:copoun.usageCount
//       }}
//       validationSchema={CouponFormSchema}
//       onSubmit={async(values, { setSubmitting }) => {
        
//         try {
//           setIsAdding(true);
//           const response = await axios.post(`${base_url}coupon`, values, config);
//           if(response.data.error){
//             throw new Error(response.data.error)
//           }
//           toast.success("Copoun Created Successfully")
//         } catch (error) {
//           toast.error(error.message)
//         }
//         finally{
//           setIsAdding(false);
//           setSubmitting(false)
//         }
         
//       }}
//     >
//       {({ errors, touched }) => {
//         return (
//           <Form className="flex flex-col w-full ">
//             <div className=' flex items-center justify-normal  rounded-md p-4'>
//            <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
//           <h1 className="uppercase">Update Copoun</h1>
//            </div>
//            </div>
//            <div className="flex p-2 shadow-md mx-4 flex-wrap">
//             <div className=" flex flex-col gap-2  w-1/2 p-2">
//               <label htmlFor="code">Copoun Limit</label>
//               <Field
//                 type="text"
//                 id="usageLimit"
//                 name="usageLimit"
//                 value={copoun.usageLimit}
//                 onChange={(e) => handleChange(e.target.id, e.target.value)}
//                 className={`rounded-md h-12 outline-none border-2 px-2 ${
//                   touched.code && errors.code ? "is-invalid" : ""
//                 }`}
//                 placeholder="Enter 6 Digit Copoun Code"
//                 />
//               <ErrorMessage style={err} name="usageLimit" component="div" />
//             </div>

//             <div className=" flex flex-col gap-2 w-1/2  p-2">
//               <label htmlFor="type">Discount Type</label>
//               <Field
//                 as="select"
//                 id="discountType"
//                 value={copoun.discountType}
//                 onChange={(e) => handleChange(e.target.id, e.target.value)}
//                 className={`rounded-md h-12 outline-none border-2 px-2 ${
//                   touched.code && errors.code ? "is-invalid" : ""
//                 }`}
//                 name="discountType"
//                 >
//                 <option value="" disabled className="text-lg">
//                   Select Type
//                 </option>
//                 <option value="percentage" className="text-lg">
//                 percentage
//                 </option>
//                 <option value="fixed" className="text-lg">
//                   fixed
//                 </option>
//               </Field>
//               <ErrorMessage style={err} name="discountType" component="div" />
//             </div>

//             <div className=" flex flex-col w-1/2  gap-2 p-2">
//               <label htmlFor="discountValue">Discount Value</label>
//               <Field
//                 type="number"
//                 id="discountValue"
//                 value={copoun.discountValue}
//                 name="discountValue"
//                 onChange={(e) => handleChange(e.target.id, e.target.value)}
//                 className={`rounded-md h-12 outline-none border-2 px-2 ${
//                   touched.code && errors.code ? "is-invalid" : ""
//                 }`}
//                  placeholder="Enter Copoun Value 1-100"
//                 />
//               <ErrorMessage style={err} name="discountValue" component="div" />
//             </div>
//             <div className=" flex flex-col w-1/4  gap-2 p-2">
//               <label htmlFor="discountValue">Copoun Validity(in days)</label>
//               <Field
//                 type="number"
//                 id="daysValid"
//                 name="daysValid"
//                 onChange={(e) => handleChange(e.target.id, e.target.value)}
//                 value={copoun.daysValid}
//                 className={`rounded-md h-12 outline-none border-2 px-2 ${
//                   touched.code && errors.code ? "is-invalid" : ""
//                 }`}
//                  placeholder="Enter Copoun Value 1-30"
//                 />
//               <ErrorMessage style={err} name="daysValid" component="div" />
//             </div>
//             <div className=" flex flex-col w-1/4  gap-2 p-2">
//               <label htmlFor="discountValue">Copoun Usage Count</label>
//               <Field
//                 type="number"
//                 id="usageCount"
//                 name="usageCount"
//                 onChange={(e) => handleChange(e.target.id, e.target.value)}
//                 value={copoun.usageCount}
//                 className={`rounded-md h-12 outline-none border-2 px-2 ${
//                   touched.code && errors.code ? "is-invalid" : ""
//                 }`}
//                  placeholder="Enter Copoun usage limit "
//                 />
//               <ErrorMessage style={err} name="usageCount" component="div" />
//             </div> 
//                 </div>
//                 <div
//             className="flex justify-center gap-4 w-full text-center duration-300 mt-4"
//           >
//             <button disabled={isAdding} className="bg-[#0a2440] w-2/6 p-2 rounded-md text-white uppercase disabled:bg-[#d9d5d5] disabled:border-[#d9d5d5] disabled:text-black disabled:cursor-not-allowed">{isAdding ? 'Updating...' : 'Copoun Update'}</button>
           
//           </div>
//           </Form>
//         );
//       }}
//     </Formik>
//         </>
//   );
// };

// export default EditCoupon;
















import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { base_url } from "../../Utils/baseUrl";
import { config } from "../../Utils/axiosConfig";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

// Form validation schema
const CouponFormSchema = Yup.object().shape({
  usageLimit: Yup.number()
    .required("Coupon Limit is required")
    .min(1, "Coupon Usage Limit must be greater than or equal to 1"),
  discountType: Yup.string()
    .required("Discount Type is required")
    .oneOf(["percentage", "fixed"], "Invalid Discount Type"),
  discountValue: Yup.number()
    .required("Discount Value is required")
    .min(1, "Discount Value must be greater than or equal to 1"),
  daysValid: Yup.number()
    .required("Coupon Validity is required")
    .min(1, "Coupon Validity must be greater than or equal to 1"),
  usageCount: Yup.number()
    .required("Coupon Usage Count is required")
    .min(0, "Coupon Usage Count must be greater than or equal to 0"),
});

const EditCoupon = () => {
  const { id } = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const [copoun, setCopoun] = useState({
    discountType: "",
    discountValue: 0,
    usageLimit: 1,
    daysValid: 1,
    usageCount: 1,
  });

  // Fetch coupon details
  const fetchCopounDetails = async (id) => {
    try {
      const response = await axios.get(`${base_url}coupon/${id}`);
      const data = response.data;
      setCopoun({
        discountType: data.discountType,
        discountValue: data.discountValue,
        usageLimit: data.usageLimit,
        daysValid: moment(data.expiryDate).diff(moment(), "days"),
        usageCount: data.usageCount,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCopounDetails(id);
    }
  }, [id]);

  return (
    <>
      <Toaster />
      <Formik
        enableReinitialize={true}
        initialValues={copoun}
        validationSchema={CouponFormSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setIsAdding(true);
            const response = await axios.put(`${base_url}coupon/${id}`, values, config);
            if (response.data.error) {
              throw new Error(response.data.error);
            }
            toast.success("Coupon Updated Successfully");
          } catch (error) {
            console.log(error)
            toast.error(error.message);
          } finally {
            setIsAdding(false);
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="flex flex-col w-full">
            <div className="flex items-center justify-normal rounded-md p-4">
              <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md">
                <h1 className="uppercase">Update Coupon</h1>
              </div>
            </div>
            <div className="flex p-2 shadow-md mx-4 flex-wrap">
              <div className="flex flex-col gap-2 w-1/2 p-2">
                <label htmlFor="usageLimit">Coupon Limit</label>
                <Field
                  type="number"
                  id="usageLimit"
                  name="usageLimit"
                  className={`rounded-md h-12 outline-none border-2 px-2 ${
                    touched.usageLimit && errors.usageLimit ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Coupon Limit"
                />
                <ErrorMessage style={{ color: "red" }} name="usageLimit" component="div" />
              </div>

              <div className="flex flex-col gap-2 w-1/2 p-2">
                <label htmlFor="discountType">Discount Type</label>
                <Field
                  as="select"
                  id="discountType"
                  name="discountType"
                  className={`rounded-md h-12 outline-none border-2 px-2 ${
                    touched.discountType && errors.discountType ? "is-invalid" : ""
                  }`}
                >
                  <option value="" disabled className="text-lg">
                    Select Type
                  </option>
                  <option value="percentage" className="text-lg">
                    Percentage
                  </option>
                  <option value="fixed" className="text-lg">
                    Fixed
                  </option>
                </Field>
                <ErrorMessage style={{ color: "red" }} name="discountType" component="div" />
              </div>

              <div className="flex flex-col w-1/2 gap-2 p-2">
                <label htmlFor="discountValue">Discount Value</label>
                <Field
                  type="number"
                  id="discountValue"
                  name="discountValue"
                  className={`rounded-md h-12 outline-none border-2 px-2 ${
                    touched.discountValue && errors.discountValue ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Discount Value"
                />
                <ErrorMessage style={{ color: "red" }} name="discountValue" component="div" />
              </div>

              <div className="flex flex-col w-1/4 gap-2 p-2">
                <label htmlFor="daysValid">Coupon Validity (in days)</label>
                <Field
                  type="number"
                  id="daysValid"
                  name="daysValid"
                  className={`rounded-md h-12 outline-none border-2 px-2 ${
                    touched.daysValid && errors.daysValid ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Validity in Days"
                />
                <ErrorMessage style={{ color: "red" }} name="daysValid" component="div" />
              </div>

              <div className="flex flex-col w-1/4 gap-2 p-2">
                <label htmlFor="usageCount">Coupon Usage Count</label>
                <Field
                  type="number"
                  id="usageCount"
                  name="usageCount"
                  className={`rounded-md h-12 outline-none border-2 px-2 ${
                    touched.usageCount && errors.usageCount ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Coupon Usage Count"
                />
                <ErrorMessage style={{ color: "red" }} name="usageCount" component="div" />
              </div>
            </div>
            <div className="flex justify-center gap-4 w-full text-center duration-300 mt-4">
              <button
                disabled={isAdding}
                className="bg-[#0a2440] w-2/6 p-2 rounded-md text-white uppercase disabled:bg-[#d9d5d5] disabled:border-[#d9d5d5] disabled:text-black disabled:cursor-not-allowed"
              >
                {isAdding ? "Updating..." : "Update Coupon"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditCoupon;
