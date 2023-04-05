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
const SearchResultPage = (props) => {
  //TODO: find a way to check which listings are already favorited by the user logged in...

  const favIds =
    // props.favListings.length &&
    props.favListings.map((item) => item.listing.id);

  const [selectedListing, setSelectedListing] = useState(null);
  const { listings, setFavListings, user_id, forum } = props;
  const [sliceIndex, setSliceIndex] = useState(3);

  const searchedListings = listings.filter(
    (listing) => listing.address.city == props.searchValue
  );
  const displayListings = listings.map((listing) => listing);
  const favListingSevice = new FavListingService();

  const showListingsInfo = (listingId) => {
    console.log(listingId);
  };

  async function handleFav(listingId) {
    if (favIds.includes(listingId)) {
      const result = await favListingSevice.removeFavListing(
        user_id,
        listingId
      );
      console.log("Result of removal! ", result);
      setFavListings((prev) =>
        prev.filter((item) => item.listing.id !== listingId)
      );
    } else {
      const result = await favListingSevice.addFavListing(user_id, listingId);
      setFavListings((prev) => prev.concat(result.data));
    }
  }

  async function handlePagination(pageNumber, pageSize) {
    console.log({ pageNumber, pageSize });
    setSliceIndex(pageNumber * 3);
  }
  return (
    <>
      {selectedListing ? (
        <ListingInfo
          listing={selectedListing}
          setSelectedListing={setSelectedListing}
          userId={user_id}
        />
      ) : (
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
            {!props.searchValue ? (
              <Empty
                description={
                  <p style={{ color: "gray" }}>Search for something :D</p>
                }
              />
            ) : !searchedListings.length ? (
              <Empty
                description={
                  <p style={{ color: "gray" }}>
                    No listings in {props.searchValue}
                  </p>
                }
              />
            ) : (
              searchedListings
                .slice(sliceIndex - 3, sliceIndex)
                .map((listing) => (
                  <Card
                    className="card hover-bg hover-up"
                    key={listing.id}
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                    style={{ marginTop: "20px", width: "100%" }}
                  >
                    <Image
                      objectFit="cover"
                      // maxW={{ base: "100%", lg: "150px" }}
                      style={{ width: "300px" }}
                      src={listing.images[2]}
                      alt="Caffe Latte"
                    />

                    <Stack style={{ width: "100%" }}>
                      <CardBody style={{ paddingBottom: 0 }}>
                        <div>
                          <p>
                            <Heading size="lg">{listing.title}</Heading>
                            <Heading size="md">
                              £{listing.monthly_price}
                            </Heading>
                          </p>
                        </div>
                        <div>
                          <p>
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> &nbsp;
                            {listing.address.second_line},{" "}
                            {listing.address.city}
                          </p>
                        </div>
                        {/* <br /> */}
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
                        {/* <br /> */}
                        <p>Available now (L/S)</p>
                      </CardBody>

                      <CardFooter
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="solid"
                          //   colorScheme="blue"
                          style={{
                            color: "white",
                            backgroundColor: "#1677ff",
                            // marginBottom: "60px",
                            // marginTop: "-30px",
                          }}
                          onClick={() => setSelectedListing(listing)}
                        >
                          More info
                        </Button>
                        {favIds.includes(listing.id) ? (
                          <StarFilled
                            className="custom-icon spin-animation"
                            onClick={() => handleFav(listing.id)}
                          />
                        ) : (
                          <StarOutlined
                            className="custom-icon spin-animation-rev"
                            onClick={() => handleFav(listing.id)}
                          />
                        )}
                      </CardFooter>
                    </Stack>
                  </Card>
                ))
            )}
          </div>
          <Pagination
            /* style={{justifySelf: 'flex-end'}} */ style={{
              position: "absolute",
              bottom: "5.5rem",
            }}
            defaultCurrent={1}
            current={sliceIndex/3}
            defaultPageSize={3}
            total={searchedListings.length}
            onChange={handlePagination}
          />
        </div>
      )}
    </>
  );
};

export default SearchResultPage;
