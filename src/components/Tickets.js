import React from "react";
import Lottie from "@amelix/react-lottie";
import { successOptions } from "@/utils";
import { Card } from "antd";
import { Modal } from "antd";
import { Button, Col, Form, Input, Row, Badge, Space, Tag, message} from "antd";
import { useState } from "react";
import TicketService from "@/services/TicketService";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
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
        type: 'error',
        content: 'Please fill in both title and description',
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
      <h1
        style={{
          textAlign: "left",
          fontFamily: "IBM_Plex_Serif",
          fontSize: "18px",
        }}
      >
        Your tickets:{" "}
      </h1>
      <Row style={{ overflow: "auto" }}>
        {tickets.map((ticket) => (
          <Card
            id={ticket.id}
            title={ticket.title}
            size="20px"
            style={{ width: "200px", height: "200px" }}
          >
            <p>{ticket.content}</p>
            <Button onClick={() => removeTicket(ticket.id)}>
              Delete ticket
            </Button>
          </Card>
        ))}
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

{
  /* <Row
style={{
  display: "flex",
}}
>
{tickets.map((ticket) => (
  <Badge.Ribbon text={ticket.status}>
    <Card
      title={ticket.title}
      // bordered={false}
      style={{
        width: 350,
        //   height: 150,
        //   margin: 20,
        margin: 10,
      }}
    >
      {/* <p>{ticket.title}</p> 
      <p>{ticket.content}</p>
      <Button onClick={() => removeTicket(ticket.id)}>
        Delete ticket
      </Button>
    </Card>
  </Badge.Ribbon>
))}
</Row> */
}
