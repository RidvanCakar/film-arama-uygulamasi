import React, { useState } from 'react';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    const apiKey = '9bf3b951'; // Buraya API anahtarınızı ekleyin
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
        setError('');
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Bir hata oluştu.');
      setMovies([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (


    <div>
      <h1>Film Arama Uygulaması</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Film adı girin..."
          required
        />
        <button type="submit">Ara</button>
      </form>
      {error && <p>{error}</p>}
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              {movie.Title} ({movie.Year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSearch;
