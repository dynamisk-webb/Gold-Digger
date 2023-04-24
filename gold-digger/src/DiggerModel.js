// Imports
import { redirectToSpotifyLogIn, requestAccessToken } from "./authentication.js";
import { getProfile } from "./spotifySource.js";

/**
 * Model keeps abstract data
 */
class DiggerModel{
    constructor(state, setState, userid=null, prevPlaylists=[], acoustic=false, danceable=false) {
        this.userid = userid;
        this.source = null;
        this.generated = {playlistName: null, playlistId: null, firebaseKey: null, tracks: []};
        this.genres = [];   // String values
        this.includedArtists = [];  // Spotify ID
        this.excludedArtists = [];
        this.prevPlaylists = prevPlaylists; // [{playlistName, playlistId, firebaseKey: }, ...]
        this.tempo = {min: 0, max: 300}; // {min:, max}, set to default or limits
        this.loudness = {min: -60, max: 0};
        this.instrumentalness = {min: 0, max: 1};
        this.danceable = danceable; // Set directly true or false
        this.acoustic = acoustic;

        this.observers = [];
        this.setLogin = setState;
        this.isLoggedIn = state;
    }

    /**
     *  Setters, notifiers observers of changes
     */
    setUserID(id) { // Sets current user
        if(id !== this.userid) {  
            this.userid = id;
            this.notifyObservers({key:"modelParams", msg:"userid"});
        }
    }
    setSource(id) { // Sets source playlist if there is one
        if(id !== this.source) {
            this.source = id;
            this.notifyObservers({key:"modelParams", msg:"source"});
        }
    }

    setPrevPlaylists(playlists) {   // Sets previous playlists, takes an array
        this.prevPlaylists = [...playlists];
        this.notifyObservers({key:"modelParams", msg:"prevPlaylists"});
    }
    setTempo(min, max) {    // Sets min and max tempo (in bpm)
        if(this.tempo.min !== min || this.tempo.max !== max) {
            this.tempo = {min: min, max: max};
            this.notifyObservers({key:"modelParams", msg:"tempo"});
        }
    }
    setLoudness(min, max) { // Sets min and max noise (in db) from -60 to 0
        if(this.loudness.min !== min || this.loudness.max !== max) {
            this.loudness = {min: min, max: max};
            this.notifyObservers({key:"modelParams", msg:"loudness"});
        }
    }
    setInstrumentalness(min, max) { // Sets min and max instrumentalness (amount of vocals) from 0.0 to 1.0
        if(this.instrumentalness.min !== min || this.instrumentalness.max !== max) {
            this.instrumentalness = {min: min, max: max};
            this.notifyObservers({key:"modelParams", msg:"instrumentalness"});
        }
    }
    setGenerated(generate) {    // Sets generated playlist and adds to prev playlists
        this.generated = generate;
        this.notifyObservers({key:"modelParams", msg:"generated"});
    }
    setDanceable(bool) {    // Sets danceability (how suitable it is for dancing) from 0.0 to 1.0
        this.danceable = bool;
        this.notifyObservers({key:"modelParams", msg:"danceable"});
    }
    setAcoustic(bool) {
        this.acoustic = bool;
        this.notifyObservers({key:"modelParams", msg:"acoustic"});
    }

    // Add to lists, could be more general
    addToPrevPlaylists(newPlaylist) {   // Adds a playlist to previous playlists
        if(!this.prevPlaylists.includes(newPlaylist)) {
            const prev = [...this.prevPlaylists, newPlaylist];
            this.setPrevPlaylists(prev);   
        }
    }
    removePrevPlaylist(playlist) {  // Removes a previous playlist id 
        if(this.prevPlaylists.includes(playlist)) {
            this.prevPlaylists.filter(filterPlaylistCB);
            this.notifyObservers({key:"modelParams", msg:"removePrevPlaylist"});
        }

        function filterPlaylistCB(elem) {
            return elem !== playlist;
        }
    }
    addGenre(genre) {   // Add to genres
        if(!this.genres.includes(genre)) {
            this.genres = [...this.genres, genre];
            this.notifyObservers({key:"modelParams", msg:"addGenre"});
        }
    }
    removeGenre(genre) {    // Exclude from genres
        if(this.genres.includes(genre)) {
            this.genres.filter(filterGenreCB);
            this.notifyObservers({key:"modelParams", msg:"removeGenre"});
        }

        function filterGenreCB(elem) {
            return elem !== genre;
        }
    }
    includeArtist(artist) {   // Includes artist, always added in generated list
        if(!this.includedArtists.includes(artist)) {
            this.removeArtist(artist);
            this.includedArtists = [...this.includeArtists, artist];
            this.notifyObservers({key:"modelParams", msg:"addToIncludeArtist"});

        }
    }
    excludeArtist(artist) {    // Exclude artists, always ignored in generated list
        if(!this.excludedArtists.includes(artist)) {
            this.removeArtist(artist);
            this.excludedArtists = [...this.excludedArtists, artist];
            this.notifyObservers({key:"modelParams", msg:"addToExcludeArtist"});
        }
    }
    removeArtist(artist) {    // Removes from both include/exclude, neutral artist
        if(this.includedArtists.includes(artist)) {
            this.includedArtists.filter(filterArtistCB);
            this.notifyObservers({key:"modelParams", msg:"removeFromIncludeArtist"});
        } else if(this.excludedArtists.includes(artist)) {
            this.excludedArtists.filter(artist);
            this.notifyObservers({key:"modelParams", msg:"removeFromExcludeArtist"});
        }
        
        function filterArtistCB(elem) {
            return elem !== artist;
        }
    }

    resetParams() { // Set to default values
        this.source = null;
        this.generated = {playlistName: null, playlistId: null, firebaseKey: null, tracks: []};
        this.genres = [];   // String values
        this.includedArtists = [];
        this.excludedArtists = [];
        this.tempo = {min: 0, max: 300}; // {min:, max}, set to default or limits
        this.loudness = {min: -60, max: 0};
        this.instrumentalness = {min: 0, max: 1};
        this.danceable = false;
        this.acoustic = false;
    }

    /**
     * Observers
     */
    addObserver(callback) {
        this.observers = [...this.observers, callback];
    }
    removeObserver(callback) {
        function filterObsCB(obs) {
            return obs !== callback;
        }
        this.observers = this.observers.filter(filterObsCB);
    }
    notifyObservers(payload) {
        function invokeCB(obs) {
            try {
                obs(payload)
            } catch(err) {
                console.log("Error running observers: " + err);
            }
        }
        this.observers.forEach(invokeCB);
    }


    /**
     * Login/Logout
     */

    // Redirects to Spotify's login page
    login() {
        try {
            this.setLogin("pending");
            localStorage.setItem("isLoggedIn", "pending");
            redirectToSpotifyLogIn();
        } catch (error) {
            alert("Error logging in.");
        }
    }
    
    // Should be run after we have been redirected back from Spotify's login page
    requestToken() {
        try {
            return requestAccessToken();
        } catch (error) {
            // TODO fix logic so this error is actually caught here and not before
            this.setLogin("false");
            localStorage.setItem("isLoggedIn", "false");
            alert("Error logging in.");
        }
    }

    // Logout current user
    logout() {
        console.log("removing local storage");
        
        this.setLogin("false");
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");

        this.notifyObservers({key:"logout"});
    }


    /**
     * Example API-call
     */
    requestGetProfile() { 
        getProfile();
    }
}

export default DiggerModel;