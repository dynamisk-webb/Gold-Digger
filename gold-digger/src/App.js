// Import here 
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './static/App.css';
import DiggerModel from "./DiggerModel.js";
import Test from "./test/testPresenter.js";
import Artist from "./presenters/artistPresenter.js"
import Home from "./presenters/homePresenter.js"
import Loading from "./presenters/loadingPresenter.js"
import Parameter from "./presenters/parameterPresenter.js"
import Playlist from "./presenters/playlistPresenter.js"
import Source from "./presenters/sourcePresenter.js"
import Layout from "./views/Layout.js"
import NoPage from "./views/NoPage.js"

/**
 *  Main App rendering all components
 */

function App() {
  const model = new DiggerModel();
  
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
          <Route path="artist" element={<Artist/>}/>
          <Route path="parameter" element={<Parameter/>}/>
          <Route path="playlist" element={<Playlist/>}/>
          <Route path="source" element={<Source/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
