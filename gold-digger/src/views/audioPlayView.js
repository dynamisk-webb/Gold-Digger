import { useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'
/**
 * Code based on Spotify & react-spotify-web-playback by https://github.com/gilbarbara/react-spotify-web-playback
 */

function AudioPlayer(props){
    const [access_token, setAccessToken] = useState(localStorage.getItem('access-token'));

    return (
        <SpotifyPlayer
            token={access_token}
            initialVolume={0.5}
            uris={[props.track]}
        />
    );
}

export default AudioPlayer;