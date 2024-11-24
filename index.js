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
app.get('/flights', (req,res) => {
    amadeus.shopping.flightOffersSearch.get({
            originLocationCode: "CMB",
            destinationLocationCode: "MAA",
            departureDate: "2024-11-27",
            adults: "1",
        })
        .then (response => {
            if (response.data && response.data.length >0) {
                return amadeus.shopping.flightOffers.pricing.post({
                    'data': {
                        'type': "flight-offers-pricing",
                        'flightOffers': [flightOffersResponse.data[0]],
                    }
                })
            } else {
                throw new Error('No flights offer found')
            }
        })
        .then (pricingResponse => {
            res.json(pricingResponse.data)
        })
        .catch (error => {
            console.error ('Error showing flight pricing', error.message)
        })
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server on  ${port}`)
})
