import {useNavigate} from "react-router-dom"
import albumImg from "./../img/genericAlbumIcon.png";


function PlaylistView(props){

    const navigate = useNavigate(); // So React doesn't complain about React components

    return (<div id="playlistContainer">
        <p id="playlistText">Here's your playlist!</p>
        <input id="playlistTitle" type="text" placeholder={props.generatedName} maxLength="50" onChange={setPlaylistNameACB}></input>
        <button id="addPlaylistButton" onClick={savePlaylistToSpotifyACB}>add list to your account</button>
        <button id="homeButton" onClick={returnHomeACB}></button>
        <div className="scrollable" id="trackContainer">
            {props.generatedTracks.map(getSongInfoACB)}
        </div>
    </div>);

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
        function removeTrackACB(){
            props.removeTrack(item);
        }

        function getArtistsACB(artist) {
            return artist.name + " ";
        }

        return (<div id="trackInfo" key={item.track.name}>
            <img id="trackImg" src={albumImg}></img>
            {/*Should display more info in the future*/}
            <h2 id="trackName">{item.track.name}</h2>
            <p id="trackArtist">{item.track.artists.map(getArtistsACB)}</p>
            <p id="trackAlbum">{item.track.album.name}</p>
            <p id="trackTime">{/*item.track.time*/}3:31</p>
            <button id="trackRemove" onClick={removeTrackACB}></button>
        </div>);
    }
}

export default PlaylistView;