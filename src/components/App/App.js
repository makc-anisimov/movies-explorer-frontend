// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
// import Preloader from '../../utils/Preloader/Preloader';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route
        path="/signup"
        element={<Register />
        }
      />
       <Route
        path="/signin"
        element={<Login					
				/>}
      />

      <Route
        path="/"
        element={<Main />
        }
      />
      <Route
        path="/movies"
        element={<Movies />}
      />
      <Route
        path="/saved-movies"
        element={<SavedMovies />}
      />
      <Route
        path="/profile"
        element={<Profile 
          name={"Макс"}
          mail={"pochta@yandex.ru"} />}

      />
			<Route
				path="*"
				element={<NotFound />}
			/>
{/*      
      <Route
        path="/saved-movies"
      /> */}

      {/* <Route
        path="*"
        element={loggedIn
          ? <Navigate to="/" />
          : <Navigate to="/sign-in" />
        }
      /> */}
    </Routes>
  );
}

export default App;
