function artistResultView(props){
    return (<div class="scrollable">
        {props.artistResults.map(getArtistACB)}
    </div>);

    function getArtistACB(result){
        // TODO: add buttons to include/exclude artists
        return (
            <div> 
                <p>result.title</p>
            </div>
        ) 
    }
}

export default artistResultView;