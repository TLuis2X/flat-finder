import { Ticket } from "@/models/Ticket";

export default class TicketService{

    url = 'http://127.0.0.1:3001'

    constructor() {}

    async addTicket(title, content){
        const response = await fetch(`${this.url}/ticket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, 
                content
            })
        })
        if (response.ok) {
            const result = await response.json()
            return result
          }
          return response
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

    async getUserTicket(){
        const response = await fetch(`${this.url}/ticket`)

        if(response.ok){
            const ticket = await response.json()
            return ticket
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