import {useNavigate} from "react-router-dom"

function FilterView(props){

    const navigate = useNavigate(); // So React doesn't complain about React components

    return(
        <div id="filterGrid">
            <button id="filterReturnButton" onClick={returnACB}></button>
            <h1 id="filterTitle">{props.title}</h1>
            <button id="filterForwardButton" onClick={continueACB}>{props.nextTitle}</button>
        </div>
    );

    function returnACB(){
        navigate(-1);
    }

    function continueACB(){
        if(props.filterType == "genre")
            navigate("/artist");
        else if(props.filterType == "artist")
            navigate("/parameter");
        else if(props.filterType == "parameter")
            navigate("/playlist");
    }
}

export default FilterView;