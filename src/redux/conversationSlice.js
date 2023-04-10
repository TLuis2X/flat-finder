import { createSlice } from "@reduxjs/toolkit";

const conversations = createSlice({
  name: "conversations",
  initialState: [],
  reducers: {
    setConversations(state, action) {
      console.log("Payload inside Message: ", action.payload);
      state = action.payload;
      return state;
    },
    addConversation(state, action) {
      console.log(
        "🟢🟢🟢🟢🟢🟢🟢🟢 PAYLOAD IN ADD CONVER YO 🟢🟢🟢🟢🟢🟢🟢🟢",
        action.payload
      );
      // Get the potential index of the conversation
      const conversationIndex = state.findIndex((conversation) => conversation.id === action.payload.id);
      if (conversationIndex === -1) {
        // If there's no matching conversation, add a new conversation
        state.push(action.payload);
      }
    },
  },
});

export const { setConversations, addConversation } =
  conversations.actions;
export default conversations.reducer;
