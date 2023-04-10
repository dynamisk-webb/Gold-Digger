
import piano from "./../img/piano.png";

function HomeView(props){
    return (
    <div id="homeGrid">
        <h1 id="homeTitle">Gold Digger</h1>
        <h2 id="homeSubTitle">A playlist generator for Spotify</h2>
        <p id="homeText"> Mix and Match!</p>
        <button id="connectSpotify" onClick={connectSpotifyACB}>Shouldn't exist anymore!</button>
        <button id="generatePlaylist" onClick={generatePlaylistACB}>Generate a playlist</button>
        <img src={piano} id="pianoImage"></img>
    </div>);

    //https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp <-- TO HIDE BUTTONS

    function connectSpotifyACB(evt){
        props.connectSpotify();
    } 

    function generatePlaylistACB(evt){
        props.generatePlaylist();
    }
};

export default HomeView;