/*
TODO 

Event: onClick PKCE Authorization
Redirect to Home


*/
import LoginView from "../views/loginView.js";
import redirect from "react-router-dom";

function Login(props) {
    return (
        <LoginView authorize={authorizePKCEACB} goHome={returnHomeACB}></LoginView>
    );

    function authorizePKCEACB () {
        //TODO
        return;
    }
    /* Event: Set window location to Home */
    function returnHomeACB () {
        return redirect("/home");
    }
}

export default Login;
