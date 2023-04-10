
//This is a service class for tables: conversation, message
export default class MessageService {

    url = "https://flat-finder-server.onrender.com";

    async addMessage(sender_id, content, recipient_id){
        const data = await fetch(`${this.url}/conversation/${sender_id}/${recipient_id}`)
        const conversation = await data.json()
        console.log({conversation})
        const response = await fetch(`${this.url}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ conversation_id: conversation.id, content, sender_id })
        })

        
        if(response.ok){
            const result = await response.json()
            return {message: result.data[0], conversation: conversation}
        }

        return response
    }

    async sendDirectMessage(sender_id, content, conversation_id){
        const response = await fetch(`${this.url}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ conversation_id, content, sender_id })
        })

        
        if(response.ok){
            const result = await response.json()
            return result
        }

        return response
    }

    async getConversationById(conversation_id){
        try{
            const data = await fetch(`${this.url}/conversation?conversation_id=${conversation_id}`) 
            const conversation = await data.json()
            return conversation
        } catch (error){
            console.log("Error getting conversation 🔴🔴: ", error)
        }
    }


    async getUserConversations(user_id){
        try{
            const data = await fetch(`${this.url}/conversations?user_id=${user_id}`) 
            const conversations = await data.json()
            return conversations
        } catch (error){
            console.log("Error getting conversations 🔴🔴: ", error)
        }
    }


    async getConversationMessages(conversation_id) {
        const response = await fetch(`${this.url}/message?conversation_id=${conversation_id}`)
        console.log("Messages response: ", response)
        if(response.ok){
            const message = await response.json()
            console.log("Actual messages: ", message)
            return message
        }

        return response
    }



  async readUserMessages(sender_id, conversation_id) {
    const response = await fetch(`${this.url}/messages`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender_id,
        conversation_id,
      }),
    });

    // console.log("✨✨✨✨✨Here is the RESPONSE: ", response);
    if (response.ok) {
      const result = await response.json();
      console.log("✨✨✨✨✨Here is the RESULT OF READING: ", result);
      return result;
    }
    return response;
  }

}