import { useCallback } from "react";
import { WebPlaybackSDK,
    usePlayerDevice,
    usePlaybackState,
    useSpotifyPlayer, } from "react-spotify-web-playback-sdk";
import { SpotifyPlaybackPlayer } from "react-spotify-playback-player";

/**
 * Code based on Spotify & react-spotify-playback-player by ...
 */
function AudioPlayer(props){
    const token = "BQC4f-42thY3kNms6WGP2V7Y6Sho0q5Gw-RWf5_s4DiaM0V8LJaRHA3lO9Tp56z7Xi2n3nPg0yLuN-MpwB6OFuRbqShLa8CxwkXRK-CLYooOnrWQcYayzdjoSvLFhzXEj_z_QOts3lmO0UO2H9_2RbnkCZVuXulHH4BeLZb7j4V5-W8IvwKH2NQD07eAEbbwXfBPwfFOZnujhbzZwcIqwrHCqFU";
    // const token = localStorage.getItem("access-token");
    const getOAuthToken = useCallback(getToken  => getToken(token), []);
    
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

    return (
        <SpotifyPlaybackPlayer
            playback={playback || undefined}
            player={player || undefined}
            deviceIsReady={device?.status}
            onLinkClick={linkClickCB}
        />
    );

    function linkClickCB(click) {
        const url = click.match("album") ? "https://open.spotify.com/album/" : "https://open.spotify.com/artist/"
        window.open(url + click.link);
    }
}

export default AudioPlayer;