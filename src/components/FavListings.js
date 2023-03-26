// import { Card } from "antd";
import React from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
const contentStyle = {
  height: "160px",
  //   width: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
  maxWidth: "max-content",
};

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
} from "@chakra-ui/react";
const FavListings = (props) => {
  const listings = props.listings;
  const FavouriteListings = listings.map((listing) => listing);
  const [dotPosition, setDotPosition] = useState("left");
  const [indexC1, setIndexC1] = useState(0);
  const [indexC2, setIndexC2] = useState(0);
  const [indexC3, setIndexC3] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndexC1(selectedIndex);
  };
  return (
    <div style={{ display: "flex", marginLeft: "15px", textAlign: "center" }}>
      {FavouriteListings.slice(0, 3).map((listing) => (
        <Carousel
          style={{
            width: "350px",
            padding: "5px",
            overflow: "scroll",
            whiteSpace: "nowrap",
          }}
        >
          <Carousel.Item activeIndex={indexC1} onSelect={handleSelect}>
            <img
              className="d-block w-150"
              src={listing.images[0]}
              alt="First slide"
              style={{ width: "500px", height: "200px" }}
            />
            <Carousel.Caption>
              <p>{listing.title}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item activeIndex={indexC2} onSelect={handleSelect}>
            <img
              className="d-block w-100"
              src={listing.images[1]}
              alt="Second slide"
              style={{ width: "500px", height: "200px" }}
            />

            <Carousel.Caption>
              <p>£{listing.monthly_price}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item activeIndex={indexC3} onSelect={handleSelect}>
            <img
              className="d-block w-100"
              src={listing.images[2]}
              alt="Third slide"
              style={{ width: "500px", height: "200px" }}
            />

            <Carousel.Caption>
              <p>{listing.address.postcode}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      ))}
    </div>
  );
};

export default FavListings;

// import React, { useState } from 'react';
// import Carousel from 'react-bootstrap/Carousel';

// function ControlledCarousel() {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=First slide&bg=373940"
//           alt="First slide"
//         />
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=Second slide&bg=282c34"
//           alt="Second slide"
//         />

//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=Third slide&bg=20232a"
//           alt="Third slide"
//         />

//         <Carousel.Caption>
//           <h3>Third slide label</h3>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }
