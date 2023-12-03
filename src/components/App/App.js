import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Loading from './Loading/Loading';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { moviesApi } from '../../utils/MoviesApi';
import { SIGN_ERROR_TEXT, UNKNOWN_ERROR_TEXT } from '../../utils/const';

function App() {
  const navigate = useNavigate();
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "", name: "" });
  const [errorText, setErrorText] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [isShowPreloader, setIsShowPreloader] = useState(false);
  const [isMoviesSearchError, setIsMoviesSearchError] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    setIsAppLoading(true);
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.setHeader({ name: "Authorization", value: `Bearer ${jwt}` });
      mainApi.getProfile()
        .then((profileData) => {
          setLoggedIn(true);
          setUserData(profileData);
          setIsAppLoading(false);
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
          setIsAppLoading(false);
        });
    } else setIsAppLoading(false);
  }

  function handleLogin({ email, password }) {
    setErrorText('');
    return mainApi.authorize({ email, password })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", `${data.jwt}`);
          tokenCheck()
          navigate("/movies");
        }
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        switch (error) {
          case 401: {
            setErrorText(SIGN_ERROR_TEXT);
            break;
          }
          case 400: {
            setErrorText(SIGN_ERROR_TEXT);
            break;
          }
          default: {
            setErrorText(UNKNOWN_ERROR_TEXT);
          }
        }
      });
  }

  function handleRegister({ name, email, password }) {
    return mainApi.register({ name, email, password })
  }


  function changeIsLoggedIn() {
    setLoggedIn(false);
  }

  function handleUpdateUser(userInfo) {
    return mainApi.editProfile(userInfo)
  }

  const getSavedMovies = () => {
    mainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch(error => console.log('Не удалось получить информаию о сохранненных фильмах. Error: ', error));
  }

  const addToSaved = (movie) => {
    mainApi.addMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie]);
        movie._id = savedMovie._id;
      })
      .catch((error) => {
        console.log('Ошибка при сохранении фильма. Error: ', error);
      })
  }

  const removeFromSaved = (id) => {
    mainApi.deleteMovie(id)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => movie._id !== id));
      })
      .catch((error) => {
        console.log('Ошибка. Не удалось удалить сохраненый фильм. Error: ', error);
      })
  }

  function getAllMovies() {
    setIsShowPreloader(true);
    moviesApi.getMovies()
      .then((allMoviesData) => {
        setAllMovies(allMoviesData);
        localStorage.setItem("allMovies", JSON.stringify(allMoviesData));
        setIsShowPreloader(false);
        return allMoviesData;
      })
      .catch((err) => {
        setIsMoviesSearchError(true);
        console.log('Ошибка получения информации о фильмах', err);
        setIsShowPreloader(false);
        return err;
      });
  }

  return (
    isAppLoading
      ? <Loading />
      :
      <CurrentUserContext.Provider value={userData}>
        <Routes>
          <Route
            path="/signup"
            element={<Register
              handleRegister={handleRegister}
              handleLogin={handleLogin}
              errorText={errorText}
              setErrorText={setErrorText}
              loggedIn={loggedIn}
            />}
          />
          <Route
            path="/signin"
            element={<Login
              handleLogin={handleLogin}
              errorText={errorText}
              setErrorText={setErrorText}
              loggedIn={loggedIn}
            />}
          />
          <Route
            path="/"
            element={<Main
              loggedIn={loggedIn}
            />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                loggedIn={loggedIn}
                getAllMovies={getAllMovies}
                allMovies={allMovies}
                setAllMovies={setAllMovies}
                isShowPreloader={isShowPreloader}
                setIsShowPreloader={setIsShowPreloader}
                isMoviesSearchError={isMoviesSearchError}
                setIsMoviesSearchError={setIsMoviesSearchError}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                addToSaved={addToSaved}
                removeFromSaved={removeFromSaved}
                getSavedMovies={getSavedMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={SavedMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                changeLoggedIn={changeIsLoggedIn}
                loggedIn={loggedIn}
                onSubmit={handleUpdateUser}
                setUserData={setUserData}
                userData={userData}
                component={Profile}
              />
            }
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </CurrentUserContext.Provider>
  );
}

export default App;
