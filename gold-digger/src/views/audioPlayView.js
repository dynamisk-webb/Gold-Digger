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
                activeColor: '#fff',
                bgColor: '#202020',
                color: "#ff5533",
                loaderColor: '#fff',
                sliderColor: "#ff5533",
                sliderTrackColor: "#4d4d4d",
                trackArtistColor: '#b8b8b8',
                trackNameColor: '#ffffffff',
              }}
        />
        </div>
    );
}

export default AudioPlayer;