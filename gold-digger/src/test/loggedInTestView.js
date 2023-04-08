import "../static/App.css"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

function LoggedInTestView(props) {
    // Example of log out and how to use useEffect()
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(true);

    function checkLogIn() {
        // Can make an access token check somewhere here also
        // constant access_token = localStorage.getItem("access-token");

        if(!loggedIn) {
            navigate("/login");
        }
    }
    useEffect(checkLogIn, [navigate, loggedIn]); // Checks for loggedIn and navigate and runs checkLogin

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
            <div>
                <button type="button" onClick={onCallACB}>Test function</button>
                <button type="button" onClick={redirectCB}>Redirect to login</button>
            </div>
        </div>
    )

    function onRequestGetProfileACB() {
        props.onRequestGetProfile()
    }

    function onRequestTokenACB() {
        props.onRequestToken();
    }

    function onCallACB() {
        props.onAPICall();
    }

    function redirectCB() {
        setLoggedIn(false); // Set loggedIn to false to initiate checkLogIn
    }

}

export default LoggedInTestView;