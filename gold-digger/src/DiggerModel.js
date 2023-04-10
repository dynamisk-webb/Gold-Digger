// Imports
import resolvePromise from "./resolvePromise.js"
// import {} from "./spotifySource.js";
import { redirectToSpotifyLogIn, requestAccessToken } from "./authentication";
import { getProfile } from "./spotifySource.js";

/**
 * Model keeps abstract data
 */
class DiggerModel{
    constructor(userid=null, prevPlaylists=[], acoustic=false, danceable=false) {
        // Other properties: genres,  artists
        this.userid = userid;
        this.source = null;
        this.generated = null;
        this.prevPlaylists = prevPlaylists; // [{id:, name: }, ...]
        this.tempo = {min: 0, max: 300}; // {min:, max}
        this.loudness = {min: -60, max: 0};
        this.instrumentalness = {min: 0, max: 1};
        this.danceable = danceable; // Set directly true or false
        this.acoustic = acoustic;

        this.observers = [];
    }

    /* Internal functions */
    // TODO: Notify observers

    // Setters
    setUserID(id) {
        if(id === null) {
          throw new Error("User ID is null");  
        }

        if(id !== this.userid) {  
            this.userid = id;
            this.notifyObservers("user");
        }
    }
    setSource(id) {
        if(id === null) {
            throw new Error("Source playlist is null, invalid")
        }
        if(id !== this.source) {
            this.source = id;
            this.notifyObservers("source");
        }
    }
    setPrevPlaylists(playlists) {
        this.prevPlaylists = [...playlists];
    }
    setTempo(min, max) {
        // TODO: Handle if the same
        if(this.tempo.min !== min || this.tempo.max !== max) {
            this.tempo = {min: min, max: max};
            this.notifyObservers("tempo");
        }
    }
    setLoudness(min, max) {
        if(this.loudness.min !== min || this.loudness.max !== max) {
            this.loudness = {min: min, max: max};
            this.notifyObservers("loud");
        }
    }
    setInstrumentalness(min, max) {
        if(this.instrumentalness.min !== min || this.instrumentalness.max !== max) {
            this.instrumentalness = {min: min, max: max};
            this.notifyObservers("instr");
        }
    }
    // TODO: Additional checks
    setGenerated(generate) {
        this.generated = generate;
        this.notifyObservers("generate");
    }
    setDanceable(bool) {
        this.danceable = bool;
        this.notifyObservers("danceable");
    }
    setAcoustic(bool) {
        this.acoustic = bool;
        this.notifyObservers("acoustic");
    }

    addToPrevPlaylists(newPlaylist) {
        function hasPlaylist(playlist) {
            return newPlaylist === playlist;
        }
        if(!this.prevPlaylists.find(hasPlaylist)) {
            this.prevPlaylists= [...this.prevPlaylists, newPlaylist];
        }
    }

    //TODO: API-calls

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
        redirectToSpotifyLogIn();
    }
    
    requestToken() {
        requestAccessToken();
    }

    // API calls
    requestGetProfile() {
        getProfile();
    }
}

export default DiggerModel;
