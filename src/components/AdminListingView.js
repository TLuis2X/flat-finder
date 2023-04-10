import { Space, Search, Input, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ListingService from "@/services/ListingService";
import SearchListingCard from "./SearchListingCard";
import ListingInfo from "./ListingInfo";
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
  position,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";



const { Paragraph } = Typography;

const AdminListingView = (props) => {
    // const listingService = new ListingService();
    const listings = props.listings;
    const user_id = props.user_id;
    const selectedListing = useSelector(state => state.selectedListing)

    return (
        <>
        {Object.keys(selectedListing).length ? (
            <ListingInfo
            listing={selectedListing}
            userId={user_id}
          />
        ) : 

            <div
                style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "90%",
                gap: "1rem",
                }}
            >
                <div
                    style={{
                        /* flexGrow: 1, */ display: "flex",
                        flexDirection: "column",
                        marginBottom: "5rem",
                    }}
                >
                    {listings.map(listing =>
                        <div style={{position: "relative", display: "flex", flexDirection: "column", gap:"1rem"}}>
                            <SearchListingCard listing={listing}></SearchListingCard>
                            <div style={{position: "absolute", zIndex: 2, top: 25, right: 10}} >
                                <Paragraph copyable = {{text: listing.id,
                                    tooltips: ['Copy ID', 'ID Copied!!'],
                                    }}> 
                                </Paragraph>
                            </div>
                            
                        </div>
                    )}
                </div>
            </div>
        }
        </>
    )
}

export default AdminListingView;