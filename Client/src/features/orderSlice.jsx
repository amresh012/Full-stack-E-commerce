import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../Utils/axiosConfig";
import { base_url } from "../Utils/baseUrl";
import axios from "axios";
const initialState = {
  orders: [],
  invoice: [],
};
export const OrderApi = createAsyncThunk("order", async () => {
  const res = await axios.get(`${base_url}order`, config);
  return res.data;
});

export const invoiceApi = createAsyncThunk("invoice", async () => {
  const res = await axios.get(`${base_url}order/invoice`, config);
  return res.data;
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OrderApi.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(invoiceApi.fulfilled, (state, action) => {
        state.invoice = action.payload;
      });
  },
});

export default orderSlice.reducer;

