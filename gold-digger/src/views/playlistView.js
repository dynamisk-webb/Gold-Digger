import {useNavigate} from "react-router-dom"
function PlaylistView(props){

    const navigate = useNavigate(); // So React doesn't complain about React components

    return (<div>
        <p>Playlist added to your spotify!</p>
        <h1>Generic Playlist Name uwu #1</h1>
        <button onClick={copyLinkACB()}>copy link</button>
        <button onClick={returnHomeACB()}>return home</button>
        <div class="scrollable">
            {props.generatedTracks.map(getSongInfoACB)}
        </div>
    </div>);

    function copyLinkACB(){

    }

    function returnHomeACB(){
        navigate("/home");
    }

    
    function getSongInfoACB(track){
        return (<div>
            <img></img>
            <h2>{track.title}</h2>
            <p>{track.artists}</p>
            <p>{track.album}</p>
            <p>{track.time}</p>
        </div>);
    }
}

export default PlaylistView;