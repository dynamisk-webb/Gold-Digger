import { useState, useEffect } from "react";
import TestView from "./testView.js";

function Test(props) {
    // How it works:
    // let sets is as a variable, and makes it changeable
    // [saved variable (also called component state member), setter for the variable]
    //
    // useState is React's built-in function which defines a value to observe
    // Only updates when the whole object changes (e.g. doesn't update when you adjust state.parameter)
    let [state, setState] = useState("Test");

    // An example of a lifecycle function (probably)
    function onMountACB() {
        console.log("Lifecycle!");
        setState("Hejdå");
        // Add observer

        // ACB to run at the end
        return function onUnmountedACB() {
            console.log("Cleanup!");
            // Remove observer to keep it consistent
        }
    }
    useEffect(onMountACB, []);

    return (
        <div>
            <TestView state={state} onChange={onChangeACB}/>
        </div>
    )

    // Example of the state being updated
    function onChangeACB(value) {
        console.log("Example value sent: " + value.toString());
        setState(value);
    }
}

export default Test;