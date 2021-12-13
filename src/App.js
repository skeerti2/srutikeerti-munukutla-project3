import logo from './logo.svg';
import './App.css';
import './jobportal.css';

import Homepage from './components/Homepage.jsx';
import Favorites from './components/Favorites.jsx';

import {Routes, Router, Route} from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import JobDetails from './components/JobDetails';
import UserFavoriteList from './components/UserFavoriteList';
import {useNavigate} from 'react-router-dom';
import JobCreate from './components/JobCreate';
import {createStore} from 'redux';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';


// const store = createStore(UserReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


function App() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);

  // function getLoggedIn() {
  //       axios.get('http://localhost:8000/auth/isLoggedIn')
  //           .then(response => {
  //               console.log("/isLoggedIn response:", response)
  //               console.log("current user is:", response.data.username)
  //               let newUser = response.data.username
  //               setLoggedIn(newUser);
  //               console.log("setting the username in App.js to" + newUser)
  //           })
  //           .catch(error => {
  //               console.log(error)
  //           })
  //         }
  //   getLoggedIn()

  function setDataFromHomePage(jobObj){
    setJobData(jobObj)
    navigate("/jobDetails")
  }

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Homepage toSetJobDetails={setDataFromHomePage}/>}/>
        <Route path="/jobDetails" element={<JobDetails jobDetails={jobData}/>}/>
        <Route path="/createJob" element={<JobCreate toSetJobDetails={setDataFromHomePage} />}/>
        <Route path="/api/user/:userFavorites" element={<UserFavoriteList/>}/>
        <Route path="/logIn" element={<LogIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/favorites" element={<Favorites/>}/>

      </Routes>
    </div>
    // </Provider>
  );
}

export default App;
