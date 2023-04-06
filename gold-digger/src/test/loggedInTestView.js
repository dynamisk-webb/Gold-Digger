import "../static/App.css"

function LoggedInTestView(props) {
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
                <button type="button" onClick={onRequestTokenACB}>Reqeust access token</button>
                <button type="button" onClick={onRequestGetProfileACB}>API-call</button>
                <input onInput={onInputACB}/>
            </div>
        </div>
    )

    function onClickACB() {
        props.onChange("Click!");
    }

    function onRequestGetProfileACB() {
        props.onRequestGetProfile()
    }

    function onRequestTokenACB() {
        props.onRequestToken();
    }
    
    function onInputACB(evt) {
        props.onChange(evt.target.value);
    }
}

export default LoggedInTestView;