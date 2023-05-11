import SourceView from "../views/sourceView";
import { getTracksPlaylist } from "../spotifySource";
import { useState, useEffect } from "react";
import resolvePromise from "../resolvePromise";

function Source(props) {
  // debug
  // props.model.debugModelState("/source init");

  // add observer for notifications for state changes
  useEffect(addObserverOnCreatedACB, [])
  const [, forceReRender ]= useState(); 

  function addObserverOnCreatedACB() {
      props.model.addObserver(notifyACB);

      function removeObserverOnDestroyACB() {
          props.model.removeObserver(notifyACB);
      }
      return removeObserverOnDestroyACB;
  }

  // rerender on state change
  function notifyACB() {
      forceReRender({});
      //props.model.debugModelState("/source rerender");
  }

  const [validURL, setValidURL] = useState(false);
  const [promiseState, setState] = useState({});

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
    getTracksPlaylist(playlistID).then(setValidSourceACB).catch(invalidSourceACB);

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

    /*
      Helper function. Should notify with alert.
    */
    function invalidSourceACB() {
      console.log("Caught invalid source error");
      alert("Oops! That URL doesn't go to a Spotify playlist. Try again!");
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
