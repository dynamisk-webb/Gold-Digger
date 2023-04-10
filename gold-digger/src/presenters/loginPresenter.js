
import LoginView from "../views/loginView.js";
import {redirect} from "react-router-dom";


function Login(props) {

    return (
      <LoginView connectSpotify={connectSpotifyACB}></LoginView>  
    );

    /* Lifecycle */
    function onMountedACB () {

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