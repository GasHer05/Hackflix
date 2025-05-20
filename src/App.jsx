import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import Movie from "./components/Movie";
//import movies from "./data/movies.js";
import "./App.css";

function App() {
  // creo un estado para guardar la cantidad de estrellas seleccionadas
  const [rating, setRating] = useState(0);
  const [peliculas, setPeliculas] = useState([]);

  // creo una funcion que guarde el valor seleccionado
  // El parámetro rate viene del componente <Rating /> e indica cuántas estrellas seleccione (1-5).
  const usoRating = (rate) => {
    setRating(rate);
  };

  // Filtro las peliculas segun el valor
  const filtroPeliculas =
    rating > 0
      ? peliculas.filter((pelicula) => pelicula.vote_average >= rating * 2) //cada estrella representa 2 puntos del rating
      : peliculas;

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=3ec9419c15f48f156f567f311613a140&language=es-ES"
      )
      .then((respuesta) => {
        setPeliculas(respuesta.data.results);
      })
      .catch((error) => {
        console.log("Error al obtener películas:", error);
      });
  }, []);

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
        <div className="rating">
          <h3>Filtrar por rating:</h3>

          {/*Uso el componente rating */}
          <Rating
            onClick={usoRating}
            initialValue={rating}
            size={30}
            allowHover={false}
            showTooltip
            tooltipArray={["2+", "4+", "6+", "8+", "10"]}
          />
        </div>
        {/*Muestro mensaje de error si no hay peliculas con el valor de estrella seleccionado */}
        {filtroPeliculas.length === 0 ? (
          <p className="no-results">
            Lo sentimos, no se encontraron películas con el rating solicitado.
          </p>
        ) : (
          <section className="movies-grid">
            {filtroPeliculas.map((pelicula) => (
              <Movie
                id={pelicula.id}
                key={pelicula.id}
                nombre={pelicula.title}
                imagen={pelicula.poster_path}
              />
            ))}
          </section>
        )}
      </main>
      {/*<footer>Hack Academy, 2025</footer> */}
    </>
  );
}

export default App;
