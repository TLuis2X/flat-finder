
import Map from './Map'

function GlobalView({listings}) {



  return (
    <div style={{padding: '2rem', height: "100%", width: '100%'}}>
      <h3>Browse Listings on a Map</h3>
      <Map coordinates={listings.map(listing => listing.coordinates
        )}/>
    </div>
  )




}


export default GlobalView