// Import here 
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './static/App.css';
import DiggerModel from "./DiggerModel.js";
import Test from "./test/testPresenter.js";
import Artist from "./presenters/artistPresenter.js"
import Genres from "./presenters/genrePresenter.js"
import Home from "./presenters/homePresenter.js"
import Loading from "./presenters/loadingPresenter.js"
import Parameter from "./presenters/parameterPresenter.js"
import Playlist from "./presenters/playlistPresenter.js"
import Source from "./presenters/sourcePresenter.js"
import Layout from "./views/layoutView.js"
import NoPage from "./views/NoPage.js"
import "@fontsource/lexend";

/**
 *  Main App rendering all components
 */

function App() {
  const dModel = new DiggerModel();
  
  // Routes 
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/loading" element={<Loading/>}/>
        <Route path="/" element={<Layout/>}>
          {/* Default route for / path */}
          <Route index element={<Home/>}/>
          <Route path="*" element={<NoPage/>}/>
          <Route path="test" element={<Test/>}/>
          <Route path="artist" element={<Artist model={dModel}/>}/>
          <Route path="genre" element={<Genres model={dModel}/>}/>
          <Route path="parameter" element={<Parameter model={dModel}/>}/>
          <Route path="playlist" element={<Playlist model={dModel}/>}/>
          <Route path="source" element={<Source model={dModel}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
