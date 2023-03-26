import React from "react";
import { Divider, Radio, Typography } from "antd";

const { Paragraph } = Typography;
//import './index.css';
import {
  UserOutlined,
  SettingFilled,
  QuestionCircleFilled,
  MessageFilled,
  InboxOutlined,
} from "@ant-design/icons";
import { Avatar, Space, Button } from "antd";
import ProfilePicture from "@/components/profilepicture";
import styles from "../styles/dashboardright.module.css";

//const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const RightDashboard = ({ user }) => (
  <div className={styles.outerContainer}>
    <ProfilePicture url={user.avatar_url} user_id={user.id} name={user.name} />
    <div>
      <Paragraph>{user.name}</Paragraph>
      <Paragraph style={{ overflow: "hidden" }}>{user.email}</Paragraph>
    </div>
    <div className={styles.flexContainer}>
      <InboxOutlined color="black" />
      <MessageFilled />
      <QuestionCircleFilled />
      <SettingFilled />
    </div>
    <Button>Manage Profile</Button>
  </div>
);
export default RightDashboard;
