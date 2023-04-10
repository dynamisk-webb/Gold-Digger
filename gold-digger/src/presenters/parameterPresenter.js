/*

TODO

Props: Parameters (tempo, loudness, instrumentalness, danceable, acoustic)

Event: onClick go back to previous page
Event: Set tempo min/max
Set limits
Tool tip bpm
Event: Set loudness min/max
Set limits
Tool tip about db
Event: Set instrumentalness min/max
Set limits
Tool tip about instrumentalness
Event: onSwitch set/unset danceable
Set limits
Tool tip about WTF IT IS?
Event: onSwitch set/unset acoustic
Set limits
Tool tip about acousticness
Event: onClick window.location to Loading


*/

import FilterView from "../views/filterView";
import ParameterView from "../views/parameterView";
import {redirect} from "react-router-dom";

function Parameters (props) {

    return (
        <div>
            <FilterView filterType="parameter" title="Additional Parameters" nextTitle="Generate"></FilterView>
            <ParameterView></ParameterView>
        </div>
    );

    /* Event: onClick go to next page */
    function goForwardACB () {
        return redirect("/artists");  // TODO: get url for this
    }
    
    /* Event: onClick go back to previous page */
    function goBackACB () {
        // return redirect("/login");
        return redirect("/genres"); // TODO: get url for this
    }
}

export default Parameters;