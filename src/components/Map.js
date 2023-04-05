import React from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useState } from 'react'

const containerStyle = {
  width: "100%",
  height: "400px",
};

//Pass in the coordinates array so that the marker(s) are displayed
const Map = ({ coordinates }) => {

  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [markerIndex, setMarkerIndex] = useState(0)
  const zoom = coordinates.length > 1 ? 2 : 15

  function toggleMarker(index) {
    setMarkerIndex(index)
    setInfoWindowVisible(!infoWindowVisible)
  }
    
  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates[0]}
        zoom={zoom}
        >
        {coordinates.map((coordinate, index) => 
         <MarkerF position={coordinate} onClick={() => toggleMarker(index)}>
          {infoWindowVisible && markerIndex === index && (
          <InfoWindowF onCloseClick={() => setInfoWindowVisible(false)}>
            <div>
              <h4>Flatify rocksssss</h4>
              <p>project of the year</p>
            </div>
          </InfoWindowF>
          )}
       </MarkerF>)}
      </GoogleMap>
    </>
  );
};

export default Map;
