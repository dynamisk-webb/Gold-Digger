import LoadingView from "../views/loadingView";
import AudioPlayer from "../views/audioPlayView";

import { useState, useEffect } from "react";

// temp import
import fixedPlaylist from "../test/fixedList";


function Loading(props) {
    // state for visual feedback when loading is done
    const [loadingDone, setloadingDone] = useState(false);

    // Objects to save tracks from Spotify in
    let tracks = {};
    let newGenerated = {};

    useEffect(onMountedACB, [props.model]);

    return (
        <div>
            <LoadingView loadingState={loadingDone}/>
            <AudioPlayer/>
        </div>
    );

    function onMountedACB() {
        // create and save generated list from source
        getTracksFromSource();
        filterTracksNotMatchingParams();
        setTracksBasedOnIncludedArtists();
        setNewGenerated();
    
        // loading done
        props.model.resetParams();
        setloadingDone(true);
    }

    // Get tracks from source and save to component state
    function getTracksFromSource() {
        if (props.model.source) { // get tracks from provided source
            // TODO implement
        } else { // get from saved songs
            // TODO implement
        }

        // temp: set tracks to  the ones from the fixed playlist
        tracks = fixedPlaylist.tracks;
    }

    function filterTracksNotMatchingParams() {
        let filteredTracks = tracks;
        
        // TODO implement
        /*
         remove all songs that falls outside of set parameters
         * genres
         * excluded artists
         * tempo (range)
         * loudness (range)
         * instrumentalness (range)
         * danceable (switch, decide threshhold)
         * acoustic (switch, decide threshhold)
        */
        
        tracks = filteredTracks;
    }

    function setTracksBasedOnIncludedArtists() {
        // TODO implement
        /*
        create the following lists 
        * a list with only tracks from wanted artists, max 3 tracks from each wanted artist
        * a list with only tracks from neutral artists, scrambled (excluded artist should have been removed in filterTracksNotMatchingParams)
        
        if list with included artists has > 50 tracks, scramble and return the 50 first
        if list with included artists has < 50 tracks, add from other list so that we have 50. Scramble and return.
        */
    }

    function setNewGenerated() {
        newGenerated.tracks = tracks;
        newGenerated.playlistName = 'Default Playlist';
        props.model.setGenerated(newGenerated);
    }
}


export default Loading;