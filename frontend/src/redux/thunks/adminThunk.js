import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_URL;

export const getAllEntries = createAsyncThunk(
  "admin/getAllEntries",

  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${url}/admin/entries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.entries;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch entries",
      );
    }
  },
);

export const getAllVisits = createAsyncThunk(
  "admin/getAllVisits",

  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${url}/admin/visits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.visits;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch visits",
      );
    }
  },
);

export const changeVisitStatus = createAsyncThunk(
  "admin/changeVisitStatus",
  async ({ id, visitStatus }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${url}/admin/visit/${id}`,{ visitStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data.visit;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);
