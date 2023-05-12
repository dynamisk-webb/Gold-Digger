import PlaylistView from "../views/playlistView.js";
import { useEffect, useState } from "react";
import { generatedListPromise } from "../firebaseModel.js";
import resolvePromise from "../resolvePromise.js";
import waitForFirebase from "../views/waitForFirebase.js";

import { createPlaylist, addAllTracks } from "../spotifySource.js";

// temp import
import fixedList from "../test/fixedList.js";
import AudioPlayer from "../views/audioPlayView.js";


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
    const [playTrackState, setPlayTrackState] = useState({play:false, tracks:[]});

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

    let playlistName = props.model.generated.playlistName;
    let tracks = props.model.generated.tracks;

    const [playlistPromiseState, setPlaylistPromiseState] = useState({});
    const [playlistCreatePromiseState, setPlaylistCreatePromiseState] = useState({});

    useEffect (onMountedACB, [props.model]);

    useEffect(() =>{
      if(playlistCreatePromiseState.data != null){
        let ids = tracks.map(elem => elem.track.id);
        addAllTracks(playlistCreatePromiseState.data.id, ids);
        alert("Playlist was added to your account!");
      }
    }, [playlistCreatePromiseState, setPlaylistCreatePromiseState]);


    // Lifecycle
    function onMountedACB(){
        // Resolve promise. Get all data in generated playlist from firebase, add it to model.
        resolvePromise (generatedListPromise (props.model, props.model.generated.firebaseKey), playlistPromiseState, setPlaylistPromiseState);
        setPlayTrackState({play:true,tracks:tracksToIDList()});
        return;
    }

   
    return (
      <div>
        {waitForFirebase(playlistPromiseState) ||
        <div>
          <PlaylistView
            generatedTracks={tracks}
            generatedName={playlistName}
            removeTrack={removeTrackACB}
            setAudioPlayerSong={setAudioPlayerSongACB}
            setPlaylistName={setPlaylistNameACB}
            savePlaylistToSpotify={savePlaylistToSpotifyACB}
            removePlaylist={removePlaylistACB}
          ></PlaylistView>
          <AudioPlayer play={playTrackState.play} tracks={playTrackState.tracks}/>
        </div>}
      </div>
    );
    
  function tracksToIDList() {
      const list = tracks.map((element => {
          return "spotify:track:" + element.track.id;
      }));
      return list;
  }
  
    /* Event: onClick REMOVE /playlists/{playlist_id}/tracks */
  function removeTrackACB(id) {
    props.model.removeTrack(id);
  }

  /* Event: onInput set name of generated list */
  function setPlaylistNameACB(input) {
    props.model.setGeneratedName(input);
    props.model.setPrevName(input);
  }

  /* Event: onClick set audio player song */
  function setAudioPlayerSongACB(trackID) {
    setPlayTrackState({play:true, tracks:["spotify:track:" + trackID]});
  }

  function savePlaylistToSpotifyACB() {
    resolvePromise(createPlaylist(props.model.userid, playlistName), playlistCreatePromiseState, setPlaylistCreatePromiseState);
    
  }

  function removePlaylistACB(){
    console.log(props.model.generated.firebaseKey);
    props.model.removePrevPlaylist(props.model.generated.firebaseKey)
  }
}

export default Playlist;
