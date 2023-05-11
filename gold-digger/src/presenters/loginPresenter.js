import LoginView from "../views/loginView.js";
import { useState, useEffect } from "react";


function Login(props) {
    // debug
    // props.model.debugModelState("/login init");

    // add observer for notifications for state changes
    useEffect(addObserverOnCreatedACB, [])
    const [, forceReRender ]= useState(); 

    function addObserverOnCreatedACB() {
        props.model.addObserver(notifyACB);

        function removeObserverOnDestroyACB() {
            props.model.removeObserver(notifyACB);
        }
        return removeObserverOnDestroyACB;
    }

    // rerender on state change
    function notifyACB() {
        forceReRender({});
        //props.model.debugModelState("/login rerender");
    }

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


