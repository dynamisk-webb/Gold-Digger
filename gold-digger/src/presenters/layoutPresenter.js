import LayoutView from "../views/layoutView.js";

import AboutUsView from "../views/aboutUsView.js";
import { useEffect, useState } from "react";

function Layout(props) {
    // debug
    // props.model.debugModelState("/layout init");

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
        //props.model.debugModelState("/layout rerender");
    }

    const [aboutOpen, setAboutOpen] = useState(false);

    return <div>
            <AboutUsView closeAbout={closeAboutACB}></AboutUsView>
            <LayoutView logOut={logOutACB} openAbout={openAboutACB} isLoggedIn={props.isLoggedIn}></LayoutView>
        </div>;

    function logOutACB(){
        props.model.setLogin("false");
        props.model.logout();
    }

    function openAboutACB(){
        document.getElementById("aboutUsContainer").style.width = "100%";
        document.getElementById("aboutUs").style.width = "700px";
        document.getElementById("closeField").style.width = "100%";
        setAboutOpen(true);
    }

    function closeAboutACB(){
        document.getElementById("aboutUsContainer").style.width = "0%";
        document.getElementById("aboutUs").style.width = "0px";
        document.getElementById("closeField").style.width = "0%";
        setAboutOpen(false);
    }
}

export default Layout;