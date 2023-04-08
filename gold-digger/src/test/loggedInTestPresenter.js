import { useState } from "react";
import LoggedInTestView from "./loggedInTestView.js";
import {} from "../spotifySource.js";

function LoggedInTest(props) {
    let [state, setState] = useState("Test2");

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

    function onAPICallACB() {
        console.log("Result: ");
    }
}

export default LoggedInTest;