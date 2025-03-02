// src/store/slices/addressSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAddress: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    selectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },
  },
});

export const { selectedAddress, clearSelectedAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
