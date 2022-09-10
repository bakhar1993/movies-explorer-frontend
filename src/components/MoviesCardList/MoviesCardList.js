import "./MoviesCardList.css";
import Card from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MOBILE_RESOLUTION, TABLET_RESOLUTION } from "../../utils/constants";

function MoviesCardList({
  movies,
  handleCardButtonClick,
  saveMovies,
  setSaveMovies,
}) {
  const [countMov, setCountMov] = useState(4);
  const [countNextMov, setCountNextMov] = useState(4);
  const location = useLocation();

  function clickButtonNext() {
    setCountMov(countMov + countNextMov);
  }

  function changeCount() {
    if (
      window.innerWidth <= TABLET_RESOLUTION &&
      window.innerWidth > MOBILE_RESOLUTION
    ) {
      setCountMov(2);
      setCountNextMov(2);
    } else if (window.innerWidth <= MOBILE_RESOLUTION) {
      setCountMov(5);
      setCountNextMov(2);
    } else {
      setCountMov(4);
      setCountNextMov(4);
    }
  }

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setCountMov(movies.length);
    } else {
      changeCount();
      window.addEventListener("resize", () => {
        setTimeout(changeCount, 2000);
      });
      return window.removeEventListener("resize", () => {
        setTimeout(changeCount, 2000);
      });
    }
  }, []);

  return (
    <section className="movies-card">
      <div className="movies-card__container">
        {movies.slice(0, countMov).map((mov) => (
          <Card
            key={mov.id || mov.movieId}
            movieId={mov.id || mov.movieId}
            mov={mov}
            handleCardButtonClick={handleCardButtonClick}
            saveMovies={saveMovies}
          />
        ))}
      </div>
      <button
        className={`movies-card__button ${
          movies.length === movies.slice(0, countMov).length ||
          location.pathname === "/saved-movies"
            ? "movies-card__button_none"
            : ""
        }`}
        type="button"
        onClick={clickButtonNext}
      >
        Еще
      </button>
    </section>
  );
}

export default MoviesCardList;
