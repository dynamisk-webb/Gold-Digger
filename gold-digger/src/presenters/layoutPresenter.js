import LayoutView from "../views/layoutView.js";

import AboutUsView from "../views/aboutUsView.js";
import { useEffect, useState } from "react";

function Layout(props) {
    const [aboutOpen, setAboutOpen] = useState(false);
    useEffect(() => console.log('test'),[aboutOpen, setAboutOpen]);

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