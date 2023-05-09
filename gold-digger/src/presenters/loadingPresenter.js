import LoadingView from "../views/loadingView";
import AudioPlayer from "../views/audioPlayView";

import { useState, useEffect } from "react";
import { getSavedTracks, getTracksParams, getTracksPlaylist, getTracks } from "../spotifySource.js";

// temp import
import fixedPlaylist from "../test/fixedList";
import fixedFeatures from "../test/fixedFeatures";


import { flushSync } from 'react-dom';



function Loading(props) {
    // state for visual feedback when loading is done
    const [loadingDone, setloadingDone] = useState(false);

    // Objects to save tracks from Spotify in
    let tracks = {}; // final tracklist
    let trackIDs = []; // keep track of ids when filtering
    let trackInformation = {}; // info includes artist, genre etc
    let trackAudioFeatures = {}; // info includes tempo, loudness etc
    let newGenerated = {};

    useEffect(onMountedACB, []);

    return (
        <div>
            <LoadingView loadingState={loadingDone}/>
            <AudioPlayer/>
        </div>
    );

    function onMountedACB() {
        // create and save generated list from source
        /* 
        * get list of ids from source
        * get audio features for those ids
        * filter ids based on audiofeatures
        * 
        * get trackinformation based on filtered ids
        * filter genre and excluded artists
        * create final playlist with a mix of wanted and neutral artists
        */

        getTrackIDsFromSource();
        getTrackAudioFeatures();
        filterOnAudioFeatParams();

        getTracksFromFilteredIDs();
        filterOnGenreAndExclArtist();
        setTracksBasedOnIncludedArtists();
        
        setNewGenerated();

        //loading done
        props.model.resetParams();

        // TODO async fn, make sure it actually updates before navigation
        props.setModel(props.model);

        setloadingDone(true);
    }


    /**
     * API-related
     */

    // Returns 
    function getTrackIDsFromSource() {
        if (props.model.source) { // get tracks from provided source
            // TODO implement
            // getTracksPlaylist
        } else { // get from saved songs
            // TODO implement
            // getSavedTracks
        }    
    }

    function getTrackAudioFeatures() {
        // TODO
        // should use trackIDs to set trackAudioFeatures
        // getTracksParams(idList), takes an array of track ids in string format

        // temp:
        let trackAudioFeatures = fixedFeatures;
    }

    function getTracksFromFilteredIDs() {
        // TODO
        // should use trackIDs to set trackInformation
        // getTracks(idList)
    }


    /**
     * Filter functions
     */
    function filterOnAudioFeatParams() {
        // TODO
       /* 
        filter trackAudioFeatures from all songs that fall outside of set parameters
         * tempo (range)
         * loudness (range)
         * instrumentalness (range)
         * danceable (switch, decide threshhold)
         * acoustic (switch, decide threshhold)
        
        update trackIDs to only include trackIDs left in trackAudioFeatures
        */
    }

    function filterOnGenreAndExclArtist() {
        // TODO
        /* 
         filter trackInformation from all songs that fall outside of set parameters
         * genres
         * excluded artists
        */
    }

    function setTracksBasedOnIncludedArtists() {
        // TODO implement
        /*
        create the following lists based on (the now filtered) trackInformation
        * a list with only tracks from wanted artists, max 3 tracks from each wanted artist
        * a list with only tracks from neutral artists, scrambled (excluded artist should have been removed in filterTracksNotMatchingParams)
        
        if list with included artists has > 50 tracks, scramble and set tracks to the 50 first
        if list with included artists has < 50 tracks, add from other list so that we have 50. Scramble and return.
        */
    }

    function setNewGenerated() {
        newGenerated.tracks = fixedPlaylist.tracks; // TODO set to actual tracks
        newGenerated.playlistName = 'Default Playlist';
       
        // Set firebasekey based on the current highest key
        // NOTE: if we implement a restore fn it needs to sort prevPlaylist based on firebaseKey
        if (props.model.prevPlaylists.length) {
            let playlistWithCurrentHighestKey = props.model.prevPlaylists[props.model.prevPlaylists.length-1];
            newGenerated.firebaseKey = playlistWithCurrentHighestKey.firebaseKey + 1;
        } else {
            newGenerated.firebaseKey = 0;
        }

        props.model.addToPrevPlaylists({playlistName:newGenerated.playlistName, firebaseKey:newGenerated.firebaseKey}); 
        props.model.setGenerated(newGenerated);
    }
}


export default Loading;