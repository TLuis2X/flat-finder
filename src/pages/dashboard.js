import React from "react";
import { AutoComplete, message } from "antd";
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
import { notification } from "antd";
import ForumPostService from "@/services/ForumPostService";
import NotificationService from "@/services/NotificationService";
import MessageService from "@/services/messageService";
import Inbox from "@/components/Inbox";

const { Header, Content, Footer, Sider } = Layout;

function FlatifyDashboard() {
  const [user, setUser] = useState(new User(emptyUser));
  const [collapsed, setCollapsed] = useState(false);
  const [options, setOptions] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const [listings, setListings] = useState([]);
  const [favListings, setFavListings] = useState([]);
  const [ownListings, setOwnListings] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [listing, setListing] = useState(emptyListing);
  const [tabKey, setTabKey] = useState("1");

  const userRef = useRef(user);
  const ownListingsRef = useRef(ownListings);

  const userService = new UserService();
  const listingService = new ListingService();
  const favListingSevice = new FavListingService();
  const ticketService = new TicketService();
  const messageService = new MessageService();
  const forumPostService = new ForumPostService();
  const notificationService = new NotificationService(api);

  const supabase = useSupabaseClient();
  const router = useRouter();

  async function handleLogout() {
    await userService.logout(supabase);
  }

  async function handleMessageEvent(new_record, user) {
    //if we sent the message, don't notify!
    if (new_record.sender_id !== user.id) {
      const conversation = await messageService.getConversationById(
        new_record.conversation_id
      );
      console.log("Here is the user state var: ", { user });
      if (conversation.user1.id === user.id) {
        notificationService.privateMessage(new_record, conversation.user2);
      } else if (conversation.user2.id === user.id) {
        notificationService.privateMessage(new_record, conversation.user1);
      } else {
        console.log(
          "The message was not sent to you: ",
          user.id,
          " the conversation is between:",
          conversation.user1.id,
          " and ",
          conversation.user2.id
        );
      }
    }
  }

  async function handleForumEvent(new_record, ownListings) {
    console.log("Inside handleForumEvent: ", new_record);
    // const new_record = payload.new;
    console.log({ new_record });
    console.log({ ownListings });
    for (const listing of ownListings) {
      console.log({ listing });
      if (listing.forum == new_record.forum) {
        //get user
        console.log("Inside if statement of handleForumEvent");
        const fullPost = await forumPostService.getPostById(new_record.id);
        notificationService.forumPost(fullPost, listing.address.city);
      }
    }
  }
  
  async function handleTicketEvent(new_record, eventType, user) {
    if (new_record.creator === user.id){
      if (eventType === 'UPDATE'){
        setTickets(prev => {
          const index = prev.findIndex((ticket) => ticket.id === new_record.id)
          if (index !== -1){
            const new_tickets = [...prev];
            new_tickets[index] = new_record;
            return new_tickets
          }
        })
        notificationService.ticketUpdate(new_record)
      } else if (eventType === 'DELETE'){
        //to implement
      }
      
    }
}


  function handleRealtimeEvents(payload, user, ownListings){
    console.log(payload)
    const [new_record, table, eventType] = [payload.new, payload.table, payload.eventType];
    switch (table){
      case 'forum_post':
        handleForumEvent(new_record,ownListings)
        break;
      case "message":
        handleMessageEvent(new_record, user);
        break;
      case 'ticket':
        handleTicketEvent(new_record, eventType, user)
      default:
        console.log(payload);
    }
  }

  useEffect(() => {
    // Supabase client setup
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload) =>
          handleRealtimeEvents(payload, userRef.current, ownListingsRef.current)
      )
      .subscribe();
  }, [supabase]);

  useEffect(() => {
    userRef.current = user;
    ownListingsRef.current = ownListings;
  }, [user, ownListings]);

  useEffect(() => {
    (async () => {
      const [user_profile, allListings] = await Promise.all([
        userService.getAuthUserProfile(supabase),
        listingService.getListings(),
      ]);
      // user_profile.is_admin && router.push("/admin");
      setUser(user_profile);
      setListing((prevListing) => ({ ...prevListing, owner: user_profile.id }));
      setListings(allListings);

      const [new_favListings, new_ownListings, new_tickets, new_conversations] =
        await Promise.all([
          favListingSevice.getFavListing(user_profile.id),
          listingService.getOwnListing(user_profile.id),
          ticketService.getUserTicket(user_profile.id),
          messageService.getUserConversations(user_profile.id),
        ]);
      // console.log({ new_favListings });
      setFavListings(new_favListings);
      setOwnListings(new_ownListings);
      setTickets(new_tickets);
      setConversations(new_conversations);

      const twoDMessageArray = await Promise.all(
        new_conversations.map((conversation) => {
          return messageService.getConversationMessages(conversation.id);
        })
      );
      console.log({ twoDMessageArray });
      setMessages(twoDMessageArray);
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
      {contextHolder}
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
          {tabKey == "5" && (
            <Inbox
              setConversation={setConversations}
              messages={messages}
              setMessages={setMessages}
              conversation={conversations}
              user={user}
            />
          )}
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
