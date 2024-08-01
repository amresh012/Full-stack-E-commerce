import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../Utils/baseUrl";
import axios from "axios";
import { config } from "../Utils/axiosConfig";
import { toast } from "react-hot-toast";

const initialState = {
  carts: [],
  loading: true,
  error: false,
};



export const applyCouponcode = createAsyncThunk(
  "couponcode",
  async (payload, thunkApi) => {
    try {
      const res = await axios.post(`${base_url}payment/couponcode`, payload, config);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addcarts: (state, action) => {
      state.carts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(applyCouponcode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(applyCouponcode.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload)
      })


  },
});
export const { addcarts } = cartSlice.actions;
export default cartSlice.reducer;
