import { useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'
/**
 * Code based on Spotify & react-spotify-web-playback by https://github.com/gilbarbara/react-spotify-web-playback
 */

function AudioPlayer(props){
    const [access_token, ] = useState(localStorage.getItem('access-token'));

    return (
        <div id="audioPlayer">
        <SpotifyPlayer
            token={access_token}
            initialVolume={0.4}
            uris={props.tracks}
            hideAttribution={true}
            name="Gold Digger"
            play={props.play}
            magnifySliderOnHover={true}
            styles={{
                activeColor: '#ffffff',
                altColor: "#ffffff",
                bgColor: '#202020',
                color: "#ff6b35",
                loaderColor: '#fff',
                sliderColor: "#ff6b35",
                sliderHandleColor: "#ffffff",
                sliderTrackColor: "#4d4d4d",
                trackArtistColor: '#b8b8b8',
                trackNameColor: '#ffffff',
              }}
        />
        </div>
    );
}

export default AudioPlayer;