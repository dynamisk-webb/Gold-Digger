function PrevlistView(props){
    return (<div className="scrollable">
        previous playlist wow
        {/*props.prevPlaylist.map(songInfoACB)*/}
    </div>);

    function songInfoACB(playlist){
        return (
            <div>
                {playlist.name}
            </div>);
    }
}

export default PrevlistView;