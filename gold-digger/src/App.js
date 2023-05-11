// REACT
import { Routes, Route, Navigate } from "react-router-dom";

// VIEW
import "./static/App.css";

// PRESENTER
import Layout from "./presenters/layoutPresenter.js";
import Login from "./presenters/loginPresenter.js";
import Home from "./presenters/homePresenter.js";
import Artist from "./presenters/artistPresenter.js";
import Genres from "./presenters/genrePresenter.js";
import Parameter from "./presenters/parameterPresenter.js";
import Playlist from "./presenters/playlistPresenter.js";
import Source from "./presenters/sourcePresenter.js";
import Loading from "./presenters/loadingPresenter.js";
import Redirect from "./presenters/redirectPresenter.js";

// FIREBASE
import "./firebaseModel.js";

// TEMPORARY IMPORTS
import fixedPlaylist from "./test/fixedList.js";
import LoggedInTest from "./test/loggedInTestPresenter";

/**
 *  Main App rendering all components
 */

function App(props) {
  return (
    <Routes>

      <Route exact path="/redirect" element={<Redirect model={props.model} />}/>
      <Route element={<Layout model={props.model} isLoggedIn={false} />}>
        <Route exact path="/login" element={props.model.isLoggedIn === "true" ? <Navigate to="/" /> : <Login model={props.model} />}/>
      </Route>

        {/*<Route element={<Layout model={dModel} isLoggedIn={false} />}></Route>*/}
      <Route path="/" element={<Layout model={props.model} isLoggedIn={true} />}>
        <Route index element={<Home model={props.model} />} />
        <Route path="artist" element={<Artist model={props.model} />} />
        <Route path="genre" element={<Genres model={props.model} />} />
        <Route path="parameter" element={<Parameter model={props.model} />} />
        <Route path="playlist" element={<Playlist model={props.model} />} />
        <Route path="source" element={<Source model={props.model} />} />
        <Route path="loading" element={<Loading model={props.model} />} />
        <Route path="test" element={<LoggedInTest model={props.model} />} />
      </Route>
      <Route
        path="*"
        element={
          props.model.isLoggedIn === "true" ? (<Navigate to="/" />) : (<Navigate to="/login" />)
        }
      />
    </Routes>
  );
}

export default App;
