import "../static/App.css"

function LoginTestView(props) {
    //console.log("testView rendered!");
    
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
                <button type="button" onClick={onLoginACB}>Login</button>
                <input onInput={onInputACB}/>
            </div>
        </div>
    )

    function onClickACB() {
        props.onChange("Click!");
    }

    function onLoginACB() {
        props.onLogin();
    }
    
    function onInputACB(evt) {
        props.onChange(evt.target.value);
    }
}

export default LoginTestView;