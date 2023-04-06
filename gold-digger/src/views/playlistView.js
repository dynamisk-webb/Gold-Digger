function PlaylistView(props){
    return (<div class>
        <p>Playlist added to your spotify!</p>
        <h1>Generic Playlist Name uwu #1</h1>
        <button onClick={copyLinkACB()}></button>
        <button onClick={returnHomeACB()}></button>
        <div class="scrollable">
            {props.generatedTracks.map(getSongInfoACB)}
        </div>
    </div>);

    
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