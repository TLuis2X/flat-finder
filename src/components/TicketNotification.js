import { Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

export default function TicketNotification({ ticket }) {
  return (
    <div>
      <p>
        Your ticket "
        <span style={{ color: "blue", fontWeight: 500 }}>{ticket.title}</span>"
        changed status to
        {ticket.status === "resolved" && (
          <div style={{width: 90}}>
          <Tag 
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            flexGrow: 0,
            flexShrink: 0,
          }} 
          color="success">
            <CheckCircleOutlined />
            resolved
          </Tag>
          </div>
        )}
        {ticket.status === "in-progress" && (
          <div style={{width: 100}}>
            <Tag 
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              flexGrow: 0,
              flexShrink: 0,
            }} 
            color="processing">
              <SyncOutlined spin/>
              in progress
            </Tag>
          </div>
        )}
        {ticket.status === "unresolved" && (
          <div style={{width: 100}}>
            <Tag
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                flexGrow: 0,
                flexShrink: 0,
              }}
              color="error">
              <CloseCircleOutlined />
              unresolved
            </Tag>
          </div>
        )}
      </p>
    </div>
  );
}
