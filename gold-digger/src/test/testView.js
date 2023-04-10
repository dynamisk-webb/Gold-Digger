import "../static/App.css"
import {useNavigate} from "react-router-dom"

function TestView(props) {
    console.log("testView rendered!");
    const navigate = useNavigate(); // So React doesn't complain about React components
    
    return (
        <div>
            <h1>
                This is a test view to test buttons and backend
            </h1>
            <div>
                Current value: {props.state.toString()}
            </div>
            <div>    
                <button type="button" onClick={onClickACB}>Click!</button>
                <input onInput={onInputACB}/>
            </div>

            <div>
                <button type="button" onClick={redirectCB}>Back</button>
            </div>
        </div>
    )

    function onClickACB() {
        props.onChange("Click!");
    }

    function onInputACB(evt) {
        props.onChange(evt.target.value);
    }

    // Example of useNavigate
    function redirectCB() {
        navigate(-1); // -1 goes back using the history
        // or navigate to specific path with ("/path");
    }
}

export default TestView;