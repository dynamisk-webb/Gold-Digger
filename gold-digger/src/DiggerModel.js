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
        this.generated = {playlistName: 'Default playlist', playlistId: null, firebaseKey: null, tracks: []};
        this.genres = [];   // String values
        this.includedArtists = [];  // Spotify ID
        this.excludedArtists = [];
        this.prevPlaylists = prevPlaylists; // [{name, playlistId, firebaseKey: }, ...]

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
            this.notifyObservers({key:"modelParams", param:"userid"});
        }
    }

    setSource(id) { // Sets source playlist if there is one
        if(id !== this.source) {
            this.source = id;
            this.notifyObservers({key:"modelParams", param:"source"});
        }
    }

    setPrevPlaylists(playlists) {   // Sets previous playlists, takes an array
        this.prevPlaylists = [...playlists];
        this.notifyObservers({key:"modelParams", param:"prevPlaylists"});
    }

    setTempo(min, max) {    // Sets min and max tempo (in bpm)
        if(this.tempo.min !== min || this.tempo.max !== max) {
            this.tempo = {min: min, max: max};
            this.notifyObservers({key:"modelParams", param:"tempo"});
        }
    }

    setLoudness(min, max) { // Sets min and max noise (in db) from -60 to 0
        if(this.loudness.min !== min || this.loudness.max !== max) {
            this.loudness = {min: min, max: max};
            this.notifyObservers({key:"modelParams", param:"loudness"});
        }
    }

    setInstrumentalness(min, max) { // Sets min and max instrumentalness (amount of vocals) from 0.0 to 1.0
        if(this.instrumentalness.min !== min || this.instrumentalness.max !== max) {
            this.instrumentalness = {min: min, max: max};
            this.notifyObservers({key:"modelParams", param:"instrumentalness"});
        }
    }

    setGenerated(generate) { // Sets generated playlist (should only be called when creating a new playlist, firebaseKey will be assigned when persisting)
        this.generated = generate;
        this.notifyObservers({key:"modelParams", param:"generated", specs:"newList"});
    }

    setGeneratedName(name) { // Sets name of current generated playlist
        this.generated.playlistName = name;
        this.notifyObservers({key:"modelParams", param:"generated", specs:"name", firebaseKey:this.generated.firebaseKey});
    }

    setGeneratedFirebaseKey(firebaseKey) { // Sets key of current generated playlist
        this.generated.firebaseKey = firebaseKey;
        this.notifyObservers({key:"modelParams", param:"generated", specs:"firebaseKey"});
    }

    setPrevName(name) {   // Sets name of previous playlist by name
        let firebaseKey = this.generated.firebaseKey;
        this.prevPlaylists.forEach(list => {if(list.firebaseKey === firebaseKey) list.playlistName = name});
        this.notifyObservers({key:"modelParams", param:"prevGenerated", specs:"name"}); 

    }

    setDanceable(bool) {    // Sets danceability (how suitable it is for dancing) from 0.0 to 1.0
        this.danceable = bool;
        this.notifyObservers({key:"modelParams", param:"danceable"});
    }

    setAcoustic(bool) {
        this.acoustic = bool;
        this.notifyObservers({key:"modelParams", param:"acoustic"});
    }

    /**
     *  Modify lists
     */
    addToPrevPlaylists(newPlaylist) {   // Adds a playlist to previous playlists
        if(!this.prevPlaylists.includes(newPlaylist)) {
            const prev = [...this.prevPlaylists, newPlaylist];
            this.setPrevPlaylists(prev);   
        }
    }

    addTracks(idlist) {   // Add multiple tracks to generated playlist
        idlist.forEach(id => this.generated.tracks.push(id));
        this.notifyObserveres({key: "modelParams", param: "generated", specs:"addTracks", firebaseKey:this.generated.firebaseKey}); // TODO
    }

    removeTrack(trackID) {  // Removes a specific track from the already generated list
        this.generated.tracks = this.generated.tracks(tr => tr.id !== trackID);
        this.notifyObservers({key:"modelParams", param:"generated", specs:"removeTrack", firebaseKey:this.generated.firebaseKey});
    }

    removePrevPlaylist(playlist) {  // Removes a previous playlist id 
        if(this.prevPlaylists.includes(playlist)) {
            this.prevPlaylists = this.prevPlaylists.filter(elem => elem.playlistId !== playlist);
            this.notifyObservers({key:"modelParams", param:"removePrevPlaylist"});
        }
    }

    addGenre(genre) {   // Add to included genres
        if(!this.genres.includes(genre)) {
            this.genres = [...this.genres, genre];
            this.notifyObservers({key:"modelParams", param:"addGenre"});
        }
    }

    removeGenre(genre) {    // Exclude from genres
        if(this.genres.includes(genre)) {
            this.genres = this.genres.filter(elem => elem !== genre);
            this.notifyObservers({key:"modelParams", param:"removeGenre"});
        }
    }

    includeArtist(artist) {   // Include artist, always added in generated list
        if(!this.includedArtists.includes(artist)) {
            this.removeArtist(artist);
            this.includedArtists = [...this.includeArtists, artist];
            this.notifyObservers({key:"modelParams", param:"addToIncludeArtist"});

        }
    }

    excludeArtist(artist) {    // Exclude artists, always ignored in generated list
        if(!this.excludedArtists.includes(artist)) {
            this.removeArtist(artist);
            this.excludedArtists = [...this.excludedArtists, artist];
            this.notifyObservers({key:"modelParams", param:"addToExcludeArtist"});
        }
    }

    removeArtist(artist) {    // Remove from both include/exclude, neutral artist
        if(this.includedArtists.includes(artist)) {
            this.includedArtists = this.includedArtists.filter(elem => elem !== artist);
            this.notifyObservers({key:"modelParams", param:"removeFromIncludeArtist"});
        } else if(this.excludedArtists.includes(artist)) {
            this.excludedArtists = this.excludedArtists.filter(elem => elem !== artist);
            this.notifyObservers({key:"modelParams", param:"removeFromExcludeArtist"});
        }
    }  

    resetParams() { // Set to default values for params
        this.source = null;
        this.generated = {playlistName: 'Default playlist', playlistId: null, firebaseKey: null, tracks: []};
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