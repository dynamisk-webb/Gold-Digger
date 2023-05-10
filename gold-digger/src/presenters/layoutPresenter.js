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
    useEffect(() => console.log('test'),[aboutOpen, setAboutOpen]);

    return <div>
            <AboutUsView closeAbout={closeAboutACB}></AboutUsView>
            <LayoutView logOut={logOutACB} openAbout={openAboutACB}></LayoutView>
        </div>;

    function logOutACB(){
        props.model.setLogin("false");
        props.model.logout();
    }

    function openAboutACB(){
        document.getElementById("aboutUsContainer").style.width = "100%";
        document.getElementById("aboutUs").style.width = "600px";
        setAboutOpen(true);
    }

    function closeAboutACB(){
        document.getElementById("aboutUsContainer").style.width = "0%";
        document.getElementById("aboutUs").style.width = "0px";
        setAboutOpen(false);
    }
}

export default Layout;