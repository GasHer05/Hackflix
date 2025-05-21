import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import "../App.css";

function InformacionPeliculas() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=3ec9419c15f48f156f567f311613a140&language=es-ES`
      )
      .then((res) => {
        setPelicula(res.data);
      });
  }, []);

  if (!pelicula) return <Loader />;

  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h1>{pelicula.title}</h1>
      <p>
        <strong>Año:</strong> {pelicula.release_date.slice(0, 4)}
      </p>
      <p>
        <strong>Rating:</strong> {pelicula.vote_average}
      </p>
      <p>
        <strong>Descripción:</strong> {pelicula.overview}
      </p>
      <p>
        <strong>Géneros:</strong>{" "}
        {pelicula.genres.map((g) => g.name).join(", ")}
      </p>
      <img
        src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
        alt={pelicula.title}
        style={{ marginTop: "1rem", maxWidth: "100%" }}
      />
    </main>
  );
}

export default InformacionPeliculas;
