/**
 * LoginView renders a view displaying the login page for the Gold Digger application.
*/

import piano from "./../img/piano.png";

function LoginView(props){

    // Functions

    /* Connect to Spotify */
    function connectSpotifyACB(evt){
        props.connectSpotify();
    } 

    return (
    <div id="homeGrid">
        <h1 id="homeTitle">Gold Digger</h1>
        <h2 id="homeSubTitle">A playlist generator for Spotify</h2>
        <p id="homeText"> Mix and Match!</p>
        <button id="connectSpotify" onClick={connectSpotifyACB}>Connect your Spotify</button>
        <img src={piano} id="pianoImage"></img>
    </div>);

};

export default LoginView;