/*
TODO





*/

import PlaylistView from "../views/playlistView.js";
import { redirect } from "react-router-dom";


/**
 * Sends a playlist containing all tracks to props. 
 * Will present the "finished" playlist to the user. I.e. send the generated playlist to the PlaylistView
 */
function Playlist (props) {

    let tracks = [];

    // lifecycle
    function onMount(){

        // Lifecycle: GET the playlist. Set name to new input name
        tracks = getTracks(props.playlistID);
        // list of tracks will contain:
                    // title
                    // artist
                    // album
                    // time

        function onMounted() {
            // do stuff
            return;
        }
        return;
    }

    return (
        <PlaylistView generatedTracks={tracks} removeTrack={removeTrackACB} getPlaylistURL={getPlaylistURLACB} setAudioPlayerSong={setAudioPlayerSongACB} returnHome={returnHomeACB}></PlaylistView>
    );

    
    /* Event: onClick REMOVE /playlists/{playlist_id}/tracks */
    function removeTrackACB() {
        // TODO;
        // props.model.removeTrack;
    }
    /* Event: onClick Get playlist url and copy to clipboard */
    function getPlaylistURLACB( ) {
        // https://stackoverflow.com/questions/65930199/copy-active-browsers-url-to-clipboard-with-reactjs
   
    }
    /* Event: onClick set audio player song */
    function setAudioPlayerSongACB() {

    }
    /* Event: onClick return to Home */
    function returnHomeACB() {
        return redirect("/home");
    }
    // Event: onInput PUT /playlist/{playlist_id}
    function putPlaylistACB () {
        //TODO
    }
}

export default Playlist;
