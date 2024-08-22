import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ data }) => {

  // Destructuring the data object
  const { id, name, sprites, types, abilities, stats } = data;
  const navigate = useNavigate();

  // Extracting relevant details
  const frontImage = sprites?.front_default;
  const typeName = types[0]?.type?.name;
  const abilityNames = abilities.map((ability) => ability.ability.name);
  const baseStats = stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    <div 
      className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white bg-opacity-90 backdrop-blur-lg p-6 cursor-pointer border border-gray-200 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
      onClick={() => navigate(`/pokemon/${id}`)}
    >
      <img
        className="w-full h-48 object-cover rounded-t-lg animate-bounce"
        src={frontImage}
        alt={name}
      />
      <div className="px-6 py-4">
        <h2 className="font-bold text-2xl mb-2 text-center capitalize text-blue-600 animate-slideIn">
          {name}
        </h2>
        <p className="text-gray-800 text-base text-center capitalize">
          <span className="font-semibold text-blue-500">Type:</span> {typeName}
        </p>
      </div>
      <div className="px-6 py-4">
        <h3 className="font-semibold text-lg text-blue-600">Abilities:</h3>
        <ul className="list-disc list-inside text-gray-800">
          {abilityNames.map((ability, index) => (
            <li key={index} className="capitalize">{ability}</li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4">
        <h3 className="font-semibold text-lg text-blue-600">Stats:</h3>
        <ul className="list-disc list-inside text-gray-800">
          {baseStats.map((stat, index) => (
            <li key={index} className="capitalize">
              <span className="font-semibold text-blue-500">{stat.name}:</span> {stat.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
