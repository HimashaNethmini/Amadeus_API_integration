import Amadeus from "amadeus";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

const amadeus = new Amadeus({
  clientId: process.env.Amadeus_ClientId,
  clientSecret: process.env.Amadeus_ClientSecret,
});

app.use(cors());

//flight search with price
app.get("/flights", (req, res) => {
  amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: "SYD",
      destinationLocationCode: "BKK",
      departureDate: "2025-01-01",
      adults: "1",
    })
    .then((response) => {
      if (response.data && response.data.length > 0) {
        return amadeus.shopping.flightOffers.pricing.post({
          data: {
            type: "flight-offers-pricing",
            flightOffers: [response.data[0]],
          },
        });
      } else {
        throw new Error("No flight offers found");
      }
    })
    .then((pricingResponse) => {
      res.json({ data: pricingResponse.data });
    })
    .catch((error) => {
      console.error("Error fetching flight pricing:", error.message);
      res.status(500).json({ error: error.message });
    });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server on  ${port}`);
});
