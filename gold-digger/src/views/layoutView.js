import { Outlet, Link } from "react-router-dom";
import spotifyLogo from "./../img/spotifyLogo.png"

const LayoutView = () => {
  return (
    <div id="layout">
      <img src={spotifyLogo} id="spotifyLogo" ></img>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
    </div>
  )
};

export default LayoutView;