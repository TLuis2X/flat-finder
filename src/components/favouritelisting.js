import React from "react";

function FavouriteListing(props) {

  const listing = props.listing; 

  // Remember to delete the question marks after finishing
  return (
    <div>
      <div>
        Title: {listing?.title}
      </div>
      <div>
        Monthly Price: {listing?.monthly_price}
      </div>
      <div>
        Location: {listing?.address.city}, {listing?.address.country}
      </div>
    </div>
  );
}
export default FavouriteListing;