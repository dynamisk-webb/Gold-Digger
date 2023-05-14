/**
 * LayoutView renders a view that provides the general background for the Gold Digger application, 
 * with a navigation bar including a 'log out', 'return home', and 'more info' button.
*/

import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LayoutView(props) {
  // Variables
  const navigate = useNavigate();

  // Functions

  /* Open new window with Spotify */
  function openSpotifyACB() {
    window.open("https://www.spotify.com/us/about-us/contact/", "_blank");
  }

  /* Render the log out button if the user is logged in */
  function renderLogOut() {
    if (props.isLoggedIn) {
      return <button id="logOut" onClick={logOutACB}></button>;
    }
  }

  /* Render the home button if the user is logged in */
  function renderHome() {
    if (props.isLoggedIn) {
      return <button id="homeButton" onClick={returnHomeACB}></button>;
    }
  }

  /* Return home */
  function returnHomeACB() {
    navigate("/");
  }

  /* Log out */
  function logOutACB(evt) {
    props.logOut();
    navigate("/login");
  }

  /* Open the about us page */
  function openAboutACB(evt) {
    props.openAbout();
  }

  return (
    <div id="layout">
      <button id="spotifyLogo" onClick={openSpotifyACB}></button>
      {renderLogOut()}
      {renderHome()}
      <button id="openAbout" onClick={openAboutACB}></button>
      <Outlet />
    </div>
  )
};

export default LayoutView;