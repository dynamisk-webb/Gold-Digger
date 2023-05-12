import {useNavigate} from "react-router-dom"
import albumImg from "./../img/genericAlbumIcon.png";


function PlaylistView(props){

    const navigate = useNavigate(); // So React doesn't complain about React components
    console.log(props.generatedTracks);
    return (<div id="playlistContainer">
        <p id="playlistText">Here's your playlist!</p>
        <input id="playlistTitle" type="text" placeholder={props.generatedName} maxLength="50" onChange={setPlaylistNameACB}></input>
        <button id="addPlaylistButton" onClick={savePlaylistToSpotifyACB}>Add to account</button>
        <button id="deletePLaylistButton" onClick={removePlaylistACB}>Delete Playlist</button>
        {renderSave()}
        {renderUndo()}
        <button id="homeButton" onClick={returnHomeACB}></button>
        <div className="scrollable" id="trackContainer">
            {props.generatedTracks.filter(element => element.included).map(getSongInfoACB)}
        </div>
    </div>);

    // If the user has unsaved changes, render a save button
    function renderSave(){
        if(props.unsavedChanges)
            return (
                <div id="savePlaylistContainer">
                    <button id="savePlaylistButton"></button>
                    <p id="savePlaylistInfo">You have unsaved changes. </p>
                </div>
            )
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

        return (<div id="trackInfo" key={item.track.name}>
            <button id="playButton" onClick={playSongACB}></button>
            <img id="trackImg" src={albumImg} alt="albumImg"></img>
            {/*Should display more info in the future*/}
            <h2 className="cutText" id="trackName">{item.track.name}</h2>
            <p id="trackArtist">{item.track.artists.map(getArtistsACB)}</p>
            <p id="trackAlbum">{item.track.album.name}</p>
            <p id="trackTime">{/*item.track.time*/}3:31</p>
            <button id="trackRemove" onClick={removeTrackACB}></button>
        </div>);
    }
}

export default PlaylistView;