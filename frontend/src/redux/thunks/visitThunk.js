import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const url = import.meta.env.VITE_URL;

export const createVisit = createAsyncThunk(
  "visit/createVisit",

  async (visitData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${url}/visit/create`, visitData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.visit;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed",
      );
    }
  },
);
