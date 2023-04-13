import LoginView from "../views/loginView.js";
import {redirect} from "react-router-dom";
import { useEffect } from "react";


function Login(props) {

    useEffect(onMountedACB, []);

    return (
      <LoginView connectSpotify={connectSpotifyACB}></LoginView>  
    );

    /* Lifecycle */
    function onMountedACB () {
        localStorage.removeItem("access-token");
        localStorage.setItem("log-in", "false"); // should be moved to when we navigate to login

        function onUnMountedACB () {
            return;
        }
        return;
    }

    function connectSpotifyACB() {
        props.model.login();
    }
}
export default Login;


