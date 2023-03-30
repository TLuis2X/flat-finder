import React from "react";
import { Descriptions, Button, Carousel } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faSmoking } from "@fortawesome/free-solid-svg-icons";
import Map from "../components/Map.js";

const ListingInfo = ({ listing, setSelectedListing }) => {
  console.log(listing.coordinates);
  return (
    <>
      <Button onClick={() => setSelectedListing(false)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <br></br>
      <h2 style={{ fontFamily: "IBM_Plex_Serif" }}>{listing.title}</h2>
      <Descriptions.Item>
        <Carousel
          autoplay
          style={{
            width: "1000px",
            textAlign: "center",
            alignContent: "center",
            marginLeft: "90px",
            display: "relative",
          }}
        >
          <div>
            <img src={listing.images[0]} />
          </div>
          <div>
            <img src={listing.images[1]} />
          </div>
          <div>
            <img src={listing.images[2]} />
          </div>
        </Carousel>
        <Map coordinates={listing.coordinates} />

        <br />
        <h3 style={{ fontFamily: "IBM_Plex_Serif" }}>Extra information</h3>
        <br />
      </Descriptions.Item>
      <Descriptions layout="vertical">
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
          {listing.description}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="View it on a map">
          <Map coordinates={listing.coordinates} />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default ListingInfo;
