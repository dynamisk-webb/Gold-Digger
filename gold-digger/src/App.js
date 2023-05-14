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
        <Route path="source" element={<Source model={props.model} />} />
        <Route path="genre" element={
          props.model.source !== null ? (<Genres model={props.model} />) : (<Navigate to="/" />)
        }/>
        <Route path="artist" element={
          props.model.source !== null ? (<Artist model={props.model} />) : (<Navigate to="/" />)
        }/>
        <Route path="parameter" element={
          props.model.source !== null ? (<Parameter model={props.model} />) : (<Navigate to="/" />)
        }/>
        <Route path="loading" element={
          props.model.source !== null ? (<Loading model={props.model} />) : (<Navigate to="/" />)
        }/>
        <Route path="playlist" element={<Playlist model={props.model} />} />

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
