import {useNavigate} from "react-router-dom"

function LoadingView(props){
    // Variables
    const navigate = useNavigate(); 

    // Functions
    
    /* Render the current status of the creation of the playlist */
    function renderStatus(){
        if(props.loadingState == "Done!"){
            return <button id="loadingButton" onClick={viewPlaylistACB}>Show me my playlist!</button>;
        }
    }

    /* Navigate to the playlist */
    function viewPlaylistACB(){
        props.viewPlaylist();
        navigate("/playlist");
    }

    return (<div id="loadingContainer">
        <h3 id="loadingTitle">Your playlist is now being generated!</h3>
        <p id="loadingInfo">{props.loadingState}</p>
        {renderStatus()}
    </div>);
}

export default LoadingView;