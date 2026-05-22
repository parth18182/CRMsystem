import { createSlice } from "@reduxjs/toolkit";

import {
  changeVisitStatus,
  getAllEntries,
  getAllVisits,
} from "../thunks/adminThunk";

const initialState = {
  allEntries: [],
  allVisits: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllEntries.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getAllEntries.fulfilled, (state, action) => {
        state.loading = false;

        state.allEntries = action.payload;
      })

      .addCase(getAllEntries.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(getAllVisits.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getAllVisits.fulfilled, (state, action) => {
        state.loading = false;

        state.allVisits = action.payload;
      })

      .addCase(getAllVisits.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(changeVisitStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(changeVisitStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allVisits.findIndex(
          (visit) => visit._id === action.payload._id,
        );
        if (index !== -1) {
          state.allVisits[index] = action.payload;
        }
      })

      .addCase(changeVisitStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
