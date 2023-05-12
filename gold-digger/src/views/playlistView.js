import {useNavigate} from "react-router-dom"
import albumImg from "./../img/genericAlbumIcon.png";


function PlaylistView(props){

    const navigate = useNavigate(); // So React doesn't complain about React components

    return (<div id="playlistContainer">
        <p id="playlistText">Here's your playlist!</p>
        <input id="playlistTitle" type="text" placeholder={props.generatedName} maxLength="50" onChange={setPlaylistNameACB}></input>
        <button id="addPlaylistButton" onClick={savePlaylistToSpotifyACB}>Add to account</button>
        <button id="deletePLaylistButton" onClick={removePlaylistACB}>Delete Playlist</button>
        <button id="homeButton" onClick={returnHomeACB}></button>
        <div className="scrollable" id="trackContainer">
            {props.generatedTracks.map(getSongInfoACB)}
        </div>
    </div>);

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