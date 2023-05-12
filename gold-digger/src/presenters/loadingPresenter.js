import LoadingView from "../views/loadingView";
import AudioPlayer from "../views/audioPlayView";

import { useState, useEffect } from "react";
import { getSavedTracks, getTracksParams, getTracksPlaylist, getAllTracks } from "../spotifySource.js";

// temp import
import fixedPlaylist from "../test/fixedList";
import fixedFeatures from "../test/fixedFeatures";


import { flushSync } from 'react-dom';
import DiggerModel from "../DiggerModel";

import resolvePromise from "../resolvePromise.js";


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

    // states for API calls (trackids, audiofeatures, trackinformation)
    const [trackIDPromise, setTrackIDPromiseState] = useState({});
    const [audioFeaturesPromise, setAudioFeaturesPromiseState] = useState({});
    const [trackInfoPromise, setTrackInfoPromiseState] = useState({});

    // useEffects for API calls
    useEffect(onResolveTrackIDPromiseACB, [trackIDPromise]);
    useEffect(onResolveAudioFeaturesPromiseACB, [audioFeaturesPromise]);
    useEffect(oneResolveTrackInfoStatePromiseACB, [trackInfoPromise]);

    // Objects to save tracks from Spotify in
    let tracks = {}; // final tracklist
    let trackIDs = []; // keep track of ids when filtering
    let trackInformation = []; // info includes artist, genre etc
    let trackAudioFeatures = []; // info includes tempo, loudness etc

    
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

        setTrackIDsFromSource(); // TODO
    }

    function onResolveTrackIDPromiseACB() {
        if (trackIDPromise.data) {
            let tracksFromSource = trackIDPromise.data;
            let trackIDs = tracksFromSource.map(extractIdACB);

             // TODO
            // should use trackIDs to set trackAudioFeatures
            // getTracksParams(idList), takes an array of track ids in string format
            //resolvePromise(getTrackAudioFeatures(trackIDs), )
        } 

        function extractIdACB (element) {
            return element.id;
        }
    }

    function onResolveAudioFeaturesPromiseACB() {
        filterOnAudioFeatParams(); // DONE
        getTracksFromFilteredIDs(); // TODO
    }

    function oneResolveTrackInfoStatePromiseACB() {
        filterOnGenreAndExclArtist(); // DONE
        setTracksBasedOnIncludedArtists(); // DONE

        setNewGenerated(); // DONE

        //loading done
        setloadingDone(true);
    }


    /**
     * API-related
     */

    // Returns 
    function setTrackIDsFromSource() {
        if (props.model.source) { 
            // get tracks from provided source URL
            console.log("getTracksplaylist:", getTracksPlaylist);
            resolvePromise(getTracksPlaylist(props.model.source), trackIDPromise, setTrackIDPromiseState);
            
        } else { 
            // get from saved songs
            resolvePromise(getSavedTracks());
        }    
    }

    // TODO maybe redundant, if so delete
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
        console.log("set trackinformation to filtered on genre and artists");
        trackInformation = trackInformation.filter(filterGenreAndArtistACB);
    }

    function setTracksBasedOnIncludedArtists() {
        
        let wantedTracks = createListOfWantedArtistsTracks();
        
        // if list with included artists has < 50 tracks, add from other list so that we have 50. Scramble and return.
        if (wantedTracks.length <= 50) {
            let additionalAcceptableTracks= createListOfAdditionalAcceptableTracks(wantedTracks);
            // plocka ut diffen från additionalAcceptableTracks, lägg till i wantedtracks
            const diff = 50 - wantedTracks.length;
                if (additionalAcceptableTracks.length > diff) {
                    additionalAcceptableTracks = scramblePlaylist(additionalAcceptableTracks);
                    additionalAcceptableTracks = [...additionalAcceptableTracks].slice(diff-1);
                }
                
                wantedTracks.push(additionalAcceptableTracks);
                wantedTracks = scramblePlaylist(wantedTracks);
                
        } else {
            // cut the saved tracks at 50
            wantedTracks = [...wantedTracks].slice(49);
        }

        trackInformation = wantedTracks;
    }

    /**
     * Create a scrambled list of tracks from wanted artists with a maximum of 3 songs from each wanted artist
     */
    function createListOfWantedArtistsTracks() {
        function markWantedArtistsACB(artist) {
            if (props.model.includedArtists.includes(artist))
                return true;
            return false;
        }

        /**
         * return true if artist is wanted and has been included less than 3 times
         * return false if artist has been included to it's limit, or if it is not a wanted artist
         */
        function incrementArtistCounterACB(artist) {
            if (props.model.includedArtists.includes(artist)) {
                // find and update counter of artist
                var foundIndex = artistCounter.findIndex(x => x.artisdID == artist.id);
                var currentCount = artistCounter[foundIndex].counter;

                if (currentCount < 3) {
                    artistCounter[foundIndex] = {artistID:artist.id, counter:currentCount+1};
                    return true;
                } else {
                    return false;
                }
            } else { // artist not explicitly wanted
                return false; 
            } 
        }

        function filterOnWantedArtistACB(currentTrack) {
            let wantedStatusofArtists = currentTrack.track.artists.map(markWantedArtistsACB);
            return wantedStatusofArtists.includes(true);
        }

        function createArtistCounterACB(artist) {
            return {artistID:artist.id, counter:0};
        }

        function limitTracksFromSameArtistACB(currentTrack) {
            // pick out all wanted artists collaborating on the song
            let keepBasedOnCounter = currentTrack.track.artists.map(incrementArtistCounterACB);
            // keep only if there exists a wanted artist on list that needs to be included
            return (keepBasedOnCounter.contains(true)) 
        }

        // Extract only wanted artists
        let onlyWantedArtistsTracks = [...trackInformation].filter(filterOnWantedArtistACB);
        // Scramble the list
        let scrambledOnlyWanted = scramblePlaylist(onlyWantedArtistsTracks);
        // Create counter for how many song we have looked at so far from each wanted artist
        let artistCounter = [...props.model.includedArtists].map(createArtistCounterACB);
        // Filter so that max the first 3 songs of each artist remain
        let limitedScrambledOnlyWanted = scrambledOnlyWanted.filter(limitTracksFromSameArtistACB);
 
        return limitedScrambledOnlyWanted;
    }

    /**
     * Create a list of tracks with all acceptable tracks except for given already selected tracks
     */
    function createListOfAdditionalAcceptableTracks(alreadySelected) {
        function removeAlreadySelectedACB(track) {
            // if not in selected, it should be in our list
            return (!alreadySelected.includes(track))
        }

        return [...trackInformation].filter(removeAlreadySelectedACB);
    }

    function scramblePlaylist(playlist) {
        // return a scrambled version of playlist
        return [...playlist].sort((a, b) => 0.5 - Math.random());
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

        newGenerated.tracks = trackInformation; //fixedPlaylist.tracks;
        newGenerated.playlistName = 'Playlist #' + newGenerated.firebaseKey;

        props.model.addToPrevPlaylists({playlistName:newGenerated.playlistName, firebaseKey:newGenerated.firebaseKey}); 
        props.model.setGenerated(newGenerated);
    }

    function viewPlaylistACB() {
        props.model.resetParams();
    }
}


export default Loading;