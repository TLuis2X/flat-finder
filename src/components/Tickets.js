import React from "react";
import Lottie from "@amelix/react-lottie";
import { successOptions } from "@/utils";
import { Card } from "antd";
import { Popconfirm } from "antd";
import { Modal, Divider } from "antd";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Badge,
  Space,
  Tag,
  message,
} from "antd";
import { useState } from "react";
import TicketService from "@/services/TicketService";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
  CloseOutlined,
} from "@ant-design/icons";

function TicketsComponent({ user_id, setTickets, tickets }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [messageApi, alert] = message.useMessage();

  const ticketService = new TicketService();

  const showModal = () => {
    setOpen(true);
  };

  const removeTicket = async (ticketId) => {
    const response = await ticketService.removeTicket(ticketId);
    console.log(response);
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    if (title && content) {
      const new_ticket = await ticketService.addTicket(title, content, user_id);
      console.log("Ticket that we got back: ", new_ticket);
      setConfirmLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setTickets((prev) => prev.concat([new_ticket]));
        setTitle("");
        setContent("");
        setOpen(false);
        setSuccess(false);
      }, 2000);
    } else {
      setConfirmLoading(false);
      messageApi.open({
        type: "error",
        content: "Please fill in both title and description",
      });
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      {alert}
      <div>
        <Button type="primary" onClick={showModal}>
          Add ticket
        </Button>
        <br />
      </div>
      <br />
      <Divider
        orientation="middle"
        style={{
          // textAlign: "left",
          fontFamily: "IBM_Plex_Serif",
          fontSize: "18px",
          // paddingRight: "-300px",
        }}
      >
        My tickets
      </Divider>
      <Row>
        {tickets.map((ticket) => (
          <Card
            title={
              <>
                Status: &nbsp;
                {ticket.status === "resolved" && (
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    resolved
                  </Tag>
                )}
                {ticket.status === "in-progress" && (
                  <Tag icon={<SyncOutlined spin />} color="processing">
                    in progress
                  </Tag>
                )}
                {ticket.status === "unresolved" && (
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    unresolved
                  </Tag>
                )}
                <Popconfirm
                  title="Delete ticket"
                  description="Do you wish to delete this ticket?"
                  onConfirm={() => removeTicket(ticket.id)}
                  onCancel={handleCancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>
                    <CloseOutlined />
                  </Button>
                </Popconfirm>
              </>
            }
            bordered={false}
            style={{
              width: 300,

              overflow: "visible",
              wordWrap: "break-word",
              marginRight: 50,
              marginBottom: 10,
              marginLeft: 35,
              textAlign: "left",
            }}
          >
            &nbsp;
            <h3>
              <strong>Title: </strong>
              {ticket.title}
            </h3>
            <p>
              <strong>Description: </strong>
              {ticket.content}
            </p>
          </Card>
        ))}
        <br />
      </Row>
      <br />
      <br></br>

      <Modal
        title="Ticket form"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {success ? (
          <div>
            <Lottie options={successOptions} height={300} width={300} />
          </div>
        ) : (
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a ticket title",
                    },
                  ]}
                >
                  <Input
                    placeholder="Please eneter a ticket title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}></Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "please enter ticket description",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Please enter ticket description"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    </>
  );
}
export default TicketsComponent;
