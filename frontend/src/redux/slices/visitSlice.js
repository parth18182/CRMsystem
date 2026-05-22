import { createSlice } from "@reduxjs/toolkit";
import { createVisit } from "../thunks/visitThunk";


const initialState = {
  visits: [],

  loading: false,

  error: null,
};

const visitSlice = createSlice({
  name: "visit",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createVisit.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVisit.fulfilled, (state, action) => {
        state.loading = false;
        state.visits.unshift(action.payload);
      })
      .addCase(createVisit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default visitSlice.reducer;
