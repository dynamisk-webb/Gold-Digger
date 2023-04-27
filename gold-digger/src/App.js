// REACT
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

// VIEW
import './static/App.css';

// PRESENTER
import Layout from "./presenters/layoutPresenter.js";
import Login from "./presenters/loginPresenter.js"
import Home from "./presenters/homePresenter.js"
import Artist from "./presenters/artistPresenter.js"
import Genres from "./presenters/genrePresenter.js"
import Parameter from "./presenters/parameterPresenter.js"
import Playlist from "./presenters/playlistPresenter.js"
import Source from "./presenters/sourcePresenter.js"
import Loading from "./presenters/loadingPresenter.js"

// MODEL
import DiggerModel from "./DiggerModel.js";
import resolvePromise from "./resolvePromise";

// API AND AUTHENTICATION
import { getProfile } from "./spotifySource";
import { refreshAccessToken } from "./authentication";

// FIREBASE
import  "./firebaseModel.js";
import { firebaseModelPromise } from "./firebaseModel.js";

// TEMPORARY IMPORTS
import fixedPlaylist from "./test/fixedList.js";
import LoggedInTest from "./test/loggedInTestPresenter";

/**
 *  Main App rendering all components
 */

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const [dModel, setDmodel] = useState(new DiggerModel(isLoggedIn, setLoggedIn));
  
  // Temporary fixed generated playlist for testing purposes
  dModel.generated = fixedPlaylist;

  // Init states to resolve promises
  const [firebasePromiseState, setFirebasePromiseState] = useState({});
  const [profilePromiseState, setProfilePromiseState] = useState({});

  useEffect(() => {

    if(isLoggedIn === "true") {
      console.log("LOGIN Logged in");
    
      // check if we timed out during the time browser was closed
      const currentTime = new Date().getTime();
      if (currentTime > localStorage.getItem("expire-time")) {
        refreshAccessToken().then(getUserIDACB);
        console.log("refresh!");
      } else {
        getUserIDACB();
      }

    } else if (isLoggedIn === "false") {
      console.log("LOGIN Logged out");    
      navigate("/login");

    } else if (isLoggedIn === "pending") {
      console.log("LOGIN Pending login request");
    }
  }, [isLoggedIn, setLoggedIn]);

  function getUserIDACB() {
    resolvePromise(getProfile(), profilePromiseState, setProfilePromiseState);
  }


  // Resolve firebasepromise after userid-promise has resolved
  useEffect(() => {
    if (profilePromiseState.data && isLoggedIn === "true") {
      dModel.setUserID(profilePromiseState.data.id)
      resolvePromise(firebaseModelPromise(dModel, setDmodel), firebasePromiseState, setFirebasePromiseState);
    }
  }, [profilePromiseState, setProfilePromiseState]);


  // Routes 
  return (
    <Routes>
      <Route exact path ="/login" element={isLoggedIn === "true" ? <Navigate to="/"/> : <Login model={dModel}/>}/>
      <Route path="/" element={<Layout model={dModel}/>}>
        {/* Default route for / path */}
        <Route index element={<Home model={dModel}/>}/>
        <Route path="artist" element={<Artist model={dModel}/>}/>
        <Route path="genre" element={<Genres model={dModel}/>}/>
        <Route path="parameter" element={<Parameter model={dModel}/>}/>
        <Route path="playlist" element={<Playlist model={dModel}/>}/>
        <Route path="source" element={<Source model={dModel}/>}/>
        <Route path="loading" element={<Loading model={dModel}/>}/>
        <Route path="test" element={<LoggedInTest model={dModel}/>}/>
      </Route>
      <Route path="*" element={isLoggedIn === "true" ? <Navigate to="/"/> : <Navigate to="/login"/>}/>
    </Routes>
  );
}

export default App;