function SourceView(props){

    //TODO: make the playlist button into some form of input box
    return (<div>
            <h1>Select a source</h1>
            <p>to generate a playlist from</p>
            <button onClick={setSourceACB}>From Playlist</button> 
            <button onClick={setSourceACB}>From Saved Tracks</button>

    </div>);

    //TODO: make this work (depending on the solution provided for the playlist)
    function setSourceACB(evt){
        props.setSource(evt.target.value);
    }
}

export default SourceView;