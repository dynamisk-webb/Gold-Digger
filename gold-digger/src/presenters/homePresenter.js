import HomeView from "../views/homeView.js";
import { useEffect, useState } from "react";
import { generatedListPromise } from "../firebaseModel.js";

function Home(props) {
    // debug
    // props.model.debugModelState("/home init");

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
    }


    return (
      <HomeView model={props.model} setCurrentPlaylist={setCurrentPlaylistACB} prevPlaylists={props.model.prevPlaylists} startNewSession={startNewSessionACB}></HomeView>  
    );

    // Set the generated playlist as the current playlist in the model
    function setCurrentPlaylistACB (playlistName, firebaseKey) {
      props.model.setGeneratedFirebaseKey(firebaseKey, true);
      props.model.setGeneratedName(playlistName, true);
    }

    function startNewSessionACB() {
      props.model.resetParams();
    }
}

export default Home;
