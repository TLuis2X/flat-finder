import React, { useState } from "react";
import FavListings from "./FavListings";
import OwnListings from "./OwnListings";
import TicketsComponent from "./Tickets";
import ListingInfo from "./ListingInfo";

const ConsultantHomePage = ({
  favListings,
  ownListings,
  user_id,
  setTickets,
  tickets,
}) => {
  const [selectedListing, setSelectedListing] = useState("");

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
          className="card"
          style={{
            padding: 24,
            minHeight: 570,
            // background: colorBgContainer,
          }}
        >
          <div>
            <FavListings
              favListings={favListings}
              setSelectedListing={setSelectedListing}
            />
          </div>

          <div>
            <OwnListings
              ownListings={ownListings}
              setSelectedListing={setSelectedListing}
            />
          </div>
          <div
            style={{
              margin: 60,
              textAlign: "center",
            }}
          >
            <TicketsComponent
              user_id={user_id}
              setTickets={setTickets}
              tickets={tickets}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultantHomePage;
