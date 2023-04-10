import { createSlice } from "@reduxjs/toolkit";

const selectedConvoSlice = createSlice({
  name: "selectedConvo",
  initialState: {},
  reducers: {
    setSelectedConvo(state, action) {
      console.log("Payload inside reducer: ", action.payload);
      return action.payload;
    },
  },
});

export const { setSelectedConvo } = selectedConvoSlice.actions;
export default selectedConvoSlice.reducer;
