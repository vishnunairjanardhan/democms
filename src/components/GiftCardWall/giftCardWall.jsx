import React, { useState } from 'react';
import { giftCards, countries } from '../../config/giftCardConfig';

const GiftCardWall = () => {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const allGenres = [...new Set(giftCards.map(card => card.genre))];

  const filteredCards = giftCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre ? card.genre === selectedGenre : true;
    const matchesCountry = selectedCountry
      ? card.countries.includes(selectedCountry)
      : true;
    return matchesSearch && matchesGenre && matchesCountry;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">    
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
        {/* Search by brand */}
        <input
          type="text"
          placeholder="Search by brand..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/3 mb-2 md:mb-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
        />

        {/* Genre Filter */}
        <select
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">All Genres</option>
          {allGenres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        {/* Country Filter */}
        <select
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">All Countries</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Gift card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map(card => (
          <a
            key={card.name}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center text-lg font-semibold text-gray-800">
              {card.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GiftCardWall;
