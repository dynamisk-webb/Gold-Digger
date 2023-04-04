// Imports
import resolvePromise from "./resolvePromise.js"
// import {} from "./spotifySource.js";

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

        if(id !== this.userid)
            this.userid = id;
    }
    setSource(id) {
        if(id === null) {
            throw new Error("Source playlist is null, invalid")
        }
        if(id !== this.source) 
            this.source = id;
    }
    setPrevPlaylists(playlists) {
        this.prevPlaylists = [...playlists];
    }
    setTempo(min, max) {
        // TODO: Handle if the same
        if(this.tempo.min !== min || this.tempo.max !== max) {
            this.tempo = {min: min, max: max};
        }
    }
    setLoudness(min, max) {
        if(this.loudness.min !== min || this.loudness.max !== max) {
            this.loudness = {min: min, max: max};
        }
    }
    setInstrumentalness(min, max) {
        if(this.instrumentalness.min !== min || this.instrumentalness.max !== max) {
            this.instrumentalness = {min: min, max: max};
        }
    }
    setGenerated(generate) {
        // TODO: Additional checks
        this.genereated = generate;
    }

    addToPrevPlaylists(newPlaylist) {
        function hasPlaylist(playlist) {
            return newPlaylist === playlist;
        }
        if(!this.prevPlaylists.find(hasPlaylist)) {
            this.prevPlaylists= [...this.prevPlaylists, newPlaylist];
        }
    }

    //TODO: Add setters and API-calls

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
}

export default DiggerModel;
