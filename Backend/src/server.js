const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

//api endpoint to fetch pokemons
app.get("/api/pokemons", async (req, res) => {
  try {
    // Fetch the data from the API
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
    // Fetch the details of each pokemon
    const pokemonData = await Promise.all(
        // Map through the results and fetch the details of each pokemon
      response.data.results.map(async (pokemon) => {
        const pokemonDetail = await axios.get(pokemon.url);
        // Return the data
        return pokemonDetail.data;
      })
    );
    // Send the data as a response
    res.json(pokemonData);
  } catch (error) {
    // Send an error message if something goes wrong
    res.status(500).send("Error fetching data");
  }
});

//api endpoint to fetch a single pokemon and its details
app.get("/api/pokemons/:id", async (req, res) => {
    // Get the id from the request parameters
    const { id } = req.params;
    // Fetch the data from the API
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // Send the data as a response
      res.json(response.data);
    } catch (error) {
        // Send an error message if something goes wrong
      res.status(500).send("Error fetching Pokémon details");
    }
});  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
