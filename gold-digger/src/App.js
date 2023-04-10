// Import here 
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import './static/App.css';
import DiggerModel from "./DiggerModel.js";

import LoggedInTest from "./test/loggedInTestPresenter";
import LoginTest from "./test/loginTestPresenter";

import Layout from "./views/layoutView.js"
import Login from "./presenters/loginPresenter.js"
import Home from "./presenters/homePresenter.js"
// import Loading from "./presenters/loadingPresenter.js"
import Artist from "./presenters/artistPresenter.js"
import Genres from "./presenters/genrePresenter.js"
import Parameter from "./presenters/parameterPresenter.js"
import Playlist from "./presenters/playlistPresenter.js"
import Source from "./presenters/sourcePresenter.js"

/**
 *  Main App rendering all components
 */

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const dModel = new DiggerModel(setLoggedIn);
  
  /*
  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);
  */

  const fixedPlaylist = {
    playlistid: "7j3dDab7O8OPEs7I346ZP3",
    tracks: [ 
      {
        "track": {
          "album": {
            "images": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2733cf1c1dbcfa3f1ab7282719b",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e023cf1c1dbcfa3f1ab7282719b",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048513cf1c1dbcfa3f1ab7282719b",
                "width": 64
              }
            ]
          },
          "artists": [
            {
              "id": "4UXqAaa6dQYAk18Lv7PEgX",
              "name": "Fall Out Boy"
            }
          ],
          "id": "5PUawWFG1oIS2NwEcyHaCr",
          "name": "Uma Thurman"
        }
      },
      {
        "track": {
          "album": {
            "images": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273baf89eb11ec7c657805d2da0",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02baf89eb11ec7c657805d2da0",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851baf89eb11ec7c657805d2da0",
                "width": 64
              }
            ]
          },
          "artists": [
            {
              "id": "0gxyHStUsqpMadRV0Di1Qt",
              "name": "Rick Astley"
            }
          ],
          "id": "4cOdK2wGLETKBW3PvgPWqT",
          "name": "Never Gonna Give You Up"
        }
      },
      {
        "track": {
          "album": {
            "images": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273b26ee3ea08f1e5d8dffbab4b",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02b26ee3ea08f1e5d8dffbab4b",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851b26ee3ea08f1e5d8dffbab4b",
                "width": 64
              }
            ]
          },
          "artists": [
            {
              "id": "6goK4KMSdP4A8lw8jk4ADk",
              "name": "Pokémon"
            }
          ],
          "id": "3OIHgTyQdiAGMmpjQaNxp3",
          "name": "Pokémon Theme"
        }
      },
      {
        "track": {
          "album": {
            "images": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b27388b3414802727efbacf8dc43",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e0288b3414802727efbacf8dc43",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d0000485188b3414802727efbacf8dc43",
                "width": 64
              }
            ]
          },
          "artists": [
            {
              "id": "04gDigrS5kc9YWfZHwBETP",
              "name": "Maroon 5"
            },
            {
              "id": "137W8MRPWKqSmrBGDBFSop",
              "name": "Wiz Khalifa"
            }
          ],
          "id": "7wO4T9v1edGUisLOzAC3tX",
          "name": "Payphone"
        }
      },
      {
        "track": {
          "album": {
            "images": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273fa258c01a71b49856db475dc",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02fa258c01a71b49856db475dc",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851fa258c01a71b49856db475dc",
                "width": 64
              }
            ]
          },
          "artists": [
            {
              "id": "5HZsYhRCMH3zR0yndRcLVw",
              "name": "MOB CHOIR"
            }
          ],
          "id": "56TEOXpkSgIRsTqXJTC3PG",
          "name": "Exist"
        }
      },
      {
        "track": {
          "album": {
            "images": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273532033d0d90736f661c13d35",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02532033d0d90736f661c13d35",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851532033d0d90736f661c13d35",
                "width": 64
              }
            ]
          },
          "artists": [
            {
              "id": "74XFHRwlV6OrjEM0A2NCMF",
              "name": "Paramore"
            }
          ],
          "id": "2GBjsCkCpR5w8Zri9aE49H",
          "name": "Interlude: I'm Not Angry Anymore"
        }
      }
    ]
  }

  dModel.setGenerated(fixedPlaylist);

  // Routes 
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* Default route for / path */}
        <Route index element={<Home model={dModel}/>}/>
        <Route path="logine" element={<Login model={dModel} isLoggedIn={isLoggedIn}/>}/>
        <Route path="login" element={<LoginTest model={dModel}/>}/>
        <Route path="loggedin" element={<LoggedInTest model={dModel}/>}/>
        <Route path="artist" element={<Artist model={dModel}/>}/>
        <Route path="genre" element={<Genres model={dModel}/>}/>
        <Route path="parameter" element={<Parameter model={dModel}/>}/>
        <Route path="playlist" element={<Playlist model={dModel}/>}/>
        <Route path="source" element={<Source model={dModel}/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  );
}

export default App;
