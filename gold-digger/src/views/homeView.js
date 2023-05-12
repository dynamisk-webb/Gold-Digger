
import piano from "./../img/piano.png";
import {useNavigate} from "react-router-dom"
import PrevlistView from "./prevListView";

function HomeView(props){
    const navigate = useNavigate(); // So React doesn't complain about React components
    
    return (
    <div id="homeGrid">
        <h1 id="homeTitle">Gold Digger</h1>
        <h2 id="homeSubTitle">A playlist generator for Spotify</h2>
        <PrevlistView prevPlaylists={props.prevPlaylists} setCurrentPlaylist={props.setCurrentPlaylist}></PrevlistView>
        <button id="createPlaylist" onClick={generatePlaylistACB}>Create new playlist</button>
        {renderLastSessionButton()}
        <img src={piano} id="pianoImage"></img>
    </div>);

    //https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp <-- TO HIDE BUTTONS

    function renderLastSessionButton(){
        if(props.model.source !== null)
            return <button id="continuePlaylist" onClick={continueLastSessionACB}>Continue Previous Session</button>;
        else
            return <button id="continuePlaylistDisabled" disabled>Continue Previous Session</button>;
    }

    function generatePlaylistACB(evt){
        navigate("/source");
    }

    function continueLastSessionACB(evt){
        navigate("/genre");
    }
};

export default HomeView;