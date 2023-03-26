// import { Card } from "antd";
import Listing from "@/models/Listing";
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
const SearchResultPage = (props) => {
  const listings = props.listings;
  const displayListings = listings.map((listing) => listing);

  return (
    <ChakraProvider>
      {displayListings.slice(0, 3).map((listing) => (
        <Card
          key={listing.id}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", md: "150px" }}
            src={listing.images[0]}
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="lg">{listing.title}</Heading>
              <Heading as="h5" size="xs" style={{ textAlign: "right" }}>
                {listing.description}
              </Heading>
              <Text py="1">Bathroom and bedrooms</Text>
              {/* <Text py="1">Availability</Text>
                <Text py="1">Type of stay</Text> */}
            </CardBody>

            <CardFooter>
              <Button
                variant="solid"
                //   colorScheme="blue"
                style={{ color: "white", backgroundColor: "#1677ff" }}
              >
                More info
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </ChakraProvider>
  );
};

export default SearchResultPage;
