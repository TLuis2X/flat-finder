import React from "react";
import { AutoComplete } from "antd";
import citiesData from "../data/cities.json";
import AdminResultPage from "@/components/adminResults";
import AdminListingView from "@/components/AdminListingView";
import Lottie from "@amelix/react-lottie";
import { moderationOption } from "@/utils";
import {
  SearchOutlined,
  AppstoreAddOutlined,
  InboxOutlined,
  HomeOutlined,
  LogoutOutlined,
  ContainerOutlined,
  ShopOutlined
} from "@ant-design/icons";
import AdminTicketResolver from "@/components/AdminTicketResolver";
import { Avatar, Space, Breadcrumb, Layout, Menu, theme } from "antd";
import { useEffect, useState, useRef } from "react";
import UserService from "@/services/UserService";
import { User, emptyUser } from "@/models/User";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import RightDashboard from "@/components/rightdashboard";
import AddListingComponent from "@/components/AddListings";
import ListingService from "@/services/ListingService";
import TicketService from "@/services/TicketService";
import ListingInfo from "@/components/ListingInfo";
import { useRouter } from "next/router";
import TicketView from "@/components/TicketView";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Delete listings", "2", <SearchOutlined />),
  getItem("Tickets", "3", <InboxOutlined />),
  getItem('Listings View', '4', <ShopOutlined />),
  getItem('Tickets View', '5', <ContainerOutlined />),
  getItem("Logout", "6", <LogoutOutlined />),
];

const AdminDashboard = () => {
  const [user, setUser] = useState(new User(emptyUser));
  const [listings, setListings] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [options, setOptions] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [tabKey, setTabKey] = useState("1");

  const userService = new UserService();
  const listingService = new ListingService();
  const ticketService = new TicketService();
  const supabase = useSupabaseClient();

  async function handleLogout() {
    console.log("clicked on logout");
    await userService.logout(supabase);
  }

  useEffect(() => {
    (async () => {
      const [user_profile, allListings, allTickets] = await Promise.all([
        userService.getAuthUserProfile(supabase),
        listingService.getListings(),
        ticketService.getTickets(),
      ]);
      setUser(user_profile);
      setListings(allListings);
      setTickets(allTickets);
    })();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* <div
          style={{
            height: 38,
            margin: 12,
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            textAlign: "center",
          }}
        >
          FDM
        </div>
         */}
        <div
          style={{
            height: 38,
            margin: 12,
            // background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <img
            src={collapsed ? "/fdm.png" : "/fdm.png"}
            style={{
              height: collapsed ? 32 : 40,
              width: collapsed ? 48 : 64,
              marginRight: 18,
              marginLeft: collapsed ? 18 : 60,
              alignItems: collapsed ? "normal" : "center",
              justifyContent: collapsed ? "normal" : "center",
            }}
          />
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            if (key === "6") {
              handleLogout();
            } else {
              setTabKey(key);
            }
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            textAlign: "center",
            color: "#fff",
            height: 64,
            paddingInline: 10,
            lineHeight: "64px",
            backgroundColor: "#001628",
            // maxWidth: 800,
          }}
        ></Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
          </Breadcrumb>
          {tabKey == "1" && (
            <div
              style={{
                padding: 24,
                minHeight: 570,
                background: colorBgContainer,
              }}
            >
              <div style={{ marginTop: "-200px" }}>
                <Lottie options={moderationOption} height={800} width={800} />
              </div>
              {/* <div
                style={{
                  margin: 60,
                  textAlign: "center",
                }}
              >
                <TicketsComponent />
              </div> */}
            </div>
          )}
          {tabKey == "2" && <AdminResultPage listings={listings} />}
          {tabKey == "3" && (
            <AdminTicketResolver tickets={tickets} user={user} />
          )}

          {tabKey == "4" && <AdminListingView listings={listings} user_id={user.id} />}

          {tabKey == '5' && <TicketView tickets={tickets} setTickets={setTickets} />}
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "white",
            color: "black",
          }}
        >
          FDM | FLATIFY
        </Footer>
      </Layout>
      <Sider
        style={{
          textAlign: "center",
          lineHeight: "120px",
          // color: "#fff",
          width: 70,
        }}
      >
        <Space size={26} wrap>
          <RightDashboard user={user} />
        </Space>
      </Sider>
    </Layout>
  );
};
export default AdminDashboard;
