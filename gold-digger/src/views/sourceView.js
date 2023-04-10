import piano from "./../img/piano.png";
import {useNavigate} from "react-router-dom"

function SourceView(props){
    const navigate = useNavigate(); // So React doesn't complain about React components

    //TODO: make the playlist button into some form of input box
    return (<div id="sourceGrid">
            <h1 id="sourceTitle">Select a source</h1>
            <h2 id="sourceSubTitle">to generate a playlist from</h2>
            <button disabled id="sourcePlaylist" onClick={setSourceACB}>From Playlist</button> 
            <button id="sourceSaved" onClick={setSourceACB}>From Saved Tracks</button>
            <img src={piano} id="pianoImage"></img>
    </div>);

    //TODO: make this work (depending on the solution provided for the playlist)
    function setSourceACB(evt){
        navigate("/genre");
        props.setSource(evt.target.value);
    }
}

export default SourceView;