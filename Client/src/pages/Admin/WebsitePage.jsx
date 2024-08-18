// import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Field, useFormik } from "formik";
import { base_url } from "../../Utils/baseUrl";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload , message } from "antd";

const WebsitePage = () => {
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
      primarybg: "",
      secondarybg: "",
      footerCol: "",
      textCol: "",
      homepageBanner: [],
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${base_url}config`, values);
        // console.log(values);
        if (response.data.error) {
          throw new Error(response.data.error);
        } else {
          toast.success("Occurance Changed Successfully");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
    
    const props = {
      name: "file",
      multiple: true,
      action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
             setFieldValue(
               "images",
               info.fileList.map((file) => file.originFileObj)
            );
             setFieldValue(
               "homepageBanner",
               info.fileList.map((file) => file.originFileObj)
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
      Id: "headerbg",
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
      <div className="border-2 rounded-md shadow-md  h-auto flex flex-col items-center justify-around mx-12 ">
        {/* section-1 */}
        <div className="text-3xl font-bold py-12">
          <h1>Website Configuration</h1>
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
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
              </Upload>
            </Space>
          </div>
          {/* section-6 */}
          <div
            onClick={handleChange}
            className="border-2 w-full text-center border-blue-500 text-blue-500 px-12 py-2 hover:text-white  duration-300 hover:bg-blue-400"
          >
            <button>Change Occurance</button>
            <button type="reset" onClick={handleReset}>
              Reset Occurance
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WebsitePage;
