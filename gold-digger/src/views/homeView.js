
import piano from "./../img/piano.png";
import {useNavigate} from "react-router-dom"

function HomeView(props){
    const navigate = useNavigate(); // So React doesn't complain about React components
    
    return (
    <div id="homeGrid">
        <h1 id="homeTitle">Gold Digger!!!</h1>
        <h2 id="homeSubTitle">A playlist generator for Spotify</h2>
        <p id="homeText" onClick={logOutACB}> Match!</p>
        <button id="logOut" onClick={logOutACB}></button>
        <button id="generatePlaylist" onClick={generatePlaylistACB}>Generate a playlist</button>
        <img src={piano} id="pianoImage"></img>
    </div>);

    //https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp <-- TO HIDE BUTTONS

   function logOutACB(evt){
        props.logOut();
        navigate("/login");
   }

    function generatePlaylistACB(evt){
        navigate("/source");
        props.generatePlaylist();
    }
};

export default HomeView;