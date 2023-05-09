import LoadingView from "../views/loadingView";
import AudioPlayer from "../views/audioPlayView";

import { useState, useEffect, useCallback } from "react";
import { getSavedTracks, getTracksParams, getTracksPlaylist, getAllTracks, playTrack } from "../spotifySource.js";

// temp import
import fixedPlaylist from "../test/fixedList";
import fixedFeatures from "../test/fixedFeatures";


import { flushSync } from 'react-dom';



function Loading(props) {
    // state for visual feedback when loading is done
    const [loadingDone, setloadingDone] = useState(false);
    const [playerState, setPlayerState] = useState(false);

    // Objects to save tracks from Spotify in
    let tracks = {}; // final tracklist
    let trackIDs = []; // keep track of ids when filtering
    let trackInformation = []; // info includes artist, genre etc
    let trackAudioFeatures = []; // info includes tempo, loudness etc
    let newGenerated = {};

    return (
        <div>
            <LoadingView loadingState={loadingDone} />
            <AudioPlayer track="spotify:track:5PUawWFG1oIS2NwEcyHaCr" />
        </div>
    );
}
    
export default Loading;