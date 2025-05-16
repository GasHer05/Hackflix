function Movie({ id, imagen, nombre }) {
  return (
    <div className="movie-card" data-id={id}>
      <img src={`https://image.tmdb.org/t/p/w500${imagen}`} alt={nombre} />
    </div>
  );
}

export default Movie;
