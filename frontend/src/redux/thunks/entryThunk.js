import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_URL;

export const createEntry = createAsyncThunk(
  "entries/createEntry",

  async (entryData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${url}/entry/create`, entryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.entry;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getEntries = createAsyncThunk(
  "entries/getEntries",

  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}/entry/getentry`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.entries;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateEntry = createAsyncThunk(
  "entries/updateEntry",

  async ({ id, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${url}/entry/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.updatedEntry;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);
