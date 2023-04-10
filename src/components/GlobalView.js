
import { useSelector } from 'react-redux'
import Map from './Map'
import ListingInfo from './ListingInfo';

function GlobalView({listings}) {


  const selectedListing = useSelector(state => state.selectedListing);
  const user = useSelector(state => state.user)

  return (
    <div style={{padding: '2rem', height: "100%", width: '100%'}}>
      {
        Object.keys(selectedListing).length ? 
        <ListingInfo userId={user.id}/> : 
        <div>
          <h3>Browse Listings on a Map</h3>
          <Map listings={listings}/>
        </div>
      }
    </div>
  )




}


export default GlobalView