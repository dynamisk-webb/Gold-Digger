
import HomeView from "../views/homeView.js";
import {redirect} from "react-router-dom";
import { useEffect, useState } from "react";
import PrevlistView from "../views/prevListView.js";
import resolvePromise from "../resolvePromise.js";
import { firebaseModelPromise } from "../firebaseModel.js";
import { getProfile } from "../spotifySource.js";


function Home(props) {
    useEffect(onMountedACB, [props.model]);

    // init states to resolve promises
    const [firebasePromiseState, setFirebasePromiseState] = useState({});
    const [profilePromiseState, setProfilePromiseState] = useState({});

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
            props.model.requestToken().then(getUserIDACB).then(setUpFirebaseACB);
        }

        // ACB to run at the end
        return function onUnmountedACB() {
        }
    }

    
    function getUserIDACB() {
        console.log("begin to resolve profile promise");
        return resolvePromise(getProfile(), profilePromiseState, setProfilePromiseState);
    }


    function setUpFirebaseACB() {
        console.log("begin to resolve firebase promise");
        
        // TODO set userid in model
        // props.model.setUserID(profilePromiseState.data.id);

        return resolvePromise(firebaseModelPromise(props.model), firebasePromiseState, setFirebasePromiseState);
    }

    
    function logOutACB(){
        props.model.logout();
    }
    
    /* Event: Set window location to Source */
    function generatePlaylistACB() {
        // go to next window, ie Source Presenter
        return redirect("/source"); 
    }
}

export default Home;