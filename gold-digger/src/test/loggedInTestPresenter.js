import { useState, useEffect } from "react";
import LoggedInTestView from "./loggedInTestView.js";
import { getGenresPlaylist, getTracksPlaylist } from "../spotifySource.js";
import resolvePromise from "../resolvePromise.js";
import fixedList from "../test/fixedList.js";

function LoggedInTest(props) {
    let [state, setState] = useState("Test2");
    const [promiseState, setPromiseState] = useState({});

    useEffect(() => {
        const getTrack = async () => {
            if(promiseState.data) {
                console.log("Result: " + JSON.stringify(promiseState.data));
            }
        };
      getTrack();
    }, [promiseState]);

    return (
        <div>
            <LoggedInTestView state={state} onAPICall={onAPICallACB} onChange={onChangeACB} onRequestToken={onRequestTokenACB} onRequestGetProfile={onRequestGetProfileACB}/>
        </div>
    )


    function onChangeACB(value) {
        console.log("Example value sent: " + value.toString());
        setState(value);
    }

    function onRequestGetProfileACB() {
        // fire event from model, model needs to be passed as a prop
        props.model.requestGetProfile();
    }

    function onRequestTokenACB() {
        props.model.requestToken();
    }

    async function onAPICallACB() {
        const idlist = ["5PUawWFG1oIS2NwEcyHaCr", "4cOdK2wGLETKBW3PvgPWqT"];
        resolvePromise(getGenresPlaylist("https://open.spotify.com/playlist/4kCO8l97N2jn3SDEInbwzX?si=99fabdbf185a411e"), promiseState, setPromiseState);
    }
}

export default LoggedInTest;