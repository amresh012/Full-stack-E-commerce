// import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Field, useFormik } from "formik";
// import { updateSiteConfig } from "../../features/Website/configSlice";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import axios from "axios";
import { base_url } from "../../Utils/baseUrl";

const WebsitePage = () => {
  const imageRef = useRef();
  const [isChanging, setIsChanging] = useState(false);
 const dispatch = useDispatch();
  const {
    values,
    handleReset,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: {
      name: "",
      title: "",
      logo: "",
      mainbg: "",
      headerCol:"",
      primarybg: "",
      secondarybg: "",
      footerCol: "",
      textCol: "",
      homepageBanner: [],
    },
    onSubmit: async (values, { setSubmitting }) => {
      if(imageRef.current.files.length === 0){
        toast.error('Image not selected');
        return;
      }
      try {
        setIsChanging(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("title", values.title);
        formData.append("logo", imageRef.current.files[0]);
        formData.append("mainbg", values.mainbg);
        formData.append("primarybg", values.primarybg);
        formData.append("headerCol", values.headerCol);
        formData.append("secondarybg", values.secondarybg);
        formData.append("footerCol", values.footerCol);
        formData.append("textCol", values.textCol);
        formData.append("homepageBanner", values.homepageBanner);
        const response = await axios.post(`${base_url}config`, values);
        
        if (response.data.error) {
          throw new Error(response.data.error);
        } else {
          toast.success("Occurance Changed Successfully");
        }
      } catch (error) {
        // 
        toast.error(error.message);
      } finally {
        setIsChanging(true);
        setSubmitting(false);
      }
    },
  });
    
     

  const configlabel = [
    {
      id: 0,
      label: "Website Main color",
      Id: "mainbg",
    },
    {
      id: 1,
      label: "Website Primary color ",
      Id: "primarybg",
    },
    {
      id: 2,
      label: "Secondary Main color",
      Id: "secondarybg",
    },
    {
      id: 3,
      label: "Header color",
      Id: "headerCol",
    },
    {
      id: 4,
      label: "Footer color ",
      Id: "footerCol",
    },
    {
      id: 5,
      label: "Text color",
      Id: "textCol",
    },
    {
      id: 6,
      label: "Add Website logo :",
      Id: "logo",
    },
    {
      id: 7,
      label: "Banner Image",
      Id: "homepageBanner",
    },
    {
      id: 8,
      label: "Add Website Name",
      Id: "name",
    },
    {
      id: 9,
      label: "Add Website Title",
      Id: "title",
    },
  ];

  return (
    <>
      <Toaster />
      <div className="border-2 mt-12 rounded-md shadow-md  h-auto flex flex-col items-center justify-around mx-12 p-2  ">
        <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="">Website Configuration</h1>
        </div>
        {/* section-2 */}
        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="w-full h-full p-4 flex  flex-col gap-12"
        >
          <div className="flex gap-12 items-center justify-around w-full">
            {configlabel.slice(8).map((label) => (
              <div key={label.id} className="input-1 w-full flex-col flex">
                <label htmlFor="">{label.label}:</label>
                <input
                  type="text"
                  id={label.Id}
                  value={values[Field.Id]}
                  onChange={handleChange}
                  className="h-12 border-2 rounded-md outline-none px-2 "
                />
              </div>
            ))}
          </div>
          {/* section-3 */}
          <div className="flex gap-4 w-full p-4 ">
            {configlabel.slice(0, 3).map((label) => (
              <div className="input-1 w-full flex-col flex" key={label.id}>
                <label htmlFor="">{label.label}:</label>
                <div className="flex  ">
                  <input
                    type="text"
                    name=""
                    id={label.Id}
                    value={values[label.Id]}
                    onChange={handleChange}
                    className="outline-none border-2 h-12 px-2 lg:w-fit w-full"
                  />
                  <input
                    type="color"
                    id={label.Id}
                    value={values[label.Id]}
                    onChange={handleChange}
                    className="h-12 border-2  outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* section-4 */}
          <div className="flex gap-4 w-full  p-4  ">
            {configlabel.slice(3, 6).map((label) => (
              <div className="input-1 w-full flex-col flex" key={label.id}>
                <label htmlFor="">{label.label}:</label>
                <div className="flex  ">
                  <input
                    type="text"
                    name=""
                    id={label.Id}
                    value={values[label.Id]}
                    onChange={handleChange}
                    className="outline-none border-2 h-12 px-2  lg:w-fit w-full"
                  />

                  <input
                    type="color"
                    id={label.Id}
                    value={values[label.Id]}
                    onChange={handleChange}
                    className="h-12 border-2  outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* section-5 */}
          <div className="flex gap-12 items-center justify-around w-full ">
            <div className="border-2 flex  items-center border-dashed p-2 rounded-md">
              <span className="w-max p-2 rounded-l-md text-white bg-[#0A2440]">Upload <span>Max(1)</span></span>
              <input type="file" className="border-2 p-2 rounded-md" ref={imageRef} accept=".jpg, .png, .webp"  />
            </div>
            <div className="border-2 flex  items-center border-dashed p-2 rounded-md">
              <span className="w-max rounded-l-md text-white bg-[#0A2440] p-2">Upload <span>Max(3)</span></span>
              <input type="file" className="border-2 p-2 rounded-md" />
            </div>
          </div>
          {/* section-6 */}
          <div
            onClick={handleChange}
            className="flex justify-center gap-4 w-full text-center duration-300"
          >
            <button disabled={isChanging} className="bg-[#0a2440] p-2 rounded-md text-white uppercase disabled:bg-[#d9d5d5] disabled:border-[#d9d5d5] disabled:text-black disabled:cursor-not-allowed">{isChanging ? 'Changing...' :   'Change Occurance'}</button>
            <button className="bg-[#0a2440] p-2 rounded-md text-white uppercase" type="reset" onClick={handleReset}>
              Reset Occurance
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WebsitePage;
