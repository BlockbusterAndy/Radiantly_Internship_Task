import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const PokemonList = () => {
    // State to store the fetched data
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch the data from the API
    const fetchPokemons = async () => {
      const res = await axios.get("http://localhost:3000/api/pokemons");
      setPokemons(res.data);
    };

    fetchPokemons();
  }, []);

  // If the data is still being fetched render loader
  if (!pokemons.length) {
    return(
        <div className="w-full h-[100vh] flex flex-row justify-center items-center gap-4">
            <div>
                <h1 className="text-4xl text-slate-200 text-center font-bold">Loading</h1>
            </div>
            
            <div class="flex flex-row gap-2">
                <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
        </div>
    );
  }

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
        {/* Search bar */}
        <h1 className="text-center my-4 text-2xl text-slate-200">Search a Pokemon</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
        {/* Grid of Pokémon cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredPokemons.map((pokemon) => (
          <Card key={pokemon.id} data={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
