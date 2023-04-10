import { Avatar } from "@chakra-ui/avatar";
import React from "react";
import { useSelector } from "react-redux";

const DirectMessage = ({ message, otherUser }) => {
  const user = useSelector((state) => state.user);
  const isFromUser = message.sender_id === user.id;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginTop: "5%",
        flexDirection: isFromUser ? "row-reverse" : "row",
      }}
    >
      <Avatar
        size="md"
        name={isFromUser ? user.name : otherUser.name}
        src={isFromUser ? user.avatar_url : otherUser.avatar_url}
      />
      <p className={isFromUser ? "senderBubble" : "receiverBubble"}>
        {message.content.trim()}
      </p>
    </div>
  );
};

export default DirectMessage;
