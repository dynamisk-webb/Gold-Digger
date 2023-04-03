
function homeView(props){
    return (
    <div>
        <h1>Gold Digger</h1>
        <p>A playlist generator for Spotify</p>
        <button onClick={connectSpotifyACB}>Connect your Spotify</button>
        <button onClick={generatePlaylistACB}>Generate a playlist</button>
    </div>);

    //https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp <-- TO HIDE BUTTONS

    function connectSpotifyACB(evt){
        props.connectSpotify();
    } 

    function generatePlaylistACB(evt){
        props.generatePlaylist();
    }
};

export default homeView;