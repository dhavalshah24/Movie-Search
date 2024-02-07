import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./styles.css";

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('harry');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=263e31d1ad0c4defa8822787e614e716&language=en-US&query=${searchTerm}&page=1&include_adult=true`
        );
        resp = await resp.json();
        setMovies(resp.results)
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, [searchTerm]);

  const debouncedSearch = debounce((searchTerm) => {
    setSearchTerm(searchTerm);
  }, 100);

  const handleInputChange = (event) => {
    debouncedSearch(event.target.value);
  };

  return (
    <div className="search-movies">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="movie-grid">
        {movies?.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
}
