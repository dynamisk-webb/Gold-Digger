import piano from "./../img/piano.png";
import {useNavigate} from "react-router-dom"
import { useState } from "react";

function SourceView(props){
    const navigate = useNavigate(); // So React doesn't complain about React components
    const [input, setInput] = useState(false);

    return (<div id="sourceGrid">
            <h1 id="sourceTitle">Select a source</h1>
            <h2 id="sourceSubTitle">to generate a playlist from</h2>
            {input  ?<input id="sourceInputPlaylist" onKeyDown={handlePlaylistInputACB} type="text" placeholder="https://open.spotify.com/playlist/.."></input>
                    :<button id="sourceButtonPlaylist" onClick={updateSearchbarACB}>From Playlist</button>}
            <button id="sourceSaved" onClick={setSourceSavedACB}>From Saved Tracks</button>
            <img src={piano} id="pianoImage"></img>
    </div>);
    
    // Display input-field when playlist button is pressed
    function updateSearchbarACB(){
        setInput(true);
    }

    function setSourceSavedACB(evt){
        navigate("/genre");
        props.setSource(""); // Set source empty when taking from saved tracks
    }

    
    function handlePlaylistInputACB(evt){
        let url = "";
        function setSourcePlaylist(){
            navigate("/genre");
            props.setSource(url);
        }

        if(evt.key === "Enter"){
            url = document.getElementById("sourceInputPlaylist").value;
            setSourcePlaylist()
        }
    }
}

export default SourceView;