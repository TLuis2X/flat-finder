import React from "react";
import { AutoComplete } from "antd";
import citiesData from "../data/cities.json";
import SearchResultPage from "@/components/searchResults";
import FavListings from "@/components/FavListings"
import FavouriteListing from "@/components/favouritelisting";
import { Avatar, Space, Breadcrumb, Layout, Menu, theme } from "antd";
import { useEffect, useState, useRef } from "react";
import UserService from "@/services/UserService";
import { User, emptyUser } from "@/models/User";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import TicketsComponent from "@/components/Tickets";
import ListingService from "@/services/ListingService";
import RightDashboard from "@/components/rightdashboard";
import AddListingComponent from "@/components/AddListings";
import { useRouter } from "next/router";
import FavListingService from "@/services/FavListingService";
import TicketService from "@/services/TicketService";
import { items, emptyListing } from "@/utils";
import OwnListings from "@/components/OwnListings";
import ForumPost from "@/components/ForumPost";
import ConsultantHomePage from "@/components/ConsultantHomePage";
import GlobalView from "@/components/GlobalView";

const { Header, Content, Footer, Sider } = Layout;

function FlatifyDashboard() {
  const [user, setUser] = useState(new User(emptyUser));
  const [collapsed, setCollapsed] = useState(false);
  const [options, setOptions] = useState([]);

  const [listings, setListings] = useState([]);
  const [favListings, setFavListings] = useState([]);
  const [ownListings, setOwnListings] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [listing, setListing] = useState(emptyListing);
  const [tabKey, setTabKey] = useState("1");

  const userService = new UserService();
  const listingService = new ListingService();
  const favListingSevice = new FavListingService();
  const ticketService = new TicketService();

  const supabase = useSupabaseClient();
  const router = useRouter();

  async function handleLogout() {
    await userService.logout(supabase);
  }

  useEffect(() => {
    (async () => {
      const [user_profile, allListings] = await Promise.all([
        userService.getAuthUserProfile(supabase),
        listingService.getListings(),
      ]);
      user_profile.is_admin && router.push("/admin");
      setUser(user_profile);
      setListing((prevListing) => ({ ...prevListing, owner: user_profile.id }));
      setListings(allListings);

      const [new_favListings, new_ownListings, new_tickets] = await Promise.all(
        [
          favListingSevice.getFavListing(user_profile.id),
          listingService.getOwnListing(user_profile.id),
          ticketService.getUserTicket(user_profile.id),
        ]
      );
      console.log({ new_favListings });
      setFavListings(new_favListings);
      setOwnListings(new_ownListings);
      setTickets(new_tickets);
      console.log({ favListings });
    })();
  }, []);

  const handleSearch = (value) => {
    console.log(value);
    let res = [];
    if (!value) {
      res = [];
    } else {
      const filteredCities = citiesData.cities.filter((city) =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      res = filteredCities.map((city) => ({
        value: `${city.name}, ${city.country}`,
        label: `${city.name}, ${city.country}`,
      }));
    }
    setOptions(res);
  };

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

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
        <div
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

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={[String(tabKey)]}
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
        >
          <AutoComplete
            style={{ width: 800 }}
            onSelect={(value) => {
              setSearchValue(value.split(",")[0]);
              setTabKey(2);
            }}
            onSearch={handleSearch}
            placeholder="Search by city"
            options={options}
          />
        </Header>
        <Content
          style={{
            margin: "0 20px",
            // marginLeft: "10px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Consultant</Breadcrumb.Item>
            <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
          </Breadcrumb>
          {tabKey == "1" && (
            <ConsultantHomePage
              favListings={favListings}
              ownListings={ownListings}
              user_id={user.id}
              setTickets={setTickets}
              tickets={tickets}
            />
          )}

          {tabKey == "2" && (
            <SearchResultPage
              listings={listings}
              searchValue={searchValue}
              user_id={user.id}
              setFavListings={setFavListings}
              favListings={favListings}
            />
          )}
          {tabKey == "3" && <GlobalView listings={listings} />}
          {tabKey == "4" && (
            <AddListingComponent
              listing={listing}
              setListing={setListing}
              setOwnListings={setOwnListings}
              listings={listings}
              setListings={setListings}
            />
          )}
          {tabKey == "5" && <div>Inbox</div>}
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
          // width: 200,
          padding: "10px",
          overflow: "auto",
          marginRight: "-10px",
        }}
      >
        <Space size={26} wrap>
          <RightDashboard user={user} />
        </Space>
      </Sider>
    </Layout>
  );
}
export default FlatifyDashboard;
