import React from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useState } from 'react'

const containerStyle = {
  width: "100%",
  height: "400px",
};

//Pass in the coordinates so that the marker is displayed
const Map = ({ coordinates }) => {

  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={15}
        >
        {coordinates.lat && coordinates.lng && (
          <MarkerF position={coordinates} onClick={() => setInfoWindowVisible(!infoWindowVisible)}>
            {infoWindowVisible && (
            <InfoWindowF onCloseClick={() => setInfoWindowVisible(false)}>
              <div>
                <h4>Flatify rocksssss</h4>
                <p>project of the year</p>
              </div>
            </InfoWindowF>
            )}
          </MarkerF>
          )}       
      </GoogleMap>
    </>
  );
};

export default Map;
