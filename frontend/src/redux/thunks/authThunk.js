import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_URL;

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${url}/user/signup`,
        userData
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${url}/user/login`,
        userData
      );
      return res.data;
    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  }
);