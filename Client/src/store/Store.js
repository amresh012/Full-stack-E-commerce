import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import cartSlice from "../features/cartSlice";
import productSlice from "../features/ProductSlice";
import loadingSlice from "../features/loading/loadingSlice";
import configSlice from "../features/Website/configSlice";
import userSlice from "../features/userSlice";
import orderSlice from "../features/orderSlice";
import { adminSlice } from "../features/admin/adminSlice";
 const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    loading: loadingSlice,
    cart: cartSlice,
    user: userSlice,
    userorder:orderSlice,
    site: configSlice,
    admin:adminSlice
  },
});
 export default store