import { Ticket } from "@/models/Ticket";

export default class TicketService{

    url = 'https://flat-finder-server.onrender.com'
    // url = "http://127.0.0.1:3001"
    constructor() {}

    async addTicket(title, content, user_id){
        const response = await fetch(`${this.url}/ticket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, 
                content,
                creator: user_id
            })
        })
        const result = await response.json()
        console.log("Response from ticket service: ", result)
        return new Ticket(result.data[0])
        
    }

    async removeTicket(ticketID){
        const response = await fetch(`${this.url}/ticket`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ticketID
            })
        })
        if (response.ok){
            const result = await response.json()
            return result
        }

        return response
    }

    async getUserTicket(user_id){
        const response = await fetch(`${this.url}/ticket?user_id=${user_id}`)

        if(response.ok){
            const ticket = await response.json()
            return ticket.data
        }

        return response
    }

    async changeStatus(ticketID, newStatus){
        const response = await fetch(`${this.url}/ticket`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ticketID,
                newStatus
            })
        })

        if (response.ok){
            const result = await response.json()
            return result
        }
        return response
    }



}