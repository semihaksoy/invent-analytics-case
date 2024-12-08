import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./utils/constants";
import { Suspense, lazy } from "react";

const Movies = lazy(() => import("./pages/Movies"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));

function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Navigate to={routes.movies} />} />
          <Route path={routes.movies} element={<Movies />} />
          <Route path={routes.movieDetails} element={<MovieDetails />} />
          
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
