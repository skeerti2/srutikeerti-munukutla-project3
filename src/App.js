import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage.jsx';
import {Routes, Router, Route} from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import JobDetails from './components/JobDetails';
import UserFavoriteList from './components/UserFavoriteList';
import {createStore} from 'redux';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';


// const store = createStore(UserReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


function App() {
  const [userLoggedIn, setLoggedIn] = useState(null);

  function getLoggedIn() {
        axios.get('http://localhost:8000/auth/isLoggedIn')
            .then(response => {
                console.log("/isLoggedIn response:", response)
                console.log("current user is:", response.data.username)
                let newUser = response.data.username
                setLoggedIn(newUser);
                console.log("setting the username in App.js to" + newUser)
            })
            .catch(error => {
                console.log(error)
            })
          }
    getLoggedIn()
  return (
    // <Provider store={store}>
    <div className="container">
      <Routes>
        <Route path="/" element={<Homepage loggedInUser={userLoggedIn} />}/>
        <Route path="/api/job/:jobDetails" element={<JobDetails/>}/>
        <Route path="/api/user/:userFavorites" element={<UserFavoriteList/>}/>
        <Route path="/logIn" element={<LogIn loggedInUser={userLoggedIn}/>}/>
        <Route path="/signUp" element={<SignUp loggedInUser={userLoggedIn}/>}/>
      </Routes>
    </div>
    // </Provider>
  );
}

export default App;
