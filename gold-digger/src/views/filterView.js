import {useNavigate} from "react-router-dom"


function FilterView(props){

    const navigate = useNavigate(); // So React doesn't complain about React components

    return(
        <div>
            <button onClick={returnACB}></button>
            <h1>{props.title}</h1>
            <button onClick={continueACB}>{props.nextTitle}</button>
        </div>
    );

    function returnACB(){
        navigate(-1);
    }

    function continueACB(){
        if(props.filterType == "genres")
            navigate("/artist");
        else if(props.filterType == "artist")
            navigate("/parameter");
        else if(props.filterType == "parameter")
            navigate("/playlist");
    }
}

export default FilterView;