import { Client } from "@googlemaps/google-maps-services-js";


class GoogleMapsService {
  
  GOOGLE_MAPS_API_KEY = "AIzaSyDEtseFas3rk0KlBO_aq57i5UBkPKC7nVA";
  client = new Client();

  async getCoordinates(address){
    try {
      const response = await this.client.geocode({
        params: { address, key: this.GOOGLE_MAPS_API_KEY },
      });
      console.log("Response from google: ", response)
      const { lat, lng } = response.data.results[0].geometry.location;
      console.log({lat, lng})
      return { lat, lng }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  }

}   

export default GoogleMapsService