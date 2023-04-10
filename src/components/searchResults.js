import React from "react";
import { useState } from "react";
import ListingInfo from "./ListingInfo";
import SearchListingCard from "./SearchListingCard";

import { Empty, Pagination } from "antd";
import { useSelector } from "react-redux";

const SearchResultPage = (props) => {

  const selectedListing = useSelector(state => state.selectedListing)
  const { listings, user_id } = props;
  const [sliceIndex, setSliceIndex] = useState(3);

  const searchedListings = listings.filter(
    (listing) => listing.address.city == props.searchValue
  );


  async function handlePagination(pageNumber, pageSize) {
    console.log({ pageNumber, pageSize });
    setSliceIndex(pageNumber * 3);
  }
  return (
    <>
      {Object.keys(selectedListing).length ? (
        <ListingInfo
          listing={selectedListing}
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

            {!props.searchValue ? (
              <div
              style={{
                /* flexGrow: 1, */ display: "flex",
                flexDirection: "column",
                marginBottom: "5rem",
                 height: '100%',
              }}
            >
              <div style={{flexGrow: 1, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Empty description={
                <p style={{ color: "gray" }}>
                    Search by city to see some results!
                    </p>
                  } />
                </div>
              </div>
            ) : !searchedListings.length ? (
              <div
              style={{
                /* flexGrow: 1, */ display: "flex",
                flexDirection: "column",
                marginBottom: "5rem",
                 height: '100%',
              }}
            >
              <div style={{flexGrow: 1, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Empty description={
                <p style={{ color: "gray" }}>
                    No listings in {props.searchValue}
                    </p>
                  } />
                </div>
              </div>
            ) : 
              <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "5rem",
              }}
            >
              {searchedListings
                .slice(sliceIndex - 3, sliceIndex)
                .map((listing) => <SearchListingCard listing={listing}/>)}
                </div>
                } 
          <Pagination
            style={{
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
