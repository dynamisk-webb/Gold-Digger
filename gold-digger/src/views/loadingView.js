import {useNavigate} from "react-router-dom"

function LoadingView(props){
    const navigate = useNavigate(); // So React doesn't complain about React components
    return (<div>
        <h1>Wait a moment</h1>
        <p>Processing your request... Done!</p>
        <button onClick={viewPlaylistACB}>Show me my playlist!</button>
    </div>);

    function viewPlaylistACB(){
        navigate("/playlist");
    }
    //TODO: add loading thing
}

export default LoadingView;