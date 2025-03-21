import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../Utils/axiosConfig";
import { base_url } from "../Utils/baseUrl";
import axios from "axios";
const initialState = {
  value: 0,
};


export const ProfileResetApi = createAsyncThunk(
  "userprofile",
  async (payload) => {
    console.log(payload)
    const res = await axios.put(
      `${base_url}user/edit-user`,
      payload,
      config
    );
    console.log(res)
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ProfileResetApi.fulfilled, (state, action) => {
      
    });
  },
});

export default userSlice.reducer;