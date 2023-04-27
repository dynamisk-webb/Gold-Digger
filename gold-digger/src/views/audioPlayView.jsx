import { useEffect, useState } from "react";

/**
 * Code altered from https://developer.spotify.com/documentation/web-playback-sdk/howtos/web-app-player
 * 2023-04-17
 */
function AudioPlayView(props){
    const [player, setPlayer] = useState(undefined);

    // Takes access_token
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player()({
                name: 'Web Playback SDK',
                getOAuthToken: cb => {cb(localStorage.getItem('access-token'));},
                volume: 0.5
            });
    
            setPlayer(player);
            player.addListener('ready', ({ device_id }) => {console.log('Ready with Device ID', device_id)}); 
            player.addListener('not_ready', ({ device_id }) => {console.log('Device ID has gone offline', device_id);});
    
            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });
            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });          
            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });

            player.connect();
    
            // Handle player_state_changed
        };
    }, []);

    return (
        <div>
        </div>
    );
}
export default AudioPlayView;