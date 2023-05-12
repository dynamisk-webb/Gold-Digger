import LoadingView from "../views/loadingView";
import AudioPlayer from "../views/audioPlayView";

import { useState, useEffect } from "react";
import { getSavedTracks, getAllTracksParams, getTracksPlaylist, getAllTracks } from "../spotifySource.js";
import resolvePromise from "../resolvePromise.js";

// temp import
import fixedPlaylist from "../test/fixedList";
import fixedFeatures from "../test/fixedFeatures";


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
    const [sourceTracksPromise, setSourceTracksPromiseState] = useState({});
    const [audioFeaturesPromise, setAudioFeaturesPromiseState] = useState({});
    const [trackInfoPromise, setTrackInfoPromiseState] = useState({});

    // useEffects for API calls
    useEffect(onMountedACB, []);
    useEffect(onResolveSourceTracksPromiseACB, [sourceTracksPromise]);
    useEffect(onResolveAudioFeaturesPromiseACB, [audioFeaturesPromise]);
    useEffect(oneResolveTrackInfoStatePromiseACB, [trackInfoPromise]);

    return (
        <div>
            <LoadingView loadingState={loadingDone} viewPlaylist={viewPlaylistACB}/>
            <AudioPlayer play={true} tracks={["spotify:track:0hl8k492sfcfLQudNctEiR"]}/>
        </div>
    );

    /**
     * useEffect callbacks
     */

    function onMountedACB() {

        /* FLOW STARTING HERE
         * get list of ids from source (API)
         * get audio features for those ids (API)
         * filter ids based on audiofeatures
         * get trackinformation based on filtered ids (API)
         * filter genre and excluded artists
         * create final playlist with a mix of wanted and neutral artists
         */

        // set trackids from source
        if (props.model.source) { 
            console.log("about to resolve gettracksplaylist");
            // get tracks from provided source URL
            resolvePromise(getTracksPlaylist(props.model.source), sourceTracksPromise, setSourceTracksPromiseState);
            
        } else { 
            console.log("about to resolve getsavedtracks");
            // get from saved songs
            resolvePromise(getSavedTracks(), sourceTracksPromise, setSourceTracksPromiseState);
        }    
    }

    function onResolveSourceTracksPromiseACB() {
        console.log("in onResolveTrackIDPromiseACB");
        
        function extractIdACB (element) {
            return element.track.id;
        }

        if (sourceTracksPromise.data != null) {
            let tracksFromSource = sourceTracksPromise.data;
            let trackIDs = [...tracksFromSource].map(extractIdACB);

            console.log("sourceTracksPromise.data", tracksFromSource);
            console.log("ids", trackIDs);
            // get track audio features from the ids
            resolvePromise(getAllTracksParams(trackIDs), audioFeaturesPromise, setAudioFeaturesPromiseState)
        } 
    }

    function onResolveAudioFeaturesPromiseACB() {
        console.log("in onResolveAudioFeaturesPromiseACB");

        function extractIdACB (element) {
            return element.id;
        }
        
        if (audioFeaturesPromise.data != null) {
            let tracksWithAudioFeatures = audioFeaturesPromise.data;
            
            console.log("audioFeaturesPromise.data", tracksWithAudioFeatures);
            let filteredTracks = filterOnAudioFeatParams(tracksWithAudioFeatures);
            
            console.log("filtered on audio feature params", filteredTracks);
            let trackIDs = filteredTracks.map(extractIdACB);
    
            console.log("about to resolve trackinfo", trackIDs);
            // get track info from ids that are left
            resolvePromise(getAllTracks(trackIDs), trackInfoPromise, setTrackInfoPromiseState);
        }
    }

    function oneResolveTrackInfoStatePromiseACB() {
        console.log("in oneResolveTrackInfoStatePromiseACB");

        if (trackInfoPromise.data != null) {
            let tracksWithInfo = trackInfoPromise.data;
            console.log("trackInfoPromise.data", trackInfoPromise.data);

            console.log("filter on genre and artists");
            let filteredTracks = filterOnGenreAndExclArtist(tracksWithInfo);

            console.log("filter by included artist logic");
            let finalTrackList = setTracksBasedOnIncludedArtists(filteredTracks);

            setNewGenerated(finalTrackList); 

            //loading done
            setloadingDone(true);
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

            console.log(includeBasedOnTempo, includeBasedOnLoudness, includeBasedOnInstrumentalness, includeBasedOnDanceability, includeBasedOnAcousticness);
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

        return tracksWithInfo.filter(filterGenreAndArtistACB);
    }

    function setTracksBasedOnIncludedArtists(filteredTracks) {
        
        let wantedTracks = createListOfWantedArtistsTracks(filteredTracks);
        console.log("wanted tracks", wantedTracks);
        
        // if list with included artists has < 50 tracks, add from other list so that we have 50. Scramble and return.
        if (wantedTracks.length <= 50) {
            let additionalAcceptableTracks= createListOfAdditionalAcceptableTracks(filteredTracks, wantedTracks);
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

        return wantedTracks;
    }

    /**
     * Create a scrambled list of tracks from wanted artists with a maximum of 3 songs from each wanted artist
     */
    function createListOfWantedArtistsTracks(filteredTracks) {
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
        let onlyWantedArtistsTracks = [...filteredTracks].filter(filterOnWantedArtistACB);
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

        console.log(finalTrackList);
        newGenerated.tracks = finalTrackList[0];
        newGenerated.playlistName = 'Playlist #' + newGenerated.firebaseKey;

        props.model.addToPrevPlaylists({playlistName:newGenerated.playlistName, firebaseKey:newGenerated.firebaseKey}); 
        props.model.setGenerated(newGenerated);
    }

    function viewPlaylistACB() {
        props.model.resetParams();
    }
}


export default Loading;