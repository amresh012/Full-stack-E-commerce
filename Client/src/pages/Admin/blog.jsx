import React, { useRef } from 'react'
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { base_url } from '../../Utils/baseUrl';
import { Editor } from "@tinymce/tinymce-react";
import {useFormik} from "formik"
import toast from 'react-hot-toast';
import axios from 'axios';
const AdminBlog = () => {

  const editorRef = useRef(null);
  const log = (e) => {
    e.preventDefault()
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


// drager prop
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: `${base_url}uploads`,
  onSubmit(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name.slice(0,10)} file uploaded  successfully.`);
      setFieldValue(
        "image",
        info.fileList.map((file) => file.response)
      );
    } else if (status === "error") {
      message.error(`${info.file.name.slice(0,20)} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const {values , setFieldValue, handleSubmit , handleChange} = useFormik({
  initialValues: {
     title:"",
     content:"",
     image:"",
  },
  onSubmit: async (values, { setSubmitting }) => {
    console.log(values)
      try {
        const response = await axios.post(`${base_url}blog/add`, values,);
        console.log(values)
        if(response.data.error){
           throw new Error(response.data.error)
        }
      } catch (error) {
      //    console.log(error.message)
         toast.error(error.message)
      } finally {
        setSubmitting(false);
      }
    }

 })


  return (
   <>
   <div className='border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4'>
    <div className="text-3xl font-bold p-8 bg-[#038CCC] text-white w-full shadow-md rounded-md ">
          <h1 className="">Add Blogs</h1>
        </div>
    </div> 
     <div className="border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4">
       <form onSubmit={handleSubmit} className='h-full w-full space-y-2'>
         <div className="title w-full space-y-2">
          <h1 className="text-xl font-bold uppercase">Blog Title</h1>
          <input type="text" 
          value={values.title}
          onChange={handleChange}
          className="w-full p-2 border-2 rounded-md"
          placeholder="Enter Blog Title"
          />
         </div>
         <div className="description-editor w-full space-y-2">
          <div className="">
            <h1>Blog Desription</h1>
          </div>
         <Editor
        apiKey="5r4wd0npsorm8hh4w7303oaexavz24kktq19fpgutvpasfaq"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "ai preview powerpaste casechange footnotes tinycomments searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed advtemplate codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker mergetags a11ychecker editimage help formatpainter permanentpen pageembed charmap quickbars linkchecker emoticons advtable export mentions typography markdown importword",
            'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
            'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
            'media', 'table', 'emoticons', 'help'
          ],
          toolbar:
            "undo redo | importword | aidialog aishortcuts | blocks fontsizeinput | bold italic | align numlist bullist | link image | table media pageembed | lineheight  outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | save print export | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck",
          templates: [],
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <div className="save-button">
        <button onClick={log}  className="bg-[#038CCC] text-white p-2">Save Description</button>
      </div>
         </div>
         
         <div className="space-y-4">
          <div className="">
            <h1 className='uppercase text-xl'>Blog Images</h1>
          </div>
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
            <div className="border-2 cursor-pointer  text-center border-blue-500 text-blue-500 px-12 py-2 hover:text-white  duration-300 hover:bg-blue-400">
              <button type="submit">Add Blog</button>
            </div>
          </div>
       </form>
     </div> 
   </>
  )
}

export default AdminBlog
