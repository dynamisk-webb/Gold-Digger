import {useNavigate} from "react-router-dom"
import albumImg from "./../img/genericAlbumIcon.png";


function PlaylistView(props){

    const navigate = useNavigate(); // So React doesn't complain about React components
    return (<div id="playlistContainer">
        <p id="playlistText">Here's your playlist!</p>
        <input id="playlistTitle" type="text" placeholder={props.generatedName} maxLength="50" onChange={setPlaylistNameACB}></input>
        <button id="addPlaylistButton" onClick={savePlaylistToSpotifyACB}>Add to account</button>
        <button id="deletePLaylistButton" onClick={removePlaylistACB}>Delete Playlist</button>
        {renderUndo()}
        {renderSave()}
        <button id="homeButton" onClick={returnHomeACB}></button>
        <div className="scrollable" id="trackContainer">
            {renderPlaylist()}
        </div>
    </div>);

    // If the user has unsaved changes, render a save button
    function renderSave(){
        if(props.changesList.length != 0)
        return (
            <div id="savePlaylistContainer">
                    <p id="savePlaylistInfo">Your changes have been saved. </p>
                </div>);

        /*
        if(props.unsavedChanges)
            return (
                <div id="savePlaylistContainer">
                    <button id="savePlaylistButton"></button>
                    <p id="savePlaylistInfo">You have unsaved changes. </p>
                </div>
            )*/
    }

    // If the user has deleted a song, render an undo button
    function renderUndo(){
        if(props.changesList.length != 0)
            return <button id="undoChangeButton" onClick={retrieveTrackACB}></button>;
    }

    function retrieveTrackACB(){
        props.retrieveTrack();
    }

    function removePlaylistACB(){
        props.removePlaylist();
        navigate("/");
        
    }

    function savePlaylistToSpotifyACB(){
        props.savePlaylistToSpotify();
    }

    function returnHomeACB(){
        navigate("/");
    }

    function setPlaylistNameACB(evt) {
        props.setPlaylistName(evt.target.value);
    }

    function renderPlaylist(){
        if(props.generatedTracks.length != 0) 
            return props.generatedTracks.filter(element => element.included).map(getSongInfoACB);
        else return <p id="noPlaylistText">You have removed all songs from your generated playlist! Did you really dislike it that much? </p>
    }
    
    function getSongInfoACB(item){
        function playSongACB(){
            props.setAudioPlayerSong(item.track.id);
        }
        function removeTrackACB(){
            props.removeTrack(item.track.id);
        }

        function getArtistsACB(artist) {
            return artist.name + " ";
        }

        function renderImg(){
            if(item.track.album.images){
                if(item.track.album.images[1]){
                    return <img src={item.track.album.images[1].url} id="trackImg"></img>
                } else return <img src={albumImg} id="trackImg"></img>
            }else return <img src={albumImg} id="trackImg"></img>
          }

        return (<div id="trackInfo" key={item.track.name}>
            <button id="playButton" onClick={playSongACB}></button>
            {renderImg()}
            <h2 className="cutText" id="trackName">{item.track.name}</h2>
            <p id="trackArtist">{item.track.artists.map(getArtistsACB)}</p>
            <p id="trackAlbum">{item.track.album.name}</p>
            <p id="trackTime">{/*item.track.time*/}3:31</p>
            <button id="trackRemove" onClick={removeTrackACB}></button>
        </div>);
    }
}

export default PlaylistView;