import { Outlet, Link} from "react-router-dom";
import spotifyLogo from "./../img/spotifyLogo.png";
import {useNavigate} from "react-router-dom";

function LayoutView(props){
  const navigate = useNavigate();

  return (
    <div id="layout">
      <img src={spotifyLogo} id="spotifyLogo" ></img>
      <button id="logOut" onClick={logOutACB}></button>
      <button id="openAbout" onClick={openAboutACB}></button>

      <Outlet />
    </div>
  )

  // TODO: make sure login button isn't rendered when the user is logged out

  function logOutACB(evt){
    props.logOut();
    navigate("/login");
  }

  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  function openAboutACB(evt) {
    props.openAbout();
  }

};

export default LayoutView;