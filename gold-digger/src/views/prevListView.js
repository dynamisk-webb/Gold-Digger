import {useNavigate} from "react-router-dom"

function PrevlistView(props){
    const navigate = useNavigate(); // So React doesn't complain about React components

    return (<div id="prevListsContainer">
        <h3 id="prevListsTitle"> Previously generated playlists</h3>
        <div className="scrollable"  id="prevLists">
        {props.prevPlaylists.map(songInfoACB)}
        </div>
    </div>);

    function songInfoACB(playlist){
        function setCurrentPlaylistACB(){
            props.setCurrentPlaylist(playlist.playlistName, playlist.firebaseKey);
            navigate("/playlist");
        }

        return (
            <button onClick={setCurrentPlaylistACB} id="prevList" >
                {playlist.playlistName}
            </button>);
    }

}

export default PrevlistView;