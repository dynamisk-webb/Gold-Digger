import SourceView from "../views/sourceView";
import { getPlaylistID } from "../spotifySource";
import { useState, useEffect } from "react";

function Source(props) {

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
  }

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
  function setPlaylistIDACB(url) {
    
    if (url.startsWith("http://open.spotify.com/track/") || url.startsWith("https://open.spotify.com/playlist/")) {
      // Use API call 'getPlaylistID' to check if URL leads to an exisiting playlist
      getPlaylistID(url).then(setValidSourceACB).catch(invalidSourceACB);
    } else {
      alert("Oops!\nThat doesn't look like a valid Spotify link.\n\nTo get a link, simply right-click any Spotify playlist,\nselect \"Share\" and then \"Copy link to playlist\"");
    }
    
    /*
      Helper function. Sets the playlist as the source once we know it's a valid source.
      then passes this state to sourceView so that it can redirect.
    */
    function setValidSourceACB() {
      // make call to reset process parameters
      props.model.resetParams();
      props.model.setSource(url);
      setValidURL(true);
    }

    /*
      Helper function. Should notify with alert.
    */
    function invalidSourceACB(err) {
      console.log("Error from source: " + err);
      alert("Oops!\nThat doesn't look like a valid Spotify link.\n\nTo get a link, simply right-click any Spotify playlist,\nselect \"Share\" and then \"Copy link to playlist\"");
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
    props.model.setSource("saved");
  }
}
export default Source;
