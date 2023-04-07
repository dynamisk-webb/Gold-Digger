/*

TODO

Lifecycle: GET prev playlists from Firebase
For each previous playlist Event: onClick inspect playlist


*/
import HomeView from "../views/homeView.js";
import {redirect} from "react-router-dom";


function Home() {

    return (
      <HomeView connectSpotify={connectSpotifyACB} generatePlaylist={generatePlaylistACB}></HomeView>  
    );

    /* Lifecycle */
    function onMountedACB () {

        function onUnMountedACB () {
            return;
        }
        return;
    }

    function connectSpotifyACB() {
        // login();
        // requestToken();
    }
    
    /* Event: Set window location to Source */
    function generatePlaylistACB() {
        // go to next window, ie Source Presenter
        return redirect("/source"); 
    }

}
export default Home;