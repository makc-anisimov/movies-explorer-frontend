import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
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

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "", name: "" });
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    // console.log('tokenCheck');
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.setHeader({ name: "Authorization", value: `Bearer ${jwt}` });
      mainApi.getProfile()
        .then((profileData) => {
          setLoggedIn(true);
          setUserData(profileData);
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }

  function handleLogin({ email, password }) {
    setErrorText('');
    return mainApi.authorize({ email, password })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", `${data.jwt}`);
          tokenCheck()
          setTimeout(() => {
            navigate("/movies");
        }, 1000);
        }
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        switch (error) {
          case 401: {
            setErrorText('Неправильная почта или пароль');
            break;
          }
          case 400: {
            setErrorText('Неправильная почта или пароль');
            break;
          }
          default: {
            setErrorText('Что-то пошло не так...');
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

  return (
    <CurrentUserContext.Provider value={userData}>
      <Routes>
        <Route
          path="/signup"
          element={<Register
            handleRegister={handleRegister}
            handleLogin={handleLogin}
            errorText={errorText}
            setErrorText={setErrorText}
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
              loggedIn={loggedIn}
              component={Movies}
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
