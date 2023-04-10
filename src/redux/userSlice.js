import { createSlice } from "@reduxjs/toolkit";
import { emptyUser } from "../models/User";

const userSlice = createSlice({
  name: "user",
  initialState: emptyUser,
  reducers: {
    setUser(state, action) {
      console.log("Payload inside reducer: ", action.payload);
      Object.assign(state, action.payload);
    },
    setAvatarUrl(state, action){
      state.avatar_url = action.payload;
      return state;
    }
  },
});

export const { setUser, setAvatarUrl} = userSlice.actions;
export default userSlice.reducer;
