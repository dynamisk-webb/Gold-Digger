
import { useEffect, useState } from "react";

function Redirect (props) {
    // debug
    // props.model.debugModelState("/redirect init");

    // add observer for notifications for state changes
    useEffect(addObserverOnCreatedACB, [])
    const [, forceReRender ]= useState(); 

    function addObserverOnCreatedACB() {
        props.model.addObserver(notifyACB);

        function removeObserverOnDestroyACB() {
            props.model.removeObserver(notifyACB);
        }
        return removeObserverOnDestroyACB;
    }

    // rerender on state change
    function notifyACB() {
        forceReRender({});
        //props.model.debugModelState("/redirect rerender");
    }


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