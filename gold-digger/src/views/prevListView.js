/**
 * PrevlistView renders a view displaying a list of previously generated playlists.
 */

import { useNavigate } from "react-router-dom"

function PrevlistView(props) {

    // Variables
    const navigate = useNavigate();

    // Functions

    /* Render the previous playlist if there are any playlists */
    function renderPrevPlaylist() {
        if (props.prevPlaylists.length != 0) {
            return props.prevPlaylists.map(playlistInfoACB);
        }
        else return <p id="prevListText">Create some playlists to see them here!</p>
    }

    /* Retrieve info about the playlist */
    function playlistInfoACB(playlist) {
        function setCurrentPlaylistACB() {
            props.setCurrentPlaylist(playlist.playlistName, playlist.firebaseKey);
            navigate("/playlist");
        }

        return (
            <button onClick={setCurrentPlaylistACB} id="prevList" key={playlist.firebaseKey}>
                {playlist.playlistName}
            </button>);
    }

    return (<div id="prevListsContainer">
        <h3 id="prevListsTitle"> Previously generated playlists</h3>
        <div className="scrollable" id="prevLists">
            {renderPrevPlaylist()}
        </div>
    </div>);
}

export default PrevlistView;