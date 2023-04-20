import HomeView from "../views/homeView.js";
import {redirect} from "react-router-dom";
import { useEffect } from "react";
import PrevlistView from "../views/prevListView.js";

function Home(props) {
    useEffect(onMountedACB, [props.model]);

    return (
      <HomeView generatePlaylist={generatePlaylistACB}></HomeView>  
    );

    /*

    Lifecycle: GET prev playlists from Firebase
    For each previous playlist Event: onClick inspect playlist

    */
    function onMountedACB() {
        console.log("HOME access token: " + localStorage.getItem("access-token"));
        console.log("HOME isLoggedIn (state and localstorage): " + props.model.isLoggedIn + ", " + localStorage.getItem("isLoggedIn"));

        if (localStorage.getItem("access-token") === null && props.model.isLoggedIn === "pending") {
            localStorage.setItem("access-token", "pending"); // prevents second request from comming through while running react strict mode
            props.model.requestToken().then(setLoggedInACB);
        }

        // ACB to run at the end
        return function onUnmountedACB() {
        }
    }

    // Set login 
    function setLoggedInACB() {
        console.log("isLoggedIn before setting to true (state and localstorage)" + props.model.isLoggedIn + " " + localStorage.getItem("isLoggedIn"));
        props.model.setLogin("true");
        localStorage.setItem("isLoggedIn", "true");
        console.log("isLoggedIn after setting to true (state and localstorage)" + props.model.isLoggedIn + " " + localStorage.getItem("isLoggedIn"));
    }    

    /* Event: Set window location to Source */
    function generatePlaylistACB() {
        // go to next window, ie Source Presenter
        return redirect("/source"); 
    }
}

export default Home;