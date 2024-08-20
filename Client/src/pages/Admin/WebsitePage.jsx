// import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Field, useFormik } from "formik";
import { base_url } from "../../Utils/baseUrl";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload , message } from "antd";

const WebsitePage = () => {

  // image upload
  const props1 = {
    name: "file",
    multiple: true,
    action: `${base_url}uploads`,
    onSubmit(info) {
      const { status } = info.file;
      if (status !== "uploading") {
          console.log(info.file, info.fileList);
           setFieldValue(
             "homepageBanner",
             info.fileList.map((file) =>file.response)
           );
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const props2 = {
    name: "file",
    action: `${base_url}uploads`,
    onSubmit(info) {
      const { status } = info.file;
      if (status !== "uploading") {
          // console.log(info.file, info.fileList);
          setFieldValue(
            "logo",info.file.response[0]
          );
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const {
    values,
    setFieldValue,
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
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("title", values.title);
        formData.append("logo", values.logo);
        formData.append("mainbg", values.mainbg);
        formData.append("primarybg", values.primarybg);
        formData.append("headerCol", values.headerCol);
        formData.append("secondarybg", values.secondarybg);
        formData.append("footerCol", values.footerCol);
        formData.append("textCol", values.textCol);
        formData.append("homepageBanner", values.homepageBanner);
        const response = await axios.post(`${base_url}config`, values);
        console.log(values);
        if (response.data.error) {
          throw new Error(response.data.error);
        } else {
          toast.success("Occurance Changed Successfully");
        }
      } catch (error) {
        console.log(error.message)
        toast.error(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
    
    
    //  console.log(values);
     

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
        <div className="text-3xl font-bold p-8 bg-[#038CCC] text-white w-full shadow-md rounded-md ">
          <h1 className="">Website Configuration</h1>
        </div>
        {/* section-2 */}
        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="w-full h-full p-12 flex  flex-col gap-12"
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
            <Space
              direction="horizontal"
              style={{
                width: "100%",
              }}
              size="large"
            >
              <Upload {...props2}>
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>
              <Upload {...props1}>
                <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
              </Upload>
            </Space>
          </div>
          {/* section-6 */}
          <div
            onClick={handleChange}
            className="flex justify-center gap-4 w-full text-center duration-300"
          >
            <button  className="bg-[#038CCC] p-2 rounded-md text-white uppercase">Change Occurance</button>
            <button className="bg-[#038CCC] p-2 rounded-md text-white uppercase" type="reset" onClick={handleReset}>
              Reset Occurance
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WebsitePage;
