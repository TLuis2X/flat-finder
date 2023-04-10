import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faSmoking } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Image,
  Descriptions,
  Carousel,
  Typography,
} from "antd";
import { MessageOutlined } from "@ant-design/icons";

import Map from "../components/Map.js";
import ForumPostService from "@/services/ForumPostService.js";
import ForumPost from "./ForumPost.js";
import { Avatar, flexbox } from "@chakra-ui/react";
import AdOwnerCard from "./AdOwnerCard.js";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing } from "@/redux/selectedListingSlice";

const { TextArea } = Input;
const { Paragraph } = Typography;

const ListingInfo = ({ userId }) => {
  const [content, setContent] = useState("");
  const [forumPosts, setForumPosts] = useState([]);
  const listing = useSelector(state => state.selectedListing)
  const { owner } = listing;

  const forumPostService = new ForumPostService();
  const dispatch = useDispatch();


  async function addPost() {
    if (content.length > 0) {
      const postToAdd = await forumPostService.addForumPost(
        userId,
        content,
        listing.forum
        );
        console.log(postToAdd);
      setContent("");
      setForumPosts((prev) => prev.concat([postToAdd]));
    }
  }

  async function fetchPosts() {
    const fetchPostsResponse = await forumPostService.getForumPosts(
      listing.forum
    );
    // console.log(fetchPostsResponse);
    setForumPosts(fetchPostsResponse.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <Button onClick={() => dispatch(setSelectedListing({}))}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>{" "}
      <br></br>
      <div style={{ display: "flex"}}>
        <h2 style={{ fontFamily: "IBM_Plex_Serif" }}>{listing.title}</h2>

        <Paragraph copyable = {{text: listing.id,
                                tooltips: ['Copy ID', 'ID Copied!!'],
                                }}> </Paragraph>

      </div>
      
      
      <Descriptions.Item>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Carousel
            autoplay
            style={{
              width: 500,
              height: 300,
              overflow: "hidden",
              textAlign: "center",
              alignContent: "center",
              marginLeft: "90px",
              display: "relative",
            }}
          >
            {listing.images.map((src) => (
              <Image
                src={
                  src
                } /* style={{backgroundSize: 'cover', backgroundImage: `url(${src})`}} */ /* preview={false} */
              />
            ))}
          </Carousel>
          <AdOwnerCard owner={owner} user_id={userId} />
        </div>
        <br />
        <h3 style={{ fontFamily: "IBM_Plex_Serif" }}>Extra information</h3>
        <br />
      </Descriptions.Item>
      <Descriptions layout="vertical" style={{"white-space":"pre-line"}}>
        <Descriptions.Item label="Rent">
          £{listing.monthly_price} (pcm)
        </Descriptions.Item>
        <Descriptions.Item label="Deposit">
          £{listing.deposit}
        </Descriptions.Item>
        <Descriptions.Item label="Listing created on">
          {listing.created_at}
        </Descriptions.Item>

        <Descriptions.Item label="Address" span={2}>
          {listing.address.first_line}, {listing.address.second_line},{" "}
          {listing.address.postcode}, {listing.address.city},{" "}
          {listing.address.country}
        </Descriptions.Item>
        <Descriptions.Item label="Contract length">
          {listing.contract_length} (months)
        </Descriptions.Item>
        <Descriptions.Item label="Key features">
          {listing.key_features.pets_allowed ? (
            <FontAwesomeIcon icon={faDog} />
          ) : (
            false
          )}
          &nbsp;
          {listing.key_features.transport_nearby ? (
            <FontAwesomeIcon icon={faCar} />
          ) : (
            false
          )}
          &nbsp;
          {listing.key_features.gym_nearby ? (
            <FontAwesomeIcon icon={faDumbbell} />
          ) : (
            false
          )}
          &nbsp;
          {listing.key_features.smoking_allowed ? (
            <FontAwesomeIcon icon={faSmoking} />
          ) : (
            false
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {listing.description} Listing id: {listing.id}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="View it on a map">
          <Map listings={[listing]} />
        </Descriptions.Item>
      </Descriptions>
      <div>
        {forumPosts.map((forumPost) => (
          <ForumPost key={forumPost.id} forumPost={forumPost} user_id={userId} setForumPosts={setForumPosts}/>
        ))}
          <Row gutter={16}>
            <Col span={24}>
                <TextArea
                style={{width: '80%'}}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="Post message"
                maxLength={120}
                />
            </Col>
          </Row>
          <Button type="primary" onClick={addPost}>
            Add post
          </Button>
      </div>
      <div>{/* <ForumPost forumPost={forumPosts[0]} /> */}</div>
    </>
  );
};

export default ListingInfo;
