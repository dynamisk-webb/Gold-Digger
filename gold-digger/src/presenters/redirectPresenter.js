
import { useEffect } from "react";

function Redirect (props) {

    useEffect(onMountedACB, [props.model]);

    return (
        <div></div>
    );

    function setLoggedInACB() {
        props.model.setLogin("true");
        localStorage.setItem("isLoggedIn", "true");
    }

    function onMountedACB() {
        if (localStorage.getItem("access-token") === null && props.model.isLoggedIn === "pending") {
            localStorage.setItem("access-token", "pending"); // prevents second request from comming through while running react strict mode
            props.model.requestToken().then(setLoggedInACB);
        }
    }

}

export default Redirect;