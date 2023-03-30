import Listing from "@/models/Listing";

export default class ListingService {
  url = "https://flat-finder-server.onrender.com";

  constructor() {}

  /**
   * @returns {Promise<Listing[]>} an array of Listing objects
   */
  async getListings() {
    const response = await fetch(`${this.url}/listings`)
    
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

  //added user_id parameter
  async getOwnListing(user_id){
    //added user_id as url parameter because its a get request
    const response = await fetch(`${this.url}/listing?user_id=${user_id}`)

    if(response.ok){
      const listing = await response.json()
      return listing.data
    }

    return response
  }
}
