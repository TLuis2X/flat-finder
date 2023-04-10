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
import { setSelectedChatHistory } from "@/redux/selectedChatHistory";

export default function FullChat() {

  const [content, setContent] = useState("");
  const selectedChatHistory = useSelector((state) => state.selectedChatHistory);
  const selectedConvo = useSelector((state) => state.selectedConvo);
  const allMessages = useSelector(state => state.allMessages)

  const otherUser = selectedConvo.id && selectedConvo.user1.email ? selectedConvo.user1 : selectedConvo.user2
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };


  const messagesBoxRef = useRef(null);
  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [selectedChatHistory]);

  const handleChange = (event) => {
    setContent(event.target.value);
  };



  async function handleSendMessage() {
    if (content) {
      const result = await messageService.sendDirectMessage(
        user.id,
        content,
        selectedConvo.id
      );
      setContent("");
      console.log(result);
      const new_message = result.data[0];
      console.log("Message we got back: ", new_message);
      dispatch(addMessageToSelectedChatHistory(new_message));
      dispatch(addMessage(new_message));
    }
  }


  useEffect(() => {
    if (selectedChatHistory[selectedChatHistory.length - 1].sender_id !== user.id){
      try {
        const result = messageService.readUserMessages(otherUser.id, selectedConvo.id).catch(error => console.log(error))
        console.log('Result or reading! ', result)
      } catch (e) {
        console.log('Error reading: ', e)
      }
    }
  }, [selectedChatHistory])


  return (
    <div style={{ flexGrow: 1 }}>
            <Card
              style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
                marginBottom: "10px",
              }}
            >
              <div style={{ marginTop: 5 }}>
                <a href="#message" style={{ float: "right" }}>
                  <MessageOutlined />
                </a>
              </div>
              <Card>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "650px",
                  }}
                >
                  <div
                    ref={messagesBoxRef}
                    style={{
                      flexGrow: 1,
                      overflowY: "scroll",
                      height: "680px",
                      overflow: "auto",
                    }}
                  >
                    {selectedChatHistory.map((message) => (
                      <DirectMessage key={message.id} message={message} otherUser={otherUser} />
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "blue",
                      marginTop: "5rem",
                    }}
                  >
                    <input
                      type="text"
                      value={content}
                      onKeyDown={handleKeyDown}
                      onChange={handleChange}
                      style={{
                        flexGrow: 1,
                        border: "solid",
                        borderColor: "black",
                        borderRadius: 10,
                        padding: 5,
                      }}
                    />
                    <button
                      onClick={() => {
                        handleSendMessage();
                      }}
                      style={{ color: "black" }}
                    >
                      &nbsp; <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>
                </div>
              </Card>
            </Card>
          </div>
  )


}