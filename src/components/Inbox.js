import React, { useState, useEffect, useRef } from "react";
import { Card, Avatar, Badge, Empty } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MessageOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import ConversationCard from "./ConversationCard";
import { useSelector, useDispatch } from "react-redux";
import { emptyUser } from "@/models/User";
import DirectMessage from "./DirectMessage";
import { messageService } from "@/services/Instances";
import { addMessage } from "@/redux/messagesSlice";
import { addMessageToSelectedChatHistory } from "@/redux/selectedChatHistory";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FullChat from "./FullChat";
const { Meta } = Card;

const Inbox = ({ conversations }) => {

  const selectedChatHistory = useSelector((state) => state.selectedChatHistory);
  
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "1rem",
        }}
      >
        <div>
          {conversations.map((data) => {
            return <ConversationCard key={data.id} data={data} />;
          })}
        </div>
        {selectedChatHistory.length ? (
          <FullChat />
        ) : (
          <div style={{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Empty description={
                  <p style={{ color: "gray" }}>
                    No chat selected 
                  </p>
                } />
          </div>
        )}
      </div>
    </>
  );
};

export default Inbox;
