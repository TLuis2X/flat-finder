

export default class FavListingService {
    url = "http://127.0.0.1:3001";

    async getFavListing(user_id) {
        const response = await fetch(`${this.url}/favlisting?user_id=${user_id}`)

        if (response.ok) {
            const listings = await response.json()
            return listings
        }
        return response
    }

    async addFavListing(user_id, listing_id) {
        const response = await fetch(`${this.url}/favlisting`, {
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

    async removeFavListing() {
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