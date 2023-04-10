// import { Card } from "antd";
import { Space, Search, Input } from "antd";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ListingService from "@/services/ListingService";
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

const AdminResultPage = (props) => {
  // const listings = props.listings.map((listing) => listing);
  const listingService = new ListingService();
  const [selectedListing, setSelectedListing] = useState(null);
  const listingsAvailable = props.listings.map((listing) => listing);
  console.log(listingsAvailable);
  
  function onSearch(listId) {
    console.log("Searching for listing with id:", listId);
    console.log("Available listings:", listingsAvailable);

    const selected = listingsAvailable.find(
      (listing) => parseInt(listing.id) === parseInt(listId)
    );
    if (selected) {
      setSelectedListing(selected);
    } else {
      setSelectedListing(null);
    }
  }

  function deleteListing() {
    if (selectedListing.id) {
      listingService.removeListing(selectedListing.id);
      setSelectedListing(null);
      console.log("inside if statement");
    } else {
      console.log("Error. Listing could not be deleted.");
    }
  }

  const { Search } = Input;

  return (
    <>
      <Search
        placeholder="Enter listing id..."
        onSearch={onSearch}
        enterButton
      />
      {selectedListing && (
        <div>
          <Card
            className="card hover-bg hover-up"
            key={selectedListing.id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            style={{ marginTop: "20px", width: "100%" }}
          >
            <Image
              objectFit="cover"
              // maxW={{ base: "100%", lg: "150px" }}
              style={{ width: "300px" }}
              src={selectedListing.images[2]}
              alt="Caffe Latte"
            />

            <Stack style={{ width: "100%" }}>
              <CardBody style={{ paddingBottom: 0 }}>
                <div>
                  <p>
                    <Heading size="lg">{selectedListing.title}</Heading>
                    <Heading size="md">
                      £{selectedListing.monthly_price}
                    </Heading>
                  </p>
                </div>
                <div>
                  <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> &nbsp;
                    {selectedListing.address.second_line},{" "}
                    {selectedListing.address.city}
                  </p>
                </div>
                {/* <br /> */}
                <div>
                  <p>
                    {selectedListing.key_features.beds}
                    &nbsp;
                    <FontAwesomeIcon icon={faBed} />
                    &nbsp; &nbsp;
                    {selectedListing.key_features.bathrooms}
                    &nbsp;
                    <FontAwesomeIcon icon={faBath} />
                  </p>
                </div>
                {/* <br /> */}
                <p>Available now (L/S)</p>
              </CardBody>
              <Button
                onClick={() => {
                  deleteListing();
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
              <CardFooter
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              ></CardFooter>
            </Stack>
          </Card>
        </div>
      )}
    </>
  );
};

export default AdminResultPage;
