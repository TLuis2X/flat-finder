import { createSlice } from "@reduxjs/toolkit";

const favListingsSlice = createSlice({
  name: "favListings",
  initialState: [],
  reducers: {
    setFavListings(state, action) {
      console.log("Payload inside CONVO reducer: ", action.payload);
      state = action.payload;
      return state;
    },
    addFavListing(state,action){
      state.push(action.payload)
      return state
    },
    unfavListing(state, action){
      state = state.filter((item) => item.listing.id !== action.payload)
      return state
    }
  },
});

export const { setFavListings, addFavListing, unfavListing } = favListingsSlice.actions;
export default favListingsSlice.reducer;
