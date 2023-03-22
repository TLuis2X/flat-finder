import React from "react";
import { DashboardFilled, PlusOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  Drawer,
} from "antd";
import { useState } from "react";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const suffixSelector = (
  <Form.Item name="suffix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="USD">$</Option>
      <Option value="CNY">¥</Option>
      <Option value="GBP">£</Option>
      <Option value="Eur">€</Option>
    </Select>
  </Form.Item>
);
const AddListingComponent = () => {
  return (
    <div>
      {/* <Button type="primary" onClick={showDrawer}>
        Add listing
      </Button> */}

      <Form
        labelCol={{
          span: 4.5,
        }}
        wrapperCol={{
          span: 8,
        }}
        layout="horizontal"
        style={{
          maxWidth: 3000,
        }}
      >
        {/* <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item label="Property title">
          <Input />
        </Form.Item>
        <Form.Item label="Address (first line)" name="first_line">
          <Input />
        </Form.Item>
        <Form.Item label="Address (second line)" name="second_line">
          <Input />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input />
        </Form.Item>
        <Form.Item label="Postcode" name="postcode">
          <Input />
        </Form.Item>
        <Form.Item label="Monthly rent">
          <InputNumber
            addonAfter={suffixSelector}
            min={0}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item label="Deposit">
          <InputNumber addonAfter={suffixSelector} />
        </Form.Item>
        <Form.Item label="Contract duration(Months)">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Property description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button>Create listing</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default () => <AddListingComponent />;
