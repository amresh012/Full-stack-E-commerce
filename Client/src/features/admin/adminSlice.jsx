import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../Utils/baseUrl";
import { config } from "../../Utils/axiosConfig";
import { toast } from "react-hot-toast";
import axios from "axios";

export const getAdmindata = createAsyncThunk(
  "getAdmindata",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}admin`, config);
      return response.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addContactUs = createAsyncThunk(
  "addContactUs",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}contact`, contact, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addCoupon = createAsyncThunk(
  "addCoupon",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}coupon`, contact, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
export const delCoupon = createAsyncThunk(
  "delCoupon",
  async (_id, thunkAPI) => {
    try {
      const response = await axios.delete(`${base_url}coupon/${_id}`, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addbulkUs = createAsyncThunk(
  "addbulk",
  async (bulk, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}bulk`, bulk, config);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmindata.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdmindata.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAdmindata.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addContactUs.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContactUs.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          toast.success(action.payload.success);
        } else {
          toast.error(action.payload.error);
        }
      }).addCase(addCoupon.fulfilled, (state) => {
        state.loading = false;
      }).addCase(addCoupon.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload)
      })
      .addCase(delCoupon.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(delCoupon.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload)
      })
      .addCase(addContactUs.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.response.data.error);
      })
      .addCase(addbulkUs.pending, (state) => {
        state.loading = true;
      })
      .addCase(addbulkUs.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          toast.success(action.payload.success);
        } else {
          toast.error(action.payload.error);
        }
      })
      .addCase(addbulkUs.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.response.data.error);
      });
  },
});

export const adminSlice = admin.reducer;
