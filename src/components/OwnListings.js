// import { Card } from "antd";
import React from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Empty, Button } from "antd";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";
import { Divider, Space, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedListing } from "@/redux/selectedListingSlice";

function OwnListings({ ownListings }) {
  const [indexC1, setIndexC1] = useState(0);

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
        Own listings
      </Divider>
      <div
        style={{
          // display: "flex",
          // marginLeft: "-8px",
          // textAlign: "center",
          // justifyContent: "center",
          // overflowX: "scroll",
          display: "flex",
          overflowX: "scroll",
          marginLeft: "-8px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {!ownListings.length ? (
          <Empty
            description={
              <p style={{ color: "gray" }}>Personal listings will show here</p>
            }
          />
        ) : (
          ownListings.map((listing) => (
            <div style={{ position: "relative" }}>
              <Carousel
                className="card hover-scale"
                style={{
                  // width: "350px",
                  // padding: "5px",
                  // overflow: "scroll",
                  // whiteSpace: "nowrap",
                  // flexShrink: 0,
                  width: "350px",
                  padding: "5px",
                  overflow: "scroll",
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                  flexShrink: 0,
                }}
                // onClick={() => dispatch(setSelectedListing(listing))}
              >
                {listing.images.map((image, index) => (
                  <Carousel.Item activeIndex={indexC1} onSelect={handleSelect}>
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
          ))
        )}
      </div>
    </div>
  );
}

export default OwnListings;
