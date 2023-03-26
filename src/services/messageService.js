export default class MessageService {

    url = "https://flat-finder-server.onrender.com";

    async addMessage(message) {
        const response = await fetch(`${this.url}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message)
        })

        
        if(response.ok){
            const result = await response.JSON()
            return result
        }

        return response
    }

    async getMessage() {
        const response = await fetch(`${this.url}/message`)

        if(response.ok){
            const message = await response.json()
            return message
        }

        return response
    }

}