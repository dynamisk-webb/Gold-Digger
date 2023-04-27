function PrevlistView(props){
    return (<div id="prevListsContainer">
        <h3 id="prevListsTitle"> Previously generated playlists</h3>
        <div className="scrollable"  id="prevLists">
        {props.prevPlaylists.map(songInfoACB)}
        </div>
    </div>);

    function songInfoACB(playlist){
        function setCurrentPlaylistACB(){
            props.setCurrentPlaylist(playlist.firebaseID);
        }

        return (
            <button onClick={setCurrentPlaylistACB} id="prevList" >
                {playlist.name}
            </button>);
    }

}

export default PrevlistView;