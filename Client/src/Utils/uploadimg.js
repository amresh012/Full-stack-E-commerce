
import axios from "axios";
import { toast } from "react-hot-toast";

export const uploadFiles = async (data) => {
  const formData = new FormData();
  // 
  data.forEach((file) => {
    formData.append("file", file);
  });
  try {
    const res = await axios.post(
    "http://127.0.0.1:8032",
      formData
    );
    return res.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};