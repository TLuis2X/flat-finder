// import { Card } from "antd";
import React from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Empty } from "antd";
import ListingInfo from "./ListingInfo";
const contentStyle = {
  height: "160px",
  //   width: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
  maxWidth: "max-content",
};
import { Divider, Space, Tag } from "antd";
import {
  ChakraProvider,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Image,
  Card,
  Text,
} from "@chakra-ui/react";
import { items } from "@/utils";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing } from "@/redux/selectedListingSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";

const FavListings = ({ favListings }) => {
  const FavouriteListings =
    favListings && favListings.map((item) => item.listing);

  const [indexC1, setIndexC1] = useState(0);
  const [indexC2, setIndexC2] = useState(0);
  const [indexC3, setIndexC3] = useState(0);

  const dispatch = useDispatch();

  const handleSelect = (selectedIndex, e) => {
    setIndexC1(selectedIndex);
  };
  return (
    <div>
      <Divider
        orientation="middle"
        style={{
          textAlign: "left",
          fontFamily: "IBM_Plex_Serif",
          fontSize: "18px",
        }}
      >
        Saved listings
      </Divider>


        {FavouriteListings && !FavouriteListings.length ? (
                <div
                style={{
                  display: "flex",
                  alignItems: "center", 
                  overflowX: "scroll",
                  textAlign: "center",
                  justifyContent: "center",
                  width: "100%",
                  paddingLeft: "8px",
                }}
              >
          <Empty
            description={
              <p style={{ color: "gray" }}>Saved listings will show here</p>
            }
          />
          </div>
        ) : (
          <div
          style={{
            display: "flex",
            alignItems: "center", 
            overflowX: "scroll",
            textAlign: "center",
            justifyContent: "flex-start",
            width: "100%",
            paddingLeft: "8px",
          }}
        >
          {FavouriteListings &&
          FavouriteListings.map((listing, index) => (
            <div
              style={{
                position: "relative",
                marginRight: "8px", // Add consistent right margin
              }}
              >
              <Carousel
                key={listing.id}
                style={{
                  width: "350px",
                  padding: "5px",
                  overflow: "scroll",
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                  flexShrink: 0,
                }}
                // onClick={() => dispatch(setSelectedListing(listing))}
              >
                {listing &&
                  listing.images.map((image, index) => (
                    <Carousel.Item
                      activeIndex={indexC1}
                      onSelect={handleSelect}
                      key={image}
                    >
                      <img
                        className="d-block w-150"
                        src={image}
                        alt="Carousel Slide"
                        style={{ width: "500px", height: "200px" }}
                      />
                      <Carousel.Caption>
                        {index == 0 && <p>{listing.title}</p>}
                        {index == 1 && <p>{listing.monthly_price}</p>}
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
              </Carousel>
              <div
                className="glass-icon-container top-right"
                style={{ cursor: "pointer", zIndex: 2 }}
                onClick={() => dispatch(setSelectedListing(listing))}
              >
                <FontAwesomeIcon icon={faSquareUpRight} beat className="icon" />
              </div>
            </div>
          ))}
          </div>)}
    </div>
  );
};

export default FavListings;
