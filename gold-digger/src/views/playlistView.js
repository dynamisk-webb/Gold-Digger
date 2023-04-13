import {useNavigate} from "react-router-dom"
function PlaylistView(props){

    const navigate = useNavigate(); // So React doesn't complain about React components

    return (<div>
        <p>Playlist added to your spotify!</p>
        <h1>{props.generatedName}</h1>
        <button onClick={savePlaylistToSpotifyACB}>add list to your account</button>
        <button id="homeButton" onClick={returnHomeACB}></button>
        <div class="scrollable">
            {props.generatedTracks.map(getSongInfoACB)}
        </div>
    </div>);

    function savePlaylistToSpotifyACB(){
        props.savePlaylistToSpotify();
    }

    function returnHomeACB(){
        navigate("/");
    }

    
    function getSongInfoACB(item){
        return (<div>
            <img></img>
            {/*Should display more info in the future*/}
            <h2>{item.track.name}</h2>
        </div>);
    }
}

export default PlaylistView;