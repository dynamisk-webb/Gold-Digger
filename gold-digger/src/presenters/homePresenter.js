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

    TODO
    Lifecycle: GET prev playlists from Firebase
    For each previous playlist Event: onClick inspect playlist

    */
    
    function onMountedACB() {
        if (localStorage.getItem("access-token") === null && props.model.isLoggedIn === "pending") {
            localStorage.setItem("access-token", "pending"); // prevents second request from comming through while running react strict mode
            props.model.requestToken().then(setLoggedInACB);
        }
    }

    function setLoggedInACB() {
        props.model.setLogin("true");
        localStorage.setItem("isLoggedIn", "true");
    }    

    function generatePlaylistACB() {
        // TODO
        // make call to reset process parameters
    }
}

export default Home;
