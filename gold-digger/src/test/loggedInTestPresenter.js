import { useState } from "react";
import LoggedInTestView from "./loggedInTestView.js";

function LoggedInTest(props) {
    let [state, setState] = useState("Test2");

    return (
        <div>
            <LoggedInTestView state={state} onChange={onChangeACB} onRequestToken={onRequestTokenACB} onRequestGetProfile={onRequestGetProfileACB}/>
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
}

export default LoggedInTest;