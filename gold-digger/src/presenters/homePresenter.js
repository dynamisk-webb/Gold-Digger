
import HomeView from "../views/homeView.js";
import {redirect} from "react-router-dom";
import { useEffect } from "react";


function Home(props) {
    useEffect(onMountedACB, []);

    return (
      <HomeView generatePlaylist={generatePlaylistACB} logOut={logOutACB}></HomeView>  
    );

    /*

    Lifecycle: GET prev playlists from Firebase
    For each previous playlist Event: onClick inspect playlist

    */
    function onMountedACB() {
        console.log("Lifecycle!");
        console.log("access: " + localStorage.getItem("access-token"));

        if (localStorage.getItem("access-token") === null) {
            localStorage.setItem("access-token", "in progress")
            props.model.requestToken();
        }

        // ACB to run at the end
        return function onUnmountedACB() {
            console.log("Cleanup!");
        }
    }
    
    function logOutACB(){
        props.model.setLogin(false);
    }
    
    /* Event: Set window location to Source */
    function generatePlaylistACB() {
        // go to next window, ie Source Presenter
        return redirect("/source"); 
    }

}
export default Home;