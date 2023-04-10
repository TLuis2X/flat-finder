import { createSlice } from "@reduxjs/toolkit";

const selectedChatHistory = createSlice({
  name: "selectedChatHistory",
  initialState: [],
  reducers: {
    setSelectedChatHistory(state, action) {
      console.log("Payload inside CONVO reducer: ", action.payload);
      state = action.payload;
      return state;
    },
    addMessageToSelectedChatHistory(state, action) {
      console.log("Inside addMessageToConvo 🔴🔴");
      if (
        state.length &&
        state[0].conversation_id === action.payload.conversation_id
      ) {
        console.log("Inside addMessageToConvo IFFFFFFF🔴🔴IFFFFFFF🔴🔴");
        state.push(action.payload);
      }
      return state;
    },
  },
});

export const { setSelectedChatHistory, addMessageToSelectedChatHistory } =
  selectedChatHistory.actions;
export default selectedChatHistory.reducer;
