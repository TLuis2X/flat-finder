import React from "react";
import { Divider, Radio, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { userService } from "@/services/Instances";
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
import { useSupabaseClient } from "@supabase/auth-helpers-react";

//const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const RightDashboard = ({ user }) => {
  const supabase = useSupabaseClient();
  return (
    <div className={styles.outerContainer}>
      <ProfilePicture
        url={user.avatar_url}
        user_id={user.id}
        name={user.name}
      />
      <div>
        <Paragraph>{user.name}</Paragraph>
      </div>
      {/* <div className={styles.flexContainer}>
      <InboxOutlined color="black" />
    </div> */}
      <Button
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          userService.logout(supabase);
        }}
      >
        {" "}
        <LogoutOutlined /> Logout
      </Button>
    </div>
  );
};
export default RightDashboard;
