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


/**
 * Sends a playlist containing all tracks to props.
 * Will present the "finished" playlist to the user. I.e. send the generated playlist to the PlaylistView
 */

function Playlist (props) {

    let tracks = props.model.generated.tracks;
    let playlistName = props.model.generated.playlistName;

    const [playlistPromiseState, setPlaylistPromiseState] = useState({});

    useEffect (onMountedACB, []);

    // Lifecycle
    function onMountedACB(){

        // Resolve promise. Get all data in generated playlist from firebase, add it to model.
        // NOTE TO SELF: add this back in.
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


    return (
      <div>
        {waitForFirebase(playlistPromiseState) ||
        <PlaylistView
          generatedTracks={tracks}
          generatedName={playlistName}
          removeTrack={removeTrackACB}
          getPlaylistURL={getPlaylistURLACB}
          setAudioPlayerSong={setAudioPlayerSongACB}
          setPlaylistName={setPlaylistNameACB}
          returnHome={returnHomeACB}
          savePlaylistToSpotify={savePlaylistToSpotifyACB}
        ></PlaylistView>}
      </div>
    );

    
    /* Event: onClick REMOVE /playlists/{playlist_id}/tracks */
  function removeTrackACB() {
    // TODO;
    // props.model.removeTrack;
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
    
    
    alert("Should add playlist to users Spotify account (not implemented yet)");
  }
}

export default Playlist;
