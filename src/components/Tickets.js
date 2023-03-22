import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Modal } from "antd";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useState } from "react";
const { Option } = Select;
const TicketsComponent = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Row style={{ marginLeft: "100" }}>
        <Card
          title="Ticket id:"
          bordered={false}
          style={{
            width: 200,
            height: 150,
            margin: 20,
            marginLeft: 80,
          }}
        >
          <p>Ticket date</p>
          <p>Ticket description</p>
        </Card>
        <br></br>
        <Card
          title="Ticket id:"
          bordered={false}
          style={{
            width: 200,
            height: 150,
            margin: 20,
          }}
        >
          <p>Ticket date</p>
          <p>Ticket description</p>
        </Card>
        <Card
          title="Ticket id:"
          bordered={false}
          style={{
            width: 200,
            height: 150,
            margin: 20,
          }}
        >
          <p>Ticket date</p>
          <p>Ticket description</p>
        </Card>
      </Row>
      <br></br>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Add ticket
      </Button>
      <Drawer
        title="Create a new ticket"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}></Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: "Please choose the dateTime",
                  },
                ]}
              >
                <DatePicker
                  style={{
                    width: "100%",
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
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
                  placeholder="please enter ticket description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default TicketsComponent;
