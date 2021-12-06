import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage.jsx';
import {Routes, Router, Route} from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import JobDetails from './components/JobDetails';
import UserFavoriteList from './components/UserFavoriteList';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/api/job/:jobDetails" element={<JobDetails/>}/>
        <Route path="/api/user/:userFavorites" element={<UserFavoriteList/>}/>
        <Route path="/api/logIn" element={<LogIn/>}/>
        <Route path="/api/signUp" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
