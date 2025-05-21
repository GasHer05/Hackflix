import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import Movie from "../components/Movie";
import axios from "axios";
import "../App.css";

function Home() {
  // creo un estado para guardar la cantidad de estrellas seleccionadas
  const [rating, setRating] = useState(0);
  const [peliculas, setPeliculas] = useState([]);
  const navigate = useNavigate();

  // creo una funcion que guarde el valor seleccionado
  // El parámetro rate viene del componente <Rating /> e indica cuántas estrellas seleccione (1-5).
  const usoRating = (rate) => {
    console.log(`Cambio de rating: ${rate}`); // Log opcional para debug
    setRating(rate);
  };

  // creo una función para resetear el rating seleccionado (botón Reset)
  const resetearRating = () => {
    setRating(0);
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
      });
  }, []);

  const irADetalle = (id) => {
    navigate(`/pelicula/${id}`);
  };

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Rating
              onClick={usoRating}
              initialValue={rating}
              size={30}
              allowHover={false}
            />

            {/* Muestro cuántas estrellas fueron seleccionadas */}
            <p style={{ marginTop: "10px" }}>Rating seleccionado: {rating}</p>

            {/* Botón para resetear el filtro de rating */}
            {rating > 0 && (
              <button onClick={resetearRating} className="btn-reset">
                Reset
              </button>
            )}
          </div>
        </div>

        {/*Muestro mensaje de error si no hay peliculas con el valor de estrella seleccionado */}
        {filtroPeliculas.length === 0 ? (
          <p className="no-results">
            Lo sentimos, no se encontraron películas con el rating solicitado.
          </p>
        ) : (
          <section className="movies-grid">
            {filtroPeliculas.map((pelicula) =>
              pelicula.poster_path ? (
                <Movie
                  id={pelicula.id}
                  key={pelicula.id}
                  nombre={pelicula.title}
                  imagen={pelicula.poster_path}
                  onClick={() => irADetalle(pelicula.id)}
                />
              ) : null
            )}
          </section>
        )}
      </main>
    </>
  );
}

export default Home;
