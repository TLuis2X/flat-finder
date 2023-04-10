import React from "react";
import { AutoComplete, message } from "antd";
import citiesData from "../data/cities.json";
import SearchResultPage from "@/components/searchResults";
import FavListings from "@/components/FavListings";
import { Avatar, Space, Breadcrumb, Layout, Menu, theme, Empty, Badge } from "antd";
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
import { /* items */ emptyListing } from "@/utils";
import OwnListings from "@/components/OwnListings";
import ForumPost from "@/components/ForumPost";
import ConsultantHomePage from "@/components/ConsultantHomePage";
import GlobalView from "@/components/GlobalView";
import { notification } from "antd";
import ForumPostService from "@/services/ForumPostService";
import NotificationService from "@/services/NotificationService";
import MessageService from "@/services/messageService";
import Inbox from "@/components/Inbox";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { addMessage } from "@/redux/messagesSlice";
import { setFavListings } from "@/redux/favListingSlice";
import { userService } from "@/services/Instances";
import { addMessageToSelectedChatHistory } from "@/redux/selectedChatHistory";
import { setSelectedListing } from "@/redux/selectedListingSlice";
import { setAllMessages } from "@/redux/messagesSlice";
import {
  SearchOutlined,
  AppstoreAddOutlined,
  InboxOutlined,
  HomeOutlined,
  LogoutOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { addConversation, setConversations } from "@/redux/conversationSlice";
const { Header, Content, Footer, Sider } = Layout;

function FlatifyDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [options, setOptions] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const [listings, setListings] = useState([]);
  const [ownListings, setOwnListings] = useState([]);
  const [tickets, setTickets] = useState([]);
  // const [conversations, setConversations] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [listing, setListing] = useState(emptyListing);
  const [tabKey, setTabKey] = useState("1");
  const [unreadCount, setUnreadCount] = useState(0);
  const [isUnreadCountInitialized, setIsUnreadCountInitialized] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const favListings = useSelector((state) => state.favListings);
  const selectedConvo = useSelector((state) => state.selectedConvo);
  const conversations = useSelector(state => state.conversations);
  const allMessages = useSelector((state) => state.allMessages);

  const userRef = useRef(user);
  const ownListingsRef = useRef(ownListings);

  const listingService = new ListingService();
  const favListingSevice = new FavListingService();
  const ticketService = new TicketService();
  const messageService = new MessageService();
  const forumPostService = new ForumPostService();
  const notificationService = new NotificationService(api, setTabKey);

  const supabase = useSupabaseClient();
  const router = useRouter();

  async function handleLogout() {
    await userService.logout(supabase);
  }


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
    getItem("Search", "2", <SearchOutlined />),
    getItem("Global View", "3", <GlobalOutlined />),
    getItem("Add listings", "4", <AppstoreAddOutlined />),
    getItem(<div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <p style={{marginBottom: 0}}>Inbox</p>
                {unreadCount > 0 && (
                <Badge count={unreadCount} size='small'/>)}
            </div>, "5", <InboxOutlined />),
    getItem("Logout", "6", <LogoutOutlined />),
  ];
  


  async function handleMessageEvent(new_record, eventType, user) {
    //if we sent the message, don't notify!
    if (new_record.sender_id !== user.id && eventType === 'INSERT') {
      const conversation = await messageService.getConversationById(
        new_record.conversation_id
      );
      console.log("Here is the user state var: ", { user });
      if (conversation.user1.id === user.id) {
        notificationService.privateMessage(new_record, conversation.user2);
        dispatch(addMessage(new_record));
        dispatch(addConversation(conversation))
        setUnreadCount(prev => prev + 1);
        //check is done in the redux store!
        dispatch(addMessageToSelectedChatHistory(new_record));
      } else if (conversation.user2.id === user.id) {
        notificationService.privateMessage(new_record, conversation.user1);
        dispatch(addMessage(new_record));
        dispatch(addConversation(conversation))
        setUnreadCount(prev => prev + 1);
        //check is done in the redux store!
        dispatch(addMessageToSelectedChatHistory(new_record));
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

    //notify for subbed listing
    for (const { listing } of favListings) {
      if (listing.forum == new_record.forum && listing.owner.id !== user.id) {
        const fullPost = await forumPostService.getPostById(new_record.id);
        notificationService.forumPost(fullPost, listing);
        return;
      }
    }
    for (const listing of ownListings) {
      console.log({ listing });
      if (listing.forum == new_record.forum) {
        console.log("Inside if statement of handleForumEvent");
        const fullPost = await forumPostService.getPostById(new_record.id);
        notificationService.forumPost(fullPost, listing);
        return;
      }
    }
  }

  async function handleTicketEvent(new_record, eventType, user) {
    if (new_record.creator === user.id) {
      if (eventType === "UPDATE") {
        setTickets((prev) => {
          const index = prev.findIndex((ticket) => ticket.id === new_record.id);
          if (index !== -1) {
            const new_tickets = [...prev];
            new_tickets[index] = new_record;
            return new_tickets;
          }
        });
        notificationService.ticketUpdate(new_record);
      } else if (eventType === "DELETE") {
        //to implement
      }
    }
  }

  function handleRealtimeEvents(payload, user, ownListings) {
    console.log(payload);
    const [new_record, table, eventType] = [
      payload.new,
      payload.table,
      payload.eventType,
    ];
    switch (table) {
      case "forum_post":
        handleForumEvent(new_record, ownListings);
        break;
      case "message":
        handleMessageEvent(new_record, eventType, user);
        break;
      case "ticket":
        handleTicketEvent(new_record, eventType, user);
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
    console.log("User from redux", user);
    userRef.current = user;
    ownListingsRef.current = ownListings;
  }, [user, ownListings]);

  useEffect(() => {
    (async () => {
      const [user_profile, allListings] = await Promise.all([
        userService.getAuthUserProfile(supabase),
        listingService.getListings(),
      ]);
      dispatch(setUser(user_profile));
      setListing((prevListing) => ({ ...prevListing, owner: user_profile.id }));
      setListings(allListings);

      const [new_favListings, new_ownListings, new_tickets, new_conversations] =
        await Promise.all([
          favListingSevice.getFavListing(user_profile.id),
          listingService.getOwnListing(user_profile.id),
          ticketService.getUserTicket(user_profile.id),
          messageService.getUserConversations(user_profile.id),
        ]);
      dispatch(setFavListings(new_favListings));
      setOwnListings(new_ownListings);
      setTickets(new_tickets);
      dispatch(setConversations(new_conversations))

      const twoDMessageArray = await Promise.all(
        new_conversations.map((conversation) => {
          return messageService.getConversationMessages(conversation.id);
        })
      );
      console.log({ twoDMessageArray });
      // setMessages(twoDMessageArray);
      dispatch(setAllMessages(twoDMessageArray));
    })();
  }, []);

  useEffect(() => {
    if (allMessages.length > 0) {
      let initialCount = 0;
      for (const conversations of allMessages) {
        for (const message of conversations) {
          if (message.sender_id !== user.id && !message.is_read) {
            initialCount++;
          }
        }
      }
      setUnreadCount(initialCount);
      setIsUnreadCountInitialized(true);
    }
  }, [allMessages]);

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
        </div> */}
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
          selectedKeys={[String(tabKey)]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            if (key === "6") {
              handleLogout();
            } else {
              setTabKey(key);
              dispatch(setSelectedListing({}));
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
          {tabKey == "5" &&
            (allMessages.length ? (
              <Inbox
                setConversation={setConversations}
                conversations={conversations}
              />
            ) : (
              <div style={{flexGrow: 1, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Empty description={
                    <p style={{ color: "gray" }}>
                       Inbox is empty
                    </p>
                  } />
            </div>
            ))}
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
          padding: "10px",
          width: "15%",
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
