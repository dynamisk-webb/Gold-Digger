/*
TODO

Lifecycle: GET the playlist
Event: onInput PUT /playlist/{playlist_id}
Set name to new input name



*/

import PlaylistView from "../views/playlistView.js";
import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { generatedListPromise } from "../firebaseModel.js";
import resolvePromise from "../resolvePromise.js";
import waitForFirebase from "../views/waitForFirebase.js";
import { createPlaylist, addTracks } from "../spotifySource.js";

// temp import
import fixedList from "../test/fixedList.js";


/**
 * Sends a playlist containing all tracks to props.
 * Will present the "finished" playlist to the user. I.e. send the generated playlist to the PlaylistView
 */

function Playlist (props) {
    // debug
    // props.model.debugModelState("/playlist init");

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
        //props.model.debugModelState("/playlist rerender");
    }


    //let tracks = props.model.generated.tracks;
    let playlistName = props.model.generated.playlistName;

    let tracks = fixedList.tracks;
    //let playlistName = fixedList.playlistName;

    const [playlistPromiseState, setPlaylistPromiseState] = useState({});
    const [playlistCreatePromiseState, setPlaylistCreatePromiseState] = useState({});

    useEffect (onMountedACB, [props.model]);

    //useEffect (onResolvedFirebaseACB, [playlistPromiseState, setPlaylistPromiseState]);
    
    
    useEffect(() =>{
      if(playlistCreatePromiseState.data != null){
        let ids = tracks.map(elem => elem.track.id);
        addTracks(playlistCreatePromiseState.data.id, ids);
      }
    }, [playlistCreatePromiseState, setPlaylistCreatePromiseState]);

    //useEffect (onResolvedFirebaseACB, [playlistPromiseState, setPlaylistPromiseState]);
    //useEffect ( () => {console.log("model " )}, [props.model]);


    // Lifecycle
    function onMountedACB(){

        // Resolve promise. Get all data in generated playlist from firebase, add it to model.
        resolvePromise (generatedListPromise (props.model, props.model.generated.firebaseKey), playlistPromiseState, setPlaylistPromiseState);

        // Lifecycle: GET the playlist. Set name to new input name
        // tracks = getTracks(props.playlistID);
        // list of tracks will contain:
                    // title
                    // artist
                    // album
                    // time
        return;
    }

    /*
    function onResolvedFirebaseACB() {
      tracks = props.model.generated.tracks;
      playlistName = props.model.generated.playlistName;
    }
    */


    return (
      <div>
        {/*waitForFirebase(playlistPromiseState) ||*/
        <PlaylistView
          generatedTracks={tracks}
          generatedName={playlistName}
          removeTrack={removeTrackACB}
          getPlaylistURL={getPlaylistURLACB}
          setAudioPlayerSong={setAudioPlayerSongACB}
          setPlaylistName={setPlaylistNameACB}
          returnHome={returnHomeACB}
          savePlaylistToSpotify={savePlaylistToSpotifyACB}
          removePlaylist={removePlaylistACB}
        ></PlaylistView>}
      </div>
    );

    
    /* Event: onClick REMOVE /playlists/{playlist_id}/tracks */
  function removeTrackACB(id) {
    props.model.removeTrack(id);
  }

  /* Event: onClick Get playlist url and copy to clipboard */
  function getPlaylistURLACB() {
    // https://stackoverflow.com/questions/65930199/copy-active-browsers-url-to-clipboard-with-reactjs
  }

  /* Event: onInput set name of generated list */
  function setPlaylistNameACB(input) {
    props.model.setGeneratedName(input);
    props.model.setPrevName(input);
  }

  /* Event: onClick set audio player song */
  function setAudioPlayerSongACB() {}

  /* Event: onClick return to Home */
  function returnHomeACB() {
    // TODO prio,
  }

  function savePlaylistToSpotifyACB() {
    // TODO should use a function from spotifySource to add list to users account
    /*
    TODO

    POST /users/{user_id}/playlists
    Set generated playlist id
    --> 
    POST /playlists/{playlists_id}/tracks
    PUT /playlists/{playlist_id}/images
    */
    
    // TODO test: make this display current model state in some way

  
    resolvePromise(createPlaylist(props.model.userid, playlistName), playlistCreatePromiseState, setPlaylistCreatePromiseState);
    
    //alert("Should add playlist to users Spotify account (not implemented yet)");
  }

  function removePlaylistACB(){
    console.log(props.model.generated.firebaseKey);
    props.model.removePrevPlaylist(props.model.generated.firebaseKey)
  }
}

export default Playlist;
