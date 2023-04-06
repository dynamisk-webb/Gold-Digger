import { useState } from "react";
import LoginTestView from "./loginTestView.js";

function LoginTest(props) {
    let [state, setState] = useState("Test");

    return (
        <div>
            <LoginTestView state={state} onChange={onChangeACB} onLogin={onLoginACB}/>
        </div>
    )

    
    function onChangeACB(value) {
        console.log("Example value sent: " + value.toString());
        setState(value);
    }

    function onLoginACB() {
        // fire event from model, model needs to be passed as a prop
        props.model.login();
    }
}

export default LoginTest;