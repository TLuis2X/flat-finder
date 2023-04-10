// import { Card } from "antd";
import React from "react";
import Listing from "@/models/Listing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ListingInfo from "./ListingInfo";
import FavListings from "./FavListings";

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
  Collapse,
} from "@chakra-ui/react";
import { Empty, Pagination } from "antd";
import FavListingService from "@/services/FavListingService";
import { useDispatch, useSelector } from "react-redux";
import { addFavListing, unfavListing } from "@/redux/favListingSlice";
import { favListingSevice } from "@/services/Instances";
import { setSelectedListing } from "@/redux/selectedListingSlice";
import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";

export default function MapInfoCard({ listing }) {
  const favListings = useSelector((state) => state.favListings);
  const favIds = favListings.map((item) => item.listing.id);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  async function handleFav(listingId) {
    if (favIds.includes(listingId)) {
      const result = await favListingSevice.removeFavListing(
        user.id,
        listingId
      );
      console.log("Result of removal! ", result);
      dispatch(unfavListing(listingId));
    } else {
      const result = await favListingSevice.addFavListing(user.id, listingId);
      dispatch(addFavListing(result.data[0]));
    }
  }

  return (
    <>
      <Card
        className="card hover-bg hover-up"
        key={listing.id}
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        style={{/*  marginTop: "20px", */ width: "100%", height: "100%" }}
      >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>

          <Image
            objectFit="cover"
            w="300px"
            h="200px"
            src={listing.images[2]}
            alt="Caffe Latte"
            />
          <div
            className="glass-icon-container top-right"
            style={{ cursor: "pointer", zIndex: 2 }}
            onClick={() => dispatch(setSelectedListing(listing))}
            >
                <FontAwesomeIcon icon={faSquareUpRight} beat className="icon" />
            </div>
        </div>


        <Stack style={{ width: "100%", height: '100%' }}>
          <CardBody style={{ paddingBottom: 0 }}>
            <div>
              <p>
                <Heading size="md">{listing.title}</Heading>
                <Heading size="md">£{listing.monthly_price}</Heading>
              </p>
            </div>
            <div>
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> &nbsp;
                {listing.address.second_line}, {listing.address.city}
              </p>
            </div>
            <div>
              <p>
                {listing.key_features.beds}
                &nbsp;
                <FontAwesomeIcon icon={faBed} />
                &nbsp; &nbsp;
                {listing.key_features.bathrooms}
                &nbsp;
                <FontAwesomeIcon icon={faBath} />
              </p>
            </div>
            <p>Available now (L/S)</p>
            <div
                className="glass-icon-container bottom-right"
                style={{ cursor: "pointer", zIndex: 2 }}
                // onClick={() => dispatch(setSelectedListing(listing))}
                onClick={() => handleFav(listing.id)}
              >
                {favIds.includes(listing.id) ? (
              <StarFilled
                className="custom-icon spin-animation"
              />
            ) : (
              <StarOutlined
                className="custom-icon spin-animation-rev"
                // onClick={() => handleFav(listing.id)}
              />
            )}
            </div>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
}
