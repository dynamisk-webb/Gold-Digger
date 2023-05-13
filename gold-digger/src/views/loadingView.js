import {useNavigate} from "react-router-dom"

function LoadingView(props){
    console.log(props.loadingState);
    const navigate = useNavigate(); // So React doesn't complain about React components
    return (<div id="loadingContainer">
        <h3 id="loadingTitle">Your playlist is now being generated!</h3>
        <p id="loadingInfo">{props.loadingState}</p>
        {renderStatus()}
    </div>);

    function renderStatus(){
        if(props.loadingState == "Done!"){
            return <button id="loadingButton" onClick={viewPlaylistACB}>Show me my playlist!</button>;
        }
    }

    function viewPlaylistACB(){
        props.viewPlaylist();
        navigate("/playlist");
    }
    //TODO: add loading thing
}

export default LoadingView;