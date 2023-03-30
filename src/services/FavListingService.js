export default class FavListingService {
  
  url = "https://flat-finder-server.onrender.com";

    async getFavListing(user_id) {
        const response = await fetch(`${this.url}/favlisting?user_id=${user_id}`)

        if (response.ok) {
            const listings = await response.json()
            return listings.data
        }
        return response
    }

    async addFavListing(user_id, listing_id) {
      const response = await fetch(`${this.url}/favlisting`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id,
            listing_id
        })
      })

      if (response.ok) {
        const result = await response.json()
        return result
      }
      return response
    }

    async removeFavListing(user_id, listing_id) {
        const response = await fetch(`${this.url}/favlisting`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id,
                listing_id
            })
          })

          if (response.ok) {
            const result = await response.json()
            return result
          }
          return response
    }

}