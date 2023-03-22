import Listing from "@/models/Listing";

export default class ListingService {
  url = "http://127.0.0.1:3001";

  constructor() {}

  /**
   * @returns {Promise<Listing[]>} an array of Listing objects
   */
  async getListings() {
    const response = await fetch(`${this.url}/listing`)
    
    if (response.ok){
      const listings = await response.json()
      return listings
    }
    return response
  }

  /**
   * @param {Listing} listing - a listing object!
   * @returns {Promise}
   */
  async addListing(listing) {
    const response = await fetch(`${this.url}/listing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listing)
    })

    if (response.ok) {
      const result = await response.json()
      return result
    }
    return response
  }
}
