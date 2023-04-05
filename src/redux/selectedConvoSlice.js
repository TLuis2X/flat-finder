import { createSlice } from "@reduxjs/toolkit";

const selectedConvoSlice = createSlice({
  name: "selectedListing",
  initialState: [],
  reducers: {
    setSelectedConvo(state, action) {
      console.log("Payload inside CONVO reducer: ", action.payload);
      state = action.payload;
      return state;
    },
    addMessageToSelectedConvo(state,action){
      console.log('Inside addMessageToConvo 🔴🔴')
      if (state.length && state[0].conversation_id === action.payload.conversation_id){
        console.log('Inside addMessageToConvo IFFFFFFF🔴🔴IFFFFFFF🔴🔴')
        state.push(action.payload)
      }
      return state
    }
  },
});

export const { setSelectedConvo, addMessageToSelectedConvo } = selectedConvoSlice.actions;
export default selectedConvoSlice.reducer;
