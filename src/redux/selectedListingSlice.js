import { createSlice } from "@reduxjs/toolkit";

const selectedListingSlice = createSlice({
  name: "selectedListing",
  initialState: {},
  reducers: {
    setSelectedListing(state, action) {
      console.log("Payload inside reducer: ", action.payload);
      return action.payload
    },
  },
});

export const { setSelectedListing } = selectedListingSlice.actions;
export default selectedListingSlice.reducer;
