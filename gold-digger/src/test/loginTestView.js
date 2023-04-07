import "../static/App.css"

function LoginTestView(props) {
    //console.log("testView rendered!");
    
    return (
        <div>
            <h1>
                This is a test view to test login
            </h1>
            <div>    
                <button type="button" onClick={onLoginACB}>Login</button>
            </div>
        </div>
    )

    function onLoginACB() {
        props.onLogin();
    }
}

export default LoginTestView;