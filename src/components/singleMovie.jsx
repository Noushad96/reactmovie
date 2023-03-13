import React from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { API_URL } from "./context";
import { useState, useEffect } from "react";

const SingleMovie = () => {
  const { id } = useParams();

  // get the id
  // console.log(id);

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");

  const getMoviesApi = async (url) => {
    // data nhi mila to loading krte rahega
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      // console me print krega sab
      // console.log("data from context =>", data);
      // console.log("data type of context =>", typeof data);

      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
      }
    } catch (error) {
      console.log("my error==", error);
    }
  };

  // Debouncing concept used here
  useEffect(() => {
    var timerOut = setTimeout(() => {
      getMoviesApi(`${API_URL}&i=${id}`);
    }, 400);

    return () => clearTimeout(timerOut);
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading....</div>;
  }

  return (
    <>
      <section className="movie-section">
        <div className="movie-card">
          <figure>
            <img src={movie.Poster} alt="" />
          </figure>
          <div className="card-content">
            <p className="title">{movie.Title}</p>
            <p className=""></p>
            <p className="card-text">{movie.Released}</p>
            <p className="card-text">{movie.Genre}</p>
            <p className="card-text">{movie.imdbRating} / 10</p>
            <p className="card-text">{movie.Country}</p>
            <NavLink to="/" className="back-btn">
              Go Back
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleMovie;
