import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PokemonDetails = () => {
    // state to store the fetched data
  const { id } = useParams(); // Get the Pokémon ID from the URL
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the data from the API
    const fetchPokemon = async () => {
      const res = await axios.get(`http://localhost:3000/api/pokemons/${id}`);
      setPokemon(res.data);
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
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

  const { name, sprites, types, abilities, stats, height, weight } = pokemon;
  const frontImage = sprites?.front_default;
  const typeName = types.map((type) => type.type.name).join(", ");
  const abilityNames = abilities.map((ability) => ability.ability.name);
  const baseStats = stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    <div className="container mx-auto p-4 h-[86vh]">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Back
      </button>
      <div className="max-w-lg mx-auto rounded overflow-hidden shadow-lg bg-white p-4">
        <img
          className="w-full h-48 object-cover"
          src={frontImage}
          alt={name}
        />
        <div className="px-6 py-4">
          <h2 className="font-bold text-2xl mb-2 text-center capitalize">
            {name}
          </h2>
          <p className="text-gray-700 text-base text-center capitalize">
            Type: {typeName}
          </p>
          <p className="text-gray-700 text-base text-center capitalize">
            Height: {height / 10} m
          </p>
          <p className="text-gray-700 text-base text-center capitalize">
            Weight: {weight / 10} kg
          </p>
        </div>
        <div className="px-6 py-4">
          <h3 className="font-semibold text-lg">Abilities:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {abilityNames.map((ability, index) => (
              <li key={index} className="capitalize">{ability}</li>
            ))}
          </ul>
        </div>
        <div className="px-6 py-4">
          <h3 className="font-semibold text-lg">Stats:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {baseStats.map((stat, index) => (
              <li key={index} className="capitalize">
                {stat.name}: {stat.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;