import { createSlice } from "@reduxjs/toolkit";
import { createEntry, getEntries, updateEntry } from "../thunks/entryThunk";

const initialState = {
  entries: [],
  currententry: null,
  selectedEntry: null,
  loading: false,
  error: null,
};

const entrySlice = createSlice({
  name: "entries",

  initialState,

  reducers: {
    showentry: (state, action) => {
      state.currententry = action.payload
    },
    setSelectedEntry: (state, action) => {
      state.selectedEntry = action.payload;
    },
    clearSelectedEntry: (state) => {
      state.selectedEntry = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.entries.unshift(action.payload.entry);
      })

      .addCase(createEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getEntries.pending, (state) => {
        state.loading = true;
      })

      .addCase(getEntries.fulfilled, (state, action) => {
        state.loading = false;

        state.entries = action.payload;
      })

      .addCase(getEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateEntry.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = state.entries.map((entry) =>
          entry._id === action.payload._id
            ? action.payload
            : entry,
        );
        state.selectedEntry = null;
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedEntry, clearSelectedEntry,showentry } = entrySlice.actions;

export default entrySlice.reducer;
