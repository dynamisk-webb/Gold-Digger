import "../static/App.css"

function LoggedInTestView(props) {
    //console.log("testView rendered!");
    
    return (
        <div>
            <h1>
                This is a test view to redirect back to after login
            </h1>
            <div>    
                <button type="button" onClick={onRequestTokenACB}>Reqeust access token</button>
            </div>
            <div>Needed in order to make API-calls. Can (and should) only be used once.</div>
            <div>---</div>
            <div>    
                <button type="button" onClick={onRequestGetProfileACB}>Example API-call</button>
                <div>Response prints to console</div>
            </div>
        </div>
    )

    function onRequestGetProfileACB() {
        props.onRequestGetProfile()
    }

    function onRequestTokenACB() {
        props.onRequestToken();
    }

}

export default LoggedInTestView;