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
import { useCallback, useEffect, useState } from "react";
import {
  getSavedMovies,
  deleteMovie,
  saveMovie,
  getUserInfo,
} from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [saveMovies, setSaveMovies] = useState([]);
  const [searchDataSaveMovies, setSearchDataSaveMovies] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  //Загрузка данных пользователя
  const getUserData = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getUserInfo(jwt)
        .then((data) => {
          return JSON.stringify(data);
        })
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser(JSON.parse(data));
        })
    }
  },[]);

  useEffect(() => {
    getUserData();
  }, [loggedIn, getUserData]);

  function removeMovies(mov,movieId){
    const jwt = localStorage.getItem("jwt");
    deleteMovie(mov._id,jwt).then(setSaveMovies(saveMovies.filter((item) => item.movieId !== movieId)))
    
  }

  function handleCardButtonClick(mov,movieId) {
    const jwt = localStorage.getItem("jwt");
    if(saveMovies.length){
      
      if (saveMovies.find((item) => item.movieId === movieId)) {
        const res = saveMovies.find((item)=>{return item.movieId === movieId});
        removeMovies(res,movieId);
      } 
      else {
        saveMovie(mov,jwt).then((data)=>{
          setSaveMovies((prev) => [...prev, data])
        }
          )
      
      }
    }
    else{
      saveMovie(mov,jwt).then((data)=>{
        setSaveMovies([data]);
      })
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
              setSaveMovies={setSaveMovies}
            />
          </Route>

          <Route path={"/saved-movies"}>
            <ProtectedRoute
              saveMovies={saveMovies}
              searchMov={searchMov}
              handleCardButtonClick={removeMovies}
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
              setCurrentUser={setCurrentUser}
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
