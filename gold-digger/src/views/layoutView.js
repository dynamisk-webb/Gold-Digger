import { Outlet, Link } from "react-router-dom";
import spotifyLogo from "./../img/spotifyLogo.png"

const LayoutView = () => {
  return (
    <div id="layout">
      <img src={spotifyLogo} id="spotifyLogo" ></img>
    
      <Outlet />
    </div>
  )
};

export default LayoutView;