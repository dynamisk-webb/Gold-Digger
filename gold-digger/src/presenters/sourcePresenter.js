import SourceView from "../views/sourceView";

function Source (props) {
    return (
        <SourceView setSource={setPlaylistIDACB}/>
    );

    /* Event: onInput set playlist ID */    
    function setPlaylistIDACB(value){
        props.model.setSource(value);
    }
}
export default Source;