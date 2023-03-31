import React from "react";
import { Input } from "antd";
import { useState } from "react";
import TicketService from "@/services/TicketService";

const AdminTicketResolver = (props) => {
  // const listings = props.listings.map((listing) => listing);
  console.log(props.tickets);
  const ticketService = new TicketService();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const ticketsAvailable = props.tickets.map((ticket) => ticket);

  console.log(ticketsAvailable);
  function onSearch(ticketId) {
    console.log("Searching for ticket with id:", ticketId);
    console.log("Available tickets:", ticketsAvailable);

    const selected = ticketsAvailable.find(
      (ticket) => parseInt(ticket.id) === parseInt(ticketId)
    );
    if (selected) {
      setSelectedTicket(selected);
    } else {
      setSelectedTicket(null);
    }
  }

  function deleteTicket() {
    if (selectedTicket.id) {
      ticketService.removeTicket(selectedTicket.id);
      console.log("inside if statement");
    } else {
      console.log("Error. Ticket could not be deleted.");
    }
  }

  const { Search } = Input;

  return (
    <>
      <Search
        placeholder="Enter ticket id..."
        onSearch={onSearch}
        enterButton
      />
      {selectedTicket && <h1>Ticket id: {selectedTicket.id}</h1>}
    </>
  );
};
export default AdminTicketResolver;

// {selectedListing && (
//     <div>
//       <Card
//         className="card hover-bg hover-up"
//         key={selectedListing.id}
//         direction={{ base: "column", sm: "row" }}
//         overflow="hidden"
//         variant="outline"
//         style={{ marginTop: "20px", width: "100%" }}
//       >
//         <Image
//           objectFit="cover"
//           // maxW={{ base: "100%", lg: "150px" }}
//           style={{ width: "300px" }}
//           src={selectedListing.images[2]}
//           alt="Caffe Latte"
//         />

//         <Stack style={{ width: "100%" }}>
//           <CardBody style={{ paddingBottom: 0 }}>
//             <div>
//               <p>
//                 <Heading size="lg">{selectedListing.title}</Heading>
//                 <Heading size="md">
//                   £{selectedListing.monthly_price}
//                 </Heading>
//               </p>
//             </div>
//             <div>
//               <p>
//                 <FontAwesomeIcon icon={faMapMarkerAlt} /> &nbsp;
//                 {selectedListing.address.second_line},{" "}
//                 {selectedListing.address.city}
//               </p>
//             </div>
//             {/* <br /> */}
//             <div>
//               <p>
//                 {selectedListing.key_features.beds}
//                 &nbsp;
//                 <FontAwesomeIcon icon={faBed} />
//                 &nbsp; &nbsp;
//                 {selectedListing.key_features.bathrooms}
//                 &nbsp;
//                 <FontAwesomeIcon icon={faBath} />
//               </p>
//             </div>
//             {/* <br /> */}
//             <p>Available now (L/S)</p>
//           </CardBody>
//           <Button
//             onClick={() => {
//               deleteListing();
//             }}
//           >
//             <FontAwesomeIcon icon={faTrashCan} />
//           </Button>
//           <CardFooter
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           ></CardFooter>
//         </Stack>
//       </Card>
//     </div>
//   )}
