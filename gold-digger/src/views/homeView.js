/**
 * HomeView renders the initial (logged in) view of the Gold Digger 
 * application, displaying the logo and allowing the user to generate a 
 * new playlist or continue a previous session. It also displays a list 
 * of previously generated playlists to inspect.
 */

import piano from "./../img/piano.png";
import {useNavigate} from "react-router-dom"
import PrevlistView from "./prevListView";

function HomeView(props){

    // Variables
    const navigate = useNavigate(); 
    
    // Functions

    /* Renders the "Continue Previous Session" if there is a previous session*/
    function renderLastSessionButton(){
        if(props.model.source !== null)
            return <button id="continuePlaylist" onClick={continueLastSessionACB}>Continue Previous Session</button>;
        else
            return <button id="continuePlaylistDisabled" disabled>Continue Previous Session</button>;
    }

    /* Navigate to source to create a new playlist*/
    function generatePlaylistACB(evt){
        props.startNewSession();
        navigate("/source");
    }

    /* Navigate to genre of an already started playlist */
    function continueLastSessionACB(evt){
        navigate("/genre");
    }

    return (
    <div id="homeGrid">
        <h1 id="homeTitle">Gold Digger</h1>
        <h2 id="homeSubTitle">A playlist generator for Spotify</h2>
        <PrevlistView prevPlaylists={props.prevPlaylists} setCurrentPlaylist={props.setCurrentPlaylist}></PrevlistView>
        <button id="createPlaylist" onClick={generatePlaylistACB}>Create new playlist</button>
        {renderLastSessionButton()}
        <img src={piano} id="pianoImage"></img>
    </div>);

};

export default HomeView;