import "./MoviesCardList.css";
import Card from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";

function MoviesCardList({
  movies,
  handleCardButtonClick,
  saveMovies,
  setSaveMovies,
}) {
  const [countMov, setCountMov] = useState();
  const [countNextMov, setCountNextMov] = useState();

  function clickButtonNext() {
    setCountMov(countMov + countNextMov);
  }

  function changeCount() {
    if (window.innerWidth < 769 && window.innerWidth > 320) {
      setCountMov(2);
      setCountNextMov(2);
    } else if (window.innerWidth < 321) {
      setCountMov(5);
      setCountNextMov(2);
    } else {
      setCountMov(4);
      setCountNextMov(4);
    }
  }
  // useEffect(()=>{}[])

  useEffect(() => {
    changeCount();
    window.addEventListener("resize", () => {
      setTimeout(changeCount, 2000);
    });
    return window.removeEventListener("resize", () => {
      setTimeout(changeCount, 2000);
    });
  }, []);

  return (
    <section className="movies-card">
      <div className="movies-card__container">
        {movies.slice(0, countMov).map((mov) => (
          <Card
            key={mov.id}
            mov={mov}
            handleCardButtonClick={handleCardButtonClick}
            saveMovies={saveMovies}
          />
        ))}
      </div>
      <button
        className={`movies-card__button ${
          movies.length === movies.slice(0, countMov).length
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
