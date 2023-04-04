import { useState } from "react";
import TestView from "./testView.js";

function Test(props) {
    let [state, setState] = useState("Test");

    return (
        <div>
            <TestView state={state} onChange={onChangeACB}/>
        </div>
    )

    
    function onChangeACB(value) {
        console.log("Example value sent: " + value.toString());
        setState(value);
    }
}

export default Test;