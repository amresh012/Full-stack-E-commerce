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
      const existingItem = state.carts.find(item => item.id === newItem.id);
    
      const newCarts = [...state.carts]; // Create a new array for carts
    
      if (!existingItem) {
        newCarts.push({
          id: newItem._id,
          price: newItem.price,
          quantity: 1,
          totalPrice: Number(newItem.price),
          name: newItem.name,
          images: newItem.images,
        });
      } else {
        const index = newCarts.findIndex(item => item.id === newItem.id);
        newCarts[index].quantity++;
        newCarts[index].totalPrice += Number(newItem.price);
      }
    
      return {
        ...state, // Return a new state object
        carts: newCarts,
        totalQuantity: state.totalQuantity + 1,
        totalAmount: state.totalAmount + newItem.price,
      };
    },
    removeItem : (state,action)=>{
      const {id} = action.payload;
      const existingItem = state.carts.find(item => item.id === id);
      
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.carts = state.carts.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      // IMPROVE LOGIC
    },
    resetCart(state) {
      state.carts = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
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
