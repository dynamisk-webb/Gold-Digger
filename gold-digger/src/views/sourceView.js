import piano from "./../img/piano.png";

function SourceView(props){

    //TODO: make the playlist button into some form of input box
    return (<div id="sourceGrid">
            <h1 id="sourceTitle">Select a source</h1>
            <h2 id="sourceSubTitle">to generate a playlist from</h2>
            <button id="sourcePlaylist" onClick={setSourceACB}>From Playlist</button> 
            <button id="sourceSaved" onClick={setSourceACB}>From Saved Tracks</button>
            <img src={piano} id="pianoImage"></img>
    </div>);

    //TODO: make this work (depending on the solution provided for the playlist)
    function setSourceACB(evt){
        props.setSource(evt.target.value);
    }
}

export default SourceView;