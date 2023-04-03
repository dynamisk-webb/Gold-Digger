function prevlistView(props){
    return (<div class="scrollable">
        {props.prevPlaylist.map(songInfoACB)}
    </div>);

    function songInfoACB(playlist){
        return (
            <div>
                {playlist.name}
            </div>);
    }
}

export default prevlistView;