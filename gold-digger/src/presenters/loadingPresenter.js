import LoadingView from "../views/loadingView";
import AudioPlayer from "../views/audioPlayView";

import { useState, useEffect } from "react";
import { getSavedTracks, getAllTracksParams, getTracksPlaylist, getAllTracks, getAllArtistsPlaylist, getAllArtistsSaved } from "../spotifySource.js";
import resolvePromise from "../resolvePromise.js";

// temp import
import fixedPlaylist from "../test/fixedList";
import fixedFeatures from "../test/fixedFeatures";


function Loading(props) {
    const debugFilterSteps = true;
    const playlistMaxLength = 1000;

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
    }

    // state for visual feedback when loading is done
    const [loadingState, setLoadingState] = useState("Getting tracks from source...");

    // states for API calls (trackids, audiofeatures, trackinformation)
    const [sourceTracksPromise, setSourceTracksPromiseState] = useState({});
    const [audioFeaturesPromise, setAudioFeaturesPromiseState] = useState({});
    const [trackInfoPromise, setTrackInfoPromiseState] = useState({});
    const [artistInfoPromise, setArtistPromiseState] = useState({});

    // useEffects for API calls
    useEffect(onMountedACB, []);
    useEffect(onResolveSourceTracksPromiseACB, [sourceTracksPromise]);
    useEffect(onResolveAudioFeaturesPromiseACB, [audioFeaturesPromise]);
    useEffect(onResolveTrackInfoStatePromiseACB, [trackInfoPromise, artistInfoPromise]);

    return (
        <div>
            <LoadingView loadingState={loadingState} viewPlaylist={viewPlaylistACB}/>
            <AudioPlayer play={false} tracks={["spotify:track:0hl8k492sfcfLQudNctEiR"]}/>
        </div>
    );

    /**
     * useEffect callbacks
     */

    function onMountedACB() {
        /* FLOW OF GENERATION:
         * get list of ids from source (API)
         * get audio features for those ids (API)
         * filter ids based on audiofeatures
         * get trackinformation based on filtered ids (API)
         * filter genre and excluded artists
         * create final playlist with a mix of wanted and neutral artists
         */

        // set trackids from source
        if (props.model.source) { 
            // get tracks from provided source URL
            resolvePromise(getTracksPlaylist(props.model.source), sourceTracksPromise, setSourceTracksPromiseState);
            resolvePromise(getAllArtistsPlaylist(props.model.source), artistInfoPromise, setArtistPromiseState);
        } else if (props.model.source !== null) { 
            // get from saved songs
            resolvePromise(getSavedTracks(), sourceTracksPromise, setSourceTracksPromiseState);
            resolvePromise(getAllArtistsSaved(), artistInfoPromise, setArtistPromiseState);
        } else { // someone went to loading page manually without an active session
            setLoadingState("Except it's not, since you're not supposed to be here because you do not have an active session going on!");
        }
    }

    function onResolveSourceTracksPromiseACB() {        
        function extractIdACB (element) {
            return element.track.id;
        }

        if (sourceTracksPromise.data != null) {
            let tracksFromSource = sourceTracksPromise.data;
            let trackIDs = [...tracksFromSource].map(extractIdACB);

            if(debugFilterSteps) {
                console.log("tracksFromSource", tracksFromSource);
            }

            if (trackIDs.length !== 0) {
                setLoadingState("Getting audio features...");
                // get track audio features from the ids
                resolvePromise(getAllTracksParams(trackIDs), audioFeaturesPromise, setAudioFeaturesPromiseState)
            } else {
                setLoadingState("Generation cancelled.");
                alert("Source playlist empty! Please choose a source playlist that contains tracks.");
            }
        } 
    }

    function onResolveAudioFeaturesPromiseACB() {
        function extractIdACB (element) {
            return element.id;
        }
        
        if (audioFeaturesPromise.data != null) {
            let tracksWithAudioFeatures = audioFeaturesPromise.data;

            if(debugFilterSteps) {
                console.log("tracksWithAudioFeatures", tracksWithAudioFeatures);
            }
            
            setLoadingState("Filtering on audio features...");
            let filteredTracks = filterOnAudioFeatParams(tracksWithAudioFeatures);
            let trackIDs = filteredTracks.map(extractIdACB);

            if(debugFilterSteps) {
                console.log("tracksFilteredOnAudioFeatures", filteredTracks);
            }

            if (trackIDs.length !== 0) {
                setLoadingState("Getting additional information...");
                // get track info from ids that are left
                resolvePromise(getAllTracks(trackIDs), trackInfoPromise, setTrackInfoPromiseState);
            } else {
                setLoadingState("Generation cancelled.");
                alert("Your parameters are too strict!\n\nTry relaxing the parameters in the following categories:\n\n - Tempo\n - Noisiness\n - Amount of vocals\n - Restrictions on danceability\n - Restrictions on acousticness\n\nYou can also try selecting a different source playlist!");
            }
           
        }
    }

    function onResolveTrackInfoStatePromiseACB() {
        if (trackInfoPromise.data != null && artistInfoPromise.data != null) {
            let tracksWithInfo = trackInfoPromise.data;

            if(debugFilterSteps) {
                console.log("tracksWithInfo", tracksWithInfo);
            }

            setLoadingState("Filtering on genres and artists...");
            let filteredTracks = filterOnGenreAndExclArtist(tracksWithInfo);

            if(debugFilterSteps) {
                console.log("tracksFilteredOnGenreAndExclArtist", filteredTracks);
            }

            if (filteredTracks.length !== 0) {
                console.log("Creating the final blend...");
                let finalTrackList = setTracksBasedOnIncludedArtists(filteredTracks);

                if(debugFilterSteps) {
                    console.log("finalTracklist", finalTrackList);
                }

                setNewGenerated(finalTrackList); 

                setLoadingState("Done!");
            } else {
                setLoadingState("Generation cancelled.");
                alert("Your parameters are too strict!\n\Try making changes in the following categories:\n\n - Include more genres\n - Do not exclude as many artists\n\nYou can also try selecting a different source playlist!")
            }
            
        }
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
     * returns list of tracks filter from these params
     */
    function filterOnAudioFeatParams(tracksWithAudioFeatures) {
        function chosenParamsACB(track) {
            // Our decided thresholds
            let includeBasedOnTempo =
                (track.tempo >= props.model.tempo.min &&
                 track.tempo <= props.model.tempo.max);
            let includeBasedOnLoudness =
                (track.loudness >= props.model.loudness.min &&
                 track.loudness <= props.model.loudness.max);
            let includeBasedOnInstrumentalness =
                (track.instrumentalness >= props.model.instrumentalness.min/100 &&
                 track.instrumentalness <= props.model.instrumentalness.max/100); // 0-1 in API, % in model

            let includeBasedOnAcousticness = true;
            let includeBasedOnDanceability = true;

            const danceMinValue = 0.75;
            const acousticMinValue = 0.75;

            // If user wants a danceable list, only include danceable songs. Else, include full range. 
            // IMPORTANT danceability in FixedFeatures, danceable in model
            if (props.model.danceable) {
                includeBasedOnDanceability = (track.danceability >= danceMinValue);
            }

            // If user wants an acoustic list, only include such songs. Else, include full range. 
            // IMPORTANT acousticness in FixedFeatures, acoustic in model
            if (props.model.acoustic) {
                includeBasedOnAcousticness = (track.acousticness >= acousticMinValue);
            }

            return (includeBasedOnTempo &&
                    includeBasedOnLoudness &&
                    includeBasedOnInstrumentalness &&
                    includeBasedOnDanceability &&
                    includeBasedOnAcousticness);
        }

        return tracksWithAudioFeatures.filter(chosenParamsACB);
    }

    /** 
     * filter trackInformation from all songs that fall outside of set parameters
     * - genres
     * - excluded artists
     */
    function filterOnGenreAndExclArtist(tracksWithInfo) {
        let artistsInfo = artistInfoPromise.data;

        // return true if genre is wanted
        function markWantedGenreCB(genre) {
            return props.model.genres.includes(genre);         
        }

        // return false if artist is excluded or does not make music out of one of the wanted genres
        function markUnwantedArtistsACB(artist) {
            if (props.model.excludedArtists.includes(artist.id)) {
                return false;
            } else if (props.model.genres.length !== 0) {
                const info = artistsInfo.find(element => element.id === artist.id);
        
                if (info.genres.length !== 0) { // there exists genres for artist
                    return info.genres.find(markWantedGenreCB);
                }

                console.log("No genres in artist");
                return true; // artists without genre are included
            } else {
                return true; // if no genres are selected, all genres are ok
            }
           
        }
        
        /* filter for each current track */
        function filterGenreAndArtistACB(currentTrack) {
            let wantedStatusofArtists = currentTrack.track.artists.some(markUnwantedArtistsACB);
            // Returns true if wanted

            return wantedStatusofArtists;
        }

        return tracksWithInfo.filter(filterGenreAndArtistACB);
    }

    function setTracksBasedOnIncludedArtists(filteredTracks) {
        let wantedTracks = createListOfWantedArtistsTracks(filteredTracks);

        if (debugFilterSteps) {
            console.log("tracksIncludedArtist", [...wantedTracks]);
        }
        

        // if list with included artists has < playlistMaxLength tracks, add from other list so that we have playlistMaxLength. Scramble and return.
        if (wantedTracks.length <= playlistMaxLength) {
            let additionalAcceptableTracks= createListOfAdditionalAcceptableTracks(filteredTracks, wantedTracks);

            // plocka ut diffen från additionalAcceptableTracks, lägg till i wantedtracks
            const diff = playlistMaxLength - wantedTracks.length;

                if (additionalAcceptableTracks.length > diff) {
                    // scramble and cut down additional tracks to correct lenght
                    additionalAcceptableTracks = scramblePlaylist(additionalAcceptableTracks);
                    additionalAcceptableTracks = [...additionalAcceptableTracks].slice(0, diff);
                }

                wantedTracks = wantedTracks.concat(additionalAcceptableTracks); 

        } else {
            // cut the saved tracks at playlistMaxLength
            wantedTracks = wantedTracks.slice(0, playlistMaxLength);
        }

        return wantedTracks;
    }

    /**
     * Create a scrambled list of tracks from wanted artists with a maximum of 3 songs from each wanted artist
     */
    function createListOfWantedArtistsTracks(filteredTracks) {
        function markWantedArtistsACB(artist) {
            return props.model.includedArtists.includes(artist.id);
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
            console.log("includes: ",wantedStatusofArtists.includes(true));
            return wantedStatusofArtists.includes(true);
        }

        function createArtistCounterACB(artist) {
            return {artistID:artist.id, counter:0};
        }

        function limitTracksFromSameArtistACB(currentTrack) {
            // pick out all wanted artists collaborating on the song
            let keepBasedOnCounter = currentTrack.track.artists.map(incrementArtistCounterACB);
            // keep only if there exists a wanted artist on list that needs to be included
            return (keepBasedOnCounter.includes(true)) 
        }

        // Extract only wanted artists
        let onlyWantedArtistsTracks = [...filteredTracks].filter(filterOnWantedArtistACB);
        // Scramble the list
        let scrambledOnlyWanted = scramblePlaylist(onlyWantedArtistsTracks);
        // Create counter for how many song we have looked at so far from each wanted artist
        let artistCounter = [...props.model.includedArtists].map(createArtistCounterACB);
        // Filter so that max the first 3 songs of each artist remain
        let limitedScrambledOnlyWanted = scrambledOnlyWanted.filter(limitTracksFromSameArtistACB);

        // TODO debug limit-functions with artistcounter and use limitedScrambledOnlyWanted
        //return [...limitedScrambledOnlyWanted]; 
        return [...scrambledOnlyWanted];
    }

    /**
     * Create a list of tracks with all acceptable tracks except for given already selected tracks
     */
    function createListOfAdditionalAcceptableTracks(filteredTracks, alreadySelected) {
        function removeAlreadySelectedACB(track) {
            // if not in selected, it should be in our list
            return (!alreadySelected.includes(track))
        }
        return [...filteredTracks].filter(removeAlreadySelectedACB);
    }

    function scramblePlaylist(playlist) {
        // return a scrambled version of playlist
        return [...playlist].sort((a, b) => 0.5 - Math.random());
    }

    function setNewGenerated(finalTrackList) {
        const newGenerated = {};
        
        // Set firebasekey based on the current highest key
        if (props.model.prevPlaylists.length) {
            // NOTE: if restore fn is implemented it needs to sort prevPlaylist based on firebaseKey
            let playlistWithCurrentHighestKey = props.model.prevPlaylists[props.model.prevPlaylists.length-1];
            newGenerated.firebaseKey = playlistWithCurrentHighestKey.firebaseKey + 1;
        } else {
            newGenerated.firebaseKey = 0;
        }

        newGenerated.tracks = finalTrackList;
        newGenerated.playlistName = 'Playlist #' + newGenerated.firebaseKey;

        props.model.addToPrevPlaylists({playlistName:newGenerated.playlistName, firebaseKey:newGenerated.firebaseKey}); 
        props.model.setGenerated(newGenerated);
    }

    function viewPlaylistACB() {
        props.model.resetParams();
    }
}


export default Loading;