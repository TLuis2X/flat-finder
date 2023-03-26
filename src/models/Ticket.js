class Ticket {
  id;
  created_at;
  content;
  title;
  creator;
  status;

  constructor(ticket) {
    this.id = ticket.id;
    this.created_at = ticket.created_at;
    this.content = ticket.content;
    this.title = ticket.title;
    this.creator = ticket.creator;
    this.status = ticket.status;
  }
}

export { Ticket };
