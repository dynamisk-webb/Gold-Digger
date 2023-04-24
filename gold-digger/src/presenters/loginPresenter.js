import LoginView from "../views/loginView.js";
import {redirect} from "react-router-dom";
import { useState, useEffect } from "react";


function Login(props) {

    return (
      <LoginView connectSpotify={connectSpotifyACB}></LoginView>  
    );

    function connectSpotifyACB() {
        if(localStorage.getItem("access-token")) {
          localStorage.removeItem("access-token"); // remove in order to not create conflicts with new login
        }
        props.model.login();
    }
}
export default Login;


