import React, { useState, useEffect } from "react";
import axios from 'axios'

const App = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [airport, setAirport] = useState("");

  useEffect(() => {
    if (airport) {
      const fetchFlights = async () => {
        try {
          const token = 'vtD7VpseGrNLNwjqd5RRVqJgGVYy';  // Use your actual token here

          const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              originLocationCode: "SYD",  // Replace with dynamic origin if necessary
              destinationLocationCode: "MEL",  // Replace with dynamic destination if necessary
              departureDate: "2024-11-28",
              adults: 1,
            },
          });

          setFlights(response.data.data);  // Assuming the response structure matches
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch flight data");
          setLoading(false);
        }
      };

      fetchFlights();
    }
  }, [airport]);  // Fetch flights whenever the 'airport' state changes

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  //code to access from backend
  // useEffect(() => {
  //   // Fetch flight data from your backend (which calls the Amadeus API)
  //   axios.get("http://localhost:5000/flights")
  //     .then((response) => {
  //       setFlights(response.data.data); // Assuming the response structure matches
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError("Failed to fetch flight data");
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div>
      <h1>Flight Offers</h1>
      {flights.length > 0 ? (
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>
              <h2>{flight.itineraries[0].segments[0].flightNumber}</h2>
              <p>
                {flight.itineraries[0].segments[0].departure.departureDate} -{" "}
                {flight.itineraries[0].segments[0].arrival.arrivalDate}
              </p>
              <p>Price: {flight.price.total} {flight.price.currency}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No flight offers found.</p>
      )}
    </div>
  );
};

export default App;
