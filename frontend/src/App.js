import { useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [flights, setFlights ] = useState ([])

  //frontend logic
useEffect(() => {
  axios.get('http://localhost:5000/flights')
  .then(response => {
    setFlights(response.data)
  })
  .catch (error => {
    console.error("Error", error)
  })
}, [])

  return (
    <div className="App">
      {flights.map((flight, index) => (
        <div key={index} className='flight-card'>
            <h3> Flights with price</h3>
            <p>
              <b>Price : </b> {flight.price.currency} {flight.price.total}
            </p>

            <p>
              <b>Seats : </b> {flight.numberOfBookableSeats}
            </p>

            <p>
              <b>Flight ID: </b> {flight.id}
            </p>

            <p>
              <b>Airline : </b> {flight.validatingAirlineCodes}
            </p>
        </div>
      ))}
    </div>
  );
}

export default App;
