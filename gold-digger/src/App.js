// REACT
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

// VIEW
import './static/App.css';
import Layout from "./views/layoutView.js"

// PRESENTER
import Login from "./presenters/loginPresenter.js"
import Home from "./presenters/homePresenter.js"
import Artist from "./presenters/artistPresenter.js"
import Genres from "./presenters/genrePresenter.js"
import Parameter from "./presenters/parameterPresenter.js"
import Playlist from "./presenters/playlistPresenter.js"
import Source from "./presenters/sourcePresenter.js"
// import Loading from "./presenters/loadingPresenter.js"

// MODEL, FIREBASE AND API
import DiggerModel from "./DiggerModel.js";
import resolvePromise from "./resolvePromise";
import { getProfile } from "./spotifySource";

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
  const dModel = new DiggerModel(isLoggedIn, setLoggedIn);
  
  // Temporary fixed generated playlist for testing purposes
  dModel.setGenerated(fixedPlaylist);

  // Init states to resolve promises
  const [firebasePromiseState, setFirebasePromiseState] = useState({});
  const [profilePromiseState, setProfilePromiseState] = useState({});


  useEffect(() => {
    if(isLoggedIn === "true") {
      console.log("LOGIN Logged in");
      // get userid in order to init firebase
      resolvePromise(getProfile(), profilePromiseState, setProfilePromiseState);

    } else if (isLoggedIn === "false") {
      console.log("LOGIN Logged out");    
      navigate("/login");

    } else if (isLoggedIn === "pending") {
      console.log("LOGIN Pending login request");
    }
  }, [isLoggedIn, setLoggedIn]);


  // Resolve firebasepromise after userid-promise has resolved
  useEffect(() => {
    if (profilePromiseState.data && isLoggedIn === "true") {
      dModel.setUserID(profilePromiseState.data.id)
      resolvePromise(firebaseModelPromise(dModel), firebasePromiseState, setFirebasePromiseState);
    }
  }, [profilePromiseState, setProfilePromiseState]);


  // Routes 
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* Default route for / path */}
        <Route index element={<Home model={dModel}/>}/>
        <Route path="home" element={<Home model={dModel}/>}/>
        <Route path="login" element={<Login model={dModel}/>}/>
        <Route path="artist" element={<Artist model={dModel}/>}/>
        <Route path="genre" element={<Genres model={dModel}/>}/>
        <Route path="parameter" element={<Parameter model={dModel}/>}/>
        <Route path="playlist" element={<Playlist model={dModel}/>}/>
        <Route path="source" element={<Source model={dModel}/>}/>
        <Route path="tezt" element={<LoggedInTest model={dModel}/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  );
}

export default App;
