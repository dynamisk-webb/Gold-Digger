import { useCallback } from "react";
import { WebPlaybackSDK,
    usePlayerDevice,
    usePlaybackState,
    useSpotifyPlayer, } from "react-spotify-web-playback-sdk";
import { SpotifyPlaybackPlayer } from "react-spotify-playback-player";

/**
 * Code based on Spotify & react-spotify-playback-player by https://github.com/ArielBetti/react-spotify-playback-player
 */
function AudioPlayer(){
    const token = localStorage.getItem('access-token');
    const getOAuthToken = useCallback(getToken  => getToken(token), [token]);
    
    return (
        <WebPlaybackSDK
            deviceName="Gold Digger"
            getOAuthToken={getOAuthToken}
            initialVolume={0.5}
        >
            <Player/>
        </WebPlaybackSDK>
    );
}

export const Player = () => {
    const device = usePlayerDevice();
    const player = useSpotifyPlayer();
    const playback = usePlaybackState();
    
    const dTheme = {
        highLightColor: '#FF6B35',
    }

    return (
        <SpotifyPlaybackPlayer
            playback={playback || undefined}
            player={player || undefined}
            deviceIsReady={device?.status}
            onLinkClick={linkClickCB}
            theme={dTheme}
        />
    );

    function linkClickCB(click) {
        const url = click.match("album") ? "https://open.spotify.com/album/" : "https://open.spotify.com/artist/"
        window.open(url + click.link);
    }
}

export default AudioPlayer;