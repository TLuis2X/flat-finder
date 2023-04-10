import React from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapInfoCard from "./MarkerInfoCard";


const containerStyle = {
  width: "100%",
  height: "600px",
};

//Pass in the coordinates array so that the marker(s) are displayed
const Map = ({ listings }) => {
  const coordinates = listings.map((listing) => listing.coordinates);
  const favListings = useSelector((state) => state.favListings);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [markerIndex, setMarkerIndex] = useState(0);
  const zoom = coordinates.length > 1 ? 2 : 15;

  function toggleMarker(index) {
    if (index === markerIndex){
      setInfoWindowVisible(!infoWindowVisible);
    }
    setMarkerIndex(index);
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates[0]}
        zoom={zoom}
      >
        {listings.map((listing, index) => (
          <MarkerF
            position={listing.coordinates}
            onClick={() => toggleMarker(index)}
          >
            {infoWindowVisible && markerIndex === index && (
              <InfoWindowF onCloseClick={() => setInfoWindowVisible(false)}>
                <div style={{ maxHeight: "300px" }}>
                <MapInfoCard listing={listing}/>
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
    </>
  );
};

export default Map;
