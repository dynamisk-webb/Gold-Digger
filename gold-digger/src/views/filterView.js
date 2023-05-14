/**
 * FilterView renders a view for navigating when filtering the Gold Digger application by genre, artist, or parameter.
 */

import {useNavigate} from "react-router-dom"


function FilterView(props){

    // Variables
    const navigate = useNavigate(); 

    // Functions

    /* Returns to the previous step */
    function returnACB(){
        if(props.filterType == "genre")
            navigate("/source");
        else if(props.filterType == "artist")
            navigate("/genre");
        else if(props.filterType == "parameter")
            navigate("/artist");
    }

    /* Continues to the next step */
    function continueACB(){
        if(props.filterType == "genre")
            navigate("/artist");
        else if(props.filterType == "artist")
            navigate("/parameter");
        else if(props.filterType == "parameter")
            navigate("/loading");
    }

    return(
        <div id="filterGrid">
            <button id="filterReturnButton" onClick={returnACB}></button>
            <h2 id="filterNoTitle">{props.noTitle}</h2>
            <h1 id="filterTitle">{props.title}</h1>
            <button id="filterForwardButton" onClick={continueACB}>{props.nextTitle}</button>
        </div>
    );
}

export default FilterView;