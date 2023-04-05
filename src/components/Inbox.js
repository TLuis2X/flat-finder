import React, { useState } from "react";
import { Card, Avatar, Badge } from "antd";
import {
  MessageOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const cardData = [
  {
    contactName: "An",
    lastMessage: "Hi. Is this room still available?",
    lastMessageTime: "11:11",
    unreadCount: 5,
  },
  {
    contactName: "Gianni",
    lastMessage: "Hey there!",
    lastMessageTime: "10:45",
    unreadCount: 2,
  },
  {
    contactName: "Tony",
    lastMessage: "I'll be there in 10 minutes",
    lastMessageTime: "09:23",
    unreadCount: 1,
  },
  {
    contactName: "Mumin",
    lastMessage: "How are you?",
    lastMessageTime: "08:10",
    unreadCount: 9,
  },
  {
    contactName: "Fahad",
    lastMessage: "Nearly there!",
    lastMessageTime: "18:10",
    unreadCount: 9,
  },
];

const Inbox = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newChatHistory = [...chatHistory, message];
      setChatHistory(newChatHistory);
      setMessage("");
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleContactClick = (index) => {
    setSelectedContact(cardData[index]);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "70%" }}>
          {cardData.map((data, index) => (
            <Card
              key={index}
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
                marginBottom: "10px",
                width: "300px",
                height: "150px",
              }}
              hoverable
              onClick={() => handleContactClick(index)}
            >
              <Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#1890ff",
                      verticalAlign: "middle",
                    }}
                    size="large"
                  >
                    {data.contactName.charAt(0)}
                  </Avatar>
                }
                title={data.contactName}
                description={
                  <>
                    <span>{data.lastMessageTime}</span>
                    <span style={{ float: "right" }}>
                      {data.unreadCount > 0 && (
                        <Badge count={data.unreadCount} />
                      )}
                    </span>
                    <br />
                    <span style={{ fontSize: 12, color: "#999" }}>
                      {data.lastMessage}
                    </span>
                  </>
                }
              />
              <div style={{ marginTop: 10 }}>
                <a href="#message" style={{ float: "right" }}>
                  <MessageOutlined />
                </a>
              </div>
            </Card>
          ))}
        </div>
        {selectedContact && (
          <div style={{ width: "30%" }}>
            <Card
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
                marginBottom: "10px",
                marginLeft: "-700px",
                width: "1145px",
                height: "790px",
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#1890ff",
                      verticalAlign: "middle",
                    }}
                    size="large"
                  >
                    {selectedContact.contactName.charAt(0)}
                  </Avatar>
                }
                title={selectedContact.contactName}
                description={
                  <>
                    <span>{selectedContact.lastMessageTime}</span>
                    <span style={{ float: "right" }}>
                      {selectedContact.unreadCount > 0 && (
                        <Badge count={selectedContact.unreadCount} />
                      )}
                    </span>
                    <br />
                    <span style={{ fontSize: 12, color: "#999" }}>
                      {selectedContact.lastMessage}
                    </span>
                  </>
                }
              />
              <div style={{ marginTop: 10 }}>
                <a href="#message" style={{ float: "right" }}>
                  <MessageOutlined />
                </a>
              </div>
              <Card>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "630px",
                  }}
                >
                  <div style={{ flexGrow: 1, overflowY: "auto" }}>
                    {chatHistory.map((chat, index) => (
                      <p key={index}>{chat}</p>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "blue",
                    }}
                  >
                    <input
                      type="text"
                      value={message}
                      onKeyDown={handleKeyDown}
                      onChange={handleChange}
                      style={{ flexGrow: 1, color: "blue" }}
                    />
                    <button
                      onClick={() => {
                        setChatHistory([...chatHistory, message]);
                        setMessage("");
                      }}
                    >
                      &nbsp; Send
                    </button>
                  </div>
                </div>
              </Card>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default Inbox;
