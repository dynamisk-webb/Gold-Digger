// Import here 
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import './static/App.css';
import DiggerModel from "./DiggerModel.js";

import fixedPlaylist from "./test/fixedList.js";

import Layout from "./views/layoutView.js"
import Login from "./presenters/loginPresenter.js"
import Home from "./presenters/homePresenter.js"
// import Loading from "./presenters/loadingPresenter.js"
import Artist from "./presenters/artistPresenter.js"
import Genres from "./presenters/genrePresenter.js"
import Parameter from "./presenters/parameterPresenter.js"
import Playlist from "./presenters/playlistPresenter.js"
import Source from "./presenters/sourcePresenter.js"

import  "./firebaseModel.js";
import LoggedInTest from "./test/loggedInTestPresenter";

/**
 *  Main App rendering all components
 */

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const dModel = new DiggerModel(isLoggedIn, setLoggedIn);
  dModel.setGenerated(fixedPlaylist);
  
  useEffect(() => {
    if(isLoggedIn === "true") {
      console.log("LOGIN You are logged in");
    } else if (isLoggedIn === "false") {
      console.log("LOGIN You are not logged in");    
      navigate("/login");
    } else if (isLoggedIn === "pending") {
      console.log("LOGINPending login request");
    }
  }, [navigate, isLoggedIn, setLoggedIn]);

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
