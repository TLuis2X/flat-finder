import React from "react";
import styles from "@/styles/favouritelisting.module.css";
import { Card, CardBody, Image, Stack, Heading, Text, Button, CardFooter, ChakraBaseProvider, ChakraProvider } from '@chakra-ui/react'
import { HeartFilled } from "@ant-design/icons";
//import { Carousel } from 'antd';

function FavouriteListing(props) {

  const listing = props.listing; 

  // Remember to delete the question marks after finishing
  return (
    
    /*
    <div className="styles.outerContainer">
      <div>
        Title: {listing?.title}
      </div>
      <img src={listing?.images[0]} style={{width: 200}}/>
      <div>
        Monthly Price: {listing?.monthly_price}
      </div>
      <div>
        Location: {listing?.address.city}, {listing?.address.country}
      </div>
    </div> */

    <ChakraProvider>
      <Card maxW='sm'>

        <CardBody>
          <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
          
          <Stack mt='6' spacing='3'>
            <Heading size='md'>Double Room for rent</Heading>
            <Heading size='sm'>London, England</Heading>
            <Text color='blue.600' fontSize='2xl'>
              £450pcm
            </Text>
          </Stack>
          
          <Button colorScheme='red'>
            <HeartFilled />
          </Button>
        </CardBody>

      </Card>
    </ChakraProvider>
  );
}
/*
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const FavouriteListings = (props) => {




  return (
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
}
*/

export default FavouriteListing;