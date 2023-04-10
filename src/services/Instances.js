import FavListingService from "./FavListingService";
import MessageService from "./messageService";
import UserService from "./UserService";
import TicketService from "./TicketService";

const favListingSevice = new FavListingService();
const userService = new UserService();
const messageService = new MessageService();
const ticketService = new TicketService();

export { favListingSevice, userService, messageService, ticketService};
