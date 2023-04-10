import { Form, Select } from "antd";
import successData from "./data/successfully-done.json";
import laodingData from "./data/square-loading.json";
import contentModeration from "./data/content-moderation.json";
import consultantWelcome from "./data/singing-contract.json";

import {
  SearchOutlined,
  AppstoreAddOutlined,
  InboxOutlined,
  HomeOutlined,
  LogoutOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// const items = [
//   getItem("Home", "1", <HomeOutlined />),
//   getItem("Search", "2", <SearchOutlined />),
//   getItem("Global View", "3", <GlobalOutlined />),
//   getItem("Add listings", "4", <AppstoreAddOutlined />),
//   getItem("Inbox", "5", <div style={{position: 'relative'}}>
//                         {badgeCount > 0 && (
//                         <Badge count={badgeCount} style={{ marginLeft: "5px" }} />)}
//                         <InboxOutlined />
//                         </div>),
//   getItem("Logout", "6", <LogoutOutlined />),
// ];

const { Option } = Select;
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
      <Option value="EUR">€</Option>
    </Select>
  </Form.Item>
);

const successOptions = {
  loop: false,
  autoplay: true,
  animationData: successData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const moderationOption = {
  loop: true,
  autoplay: true,
  animationData: contentModeration,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const consultantHome = {
  loop: true,
  autoplay: true,
  animationData: consultantWelcome,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const loadingOptions = {
  loop: true,
  autoplay: true,
  animationData: laodingData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const emptyListing = {
  title: "",
  description: "",
  images: [],
  owner: null,
  monthly_price: 0,
  deposit: 0,
  address: {
    first_line: "",
    second_line: "",
    postcode: "",
    city: "",
    country: "",
  },
  contract_length: 0,
  coordinates: {
    latitude: "",
    longitude: "",
  },
  key_features: {
    bathrooms: 0,
    beds: 0,
    monthly_bills: 0, //if 0, then bills included
    pets_allowed: false,
    smoking_allowed: false,
    station_nearby: false,
    gym_nearby: false,
  },
  temp_fileList: [], //NOTE: this is NOT a column in the listing table in db. This is used in the addListing component to mantain state of pictures uploaded.
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export {
  // items,
  suffixSelector,
  successOptions,
  loadingOptions,
  emptyListing,
  moderationOption,
  consultantHome,
  beforeUpload,
  getBase64,
};
