import React from "react";
import "./styles.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt="movieimage"
        className="movie-poster"
      />
      <h3>{movie.original_title}</h3>
      <p>Release Date - {movie.release_date}</p>
    </div>
  );
};

export default MovieCard;
