// RESOLVE PROMISE
import resolvePromise from "./resolvePromise.js";

// API AND AUTHENTICATION
import { getProfile } from "./spotifySource";
import { refreshAccessToken } from "./authentication";

// FIREBASE
import "./firebaseModel.js";
import { firebaseModelPromise } from "./firebaseModel.js";
import waitForFirebase from "./views/waitForFirebase.js";

// REACT
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

// OTHER
import App from "./App.js";

function Root(props) {
  // Init states to resolve promises
  const [firebasePromiseState, setFirebasePromiseState] = useState({});
  const [profilePromiseState, setProfilePromiseState] = useState({});
  const [isLoggedIn, setLogin] = useState(
    localStorage.getItem("isLoggedIn")
  );

  props.model.isLoggedIn = isLoggedIn;
  props.model.setLogin = setLogin;

  // Navigation
  const navigate = useNavigate();

  // Detect login and restrict access based on login status
  useEffect(() => {
    if (isLoggedIn == null) {
        localStorage.setItem("isLoggedIn", "false");
    } else if (isLoggedIn === "true") {
      getUserID();
      if (window.location.pathname === "/redirect") {
        navigate("/");
      }
    } else if (isLoggedIn === "false") {
      navigate("/login");
    } else if (isLoggedIn === "pending") {
      if (
        window.location.pathname !== "/redirect" &&
        window.location.pathname !== "/login"
      ) {
        navigate("/login");
      }
    }
  }, [isLoggedIn]);


  // Set userID in model on login
  function getUserID() {
    function getUserIDACB() {
      resolvePromise(getProfile(), profilePromiseState, setProfilePromiseState);
    }

    // check if we timed out during the time browser was closed
    const currentTime = new Date().getTime();
    if (currentTime > localStorage.getItem("expire-time")) {
      refreshAccessToken().then(getUserIDACB);
    } else {
      getUserIDACB();
    }
  }

  // Resolve firebasepromise after userid-promise has resolved
  useEffect(() => {
    if (profilePromiseState.data && isLoggedIn === "true") {
      props.model.setUserID(profilePromiseState.data.id);
      resolvePromise(
        firebaseModelPromise(props.model),
        firebasePromiseState,
        setFirebasePromiseState
      );
    }
  }, [profilePromiseState, setProfilePromiseState]);


  return (
    <div>
      {/** only wait for firebase if user is logged in and a promise will be requested */}
     {isLoggedIn === "true" ? (waitForFirebase(firebasePromiseState) || <App model={props.model}/>) : <App model={props.model}/>}
    </div>
  );
}

export default Root;
