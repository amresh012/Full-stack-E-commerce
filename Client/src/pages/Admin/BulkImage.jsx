import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { base_url } from "../../Utils/baseUrl";
import { FaCopy } from "react-icons/fa";
import BasicTable from "../../components/AdminComponents/BasicTable";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import  AnimatedDeleteButton from "../../components/Ui/AnimatedDeleteButton"


const BulkImage = () => {
  const { Dragger } = Upload;
  const [data, setData] = useState([])


  // Function for copy to clipboard image URL
  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;

    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toast.success("Url Copied to clipboard")
  }

   const GetImges = async () => {
     try {
       const response = await axios.get(`${base_url}images`);
       if (response.status === 200) {
         setData(response.data);
       } else {
         throw new Error(response.data.error || "Unable to get Images");
       }
     } catch (error) {
       console.log(error);
       toast.error(error.message || "something went wrong");
     }
   };

  useEffect(() => {
    GetImges()
  },[])


  // Formik for handling form submission
  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      url: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${base_url}images`, values);
        if (response.data.error) {
          throw new Error(response.data.error);
        } else {
           GetImges();
          toast.success("Image Uploaded Successfully");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Dragger component props
  const props = {
    name: "file",
    multiple: true,
    action: `https://images.deepmart.shop/upload`,
    onChange(info) {
      const { status, response, name } = info.file;
      if (status === "done") {
        message.success(`${name} file uploaded successfully.`);
        setFieldValue("url", response);
        setFieldValue("name", name);
      } else if (status === "error") {
        message.error(`${name} file upload failed.`);
      }
    },
    onDrop(e) {
      // Handle dropped files if needed
       const files = e.dataTransfer.files;

       Array.from(files).forEach((file) => {
         const formData = new FormData();
         formData.append("file", file);

         axios
           .post(`https://images.deepmart.shop/upload`, formData)
           .then((response) => {
             const info = {
               file: {
                 status: "done",
                 response: response.data, // Assuming the response contains the file URL
                 name: file.name,
               },
             };
             this.onChange(info);
           })
           .catch((error) => {
             console.log(error)
             const info = {
               file: {
                 status: "error",
                 name: file.name,
               },
             };
             this.onChange(info);
           });
       });
    },
  };

  const deleteImage = async (id) => {
    try {
      const response = await fetch(`${base_url}images/${id}`, {
        method: "DELETE",
        // ...config,
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (!data.success) {
        toast.success(data.message);
        return;
      }
      // setReload((prev) => !prev);
      toast.success(data.message);
      GetImges();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Table columns
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{+id + 1}</span>;
      },
    },
    {
      header: "Preview",
      accessorKey: "image",
      cell: ({ row }) => (
        <div className="p-2">
          <img
            className="h-24"
            src={row.original.url}
            alt={row.original.name}
          />
        </div>
      ),
    },
    {
      header: "Image Name",
      accessorKey: "name",
    },
    {
      header: "Url",
      accessorKey: "url",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex  gap-2 items-center justify-center">
          <button
            onClick={() => {
              copyToClipboard(row.original.url);
            }}
            className="active:scale-95 duration-300 active:text-green-400 p-2 bg-black/20 rounded-md"
          >
            <FaCopy fontSize={20} />
          </button>
          <button
            onClick={() => deleteImage(row.original._id)}
            className="active:scale-95 duration-300 "
          >
            <AnimatedDeleteButton/>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Toaster />
      <div className="gap-12 h-auto flex flex-col items-center justify-around">
        <div className="space-y-4 w-full m-auto p-2">
          <div className="flex items-center justify-normal rounded-md">
            <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full rounded-md">
              <h1 className="uppercase">Add Images</h1>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-4 p-2"
          >
            <div className="relative cursor-pointer h-full">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                type="submit"
                className="bg-[#0a2440] w-2/4 p-2 text-white rounded-md active:shadow-md"
              >
                Upload Images
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col w-full p-2 gap-5">
          <div className="flex justify-between px-12">
            <h1 className="text-xl">Previous Uploaded Files</h1>
          </div>
          {/* Upload list */}
          <div className="w-full">
            <BasicTable columns={columns} data={data || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkImage;
