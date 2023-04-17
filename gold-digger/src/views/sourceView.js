import piano from "./../img/piano.png";
import {useNavigate} from "react-router-dom"
import { useState } from "react";

function SourceView(props){
    const navigate = useNavigate(); // So React doesn't complain about React components
    const [input, setInput] = useState(false);

    //TODO: make the playlist button into some form of input box
    return (<div id="sourceGrid">
            <h1 id="sourceTitle">Select a source</h1>
            <h2 id="sourceSubTitle">to generate a playlist from</h2>
            {input  ?<input id="sourceInputPlaylist" onKeyDown={handleButtonpressACB} type="text" placeholder="https://open.spotify.com/playlist/.."></input>
                    :<button id="sourceButtonPlaylist" onClick={updateSearchbarACB}>From Playlist</button>}
            <button id="sourceSaved" onClick={setSourceSavedACB}>From Saved Tracks</button>
            <img src={piano} id="pianoImage"></img>
    </div>);

    //TODO: make this work (depending on the solution provided for the playlist)
    
    function updateSearchbarACB(){
        setInput(true);
    }

    function setSourceSavedACB(evt){
        navigate("/genre");
    }

    function handleButtonpressACB(evt){
        let text = "";
        function setSourcePlaylist(){
            navigate("/genre");
            props.setSource(text);
        }

        if(evt.key === "Enter"){
            text = document.getElementById("sourceInputPlaylist").value;
            setSourcePlaylist()
        }
    }
}

export default SourceView;