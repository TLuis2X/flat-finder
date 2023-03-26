export default class Listing {
  id;
  title;
  images;
  monthly_price;
  deposit;
  address;
  description;
  owner;
  created_at;
  contract_length;
  coordinates;
  key_features;

  constructor(listing) {
    this.id = listing.id;
    this.title = listing.title;
    this.images = listing.images;
    this.monthly_price = listing.monthly_price;
    this.deposit = listing.deposit;
    this.address = listing.address;
    this.description = listing.description;
    this.created_at = listing.created_at;
    this.owner = listing.owner;
    this.coordinates = listing.coordinates;
    this.contract_length = listing.contract_length;
    this.key_features = listing.key_features;
  }
}

const address = {
  first_line: "",
  second_line: "",
  postcode: "",
  city: "",
  country: "",
};

const coordinates = {
  latitude: "",
  longitude: "",
};

// const key_features = {
//   bathrooms: 2,
//   beds: 3,
//   monthly_bills: 300, //if 0, then bills included
//   pets_allowed: false,
//   closest_station: "mile end station",
//   smoking_allowed: false,
//   gym_nearby: true,
// };


const key_features = {
  bathrooms: 0,
  beds: 0,
  monthly_bills: 0, //if 0, then bills included
  pets_allowed: false,
  smoking_allowed: false,
  station_nearby: false,
  gym_nearby: true,
};


