import { createSlice } from "@reduxjs/toolkit";
// import { emptyUser } from "../models/User";

const messages = createSlice({
  name: "allMessages",
  initialState: [],
  reducers: {
    setAllMessages(state, action) {
      console.log("Payload inside Message: ", action.payload);
      state = action.payload;
      return state;
    },
    readMessage(state, action){
      console.log(
        "🟢🟢🟢🟢🟢🟢🟢🟢 PAYLOAD IN READ MESSAGE YOOO MESSAGE YO 🟢🟢🟢🟢🟢🟢🟢🟢",
        action.payload
      );
      const conversationIndex = state.findIndex(
        (conversation) =>
          conversation.length > 0 &&
          conversation[0].conversation_id === action.payload.conversation_id
      );
      if (conversationIndex !== -1) {
        const messageIndex = state[conversationIndex].findIndex((message) => message.id === action.payload.id)
        state[conversationIndex][messageIndex] = action.payload;
        return state
      }

    },
    addMessage(state, action) {
      console.log(
        "🟢🟢🟢🟢🟢🟢🟢🟢 PAYLOAD IN ADD MESSAGE YO 🟢🟢🟢🟢🟢🟢🟢🟢",
        action.payload
      );

      // Find the index of the conversation that matches the conversation_id in the payload
      const conversationIndex = state.findIndex(
        (conversation) =>
          conversation.length > 0 &&
          conversation[0].conversation_id === action.payload.conversation_id
      );

      // If a matching conversation is found, push the new message into the conversation
      if (conversationIndex !== -1) {
        state[conversationIndex].push(action.payload);
      } else {
        // If there's no matching conversation, create a new conversation with the new message
        state.push([action.payload]);
      }
    },
  },
});

export const { setAllMessages, addMessage, readMessage } = messages.actions;
export default messages.reducer;
