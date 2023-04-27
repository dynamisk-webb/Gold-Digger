/*
____________________________________________________________________________________________


Hur man skriver en presenter Maria <3
EX: SidebarPresenter

import SidebarView from "../views/sidebarView";

function Sidebar (props) {
    return (
        <SidebarView number={props.model.numberOfGuests} dishes={props.model.dishes} onNumberChange={numChangedACB} userWantsToViewDish={viewDishACB} onDishRemoved={dishRemovedACB}/>
    );

    function numChangedACB(num){
        props.model.setNumberOfGuests(num);
    }
    function viewDishACB(dish){
        props.model.setCurrentDish(dish.id);
    }
    function dishRemovedACB(dish){
        props.model.removeFromMenu(dish);
    }
}
export default Sidebar;

*/

import SourceView from "../views/sourceView";
import { getTracksPlaylist } from "../spotifySource";
import { useState, alert } from "react";


function Source(props) {
  const [validURL, setValidURL] = useState(false);

  return (
    <SourceView
      validURL={validURL}
      setSource={setPlaylistIDACB}
      setSourceSaved={setSourceSavedACB}
    />
  );

  /** 
    Event: onInput set playlist ID (based on URL)
    User chooses to generate playlist based on a playlist on Spotify
  */
  function setPlaylistIDACB(playlistID) {
    // Use API call 'getTracksPlaylist' to check if URL leads to an exisiting playlist
    try {
      // using a promise chain so that we wait for getTracksPlaylist to return, THEN set the source.
      getTracksPlaylist(playlistID).then(setValidSourceACB);
    } catch {
      // send popup to user
      alert("Oops! That URL doesn't go to a Spotify playlist. Try again!");
    }

    /*
      Helper function. Sets the playlist as the source once we know it's a valid source.
      then passes this state to sourceView so that it can redirect.
    */
    function setValidSourceACB() {
      // make call to reset process parameters
      props.model.resetParams();
      props.model.setSource(playlistID);
      setValidURL(true);
    }
  }

  /* 
    Event: onClick set source to saved songs
    User chooses to generate playlist based on their saved songs on Spotify.
    We use setSource ("") to signify that we are supposed to use the users own saved tracks. 
  */
  function setSourceSavedACB() {
    // make call to reset process parameters
    props.model.resetParams();
    props.model.setSource("");
  }
}
export default Source;
