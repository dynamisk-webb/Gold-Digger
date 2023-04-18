import LoginView from "../views/loginView.js";
import {redirect} from "react-router-dom";
import { useEffect } from "react";


function Login(props) {

    return (
      <LoginView connectSpotify={connectSpotifyACB}></LoginView>  
    );


    function connectSpotifyACB() {
        props.model.login();
    }
}
export default Login;


