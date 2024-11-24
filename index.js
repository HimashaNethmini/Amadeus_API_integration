import Amadeus from 'amadeus'
import express from 'express'
import dotenv from 'dotenv';
const app = express();

dotenv.config();

const amadeus = new Amadeus ({
    clientId: process.env.Amadeus_ClientId,
    clientSecret: process.env.Amadeus_ClientSecret
})

//flight search with price
const FlightSearch = async () => {
    try {
        const flightOffersResponse = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: "CMB",
            destinationLocationCode: "MAA",
            departureDate: "2024-11-27",
            adults: "1",
        })
        console.log("Flight Offers Response:", flightOffersResponse.data);

        const response = await amadeus.shopping.flightOffers.pricing.post(
            {
                data: {
                    type: "flight-offers-pricing",
                    flightOffers: [flightOffersResponse.data[0]],
                }
            },
        )
        console.log(response)
    } catch (error){
        console.log(error)
    }
}

FlightSearch ()
