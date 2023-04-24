import LoginView from "../views/loginView.js";
import {redirect} from "react-router-dom";
import { useState, useEffect } from "react";


function Login(props) {

    useEffect(() => {
      if(localStorage.getItem("isLoggedIn") === "true") {
        props.model.logout();
      }
    }, []);

    return (
      <LoginView connectSpotify={connectSpotifyACB}></LoginView>  
    );


    function connectSpotifyACB() {
        props.model.login();
    }
}
export default Login;


