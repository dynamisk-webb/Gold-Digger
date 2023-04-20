import { useState, useEffect } from "react";
import LoggedInTestView from "./loggedInTestView.js";
import { getProfile, getSavedTracks } from "../spotifySource.js";
import resolvePromise from "../resolvePromise.js";

function LoggedInTest(props) {
    let [state, setState] = useState("Test2");
    const [promiseState, setPromiseState] = useState({});

    useEffect(() => {
        const getTrack = async () => {
            console.log("Result: " + promiseState.data.id);
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
        //resolvePromise(getSavedTracks(), promiseState, setPromiseState);
        resolvePromise(getProfile(), promiseState, setPromiseState);
    }
}

export default LoggedInTest;