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

    }
    setLoudness(min, max) {

    }
    setInstrumentalness(min, max) {

    }
    // TODO: Fill in setters

    addToPrevPlaylists(newPlaylist) {
        function hasPlaylist(playlist) {
            return newPlaylist === playlist;
        }
        if(!this.prevPlaylists.find(hasPlaylist)) {
            this.prevPlaylists= [...this.prevPlaylists, playlist];
        }
    }
}
