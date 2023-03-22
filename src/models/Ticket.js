class Ticket {
    id;
    create_at;
    content;
    title;
    creator;
    status;

    constructor(ticket) {
        this.id = ticket.id
        this.create_at = ticket.create_at
        this.content = ticket.content
        this.title = ticket.ticket
        this.creator = ticket.creator
        this.status = ticket.status
    }
}

export {
    Ticket
}