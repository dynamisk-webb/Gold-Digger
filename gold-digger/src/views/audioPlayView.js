/** 
 * audioPlayView is a view that uses the third-party library "react-spotify-web-playback" 
 * to create and renders an audio player connected to Spotify.
    
 * Code based on Spotify 
 * & 
 * Third party component react-spotify-web-playback
 * by https://github.com/gilbarbara/react-spotify-web-playback
 */

import { useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'

function AudioPlayer(props) {

    // Variables
    const [access_token,] = useState(localStorage.getItem('access-token'));

    return (
        <div id="audioPlayer">
            <SpotifyPlayer
                token={access_token}
                getPlayer={props.getPlayerACB}
                initialVolume={0.4}
                uris={props.tracks}
                hideAttribution={true}
                name="Gold Digger"
                offset={props.offset}
                play={props.play}
                persistDeviceSelection={true}
                magnifySliderOnHover={true}
                styles={{
                    activeColor: '#ff6b35',
                    altColor: '#ffffff',
                    bgColor: '#202020',
                    color: "#C0C0C0",
                    loaderColor: '#fff',
                    sliderColor: "#ff6b35",
                    sliderTrackColor: "#4d4d4d",
                    sliderHandleColor: "#ffffff",
                    trackArtistColor: '#b8b8b8',
                    trackNameColor: '#ffffffff',
                }}
            />
        </div>
    );
}

export default AudioPlayer;