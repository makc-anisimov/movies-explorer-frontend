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
  const [userData, setUserData] = useState({ email: "", name: ""});

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.setHeader({ name: "Authorization", value: `Bearer ${jwt}` });
      mainApi.getProfile()
        .then((profileData) => {
          setLoggedIn(true);
          setUserData(profileData);
          navigate("/");
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }

  function handleLogin({ email, password }) {
    return mainApi.authorize({ email, password })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", `${data.jwt}`);
          tokenCheck();
          navigate(-1);
        }
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        return error;
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
          />}
        />
        <Route
          path="/signin"
          element={<Login
            handleLogin={handleLogin}
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
