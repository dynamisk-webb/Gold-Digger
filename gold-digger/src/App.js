// Import here 
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import './static/App.css';
import DiggerModel from "./DiggerModel.js";

import LoginTest from "./test/loginTestPresenter.js"
import LoggedInTest from "./test/loggedInTestPresenter.js"
import Test from "./test/testPresenter.js";

// import Layout from "./views/layoutView.js"
import Login from "./presenters/loginPresenter.js"
import Home from "./presenters/homePresenter.js"
import Loading from "./presenters/loadingPresenter.js"
import Artist from "./presenters/artistPresenter.js"
import Genres from "./presenters/genrePresenter.js"
import Parameter from "./presenters/parameterPresenter.js"
import Playlist from "./presenters/playlistPresenter.js"
import Source from "./presenters/sourcePresenter.js"

/**
 *  Main App rendering all components
 */

function App() {
  const dModel = new DiggerModel();
  
  // Routes 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"> {/*element={<Layout/>}*/}
          {/* Default route for / path */}
          <Route index element={<Home model={dModel}/>}/>
          <Route path="test" element={<Test/>}/>
          <Route path="login" element={<LoginTest model={dModel}/>}/>
          <Route path="loggedin" element={<LoggedInTest model={dModel}/>}/>
          <Route path="home" element={<Home />}/>
          <Route path="artist" element={<Artist model={dModel}/>}/>
          <Route path="genre" element={<Genres model={dModel}/>}/>
          <Route path="parameter" element={<Parameter model={dModel}/>}/>
          <Route path="playlist" element={<Playlist model={dModel}/>}/>
          <Route path="source" element={<Source model={dModel}/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
