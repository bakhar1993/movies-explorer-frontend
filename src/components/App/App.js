import "./App.css";
import { Route, Switch } from "react-router-dom";

import UserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import { useEffect, useState } from "react";
import {
  getSavedMovies,
  deleteMovie,
  saveMovie,
  getUserInfo,
} from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  // const [saveMovies, setSaveMovies] = useState([{
  //   "id": 1,
  //   "nameRU": "«Роллинг Стоунз» в изгнании",
  //   "nameEN": "Stones in Exile",
  //   "director": "Стивен Кайак ",
  //   "country": "США",
  //   "year": "2010",
  //   "duration": 61,
  //   "description": "В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.",
  //   "trailerLink": "https://www.youtube.com/watch?v=UXcqcdYABFw",
  //   "created_at": "2020-11-23T14:12:21.376Z",
  //   "updated_at": "2020-11-23T14:12:21.376Z",
  //   "image": {
  //     "id": 1,
  //     "name": "stones-in-exile",
  //     "alternativeText": "",
  //     "caption": "",
  //     "width": 512,
  //     "height": 279,
  //     "formats": {
  //       "thumbnail": {
  //         "hash": "thumbnail_stones_in_exile_b2f1b8f4b7",
  //         "ext": ".jpeg",
  //         "mime": "image/jpeg",
  //         "width": 245,
  //         "height": 134,
  //         "size": 8.79,
  //         "path": null,
  //         "url": "/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg"
  //       },
  //       "small": {
  //         "hash": "small_stones_in_exile_b2f1b8f4b7",
  //         "ext": ".jpeg",
  //         "mime": "image/jpeg",
  //         "width": 500,
  //         "height": 272,
  //         "size": 25.68,
  //         "path": null,
  //         "url": "/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg"
  //       }
  //     },
  //     "hash": "stones_in_exile_b2f1b8f4b7",
  //     "ext": ".jpeg",
  //     "mime": "image/jpeg",
  //     "size": 25.53,
  //     "url": "/uploads/stones_in_exile_b2f1b8f4b7.jpeg",
  //     "previewUrl": null,
  //     "provider": "local",
  //     "provider_metadata": null,
  //     "created_at": "2020-11-23T14:11:57.313Z",
  //     "updated_at": "2020-11-23T14:11:57.313Z"
  //   }
  // }]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [searchDataSaveMovies, setSearchDataSaveMovies] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  //загрузка сохраненных фильмов
  useEffect(() => {
    getSavedMovies()
      .then((data) => {
        return JSON.stringify(data);
      })
      .then((data) => {
        setSaveMovies(JSON.parse(data));
      });
  }, []);

  //Загрузка данных пользователя
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getUserInfo(jwt)
        .then((data) => {
          return JSON.stringify(data);
        })
        .then((data) => {
          setCurrentUser(data);
        });
    }
  }, [currentUser]);

  function handleCardButtonClick(mov) {
    if (saveMovies.find((item) => item.id === mov.id)) {
      deleteMovie(mov.id);
      setSaveMovies(saveMovies.filter((item) => item.id !== mov.id));
    } else {
      saveMovie(mov);
      setSaveMovies((prev) => [...prev, mov]);
    }
  }

  function outProfile() {
    localStorage.clear("movies");
    localStorage.clear("jwt");
    setSaveMovies([]);
    setLoggedIn(false);
    setCurrentUser("");
  }

  //Поиск фильмов
  function searchMov(mov, word, isShort) {
    const wordToLower = word.toLowerCase();
    if (!isShort) {
      const res = mov.filter((item) => {
        return item.nameRU.toLowerCase().includes(wordToLower);
      });
      return res;
    } else {
      const res = mov.filter((item) => {
        return (
          item.nameRU.toLowerCase().includes(wordToLower) && item.duration <= 40
        );
      });
      return res;
    }
  }

  return (
    <div className="page">
      <Header loggedIn={loggedIn} />
      <UserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path={"/"}>
            <Main />
          </Route>

          <Route path={"/movies"}>
            <ProtectedRoute
              searchMov={searchMov}
              saveMovies={saveMovies}
              handleCardButtonClick={handleCardButtonClick}
              loggedIn={loggedIn}
              component={Movies}
            />
          </Route>

          <Route path={"/saved-movies"}>
            <ProtectedRoute
              saveMovies={saveMovies}
              searchMov={searchMov}
              handleCardButtonClick={handleCardButtonClick}
              searchDataSaveMovies={searchDataSaveMovies}
              setSearchDataSaveMovies={setSearchDataSaveMovies}
              loggedIn={loggedIn}
              component={SavedMovies}
            />
          </Route>

          <Route path={"/profile"}>
            <ProtectedRoute
              outProfile={outProfile}
              loggedIn={loggedIn}
              component={Profile}
            />
          </Route>

          <Route path={"/signin"}>
            <Login setLoggedIn={setLoggedIn} setUserInfo={setCurrentUser} />
          </Route>

          <Route path={"/signup"}>
            <Register />
          </Route>

          <Route path={"*"}>
            <NotFound />
          </Route>
        </Switch>
      </UserContext.Provider>

      <Footer />
    </div>
  );
}

export default App;
