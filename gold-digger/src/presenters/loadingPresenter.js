import LoadingView from "../views/loadingView";
import AudioPlayer from "../views/audioPlayView";

import { useState, useEffect } from "react";
import { getSavedTracks, getTracksParams, getTracksPlaylist, getAllTracks } from "../spotifySource.js";

// temp import
import fixedPlaylist from "../test/fixedList";
import fixedFeatures from "../test/fixedFeatures";


import { flushSync } from 'react-dom';
import DiggerModel from "../DiggerModel";



function Loading(props) {
    // debug
    // props.model.debugModelState("/loading init");

    // add observer for notifications for state changes
    useEffect(addObserverOnCreatedACB, [])
    const [, forceReRender ]= useState(); 

    function addObserverOnCreatedACB() {
        props.model.addObserver(notifyACB);

        function removeObserverOnDestroyACB() {
            props.model.removeObserver(notifyACB);
        }
        return removeObserverOnDestroyACB;
    }

    // rerender on state change
    function notifyACB() {
        forceReRender({});
        //props.model.debugModelState("/loading rerender");
    }


    // state for visual feedback when loading is done
    const [loadingDone, setloadingDone] = useState(false);

    // Objects to save tracks from Spotify in
    let tracks = {}; // final tracklist
    let trackIDs = []; // keep track of ids when filtering
    let trackInformation = []; // info includes artist, genre etc
    let trackAudioFeatures = []; // info includes tempo, loudness etc
    let newGenerated = {};

    
    useEffect(onMountedACB, []);

    return (
        <div>
            <LoadingView loadingState={loadingDone} viewPlaylist={viewPlaylistACB}/>
            <AudioPlayer play={true} tracks={["spotify:track:0hl8k492sfcfLQudNctEiR"]}/>
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
        trackAudioFeatures = fixedFeatures;
    }

    function getTracksFromFilteredIDs() {
        // TODO
        // should use trackIDs to set trackInformation
        // getAllTracks(idList)
        trackInformation = fixedPlaylist.tracks;
    }


    /**
     * Filter functions
     */

    /**
     * filter trackAudioFeatures from all songs that fall outside of set parameters
     * - tempo (range)
     * - loudness (range)
     * - instrumentalness (range)
     * - danceability (switch, decide threshhold)    0.75<
     * - acousticness threshhold)     0.75<
     * 
     * Updates trackIDs to only include trackIDs left in trackAudioFeatures
     */
    function filterOnAudioFeatParams() {
        function chosenParamsACB(track) {
            // Our decided thresholds
            const danceMinValue = 0.75;
            const acousticMinValue = 0.75;

            let includeBasedOnAcousticness = true;
            let includeBasedOnDanceability = true;

            // If user wants a danceable list, only include danceable songs. Else, include full range. 
            if (props.model.danceable) {
                includeBasedOnDanceability = (track.danceability >= danceMinValue);
            }

            // If user wants an acoustic list, only include such songs. Else, include full range. 
            if (props.model.acoustic) {
                includeBasedOnAcousticness = (track.acousticness >= acousticMinValue);
            }
            
            // FixedFeatures on the left, compare with values from Diggermodel on the right.
            // important: danceability, acousticness in FixedFeatures
            //            danceable, acoustic in DiggerModel
            return (track.tempo >= props.model.tempo.min &&
                    track.tempo <= props.model.tempo.min &&
                    track.loudness >= props.model.loudness.min &&
                    track.loudness <= props.model.louness.max &&
                    track.instrumentalness >= props.model.instrumentalness.min/100 && // 0-1 in API, % in model
                    track.instrumentalness <= props.model.instrumentalness.max/100 &&
                    includeBasedOnDanceability && includeBasedOnAcousticness);
        }

        function extractTrackIDsACB(track) {
            return track.id;
        }

        trackIDs = trackAudioFeatures.filter(chosenParamsACB).map(extractTrackIDsACB);
    }

    /** 
     * filter trackInformation from all songs that fall outside of set parameters
     * - genres
     * - excluded artists
     */
    function filterOnGenreAndExclArtist() {
        // return false if artist is unwanted. 
        function markUnwantedArtistsACB(artist) {
            if (props.model.excludedArtists.includes(artist))
                return false;
            return true;
        }

        // return true if genre is wanted
        function markWantedGenreACB(genre) {
            return props.model.genres.includes(genre);         
        }

        /* filter for each current track */
        function filterGenreAndArtistACB(currentTrack) {
            // go through genres
            let trackContainsWantedGenre = true;
            if (props.model.genres.length != 0) { // user has selected specific genres
                let wantedStatusOfGenres = [true] // TODO currentTrack.track.genres.map(markWantedGenreACB);
                trackContainsWantedGenre = wantedStatusOfGenres.includes(true);
            }
           
            // go through artist array
            let wantedStatusofArtists = currentTrack.track.artists.map(markUnwantedArtistsACB);
            let trackContainsUnwantedArtist = wantedStatusofArtists.includes(false);

            return (!trackContainsUnwantedArtist && trackContainsWantedGenre);
        }
        
        trackInformation = trackInformation.filter(filterGenreAndArtistACB);
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
        const newGenerated = {};
        
        // Set firebasekey based on the current highest key
        if (props.model.prevPlaylists.length) {
            // NOTE: if restore fn is implemented it needs to sort prevPlaylist based on firebaseKey
            let playlistWithCurrentHighestKey = props.model.prevPlaylists[props.model.prevPlaylists.length-1];
            newGenerated.firebaseKey = playlistWithCurrentHighestKey.firebaseKey + 1;
        } else {
            newGenerated.firebaseKey = 0;
        }

        newGenerated.tracks = fixedPlaylist.tracks; // TODO set to actual tracks
        newGenerated.playlistName = 'Playlist #' + newGenerated.firebaseKey;

        props.model.addToPrevPlaylists({playlistName:newGenerated.playlistName, firebaseKey:newGenerated.firebaseKey}); 
        props.model.setGenerated(newGenerated);
    }

    function viewPlaylistACB() {
        props.model.resetParams();
    }
}


export default Loading;