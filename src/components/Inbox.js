import React, { useState } from "react";
import { Card } from "antd";

const Inbox = () => {
  const [selectedChat, setSelectedChat] = useState("");

  function displaySeletedChat() {
    console.log(setSelectedChat);
  }
  return (
    <Card title="Card title">
      <Card style={{ maxWidth: "fit-content" }}>
        <p>Card</p>
      </Card>
    </Card>
  );
};

export default Inbox;
