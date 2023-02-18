import './App.css';
import {useEffect, useState} from "react";
import {getEstimatedPrice, getLocations} from "./api/ApiCalls";

function App() {
  const [locations, setLocations] = useState([])
  const [data, setData] = useState({})
  const [price, setPrice] = useState(0)
  useEffect(()=>{
    getLocations().then(res=>{
      setLocations(res.data.locations)
      setData({...data, location: res.data.locations[0]})
    }).catch(console.error)
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    getEstimatedPrice(data).then(res=>{
      setPrice(res.data.estimated_price)
    }).catch(console.error)
  }
  return (
    <div className="App">
      <div className={"container"}>
        <div className={"row justify-content-center"}>
          <div className={"col-md-6 col-lg-4"}>
            <div className={"login-wrap p-0"}>
              <h3 className={"mb-4 text-center"}>
                Bangalore House Price
              </h3>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Locations</label>
                  <select className={"form-control"} onChange={(e)=>{setData({...data, location: e.target.value})}} required={true}>
                    {locations.map(location=>{
                      return <option key={location} value={location}>{location}</option>
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>Total Square Feet</label>
                  <input type={"text"} className={"form-control"} placeholder={"Total Sq-ft"} onChange={(e)=>setData({...data, sqft: e.target.value})} required={true}/>
                </div>
                <div className="form-group">
                  <label>BHK</label>
                  <input type="text" className="form-control" placeholder="BHK" onChange={(e)=>setData({...data, bhk: e.target.value})} required={true} />
                </div>
                <div className="form-group">
                  <label>Bathrooms</label>
                  <input type="text" className="form-control" placeholder="Bath" onChange={(e)=>setData({...data, bath: e.target.value})} required={true} />
                </div>
                <div className={"form-group"}>
                  <button className={"form-control btn btn-primary my-3"}>Get Price</button>
                </div>
                </form>
               <label>Your Estimated Price is {price} Lakhs</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
