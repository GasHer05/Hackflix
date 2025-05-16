import { useState, useEffect } from "react";
import Movie from "./components/Movie";
import movies from "./data/movies.js";
import "./App.css";

function App() {
  return (
    <>
      <section className="imagSection">
        <header>
          <ul>
            <li>
              <a href="#" className="Hackflix">
                Hackflix
              </a>
            </li>
            <li>
              <a href="#" className="Home">
                Home
              </a>
            </li>
          </ul>
        </header>

        <div className="hero-text">
          <h1>¡Tus peliculas favoritas!</h1>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
        </div>
      </section>

      <main>
        <div className="rating">RATING!!</div>
        <section className="movies-grid">
          {movies.map((movie) => (
            <Movie
              id={movie.id}
              key={movie.id}
              nombre={movie.title}
              imagen={movie.poster_path}
            />
          ))}
        </section>
      </main>
      <footer>Hack Academy, 2025</footer>
    </>
  );
}

export default App;
