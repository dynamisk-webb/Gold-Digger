
import HomeView from "../views/homeView.js";
import {redirect} from "react-router-dom";
import { useEffect } from "react";
import PrevlistView from "../views/prevListView.js";


function Home(props) {
    useEffect(onMountedACB, [props.model]);

    return (
      <HomeView generatePlaylist={generatePlaylistACB} logOut={logOutACB}></HomeView>  
    );

    /*

    Lifecycle: GET prev playlists from Firebase
    For each previous playlist Event: onClick inspect playlist

    */
    function onMountedACB() {
        //console.log("RENDERED HOME\nCurrent access: " + localStorage.getItem("access-token"));

        if (localStorage.getItem("access-token") === null && props.model.isLoggedIn === "pending") {
            localStorage.setItem("access-token", "pending"); // prevents second request from comming through while running react strict mode
            props.model.requestToken();
        }

        // ACB to run at the end
        return function onUnmountedACB() {
        }
    }
    
    function logOutACB(){
        //props.model.setLogin("false");
        props.model.logout();
    }
    
    /* Event: Set window location to Source */
    function generatePlaylistACB() {
        // go to next window, ie Source Presenter
        return redirect("/source"); 
    }

}
export default Home;