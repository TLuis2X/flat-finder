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
  const [markerIndex, setMarkerIndex] = useState(0)
  const zoom = coordinates.length > 1 ? 5 : 15

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
        {coordinates.length > 1 ? coordinates.map((coordinate, index) => 
         <MarkerF position={coordinate} onClick={() => toggleMarker(index)}>
         {infoWindowVisible && markerIndex === index && (
         <InfoWindowF onCloseClick={() => setInfoWindowVisible(false)}>
           <div>
             <h4>Flatify rocksssss</h4>
             <p>project of the year</p>
           </div>
         </InfoWindowF>
         )}

       </MarkerF>) :  
       (<MarkerF position={coordinates[0]} onClick={() => toggleMarker(0)}>
            {infoWindowVisible && (
            <InfoWindowF onCloseClick={() => setInfoWindowVisible(false)}>
              <div>
                <h4>Flatify rocksssss</h4>
                <p>project of the year</p>
              </div>
            </InfoWindowF>
            )}
         </MarkerF>)
        }

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

       </MarkerF>)
        }

        {/* {coordinates[0].lat && coordinates[0].lng && (
          <MarkerF position={coordinates[0]} onClick={() => setInfoWindowVisible(!infoWindowVisible)}>
            {infoWindowVisible && (
            <InfoWindowF onCloseClick={() => setInfoWindowVisible(false)}>
              <div>
                <h4>Flatify rocksssss</h4>
                <p>project of the year</p>
              </div>
            </InfoWindowF>
            )}
          </MarkerF>
          )}        */}
      </GoogleMap>
    </>
  );
};

export default Map;
