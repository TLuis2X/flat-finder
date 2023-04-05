import React from "react";
import { Input, Card, Tag, Dropdown, Space, Menu, Form, Button } from "antd";
import { useState } from "react";
import TicketService from "@/services/TicketService";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  DeleteTwoTone,
  DownOutlined,
} from "@ant-design/icons";
import { Popconfirm } from "antd";

const AdminTicketResolver = (props) => {
  const ticketService = new TicketService();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [comment, setComment] = useState("");

  const onFinish = () => {
    console.log("Submitting comment:", comment);
    ticketService
      .changeStatus(selectedTicket.id, newStatus, comment)
      .then(() => {
        console.log("Ticket status and comment updated successfully");
        setSelectedTicket({ ...selectedTicket, status: newStatus });
        setComment("");
      })
      .catch((error) => {
        console.log("Error updating ticket status:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Comment submission failed:", errorInfo);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const ticketsAvailable = props.tickets.map((ticket) => ticket);

  function onSearch(ticketId) {
    console.log("Searching for ticket with id:", ticketId);
    console.log("Available tickets:", ticketsAvailable);

    const selected = ticketsAvailable.find(
      (ticket) => parseInt(ticket.id) === parseInt(ticketId)
    );
    if (selected) {
      setSelectedTicket(selected);
    } else {
      setSelectedTicket(null);
    }
  }

  function deleteTicket() {
    if (selectedTicket.id) {
      ticketService.removeTicket(selectedTicket.id);
      console.log("inside if statement");
      setSelectedTicket(null);
    } else {
      console.log("Error. Ticket could not be deleted.");
    }
  }

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  function changeStatus(newStatus) {
    const ticketId = selectedTicket.id;

    ticketService
      .changeStatus(ticketId, newStatus, comment)
      .then(() => {
        console.log("Ticket status and comment updated successfully");
        setSelectedTicket({ ...selectedTicket, status: newStatus });
        setComment("");
      })
      .catch((error) => {
        console.log("Error updating ticket status:", error);
      });
  }

  const { Search, TextArea } = Input;

  return (
    <>
      <Search
        placeholder="Enter ticket id..."
        onSearch={onSearch}
        enterButton
        style={{ marginBottom: "10px" }}
      />

      {selectedTicket && (
        <Card title="Tickets">
          <Card
            type="inner"
            title={<p>Ticket id: {selectedTicket.id}</p>}
            extra={<p>User id: {props.user.id}</p>}
          >
            <h3>
              <strong>Title: </strong>
              {selectedTicket.title}
            </h3>
            <p>
              <strong>Description: </strong>
              {selectedTicket.content}
            </p>
            <div
              style={{
                display: "flex",
                // alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              Current ticket status: &nbsp;
              {selectedTicket.status === "resolved" && (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  resolved
                </Tag>
              )}
              {selectedTicket.status === "in-progress" && (
                <Tag icon={<SyncOutlined spin />} color="processing">
                  in progress
                </Tag>
              )}
              {selectedTicket.status === "unresolved" && (
                <Tag
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                  color="error"
                >
                  <CloseCircleOutlined />
                  unresolved
                </Tag>
              )}
            </div>
            <div>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ marginTop: "1rem" }}
              >
                <Form.Item>
                  <TextArea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Enter comment here..."
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Comment
                  </Button>
                </Form.Item>
              </Form>
              <Dropdown
                overlay={
                  <Menu
                    onClick={(e) => {
                      changeStatus(e.key);
                      console.log(e);
                    }}
                  >
                    <Menu.Item key="resolved">resolved</Menu.Item>
                    <Menu.Item key="unresolved">unresolved</Menu.Item>
                    <Menu.Item key="in-progress">in progress</Menu.Item>
                  </Menu>
                }
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Update ticket status
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <br />
            <div>
              <Popconfirm
                title="Delete ticket"
                description="Do you wish to delete this ticket?"
                onConfirm={() => deleteTicket()}
                onCancel={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                {/* <Button> */}
                <DeleteTwoTone />
                {/* </Button> */}
              </Popconfirm>
            </div>
          </Card>
        </Card>
      )}
    </>
  );
};
export default AdminTicketResolver;
