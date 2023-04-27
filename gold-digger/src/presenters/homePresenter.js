import HomeView from "../views/homeView.js";
import { useEffect } from "react";
import PrevlistView from "../views/prevListView.js";

function Home(props) {
    useEffect(onMountedACB, [props.model]);

    return (
      <HomeView generatePlaylist={generatePlaylistACB}></HomeView>  
    );

    /*

    TODO
    For each previous playlist Event: onClick inspect playlist

    */
    
    function onMountedACB() {
    }

    function generatePlaylistACB() {
        // TODO
        // make call to reset process parameters
    }
}

export default Home;
