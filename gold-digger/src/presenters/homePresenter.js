
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
        console.log("access: " + localStorage.getItem("access-token"));

        if (localStorage.getItem("access-token") === null && localStorage.getItem("log-in") === "true") {
            localStorage.setItem("access-token", "in progress");
            props.model.requestToken();
        } else {
            //props.model.logout();
        }

        // ACB to run at the end
        return function onUnmountedACB() {
        }
    }
    
    
    
    /* Event: Set window location to Source */
    function generatePlaylistACB() {
        // go to next window, ie Source Presenter
        return redirect("/source"); 
    }

}
export default Home;