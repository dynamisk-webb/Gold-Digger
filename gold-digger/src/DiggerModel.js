// Imports
// import resolvePromise from "./resolvePromise.js"
import { redirectToSpotifyLogIn, requestAccessToken } from "./authentication.js";
import { getProfile } from "./spotifySource.js";

/**
 * Model keeps abstract data
 */
class DiggerModel{

    constructor(userid=null, prevPlaylists=[], acoustic=false, danceable=false) {
        this.userid = userid;
        this.source = null;
        this.generated = {playlist: null, tracks: []};
        this.genres = [];   // String values
        this.includedArtists = [];  // Spotify ID
        this.excludedArtists = [];
        this.prevPlaylists = prevPlaylists; // [{playlist:, tracks: }, ...]
        this.tempo = {min: 0, max: 300}; // {min:, max}, set to default or limits
        this.loudness = {min: -60, max: 0};
        this.instrumentalness = {min: 0, max: 1};
        this.danceable = danceable; // Set directly true or false
        this.acoustic = acoustic;

        this.observers = [];
    }

    /**
     *  Setters, notifiers observers of changes
     */
    setUserID(id) { // Sets current user
        if(id === null) {
          throw new Error("User ID is null");  
        }

        if(id !== this.userid) {  
            this.userid = id;
            this.notifyObservers("user");
        }
    }
    setSource(id) { // Sets source playlist if there is one
        if(id === null) {
            throw new Error("Source playlist is null, invalid")
        }
        if(id !== this.source) {
            this.source = id;
            this.notifyObservers("source");
        }
    }
    setPrevPlaylists(playlists) {   // Sets previous playlists, takes an array
        this.prevPlaylists = [...playlists];
        this.notifyObservers("prevplaylist");
    }
    setTempo(min, max) {    // Sets min and max tempo (in bpm)
        if(this.tempo.min !== min || this.tempo.max !== max) {
            this.tempo = {min: min, max: max};
            console.log("Min: " + min + " Min: " + min);
            this.notifyObservers("tempo");
        }
    }
    setLoudness(min, max) { // Sets min and max noise (in db) from -60 to 0
        if(this.loudness.min !== min || this.loudness.max !== max) {
            this.loudness = {min: min, max: max};
            this.notifyObservers("loud");
        }
    }
    setInstrumentalness(min, max) { // Sets min and max instrumentalness (amount of vocals) from 0.0 to 1.0
        if(this.instrumentalness.min !== min || this.instrumentalness.max !== max) {
            this.instrumentalness = {min: min, max: max};
            this.notifyObservers("instr");
        }
    }
    setGenerated(generate) {    // Sets generated playlist and adds to prev playlists
        this.generated = generate;
        this.addToPrevPlaylists(generate); // Add to previously generated playlists
        this.notifyObservers("generate");
    }
    setDanceable(bool) {    // Sets danceability (how suitable it is for dancing) from 0.0 to 1.0
        this.danceable = bool;
        this.notifyObservers("danceable");
    }
    setAcoustic(bool) {
        this.acoustic = bool;
        this.notifyObservers("acoustic");
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
            this.notifyObservers("prevplaylist");
        }

        function filterPlaylistCB(elem) {
            return elem !== playlist;
        }
    }
    addGenre(genre) {   // Add to genres
        if(!this.genres.includes(genre)) {
            this.genres = [...this.genres, genre];
            this.notifyObservers("genre added");
        }
    }
    removeGenre(genre) {    // Exclude from genres
        if(this.genres.includes(genre)) {
            this.genres.filter(filterGenreCB);
            this.notifyObservers("genre remove");
        }

        function filterGenreCB(elem) {
            return elem !== genre;
        }
    }
    includeArtist(artist) {   // Includes artist, always added in generated list
        if(!this.includedArtists.includes(artist)) {
            this.removeArtist(artist);
            this.includedArtists = [...this.includeArtists, artist];
            this.notifyObservers("artist included");

        }
    }
    excludeArtist(artist) {    // Exclude artists, always ignored in generated list
        if(!this.excludedArtists.includes(artist)) {
            this.removeArtist(artist);
            this.excludedArtists = [...this.excludedArtists, artist];
            this.notifyObservers("artist excluded");
        }
    }
    removeArtist(artist) {    // Removes from both include/exclude, neutral artist
        if(this.includedArtists.includes(artist)) {
            this.includedArtists.filter(filterArtistCB);
            this.notifyObservers("included artist removed");
        } else if(this.excludedArtists.includes(artist)) {
            this.excludedArtists.filter(artist);
            this.notifyObservers("excluded artist removed");
        }
        
        function filterArtistCB(elem) {
            return elem !== artist;
        }
    }

    // Observers
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

    // Login functions
    login() {
        try {
            redirectToSpotifyLogIn();
        } catch (error) {
            alert("Error logging in.");
        }
    }
    
    requestToken() {
        requestAccessToken();
    }

    // API calls
    requestGetProfile() {   // Example
        getProfile();
    }
}

export default DiggerModel;