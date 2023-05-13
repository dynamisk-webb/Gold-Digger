import piano from "./../img/piano.png";
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";

function SourceView(props){
    const navigate = useNavigate(); // So React doesn't complain about React components
    const [input, setInput] = useState(false);

    // Once the URL is validated
    useEffect(() => {
        if(props.validURL)
            navigate("/genre");
      }, [props.validURL]);

    return (<div id="sourceGrid">
            <button id="returnHomefromSource" onClick={goBackACB}></button>
            <h2 id="sourceNoTitle">Step 1 of 4</h2>
            <h1 id="sourceTitle">Select a source</h1>
            <h2 id="sourceSubTitle">to generate a playlist from</h2>
            {input  ?<input id="sourceInputPlaylist" onKeyDown={setSourcePlaylistACB} type="text" placeholder="https://open.spotify.com/playlist/.."></input>
                    :<button id="sourceButtonPlaylist" onClick={updateSearchbarACB}>From Playlist</button>}
            <button id="sourceSaved" onClick={setSourceSavedACB}>From Saved Tracks</button>
            <img src={piano} id="pianoImage"></img>
    </div>);

    // navigate home 
    function goBackACB(){
        navigate("/");
    }
    
    // Display input-field when playlist button is pressed
    function updateSearchbarACB(){
        setInput(true);
    }

    function setSourceSavedACB(evt){
        navigate("/genre");
        props.setSourceSaved(); // Set source empty when taking from saved tracks
    }
    
    function setSourcePlaylistACB(evt){
        let url = "";

        if(evt.key === "Enter"){
            url = document.getElementById("sourceInputPlaylist").value;
            props.setSource(url);
        }
    }
}

export default SourceView;