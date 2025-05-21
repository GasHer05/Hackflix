import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InformacionPeliculas from "./pages/InformacionPeliculas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pelicula/:id" element={<InformacionPeliculas />} />
    </Routes>
  );
}

export default App;
