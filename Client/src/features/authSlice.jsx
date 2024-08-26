/* eslint-disable react-refresh/only-export-components */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../Utils/baseUrl";
import { config } from "../Utils/axiosConfig";
import axios from "axios";
import {toast} from "react-hot-toast"

const initialState = {
  success: false,
  error: false,
  loading: true,
  user: null,
  signupdata:null,
  token: localStorage.getItem("token"),
};

export const LoginApi = createAsyncThunk("login", async (payload) => {
  const res = await axios.post(`${base_url}user/login`, payload);
  console.log(res)
  localStorage.setItem("token", res.data.token);
  console.log(res.data.token)
  return res.data;
});

export const VerifyApi = createAsyncThunk("Verify", async () => {
  const res = await axios.post(`${base_url}user/verify`, {}, config);
  return res.data;
});

export const RegisterApi = createAsyncThunk(
  "register",
  async (payload, thunkApi) => {
    try {
      const res = await axios.post(`${base_url}user/register`, payload);
      console.log()
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const addAddress = createAsyncThunk("user/address", async (payload) => {
  const res = await axios.post(`${base_url}user/adr`, payload, config);
  console.log(res)
  return res.data;
});

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    addSignupdata: (state, action) => {
      console.log(action.payload)
      state.signupdata = action.payload;
      console.log(action.payload)
    },
    adduser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterApi.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(RegisterApi.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })
      .addCase(LoginApi.fulfilled, (state, action) => {
        state.success = true;
        if (action.payload._id) {
          console.log(action.payload)
          if (action.payload.role === "admin") {
            return window.location.href="/admin"
          }
        } else {
          toast.error(action.payload);
        }
      })
      .addCase(LoginApi.rejected, (state) => {
        state.error = true;
      })
      // .addCase(VerifyApi.fulfilled, (state, action) => {
      //   (state.success = true), (state.user = action.payload);
      // })
      // .addCase(VerifyApi.rejected, (state) => {
      //   state.error = true;
      // })
      .addCase(addAddress.fulfilled, () => {
        toast.success("Address is added sucessfully");
      })
      .addCase(addAddress.rejected, (state, action) => {
        toast.error(action.payload.response.data);
      });
  },
});


export const { addSignupdata ,adduser} = authSlice.actions;
export default authSlice.reducer;
