import ForumPostService from "./ForumPostService";
import ForumPost from "@/components/ForumPost";
import MessageService from "./messageService";
import { Tag } from "antd";
import {
  MessageTwoTone,
  SoundTwoTone,
  HourglassTwoTone,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import TicketNotification from "@/components/TicketNotification";

export default class NotificationService {
  api;

  constructor(api) {
    this.api = api;
  }

  async forumPost(fullPost, city) {
    this.api.info({
      icon: <SoundTwoTone twoToneColor="#52c41a" />,
      style: {
        padding: "0.5rem",
      },
      message: (
        <p
          style={{ margin: 0, color: "gray", fontWeight: "500", fontSize: 10 }}>
          New comment under listing in{" "}
          <span style={{ color: "darkblue" }}>{city}</span>
        </p>
      ),
      description: <ForumPost forumPost={fullPost} />,
      placement: "topRight",
      duration: 4,
    });
  }

  async ticketUpdate(ticket) {
    this.api.info({
      icon: <HourglassTwoTone twoToneColor="#52c41a" />,
      style: {
        padding: "0.5rem",
      },
      message: (
        <p
          style={{ margin: 0, color: "gray", fontWeight: "500", fontSize: 10 }}>
          Ticket update
        </p>
      ),
      description: <TicketNotification ticket={ticket} />,
      placement: "topRight",
      duration: 4,
    });
  }

  async privateMessage(message, author) {
    //Pretent the message is a forumPost to reuse ForumPost component
    //Idea: Reuse ForumPost component instead of creating a messageNotification component.
    const fullPost = {
      content: message.content,
      author,
    };

    console.log("Inside private message!!!!!!");

    this.api.info({
      icon: <MessageTwoTone twoToneColor="#52c41a" />,
      style: {
        padding: "0.5rem",
      },
      message: (
        <p
          style={{ margin: 0, color: "gray", fontWeight: "500", fontSize: 10 }}>
          New private message from{" "}
          <span style={{ color: "darkblue" }}>{author.name}</span>
        </p>
      ),
      description: <ForumPost forumPost={fullPost} />,
      placement: "topRight",
      duration: 4,
    });
  }
}
