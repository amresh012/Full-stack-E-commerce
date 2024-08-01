import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../Utils/baseUrl";
import { config } from "../../Utils/axiosConfig";
import { toast } from "react-hot-toast";
const initialState = {
  data: {},
  loading: true,
  error: false,
};
export const updateSiteConfig = createAsyncThunk(
  "updateSiteConfiguration",
  async (siteCfg) => {
    const res = await axios.post(`${base_url}config`, siteCfg, config);
    toast.success(res.data.message)
    return res.data;
  }
);

export const configSlice = createSlice({
  name: "WebsiteConfiguration",
  initialState,
  reducers: {
    webconfig:(state,action)=>{
      state.data=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSiteConfig.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSiteConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSiteConfig.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const {webconfig} =configSlice.actions;
export default configSlice.reducer;
