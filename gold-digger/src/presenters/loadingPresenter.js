/*
TODO

- Props: Parameters (tempo, loudness, instrumentalness, danceable, acoustic)
- Component state members: Saved tracks
- Lifecycle: 
    GET /playlist/{playlist_id}/tracks
        or
    GET /me/tracks
    GET all playlists from  user
    --> 
    GET /tracks/
    Save the list of tracks in saved tracks
    --> 
    Filter tracks
        Filter genres
        Filter two lists of wanted artists and one without unwanted and wanted
        Merge lists (in some kind of random amount if we want to limit the number)    
    --> 
    POST /users/{user_id}/playlists
    Set generated playlist id
    --> 
    POST /playlists/{playlists_id}/tracks
    PUT /playlists/{playlist_id}/images
    --> 
    Persists
        add previous list id [...prevlistids, generated id]
        reset parameters
    --> 
    Route to next window


*/
import LoadingView from "../views/loadingView";
import AudioPlayer from "../views/audioPlayView";

function Loading(props) {
    return (
        <div>
            <LoadingView/>
            <AudioPlayer/>
        </div>
    );
}

export default Loading;