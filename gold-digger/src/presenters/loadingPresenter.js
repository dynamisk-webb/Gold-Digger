/*
TODO

- Props: Parameters (tempo, loudness, instrumentalness, danceable, acoustic)
- Component state members: Saved tracks
- Lifecycle: 
    GET /playlist/{playlist_id}/tracks
        or
    GET /me/tracks
    --> 
    Save the list of tracks in saved tracks
    --> 
    Filter tracks
        Filter genres
        Filter two lists of wanted artists and one without unwanted and wanted
        Merge lists (in some kind of random amount if we want to limit the number)    
    --> 
    set generated object in model with call to setGenerated
    add previous list id [...prevlistids, generated id]
    --> 
    reset parameters with diggerModel fn
    -->
    setLoadingState to true


*/
import LoadingView from "../views/loadingView";
import AudioPlayer from "../views/audioPlayView";

import { useState, useEffect } from "react";


function Loading(props) {

    // state for visual feedback when loading is done
    const [loadingState, setLoadingState] = useState({});

    useEffect(onMountedACB, [props.model]);

    return (
        <div>
            <LoadingView loadingState={loadingState}/>
            <AudioPlayer/>
        </div>
    );

    function onMountedACB() {
        /* TODO Write lifecycle as above with helper function where relevant */
    
        // temp: set playlist to the fixed one already in the model
        props.model.setGenerated(props.model.generated);
    }
}


export default Loading;