import { Outlet, Link} from "react-router-dom";
import spotifyLogo from "./../img/spotifyLogo.png";
import {useNavigate} from "react-router-dom";

function LayoutView(props){
  const navigate = useNavigate();

  return (
    <div id="layout">
      <button id="spotifyLogo" onClick={openSpotifyACB}></button>
      {renderLogOut()}
      {renderHome()}
      <button id="openAbout" onClick={openAboutACB}></button>
      <Outlet />
    </div>
  )

  function openSpotifyACB(){
    window.open("https://www.spotify.com/us/about-us/contact/","_blank");
  }

  function renderLogOut(){
    if(props.isLoggedIn){
      return <button id="logOut" onClick={logOutACB}></button>;
    }
  }

  function renderHome(){
    if(props.isLoggedIn){
      return <button id="homeButton" onClick={returnHomeACB}></button>;
    }
  }

  function returnHomeACB(){
    navigate("/");
}

  function logOutACB(evt){
    props.logOut();
    navigate("/login");
  }

  function openAboutACB(evt) {
    props.openAbout();
  }

};

export default LayoutView;