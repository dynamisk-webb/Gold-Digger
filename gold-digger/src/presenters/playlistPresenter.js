import PlaylistView from "../views/playlistView.js";
import { useEffect, useState } from "react";
import { generatedListPromise } from "../firebaseModel.js";
import resolvePromise from "../resolvePromise.js";
import waitForFirebase from "../views/waitForFirebase.js";
import AudioPlayer from "../views/audioPlayView.js";

import { createPlaylist, addAllTracks } from "../spotifySource.js";

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
    const [playTrackState, setPlayTrackState] = useState({play:false, offset:0, tracks:[]});
    const [tracksState, setTracksState] = useState([]);
    const [changesState, setChangesState] = useState([]);
    const [unsavedChangesState, setUnsavedChangesState] = useState(false);

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
        props.model.debugModelState("/playlist rerender");
    }

    let playlistName = props.model.generated.playlistName;

    const [playlistPromiseState, setPlaylistPromiseState] = useState({});
    const [playlistCreatePromiseState, setPlaylistCreatePromiseState] = useState({});

    useEffect (onMountedACB, [props.model]);

    useEffect(() =>{
      if(playlistCreatePromiseState.data != null){
        let ids = tracksState.map(elem => elem.track.id);
        addAllTracks(playlistCreatePromiseState.data.id, ids);
        alert("Playlist was added to your account!");
      }
    }, [playlistCreatePromiseState, setPlaylistCreatePromiseState]);

    useEffect(() =>{
      if(playlistPromiseState.data != null) {
        setPlayTrackState({play:false,offset:0,tracks:tracksToIDList()});
        setTracksState(props.model.generated.tracks.map(obj => ({...obj, included:true})));
      }
    }, [playlistPromiseState]);

    // Lifecycle
    function onMountedACB(){
        // Resolve promise. Get all data in generated playlist from firebase, add it to model.
        resolvePromise (generatedListPromise (props.model, props.model.generated.firebaseKey), playlistPromiseState, setPlaylistPromiseState);
        return;
    }

   
    return (
      <div>
        {waitForFirebase(playlistPromiseState) ||
        <div>
          <PlaylistView
            generatedTracks={tracksState}
            generatedName={playlistName}
            removeTrack={removeTrackACB}
            retrieveTrack={retrieveTrackACB}
            changesList={changesState}
            setAudioPlayerSong={setAudioPlayerSongACB}
            setPlaylistName={setPlaylistNameACB}
            savePlaylistToSpotify={savePlaylistToSpotifyACB}
            removePlaylist={removePlaylistACB}
            updatePlaylist={updatePlaylistACB}
            unsavedChanges={unsavedChangesState}
          ></PlaylistView>
          {!playTrackState.tracks.length || <AudioPlayer play={false} offset={playTrackState.offset} tracks={playTrackState.tracks}/>}
        </div>}
      </div>
    );
    
  function tracksToIDList() {
      const list = tracksState.map((element => {
          return "spotify:track:" + element.track.id;
      }));
      return list;
  }
  
  
  /* Event: onClick REMOVE /playlists/{playlist_id}/tracks */
function removeTrackACB(id) {
  let tracks = tracksState;
  let foundIndex = tracks.findIndex(x => x.track.id == id);
  tracks[foundIndex].included = false;
  setTracksState(tracks);

  // Update the changes list to keep track of removed tracks
  let changes = changesState;
  changes.push(tracks[foundIndex].track.id)
  setChangesState(changes);

  // Let the user know they have unsaved changes
  setUnsavedChangesState(true);

  notifyACB();
}

/* Event: onClick REVERT deletion*/
function retrieveTrackACB(){
  
  let id = changesState[changesState.length - 1];
  
  let tracks = tracksState;
  let foundIndex = tracks.findIndex(x => x.track.id == id);
  tracks[foundIndex].included = true;
  
  let changes = changesState;
  changes.pop();
  
  setChangesState(changes);

  notifyACB();
}

  /* Event: onInput set name of generated list */
  function setPlaylistNameACB(input) {
    props.model.setGeneratedName(input);
    props.model.setPrevName(input);
    setUnsavedChangesState(true);
  }

  /* Event: onClick set audio player song */
  function setAudioPlayerSongACB(trackID) {
    const i = playTrackState.tracks.indexOf("spotify:track:"+trackID);
    setPlayTrackState({play:false,offset:i,tracks:tracksToIDList()});
  }

  /* Event: onClick UPDATE playlist*/
  function updatePlaylistACB(){

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
