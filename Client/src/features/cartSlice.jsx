import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../Utils/baseUrl";
import axios from "axios";
import { config } from "../Utils/axiosConfig";
import { toast } from "react-hot-toast";

const initialState = {
  carts: [],
  loading: true,
  error: false,
  totalAmount: 0,
  totalQuantity: 0,
  totalWeight:0
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
      const newItem = action.payload;
      const existingItemInd = state.carts.findIndex(item => item._id === newItem._id);
    
      state.totalQuantity++;

      if (existingItemInd === -1) {
        state.carts.push({
          _id: newItem._id,
          price: +newItem.price,
          quantity: 1,
          totalPrice: +newItem.price,
          name: newItem.name,
          images: newItem.images,
        });
        state.totalAmount += +newItem.price;
        state.totalWeight += newItem.weight;
      } else {
        const index = state.carts.findIndex(item => item._id === newItem._id);
        state.carts[index].quantity++;
        state.carts[index].totalPrice += +newItem.price;
        state.totalAmount += +newItem.price;

      }
    },
    removeItem : (state,action)=>{
      const {_id} = action.payload;
      // 
      const existingItemInd = state.carts.findIndex(item => item._id === _id);
      
      state.totalQuantity--;
      state.totalAmount -= state.carts[existingItemInd].price;

      if (state.carts[existingItemInd].quantity === 1) {
        state.carts = state.carts.filter(item => item._id !== _id);
      } else {
        state.carts[existingItemInd].quantity--;
        state.carts[existingItemInd].totalPrice -= state.carts[existingItemInd].price;
      }
      // IMPROVE LOGIC
    },
    resetCart: (state)=>{
      state.carts = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.totalWeight=0
    },
  
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
export const { addcarts,resetCart ,removeItem } = cartSlice.actions;
export default cartSlice.reducer;
