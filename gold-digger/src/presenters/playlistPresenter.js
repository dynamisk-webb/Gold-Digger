/*
TODO

Lifecycle: GET the playlist
Event: onInput PUT /playlist/{playlist_id}
Set name to new input name



*/

import PlaylistView from "../views/playlistView.js";
import { redirect } from "react-router-dom";

/**
 * Sends a playlist containing all tracks to props.
 * Will present the "finished" playlist to the user. I.e. send the generated playlist to the PlaylistView
 */
function Playlist(props) {
  //let tracks = [{title: "hej", artists: "test", album: "no", time:"yes"}];
  let tracks = props.model.generated.tracks;
  let playlistName = props.model.generated.playlistName;

  // lifecycle
  function onMount() {
    //tracks = getTracks(props.playlistID);
    // list of tracks will contain:
    // title
    // artist
    // album
    // time

    /*<h2>{track.title}</h2>
            <p>{track.artists}</p>
            <p>{track.album}</p>
            <p>{track.time}</p> */

    function onMounted() {
      // do stuff
      return;
    }
    return;
  }

  return (
    <PlaylistView
      generatedTracks={tracks}
      generatedName={playlistName}
      removeTrack={removeTrackACB}
      getPlaylistURL={getPlaylistURLACB}
      setPlaylistName={setPlaylistNameACB}
      setAudioPlayerSong={setAudioPlayerSongACB}
      returnHome={returnHomeACB}
      savePlaylistToSpotify={savePlaylistToSpotifyACB}
    ></PlaylistView>
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
    
    // =============================
    // Firebase tests, SHOULD BE REMOVED
    
    // Test for editing a previously saved list to firebase
    //props.model.setGeneratedName("Svampplockning i gryningsljus");
    
    // Test for adding a list to firebase:
    props.model.setGenerated(props.model.generated);
    alert("Playlist has been added to your account!");
    // =============================
  }

}

export default Playlist;
